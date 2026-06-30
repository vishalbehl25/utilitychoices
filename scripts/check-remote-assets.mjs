/**
 * Fails if src/ references remote images or media (Wix CDN, etc.).
 * Page URLs, APIs, YouTube embeds, and scrape metadata are allowlisted.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { walk } from './lib/asset-paths.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');

const SCAN_EXT = /\.(ts|tsx|css)$/i;
const SKIP_FILES = /-routes\.json$|pages-routes\.json$/;

const REMOTE_ASSET_HOSTS = [
  'static.wixstatic.com',
  'images.unsplash.com',
  'i.ytimg.com',
  'lottie.host',
];

const MEDIA_EXT =
  /\.(png|jpe?g|webp|gif|avif|svg|ico|lottie|mp4|webm|mjs)(\?|#|$)/i;

const URL_RE = /https?:\/\/[^\s"'`<>]+/gi;

function isAllowedContext(line) {
  return (
    /["']fullUrl["']\s*:/.test(line) ||
    /["']sourceUrl["']\s*:/.test(line) ||
    /["']utilityChoiceUrl["']\s*:/.test(line) ||
    /["']nbnPlansUrl["']\s*:/.test(line) ||
    /metadataBase/.test(line) ||
    /SITE_CONFIG\.url/.test(line)
  );
}

function isAllowedUrl(url) {
  if (/youtube\.com\/embed\//i.test(url)) return true;
  if (/schema\.org/i.test(url)) return true;
  if (/w3\.org\/2000\/svg/i.test(url)) return true;
  if (/places\.googleapis\.com/i.test(url)) return true;
  if (/photon\.komoot\.io/i.test(url)) return true;
  if (/facebook\.com|linkedin\.com|x\.com|twitter\.com/i.test(url)) return true;
  return false;
}

function isRemoteAssetUrl(url) {
  if (isAllowedUrl(url)) return false;

  try {
    const { hostname, pathname } = new URL(url.replace(/[),.;]+$/, ''));
    if (REMOTE_ASSET_HOSTS.some((h) => hostname === h || hostname.endsWith(`.${h}`))) {
      return true;
    }
    if (hostname.includes('unpkg.com') && /\/dist\//.test(pathname)) return true;
    if (MEDIA_EXT.test(pathname)) return true;
  } catch {
    return false;
  }

  return false;
}

function scanFile(filePath) {
  const rel = path.relative(ROOT, filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const hits = [];

  for (const line of content.split('\n')) {
    if (isAllowedContext(line)) continue;

    for (const match of line.matchAll(URL_RE)) {
      const url = match[0];
      if (isRemoteAssetUrl(url)) {
        hits.push({ url, line: line.trim() });
      }
    }
  }

  return hits.map((h) => ({ file: rel, ...h }));
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error('src/ not found');
    process.exit(1);
  }

  const violations = [];

  for (const file of walk(SRC)) {
    if (!SCAN_EXT.test(file)) continue;
    if (SKIP_FILES.test(file)) continue;
    violations.push(...scanFile(file));
  }

  if (violations.length === 0) {
    console.log('OK — no remote image/media URLs in src/ (TS, TSX, CSS).');
    return;
  }

  console.error(`Found ${violations.length} remote asset URL(s) in src/:\n`);
  for (const v of violations) {
    console.error(`  ${v.file}`);
    console.error(`    ${v.url}`);
    console.error(`    ${v.line}\n`);
  }
  console.error(
    'Use /assets/... paths under public/ and run npm run download-all-assets if needed.',
  );
  process.exit(1);
}

main();
