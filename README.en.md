# Our Story · A Pixel Narrative

[简体中文](README.md) · **English**

A non-commercial, fan-made pixel romance story. Act 1 is a phone shooter played in a
hallway and a bedroom; the screen then hands over to the school arc: the corridor, the
blackboard, the broadcast room, the evening broadcast, and finally a CG by the white
railing after school.

The whole game is static pages: **no build step, no server**. Double-click
`prototype.html` in Chrome and play from the first scene to the ending.

## How to play

1. Double-click `prototype.html` (Chrome recommended; it runs straight from `file://`).
2. When Act 1 ends and the diary finishes, press `E`. The school arc loads into a
   full-screen frame inside the same page; the outer page never navigates away.
3. The school arc runs on: corridor → blackboard → broadcast room → evening broadcast →
   the corridor after the broadcast → the railing CG.

Common keys:

| Action | Key |
| --- | --- |
| Move | `WASD` / arrow keys |
| Interact / advance dialogue | `E` / `Enter` |
| Pause (Act 1, school preview) | `Esc` |
| Restart the current act | `R` |

The blackboard and broadcast minigames have their own toolbars and rhythm mechanics;
prompts appear on screen.

## Layout

| Path | Contents |
| --- | --- |
| `prototype.html` | Act 1: hallway, bedroom, the phone shooter, closing diary |
| `school-preview.html` | School arc opening and corridor; entered after Act 1's diary |
| `act2/` | Blackboard and the transition to the broadcast room |
| `act3/` | Evening broadcast rhythm minigame |
| `act4/after-broadcast/` | The corridor after the broadcast; railing CG ending |
| `act5/` | Daily school chapters (separate entry: `daily.html`) |
| `assets/` | Pixel characters, scenes, CGs, tiles and Aseprite sources |
| `tools/` | Asset generation and import scripts |
| `game/dust-corridor/` | The phone shooter inside Act 1 (built on claude-of-duty, MIT) |
| `*.md` | Design, handover and asset notes |

## Tests

Node.js and a local Chrome are required (Playwright uses `channel: 'chrome'`). Install
the dependencies before the first run:

```bash
# from the repository root
cd game/dust-corridor
npm install
node tools/story-chain-check.mjs     # Act 1 → school arc → railing CG, end to end
node tools/act2-link-check.mjs       # Act 1 diary → in-page Act 2
node tools/return-check.mjs          # returning home and the diary after the phone shooter
node tools/act2-ui-check.mjs         # shared E / Esc / R across both acts
node tools/ui-parity-probe.mjs       # side-by-side UI screenshots
```

The blackboard and broadcast chapters have their own checks (from the repository root):

```bash
node act2/tools/check.cjs
node act3/tools/check.cjs
node act5/tools/check.cjs
```

## Assets and upstream

- Pixel characters, scenes and CGs are original to this project and released under MIT.
- The phone shooter in Act 1 is adapted from
  [claude-of-duty](https://github.com/Leonxlnx/claude-of-duty) (MIT). Its `LICENSE` and
  copyright notice are kept in `game/dust-corridor/LICENSE`.
- Uses Three.js at runtime; fonts are system fonts, and no font files are bundled.

## License

The code, documentation and original assets in this project are released under the MIT
License; see [LICENSE](LICENSE). Third-party components and assets keep their own
licenses and attribution requirements.

This is a non-commercial personal fan work; the characters and events are for
storytelling only and do not grant rights to any real person or commercial work.
