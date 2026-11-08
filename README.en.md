# Our Story · A Pixel Narrative

[简体中文](README.md) · **English**

**▶ Play online · [otherwilllikeyou.vercel.app](https://otherwilllikeyou.vercel.app/)**

A non-commercial, fan-made pixel romance story. Act 1 is a phone shooter played in a
hallway and a bedroom; the screen then hands over to the school arc: the corridor, the
blackboard, the broadcast room, the evening broadcast, the CG by the white railing after
school, and then Act 3 — the third-act story layer and six ordinary school days — stopping
at the moment Yuno hands over the notebook in the corridor.

The whole game is static pages: **no build step, no server**. Double-click `index.html`
in Chrome to play from the start screen through to the latest ending.

## How to play

1. Double-click `index.html`. On the start screen, "开始完整故事" (Start the full story)
   clears local progress and starts from Act 1; if this device has progress, "继续上次"
   (Continue) continues from it.
2. When Act 1 ends and the diary finishes, press `E`. The school arc loads into a
   full-screen frame inside the same page; the outer page never navigates away.
3. The school arc runs on: corridor → blackboard → broadcast room → evening broadcast →
   the corridor after the broadcast → the railing CG → the Act 3 story layer → six daily
   school chapters → the corridor ending. The final "回到开头" (Back to the start) link
   leaves the frame and returns to the start screen.

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
| `index.html` | Full-story start screen: start fresh (clears local progress) / continue, with the five-part route |
| `prototype.html` | Act 1: hallway, bedroom, the phone shooter, closing diary; hosts the school arc in `#storyframe` |
| `school-preview.html` | School arc opening and corridor; entered after Act 1's diary |
| `act2/` | Blackboard and the transition to the broadcast room |
| `act3/` | Evening broadcast rhythm minigame |
| `act4/after-broadcast/` | The corridor after the broadcast; railing CG ending, then the Act 3 story layer |
| `act5/narrative/` | Act 3 story layer: the opening and the final corridor scene, ending back at the start screen |
| `act5/` | Daily school chapters (separate entry: `daily.html`), six days and the chapter card |
| `assets/` | Pixel characters, scenes, CGs, tiles and Aseprite sources |
| `tools/` | Asset generation; `full-story-check.cjs` checks the start screen and chapter seams |
| `game/dust-corridor/` | The phone shooter inside Act 1 (built on claude-of-duty, MIT) |
| `*.md` | Design, handover and asset notes |

## Tests

Node.js and a local Chrome are required (Playwright uses `channel: 'chrome'`). Install
the dependencies before the first run:

```bash
# from the repository root
cd game/dust-corridor
npm install
node tools/story-chain-check.mjs     # Act 1 → school arc → Act 3 story layer, end to end
node tools/act2-link-check.mjs       # Act 1 diary → in-page Act 2
node tools/return-check.mjs          # returning home and the diary after the phone shooter
node tools/act2-ui-check.mjs         # shared E / Esc / R across both acts
node tools/ui-parity-probe.mjs       # side-by-side UI screenshots
```

The blackboard, broadcast, Act 3 story and daily chapters have their own checks (from the
repository root):

```bash
node act2/tools/check.cjs
node act3/tools/check.cjs
node act5/narrative/tools/check.cjs    # Act 3 opening + final corridor + back to the start
node act5/tools/check.cjs
node tools/full-story-check.cjs        # start screen, continue, chapter seams
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
