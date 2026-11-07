"""Package image-model turn frames into the corridor scene; no character drawing."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "scenes" / "lean_turn"
BACKGROUND = ROOT / "assets" / "scenes" / "school_corridor_railing_pixel.png"


def trim(im: Image.Image) -> Image.Image:
    alpha = im.getchannel("A").point(lambda value: 255 if value > 20 else 0)
    bounds = alpha.getbbox()
    if bounds is None:
        raise ValueError("Generated frame has no opaque character")
    return im.crop(bounds)


def fit_height(im: Image.Image, height: int) -> Image.Image:
    width = round(im.width * height / im.height)
    out = im.resize((width, height), Image.Resampling.NEAREST)
    out.putalpha(out.getchannel("A").point(lambda value: 255 if value >= 100 else 0))
    return out


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    source = Image.open(OUT / "girl_turn_source.png").convert("RGBA")
    boy = fit_height(trim(Image.open(OUT / "boy_lean_source.png").convert("RGBA")), 350)
    background = Image.open(BACKGROUND).convert("RGBA")
    sw, sh = source.size
    rendered = []
    for index in range(8):
        row, column = divmod(index, 4)
        cell = source.crop((round(column * sw / 4), round(row * sh / 2),
                            round((column + 1) * sw / 4), round((row + 1) * sh / 2)))
        girl = fit_height(trim(cell), 360)
        scene = background.copy()
        scene.alpha_composite(boy, (round(740 - boy.width / 2), 710 - boy.height))
        scene.alpha_composite(girl, (round(920 - girl.width / 2), 710 - girl.height))
        frame_path = OUT / f"frame_{index:02d}.png"
        scene.convert("RGB").save(frame_path)
        rendered.append(scene.convert("RGB"))
    durations = [150, 110, 110, 110, 110, 110, 150, 750]
    rendered[0].save(OUT / "lean_turn.gif", save_all=True, append_images=rendered[1:],
                     duration=durations, loop=0, disposal=2, optimize=True)
    print(f"Saved {len(rendered)} scene frames and GIF to {OUT}")


if __name__ == "__main__":
    main()
