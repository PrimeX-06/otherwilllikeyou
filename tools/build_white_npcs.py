"""Build reusable hairless background students in the game's 48x72 motion grid."""

from __future__ import annotations

import json
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import binary_erosion, binary_fill_holes

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "characters" / "white_npc"
ASEPRITE = Path(r"D:\aseprite\aseprite.exe")
W, H = 48, 72
TAGS = [
    ("idle_down", 0, 1), ("idle_left", 2, 2), ("idle_right", 3, 3),
    ("idle_up", 4, 4), ("walk_down", 5, 8), ("walk_left", 9, 12),
    ("walk_right", 13, 16), ("walk_up", 17, 20),
    ("sit_left", 21, 21), ("sit_right", 22, 22), ("wave", 23, 24),
]


def make_wave(frame: Image.Image, phase: int, wide: bool = False) -> Image.Image:
    """Raise an arm without changing the character's head or standing pose."""
    mask = Image.fromarray((np.asarray(frame)[..., 3] > 100).astype("uint8") * 255)
    draw = ImageDraw.Draw(mask)
    # Hide the lowered sleeve and hand, then connect a raised sleeve and palm.
    if wide:
        draw.rectangle((33, 43, 40, 54), fill=0)
        if phase == 0:
            draw.polygon([(31, 43), (37, 42), (44, 35), (47, 36),
                          (47, 41), (40, 48), (33, 49)], fill=255)
            draw.rectangle((44, 29, 47, 37), fill=255)
        else:
            draw.polygon([(31, 43), (37, 40), (44, 31), (47, 32),
                          (47, 38), (40, 46), (33, 49)], fill=255)
            draw.rectangle((44, 25, 47, 33), fill=255)
    else:
        draw.rectangle((33, 43, 39, 55), fill=0)
        if phase == 0:
            draw.polygon([(31, 43), (35, 41), (39, 32), (42, 33),
                          (41, 39), (37, 46), (33, 49)], fill=255)
            draw.rectangle((39, 29, 42, 34), fill=255)
        else:
            draw.polygon([(31, 43), (35, 40), (40, 29), (43, 30),
                          (42, 36), (38, 44), (33, 48)], fill=255)
            draw.rectangle((40, 25, 43, 31), fill=255)
    out = Image.new("RGBA", (W, H))
    out.putalpha(mask)
    return out


def dress(frame: Image.Image, index: int, variant: str) -> Image.Image:
    """Replace the protagonist's hair with a plain face and muted school clothes."""
    source = np.asarray(frame.convert("RGBA"))[..., 3] > 100
    yy, xx = np.mgrid[:H, :W]
    body = binary_fill_holes(source) & (yy >= 38)
    head_image = Image.new("1", (W, H))
    head_draw = ImageDraw.Draw(head_image)
    head_draw.ellipse((13, 8, 35, 36), fill=1)
    head_draw.rectangle((20, 34, 28, 40), fill=1)
    head_draw.rectangle((11, 25, 14, 30), fill=1)
    head_draw.rectangle((34, 25, 37, 30), fill=1)
    head = np.asarray(head_image, dtype=bool)
    mask = body | head
    edge = mask & ~binary_erosion(mask, structure=np.ones((3, 3)))
    skin = (244, 220, 199, 255)
    skin_shadow = (223, 188, 166, 255)
    if variant == "boy":
        coat, coat_shadow, pants = (89, 94, 105, 255), (70, 73, 84, 255), (73, 68, 75, 255)
    else:
        coat, coat_shadow, pants = (147, 120, 115, 255), (113, 89, 91, 255), (89, 72, 79, 255)
    pixels = np.zeros((H, W, 4), dtype=np.uint8)
    pixels[mask] = skin
    pixels[body] = coat
    pixels[body & (xx > 27) & (yy < 55)] = coat_shadow
    pixels[body & (yy >= 54)] = pants
    pixels[body & (yy >= 65)] = (58, 51, 59, 255)
    # White shirt and collar remain legible even when a desk overlaps the pose.
    pixels[body & (xx >= 21) & (xx <= 27) & (yy >= 39) & (yy <= 53)] = (240, 229, 212, 255)
    pixels[body & (yy >= 38) & (yy <= 40) & (xx >= 19) & (xx <= 29)] = (249, 236, 221, 255)
    pixels[body & (yy >= 49) & (yy <= 54) & ((xx <= 15) | (xx >= 33))] = skin_shadow
    if variant == "girl":
        pixels[body & (yy >= 53) & (yy <= 59)] = (107, 84, 91, 255)
        pixels[body & (yy >= 60) & (yy <= 64) & ((xx <= 21) | (xx >= 27))] = skin_shadow
    pixels[head & (xx >= 30) & (yy >= 13)] = skin_shadow
    pixels[edge] = (88, 73, 77, 255)
    art = Image.fromarray(pixels)
    d = ImageDraw.Draw(art)
    # Front, profile, and rear poses use matching expressions across both sets.
    direction = "down" if index in (0, 1, 5, 6, 7, 8, 23, 24) else (
        "left" if index in (2, 9, 10, 11, 12, 21) else (
            "right" if index in (3, 13, 14, 15, 16, 22) else "up"))
    ink = (76, 59, 62, 255)
    blush = (226, 166, 156, 255)
    if direction == "down":
        if index == 1:
            d.line((18, 27, 21, 27), fill=ink)
            d.line((27, 27, 30, 27), fill=ink)
        else:
            d.rectangle((19, 26, 20, 28), fill=ink)
            d.rectangle((28, 26, 29, 28), fill=ink)
        d.point((16, 30), fill=blush)
        d.point((32, 30), fill=blush)
        d.line((22, 32, 26, 32), fill=ink)
        d.point((23, 33), fill=ink)
    elif direction == "left":
        d.rectangle((17, 26, 18, 28), fill=ink)
        d.point((14, 31), fill=blush)
        d.line((16, 33, 19, 33), fill=ink)
    elif direction == "right":
        d.rectangle((30, 26, 31, 28), fill=ink)
        d.point((34, 31), fill=blush)
        d.line((29, 33, 32, 33), fill=ink)
    # Buttons and cuffs show that these are classmates, not bright ghost shapes.
    for by in (44, 49):
        if art.getpixel((24, by))[3]:
            d.point((24, by), fill=(150, 132, 124, 255))
    return art


