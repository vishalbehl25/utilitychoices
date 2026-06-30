/**
 * Refresh summary, pros, cons, and detail tables from live utilitychoices.com.au pages.
 * Usage: node scripts/refresh-credit-card-prose.mjs && node scripts/build-credit-card-details.mjs
 */
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
const CARDS_TS = path.join(ROOT, 'src/data/credit-cards.ts');
const SCRAPED_PATH = path.join(ROOT, 'src/data/credit-cards-scraped.json');
const TABLES_PATH = path.join(ROOT, 'src/data/credit-card-detail-tables.json');

function parseCardsFromTs() {
  const src = fs.readFileSync(CARDS_TS, 'utf8');
  const cards = [];
  const blocks = src.matchAll(
    /\{\s*slug:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"],/g
  );
  for (const m of blocks) cards.push({ slug: m[1], name: m[2] });
  return cards;
}

function normalizeSlug(slug) {
  if (slug === 'nab-rewards-platinum-card-%E2%80%93-velocity-points') {
    return 'nab-rewards-platinum-card-velocity-points';
  }
  return slug;
}

async function main() {
  const routes = JSON.parse(fs.readFileSync(ROUTES_PATH, 'utf8'));
  const cardsBySlug = Object.fromEntries(
    parseCardsFromTs().map((c) => [c.slug, c.name])
  );
  const scraped = fs.existsSync(SCRAPED_PATH)
    ? JSON.parse(fs.readFileSync(SCRAPED_PATH, 'utf8'))
    : { details: [] };
  const detailBySlug = Object.fromEntries(
    (scraped.details ?? []).map((d) => [normalizeSlug(d.slug), d])
  );
  const tablesBySlug = {};

  // Live site serves humm90 content at westpac-low-rate-card (humm90 URL 404).
  const HUMM90_SOURCE_URL =
    'https://www.utilitychoices.com.au/credit-cards/westpac-low-rate-card';

  const all = [
    ...routes
      .filter((r) => r.slug !== 'westpac-low-rate-card')
      .map((r) => ({
        slug: normalizeSlug(r.slug),
        fullUrl: r.fullUrl,
        name: cardsBySlug[normalizeSlug(r.slug)] ?? r.slug,
      })),
    {
      slug: 'humm90-platinum-mastercard',
      fullUrl: HUMM90_SOURCE_URL,
      name:
        cardsBySlug['humm90-platinum-mastercard'] ?? 'humm90 Platinum Mastercard',
    },
  ];

  for (const { slug, fullUrl, name } of all) {
    try {
      const res = await fetch(fullUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UtilityChoice/1.0)' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      const text = stripHtml(html);
      const summary = extractSummaryFromText(text, name);
      const { pros, cons } = extractProsConsFromHtml(html);
      const tables = parseCreditCardDetailTables(html);

      const entry = detailBySlug[slug] ?? { slug, name };
      if (summary) entry.summary = summary;
      if (pros.length) entry.pros = pros;
      if (cons.length) entry.cons = cons;
      entry.detailsProduct = tables.detailsProduct;
      entry.detailsFees = tables.detailsFees;
      entry.eligibility = tables.eligibility;
      entry.rewards = tables.rewards;
      detailBySlug[slug] = entry;
      tablesBySlug[slug] = tables;

      console.log(
        slug,
        summary ? `summary ${summary.length}c` : 'no summary',
        `pros ${pros.length}`,
        `cons ${cons.length}`,
        `tables ${Object.keys(tables.detailsProduct).length}/${Object.keys(tables.detailsFees).length}`
      );
      await new Promise((r) => setTimeout(r, 300));
    } catch (e) {
      console.error('skip', slug, e.message);
    }
  }

  scraped.details = Object.values(detailBySlug);
  scraped.proseRefreshedAt = new Date().toISOString();
  fs.writeFileSync(SCRAPED_PATH, `${JSON.stringify(scraped, null, 2)}\n`);
  fs.writeFileSync(TABLES_PATH, `${JSON.stringify(tablesBySlug, null, 2)}\n`);
  console.log('Updated', scraped.details.length, 'cards');
}

main();
