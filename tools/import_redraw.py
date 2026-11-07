"""Import the high-resolution redrawn character sheets into the game's 32x48 sheets.

Source sheets are labelled contact sheets: a dark noisy background, a small grey
frame label at the top-left of each cell, and one character per cell.  They are
not aligned to a regular grid, so characters are found as large connected
components and ordered by row/column.

Output keeps the original sheet dimensions and frame order, so the game and the
existing JSON metadata keep working unchanged.
"""

from __future__ import annotations

import json
import os
import shutil
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BG = np.array([41.5, 40.5, 50.5])
FRAME_W, FRAME_H = 48, 72
BOTTOM = 70            # bottom row of the character inside the frame
TARGET_STANDING_H = 66  # tallest standing frame in output pixels

GIRL_LABELS = [
    "idle_down", "idle_down_blink", "idle_left", "idle_right", "idle_up",
    "walk_down_0", "walk_down_1", "walk_down_2", "walk_down_3",
    "walk_left_0", "walk_left_1", "walk_left_2", "walk_left_3",
    "walk_right_0", "walk_right_1", "walk_right_2", "walk_right_3",
    "walk_up_0", "walk_up_1", "walk_up_2", "walk_up_3",
    "sit_left", "sit_right", "wave_0", "wave_1",
]
BOY_LABELS = [l for l in GIRL_LABELS if not l.startswith("wave")]

Char = dict


def split_label_pixels(rgb: np.ndarray) -> np.ndarray:
    """Mask the small grey frame labels (bright, nearly neutral pixels).

    The bright glyph cores are dilated slightly so the dim anti-aliased edge
    pixels that touch the hair are removed too; otherwise a few grey dashes
    survive above the head.
    """
    r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    mx, mn = rgb.max(2), rgb.min(2)
    cand = (mx > 150) & ((mx - mn) < 26) & (b >= r - 2)

    lab, n = ndimage.label(cand, np.ones((3, 3)))
    if n == 0:
        return np.zeros_like(cand)
    objs = ndimage.find_objects(lab)
    keep = np.zeros_like(cand)
    for i, sl in enumerate(objs):
        if sl is None:
            continue
        h = sl[0].stop - sl[0].start
        w = sl[1].stop - sl[1].start
        if h <= 26 and w <= 120:  # a text glyph or a short word
            keep |= lab == i + 1
    keep = ndimage.binary_dilation(keep, np.ones((3, 3)), iterations=2)
    return keep


def find_label_rows(rgb: np.ndarray, labels: np.ndarray) -> list[int]:
    """Approximate y of each grid row, from the y histogram of label pixels."""
    rows = labels.sum(1)
    ys = np.where(rows > 20)[0]
    if len(ys) == 0:
        return []
    groups = [[ys[0]]]
    for y in ys[1:]:
        if y - groups[-1][-1] <= 4:
            groups[-1].append(y)
        else:
            groups.append([y])
    return [int(g[0]) for g in groups if len(g) >= 3]


def extract(path: str, labels: list[str]) -> list[Char]:
    rgb = np.asarray(Image.open(path).convert("RGB")).astype(np.float32)
    lab_px = split_label_pixels(rgb)
    rows = find_label_rows(rgb, lab_px)

    # remove labels only in the narrow band at the top of each grid row
    band = np.zeros_like(lab_px)
    for y in rows:
        band[max(0, y - 2): y + 28, :] = True
    fg = (np.linalg.norm(rgb - BG, axis=2) > 10) & ~(lab_px & band)

    cc, n = ndimage.label(fg, np.ones((3, 3)))
    sizes = ndimage.sum(fg, cc, range(1, n + 1))
    objs = ndimage.find_objects(cc)

    comps = []
    for i, s in enumerate(sizes):
        if s < 4000:
            continue
        sl = objs[i]
        if sl is None:
            continue
        ys_, ye_ = sl[0].start, sl[0].stop - 1
        xs_, xe_ = sl[1].start, sl[1].stop - 1
        comps.append({
            "id": i + 1, "size": int(s),
            "x0": xs_, "y0": ys_, "x1": xe_, "y1": ye_,
            "cx": (xs_ + xe_) / 2, "cy": (ys_ + ye_) / 2,
        })

    if len(comps) != len(labels):
        raise SystemExit(f"{path}: expected {len(labels)} characters, found {len(comps)}")

    # group into rows by vertical gaps, then order left to right
    comps.sort(key=lambda c: c["cy"])
    row_groups: list[list[Char]] = []
    for c in comps:
        if row_groups and c["cy"] - row_groups[-1][-1]["cy"] < 90:
            row_groups[-1].append(c)
        else:
            row_groups.append([c])
    ordered: list[Char] = []
    for rg in row_groups:
        ordered.extend(sorted(rg, key=lambda c: c["cx"]))

    for c, name in zip(ordered, labels):
        c["name"] = name
        c["mask"] = cc == c["id"]
    return ordered


def premultiplied_rgba(rgb: np.ndarray, mask: np.ndarray, box) -> Image.Image:
    x0, y0, x1, y1 = box
    a = (mask[y0:y1 + 1, x0:x1 + 1].astype(np.float32))[:, :, None]
    col = rgb[y0:y1 + 1, x0:x1 + 1]
    pm = col * a                       # premultiplied so a resize cannot pull in the dark bg
    return Image.fromarray(np.dstack([pm, a * 255.0]).astype(np.uint8), "RGBA")


