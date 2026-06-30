/**
 * Validate NBN listing + detail data consistency
 * Usage: node scripts/validate-nbn-data.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { PATHS, loadPlansFromTs, loadJson } from './lib/nbn-plan-utils.mjs';
import { parseMoney } from './lib/nbn-merge-utils.mjs';

const plans = loadPlansFromTs();
const detailsSrc = fs.readFileSync(
  path.join(PATHS.root, 'src/data/nbn-plan-details.ts'),
  'utf8',
);

const errors = [];
const warnings = [];

for (const plan of plans) {
  const slugEsc = plan.slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const blockMatch = detailsSrc.match(
    new RegExp(`getNBNBySlug\\('${slugEsc}'\\)!,[\\s\\S]*?planInfo: \\{([\\s\\S]*?)\\},\\s*cost:`),
  );
  if (!blockMatch) {
    errors.push(`${plan.slug}: missing in nbn-plan-details.ts`);
    continue;
  }

  const costMatch = detailsSrc.match(
    new RegExp(`getNBNBySlug\\('${slugEsc}'\\)!,[\\s\\S]*?cost: \\{([\\s\\S]*?)\\},\\s*bundles:`),
  );
  const planInfoLines = blockMatch[1];
  const costLines = costMatch?.[1] || '';

  if (!planInfoLines.trim()) {
    errors.push(`${plan.slug}: empty planInfo`);
  }
  if (!costLines.trim()) {
    errors.push(`${plan.slug}: empty cost`);
  }

  const promoMatch = costLines.match(/'Promotional Cost': '([^']+)'/);
  const ongoingMatch = costLines.match(/'Ongoing cost': '([^']+)'/);
  const promo = promoMatch?.[1];
  const ongoing = ongoingMatch?.[1];
  const listNum = parseMoney(plan.price);
  const promoNum = parseMoney(promo);
  const ongoingNum = parseMoney(ongoing);

  if (promoNum != null && promoNum >= 200 && ongoingNum != null && promoNum > ongoingNum * 2) {
    warnings.push(`${plan.slug}: Promotional Cost ${promo} looks like minimum total`);
  }

  if (listNum != null && promoNum != null && promo !== 'N/A' && Math.abs(listNum - promoNum) > 0.02) {
    if (ongoingNum == null || Math.abs(listNum - ongoingNum) > 0.02) {
      warnings.push(
        `${plan.slug}: listing ${plan.price} vs promo ${promo} / ongoing ${ongoing || 'N/A'}`,
      );
    }
  }
}

const report = loadJson(PATHS.researchReport);
if (report?.plans) {
  for (const [slug, row] of Object.entries(report.plans)) {
    if (row.status === 'uc_broken') {
      warnings.push(`${slug}: UC page title "${row.ucTitle}" ≠ plan name`);
    }
    if (row.status === 'needs_manual') {
      errors.push(`${slug}: research status needs_manual`);
    }
  }
}

console.log('Validation:', plans.length, 'plans');
console.log('Errors:', errors.length);
errors.forEach((e) => console.log('  ERROR', e));
console.log('Warnings:', warnings.length);
warnings.slice(0, 20).forEach((w) => console.log('  WARN', w));
if (warnings.length > 20) console.log(`  ... and ${warnings.length - 20} more`);

if (errors.length > 0) process.exit(1);
console.log('\nOK — no blocking errors');
