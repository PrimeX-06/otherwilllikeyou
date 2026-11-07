/* 第二幕 · 黑板报 — 她怎么帮忙
 *
 * 四条硬约束（设计文档第 4 节）：
 *   1. 她做什么由玩家的笔迹决定，不是定时播放；
 *   2. 她只在自己的图层画，只落在空白处，永不擦除；
 *   3. 不用玩家点「帮我」，她自己动手；
 *   4. 最后是同一件作品——她的笔和玩家的笔在同一个导出 PNG 里。
 *
 * 所以这里没有「好感度」，也没有随机播台词。每一句话都对应一次看得见的行为。
 */
(function (global) {
  "use strict";

  const STATE = { IDLE: "idle", WATCH: "watch", ASSIST: "assist", COOLDOWN: "cooldown" };

  const CFG = {
    watchDelay: [3.0, 6.0],     // 看多久才决定动手
    cooldown: [9.0, 13.0],      // 一次辅助之后的冷却
    nudgeIdle: 4.0,             // 玩家停手多久她开口
    nudgeGap: 12.0,             // 两次开口的间隔
    maxAssists: 6,              // 全局上限，防止她替玩家画完
    speed: 340,                 // 她落笔的速度（点/秒），看得见但不用等
    maxPoints: 460,             // 单次辅助的落笔量上限
    clearance: 0.06,            // 一块地方玩家笔迹低于这个比例才算「空」
    block: 24,                  // 空白检查的块大小

    // 主图填色（像素级）。她不画线，照画稿的 2px 格子一格一格涂。
    // 一次就把整幅涂完（约 1700 格，两秒左右扫下来），不然填到一半主图就达标了，
    // 画面上会留一块没涂完的头发。
    fillChunk: 2400,            // 上限，实际就是「剩下的全填」
    fillSpeed: 900,             // 每秒填多少格，比落笔快，像在「刷」一片
    fillGate: 0.006,            // 玩家在主图区画够这么多，她才开始帮忙填
    fillW: 3,                   // 每一格画多大，3px 才能盖住 2px 的格子不留缝
    fillColor: "#d9d2c2",       // 暖白偏灰：像用粉笔侧面擦出来的一片，不是刷漆
    fillAlpha: 0.3              // 相邻格子会叠一次，叠出来约 0.5，比她画的线暗一档
  };

  // 她会往装饰区添的图案。都挑 16×16 那批（放大一倍是 32px），
  // 48px 的角花太大，会压到底边框上。
  const DECO_PATTERNS = ["flower", "star", "leaf", "heart", "note", "cloud", "snow", "balloon"];
  const DECO_COLORS = ["#c9d8b8", "#efaab4", "#f6db9e", "#9acbdf"];

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pickOne(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function ease(t) { return 1 - Math.pow(1 - t, 3); }

  function create(board, opts) {
    const say = (opts && opts.say) || function () {};
    const onChalk = (opts && opts.onChalk) || function () {};
    const onAssist = (opts && opts.onAssist) || function () {};
    const pick = global.ACT2.Lines.pick;

    const s = {
      state: STATE.IDLE,
      t: 0,                 // 当前状态停留时间
      watchFor: rnd(CFG.watchDelay[0], CFG.watchDelay[1]),
      cooldown: 2.5,        // 开局先看一会儿，别一上来就抢
      idle: 0,              // 玩家停手时长
      assists: 0,
      nudgedAt: -99,
      streak: 0,            // 玩家连续用同一支粉笔的次数
      lastColor: -1,
      saidFirst: false,
      kind: null,           // frame / deco / tidy / dots
      queue: [],
      qi: 0,
      pos: 0,
      drawn: 0,
      deco: null,           // 正在「画」的那个图案 uid
      tidy: null,           // 正在挪的那个图案 { uid, from, to }
      dur: 0,
      elapsed: 0,
      active: false,
      filled: new Set()     // 已经填过的格子（ghostInk 的下标），重开一块板才清空
    };

    // ------------------------------------------------------------ 计划

    /** 最该补的那条边：覆盖率最低且不达标。 */
    function worstEdge(r) {
      const need = board.NEED.edge;
      let worst = null;
      for (const k in r.frame.edges) {
        if (r.frame.edges[k] >= need) continue;
        if (!worst || r.frame.edges[k] < r.frame.edges[worst]) worst = k;
      }
      return worst;
    }

    /** 一条边上「玩家没画到」的连续区段，只在这些地方补。 */
    function frameOps(edge) {
      const e = board.EDGES[edge];
      const ops = [];
      const horizontal = e.axis === "x";
      const from = horizontal ? e.x + 10 : e.y + 10;
      const to = horizontal ? e.x + e.w - 10 : e.y + e.h - 10;
      const fixed = horizontal
        ? e.y + e.h / 2
        : e.x + e.w / 2;

      let run = [];
      const flush = () => {
        if (run.length >= 3) ops.push(run);
        run = [];
      };

      for (let i = from; i < to; i += 4) {
        const box = horizontal
          ? { x: i - 3, y: e.y, w: 6, h: e.h }
          : { x: e.x, y: i - 3, w: e.w, h: 6 };
        const clean = !board.assist.hasInk(box) &&
          board.assist.playerDensity(box) <= CFG.clearance;
        if (clean) {
          const wob = (Math.random() - 0.5) * 2.2;
          run.push(horizontal ? [i, fixed + wob] : [fixed + wob, i]);
        } else {
          flush();
        }
      }
      flush();
      return ops;
    }

    /** 装饰区里给她自己找一个空位：离已有图案越远越好。 */
    function decoSpot(half) {
      const band = board.REGION.deco;
      const cy = band.y + band.h / 2;
      const decos = board.assist.decos();
      const cands = [];
      for (let x = band.x + half + 8; x <= band.x + band.w - half - 8; x += 10) {
        const box = { x: x - half - 3, y: cy - half - 3, w: half * 2 + 6, h: half * 2 + 6 };
        if (box.y < 0 || box.y + box.h > board.BH) continue;
        if (board.assist.hasInk(box)) continue;
        let near = 999;
        for (const d of decos) {
          near = Math.min(near, Math.hypot(d.x - x, d.y - cy));
        }
        cands.push({ x, y: cy, near });
      }
      if (!cands.length) return null;
      cands.sort((a, b) => b.near - a.near);
      // 从最空的三个里随机挑，不然每次都在同一个地方
      return pickOne(cands.slice(0, 3));
    }

    /**
     * 修正。只在两种情况下动手，而且都只挪「图案对象」，不碰玩家的笔迹：
     *   1. 两个图案挤在一起，挪开后放的那个；
     *   2. 图案有一半压到主图区里去了，把它推进装饰格子。
     * 每个对象只修一次（d.fixed），免得她来回折腾同一朵花。
     */
    function findFix() {
      const decos = board.assist.decos();
      if (decos.length < 1) return null;

      for (let i = 0; i < decos.length; i++) {
        for (let j = i + 1; j < decos.length; j++) {
          const a = decos[i], b = decos[j];
          if (a.fixed || b.fixed) continue;
          const ha = board.assist.half(a), hb = board.assist.half(b);
          const ox = ha + hb - Math.abs(a.x - b.x);
          const oy = ha + hb - Math.abs(a.y - b.y);
          if (ox <= 0 || oy <= 0) continue;
          const small = Math.min(ha, hb) * 2;
          if ((ox * oy) / (small * small) < 0.3) continue;
          const dir = b.x >= a.x ? 1 : -1;
          const tx = clamp(a.x + dir * (ha + hb + 14), hb + 2, board.BW - hb - 2);
          if (Math.abs(tx - b.x) < 2) continue;
          return { kind: "tidy", uid: b.uid, from: { x: b.x, y: b.y }, to: { x: tx, y: b.y } };
        }
      }

      const band = board.REGION.deco;
      for (const d of decos) {
        if (d.fixed) continue;
        const half = board.assist.half(d);
        // 只处理「放在装饰带里、但上半截伸进主图」的；四角的不算错
        if (d.y < band.y - 8 || d.y > band.y + band.h) continue;
        if (d.y - half >= band.y) continue;
        const ty = band.y + half + 1;
        if (ty > board.BH - half) continue;
        return { kind: "tidy", uid: d.uid, from: { x: d.x, y: d.y }, to: { x: d.x, y: ty } };
      }
      return null;
    }

    /**
     * 主图：照画稿的格子填色。
     *
     * 她不是另起一笔去画那个人，而是把画稿上「有粉笔」的格子一格一格涂满——
     * 像素级填色，正好填进玩家描好的轮廓里。所以这里既没有折线也没有笔顺，
     * 只有一张坐标表；填过的记在 s.filled 里，下次接着往下填。
     *
     * 两个门槛：主图已经达标就不填了；玩家还没在主图区动过笔也不填——
     * 她只帮忙填，不替你起头。
     */
    function fillTask() {
      const cells = board.ghostInk();
      if (!cells || !cells.length) return null;
      const r = board.regions();
      // 已经够密了就不用再涂：达标是一种，被别人的笔迹铺满也算
      if (r.main.done || r.main.cover >= board.NEED.mainCover) return null;
      if (r.main.cover < CFG.fillGate) return null;

      const todo = [];
      for (let i = 0; i < cells.length && todo.length < CFG.fillChunk; i++) {
        if (s.filled.has(i)) continue;
        const c = cells[i];
        if (board.assist.playerNear(c[0], c[1], 2)) continue;   // 玩家画过的地方不动
        todo.push([i, c[0], c[1]]);
      }
      if (!todo.length) return null;
      return { kind: "fill", cells: todo };
    }

    /** 主图区下缘点几颗星。 */
    function dotsOps() {
      const y = board.REGION.main.y + board.REGION.main.h - 10;
      const ops = [];
      for (let i = 0; i < 3; i++) {
        const x = 60 + Math.random() * (board.BW - 120);
        const box = { x: x - 8, y: y - 8, w: 16, h: 16 };
        if (board.assist.playerDensity(box) > CFG.clearance) continue;
        if (board.assist.hasInk(box)) continue;
        ops.push([[x - 4, y], [x, y - 5], [x + 4, y], [x, y + 5], [x - 4, y]]);
      }
      return ops;
    }

    function plan() {
      const r = board.regions();
      if (!r.frame.done) {
        const e = worstEdge(r);
        if (e) {
          const ops = frameOps(e);
          if (ops.length) return { kind: "frame", ops };
        }
      }
      // 修正排在补图案前面：已经摆歪的先扶正，再谈添新的
      const fix = findFix();
      if (fix) return fix;

      // 主图填色排在补图案前面：玩家一描出轮廓就先帮他把人涂起来，
      // 这块是整张板的正中间，比多放一朵花要紧
      if (!r.main.done) {
        const t = fillTask();
        if (t) return t;
      }

      if (r.deco.stamps < board.NEED.decoStamps) {
        const pid = pickOne(DECO_PATTERNS);
        const pat = board.PAT.BY_ID[pid];
        if (pat) {
          const half = (pat.size * (pat.scale || 2)) / 2;
          const spot = decoSpot(half);
          if (spot) {
            return { kind: "deco", pid, x: spot.x, y: spot.y, color: pickOne(DECO_COLORS) };
          }
        }
      }

      if (r.main.done) {
        const ops = dotsOps();
        if (ops.length) return { kind: "dots", ops };
      }
      return null;
    }
    // ------------------------------------------------------------ 落笔

    function densify(pts, color) {
      const out = [];
      for (let i = 1; i < pts.length; i++) {
        const [x0, y0] = pts[i - 1];
        const [x1, y1] = pts[i];
        const len = Math.hypot(x1 - x0, y1 - y0);
        const steps = Math.max(1, Math.ceil(len));
        for (let k = 0; k < steps; k++) {
          const t = k / steps;
          out.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, color]);
        }
      }
      return out;
    }

    function startAssist(task) {
      s.state = STATE.ASSIST;
      s.t = 0;
      s.queue = [];
      s.qi = 0;
      s.pos = 0;
      s.drawn = 0;
      s.elapsed = 0;
      s.active = true;
      s.kind = task.kind;
      board.assist.snapshot();

      // 放一个图案：先落在 0 透明度，再从上往下一格格「画」出来
      if (task.kind === "deco") {
        const d = board.assist.placeDeco(task.pid, task.x, task.y, task.color);
        if (!d) { finishAssist(); return; }
        s.deco = d.uid;
        s.dur = 0.8;
        return;
      }
      // 修正：把图案从原位置平滑挪到新位置
      if (task.kind === "tidy") {
        s.tidy = { uid: task.uid, from: task.from, to: task.to };
        s.dur = 0.7;
        return;
      }

      // 主图填色：队列里是 [格子下标, x, y]，一格一格涂
      if (task.kind === "fill") {
        s.queue = task.cells;
        s.dur = 0;
        return;
      }

      const color = task.kind === "frame" ? "#f4ecdd" : "#f6db9e";
      for (const op of task.ops) {
        const dense = densify(op, color);
        for (const p of dense) s.queue.push(p);
      }
    }

    function stepAssist(dt) {
      if (!s.active) return;

      if (s.kind === "deco") {
        s.elapsed += dt;
        const k = Math.min(1, s.elapsed / s.dur);
        board.assist.reveal(s.deco, ease(k));
        if (k >= 1) finishAssist();
        return;
      }

      if (s.kind === "tidy") {
        s.elapsed += dt;
        const k = ease(Math.min(1, s.elapsed / s.dur));
        const f = s.tidy.from, t = s.tidy.to;
        board.assist.move(s.tidy.uid, f.x + (t.x - f.x) * k, f.y + (t.y - f.y) * k);
        if (k >= 1) finishAssist();
        return;
      }

      // 填色：按格子下标一格一格涂，不看 maxPoints（那是给描线用的）
      if (s.kind === "fill") {
        const budget = Math.min(CFG.fillSpeed * dt, s.queue.length - s.pos);
        const end = Math.min(s.queue.length, Math.floor(s.pos + budget));
        for (let i = Math.floor(s.pos); i < end; i++) {
          const c = s.queue[i];
          // 每一格浓淡不一样，整片才不会像一块刷上去的色板
          const a = CFG.fillAlpha * (0.72 + Math.random() * 0.56);
          board.assist.dot(c[1], c[2], { color: CFG.fillColor, w: CFG.fillW, alpha: a });
          s.filled.add(c[0]);
          s.drawn++;
        }
        s.pos = end;
        if (s.pos >= s.queue.length) finishAssist();
        return;
      }

      // 到了上限就收尾。以前这里直接 return，她会停在 ASSIST 状态里一直画下去。
      if (s.drawn >= CFG.maxPoints || s.pos >= s.queue.length) { finishAssist(); return; }
      const budget = Math.min(CFG.speed * dt, CFG.maxPoints - s.drawn);
      if (budget <= 0) { finishAssist(); return; }
      const end = Math.min(s.queue.length, Math.floor(s.pos + budget));
      for (let i = Math.floor(s.pos); i < end; i++) {
        const p = s.queue[i];
        if (Math.random() < 0.1) continue;
        board.assist.dot(p[0], p[1], { color: p[2], w: 2, alpha: 0.8 });
        s.drawn++;
      }
      s.pos = end;
      if (s.pos >= s.queue.length || s.drawn >= CFG.maxPoints) finishAssist();
    }

    function finishAssist() {
      s.active = false;
      // 修完的对象打个记号，免得她过一会儿又去动同一朵花
      if (s.kind === "tidy" && s.tidy) {
        const d = board.assist.decos().find((q) => q.uid === s.tidy.uid);
        if (d) d.fixed = true;
      }
      board.assist.settle();
      s.assists++;
      s.state = STATE.COOLDOWN;
      s.t = 0;
      s.cooldown = rnd(CFG.cooldown[0], CFG.cooldown[1]);
      if (s.kind === "frame") say(pick("frame"));
      else if (s.kind === "deco") say(pick("deco"));
      else if (s.kind === "tidy") say(pick("tidy"));
      else if (s.kind === "dots") say(pick("dots"));
      else if (s.kind === "fill") say(pick("fill"));
      onAssist(s.kind);
    }

    // ------------------------------------------------------------ 外部事件

    /** 玩家落笔（每次 pointerdown 一次）。 */
    function noteStroke(colorIndex) {
      s.idle = 0;
      if (s.state === STATE.IDLE) {
        s.state = STATE.WATCH;
        s.t = 0;
        s.watchFor = rnd(CFG.watchDelay[0], CFG.watchDelay[1]);
      }
      if (!s.saidFirst) {
        s.saidFirst = true;
        setTimeout(() => say(pick("first")), 600);
      }
      if (colorIndex === s.lastColor) {
        s.streak++;
        if (s.streak >= 3 && s.state !== STATE.ASSIST && s.cooldown <= 0) {
          s.streak = 0;
          s.cooldown = 12;
          onChalk(colorIndex);
          say(pick("chalk"));
        }
      } else {
        s.streak = 1;
        s.lastColor = colorIndex;
      }
    }

    function noteErase() {
      if (s.state === STATE.ASSIST) return;
      s.idle = 0;
      if (Math.random() < 0.55) say(pick("erase"));
    }

    function noteIdle() { s.idle += 1; }

    // ------------------------------------------------------------ 主循环

    function update(dt, info) {
      s.t += dt;
      s.cooldown = Math.max(0, s.cooldown - dt);

      if (s.state === STATE.ASSIST) {
        stepAssist(dt);
        return;
      }

      if (info && info.drawing) s.idle = 0;
      else s.idle += dt;

      if (s.state === STATE.IDLE) {
        if (info && info.drawing) { s.state = STATE.WATCH; s.t = 0; }
        return;
      }

      if (s.state === STATE.COOLDOWN) {
        if (s.t >= s.cooldown) { s.state = STATE.WATCH; s.t = 0; s.watchFor = rnd(CFG.watchDelay[0], CFG.watchDelay[1]); }
        return;
      }

      // WATCH：看够了再决定
      if (s.cooldown > 0) return;
      if (s.assists >= CFG.maxAssists) {
        if (s.idle > CFG.nudgeIdle && s.t - s.nudgedAt > CFG.nudgeGap) {
          s.nudgedAt = s.t;
          say(pick("nudge"));
        }
        return;
      }
      if (s.t < s.watchFor) return;

      const task = plan();
      if (task) {
        startAssist(task);
      } else {
        if (s.idle > CFG.nudgeIdle && s.t - s.nudgedAt > CFG.nudgeGap) {
          s.nudgedAt = s.t;
          say(pick("nudge"));
        }
        s.t = s.watchFor * 0.7; // 别每帧重算
      }
    }

    return {
      STATE, CFG,
      update, noteStroke, noteErase,
      /** 玩家撤销/重开时把她这一笔也停掉——否则她会在恢复后的画布上接着画。 */
      cancel() {
        if (!s.active) return;
        // 放到一半的图案别留半截：要么画完，要么撤销时跟快照一起没
        if (s.kind === "deco" && s.deco != null) board.assist.reveal(s.deco, 1);
        // 撤销会把整笔连快照一起撤掉，填过的格子得一起忘掉，否则那一片永远是空的
        if (s.kind === "fill") s.filled.clear();
        s.active = false;
        s.queue = [];
        s.state = STATE.COOLDOWN;
        s.t = 0;
        s.cooldown = rnd(CFG.cooldown[0], CFG.cooldown[1]);
      },
      /** 重开一块新板：次数、冷却、连续同色的计数都归零。 */
      reset() {
        s.active = false;
        s.queue = [];
        s.kind = null;
        s.deco = null;
        s.tidy = null;
        s.elapsed = 0;
        s.filled.clear();
        s.state = STATE.IDLE;
        s.t = 0;
        s.cooldown = 2.0;
        s.assists = 0;
        s.streak = 0;
        s.lastColor = -1;
        s.saidFirst = false;
        s.idle = 0;
        s.nudgedAt = -99;
      },
      get state() { return s.state; },
      get assists() { return s.assists; },
      get active() { return s.active; },
      /** 测试用：强制触发一次辅助（不管冷却） */
      force() {
        const task = plan();
        if (task) startAssist(task);
        return task ? task.kind : null;
      },
      /** 测试用 */
      skipCooldown() { s.cooldown = 0; s.state = STATE.WATCH; s.t = 99; }
    };
  }

  global.ACT2 = global.ACT2 || {};
  global.ACT2.Girl = { create, CFG, STATE };
})(window);
