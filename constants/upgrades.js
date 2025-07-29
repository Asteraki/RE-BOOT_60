import { defaultUpgradeValues } from "./defaultValues.js"

function createUpgrades() {
    const upgradesContainer = document.getElementById('upgrades-container')
    const template = document.getElementById('upgrade-template').textContent

    defaultUpgradeValues.forEach((obj) => {
        let html = template

        Object.keys(obj).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, obj[key])
        });

        upgradesContainer.innerHTML += html
    })
}

let upgrades = []

export function initUpgrades() {
    createUpgrades();

    upgrades = [
        {
            name: 'ping-cycle',
            cost: document.querySelector(".ping-cycle-cost"),
            parsedCost: parseFloat(document.querySelector(".ping-cycle-cost").innerHTML),
            increase: document.querySelector(".ping-cycle-increase"),
            parsedIncrease: parseFloat(document.querySelector(".ping-cycle-increase").innerHTML),
            level: document.querySelector(".ping-cycle-level"),
            powerUps: [
                {
                    name: "2x ping-cycle",
                    description: "double your clicking power",
                    multiplier: 2,
                },
                {
                    name: "3x ping-cycle",
                    description: "triple your clicking power",
                    multiplier: 3,
                },
                {
                    name: "2x ping-cycle",
                    description: "double your clicking power",
                    multiplier: 2,
                },
            ],
            cpMultiplier: 1.025,
            costMultiplier: 1.12,
        },
        {
            name: 'low-power-processing',
            cost: document.querySelector(".low-power-processing-cost"),
            parsedCost: parseFloat(document.querySelector(".low-power-processing-cost").innerHTML),
            increase: document.querySelector(".low-power-processing-increase"),
            parsedIncrease: parseFloat(document.querySelector(".low-power-processing-increase").innerHTML),
            level: document.querySelector(".low-power-processing-level"),
            powerUps: [
                {
                    name: "2x low-power-processing",
                    description: "double your efficiency",
                    multiplier: 2,
                },
                {
                    name: "3x low-power-processing",
                    description: "triple your efficiency",
                    multiplier: 3,
                },
                {
                    name: "2x low-power-processing",
                    description: "double your efficiency",
                    multiplier: 2,
                },
            ],
            power: 0,
            cpMultiplier: 1.03,
            costMultiplier: 1.115,
        },
        {
            name: 'mid-power-processing',
            cost: document.querySelector(".mid-power-processing-cost"),
            parsedCost: parseFloat(document.querySelector(".mid-power-processing-cost").innerHTML),
            increase: document.querySelector(".mid-power-processing-increase"),
            parsedIncrease: parseFloat(document.querySelector(".mid-power-processing-increase").innerHTML),
            level: document.querySelector(".mid-power-processing-level"),
            powerUps: [
                {
                    name: "2x low-power-processing",
                    description: "double your efficiency",
                    multiplier: 2,
                },
                {
                    name: "3x low-power-processing",
                    description: "triple your efficiency",
                    multiplier: 3,
                },
                {
                    name: "2x low-power-processing",
                    description: "double your efficiency",
                    multiplier: 2,
                },
            ],
            power: 0,
            cpMultiplier: 1.035,
            costMultiplier: 1.11,
        },
        {
            name: 'high-power-processing',
            cost: document.querySelector(".high-power-processing-cost"),
            parsedCost: parseFloat(document.querySelector(".high-power-processing-cost").innerHTML),
            increase: document.querySelector(".high-power-processing-increase"),
            parsedIncrease: parseFloat(document.querySelector(".high-power-processing-increase").innerHTML),
            level: document.querySelector(".high-power-processing-level"),
            powerUps: [
                {
                    name: "2x low-power-processing",
                    description: "double your efficiency",
                    multiplier: 2,
                },
                {
                    name: "3x low-power-processing",
                    description: "triple your efficiency",
                    multiplier: 3,
                },
                {
                    name: "2x low-power-processing",
                    description: "double your efficiency",
                    multiplier: 2,
                },
            ],
            power: 0,
            cpMultiplier: 1.04,
            costMultiplier: 1.1,
        }
    ]
}

export function getUpgrades() {
    return upgrades
}

export const powerUpIntervals = [10, 20, 30, 50, 75, 100, 150, 200, 250, 300]
