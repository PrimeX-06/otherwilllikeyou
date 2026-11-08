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
  // 由乃的侧面、背面与四向行走已替换原占位帧。
  D.FRAMES = {
    boy: {
      idleDown: [0, 1], idleLeft: [2, 2], idleRight: [3, 3], idleUp: [4, 4],
      walkDown: [5, 8], walkLeft: [9, 12], walkRight: [13, 16], walkUp: [17, 20],
      pickup: [25, 25], carry: [43, 46]
    },
    girl: {
      idleDown: [0, 1], idleLeft: [2, 2], idleRight: [3, 3], idleUp: [4, 4],
      walkDown: [5, 8], walkLeft: [9, 12], walkRight: [13, 16], walkUp: [17, 20],
      pickup: [27, 27], carry: [50, 53]
    },
    friend: {
      idleDown: [0, 8], idleLeft: [9, 9], idleRight: [10, 10], idleUp: [11, 11],
      walkRight: [12, 15], walkLeft: [16, 19], walkDown: [20, 23], walkUp: [24, 27],
      pickup: [30, 30], carry: [56, 59]
    },
    // 背景路人：npc_generated 四向行走表，每张 4 帧
    npcBoy: {
      idleDown: [0, 0], idleLeft: [0, 0], idleRight: [0, 0], idleUp: [0, 0],
      walkDown: [0, 3], walkLeft: [0, 3], walkRight: [0, 3], walkUp: [0, 3]
    },
    npcGirl: {
      idleDown: [0, 0], idleLeft: [0, 0], idleRight: [0, 0], idleUp: [0, 0],
      walkDown: [0, 3], walkLeft: [0, 3], walkRight: [0, 3], walkUp: [0, 3]
    }
  };

  // 路人的四个方向各是一张单独的行走表，按朝向换图
  const NPC_SHEETS = {
    npcBoy: { down: "npcBoyDown", up: "npcBoyUp", left: "npcBoyLeft", right: "npcBoyRight" },
    npcGirl: { down: "npcGirlDown", up: "npcGirlUp", left: "npcGirlLeft", right: "npcGirlRight" }
  };

  const IDLE_FPS = { boy: 3, girl: 3, friend: 7, npcBoy: 3, npcGirl: 3 };
  const WALK_FPS = { boy: 9, girl: 9, friend: 7, npcBoy: 8, npcGirl: 8 };

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

  /** 画一个角色。x 是脚底中心，y 是脚底基线。
   *  dir 既可以是老的 ±1（横版，正/背对镜头只分左右），
   *  也可以是 "up" / "down" / "left" / "right"（俯视球场用四向帧）。
   *  站着时看 a.face 决定朝哪边，没写就正面。 */
  D.drawActor = function (ctx, a, t) {
    const F = D.FRAMES[a.key];
    if (!F) return;

    const named = typeof a.dir === "string" ? a.dir : null;
    const face = a.face || "down";
    // 路人一个方向一张表；三主角仍然共用一整张
    const dirName = named || face;
    const sheetKey = NPC_SHEETS[a.key] ? (NPC_SHEETS[a.key][dirName] || a.key) : a.key;
    const sheet = D.img[sheetKey];
    if (!sheet) return;
    let range, fps;
    if (a.pose && F[a.pose]) {
      // 剧情动作（抬箱子、弯腰）：直接指定帧段，压过走/站。
      range = F[a.pose];
      fps = a.pose === "carry" ? 6 : 3;
    } else if (a.moving) {
      if (named === "up") range = F.walkUp;
      else if (named === "down") range = F.walkDown;
      else if (named === "left") range = F.walkLeft;
      else if (named === "right") range = F.walkRight;
      else range = a.dir > 0 ? F.walkRight : F.walkLeft;
      fps = WALK_FPS[a.key] || 8;
    } else {
      // 横版场景里停下来就是转过来对着镜头；俯视场里可以指定朝向
      const idle = F["idle" + face.charAt(0).toUpperCase() + face.slice(1)];
      range = idle || F.idleDown;
      fps = IDLE_FPS[a.key] || 3;
    }
    const n = range[1] - range[0] + 1;
    const f = range[0] + (Math.floor(t * fps + (a.phase || 0)) % n);

    // size 是给背景路人用的固定比例；scale 只在需要显式指定大小时才传
    const s = (a.scale == null ? 1 : a.scale) * (a.size == null ? 1 : a.size);
    const w = FW * s, h = FH * s;
    const x = Math.round(a.x - w / 2);
    const y = Math.round(a.y - h);

    ctx.save();
    if (a.alpha != null) ctx.globalAlpha = a.alpha;
    if (a.flip) {
      // 弯腰帧有固定朝向；需要她对着另一边的箱子时，只翻这一帧
      ctx.translate(a.x, 0);
      ctx.scale(-1, 1);
      ctx.translate(-a.x, 0);
    }
    ctx.drawImage(sheet, f * FW, 0, FW, FH, x, y, w, h);
    ctx.restore();
  };

  // ---------------------------------------------------------------- 背景路人
  // 只沿 x 来回走，不参与任何玩法。放进 extras 里和主角一起按 y 排序，
  // 站在前面的路人会从主角身前经过，站在后面的则被挡住。

  D.createCrowd = function (opts) {
    const o = Object.assign({
      count: 3,
      xMin: 36, xMax: 476,
      yMin: 206, yMax: 236,
      speed: 22,
      size: 0.8,
      alpha: 0.62,
      seed: 1
    }, opts || {});

    let seed = (o.seed >>> 0) || 1;
    function rand() {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    }

    const keys = ["npcBoy", "npcGirl"];
    const actors = [];
    for (let i = 0; i < o.count; i++) {
      const dir = rand() < 0.5 ? -1 : 1;
      actors.push({
        key: keys[i % keys.length],
        x: D.lerp(o.xMin, o.xMax, rand()),
        y: D.lerp(o.yMin, o.yMax, rand()),
        dir: dir,
        face: dir > 0 ? "right" : "left",
        moving: true,
        phase: rand() * 8,
        speed: o.speed * (0.72 + rand() * 0.56),
        pause: rand() * 1.6,
        hidden: false,
        size: o.size,
        alpha: o.alpha
      });
    }

    return {
      actors: actors,
      update: function (dt) {
        for (const a of actors) {
          if (a.hidden) continue;
          if (a.pause > 0) {
            a.pause -= dt;
            a.moving = false;
            continue;
          }
          a.moving = true;
          a.x += a.dir * a.speed * dt;
          if (a.x < o.xMin) {
            a.x = o.xMin;
            a.dir = 1;
            a.pause = 0.5 + rand() * 1.4;
          } else if (a.x > o.xMax) {
            a.x = o.xMax;
            a.dir = -1;
            a.pause = 0.5 + rand() * 1.4;
          }
          a.face = a.dir > 0 ? "right" : "left";
        }
      },
      setHidden: function (v) { for (const a of actors) a.hidden = !!v; },
      draw: function (ctx, t) {
        const list = actors.filter(function (a) { return !a.hidden; })
          .sort(function (p, q) { return p.y - q.y; });
        for (const a of list) {
          D.shadow(ctx, a.x, a.y + 1, D.FRAME_W * a.size);
        }
        for (const a of list) D.drawActor(ctx, a, t);
      }
    };
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

  /** 纵深轴：W / 上 往远处，S / 下 往近处。横版游戏不用它。 */
  D.axisY = function () {
    const u = D.keys["w"] || D.keys["arrowup"];
    const d = D.keys["s"] || D.keys["arrowdown"];
    return (u ? 1 : 0) - (d ? 1 : 0);
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
    step: function () { tone(120, 0.03, 0.006, "triangle"); },
    bell: function () {
      tone(880, 0.42, 0.016);
      setTimeout(function () { tone(880, 0.42, 0.013); }, 380);
    }
  };

  // ---------------------------------------------------------------- 主动发起 / 即时反应
  // 四个小游戏共用这一层。原先的互动基本都是「走到点按 E → 弹一段对白」，
  // 玩家只能回应场景，很少能自己起个头；角色也不会对他刚做的动作马上接一句。
  //
  // D.react() 刻意**不**走 D.lines()：不弹对白框、不触发 dialog:start、不冻结走位，
  // 说完就散。所以走路、接球、猜词都不会被打断。两句连着发就排成一来一回。
  // 「主动发起」统一由 F（或左下角那个按钮）走 D.poke()，各游戏自己注册 handler。

  const react = {
    root: null, btn: null, queue: [], timer: 0, current: null,
    last: null, count: 0
  };
  let pokeHandler = null;

  D.initReact = function (nodes) {
    react.root = nodes.root;
    react.btn = nodes.btn;
    // 不拦这一下的话，点胶囊会冒泡到 #stage，顺手把正在读的对白翻过去
    react.btn.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
    react.btn.addEventListener("click", function () {
      D.audio.unlock();
      D.poke();
    });
    D.on("dialog:start", function () { react.btn.classList.add("dim"); });
    D.on("dialog:end", function () { react.btn.classList.remove("dim"); });
  };

  function nextReact() {
    if (react.current || !react.queue.length || !react.root) return;
    const r = react.queue.shift();
    react.current = r;
    react.last = { who: r.who, text: r.text };
    react.count++;
    react.root.innerHTML = "";
    const b = document.createElement("b");
    b.textContent = r.who;
    const s = document.createElement("span");
    s.textContent = r.text;
    react.root.append(b, s);
    react.root.hidden = false;
    requestAnimationFrame(function () {
      if (react.current === r) react.root.classList.add("show");
    });
    D.emit("react", react.last);
    react.timer = setTimeout(function () {
      react.root.classList.remove("show");
      react.current = null;
      react.timer = setTimeout(function () {
        if (!react.current && react.root) react.root.hidden = true;
        nextReact();
      }, 170);
    }, r.ms || 1700);
  }

  /** 说一句就散的短反应。who 是显示名，ms 默认 1700。 */
  D.react = function (who, text, ms) {
    react.queue.push({ who: who, text: text, ms: ms || 1700 });
    nextReact();
  };

  /** 换场、收尾、退出时清干净，别把上一场的半句话留到下一场。 */
  D.clearReact = function () {
    clearTimeout(react.timer);
    react.queue.length = 0;
    react.current = null;
    if (react.root) {
      react.root.classList.remove("show");
      react.root.hidden = true;
    }
  };

  /** 左下角那颗胶囊的文案；传 falsy 就收起来。 */
  D.reactHint = function (label) {
    if (!react.btn) return;
    if (!label) { react.btn.hidden = true; return; }
    react.btn.textContent = label;
    react.btn.hidden = false;
  };

  /** 注册当前小游戏的「玩家主动发起」。每个游戏 start() 里设、dispose() 里清。 */
  D.onPoke = function (fn) { pokeHandler = typeof fn === "function" ? fn : null; };
  D.poke = function () { if (pokeHandler) pokeHandler(); };

  D.reactStats = function () {
    return { count: react.count, last: react.last,
             queued: react.queue.length + (react.current ? 1 : 0) };
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
