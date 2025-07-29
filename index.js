import { initUpgrades, getUpgrades, powerUpIntervals } from "./constants/upgrades.js"
import { defaultUpgradeValues } from "./constants/defaultValues.js"
import { nf } from "./utils/formatter.js"

window.addEventListener("DOMContentLoaded", () => {
    initUpgrades()
})

let CP = document.querySelector('.computational-power')
let parsedCP = parseFloat(CP.innerHTML)

let cpcText = document.getElementById("cpc-text")
let cpsText = document.getElementById("cps-text")

let cpImageContainer = document.querySelector('.cp-image-container')

let upgradesNavButton = document.getElementById('upgrades-nav-button')
let skillsNavButton = document.getElementById('skills-nav-button')
let artifactsNavButton = document.getElementById('artifacts-nav-button')

let prestigeButton = document.querySelector(".prestige-button")

let relic = document.getElementById("relic")
let cpc = 1;
let cps = 0;

const bgm = new Audio('./assets/audio/maou_bgm_cyber43.mp3') // credit: https://maou.audio/bgm_cyber43/
bgm.volume = 0.1

function incrementCP(event) {
    const clickingSound = new Audio('./assets/audio/maou_se_system45.mp3') // credit: https://maou.audio/se_system45/
    clickingSound.volume = 0.05
    clickingSound.play()

    CP.innerHTML = nf(parsedCP += cpc)

    const x = event.offsetX
    const y = event.offsetY

    const div = document.createElement('div')
    div.innerHTML = `+${Math.round(cpc)}`
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`
    cpImageContainer.appendChild(div)

    div.classList.add('fade-up')
    timeout(div)
}

const timeout = (div) => {
    setTimeout(() => {
        div.remove()
    }, 800);
}

function buyUpgrade(upgrade) {
    const upgrades = getUpgrades()
    const mu = upgrades.find((u) => {
        if (u.name === upgrade) return u
    })

    const upgradeDiv = document.getElementById(`${mu.name}-upgrade`)
    const nextLevelDiv = document.getElementById(`${mu.name}-next-level`)
    const nextLevelP = document.getElementById(`${mu.name}-next-p`)

    if (parsedCP >= mu.parsedCost) {
        const upgradeSound = new Audio('./assets/audio/maou_se_magical15.mp3') // credit: https://maou.audio/se_magical15/
        upgradeSound.volume = 0.05
        upgradeSound.play()

        CP.innerHTML = nf(parsedCP-= mu.parsedCost)

        let index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML))

        if ( index !== -1 ) {
            upgradeDiv.style.cssText = `border-color: #58c5ff`;
            nextLevelDiv.style.cssText = `background-color: #1c1c2b`;
            mu.cost.innerHTML = Math.round(mu.parsedCost *= mu.costMultiplier)

            if ( mu.name === 'ping-cycle' ) {
                cpc *= mu.powerUps[index].multiplier
                nextLevelP.innerHTML = `+${mu.parsedIncrease} CP<br>per click`
            } else {
                cps -= mu.power
                mu.power *= mu.powerUps[index].multiplier
                cps += mu.power
                nextLevelP.innerHTML = `+${mu.parsedIncrease} CP<br>per second`
            }
        }

        mu.level.innerHTML = parseInt(mu.level.innerHTML) + 1
        console.log(mu.level)

        index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML))

        if ( index !== -1 ) {
            upgradeDiv.style.cssText = `border-color: #8bffa3`;
            nextLevelDiv.style.cssText = `color: #8bffa3`;
            nextLevelP.innerText = mu.powerUps[index].description

            mu.cost.innerHTML = Math.round(mu.parsedCost * 2.5 * 1.004 ** parseFloat(mu.level.innerHTML))
        } else {
            mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.cpMultiplier).toFixed(2))
            mu.cost.innerHTML = Math.round(mu.parsedCost *= mu.costMultiplier)

            if ( mu.name === 'ping-cycle' ) nextLevelP.innerHTML = `+${mu.parsedIncrease} CP<br>per click`
            else nextLevelP.innerHTML = `+${mu.parsedIncrease} CP<br>per second`
        }

        if ( mu.name === 'ping-cycle' ) cpc += mu.parsedIncrease
        else {
            cps -= mu.power
            mu.power += mu.parsedIncrease
            cps += mu.power
        }
    }

}

