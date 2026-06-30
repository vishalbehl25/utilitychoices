import fs from 'node:fs';
import path from 'node:path';

export function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else if (/\.(ts|tsx|js|jsx|json|css|html|mjs)$/.test(entry.name)) files.push(fullPath);
  }
  return files;
}

export function extractMediaId(url) {
  const match = url.match(/\/media\/([^/]+)\//);
  return match?.[1]?.replace(/%7E/gi, '~') ?? null;
}

/** Map a Wix CDN URL to a folder under /assets */
export function categorizeWixUrl(url, pageHint = '') {
  if (url.includes('unsplash.com') || url.includes('ytimg.com')) return 'videos';
  if (url.includes('unpkg.com') || url.includes('lottie.host')) return null;
  if (url.includes('w_153,h_84')) return 'trust-badges';
  if (/~mv2\.gif/i.test(url)) return 'service-tabs';
  if (/w_198,h_74|w_95,h_38|w_99,h_37/.test(url)) return 'footer';
  if (/w_74,h_74/.test(url)) return 'iso';
  if (/w_192,h_192/.test(url)) return 'favicon';
  if (/w_226,h_118/.test(url)) return 'logo';
  if (pageHint.includes('nbn') && /ef42b6_/.test(url)) return 'nbn';
  if (pageHint.includes('credit-cards') && /ef42b6_/.test(url)) return 'partners';
  return 'partners';
}

export function localPathForMediaId(mediaId, category) {
  if (!mediaId) return null;
  if (category === 'favicon') return '/assets/favicon.png';
  if (category === 'logo') return '/assets/logo.png';
  const filename = mediaId.includes('.') ? mediaId : `${mediaId}.bin`;
  return `/assets/${category}/${filename}`;
}

export function wixMediaUrl(mediaId) {
  return `https://static.wixstatic.com/media/${encodeURIComponent(mediaId).replace(/%7E/gi, '~')}`;
}

export async function downloadToFile(url, destPath, { force = false } = {}) {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  if (!force && fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
    return false;
  }

  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UtilityChoiceAssetMirror/1.0)' },
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${url} (${response.status})`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(destPath, buffer);
  return true;
}

/** Collect /assets/... paths referenced in source trees */
export function collectReferencedAssetPaths(roots) {
  const refs = new Set();
  const pattern = /['"`](\/assets\/[^'"`?\s]+)['"`]/g;

  for (const root of roots) {
    if (!fs.existsSync(root)) continue;
    for (const file of walk(root)) {
      const content = fs.readFileSync(file, 'utf8');
      for (const match of content.matchAll(pattern)) {
        refs.add(match[1].split('?')[0]);
      }
    }
  }

  return [...refs].sort();
}
