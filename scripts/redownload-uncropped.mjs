import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');

const CATEGORIES = ['partners', 'trust-badges', 'service-tabs', 'footer', 'iso'];

async function download(url, destPath) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${url} (${response.status})`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(destPath, buffer);
  console.log(`Successfully downloaded uncropped version: ${path.relative(ROOT, destPath)}`);
}

async function main() {
  for (const cat of CATEGORIES) {
    const dir = path.join(PUBLIC_DIR, 'assets', cat);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file === '.DS_Store') continue;
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) continue;

      // The original Wix URL is https://static.wixstatic.com/media/ + file name
      const url = `https://static.wixstatic.com/media/${file}`;
      try {
        await download(url, filePath);
      } catch (err) {
        console.error(`Error downloading ${file}: ${err.message}`);
      }
    }
  }
}

main().catch(console.error);
