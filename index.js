import { defaultValues } from "./constants/defaultValues.js"

let CP = document.querySelector('.computational-power')
let parsedCP = parseFloat(CP.innerHTML)

let cpcText = document.getElementById("cpc-text")
let cpsText = document.getElementById("cps-text")

let cpImageContainer = document.querySelector('.cp-image-container')

let cpc = 1;

let cps = 0;

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
            cpMultiplier: obj.cpMultiplier,
            costMultiplier: obj.costMultiplier,
        });
    })
}

function incrementCP(event) {
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

    if (parsedCP >= mu.parsedCost) {
        CP.innerHTML = Math.round(parsedCP-= mu.parsedCost)

        mu.level.innerHTML++

        if (mu.name === 'ping-cycle') {
            cpc += mu.parsedIncrease
        } else {
            cps += mu.parsedIncrease
        }

        mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.cpMultiplier).toFixed(2))
        mu.increase.innerHTML = mu.parsedIncrease

        mu.parsedCost *= mu.costMultiplier
        mu.cost.innerHTML = Math.round(mu.parsedCost)

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
}, 100);

window.incrementCP = incrementCP
window.buyUpgrade = buyUpgrade
window.save = save
window.load = load

document.addEventListener("DOMContentLoaded", () => {
    createUpgrades();
});
