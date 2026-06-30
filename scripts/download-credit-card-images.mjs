import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROUTES = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'src/data/credit-cards-routes.json'), 'utf8')
);
const OUT_DIR = path.join(ROOT, 'public/assets/credit-cards');
const OUT_JSON = path.join(ROOT, 'src/data/credit-card-images.json');

const EXTRA_ROUTES = [
  {
    slug: 'humm90-platinum-mastercard',
    fullUrl: 'https://www.utilitychoices.com.au/credit-cards/humm90-platinum-mastercard',
  },
];

function normalizeSlug(route) {
  if (route.slug === 'nab-rewards-platinum-card-%E2%80%93-velocity-points') {
    return 'nab-rewards-platinum-card-velocity-points';
  }
  return route.slug;
}

function extractCardImageUrl(html) {
  const w320 = html.match(
    /static\.wixstatic\.com\/media\/([a-f0-9]+_[^"'\\s]+~mv2\.(?:webp|png|jpg))\/v1\/fill\/w_320/
  );
  if (w320) {
    const id = w320[1].replace(/%7E/gi, '~');
    return `https://static.wixstatic.com/media/${id}/v1/fill/w_320,h_200,al_c/${id}`;
  }
  const w180 = html.match(
    /static\.wixstatic\.com\/media\/([a-f0-9]+_[^"'\\s]+~mv2\.(?:webp|png|jpg))\/v1\/fill\/w_1[68]0/
  );
  if (w180) {
    const id = w180[1].replace(/%7E/gi, '~');
    return `https://static.wixstatic.com/media/${id}/v1/fill/w_320,h_200,al_c/${id}`;
  }
  return null;
}

function localPathForSlug(slug, remoteUrl) {
  const ext =
    remoteUrl.match(/~mv2\.(\w+)/)?.[1] ??
    remoteUrl.match(/\.(\w+)(?:\?|$)/)?.[1] ??
    'webp';
  return `/assets/credit-cards/${slug}.${ext}`;
}

async function downloadFile(url, destPath) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UtilityChoice/1.0)' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buf);
  return buf.length;
}

async function main() {
  const map = {};
  const seen = new Set();
  const allRoutes = [...ROUTES, ...EXTRA_ROUTES];

  for (const route of allRoutes) {
    const slug = normalizeSlug(route);
    if (seen.has(slug)) continue;
    seen.add(slug);

    try {
      const res = await fetch(route.fullUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UtilityChoice/1.0)' },
      });
      const html = await res.text();
      let remoteUrl = extractCardImageUrl(html);
      if (!remoteUrl && slug === 'humm90-platinum-mastercard') {
        remoteUrl =
          'https://cdn.humm90.com/uploads/sites/3/2023/12/humm90-interest-free-card-600w.png';
      }
      if (!remoteUrl) {
        console.log(slug, 'miss');
        continue;
      }

      const localPath = localPathForSlug(slug, remoteUrl);
      const dest = path.join(ROOT, 'public', localPath);
      const bytes = await downloadFile(remoteUrl, dest);
      map[slug] = localPath;
      console.log(slug, 'ok', bytes, 'bytes', localPath);
      await new Promise((r) => setTimeout(r, 250));
    } catch (e) {
      console.error(slug, e.message);
    }
  }

  fs.writeFileSync(OUT_JSON, `${JSON.stringify(map, null, 2)}\n`);
  console.log('wrote', Object.keys(map).length, 'entries to', OUT_JSON);
}

main();
