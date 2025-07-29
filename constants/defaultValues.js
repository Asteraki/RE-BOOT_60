export const defaultUpgradeValues = [
  {
    name: 'ping-cycle',
    displayName: 'Ping Cycle',
    image: './assets/purple.png',
    cost: 16,
    increase: 1,
    type: "upgrade",
  },
  {
    name: 'low-power-processing',
    displayName: 'Low-Power<br>Processing',
    image: './assets/blue.png',
    cost: 128,
    increase: 4,
    type: "upgrade",
  },
  {
    name: 'mid-power-processing',
    displayName: 'Mid-Power<br>Processing',
    image: './assets/green.png',
    cost: 1024,
    increase: 16,
    type: "upgrade",
  },
  {
    name: 'high-power-processing',
    displayName: 'High-Power<br>Processing',
    image: './assets/gold.png',
    cost: 8192,
    increase: 128,
    type: "upgrade",
  },
];



export const defaultSkillValues = [
  {
    name: "stronger-ping-cycle",
    displayName: 'Stronger<br>Ping<br>Cycle',
    description: "Double your clicking power for 30 seconds",
    image: "./assets/silver.png",
    cd: 600, // seconds
    cost: 12000,
    type: "skill",
  },
  {
    name: "lucky-day",
    displayName: "Lucky<br>Day",
    description: "Gain 600x CPS of Computational Power instantly",
    image: "./assets/silver.png",
    cd: 900,
    cost: 480000,
    type: "skill",
  }
]

export const defaultArtifactValues = [
  {
    name: "artifact-1",
    displayName: "Artifact 1",
    description: "Permanently increase all CP gained by x amount",
    image: "",
    type: "artifact"
  }
]
