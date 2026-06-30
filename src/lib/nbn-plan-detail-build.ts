import type { NBNProduct } from '@/data/nbn-plans';
import scrapedBundle from '@/data/nbn-plan-details-scraped.json';

export interface NBNPlanDetail extends NBNProduct {
  planInfo: Record<string, string>;
  cost: Record<string, string>;
  bundles: Record<string, string>;
  sidebarDownloadMbps: string;
  sidebarUploadMbps: string;
}

type ScrapedPlan = {
  planInfo: Record<string, string>;
  cost: Record<string, string>;
  bundles: Record<string, string>;
  sidebarDownloadMbps: string;
  sidebarUploadMbps: string;
};

const scrapedPlans = scrapedBundle.plans as Record<string, ScrapedPlan>;

const TECHNOLOGY_TYPE = 'FTTP FTTB FTTN FTTC HFC';

function parseMinCost(setupFees: string): string {
  const match = setupFees.match(/\$[\d,.]+ min\. total cost/i);
  if (match) return match[0].replace(/ min\. total cost/i, '');
  return '$0';
}

function parseSetupFee(setupFees: string): string {
  const match = setupFees.match(/^\$[\d,.]+/);
  return match ? match[0] : '$0';
}

function planLengthFromFeatures(features: string[]): string {
  const month = features.find((f) => /month-to-month/i.test(f));
  if (month) return 'Month-to-month';
  return features[0] ?? 'N/A';
}

function modemDescriptionFromFeatures(features: string[]): string {
  const modem = features.find((f) => /modem|BYO/i.test(f));
  return modem ?? 'N/A';
}

function maxDownloadMbps(plan: NBNProduct): number | null {
  if (plan.speedMbps != null) return plan.speedMbps;
  if (!plan.downloadSpeed) return null;
  const match = plan.downloadSpeed.match(/(\d+)/);
  return match ? Number.parseInt(match[1], 10) : null;
}

function maxUploadMbps(download: number | null): number {
  if (download == null) return 20;
  if (download >= 700) return 50;
  if (download >= 250) return 25;
  return 20;
}

function typicalUploadMbps(download: number | null): string {
  if (download == null) return 'N/A';
  if (download >= 700) return '40';
  if (download >= 250) return '22';
  return '17';
}

/** Fallback when live scrape is missing (e.g. 404 slug). */
function buildFallbackDetail(plan: NBNProduct): Omit<
  NBNPlanDetail,
  keyof NBNProduct
> {
  const download = maxDownloadMbps(plan);
  const maxUl = maxUploadMbps(download);

  return {
    planInfo: {
      'Connection Type': 'NBN',
      'Typical download speed (Mbps)':
        download != null ? String(download) : 'N/A',
      'Typical upload speed (Mbps)': typicalUploadMbps(download),
      'Technology type': TECHNOLOGY_TYPE,
      'Plan length': planLengthFromFeatures(plan.bestFeatures),
      'Maximum upload speed (Mbps)': String(maxUl),
      'Maximum download speed (Mbps)':
        download != null ? String(download) : plan.speedNote ?? 'N/A',
      'Data Allowance': plan.dataAllowance,
      'Plan type': 'N/A',
    },
    cost: {
      'Promotional Cost': plan.price,
      'Minimum cost': parseMinCost(plan.setupFees),
      'Setup fee': parseSetupFee(plan.setupFees),
      'Modem description': modemDescriptionFromFeatures(plan.bestFeatures),
      'Modem T&Cs': 'N/A',
      'Ongoing cost': plan.price,
      'Modem delivery fee': '$0',
    },
    bundles: {
      'Home phone included': 'No',
      'Entertainment included': 'No',
    },
    sidebarDownloadMbps: download != null ? String(download) : 'N/A',
    sidebarUploadMbps: String(maxUl),
  };
}

export function buildNBNPlanDetail(plan: NBNProduct): NBNPlanDetail {
  const scraped = scrapedPlans[plan.slug];

  if (scraped?.planInfo && scraped?.cost) {
    return {
      ...plan,
      planInfo: scraped.planInfo,
      cost: scraped.cost,
      bundles: scraped.bundles ?? {
        'Home phone included': 'No',
        'Entertainment included': 'No',
      },
      sidebarDownloadMbps:
        scraped.sidebarDownloadMbps ||
        scraped.planInfo['Maximum download speed (Mbps)'] ||
        'N/A',
      sidebarUploadMbps:
        scraped.sidebarUploadMbps ||
        scraped.planInfo['Maximum upload speed (Mbps)'] ||
        '20',
    };
  }

  const fallback = buildFallbackDetail(plan);
  return { ...plan, ...fallback };
}
