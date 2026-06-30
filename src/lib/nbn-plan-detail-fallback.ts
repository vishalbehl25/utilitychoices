import type { NBNProduct } from '@/data/nbn-plans';

export interface NBNPlanDetail extends NBNProduct {
  planInfo: Record<string, string>;
  cost: Record<string, string>;
  bundles: Record<string, string>;
  sidebarDownloadMbps: string;
  sidebarUploadMbps: string;
}

/** Temporary fallback until scrape script runs. */
export function buildNBNPlanDetailFromListing(plan: NBNProduct): NBNPlanDetail {
  const download = plan.speedMbps ?? null;
  return {
    ...plan,
    planInfo: {
      'Connection Type': 'NBN',
      'Typical download speed (Mbps)':
        download != null ? String(download) : 'N/A',
      'Typical upload speed (Mbps)': '17',
      'Technology type': 'FTTP FTTB FTTN FTTC HFC',
      'Plan length': plan.bestFeatures[0] ?? 'Month-to-month',
      'Maximum upload speed (Mbps)': '20',
      'Maximum download speed (Mbps)':
        download != null ? String(download) : 'N/A',
      'Data Allowance': plan.dataAllowance,
      'Plan type': 'N/A',
    },
    cost: {
      'Promotional Cost': plan.price,
      'Minimum cost': plan.price,
      'Setup fee': '$0',
      'Modem description': plan.bestFeatures[1] ?? 'N/A',
      'Modem T&Cs': 'N/A',
      'Ongoing cost': plan.price,
      'Modem delivery fee': '$0',
    },
    bundles: {
      'Home phone included': 'No',
      'Entertainment included': 'No',
    },
    sidebarDownloadMbps: download != null ? String(download) : 'N/A',
    sidebarUploadMbps: '20',
  };
}
