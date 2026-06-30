export interface HomeLoanProduct {
  /** Unique key for listing cards (defaults to slug). */
  listingId?: string;
  slug: string;
  name: string;
  lender: string;
  logo?: string;
  interestRate: string;
  rewardPoints: string;
  applicationFee: string;
  ongoingFee: string;
  loanFee: string;
}

export const homeLoans: HomeLoanProduct[] = [
  {
    slug: 'nab-choice-package-fixed-rate-home-loan',
    name: 'NAB Choice Package Fixed Rate Home Loan',
    lender: 'NAB',
    interestRate: '6.49%',
    rewardPoints: 'No',
    applicationFee: '$0',
    ongoingFee: '$395 p.a.',
    loanFee: '$3,120',
  },
  {
    slug: 'community-first-bank-true-basic-variable-home-loan',
    name: 'Community First Bank True Basic Variable Home Loan',
    lender: 'Community First Bank',
    interestRate: '5.94%',
    rewardPoints: 'No',
    applicationFee: '$0',
    ongoingFee: '$0 p.a.',
    loanFee: '$2,945',
  },
  {
    slug: 'ing-orange-advantage-fixed-home-loan',
    name: 'ING Orange Advantage Fixed Home Loan',
    lender: 'ING',
    interestRate: '5.29%',
    rewardPoints: 'Yes',
    applicationFee: '$0',
    ongoingFee: '$299 p.a.',
    loanFee: '$2,920',
  },
  {
    slug: 'macquarie-bank-basic-home-loan',
    name: 'Macquarie Bank Basic Home Loan',
    lender: 'Macquarie',
    interestRate: '6.14%',
    rewardPoints: 'No',
    applicationFee: '$0',
    ongoingFee: '$0 p.a.',
    loanFee: '$3,055',
  },
  {
    slug: 'nrma-home-loans-fixed-home-loan',
    name: 'NRMA Home Loans Fixed Home Loan',
    lender: 'NRMA',
    interestRate: '6.49%',
    rewardPoints: 'Yes',
    applicationFee: '$0',
    ongoingFee: '$0 p.a.',
    loanFee: '$3,157',
  },
  {
    slug: 'regional-australia-bank-variable-home-loan',
    name: 'Regional Australia Bank Variable Home Loan',
    lender: 'Regional Australia Bank',
    interestRate: '5.99%',
    rewardPoints: 'N/A',
    applicationFee: '$0',
    ongoingFee: '$0 p.a.',
    loanFee: '$2,998',
  },
  {
    listingId: 'community-first-bank-true-basic-variable-home-loan-2',
    slug: 'community-first-bank-true-basic-variable-home-loan',
    name: 'Community First Bank True Basic Variable Home Loan',
    lender: 'Community First Bank',
    interestRate: '5.94%',
    rewardPoints: 'No',
    applicationFee: '$0',
    ongoingFee: '$0 p.a.',
    loanFee: '$2,945',
  },
  {
    slug: 'macquarie-bank-basic-fixed-home-loan',
    name: 'Macquarie Bank Basic Fixed Home Loan',
    lender: 'Macquarie',
    interestRate: '6.64%',
    rewardPoints: 'Yes',
    applicationFee: '$0',
    ongoingFee: '$0 p.a.',
    loanFee: '$3,095',
  },
  {
    slug: 'g%26c-mutual-bank-first-home-buyer',
    name: 'G&C Mutual Bank First Home Buyer',
    lender: 'G&C Mutual Bank',
    interestRate: '5.35%',
    rewardPoints: 'No',
    applicationFee: '$0',
    ongoingFee: '$0 p.a.',
    loanFee: '$2,865',
  },
  {
    slug: 'unloan-variable-home-loan',
    name: 'Unloan Variable Home Loan',
    lender: 'Unloan',
    interestRate: '5.89%',
    rewardPoints: 'N/A',
    applicationFee: '$0',
    ongoingFee: '$0 p.a.',
    loanFee: '$2,935',
  },
  {
    slug: 'loans.com.au-solar-home-loan',
    name: 'loans.com.au Solar Home Loan',
    lender: 'loans.com.au',
    interestRate: '5.79%',
    rewardPoints: 'N/A',
    applicationFee: '$0',
    ongoingFee: '$0 p.a.',
    loanFee: '$2,931',
  },
  {
    slug: 'p%26n-bank-%26-basic-home-loan',
    name: 'P&N Bank & Basic Home Loan',
    lender: 'P&N Bank',
    interestRate: '5.94%',
    rewardPoints: 'No',
    applicationFee: '$0',
    ongoingFee: '$0 p.a.',
    loanFee: '$2,968',
  },
  {
    slug: 'westpac-flexi-first-option-home-loan-%E2%80%93-online-refinance-offer',
    name: 'Westpac Flexi First Option Home Loan – Online Refinance Offer',
    lender: 'Westpac',
    interestRate: '5.99%',
    rewardPoints: 'No',
    applicationFee: '$0',
    ongoingFee: '$0 per month',
    loanFee: '$2,978',
  },
  {
    slug: 'qantas-money-variable-home-loan',
    name: 'Qantas Money Variable Home Loan',
    lender: 'Qantas Money',
    interestRate: '5.98%',
    rewardPoints: 'No',
    applicationFee: '$345',
    ongoingFee: '$0 per month',
    loanFee: '$2,978',
  },
  {
    slug: 'anz-plus-home-loan-variable-rate',
    name: 'ANZ Plus Home Loan Variable Rate',
    lender: 'ANZ',
    interestRate: '6.25%',
    rewardPoints: 'No',
    applicationFee: '$0',
    ongoingFee: '$0 p.a.',
    loanFee: '$3,098',
  },
  {
    slug: 'imb-budget-home-loan',
    name: 'IMB Budget Home Loan',
    lender: 'IMB',
    interestRate: '6.04%',
    rewardPoints: 'No',
    applicationFee: '$449',
    ongoingFee: '$0 p.a.',
    loanFee: '$3,014',
  },
  {
    slug: 'g%26c-mutual-bank-fixed-rate-home-loan',
    name: 'G&C Mutual Bank Fixed Rate Home Loan',
    lender: 'G&C Mutual Bank',
    interestRate: '6.10%',
    rewardPoints: 'Yes',
    applicationFee: '$500',
    ongoingFee: '$0 p.a.',
    loanFee: '$3,045',
  },
  {
    listingId: 'anz-plus-home-loan-variable-rate-listing-609',
    slug: 'anz-plus-home-loan-variable-rate',
    name: 'ANZ Plus Home Loan Variable Rate',
    lender: 'ANZ',
    interestRate: '6.25%',
    rewardPoints: 'No',
    applicationFee: '$0',
    ongoingFee: '$0 p.a.',
    loanFee: '$3,098',
  },
];

