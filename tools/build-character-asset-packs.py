#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""将三名角色的生成原画装配成 48×72 透明精灵表和独立动作帧。"""
from __future__ import annotations

import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
CHAR = ROOT / "assets" / "characters"
CW, CH, FEET_Y = 48, 72, 70
ACTIONS = ("wave", "talk", "pickup", "lean_left", "sit_left", "offer", "shy", "lean_back")
ACTION_HEIGHTS = (65, 65, 51, 63, 53, 65, 65, 65)


def source_pose(path: Path, part: int | None = None) -> Image.Image:
    image = Image.open(path).convert("RGBA")
    if part is not None:
        width = image.width // 4
        image = image.crop((part * width, 0, (part + 1) * width, image.height))
    rgba = np.asarray(image)
    mask = rgba[:, :, 3] > 64
    ys, xs = np.nonzero(mask)
    if not len(xs):
        raise ValueError(f"空白原画：{path}, part={part}")
    return image.crop((int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1))


def fit(image: Image.Image, height: int = 65) -> Image.Image:
    width = min(44, max(1, round(image.width * height / image.height)))
    image = image.resize((width, height), Image.Resampling.LANCZOS)
    rgba = np.array(image)
    rgba[rgba[:, :, 3] < 96] = (0, 0, 0, 0)
    rgba[rgba[:, :, 3] >= 96, 3] = 255
    image = Image.fromarray(rgba)
    cell = Image.new("RGBA", (CW, CH))
    cell.alpha_composite(image, ((CW - width) // 2, FEET_Y - height))
    return cell


def quarter(path: Path, part: int, height: int = 65) -> Image.Image:
    return fit(source_pose(path, part), height)


def mirrored(image: Image.Image) -> Image.Image:
    return image.transpose(Image.Transpose.FLIP_LEFT_RIGHT)


def make_actions(folder: Path, who: str) -> list[Image.Image]:
    source = folder / "v2" / "source"
    order = (0, 1, 5, 3, 4, 6, 2, 7) if who == "friend" else tuple(range(8))
    return [
        quarter(source / ("actions_a.png" if source_i < 4 else "actions_b.png"), source_i % 4, ACTION_HEIGHTS[i])
        for i, source_i in enumerate(order)
    ]


def make_friend() -> tuple[list[Image.Image], dict[str, list[int]]]:
    folder = CHAR / "friend"
    source = folder / "v2" / "source"
    original = Image.open(ROOT / "act5" / "assets" / "friend_sheet.png").convert("RGBA")
    frames = [original.crop((i * CW, 0, (i + 1) * CW, CH)) for i in range(9)]
    left = fit(source_pose(source / "idle_left.png"))
    back = fit(source_pose(source / "idle_back.png"))
    frames += [left, mirrored(left), back]
    walk_left = [quarter(source / "walk_left.png", i) for i in range(4)]
    walk_front = [quarter(source / "walk_front.png", i) for i in range(4)]
    walk_back = [quarter(source / "walk_back.png", i) for i in range(4)]
    frames += [mirrored(frame) for frame in walk_left]
    frames += walk_left + walk_front + walk_back
    frames += make_actions(folder, "friend")
    names = {
        "idle_down": list(range(0, 9)),
        "idle_left": [9], "idle_right": [10], "idle_up": [11],
        "walk_right": list(range(12, 16)),
        "walk_left": list(range(16, 20)),
        "walk_down": list(range(20, 24)),
        "walk_up": list(range(24, 28)),
    }
    names.update({name: [28 + i] for i, name in enumerate(ACTIONS)})
    return frames, names


def make_lead(who: str) -> tuple[list[Image.Image], dict[str, list[int]]]:
    folder = CHAR / who
    original = Image.open(folder / f"{who}_sheet.png").convert("RGBA")
    base_count = original.width // CW
    frames = [original.crop((i * CW, 0, (i + 1) * CW, CH)) for i in range(base_count)]
    frames += make_actions(folder, who)
    names = {
        "idle_down": [0, 1], "idle_left": [2], "idle_right": [3], "idle_up": [4],
        "walk_down": list(range(5, 9)), "walk_left": list(range(9, 13)),
        "walk_right": list(range(13, 17)), "walk_up": list(range(17, 21)),
    }
    names.update({name: [base_count + i] for i, name in enumerate(ACTIONS)})
    return frames, names


def save_gif(frames: list[Image.Image], indices: list[int], path: Path) -> None:
    gif_frames = []
    for i in indices:
        background = Image.new("RGBA", (CW, CH), "#92717d")
        background.alpha_composite(frames[i])
        gif_frames.append(background.convert("RGB").resize((CW * 5, CH * 5), Image.Resampling.NEAREST))
    gif_frames[0].save(path, save_all=True, append_images=gif_frames[1:], duration=170, loop=0)


def save_preview(frames: list[Image.Image], names: dict[str, list[int]], path: Path) -> None:
    cols, cell_w, cell_h = 6, 112, 155
    rows = (len(frames) + cols - 1) // cols
    preview = Image.new("RGB", (cols * cell_w, rows * cell_h), "#2a2630")
    draw = ImageDraw.Draw(preview)
    try:
        font = ImageFont.truetype("arial.ttf", 13)
    except OSError:
        font = ImageFont.load_default()
    lookup = {index: key for key, seq in names.items() for index in seq}
    for i, frame in enumerate(frames):
        x, y = i % cols * cell_w, i // cols * cell_h
        backdrop = Image.new("RGBA", (CW, CH), "#9a7583")
        backdrop.alpha_composite(frame)
        preview.paste(backdrop.convert("RGB").resize((CW * 2, CH * 2), Image.Resampling.NEAREST), (x + 8, y))
        draw.text((x + 6, y + 141), f"{i:02d} {lookup.get(i, '')}", fill="#fff0dc", font=font)
    preview.save(path)


def build(who: str) -> None:
    frames, names = make_friend() if who == "friend" else make_lead(who)
    folder = CHAR / who / "v2"
    frame_dir = folder / "frames"
    frame_dir.mkdir(parents=True, exist_ok=True)
    sheet = Image.new("RGBA", (len(frames) * CW, CH))
    for index, frame in enumerate(frames):
        assert frame.size == (CW, CH)
        assert frame.getchannel("A").getbbox()
        sheet.alpha_composite(frame, (index * CW, 0))
        frame.save(frame_dir / f"{index:02d}.png")
    sheet.save(folder / f"{who}_sheet_v2.png")
    for name, indices in names.items():
        if len(indices) == 1:
            frames[indices[0]].save(folder / f"{name}.png")
        elif name.startswith("walk_"):
            save_gif(frames, indices, folder / f"{name}.gif")
    save_preview(frames, names, folder / f"{who}_contact_sheet.png")
    (folder / "manifest.json").write_text(json.dumps({
        "character": who, "frameWidth": CW, "frameHeight": CH,
        "sheet": f"{who}_sheet_v2.png", "frames": len(frames),
        "animations": names,
        "framePath": "frames/{index:02d}.png",
        "feetBaseline": FEET_Y,
    }, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"{who}: {len(frames)} frames, {sheet.width}×{sheet.height}")


if __name__ == "__main__":
    for name in ("friend", "boy", "girl"):
        build(name)
