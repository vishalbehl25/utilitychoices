export type SolarPackageHeader = 'orange' | 'blue';

export const SOLAR_HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Share details about the property.',
    description:
      'Tell us about your home, energy usage, and postcode so we can match you with installers and packages in your area.',
  },
  {
    step: 2,
    title: 'Find the perfect solar solution for you.',
    description:
      'Compare system sizes, panel brands, inverters, and pricing from trusted partners — all in one place.',
  },
  {
    step: 3,
    title: 'Confirm your order!',
    description:
      'Choose your preferred package and connect with a broker to finalise installation and rebates.',
  },
] as const;

export type { SolarFaqItem } from './solar-faq';
export { SOLAR_FAQ } from './solar-faq';

export const SOLAR_PACKAGES = [
  {
    size: '6.6 KW',
    headerColor: 'orange' as SolarPackageHeader,
    plans: 'Compare 450+ Plans',
    ideal: 'This plan is IDEAL for 1 - 2 People',
    panels: '16 - 17 x 415W Panels',
    panelBrands: 'Trina Solar, Q-Cells, and Sungrow & many more.',
    inverter: '5kW Inverter',
    inverterBrands: 'SunGrow, Fronius, Goodwe & many more.',
    feature: 'Best Power & High Efficiency Solar Module',
  },
  {
    size: '9.9 KW',
    headerColor: 'blue' as SolarPackageHeader,
    plans: 'Compare 300+ Plans',
    ideal: 'This plan is IDEAL for 3-4 People',
    panels: '24 - 26 x 415W Panels',
    panelBrands: 'Off-Grid, Trina Solar, SunGrow & many more.',
    inverter: '8kW Inverter',
    inverterBrands: 'SunGrow, Noark Sion, Delta & many more.',
    feature: 'Best Power & High Efficiency Solar Module',
  },
  {
    size: '12 KW',
    headerColor: 'orange' as SolarPackageHeader,
    plans: 'Compare 120+ Plans',
    ideal: 'Best for 6+ or large families.',
    panels: '30 - 32 x 415W Panels',
    panelBrands: 'SunTech, Sunpro, and Astro Energy & many more.',
    inverter: '10kW Inverter',
    inverterBrands: 'SunGrow, Fronius, Growatt & many more.',
    feature: 'Best Power & High Efficiency Solar Module',
  },
];

export {
  SINGLE_PHASE_INVERTERS,
  THREE_PHASE_INVERTERS,
} from './inverters';
export type { InverterProduct } from './inverters';
