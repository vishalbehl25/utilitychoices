import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCRAPED = path.join(ROOT, 'src/data/credit-cards-scraped.json');
const TABLES = path.join(ROOT, 'src/data/credit-card-detail-tables.json');
const CARDS_TS = path.join(ROOT, 'src/data/credit-cards.ts');
const OUT = path.join(ROOT, 'src/data/credit-card-details.ts');
const OVERRIDES = path.join(ROOT, 'src/data/credit-card-detail-overrides.json');

function loadOverrides() {
  if (!fs.existsSync(OVERRIDES)) return {};
  return JSON.parse(fs.readFileSync(OVERRIDES, 'utf8'));
}

function mergeTableRows(base, override) {
  if (!override) return base;
  return { ...base, ...override };
}

function normalizeSummaryText(summary) {
  return summary
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&')
    .replace(/&copy;/g, '©')
    .replace(/-->/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function repairSummaryLead(text) {
  if (/^the [A-Z]/.test(text) && text.length > 80) {
    return `The${text.slice(3)}`;
  }
  return text;
}

function resolveScrapedDetail(detailBySlug, tablesBySlug, slug) {
  if (slug === 'humm90-platinum-mastercard') {
    return (
      detailBySlug['humm90-platinum-mastercard'] ??
      detailBySlug['westpac-low-rate-card']
    );
  }
  return detailBySlug[slug];
}

function pickSummary(scrapedDetail, card) {
  let cleaned = repairSummaryLead(normalizeSummaryText(scrapedDetail?.summary ?? ''));
  if (cleaned.length > 80) {
    const thisCard = cleaned.match(
      /(This credit card[\s\S]{40,2200}?)(?=\s+Bonus Point|\s+Pros\.)/i
    );
    if (thisCard?.[1] && thisCard[1].length > 40) return thisCard[1].trim();

    const the = cleaned.match(
      /(The\s+[\s\S]{60,2200}?)(?=\s+Bonus Point|\s+Pros\.|\s+Read more|\s+Connecting to better)/
    );
    if (the?.[1] && the[1].length > 60) return the[1].trim();

    return cleaned;
  }

  return `Compare the ${card.name} with interest rate ${card.interestRate}% p.a., ${card.interestFree.toLowerCase()}, and annual charges of ${card.charges}.`;
}

function splitProsCons(scrapedDetail) {
  if (scrapedDetail?.pros?.length && scrapedDetail?.cons?.length) {
    return {
      pros: scrapedDetail.pros.slice(0, 8),
      cons: scrapedDetail.cons.slice(0, 6),
    };
  }
  const items = [...(scrapedDetail?.pros ?? []), ...(scrapedDetail?.cons ?? [])];
  if (!items.length) return { pros: [], cons: [] };
  return { pros: items.slice(0, 6), cons: items.slice(0, 5) };
}

function parseCardsFromTs() {
  const src = fs.readFileSync(CARDS_TS, 'utf8');
  const cards = [];
  const blocks = src.matchAll(
    /\{\s*slug:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"],\s*interestRate:\s*['"]([^'"]*)['"],\s*bonusPoints:\s*['"]([^'"]*)['"],\s*rewardPoints:\s*['"]([^'"]*)['"],\s*interestFree:\s*['"]([^'"]*)['"],\s*charges:\s*['"]([^'"]*)['"],\s*\}/g
  );
  for (const m of blocks) {
    cards.push({
      slug: m[1],
      name: m[2],
      interestRate: m[3],
      bonusPoints: m[4],
      rewardPoints: m[5],
      interestFree: m[6],
      charges: m[7],
    });
  }
  return cards;
}

const DETAILS_PRODUCT_LABELS = [
  'Product Name',
  'Balance transfer rate p.a.',
  'Balance transfer limit',
  'Purchase rate p.a.',
  'Interest-free days',
  'Cash advance rate p.a.',
  'Min credit limit',
  'Card type',
];

const DETAILS_FEES_LABELS = [
  'Annual fee',
  'Minimum monthly repayment',
  'Late payment fee',
  'Foreign currency conversion fee',
  'Cash advance fee',
  'Overseas cash advance fee',
  'Additional cardholder fee',
  'Number of additional cardholders',
];

const ALL_DETAIL_LABELS = [
  ...DETAILS_PRODUCT_LABELS,
  ...DETAILS_FEES_LABELS,
  'Rewards program',
  'Bonus points',
  'Rewards points per $ spent',
  'Rewards points cap',
  'Minimum income',
  'Available to temporary residents',
  'Joint application',
];

function cleanDetailValue(raw, label) {
  if (!raw) return '';
  let v = String(raw)
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8203;/g, '')
    .trim();
  for (const other of ALL_DETAIL_LABELS) {
    if (other === label) continue;
    const idx = v.indexOf(other);
    if (idx > 0) v = v.slice(0, idx);
  }
  v = v.replace(/\s+Fees &.*$/i, '').trim();
  if (v.length > 120) v = v.slice(0, 120).trim();
  return v;
}

function buildDetailTables(scrapedDetails, card) {
  const detailsProduct = {};
  const detailsFees = {};
  const src = scrapedDetails ?? {};

  for (const label of DETAILS_PRODUCT_LABELS) {
    const key = label === 'Product Name' ? null : label;
    const raw = key ? src[key] : null;
    const value =
      label === 'Product Name'
        ? card.name
        : cleanDetailValue(raw, label) ||
          (label === 'Purchase rate p.a.' ? card.interestRate : '') ||
          (label === 'Interest-free days' ? card.interestFree : '');
    if (value) detailsProduct[label] = value;
  }

  for (const label of DETAILS_FEES_LABELS) {
    const raw = src[label];
    const value =
      cleanDetailValue(raw, label) ||
      (label === 'Annual fee' ? card.charges : '');
    if (value) detailsFees[label] = value;
  }

  return { detailsProduct, detailsFees };
}

function companyFromName(name) {
  const n = name.toLowerCase();
  if (n.includes('american express') || n.includes('amex')) return 'American Express';
  if (n.includes('westpac')) return 'Westpac';
  if (n.includes('anz')) return 'ANZ';
  if (n.includes('nab')) return 'NAB';
  if (n.includes('st.george') || n.includes('st george')) return 'St.George';
  if (n.includes('bankwest')) return 'Bankwest';
  if (n.includes('qantas')) return 'Qantas';
  if (n.includes('virgin')) return 'Virgin Money';
  if (n.includes('coles')) return 'Coles';
  if (n.includes('david jones')) return 'David Jones';
  if (n.includes('humm')) return 'humm';
  return 'Other';
}

function pickTables(scrapedDetail, tablesBySlug, slug, card) {
  const fromScrape = scrapedDetail ?? {};
  const fromFile = tablesBySlug[slug] ?? {};
  const detailsProduct =
    (fromScrape.detailsProduct &&
      Object.keys(fromScrape.detailsProduct).length > 0 &&
      fromScrape.detailsProduct) ||
    (fromFile.detailsProduct &&
      Object.keys(fromFile.detailsProduct).length > 0 &&
      fromFile.detailsProduct) ||
    buildDetailTables(fromScrape.details, card).detailsProduct;
  const detailsFees =
    (fromScrape.detailsFees &&
      Object.keys(fromScrape.detailsFees).length > 0 &&
      fromScrape.detailsFees) ||
    (fromFile.detailsFees &&
      Object.keys(fromFile.detailsFees).length > 0 &&
      fromFile.detailsFees) ||
    buildDetailTables(fromScrape.details, card).detailsFees;
  const eligibility =
    fromScrape.eligibility && Object.keys(fromScrape.eligibility).length > 0
      ? fromScrape.eligibility
      : fromFile.eligibility;
  const rewards =
    fromScrape.rewards && Object.keys(fromScrape.rewards).length > 0
      ? fromScrape.rewards
      : fromFile.rewards;
  return { detailsProduct, detailsFees, eligibility, rewards };
}

function main() {
  const scraped = JSON.parse(fs.readFileSync(SCRAPED, 'utf8'));
  const detailBySlug = Object.fromEntries(
    scraped.details.map((d) => {
      const slug =
        d.slug === 'nab-rewards-platinum-card-%E2%80%93-velocity-points'
          ? 'nab-rewards-platinum-card-velocity-points'
          : d.slug;
      return [slug, d];
    })
  );
  const tablesBySlug = fs.existsSync(TABLES)
    ? JSON.parse(fs.readFileSync(TABLES, 'utf8'))
    : {};
  const overridesBySlug = loadOverrides();
  const cards = parseCardsFromTs();

  const humm90 = {
    slug: 'humm90-platinum-mastercard',
    name: 'humm90 Platinum Mastercard',
    interestRate: '26.3',
    bonusPoints: '0',
    rewardPoints: 'N/A',
    interestFree: 'Up to 110 days on purchases',
    charges: '$0 first year ($119.40 after)',
    company: 'humm',
  };

  const lines = [
    `import type { CreditCardProduct } from './credit-cards';`,
    '',
    'export interface CreditCardDetail extends CreditCardProduct {',
    '  company: string;',
    '  summary: string;',
    '  summaryExtra?: string;',
    '  pros: string[];',
    '  cons: string[];',
    '  productDetails: Record<string, string>;',
    '  detailsProduct?: Record<string, string>;',
    '  detailsFees?: Record<string, string>;',
    '  eligibility?: Record<string, string>;',
    '  rewards?: Record<string, string>;',
    '  howToApply: string;',
    '  cardBenefits?: string;',
    '  ratesAndFees: string;',
    '  ratesSections?: { title: string; body: string }[];',
    '}',
    '',
    'export const creditCardDetails: CreditCardDetail[] = [',
  ];

  const allCards = [...cards];
  if (!allCards.some((c) => c.slug === humm90.slug)) allCards.push(humm90);

  for (const card of allCards) {
    const slug =
      card.slug === 'nab-rewards-platinum-card-%E2%80%93-velocity-points'
        ? 'nab-rewards-platinum-card-velocity-points'
        : card.slug;
    const scrapedDetail = resolveScrapedDetail(detailBySlug, tablesBySlug, slug);
    const summary = pickSummary(scrapedDetail, card);
    const { pros, cons } = splitProsCons(scrapedDetail);

    const override = overridesBySlug[slug];

    let productDetails = {
      'Product Name': card.name,
      'Purchase rate p.a.': `${card.interestRate}%`,
      'Interest-free days': card.interestFree,
      'Annual fee': card.charges,
      'Bonus points': card.bonusPoints,
      'Rewards points per $ spent': card.rewardPoints,
    };
    if (override?.productDetails) {
      productDetails = mergeTableRows(productDetails, override.productDetails);
    }

    const howToApply =
      scrapedDetail?.details?.['Minimum income']?.includes('apply')
        ? scrapedDetail.details['Minimum income']
        : `You can apply for the ${card.name} online. Ensure you meet eligibility criteria and have identification and income documents ready before you start your application.`;

    const ratesAndFees = `Annual fee: ${card.charges}. Purchase interest rate: ${card.interestRate}% p.a. ${card.interestFree}.`;
    const tableSlug =
      slug === 'humm90-platinum-mastercard' &&
      !tablesBySlug[slug] &&
      tablesBySlug['westpac-low-rate-card']
        ? 'westpac-low-rate-card'
        : slug;
    let { detailsProduct, detailsFees, eligibility, rewards } = pickTables(
      scrapedDetail,
      tablesBySlug,
      tableSlug,
      card
    );
    if (override) {
      detailsProduct = mergeTableRows(detailsProduct, override.detailsProduct);
      detailsFees = mergeTableRows(detailsFees, override.detailsFees);
      eligibility = mergeTableRows(eligibility, override.eligibility);
      rewards = mergeTableRows(rewards, override.rewards);
    }

    const finalHowToApply = override?.howToApply ?? howToApply;
    const finalSummary = override?.summary ?? summary;
    const finalPros = override?.pros ?? pros;
    const finalCons = override?.cons ?? cons;
    const finalBonusPoints = override?.bonusPoints ?? card.bonusPoints;

    lines.push('  {');
    lines.push(`    slug: ${JSON.stringify(slug)},`);
    lines.push(`    name: ${JSON.stringify(card.name)},`);
    lines.push(`    company: ${JSON.stringify(companyFromName(card.name))},`);
    lines.push(`    interestRate: ${JSON.stringify(card.interestRate)},`);
    lines.push(`    bonusPoints: ${JSON.stringify(finalBonusPoints)},`);
    lines.push(`    rewardPoints: ${JSON.stringify(card.rewardPoints)},`);
    lines.push(`    interestFree: ${JSON.stringify(card.interestFree)},`);
    lines.push(`    charges: ${JSON.stringify(card.charges)},`);
    lines.push(`    summary: ${JSON.stringify(finalSummary)},`);
    if (override?.summaryExtra) {
      lines.push(`    summaryExtra: ${JSON.stringify(override.summaryExtra)},`);
    }
    lines.push(
      `    pros: ${JSON.stringify(finalPros.length ? finalPros : [`Competitive rewards on the ${card.name}`])},`
    );
    lines.push(
      `    cons: ${JSON.stringify(finalCons.length ? finalCons : [`Review annual fees and interest rates before applying`])},`
    );
    lines.push(`    productDetails: ${JSON.stringify(productDetails, null, 6).replace(/\n/g, '\n    ')},`);
    if (Object.keys(detailsProduct).length > 0) {
      lines.push(
        `    detailsProduct: ${JSON.stringify(detailsProduct, null, 6).replace(/\n/g, '\n    ')},`
      );
    }
    if (Object.keys(detailsFees).length > 0) {
      lines.push(
        `    detailsFees: ${JSON.stringify(detailsFees, null, 6).replace(/\n/g, '\n    ')},`
      );
    }
    if (eligibility && Object.keys(eligibility).length > 0) {
      lines.push(
        `    eligibility: ${JSON.stringify(eligibility, null, 6).replace(/\n/g, '\n    ')},`
      );
    }
    if (rewards && Object.keys(rewards).length > 0) {
      lines.push(
        `    rewards: ${JSON.stringify(rewards, null, 6).replace(/\n/g, '\n    ')},`
      );
    }
    lines.push(`    howToApply: ${JSON.stringify(finalHowToApply)},`);
    const cardBenefits =
      override?.cardBenefits &&
      normalizeSummaryText(override.cardBenefits) !==
        normalizeSummaryText(finalHowToApply)
        ? override.cardBenefits
        : undefined;
    if (cardBenefits) {
      lines.push(`    cardBenefits: ${JSON.stringify(cardBenefits)},`);
    }
    lines.push(`    ratesAndFees: ${JSON.stringify(ratesAndFees)},`);
    if (override?.ratesSections?.length) {
      lines.push(
        `    ratesSections: ${JSON.stringify(override.ratesSections, null, 6).replace(/\n/g, '\n    ')},`
      );
    }
    lines.push('  },');
  }

  lines.push('];', '');
  lines.push(
    'export function getCreditCardDetailBySlug(slug: string): CreditCardDetail | undefined {',
    '  const normalized = decodeURIComponent(slug);',
    '  return creditCardDetails.find(',
    '    (c) =>',
    '      c.slug === slug ||',
    '      c.slug === normalized ||',
    "      (slug.includes('velocity') && c.slug === 'nab-rewards-platinum-card-velocity-points'),",
    '  );',
    '}',
    ''
  );

  fs.writeFileSync(OUT, lines.join('\n'));
  console.log(`Wrote ${allCards.length} cards → ${OUT}`);
}

main();
