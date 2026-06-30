export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Credit Cards', href: '/credit-cards' },
  { label: 'Personal Loan', href: '/personal-loan' },
  { label: 'NBN', href: '/nbn' },
  { label: 'Home Loan', href: '/items' },
  { label: 'Solar Panel', href: '/solar-pannel' },
  { label: 'Inverters', href: '/Inverters' },
  { label: 'Blog', href: '/blog' },
] as const;

export const SERVICE_TABS = [
  { label: 'Home Loan', href: '/items', key: 'home-loan' },
  { label: 'Solar', href: '/solar-pannel', key: 'solar' },
  { label: 'NBN', href: '/nbn', key: 'nbn' },
  { label: 'Credit Card', href: '/credit-cards', key: 'credit-card' },
  { label: 'Personal Loan', href: '/personal-loan', key: 'personal-loan' },
  { label: 'Inverter', href: '/Inverters', key: 'inverter' },
] as const;

export const FOOTER_SERVICES = [
  { label: 'Credit Card', href: '/credit-cards' },
  { label: 'Personal Loan', href: '/personal-loan' },
  { label: 'Solar Panel', href: '/solar-pannel' },
  { label: 'Home Loan', href: '/items' },
  { label: 'Inverters', href: '/Inverters' },
  { label: 'NBN', href: '/nbn' },
] as const;

export const SITE_CONFIG = {
  name: 'Utility Choice',
  url: 'https://www.utilitychoices.com.au',
  email: 'help@utilitychoice.com.au',
  phone: '08 6385 7841',
  tagline: 'Connecting to better',
  description:
    "Compare home loan options with Utility Choice, Australia's top marketplace. Explore and compare home loan deals to save more on essential services.",
  address: {
    street: '322 King William St',
    locality: 'Adelaide',
    region: 'SA',
    postalCode: '5000',
    country: 'AU',
  },
  securityDisclaimer:
    'At Utility Choice, we prioritize the security and confidentiality of your information. Rest assured, your details are stored safely and will be used solely by our team of Australian-based agents and experts to contact you with better deals tailored to your needs. We collaborate with a network of trusted utility brokers to ensure you receive the most competitive offers available.',
} as const;
