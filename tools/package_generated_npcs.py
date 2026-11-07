"""Crop and encode the image-model NPC frames; this script draws no characters."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "characters" / "npc_generated"
FRAME_W, FRAME_H = 48, 72


def split(source: Image.Image, row: int) -> list[Image.Image]:
    width, height = source.size
    cells = []
    for column in range(4):
        cell = source.crop((round(column * width / 4), round(row * height / 2),
                            round((column + 1) * width / 4), round((row + 1) * height / 2)))
        alpha = cell.getchannel("A")
        bounds = alpha.point(lambda value: 255 if value > 20 else 0).getbbox()
        if bounds is None:
            raise ValueError(f"No character in row {row}, column {column}")
        cells.append(cell.crop(bounds))
    max_width = max(cell.width for cell in cells)
    max_height = max(cell.height for cell in cells)
    scale = min(42 / max_width, 68 / max_height)
    result = []
    for cell in cells:
        resized = cell.resize((round(cell.width * scale), round(cell.height * scale)),
                              Image.Resampling.NEAREST)
        alpha = resized.getchannel("A").point(lambda value: 255 if value >= 100 else 0)
        resized.putalpha(alpha)
        frame = Image.new("RGBA", (FRAME_W, FRAME_H))
        frame.alpha_composite(resized, ((FRAME_W - resized.width) // 2,
                                        FRAME_H - 2 - resized.height))
        result.append(frame)
    return result


def save_gif(frames: list[Image.Image], path: Path, durations: list[int]) -> None:
    frames[0].save(path, save_all=True, append_images=frames[1:], duration=durations,
                   loop=0, disposal=2, optimize=False)


def save_sheet(frames: list[Image.Image], path: Path) -> None:
    sheet = Image.new("RGBA", (FRAME_W * len(frames), FRAME_H))
    for i, frame in enumerate(frames):
        sheet.alpha_composite(frame, (i * FRAME_W, 0))
    sheet.save(path)


def main() -> None:
    source_names = {
        "walk_down": "walk_source.png",
        "walk_left": "walk_left_source.png",
        "walk_up": "walk_up_source.png",
        "sit_right": "sit_source.png",
        "wave": "wave_source.png",
    }
    for action, source_name in source_names.items():
        source = Image.open(OUT / source_name).convert("RGBA")
        for row, person in enumerate(("boy", "girl")):
            frames = split(source, row)
            save_sheet(frames, OUT / f"{person}_{action}_sheet.png")
            durations = ([900, 130, 550, 900] if action == "sit_right"
                         else [250, 250, 250, 250] if action == "wave"
                         else [150] * 4)
            save_gif(frames, OUT / f"{person}_{action}.gif", durations)
            if action == "walk_left":
                reflected = [frame.transpose(Image.Transpose.FLIP_LEFT_RIGHT) for frame in frames]
                save_sheet(reflected, OUT / f"{person}_walk_right_sheet.png")
                save_gif(reflected, OUT / f"{person}_walk_right.gif", durations)
            if action == "sit_right":
                reflected = [frame.transpose(Image.Transpose.FLIP_LEFT_RIGHT) for frame in frames]
                save_sheet(reflected, OUT / f"{person}_sit_left_sheet.png")
                save_gif(reflected, OUT / f"{person}_sit_left.gif", durations)
            if action.startswith("walk_"):
                frames[0].save(OUT / f"{person}_idle_{action[5:]}.png")
            if action == "sit_right":
                # Keep the first scene's URL working while the full action names are added.
                save_gif(frames, OUT / f"{person}_sit.gif", durations)
                save_sheet(frames, OUT / f"{person}_sit_sheet.png")
            if action == "walk_down":
                save_gif(frames, OUT / f"{person}_walk.gif", durations)
                save_sheet(frames, OUT / f"{person}_walk_sheet.png")
    for person in ("boy", "girl"):
        Image.open(OUT / f"{person}_idle_left.png").transpose(
            Image.Transpose.FLIP_LEFT_RIGHT).save(OUT / f"{person}_idle_right.png")
    print(f"Packaged model-generated NPC GIFs in {OUT}")


if __name__ == "__main__":
    main()
