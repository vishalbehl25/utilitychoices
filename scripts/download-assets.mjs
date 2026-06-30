import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  walk,
  extractMediaId,
  categorizeWixUrl,
  localPathForMediaId,
  wixMediaUrl,
  downloadToFile,
  collectReferencedAssetPaths,
} from './lib/asset-paths.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS_DIR = path.join(ROOT, 'public', 'assets');
const SRC_DIR = path.join(ROOT, 'src');
const PUBLIC_DIR = path.join(ROOT, 'public');
const EXTRACTED_PATH = path.join(ROOT, 'extracted-logos.json');

const DOTLOTTIE_BASE =
  'https://unpkg.com/@dotlottie/player-component@2.7.12/dist';

const EXTRA_ASSETS = [
  {
    url: `${DOTLOTTIE_BASE}/dotlottie-player.mjs`,
    localPath: '/assets/vendor/dotlottie-player.mjs',
  },
  {
    url: `${DOTLOTTIE_BASE}/chunk-ODPU3M3Z.mjs`,
    localPath: '/assets/vendor/chunk-ODPU3M3Z.mjs',
  },
  {
    url: `${DOTLOTTIE_BASE}/chunk-TRZ6EGBZ.mjs`,
    localPath: '/assets/vendor/chunk-TRZ6EGBZ.mjs',
  },
  {
    url: `${DOTLOTTIE_BASE}/chunk-HDDX7F4A.mjs`,
    localPath: '/assets/vendor/chunk-HDDX7F4A.mjs',
  },
  {
    url: `${DOTLOTTIE_BASE}/chunk-ZWH2ESXT.mjs`,
    localPath: '/assets/vendor/chunk-ZWH2ESXT.mjs',
  },
  {
    url: `${DOTLOTTIE_BASE}/lottie_svg-MJGYILXD-NRTSROOT.mjs`,
    localPath: '/assets/vendor/lottie_svg-MJGYILXD-NRTSROOT.mjs',
  },
  {
    url: 'https://lottie.host/9ddcffa2-4b22-4879-938f-2f3196982be5/SKELVoMOvB.lottie',
    localPath: '/assets/hero/hero-animation.lottie',
  },
  {
    url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80',
    localPath: '/assets/videos/energy-bills-thumbnail.jpg',
  },
  {
    url: 'https://i.ytimg.com/vi/dNElZ_FYwNA/hqdefault.jpg',
    localPath: '/assets/videos/cost-of-living-thumbnail.jpg',
  },
  {
    url: 'https://i.ytimg.com/vi/SnVWaRSDn4c/hqdefault.jpg',
    localPath: '/assets/videos/energy-bills-thumbnail.jpg',
  },
  {
    url: 'https://static.wixstatic.com/media/52d9c9_d029b565386e4d6b915b9a767222000e~mv2.png/v1/fill/w_192,h_192,lg_1,usm_0.66_1.00_0.01/52d9c9_d029b565386e4d6b915b9a767222000e~mv2.png',
    localPath: '/assets/favicon.png',
  },
  {
    url: 'https://static.wixstatic.com/media/52d9c9_67c9faa6987b4c34b2d27a0a8c64245b~mv2.png/v1/fill/w_226,h_118,al_c,q_85,usm_0.66_1.00_0.01/52d9c9_67c9faa6987b4c34b2d27a0a8c64245b~mv2.png',
    localPath: '/assets/logo.png',
  },
];

function localPathForUrl(url, pageHint = '') {
  const mediaId = extractMediaId(url);
  if (!mediaId) return null;
  const category = categorizeWixUrl(url, pageHint);
  if (!category) return null;
  return localPathForMediaId(mediaId, category);
}

function collectUrlsFromSource() {
  const urls = new Set();

  for (const file of walk(SRC_DIR)) {
    const content = fs.readFileSync(file, 'utf8');
    for (const match of content.matchAll(/https?:\/\/[^\s"'`]+/g)) {
      const url = match[0];
      if (/\.(png|jpe?g|gif|webp|avif|svg|mjs|ico|woff2?|lottie)(\?|$)/i.test(url)) {
        urls.add(url);
      }
    }
  }

  for (const asset of EXTRA_ASSETS) {
    urls.add(asset.url);
  }

  return [...urls];
}

function collectFromExtractedLogos() {
  const entries = [];
  if (!fs.existsSync(EXTRACTED_PATH)) return entries;

  const data = JSON.parse(fs.readFileSync(EXTRACTED_PATH, 'utf8'));
  for (const [page, images] of Object.entries(data)) {
    const pageHint = page.replace('https://www.utilitychoices.com.au', '') || '/';
    for (const { src } of images) {
      if (!src.includes('wixstatic.com')) continue;
      const local = localPathForUrl(src, pageHint);
      if (local) entries.push({ url: src, localPath: local });
    }
  }
  return entries;
}

function collectMissingReferenced() {
  const refs = collectReferencedAssetPaths([SRC_DIR, ASSETS_DIR]);
  const entries = [];

  for (const localPath of refs) {
    const dest = path.join(PUBLIC_DIR, localPath);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) continue;

    const basename = path.basename(localPath);
    const mediaId = basename.includes('~mv2') ? basename : null;
    if (!mediaId) continue;

    const category = localPath.split('/')[2];
    entries.push({
      url: wixMediaUrl(mediaId),
      localPath,
    });
  }

  return entries;
}

async function main() {
  const urlMap = new Map();

  for (const asset of EXTRA_ASSETS) {
    urlMap.set(asset.url, asset.localPath);
  }

  for (const url of collectUrlsFromSource()) {
    if (urlMap.has(url)) continue;
    const local = localPathForUrl(url);
    if (local) urlMap.set(url, local);
  }

  for (const { url, localPath: local } of collectFromExtractedLogos()) {
    if (!urlMap.has(url)) urlMap.set(url, local);
  }

  for (const { url, localPath: local } of collectMissingReferenced()) {
    if (!urlMap.has(url)) urlMap.set(url, local);
  }

  let saved = 0;
  for (const [url, localPathValue] of urlMap.entries()) {
    const destPath = path.join(ROOT, 'public', localPathValue.replace(/^\//, ''));
    if (await downloadToFile(url, destPath)) {
      console.log(`saved ${path.relative(ROOT, destPath)}`);
      saved += 1;
    }
  }

  const manifest = Object.fromEntries(urlMap.entries());
  fs.writeFileSync(path.join(ASSETS_DIR, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

  for (const file of walk(SRC_DIR)) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    for (const [remote, localPathValue] of urlMap.entries()) {
      if (content.includes(remote)) {
        content = content.split(remote).join(localPathValue);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(file, content);
      console.log(`updated ${path.relative(ROOT, file)}`);
    }
  }

  console.log(`Mirrored ${urlMap.size} URLs (${saved} newly saved) → public/assets`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
