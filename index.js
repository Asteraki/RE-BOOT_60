import { defaultValues, powerUpIntervals } from "./constants/defaultValues.js"

let CP = document.querySelector('.computational-power')
let parsedCP = parseFloat(CP.innerHTML)

let cpcText = document.getElementById("cpc-text")
let cpsText = document.getElementById("cps-text")

let cpImageContainer = document.querySelector('.cp-image-container')

let upgradesNavButton = document.getElementById('upgrades-nav-button')
let skillsNavButton = document.getElementById('skills-nav-button')

let cpc = 1;
let cps = 0;

const bgm = new Audio('./assets/audio/maou_bgm_cyber43.mp3') // credit: https://maou.audio/bgm_cyber43/
bgm.volume = 0.1

const upgrades = []

function createUpgrades() {
    const upgradesContainer = document.getElementById('upgrades-container')
    const template = document.getElementById('upgrade-template').textContent

    defaultValues.forEach((obj) => {
        let html = template

        Object.keys(obj).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, obj[key])
        })

        upgradesContainer.insertAdjacentHTML('beforeend', html);

        const upgradeElement = upgradesContainer.lastElementChild;

        upgrades.push({
            name: obj.name,
            cost: upgradeElement.querySelector(`.${obj.name}-cost`),
            parsedCost: obj.cost,
            increase: upgradeElement.querySelector(`.${obj.name}-increase`),
            parsedIncrease: obj.increase,
            level: upgradeElement.querySelector(`.${obj.name}-level`),
            powerUps: obj.powerUps,
            power: obj.power,
            cpMultiplier: obj.cpMultiplier,
            costMultiplier: obj.costMultiplier,
        });
    })
}

function incrementCP(event) {
    const clickingSound = new Audio('./assets/audio/maou_se_system45.mp3') // credit: https://maou.audio/se_system45/
    clickingSound.volume = 0.05
    clickingSound.play()

    CP.innerHTML = Math.round(parsedCP += cpc)

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

        CP.innerHTML = Math.round(parsedCP-= mu.parsedCost)

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

        mu.level.innerHTML++

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

setInterval(() => {
    parsedCP += cps/10
    CP.innerHTML = Math.round(parsedCP)
    cpcText.innerHTML = Math.round(cpc)
    cpsText.innerHTML = Math.round(cps)
    bgm.play()
}, 100);


window.incrementCP = incrementCP
window.buyUpgrade = buyUpgrade
window.save = save
window.load = load

document.addEventListener("DOMContentLoaded", () => {
    createUpgrades();
});
