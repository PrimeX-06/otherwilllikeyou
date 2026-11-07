"""Import the warm bedroom reference as the act-1 bedroom background.

The reference is a 4:3 cutaway map with a dark purple border around the room.
For the game we want a full-bleed 16:9 scene with no black frame:

  * crop to the room itself, dropping the dark border and the front-wall strip
    at the bottom (the mat is outside the scene now);
  * resize to 512x288;
  * paint the thin dark bevel left at the edges with the neighbouring
    wall/floor colour, row by row, so the room runs to the screen edge.

The previous hand-built bedroom is backed up to ref/original/bedroom_original.png
the first time this runs.
"""

from __future__ import annotations

import os
import shutil

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = os.path.join(ROOT, "暖光像素风卧室地图.png")
W, H = 512, 288

# (left, top, right, bottom) in reference pixels: the room interior only.
CROP = (113, 90, 1334, 895)

# width of the dark cutaway bevel still visible at each edge after the resize
BEVEL = 22

# clean columns in the resized room used to rebuild the edge bands
WALL_SRC_X = 145
FLOOR_SRC_X = 370
SEAM_Y = 100


def _blend(a, b, k):
    return tuple(round(a[i] + (b[i] - a[i]) * k) for i in range(3))


def strip_bevel(room: Image.Image) -> None:
    """Replace the dark cutaway bevel with extended wall and floor.

    The bevel is wider at the rounded top and bottom corners, so instead of
    copying the column next to it (which lands on the picture frame or the
    shadowed corner) we rebuild the bands from clean wall/floor columns.
    """
    px = room.load()
    for y in range(H):
        if y < SEAM_Y:
            src = px[WALL_SRC_X, y]
        else:
            src = px[FLOOR_SRC_X, y]
        for x in range(BEVEL):
            k = 0.95 + 0.05 * (x / (BEVEL - 1))
            px[x, y] = (round(src[0] * k), round(src[1] * k), round(src[2] * k), 255)
        for x in range(W - BEVEL, W):
            k = 0.95 + 0.05 * ((W - 1 - x) / (BEVEL - 1))
            px[x, y] = (round(src[0] * k), round(src[1] * k), round(src[2] * k), 255)

    # the cutaway trim leaves dark notches in the four corners; paint them out
    wall = px[WALL_SRC_X, 10]
    floor = px[FLOOR_SRC_X, 270]
    for y in range(24):
        for x in range(48):
            px[x, y] = wall
        for x in range(W - 48, W):
            px[x, y] = wall
    for y in range(268, H):
        for x in range(46):
            px[x, y] = floor
        for x in range(W - 16, W):
            px[x, y] = floor

    # feather the join into the painted room
    for y in range(H):
        for x in range(BEVEL, BEVEL + 5):
            k = (x - BEVEL) / 5
            px[x, y] = (*_blend(px[BEVEL - 1, y][:3], px[x, y][:3], 0.55 + 0.45 * k), 255)
        for x in range(W - BEVEL - 5, W - BEVEL):
            k = (W - BEVEL - x) / 5
            px[x, y] = (*_blend(px[W - BEVEL, y][:3], px[x, y][:3], 0.55 + 0.45 * k), 255)


def main() -> None:
    src = Image.open(REF).convert("RGB")
    room = src.crop(CROP).resize((W, H), Image.LANCZOS)
    strip_bevel(room)

    out = os.path.join(ROOT, "assets", "scenes", "bedroom.png")
    backup_dir = os.path.join(ROOT, "ref", "original")
    os.makedirs(backup_dir, exist_ok=True)
    dst = os.path.join(backup_dir, "bedroom_original.png")
    if os.path.exists(out) and not os.path.exists(dst):
        shutil.copy2(out, dst)
        print("backup", dst)

    room.save(out)
    print(f"bedroom written {room.size} from {src.size} crop {CROP}")


if __name__ == "__main__":
    main()
