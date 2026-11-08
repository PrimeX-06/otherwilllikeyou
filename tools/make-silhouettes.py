# 第三幕 G03《猜人物》剪影占位图
#
# 96×96 透明底，统一人形 + 一件标志性道具。只做「看得出是哪一类」的程度，
# 不重绘原作形象，也不画脸——真做美术时按同一套轮廓换成手绘版即可。
#
# 用法：python tools/make-silhouettes.py
# 输出：assets/silhouettes/silhouette_{anime,game,movie}_0N.png
from PIL import Image, ImageDraw
import os

S = 96
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   "assets", "silhouettes")

INK = (26, 22, 32, 255)
HAT = (232, 196, 108, 255)
BAND = (72, 104, 156, 255)
RED = (196, 74, 66, 255)
YEL = (240, 208, 90, 255)
STEEL = (198, 204, 212, 255)
GREEN = (86, 138, 92, 255)
GOLD = (222, 178, 96, 255)
WHITE = (242, 240, 234, 255)
CLEAR = (0, 0, 0, 0)


def canvas():
    im = Image.new("RGBA", (S, S), CLEAR)
    return im, ImageDraw.Draw(im)


def body(d, head_r=13, head_y=34, widen=0):
    d.ellipse([48 - head_r, head_y - head_r, 48 + head_r, head_y + head_r], fill=INK)
    d.polygon([(36 - widen, 48), (60 + widen, 48), (64 + widen, 78), (32 - widen, 78)], fill=INK)
    d.rectangle([36, 76, 42, 90], fill=INK)
    d.rectangle([54, 76, 60, 90], fill=INK)


def luffy():
    """草帽 + 伸长的胳膊。"""
    im, d = canvas()
    d.rectangle([62, 52, 92, 58], fill=INK)
    d.ellipse([86, 48, 96, 62], fill=INK)
    body(d)
    d.ellipse([24, 18, 72, 34], fill=HAT)
    d.ellipse([36, 10, 60, 26], fill=HAT)
    d.rectangle([30, 27, 66, 31], fill=RED)
    return im


def naruto():
    """护额 + 三道胡须。"""
    im, d = canvas()
    body(d)
    d.rectangle([32, 25, 64, 33], fill=BAND)
    d.rectangle([40, 26, 56, 32], fill=STEEL)
    d.line([44, 29, 52, 29], fill=(120, 126, 134, 255), width=1)
    for y in (39, 43, 47):
        d.line([33, y, 38, y - 2], fill=INK, width=1)
        d.line([63, y, 58, y - 2], fill=INK, width=1)
    return im


def doraemon():
    """无耳圆头 + 肚子口袋 + 铃铛。"""
    im, d = canvas()
    d.ellipse([30, 18, 66, 54], fill=INK)
    d.polygon([(32, 50), (64, 50), (68, 82), (28, 82)], fill=INK)
    d.rectangle([32, 80, 40, 90], fill=INK)
    d.rectangle([56, 80, 64, 90], fill=INK)
    d.pieslice([38, 56, 58, 76], 180, 360, fill=WHITE)
    d.ellipse([42, 50, 54, 58], fill=GOLD)
    return im


def mario():
    """红帽 + 大鼻子 + 挖空的一圈胡子。"""
    im, d = canvas()
    body(d)
    d.ellipse([28, 14, 68, 30], fill=RED)
    d.rectangle([24, 26, 72, 31], fill=RED)
    d.ellipse([54, 32, 64, 42], fill=INK)          # 鼻子
    d.rectangle([36, 38, 56, 43], fill=CLEAR)      # 胡子镂空
    return im


def link():
    """绿尖帽 + 斜背的剑 + 盾。"""
    im, d = canvas()
    body(d)
    d.polygon([(48, 4), (66, 30), (30, 30)], fill=GREEN)
    d.rectangle([28, 28, 68, 33], fill=GREEN)
    d.line([62, 40, 80, 16], fill=STEEL, width=3)
    d.ellipse([20, 46, 40, 68], fill=STEEL)
    return im


def pikachu():
    """长耳朵 + 闪电尾巴。"""
    im, d = canvas()
    d.polygon([(36, 30), (28, 2), (42, 22)], fill=YEL)
    d.polygon([(60, 30), (68, 2), (54, 22)], fill=YEL)
    d.ellipse([34, 26, 62, 52], fill=YEL)
    d.polygon([(34, 46), (62, 46), (66, 80), (30, 80)], fill=YEL)
    d.polygon([(64, 62), (82, 48), (74, 58), (88, 54), (70, 76)], fill=YEL)
    return im


def vader():
    """三角头盔 + 披风 + 红色光剑。"""
    im, d = canvas()
    d.polygon([(30, 44), (66, 44), (76, 90), (20, 90)], fill=INK)
    d.ellipse([34, 12, 62, 44], fill=INK)
    d.polygon([(34, 28), (62, 28), (56, 44), (40, 44)], fill=INK)
    d.rectangle([39, 30, 57, 38], fill=(64, 56, 70, 255))
    d.line([74, 76, 90, 24], fill=RED, width=3)
    return im


def jack():
    """三角帽 + 长发 + 罗盘。"""
    im, d = canvas()
    body(d)
    d.polygon([(48, 8), (76, 30), (20, 30)], fill=INK)
    d.rectangle([20, 28, 76, 33], fill=INK)
    d.rectangle([30, 36, 36, 62], fill=INK)
    d.rectangle([60, 36, 66, 62], fill=INK)
    d.ellipse([66, 56, 80, 70], fill=GOLD)
    return im


def harry():
    """圆眼镜 + 闪电疤 + 魔杖。"""
    im, d = canvas()
    body(d)
    d.ellipse([33, 30, 44, 41], outline=GOLD, width=2)
    d.ellipse([52, 30, 63, 41], outline=GOLD, width=2)
    d.line([44, 35, 52, 35], fill=GOLD, width=1)
    d.line([46, 19, 51, 24, 46, 26, 51, 31], fill=WHITE, width=1)
    d.line([70, 62, 88, 44], fill=INK, width=2)
    return im


GROUPS = {
    "anime": [luffy, naruto, doraemon],
    "game": [mario, link, pikachu],
    "movie": [vader, jack, harry],
}


def main():
    os.makedirs(OUT, exist_ok=True)
    n = 0
    for group, fns in GROUPS.items():
        for i, fn in enumerate(fns, 1):
            path = os.path.join(OUT, "silhouette_%s_%02d.png" % (group, i))
            fn().save(path)
            n += 1
            print("wrote", os.path.relpath(path))
    print("%d 张剪影" % n)


if __name__ == "__main__":
    main()
