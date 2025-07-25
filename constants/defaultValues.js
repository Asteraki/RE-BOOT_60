export const defaultValues = [
  {
    name: 'ping-cycle',
    displayName: 'Ping Cycle',
    image: './assets/purple.png',
    cost: 16,
    increase: 1,
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
    displayName: 'Low-Power<br>Processing',
    image: './assets/blue.png',
    cost: 128,
    increase: 4,
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
    displayName: 'Mid-Power<br>Processing',
    image: './assets/green.png',
    cost: 1024,
    increase: 16,
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
    displayName: 'High-Power<br>Processing',
    image: './assets/gold.png',
    cost: 8192,
    increase: 128,
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
  },
];

export const powerUpIntervals = [10, 20, 30, 50, 75, 100, 150, 200, 250, 300]
