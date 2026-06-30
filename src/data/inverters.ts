export type InverterProduct = {
  slug: string;
  name: string;
  sizes: string;
  features: string[];
  image: string;
  logo: string;
  logoAlt: string;
};

const LOGO = {
  jinko: '/assets/partners/52d9c9_35ec265c03914f66ab3c0f72a0785975~mv2.png',
  fronius: '/assets/partners/52d9c9_9cafbdfcc02741b4b3148d5743ffdf99~mv2.png',
  redback: '/assets/partners/52d9c9_45c2b334acdd404a8fd2ed65e9610d30~mv2.jpg',
  growatt: '/assets/partners/52d9c9_88c9ac90b0b64a118b3dbc8b5c45da9d~mv2.png',
  foxess: '/assets/partners/52d9c9_9b155ad914054c89a4321dfe4d44da29~mv2.jpg',
  solis: '/assets/partners/52d9c9_1b90eacc45604881b438f84c8783858d~mv2.png',
  goodwe: '/assets/partners/52d9c9_f85f65a7337b404199813fddb352367c~mv2.png',
} as const;

/** Matches utilitychoices.com.au/copy-of-solar-panel product cards */
export const SINGLE_PHASE_INVERTERS: InverterProduct[] = [
  {
    slug: 'solaredge-solar-inverter',
    name: 'SolarEdge Solar Inverter',
    sizes: '3, 5, 8, 10kW',
    image: '/assets/inverters/solaredge-single.webp',
    logo: LOGO.jinko,
    logoAlt: 'SolarEdge',
    features: [
      'Module-level optimisation',
      'Energy Smart Management',
      'WiFi to SolarEdge monitoring',
      '99% efficiency',
      '12-year warranty',
      'AC & DC battery compatible',
    ],
  },
  {
    slug: 'huawei-inverters',
    name: 'Huawei Inverters',
    sizes: '3, 5kW',
    image: '/assets/inverters/huawei-single.webp',
    logo: LOGO.fronius,
    logoAlt: 'Huawei',
    features: [
      'Dual tracking',
      'Australian office in Sydney',
      'WiFi to FusionSolar monitoring',
      '97.8% efficiency',
      '10-year warranty',
      'DC battery input',
    ],
  },
  {
    slug: 'sma-sunny-boy-inverter',
    name: 'SMA Sunny Boy Inverter',
    sizes: '3, 5, 6kW',
    image: '/assets/inverters/sma-sunny-boy.webp',
    logo: LOGO.redback,
    logoAlt: 'SMA',
    features: [
      'Dual tracking',
      'German Engineered',
      'WiFi to Sunny Portal monitoring',
      '97% efficiency',
      '10-year (5+5) warranty',
      'AC battery compatible',
    ],
  },
  {
    slug: 'goodwe-solar-inverters',
    name: 'Goodwe Solar Inverters',
    sizes: '3, 5, 8, 10kW',
    image: '/assets/inverters/goodwe-single.webp',
    logo: LOGO.growatt,
    logoAlt: 'GoodWe',
    features: [
      'Dual tracking',
      'Australian office in Melbourne',
      'WiFi to SEMS Portal monitoring',
      '97.8% efficiency',
      '10-year warranty',
      'AC battery compatible',
    ],
  },
  {
    slug: 'fronius-primo-solar-inverters',
    name: 'Fronius Primo Solar Inverters',
    sizes: '3, 5, 8kW',
    image: '/assets/inverters/fronius-primo.webp',
    logo: LOGO.foxess,
    logoAlt: 'Fronius',
    features: [
      'Dual tracking',
      'Made in Austria',
      'WiFi to Solar.web monitoring',
      '97% efficiency',
      '10-year (5+5) warranty',
      'AC battery compatible',
    ],
  },
  {
    slug: 'solax-x1-string-inverter',
    name: 'Solax X1 String Inverter',
    sizes: '3, 5kW',
    image: '/assets/inverters/solax-x1.webp',
    logo: LOGO.solis,
    logoAlt: 'SolaX',
    features: [
      'Dual-tracking',
      'Australian office in Melbourne',
      'WiFi to SolaX Portal monitoring',
      '97.8% efficiency',
      '12-year (6+6) warranty',
      'AC battery compatible',
    ],
  },
];

export const THREE_PHASE_INVERTERS: InverterProduct[] = [
  {
    slug: 'sma-sunny-tripower',
    name: 'SMA Inverters Sunny Tripower',
    sizes: 'Available in 5, 6, 7, 8, 9kW',
    image: '/assets/inverters/sma-tripower.webp',
    logo: LOGO.jinko,
    logoAlt: 'SMA',
    features: [
      'AC battery compatible',
      'DC input voltage of up to 1,000V',
      '10-year (5+5) warranty',
    ],
  },
  {
    slug: 'fronius-symo-solar-inverters',
    name: 'Fronius Symo Solar Inverters',
    sizes: '3 Phase Range from 3kW to 20kW',
    image: '/assets/inverters/fronius-symo.webp',
    logo: LOGO.fronius,
    logoAlt: 'Fronius',
    features: [
      'AC battery compatible',
      'Dual tracking',
      '10-year (5+5) warranty',
    ],
  },
  {
    slug: 'solaredge-three-phase',
    name: 'SolarEdge Solar Inverter Three-Phase',
    sizes: '5, 8, 10kW',
    image: '/assets/inverters/solaredge-three.webp',
    logo: LOGO.redback,
    logoAlt: 'SolarEdge',
    features: [
      'AC battery compatible',
      'Module-level optimisation',
      '12-year warranty',
    ],
  },
  {
    slug: 'huawei-inverters-three-phase',
    name: 'Huawei Inverters',
    sizes: '5, 10kW',
    image: '/assets/inverters/huawei-three.webp',
    logo: LOGO.growatt,
    logoAlt: 'Huawei',
    features: [
      'AC-DC, 5-6kW battery ready',
      'Smart Meter – Export control and load',
      'Dual tracking',
      'Achieve maximum efficiency of 98.65%',
    ],
  },
  {
    slug: 'goodwe-gw10kl-dt',
    name: 'Goodwe Solar Inverters GW10KL-DT',
    sizes: '10kW',
    image: '/assets/inverters/goodwe-gw10kl.webp',
    logo: LOGO.goodwe,
    logoAlt: 'GoodWe',
    features: [
      'Reliable grid support capabilities',
      'Suitable for commercial and industrial roofs',
      'Dual MPPT',
      '10-year (5+5) warranty',
    ],
  },
];
