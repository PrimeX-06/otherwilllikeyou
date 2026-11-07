"""Rebuild the act-1 corridor (512x288) from the redrawn reference image.

The reference is a ~3.18x render of the same corridor layout: window, 301,
meter box, 302, shoe rack, stairwell.  It is scaled down and aligned so the
wall/floor seam lands on y=176, the two doorway rectangles are emptied so the
game can animate the doors, and the door leaves are cropped into sprites.
A final pass turns the daylight reference into a warm dusk: sunset window,
window bloom, two long sunbeams across the floor, sunlit frame edges and
soft cast shadows.  On top of that the corridor is restyled after
ref/920dfd2151dfad84.png: peach walls, cream window/door casings and a warm
lit room behind the 302 door (window, low cabinet, potted plant).
"""

from __future__ import annotations

import os
import shutil

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = r"C:\Users\yueqi\Downloads\999cc4f962dc6fa4.png"
W, H = 512, 288
SEAM_REF = 535          # reference row of the top of the floor
SEAM_GAME = 176         # game row of the top of the floor

# doorway rectangles in game coordinates (the door leaves are drawn on top)
D301 = (104, 51, 168, 176)   # x0, y0, x1, y1 (exclusive)
D302 = (317, 51, 381, 176)

# door leaf crops in the reference, x0,y0,x1,y1 exclusive
LEAF301 = (336, 137, 533, 535)
LEAF302 = (1013, 137, 1206, 535)
PLAQUE301 = (557, 169, 659, 219)     # reference coordinates
PLAQUE302 = (1240, 169, 1336, 219)   # reference coordinates

FONT = {
    "0": ["###", "#.#", "#.#", "#.#", "###"],
    "1": [".#.", "##.", ".#.", ".#.", "###"],
    "2": ["###", "..#", "###", "#..", "###"],
    "3": ["###", "..#", "###", "..#", "###"],
    "4": ["#.#", "#.#", "###", "..#", "..#"],
    "5": ["###", "#..", "###", "..#", "###"],
    "6": ["###", "#..", "###", "#.#", "###"],
    "7": ["###", "..#", "..#", "..#", "..#"],
    "8": ["###", "#.#", "###", "#.#", "###"],
    "9": ["###", "#.#", "###", "..#", "###"],
}


def hexrgb(s: str) -> tuple[int, int, int]:
    s = s.lstrip("#")
    return tuple(int(s[i:i + 2], 16) for i in (0, 2, 4))


def scale_reference(ref: Image.Image) -> Image.Image:
    """Downscale and align so the reference floor seam sits at y=176."""
    scale = W / ref.width
    sh = round(ref.height * scale)
    small = ref.resize((W, sh), Image.LANCZOS)
    offset = round(SEAM_GAME - SEAM_REF * scale)
    canvas = Image.new("RGB", (W, H), small.getpixel((0, 0)))
    canvas.paste(small, (0, offset))
    # extend the top edge upwards instead of leaving a flat band
    top = small.crop((0, 0, W, 1)).resize((W, offset), Image.NEAREST)
    canvas.paste(top, (0, 0))
    print(f"scale={scale:.5f} scaled={small.size} offset={offset}")
    return canvas


def paint_interior(img: Image.Image, box: tuple[int, int, int, int]) -> None:
    """Dark hallway seen through an open door."""
    x0, y0, x1, y1 = box
    d = ImageDraw.Draw(img)
    d.rectangle((x0, y0, x1 - 1, y1 - 1), fill=hexrgb("#1a1512"))
    d.rectangle((x0 + 3, y0 + 17, x1 - 4, y1 - 1), fill=hexrgb("#2a211c"))
    d.rectangle((x0 + 3, y0 + 17, x1 - 4, y0 + 20), fill=hexrgb("#332822"))
    # shoe cabinet silhouette on the left
    d.rectangle((x0 + 6, y1 - 42, x0 + 27, y1 - 10), fill=hexrgb("#120d0b"))
    d.rectangle((x0 + 6, y1 - 42, x0 + 27, y1 - 39), fill=hexrgb("#2b211b"))
    d.rectangle((x0 + 6, y1 - 27, x0 + 27, y1 - 25), fill=hexrgb("#1d1613"))
    # warm light slipping in at the top right
    for i, c in enumerate(("#3d2e26", "#4a372c", "#3a2c24")):
        d.rectangle((x1 - 8 + i, y0 + 6, x1 - 8 + i, y0 + 45), fill=hexrgb(c))
    # dark floor at the threshold
    d.rectangle((x0, y1 - 7, x1 - 1, y1 - 1), fill=hexrgb("#12100e"))
    d.line((x0, y1 - 8, x1 - 1, y1 - 8), fill=hexrgb("#0c0908"))


