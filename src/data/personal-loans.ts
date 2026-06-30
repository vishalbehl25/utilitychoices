export interface PersonalLoanProduct {
  slug: string;
  name: string;
  lender: string;
  /** Local path; order matches utilitychoices.com.au/personal-loan listing */
  logo: string;
  interestRate: string;
  comparisonRate: string;
  serviceFee: string;
  repayment: string;
  loanFee: string;
}

export const personalLoans: PersonalLoanProduct[] = [
  {
    slug: 'moneyplace-unsecured-personal-loan',
    name: 'MoneyPlace Unsecured Personal Loan',
    lender: 'MoneyPlace',
    logo: '/assets/personal-loans/moneyplace.jpg',
    interestRate: '6.55% to 19.99%',
    comparisonRate: '6.55% to 21.49%',
    serviceFee: '$0',
    repayment: '$642.57',
    loanFee: '0% - 5.50%',
  },
  {
    slug: 'latitude-variable-rate-personal-loan',
    name: 'Latitude Variable Rate Personal Loan',
    lender: 'Latitude',
    logo: '/assets/personal-loans/latitude.png',
    interestRate: '9.49% to 29.99%',
    comparisonRate: '10.37% to 30.69%',
    serviceFee: '$13',
    repayment: '$653.57',
    loanFee: '$0',
  },
  {
    slug: 'now',
    name: 'NOW Finance No Fee Unsecured Personal Loan',
    lender: 'NOW Finance',
    logo: '/assets/personal-loans/now-finance.png',
    interestRate: '6.75% to 26.95%',
    comparisonRate: '6.75% to 26.95%',
    serviceFee: '$0',
    repayment: '$615.26',
    loanFee: '$0',
  },
  {
    slug: 'harmoney',
    name: 'Harmoney Unsecured Personal Loan',
    lender: 'Harmoney',
    logo: '/assets/personal-loans/harmoney.png',
    interestRate: '5.76% to 24.03%',
    comparisonRate: '6.55% to 24.98%',
    serviceFee: '$0',
    repayment: '$623.70',
    loanFee: '$275 - $575',
  },
  {
    slug: 'llv',
    name: 'Latitude Variable Rate Personal Loan',
    lender: 'Latitude',
    logo: '/assets/personal-loans/latitude.png',
    interestRate: '9.49% to 29.99%',
    comparisonRate: '10.37% to 30.69%',
    serviceFee: '$13',
    repayment: '$653.57',
    loanFee: '$0',
  },
  {
    slug: 'omm',
    name: 'OurMoneyMarket Unsecured Low-Rate Personal Loan ($5,000-$75,000)',
    lender: 'OurMoneyMarket',
    logo: '/assets/personal-loans/omm.png',
    interestRate: '6.57% to 18.99%',
    comparisonRate: '7.19% to 21.78%',
    serviceFee: '$0',
    repayment: '$627.42',
    loanFee: '1.50% - 6% min. $250',
  },
];

/** Minimum interest rates for the listing filter dropdown */
export const personalLoanInterestRateFilters = [
  '5.76%',
  '6.55%',
  '6.57%',
  '6.75%',
  '9.49%',
] as const;

export function getPersonalLoanBySlug(slug: string): PersonalLoanProduct | undefined {
  const normalized = decodeURIComponent(slug);
  return personalLoans.find((p) => p.slug === slug || p.slug === normalized);
}
