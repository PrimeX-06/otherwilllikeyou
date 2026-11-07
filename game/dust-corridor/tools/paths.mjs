/**
 * Where the story lives, independent of the machine.
 *
 * The tests used to hardcode an absolute `file:///D:/...` path, which meant a
 * clone could not run them. Everything is derived from this file's location:
 * tools/ → game/dust-corridor/ → pixel-act1/.
 */
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));

/** file:// URL of pixel-act1, no trailing slash. */
export const STORY_ROOT = pathToFileURL(path.resolve(HERE, '../../..')).href;
export const prototypeUrl = STORY_ROOT + '/prototype.html';
export const schoolPreviewUrl = STORY_ROOT + '/school-preview.html';