def paint_plaque(img: Image.Image, box: tuple[int, int, int, int], label: str) -> None:
    """Crisp number plate, replacing the soft downscaled one."""
    x0, y0, x1, y1 = box
    d = ImageDraw.Draw(img)
    wall = img.getpixel((max(0, x0 - 5), y0 + 3))
    d.rectangle((x0 - 2, y0 - 2, x1 + 1, y1 + 1), fill=wall)
    d.rectangle((x0, y0, x1 - 1, y1 - 1), fill=hexrgb("#5a4033"))
    d.rectangle((x0 + 1, y0 + 1, x1 - 2, y1 - 2), fill=hexrgb("#eadcc4"))
    d.rectangle((x0 + 1, y0 + 1, x1 - 2, y0 + 2), fill=hexrgb("#f4e9d5"))
    d.rectangle((x0 + 1, y1 - 3, x1 - 2, y1 - 2), fill=hexrgb("#c9b699"))
    # 3x5 digits at scale 2 -> 6x10 with a 2px gap, centred on the plate
    gw, gh, gap, s = 6, 10, 2, 2
    total = len(label) * gw + (len(label) - 1) * gap
    cx = x0 + (x1 - x0 - total) // 2
    cy = y0 + (y1 - y0 - gh) // 2
    for ch in label:
        g = FONT[ch]
        for ry, row in enumerate(g):
            for cxx, cell in enumerate(row):
                if cell == "#":
                    d.rectangle((cx + cxx * s, cy + ry * s,
                                 cx + cxx * s + s - 1, cy + ry * s + s - 1),
                                fill=hexrgb("#3a2a22"))
        cx += gw + gap


