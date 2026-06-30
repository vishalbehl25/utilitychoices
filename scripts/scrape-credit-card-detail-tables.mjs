/**
 * Fetch each credit card page from utilitychoices.com.au and extract
 * Product Details + Fees & Charges (and Eligibility / Rewards) tables.
 *
 * Usage: node scripts/scrape-credit-card-detail-tables.mjs
 * Then:  node scripts/build-credit-card-details.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCreditCardDetailTables } from './lib/credit-card-table-parser.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROUTES_PATH = path.join(ROOT, 'src/data/credit-cards-routes.json');
const SCRAPED_PATH = path.join(ROOT, 'src/data/credit-cards-scraped.json');
const OUT_PATH = path.join(ROOT, 'src/data/credit-card-detail-tables.json');

const EXTRA = [
  {
    slug: 'humm90-platinum-mastercard',
    fullUrl:
      'https://www.utilitychoices.com.au/credit-cards/humm90-platinum-mastercard',
  },
];

function normalizeSlug(slug) {
  if (slug === 'nab-rewards-platinum-card-%E2%80%93-velocity-points') {
    return 'nab-rewards-platinum-card-velocity-points';
  }
  return slug;
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
    ...routes.map((r) => ({
      slug: normalizeSlug(r.slug),
      fullUrl: r.fullUrl,
    })),
    ...EXTRA.filter((e) => !routes.some((r) => normalizeSlug(r.slug) === e.slug)),
  ];

  const bySlug = {};
  for (const { slug, fullUrl } of all) {
    try {
      console.log('Fetching', slug);
      const html = await fetchPage(fullUrl);
      const tables = parseCreditCardDetailTables(html);
      const productCount = Object.keys(tables.detailsProduct).length;
      const feesCount = Object.keys(tables.detailsFees).length;
      bySlug[slug] = tables;
      console.log(
        '  ok',
        `product=${productCount}`,
        `fees=${feesCount}`,
        `eligibility=${Object.keys(tables.eligibility).length}`,
        `rewards=${Object.keys(tables.rewards).length}`
      );
      await new Promise((r) => setTimeout(r, 350));
    } catch (err) {
      console.error('  skip', slug, err.message);
    }
  }

  fs.writeFileSync(OUT_PATH, `${JSON.stringify(bySlug, null, 2)}\n`);

  // Merge into credit-cards-scraped.json detail entries when present
  if (fs.existsSync(SCRAPED_PATH)) {
    const scraped = JSON.parse(fs.readFileSync(SCRAPED_PATH, 'utf8'));
    for (const entry of scraped.details ?? []) {
      const key = normalizeSlug(entry.slug);
      const tables = bySlug[key];
      if (!tables) continue;
      entry.detailsProduct = tables.detailsProduct;
      entry.detailsFees = tables.detailsFees;
      entry.eligibility = tables.eligibility;
      entry.rewards = tables.rewards;
    }
    fs.writeFileSync(SCRAPED_PATH, `${JSON.stringify(scraped, null, 2)}\n`);
    console.log('Merged into', SCRAPED_PATH);
  }

  console.log(`Wrote ${Object.keys(bySlug).length} cards → ${OUT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
