"""Build front-facing seated frames from the standing idle_down frames.

The character sheets only have side-view sit_left/sit_right poses.  For the
bedroom we need the two of them sitting next to each other, facing the room,
so this takes the front idle frame and replaces the standing legs with a
crossed-leg lap drawn in the same palette.

Outputs:
  assets/characters/girl/girl_sit_down.png
  assets/characters/boy/boy_sit_down.png
  ref/sit_down_preview.png  (checkerboard preview at 8x)
"""

from __future__ import annotations

import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W, H = 48, 72

SKIN = (249, 206, 178, 255)
SKIN_SHADE = (219, 153, 126, 255)
OUTLINE = (36, 25, 30, 255)

# girl skirt ramp
SKIRT_DARK = (45, 33, 38, 255)
SKIRT_MID = (74, 56, 61, 255)
SKIRT_LIGHT = (94, 72, 78, 255)
SKIRT_HI = (118, 90, 84, 255)

# boy trousers ramp
PANTS_DARK = (37, 28, 32, 255)
PANTS_MID = (62, 50, 57, 255)
PANTS_LIGHT = (78, 65, 75, 255)

SHOE_DARK = (29, 20, 23, 255)
SHOE_MID = (58, 42, 48, 255)
SOLE = (182, 168, 156, 255)
SOCK = (240, 220, 198, 255)


def load_frame(name: str) -> Image.Image:
    sheet = Image.open(os.path.join(ROOT, "assets", "characters", name, f"{name}_sheet.png")).convert("RGBA")
    return sheet.crop((0, 0, W, H)).copy()


def clear_below(im: Image.Image, y0: int) -> None:
    px = im.load()
    for y in range(y0, H):
        for x in range(W):
            px[x, y] = (0, 0, 0, 0)


def hspan(im: Image.Image, y: int, x0: int, x1: int, color) -> None:
    px = im.load()
    for x in range(x0, x1 + 1):
        px[x, y] = color


def build_girl() -> Image.Image:
    im = load_frame("girl")
    clear_below(im, 55)
    px = im.load()

    # cross-legged lap under the skirt; rows are (y, left, right)
    rows = [
        (55, 16, 31), (56, 14, 33), (57, 12, 35), (58, 11, 36),
        (59, 11, 36), (60, 12, 35), (61, 13, 34), (62, 15, 32),
    ]
    for y, x0, x1 in rows:
        for x in range(x0, x1 + 1):
            px[x, y] = SKIRT_MID

    # light from above, shadow under the lap
    hspan(im, 55, 16, 31, SKIRT_LIGHT)
    hspan(im, 56, 15, 32, SKIRT_LIGHT)
    hspan(im, 60, 13, 34, SKIRT_DARK)
    hspan(im, 61, 14, 33, SKIRT_DARK)
    hspan(im, 62, 16, 31, SKIRT_DARK)

    # knees: two soft peaks at the sides of the lap
    for x in range(12, 17):
        for y in range(56, 59):
            px[x, y] = SKIRT_HI
    for x in range(32, 37):
        for y in range(56, 59):
            px[x, y] = SKIRT_LIGHT
    for y in range(57, 60):
        px[11, y] = SKIRT_DARK
        px[36, y] = SKIRT_DARK

    # folds
    for x in (18, 23, 29):
        for y in range(57, 61):
            px[x, y] = SKIRT_DARK
    for x in (21, 27):
        for y in range(57, 60):
            px[x, y] = SKIRT_LIGHT

    # silhouette
    for y, x0, x1 in rows[1:]:
        px[x0 - 1, y] = OUTLINE
        px[x1 + 1, y] = OUTLINE
    hspan(im, 63, 16, 31, OUTLINE)

    # shoe tips tucked under the crossed legs
    for x0 in (18, 25):
        hspan(im, 61, x0, x0 + 3, SOCK)
        hspan(im, 62, x0, x0 + 3, SHOE_MID)
        hspan(im, 63, x0 + 1, x0 + 3, SHOE_DARK)
        px[x0, 63] = OUTLINE
    return im


def build_boy() -> Image.Image:
    im = load_frame("boy")
    clear_below(im, 54)
    px = im.load()

    rows = [
        (54, 16, 31), (55, 14, 33), (56, 12, 35), (57, 11, 36),
        (58, 12, 35), (59, 14, 33), (60, 16, 31), (61, 18, 29),
    ]
    for y, x0, x1 in rows:
        for x in range(x0, x1 + 1):
            px[x, y] = PANTS_MID

    hspan(im, 54, 16, 31, PANTS_LIGHT)
    hspan(im, 55, 15, 32, PANTS_LIGHT)
    hspan(im, 60, 17, 30, PANTS_DARK)
    hspan(im, 61, 18, 29, PANTS_DARK)

    # knees
    for x in range(12, 18):
        for y in range(55, 59):
            px[x, y] = PANTS_LIGHT
    for x in range(31, 37):
        for y in range(55, 59):
            px[x, y] = PANTS_LIGHT
    for y in range(56, 60):
        px[11, y] = PANTS_DARK
        px[36, y] = PANTS_DARK

    # crossed shins
    for i in range(5):
        px[17 + i, 58 + i // 2] = PANTS_DARK
        px[30 - i, 58 + i // 2] = PANTS_DARK

    # hands resting on the knees
    for x in range(12, 16):
        for y in range(56, 59):
            px[x, y] = SKIN
    for x in range(32, 36):
        for y in range(56, 59):
            px[x, y] = SKIN
    px[12, 56] = SKIN_SHADE
    px[35, 56] = SKIN_SHADE

    for y, x0, x1 in rows[1:]:
        px[x0 - 1, y] = OUTLINE
        px[x1 + 1, y] = OUTLINE
    hspan(im, 62, 18, 29, OUTLINE)

    # shoes at the centre
    for x0 in (19, 25):
        hspan(im, 60, x0, x0 + 3, SHOE_MID)
        hspan(im, 61, x0, x0 + 3, SHOE_DARK)
        hspan(im, 62, x0, x0 + 3, SOLE)
        px[x0, 62] = OUTLINE
        px[x0 + 3, 62] = OUTLINE
    return im


def main() -> None:
    girl = build_girl()
    boy = build_boy()

    girl.save(os.path.join(ROOT, "assets", "characters", "girl", "girl_sit_down.png"))
    boy.save(os.path.join(ROOT, "assets", "characters", "boy", "boy_sit_down.png"))

    prev = Image.new("RGBA", (W * 2 + 8, H), (0, 0, 0, 0))
    prev.alpha_composite(girl, (0, 0))
    prev.alpha_composite(boy, (W + 8, 0))
    bg = Image.new("RGBA", prev.size, (255, 255, 255, 255))
    for y in range(0, H, 8):
        for x in range(0, prev.width, 8):
            if (x // 8 + y // 8) % 2:
                bg.paste((228, 228, 228, 255), (x, y, x + 8, y + 8))
    bg.alpha_composite(prev)
    bg.resize((bg.width * 8, bg.height * 8), Image.NEAREST).save(
        os.path.join(ROOT, "ref", "sit_down_preview.png")
    )
    print("saved sit_down frames")


if __name__ == "__main__":
    main()
