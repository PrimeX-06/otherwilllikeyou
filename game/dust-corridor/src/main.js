import './ui/style.css';
import { Game } from './game/Game.js';
import { Settings } from './core/Settings.js';
import { installHarness } from './core/Harness.js';
import { showFatalOverlay } from './ui/Fatal.js';

/**
 * Entry point. Boots the game, wires the global keys and exposes a small
 * handle for the automated harness.
 */

const canvas = document.getElementById('scene');
const uiRoot = document.getElementById('ui-root');
const params = new URLSearchParams(location.search);

/**
 * Embedded in the pixel story (`?embed=1`).
 *
 * The outer page frames this segment for scenes 04–06 of the first act. The
 * message pairs are the contract the story and the game share — the story
 * sends `start`, `switchControl` and `exit`; the game answers `ready`,
 * `result` and `exit`. Nothing here is required for the game to be playable on
 * its own: without the flag every message below is skipped.
 */
const EMBED = params.get('embed') === '1';
const host = EMBED && window.parent !== window ? window.parent : null;
const toHost = (msg) => host?.postMessage({ source: 'dust-corridor', ...msg }, '*');

const game = new Game(canvas, uiRoot);
game.embed = EMBED;
game.onSegmentEnd = () => toHost({ type: 'result' });
// The host keeps the frame black until there is a picture worth fading up: the
// menu's orbit is not part of the phone.
game.onSegmentStart = () => toHost({ type: 'started' });

window.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  if (game.handleKey?.(e.code)) e.preventDefault();
}, false);

if (EMBED) {
  // The act card and the way back belong to the story; the segment only says
  // that it is done and lets the player press the key the story shows.
  window.addEventListener('keydown', (e) => {
    if (e.repeat || game.state !== 'outro') return;
    if (e.code === 'KeyE' || e.code === 'Enter') {
      e.preventDefault();
      toHost({ type: 'exit' });
    }
  }, false);

  window.addEventListener('message', (e) => {
    const d = e.data;
    if (!d || d.source !== 'phone-story') return;
    if (d.type === 'start' && game.state === 'menu') game.startMatch();
    else if (d.type === 'switchControl' && typeof d.mode === 'string') {
      game.setControlMode(d.mode, { gesture: false });
    } else if (d.type === 'exit') {
      game.story?.stop();
      game.quitToMenu();
    }
  }, false);
}

// Nothing here re-acquires pointer lock.
//
// This used to relock on any canvas mousedown while the state was 'playing',
// which combined with a lock-loss handler that never ran meant Escape gave the
// mouse back and the very next click took it again, with no menu in between.
// The mouse is now only ever taken from a deliberate press of Deploy or
// Resume; losing it pauses the match, and it stays lost until asked for.
void canvas;

game.boot().then(() => {
  window.__game = game;
  installHarness(game);
  window.__ready = true;
  if (EMBED) {
    // No start screen inside the story: the story says when the match begins,
    // and until it does there is nothing on the phone worth showing.
    game.menu.hide();
    toHost({ type: 'ready' });
  } else if (params.get('auto') === '1') {
    // ?auto=1 drops straight into a match, which is how the tests run.
    game.startMatch();
  }
}).catch((err) => {
  console.error(err);
  uiRoot.innerHTML = '';
  showFatalOverlay(uiRoot, 'Failed to start', err.message,
    'Requires WebGL2 with multiple render targets and float textures.');
  toHost({ type: 'failed', reason: err.message });
});

// Expose settings so the harness can force a preset without touching storage.
window.__settings = Settings;
