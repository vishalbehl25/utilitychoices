/**
 * Scrape home loan detail tabs from utilitychoices.com.au/items/[slug]
 *
 * Usage: node scripts/scrape-home-loan-details.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHomeLoanDetail } from './lib/home-loan-detail-parser.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROUTES_PATH = path.join(ROOT, 'src/data/items-routes.json');
const OUT_PATH = path.join(ROOT, 'src/data/home-loan-details-scraped.json');

function loadRoutes() {
  return JSON.parse(fs.readFileSync(ROUTES_PATH, 'utf8'));
}

function uniqueRoutes(routes) {
  const seen = new Set();
  const out = [];
  for (const r of routes) {
    const slug = decodeURIComponent(r.slug);
    if (seen.has(slug)) continue;
    seen.add(slug);
    out.push({ ...r, slug });
  }
  return out;
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UtilityChoiceScraper/1.0)' },
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

async function main() {
  const routes = uniqueRoutes(loadRoutes());
  const bySlug = {};

  for (const route of routes) {
    const { slug, fullUrl } = route;
    try {
      console.log('Fetching', slug);
      const html = await fetchPage(fullUrl);
      const title = html.match(/<h1[^>]*>([^<]+)/i)?.[1]?.trim();
      const name =
        title ||
        slug
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
      const parsed = parseHomeLoanDetail(html, name);
      bySlug[slug] = {
        slug,
        name,
        scrapedAt: new Date().toISOString(),
        ...parsed,
      };
      console.log(
        `  ok details=${Object.keys(parsed.details).length} fees=${Object.keys(parsed.fees).length} logo=${parsed.logoMediaId ?? 'none'}`,
      );
      await new Promise((r) => setTimeout(r, 350));
    } catch (err) {
      console.error('  skip', slug, err.message);
    }
  }

  fs.writeFileSync(
    OUT_PATH,
    `${JSON.stringify({ scrapedAt: new Date().toISOString(), plans: bySlug }, null, 2)}\n`,
  );
  console.log(`Wrote ${Object.keys(bySlug).length} → ${OUT_PATH}`);
}

main().catch(console.error);
