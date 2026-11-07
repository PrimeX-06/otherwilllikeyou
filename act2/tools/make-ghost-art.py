#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""把一张漫画截图做成黑板上的「淡粉笔底稿」。

用法（在 pixel-act1 目录下）：

    python act2/tools/make-ghost-art.py
    python act2/tools/make-ghost-art.py ref/别的图.jpg --size 128 --seed 7

做四件事：

1. 转灰度、缩到 SIZE×SIZE（默认 128，正好是主图区里那块正方形）；
2. 反相——原图的黑线变成亮线，因为黑板是深绿的，粉笔是亮的；
3. 砍掉 JPEG 压出来的灰底（`(ink - FLOOR) * GAIN`），再把粉笔磨出颗粒，
   边缘随机掉点渣，不然放大看是一块死板的灰斑；
4. 存成 act2/ghost-main.png，同时把 base64 塞进 act2/ghost-art.js。

为什么要 base64：游戏是 file:// 直接打开的，<img> 从磁盘读图会被 CORS 拦，
内嵌成 data URL 就没有这个问题，也少一次请求。

参数都在下面的常量里，想调亮度改 ALPHA_GAIN，想调脏一点改 DROP。
"""

import argparse
import base64
import io
import os
import sys

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ACT2 = os.path.dirname(HERE)
ROOT = os.path.dirname(ACT2)

# 粉笔的颜色，跟 board.js 里 chalk() 用的那支一样
CHALK_RGB = (244, 236, 221)

# 反相后低于这个灰度的当纸面，直接抹掉；乘 GAIN 把线压亮一点
FLOOR = 62
GAIN = 1.7

# 颗粒：每个像素乘一个 0.78~1.0 的随机数，粉笔的沙沙感
GRAIN_LO = 0.78
# 掉渣：中等亮度的边缘像素有 DROP 的概率被削掉大半
DROP = 0.22
DROP_KEEP = 0.35

# 整幅画最后压一道暗，board.js 里还会再乘 GHOST_ALPHA
ALPHA_GAIN = 0.92

JS_HEAD = """/* 第二幕 · 黑板报 — 主图底稿的画稿
 *
 * 由 %s 反相、阈值、粉笔颗粒化后缩到 %d×%d，
 * 内嵌成 data URL：file:// 下不用处理跨域，也不会多一次请求。
 * 想换画稿就重跑 tools/make-ghost-art.py。
 */
(function (global) {
  global.ACT2 = global.ACT2 || {};
  global.ACT2.GhostMain = "data:image/png;base64,%s";
})(window);
"""


def build(src_path, size, seed):
    im = Image.open(src_path).convert("L").resize((size, size), Image.LANCZOS)
    ink = 255.0 - np.asarray(im).astype(np.float64)          # 黑线 → 亮
    a = np.clip((ink - FLOOR) * GAIN, 0, 255)

    rng = np.random.default_rng(seed)
    a = a * (GRAIN_LO + (1.0 - GRAIN_LO) * rng.random((size, size)))

    drop = (rng.random((size, size)) < DROP) & (a > 20) & (a < 200)
    a[drop] *= DROP_KEEP

    a = np.clip(a * ALPHA_GAIN, 0, 255).astype(np.uint8)

    rgba = np.zeros((size, size, 4), dtype=np.uint8)
    rgba[:, :, 0] = CHALK_RGB[0]
    rgba[:, :, 1] = CHALK_RGB[1]
    rgba[:, :, 2] = CHALK_RGB[2]
    rgba[:, :, 3] = a
    return Image.fromarray(rgba, "RGBA"), a


def main():
    ap = argparse.ArgumentParser(description="漫画截图 → 黑板淡粉笔底稿")
    ap.add_argument("src", nargs="?", default=os.path.join(ROOT, "ref", "y9SVg4Zahb3LggL.jpg"))
    ap.add_argument("--size", type=int, default=128, help="输出边长，默认 128（主图区那块正方形）")
    ap.add_argument("--seed", type=int, default=7, help="颗粒的随机种子，换个值就是另一种沙沙感")
    ap.add_argument("--out", default=os.path.join(ACT2, "ghost-main.png"))
    args = ap.parse_args()

    if not os.path.exists(args.src):
        sys.exit("找不到源图：" + args.src)

    img, a = build(args.src, args.size, args.seed)

    buf = io.BytesIO()
    img.save(buf, "PNG", optimize=True)
    png = buf.getvalue()

    with open(args.out, "wb") as f:
        f.write(png)

    rel = os.path.relpath(args.src, ROOT).replace("\\", "/")
    js = JS_HEAD % (rel, args.size, args.size, base64.b64encode(png).decode("ascii"))
    with open(os.path.join(ACT2, "ghost-art.js"), "w", encoding="utf-8", newline="\n") as f:
        f.write(js)

    print("源图   %s" % rel)
    print("画稿   %s  %d×%d  %.1f KB" % (os.path.relpath(args.out, ROOT).replace("\\", "/"),
                                        args.size, args.size, len(png) / 1024.0))
    print("内嵌   act2/ghost-art.js  %.1f KB" % (len(js.encode("utf-8")) / 1024.0))
    print("覆盖   平均 alpha %.3f，半透明以上占 %.1f%%" % (a.mean() / 255.0, (a > 128).mean() * 100))


if __name__ == "__main__":
    main()
