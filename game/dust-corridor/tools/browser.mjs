import { chromium } from '@playwright/test';

/**
 * One place to launch the browser, because the flags are not free.
 *
 * These checks used to ask for ANGLE on the real GPU (`--use-gl=angle
 * --use-angle=gl --disable-frame-rate-limit`): faster, and the frames looked
 * more like a player's. On a machine that has been through a few dozen
 * launches the GPU process starts refusing contexts outright —
 *
 *   THREE.WebGLRenderer: A WebGL context could not be created.
 *   Reason: Web page caused context loss and was blocked
 *
 * — and every check then fails at `window.__ready`, which reads exactly like a
 * broken build. The default launch path falls back to SwiftShader and always
 * boots. If you want the fast path back, set DUST_GL=angle and check that the
 * first launch still gets a context before trusting a red result.
 */
export function launch() {
  const args = process.env.DUST_GL === 'angle'
    ? ['--use-gl=angle', '--use-angle=gl', '--enable-unsafe-swiftshader',
      '--ignore-gpu-blocklist', '--disable-frame-rate-limit']
    : [];
  return chromium.launch({ channel: 'chrome', args });
}

/**
 * Wait for the game to finish booting, with one reload.
 *
 * A wedged context is not always fatal — a fresh document usually gets a new
 * one — and a check that cannot tell "slow" from "dead" is a check nobody
 * trusts.
 */
export async function waitReady(page, timeout = 45000) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      await page.waitForFunction(() => window.__ready === true, null, { timeout });
      return;
    } catch (err) {
      if (attempt === 1) throw err;
      await page.reload({ waitUntil: 'load' });
    }
  }
}
