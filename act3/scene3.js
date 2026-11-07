/* 第三幕 · 广播室 — 画面与流程
 *
 * 流程：承接第二幕双人就座（单独打开时演出进门）→ 试音 → 3、2、1 → ON AIR
 *      → 按谱面念完 → 灯灭，镜头推近她 → 完成卡
 *
 * 场景图与第二幕共用；角色夹在背景椅背和桌面前板之间。
 * 轨道置于人物右侧的空区，避免遮住两人的神态。
 */
(function (global) {
  "use strict";

  const W = 512, H = 288;
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  const el = (id) => document.getElementById(id);

  // ---------------------------------------------------------------- 版面
  // 两人沿用第二幕的左／右座位，轨道放在右侧空区。
  const HIT_Y = 228;          // 判定线
  const LANE_TOP = 34;        // 音符从这里生出来
  const APPROACH = 1.55;      // 音符从生出来到判定的时间（秒）
  const SPEED = (HIT_Y - LANE_TOP) / APPROACH;

  const LANE = {
    her: { x: 358, w: 38, main: "#f2a8b8", dim: "#8d5a66", name: "朱里" },
    me: { x: 420, w: 38, main: "#9acbdf", dim: "#4f7181", name: "和臣" }
  };
  const LANE_MID = { her: LANE.her.x + LANE.her.w / 2, me: LANE.me.x + LANE.me.w / 2 };

  // 脚点沿用第二幕：桌沿只挡下半身，椅背在人物后方。
  const GIRL_AT = { x: 275, y: 211, s: 1.2 };
  const BOY_AT = { x: 166, y: 211, s: 1.25 };

  const FW = 48, FH = 72;

  // ---------------------------------------------------------------- 资源

  const IMG = {
    girl: "../assets/characters/girl/girl_sheet.png",
    girlSit: "../assets/characters/girl/girl_sit_down.png",
    boySit: "../assets/characters/boy/boy_sit_down.png",
    room: "../act2/broadcast-bridge/assets/broadcast_room_single_desk.png",
    roomOpen: "../act2/broadcast-bridge/assets/broadcast_room_single_desk_open.png"
  };
  const img = {};
  let loaded = 0;
  for (const k in IMG) {
    const im = new Image();
    im.onload = () => { loaded++; };
    im.onerror = () => { loaded++; };
    im.src = IMG[k];
    img[k] = im;
  }

  // ---------------------------------------------------------------- 声音与谱面

  const audio = global.ACT3.createAudio();
  const chart = global.ACT3.buildChart(global.ACT3.Script);

  const SAVE_KEY = "our-story-act3-broadcast-v1";
  function loadSave() {
    try { return JSON.parse(localStorage.getItem(SAVE_KEY) || "null") || {}; }
    catch (e) { return {}; }
  }
  function writeSave(patch) {
    try {
      const s = Object.assign(loadSave(), patch);
      localStorage.setItem(SAVE_KEY, JSON.stringify(s));
    } catch (e) { /* 无痕模式写不进去，不影响玩 */ }
  }
  const SAVE = loadSave();

  const BACK = (() => {
    try { return new URLSearchParams(location.search).get("back") || "../school-preview.html"; }
    catch (e) { return "../school-preview.html"; }
  })();
  const FRESH = /(\?|&)fresh=1/.test(location.search);
  const FROM_BRIDGE = new URLSearchParams(location.search).get("from") === "bridge";

  // ---------------------------------------------------------------- 状态

  const sc = {
    state: "intro",     // intro | check | ready | play | finale | done | leave
    t: 0,
    cam: { x: 256, y: 150, z: 1.55, tx: 256, ty: 150, tz: 1 },
    walk: 0,            // 她走进来的进度 0..1
    doorOpen: 0,
    onAir: 0,           // 灯亮到几分
    laneFade: 0,        // 轨道区压暗的淡入
    veil: 1,            // 从黑场淡入
    readyT: 0,
    finaleT: 0,
    byeShown: false,
    finished: false
  };

  const vu = { her: 0, me: 0 };
  const fx = [];

  const rhythm = global.ACT3.createRhythm(chart, audio, {
    onJudge(tier, note, delta) {
      vu.me = Math.min(1, vu.me + 0.55);
      fx.push({
        kind: "ring", lane: "me", t0: audio.songTime(),
        tier, color: LANE.me.main
      });
      if (tier === "miss") flashLane("me");
    },
    onHerNote(n) {
      vu.her = Math.min(1, vu.her + 0.5);
      fx.push({ kind: "ring", lane: "her", t0: audio.songTime(), tier: "auto", color: LANE.her.main });
    },
    onCover(n) {
      vu.her = 1;
      // 这里**不画圈**。空心的圆环读起来像准星，不像「她开口了」；
      // 换成粉轨底下一道更宽更亮的横扫，和补位那一刻同一种语言。
      fx.push({ kind: "sweep", t0: audio.songTime(), color: "#ffd9e2", big: true });
    },
    onRescue(n, cov) {
      // 她接住了。**画面不写字**：她的音色换了人、粉轨上多一个「托」的音符、
      // 字幕那半句变成她的颜色——三样加起来比一行「她救了你」有说服力，
      // 也不会和判定字挤在同一条线上。
      fx.push({ kind: "sweep", t0: audio.songTime(), color: LANE.her.main });
    },
    onCue() {
      fx.push({ kind: "cue", t0: audio.songTime(), color: "#f4ecdd" });
    },
    onHoldBreak() { flashLane("me"); },
    onFinish(st) {
      sc.finished = true;
      sc.finishStats = st;
    }
  });

  // 字幕查判定状态要查 rhythm 手里那份**副本**：
  // chart.notes 是谱面原件，judged / result 是写在副本上的，
  // 第一版查错了对象，结果漏掉的半句永远不会变成她的颜色。
  const noteById = new Map();
  for (const n of rhythm.mine) noteById.set(n.id, n);
  for (const n of rhythm.hers) noteById.set(n.id, n);

  // ---------------------------------------------------------------- 提示条

  let toastText = "", toastColor = "#f4ecdd", toastT = 0;
  function toast(text, color) {
    toastText = text;
    toastColor = color || "#f4ecdd";
    toastT = 2.2;
  }

  let flashT = 0;
  function flashLane() { flashT = 0.22; }

  // ---------------------------------------------------------------- 对白

  const dlgEl = el("dlg");
  const dlgWho = el("dlgWho");
  const dlgLine = el("dlgLine");
  let dlg = null;

  function say(who, text, done) {
    dlg = { who, text, shown: 0, t: 0, done };
    dlgWho.textContent = who;
    dlgLine.textContent = "";
    dlgEl.classList.add("show");
  }
  function advance() {
    if (!dlg) return false;
    if (dlg.shown < dlg.text.length) {
      dlg.shown = dlg.text.length;
      dlgLine.textContent = dlg.text;
      return true;
    }
    const d = dlg.done;
    dlg = null;
    dlgEl.classList.remove("show");
    if (d) d();
    return true;
  }
  function lines(items, done) {
    let i = 0;
    const step = () => {
      if (i >= items.length) { if (done) done(); return; }
      const it = items[i++];
      say(it[0], it[1], step);
    };
    step();
  }

  // ---------------------------------------------------------------- 场景素材
  // 与第二幕广播室共用同一张背景；桌面前板单独盖在人物下半身前。
  const DESK = { x: 70, y: 188, w: 269, h: 75 };
  function roomImage() {
    return sc.doorOpen > 0.5 ? img.roomOpen : img.room;
  }

  // ---------------------------------------------------------------- 人物

  const ready = (im) => im && im.complete && im.naturalWidth > 0;

  function drawGirl(k) {
    if (!ready(img.girl) || !ready(img.girlSit)) return;
    // k = 走进来的进度；1 就是坐好了
    const s = GIRL_AT.s;
    if (k < 1) {
      const x = 438 + (GIRL_AT.x - 438) * k;
      const feet = 233 + (GIRL_AT.y - 233) * k;
      const step = Math.floor(sc.t * 7) % 2 ? 11 : 12;
      ctx.drawImage(img.girl, step * FW, 0, FW, FH,
        Math.round(x - FW * s / 2), Math.round(feet - FH * s), FW * s, FH * s);
      return;
    }
    const bob = Math.sin(sc.t * 1.6) * 0.6;
    ctx.drawImage(img.girlSit, 0, 0, FW, FH,
      Math.round(GIRL_AT.x - FW * s / 2), Math.round(GIRL_AT.y - FH * s + bob), FW * s, FH * s);
  }

  function drawBoy() {
    if (!ready(img.boySit)) return;
    const s = BOY_AT.s;
    const bob = Math.sin(sc.t * 1.5 + 1.2) * 0.6;
    ctx.drawImage(img.boySit, 0, 0, FW, FH,
      Math.round(BOY_AT.x - FW * s / 2), Math.round(BOY_AT.y - FH * s + bob), FW * s, FH * s);
  }

  // ---------------------------------------------------------------- 动态房间

  function drawVU() {
    // 两块电平表：左她右你，跟着各自最近一次发声跳
    const rows = [
      { y: 44, v: vu.her, color: LANE.her.main, label: "她" },
      { y: 54, v: vu.me, color: LANE.me.main, label: "我" }
    ];
    for (const r of rows) {
      for (let i = 0; i < 12; i++) {
        const lit = r.v * 12 > i;
        ctx.fillStyle = lit ? r.color : "rgba(255,255,255,.07)";
        ctx.globalAlpha = lit ? 0.85 : 1;
        ctx.fillRect(20 + i * 4, r.y, 3, 5);
      }
      ctx.globalAlpha = 1;
    }
  }

  function drawOnAir() {
    const on = sc.onAir;
    const x = 20, y = 14, w = 62, h = 19;
    ctx.fillStyle = "#0d1214";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "rgba(255,255,255,.12)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);

    // 灯
    const lx = x + 10, ly = y + h / 2;
    if (on > 0.02) {
      const gg = ctx.createRadialGradient(lx, ly, 0, lx, ly, 16);
      gg.addColorStop(0, "rgba(255,86,72," + (0.55 * on) + ")");
      gg.addColorStop(1, "rgba(255,86,72,0)");
      ctx.fillStyle = gg;
      ctx.fillRect(lx - 16, ly - 16, 32, 32);
    }
    ctx.fillStyle = on > 0.5 ? "#ff5a48" : "#4a2320";
    ctx.beginPath();
    ctx.arc(lx, ly, 4, 0, 7);
    ctx.fill();
    if (on > 0.5) {
      ctx.fillStyle = "rgba(255,200,190,.9)";
      ctx.beginPath();
      ctx.arc(lx - 1, ly - 1, 1.6, 0, 7);
      ctx.fill();
    }

    ctx.fillStyle = on > 0.5 ? "#ffd9d2" : "rgba(242,233,218,.32)";
    ctx.font = 'bold 8px "Microsoft YaHei",sans-serif';
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("ON AIR", x + 20, ly + 0.5);
    ctx.textAlign = "left";
  }

  // ---------------------------------------------------------------- 轨道

  function laneY(time) {
    return HIT_Y - (time - audio.songTime()) * SPEED;
  }

  function drawLanes() {
    // 轨道区的压暗：隔音棉的花纹在这里必须让路，不然音符读不清。
    // 只在演奏时出现，跟着 laneFade 淡进来。
    if (sc.laneFade > 0.01) {
      const vg = ctx.createLinearGradient(345, 0, 471, 0);
      vg.addColorStop(0, "rgba(8,11,12,0)");
      vg.addColorStop(0.18, "rgba(8,11,12," + (0.67 * sc.laneFade) + ")");
      vg.addColorStop(0.82, "rgba(8,11,12," + (0.67 * sc.laneFade) + ")");
      vg.addColorStop(1, "rgba(8,11,12,0)");
      ctx.fillStyle = vg;
      ctx.fillRect(345, 22, 126, HIT_Y - 17);
    }
    // 轨道底
    for (const k of ["her", "me"]) {
      const L = LANE[k];
      const g = ctx.createLinearGradient(0, LANE_TOP, 0, HIT_Y);
      g.addColorStop(0, "rgba(255,255,255,0)");
      g.addColorStop(0.65, "rgba(255,255,255,.05)");
      g.addColorStop(1, "rgba(255,255,255,.13)");
      ctx.fillStyle = g;
      ctx.fillRect(L.x, LANE_TOP, L.w, HIT_Y - LANE_TOP);
      const eg = ctx.createLinearGradient(0, LANE_TOP, 0, HIT_Y);
      eg.addColorStop(0, "rgba(255,255,255,0)");
      eg.addColorStop(0.45, "rgba(255,255,255,.06)");
      eg.addColorStop(1, "rgba(255,255,255,.20)");
      ctx.fillStyle = eg;
      ctx.fillRect(L.x, LANE_TOP, 1, HIT_Y - LANE_TOP);
      ctx.fillRect(L.x + L.w - 1, LANE_TOP, 1, HIT_Y - LANE_TOP);
    }

    // 判定线：一条实线压一条散光，看着像一条真的横在桌上的线
    const lw = LANE.me.x + LANE.me.w - LANE.her.x;
    const lg = ctx.createLinearGradient(LANE.her.x, 0, LANE.her.x + lw, 0);
    lg.addColorStop(0, "rgba(255,255,255,.10)");
    lg.addColorStop(0.2, "rgba(255,255,255,.55)");
    lg.addColorStop(0.8, "rgba(255,255,255,.55)");
    lg.addColorStop(1, "rgba(255,255,255,.10)");
    ctx.fillStyle = lg;
    ctx.fillRect(LANE.her.x, HIT_Y, lw, 1);
    ctx.fillStyle = "rgba(255,255,255,.12)";
    ctx.fillRect(LANE.her.x, HIT_Y + 1, lw, 1);
    ctx.fillRect(LANE.her.x, HIT_Y - 2, lw, 1);

    // 接收器
    for (const k of ["her", "me"]) {
      const L = LANE[k];
      const y = HIT_Y - 5;
      ctx.fillStyle = "rgba(10,14,16,.55)";
      ctx.fillRect(L.x + 2, y, L.w - 4, 10);
      ctx.strokeStyle = flashT > 0 && k === "me"
        ? "rgba(255,120,110,.95)"
        : hexA(L.main, 0.55);
      ctx.lineWidth = 1;
      ctx.strokeRect(L.x + 2.5, y + 0.5, L.w - 5, 9);
    }

    // 中间的接缝：两条轨道是一条话的两半，缝上画一列小点
    ctx.fillStyle = "rgba(255,255,255,.10)";
    const seam = Math.floor((LANE.her.x + LANE.her.w + LANE.me.x) / 2);
    for (let y = LANE_TOP + 6; y < HIT_Y; y += 8) ctx.fillRect(seam, y, 2, 2);
  }

  function drawNotes() {
    const t = audio.songTime();
    const live = rhythm.live();

    // 先画她的（在下层），再画你的（在上层）——你的音符永远不被压住
    for (const n of live.hers) {
      if (n.judged) continue;
      const y = laneY(n.time);
      if (y < LANE_TOP - 20 || y > HIT_Y + 30) continue;
      drawNote(n, y, "her");
    }
    for (const n of live.mine) {
      if (n.judged) continue;
      const y = laneY(n.time);
      if (y < LANE_TOP - 20 || y > HIT_Y + 30) continue;
      drawNote(n, y, "me");
    }

    // 按住中的长音：尾巴缩短，像被吸进去了
    const hd = live.hold;
    if (hd) {
      const n = hd.note;
      const y = laneY(n.time);
      const tailY = laneY(n.time + n.dur);
      const k = Math.max(0, Math.min(1, (t - n.time) / Math.max(0.01, n.dur)));
      const top = tailY + (y - tailY) * k;
      ctx.fillStyle = hexA(LANE.me.main, 0.28);
      ctx.fillRect(LANE_MID.me - 5, top, 10, Math.max(0, y - top));
      ctx.fillStyle = hexA(LANE.me.main, 0.9);
      ctx.fillRect(LANE_MID.me - 5, y - 3, 10, 6);
    }

    // 提示音符：她敲稿子之后，接下来四五个你的音符外面套一层虚线
    if (live.cue) {
      const id = live.cue.noteId;
      for (const n of live.mine) {
        if (n.judged) continue;
        if (n.id < id || n.id > id + live.cue.len) continue;
        const y = laneY(n.time);
        if (y < LANE_TOP || y > HIT_Y) continue;
        const a = 0.30 + 0.30 * Math.sin(t * 12);
        ctx.strokeStyle = "rgba(244,236,221," + a.toFixed(3) + ")";
        ctx.lineWidth = 1;
        ctx.strokeRect(LANE.me.x + 2.5, y - 8.5, LANE.me.w - 5, 17);
      }
    }
  }

  function drawNote(n, y, laneKey) {
    const L = LANE[laneKey];
    const cx = LANE_MID[laneKey];
    const fade = Math.min(1, Math.max(0, (y - LANE_TOP) / 26));
    const isCover = n.cover;
    const isRelay = n.type === "relay";
    const col = isCover ? "#ffd9e2" : L.main;
    const alpha = (n.type === "hold" ? 0.95 : 1) * fade;

    // 长音的身子
    if (n.type === "hold") {
      const tailY = y - n.dur * SPEED;
      const top = Math.max(LANE_TOP, tailY);
      ctx.fillStyle = hexA(col, 0.30);
      ctx.fillRect(cx - 5, top, 10, Math.max(0, y - top));
      ctx.fillStyle = hexA(col, 0.55);
      ctx.fillRect(cx - 1, top, 2, Math.max(0, y - top));
    }

    // 接力：从她那条轨道伸一条桥过来。
    // 一开始只画了 2px 的线，扫一眼根本看不出「这句是从她那边过来的」——
    // 桥要够粗，而且靠近她的一头是粉的、靠近你的一头是蓝的：
    // 颜色渐变本身就是箭头，不用再写一个字。
    if (isRelay) {
      const x0 = LANE.her.x + LANE.her.w - 2;   // 她轨道的右边缘
      const x1 = LANE.me.x - 1;                 // 你轨道的左边缘
      ctx.globalAlpha = fade;
      const g = ctx.createLinearGradient(x0, 0, x1, 0);
      g.addColorStop(0, hexA(LANE.her.main, 0.05));
      g.addColorStop(0.4, hexA(LANE.her.main, 0.62));
      g.addColorStop(1, hexA(LANE.me.main, 0.92));
      ctx.fillStyle = g;
      ctx.fillRect(x0, y - 2, x1 - x0, 5);
      ctx.fillStyle = "rgba(255,255,255,.40)";
      ctx.fillRect(x0 + 8, y, x1 - x0 - 11, 1);
      // 箭头，戳在你轨道上
      ctx.fillStyle = hexA(LANE.me.main, 0.95);
      ctx.beginPath();
      ctx.moveTo(x1 + 1, y);
      ctx.lineTo(x1 - 4, y - 4);
      ctx.lineTo(x1 - 4, y + 4);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // 音符本体。底下垫一层半透明的大方块当发光——
    // 深色墙上只靠 8px 高的实心块，扫一眼是看不见的。
    const half = isRelay ? 19 : 16;   // 接力音符比普通音符宽一圈
    ctx.globalAlpha = alpha;
    ctx.fillStyle = hexA(col, 0.20);
    rrect(cx - half - 3, y - 7, (half + 3) * 2, 14, 4);
    ctx.fillStyle = hexA(col, 0.95);
    rrect(cx - half, y - 5, half * 2, 10, 2);
    ctx.fillStyle = "rgba(255,255,255,.92)";
    ctx.fillRect(cx - half + 2, y - 4, half * 2 - 4, 3);
    ctx.fillStyle = "rgba(0,0,0,.22)";
    ctx.fillRect(cx - half + 2, y + 3, half * 2 - 4, 2);
    if (isRelay) {
      // 左端窄窄一截粉色是「她起的头」，一道暗缝之后右半边才是你的。
      // 粉色不能画宽——画宽了就像两个音符并排，反而和最后那句和弦撞脸。
      ctx.fillStyle = hexA(LANE.her.main, 0.98);
      ctx.fillRect(cx - half, y - 5, 6, 10);
      ctx.fillStyle = hexA(LANE.her.main, 0.55);
      ctx.fillRect(cx - half, y - 5, 6, 2);
      ctx.fillStyle = "rgba(12,16,18,.55)";
      ctx.fillRect(cx - half + 6, y - 5, 2, 10);
    }
    ctx.globalAlpha = 1;
    if (fade < 1) return;

    if (isCover) {
      ctx.strokeStyle = "rgba(255,255,255,.9)";
      ctx.lineWidth = 1;
      ctx.strokeRect(cx - 17.5, y - 5.5, 35, 11);
    }
  }

  function rrect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fill();
  }

  function hexA(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")";
  }

  // ---------------------------------------------------------------- 特效

  function drawFx() {
    const t = audio.songTime();
    for (let i = fx.length - 1; i >= 0; i--) {
      const e = fx[i];
      // age 卡在 0 以上：时钟一旦倒退（跳段、停歌），特效的时间差会变成负数，
      // 半径跟着变成负数，Canvas 会直接抛异常，整个画面黑掉。
      const age = Math.max(0, t - e.t0);
      if (age > 0.6) { fx.splice(i, 1); continue; }
      const k = age / 0.6;
      if (e.kind === "ring") {
        const mid = e.lane === "her" ? LANE_MID.her : LANE_MID.me;
        const r = 5 + k * 15;
        ctx.strokeStyle = hexA(e.color, (1 - k) * 0.6);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(mid, HIT_Y, r, 0, Math.PI * 2);
        ctx.stroke();
      } else if (e.kind === "sweep") {
        // 她替你把话接过去：粉轨底部横着扫一道光。
        // 补位那一下用更宽的一道（big），让「她开口了」比「她准备开口了」更响。
        const w = (e.big ? 46 : 20) + k * (e.big ? 66 : 34);
        const hh = e.big ? 8 : 6;
        ctx.fillStyle = hexA(e.color, (1 - k) * (e.big ? 0.62 : 0.45));
        ctx.fillRect(LANE_MID.her - w / 2, HIT_Y - hh / 2, w, hh);
      } else if (e.kind === "cue") {
        const mid = LANE_MID.me;
        ctx.strokeStyle = "rgba(244,236,221," + ((1 - k) * 0.6).toFixed(3) + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mid - 24, HIT_Y - 30 - k * 20);
        ctx.lineTo(mid + 24, HIT_Y - 30 - k * 20);
        ctx.stroke();
      }
    }

    // 判定字
    const last = rhythm.state.last;
    if (last) {
      const age = t - last.at;
      if (age < 0.55) {
        const k = age / 0.55;
        const txt = last.tier === "perfect" ? "PERFECT"
          : last.tier === "good" ? "GOOD"
            : last.tier === "ok" ? "OK" : "MISS";
        const col = last.tier === "perfect" ? "#ffe9a8"
          : last.tier === "good" ? "#cfead8"
            : last.tier === "ok" ? "#b9cbd8" : "#ff8f86";
        ctx.save();
        ctx.globalAlpha = 1 - k * k;
        ctx.font = 'bold 10px "Microsoft YaHei",sans-serif';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(0,0,0,.55)";
        ctx.fillText(txt, LANE_MID.me + 1, HIT_Y - 34 - k * 6);
        ctx.fillStyle = col;
        ctx.fillText(txt, LANE_MID.me, HIT_Y - 35 - k * 6);
        ctx.restore();
      }
    }

    // 提示条（试音那一句）。放画面上部，离判定线远一点。
    if (toastT > 0) {
      const a = Math.min(1, toastT / 0.5);
      ctx.save();
      ctx.globalAlpha = a * 0.85;
      ctx.font = '10px "Microsoft YaHei",sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = toastColor;
      ctx.fillText(toastText, (LANE_MID.her + LANE_MID.me) / 2, 105);
      ctx.restore();
    }
  }

  // ---------------------------------------------------------------- HUD

  function drawHud() {
    const t = audio.songTime();
    const total = chart.duration;
    const k = Math.max(0, Math.min(1, t / total));

    // 进度条贴在画面最上面
    ctx.fillStyle = "rgba(255,255,255,.08)";
    ctx.fillRect(0, 0, W, 2);
    ctx.fillStyle = "rgba(244,236,221,.55)";
    ctx.fillRect(0, 0, W * k, 2);

    // 连击
    const st = rhythm.state;
    if (st.combo >= 3) {
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "rgba(0,0,0,.5)";
      ctx.font = 'bold 13px "Microsoft YaHei",sans-serif';
      ctx.fillText(String(st.combo), 257, 27);
      ctx.fillStyle = "#f4ecdd";
      ctx.fillText(String(st.combo), 256, 26);
      ctx.font = '7px "Microsoft YaHei",sans-serif';
      ctx.fillStyle = "rgba(242,233,218,.45)";
      ctx.fillText("COMBO", 256, 33);
      ctx.restore();
    }

    // 分数：放在桌面上，像控制台上的一块小表
    ctx.save();
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.font = 'bold 9px "Microsoft YaHei",sans-serif';
    ctx.fillStyle = "rgba(242,233,218,.42)";
    ctx.fillText(String(st.score).padStart(6, "0"), 498, 252);
    ctx.restore();

    // 头几秒给一句操作提示，之后自己淡掉
    if (sc.state === "play" && sc.playElapsed < 8) {
      const a = Math.min(1, Math.max(0, (8 - sc.playElapsed) / 1.6)) * 0.55;
      ctx.save();
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.font = '9px "Microsoft YaHei",sans-serif';
      ctx.fillStyle = "rgba(242,233,218," + a.toFixed(3) + ")";
      ctx.fillText("空格 · 接上她的话", 14, 252);
      ctx.restore();
    }

    // 倒计时
    if (sc.state === "ready") {
      const left = Math.max(0, 3 - Math.floor(sc.readyT));
      const frac = sc.readyT % 1;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.globalAlpha = 1 - frac * 0.5;
      ctx.fillStyle = "rgba(0,0,0,.45)";
      ctx.font = 'bold 44px "Microsoft YaHei",sans-serif';
      ctx.fillText(left > 0 ? String(left) : "ON", 258, 130);
      ctx.fillStyle = "#f4ecdd";
      ctx.fillText(left > 0 ? String(left) : "ON", 256, 128);
      ctx.restore();
    }

    // 试音的拍点
    if (sc.state === "check" && sc.check) {
      const c = sc.check;
      const beat = Math.floor((audio.now() - c.start) / audio.SPB);
      const on = beat >= 0 && beat < c.total;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if (on) {
        const phase = ((audio.now() - c.start) / audio.SPB) % 1;
        const r = 9 + (1 - phase) * 12;
        ctx.strokeStyle = "rgba(244,236,221," + (0.85 * (1 - phase) + 0.1).toFixed(3) + ")";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(256, 150, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      // 已经按了几下
      for (let i = 0; i < c.need; i++) {
        ctx.fillStyle = i < c.taps.length ? "#ffe9a8" : "rgba(255,255,255,.18)";
        ctx.fillRect(256 - c.need * 6 + i * 12, 178, 8, 4);
      }
      ctx.font = '9px "Microsoft YaHei",sans-serif';
      ctx.fillStyle = "rgba(242,233,218,.6)";
      ctx.fillText("跟着滴答按空格", 256, 196);
      ctx.restore();
    }
  }

  // ---------------------------------------------------------------- 主绘制

  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // 镜头
    const c = sc.cam;
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.scale(c.z, c.z);
    ctx.translate(-c.x, -c.y);

    const room = roomImage();
    if (ready(room)) ctx.drawImage(room, 0, 0, W, H);
    drawVU();
    drawOnAir();

    if (sc.state !== "intro" || sc.walk > 0) drawGirl(sc.walk);
    drawBoy();

    if (ready(room)) ctx.drawImage(room, DESK.x, DESK.y, DESK.w, DESK.h,
      DESK.x, DESK.y, DESK.w, DESK.h);
    ctx.restore();

    // 轨道和音符不吃镜头：它们是界面，不是屋子里的东西
    if (sc.laneFade > 0.01) {
      drawLanes();
      drawNotes();
      drawFx();
    }

    drawHud();

    // 黑场
    if (sc.veil > 0.002) {
      ctx.save();
      ctx.globalAlpha = Math.min(1, sc.veil);
      ctx.fillStyle = "#07090a";
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    // 收尾压暗
    if (sc.state === "finale" && sc.finaleT > 2.4) {
      const k = Math.min(1, (sc.finaleT - 2.4) / 1.6);
      ctx.save();
      ctx.globalAlpha = k * 0.55;
      ctx.fillStyle = "#07090a";
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }
  }

  // ---------------------------------------------------------------- 字幕条

  const scrWho = el("scrWho");
  const scrLine = el("scrLine");
  let scrIdx = -1;
  let scrSpans = [];

  function activeDisplay(t) {
    let idx = -1;
    for (let i = 0; i < chart.display.length; i++) {
      if (chart.display[i].startBeat * chart.spb <= t + 0.05) idx = i;
      else break;
    }
    return idx;
  }

  function buildScript(idx) {
    scrSpans = [];
    scrLine.innerHTML = "";
    if (idx < 0) { scrWho.textContent = ""; return; }
    const d = chart.display[idx];
    scrWho.textContent = d.who === "both" ? "两人" : (d.who === "her" ? "朱里" : "和臣");
    scrWho.dataset.who = d.who;
    for (const c of d.chunks) {
      const s = document.createElement("span");
      s.textContent = c.text;
      s.dataset.note = c.noteId;
      s.dataset.lane = c.lane;
      scrLine.appendChild(s);
      scrSpans.push({ el: s, note: c.noteId, lane: c.lane, cls: "" });
    }
  }

  function syncScript(t) {
    const idx = activeDisplay(t);
    if (idx !== scrIdx) { scrIdx = idx; buildScript(idx); }
    if (idx < 0) return;
    const d = chart.display[idx];
    const rescued = rhythm.state.rescued;
    for (const sp of scrSpans) {
      const n = noteById.get(sp.note);
      let cls;
      if (!n) cls = "";
      else if (n.judged) {
        if (n.result === "miss") {
          cls = rescued.indexOf(n.id) >= 0 ? "covered" : "missed";
        } else {
          cls = (n.heldRatio != null && n.heldRatio < 0.85) ? "partial" : "done";
        }
      } else if (n.time <= t) {
        cls = "now";
      } else {
        cls = "wait";
      }
      if (cls !== sp.cls) {
        if (sp.cls) sp.el.classList.remove(sp.cls);
        if (cls) sp.el.classList.add(cls);
        sp.cls = cls;
      }
    }
    // 当前这一行说完了，把整行压暗一点，视线才会往下走
    scrLine.classList.toggle("past", d.endBeat * chart.spb < t - 0.2);
  }

  // ---------------------------------------------------------------- 流程

  function startIntro() {
    sc.state = "intro";
    sc.t = 0;
    sc.walk = 0;
    sc.cam.z = 1.55;
    sc.cam.x = 256;
    sc.cam.y = 150;
    el("loading").classList.remove("show");
    el("script").classList.remove("show");
    if (FROM_BRIDGE) {
      sc.walk = 1;
      sc.doorOpen = 1;
      sc.veil = 0;
      sc.cam.z = 1;
      sc.cam.tz = 1;
      sc.cam.x = sc.cam.tx = 256;
      sc.cam.y = sc.cam.ty = 144;
      setTimeout(() => lines([
        ["朱里", "先试试声音吧。"],
        ["和臣", "好。"]
      ], startCheck), 180);
      return;
    }
    setTimeout(() => {
      sc.doorOpen = 1;
      sc.walk = 0.001;
    }, 700);
    setTimeout(() => {
      lines([
        ["旁白", "我坐在左边的麦克风前。门开了，朱里拿着稿子走进来。"],
        ["朱里", "你先到了啊。稿子我带来了。"],
        ["和臣", "嗯，先试试声音？"],
        ["朱里", "好，跟着滴答声来。"]
      ], startCheck);
    }, 1500);
  }

  function startCheck() {
    sc.state = "check";
    audio.unlock().then(() => {
      sc.check = {
        start: audio.now() + 1.1,
        need: 8,
        total: 12,
        taps: []
      };
      // 节拍器：只在试音这一段响，一拍一下，第一下重音
      const c = sc.check;
      for (let i = 0; i < c.total; i++) {
        audio.metronome(c.start + i * audio.SPB, i % 4 === 0);
      }
      toast("跟着滴答按空格", "#f4ecdd");
    });
  }

  function tapCheck() {
    const c = sc.check;
    if (!c) return;
    const t = audio.now() - c.start;
    if (t < -0.3) return;
    const phase = ((t % audio.SPB) + audio.SPB) % audio.SPB;
    const delta = phase > audio.SPB / 2 ? phase - audio.SPB : phase;
    c.taps.push(delta);
    audio.click(audio.now());
    if (c.taps.length >= c.need) finishCheck();
  }

  function finishCheck() {
    const c = sc.check;
    sc.check = null;
    if (c && c.taps.length >= 4) {
      const sorted = c.taps.slice().sort((a, b) => a - b);
      const med = sorted[Math.floor(sorted.length / 2)];
      audio.setOffsetMs(Math.round(med * 1000));
      writeSave({ offset: audio.offsetMs() });
    }
    startReady();
  }

  function startReady() {
    sc.state = "ready";
    sc.walk = 1;
    dlg = null;
    dlgEl.classList.remove("show");
    sc.readyT = 0;
    sc.cam.tz = 1;
    sc.cam.tx = 256;
    sc.cam.ty = 144;
    audio.startSong(3.15);
    rhythm.reset();
    el("hud").classList.add("show");
    el("script").classList.add("show");
    scrIdx = -1;
    setTimeout(() => { sc.onAir = 1; audio.click(audio.now()); }, 300);
  }

  function startPlay() {
    sc.state = "play";
    sc.playElapsed = 0;
    global.dispatchEvent(new CustomEvent("broadcast:start", { detail: { chart } }));
  }

  function startFinale() {
    sc.state = "finale";
    sc.finaleT = 0;
    fx.length = 0;
    audio.setMusic(false);
    setTimeout(() => {
      audio.stopSong();
      sc.onAir = 0;
      audio.click(audio.now());
    }, 500);
    // 镜头推近她：她放下稿纸，看向你
    sc.cam.tz = 1.9;
    sc.cam.tx = GIRL_AT.x;
    sc.cam.ty = 165;
    setTimeout(() => {
      const st = sc.finishStats || rhythm.stats();
      lines([
        ["朱里", "……完了。"],
        ["我", "完了。"],
        ["朱里", "中间你漏了一句。"],
        ["我", "你补上了。"],
        ["朱里", "我补上了。"],
        ["朱里", "下次别漏。"]
      ], () => showCard(st));
    }, 1600);
  }

  function showCard(st) {
    sc.state = "done";
    const card = el("card");
    el("rank").textContent = st.rank;
    el("stat").textContent =
      "准确率 " + Math.round(st.accuracy * 100) + "%　最高连击 " + st.combo +
      "　她补位 " + st.rescues + " 次";
    el("score2").textContent = String(st.score);
    card.classList.add("show");
    el("script").classList.remove("show");
    const prev = SAVE.best || 0;
    if (st.score > prev) writeSave({ best: st.score });
    writeSave({ cleared: true });
    global.dispatchEvent(new CustomEvent("broadcast:finish", { detail: st }));
  }

  function startLeave() {
    if (sc.state === "leave" || sc.state === "done") return;
    sc.state = "leave";
    sc.leaveT = 0;
    audio.stopSong();
    el("script").classList.remove("show");
    el("dlg").classList.remove("show");
    dlg = null;
    setTimeout(() => {
      el("bye").classList.add("show");
      sc.byeShown = true;
    }, 700);
    global.dispatchEvent(new CustomEvent("broadcast:leave", {}));
  }

  /** 接着听 = 从头重录一遍。音游没法从半句中间接上：
   *  谱面是按音频时钟排的，中途插进去只能把前面全判成漏，
   *  而「漏了半场」的结算比「重来一次」更难看。 */
  function resumePlay() {
    el("bye").classList.remove("show");
    sc.byeShown = false;
    if (sc.finished) { showCard(sc.finishStats || rhythm.stats()); return; }
    sc.playEndT = 0;
    rhythm.reset();
    sc.cam.tz = 1; sc.cam.tx = 256; sc.cam.ty = 144;
    startReady();
  }

  // ---------------------------------------------------------------- 输入

  let holding = false;

  function press() {
    if (sc.state === "check") { tapCheck(); return; }
    if (sc.state !== "play") return;
    const r = rhythm.press(audio.songTime());
    if (r) { /* 音效在 rhythm 里放了 */ }
  }
  function release() {
    if (sc.state !== "play") return;
    rhythm.release(audio.songTime());
  }

  window.addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    if (e.key === "Escape") {
      e.preventDefault();
      if (sc.state === "done") return;
      startLeave();
      return;
    }
    if (dlg && (e.key === "Enter" || e.key === " " || k === "e")) {
      e.preventDefault();
      advance();
      return;
    }
    if (sc.state === "check" && (e.key === "Enter")) {
      e.preventDefault();
      finishCheck();
      return;
    }
    if (e.key === " " || k === "f" || k === "j") {
      e.preventDefault();
      if (e.repeat) return;
      if (!holding) { holding = true; press(); }
      return;
    }
  });

  window.addEventListener("keyup", (e) => {
    const k = e.key.toLowerCase();
    if (e.key === " " || k === "f" || k === "j") {
      holding = false;
      release();
    }
  });

  canvas.addEventListener("pointerdown", (e) => {
    if (sc.state === "intro" && dlg) { advance(); return; }
    if (sc.state === "check") { tapCheck(); return; }
    if (sc.state === "play") { press(); }
  });
  canvas.addEventListener("pointerup", () => { if (sc.state === "play") release(); });

  // ---------------------------------------------------------------- 循环

  let last = 0;

  function update(dt) {
    sc.t += dt;

    if (sc.veil > 0) sc.veil = Math.max(0, sc.veil - dt * 1.6);
    if (flashT > 0) flashT = Math.max(0, flashT - dt);
    if (toastT > 0) toastT = Math.max(0, toastT - dt);
    vu.her = Math.max(0, vu.her - dt * 2.6);
    vu.me = Math.max(0, vu.me - dt * 2.6);
    if (sc.state === "play") {
      sc.laneFade = Math.min(1, sc.laneFade + dt * 2.2);
    } else if (sc.state === "finale" || sc.state === "done") {
      // 灯灭了，轨道就该收掉——不然两条半透明的柱子会从她身上穿过去
      sc.laneFade = Math.max(0, sc.laneFade - dt * 1.6);
    }

    // 她走进来
    if (sc.state === "intro" && sc.walk > 0 && sc.walk < 1) {
      sc.walk = Math.min(1, sc.walk + dt / 1.7);
    }
    // 镜头缓动
    const c = sc.cam;
    const k = 1 - Math.pow(0.0025, dt);
    c.z += (c.tz - c.z) * k;
    c.x += (c.tx - c.x) * k;
    c.y += (c.ty - c.y) * k;

    // 对白打字
    if (dlg) {
      dlg.t += dt;
      const target = Math.min(dlg.text.length, Math.floor(dlg.t * 28));
      if (target > dlg.shown) {
        dlg.shown = target;
        dlgLine.textContent = dlg.text.slice(0, dlg.shown);
      }
    }

    if (sc.state === "ready") {
      sc.readyT += dt;
      if (sc.readyT >= 3.05) startPlay();
    }

    // 试音：节拍器走完还没按满 8 下，就拿现有的几下算。
    // 不这么兜底的话，少按一下会永远卡在试音这一步。
    if (sc.state === "check" && sc.check) {
      const c = sc.check;
      if (audio.now() > c.start + c.total * audio.SPB + 1.2) finishCheck();
    }

    if (sc.state === "play") {
      const t = audio.songTime();
      sc.playElapsed = (sc.playElapsed || 0) + dt;
      rhythm.update(t);
      syncScript(t);
      if (rhythm.state.finished) {
        sc.playEndT = (sc.playEndT || 0) + dt;
        if (sc.playEndT > 1.1) startFinale();
      }
    }

    if (sc.state === "finale") sc.finaleT += dt;
  }

  function loop(ts) {
    const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0;
    last = ts;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  // ---------------------------------------------------------------- 对外

  el("leave").onclick = () => startLeave();
  el("quit").onclick = () => { writeSave({ cleared: !!sc.finished }); location.href = BACK; };
  el("resume").onclick = () => resumePlay();
  el("again").onclick = () => {
    el("card").classList.remove("show");
    sc.finished = false;
    sc.playEndT = 0;
    sc.finalT = 0;
    rhythm.reset();
    sc.cam.tz = 1; sc.cam.tx = 256; sc.cam.ty = 144;
    startReady();
  };
  el("out").onclick = () => { location.href = new URL("../act4/after-broadcast/index.html?from=broadcast", location.href).href; };

  global.__bc = {
    audio, chart, rhythm, scene: sc,
    state: () => ({
      state: sc.state,
      t: audio.songTime(),
      onAir: sc.onAir,
      walk: sc.walk,
      score: rhythm.state.score,
      combo: rhythm.state.combo,
      counts: rhythm.state.counts,
      rescues: rhythm.state.rescues,
      finished: rhythm.state.finished,
      offsetMs: audio.offsetMs(),
      cam: { x: +sc.cam.x.toFixed(1), y: +sc.cam.y.toFixed(1), z: +sc.cam.z.toFixed(3) }
    }),
    press, release, advance, startLeave, resumePlay,
    stats: () => rhythm.stats(),
    // 自检用：直接跳到某个状态
    _skipToPlay() { sc.walk = 1; sc.veil = 0; sc.onAir = 1; startReady(); sc.readyT = 3.05; },
    _finishCheck() { finishCheck(); },
    // 跳到某一秒（演示和截图用）
    _seek(t) { audio.seek(t); rhythm.skipTo(t); sc.playElapsed = 30; }
  };

  if (FRESH) {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) { }
  }
  audio.setOffsetMs(SAVE.offset || 0);

  requestAnimationFrame(loop);
  startIntro();
})(window);
