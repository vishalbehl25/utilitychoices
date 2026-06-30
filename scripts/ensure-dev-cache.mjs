import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';

function removeDir(path) {
  if (existsSync(path)) {
    rmSync(path, { recursive: true, force: true });
  }
}

// `next build` output in .next breaks `next dev` (missing vendor-chunks/*.js).
if (existsSync('.next/BUILD_ID')) {
  removeDir('.next');
  console.log(
    'Removed production .next cache (incompatible with next dev).\n' +
      'After `npm run build`, always run `npm run dev:clean` before `npm run dev`.',
  );
}

// Webpack / Turbopack cache can reference stale chunk paths after HMR.
removeDir('node_modules/.cache');

// macOS Gatekeeper quarantines native .node binaries after npm install.
if (process.platform === 'darwin' && existsSync('node_modules')) {
  try {
    execSync('find node_modules -name "*.node" -exec xattr -cr {} \\;', {
      stdio: 'ignore',
    });
  } catch {
    // Non-fatal
  }
}
