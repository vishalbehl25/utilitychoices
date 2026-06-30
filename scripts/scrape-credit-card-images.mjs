import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROUTES = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'src/data/credit-cards-routes.json'), 'utf8')
);
const OUT = path.join(ROOT, 'src/data/credit-card-images.json');

async function fetchImage(slug, fullUrl) {
  const res = await fetch(fullUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UtilityChoice/1.0)' },
  });
  const html = await res.text();
  const match = html.match(
    /static\.wixstatic\.com\/media\/([a-f0-9]+_[^"'\\s]+~mv2\.(?:webp|png|jpg))\/v1\/fill\/w_320/
  );
  if (!match) {
    const fallback = html.match(
      /static\.wixstatic\.com\/media\/([a-f0-9]+_[^"'\\s]+~mv2\.(?:webp|png|jpg))\/v1\/fill\/w_1[68]0/
    );
    if (fallback) {
      const id = fallback[1].replace(/%7E/gi, '~');
      return `https://static.wixstatic.com/media/${id}/v1/fill/w_320,h_200,al_c/${id}`;
    }
    return null;
  }
  const id = match[1].replace(/%7E/gi, '~');
  return `https://static.wixstatic.com/media/${id}/v1/fill/w_320,h_200,al_c/${id}`;
}

async function main() {
  const map = {};
  for (const route of ROUTES) {
    const slug =
      route.slug === 'nab-rewards-platinum-card-%E2%80%93-velocity-points'
        ? 'nab-rewards-platinum-card-velocity-points'
        : route.slug;
    try {
      const url = await fetchImage(slug, route.fullUrl);
      if (url) map[slug] = url;
      console.log(slug, url ? 'ok' : 'miss');
      await new Promise((r) => setTimeout(r, 300));
    } catch (e) {
      console.error(slug, e.message);
    }
  }
  fs.writeFileSync(OUT, `${JSON.stringify(map, null, 2)}\n`);
}

main();