def sunset_window(img: Image.Image) -> None:
    """Replace the daylight glass with a small sunset sky."""
    x0, y0, x1, y1 = 18, 60, 81, 134
    stops = [
        (0.00, (120, 102, 132)),
        (0.28, (176, 124, 116)),
        (0.48, (226, 150, 104)),
        (0.62, (255, 190, 112)),
        (0.80, (218, 138, 92)),
        (1.00, (140, 88, 78)),
    ]

    def sky(t):
        for i in range(len(stops) - 1):
            a, ca = stops[i]
            b, cb = stops[i + 1]
            if a <= t <= b:
                k = (t - a) / (b - a)
                return tuple(round(ca[j] + (cb[j] - ca[j]) * k) for j in range(3))
        return stops[-1][1]

    d = ImageDraw.Draw(img)
    for y in range(y0, y1 + 1):
        d.line((x0, y, x1, y), fill=sky((y - y0) / (y1 - y0)))

    # low sun behind the skyline, lower left pane
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for r, a in ((14, 40), (9, 70), (5, 150)):
        gd.ellipse((34 - r, 116 - r, 34 + r, 116 + r), fill=(255, 226, 170, a))
    glow = glow.filter(ImageFilter.GaussianBlur(3))
    img.paste(Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB"), (0, 0))

    # skyline silhouettes
    d = ImageDraw.Draw(img)
    blocks = [
        (19, 121, 46, 134, (86, 60, 66)),
        (45, 115, 62, 134, (74, 50, 58)),
        (61, 123, 81, 134, (88, 62, 68)),
    ]
    for bx0, by0, bx1, by1, col in blocks:
        d.rectangle((bx0, by0, bx1, by1), fill=col)
    for lx, ly in ((24, 125), (30, 125), (50, 119), (56, 119), (67, 127), (74, 127)):
        d.rectangle((lx, ly, lx + 1, ly), fill=(255, 206, 130))

    # mullions back on top
    d.rectangle((49, y0, 51, y1), fill=hexrgb("#6b5445"))
    d.rectangle((49, y0, 49, y1), fill=hexrgb("#7d6452"))
    d.rectangle((x0, 94, x1, 96), fill=hexrgb("#6b5445"))
    d.rectangle((x0, 94, x1, 94), fill=hexrgb("#7d6452"))


def soft_mask(polys, radius):
    m = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(m)
    for p in polys:
        d.polygon(p, fill=255)
    return np.asarray(m.filter(ImageFilter.GaussianBlur(radius))).astype(np.float32) / 255.0


def sunset_grade(img: Image.Image) -> Image.Image:
    """Warm dusk grade, window bloom and a long pool of light on the floor."""
    arr = np.asarray(img).astype(np.float32) / 255.0
    h, w, _ = arr.shape
    X, Y = np.meshgrid(np.linspace(0, 1, w), np.linspace(0, 1, h))

    arr *= 0.90  # dusk exposure

    # warm on the window side, cooler toward the stairwell
    warm = np.array([1.0, 0.90, 0.78])
    k = (0.16 + 0.30 * (1.0 - X))[..., None]
    arr = arr * (1 - k) + arr * warm * k

    cool = np.array([0.78, 0.76, 0.90])
    kc = (0.22 * np.clip((X - 0.58) / 0.42, 0, 1))[..., None]
    arr = arr * (1 - kc) + arr * cool * kc

    # bloom around the window
    r = 190.0
    dist = np.hypot(X * w - 50, Y * h - 96)
    g = np.clip(1 - dist / r, 0, 1) ** 2 * 0.50
    arr = arr + (1 - arr) * g[..., None] * np.array([1.0, 0.76, 0.52])

    # two long sunbeams from the two window sashes, split by the mullion shadow
    beams = soft_mask([
        [(16, 176), (45, 176), (86, 288), (48, 288)],
        [(54, 176), (84, 176), (178, 288), (100, 288)],
    ], 5)
    beam_core = soft_mask([
        [(21, 176), (41, 176), (74, 288), (50, 288)],
        [(58, 176), (80, 176), (154, 288), (104, 288)],
    ], 3)
    light = np.array([1.0, 0.73, 0.44])
    arr = arr + (1 - arr) * (beams * 0.44)[..., None] * light
    arr = arr + (1 - arr) * (beam_core * 0.30)[..., None] * light

    # sun catches the left-facing edges of the frames and the meter box
    rim = np.array([1.0, 0.82, 0.58])

    def lit(x, y, amount=0.35):
        if 0 <= x < w and 0 <= y < h:
            arr[y, x] = arr[y, x] + (1 - arr[y, x]) * rim * amount

    for y in range(58, 140):
        lit(16, y, 0.40)
    for x in range(16, 85):
        lit(x, 58, 0.28)
    for y in range(45, 176):
        lit(101, y, 0.32)   # 301 frame
        lit(313, y, 0.32)   # 302 frame
    for x in range(101, 172):
        lit(x, 44, 0.22)
    for x in range(313, 386):
        lit(x, 44, 0.22)
    for y in range(86, 126):
        lit(206, y, 0.30)   # meter box
    for x in range(206, 248):
        lit(x, 86, 0.20)
    for y in range(143, 166):
        lit(391, y, 0.25)   # shoe rack

    # long shadows fall to the right of the door frames and the shoe rack
    sh = Image.new("L", (W, H), 0)
    sd = ImageDraw.Draw(sh)
    sd.rectangle((172, 44, 192, 176), fill=255)
    sd.rectangle((381, 44, 401, 176), fill=255)
    sd.rectangle((423, 145, 443, 176), fill=255)
    sh = np.asarray(sh.filter(ImageFilter.GaussianBlur(6))).astype(np.float32) / 255.0
    arr *= (1 - 0.26 * sh[..., None])

    arr = np.clip(arr, 0, 1)
    return Image.fromarray((arr * 255 + 0.5).astype(np.uint8))


CREAM = (238, 218, 194)
CREAM_LIT = (252, 240, 226)
CREAM_DARK = (198, 170, 144)
CREAM_LINE = (124, 82, 60)


def rose_grade(img: Image.Image) -> Image.Image:
    """Push the reference beige towards the peach dusk of the doorway art."""
    arr = np.asarray(img).astype(np.float32) / 255.0
    lum = arr[:, :, 0] * 0.299 + arr[:, :, 1] * 0.587 + arr[:, :, 2] * 0.114
    arr[:, :, 0] = np.clip(arr[:, :, 0] * 1.05, 0, 1)
    arr[:, :, 1] = np.clip(arr[:, :, 1] * 0.945, 0, 1)
    arr[:, :, 2] = np.clip(arr[:, :, 2] * 0.95, 0, 1)
    # rose settles into the shadowed half of the wall
    tint = np.array([1.0, 0.80, 0.76])
    k = (0.18 * np.clip(1.0 - lum / 0.9, 0, 1))[..., None]
    arr = arr * (1 - k) + arr * tint * k
    return Image.fromarray((np.clip(arr, 0, 1) * 255 + 0.5).astype(np.uint8))


def paint_wall_seams(img: Image.Image) -> None:
    """Thin vertical panel seams, like the panelled corridor wall in the art."""
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    for x in (92, 446):
        d.line((x, 12, x, 175), fill=(255, 238, 216, 52))
        d.line((x + 1, 12, x + 1, 175), fill=(96, 54, 40, 40))
    comp = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    img.paste(comp, (0, 0))


def paint_window_trim(img: Image.Image) -> None:
    """Cream sash and sill around the sunset glass."""
    d = ImageDraw.Draw(img)
    # casing ring (the glass itself stays untouched)
    d.rectangle((14, 56, 17, 137), fill=CREAM)
    d.rectangle((82, 56, 85, 137), fill=CREAM)
    d.rectangle((14, 56, 85, 59), fill=CREAM)
    d.rectangle((14, 135, 85, 137), fill=CREAM)
    # bevelled outer edge, lit from the left
    d.line((14, 56, 14, 137), fill=CREAM_LIT)
    d.line((14, 56, 85, 56), fill=CREAM_LIT)
    d.line((85, 56, 85, 137), fill=CREAM_DARK)
    d.line((14, 137, 85, 137), fill=CREAM_DARK)
    # inner step and the dark line that seats the glass
    d.rectangle((17, 59, 82, 134), outline=CREAM_LINE)
    d.line((17, 59, 17, 134), fill=CREAM_DARK)
    d.line((17, 59, 82, 59), fill=CREAM_DARK)
    # sill
    d.rectangle((12, 138, 87, 142), fill=CREAM)
    d.line((12, 138, 87, 138), fill=CREAM_LIT)
    d.line((12, 142, 87, 142), fill=(172, 144, 120))
    # cream mullions over the sky
    d.rectangle((49, 60, 51, 134), fill=CREAM)
    d.rectangle((18, 94, 81, 96), fill=CREAM)
    d.line((49, 60, 49, 134), fill=CREAM_LIT)
    d.line((18, 94, 81, 94), fill=CREAM_LIT)
    d.line((51, 60, 51, 134), fill=CREAM_DARK)
    d.line((18, 96, 81, 96), fill=CREAM_DARK)


def paint_room_302(img: Image.Image) -> None:
    """A warm lit room seen through the 302 doorway.

    Matches the doorway art: a bright window on the left, a low cabinet with a
    potted plant below it, and a wooden floor.  The girl sprite covers the
    centre, so the details sit in the strips that stay visible beside her.
    """
    x0, y0, x1, y1 = D302
    rw, rh = x1 - x0, y1 - y0

    ts = np.linspace(0.0, 1.0, rh, dtype=np.float32)
    stops = [
        (0.00, (0.30, 0.16, 0.12)),
        (0.10, (0.52, 0.28, 0.19)),
        (0.26, (0.72, 0.42, 0.27)),
        (0.44, (0.88, 0.57, 0.36)),
        (0.60, (0.94, 0.64, 0.42)),
        (0.78, (0.80, 0.51, 0.34)),
        (1.00, (0.55, 0.33, 0.23)),
    ]
    ramp = [np.interp(ts, [s for s, _ in stops], [c[i] for _, c in stops]) for i in range(3)]
    grad = (np.stack(ramp, axis=1)[:, None, :] * 255).astype(np.uint8)
    room = Image.fromarray(np.repeat(grad, rw, axis=1))
    d = ImageDraw.Draw(room)

    # skirting and wooden floor
    d.rectangle((0, 104, rw - 1, 106), fill=(126, 76, 52))
    d.rectangle((0, 107, rw - 1, rh - 1), fill=(122, 74, 50))
    for yy in (112, 118, 124):
        d.line((0, yy, rw - 1, yy), fill=(104, 62, 42))
    for xx in (12, 27, 44, 58):
        d.line((xx, 107, xx, rh - 1), fill=(110, 66, 45))
    # light pooled on the boards
    d.rectangle((0, 107, 26, 111), fill=(156, 100, 68))
    d.rectangle((2, 112, 20, 114), fill=(140, 90, 62))

    # window on the back wall, upper left
    d.rectangle((2, 12, 20, 60), fill=(236, 210, 176))
    d.rectangle((3, 13, 19, 57), fill=(255, 219, 160))
    for yy in range(14, 57):
        k = (yy - 14) / 42
        d.line((4, yy, 18, yy),
               fill=(round(255 - 22 * k), round(228 - 96 * k), round(176 - 124 * k)))
    d.line((11, 13, 11, 57), fill=(244, 226, 198))
    d.line((3, 35, 19, 35), fill=(244, 226, 198))
    d.line((10, 13, 10, 57), fill=(255, 240, 214))
    d.line((3, 34, 19, 34), fill=(255, 240, 214))
    d.rectangle((2, 58, 20, 60), fill=(200, 166, 132))

    # low cabinet against the wall
    d.rectangle((0, 76, 17, 105), fill=(112, 66, 44))
    d.rectangle((0, 76, 17, 78), fill=(154, 98, 66))
    d.rectangle((1, 81, 16, 91), fill=(130, 78, 52))
    d.rectangle((1, 93, 16, 103), fill=(130, 78, 52))
    d.line((1, 92, 16, 92), fill=(88, 50, 35))
    d.line((8, 81, 8, 103), fill=(88, 50, 35))
    for px_, py_ in ((4, 85), (11, 85), (4, 97), (11, 97)):
        d.rectangle((px_, py_, px_ + 1, py_ + 2), fill=(226, 168, 96))

    # potted plant on the cabinet
    d.rectangle((4, 66, 13, 77), fill=(172, 92, 60))
    d.rectangle((3, 66, 14, 68), fill=(204, 120, 82))
    d.line((4, 77, 13, 77), fill=(112, 56, 38))
    for sx, sy, ex, ey in ((8, 66, 8, 60), (8, 63, 3, 57), (8, 63, 13, 55)):
        d.line((sx, sy, ex, ey), fill=(78, 96, 56))
    leaves = [
        [(8, 60), (10, 53), (15, 51), (12, 58)],
        [(8, 60), (5, 52), (1, 54), (5, 60)],
        [(8, 60), (12, 58), (16, 62), (11, 64)],
        [(7, 61), (2, 60), (1, 65), (6, 65)],
        [(8, 58), (7, 48), (11, 50), (11, 57)],
    ]
    for i, poly in enumerate(leaves):
        d.polygon(poly, fill=(104, 136, 72) if i % 2 else (82, 112, 60))
        d.line((poly[0][0], poly[0][1], poly[2][0], poly[2][1]), fill=(72, 96, 54))

    # warm bloom from the window into the room
    arr = np.asarray(room).astype(np.float32) / 255.0
    yy, xx = np.mgrid[0:rh, 0:rw]
    dist = np.hypot(xx - 10, yy - 34)
    g = np.clip(1 - dist / 58, 0, 1) ** 2 * 0.32
    arr = arr + (1 - arr) * g[..., None] * np.array([1.0, 0.80, 0.55])
    room = Image.fromarray((np.clip(arr, 0, 1) * 255 + 0.5).astype(np.uint8))

    # recess shadow: lintel, jambs, threshold
    edge = Image.new("RGBA", (rw, rh), (0, 0, 0, 0))
    ed = ImageDraw.Draw(edge)
    ed.rectangle((0, 0, rw - 1, 6), fill=(24, 12, 9, 150))
    ed.rectangle((0, 0, 2, rh - 1), fill=(24, 12, 9, 110))
    ed.rectangle((rw - 3, 0, rw - 1, rh - 1), fill=(24, 12, 9, 80))
    ed.rectangle((0, rh - 4, rw - 1, rh - 1), fill=(24, 12, 9, 120))
    edge = edge.filter(ImageFilter.GaussianBlur(2))
    room = Image.alpha_composite(room.convert("RGBA"), edge).convert("RGB")

    img.paste(room, (x0, y0))


def paint_door_trim(img: Image.Image, box: tuple[int, int, int, int], t: int = 6) -> None:
    """Cream painted casing around a doorway, with a bevelled outer edge."""
    x0, y0, x1, y1 = box
    d = ImageDraw.Draw(img)
    d.rectangle((x0 - t, y0 - t, x0 - 1, y1 - 1), fill=CREAM)
    d.rectangle((x1, y0 - t, x1 + t - 1, y1 - 1), fill=CREAM)
    d.rectangle((x0, y0 - t, x1 - 1, y0 - 1), fill=CREAM)
    # lit outer edge on the window side, shadowed on the far side
    d.line((x0 - t, y0 - t, x0 - t, y1 - 1), fill=CREAM_LIT)
    d.line((x0 - t, y0 - t, x1 + t - 1, y0 - t), fill=CREAM_LIT)
    d.line((x1 + t - 1, y0 - t, x1 + t - 1, y1 - 1), fill=CREAM_DARK)
    # moulding step
    d.line((x0 - t + 2, y0 - t + 2, x0 - 2, y0 - t + 2), fill=CREAM_DARK)
    d.line((x0 - t + 2, y0 - t + 2, x0 - t + 2, y1 - 1), fill=CREAM_DARK)
    d.line((x0 - t + 1, y0 - t + 1, x0 - t + 1, y1 - 1), fill=CREAM_LIT)
    # dark seam where the casing meets the opening
    d.line((x0 - 1, y0 - 1, x0 - 1, y1 - 1), fill=CREAM_LINE)
    d.line((x1, y0 - 1, x1, y1 - 1), fill=CREAM_LINE)
    d.line((x0, y0 - 1, x1 - 1, y0 - 1), fill=CREAM_LINE)


def warm_floor(img: Image.Image) -> Image.Image:
    """Turn the grey reference tiles into warm boards, keeping the sunbeams."""
    arr = np.asarray(img).astype(np.float32) / 255.0
    y0 = 176
    floor = arr[y0:].copy()
    lum = floor[..., 0] * 0.299 + floor[..., 1] * 0.587 + floor[..., 2] * 0.114
    l = lum[..., None]
    dark = np.array([0.30, 0.19, 0.14])
    mid = np.array([0.50, 0.33, 0.24])
    lit = np.array([0.78, 0.57, 0.41])
    t1 = np.clip(l / 0.52, 0, 1)
    t2 = np.clip((l - 0.52) / 0.33, 0, 1)
    target = dark * (1 - t1) + mid * t1
    target = target * (1 - t2) + lit * t2
    new = floor * 0.38 + target * 0.62
    # keep the red doormats by the doors
    mask = np.ones(lum.shape, dtype=bool)
    mask[0:14, 96:176] = False
    mask[0:14, 309:389] = False
    new[~mask] = floor[~mask]
    arr[y0:] = new
    return Image.fromarray((np.clip(arr, 0, 1) * 255 + 0.5).astype(np.uint8))


def warm_meter(img: Image.Image) -> None:
    """Warm the grey utility box so it sits in the dusk palette."""
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.rectangle((207, 86, 255, 128), fill=(255, 210, 170, 48))
    overlay = overlay.filter(ImageFilter.GaussianBlur(1))
    comp = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    img.paste(comp, (0, 0))


def restyle_door(fr: Image.Image) -> Image.Image:
    """Dusty rose-brown door with a copper lever, lit from the window side."""
    arr = np.asarray(fr).astype(np.float32)
    a = arr[:, :, 3:].copy()
    rgb = arr[:, :, :3] / 255.0
    rgb = rgb * np.array([1.06, 0.94, 0.92])
    lum = rgb @ np.array([0.299, 0.587, 0.114])
    tint = np.array([1.0, 0.86, 0.86])
    k = (0.14 * np.clip(1 - lum / 0.72, 0, 1))[..., None]
    rgb = rgb * (1 - k) + rgb * tint * k
    # brass lever -> dusty copper
    m = (rgb[:, :, 0] > 0.60) & (rgb[:, :, 1] > 0.45) & (rgb[:, :, 2] < 0.50) & (a[:, :, 0] > 200)
    rgb[m] = rgb[m] * 0.30 + np.array([0.93, 0.66, 0.63]) * 0.70
    # mute towards the muted mauve-brown of the doorway art
    lum = rgb @ np.array([0.299, 0.587, 0.114])
    grey = np.repeat(lum[..., None], 3, axis=2)
    rgb = (grey + (rgb - grey) * 0.85) * 0.95
    # directional light, window on the left
    xx = np.linspace(0, 1, rgb.shape[1], dtype=np.float32)
    rgb = rgb * (1.05 - 0.10 * xx)[None, :, None]
    out = np.dstack([np.clip(rgb, 0, 1) * 255, a])
    return Image.fromarray(out.astype(np.uint8))


def add_lever(fr: Image.Image, w: int) -> None:
    """Copper lever on a compressed leaf, where the resize would smear it."""
    d = ImageDraw.Draw(fr)
    x = max(1, round(w * 0.14))
    lever = (232, 156, 148)
    shadow = (150, 88, 82)
    d.line((x, 59, x, 69), fill=lever)
    d.line((x + 1, 59, x + 1, 69), fill=shadow)
    d.line((x, 61, min(w - 1, x + 4), 61), fill=lever)
    d.line((x, 62, min(w - 1, x + 4), 62), fill=shadow)


def build_doors(ref: Image.Image) -> None:
    # leaf: reference crop -> 64 wide, 125 tall, 3 transparent rows on top,
    # mirrored so the door is hinged on the right as in the doorway art
    def leaf(box, out_w, out_h=125):
        im = ref.crop(box).convert("RGB")
        im = im.resize((out_w, out_h), Image.LANCZOS)
        fr = Image.new("RGBA", (64, 128), (0, 0, 0, 0))
        fr.paste(im, (0, 3))
        fr = fr.transpose(Image.FLIP_LEFT_RIGHT)
        fr = restyle_door(fr)
        if out_w <= 24:
            add_lever(fr, out_w)
        return fr

    d301 = leaf(LEAF301, 64)
    d301.save(os.path.join(ROOT, "assets", "scenes", "door301.png"))

    # the last frame is a door standing ~70 degrees open, like the doorway art
    widths = [64, 54, 34, 20]
    sheet = Image.new("RGBA", (64 * len(widths), 128), (0, 0, 0, 0))
    for i, w in enumerate(widths):
        sheet.alpha_composite(leaf(LEAF302, w), (i * 64, 0))
    sheet.save(os.path.join(ROOT, "assets", "scenes", "door302_sheet.png"))
    print("doors written", sheet.size)


def main() -> None:
    ref = Image.open(REF).convert("RGB")
    base = scale_reference(ref)

    scale = W / ref.width
    offset = round(SEAM_GAME - SEAM_REF * scale)

    def to_game(box):
        x0, y0, x1, y1 = box
        return (round(x0 * scale), offset + round(y0 * scale),
                round(x1 * scale), offset + round(y1 * scale))

    paint_interior(base, D301)
    paint_interior(base, D302)
    paint_plaque(base, to_game(PLAQUE301), "301")
    paint_plaque(base, to_game(PLAQUE302), "302")
    sunset_window(base)
    base = sunset_grade(base)
    # corridor styling after the doorway reference
    base = rose_grade(base)
    base = warm_floor(base)
    paint_wall_seams(base)
    paint_window_trim(base)
    warm_meter(base)
    paint_room_302(base)
    paint_door_trim(base, D301)
    paint_door_trim(base, D302)

    # backup the old scene the first time
    backup_dir = os.path.join(ROOT, "ref", "original")
    os.makedirs(backup_dir, exist_ok=True)
    for name in ("corridor.png", "door301.png", "door302_sheet.png"):
        src = os.path.join(ROOT, "assets", "scenes", name)
        dst = os.path.join(backup_dir, name.replace(".png", "_original.png"))
        if os.path.exists(src) and not os.path.exists(dst):
            shutil.copy2(src, dst)
            print("backup", dst)

    base.save(os.path.join(ROOT, "assets", "scenes", "corridor.png"))
    print("corridor written")
    build_doors(ref)


if __name__ == "__main__":
    main()
