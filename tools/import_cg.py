"""Build the full-screen doorway CG used for the corridor -> bedroom cut.

The reference art is 1670x941, almost exactly 16:9, so it only needs a small
uniform resize to the game's 512x288 canvas.
"""

from __future__ import annotations

import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = os.path.join(ROOT, "ref", "920dfd2151dfad84.png")
W, H = 512, 288


def main() -> None:
    src = Image.open(REF).convert("RGB")
    cg = src.resize((W, H), Image.LANCZOS)
    out = os.path.join(ROOT, "assets", "scenes", "cg_doorway.png")
    cg.save(out)
    print(f"CG written {cg.size} from {src.size}")


if __name__ == "__main__":
    main()
