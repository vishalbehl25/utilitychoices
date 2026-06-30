/**
 * Scrape NBN plan detail tabs from utilitychoices.com.au
 *
 * Usage: node scripts/scrape-nbn-plan-details.mjs
 *        node scripts/build-nbn-plan-details.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseNBNPlanDetail } from './lib/nbn-detail-parser.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadPlansFromDataFile() {
  const src = fs.readFileSync(
    path.join(ROOT, 'src/data/nbn-plans.ts'),
    'utf8',
  );
  const plans = [];
  for (const m of src.matchAll(/slug: '([^']+)',\s*\n\s*name: '([^']+)'/g)) {
    plans.push({ slug: m[1], name: m[2].replace(/\\'/g, "'") });
  }
  return plans;
}
const ROUTES_PATH = path.join(ROOT, 'src/data/nbn-routes.json');
const OUT_PATH = path.join(ROOT, 'src/data/nbn-plan-details-scraped.json');

function normalizeSlug(slug) {
  return slug.replace(/^-/, '').replace(/-$/, '').replace(/%C2%AE/g, '');
}

function loadRoutes() {
  return JSON.parse(fs.readFileSync(ROUTES_PATH, 'utf8'));
}

function normalizeUrl(slug, routes) {
  const clean = normalizeSlug(slug);
  const match = routes.find((r) => {
    const routeSlug = normalizeSlug(r.slug);
    return (
      r.slug === slug ||
      routeSlug === clean ||
      routeSlug === slug ||
      r.slug === `-${clean}` ||
      r.slug === `${clean}-`
    );
  });
  if (match?.fullUrl) return match.fullUrl;
  if (slug.includes('optus')) {
    const optus = routes.find((r) => normalizeSlug(r.slug) === `${clean}®`);
    if (optus?.fullUrl) return optus.fullUrl;
  }
  return `https://www.utilitychoices.com.au/nbn/${encodeURIComponent(clean)}`;
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UtilityChoiceScraper/1.0)' },
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

async function main() {
  const routes = loadRoutes();
  const existing = fs.existsSync(OUT_PATH)
    ? JSON.parse(fs.readFileSync(OUT_PATH, 'utf8')).plans ?? {}
    : {};
  const bySlug = { ...existing };
  const plans = loadPlansFromDataFile();
  console.log('Plans to scrape:', plans.length);

  for (const plan of plans) {
    const slug = plan.slug;
    const url = normalizeUrl(slug, routes);
    try {
      console.log('Fetching', slug);
      const html = await fetchPage(url);
      const parsed = parseNBNPlanDetail(html, plan.name);
      bySlug[slug] = {
        slug,
        name: plan.name,
        scrapedAt: new Date().toISOString(),
        ...parsed,
      };
      const costKeys = Object.keys(parsed.cost).length;
      const infoKeys = Object.keys(parsed.planInfo).length;
      console.log(`  ok planInfo=${infoKeys} cost=${costKeys}`);
      await new Promise((r) => setTimeout(r, 400));
    } catch (err) {
      console.error('  skip', slug, err.message);
    }
  }

  fs.writeFileSync(
    OUT_PATH,
    `${JSON.stringify({ scrapedAt: new Date().toISOString(), plans: bySlug }, null, 2)}\n`,
  );
  console.log(`Wrote ${Object.keys(bySlug).length} plans → ${OUT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
