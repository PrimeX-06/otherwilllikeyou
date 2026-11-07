/* 第三幕 · 校园日常 — 引擎
 *
 * 舞台 512×288，Canvas 画场景和人物，DOM 负责对白、目标、猜词面板。
 * 这一层只管「怎么画、怎么听键、怎么说话」，不知道任何具体小游戏。
 *
 * 和 act2/act3/act4 一样：普通 <script>、file:// 直接开、没有构建步骤。
 */
(function (global) {
  "use strict";

  const D = (global.DAILY = global.DAILY || {});

  D.W = 512;
  D.H = 288;

  // ---------------------------------------------------------------- 事件总线

  const bus = Object.create(null);
  D.on = function (k, fn) { (bus[k] || (bus[k] = [])).push(fn); };
  D.emit = function (k, payload) { (bus[k] || []).forEach((fn) => fn(payload)); };

  // ---------------------------------------------------------------- 存档
  // 只存「做过什么」，不存「她有多喜欢你」——设计稿第 12.4 节。
  const KEY = "our-story-act5-daily-v1";
  let store = {};
  try { store = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { store = {}; }
  D.store = store;
  D.persist = function (patch) {
    if (patch) Object.assign(store, patch);
    try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* 无痕模式 */ }
  };
  D.wipe = function () {
    store = {};
    D.store = store;
    try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
  };

  // ---------------------------------------------------------------- 资源

  D.img = Object.create(null);

  D.load = function (key, src) {
    return new Promise(function (resolve, reject) {
      const im = new Image();
      im.onload = function () { D.img[key] = im; resolve(im); };
      im.onerror = function () { reject(new Error("加载失败：" + src)); };
      im.src = src;
    });
  };

  D.loadAll = function (map) {
    return Promise.all(Object.keys(map).map((k) => D.load(k, map[k])));
  };

  // ---------------------------------------------------------------- 精灵

  const FW = 48, FH = 72;
  D.FRAME_W = FW;
  D.FRAME_H = FH;

  // 三人的 v2 精灵表保留原有前段帧位，新增剧情动作在末尾。
  // 闺蜜的侧面、背面与四向行走已替换原占位帧。
  D.FRAMES = {
    boy: {
      idleDown: [0, 1], idleLeft: [2, 2], idleRight: [3, 3], idleUp: [4, 4],
      walkDown: [5, 8], walkLeft: [9, 12], walkRight: [13, 16], walkUp: [17, 20]
    },
    girl: {
      idleDown: [0, 1], idleLeft: [2, 2], idleRight: [3, 3], idleUp: [4, 4],
      walkDown: [5, 8], walkLeft: [9, 12], walkRight: [13, 16], walkUp: [17, 20]
    },
    friend: {
      idleDown: [0, 8], idleLeft: [9, 9], idleRight: [10, 10], idleUp: [11, 11],
      walkRight: [12, 15], walkLeft: [16, 19], walkDown: [20, 23], walkUp: [24, 27]
    }
  };

  const IDLE_FPS = { boy: 3, girl: 3, friend: 7 };
  const WALK_FPS = { boy: 9, girl: 9, friend: 7 };

  /** 影子：一格椭圆，落在脚底，让角色不像贴在墙上。 */
  D.shadow = function (ctx, x, y, w) {
    ctx.save();
    ctx.globalAlpha = 0.26;
    ctx.fillStyle = "#1b1418";
    ctx.beginPath();
    ctx.ellipse(Math.round(x), Math.round(y), w * 0.42, 3.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  /** 画一个角色。x 是脚底中心，y 是脚底基线。 */
  D.drawActor = function (ctx, a, t) {
    const sheet = D.img[a.key];
    const F = D.FRAMES[a.key];
    if (!sheet || !F) return;

    let range, fps;
    if (a.moving) {
      range = a.dir > 0 ? F.walkRight : F.walkLeft;
      fps = WALK_FPS[a.key] || 8;
    } else {
      // 站着的时候一律正面——横版场景里，停下来就是转过来对着镜头
      range = F.idleDown;
      fps = IDLE_FPS[a.key] || 3;
    }
    const n = range[1] - range[0] + 1;
    const f = range[0] + (Math.floor(t * fps + (a.phase || 0)) % n);

    const s = a.scale == null ? 1 : a.scale;
    const w = FW * s, h = FH * s;
    const x = Math.round(a.x - w / 2);
    const y = Math.round(a.y - h);

    ctx.save();
    if (a.alpha != null) ctx.globalAlpha = a.alpha;
    ctx.drawImage(sheet, f * FW, 0, FW, FH, x, y, w, h);
    ctx.restore();
  };

  // ---------------------------------------------------------------- 输入

  D.keys = Object.create(null);
  const pressHandlers = [];

  function typing() {
    const el = document.activeElement;
    return !!el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
  }

  /** 单次按下（不是按住）。回调拿到原始 key。 */
  D.onPress = function (fn) { pressHandlers.push(fn); };

  // Tab 也要拦：线索本用它开关，不拦的话焦点会跑走，接着按空格就在点按钮了。
  const BLOCK = [" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"];

  window.addEventListener("keydown", function (e) {
    if (typing()) return;            // 猜词输入框里打汉字时不许人物乱走
    if (BLOCK.indexOf(e.key) >= 0) e.preventDefault();
    D.keys[e.key.toLowerCase()] = true;
    if (e.repeat) return;
    for (const fn of pressHandlers) fn(e.key, e);
  });

  window.addEventListener("keyup", function (e) {
    D.keys[e.key.toLowerCase()] = false;
  });

  window.addEventListener("blur", function () {
    for (const k in D.keys) D.keys[k] = false;
  });

  D.axisX = function () {
    const l = D.keys["a"] || D.keys["arrowleft"];
    const r = D.keys["d"] || D.keys["arrowright"];
    return (r ? 1 : 0) - (l ? 1 : 0);
  };

  D.holdAdvance = function () {
    return D.keys["e"] || D.keys["enter"] || D.keys[" "];
  };

  // ---------------------------------------------------------------- 对白

  const dlg = { el: null, who: null, line: null, queue: [], resolve: null, open: false, onShow: null };

  D.initDialog = function (nodes) {
    dlg.el = nodes.root;
    dlg.who = nodes.who;
    dlg.line = nodes.line;
    dlg.el.addEventListener("click", () => D.advance());
  };

  function showLine() {
    const item = dlg.queue[0];
    if (!item) {
      dlg.open = false;
      dlg.el.classList.remove("show");
      const done = dlg.resolve;
      dlg.resolve = null;
      D.emit("dialog:end");
      if (done) done();
      return;
    }
    dlg.who.textContent = item[0];
    dlg.line.textContent = item[1];
    if (dlg.onShow) dlg.onShow(item);
  }

  /** 说几句话，全部读完后 resolve。 */
  D.lines = function (items) {
    return new Promise(function (resolve) {
      dlg.queue = items.slice();
      dlg.resolve = resolve;
      dlg.open = true;
      dlg.el.classList.add("show");
      D.emit("dialog:start");
      showLine();
    });
  };

  D.advance = function () {
    if (!dlg.open) return false;
    D.audio.blip();
    dlg.queue.shift();
    showLine();
    return true;
  };

  D.dialogOpen = function () { return dlg.open; };

  D.onDialogShow = function (fn) { dlg.onShow = fn; };

  // ---------------------------------------------------------------- 目标 / 提示

  const obj = { el: null, title: null, sub: null };
  D.initObjective = function (nodes) {
    obj.el = nodes.root;
    obj.title = nodes.title;
    obj.sub = nodes.sub;
  };
  D.objective = function (title, sub) {
    if (!obj.el) return;
    if (!title) { obj.el.classList.remove("show"); return; }
    obj.title.textContent = title;
    obj.sub.textContent = sub || "";
    obj.el.classList.add("show");
  };

  const hintEl = { el: null, timer: 0 };
  D.initHint = function (node) { hintEl.el = node; };
  D.hint = function (text, ms) {
    if (!hintEl.el) return;
    if (!text) { hintEl.el.classList.remove("show"); return; }
    hintEl.el.textContent = text;
    hintEl.el.classList.add("show");
    clearTimeout(hintEl.timer);
    if (ms !== 0) hintEl.timer = setTimeout(() => hintEl.el.classList.remove("show"), ms || 2600);
  };

  // ---------------------------------------------------------------- 淡入淡出

  const fadeEl = { el: null };
  D.initFade = function (node) { fadeEl.el = node; fadeEl.el.style.opacity = "1"; };

  D.fadeTo = function (opacity, ms) {
    return new Promise(function (resolve) {
      const el = fadeEl.el;
      if (!el) { resolve(); return; }
      el.style.transition = "opacity " + (ms || 320) + "ms linear";
      el.style.opacity = String(opacity);
      setTimeout(resolve, (ms || 320) + 20);
    });
  };

  // ---------------------------------------------------------------- 声音
  // 只用几个正弦短音，够区分「点到了 / 答对了 / 答错了」就行。

  let ctxAudio = null;
  function ac() {
    if (!ctxAudio) {
      try { ctxAudio = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ctxAudio = null; }
    }
    return ctxAudio;
  }
  function tone(freq, dur, vol, type) {
    const a = ac();
    if (!a || a.state !== "running") return;
    const osc = a.createOscillator(), g = a.createGain();
    const now = a.currentTime;
    osc.type = type || "sine";
    osc.frequency.value = freq;
    g.gain.setValueAtTime(vol, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(g).connect(a.destination);
    osc.start(now); osc.stop(now + dur);
  }

  D.audio = {
    unlock: function () { const a = ac(); if (a && a.state === "suspended") a.resume(); },
    blip: function () { tone(680, 0.05, 0.012); },
    click: function () { tone(520, 0.07, 0.016, "triangle"); },
    right: function () { tone(740, 0.1, 0.02); setTimeout(() => tone(990, 0.14, 0.018), 90); },
    wrong: function () { tone(220, 0.16, 0.018, "square"); },
    step: function () { tone(120, 0.03, 0.006, "triangle"); }
  };

  // ---------------------------------------------------------------- 小工具

  D.clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  D.lerp = function (a, b, k) { return a + (b - a) * k; };
  D.near = function (a, b, d) { return Math.abs(a - b) <= d; };
  D.sleep = function (ms) { return new Promise((r) => setTimeout(r, ms)); };

  /** 深度：站在地面上不同的 y，画出来的大小跟着变一点。 */
  D.depthScale = function (y, top, bottom) {
    const k = D.clamp((y - top) / (bottom - top), 0, 1);
    return 0.92 + k * 0.14;
  };

})(window);