function uniqueSlugs(): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const loan of homeLoans) {
    const key = normalizeHomeLoanSlug(loan.slug);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(loan.slug);
  }
  return out;
}

export function normalizeHomeLoanSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export const homeLoanInterestRateFilters = [
  ...new Set(homeLoans.map((h) => h.interestRate)),
].sort((a, b) => parseFloat(a) - parseFloat(b)) as readonly string[];

export const homeLoanFeeFilters = [
  ...new Set(homeLoans.map((h) => h.loanFee)),
].sort(
  (a, b) => parseLoanFeeAmount(a) - parseLoanFeeAmount(b),
) as readonly string[];

export const homeLoanMaxAmountFilters = [
  '$500,000',
  '$750,000',
  '$1,000,000',
] as const;

export function parseLoanFeeAmount(loanFee: string): number {
  return Number.parseInt(loanFee.replace(/[^0-9]/g, ''), 10) || 0;
}

export function matchesMaxLoanAmountFilter(
  loanFee: string,
  maxLoanAmount: string,
): boolean {
  if (!maxLoanAmount) return true;
  const feeNum = parseLoanFeeAmount(loanFee);
  const minAllowed =
    maxLoanAmount === '$500,000'
      ? 2800
      : maxLoanAmount === '$750,000'
        ? 2900
        : 3000;
  return feeNum >= minAllowed;
}

export function getHomeLoanBySlug(slug: string): HomeLoanProduct | undefined {
  const normalized = normalizeHomeLoanSlug(slug);
  return homeLoans.find(
    (h) =>
      h.slug === slug ||
      h.slug === normalized ||
      normalizeHomeLoanSlug(h.slug) === normalized,
  );
}

export function getUniqueHomeLoanSlugs(): string[] {
  return uniqueSlugs();
}