def resize_pm(im: Image.Image, w: int, h: int) -> Image.Image:
    small = im.resize((w, h), Image.LANCZOS)
    arr = np.asarray(small).astype(np.float32)
    alpha = arr[:, :, 3:4] / 255.0
    rgb = np.divide(arr[:, :, :3], np.maximum(alpha, 1e-3), out=np.zeros_like(arr[:, :, :3]),
                    where=alpha > 0)
    rgb = np.clip(rgb, 0, 255)
    return Image.fromarray(np.dstack([rgb, np.clip(arr[:, :, 3:4], 0, 255)]).astype(np.uint8), "RGBA")


def update_json(json_path: str, char: str, count: int) -> None:
    """Keep the Aseprite-style metadata in sync with the new frame size."""
    with open(json_path, encoding="utf-8") as fh:
        j = json.load(fh)
    old = j.get("frames", [])
    frames = []
    for i in range(count):
        duration = old[i].get("duration", 100) if i < len(old) else 100
        frames.append({
            "filename": f"{char}_master {i}.aseprite",
            "frame": {"x": i * FRAME_W, "y": 0, "w": FRAME_W, "h": FRAME_H},
            "rotated": False,
            "trimmed": False,
            "spriteSourceSize": {"x": 0, "y": 0, "w": FRAME_W, "h": FRAME_H},
            "sourceSize": {"w": FRAME_W, "h": FRAME_H},
            "duration": duration,
        })
    j["frames"] = frames
    j["meta"]["image"] = os.path.basename(json_path).replace(".json", ".png")
    j["meta"]["size"] = {"w": FRAME_W * count, "h": FRAME_H}
    with open(json_path, "w", encoding="utf-8") as fh:
        json.dump(j, fh, indent=2)
    print(f"  {os.path.basename(json_path)} updated")


def build(char: str, src: str, labels: list[str], out_png: str) -> None:
    frames = extract(src, labels)

    # common scale, measured on standing frames only
    standing = [f for f in frames if not f["name"].startswith("sit")]
    max_h = max(f["y1"] - f["y0"] + 1 for f in standing)
    scale = TARGET_STANDING_H / max_h
    print(f"{char}: {len(frames)} frames, scale {scale:.4f}")

    sheet = Image.new("RGBA", (FRAME_W * len(frames), FRAME_H), (0, 0, 0, 0))
    rgb = np.asarray(Image.open(src).convert("RGB")).astype(np.float32)

    report = []
    for i, f in enumerate(frames):
        box = (f["x0"], f["y0"], f["x1"], f["y1"])
        im = premultiplied_rgba(rgb, f["mask"], box)
        w = max(1, round(im.width * scale))
        h = max(1, round(im.height * scale))
        im = resize_pm(im, w, h)

        # anchor horizontally on the head: its centroid stays put through a walk
        # cycle, while the feet swing back and forth (a feet anchor would make
        # the whole body jump sideways between frames)
        m = f["mask"]
        src_h = f["y1"] - f["y0"] + 1
        head = m[f["y0"]:f["y0"] + int(src_h * 0.4), f["x0"]:f["x1"] + 1]
        hx = np.where(head)[1]
        anchor_x = hx.mean() + f["x0"] if len(hx) else f["cx"]
        fx = round((anchor_x - f["x0"]) * scale)

        x = round(FRAME_W / 2 - fx)
        y = BOTTOM - h + 1
        x = max(0, min(FRAME_W - w, x))
        y = max(0, min(FRAME_H - h, y))
        sheet.alpha_composite(im, (i * FRAME_W + x, y))
        report.append(f"{f['name']}:{w}x{h}@({x},{y})")

    sheet.save(out_png)
    print("  " + "  ".join(report))
    print(f"  wrote {out_png} {sheet.size}")


def main() -> None:
    girl_src = os.path.join(ROOT, "ref", "girl_frames_redraw.png")
    boy_src = os.path.join(ROOT, "ref", "boy_frames_redraw.png")
    girl_out = os.path.join(ROOT, "assets", "characters", "girl", "girl_sheet.png")
    boy_out = os.path.join(ROOT, "assets", "characters", "boy", "boy_sheet.png")

    # keep the hand-drawn originals next to the redrawn references
    backup_dir = os.path.join(ROOT, "ref", "original")
    os.makedirs(backup_dir, exist_ok=True)
    for src, name in [(girl_out, "girl_sheet_original.png"), (boy_out, "boy_sheet_original.png")]:
        if os.path.exists(src):
            dst = os.path.join(backup_dir, name)
            if not os.path.exists(dst):
                shutil.copy2(src, dst)
                print("backup", dst)

    build("girl", girl_src, GIRL_LABELS, girl_out)
    build("boy", boy_src, BOY_LABELS, boy_out)
    update_json(os.path.join(ROOT, "assets", "characters", "girl", "girl_sheet.json"),
                "girl", len(GIRL_LABELS))
    update_json(os.path.join(ROOT, "assets", "characters", "boy", "boy_sheet.json"),
                "boy", len(BOY_LABELS))


if __name__ == "__main__":
    main()
