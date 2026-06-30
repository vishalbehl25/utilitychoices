import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  extractProsConsFromHtml,
  extractSummaryFromText,
  parseCreditCardDetailTables,
  stripHtml,
} from './lib/credit-card-table-parser.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROUTES_PATH = path.join(ROOT, 'src/data/credit-cards-routes.json');
const OUT_PATH = path.join(ROOT, 'src/data/credit-cards-scraped.json');

const EXTRA_SLUGS = [
  {
    slug: 'humm90-platinum-mastercard',
    fullUrl:
      'https://www.utilitychoices.com.au/credit-cards/humm90-platinum-mastercard',
  },
];

function parseDetailPage(html, slug) {
  const text = stripHtml(html);
  const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  const name = titleMatch?.[1]?.trim() ?? slug;

  const { pros, cons } = extractProsConsFromHtml(html);
  const summary = extractSummaryFromText(text, name);

  const details = {};
  const detailLabels = [
    'Balance transfer rate p.a.',
    'Balance transfer limit',
    'Purchase rate p.a.',
    'Interest-free days',
    'Cash advance rate p.a.',
    'Min credit limit',
    'Card type',
    'Annual fee',
    'Minimum monthly repayment',
    'Late payment fee',
    'Foreign currency conversion fee',
    'Cash advance fee',
    'Rewards program',
    'Bonus points',
    'Rewards points per $ spent',
    'Minimum income',
  ];

  for (const label of detailLabels) {
    const re = new RegExp(`${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*([^\\n]{1,120})`, 'i');
    const m = text.match(re);
    if (m?.[1]) details[label] = m[1].trim();
  }

  const tables = parseCreditCardDetailTables(html);

  return {
    slug,
    name,
    summary,
    pros,
    cons,
    details,
    detailsProduct: tables.detailsProduct,
    detailsFees: tables.detailsFees,
    eligibility: tables.eligibility,
    rewards: tables.rewards,
    rawLength: text.length,
  };
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UtilityChoiceScraper/1.0)' },
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

async function main() {
  const routes = JSON.parse(fs.readFileSync(ROUTES_PATH, 'utf8'));
  const all = [
    ...routes.map((r) => ({ slug: r.slug, fullUrl: r.fullUrl })),
    ...EXTRA_SLUGS.filter((e) => !routes.some((r) => r.slug === e.slug)),
  ];

  const listingHtml = await fetchPage('https://www.utilitychoices.com.au/credit-cards');
  const listingCards = [];

  const cardBlocks = listingHtml.split(/Read More/i).slice(1);
  for (const block of cardBlocks) {
    const nameMatch = block.match(/>([^<]{8,80})</);
    const rates = block.match(/Interest Rates[\s\S]*?(\d+\.?\d*)/i);
    const bonus = block.match(/Bonus Point[\s\S]*?(\d+|N\/A)/i);
    const reward = block.match(/Reward Point[\s\S]*?([\d.]+|N\/A)/i);
    const interestFree = block.match(/Interest Free[\s\S]*?(Up to[^<]{5,60})/i);
    const charges = block.match(/Charges[\s\S]*?(\$[^<]{3,80})/i);
    if (nameMatch) {
      listingCards.push({
        name: stripHtml(nameMatch[1]),
        interestRate: rates?.[1] ?? '',
        bonusPoints: bonus?.[1] ?? '',
        rewardPoints: reward?.[1] ?? '',
        interestFree: interestFree?.[1]?.replace(/\s+/g, ' ').trim() ?? '',
        charges: charges?.[1]?.replace(/\s+/g, ' ').trim() ?? '',
      });
    }
  }

  const details = [];
  for (const { slug, fullUrl } of all) {
    try {
      console.log(`Fetching ${slug}...`);
      const html = await fetchPage(fullUrl);
      details.push(parseDetailPage(html, slug));
      await new Promise((r) => setTimeout(r, 400));
    } catch (err) {
      console.error(`  skip ${slug}: ${err.message}`);
    }
  }

  fs.writeFileSync(
    OUT_PATH,
    `${JSON.stringify({ listingCards, details, scrapedAt: new Date().toISOString() }, null, 2)}\n`
  );
  console.log(`Wrote ${details.length} details, ${listingCards.length} listing cards → ${OUT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
