/**
 * Skip SSG path enumeration in dev — avoids static-paths-worker loading
 * missing vendor-chunks (e.g. ./vendor-chunks/next.js) after HMR.
 */
export function staticParamsForProduction<T extends Record<string, string>>(
  buildParams: () => T[],
): T[] {
  if (process.env.NODE_ENV === 'development') {
    return [];
  }
  return buildParams();
}
