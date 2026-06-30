/**
 * Download every site asset locally and refresh product image maps.
 *
 * Usage: node scripts/download-all-assets.mjs [--extract]
 *   --extract  Re-scrape Wix image URLs from live pages into extracted-logos.json
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function run(scriptName, args = []) {
  const scriptPath = path.join(__dirname, scriptName);
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath, ...args], {
      cwd: ROOT,
      stdio: 'inherit',
    });
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${scriptName} exited with code ${code}`));
    });
  });
}

async function main() {
  const extract = process.argv.includes('--extract');

  console.log('\n=== Utility Choice: download all assets ===\n');

  if (extract) {
    console.log('→ extract-missing-logos.mjs');
    await run('extract-missing-logos.mjs');
  }

  console.log('→ download-assets.mjs');
  await run('download-assets.mjs');

  console.log('→ download-missing.mjs');
  await run('download-missing.mjs');

  console.log('→ download-nbn-logos.mjs');
  await run('download-nbn-logos.mjs');

  console.log('→ download-credit-card-images.mjs');
  await run('download-credit-card-images.mjs');

  console.log('→ download-home-loan-logos.mjs');
  await run('download-home-loan-logos.mjs');

  console.log('→ verify-local-assets.mjs');
  await run('verify-local-assets.mjs');

  console.log('\n✓ All assets downloaded and verified.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
