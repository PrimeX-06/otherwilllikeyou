/* 第二幕 · 黑板报 — 板面本体
 *
 * 这里只管「一块能画的黑板」：几何、粉笔、分层、撤销、四区判定、导出。
 * 不涉及剧情、人物、镜头（那些在 scene2.js），也不涉及她怎么帮忙（girl.js）。
 *
 * 坐标系：板面局部 448×240，左上角为 (0,0)。屏幕坐标由 scene2 换算。
 * 对外挂在 window.ACT2.Board 上；普通脚本，file:// 直接可用。
 */
(function (global) {
  "use strict";

  const W = 512, H = 288;
  const FRAME = { x: 16, y: 8, w: 480, h: 272 };
  const INNER = { x: 32, y: 24, w: 448, h: 240 };
  const BW = INNER.w, BH = INNER.h;
  const BAND = 12;

  // 粉笔色。都不是纯色，纯色在深绿上会显得像塑料。
  const COLORS = [
    { name: "白", hex: "#f4ecdd" },
    { name: "黄", hex: "#f6db9e" },
    { name: "粉", hex: "#efaab4" },
    { name: "蓝", hex: "#9acbdf" },
    { name: "绿", hex: "#c9d8b8" },
    { name: "橙", hex: "#e8b6a0" }
  ];

  // 四个区域互不重叠：0–48 标题，48–176 主图，176–240 装饰。
  const REGION = {
    title: { x: 16, y: 0, w: 416, h: 48 },
    main: { x: 16, y: 48, w: 416, h: 128 },
    deco: { x: 16, y: 176, w: 416, h: 64 }
  };

  // 边框按「环带里有多少条线有墨」算，不按面积——一条 2px 的线永远占不满 12px 的带。
  const EDGES = {
    top: { x: 0, y: 0, w: BW, h: BAND, axis: "x" },
    bottom: { x: 0, y: BH - BAND, w: BW, h: BAND, axis: "x" },
    left: { x: 0, y: 0, w: BAND, h: BH, axis: "y" },
    right: { x: BW - BAND, y: 0, w: BAND, h: BH, axis: "y" }
  };

  const NEED = {
    titleCover: 0.02, titleChars: 2,
    // 主图不是「描一圈就算完」：0.10 意味着那块画得真的被填起来。
    // 只描轮廓大概 0.03，她照画稿填一遍能到 0.15——所以这一条是
    // 逼着两个人分工：玩家管轮廓，她管填色（设计文档 §4.3）。
    mainCover: 0.10, mainSpan: 40,
    edge: 0.5,
    decoStamps: 3
  };

  // 预设图案库在 patterns.js 里（18 个，分花草 / 天空 / 校园 / 装饰四组）。
  // 这里不复制图案，只管两件事：把图案烘成一张小位图（带粉笔颗粒，烘一次就不闪），
  // 再把它当成「可以挪动的对象」贴到板面上。
  const PAT = global.ACT2.Patterns || { PATTERNS: [], BY_ID: {}, draw: function () {}, shade: (h) => h };
  const PATTERN_LIST = PAT.PATTERNS;
  const PAT_SCALE = 2;   // 1 像素的图案点在 448 宽的板面上太小，一律放大一倍

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

  // ---------------------------------------------------------------- 基础画布

  function mkLayer() {
    const c = document.createElement("canvas");
    c.width = BW;
    c.height = BH;
    const g = c.getContext("2d", { willReadFrequently: true });
    g.imageSmoothingEnabled = false;
    g.lineCap = "round";
    g.lineJoin = "round";
    return c;
  }

  /** 板面底：深绿绒布 + 细噪点 + 几处擦不掉的旧粉笔痕。 */
  function makeFelt() {
    const c = document.createElement("canvas");
    c.width = BW;
    c.height = BH;
    const g = c.getContext("2d");
    const img = g.createImageData(BW, BH);
    const d = img.data;
    for (let i = 0; i < BW * BH; i++) {
      const n = (Math.random() - 0.5) * 12;
      d[i * 4] = 72 + n;
      d[i * 4 + 1] = 100 + n;
      d[i * 4 + 2] = 90 + n;
      d[i * 4 + 3] = 255;
    }
    g.putImageData(img, 0, 0);

    // 旧痕：上一节课没擦干净的那种，很淡，随机的横向拖影
    g.globalAlpha = 0.028;
    g.fillStyle = "#e8e2d0";
    for (let i = 0; i < 6; i++) {
      const y = 20 + Math.random() * (BH - 40);
      const x = Math.random() * BW;
      const w = 20 + Math.random() * 55;
      g.fillRect(x, y, w, 2 + Math.random() * 3);
    }
    g.globalAlpha = 1;
    return c;
  }

  // ---------------------------------------------------------------- 预设底稿
  //
  // 底稿 = 朱里事先用淡粉笔打的构图稿。分四张，对应四个区，哪一区画完了哪一张淡掉。
  // 它只是一层「看着像擦过的粉笔痕」的图：不进墨迹统计、擦不掉、不导出，
  // 所以玩家还是得自己画——但看得见该画在哪。

  /** 虚线：底稿全靠它，一段一段地点，比实线更像用尺子比着画的草图。 */
  function dashChalk(g, x0, y0, x1, y1, opt) {
    const len = Math.hypot(x1 - x0, y1 - y0) || 1;
    const dash = opt.dash || 10;
    const gap = opt.gap || 7;
    for (let t = 0; t < len; t += dash + gap) {
      const a = t / len;
      const b = Math.min(len, t + dash) / len;
      chalk(g, x0 + (x1 - x0) * a, y0 + (y1 - y0) * a,
        x0 + (x1 - x0) * b, y0 + (y1 - y0) * b, opt);
    }
  }

  /** 断续的圆环：树冠、太阳、装饰位标记都用它。skip 是断口比例。 */
  function ringChalk(g, cx, cy, r, opt) {
    const n = Math.max(14, Math.round(r * 2.4));
    const skip = opt.skip == null ? 0.28 : opt.skip;
    for (let i = 0; i < n; i++) {
      if (Math.random() < skip) continue;
      const a = (i / n) * Math.PI * 2;
      chalk(g, cx + Math.cos(a) * r, cy + Math.sin(a) * r,
        cx + Math.cos(a + 0.03) * r, cy + Math.sin(a + 0.03) * r, opt);
    }
  }

  /** 断续的椭圆环：脸、发际线用。段之间略微重叠，断口才不会碎成点。 */
  function ovalChalk(g, cx, cy, rx, ry, opt) {
    const n = Math.max(24, Math.round((rx + ry) * 1.9));
    const skip = opt.skip == null ? 0.12 : opt.skip;
    for (let i = 0; i < n; i++) {
      if (Math.random() < skip) continue;
      const a0 = (i / n) * Math.PI * 2;
      const a1 = ((i + 1.2) / n) * Math.PI * 2;
      chalk(g, cx + Math.cos(a0) * rx, cy + Math.sin(a0) * ry,
        cx + Math.cos(a1) * rx, cy + Math.sin(a1) * ry, opt);
    }
  }

  function makeGhost() {
    const mk = (draw) => {
      const c = document.createElement("canvas");
      c.width = BW;
      c.height = BH;
      const g = c.getContext("2d");
      g.imageSmoothingEnabled = false;
      g.lineCap = "round";
      g.lineJoin = "round";
      draw(g);
      return c;
    };

    const out = {};

    // 边框：四条虚线，落在 12px 环带的中线上——她补边框时正好盖住它
    out.frame = mk((g) => {
      const o = { w: 2, alpha: 0.5, grain: 0.34, dash: 10, gap: 7 };
      dashChalk(g, 0, BAND / 2, BW, BAND / 2, o);
      dashChalk(g, 0, BH - BAND / 2, BW, BH - BAND / 2, o);
      dashChalk(g, BAND / 2, 0, BAND / 2, BH, o);
      dashChalk(g, BW - BAND / 2, 0, BW - BAND / 2, BH, o);
    });

    // 标题：一条下划线 + 两端小勾，意思是「字压在这条线上」
    out.title = mk((g) => {
      dashChalk(g, 88, 42, 360, 42, { w: 2, alpha: 0.46, grain: 0.3, dash: 16, gap: 8 });
      chalk(g, 88, 33, 88, 42, { w: 2, alpha: 0.4, grain: 0.3 });
      chalk(g, 360, 33, 360, 42, { w: 2, alpha: 0.4, grain: 0.3 });
    });

    // 主图：一张正面特写。按参考图量出来的比例——
    // 长发中分垂到两肩、额头只露中间一条、眼睛占脸的三分之一、张嘴。
    // 只勾轮廓，头发里的黑和脸颊的红留给玩家自己补。
    out.main = mk((g) => {
      const line = (x0, y0, x1, y1, a) =>
        chalk(g, x0, y0, x1, y1, { w: 2, alpha: a == null ? 0.42 : a, grain: 0.28 });
      const poly = (pts, a) => {
        for (let i = 1; i < pts.length; i++) line(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], a);
      };

      // 左侧长发：外缘从头宽收到发梢
      poly([[168, 52], [176, 80], [184, 118], [190, 150], [195, 176]], 0.46);
      // 内缘同时是脸的左轮廓：额头窄、颧骨最宽、收到下巴
      poly([[212, 52], [202, 78], [193, 100], [191, 118], [194, 140], [204, 158], [216, 168], [227, 171]], 0.44);
      // 右侧长发
      poly([[280, 52], [276, 80], [271, 118], [265, 150], [259, 176]], 0.46);
      poly([[244, 52], [254, 78], [263, 100], [265, 118], [262, 140], [252, 158], [240, 168], [227, 171]], 0.44);
      // 头发里几笔发丝，顺着往下走
      line(176, 62, 188, 150, 0.28);
      line(184, 58, 194, 148, 0.26);
      line(272, 62, 262, 150, 0.28);
      line(264, 58, 254, 148, 0.26);
      // 排线：头发是整块黑的，光画轮廓会像两根辫子。这里用细密斜线把它压成灰块，
      // 玩家要涂就顺着这些线涂。
      for (let i = 0; i <= 9; i++) {
        line(171 + i * 4.1, 54, 193 + i * 1.2, 174, 0.24);
      }
      for (let i = 0; i <= 9; i++) {
        line(277 - i * 3.6, 54, 263 - i * 1.2, 174, 0.24);
      }
      // 额头上的缝合线：两道横的，配两针竖的
      poly([[216, 90], [243, 94]], 0.4);
      poly([[215, 98], [244, 102]], 0.38);
      line(224, 90, 224, 98, 0.32);
      line(234, 93, 234, 101, 0.32);
      // 眼睛：大眼，圆一点才像漫画
      ovalChalk(g, 206, 117, 9.5, 9.5, { w: 2, alpha: 0.46, grain: 0.2, skip: 0.05 });
      ovalChalk(g, 244, 117, 9.5, 9.5, { w: 2, alpha: 0.46, grain: 0.2, skip: 0.05 });
      ringChalk(g, 206, 118, 4, { w: 2, alpha: 0.54, grain: 0.14, skip: 0.04 });
      ringChalk(g, 244, 118, 4, { w: 2, alpha: 0.54, grain: 0.14, skip: 0.04 });
      // 上眼睑压重一点，眼神才立得住
      chalk(g, 197, 112, 206, 109, { w: 3, alpha: 0.5, grain: 0.2 });
      chalk(g, 206, 109, 215, 112, { w: 3, alpha: 0.5, grain: 0.2 });
      chalk(g, 235, 112, 244, 109, { w: 3, alpha: 0.5, grain: 0.2 });
      chalk(g, 244, 109, 253, 112, { w: 3, alpha: 0.5, grain: 0.2 });
      // 下睫毛
      line(201, 125, 200, 129, 0.34);
      line(210, 125, 211, 129, 0.34);
      line(240, 125, 239, 129, 0.34);
      line(249, 125, 250, 129, 0.34);
      // 张开的嘴：上唇一道平线，下唇兜成半圆，中间一条牙齿线
      poly([[216, 140], [227, 139], [238, 140]], 0.42);
      poly([[216, 140], [218, 152], [227, 158], [236, 152], [238, 140]], 0.42);
      line(218, 146, 236, 146, 0.34);
      // 下巴下面一点脖子
      line(219, 170, 219, 176, 0.4);
      line(235, 170, 235, 176, 0.4);
      // 右上角一个小太阳
      ringChalk(g, 356, 78, 10, { w: 2, alpha: 0.4, grain: 0.26, skip: 0.16 });
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        line(356 + Math.cos(a) * 15, 78 + Math.sin(a) * 15,
          356 + Math.cos(a) * 21, 78 + Math.sin(a) * 21, 0.36);
      }
    });

    // 装饰：三个小圈 + 十字，标出「图案放这儿」。这一层比别处亮一点——
    // 它落在最下面那条带上，不亮一点会被地平线和边框压掉
    out.deco = mk((g) => {
      for (const x of [90, 224, 358]) {
        const y = 208;
        ringChalk(g, x, y, 12, { w: 2, alpha: 0.52, grain: 0.3, skip: 0.3 });
        chalk(g, x - 4, y, x + 4, y, { w: 1, alpha: 0.46, grain: 0.28 });
        chalk(g, x, y - 4, x, y + 4, { w: 1, alpha: 0.46, grain: 0.28 });
      }
    });

    return out;
  }

  /** 木框 + 墙面 + 粉笔槽。板面位置留空，由调用方把 felt 贴上去。 */
  function makeFrame() {
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const g = c.getContext("2d");

    // 墙（比教室背景略暗一档，因为镜头推近了，光没那么散）
    g.fillStyle = "#d8c6ad";
    g.fillRect(0, 0, W, H);
    g.fillStyle = "rgba(0,0,0,.05)";
    for (let y = 0; y < H; y += 4) g.fillRect(0, y, W, 1);

    // 框：外深内浅，做出厚度
    g.fillStyle = "#5b4438";
    g.fillRect(FRAME.x, FRAME.y, FRAME.w, FRAME.h);
    g.fillStyle = "#6f5447";
    g.fillRect(FRAME.x + 2, FRAME.y + 2, FRAME.w - 4, FRAME.h - 4);
    g.fillStyle = "#8a6a58";
    g.fillRect(FRAME.x + 2, FRAME.y + 2, FRAME.w - 4, 3);
    g.fillRect(FRAME.x + 2, FRAME.y + 2, 3, FRAME.h - 4);

    // 内沿阴影：板面比框低一点
    g.fillStyle = "rgba(0,0,0,.28)";
    g.fillRect(INNER.x - 2, INNER.y - 2, INNER.w + 4, 3);
    g.fillRect(INNER.x - 2, INNER.y - 2, 3, INNER.h + 4);
    g.fillStyle = "rgba(0,0,0,.10)";
    g.fillRect(INNER.x - 2, INNER.y + INNER.h - 1, INNER.w + 4, 3);

    // 粉笔槽
    g.fillStyle = "#4d3a31";
    g.fillRect(FRAME.x + 4, FRAME.y + FRAME.h - 12, FRAME.w - 8, 10);
    g.fillStyle = "#6f5447";
    g.fillRect(FRAME.x + 4, FRAME.y + FRAME.h - 12, FRAME.w - 8, 3);
    // 槽里两支粉笔
    g.fillStyle = "#f4ecdd";
    g.fillRect(FRAME.x + 40, FRAME.y + FRAME.h - 9, 14, 3);
    g.fillStyle = "#f6db9e";
    g.fillRect(FRAME.x + 66, FRAME.y + FRAME.h - 9, 11, 3);

    return c;
  }

  /** 一层很淡的反光，压在最上面，让板面像块真的板。 */
  function makeGlass() {
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const g = c.getContext("2d");
    const grad = g.createLinearGradient(INNER.x, INNER.y, INNER.x + INNER.w, INNER.y + INNER.h);
    grad.addColorStop(0, "rgba(255,255,255,.055)");
    grad.addColorStop(0.42, "rgba(255,255,255,.012)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(INNER.x, INNER.y, INNER.w, INNER.h);
    return c;
  }

  // ---------------------------------------------------------------- 粉笔

  /**
   * 一段粉笔线。
   *
   * 沿线段每 0.6px 落一个点，18% 的点直接丢掉（干），宽度每 8 个点重新抖一次
   * （粉笔头磨得不圆），落点带 ±0.45px 的横向抖动（手）。少了这三件事，
   * 画出来就是画图软件的笔，不是粉笔。
   */
  function chalk(g, x0, y0, x1, y1, opt) {
    const w = opt.w || 2;
    const alpha = opt.alpha == null ? 0.82 : opt.alpha;
    const grain = opt.grain == null ? 0.18 : opt.grain;
    const color = opt.color || "#f4ecdd";
    const dx = x1 - x0, dy = y1 - y0;
    const len = Math.hypot(dx, dy);
    const steps = Math.max(1, Math.ceil(len / 0.6));
    const nx = len ? -dy / len : 0, ny = len ? dx / len : 0;
    let ww = w;
    g.fillStyle = color;
    for (let i = 0; i <= steps; i++) {
      if (Math.random() < grain) continue;
      if (i % 8 === 0) ww = Math.max(1, w + (Math.random() - 0.5) * 0.9);
      const t = steps ? i / steps : 0;
      const j = (Math.random() - 0.5) * 0.9;
      const px = x0 + dx * t + nx * j;
      const py = y0 + dy * t + ny * j;
      const s = Math.max(1, Math.round(ww));
      g.globalAlpha = alpha * (0.72 + Math.random() * 0.28);
      g.fillRect(Math.round(px - s / 2), Math.round(py - s / 2), s, s);
    }
    g.globalAlpha = 1;
  }

  /** 折线：逐段喂给 chalk。 */
  function chalkPath(g, pts, opt) {
    for (let i = 1; i < pts.length; i++) {
      chalk(g, pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], opt);
    }
  }

  /** 橡皮：只作用在玩家层，用 destination-out 挖，不碰底色。 */
  function erase(g, x0, y0, x1, y1, r) {
    const dx = x1 - x0, dy = y1 - y0;
    const len = Math.hypot(dx, dy);
    const steps = Math.max(1, Math.ceil(len / 1.2));
    g.save();
    g.globalCompositeOperation = "destination-out";
    g.fillStyle = "#000";
    for (let i = 0; i <= steps; i++) {
      const t = steps ? i / steps : 0;
      const x = x0 + dx * t, y = y0 + dy * t;
      g.globalAlpha = 0.9;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
    }
    g.restore();
  }

  /** 把一段文字按像素重绘成粉笔：先量字形，再逐像素落点。 */
  function chalkText(g, text, x, y, size, opt) {
    const pad = 4;
    const tmp = document.createElement("canvas");
    const tg = tmp.getContext("2d");
    tg.font = `bold ${size}px "Microsoft YaHei","PingFang SC",sans-serif`;
    const m = tg.measureText(text);
    const tw = Math.ceil(m.width) + pad * 2;
    const th = Math.ceil(size * 1.5);
    tmp.width = tw;
    tmp.height = th;
    const t2 = tmp.getContext("2d");
    t2.font = `bold ${size}px "Microsoft YaHei","PingFang SC",sans-serif`;
    t2.textBaseline = "middle";
    t2.fillStyle = "#fff";
    t2.fillText(text, pad, th / 2);

    const data = t2.getImageData(0, 0, tw, th).data;
    g.fillStyle = opt.color || "#f4ecdd";
    const alpha = opt.alpha == null ? 0.92 : opt.alpha;
    for (let yy = 0; yy < th; yy++) {
      for (let xx = 0; xx < tw; xx++) {
        const a = data[(yy * tw + xx) * 4 + 3];
        if (a < 96) continue;
        if (Math.random() < 0.05) continue;
        g.globalAlpha = alpha * (0.86 + Math.random() * 0.14);
        g.fillRect(x + xx - pad, y + yy - th / 2, 1, 1);
      }
    }
    g.globalAlpha = 1;
    return { w: tw - pad * 2, h: th };
  }

  // ---------------------------------------------------------------- 板

  function createBoard(canvas) {
    const screen = canvas.getContext("2d");
    screen.imageSmoothingEnabled = false;

    const felt = makeFelt();
    const frameArt = makeFrame();
    const glass = makeGlass();
    const ghostArt = makeGhost();

    // 主图如果带了一张现成的画稿（ghost-art.js 里的 GhostMain），就用它盖掉手绘那层。
    // 手绘那套留着兜底——画稿没加载上也不至于开天窗。
    // 加载完先烘到离屏 canvas：每帧从 Image 直接 drawImage 会让 Chrome 反复解码，
    // 长时间跑会把页面跑崩（自检里就崩过一次）。
    // 画稿正好铺满主图区（16..432 × 48..176）的正中一块正方形：
    // 这样主图区一画完，整幅画一起淡掉，不会有一绺头发拖到装饰区里去。
    const GHOST_PIC = { x: 160, y: 48, w: 128, h: 128 };
    const pic = document.createElement("canvas");
    pic.width = GHOST_PIC.w;
    pic.height = GHOST_PIC.h;
    let picReady = false;
    // 画稿里「有粉笔」的格子，2px 一格。她给主图帮忙就是照这张表填色，
    // 不是另起一笔去画——按设计文档说的「像素级填色」。
    let picCells = null;
    function bakeCells() {
      const S = 2;
      const d = pic.getContext("2d").getImageData(0, 0, GHOST_PIC.w, GHOST_PIC.h).data;
      const cols = Math.ceil(GHOST_PIC.w / S);
      const rows = Math.ceil(GHOST_PIC.h / S);
      const cells = [];
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          let sum = 0, n = 0;
          const y1 = Math.min(GHOST_PIC.h, gy * S + S);
          const x1 = Math.min(GHOST_PIC.w, gx * S + S);
          for (let y = gy * S; y < y1; y++) {
            for (let x = gx * S; x < x1; x++) { sum += d[(y * GHOST_PIC.w + x) * 4 + 3]; n++; }
          }
          if (n && sum / n >= 110) {
            cells.push([GHOST_PIC.x + gx * S + S / 2, GHOST_PIC.y + gy * S + S / 2]);
          }
        }
      }
      return cells;
    }
    (function () {
      const src = global.ACT2 && global.ACT2.GhostMain;
      if (!src) return;
      const im = new Image();
      im.onload = () => {
        const pc = pic.getContext("2d");
        pc.drawImage(im, 0, 0, GHOST_PIC.w, GHOST_PIC.h);
        picReady = true;
        try { picCells = bakeCells(); } catch (e) { picCells = null; }
      };
      im.src = src;
    })();

    // 底稿的「隐约」程度：四层各乘一个 0→1 的淡出系数。
    // 0.24 是试出来的——再亮就像玩家已经画过了，再暗在深绿上几乎看不见。
    const GHOST_ALPHA = 0.24;
    const GHOST_KEYS = ["frame", "main", "title", "deco"];
    let ghostOn = true;
    const ghostFade = { title: 1, frame: 1, main: 1, deco: 1 };
    const ghostTarget = { title: 1, frame: 1, main: 1, deco: 1 };
    let ghostCheck = 0;
    let ghostLast = 0;

    const layers = { deco: mkLayer(), player: mkLayer(), preview: mkLayer(), assist: mkLayer() };
    const dg = layers.deco.getContext("2d");
    const pg = layers.player.getContext("2d");
    const vg = layers.preview.getContext("2d");
    const ag = layers.assist.getContext("2d");

    // 板面上的图案对象。它们是「东西」不是像素：可以拖、可以挪、可以整个擦掉。
    // { uid, pid, x, y, scale, color, reveal, fixed }  x/y 是中心点
    const decos = [];
    let nextUid = 1;

    const st = {
      tool: "pen",
      color: COLORS[0].hex,
      colorIndex: 0,
      width: 2,
      pattern: PATTERN_LIST.length ? PATTERN_LIST[0].id : null,
      sel: null,         // 选中的图案 uid（选中才能拖、能微调）
      chars: 0,          // 标题区里由文字工具落下的字数
      span: 0,           // 单笔最大跨度，用来挡「用点凑覆盖率」
      ghost: true,       // 底稿显示中
      locked: false,
      dirty: true
    };

    let cur = null;            // 当前笔画
    let drag = null;           // 正在拖的图案 { d, ox, oy, moved }
    let inkCache = null;       // 玩家层的墨迹位图，笔画结束才失效
    let assistCache = null;
    const history = [];
    const redoStack = [];
    let busy = false;

    const listeners = { change: [], region: [], undo: [] };
    const emit = (k, v) => listeners[k].forEach((fn) => fn(v));

    // ------------------------------------------------------------ 历史

    function snapshot() {
      return {
        p: layers.player.toDataURL(),
        a: layers.assist.toDataURL(),
        d: decos.map((d) => ({
          uid: d.uid, pid: d.pid, x: d.x, y: d.y,
          scale: d.scale, color: d.color, reveal: d.reveal, fixed: !!d.fixed
        }))
      };
    }

    function pushHistory() {
      if (busy) return;
      history.push(snapshot());
      if (history.length > 30) history.shift();
      redoStack.length = 0;
    }

    function loadInto(layer, url) {
      return new Promise((res) => {
        const im = new Image();
        im.onload = () => {
          const g = layer.getContext("2d");
          g.clearRect(0, 0, BW, BH);
          g.drawImage(im, 0, 0);
          res();
        };
        im.src = url;
      });
    }

    async function restore(snap) {
      busy = true;
      await Promise.all([loadInto(layers.player, snap.p), loadInto(layers.assist, snap.a)]);
      drag = null;              // 撤销时手上可能正拖着一个已经不存在的图案
      decos.length = 0;
      (snap.d || []).forEach((d) => {
        decos.push({ ...d });
        if (d.uid >= nextUid) nextUid = d.uid + 1;
      });
      if (!decos.some((d) => d.uid === st.sel)) st.sel = null;
      redrawDeco();
      busy = false;
      invalidate();
    }

    async function undo() {
      if (!history.length || busy) return false;
      emit("undo", null);
      redoStack.push(snapshot());
      await restore(history.pop());
      return true;
    }

    async function redo() {
      if (!redoStack.length || busy) return false;
      emit("undo", null);
      history.push(snapshot());
      await restore(redoStack.pop());
      return true;
    }

    // ------------------------------------------------------------ 墨迹统计

    function invalidate() {
      inkCache = null;
      assistCache = null;
      st.dirty = true;
      emit("change", st);
    }

    /** 全部墨迹：玩家 + 她 + 图案。她靠这个避开已经占掉的地方。 */
    function inkMap() {
      if (inkCache) return inkCache;
      const p = pg.getImageData(0, 0, BW, BH).data;
      const a = ag.getImageData(0, 0, BW, BH).data;
      const c = dg.getImageData(0, 0, BW, BH).data;
      const map = new Uint8Array(BW * BH);
      for (let i = 0; i < map.length; i++) {
        map[i] = (p[i * 4 + 3] > 8 || a[i * 4 + 3] > 8 || c[i * 4 + 3] > 8) ? 1 : 0;
      }
      inkCache = map;
      return map;
    }

    /** 只看玩家自己的笔迹——她落笔前要靠这个避开人家画过的地方。 */
    function playerInk() {
      if (assistCache) return assistCache;
      const p = pg.getImageData(0, 0, BW, BH).data;
      const map = new Uint8Array(BW * BH);
      for (let i = 0; i < map.length; i++) map[i] = p[i * 4 + 3] > 8 ? 1 : 0;
      assistCache = map;
      return map;
    }

    function coverOf(map, r) {
      let n = 0;
      const x1 = Math.min(BW, r.x + r.w), y1 = Math.min(BH, r.y + r.h);
      for (let y = Math.max(0, r.y); y < y1; y++) {
        const row = y * BW;
        for (let x = Math.max(0, r.x); x < x1; x++) n += map[row + x];
      }
      return n / (r.w * r.h);
    }

    /** 某条边：沿边长度上，有多少条「线」在环带里沾过墨。 */
    function edgeCoverage(map, e) {
      let hit = 0, total = 0;
      if (e.axis === "x") {
        for (let x = e.x; x < e.x + e.w; x++) {
          total++;
          for (let y = e.y; y < e.y + e.h; y++) {
            if (map[y * BW + x]) { hit++; break; }
          }
        }
      } else {
        for (let y = e.y; y < e.y + e.h; y++) {
          total++;
          for (let x = e.x; x < e.x + e.w; x++) {
            if (map[y * BW + x]) { hit++; break; }
          }
        }
      }
      return total ? hit / total : 0;
    }

    function regions() {
      const map = inkMap();
      const titleCover = coverOf(map, REGION.title);
      const mainCover = coverOf(map, REGION.main);
      const decoCover = coverOf(map, REGION.deco);
      const edges = {};
      for (const k in EDGES) edges[k] = edgeCoverage(map, EDGES[k]);

      const title = {
        done: titleCover >= NEED.titleCover && st.chars >= NEED.titleChars,
        cover: titleCover,
        chars: st.chars
      };
      const main = {
        done: mainCover >= NEED.mainCover && st.span >= NEED.mainSpan,
        cover: mainCover,
        span: st.span
      };
      const frame = {
        done: Object.values(edges).every((v) => v >= NEED.edge),
        edges
      };
      // 装饰区数的是「摆进去的图案」，不是像素覆盖率：一张图放在角上就够，
      // 不需要把 64px 高的带子涂满（那会把整块板画成草地）。
      const inBand = decos.filter((d) => inDecoZone(d.x, d.y));
      const deco = {
        done: inBand.length >= NEED.decoStamps,
        stamps: inBand.length,
        total: decos.length,
        cover: decoCover
      };

      return { title, main, frame, deco };
    }

    function allDone() {
      const r = regions();
      return r.title.done && r.main.done && r.frame.done && r.deco.done;
    }

    // ------------------------------------------------------------ 落笔

    function beginStroke(x, y) {
      if (st.locked || busy) return;
      pushHistory();
      cur = { x0: x, y0: y, x1: x, y1: y, last: [x, y], maxSpan: 0 };
      if (st.tool === "pen" || st.tool === "erase") apply(x, y, x, y);
    }

    function apply(x0, y0, x1, y1) {
      if (st.tool === "erase") {
        const r = 3 + st.width * 1.5;
        erase(pg, x0, y0, x1, y1, r);
        // 图案是对象不是像素：橡皮碰到它，它整个消失（不然玩家会发现擦不动）
        let hit = false;
        for (let i = decos.length - 1; i >= 0; i--) {
          const d = decos[i];
          const half = decoHalf(d);
          if (segRect(x0, y0, x1, y1, r, d.x - half, d.y - half, half * 2, half * 2)) {
            decos.splice(i, 1);
            if (st.sel === d.uid) st.sel = null;
            hit = true;
          }
        }
        if (hit) redrawDeco();
        return;
      }
      chalk(pg, x0, y0, x1, y1, { w: st.width, color: st.color });
    }

    /** 线段扫过某个矩形没有（橡皮和图案的碰撞，采样够用）。 */
    function segRect(x0, y0, x1, y1, r, rx, ry, rw, rh) {
      const len = Math.hypot(x1 - x0, y1 - y0);
      const steps = Math.max(1, Math.ceil(len / 3));
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t;
        if (x >= rx - r && x <= rx + rw + r && y >= ry - r && y <= ry + rh + r) return true;
      }
      return false;
    }

    function down(x, y) {
      if (st.locked || busy) return;
      if (x < 0 || y < 0 || x > BW || y > BH) return;
      if (st.tool === "stamp") {
        const hit = pickDeco(x, y);
        if (hit) {
          // 点到已经放下的图案 = 抓住它。可以挪，也可以挪回去——这就是「修正」的入口。
          // 先不记历史：只是点一下选中，不该在撤销栈里留一格空的
          st.sel = hit.uid;
          drag = { d: hit, ox: x - hit.x, oy: y - hit.y, moved: false };
          redrawDeco();          // 从底图上拿掉，改画在预览层，拖动时才跟手
          paintDrag();
        } else {
          placePattern(x, y);
        }
        return;
      }
      if (st.tool === "text") return; // 由 scene 接管输入框
      beginStroke(x, y);
    }

    function move(x, y) {
      if (drag) {
        if (!drag.moved) { drag.moved = true; pushHistory(); }
        drag.d.x = x - drag.ox;
        drag.d.y = y - drag.oy;
        paintDrag();
        return;
      }
      if (!cur || st.locked) return;
      if (st.tool === "pen" || st.tool === "erase") {
        apply(cur.last[0], cur.last[1], x, y);
        cur.last = [x, y];
      }
      cur.x1 = x;
      cur.y1 = y;
      const span = Math.hypot(x - cur.x0, y - cur.y0);
      if (span > cur.maxSpan) cur.maxSpan = span;

      if (st.tool === "line" || st.tool === "rect") {
        vg.clearRect(0, 0, BW, BH);
        if (st.tool === "line") {
          chalkPath(vg, [[cur.x0, cur.y0], [x, y]], { w: st.width, color: st.color, alpha: 0.55 });
        } else {
          const r = rectPts(cur.x0, cur.y0, x, y);
          chalkPath(vg, r, { w: st.width, color: st.color, alpha: 0.55 });
        }
      }
    }

    function up() {
      if (drag) {
        const d = drag.d;
        drag = null;
        const half = decoHalf(d);
        d.x = Math.round(clamp(d.x, half, BW - half));
        d.y = Math.round(clamp(d.y, half, BH - half));
        vg.clearRect(0, 0, BW, BH);
        redrawDeco();
        invalidate();
        emit("region", regions());
        return;
      }
      if (!cur) return;
      const c = cur;
      cur = null;
      vg.clearRect(0, 0, BW, BH);
      if (st.tool === "line") {
        chalkPath(pg, [[c.x0, c.y0], [c.x1, c.y1]], { w: st.width, color: st.color });
      } else if (st.tool === "rect") {
        chalkPath(pg, rectPts(c.x0, c.y0, c.x1, c.y1), { w: st.width, color: st.color });
      }
      st.span = Math.max(st.span, Math.round(c.maxSpan));
      invalidate();
      emit("region", regions());
    }

    function rectPts(x0, y0, x1, y1) {
      return [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
    }

    // ------------------------------------------------------------ 图案对象

    /** 图案的半宽（都是正方形），落点和碰撞都用它。 */
    function decoHalf(d) {
      const pat = PAT.BY_ID[d.pid];
      return pat ? (pat.size * d.scale) / 2 : 8;
    }

    /** 图案烘成位图，按「图案 + 颜色 + 倍数」缓存：颗粒是随机的，烘一次才不会每帧闪。 */
    const artCache = new Map();
    function patternArt(pid, color, scale) {
      const key = pid + "|" + color + "|" + scale;
      let c = artCache.get(key);
      if (c) return c;
      const pat = PAT.BY_ID[pid];
      if (!pat) return null;
      c = document.createElement("canvas");
      c.width = pat.size * scale;
      c.height = pat.size * scale;
      PAT.draw(c.getContext("2d"), pat, 0, 0, color, scale, { alpha: 0.92, grain: 0.1 });
      artCache.set(key, c);
      return c;
    }

    function blitDeco(g, d, alpha) {
      const art = patternArt(d.pid, d.color, d.scale);
      if (!art) return;
      const w = art.width;
      const x = Math.round(d.x - w / 2);
      const y = Math.round(d.y - w / 2);
      const rev = d.reveal == null ? 1 : d.reveal;
      if (rev <= 0) return;
      g.save();
      if (alpha != null) g.globalAlpha = alpha;
      if (rev < 1) {
        // 她「画」一个图案时是从上往下上粉笔，不是凭空出现
        g.beginPath();
        g.rect(x, y, w, Math.max(1, w * rev));
        g.clip();
      }
      g.drawImage(art, x, y);
      g.restore();
    }

    function redrawDeco() {
      dg.clearRect(0, 0, BW, BH);
      for (const d of decos) {
        if (drag && drag.d === d) continue;
        blitDeco(dg, d);
      }
    }

    /** 选中框：虚线 + 四个角点，告诉玩家这东西能抓。 */
    function selBox(g, x, y, w, alpha) {
      g.save();
      g.globalAlpha = alpha == null ? 0.9 : alpha;
      g.strokeStyle = "#ffd9a0";
      g.fillStyle = "#ffd9a0";
      g.lineWidth = 1;
      g.setLineDash([3, 3]);
      g.strokeRect(x - 2.5, y - 2.5, w + 5, w + 5);
      g.setLineDash([]);
      [[x - 2, y - 2], [x + w + 1, y - 2], [x - 2, y + w + 1], [x + w + 1, y + w + 1]]
        .forEach(([cx, cy]) => g.fillRect(cx, cy, 2, 2));
      g.restore();
    }

    function pickDeco(x, y) {
      for (let i = decos.length - 1; i >= 0; i--) {
        const d = decos[i];
        const half = decoHalf(d) + 3;
        if (Math.abs(x - d.x) <= half && Math.abs(y - d.y) <= half) return d;
      }
      return null;
    }

    function findDeco(uid) {
      return decos.find((d) => d.uid === uid) || null;
    }

    /** 拖动中：图案画在预览层，跟手；底图上那个已经先拿掉了。 */
    function paintDrag() {
      vg.clearRect(0, 0, BW, BH);
      if (!drag) return;
      const d = drag.d;
      const w = decoHalf(d) * 2;
      blitDeco(vg, d, 0.95);
      selBox(vg, Math.round(d.x - w / 2), Math.round(d.y - w / 2), w, 0.95);
    }

    /** 鼠标停在板面上：淡淡地先给你看图案会落在哪。 */
    function hover(x, y) {
      if (st.locked || drag || cur || busy) return;
      vg.clearRect(0, 0, BW, BH);
      if (st.tool !== "stamp" || !st.pattern) return;
      if (x < 0 || y < 0 || x > BW || y > BH) return;
      const pat = PAT.BY_ID[st.pattern];
      if (!pat) return;
      const scale = pat.scale || PAT_SCALE;
      const half = (pat.size * scale) / 2;
      const ghost = {
        pid: st.pattern,
        x: clamp(x, half, BW - half),
        y: clamp(y, half, BH - half),
        scale,
        color: st.color,
        reveal: 1
      };
      blitDeco(vg, ghost, 0.38);
      selBox(vg, Math.round(ghost.x - half), Math.round(ghost.y - half), half * 2, 0.4);
    }

    function placePattern(x, y) {
      const pid = st.pattern;
      const pat = PAT.BY_ID[pid];
      if (!pat) return null;
      const scale = pat.scale || PAT_SCALE;
      const half = (pat.size * scale) / 2;
      pushHistory();
      const d = {
        uid: nextUid++,
        pid,
        x: Math.round(clamp(x, half, BW - half)),
        y: Math.round(clamp(y, half, BH - half)),
        scale,
        color: st.color,
        reveal: 1,
        fixed: false
      };
      decos.push(d);
      st.sel = d.uid;
      redrawDeco();
      vg.clearRect(0, 0, BW, BH);
      invalidate();
      emit("region", regions());
      return d;
    }

    function moveDeco(uid, x, y) {
      const d = findDeco(uid);
      if (!d) return false;
      const half = decoHalf(d);
      d.x = Math.round(clamp(x, half, BW - half));
      d.y = Math.round(clamp(y, half, BH - half));
      redrawDeco();
      return true;
    }

    function setReveal(uid, k) {
      const d = findDeco(uid);
      if (!d) return;
      d.reveal = clamp(k, 0, 1);
      redrawDeco();
    }

    function removeDeco(uid) {
      const i = decos.findIndex((d) => d.uid === uid);
      if (i < 0) return false;
      decos.splice(i, 1);
      if (st.sel === uid) st.sel = null;
      redrawDeco();
      invalidate();
      emit("region", regions());
      return true;
    }

    /** 方向键微调选中的图案——只歪一两像素的时候不用重新拖。 */
    function nudgeSelected(dx, dy) {
      const d = findDeco(st.sel);
      if (!d) return false;
      pushHistory();
      moveDeco(d.uid, d.x + dx, d.y + dy);
      invalidate();
      emit("region", regions());
      return true;
    }

    function removeSelected() {
      return st.sel == null ? false : removeDeco(st.sel);
    }

    function inDecoZone(x, y) {
      const d = REGION.deco;
      if (y >= d.y - 8) return true;
      // 四角也算装饰：玩家的直觉是把花放在角上
      const near = 44;
      const inX = x < near || x > BW - near;
      const inY = y < near || y > BH - near;
      return inX && inY;
    }

    /** 文字工具：由 scene 提供输入框，确认后调用。 */
    function commitText(text, x, y, size) {
      const clean = String(text || "").trim().slice(0, 12);
      if (!clean || st.locked) return false;
      pushHistory();
      const box = chalkText(pg, clean, x, y, size || 16, { color: st.color });
      const t = REGION.title;
      const cy = y;
      if (cy > t.y - 8 && cy < t.y + t.h + 8) st.chars += clean.length;
      invalidate();
      emit("region", regions());
      return box;
    }

    // ------------------------------------------------------------ 渲染

    /** 每 150ms 重新看一遍哪个区已经达标；达标的那张底稿淡出，不用玩家自己关。 */
    function updateGhostTargets(now) {
      if (now - ghostCheck < 150) return;
      ghostCheck = now;
      const r = regions();
      ghostTarget.title = r.title.done ? 0 : 1;
      ghostTarget.frame = r.frame.done ? 0 : 1;
      ghostTarget.main = r.main.done ? 0 : 1;
      ghostTarget.deco = r.deco.done ? 0 : 1;
    }

    function render(g) {
      const now = performance.now();
      const dt = Math.min(0.06, ghostLast ? (now - ghostLast) / 1000 : 0.016);
      ghostLast = now;

      g.drawImage(frameArt, 0, 0);
      g.drawImage(felt, INNER.x, INNER.y);

      if (ghostOn) {
        updateGhostTargets(now);
        g.save();
        for (const k of GHOST_KEYS) {
          const t = ghostTarget[k];
          if (ghostFade[k] !== t) {
            ghostFade[k] += (t - ghostFade[k]) * Math.min(1, dt * 2.4);
            if (Math.abs(ghostFade[k] - t) < 0.01) ghostFade[k] = t;
          }
          if (ghostFade[k] <= 0.01) continue;
          g.globalAlpha = GHOST_ALPHA * ghostFade[k];
          if (k === "main" && picReady) {
            g.drawImage(pic, INNER.x + GHOST_PIC.x, INNER.y + GHOST_PIC.y);
          } else {
            g.drawImage(ghostArt[k], INNER.x, INNER.y);
          }
        }
        g.restore();
      }

      g.drawImage(layers.deco, INNER.x, INNER.y);
      // 她那层压在玩家下面：她填的色不能盖掉玩家描的白线
      g.drawImage(layers.assist, INNER.x, INNER.y);
      g.drawImage(layers.player, INNER.x, INNER.y);
      g.drawImage(layers.preview, INNER.x, INNER.y);
      g.drawImage(glass, 0, 0);
      // 选中框画在屏幕上而不是图层里：它不该被导出，也不该被橡皮碰到
      if (!st.locked && st.tool === "stamp" && !drag && st.sel != null) {
        const d = findDeco(st.sel);
        if (d) {
          const w = decoHalf(d) * 2;
          g.save();
          g.translate(INNER.x, INNER.y);
          selBox(g, Math.round(d.x - w / 2), Math.round(d.y - w / 2), w, 0.85);
          g.restore();
        }
      }
    }

    // ------------------------------------------------------------ 导出 / 存档

    /** opts.deco === false：只导出笔迹（存档用，图案另存为数据，免得存两份）。 */
    function toPNG(scale, opts) {
      const k = scale || 1;
      const withDeco = !opts || opts.deco !== false;
      const c = document.createElement("canvas");
      c.width = BW * k;
      c.height = BH * k;
      const g = c.getContext("2d");
      g.imageSmoothingEnabled = false;
      g.drawImage(felt, 0, 0, BW * k, BH * k);
      if (withDeco) g.drawImage(layers.deco, 0, 0, BW * k, BH * k);
      g.drawImage(layers.player, 0, 0, BW * k, BH * k);
      g.drawImage(layers.assist, 0, 0, BW * k, BH * k);
      // 1px 内描边：贴在教室的黑板上时不至于糊成一块绿
      g.strokeStyle = "rgba(0,0,0,.35)";
      g.lineWidth = Math.max(1, k);
      g.strokeRect(0.5, 0.5, BW * k - 1, BH * k - 1);
      return c.toDataURL("image/png");
    }

    const SAVE_KEY = "our-story-act2-board-v2";

    function save() {
      const png = toPNG(1, { deco: false });
      const payload = {
        v: 2,
        png: png.length < 2000000 ? png : "",
        decos: decos.map((d) => ({ pid: d.pid, x: d.x, y: d.y, scale: d.scale, color: d.color })),
        regions: { ...regions() },
        chars: st.chars,
        span: st.span,
        ts: Date.now()
      };
      try { localStorage.setItem(SAVE_KEY, JSON.stringify(payload)); } catch (e) { /* 存不下就算了 */ }
      return payload;
    }

    function restoreSave() {
      let data = null;
      try { data = JSON.parse(localStorage.getItem(SAVE_KEY) || "null"); } catch (e) { data = null; }
      if (!data || !data.png) return Promise.resolve(false);
      return new Promise((res) => {
        const im = new Image();
        im.onload = () => {
          // 整张 PNG 是「底 + 笔迹」，恢复时只能留笔迹：把底色挖掉再叠
          const tmp = document.createElement("canvas");
          tmp.width = BW; tmp.height = BH;
          const tg = tmp.getContext("2d");
          tg.drawImage(im, 0, 0);
          const d = tg.getImageData(0, 0, BW, BH);
          const src = d.data;
          // felt 是已知的，逐像素判断「和底色差得远」的算笔迹
          const feltData = felt.getContext("2d").getImageData(0, 0, BW, BH).data;
          for (let i = 0; i < src.length; i += 4) {
            const dr = Math.abs(src[i] - feltData[i]);
            const dg2 = Math.abs(src[i + 1] - feltData[i + 1]);
            const db = Math.abs(src[i + 2] - feltData[i + 2]);
            const near = dr + dg2 + db < 40;
            src[i + 3] = near ? 0 : 255;
          }
          tg.putImageData(d, 0, 0);
          pg.clearRect(0, 0, BW, BH);
          pg.drawImage(tmp, 0, 0);
          // 图案是对象，从数据里重建——存回来的图里本来就没烤它们
          decos.length = 0;
          (data.decos || []).forEach((q) => {
            if (!PAT.BY_ID[q.pid]) return;
            decos.push({
              uid: nextUid++, pid: q.pid, x: q.x, y: q.y,
              scale: q.scale || PAT_SCALE, color: q.color, reveal: 1, fixed: false
            });
          });
          st.sel = null;
          redrawDeco();
          st.chars = data.chars || 0;
          st.span = data.span || 0;
          invalidate();
          res(true);
        };
        im.onerror = () => res(false);
        im.src = data.png;
      });
    }

    function clearAll() {
      emit("undo", null);
      [layers.deco, layers.player, layers.assist, layers.preview].forEach((l) =>
        l.getContext("2d").clearRect(0, 0, BW, BH)
      );
      decos.length = 0;
      st.sel = null;
      drag = null;
      cur = null;
      history.length = 0;
      redoStack.length = 0;
      st.chars = 0; st.span = 0;
      // 新的一张：底稿立刻回到全亮，不用等它慢慢浮上来
      for (const k of GHOST_KEYS) { ghostFade[k] = 1; ghostTarget[k] = 1; }
      ghostCheck = 0;
      invalidate();
    }

    // ------------------------------------------------------------ 她的笔

    const assist = {
      ctx: ag,
      /** 玩家在这个点上画过没有（带半径） */
      playerNear(x, y, r) {
        const map = playerInk();
        const rr = r || 6;
        for (let yy = Math.max(0, y - rr); yy < Math.min(BH, y + rr); yy++) {
          for (let xx = Math.max(0, x - rr); xx < Math.min(BW, x + rr); xx++) {
            if (map[yy * BW + xx]) return true;
          }
        }
        return false;
      },
      /** 这个矩形里玩家笔迹占比 */
      playerDensity(r) {
        const map = playerInk();
        let n = 0;
        for (let yy = Math.max(0, r.y); yy < Math.min(BH, r.y + r.h); yy++) {
          for (let xx = Math.max(0, r.x); xx < Math.min(BW, r.x + r.w); xx++) {
            n += map[yy * BW + xx];
          }
        }
        return n / (r.w * r.h);
      },
      /** 这块地方有没有笔迹——包括她自己已经画过的，避免重复描同一条线。 */
      hasInk(r) {
        const map = inkMap();
        for (let yy = Math.max(0, r.y); yy < Math.min(BH, r.y + r.h); yy++) {
          for (let xx = Math.max(0, r.x); xx < Math.min(BW, r.x + r.w); xx++) {
            if (map[yy * BW + xx]) return true;
          }
        }
        return false;
      },
      line(pts, opt) {
        chalkPath(ag, pts, { w: (opt && opt.w) || 2, color: (opt && opt.color) || "#f4ecdd", alpha: (opt && opt.alpha) || 0.8 });
      },
      dot(x, y, opt) {
        chalk(ag, x, y, x + 0.1, y, { w: (opt && opt.w) || 2, color: (opt && opt.color) || "#f4ecdd", alpha: (opt && opt.alpha) || 0.8, grain: 0.05 });
      },
      snapshot: pushHistory,
      /** 她画完了：刷新统计 */
      settle() {
        invalidate();
        emit("region", regions());
      },
      count() {
        const d = ag.getImageData(0, 0, BW, BH).data;
        let n = 0;
        for (let i = 3; i < d.length; i += 4) if (d[i] > 8) n++;
        return n;
      },

      // ---- 图案：她也能放、能挪（这是「修正」那部分）
      /** 板面上现有的图案对象（只读） */
      decos() { return decos; },
      half: decoHalf,
      /** 她放一个图案：先 reveal=0，再一点点画出来 */
      placeDeco(pid, x, y, color) {
        const pat = PAT.BY_ID[pid];
        if (!pat) return null;
        const scale = pat.scale || PAT_SCALE;
        const half = (pat.size * scale) / 2;
        const d = {
          uid: nextUid++, pid,
          x: Math.round(clamp(x, half, BW - half)),
          y: Math.round(clamp(y, half, BH - half)),
          scale, color, reveal: 0, fixed: false
        };
        decos.push(d);
        redrawDeco();
        return d;
      },
      reveal(uid, k) { setReveal(uid, k); },
      move(uid, x, y) { return moveDeco(uid, x, y); },
      /** 板面上有没有她能动的东西（她只在玩家放歪/放挤了的时候才动手） */
      inZone(x, y) { return inDecoZone(x, y); }
    };

    const api = {
      W, H, INNER, FRAME, BW, BH, COLORS, REGION, EDGES, NEED,
      PATTERNS: PATTERN_LIST, PAT,
      layers, assist,
      down, move, up, hover,
      undo, redo,
      commitText,
      regions, allDone,
      render, toPNG, save, restoreSave, clearAll,
      playerInk, inkMap,
      decos: () => decos,
      placePattern, moveDeco, removeDeco, setReveal,
      nudgeSelected, removeSelected,
      state: st,
      setTool(t) { st.tool = t; st.sel = t === "stamp" ? st.sel : null; emit("change", st); },
      setColor(i) { st.colorIndex = i; st.color = COLORS[i].hex; emit("change", st); },
      setWidth(w) { st.width = w; emit("change", st); },
      setGhost(on) {
        ghostOn = !!on;
        st.ghost = ghostOn;
        emit("change", st);
      },
      /** 底稿状态：on / 各层淡出系数 / 各层目标。自检和调试用。 */
      ghostState() {
        return {
          on: ghostOn, alpha: GHOST_ALPHA, fade: { ...ghostFade }, target: { ...ghostTarget },
          pic: picReady ? { ...GHOST_PIC } : null
        };
      },
      /** 画稿在板面上的方框（板面坐标）。没加载上就是 null。 */
      ghostPic() { return picReady ? { ...GHOST_PIC } : null; },
      /**
       * 画稿里可以填色的格子（板面坐标，2px 一格，行优先）。
       * 她给主图帮忙就是照这张表一格一格涂，而不是画线。
       */
      ghostInk() { return picCells; },
      setPattern(pid) {
        st.pattern = pid;
        if (st.tool !== "stamp") st.tool = "stamp";
        emit("change", st);
      },
      lock(v) {
        st.locked = !!v;
        if (st.locked) { st.sel = null; drag = null; cur = null; }
      },
      on(k, fn) { if (listeners[k]) listeners[k].push(fn); },
      invalidate
    };
    return api;
  }

  global.ACT2 = global.ACT2 || {};
  global.ACT2.Board = { createBoard, COLORS, PATTERNS: PATTERN_LIST, REGION, INNER, FRAME, BW, BH, W, H, NEED };
})(window);
