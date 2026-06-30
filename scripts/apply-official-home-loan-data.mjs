/**
 * Apply lender-sourced rates to home-loans.ts and rebuild home-loan-details.ts
 *
 * Usage: node scripts/apply-official-home-loan-data.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OFFICIAL_PATH = path.join(ROOT, 'src/data/home-loan-official-rates.json');
const LOANS_PATH = path.join(ROOT, 'src/data/home-loans.ts');

function esc(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function patchListingField(block, field, value) {
  const re = new RegExp(`(${field}:\\s*)'[^']*'`);
  if (!re.test(block)) return block;
  return block.replace(re, `$1'${esc(value)}'`);
}

function patchHomeLoansListing(official) {
  let src = fs.readFileSync(LOANS_PATH, 'utf8');
  const blockRe = /\{[^{}]*?slug:\s*'([^']+)'[\s\S]*?\},?\n(?=\s*(?:\{|]\);))/g;

  src = src.replace(blockRe, (block, slug) => {
    const key = decodeURIComponent(slug);
    const o = official.products[slug] ?? official.products[key];
    if (!o) return block;

    let next = block;
    next = patchListingField(next, 'interestRate', o.interestRate);
    next = patchListingField(next, 'rewardPoints', o.rewardPoints);
    next = patchListingField(next, 'applicationFee', o.applicationFee);
    next = patchListingField(next, 'ongoingFee', o.ongoingFee);
    next = patchListingField(next, 'loanFee', o.loanFee);
    return next;
  });

  // Fix duplicate ANZ listing (was Macquarie 6.09% data error)
  src = src.replace(
    /listingId: 'anz-plus-home-loan-variable-rate-listing-609',[\s\S]*?loanFee: '\$3,030'/,
    (m) =>
      m
        .replace(/interestRate: '[^']+'/, "interestRate: '6.25%'")
        .replace(/loanFee: '\$3,030'/, "loanFee: '$3,098'"),
  );

  fs.writeFileSync(LOANS_PATH, src);
  console.log('Updated listing rates in', LOANS_PATH);
}

function main() {
  const official = JSON.parse(fs.readFileSync(OFFICIAL_PATH, 'utf8'));
  patchHomeLoansListing(official);

  const build = spawnSync(
    process.execPath,
    ['scripts/build-home-loan-details.mjs'],
    { cwd: ROOT, stdio: 'inherit' },
  );
  if (build.status !== 0) process.exit(build.status ?? 1);
  console.log('Done. Official rates as at:', official.ratesAsAt);
}

main();
