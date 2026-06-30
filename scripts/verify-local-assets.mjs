import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectReferencedAssetPaths } from './lib/asset-paths.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');

const roots = [path.join(ROOT, 'src'), path.join(PUBLIC, 'assets')];

const refs = collectReferencedAssetPaths(roots);
const missing = refs.filter((ref) => !fs.existsSync(path.join(PUBLIC, ref)));

if (missing.length) {
  console.error(`Missing ${missing.length} referenced asset(s):`);
  for (const ref of missing) console.error(`  ${ref}`);
  process.exit(1);
}

console.log(`OK — ${refs.length} local asset path(s) verified.`);
