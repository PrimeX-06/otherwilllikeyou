/* 第二幕 · 黑板报 — 预设图案
 *
 * 不是贴图，是「点阵小画」：每个图案用 16×16（角花 24×24）的网格画出来，
 * 用 2–3 个色调，落笔时再套一层粉笔颗粒。这样：
 *   - 尺寸小，放在 448 宽的板面上是个正经图案，不是一个小点；
 *   - 跟着玩家选的粉笔色走（主色调换成玩家当前颜色）；
 *   - 放大到 2 倍也不糊，因为它本来就是按格子画的。
 *
 * 每个图案提供 art(P)，P 是画格子的小工具（点/线/圆/椭圆/多边形/布尔形状）。
 * 角色：
 *   'm' 主色（玩家当前粉笔色）  'd' 暗调  'l' 亮调
 */
(function (global) {
  "use strict";

  /** 把「点一个像素」包成画图工具。坐标是图案内的格子坐标。 */
  function painter(plot, size) {
    const P = {
      size,
      dot(x, y, t) {
        const px = Math.round(x), py = Math.round(y);
        if (px < 0 || py < 0 || px >= size || py >= size) return;
        plot(px, py, t || "m");
      },
      line(x0, y0, x1, y1, t) {
        let ax = Math.round(x0), ay = Math.round(y0);
        const bx = Math.round(x1), by = Math.round(y1);
        const dx = Math.abs(bx - ax), dy = Math.abs(by - ay);
        const sx = ax < bx ? 1 : -1, sy = ay < by ? 1 : -1;
        let err = dx - dy;
        for (let guard = 0; guard < 200; guard++) {
          P.dot(ax, ay, t);
          if (ax === bx && ay === by) break;
          const e2 = err * 2;
          if (e2 > -dy) { err -= dy; ax += sx; }
          if (e2 < dx) { err += dx; ay += sy; }
        }
      },
      circle(cx, cy, r, t) {
        const r2 = r * r + r * 0.6;
        for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) {
          for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
            const dx = x + 0.5 - cx, dy = y + 0.5 - cy;
            if (dx * dx + dy * dy <= r2) P.dot(x, y, t);
          }
        }
      },
      ring(cx, cy, r, w, t) {
        for (let y = Math.floor(cy - r - w); y <= Math.ceil(cy + r + w); y++) {
          for (let x = Math.floor(cx - r - w); x <= Math.ceil(cx + r + w); x++) {
            const dx = x + 0.5 - cx, dy = y + 0.5 - cy;
            const d = Math.hypot(dx, dy);
            if (Math.abs(d - r) <= w / 2) P.dot(x, y, t);
          }
        }
      },
      ellipse(cx, cy, rx, ry, t) {
        for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
          for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
            const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry;
            if (dx * dx + dy * dy <= 1.08) P.dot(x, y, t);
          }
        }
      },
      /** 多边形填充：扫描线，够用就行 */
      poly(pts, t) {
        let minY = Infinity, maxY = -Infinity;
        for (const p of pts) { minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]); }
        for (let y = Math.floor(minY); y <= Math.ceil(maxY); y++) {
          const xs = [];
          for (let i = 0; i < pts.length; i++) {
            const a = pts[i], b = pts[(i + 1) % pts.length];
            if ((a[1] <= y && b[1] > y) || (b[1] <= y && a[1] > y)) {
              xs.push(a[0] + (y - a[1]) / (b[1] - a[1]) * (b[0] - a[0]));
            }
          }
          xs.sort((p, q) => p - q);
          for (let i = 0; i + 1 < xs.length; i += 2) {
            for (let x = Math.round(xs[i]); x <= Math.round(xs[i + 1]); x++) P.dot(x, y, t);
          }
        }
      },
      /** 布尔形状：fn(x,y) 为真就点一下 */
      shape(fn, t) {
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) if (fn(x + 0.5, y + 0.5)) P.dot(x, y, t);
        }
      }
    };
    return P;
  }

  const TAU = Math.PI * 2;

  const PATTERNS = [
    // ---------------------------------------------------------------- 花草
    {
      id: "flower", name: "小花", cat: "花草", size: 16,
      art(P) {
        // 五瓣要留缝：贴太紧就糊成一个白饼（第一版就是这样）
        for (let i = 0; i < 5; i++) {
          const a = -Math.PI / 2 + i * TAU / 5;
          P.circle(8 + Math.cos(a) * 4.5, 8 + Math.sin(a) * 4.5, 1.95, "m");
        }
        P.circle(8, 8, 1.7, "d");
      }
    },
    {
      id: "leaf", name: "叶子", cat: "花草", size: 16,
      art(P) {
        // 菱形叶：尖头比椭圆更像叶子
        P.poly([[8, 1.5], [12, 7.5], [8, 14.5], [4, 7.5]], "m");
        P.line(8, 3, 8, 14, "d");
        P.line(8, 6.5, 10.5, 8.5, "d");
        P.line(8, 10, 5.5, 11.5, "d");
      }
    },
    {
      id: "grass", name: "草", cat: "花草", size: 16,
      art(P) {
        P.line(5, 14, 3.6, 6, "m");
        P.line(8, 14, 8, 3, "m");
        P.line(11, 14, 12.4, 7, "m");
        P.line(8, 14, 4.6, 10, "d");
        P.line(8, 14, 11.4, 10, "d");
      }
    },
    {
      id: "vine", name: "小枝", cat: "花草", size: 24,
      art(P) {
        // 一根斜茎 + 四片交替的叶子，放在角上就是一簇
        P.line(3, 21, 20, 4, "m");
        const spots = [
          [6.5, 17.5, -1], [10, 14, 1], [13.5, 10.5, -1], [17, 7, 1]
        ];
        for (const [x, y, s] of spots) {
          P.poly([[x, y], [x + 3.6 * s, y - 2.6], [x + 1.1 * s, y + 1.3]], "m");
        }
        P.circle(20, 4, 1.6, "d");
      }
    },

    // ---------------------------------------------------------------- 天空
    {
      id: "sun", name: "太阳", cat: "天空", size: 16,
      art(P) {
        P.circle(8, 8, 3.9, "m");
        for (let i = 0; i < 8; i++) {
          const a = i * TAU / 8;
          P.line(8 + Math.cos(a) * 5.4, 8 + Math.sin(a) * 5.4,
            8 + Math.cos(a) * 7.3, 8 + Math.sin(a) * 7.3, "m");
        }
        P.circle(8, 8, 1.5, "l");
      }
    },
    {
      id: "cloud", name: "云", cat: "天空", size: 16,
      art(P) {
        P.circle(5.5, 9, 3.1, "m");
        P.circle(9.2, 7.4, 3.7, "m");
        P.circle(12.4, 9.4, 2.6, "m");
        P.line(3, 11, 14, 11, "m");
      }
    },
    {
      id: "star", name: "星星", cat: "天空", size: 16,
      art(P) {
        const pts = [];
        for (let i = 0; i < 10; i++) {
          const a = -Math.PI / 2 + i * Math.PI / 5;
          const r = i % 2 ? 2.9 : 7.1;
          pts.push([8 + Math.cos(a) * r, 8 + Math.sin(a) * r]);
        }
        P.poly(pts, "m");
        P.dot(8, 8, "l");
      }
    },
    {
      id: "moon", name: "月亮", cat: "天空", size: 16,
      art(P) {
        P.shape((x, y) => {
          const a = Math.hypot(x - 7.6, y - 8);
          const b = Math.hypot(x - 10.8, y - 6.2);
          return a <= 5.9 && b > 5.4;
        }, "m");
      }
    },
    {
      id: "snow", name: "雪花", cat: "天空", size: 16,
      art(P) {
        for (let i = 0; i < 3; i++) {
          const a = i * Math.PI / 3;
          P.line(8 - Math.cos(a) * 6.6, 8 - Math.sin(a) * 6.6,
            8 + Math.cos(a) * 6.6, 8 + Math.sin(a) * 6.6, "m");
        }
        for (let i = 0; i < 6; i++) {
          const a = i * Math.PI / 3;
          const x = 8 + Math.cos(a) * 4.2, y = 8 + Math.sin(a) * 4.2;
          P.line(x, y, x + Math.cos(a + 0.9) * 2.2, y + Math.sin(a + 0.9) * 2.2, "m");
          P.line(x, y, x + Math.cos(a - 0.9) * 2.2, y + Math.sin(a - 0.9) * 2.2, "m");
        }
      }
    },

    // ---------------------------------------------------------------- 校园
    {
      id: "book", name: "书本", cat: "校园", size: 16,
      art(P) {
        P.line(2, 5, 8, 6.4, "m");
        P.line(8, 6.4, 14, 5, "m");
        P.line(2, 5, 2, 11, "m");
        P.line(2, 11, 8, 12.6, "m");
        P.line(8, 12.6, 14, 11, "m");
        P.line(14, 11, 14, 5, "m");
        P.line(8, 6.4, 8, 12.6, "d");
        P.line(4, 7.6, 6.4, 8.2, "d");
        P.line(9.6, 8.2, 12, 7.6, "d");
      }
    },
    {
      id: "pencil", name: "铅笔", cat: "校园", size: 16,
      art(P) {
        P.line(4.4, 12.4, 10.6, 6.2, "m");
        P.line(5.6, 13.6, 11.8, 7.4, "m");
        P.line(4.4, 12.4, 5.6, 13.6, "m");
        P.line(10.6, 6.2, 13.6, 3.2, "d");
        P.line(11.8, 7.4, 14.8, 4.4, "d");
        P.line(13.6, 3.2, 14.8, 4.4, "d");
        P.line(4.4, 12.4, 2.6, 14.2, "l");
      }
    },
    {
      id: "ball", name: "篮球", cat: "校园", size: 16,
      art(P) {
        P.ring(8, 8, 6.2, 1.5, "m");
        P.line(2, 8, 14, 8, "m");
        P.line(8, 2, 8, 14, "m");
        P.shape((x, y) => {
          const a = Math.hypot(x - 8, y - 8);
          return Math.abs(a - 4.4) < 0.7 && Math.abs(x - 8) > 2.4 && Math.abs(y - 8) > 2.4;
        }, "d");
      }
    },
    {
      id: "flag", name: "小旗", cat: "校园", size: 16,
      art(P) {
        P.line(4, 2, 4, 14, "m");
        P.poly([[5, 3], [13.5, 6], [5, 9]], "m");
        P.line(2.6, 14, 5.4, 14, "d");
      }
    },
    {
      id: "note", name: "音符", cat: "校园", size: 16,
      art(P) {
        P.line(10, 3, 10, 11, "m");
        P.circle(8, 11.4, 2.2, "m");
        P.line(10, 3, 13.4, 4.6, "m");
        P.line(13.4, 4.6, 13.4, 7, "d");
      }
    },

    // ---------------------------------------------------------------- 装饰
    {
      id: "heart", name: "爱心", cat: "装饰", size: 16,
      art(P) {
        P.circle(5.6, 6, 2.9, "m");
        P.circle(10.4, 6, 2.9, "m");
        P.poly([[2.7, 6.8], [13.3, 6.8], [8, 13.4]], "m");
        P.dot(5, 5, "l");
      }
    },
    {
      id: "balloon", name: "气球", cat: "装饰", size: 16,
      art(P) {
        P.ellipse(8, 6.2, 3.9, 4.7, "m");
        P.line(8, 11, 7.2, 14.4, "d");
        P.dot(6, 4, "l");
      }
    },
    {
      id: "wave", name: "波浪", cat: "装饰", size: 16,
      art(P) {
        for (let x = 1; x < 15; x++) {
          P.dot(x, 8 + Math.sin((x - 1) * 0.86) * 2.6, "m");
        }
      }
    },
    {
      id: "dot3", name: "圆点", cat: "装饰", size: 16,
      art(P) {
        P.circle(3.5, 8, 1.6, "m");
        P.circle(8, 8, 1.6, "m");
        P.circle(12.5, 8, 1.6, "m");
      }
    }
  ];

  const BY_ID = {};
  PATTERNS.forEach((p) => { BY_ID[p.id] = p; });

  const CATS = [];
  PATTERNS.forEach((p) => { if (!CATS.includes(p.cat)) CATS.push(p.cat); });

  /** 主色调亮/暗，用来给图案做第二、第三层 */
  function shade(hex, k) {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    const f = (v) => Math.max(0, Math.min(255, Math.round(k > 0 ? v + (255 - v) * k : v * (1 + k))));
    return "#" + [f(r), f(g), f(b)].map((v) => v.toString(16).padStart(2, "0")).join("");
  }

  /**
   * 把一个图案画到 ctx 上。
   * 每个像素 8% 概率不落（干），alpha 抖一下（粉笔），所以图案和手画的笔迹是同一种颗粒。
   */
  function draw(ctx, pat, ox, oy, color, scale, opts) {
    const s = scale || 1;
    const alpha = (opts && opts.alpha) == null ? 0.9 : opts.alpha;
    const grain = (opts && opts.grain) == null ? 0.08 : opts.grain;
    const main = color || "#f4ecdd";
    const dark = shade(main, -0.34);
    const light = shade(main, 0.3);
    const plot = (x, y, t) => {
      if (Math.random() < grain) return;
      ctx.fillStyle = t === "d" ? dark : t === "l" ? light : main;
      ctx.globalAlpha = alpha * (0.74 + Math.random() * 0.26);
      ctx.fillRect(ox + x * s, oy + y * s, s, s);
    };
    pat.art(painter(plot, pat.size));
    ctx.globalAlpha = 1;
  }

  /** 图案在板面上的落点：传入中心点 */
  function drawCentered(ctx, pat, cx, cy, color, scale, opts) {
    const s = scale || 1;
    draw(ctx, pat, Math.round(cx - pat.size * s / 2), Math.round(cy - pat.size * s / 2), color, s, opts);
  }

  global.ACT2 = global.ACT2 || {};
  global.ACT2.Patterns = { PATTERNS, BY_ID, CATS, draw, drawCentered, shade };
})(window);
