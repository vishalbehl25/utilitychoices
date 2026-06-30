import type { CreditCardProduct } from './credit-cards';

export interface CreditCardDetail extends CreditCardProduct {
  company: string;
  summary: string;
  summaryExtra?: string;
  pros: string[];
  cons: string[];
  productDetails: Record<string, string>;
  detailsProduct?: Record<string, string>;
  detailsFees?: Record<string, string>;
  eligibility?: Record<string, string>;
  rewards?: Record<string, string>;
  howToApply: string;
  cardBenefits?: string;
  ratesAndFees: string;
  ratesSections?: { title: string; body: string }[];
}

export const creditCardDetails: CreditCardDetail[] = [
  {
    slug: "qantas-premier-titanium",
    name: "Qantas Premier Titanium",
    company: "Qantas",
    interestRate: "20.99",
    bonusPoints: "150000",
    rewardPoints: "1.25",
    interestFree: "Up to 44 days on purchases",
    charges: "$1,200",
    summary: "The Qantas Premier Titanium is a premium credit card tailored for high spenders, with a minimum income requirement of $200,000 and an annual fee of $1,200. By earning 150,000 bonus Qantas Points, you could redeem them for a one-way business class flight from Sydney to London (144,600 Qantas Points) or two return business class flights from Brisbane to Adelaide (110,400 points), for example. This card allows you to earn up to 3.25 points per $1 spent when booking Qantas flights or paying for other Qantas services, though most everyday spending in Australia earns 1.25 points per $1 (capped at $12,500 per statement period). Additionally, it offers frequent flyer benefits such as 20% bonus Status Credits on Qantas flights, interest-free flight offers, Qantas First Lounge invitations, and complimentary travel insurance. If you travel frequently and make substantial credit card purchases, these features and the earning potential may justify the card's annual fee.",
    summaryExtra: "The Qantas Premier Titanium credit card offers a generous 1.25 Qantas Points per $1 on eligible spending in Australia (up to a $12,500 cap per statement period) and 2 points per $1 spent internationally. Currently, you can earn 150,000 bonus Qantas Points by spending $5,000 on eligible purchases within the first 3 months of card approval.",
    pros: ["150,000 bonus Qantas Points offer","20% extra Status Credits on eligible Qantas flights","10% discount on the base fare of eligible Qantas flights for up to two travellers, twice a year","Two complimentary single-entry lounge passes to Qantas First Lounges"],
    cons: ["Annual fee of $1,200","3% foreign transaction fee for overseas purchases or online shopping with international businesses"],
    productDetails: {
          "Product Name": "Qantas Premier Titanium",
          "Purchase rate p.a.": "20.99%",
          "Interest-free days": "Up to 44 days on purchases",
          "Annual fee": "$1,200",
          "Bonus points": "150000",
          "Rewards points per $ spent": "1.25"
    },
    detailsProduct: {
          "Product Name": "Qantas Premier Titanium",
          "Balance transfer rate p.a.": "0% for 6 months, then 21.99%",
          "Balance transfer limit": "80% of available limit",
          "Purchase rate p.a.": "20.99%",
          "Interest-free days": "Up to 44 days on purchases",
          "Cash advance rate p.a.": "3% or $3, whichever is greater",
          "Min credit limit": "$15,000",
          "Card type": "Mastercard"
    },
    detailsFees: {
          "Annual fee": "$1,200",
          "Minimum monthly repayment": "0% for 6 months, then 21.99%",
          "Late payment fee": "$30",
          "Foreign currency conversion fee": "3%",
          "Cash advance fee": "3% or $3, whichever is greater",
          "Overseas cash advance fee": "$5",
          "Additional cardholder fee": "$100",
          "Number of additional cardholders": "0"
    },
    eligibility: {
          "Available to temporary residents": "No",
          "Minimum income": "$200,000",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "1.25",
          "Bonus points": "150,000",
          "Rewards points per $ spent": "1.25",
          "Rewards points cap": "150,000"
    },
    howToApply: "You can apply for the Qantas Premier Titanium credit card online by completing a secure application form. Before starting your application, ensure you meet the eligibility criteria and have the necessary documents ready.\n\nEligibility Criteria\nIncome: You must earn at least $200,000 per year.\nResidency: You need to be a permanent Australian resident with an Australian residential address and mobile phone number.\nQantas Frequent Flyer: This offer is available only to Qantas Frequent Flyer members. You can receive complimentary membership when you apply for this card.\nNew customer: The introductory offers are not available to existing primary Qantas Premier cardholders.\nAge: You must be at least 18 years old.\nEligible balance transfer debt: If you wish to make a balance transfer, you can transfer up to 80% of your available credit limit. The 0% interest rate applies to balances transferred within 30 days of card approval.\n\nRequired Documents\nPersonal details: You'll need to provide your full name, date of birth, contact information, marital status, and details of any dependents. Additionally, you must provide proof of ID, such as your driver's license, passport, or Medicare card.\nEmployment: Confirm your employment and annual income, and provide payslips less than 45 days old or 3 recent bank statements.\nFinances: Provide details of household expenses (e.g., rent, bills) and any existing loan or credit card repayments.\nQantas Frequent Flyer details: You'll need your Qantas Frequent Flyer number and PIN for the application.\nBalance transfer details: If transferring a balance, provide the financial institution name, BPAY reference number, and the amount you wish to transfer.",
    ratesAndFees: "Annual fee: $1,200. Purchase interest rate: 20.99% p.a. Up to 44 days on purchases.",
    ratesSections: [
          {
                "title": "Annual Fee",
                "body": "This card comes with a high annual fee of $1,200."
          },
          {
                "title": "Purchase Interest Rate",
                "body": "A purchase interest rate of 20.99% p.a. applies to purchases."
          },
          {
                "title": "Interest-Free Days",
                "body": "You can enjoy up to 44 interest-free days on purchases if you pay your balance in full by the statement due date. However, interest will be charged on retail purchases if you have a balance transfer debt."
          },
          {
                "title": "Cash Advances",
                "body": "Cash advances, such as ATM withdrawals, will incur a 21.99% interest rate."
          },
          {
                "title": "Minimum Credit Limit",
                "body": "The minimum credit limit for this card is $15,000."
          }
    ],
  },
  {
    slug: "american-express-business-gold-plus-card",
    name: "American Express Business Gold Plus Card",
    company: "American Express",
    interestRate: "0",
    bonusPoints: "200000",
    rewardPoints: "1.5",
    interestFree: "Up to 55 days on purchases",
    charges: "$395",
    summary: "The American Express Business Gold Plus Card is ideal for business owners looking to streamline cash flow while earning rewards on everyday expenses. It offers 3 Membership Rewards points per $1 spent with select partners including Xero, Google Ads, Meta, Amazon Web Services (AWS), and Dell. You’ll also earn 2 points per $1 spent using American Express AccessLine (pending application and approval), 1.5 points per $1 on general business spending, and 1 point per $1 spent with government bodies. Once you reach 200,000 points in a calendar year, the earn rate drops to 1 point per $1. For example, the introductory bonus of 100,000 Membership Rewards Points could be redeemed for $500 in Myer shopping credit or 50,000 Velocity Points. Plus, you can receive up to $550 in statement credits for eligible spending with Xero, Google Ads, Meta, AWS and Dell (enrolment required).",
    summaryExtra: "The American Express Business Gold Plus Card helps you manage business expenses while earning points through the Membership Rewards program (including accelerated earn on categories such as Xero, Google Ads, and Meta for the first 200,000 points each calendar year). New American Express card members can earn 200,000 bonus Membership Rewards points when they apply by 25 August 2026, are approved, and spend $5,000 on eligible purchases within the first 3 months from approval. The card allows up to two employee cards at no extra cost and includes complimentary domestic and international travel insurance (terms and conditions apply).",
    pros: ["Receive 100,000 Membership Rewards Bonus Points","Earn 3 points per $1 spent with Xero, Google Ads, Meta, Amazon Web Services (AWS) and Dell","Get up to $550 in statement credits for eligible spending with Xero, Google Ads, Meta, AWS and Dell","Enjoy a premium Sleek metal card as the primary cardholder","Complimentary travel insurance included (terms, conditions and exclusions apply)"],
    cons: ["A $75 annual fee applies for each additional card after the first two.","Once you reach 200,000 points per calendar year, the earn rate decreases to 1 point per $1 spent."],
    productDetails: {
          "Product Name": "American Express Business Gold Plus Card",
          "Purchase rate p.a.": "0%",
          "Interest-free days": "Up to 55 days on purchases",
          "Annual fee": "$395",
          "Bonus points": "200000",
          "Rewards points per $ spent": "1.5"
    },
    detailsProduct: {
          "Product Name": "American Express Business Gold Plus Card",
          "Balance transfer rate p.a.": "N/A",
          "Balance transfer limit": "N/A",
          "Purchase rate p.a.": "0%",
          "Interest-free days": "Up to 55 days on purchases",
          "Cash advance rate p.a.": "N/A",
          "Min credit limit": "N/A",
          "Card type": "American Express"
    },
    detailsFees: {
          "Annual fee": "$395",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$20",
          "Foreign currency conversion fee": "3%",
          "Cash advance fee": "N/A",
          "Overseas cash advance fee": "N/A",
          "Additional cardholder fee": "$75",
          "Number of additional cardholders": "99"
    },
    eligibility: {
          "Available to temporary residents": "No",
          "Minimum income": "N/A",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "1.5",
          "Bonus points": "200,000",
          "Rewards points per $ spent": "1.5",
          "Rewards points cap": "200,000"
    },
    howToApply: "You can apply for the American Express Business Gold Plus Card online and may receive a response within 48 hours. Before you proceed to the American Express application page, ensure that you meet the eligibility criteria and have all the required documents and details ready.\n\nEligibility Criteria\nBusiness requirements: You must have an active ABN (Australian Business Number) and your business must be registered for GST. Your business should also generate an annual revenue of at least $75,000.\nNew card member: To qualify for 200,000 bonus points, apply by 25 August 2026, be approved, and spend $5,000 on eligible purchases within the first 3 months. You must not currently hold or have held an American Express card issued by American Express Australia Limited within the past 18 months.\nCredit history: A good credit history with no payment defaults is required.\nResidency: You must be an Australian citizen or permanent resident.\nAge: Applicants must be at least 18 years old.\n\nRequired Documents\nPersonal details: You will need to provide your full name, email, residential address, date of birth, and contact number. A valid ID, such as your driver's licence or passport, will also be needed.\nBusiness details: This includes your ABN, financial information, and your accountant's contact details.\nFinancial details: You will need to provide documents showing your minimum required annual income. You may also need to include your accountant's details.",
    ratesAndFees: "Annual fee: $395. Purchase interest rate: 0% p.a. Up to 55 days on purchases.",
    ratesSections: [
          {
                "title": "Annual Fee",
                "body": "This card has an annual fee of $395."
          },
          {
                "title": "Additional Cards Fee",
                "body": "You can request up to two employee cards at no additional cost. After that, each extra card will incur a $75 annual fee."
          },
          {
                "title": "Interest-Free Purchases",
                "body": "As a charge card, this card does not have an interest rate. You must pay off your balance in full each month to avoid any penalty fees."
          },
          {
                "title": "Extended Credit Days",
                "body": "You can extend your cash flow for up to 55 days, depending on when you make a purchase and when your repayment is due."
          },
          {
                "title": "Flexible Spending Power",
                "body": "Although there is no predefined spending limit, the amount you can charge to the card will be determined by your credit history, spending behavior, and financial capacity."
          },
          {
                "title": "Flexible Payment Option",
                "body": "You have the option to pay off part of your balance over time using the Flexible Payment Option (subject to your limit). If you don't pay your full balance by the due date, interest will be charged. For more details, review the full terms and conditions for the Flexible Payment Option."
          }
    ],
  },
  {
    slug: "westpac-altitude-platinum-card",
    name: "Westpac Altitude Platinum Card",
    company: "Westpac",
    interestRate: "20.99",
    bonusPoints: "100000",
    rewardPoints: "1",
    interestFree: "Up to 45 days on purchases",
    charges: "$99 first year ($175 after)",
    summary: "The Westpac Altitude Platinum Credit Card is a great option for those seeking flexible rewards with a competitive annual fee for a platinum-tier card. One of its standout features is the elevated earn rate of up to 3 points per $1 spent with partnered brands like Qantas, Jetstar, Uber, and Spotify Premium. New cardholders can earn 90,000 bonus Altitude Points after spending $3,000 or more on eligible purchases within the first 90 days, plus an additional 30,000 bonus points after their first eligible purchase in the second year. If you take full advantage of the bonus offers, you could redeem the total 120,000 bonus points for $400 cashback. The Altitude Rewards program also gives you access to gift cards, merchandise, travel deals, and the ability to transfer points to frequent flyer programs like Velocity Frequent Flyer, Air New Zealand Airpoints, Asia Miles, and Singapore Airlines KrisFlyer. Note that you'll need to log into the Altitude Rewards portal to check the exact number of points needed for specific redemptions. Additional perks include complimentary overseas travel insurance and extended warranty protection on eligible purchases. In the first year, you'll benefit from a reduced annual fee of $99 for new cardholders, or just $49 if you're an existing Westpac customer. After the first year, the annual fee increases to $175, which is comparable to other platinum rewards cards. To get the most value, consider whether the rewards and benefits you’ll use justify the ongoing cost.",
    summaryExtra: "The Westpac Altitude Rewards Platinum Card earns between 1 and 3 Altitude Points per $1 on eligible purchases, with the top earn rate applying to flights booked with Qantas or Jetstar. New cardholders can earn up to 100,000 bonus Altitude Rewards Points (for example, 75,000 when you spend $4,000 within 90 days of approval, plus 25,000 in year two per Westpac's current offer). It charges a variable purchase interest rate of 20.99% p.a. if you're not taking advantage of interest-free days. Existing Westpac customers may qualify for a $49 first-year annual fee when they sign in to apply.",
    pros: ["Receive up to 120,000 bonus Altitude Points","Enjoy a reduced first-year annual fee: $99 for new customers or $49 for existing Westpac customers","Earn up to 3 Altitude Points per $1 spent, with no points cap","Includes complimentary travel insurance benefits"],
    cons: ["The standard annual fee of $175 p.a. is on the higher side","Offers up to 45 interest-free days on purchases, which is less than the typical 55 days offered by many other cards","Tiered points earn rate can make it harder to calculate your total rewards potential"],
    productDetails: {
          "Product Name": "Westpac Altitude Platinum Card",
          "Purchase rate p.a.": "20.99%",
          "Interest-free days": "Up to 45 days on purchases",
          "Annual fee": "$99 first year ($175 after)",
          "Bonus points": "100000",
          "Rewards points per $ spent": "1"
    },
    detailsProduct: {
          "Product Name": "Westpac Altitude Platinum Card",
          "Balance transfer rate p.a.": "N/A",
          "Balance transfer limit": "N/A",
          "Purchase rate p.a.": "20.99%",
          "Interest-free days": "Up to 45 days on purchases",
          "Cash advance rate p.a.": "3%",
          "Min credit limit": "$6,000",
          "Card type": "Mastercard"
    },
    detailsFees: {
          "Annual fee": "$99 first year ($175 after)",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$15",
          "Foreign currency conversion fee": "3%",
          "Cash advance fee": "3%",
          "Overseas cash advance fee": "2%",
          "Additional cardholder fee": "$0",
          "Number of additional cardholders": "1"
    },
    eligibility: {
          "Available to temporary residents": "Yes with conditions",
          "Minimum income": "$30,000",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "1",
          "Bonus points": "100,000",
          "Rewards points per $ spent": "1",
          "Rewards points cap": "100,000"
    },
    howToApply: "You can apply for the Altitude Platinum Credit Card online and receive a response in as little as 60 seconds. Before applying, ensure you meet the eligibility requirements below.\n\nEligibility Criteria\nNew cardholder: To qualify for the bonus points offer, you must not currently hold or have held a Westpac rewards card within the past 24 months.\nMinimum income: You'll need to earn at least $30,000 per year.\nResidency status: You must be an Australian citizen or permanent resident. Student visa holders aren't eligible. Temporary residents may apply via Westpac's migrant banking services.\nAge requirement: Applicants must be at least 18 years old.\nFirst-year annual fee offer: To receive the discounted $49 annual fee, you must be an existing Westpac customer.\n\nRequired Documents\nIdentification: A valid form of ID such as an Australian driver's licence, Medicare card or passport.\nIncome and expenses: You'll need to provide financial documents like recent payslips or tax returns, along with information on your existing debts, liabilities, and dependents.\nEmployment details: Include your employer's name, contact number, address, and any proof of other financial commitments such as investment property loans.",
    ratesAndFees: "Annual fee: $99 first year ($175 after). Purchase interest rate: 20.99% p.a. Up to 45 days on purchases.",
    ratesSections: [
          {
                "title": "Annual fee",
                "body": "Outside of any promotions, this card charges an annual fee of $175."
          },
          {
                "title": "Interest rates",
                "body": "This credit card charges a variable interest rate of 20.99% p.a. on purchases and 21.99% p.a. on cash advances."
          },
          {
                "title": "Interest-free period",
                "body": "You will receive up to 45 days interest-free on new purchases when you pay your monthly payment balance listed on your statement in full by the payment due date. Note that these interest-free days are separate from any longer-term interest rate promotions and the monthly payment balance excludes current balance transfers."
          },
          {
                "title": "Additional cardholder",
                "body": "You can earn points faster by adding 1 additional cardholder for $0."
          }
    ],
  },
  {
    slug: "st.george-amplify-signature",
    name: "St.George Amplify Signature",
    company: "St.George",
    interestRate: "20.99",
    bonusPoints: "200000",
    rewardPoints: "1.5",
    interestFree: "Up to 55 days on purchases",
    charges: "$199 first year ($295 after)",
    summary: "The St.George Amplify Signature is a premium rewards card offering 130,000 bonus Amplify Points when you spend $12,000 on eligible purchases in the first year, plus an extra 50,000 points after your first qualifying purchase in the second year. You can redeem these points for gift cards, retail products, or frequent flyer miles. In addition, this card offers a range of premium benefits, including 2 Priority Pass lounge access passes, complimentary international travel insurance, domestic flight inconvenience cover, and a personal concierge service to assist with travel bookings, restaurant reservations, and securing tickets to top events.",
    summaryExtra: "The St.George Amplify Signature is a high-end credit card that provides unlimited rewards, access to airport lounges, complimentary travel insurance, and a range of additional premium benefits.",
    pros: ["Up to 200,000 bonus Amplify Points","First-year annual fee discounted to $199","Shopping cashback opportunities via ShopBack","2 complimentary airport lounge passes annually","Complimentary overseas travel insurance for up to 6 months"],
    cons: ["$295 annual fee from the second year onwards","3% fee on foreign transactions"],
    productDetails: {
          "Product Name": "St.George Amplify Signature",
          "Purchase rate p.a.": "20.99%",
          "Interest-free days": "Up to 55 days on purchases",
          "Annual fee": "$199 first year ($295 after)",
          "Bonus points": "200000",
          "Rewards points per $ spent": "1.5"
    },
    detailsProduct: {
          "Product Name": "St.George Amplify Signature",
          "Balance transfer rate p.a.": "N/A",
          "Balance transfer limit": "N/A",
          "Purchase rate p.a.": "20.99",
          "Interest-free days": "Up to 55 days on purchases",
          "Cash advance rate p.a.": "21.99%",
          "Min credit limit": "$15,000",
          "Card type": "Visa"
    },
    detailsFees: {
          "Annual fee": "$199 first year ($295 after)",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$15",
          "Foreign currency conversion fee": "3%",
          "Cash advance fee": "3%",
          "Overseas cash advance fee": "3% of each cash advance amount",
          "Additional cardholder fee": "$0",
          "Number of additional cardholders": "1"
    },
    eligibility: {
          "Available to temporary residents": "Yes with conditions",
          "Minimum income": "N/A",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "1.5",
          "Bonus points": "200,000",
          "Rewards points per $ spent": "1.5",
          "Rewards points cap": "200,000"
    },
    howToApply: "You can apply for the St.George Amplify Signature Credit Card online in approximately 10 minutes. Before starting, ensure you meet the following eligibility criteria and have all the necessary documents and information for your application.\n\nEligibility Criteria\nNew cardholder: To qualify for the bonus points offer, you must not currently hold or have held an Amplify Platinum or Amplify Signature Credit Card from Bank of Melbourne, St.George, or BankSA within the last 24 months.\nResidency: You must be an Australian citizen or permanent resident with a fixed address in Australia. Temporary residents can apply if they have a valid visa with at least 1 year before expiry. More details on credit card eligibility for temporary residents are available in Finder's guide.\nIncome: You must have a regular income taxed through the Australian Taxation Office.\nAge: Applicants must be at least 18 years old.\n\nRequired Documents\nPersonal information: You'll need to provide your full name, date of birth, residential address, email address, and phone number. Additionally, provide a valid form of identification, such as an Australian driver's licence, Medicare card, passport, or birth certificate.\nEmployment details: Include your job title, salary details, and employer's contact information. If self-employed, you may be asked for your accountant's contact details.\nOther financial information: Provide information on any other income sources, assets like savings or shares, and details about existing debts and ongoing expenses such as rent, mortgage payments, bills, and groceries.",
    ratesAndFees: "Annual fee: $199 first year ($295 after). Purchase interest rate: 20.99% p.a. Up to 55 days on purchases.",
    ratesSections: [
          {
                "title": "Annual fee",
                "body": "This card charges a standard annual fee of $295 p.a."
          },
          {
                "title": "Interest rates",
                "body": "The variable interest rate for purchases is 20.99% p.a., while the cash advance rate is 21.99% p.a."
          },
          {
                "title": "Interest-free days",
                "body": "When you pay your monthly payment balance in full, which excludes current balance transfers, listed on your statement by the payment due date, you will receive up to 55 days interest-free on new purchases. Note that interest-free days are separate from any longer-term interest rate promotions."
          },
          {
                "title": "Foreign transaction fee",
                "body": "This card charges a fee worth 3% of each transaction made overseas or online in a foreign currency."
          }
    ],
  },
  {
    slug: "american-express-explorer-credit-card",
    name: "American Express Explorer Credit Card",
    company: "American Express",
    interestRate: "23.99",
    bonusPoints: "75000",
    rewardPoints: "2",
    interestFree: "Up to 55 days on purchases",
    charges: "$395",
    summary: "The American Express Explorer is one of the few cards offering an annual travel credit, providing up to $400 in value towards Australian or international trips booked through American Express Travel. Using this travel credit each year can help offset the card's $395 annual fee. This card is ideal for those seeking rewards and travel benefits, including airport lounge access, complimentary domestic and international travel insurance, and hotel upgrades through The Hotel Collection. Currently, new cardholders can earn 75,000 Membership Rewards Bonus Points when they apply online by 16 June 2026, are approved, and spend $4,000 on eligible purchases within the first 3 months (terms and conditions apply; new American Express card members only). The Amex Explorer earns 2 points per $1 on most eligible everyday purchases, and 1 point per $1 on spending with government bodies, such as the Australian Taxation Office (ATO). In addition to travel insurance, it includes 2 complimentary entries to The Centurion lounges at Sydney or Melbourne international airports, although the full value of this perk is typically realized when traveling overseas.",
    summaryExtra: "The American Express Explorer Credit Card stands out as one of the few cards offering an annual travel credit, providing $400 towards an Australian or international trip booked through American Express Travel. By using this travel credit every year, you can easily justify the card's $395 annual fee. The bonus points further enhance the value and offer potential savings, with the option to transfer them to over 10 major airline partners, including Virgin Australia Velocity Frequent Flyer, Singapore Airlines KrisFlyer, Emirates Skywards, and Air New Zealand Airpoints. Alternatively, you can redeem the points for various other rewards through Membership Rewards.\n\nWhile the $395 annual fee is on the higher side, it can be fully offset if you take advantage of the complimentary $400 travel credit each year.",
    pros: ["75,000 Membership Rewards Bonus Points","$400 annual travel credit","2 complimentary airport lounge passes each year"],
    cons: ["The ongoing purchase interest rate of 23.99% p.a. is relatively high.","The $395 annual fee may be considered steep if you don't fully utilize the travel benefits."],
    productDetails: {
          "Product Name": "American Express Explorer Credit Card",
          "Purchase rate p.a.": "23.99%",
          "Interest-free days": "Up to 55 days on purchases",
          "Annual fee": "$395",
          "Bonus points": "75000",
          "Rewards points per $ spent": "2"
    },
    detailsProduct: {
          "Product Name": "American Express Explorer Credit Card",
          "Balance transfer rate p.a.": "N/A",
          "Balance transfer limit": "N/A",
          "Purchase rate p.a.": "23.99",
          "Interest-free days": "Up to 55 days on purchases",
          "Cash advance rate p.a.": "N/A",
          "Min credit limit": "$3,000"
    },
    detailsFees: {
          "Annual fee": "$395",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$30",
          "Foreign currency conversion fee": "3%",
          "Cash advance fee": "N/A",
          "Overseas cash advance fee": "N/A",
          "Additional cardholder fee": "$0",
          "Number of additional cardholders": "4"
    },
    eligibility: {
          "Available to temporary residents": "Yes with conditions",
          "Minimum income": "N/A",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "2",
          "Bonus points": "75000",
          "Rewards points per $ spent": "2",
          "Rewards points cap": "75,000"
    },
    howToApply: "You can apply for the American Express Explorer Credit Card online in just 10 minutes and receive a response within 60 seconds. Before you begin, make sure you meet the eligibility requirements and have the necessary details ready for the application:\n\nEligibility Criteria\nNew Amex Cardholder: To qualify for the 75,000 bonus points, apply online by 16 June 2026, be approved, and spend $4,000 on eligible purchases within the first 3 months. You must not currently hold or have held any American Express card issued by American Express Australia Limited in the past 18 months.\nCredit History: You need a good credit score, with no history of bad debt or payment defaults. If you're unsure of your credit score or what's on your file, you can request a free copy of your credit report via Finder.\nResidency: You must be an Australian citizen, permanent resident, or hold a valid long-term visa (12 months or more). Student visas are not eligible.\nAge: You must be at least 18 years old.\n\nRequired Documents\nPersonal Information: You'll need to provide your full name, date of birth, contact details, and address.\nIdentification: You may be asked to provide proof of identity, such as your driver's license or birth certificate.\nEmployment Details: This includes information about your current employer and their contact details.",
    ratesAndFees: "Annual fee: $395. Purchase interest rate: 23.99% p.a. Up to 55 days on purchases.",
    ratesSections: [
          {
                "title": "Annual Fee",
                "body": "The $395 annual fee for the American Express Explorer Credit Card is fully offset by the $400 Travel Credit when redeemed."
          },
          {
                "title": "Interest Rate",
                "body": "Purchases are subject to an interest rate of 23.99% p.a."
          },
          {
                "title": "Interest-Free Days",
                "body": "You can enjoy up to 55 interest-free days on purchases each statement period, provided you pay your balance in full by the due date, which can help minimize interest costs."
          },
          {
                "title": "Foreign Transaction Fee",
                "body": "A 3% fee will apply to transactions made overseas or with international retailers online."
          },
          {
                "title": "Additional Cards",
                "body": "You can request up to 4 additional cards at no extra cost, helping you earn points faster. The additional cardholder must be at least 18 years old, and you will be responsible for all charges and spending on the account."
          }
    ],
  },
  {
    slug: "westpac-altitude-rewards-black",
    name: "Westpac Altitude Rewards Black",
    company: "Westpac",
    interestRate: "20.99",
    bonusPoints: "200000",
    rewardPoints: "1.25",
    interestFree: "Up to 45 days on purchases",
    charges: "$200 first year ($295 after)",
    summary: "The Westpac Altitude Black is a premium credit card offering a strong earn rate of 1.25 Altitude Points per $1 spent on most eligible purchases in Australia, and between 2 and 6 points with select partners. Right now, you can earn 130,000 bonus points when you apply and spend $6,000 on eligible purchases within the first 120 days. Plus, you can earn an additional 50,000 points by making an eligible purchase in the second year, for a total of up to 180,000 bonus Altitude Rewards points. You can redeem your points for gift cards, travel, retail items, or transfer them to Velocity Frequent Flyer, Asia Miles, Air New Zealand Airpoints, and Singapore Airlines KrisFlyer. To explore the full range of rewards, you'll need to log in to the Altitude Rewards website. Other benefits include complimentary travel insurance, two free airport lounge visits per year, and complimentary standard Priority Pass membership. The card also offers a discounted first-year annual fee of $200. After the first year, the annual fee is $295, which is competitive for a black card. However, it's important to consider the cost and the value you'll gain from the rewards and features before applying.",
    summaryExtra: "The Westpac Altitude Black Card offers the highest earn rate of any Altitude Rewards credit card, with no points cap. New cardholders can earn up to 200,000 bonus Altitude Rewards Points (for example, 100,000 in year one when you spend $6,000 within 90 days of approval, plus further bonus points in year two per the current Westpac offer terms). You'll earn between 1.25 and 6 points per $1 on eligible spending, with the top earn rate for bookings made in Australia with Qantas, Jetstar, Singapore Airlines, and Emirates. The card also provides up to 45 interest-free days on new purchases when you pay the full balance listed on your statement by the due date.",
    pros: ["Up to 180,000 bonus Altitude Rewards Points","Discounted annual fee for the first year","Complimentary lounge passes","Complimentary overseas travel and purchase insurance"],
    cons: ["Up to 45 interest-free days on purchases, compared to other cards offering up to 55 days","Standard annual fee of $295, which is relatively high"],
    productDetails: {
          "Product Name": "Westpac Altitude Rewards Black",
          "Purchase rate p.a.": "20.99%",
          "Interest-free days": "Up to 45 days on purchases",
          "Annual fee": "$200 first year ($295 after)",
          "Bonus points": "200000",
          "Rewards points per $ spent": "1.25"
    },
    detailsProduct: {
          "Product Name": "Westpac Altitude Rewards Black",
          "Balance transfer rate p.a.": "N/A",
          "Balance transfer limit": "N/A",
          "Purchase rate p.a.": "20.99",
          "Interest-free days": "Up to 45 days on purchases",
          "Cash advance rate p.a.": "3%",
          "Min credit limit": "$15,000",
          "Card type": "Mastercard"
    },
    detailsFees: {
          "Annual fee": "$200 first year ($295 after)",
          "Minimum monthly repayment": "NIL",
          "Late payment fee": "$15",
          "Foreign currency conversion fee": "3%",
          "Cash advance fee": "3%",
          "Overseas cash advance fee": "3%",
          "Additional cardholder fee": "$0",
          "Number of additional cardholders": "1"
    },
    eligibility: {
          "Available to temporary residents": "No",
          "Minimum income": "$75,000",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "1.25",
          "Bonus points": "180000",
          "Rewards points per $ spent": "1.25",
          "Rewards points cap": "180,000"
    },
    howToApply: "You can apply for the Westpac Altitude Black Credit Card by completing a secure application on the bank's website. Before starting, ensure you meet the eligibility requirements and have all the necessary details and documents for your application.\n\nEligibility Criteria\nNew Cards Only: To qualify for the bonus points offer, you must not have held any of the following Westpac credit cards in the past 24 months: Altitude Classic, Altitude Platinum, Altitude Black, Earth Classic, Earth Platinum, Earth Platinum Plus, or Earth Black.\nIncome: You must earn at least $75,000 per year.\nResidency: You must be an Australian citizen or permanent resident currently living in Australia.\nAge: You must be at least 18 years old to apply.\n\nRequired Documents\nPersonal Details: Provide your full name, email address, residential address, date of birth, driver's license number, marital status, number of dependents, and contact number.\nEmployment Details: You'll need to include your current employment status, job title, salary, and employer's contact details. Recent payslips or bank statements are required to verify your income. If you're self-employed, provide your accountant's contact details and supporting documents like recent tax assessment notices.\nFinancial Details: Include any other income sources (e.g., government payments or pensions), as well as details of assets like savings. You'll also need to disclose existing debts, loans, and credit cards, along with an estimate of your regular household expenses.",
    ratesAndFees: "Annual fee: $200 first year ($295 after). Purchase interest rate: 20.99% p.a. Up to 45 days on purchases.",
    ratesSections: [
          {
                "title": "Annual Fee",
                "body": "This card has a standard annual fee of $295 p.a. (outside of any promotions). Be sure to consider this fee against the value you'll receive from earning rewards and using additional perks, such as airport lounge access and complimentary insurance."
          },
          {
                "title": "Purchase Interest Rate",
                "body": "The variable interest rate on purchases is 20.99% p.a."
          },
          {
                "title": "Interest-Free Period",
                "body": "You can enjoy up to 45 interest-free days on new purchases when you pay your full monthly payment balance (as listed on your statement) by the due date. Please note that these interest-free days do not apply to any longer-term interest rate promotions, and the monthly payment balance excludes any existing balance transfers."
          },
          {
                "title": "Cash Advance Rate",
                "body": "The variable interest rate on cash advances and cash-equivalent transactions is 21.99% p.a."
          },
          {
                "title": "Credit Limit",
                "body": "The minimum credit limit for this card is $15,000."
          },
          {
                "title": "Foreign Transaction Fee",
                "body": "A 3% foreign conversion fee applies to purchases made with international retailers."
          }
    ],
  },
  {
    slug: "anz-business-black",
    name: "ANZ Business Black",
    company: "ANZ",
    interestRate: "20.24",
    bonusPoints: "100000",
    rewardPoints: "1.5",
    interestFree: "Up to 55 days on purchases",
    charges: "$375",
    summary: "The ANZ Business Black Credit Card is ideal for businesses looking to earn rewards while managing expenses. It comes with a minimum credit limit of $5,000 and offers up to 1.5 ANZ Reward Points per $1 spent on eligible purchases. Currently, you can earn up to 150,000 bonus ANZ Reward Points with this card. You'll receive 100,000 bonus points when you apply for a new ANZ Business Black Card and spend $6,000 on eligible purchases within the first 3 months of approval. An additional 50,000 bonus points are awarded if you keep the card open for at least 15 months. To put the value in perspective, 150,000 ANZ Reward Points could be redeemed for more than $500 in digital gift cards or converted to 75,000 Velocity Frequent Flyer Points. Keep in mind the card has a $300 annual fee, plus a $75 annual rewards fee for each card linked to the account—so if you're planning to issue cards to employees, be sure to consider those additional costs.",
    summaryExtra: "The ANZ Business Black is a premium credit card designed for business owners, offering unlimited rewards, complimentary international travel insurance, and access to ANZ Global Business Concierge. New eligible businesses can earn 100,000 bonus ANZ Business Reward Points when you spend $6,000 on eligible purchases within the first 3 months of approval (terms apply; see ANZ Business Rewards Program Terms and Conditions). You can redeem points for gift cards, retail products, and more, or transfer to Velocity, Air New Zealand Airpoints, Asia Miles, and KrisFlyer. The card also provides data feeds for Xero, MYOB, and Intuit QuickBooks. Account fees include a $300 annual card fee plus a $75 annual rewards program fee per card on the account.",
    pros: ["Earn up to 150,000 bonus ANZ Reward Points","Get up to 1.5 ANZ Reward Points for every $1 spent on eligible purchases","Enjoy access to the ANZ 24/7 Global Business Concierge service"],
    cons: ["$75 annual rewards fee for each card linked to the account","No introductory offers on purchases or balance transfers"],
    productDetails: {
          "Product Name": "ANZ Business Black",
          "Purchase rate p.a.": "20.24%",
          "Interest-free days": "Up to 55 days on purchases",
          "Annual fee": "$375",
          "Bonus points": "100000",
          "Rewards points per $ spent": "1.5"
    },
    detailsProduct: {
          "Product Name": "ANZ Business Black",
          "Balance transfer rate p.a.": "N/A",
          "Balance transfer limit": "N/A",
          "Purchase rate p.a.": "20.24",
          "Interest-free days": "Up to 55 days on purchases",
          "Cash advance rate p.a.": "1.5% or $1.50, whichever is greater",
          "Min credit limit": "$5,000",
          "Card type": "Visa"
    },
    detailsFees: {
          "Annual fee": "$375",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$35",
          "Foreign currency conversion fee": "3%",
          "Cash advance fee": "1.5% or $1.50, whichever is greater",
          "Overseas cash advance fee": "1.5% or $1.50, whichever is greater",
          "Additional cardholder fee": "$0",
          "Number of additional cardholders": "0"
    },
    eligibility: {
          "Available to temporary residents": "No",
          "Minimum income": "N/A",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "1.5",
          "Bonus points": "150000",
          "Rewards points per $ spent": "1.5",
          "Rewards points cap": "150,000"
    },
    howToApply: "You can apply for the ANZ Business Black Card online in about 20 minutes via ANZ GoBiz. To use this option, you'll need to link your accounting software (Xero, MYOB, or Intuit QuickBooks). Alternatively, you can request a callback through the ANZ website. Before applying, make sure you and your business meet the eligibility criteria and have the necessary information ready to complete the application:\n\nEligibility Criteria\nNew Cardholder: To be eligible for the reward points offer, you must not currently hold or have held an ANZ Qantas Business Rewards or ANZ Business Black card within the last 12 months.\nABN and ACN: You must have a valid Australian Business Number (ABN) and Australian Company Number (ACN) to apply.\nBusiness Use: The card must be used for business purposes. The applicant must be authorised to open an account on behalf of the business.\nResidency: At least one director, partner, or proprietor applying for the account must be a permanent Australian resident.\nAge: You must be at least 18 years old.\nANZ GoBiz Application Requirements: If applying through ANZ GoBiz, you need to have been operating under the same ABN or ACN for at least 6 months, have 6 months of reconciled financial data in Australian dollars, and be registered for GST if your business turnover is at least $75,000 annually. Your annual turnover should not exceed $10 million.\n\nRequired Documents\nPersonal Information: You'll need to provide personal details for each applicant, including any additional cardholders. This includes your full name, date of birth, address, contact information, and proof of identity.\nBusiness Details: This includes the business name, address, and contact details.\nFinancial Information: You may need to provide information about your ongoing expenses, assets, liabilities, and any other sources of income.",
    ratesAndFees: "Annual fee: $375. Purchase interest rate: 20.24% p.a. Up to 55 days on purchases.",
    ratesSections: [
          {
                "title": "Annual Fee",
                "body": "This card comes with a $300 annual fee, plus a $75 annual rewards fee for each card linked to the account."
          },
          {
                "title": "Purchase Interest Rate",
                "body": "The interest rate on purchases is 20.24% p.a."
          },
          {
                "title": "Interest-Free Days",
                "body": "Enjoy up to 55 interest-free days on purchases when you pay the full balance on your statement by the due date."
          },
          {
                "title": "Cash Advances",
                "body": "Cash advances, such as ATM withdrawals, will incur an interest rate of 21.74% p.a."
          },
          {
                "title": "Minimum Credit Limit",
                "body": "The minimum credit limit for this card is $5,000."
          }
    ],
  },
  {
    slug: "david-jones-prestige-credit-card",
    name: "David Jones Prestige Credit Card",
    company: "David Jones",
    interestRate: "23.99",
    bonusPoints: "0",
    rewardPoints: "1",
    interestFree: "Up to 55 days on purchases",
    charges: "$295",
    summary: "The David Jones Prestige Credit Card is designed for frequent shoppers and high spenders at David Jones, offering rewards on eligible purchases along with exclusive in-store perks. It currently comes with a generous introductory offer of 60,000 bonus points, adding significant value. To qualify, you must be a new applicant, apply by 12 April 2025, get approved, and spend at least $3,000 on eligible purchases within the first 90 days. For context, 60,000 David Jones Points can be redeemed for around $300 in gift cards.",
    summaryExtra: "The David Jones Prestige Credit Card (issued by Latitude Financial) earns David Jones Points on everyday spending: 4 points per $1 at David Jones, 3 points per $1 at participating supermarkets and petrol stations, and 1 point per $1 elsewhere. There is no current sign-up bonus points offer on the issuer product page; promotional value may include a $0 annual fee in the first year when you are approved and use the card within 90 days (reverts to $295 p.a.), and from time to time introductory purchase rate promotions such as 0% p.a. on eligible purchases for 6 months (check davidjones.com/latitude for current dates). Premium perks include complimentary gift wrapping, in-store alterations, two Priority Pass lounge visits per year, comprehensive travel insurance when you pay for eligible trips on the card, and styling benefits.",
    pros: ["Earn up to 4 David Jones Points per $1 at David Jones","Complimentary Priority Pass lounge visits and travel insurance","Premium David Jones shopping benefits including alterations and gift wrapping","Additional cardholder at no extra cost"],
    cons: ["$295 annual fee after any first-year waiver promotion","3% international transaction fee on foreign currency purchases"],
    productDetails: {
          "Product Name": "David Jones Prestige Credit Card",
          "Purchase rate p.a.": "23.99%",
          "Interest-free days": "Up to 55 days on purchases",
          "Annual fee": "$295",
          "Bonus points": "0",
          "Rewards points per $ spent": "1"
    },
    detailsProduct: {
          "Product Name": "David Jones Prestige Credit Card",
          "Balance transfer rate p.a.": "N/A",
          "Balance transfer limit": "N/A",
          "Purchase rate p.a.": "23.99",
          "Interest-free days": "Up to 55 days on purchases",
          "Cash advance rate p.a.": "3% or $3, whichever is greater",
          "Min credit limit": "$6,000",
          "Card type": "Mastercard"
    },
    detailsFees: {
          "Annual fee": "$295",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$35",
          "Foreign currency conversion fee": "3%",
          "Cash advance fee": "3% or $3, whichever is greater",
          "Overseas cash advance fee": "N/A",
          "Additional cardholder fee": "$0",
          "Number of additional cardholders": "1"
    },
    eligibility: {
          "Available to temporary residents": "Yes with conditions",
          "Minimum income": "N/A",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "1",
          "Bonus points": "60000",
          "Rewards points per $ spent": "1",
          "Rewards points cap": "60000"
    },
    howToApply: "You can apply for the David Jones Prestige Credit Card online via David Jones or Latitude Financial. Before starting, make sure you meet the eligibility requirements and have all the necessary documents ready.\n\nEligibility criteria\nResidency: You must be an Australian resident or a temporary resident with legal working rights in Australia and plans to stay for at least the next 12 months.\nAge: Applicants must be at least 18 years old.\nCredit history: You should have a clear credit record with no history of bad debts or defaults.\n\nRequired documents\nPersonal details: Include your full name, contact information, and proof of identity, such as an Australian driver's licence, Medicare card, or passport.\nFinancial details: Be ready to provide details about your income, savings, assets, and any existing debts or credit accounts. You'll also need to estimate your ongoing household expenses.",
    ratesAndFees: "Annual fee: $295. Purchase interest rate: 23.99% p.a. Up to 55 days on purchases.",
    ratesSections: [
          {
                "title": "Annual fee",
                "body": "The David Jones Prestige Credit Card comes with a $295 annual fee."
          },
          {
                "title": "Interest rates",
                "body": "Purchases attract a 23.99% p.a. interest rate, while cash advances are charged at 24.99% p.a."
          },
          {
                "title": "Interest-free days",
                "body": "Enjoy up to 55 interest-free days on everyday purchases when you pay your full closing balance by the due date."
          },
          {
                "title": "Minimum credit limit",
                "body": "This card has a minimum credit limit of $6,000."
          },
          {
                "title": "Additional cardholder",
                "body": "You can add an extra cardholder at no cost, as long as they are at least 16 years old."
          },
          {
                "title": "International transaction fee",
                "body": "A 3% fee applies to any overseas or foreign currency transactions, including online purchases."
          }
    ],
  },
  {
    slug: "nab-rewards-platinum-card",
    name: "NAB Rewards Platinum Card",
    company: "NAB",
    interestRate: "20.99",
    bonusPoints: "100000",
    rewardPoints: "1",
    interestFree: "Up to 44 days on purchases",
    charges: "$195",
    summary: "The NAB Rewards Platinum card is ideal for those who want to earn rewards on their spending while enjoying the flexibility of bank reward points. Currently, you can earn 80,000 bonus NAB Rewards Points by spending at least $1,000 on everyday purchases within the first 60 days of opening your account. Plus, you'll receive an additional 20,000 points when you keep your card open for over 12 months. If you maximize the 100,000 bonus points, you could redeem them for $480 in gift cards or transfer them for 50,000 Velocity Points to use for frequent flyer rewards.",
    summaryExtra: "The NAB Rewards Platinum Credit Card provides 24/7 concierge services to assist with travel planning, entertainment bookings, gift purchases, and more, helping you save time. Additionally, you can enjoy up to 44 interest-free days on purchases by paying your full statement balance by the due date. If not paid in full, a variable purchase rate of 20.99% p.a. will apply.",
    pros: ["Up to 100,000 bonus NAB Rewards Points","Earn an extra 0.5 NAB Rewards Points per $1 spent at eligible grocery stores","Enjoy Visa Premium Access and 24/7 access to NAB Platinum Concierge Services","0% p.a. interest rate on balance transfers for the first 12 months"],
    cons: ["To earn all the bonus points, you must keep the card for at least 12 months, which means you'll be required to pay the annual fee for the second year.","3.5% international transaction fee","Balance transfer offer includes a 3% fee"],
    productDetails: {
          "Product Name": "NAB Rewards Platinum Card",
          "Purchase rate p.a.": "20.99%",
          "Interest-free days": "Up to 44 days on purchases",
          "Annual fee": "$195",
          "Bonus points": "100000",
          "Rewards points per $ spent": "1"
    },
    detailsProduct: {
          "Product Name": "NAB Rewards Platinum Card",
          "Balance transfer rate p.a.": "0% for 12 months with 3% balance transfer fee, then 21.74%",
          "Balance transfer limit": "90% of available limit",
          "Purchase rate p.a.": "20.99",
          "Interest-free days": "Up to 44 days on purchases",
          "Cash advance rate p.a.": "3% or $3, whichever is greater",
          "Min credit limit": "$6,000",
          "Card type": "Visa"
    },
    detailsFees: {
          "Annual fee": "$195",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$15",
          "Foreign currency conversion fee": "3.5%",
          "Cash advance fee": "3% or $3, whichever is greater",
          "Overseas cash advance fee": "$5",
          "Additional cardholder fee": "$0",
          "Number of additional cardholders": "1"
    },
    eligibility: {
          "Available to temporary residents": "Yes with conditions",
          "Minimum income": "N/A",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "1",
          "Bonus points": "100000",
          "Rewards points per $ spent": "1",
          "Rewards points cap": "1"
    },
    howToApply: "You can apply for the NAB Rewards Platinum card online in approximately 15 minutes and receive a response within around 60 seconds. Before you begin, ensure you meet the eligibility requirements and have all the necessary documents ready to complete the application.\n\nEligibility Criteria\nNew customer: The bonus points offer is only available to new NAB customers, meaning you cannot currently hold or have held a NAB Rewards card in the past 18 months.\nResidency: You must be an Australian citizen or permanent resident. If you're not a citizen or permanent resident, you must hold an acceptable visa. Some visas are not accepted, including Visitor, Working Holiday, Student, Exchange, Transit, Seasonal, and certain Bridging visas (except Special Category Visa for NZ citizens).\nEligible balance transfer debt: You can transfer up to 90% of your approved credit limit from non-NAB accounts.\nAge: You must be at least 18 years old to apply.\n\nRequired Documents\nPersonal information: Provide your full name, date of birth, marital status, residential address, email address, and contact number. You will also need to provide identification, such as your driver's license number.\nEmployment details: This includes your employer's name and contact details, your role, and the duration of your employment. You may need to provide your salary details and submit recent payslips or bank statements.\nFinancial information: In addition to your income, include details of any assets (such as savings, shares, or investments) and information on existing credit cards, loans, debts, and regular financial responsibilities (like groceries and fuel).\nBalance transfer details: If you're transferring a balance, include the amount to be transferred and the details of the previous account.",
    ratesAndFees: "Annual fee: $195. Purchase interest rate: 20.99% p.a. Up to 44 days on purchases.",
    ratesSections: [
          {
                "title": "Annual fee",
                "body": "$195 per year."
          },
          {
                "title": "Purchase rate",
                "body": "20.99% p.a. variable interest rate on purchases."
          },
          {
                "title": "Interest-free days",
                "body": "Up to 44 interest-free days on purchases when you pay your balance in full by the due date, or the interest-free days amount shown on your statement."
          },
          {
                "title": "Cash advance rate",
                "body": "21.74% p.a. variable interest rate on cash advances."
          },
          {
                "title": "Cash advance fee",
                "body": "A fee of 3% or $3 (whichever is greater) applies for cash withdrawals or other cash equivalent transactions."
          },
          {
                "title": "Credit limits",
                "body": "The minimum credit limit is $6,000, with a maximum limit of $30,000."
          },
          {
                "title": "International transaction fee",
                "body": "A 3.5% fee applies to foreign currency transactions, such as shopping overseas or with international merchants online."
          }
    ],
  },
  {
    slug: "virgin-money-anytime-rewards-credit-card-",
    name: "Virgin Money Anytime Rewards Credit Card",
    company: "Virgin Money",
    interestRate: "19.99",
    bonusPoints: "0",
    rewardPoints: "1",
    interestFree: "Up to 55 days on purchases",
    charges: "$149",
    summary: "This credit card features a competitive balance transfer offer with an extended balance transfer period while allowing you to earn Virgin Money Points on your spending. There’s no cap on the points you can accumulate, and the annual fee remains reasonable. Keep in mind that this card earns Virgin Money Points, not Velocity Points. However, you can redeem your Virgin Money Points for Velocity Points. Also, note that while you have a balance transfer, interest-free days on purchases are not available.",
    summaryExtra: "The Virgin Money Anytime Rewards Credit Card earns 1 uncapped Virgin Money Point per $1 on eligible transactions, redeemable for cashback, gift cards, and partner rewards through the Virgin Money Rewards program. Standard pricing on the issuer site is a $149 annual fee, 19.99% p.a. purchase rate, 20.99% p.a. cash advance rate, up to 55 interest-free days on retail purchases when you pay in full, and a minimum credit limit of $6,000. Note: Virgin Money states that new credit card applications are currently unavailable on its website; existing cardholders retain access to rewards and account services.",
    pros: ["Enjoy a 0% p.a. interest rate on balance transfers for the first 24 months.","Earn 1 Virgin Money Point per $1 spent on eligible purchases, with no cap.","Access the Visa Platinum Concierge Service for premium assistance."],
    cons: ["A one-time 1% fee applies to balance transfers.","High 20.99% p.a. interest rate on balance transfers after the introductory period.","Does not include complimentary international travel insurance."],
    productDetails: {
          "Product Name": "Virgin Money Anytime Rewards Credit Card",
          "Purchase rate p.a.": "19.99%",
          "Interest-free days": "Up to 55 days on purchases",
          "Annual fee": "$149",
          "Bonus points": "0",
          "Rewards points per $ spent": "1"
    },
    detailsProduct: {
          "Product Name": "Virgin Money Anytime Rewards Credit Card",
          "Balance transfer rate p.a.": "0% for 24 months with 1% balance transfer fee, then 20.99%",
          "Balance transfer limit": "80% of available limit",
          "Purchase rate p.a.": "19.99",
          "Interest-free days": "Up to 55 days on purchases",
          "Cash advance rate p.a.": "20.99",
          "Min credit limit": "$6,000",
          "Card type": "Visa"
    },
    detailsFees: {
          "Annual fee": "$149",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$30",
          "Foreign currency conversion fee": "3.3%",
          "Cash advance fee": "2.7% or $2.70, whichever is greater",
          "Overseas cash advance fee": "$5",
          "Additional cardholder fee": "$0",
          "Number of additional cardholders": "4"
    },
    eligibility: {
          "Available to temporary residents": "No",
          "Minimum income": "$35,000",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "1",
          "Bonus points": "0",
          "Rewards points per $ spent": "1",
          "Rewards points cap": "1"
    },
    howToApply: "Applications for new Virgin Money credit cards are currently unavailable on virginmoney.com.au (as stated on the issuer site). Existing cardholders can manage accounts via the Virgin Money app or by calling 13 37 39.\n\nWhen applications reopen, typical eligibility includes:\n\nEligibility Criteria\nResidency: Australian citizens or permanent residents.\nAge: At least 18 years old.\nMinimum income: Income requirements apply per Virgin Money's credit assessment.\nCredit history: A satisfactory credit history is required.\n\nRequired Documents\nPersonal details: Full name, contact details, residential address, date of birth, and government-issued ID.\nEmployment and financial details: Income, employer information, assets, liabilities, and living expenses as requested in the application form.",
    ratesAndFees: "Annual fee: $149. Purchase interest rate: 19.99% p.a. Up to 55 days on purchases.",
    ratesSections: [
          {
                "title": "Annual fee",
                "body": "$149 per year."
          },
          {
                "title": "Purchase rate",
                "body": "19.99% p.a., which is lower than the average standard rate reported by the Reserve Bank of Australia."
          },
          {
                "title": "Cash advance rate",
                "body": "20.99% p.a. for cash advances."
          },
          {
                "title": "Interest-free period",
                "body": "Up to 55 days interest-free on purchases when the balance is paid in full each month. However, interest applies to retail purchases if you have an active balance transfer."
          },
          {
                "title": "Minimum credit limit",
                "body": "Starts at $6,000."
          }
    ],
  },
  {
    slug: "coles-rewards-mastercard",
    name: "Coles Rewards Mastercard",
    company: "Coles",
    interestRate: "20.74",
    bonusPoints: "0",
    rewardPoints: "2",
    interestFree: "Up to 44 days on purchases",
    charges: "$99",
    summary: "The Coles Rewards Mastercard offers one of the highest earning rates among Flybuys-linked cards, allowing you to earn up to 2 points per $1 on eligible purchases. For instance, you can redeem 2,000 Flybuys points for $10 off at partnered stores or 1,000 Velocity Points for frequent flyer rewards. Currently, when you apply for a new Coles Rewards Mastercard by 30 June 2026, are approved, and spend $3,000 on eligible retail purchases within 90 days of approval, you'll receive a $250 Coles gift card by email (terms and conditions apply; not available when closing or transferring from another Coles-branded credit card).",
    pros: ["Get 10% off your Coles shop every month (up to $50 in savings)","Earn 2 Flybuys points per $1 on eligible purchases up to $3,000 per statement period, then 1 point per $1 on purchases up to $8,000 per statement period."],
    cons: ["Does not include complimentary travel insurance, unlike some other rewards cards","Imposes a 3% foreign transaction fee","Standard interest rates are relatively high"],
    productDetails: {
          "Product Name": "Coles Rewards Mastercard",
          "Purchase rate p.a.": "20.74%",
          "Interest-free days": "Up to 44 days on purchases",
          "Annual fee": "$99",
          "Bonus points": "0",
          "Rewards points per $ spent": "2"
    },
    detailsProduct: {
          "Product Name": "Coles Rewards Mastercard",
          "Balance transfer rate p.a.": "N/A",
          "Balance transfer limit": "80% of available limit",
          "Purchase rate p.a.": "20.74",
          "Interest-free days": "Up to 44 days on purchases",
          "Cash advance rate p.a.": "20.74%",
          "Min credit limit": "$1,000",
          "Card type": "Mastercard"
    },
    detailsFees: {
          "Annual fee": "$99",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$30",
          "Foreign currency conversion fee": "3%",
          "Cash advance fee": "3% or $1.95, whichever is greater",
          "Overseas cash advance fee": "$5 + 2.5% of transaction amount",
          "Additional cardholder fee": "$0",
          "Number of additional cardholders": "4"
    },
    eligibility: {
          "Available to temporary residents": "No",
          "Minimum income": "N/A",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "2",
          "Bonus points": "0",
          "Rewards points per $ spent": "2",
          "Rewards points cap": "11,000"
    },
    howToApply: "You can apply for the Coles Rewards Mastercard online and receive a response within 60 seconds. Before applying, ensure you meet the eligibility criteria and have the required information ready to complete the application.\n\nEligibility Criteria\nNew cardholder: To qualify for the introductory offer, you must apply for a new Coles Rewards Mastercard and join as a new Coles Plus Saver member.\nBalance transfer: You can transfer up to 80% of your available credit limit if you wish to transfer a balance.\nResidency: This card is available to permanent Australian residents.\nCredit history: A good credit score is required for approval.\nAge requirement: Applicants must be at least 18 years old.\n\nRequired Documents\nPersonal details: Full name, date of birth, contact information, residential address, and number of dependents.\nProof of identification: Verification with a valid ID, such as an Australian driver's licence or passport.\nIncome details: Confirmation of annual income, along with your employer's name, address, and phone number.\nFinancial information: A breakdown of assets (e.g., savings, property, superannuation) and liabilities (e.g., existing debts and credit limits).\nFlybuys membership: If you're an existing member, include your Flybuys membership number. If not, you will be automatically enrolled when you apply.\nBalance transfer details: If transferring a balance, provide the total debt amount, account name and number, and the BSB of the institution holding the debt.",
    ratesAndFees: "Annual fee: $99. Purchase interest rate: 20.74% p.a. Up to 44 days on purchases.",
    ratesSections: [
          {
                "title": "Annual fee",
                "body": "This card has a $99 annual fee, which is competitive for a rewards credit card."
          },
          {
                "title": "Interest rates",
                "body": "A standard rate of 20.74% p.a. applies to purchases, balance transfers, and cash advances."
          },
          {
                "title": "Interest-free period",
                "body": "Enjoy up to 44 days interest-free on retail purchases when you pay the full outstanding balance (including any balance transfers) by the statement due date. Note that interest-free days do not apply to cash advances, balance transfers, special promotions, or account fees and charges."
          },
          {
                "title": "International transaction fees",
                "body": "A 3% fee applies to international transactions, including purchases made overseas or online with international merchants."
          }
    ],
  },
  {
    slug: "westpac-altitude-qantas-black",
    name: "Westpac Altitude Qantas Black",
    company: "Westpac",
    interestRate: "20.99",
    bonusPoints: "150000",
    rewardPoints: "0.75",
    interestFree: "Up to 45 days on purchases",
    charges: "$370",
    summary: "The Westpac Altitude Qantas Black Credit Card is a premium frequent flyer card offering one of the largest bonus point promotions available. New customers can earn 90,000 bonus Qantas Points by spending $6,000 on eligible purchases within the first 120 days. Additionally, you’ll receive 30,000 more points after making your first eligible purchase in the second year, bringing the total to 120,000 bonus points. This is enough for a return economy flight from Sydney to London (110,400 Qantas Points plus taxes and fees) or a one-way business class flight from Melbourne to Los Angeles (108,400 points plus taxes and fees). Note that the combined annual fee of $370 and rewards fee must be paid twice to earn all the points. However, if you’re already a Westpac customer, you can take advantage of a discounted annual fee of $225 (including a $75 rewards fee) for the first year.",
    summaryExtra: "The Westpac Altitude Qantas Black offers up to 150,000 bonus Qantas Points for new cardholders (offer commenced 1 May 2026): 90,000 bonus points when you spend $6,000 on eligible purchases within 90 days of approval, plus 60,000 bonus points in your second year when you spend $6,000 within 90 days of your account anniversary. It also provides complimentary overseas travel insurance, two Qantas Club lounge invitations each year, airport lounge passes, and additional insurance coverage.",
    pros: ["Earn up to 150,000 bonus Qantas Points","Includes complimentary insurance coverage and airport lounge passes","Accumulate 0.75 Qantas Points for every $1 spent","$200 first-year card fee for existing Westpac customers (reverts to $295 p.a.; $75 annual Qantas Rewards fee still applies)"],
    cons: ["Offers up to 45 days interest-free on purchases, which is less than some other cards that provide up to 55 days","Comes with a higher annual fee of $370 per year (including a $75 Qantas Rewards fee)"],
    productDetails: {
          "Product Name": "Westpac Altitude Qantas Black",
          "Purchase rate p.a.": "20.99%",
          "Interest-free days": "Up to 45 days on purchases",
          "Annual fee": "$370",
          "Bonus points": "150000",
          "Rewards points per $ spent": "0.75"
    },
    detailsProduct: {
          "Product Name": "Westpac Altitude Qantas Black",
          "Balance transfer rate p.a.": "N/A",
          "Balance transfer limit": "N/A",
          "Purchase rate p.a.": "20.99",
          "Interest-free days": "Up to 45 days on purchases",
          "Cash advance rate p.a.": "3%",
          "Min credit limit": "$15,000",
          "Card type": "Mastercard"
    },
    detailsFees: {
          "Annual fee": "$370",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$15",
          "Foreign currency conversion fee": "3%",
          "Cash advance fee": "3%",
          "Overseas cash advance fee": "N/A",
          "Additional cardholder fee": "$0",
          "Number of additional cardholders": "1"
    },
    eligibility: {
          "Available to temporary residents": "Yes with conditions",
          "Minimum income": "$75,000",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "0.75",
          "Bonus points": "120000",
          "Rewards points per $ spent": "0.75",
          "Rewards points cap": "120,000"
    },
    howToApply: "You can apply for the Westpac Altitude Qantas Black card by completing a secure application on the bank's website. Before you begin, ensure you meet the eligibility requirements and have the necessary information ready to complete the application.\n\nEligibility Criteria\nNew cardholder: This bonus points offer is available only to new Westpac Altitude customers. If you've held an Altitude Platinum or Altitude Black card with Altitude Rewards, Qantas, or Velocity in the last 24 months, you won't be eligible.\nMinimum income: You must earn at least $75,000 annually.\nResidency: You must be an Australian citizen or permanent resident, or hold a valid visa with at least 1 year remaining before expiry.\nCredit history: You must have a good credit score to apply.\nAge: You must be at least 18 years old to apply.\nExisting customers: To qualify for the discounted first-year annual fee, you must be an existing Westpac customer.\n\nRequired Documents\nPersonal information: This includes your full name, date of birth, number of dependents, and contact details. You will also need to provide a valid ID, such as your Australian driver's license, Medicare card, or Australian passport.\nEmployment details: This includes your employment status, salary, and employer contact information. You will need to provide recent payslips or bank statements, along with your most recent ATO tax assessment notice if you are self-employed.\nFinancial details: This covers any additional sources of income, existing loans, credit cards, and other financial obligations. You will also need to provide an estimate of your share of household spending on essentials.\nFrequent flyer number: You'll need to provide your Qantas Frequent Flyer number to ensure your points are credited to your account.",
    ratesAndFees: "Annual fee: $370. Purchase interest rate: 20.99% p.a. Up to 45 days on purchases.",
    ratesSections: [
          {
                "title": "Annual Fee",
                "body": "The Westpac Altitude Qantas Black Credit Card comes with an annual fee of $370, which includes a $295 standard fee and a $75 yearly rewards fee for earning Qantas Points."
          },
          {
                "title": "Purchase Interest Rate",
                "body": "The card has a variable purchase interest rate of 20.99% p.a., which is around the average rate for credit cards in Australia."
          },
          {
                "title": "Cash Advances",
                "body": "If you use this card to withdraw cash or for other cash advances, a fee of 3% of the cash advance amount will apply, along with a cash advance interest rate of 21.99% p.a. Cash advances are not eligible for any interest-free period."
          },
          {
                "title": "Interest-Free Period",
                "body": "You can enjoy up to 45 days of interest-free on new purchases if you pay the full monthly balance by the due date listed on your statement. Note that this interest-free period does not apply to balance transfers or any longer-term promotional interest rates."
          }
    ],
  },
  {
    slug: "anz-rewards-black-credit-card",
    name: "ANZ Rewards Black Credit Card",
    company: "ANZ",
    interestRate: "20.99",
    bonusPoints: "180000",
    rewardPoints: "2",
    interestFree: "Up to 44 days on purchases",
    charges: "$375",
    summary: "The ANZ Rewards Black offers the highest points-earning rate among ANZ Rewards cards, earning 2 Reward Points per $1 spent on eligible purchases for the first $5,000 per statement period, then 1 point per $1 thereafter. For example, with the 160,000 bonus points offer, you could redeem points for $700+ worth of digital gift cards or transfer them for 80,000 Velocity Points—enough for a one-way business class flight from Sydney to Honolulu (71,500 Velocity Points, plus applicable fees and taxes). Beyond Velocity, the ANZ Rewards program allows you to transfer points to Air New Zealand Airpoints, Singapore Airlines KrisFlyer, or Asia Miles. Alternatively, you can redeem points for statement credits or retail items. This card also includes complimentary insurance options, covering both international and domestic travel. However, it's important to consider whether these benefits provide enough value to offset the card’s costs.",
    summaryExtra: "The ANZ Rewards Black is a premium credit card designed for high spenders and frequent earners. As a new customer, you can earn up to 180,000 bonus ANZ Reward Points (130,000 when you spend $5,000 in the first 3 months, plus $100 cashback, plus 50,000 more after 15 months when you keep the card open and meet ongoing criteria).\n\nThis card offers a high earn rate, giving you 2 ANZ Reward Points per $1 spent on eligible purchases up to $5,000 per statement period, then 1 point per $1 thereafter.\n\nWith benefits like complimentary purchase and travel insurance and a 24/7 personal concierge service, the card's perks can help offset the annual fee—but only if you take full advantage of them.",
    pros: ["Earn up to 180,000 bonus ANZ Reward Points","Receive $100 cashback on your new card","Earn up to 2 ANZ Reward Points per $1 spent","Enjoy complimentary perks, including travel insurance and a personal concierge","Rated 9.34 in the rewards category by Finder"],
    cons: ["Relatively high annual fee of $375 per year","3% foreign transaction fee on international purchases","$65 fee per additional cardholder"],
    productDetails: {
          "Product Name": "ANZ Rewards Black Credit Card",
          "Purchase rate p.a.": "20.99%",
          "Interest-free days": "Up to 44 days on purchases",
          "Annual fee": "$375",
          "Bonus points": "180000",
          "Rewards points per $ spent": "2"
    },
    detailsProduct: {
          "Product Name": "ANZ Rewards Black Credit Card",
          "Balance transfer rate p.a.": "21.99%",
          "Balance transfer limit": "95% of available limit",
          "Purchase rate p.a.": "20.99",
          "Interest-free days": "Up to 44 days on purchases",
          "Cash advance rate p.a.": "3% or $3, whichever is greater",
          "Min credit limit": "$15,000",
          "Card type": "Visa"
    },
    detailsFees: {
          "Annual fee": "$375",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$20",
          "Foreign currency conversion fee": "3%",
          "Cash advance fee": "3% or $3, whichever is greater",
          "Overseas cash advance fee": "3% of the transaction amount or $4 (whichever is greater)",
          "Additional cardholder fee": "$65",
          "Number of additional cardholders": "9"
    },
    eligibility: {
          "Available to temporary residents": "Yes with conditions",
          "Minimum income": "N/A",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "2",
          "Bonus points": "180,000",
          "Rewards points per $ spent": "2",
          "Rewards points cap": "N/A"
    },
    howToApply: "If you've compared your options and decided on the ANZ Rewards Black, you can apply online in about 20 minutes. Before you begin, ensure you meet the eligibility criteria and have the necessary documents ready for the application.\n\nEligibility Criteria\nNew Cardholder: To qualify for the bonus points offer, you must be a new ANZ Rewards customer. This means you must not currently hold or have opened or closed an ANZ Rewards Black, ANZ Rewards Platinum, or ANZ Rewards credit card in the last 12 months.\nResidency Requirement: Australian citizens and permanent residents can apply. Non-permanent residents must have at least 12 months remaining on an eligible working or business visa.\nEligible Balance Transfer Debt: ANZ allows you to transfer amounts between $100 and 95% of your approved credit limit from non-ANZ credit or store cards.\nAge: Applicants must be at least 18 years old.\nCredit History: A good credit rating is required for approval. You can check your credit score and report for free through Finder.\n\nRequired Documents\nPersonal Details: Provide your full name, email address, residential address, date of birth, marital status, number of dependents, and contact number. You'll also need a valid form of ID, such as a driver's licence number or passport.\nEmployment Details: Include your job title, years of employment, salary details, and employer's contact information. If you are self-employed, provide details of your work and your accountant's contact details. You may need to submit recent payslips or tax assessment notices as proof.\nFinancial Details: Disclose other income sources (e.g., superannuation or savings), along with details of investments, debts, existing credit accounts, and loans. You'll also need to estimate regular household expenses, including rent or mortgage payments, bills, and groceries.",
    ratesAndFees: "Annual fee: $375. Purchase interest rate: 20.99% p.a. Up to 44 days on purchases.",
    ratesSections: [
          {
                "title": "Annual Fee",
                "body": "A total of $375 per year, which includes: $320 Annual Account Fee $55 Rewards Program Service Fee"
          },
          {
                "title": "Purchase Interest Rate",
                "body": "A 20.99% p.a. interest rate applies to purchases if the balance is not paid in full by the statement due date."
          },
          {
                "title": "Interest-Free Days",
                "body": "Get up to 44 interest-free days on purchases when you pay your closing account balance in full by the due date. If you have balance transfer plans, instalment plans, or buy now, pay later plans, you must pay the Adjusted Closing Balance (closing balance minus promotional plans) to be eligible for interest-free days."
          },
          {
                "title": "Foreign Transaction Fee",
                "body": "A 3% fee applies to transactions made overseas or with international online merchants."
          },
          {
                "title": "Additional Cardholders",
                "body": "Add up to 9 additional cardholders for a fee of $65 per cardholder."
          }
    ],
  },
  {
    slug: "nab-rewards-platinum-card-velocity-points",
    name: "NAB Rewards Platinum Card – Velocity Points",
    company: "NAB",
    interestRate: "20.99",
    bonusPoints: "90000",
    rewardPoints: "1",
    interestFree: "Up to 44 days on purchases",
    charges: "$95 first year ($195 after)",
    summary: "The NAB Rewards Platinum card is designed for those who want to earn Velocity Points on everyday spending. Currently, you can earn 60,000 bonus Velocity Points (equivalent to 120,000 NAB Rewards Points) when you apply by July 31, 2025, and spend at least $1,000 on eligible purchases within the first 60 days of account opening. Additionally, you can earn another 20,000 Velocity Points (converted from 40,000 NAB Rewards Points) if you keep the card for more than 12 months. With this card, you’ll earn a base rate of one NAB Rewards Point per dollar spent (which converts to 0.5 Velocity Points), plus extra points when you shop at the NAB Rewards Store or Webjet.",
    summaryExtra: "The NAB Rewards Platinum Card with Velocity automatic redemption lets you earn uncapped NAB Rewards Points converted monthly to Velocity Points. New cardholders can earn up to 90,000 bonus Velocity Points (offer commenced 15 January 2026): 70,000 Velocity Points when you spend $4,000 in the first 90 days and enrol in auto-redemption with your Velocity membership number, plus 20,000 Velocity Points when you keep the card open for over 12 months.",
    pros: ["Earn up to 80,000 bonus Velocity Points","Enjoy a discounted $95 annual fee for the first year","Earn an additional 0.5 NAB Rewards Points per $1 spent at eligible grocery stores","Access Visa Premium benefits and 24/7 NAB Platinum Concierge Services","Benefit from a 0% p.a. interest rate on balance transfers for the first 12 months"],
    cons: ["You must keep the card for at least 12 months to earn all the bonus points, which means paying the annual fee for the second year","3.5% international transaction fee","A 3% fee applies to the balance transfer offer"],
    productDetails: {
          "Product Name": "NAB Rewards Platinum Card – Velocity Points",
          "Purchase rate p.a.": "20.99%",
          "Interest-free days": "Up to 44 days on purchases",
          "Annual fee": "$95 first year ($195 after)",
          "Bonus points": "90000",
          "Rewards points per $ spent": "1"
    },
    detailsProduct: {
          "Product Name": "NAB Rewards Platinum Card – Velocity Points",
          "Balance transfer rate p.a.": "0% for 12 months with 3% balance transfer fee, then 21.74%",
          "Balance transfer limit": "90% of available limit",
          "Purchase rate p.a.": "20.99",
          "Interest-free days": "Up to 44 days on purchases",
          "Cash advance rate p.a.": "21.74%",
          "Min credit limit": "$6,000",
          "Card type": "Visa"
    },
    detailsFees: {
          "Annual fee": "$95 first year ($195 after)",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$15",
          "Foreign currency conversion fee": "3.5%",
          "Cash advance fee": "3% or $3, whichever is greater",
          "Overseas cash advance fee": "$5",
          "Additional cardholder fee": "$0",
          "Number of additional cardholders": "1"
    },
    eligibility: {
          "Available to temporary residents": "Yes with conditions",
          "Minimum income": "N/A",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "1",
          "Bonus points": "80000",
          "Rewards points per $ spent": "1",
          "Rewards points cap": "N/A"
    },
    howToApply: "You can apply for the NAB Rewards Platinum Card – Velocity Points online in approximately 15 minutes and receive a response within around 60 seconds. Before you begin, ensure you meet the eligibility requirements and have all necessary documents ready.\n\nEligibility Criteria\nNew Customer: The bonus Velocity Points offer is available exclusively to new NAB customers, meaning you must not have held a NAB Rewards card in the past 18 months.\nVelocity Member: You need to be a member of the Velocity Frequent Flyer program.\nResidency: You can apply if you're an Australian citizen or permanent resident. If you're not a citizen or permanent resident, you must hold an acceptable visa. Many visa types are eligible, but the following are not: Visitor Visa (except for Special Category Visa – NZ Citizen), Working Holiday, Student, Exchange/Gap Year, Transit/Short Stay/Seasonal, and Bridging.\nEligible Balance Transfer Debt: You can transfer up to 90% of your approved credit limit from non-NAB accounts.\nAge: You must be at least 18 years old to apply.\n\nRequired Documents\nPersonal Information: This includes your full name, date of birth, marital status, residential address, email address, and contact number. You'll also need to provide identification, such as your driver's license number.\nEmployment Information: This includes your employer's name and contact details, your role, the duration of your employment, and salary details. You may be asked to submit recent payslips or bank statements.\nFinancial Information: This includes details of your income, assets (such as savings, shares, or investments), as well as any existing cards, loans, debts, and ongoing financial obligations (e.g., groceries, fuel).\nBalance Transfer Details: If you're completing a balance transfer, you'll need to provide the transfer amount and your previous account details.",
    ratesAndFees: "Annual fee: $95 first year ($195 after). Purchase interest rate: 20.99% p.a. Up to 44 days on purchases.",
    ratesSections: [
          {
                "title": "Annual Fee",
                "body": "Outside of promotional offers, this card has an annual fee of $195."
          },
          {
                "title": "Purchase Rate",
                "body": "A variable interest rate of 20.99% p.a. applies to purchases made with this card."
          },
          {
                "title": "Interest-Free Days",
                "body": "Enjoy up to 44 interest-free days on purchases, provided you pay your balance in full or, if applicable, the interest-free days amount by the statement due date."
          },
          {
                "title": "Cash Advance Rate",
                "body": "Cash advances attract a variable interest rate of 21.74% p.a."
          },
          {
                "title": "Cash Advance Fee",
                "body": "A fee of 3% of the transaction amount or $3 (whichever is greater) applies when withdrawing cash or making cash-equivalent transactions."
          },
          {
                "title": "Credit Limits",
                "body": "The minimum credit limit for this card is $6,000, while the maximum is $30,000."
          },
          {
                "title": "International Transaction Fee",
                "body": "A fee of 3.5% of the total transaction amount in Australian dollars applies to foreign currency transactions, including purchases made overseas or online with international merchants."
          }
    ],
  },
  {
    slug: "humm90-platinum-mastercard",
    name: "humm90 Platinum Mastercard",
    company: "humm",
    interestRate: "26.3",
    bonusPoints: "0",
    rewardPoints: "N/A",
    interestFree: "Up to 110 days on purchases",
    charges: "$9.95 per month ($119.40 p.a.)",
    summary: "The humm90 Mastercard stands out with one of the longest interest-free periods for everyday purchases. It offers up to 110 days interest-free from the beginning of each statement period—significantly longer than the standard 44 or 55 days provided by most other cards. However, be aware that its purchase rate of 26.3% p.a. is higher than many other options on the market. Exclusive Offer: New customers can receive $400 back when they apply through Finder by April 27, 2025, use the code 400BACK, and spend $4,000 on eligible purchases within the first 60 days.",
    summaryExtra: "The humm90 Platinum Mastercard is marketed on humm90.com with a $9.95 monthly account fee (about $119.40 per year if charged every month), up to 110 days interest-free on everyday purchases when you meet offer terms, and a standard purchase rate of 26.3% p.a. if interest applies. It uses the Mastercard network and supports humm90WRAPS and instalment-style payment features subject to humm's terms. Cash advances attract 26.49% p.a. and a fee of 3% or $30 (whichever is greater).",
    pros: ["Receive $400 cashback","No monthly fees for the first 12 months","Enjoy up to 110 days interest-free on everyday purchases","Convert purchases of $250 or more into 9-, 12-, or 15-month 0% p.a. instalment plans","No foreign transaction fees"],
    cons: ["High purchase interest rate of 26.3% p.a.","Steep 26.49% p.a. interest rate on cash advances","$0.95 fee for BPAY repayments"],
    productDetails: {
          "Product Name": "Humm90 Platinum Mastercard",
          "Purchase rate p.a.": "26.3%",
          "Interest-free days": "Up to 110 days on purchases",
          "Annual fee": "$9.95 per month ($119.40 p.a.)",
          "Bonus points": "0",
          "Rewards points per $ spent": "N/A"
    },
    detailsProduct: {
          "Product Name": "Humm90 Platinum Mastercard",
          "Balance transfer rate p.a.": "N/A",
          "Balance transfer limit": "N/A",
          "Purchase rate p.a.": "26.3",
          "Interest-free days": "Up to 110 days on purchases",
          "Cash advance rate p.a.": "N/A",
          "Min credit limit": "$1,000",
          "Card type": "Mastercard"
    },
    detailsFees: {
          "Annual fee": "$0 first year ($119.40 after)",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$35",
          "Foreign currency conversion fee": "3%",
          "Cash advance fee": "3%",
          "Overseas cash advance fee": "3% or $3, whichever is greater",
          "Additional cardholder fee": "$10",
          "Number of additional cardholders": "4"
    },
    eligibility: {
          "Available to temporary residents": "No",
          "Minimum income": "$25,000",
          "Joint application": "Yes - Conditions apply"
    },
    rewards: {
          "Rewards program": "N/A",
          "Bonus points": "0",
          "Rewards points per $ spent": "N/A",
          "Rewards points cap": "N/A"
    },
    howToApply: "You can apply for the humm90 Platinum Mastercard online at humm90.com. Before you begin, ensure you meet the eligibility criteria and have the necessary documents ready.\n\nEligibility Criteria\nMinimum income: You must earn at least $25,000 per year.\nResidency: Applicants must be Australian citizens or permanent residents.\nCredit history: A satisfactory credit history is required for approval.\nAge: You must be at least 18 years old.\n\nRequired Documents\nPersonal information: Your full name, date of birth, residential address, email, and phone number.\nIdentification: Australian driver's licence, Medicare card, or passport details for identity verification.\nEmployment details: Job title, salary, and employer contact details; a recent bank statement may be requested to verify income.\nFinancial information: Income, assets, existing debts, and estimated living expenses.",
    ratesAndFees: "Annual fee: $9.95 per month ($119.40 p.a.). Purchase interest rate: 26.3% p.a. Up to 110 days on purchases.",
    ratesSections: [
          {
                "title": "Monthly Fee",
                "body": "Outside of promotional offers, the humm90 Mastercard charges a monthly fee of $9.95. If you use the card every month, this amounts to $119.40 annually."
          },
          {
                "title": "Purchase Rate",
                "body": "The standard purchase interest rate is 26.3% p.a., which is higher than the average standard credit card interest rate of 20.99% p.a. (based on RBA data)."
          },
          {
                "title": "Cash Advance Rate",
                "body": "The cash advance interest rate is 26.49% p.a. This rate applies to cash advances and cash withdrawals from the moment they are made."
          },
          {
                "title": "Cash Advance Fee",
                "body": "A fee of 3% or $30 (whichever is higher) applies to cash advance transactions."
          },
          {
                "title": "Promotional Rates",
                "body": "From time to time, humm may offer promotional interest rates for specific transactions or time periods. When available, these rates apply to spending that meets the terms and conditions of the offer."
          },
          {
                "title": "Payment Handling Fee",
                "body": "A fee of $0.95 is charged each time you make a payment via BPAY."
          },
          {
                "title": "Additional Cardholder Fee",
                "body": "You can add up to 4 additional cardholders to your humm90 Mastercard account. Each additional cardholder incurs a $10 annual fee."
          }
    ],
  },
  {
    slug: "st.george-vertigo-card",
    name: "St.George Vertigo Card",
    company: "St.George",
    interestRate: "13.99",
    bonusPoints: "0",
    rewardPoints: "N/A",
    interestFree: "Up to 55 days on purchases",
    charges: "$55",
    summary: "The St.George Vertigo Card is a low-rate credit card with a $55 annual fee and a 13.99% p.a. variable purchase interest rate—well below the average standard credit card rate. When you request a balance transfer at application, promotional balance transfer rates apply (for example, 6.99% p.a. for 12 months or 0% p.a. for 20 months with a 3% balance transfer fee, depending on the offer available when you apply). After any promotional period ends, the standard cash advance rate applies to remaining balance transfer debt.",
    summaryExtra: "The St.George Vertigo card suits cardholders who want a simple low-rate card and optional balance transfer savings. Promotional balance transfer offers are updated periodically (the Vertigo balance transfer promotion on the issuer site commenced 28 May 2026). You can still receive up to 55 days interest-free on new purchases when you pay your monthly payment balance in full by the due date.",
    pros: ["0% p.a. balance transfer rate for the first 24 months","Low ongoing annual fee for cost-effective management","Exclusive shopping cashback offers via ShopBack","Competitive 13.99% p.a. purchase interest rate","Add an extra cardholder at no additional cost"],
    cons: ["A one-time 1% balance transfer fee applies.","After the introductory period, the balance transfer rate reverts to 21.99% p.a.","No rewards program, travel benefits, or insurance coverage included."],
    productDetails: {
          "Product Name": "St.George Vertigo Card",
          "Purchase rate p.a.": "13.99%",
          "Interest-free days": "Up to 55 days on purchases",
          "Annual fee": "$55",
          "Bonus points": "0",
          "Rewards points per $ spent": "N/A"
    },
    detailsProduct: {
          "Product Name": "St.George Vertigo Card",
          "Balance transfer rate p.a.": "0% for 24 months with 1% balance transfer fee, then 21.99%",
          "Balance transfer limit": "80% of available limit",
          "Purchase rate p.a.": "13.99",
          "Interest-free days": "Up to 55 days on purchases",
          "Cash advance rate p.a.": "21.99%",
          "Min credit limit": "$500",
          "Card type": "Visa"
    },
    detailsFees: {
          "Annual fee": "$55",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$15",
          "Foreign currency conversion fee": "3%",
          "Cash advance fee": "3%",
          "Overseas cash advance fee": "3% of each cash advance amount",
          "Additional cardholder fee": "N/A",
          "Number of additional cardholders": "0"
    },
    eligibility: {
          "Available to temporary residents": "Yes with conditions",
          "Minimum income": "N/A",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "N/A",
          "Bonus points": "0",
          "Rewards points per $ spent": "N/A",
          "Rewards points cap": "N/A"
    },
    howToApply: "You can apply for the St.George Vertigo Card in just 10 minutes and receive an instant response. Before you apply, ensure you meet the eligibility criteria and have all necessary details ready:\n\nEligibility Criteria\nNew cardholder: Balance transfer promotions are for new St.George Vertigo applicants who request a balance transfer when they apply, subject to the current offer terms on the St.George website.\nEligible balance transfer: Balance transfers must be from cards not issued by St.George, Bank of Melbourne, or BankSA. You can transfer from $200 up to 80% of your credit limit.\nResidency: You must be an Australian citizen or permanent resident to apply online.\nAge: Applicants must be at least 18 years old.\n\nRequired Documents\nPersonal details: This includes your full name, contact details, and proof of identity such as your Australian driver's license, Medicare card, passport, Australian birth certificate, or NSW photo card.\nEmployment details: You'll need to provide your job title, length of employment, and your employer's contact information.\nFinancial information: You'll need to confirm your annual income and provide details of your savings, investments, and assets.\nBalance transfer information: If you're transferring a balance, provide details of the accounts and the amount of debt you're transferring.",
    ratesAndFees: "Annual fee: $55. Purchase interest rate: 13.99% p.a. Up to 55 days on purchases.",
    ratesSections: [
          {
                "title": "Annual fee",
                "body": "This card has an annual fee of $55 p.a."
          },
          {
                "title": "Cash advance rate",
                "body": "If you withdraw cash from an ATM, make a cash-equivalent transaction, or have remaining debt at the end of the balance transfer period, you will incur an interest charge of 21.99% p.a."
          },
          {
                "title": "Currency conversion fee",
                "body": "For international transactions, whether overseas or with online retailers, a 3% fee of the Australian dollar value per transaction will apply."
          },
          {
                "title": "Interest-free period",
                "body": "Enjoy up to 55 days interest-free on new purchases when you pay your monthly statement balance in full by the due date. Please note that these interest-free days do not apply to any balance transfer debts and are separate from any ongoing interest rate promotions."
          }
    ],
  },
  {
    slug: "bankwest-breeze-platinum-mastercard",
    name: "Bankwest Breeze Platinum Mastercard",
    company: "Bankwest",
    interestRate: "12.99",
    bonusPoints: "0",
    rewardPoints: "N/A",
    interestFree: "Up to 55 days on purchases",
    charges: "$59",
    summary: "The Bankwest Breeze Platinum Mastercard is a low-rate credit card that helps you save on interest with its 0% balance transfer offer for the first 24 months. After the introductory period, the 12.99% p.a. interest rate is competitive compared to other credit cards in Australia. However, balance transfers will incur a 3% fee. In addition to the low rate, this card provides platinum perks such as complimentary insurance options, including overseas travel coverage, and no foreign transaction fees. However, when comparing other platinum-tier cards, it’s important to note that this card does not offer a rewards program.",
    summaryExtra: "The Bankwest Breeze Platinum Mastercard is a low-rate credit card that includes complimentary insurance as part of its platinum benefits. Currently, it offers a 0% p.a. interest rate on balance transfers for the first 24 months for new customers. After the introductory period, a competitive 12.99% p.a. interest rate applies, which is lower than many other cards' post-offer balance transfer rates.\n\nHowever, if you're transferring a balance, be sure to consider the 3% balance transfer fee that applies at the time of processing.",
    pros: ["Enjoy a 0% p.a. balance transfer offer for 24 months.","Benefit from a low ongoing purchase rate of 12.99% p.a.","Pay no foreign transaction fees on international purchases.","Get access to complimentary overseas travel insurance."],
    cons: ["No rewards program included.","Cash advances attract a 21.99% p.a. interest rate.","A 3% fee applies to balance transfers."],
    productDetails: {
          "Product Name": "Bankwest Breeze Platinum Mastercard",
          "Purchase rate p.a.": "12.99%",
          "Interest-free days": "Up to 55 days on purchases",
          "Annual fee": "$59",
          "Bonus points": "0",
          "Rewards points per $ spent": "N/A"
    },
    detailsProduct: {
          "Product Name": "Bankwest Breeze Platinum Mastercard",
          "Balance transfer rate p.a.": "0% for 24 months with 3% balance transfer fee, then 12.99%",
          "Balance transfer limit": "95% of approved credit limit",
          "Purchase rate p.a.": "12.99",
          "Interest-free days": "Up to 55 days on purchases",
          "Cash advance rate p.a.": "21.99%",
          "Min credit limit": "$6,000",
          "Card type": "Mastercard"
    },
    detailsFees: {
          "Annual fee": "$59",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$25",
          "Foreign currency conversion fee": "0%",
          "Cash advance fee": "3% or $4, whichever is greater",
          "Overseas cash advance fee": "3% or $4, whichever is greater",
          "Additional cardholder fee": "$0",
          "Number of additional cardholders": "3"
    },
    eligibility: {
          "Available to temporary residents": "No",
          "Minimum income": "$35,000",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "N/A",
          "Bonus points": "0",
          "Rewards points per $ spent": "N/A",
          "Rewards points cap": "N/A"
    },
    howToApply: "You can apply for the Bankwest Breeze Platinum Mastercard online in approximately 15 minutes. Before starting your application, ensure you meet the eligibility criteria and have all the necessary documents and details ready.\n\nEligibility Criteria\nNew customers: This introductory balance transfer offer is only available to new customers.\nMinimum income: You must have a regular annual income of at least $35,000.\nEligible balance transfer: Balance transfers are not allowed from existing Bankwest-branded credit cards. You can transfer amounts ranging from $500 up to 95% of your approved credit limit.\nResidency: Applicants must be Australian citizens or permanent residents to apply online.\nAge: You must be at least 18 years old to be eligible.\n\nRequired Documents\nPersonal information: Your full name, date of birth, residential address, email, and contact number.\nProof of identification: A valid passport, driver's licence, or Medicare card for identity verification.\nEmployment details: Your job title, length of employment, and employer's contact information.\nFinancial information: Details of your income, expenses, existing debts, and assets.\nBalance transfer details: If transferring a balance, you'll need the total amount of debt you wish to transfer along with details of the existing credit card.",
    ratesAndFees: "Annual fee: $59. Purchase interest rate: 12.99% p.a. Up to 55 days on purchases.",
    ratesSections: [
          {
                "title": "Annual Fee",
                "body": "This card comes with a standard annual fee of $59."
          },
          {
                "title": "Cash Advances",
                "body": "For cash withdrawals or cash-equivalent transactions, a 3% fee (or $4, whichever is higher) applies. These transactions attract an interest rate of 21.99% p.a. from the day they are made."
          },
          {
                "title": "Purchase Rate",
                "body": "The standard purchase interest rate is 12.99% p.a."
          },
          {
                "title": "Interest-Free Days",
                "body": "You can enjoy up to 55 days interest-free on purchases, provided you pay your previous statement balance in full (or meet the required monthly payment on an active easy instalment plan)."
          },
          {
                "title": "Additional Cardholders",
                "body": "You can add up to 3 additional cardholders at no extra cost, helping you share your account benefits while maintaining control over the primary account."
          }
    ],
  },
  {
    slug: "american-express-velocity-platinum-card",
    name: "American Express Velocity Platinum Card",
    company: "American Express",
    interestRate: "23.99",
    bonusPoints: "50000",
    rewardPoints: "1.25",
    interestFree: "Up to 55 days on purchases",
    charges: "$440",
    summary: "The American Express Velocity Platinum Credit Card is a great option for those looking to maximize Velocity Points. Right now, you can earn 100,000 bonus Velocity Points when you apply online as a new American Express Card Member by 30 April 2025, get approved, and spend $3,000 on eligible purchases within the first 3 months (terms and conditions apply). You'll also gain 50 Velocity Status Credits after spending $25,000 on eligible purchases each membership year, plus an additional 50 credits when you spend another $25,000 within the same year. Additional perks include Virgin Australia Lounge Access every time you fly domestically with Virgin Australia at selected airports, along with 2 complimentary Virgin Australia Guest Lounge Passes per year for guests traveling with you. While the $440 annual fee is on the higher side, the bonus points, complimentary return domestic Virgin Australia flight (available after your first card spend each anniversary year), and travel benefits can make it worthwhile. The card also offers complimentary insurance covers (subject to conditions like age limits, pre-existing medical exclusions, and cover limits) and uncapped Velocity Points earn rates for added value. However, the 23.99% p.a. interest rate on purchases is relatively high, so it’s best suited for those who pay off their balance in full each month to maximize rewards.",
    summaryExtra: "The American Express Velocity Platinum Card offers a high Velocity Point earn rate, ranging from 1.25 to 2.25 Velocity Points per $1 spent, plus 50,000 bonus Velocity Points for eligible new American Express card members who apply online and meet the current spend criteria on the issuer website. It's also one of the few credit cards that reward you with bonus Status Credits when you meet the annual spending requirement. However, with a $440 annual fee, which is on the higher side for Velocity Frequent Flyer cards, it's essential to ensure you'll gain enough value from the points and benefits to make it worthwhile.",
    pros: ["Earn 100,000 bonus Velocity Points when you meet the eligibility criteria.","Get up to 100 Velocity Status Credits per year when you spend $25,000 on eligible purchases , plus an additional 50 credits when you spend another $25,000 within the same membership year.","Enjoy Virgin Australia Lounge Access and Virgin Australia Guest Lounge Passes at select domestic airports.","Earn up to 2.25 Velocity Points per $1 spent on eligible transactions.","Receive a complimentary Virgin Australia return economy domestic flight between selected cities each year after your first card spend on your anniversary year ."],
    cons: ["$440 annual fee , which is on the higher side compared to other credit cards.","3% foreign transaction fee applies to purchases made in a foreign currency.","High 23.99% p.a. interest rate on purchases , making it less competitive than low-rate credit card options in Australia."],
    productDetails: {
          "Product Name": "American Express Velocity Platinum Card",
          "Purchase rate p.a.": "23.99%",
          "Interest-free days": "Up to 55 days on purchases",
          "Annual fee": "$440",
          "Bonus points": "50000",
          "Rewards points per $ spent": "1.25"
    },
    detailsProduct: {
          "Product Name": "American Express Velocity Platinum Card",
          "Balance transfer rate p.a.": "N/A",
          "Balance transfer limit": "N/A",
          "Purchase rate p.a.": "23.99",
          "Interest-free days": "Up to 55 days on purchases",
          "Cash advance rate p.a.": "N/A",
          "Min credit limit": "$3,000",
          "Card type": "American Express"
    },
    detailsFees: {
          "Annual fee": "$440",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$30",
          "Foreign currency conversion fee": "3%",
          "Cash advance fee": "N/A",
          "Overseas cash advance fee": "N/A",
          "Additional cardholder fee": "$0",
          "Number of additional cardholders": "4"
    },
    eligibility: {
          "Available to temporary residents": "Yes with conditions",
          "Minimum income": "N/A",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "1.25",
          "Bonus points": "100000",
          "Rewards points per $ spent": "1.25",
          "Rewards points cap": "Uncapped"
    },
    howToApply: "You can apply for the American Express Velocity Platinum Card online. Before you begin, ensure you meet the eligibility criteria and have all necessary documents ready.\n\nEligibility Criteria\nNew cardholder: To qualify for 50,000 bonus Velocity Points, apply online as a new American Express card member, be approved, and meet the spend criteria in the current offer terms (you must not have held an American Express card issued by American Express Australia Limited in the past 18 months).\nResidency: You must be an Australian citizen, permanent resident, or hold a current long-term visa (12 months or more). Student visas are not eligible.\nCredit history: A good credit score is required, with no history of bad debt or payment defaults.\nAge: Applicants must be at least 18 years old.\n\nRequired Documents\nPersonal details: You'll need to provide your full name, address, and details of your income, expenses, and debts.\nIdentification: Proof of identity is required, such as a driver's licence or birth certificate.",
    ratesAndFees: "Annual fee: $440. Purchase interest rate: 23.99% p.a. Up to 55 days on purchases.",
    ratesSections: [
          {
                "title": "Annual Fee",
                "body": "This card comes with a $440 annual fee."
          },
          {
                "title": "Purchase Interest Rate",
                "body": "Purchases are subject to a 23.99% p.a. interest rate."
          },
          {
                "title": "Interest-Free Days",
                "body": "You can enjoy up to 55 days interest-free on purchases if you pay your closing balance in full by the due date on each monthly statement."
          },
          {
                "title": "Additional Cards",
                "body": "You can request up to 4 additional cards for family members or a partner at no extra cost, allowing you to share the account and earn more rewards. However, you remain responsible for maintaining the account in good standing."
          },
          {
                "title": "International Transaction Fee",
                "body": "A 3% fee applies to transactions made overseas or online in foreign currencies, so be sure to consider this when traveling or shopping internationally."
          }
    ],
  },
  {
    slug: "qantas-american-express-ultimate-card",
    name: "Qantas American Express Ultimate Card",
    company: "American Express",
    interestRate: "23.99",
    bonusPoints: "50000",
    rewardPoints: "1.25",
    interestFree: "Up to 44 days on purchases",
    charges: "$450",
    summary: "The Qantas American Express Ultimate Card is packed with frequent flyer benefits, offering 100,000 bonus Qantas Points when you apply online by 18 March 2025 and spend $5,000 on eligible purchases within the first 3 months. To put this into perspective, these points could get you a return economy flight from Melbourne to Los Angeles (83,800 Qantas Points + fees & taxes) or a return business class flight from Sydney to Perth (83,000 points + fees & taxes). This card boasts one of the highest earn rates on the market, providing 1.25 Qantas Points per $1 on everyday eligible spending and an additional 1 Qantas Point per $1 on Qantas products and services—reaching up to 2.25 points per $1. After 100,000 points per year, the earn rate reduces to 1 point per $1, which remains competitive among Qantas credit cards. Additional perks include lounge passes, complimentary travel insurance, and an annual $450 Qantas Travel Credit. However, with a relatively high annual fee and purchase interest rate, it's best suited for those who can maximize these rewards and benefits.",
    summaryExtra: "The Qantas American Express Ultimate Card boasts the highest earn rate among Qantas-earning credit cards, offering 1.25 Qantas Points per $1 on eligible purchases—meaning a $100 spend earns 125 points. New cardholders can earn 50,000 bonus Qantas Points when they apply online by 28 July 2026, are approved, and spend $5,000 on eligible purchases within the first 3 months (new American Express card members only).\n\nTo maximize the value of this card, it's essential to take advantage of its additional travel perks. While the $450 annual fee is higher compared to other frequent flyer credit cards, it can be offset by the included $450 Qantas Travel Credit. However, the travel credit must be redeemed through the Amex Travel website, with specific terms and conditions—such as being valid for a single booking and requiring a minimum spend of $450. Additional benefits include 2 complimentary Qantas Club lounge invitations, 2 Centurion lounge invitations per year, complimentary travel insurance, and a complimentary Qantas Wine Premium membership.",
    pros: ["100,000 Bonus Qantas Points","Earn up to 2.25 Qantas Points per $1 on eligible purchases in Australia, with no cap","$450 Qantas Travel Credit annually","2 Complimentary Qantas Club Lounge Invitations per year","Complimentary Travel Insurance"],
    cons: ["High Annual Fee of $450","Elevated Purchase Interest Rate of 23.99% p.a.","3% Foreign Currency Conversion Fee on international transactions","Limited Interest-Free Period of up to 44 days, whereas some cards offer up to 55 days"],
    productDetails: {
          "Product Name": "Qantas American Express Ultimate Card",
          "Purchase rate p.a.": "23.99%",
          "Interest-free days": "Up to 44 days on purchases",
          "Annual fee": "$450",
          "Bonus points": "50000",
          "Rewards points per $ spent": "1.25"
    },
    detailsProduct: {
          "Product Name": "Qantas American Express Ultimate Card",
          "Balance transfer rate p.a.": "N/A",
          "Balance transfer limit": "N/A",
          "Purchase rate p.a.": "23.99",
          "Interest-free days": "Up to 44 days on purchases",
          "Cash advance rate p.a.": "N/A",
          "Min credit limit": "$3,000",
          "Card type": "American Express"
    },
    detailsFees: {
          "Annual fee": "$450",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$30",
          "Foreign currency conversion fee": "3%",
          "Cash advance fee": "N/A",
          "Overseas cash advance fee": "N/A",
          "Additional cardholder fee": "$0",
          "Number of additional cardholders": "4"
    },
    eligibility: {
          "Available to temporary residents": "Yes with conditions",
          "Minimum income": "N/A",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "1.25",
          "Bonus points": "50,000",
          "Rewards points per $ spent": "1.25",
          "Rewards points cap": "Uncapped"
    },
    howToApply: "If you've compared your options and decided that the Qantas American Express Ultimate Card is the right choice for you, you can apply online in approximately 10 minutes and may receive a response within 60 seconds. Before applying, ensure you meet the eligibility criteria and have the necessary documents ready to complete your application.\n\nEligibility Criteria\nNew cardholder: To earn 50,000 bonus Qantas Points, apply online by 28 July 2026, be approved, and spend $5,000 on eligible purchases within the first 3 months. This offer is only available if you haven't held another American Express card issued by American Express Australia Limited in the past 18 months.\nResidency: Applicants must be Australian citizens, permanent residents, or hold a long-term visa (valid for at least 12 months). Student visas are not eligible.\nCredit history: A good credit history is required, with no past defaults or bad debts. If you're unsure about your credit score, you can obtain a free credit report through Finder.\nAge: You must be at least 18 years old.\n\nRequired Documents\nPersonal information: Full name, email address, date of birth, driver's licence number, marital status, number of dependents, and contact number.\nFrequent flyer details: Your Qantas Frequent Flyer number is required to earn points with this card. If you're not yet a member, check out ways to join for free.\nEmployment information: Current employment status, job title, and employer's contact details. You may also need to provide recent payslips, a tax return, or accountant details if self-employed.\nFinancial details: Information on your savings, shares, or other assets, along with details of existing debts, credit accounts, and estimates of your regular household expenses.",
    ratesAndFees: "Annual fee: $450. Purchase interest rate: 23.99% p.a. Up to 44 days on purchases.",
    ratesSections: [
          {
                "title": "Annual Fee",
                "body": "This card has an annual fee of $450, which can be offset by the included $450 Qantas Travel Credit when used for eligible bookings through American Express Travel."
          },
          {
                "title": "Interest Rate on Purchases",
                "body": "The Qantas American Express Ultimate Card carries a 23.99% p.a. interest rate on purchases, making it ideal for those who pay off their balance in full each month."
          },
          {
                "title": "Interest-Free Period",
                "body": "Enjoy up to 44 days interest-free on purchases when you pay your balance in full by the due date on each statement cycle."
          },
          {
                "title": "Additional Cardholders",
                "body": "Add up to 4 supplementary cardholders (18+ years) at no extra cost. Additional cardholders can earn Qantas Points on their spending, while the primary cardholder remains responsible for managing the account and repayments."
          },
          {
                "title": "Foreign Transaction Fees",
                "body": "A 3% fee applies to transactions made in foreign currencies, whether overseas or through international online purchases."
          }
    ],
  },
  {
    slug: "qantas-premier-platinum-creditcard",
    name: "Qantas Premier Platinum",
    company: "Qantas",
    interestRate: "20.99",
    bonusPoints: "120000",
    rewardPoints: "1",
    interestFree: "Up to 44 days on purchases",
    charges: "$349 first year ($399 after)",
    summary: "The Qantas Premier Platinum offers competitive Qantas Points earn rates per $1 spent and travel benefits, including lounge invitations and a discounted companion flight offer. New cardholders can earn 50,000 bonus Qantas Points by spending $3,000 on eligible purchases within the first 3 months of approval. An additional 30,000 bonus Qantas Points can be earned if the spend criteria for the initial bonus is met and the cardholder has not earned Qantas Points with a credit card in the past 12 months. These points are enough for a return economy flight from Sydney to Tokyo (63,000 points + fees & taxes) or a one-way business class flight from Melbourne to Denpasar, Indonesia (57,000 points + fees & taxes). Cardholders will also receive a $100 Qantas Hotels and Holidays voucher. With its high earn rate and bonus points, this card is an appealing option for those looking to maximize their Qantas Points. However, it’s important to ensure that the value gained from the points justifies the relatively high annual fee. The card was also highly commended in the 2024 Finder Awards in the frequent flyer credit card category.",
    summaryExtra: "New Qantas Premier Platinum cardholders can earn up to 120,000 bonus Qantas Points: 80,000 bonus points when you spend $5,000 on eligible purchases within 90 days of approval, plus an additional 40,000 bonus points if you have not earned Qantas Points with a credit card in the last 24 months.",
    pros: ["Earn up to 80,000 bonus Qantas Points","Receive a $100 Qantas Hotels and Holidays voucher","Get up to 2 Qantas Points per $1 spent","Enjoy a 0% p.a. balance transfer offer for 12 months","Pay a discounted first-year annual fee of $349"],
    cons: ["A 2% fee applies to balance transfers","The standard annual fee of $399 is on the higher side","Interest-free days are not available if you have an active balance transfer debt","Spending over $10,000 per statement period earns a reduced rate of 0.5 Qantas Points per $1"],
    productDetails: {
          "Product Name": "Qantas Premier Platinum",
          "Purchase rate p.a.": "20.99%",
          "Interest-free days": "Up to 44 days on purchases",
          "Annual fee": "$349 first year ($399 after)",
          "Bonus points": "120000",
          "Rewards points per $ spent": "1"
    },
    detailsProduct: {
          "Product Name": "Qantas Premier Platinum",
          "Balance transfer rate p.a.": "0% for 12 months with 2% balance transfer fee, then 21.99%",
          "Balance transfer limit": "80% of available limit",
          "Purchase rate p.a.": "20.99",
          "Interest-free days": "Up to 44 days on purchases",
          "Cash advance rate p.a.": "21.99% p.a.",
          "Min credit limit": "$6,000",
          "Card type": "Mastercard"
    },
    detailsFees: {
          "Annual fee": "$349 first year ($399 after)",
          "Minimum monthly repayment": "N/A",
          "Late payment fee": "$30",
          "Foreign currency conversion fee": "3%",
          "Cash advance fee": "3% or $3, whichever is greater",
          "Overseas cash advance fee": "$5",
          "Additional cardholder fee": "$50",
          "Number of additional cardholders": "4"
    },
    eligibility: {
          "Available to temporary residents": "No",
          "Minimum income": "$35,000",
          "Joint application": "No"
    },
    rewards: {
          "Rewards program": "1",
          "Bonus points": "120,000",
          "Rewards points per $ spent": "1",
          "Rewards points cap": "Uncapped"
    },
    howToApply: "You can apply for the Qantas Premier Platinum Credit Card online in just 10 minutes. Before proceeding, ensure you meet the eligibility criteria and have the necessary details ready to complete your application.\n\nEligibility Criteria\nIncome: A minimum annual income of $35,000 is required.\nCardholder status: You are not eligible if you currently hold or have held a Qantas Premier credit card as the primary cardholder in the last 12 months.\nQantas Frequent Flyer membership: You must be an active Qantas Frequent Flyer member to apply. If you're not yet a member, you can join for free during the application process.\nResidency: You must be an Australian citizen or permanent resident with a valid Australian residential address and mobile number.\nAge: Applicants must be 18 years or older.\n\nRequired Documents\nPersonal information: Your full name, date of birth, residential address, email, and contact number.\nIdentification: A driver's licence, passport, or Medicare number (driver's licence is preferred).\nEmployment details: Information about your current employer, job role, salary, and employer's contact details. You may need to provide recent payslips or an employment contract as supporting documentation. If self-employed, submit details of your tax accountant.\nFinancial details: Information on assets (savings, investments) and liabilities (credit cards, loans, and debts). You'll also need to estimate your monthly expenses for essentials like housing, food, and utilities.\nBalance transfer details: If transferring a balance, you can transfer up to 80% of your available credit limit.",
    ratesAndFees: "Annual fee: $349 first year ($399 after). Purchase interest rate: 20.99% p.a. Up to 44 days on purchases.",
    ratesSections: [
          {
                "title": "Annual Fee",
                "body": "The standard annual fee for this card is $399, unless a promotional offer applies."
          },
          {
                "title": "Purchase Interest Rate",
                "body": "A variable interest rate of 20.99% p.a. applies to purchases made with this card."
          },
          {
                "title": "Interest-Free Period",
                "body": "Get up to 44 days interest-free on purchases when you pay your balance in full by the due date on each statement. However, if you have an outstanding balance transfer, interest will apply to retail purchases."
          },
          {
                "title": "Cash Advance Rate & Fees",
                "body": "An interest rate of 21.99% p.a. applies to cash advances. The domestic cash advance fee is 3% of the transaction amount or $3, whichever is higher. The overseas cash advance fee is $5 per transaction."
          },
          {
                "title": "Additional Cardholders",
                "body": "Add up to 4 supplementary cardholders to help earn more Qantas Points and share account benefits. A $50 annual fee per additional cardholder applies. The primary cardholder remains responsible for managing the account and ensuring payments are made on time."
          }
    ],
  },
];

export function getCreditCardDetailBySlug(slug: string): CreditCardDetail | undefined {
  const normalized = decodeURIComponent(slug);
  return creditCardDetails.find(
    (c) =>
      c.slug === slug ||
      c.slug === normalized ||
      (slug.includes('velocity') && c.slug === 'nab-rewards-platinum-card-velocity-points'),
  );
}
