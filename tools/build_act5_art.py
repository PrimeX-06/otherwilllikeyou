"""Build Act 5 pixel assets without changing existing sprite indices."""
from pathlib import Path
import json
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets' / 'minigame'
OUT.mkdir(exist_ok=True)
SOURCE = Path(r'C:\Users\yueqi\.codex\generated_images\01a1ab6f-e9b0-75a2-b6a1-d862870a7dd8\exec-c2f49b69-6691-4bfa-bbf8-715a11bcba99.png')
S = 4
INK, PAPER, GOLD, GREEN = '#302934', '#f2dfc2', '#e8ac69', '#5b867b'

def save(name, size, draw_fn):
    im = Image.new('RGBA', size, (0, 0, 0, 0))
    draw_fn(ImageDraw.Draw(im))
    im.save(OUT / name)

def rect(d, box, fill, outline=None, width=1):
    d.rectangle(box, fill=fill, outline=outline, width=width)

def line(d, pts, fill=INK, width=1):
    d.line(pts, fill=fill, width=width, joint='curve')

# One generated source, nine actual game-size pixel cards.
atlas = Image.open(SOURCE).convert('RGB')
names = [f'silhouette_{kind}_{i:02}.png' for kind in ('anime', 'game', 'movie') for i in range(1, 4)]
for n, name in enumerate(names):
    x, y = (n % 3) * atlas.width // 3, (n // 3) * atlas.height // 3
    tile = atlas.crop((x + 4, y + 4, x + atlas.width // 3 - 4, y + atlas.height // 3 - 4))
    tile = tile.resize((96, 96), Image.Resampling.NEAREST)
    tile.save(OUT / name)

# The route puzzle uses legible labels as UI text on top of this geometric map.
def draw_map(d):
    rect(d, (0, 0, 255, 159), PAPER, INK, 3)
    rect(d, (8, 50, 247, 105), '#d4bfa7', INK, 2)
    for x in (15, 67, 119, 171):
        rect(d, (x, 12, x + 44, 46), '#f8ecd6', INK, 2)
        rect(d, (x + 5, 113, x + 44, 148), '#f8ecd6', INK, 2)
        rect(d, (x + 16, 45, x + 27, 51), GOLD)
        rect(d, (x + 16, 105, x + 27, 113), GOLD)
    rect(d, (224, 12, 247, 46), '#afbaac', INK, 2)
    rect(d, (224, 113, 247, 148), '#afbaac', INK, 2)
    for x in range(19, 219, 14):
        rect(d, (x, 76, x + 5, 80), '#a38d79')
    for x, y, color in ((37, 73, '#c8756b'), (102, 73, GREEN), (183, 73, '#8b86a4')):
        d.ellipse((x-6, y-6, x+6, y+6), fill=color, outline=INK, width=2)
    font = ImageFont.truetype(r'C:\Windows\Fonts\msyh.ttc', 9)
    for x, label in zip((19, 71, 123, 175), ('教室', '教室', '教室', '教室')):
        d.text((x, 23), label, font=font, fill=INK)
    for x, label in zip((19, 71, 123, 175), ('教室', '教室', '教室', '教室')):
        d.text((x, 124), label, font=font, fill=INK)
    for x, label in ((226, '楼梯'), (11, '窗台'), (78, '饮水'), (161, '招领')):
        d.text((x, 86 if x<200 else 24), label, font=font, fill=INK)
    rect(d, (4, 4, 251, 155), None, INK, 2)
save('map_floor2.png', (256, 160), draw_map)

save('ui_pin.png', (16, 16), lambda d: (d.ellipse((2, 1, 13, 12), fill='#c8756b', outline=INK, width=2), d.polygon([(6, 10), (9, 10), (8, 15)], fill=INK)))
for color_name, color in [('red','#c8756b'),('green','#74a788'),('blue','#7f92b5')]:
    save(f'ui_pin_{color_name}.png',(16,16),lambda d,c=color:(d.ellipse((2,1,13,12),fill=c,outline=INK,width=2),d.polygon([(6,10),(9,10),(8,15)],fill=INK)))
save('field_overlay.png', (512, 288), lambda d: (d.rectangle((12, 177, 499, 280), outline=PAPER, width=2), line(d, [(256, 177), (256, 280)], PAPER, 2), d.ellipse((225, 201, 287, 256), outline=PAPER, width=2), d.rectangle((12, 207, 55, 249), outline=PAPER, width=2), d.rectangle((455, 207, 499, 249), outline=PAPER, width=2)))
save('goal_frame.png', (160, 112), lambda d: (rect(d, (8, 8, 151, 105), '#ffffff18', PAPER, 4), [line(d, [(x, 11), (x, 104)], '#ffffff77') for x in range(26, 150, 18)], [line(d, [(10, y), (149, y)], '#ffffff77') for y in range(25, 105, 16)]))
save('scoreboard.png', (96, 48), lambda d: (rect(d, (0, 0, 95, 47), INK, GOLD, 3), rect(d, (8, 10, 43, 38), '#624f5c', PAPER), rect(d, (52, 10, 87, 38), '#624f5c', PAPER)))
digit_font=ImageFont.truetype(r'C:\Windows\Fonts\consola.ttf',28)
def draw_score(d, left, right):
    rect(d,(0,0,95,47),INK,GOLD,3)
    rect(d,(8,10,43,38),'#624f5c',PAPER)
    rect(d,(52,10,87,38),'#624f5c',PAPER)
    d.text((17,9),str(left),font=digit_font,fill=PAPER)
    d.text((61,9),str(right),font=digit_font,fill=PAPER)
for left in range(4):
    for right in range(4):
        save(f'scoreboard_{left}_{right}.png',(96,48),lambda d,a=left,b=right:draw_score(d,a,b))

def card(d, back=False):
    rect(d, (1, 1, 94, 62), '#f4e7ce' if not back else '#617a80', INK, 3)
    rect(d, (7, 7, 88, 16), GOLD if not back else '#c6ded5')
    if not back:
        rect(d, (10, 24, 35, 49), '#a39191', INK)
        for y in (26, 33, 40, 47): rect(d, (43, y, 80, y+2), '#8d7e74')
    else:
        rect(d, (28, 23, 68, 46), PAPER, INK, 2)
        rect(d, (39, 30, 57, 36), GOLD)
for back in (False, True): save('prop_card_back.png' if back else 'prop_card_front.png', (96, 64), lambda d, b=back: card(d, b))

def small_props():
    save('prop_dust_mark.png', (64, 64), lambda d: (rect(d, (2, 23, 61, 54), '#968d87'), rect(d, (13, 28, 49, 48), '#c5b7a4'), [d.point((x, y), fill=PAPER) for x, y in [(6,30),(54,34),(8,49),(57,44),(25,53),(48,24)]]))
    for color, suffix in (('#bc594e', 'red'), ('#78b680', 'green')):
        save(f'prop_water_reader_{suffix}.png', (48, 64), lambda d, c=color: (rect(d, (8, 3, 39, 61), '#8e9b9b', INK, 3), rect(d, (14, 14, 33, 29), '#273c42'), rect(d, (21, 19, 27, 25), c), rect(d, (12, 39, 35, 51), '#bed1c6', INK)))
    Image.open(OUT/'prop_water_reader_red.png').save(OUT/'prop_water_reader.png')
    save('prop_lost_found.png', (64, 64), lambda d: (rect(d, (7, 23, 57, 58), '#a9755b', INK, 3), rect(d, (4, 18, 60, 25), GOLD, INK, 2), rect(d, (24, 32, 40, 46), PAPER, INK)))
    save('prop_timetable.png', (64, 80), lambda d: (rect(d, (2, 2, 61, 77), PAPER, INK, 3), [line(d, [(9, y), (56, y)], '#917c70') for y in range(19, 74, 9)], [line(d, [(x, 18), (x, 73)], '#917c70') for x in (23, 39)]))
    save('prop_cctv.png', (32, 32), lambda d: (rect(d, (3, 8, 27, 19), '#a6aa9f', INK, 2), rect(d, (19, 20, 28, 23), INK), rect(d, (11, 12, 14, 15), '#d45a5c')))
    save('prop_cup.png', (24, 24), lambda d: (d.polygon([(4,4),(20,4),(17,21),(7,21)], fill=PAPER), rect(d, (3, 3, 21, 6), '#a77975', INK)))
    save('prop_notice_stack.png', (32, 32), lambda d: ([rect(d, (3+i, 9-i*2, 26+i, 23-i*2), PAPER, INK) for i in range(3)]))
    save('prop_tape.png', (16, 16), lambda d: (d.ellipse((1, 1, 14, 14), fill=GOLD, outline=INK, width=2), d.ellipse((5, 5, 10, 10), fill='#00000000', outline=INK)))
    for state in ('closed', 'open'):
        save(f'prop_box_{state}.png', (48, 48), lambda d, s=state: (rect(d, (5, 15, 43, 45), '#ad765d', INK, 3), rect(d, (3, 9 if s=='closed' else 2, 45, 17 if s=='closed' else 10), GOLD, INK, 2)))
    Image.open(OUT/'prop_box_closed.png').save(OUT/'prop_box.png')
    save('prop_goal_flag.png', (32, 48), lambda d: (rect(d, (5, 22, 27, 45), '#4c3d4a', INK, 2), rect(d, (11, 12, 22, 31), '#ab7b61', INK, 2)))
    save('ball_sheet.png', (64, 16), lambda d: [(d.ellipse((i*16+1, 1, i*16+14, 14), fill=PAPER, outline=INK, width=2), d.polygon([(i*16+8,4),(i*16+11,7),(i*16+9,11),(i*16+5,10),(i*16+4,7)], fill=INK)) for i in range(4)])
    save('ui_stamina.png', (64, 8), lambda d: (rect(d, (0, 0, 63, 7), INK), rect(d, (2, 2, 61, 5), GREEN)))
    save('ui_task_dot.png', (12, 12), lambda d: d.ellipse((1,1,10,10), fill=GOLD, outline=INK, width=2))
    for state,color in [('idle','#827980'),('active',GOLD),('done',GREEN)]:
        save(f'ui_task_dot_{state}.png',(12,12),lambda d,c=color:d.ellipse((1,1,10,10),fill=c,outline=INK,width=2))
    save('ui_camera_edge.png', (16, 288), lambda d: [rect(d, (i, 0, i, 287), (34, 27, 43, max(0, 160-i*10))) for i in range(16)])
small_props()

for kind, mark, color in [('anime','A','#c57978'),('game','G','#7b89b2'),('movie','M','#8da57b')]:
    save(f'icon_cat_{kind}.png', (32,32), lambda d, c=color, m=mark: (rect(d,(2,2,29,29),c,INK,3), d.text((11,8),m,fill=PAPER)))
save('card_poster_bg.png',(128,96),lambda d:(rect(d,(0,0,127,95),'#dfc5a0',INK,3),rect(d,(8,8,119,87),'#f0ddbd','#a78973',2),rect(d,(13,13,114,82),None,INK,1)))
save('ui_guess_slot.png',(96,96),lambda d:(rect(d,(1,1,94,94),'#57475a',GOLD,3),rect(d,(7,7,88,88),None,PAPER,2)))
save('ui_clue_frame.png',(64,64),lambda d:(rect(d,(0,0,63,63),'#f3e6cf',INK,3),rect(d,(5,5,58,58),None,GOLD,2)))
for state,color in [('selected',GOLD),('correct',GREEN),('excluded','#8b7884')]:
    save(f'ui_guess_slot_{state}.png',(96,96),lambda d,c=color:(rect(d,(1,1,94,94),'#57475a',c,3),rect(d,(7,7,88,88),None,PAPER,2)))
for state,color in [('seen',GOLD),('remembered',GREEN),('guessed','#8b86a4')]:
    save(f'ui_clue_frame_{state}.png',(64,64),lambda d,c=color:(rect(d,(0,0,63,63),'#f3e6cf',INK,3),rect(d,(5,5,58,58),None,c,2)))
save('fx_goal.png',(384,64),lambda d:[(rect(d,(i*128+4,4,i*128+123,59),'#f2dfc244',GOLD,2),d.ellipse((i*128+43,15,i*128+84,50),outline=PAPER,width=3)) for i in range(3)])
save('ui_magnifier.png',(16,16),lambda d:(d.ellipse((1,1,10,10),outline=PAPER,width=2),line(d,[(10,10),(15,15)],PAPER,2)))
save('ui_hint_bulb.png',(24,24),lambda d:(d.ellipse((4,2,19,17),fill=GOLD,outline=INK,width=2),rect(d,(9,17,15,22),PAPER,INK)))
save('ui_progress_ring.png',(32,32),lambda d:(d.ellipse((1,1,30,30),outline=INK,width=4),d.arc((2,2,29,29),-90,80,fill=GOLD,width=4)))
save('card_result_bg.png',(384,192),lambda d:(rect(d,(0,0,383,191),'#3c3444',GOLD,4),rect(d,(12,12,371,179),None,PAPER,2)))
for day, symbol in [('mon','M'),('wed','W'),('fri','F'),('nextmon','N')]:
    save(f'icon_day_{day}.png',(24,24),lambda d,s=symbol:(rect(d,(1,1,22,22),'#554653',GOLD,2),d.text((8,7),s,fill=PAPER)))
for name,color in [('errand','#b88363'),('search','#7c9b91'),('word','#8e789c'),('ball','#79a06d')]:
    save(f'hub_thumb_{name}.png',(96,64),lambda d,c=color:(rect(d,(0,0,95,63),c,INK,3),rect(d,(8,8,87,55),None,PAPER,2),d.ellipse((36,19,59,43),outline=PAPER,width=3)))

for character, actions in {
    'boy': [('dribble',4,13),('shoot',3,28),('tackle',3,25),('stumble',2,22),('carry',4,0)],
    'girl': [('dribble_slow',4,13),('miss_kick',3,28),('chase',4,13),('get_passed',2,29),('poster',4,23)],
    'friend': [('dribble',4,12),('feint',4,12),('tackle',3,30),('shoot',3,33),('celebrate',2,28),('sort',4,30)],
}.items():
    folder = ROOT / 'assets' / 'characters' / character / 'v2'
    manifest = json.loads((folder / 'manifest.json').read_text(encoding='utf-8'))
    sheet = Image.open(folder / manifest['sheet']).convert('RGBA')
    original_count = manifest['frames']
    frames = [sheet.crop((i*48, 0, (i+1)*48, 72)) for i in range(original_count)]
    for name, count, base in actions:
        ids = []
        for step in range(count):
            frame = frames[base].copy()
            # Redraw the lower-body movement or held object while preserving the original face and outfit.
            d = ImageDraw.Draw(frame)
            if name in ('dribble','dribble_slow','chase','feint'):
                dx = (-2, 0, 3, 0)[step]
                legs = frame.crop((12, 47, 38, 71))
                frame.paste((0,0,0,0), (10, 47, 41, 71))
                frame.alpha_composite(legs, (12+dx, 47))
                d = ImageDraw.Draw(frame)
                d.ellipse((31-dx, 58, 39-dx, 66), fill=PAPER, outline=INK, width=2)
            elif name in ('shoot','miss_kick','tackle','get_passed','stumble'):
                d.line((25, 53, 36+step*2, 58-step*2), fill=INK, width=5)
                d.rectangle((35+step*2, 55-step*2, 42+step*2, 60-step*2), fill='#d6c7b8', outline=INK)
            elif name == 'carry':
                d.rectangle((11, 38-step%2, 37, 54-step%2), fill='#b28362', outline=INK, width=2)
            elif name == 'poster':
                d.rectangle((32, 17-step*2, 45, 32-step*2), fill=PAPER, outline=INK, width=2)
            elif name == 'sort':
                for i in range(3): d.rectangle((30+i, 40-i*3-step%2, 42+i, 47-i*3-step%2), fill=PAPER, outline=INK)
            elif name == 'celebrate':
                d.line((13, 42, 8, 25-step*3), fill=INK, width=4)
                d.line((34, 42, 41, 25-step*3), fill=INK, width=4)
            ids.append(len(frames)); frames.append(frame)
        manifest['animations'][name] = ids
    manifest['frames'] = len(frames)
    extended = Image.new('RGBA', (len(frames)*48, 72))
    for i, frame in enumerate(frames): extended.alpha_composite(frame, (i*48, 0))
    extended.save(folder / f'{character}_sheet_act5.png')
    manifest['sheet'] = f'{character}_sheet_act5.png'
    (folder / 'manifest_act5.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')

preview = Image.new('RGBA',(576,486),'#332b37')
for row, character in enumerate(('boy','girl','friend')):
    folder=ROOT/'assets'/'characters'/character/'v2'
    data=json.loads((folder/'manifest_act5.json').read_text(encoding='utf-8'))
    sheet=Image.open(folder/data['sheet']).convert('RGBA')
    old={'boy':31,'girl':33,'friend':36}[character]
    for i in range(min(16,data['frames']-old)):
        sprite=sheet.crop(((old+i)*48,0,(old+i+1)*48,72))
        preview.alpha_composite(sprite,(i%8*72+12,row*162+i//8*78+4))
ImageDraw.Draw(preview).text((2,472),'boy / girl / yuno - act5 added frames',fill=PAPER)
preview.save(OUT/'act5_action_preview.png')

def character_frame(character, index):
    folder = ROOT / 'assets' / 'characters' / character / 'v2'
    sheet = Image.open(folder / f'{character}_sheet_act5.png').convert('RGBA')
    return sheet.crop((index*48, 0, (index+1)*48, 72))

def cutscene(name, background, people):
    scene = Image.open(ROOT / background).convert('RGBA').resize((512,288), Image.Resampling.NEAREST)
    # Stage actor positions are foot anchors, matching the existing 512x288 canvas.
    for character, index, x, foot, scale in people:
        sprite = character_frame(character, index)
        w, h = round(48*scale), round(72*scale)
        sprite = sprite.resize((w,h), Image.Resampling.NEAREST)
        scene.alpha_composite(sprite, (x-w//2, foot-h))
    scene.save(OUT / name)

cutscene('cutscene_monday_corridor.png','assets/scenes/school_corridor_door_pixel.png',[
    ('boy',13,172,247,1.2),('girl',9,275,247,1.2),('friend',12,393,247,1.2)])
cutscene('cutscene_wednesday_stairwell.png','act4/after-broadcast/assets/stairwell.png',[
    ('friend',0,190,245,1.15),('girl',27,283,245,1.15),('boy',0,371,245,1.15)])
cutscene('cutscene_next_monday_field.png','assets/scenes/school_exterior.png',[
    ('boy',13,173,249,1.12),('friend',12,257,250,1.12),('girl',13,333,249,1.12)])

def inference_board(d):
    rect(d,(0,0,511,287),'#342b38',GOLD,5)
    rect(d,(12,12,499,275),'#a97955',INK,3)
    for x,y in ((34,37),(192,37),(349,37),(115,165),(280,165)):
        rect(d,(x,y,x+126,y+83),PAPER,INK,2)
        d.ellipse((x+59,y+4,x+66,y+11),fill='#c66f62',outline=INK)
    for path in [[(159,78),(192,78)],[(318,78),(349,78)],[(94,120),(150,165)],[(255,120),(345,165)]]:
        line(d,path,'#ead6b7',2)
save('inference_board_bg.png',(512,288),inference_board)

close = Image.new('RGBA',(160,120),(0,0,0,0))
ImageDraw.Draw(close).rectangle((2,2,157,117),fill='#574752',outline=GOLD,width=3)
head = character_frame('friend',0).crop((5,3,43,47)).resize((105,105),Image.Resampling.NEAREST)
close.alpha_composite(head,(28,8))
close.save(OUT/'yuno_feint_closeup.png')

for name, title in [('errand','一起去办事'),('search','校园寻物'),('word','课间猜词'),('ball','体育活动')]:
    image=Image.new('RGBA',(384,64),(0,0,0,0))
    d=ImageDraw.Draw(image)
    font=ImageFont.truetype(r'C:\Windows\Fonts\msyh.ttc',40)
    d.text((7,2),title,font=font,fill=INK,stroke_width=3,stroke_fill=INK)
    d.text((7,2),title,font=font,fill=PAPER)
    image.save(OUT/f'title_{name}.png')

catalog = {}
for asset in sorted(OUT.glob('*.png')):
    if asset.name == 'act5_action_preview.png':
        continue
    with Image.open(asset) as image:
        catalog[asset.name] = {'width': image.width, 'height': image.height}
(OUT/'manifest.json').write_text(json.dumps({'assets':catalog,'characterManifests':{
    character:f'../characters/{character}/v2/manifest_act5.json'
    for character in ('boy','girl','friend')
}},ensure_ascii=False,indent=2),encoding='utf-8')
print('Built', len(list(OUT.glob('*.png'))), 'static assets and Act 5 sprite extensions')
