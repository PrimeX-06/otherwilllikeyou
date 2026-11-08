"""朱里的合页笔记本；24×32、透明、五色像素道具。"""
from pathlib import Path
from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parents[1] / "assets" / "minigame" / "prop_notebook.png"
INK = "#272b39"
COVER = "#485c70"
SHADE = "#35475a"
PAPER = "#e9ddc0"
LABEL = "#b7c8c5"

im = Image.new("RGBA", (24, 32), (0, 0, 0, 0))
d = ImageDraw.Draw(im)

# 横式本子略微斜放；右侧和底边露出纸页。
d.polygon([(2, 11), (19, 8), (22, 10), (23, 21), (21, 24), (3, 25), (1, 22), (1, 13)], fill=INK)
d.polygon([(4, 13), (20, 11), (21, 20), (19, 22), (4, 23)], fill=PAPER)
d.line([(4, 22), (20, 20)], fill=SHADE, width=1)
d.polygon([(2, 12), (19, 9), (21, 11), (21, 20), (19, 22), (2, 24)], fill=COVER)
d.polygon([(2, 12), (5, 12), (5, 23), (2, 24)], fill=SHADE)
d.line([(6, 12), (6, 22)], fill=INK, width=1)

# 无姓名标签：短划只表示纸面纹理。
d.rectangle((11, 12, 18, 16), fill=LABEL)
d.line([(12, 14), (16, 14)], fill=SHADE, width=1)
d.point((12, 16), fill=SHADE)

# 右下角折角和磨损，仍在五色之内。
d.polygon([(18, 19), (21, 19), (21, 21), (19, 22)], fill=PAPER)
d.line([(18, 19), (21, 19)], fill=INK, width=1)
d.point((17, 18), fill=SHADE)
d.point((15, 21), fill=SHADE)

im.save(OUT)
print(OUT)