function save() {
    localStorage.clear()
    const upgrades = getUpgrades()
    upgrades.map((upgrade) => {

        const obj = JSON.stringify({
            parsedLevel: parseFloat(upgrade.level.innerHTML),
            parsedCost: upgrade.parsedCost,
            parsedIncrease: upgrade.parsedIncrease
        })

        localStorage.setItem(upgrade.name, obj)
    })

    localStorage.setItem('cpc', JSON.stringify(cpc))
    localStorage.setItem('cps', JSON.stringify(cps))
    localStorage.setItem('CP', JSON.stringify(parsedCP))
}

function load() {
    const upgrades = getUpgrades()
    upgrades.map((upgrade) => {

        const savedValues = JSON.parse(localStorage.getItem(upgrade.name))

        upgrade.parsedCost = savedValues.parsedCost
        upgrade.parsedIncrease = savedValues.parsedIncrease

        upgrade.level.innerHTML = savedValues.parsedLevel
        upgrade.cost.innerHTML = Math.round(upgrade.parsedCost)
        upgrade.increase.innerHTML = upgrade.parsedIncrease
    })

    cpc = JSON.parse(localStorage.getItem('cpc'))
    cps = JSON.parse(localStorage.getItem('cps'))
    parsedCP = JSON.parse(localStorage.getItem('CP'))

}

function prestige() {
    const upgrades = getUpgrades()
    upgrades.map((upgrade) => {
        const mu = defaultUpgradeValues.find((u) => { if (upgrade.name === u.name) return u})

        upgrade.parsedCost = mu.cost
        upgrade.parsedIncrease = mu.increase

        upgrade.level.innerHTML = 0
        upgrade.cost.innerHTML = Math.round(mu.cost)
        upgrade.increase.innerHTML = mu.increase

        const upgradeDiv = document.getElementById(`${mu.name}-upgrade`)
        const nextLevelDiv = document.getElementById(`${mu.name}-next-level`)
        const nextLevelP = document.getElementById(`${mu.name}-next-p`)
        upgradeDiv.style.cssText = `border-color: #58c5ff`;
        nextLevelDiv.style.cssText = `background-color: #1c1c2b`;
        nextLevelP.innerHTML = `+${mu.increase} CP<br>per click`
    })

    relic.innerHTML = Math.ceil(Math.sqrt(parsedCP - 999_999) / 300)

    cpc = 1
    cps = 0
    parsedCP = 0
    CP.innerHTML = parsedCP
}

setInterval(() => {
    parsedCP += cps/10
    CP.innerHTML = nf(parsedCP)
    cpcText.innerHTML = Math.round(cpc)
    cpsText.innerHTML = Math.round(cps)
    bgm.play()

    if (parsedCP >= 1_000_000 )  prestigeButton.style.display = "block"
    else prestigeButton.style.display = "none"
}, 100);

skillsNavButton.addEventListener("click", function() {
    const upgradeContainers = document.querySelectorAll(".upgrade")

    upgradeContainers.forEach((container) => {
        if ( container.classList.contains('type-skill') ) container.style.display = "block"
        else container.style.display = "none"
    })
})

upgradesNavButton.addEventListener("click", function() {
    const upgradeContainers = document.querySelectorAll(".upgrade")

    upgradeContainers.forEach((container) => {
        if ( container.classList.contains('type-upgrade') ) container.style.display = "block"
        else container.style.display = "none"
    })
})

artifactsNavButton.addEventListener("click", function() {
    const upgradeContainers = document.querySelectorAll(".upgrade")

    upgradeContainers.forEach((container) => {
        if ( container.classList.contains('type-artifact') ) container.style.display = "block"
        else container.style.display = "none"
    })
})

window.incrementCP = incrementCP
window.buyUpgrade = buyUpgrade
window.save = save
window.load = load
window.prestige = prestige

