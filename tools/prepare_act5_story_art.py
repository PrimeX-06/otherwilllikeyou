"""Keep generated scene originals and make exact-size pixel preview assets."""
from pathlib import Path
from shutil import copy2
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
out = root / "assets" / "cg" / "act5"
source_dir = out / "source"
source_dir.mkdir(parents=True, exist_ok=True)
generated = Path(r"C:\Users\yueqi\.codex\generated_images\01a1ab6f-e9b0-75a2-b6a1-d862870a7dd8")
scenes = {
    "story_g03_bench": "exec-b0e23981-b847-4f78-a8a6-8d6b6ba84045.png",
    "story_g04_exit": "exec-61b34039-54cd-4761-9bbb-5bb9b616bfd2.png",
    "story_g04_to_corridor": "exec-0147e49c-e243-455a-bc35-07d62da8ea44.png",
    "story_g01_handoff": "exec-e95f5fa7-7617-40aa-aa21-189cfa909bae.png",
}
for name, filename in scenes.items():
    source = generated / filename
    copy2(source, source_dir / f"{name}.png")
    image = Image.open(source).convert("RGB")
    image = ImageOps.fit(image, (512, 288), method=Image.Resampling.NEAREST, centering=(.5, .5))
    image.save(out / f"{name}_512.png")

sheet = generated / "exec-ddcde5e4-146f-4762-8a79-c21577b5abb4.png"
copy2(sheet, source_dir / "story_g01_handoff_4poses.png")
image = Image.open(sheet).convert("RGB")
width, height = image.size
for index in range(4):
    x, y = index % 2, index // 2
    pose = image.crop((x * width // 2, y * height // 2,
                       (x + 1) * width // 2, (y + 1) * height // 2))
    pose.resize((256, 256), Image.Resampling.NEAREST).save(out / f"story_g01_handoff_pose_{index+1:02}.png")
print("Prepared 4 story scenes and 4 handoff key poses")
