import {
  getPersonalLoanBySlug,
  type PersonalLoanProduct,
} from '@/data/personal-loans';

export interface PersonalLoanFeature {
  title: string;
  description: string;
}

export interface PersonalLoanFeaturesSection {
  heading: string;
  paragraphs?: string[];
  items?: PersonalLoanFeature[];
}

export interface PersonalLoanDetail extends PersonalLoanProduct {
  minLoanAmount: string;
  summary: string;
  keyFeaturesHeading: string;
  keyFeatures: PersonalLoanFeature[];
  pros: string[];
  cons: string[];
  productDetails: Record<string, string>;
  howItWorksHeading: string;
  howItWorks: string;
  eligibilityIntro: string;
  eligibility: string[];
  howToApply?: string;
  featuresIntro?: string;
  featuresTitle?: string;
  features: PersonalLoanFeature[];
  featuresSections?: PersonalLoanFeaturesSection[];
}

const personalLoanDetails: PersonalLoanDetail[] = [
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
    minLoanAmount: '$5,000',
    summary:
      'You can borrow up to $80,000 from this non-bank lender, with interest rates customized to your credit profile—ranging from 6.55% to 19.99%.',
    keyFeaturesHeading: 'Three Key Features of This Loan:',
    keyFeatures: [
      {
        title: 'Fixed interest rates',
        description: 'Predictable repayments for the entire loan term.',
      },
      {
        title: 'Quick rate estimate',
        description:
          'Get a personalised quote in two minutes with no impact on your credit score.',
      },
      {
        title: 'No monthly fees',
        description:
          'Only a one-time establishment fee may apply, capped at $950.',
      },
    ],
    pros: [
      'Personalized, competitive rates',
      'No collateral needed',
      'Get a rate estimate before you apply',
    ],
    cons: ['Limited flexibility in loan terms'],
    productDetails: {
      'Product Name': 'MoneyPlace Unsecured Personal Loan',
      'Interest Rate (p.a.)': '6.55% to 19.99%',
      'Comp. Rate (p.a.)': '6.55% to 21.49%',
      'Interest Rate Type': 'Fixed',
      'Min Loan Amount': '$5,000',
      'Max. Loan Amount': '$80,000',
      'Loan Security': 'Unsecured',
    },
    howItWorksHeading: 'How MoneyPlace Unsecured Personal Loan Works?',
    howItWorks:
      'MoneyPlace offers unsecured personal loans that can be used for a variety of personal needs. Since the loan is unsecured, no collateral is required. The interest rate is customised based on your credit profile, with rates starting from 6.55% p.a. for borrowers with strong credit histories. You can check your estimated rate upfront without affecting your credit score. As a marketplace lender, MoneyPlace connects approved borrowers with private investors who fund the loans through its personal loan marketplace.',
    eligibilityIntro: 'To qualify, you must:',
    eligibility: [
      'Be at least 18 years old',
      'Be an Australian citizen or permanent resident',
      'Have a minimum annual income of $20,000, with most of it not sourced from Centrelink',
      'Apply as an individual (joint applications are not accepted)',
      'Have a good credit history, with no unpaid defaults, court judgements, writs, or bankruptcies',
      'Not be currently in collections for any unpaid debts',
      'If self-employed, you must have been operating your business for at least two years and not be applying for business-related purposes',
    ],
    featuresTitle: 'MoneyPlace Loan Features and Benefits:',
    featuresIntro:
      'This personal loan from MoneyPlace offers a range of useful features, including:',
    features: [
      {
        title: 'Flexible loan use',
        description:
          'Suitable for a variety of purposes such as buying a new or used car, consolidating existing personal loan or credit card debt, funding a holiday or wedding, or covering medical expenses.',
      },
      {
        title: 'Loan amounts',
        description: 'Borrow anywhere from $5,000 to $80,000.',
      },
      {
        title: 'Loan terms',
        description:
          'Choose a repayment term of 3, 5, or 7 years to suit your financial needs.',
      },
      {
        title: 'Reward for good credit',
        description:
          'Interest rates are tailored to your credit profile, starting from a competitive 6.55% p.a. for applicants with excellent credit.',
      },
      {
        title: 'Instant rate estimate',
        description:
          'Get a personalised rate estimate in minutes without impacting your credit score, just by entering a few details on the MoneyPlace website.',
      },
      {
        title: 'Fast, online process',
        description:
          'Apply in around 10 minutes entirely online, with no need for paper documentation.',
      },
      {
        title: 'No early repayment fees',
        description:
          'You can repay your loan early at any time without incurring any penalties.',
      },
    ],
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
    minLoanAmount: '$5,000',
    summary:
      'You can borrow more than $5,000 with a secured or unsecured personal loan from Latitude. Your interest rate will be determined by your credit score.',
    keyFeaturesHeading: 'Three Key Points About This Loan',
    keyFeatures: [
      {
        title: 'Tailored Interest Rates',
        description:
          'Your rate is based on factors like your financial situation, residency status, assets, employment, and credit score.',
      },
      {
        title: 'Variable Interest Rates',
        description:
          'The rate may fluctuate during the loan term, depending on market conditions, potentially increasing or decreasing.',
      },
      {
        title: 'Secured or Unsecured Options',
        description:
          'Choose to secure the loan with an asset, or go for an unsecured loan if you prefer.',
      },
    ],
    pros: [
      'Customized Interest Rate',
      'Affordable Minimum Loan Amount',
      'Secured or Unsecured Options',
    ],
    cons: [
      '$13 Monthly Fee',
      'Possible Early Repayment Charges',
      'Relatively High Minimum and Maximum Interest Rates',
    ],
    productDetails: {
      'Product Name': 'Latitude Variable Rate Personal Loan',
      'Interest Rate (p.a.)': '9.49% to 29.99%',
      'Comp. Rate (p.a.)': '10.37% to 30.69%',
      'Interest Rate Type': 'Variable',
      'Min Loan Amount': '$5,000',
      'Max. Loan Amount': '$70,000',
      'Loan Security': 'Unsecured',
    },
    howItWorksHeading: 'How the Latitude Personal Loan Works',
    howItWorks:
      'Latitude offers both secured and unsecured personal loans. The interest rate is personalized, depending on your credit score and several factors, including employment status, residential situation, and whether you are a homeowner or have a mortgage.',
    eligibilityIntro: 'To qualify, you must:',
    eligibility: [
      'Be 18 years or older',
      'Be an Australian citizen or permanent resident',
      'Have stable employment with regular income',
      'Show a positive credit history for the past 5 years',
      'Be free from bankruptcy for at least 7 years',
      'Be an existing Latitude Personal Loan customer',
    ],
    howToApply:
      "To apply, visit the Latitude Financial Services website. You can check your eligible interest rate without affecting your credit score. Be prepared to provide payslips, bank statements, and identification documents. You'll receive a decision within 60 seconds, and if approved, the funds will be transferred to your account within 24 hours. Having your documents ready will help streamline the process.",
    features: [],
    featuresSections: [
      {
        heading: 'Special Offer from UtilityChoice',
        paragraphs: [
          'Get the $395 establishment fee waived for approved personal loan applications submitted through UtilityChoice. Latitude reserves the right to withdraw this offer at any time. T&Cs apply.',
        ],
      },
      {
        heading: 'Key Loan Features',
        items: [
          {
            title: 'Variable Rate',
            description:
              'Your interest payments may rise or fall, depending on market fluctuations.',
          },
          {
            title: 'Personalized Rates',
            description:
              "Your interest rate is determined by your personal circumstances and credit score, including factors like how long you've been employed, whether you own a home or have a mortgage, and your residential status. A lower risk profile results in a lower rate, while a higher risk profile leads to a higher rate.",
          },
          {
            title: 'Extra Repayments',
            description:
              'Make extra payments with no penalty on a variable rate loan. However, a $500 penalty applies if you make early repayments on a fixed-rate loan with more than 3 months left.',
          },
          {
            title: 'Flexible Repayments',
            description:
              'Choose from weekly, fortnightly, or monthly repayments, and select the day of the week for deductions.',
          },
          {
            title: 'Loan Terms',
            description: 'Choose a loan term ranging from 2 years to 7 years.',
          },
        ],
      },
    ],
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
    minLoanAmount: '$5,000',
    summary:
      'An unsecured personal loan with tailored interest rates and no fees.',
    keyFeaturesHeading: 'Three Key Considerations for This Loan:',
    keyFeatures: [
      {
        title: 'Unsecured Loan',
        description: 'No collateral needed.',
      },
      {
        title: 'Tailored Interest Rates',
        description: 'Based on your credit history.',
      },
      {
        title: 'Zero Ongoing Fees',
        description: 'No monthly or annual charges.',
      },
    ],
    pros: [
      'No Collateral Needed',
      'Flexible Use – Spend the loan on any valuable purchase.',
      'Quick and Easy Application',
    ],
    cons: [
      'If you have a low credit score, you may face higher interest rates.',
    ],
    productDetails: {
      'Product Name': 'NOW Finance No Fee Unsecured Personal Loan',
      'Interest Rate (p.a.)': '6.75% to 26.95%',
      'Comp. Rate (p.a.)': '6.75% to 26.95%',
      'Interest Rate Type': 'Fixed',
      'Min Loan Amount': '$5,000',
      'Max. Loan Amount': '$50,000',
      'Loan Security': 'Unsecured',
    },
    howItWorksHeading: 'How NOW Finance Unsecured Personal Loans Work?',
    howItWorks:
      'NOW Finance offers unsecured personal loans to eligible applicants for a wide range of purposes, such as a holiday, vehicle purchase, or debt consolidation. With zero fees and a personalized interest rate, your rate is determined based on your individual circumstances and credit history.\n\nYou can apply for loans ranging from $5,000 to $50,000, with no collateral required. Loan terms are flexible, allowing repayment over 18 months to 7 years, with the option to pay weekly or fortnightly.',
    eligibilityIntro: 'To qualify, you must:',
    eligibility: [
      'Be 18 years or older',
      'Be an Australian citizen or permanent resident',
      'Be employed and have completed your probationary period',
      'Have no previous bankruptcies and defaults',
      "Provide valid identification, such as a current Australian Driver's License or Australian Passport",
    ],
    howToApply:
      'You can apply for a NOW personal loan on the NOW Finance website.',
    features: [
      { title: 'Unsecured', description: 'No collateral required.' },
      {
        title: 'Free Early Repayments',
        description: 'Pay off your loan early without any fees.',
      },
      {
        title: 'Loan Amounts',
        description: 'Borrow between $5,000 and $50,000.',
      },
      { title: 'No Monthly Fees', description: 'No ongoing charges.' },
      {
        title: 'No Establishment Fee',
        description: 'No initial setup costs.',
      },
      {
        title: 'Quick Fund Transfer',
        description: 'Receive funds in your account within 2 working days.',
      },
      {
        title: 'Personalized Interest Rates',
        description: 'Rates tailored to your financial situation.',
      },
    ],
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
    minLoanAmount: '$2,000',
    summary:
      'Get customized interest rates with no monthly charges or early repayment penalties. Establishment fees apply.',
    keyFeaturesHeading: 'Three Key Features of This Loan:',
    keyFeatures: [
      {
        title: 'Customized Interest Rate',
        description: 'Your rate is tailored based on your risk profile.',
      },
      {
        title: 'Fixed Interest',
        description:
          'Enjoy consistent monthly interest charges throughout the loan term.',
      },
      {
        title: 'Zero Monthly Fees',
        description: 'No ongoing charges, keeping your loan cost-effective.',
      },
    ],
    pros: [
      'Competitive, Tailored Rates – Get a rate suited to your profile.',
      'Borrow Up to $70,000 – Flexible loan amounts to meet your needs.',
      'Unsecured Loan – No collateral required.',
    ],
    cons: ['Limited Repayment Flexibility', 'Upfront Fee of $275/$575'],
    productDetails: {
      'Product Name': 'Harmoney Unsecured Personal Loan',
      'Interest Rate (p.a.)': '5.76% to 24.03%',
      'Comp. Rate (p.a.)': '6.55% to 24.98%',
      'Interest Rate Type': 'Fixed',
      'Min Loan Amount': '$2,000',
      'Max. Loan Amount': '$70,000',
      'Loan Security': 'Unsecured',
    },
    howItWorksHeading: 'How the Harmoney Personal Loan Works',
    howItWorks:
      'Harmoney offers an unsecured personal loan with tailored interest rates based on your financial profile. Your rate can range from 5.76% p.a. to 24.03% p.a. The primary cost, aside from the interest rate, is the one-time establishment fee.',
    eligibilityIntro: 'To qualify for the loan, you must:',
    eligibility: [
      'Be 18 years or older',
      'Be an Australian citizen, permanent resident, or a New Zealand citizen',
      'Have a stable source of income',
      'Be employed full-time or in a permanent part-time role',
      'Maintain a clear credit history, with no defaults, judgments, or bankruptcies.',
    ],
    howToApply:
      "You can apply online through the Harmoney website. Sign up using your Google or Facebook account, or register with your email address. To complete the application, you'll need to provide photo ID, such as an Australian driver's licence or passport. Having these documents ready will help speed up the process.",
    features: [
      {
        title: 'Unsecured Loan',
        description: 'No need to provide an asset as security.',
      },
      {
        title: 'Fixed Interest Rate',
        description:
          'Enjoy consistent repayments throughout the loan term, making it easier to budget and plan.',
      },
      {
        title: 'Personalized Rates',
        description:
          'Your interest rate is tailored to your risk profile, influenced by factors like employment stability, type of residence, financial behavior, and demographic profile. A lower risk profile means a lower rate, while a higher risk profile may lead to a higher rate.',
      },
      {
        title: 'Flexible Loan Terms',
        description: 'Choose from loan terms of 3, 5, or 7 years.',
      },
      {
        title: 'No Early Repayment Fees',
        description: 'Pay off your loan early with no penalties.',
      },
      {
        title: 'No Monthly Fees',
        description: 'Benefit from no monthly or annual service charges.',
      },
    ],
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
    minLoanAmount: '$5,000',
    summary:
      'Borrow $5,000+ with a secured or unsecured personal loan from Latitude. Get competitive interest rates based on your credit score. Apply now!',
    keyFeaturesHeading: '3 Key Things to Know About This Loan',
    keyFeatures: [
      {
        title: 'Personalized Interest Rates',
        description:
          'Your rate is tailored to your financial profile, including your credit score, residency, assets, and employment status.',
      },
      {
        title: 'Variable Interest Rates',
        description:
          'The rate may fluctuate over time based on market conditions, potentially increasing or decreasing.',
      },
      {
        title: 'Secured or Unsecured Options',
        description:
          'Choose between a secured loan backed by an asset or an unsecured loan with no collateral required.',
      },
    ],
    pros: [
      'Customized Interest Rates',
      'Flexible Loan Amounts',
      'Secured or Unsecured Options',
    ],
    cons: [
      '$13 Monthly Fee Applies',
      'Possible Early Repayment Charges',
      'Relatively High Minimum & Maximum Interest Rates',
    ],
    productDetails: {
      'Product Name': 'Latitude Variable Rate Personal Loan',
      'Interest Rate (p.a.)': '9.49% to 29.99%',
      'Comp. Rate (p.a.)': '10.37% to 30.69%',
      'Interest Rate Type': 'Variable',
      'Min Loan Amount': '$5,000',
      'Max. Loan Amount': '$70,000',
      'Loan Security': 'Unsecured',
    },
    howItWorksHeading: 'How Does a Latitude Personal Loan Work?',
    howItWorks:
      'Latitude offers both secured and unsecured personal loans with personalized interest rates. Your rate is determined by factors like your credit score, employment status, residency, and homeownership or mortgage status. Choose the loan type that best fits your needs and get flexible financing options.',
    eligibilityIntro: 'To qualify, you must:',
    eligibility: [
      'Be 18 years or older',
      'Be an Australian citizen or permanent resident',
      'Have stable employment with a regular income',
      'Maintain a good credit history for the past 5 years',
      'Be free from bankruptcy for at least 7 years',
      'Be an existing Latitude Personal Loan customer',
    ],
    howToApply:
      "Apply easily through the Latitude Financial Services website. Check your eligible interest rate without affecting your credit score. To apply, provide payslips, bank statements, and identification documents. You'll receive a response within 60 seconds, and if approved, funds will be disbursed within 24 hours. Having your documents ready can help speed up the process.",
    features: [],
    featuresSections: [
      {
        heading: '$395 Establishment Fee Waived',
        paragraphs: [
          'Available for approved personal loan applications submitted through Utility Choice. Offer may be withdrawn anytime. T&Cs apply.',
        ],
      },
      {
        heading: 'Key Features of Latitude Personal Loans',
        items: [
          {
            title: 'Variable Interest Rate',
            description:
              'Your rate may change based on market conditions, meaning your repayments can increase or decrease.',
          },
          {
            title: 'Personalized Interest Rates',
            description:
              'Your rate is based on factors such as credit score, employment duration, homeownership or mortgage status, and residency. A lower risk profile results in a lower rate, while a higher risk profile may lead to a higher rate.',
          },
          {
            title: 'Extra Repayments',
            description:
              'No early termination fees for extra repayments on variable-rate loans. However, fixed-rate loans will incur a $500 penalty if repaid with more than 3 months remaining.',
          },
          {
            title: 'Flexible Payment Options',
            description:
              'You have the option to repay weekly, fortnightly, or monthly and select your preferred repayment day.',
          },
          {
            title: 'Loan Terms Up to 7 Years',
            description:
              'Choose a loan term ranging from 2 years to 7 years to suit your financial needs.',
          },
        ],
      },
    ],
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
    minLoanAmount: '$5,000',
    summary:
      'Apply online for a fast, unsecured personal loan and borrow up to $75,000.',
    keyFeaturesHeading: 'Three key factors to consider about this loan:',
    keyFeatures: [
      {
        title: 'Personalized rates',
        description:
          'Your interest rate is determined by your credit history and financial situation.',
      },
      {
        title: 'Fixed rates',
        description: 'Enjoy a fixed interest rate for the entire loan term.',
      },
      {
        title: 'Early repayment',
        description: 'Pay off your loan early with no additional fees.',
      },
    ],
    pros: [
      'Competitive interest rates to keep your borrowing costs low.',
      'No ongoing fees, helping you save more over time.',
      'No penalties for extra payments, giving you flexibility to pay off your loan faster.',
    ],
    cons: ['Late payment fee: $35', 'Direct debit dishonor fee: $25'],
    productDetails: {
      'Product Name':
        'OurMoneyMarket Unsecured Low-Rate Personal Loan ($5,000-$75,000)',
      'Interest Rate (p.a.)': '6.57% to 18.99%',
      'Comp. Rate (p.a.)': '7.19% to 21.78%',
      'Interest Rate Type': 'Fixed',
      'Min Loan Amount': '$5,000',
      'Max. Loan Amount': '$75,000',
      'Loan Security': 'Unsecured',
    },
    howItWorksHeading:
      'How does the OurMoneyMarket Unsecured Low-Rate Personal Loan function?',
    howItWorks:
      'The OurMoneyMarket Unsecured Low-Rate Personal Loan allows you to borrow between $5,000 and $75,000 for various purposes, including home improvements, debt consolidation, travel, medical expenses, weddings, or other personal needs.\n\nInterest rates start at 6.57% p.a. (comparison rate 7.19% p.a.) and are personalized based on your credit score and financial situation. These loans come with no monthly fees, early repayment fees, or exit fees. The interest rate is fixed, ensuring it remains the same throughout the loan term. You can choose a repayment period ranging from 1 to 7 years.',
    eligibilityIntro: 'To qualify, you must:',
    eligibility: [
      'Be at least 18 years old',
      'Be an Australian citizen or permanent resident',
      'Be employed or receiving a pension',
      'Have a regular income (Centrelink may be considered as a secondary income)',
      'Not be experiencing financial hardship with another lender',
      'Not have a history of bankruptcy or court judgments',
      'Not have any active payday loans',
    ],
    howToApply:
      "You can apply for the OurMoneyMarket Unsecured Low-Rate Personal Loan online by completing the application form. To make the process smoother, have the following documents ready:\n\nPersonal identification – such as a driver's license\nBank details – including the last 3 months of bank statements\nInformation on any existing debts",
    featuresTitle: 'Key Features of the OurMoneyMarket Personal Loan:',
    features: [
      {
        title: 'Secured or Unsecured Options',
        description:
          'Your loan type will be determined based on your credit assessment. This review focuses on the unsecured loan.',
      },
      {
        title: 'Personalized Interest Rates',
        description:
          'Your rate is based on your credit history—the better your credit, the lower the rate you may receive.',
      },
      {
        title: 'Fast Online Application',
        description: 'Apply online and receive loan approval within minutes.',
      },
      {
        title: 'No Ongoing Fees',
        description:
          'While an establishment fee applies, there are no ongoing fees.',
      },
      {
        title: 'Flexible Repayments',
        description:
          'Choose a repayment schedule that suits you—weekly, fortnightly, or monthly.',
      },
      {
        title: 'No Exit or Early Repayment Fees',
        description: 'Pay off your loan early without any penalties.',
      },
    ],
  },
];

export function getPersonalLoanDetailBySlug(
  slug: string
): PersonalLoanDetail | undefined {
  const normalized = decodeURIComponent(slug);
  const detail = personalLoanDetails.find(
    (p) => p.slug === slug || p.slug === normalized
  );
  if (detail) return detail;

  const listing = getPersonalLoanBySlug(slug);
  if (!listing) return undefined;

  return {
    ...listing,
    minLoanAmount: '$5,000',
    summary: `Compare ${listing.name} - Interest Rate ${listing.interestRate}`,
    keyFeaturesHeading: 'Key features',
    keyFeatures: [],
    pros: [],
    cons: [],
    productDetails: {
      'Product Name': listing.name,
      'Interest Rate (p.a.)': listing.interestRate,
      'Comp. Rate (p.a.)': listing.comparisonRate,
    },
    howItWorksHeading: `How ${listing.name} works`,
    howItWorks: '',
    eligibilityIntro: '',
    eligibility: [],
    features: [],
  };
}

export function getAllPersonalLoanDetails(): PersonalLoanDetail[] {
  return personalLoanDetails;
}
