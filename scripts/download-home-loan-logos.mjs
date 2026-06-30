/**
 * Download home loan lender logos from utilitychoices.com.au item pages.
 *
 * Usage: node scripts/download-home-loan-logos.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractHomeLoanLogoMediaId } from './lib/home-loan-detail-parser.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ROUTES_PATH = path.join(ROOT, 'src/data/items-routes.json');
const OUT_DIR = path.join(ROOT, 'public/assets/home-loans');
const MAP_PATH = path.join(ROOT, 'src/data/home-loan-images.json');

function uniqueRoutes(routes) {
  const seen = new Set();
  const out = [];
  for (const r of routes) {
    const slug = decodeURIComponent(r.slug);
    if (seen.has(slug)) continue;
    seen.add(slug);
    out.push({ slug, fullUrl: r.fullUrl });
  }
  return out;
}

function slugToFilename(slug) {
  const safe = slug.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
  return safe.slice(0, 80);
}

async function downloadMedia(mediaId, destPath) {
  const url = `https://static.wixstatic.com/media/${encodeURIComponent(mediaId).replace(/%7E/gi, '~')}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UtilityChoice/1.0)' },
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  fs.writeFileSync(destPath, Buffer.from(await res.arrayBuffer()));
}

async function main() {
  const routes = uniqueRoutes(JSON.parse(fs.readFileSync(ROUTES_PATH, 'utf8')));
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const map = fs.existsSync(MAP_PATH)
    ? JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'))
    : {};

  for (const { slug, fullUrl } of routes) {
    try {
      const res = await fetch(fullUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UtilityChoice/1.0)' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      const mediaId = extractHomeLoanLogoMediaId(html);
      if (!mediaId) {
        console.warn(`No logo for ${slug}`);
        continue;
      }
      const ext = path.extname(mediaId.split('?')[0]) || '.png';
      const base = slugToFilename(slug);
      const filename = `${base}${ext}`;
      const dest = path.join(OUT_DIR, filename);
      if (!fs.existsSync(dest)) {
        await downloadMedia(mediaId, dest);
        console.log(`OK ${slug} → ${filename}`);
      } else {
        console.log(`Skip ${filename}`);
      }
      map[slug] = `/assets/home-loans/${filename}`;
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      console.error(`${slug}:`, err.message);
    }
  }

  fs.writeFileSync(MAP_PATH, `${JSON.stringify(map, null, 2)}\n`);
  console.log(`Wrote ${Object.keys(map).length} entries → ${MAP_PATH}`);
}

main().catch(console.error);