def build_variant(name: str, source_name: str) -> None:
    # Both outfits share the boy's hair-free body silhouette and exact pose grid.
    src = ROOT / "assets" / "characters" / "boy" / "boy_sheet.png"
    source = Image.open(src).convert("RGBA")
    frames = [source.crop((i * W, 0, (i + 1) * W, H))
              for i in range(source.width // W)]
    frames += [make_wave(frames[0], 0), make_wave(frames[0], 1)]
    assert len(frames) == 25
    sheet = Image.new("RGBA", (W * len(frames), H))
    for i, frame in enumerate(frames):
        sheet.alpha_composite(dress(frame, i, source_name), (i * W, 0))
    sheet_path = OUT / f"{name}_sheet.png"
    sheet.save(sheet_path)

    original_json = ROOT / "assets" / "characters" / source_name / f"{source_name}_sheet.json"
    metadata = json.loads(original_json.read_text(encoding="utf-8"))
    template = metadata["frames"]
    metadata["frames"] = []
    for i in range(25):
        fr = dict(template[i] if i < len(template) else template[0])
        fr["filename"] = f"{name}_master {i}.aseprite"
        fr["frame"] = {"x": i * W, "y": 0, "w": W, "h": H}
        fr["duration"] = 120 if 5 <= i <= 20 or i >= 23 else 800
        metadata["frames"].append(fr)
    metadata["meta"]["image"] = sheet_path.name
    metadata["meta"]["size"] = {"w": W * 25, "h": H}
    metadata["meta"]["frameTags"] = [
        {"name": tag, "from": first, "to": last,
         "direction": "forward", "color": "#000000ff"}
        for tag, first, last in TAGS
    ]
    (OUT / f"{name}_sheet.json").write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    lua = OUT / f"_build_{name}.lua"
    sheet_lua = str(sheet_path).replace("\\", "/")
    dest_lua = str(OUT / f"{name}_master.aseprite").replace("\\", "/")
    lines = [
        f'local sheet = app.open("{sheet_lua}")',
        f'local sprite = Sprite({W}, {H}, ColorMode.RGB)',
        'sprite.layers[1].name = "background student"',
        'local source = sheet.cels[1].image',
        'for frame = 1, 25 do',
        '  if frame > 1 then sprite:newFrame() end',
        '  local cel = sprite:newCel(sprite.layers[1], frame)',
        f'  for y = 0, {H-1} do',
        f'    for x = 0, {W-1} do',
        f'      cel.image:drawPixel(x, y, source:getPixel((frame - 1) * {W} + x, y))',
        '    end',
        '  end',
        '  if (frame >= 6 and frame <= 21) or frame >= 24 then',
        '    sprite.frames[frame].duration = 0.12',
        '  else',
        '    sprite.frames[frame].duration = 0.8',
        '  end',
        'end',
    ]
    for tag, first, last in TAGS:
        lines.append(f'sprite:newTag({first+1}, {last+1}).name = "{tag}"')
    lines += [f'sprite:saveAs("{dest_lua}")', 'print("SAVED 25 frames")']
    lua.write_text("\n".join(lines) + "\n", encoding="utf-8")
    subprocess.run([str(ASEPRITE), "-b", "--script", str(lua)], check=True)
    lua.unlink()


def make_preview() -> None:
    indices = [0, 2, 3, 4, 5, 6, 9, 13, 17, 21, 22, 23, 24]
    scale, pad = 4, 12
    canvas = Image.new("RGBA", ((W * len(indices) + pad * 2) * scale,
                                   (H * 2 + pad * 3) * scale), (47, 50, 61, 255))
    for row, name in enumerate(("white_boy", "white_girl")):
        sheet = Image.open(OUT / f"{name}_sheet.png").convert("RGBA")
        for col, idx in enumerate(indices):
            frame = sheet.crop((idx * W, 0, (idx + 1) * W, H))
            canvas.alpha_composite(frame.resize((W * scale, H * scale), Image.Resampling.NEAREST),
                                   ((pad + col * W) * scale, (pad + row * (H + pad)) * scale))
    canvas.convert("RGB").save(OUT / "white_npc_preview.png")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    build_variant("white_boy", "boy")
    build_variant("white_girl", "girl")
    make_preview()
    print(f"Built white placeholder action pack in {OUT}")


if __name__ == "__main__":
    main()
