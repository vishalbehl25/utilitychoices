import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');

const MISSING_LOGOS = [
  { name: 'CBA', file: '52d9c9_ad5868df5c704b7aa1399beab6a7e692~mv2.png' },
  { name: 'Ubank', file: '52d9c9_6d42a50711c74c46a14f74f035b1a622~mv2.png' },
  { name: 'Macquarie', file: '52d9c9_c05d23a1a63b4b1cbb520b932b54bc82~mv2.webp' },
  { name: 'Latitude', file: '52d9c9_8ae17f2209c14f96a394bb92b1d54d33~mv2.png' },
  { name: 'OMM', file: '52d9c9_ca609be0ba8c486c9e3c2aeaa6057acc~mv2.png' },
  { name: 'ReneSola', file: '52d9c9_ca96ab2954374825b3e6ada778e1509d~mv2.png' },
  { name: 'JA Solar', file: '52d9c9_a26c20a3f7f24a24bb9bcc353874475a~mv2.png' },
  { name: 'Westwind', file: '52d9c9_87833f1c489341938b1a3a89e8c21ab3~mv2.png' },
  { name: 'Moose NBN', file: '52d9c9_37cebafe658d4e138d8ab2ac35339f13~mv2.webp' },
  { name: 'Fox ESS', file: '52d9c9_9b155ad914054c89a4321dfe4d44da29~mv2.jpg' }
];

async function download(url, destPath) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${url} (${response.status})`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(destPath, buffer);
  console.log(`Downloaded: ${path.basename(destPath)}`);
}

async function main() {
  const partnersDir = path.join(PUBLIC_DIR, 'assets', 'partners');
  fs.mkdirSync(partnersDir, { recursive: true });

  for (const logo of MISSING_LOGOS) {
    const url = `https://static.wixstatic.com/media/${logo.file}`;
    const destPath = path.join(partnersDir, logo.file);
    try {
      await download(url, destPath);
    } catch (err) {
      console.error(`Error downloading ${logo.name}: ${err.message}`);
    }
  }
}

main().catch(console.error);
