"""Prepare image-generated four-frame, box-free front carry actions."""
from pathlib import Path
from shutil import copy2
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
GENERATED = Path(r'C:\Users\yueqi\.codex\generated_images\01a1ab6f-e9b0-75a2-b6a1-d862870a7dd8')
SOURCES = {
    'girl': ('exec-c8bdad80-027d-4358-88dc-ecdf438b6eda.png', 50),
    'friend': ('exec-72696ccd-4927-446a-8750-758d88fdd6be.png', 56),
}
for character, (generated_name, base_count) in SOURCES.items():
    folder = ROOT/'assets'/'characters'/character/'v2'
    source_dir = folder/'source'
    source_dir.mkdir(exist_ok=True)
    copied = source_dir/'carry_front_generated.png'
    copy2(GENERATED/generated_name, copied)
    image = Image.open(copied).convert('RGBA')
    assert image.size == (2048, 768)
    raw = []
    for step in range(4):
        cell = image.crop((step*512, 0, (step+1)*512, 768))
        alpha = cell.getchannel('A').point(lambda a: 255 if a >= 128 else 0)
        bounds = alpha.getbbox()
        if bounds is None: raise ValueError(f'{character} frame {step} is empty')
        raw.append(cell.crop(bounds))
    scale = min(44/max(frame.width for frame in raw), 68/max(frame.height for frame in raw))
    frames = []
    for step, crop in enumerate(raw):
        width, height = round(crop.width*scale), round(crop.height*scale)
        sprite = crop.resize((width,height),Image.Resampling.NEAREST)
        sprite.putalpha(sprite.getchannel('A').point(lambda a: 255 if a >= 128 else 0))
        frame = Image.new('RGBA',(48,72),(0,0,0,0))
        frame.alpha_composite(sprite,((48-width)//2,70-height))
        frames.append(frame)
        frame.save(folder/f'carry_front_{step:02}.png')
    manifest = json.loads((folder/'manifest_act5.json').read_text(encoding='utf-8'))
    original = Image.open(folder/manifest['sheet']).convert('RGBA')
    assert original.size == (base_count*48,72)
    sheet = Image.new('RGBA',((base_count+4)*48,72))
    sheet.alpha_composite(original)
    for step, frame in enumerate(frames): sheet.alpha_composite(frame,((base_count+step)*48,0))
    sheet_name = f'{character}_sheet_act5_carry.png'
    sheet.save(folder/sheet_name)
    manifest['sheet'] = sheet_name
    manifest['frames'] = base_count+4
    manifest['animations']['carry_front'] = list(range(base_count,base_count+4))
    (folder/'manifest_act5_carry.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    preview = Image.new('RGBA',(384,144),(0,0,0,0))
    for step, frame in enumerate(frames):
        preview.alpha_composite(frame.resize((96,144),Image.Resampling.NEAREST),(step*96,0))
    preview.save(folder/f'{character}_carry_front_preview.png')
    print(character,manifest['animations']['carry_front'])
