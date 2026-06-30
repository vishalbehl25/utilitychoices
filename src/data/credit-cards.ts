export interface CreditCardProduct {
  slug: string;
  name: string;
  interestRate: string;
  bonusPoints: string;
  rewardPoints: string;
  interestFree: string;
  charges: string;
}

export const creditCards: CreditCardProduct[] = [
  {
    slug: 'qantas-premier-titanium',
    name: 'Qantas Premier Titanium',
    interestRate: '20.99',
    bonusPoints: '150000',
    rewardPoints: '1.25',
    interestFree: 'Up to 44 days on purchases',
    charges: '$1,200',
  },
  {
    slug: 'american-express-business-gold-plus-card',
    name: 'American Express Business Gold Plus Card',
    interestRate: '0',
    bonusPoints: '200000',
    rewardPoints: '1.5',
    interestFree: 'Up to 55 days on purchases',
    charges: '$395',
  },
  {
    slug: 'westpac-altitude-platinum-card',
    name: 'Westpac Altitude Platinum Card',
    interestRate: '20.99',
    bonusPoints: '100000',
    rewardPoints: '1',
    interestFree: 'Up to 45 days on purchases',
    charges: '$99 first year ($175 after)',
  },
  {
    slug: 'st.george-amplify-signature',
    name: 'St.George Amplify Signature',
    interestRate: '20.99',
    bonusPoints: '200000',
    rewardPoints: '1.5',
    interestFree: 'Up to 55 days on purchases',
    charges: '$199 first year ($295 after)',
  },
  {
    slug: 'american-express-explorer-credit-card',
    name: 'American Express Explorer Credit Card',
    interestRate: '23.99',
    bonusPoints: '75000',
    rewardPoints: '2',
    interestFree: 'Up to 55 days on purchases',
    charges: '$395',
  },
  {
    slug: 'westpac-altitude-rewards-black',
    name: 'Westpac Altitude Rewards Black',
    interestRate: '20.99',
    bonusPoints: '200000',
    rewardPoints: '1.25',
    interestFree: 'Up to 45 days on purchases',
    charges: '$200 first year ($295 after)',
  },
  {
    slug: 'anz-business-black',
    name: 'ANZ Business Black',
    interestRate: '20.24',
    bonusPoints: '100000',
    rewardPoints: '1.5',
    interestFree: 'Up to 55 days on purchases',
    charges: '$375',
  },
  {
    slug: 'david-jones-prestige-credit-card',
    name: 'David Jones Prestige Credit Card',
    interestRate: '23.99',
    bonusPoints: '0',
    rewardPoints: '1',
    interestFree: 'Up to 55 days on purchases',
    charges: '$295',
  },
  {
    slug: 'nab-rewards-platinum-card',
    name: 'NAB Rewards Platinum Card',
    interestRate: '20.99',
    bonusPoints: '100000',
    rewardPoints: '1',
    interestFree: 'Up to 44 days on purchases',
    charges: '$195',
  },
  {
    slug: 'virgin-money-anytime-rewards-credit-card-',
    name: 'Virgin Money Anytime Rewards Credit Card',
    interestRate: '19.99',
    bonusPoints: '0',
    rewardPoints: '1',
    interestFree: 'Up to 55 days on purchases',
    charges: '$149',
  },
  {
    slug: 'coles-rewards-mastercard',
    name: 'Coles Rewards Mastercard',
    interestRate: '20.74',
    bonusPoints: '0',
    rewardPoints: '2',
    interestFree: 'Up to 44 days on purchases',
    charges: '$99',
  },
  {
    slug: 'westpac-altitude-qantas-black',
    name: 'Westpac Altitude Qantas Black',
    interestRate: '20.99',
    bonusPoints: '150000',
    rewardPoints: '0.75',
    interestFree: 'Up to 45 days on purchases',
    charges: '$370',
  },
  {
    slug: 'anz-rewards-black-credit-card',
    name: 'ANZ Rewards Black Credit Card',
    interestRate: '20.99',
    bonusPoints: '180000',
    rewardPoints: '2',
    interestFree: 'Up to 44 days on purchases',
    charges: '$375',
  },
  {
    slug: 'nab-rewards-platinum-card-velocity-points',
    name: 'NAB Rewards Platinum Card – Velocity Points',
    interestRate: '20.99',
    bonusPoints: '90000',
    rewardPoints: '1',
    interestFree: 'Up to 44 days on purchases',
    charges: '$95 first year ($195 after)',
  },
  {
    slug: 'humm90-platinum-mastercard',
    name: 'humm90 Platinum Mastercard',
    interestRate: '26.3',
    bonusPoints: '0',
    rewardPoints: 'N/A',
    interestFree: 'Up to 110 days on purchases',
    charges: '$9.95 per month ($119.40 p.a.)',
  },
  {
    slug: 'st.george-vertigo-card',
    name: 'St.George Vertigo Card',
    interestRate: '13.99',
    bonusPoints: '0',
    rewardPoints: 'N/A',
    interestFree: 'Up to 55 days on purchases',
    charges: '$55',
  },
  {
    slug: 'bankwest-breeze-platinum-mastercard',
    name: 'Bankwest Breeze Platinum Mastercard',
    interestRate: '12.99',
    bonusPoints: '0',
    rewardPoints: 'N/A',
    interestFree: 'Up to 55 days on purchases',
    charges: '$59',
  },
  {
    slug: 'american-express-velocity-platinum-card',
    name: 'American Express Velocity Platinum Card',
    interestRate: '23.99',
    bonusPoints: '50000',
    rewardPoints: '1.25',
    interestFree: 'Up to 55 days on purchases',
    charges: '$440',
  },
  {
    slug: 'qantas-american-express-ultimate-card',
    name: 'Qantas American Express Ultimate Card',
    interestRate: '23.99',
    bonusPoints: '50000',
    rewardPoints: '1.25',
    interestFree: 'Up to 44 days on purchases',
    charges: '$450',
  },
  {
    slug: 'qantas-premier-platinum-creditcard',
    name: 'Qantas Premier Platinum',
    interestRate: '20.99',
    bonusPoints: '120000',
    rewardPoints: '1',
    interestFree: 'Up to 44 days on purchases',
    charges: '$349 first year ($399 after)',
  },
];

export function getCreditCardBySlug(
  slug: string,
): CreditCardProduct | undefined {
  const normalized = decodeURIComponent(slug);
  return creditCards.find(
    (c) =>
      c.slug === slug ||
      c.slug === normalized ||
      (normalized.includes('velocity') &&
        c.slug === 'nab-rewards-platinum-card-velocity-points'),
  );
}
