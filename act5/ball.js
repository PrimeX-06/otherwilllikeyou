/* G04《体育活动》— 足球传接
 *
 * 用户定的球类：足球。附带一条更重要的设定：**女生不大会踢球**。
 * 所以这里不是一场比赛，也不是体育课测验，只是放学后三个人在楼前空地上
 * 把球来回推。由此推出四条硬规矩：
 *
 *  1. 只踢地滚球，不射门、不抛物线、不计分、没有输赢。
 *     球沿地面从一人的脚边滚到另一人的脚边，「深度」靠三个人站不同的 y 假装。
 *  2. 她的传球慢一点、会踢歪（wobble），歪了就说一句「啊，歪了」。
 *     闺蜜也不是高手，偶尔同样会偏。没有谁被嘲笑，也没人纠正谁。
 *  3. 传给她的球不能太用力：力度超出她能停住的范围，球就从脚边滚走，
 *     有人去捡回来，继续。力度条上那一段「舒服区」就是这么来的。
 *  4. NPC 会自己决定传给谁，而且会互相传（npcToNpc）。球不能永远冲着玩家来。
 *
 * 设计稿第 6 章的五个阶段：教学接球 → 选目标 → 累计 5 次有效传接 →
 * 换位置 / 改方向 → 自然结束休息。失误不进失败画面，球滚开、NPC 走过去捡。
 * 对白只在开头和结尾用完整对白框；球在飞的时候只有头顶短气泡。
 *
 * 为什么玩家不移动：设计稿写的是「控制移动**或**传球方向」。
 * 横版走廊素材没有纵深可走，A/D 留给选人更清楚；接球靠时机，不靠跑位。
 */
(function (global) {
  "use strict";

  const D = global.DAILY;
  D.games = D.games || {};

  const W = D.W, H = D.H;
  const TAU = Math.PI * 2;

  // 接球窗口：设计稿 6.7 给的初始测试值，单位毫秒。
  // 传接只需要「球到脚边时按一下」，不做严格 QTE。
  const CFG = {
    target: 5,                 // 累计有效传接（不要求连续）
    good: 120, ok: 260, late: 400,
    sweet: [0.16, 0.82],       // 力度舒服区
    girlSweet: [0.18, 0.66],   // 传给她要更轻：她停不住大力球
    minPower: 0.13,            // 再轻就滚不到人跟前
    xMin: 40, xMax: 472
  };

  const NAME = { boy: "我", girl: "朱里", friend: "闺蜜" };

  // 松散三角形：她俩靠后、玩家靠前。y 差 30px 就是「前后」，
  // depthScale 再给 0.92–1.06 的缩放，不去做一套和现有美术打架的俯视图。
  function makeActors() {
    return {
      boy:    { key: "boy",    x: 256, y: 240, tx: 256, dir: 1,  moving: false, phase: 0,   scale: 1 },
      girl:   { key: "girl",   x: 150, y: 210, tx: 150, dir: 1,  moving: false, phase: 0.4, scale: 1 },
      friend: { key: "friend", x: 370, y: 216, tx: 370, dir: -1, moving: false, phase: 0.9, scale: 1 }
    };
  }

  // 自己写的伪随机：整局可复现，自检才不会时灵时不灵。
  function makeRnd(seed) {
    let s = seed >>> 0;
    return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  }

  // 触控按钮按住时当作空格。模块级一份就够——同一时刻只可能有一个球赛在跑。
  let touchHeld = false;
  window.addEventListener("pointerup", function () { touchHeld = false; });
  window.addEventListener("pointercancel", function () { touchHeld = false; });

  D.games.ball = function (host) {
    const A = makeActors();
    const rnd = makeRnd(20261107);

    const el = {
      hud: document.getElementById("bgHud"),
      count: document.getElementById("bgCount"),
      tip: document.getElementById("bgTip"),
      ctl: document.getElementById("bgCtl"),
      act: document.getElementById("bgAct"),
      toGirl: document.getElementById("bgToGirl"),
      toFriend: document.getElementById("bgToFriend")
    };

    let state = "intro";        // intro | play | rest | done
    let frozen = false;
    let clock = 0;
    let rally = 0, misses = 0, npcToNpc = 0;
    let finishing = false;
    let shifted = false;

    const ball = { holder: "friend", x: 380, y: 213, phase: "held", spin: 0, looseFrom: 0, looseX: 0, looseT: 0 };
    let pass = null;            // 飞行中的传球
    let fetcher = null;
    let holdT = 0.9;            // NPC 拿球后停顿多久再传

    let selected = "girl";
    let charging = false, armed = true, chargeT = 0, power = 0.34, lastPower = 0;
    let bubbles = [];
    let logs = [];              // 「发生过什么」，给结果和自检看
    let npcTargets = [];        // NPC 自己发起的传球都记下来，防止只传玩家
    let kickCount = { boy: 0, girl: 0, friend: 0 };
    let lastGot = { boy: -9, girl: -9, friend: -9 };
    let tipText = "";

    function spaceHeld() { return !!D.keys[" "] || touchHeld; }

    // ---------------------------------------------------------------- 短气泡

    /** 球在飞的时候只许有这种一句话气泡，不能弹完整对白框。 */
    function bark(who, text, ms) {
      bubbles = bubbles.filter((b) => b.who !== who);
      bubbles.push({ who: who, text: text, t: 0, dur: (ms || 1000) / 1000 });
    }

    function updateBubbles(dt) {
      for (const b of bubbles) b.t += dt;
      bubbles = bubbles.filter((b) => b.t < b.dur);
    }

    // ---------------------------------------------------------------- 球

    function giveBall(who, delay) {
      ball.holder = who;
      ball.phase = "held";
      pass = null;
      fetcher = null;
      const a = A[who];
      a.tx = a.x;
      a.moving = false;
      ball.x = a.x + (a.dir > 0 ? 10 : -10);
      ball.y = a.y - 3;
      holdT = delay == null ? (who === "boy" ? 0 : 0.72 + rnd() * 0.34) : delay;
      lastGot[who] = clock;
      if (who === "boy") {
        armed = !spaceHeld();   // 接球那一下按着的空格，不许顺手变成蓄力
        charging = false;
        chargeT = 0;
        power = 0.34;
      }
    }

    /** 球从谁脚下滚到谁脚下。control=false 表示接的人停不住，会滚开。 */
    function kick(from, to, p, wobble, byNpc) {
      const a = A[from], b = A[to];
      const dir = b.x >= a.x ? 1 : -1;
      const x0 = a.x + dir * 10, y0 = a.y - 3;
      let x1 = b.x + (wobble || 0), y1 = b.y - 3;
      const under = p < CFG.minPower;
      if (under) x1 = x0 + (x1 - x0) * 0.55;   // 没踢到，滚一半就停

      // 只有玩家传出去的球需要判断「对方停不停得住」。NPC 自己知道收着点。
      const lim = to === "girl" ? CFG.girlSweet[1] : to === "friend" ? 0.86 : 1.01;
      const over = !byNpc && p > lim;
      const control = !under && !over;

      const dist = Math.abs(x1 - x0);
      const dur = D.clamp(D.lerp(1.10, 0.60, p) + dist / 1100, 0.55, 1.35) *
                  (from === "girl" ? 1.10 : 1);   // 她踢得慢一点

      pass = {
        from: from, to: to, x0: x0, y0: y0, x1: x1, y1: y1,
        dur: dur, t: 0, power: p, wobble: wobble || 0, dir: dir,
        control: control, under: under, over: over, byNpc: !!byNpc
      };
      ball.phase = "flying";
      ball.holder = null;
      ball.x = x0;
      ball.y = y0;
      kickCount[from]++;
      if (byNpc) npcTargets.push(to);
      logs.push({
        from: from, to: to, byNpc: !!byNpc,
        power: Math.round(p * 100) / 100,
        wobble: Math.round(wobble || 0), control: control
      });
      if (from === "boy" && byNpc === false) lastPower = p;
      D.audio.step();
    }

    /** 女生不大会踢球：她的第 1、3 脚会偏，闺蜜第 3 脚也会偏一点。
     *  偏的幅度刻意控制在 22px 以内——看得出来歪了，但还不至于必定丢球。 */
    function wobbleFor(from, n) {
      const s = rnd() < 0.5 ? -1 : 1;
      if (from === "girl") return n % 2 === 1 ? s * (15 + rnd() * 7) : 0;
      if (from === "friend") return n === 3 ? s * 11 : 0;
      return 0;
    }

    /** NPC 自己选人。权重里最要紧的是「谁有一阵子没接到球」。 */
    function chooseTarget(from) {
      const pool = ["boy", "girl", "friend"].filter((k) => k !== from);
      // 第二次 NPC 传球固定走一次「她俩互相传」：让三个人真的成环，
      // 而不是所有球都冲着玩家来。这属于设计稿 6.8 说的「剧情指定回合」。
      const scriptNN = npcTargets.length === 1;
      const recent = npcTargets.slice(-2);
      const forceNN = scriptNN || (recent.length === 2 && recent.every((t) => t === "boy"));
      // 反过来也要有闸：连着三脚都是她俩互相传，玩家就成看球的了。
      const forceBoy = npcTargets.length >= 3 &&
                       npcTargets.slice(-3).every((t) => t !== "boy");
      const cands = forceBoy ? pool.filter((k) => k === "boy")
                  : forceNN ? pool.filter((k) => k !== "boy")
                  : pool.slice();

      let best = cands[0], bw = -1;
      for (const k of cands) {
        let w = 1 + Math.min(2.2, (clock - lastGot[k]) * 0.22) + rnd() * 0.65;
        if (npcTargets[npcTargets.length - 1] === k) w -= 0.5;
        if (w > bw) { bw = w; best = k; }
      }
      return best || pool[0];
    }

    function npcKick() {
      const from = ball.holder;
      const first = npcTargets.length === 0;          // 教学第一球固定给玩家
      const to = first ? "boy" : chooseTarget(from);
      const wob = first ? 0 : wobbleFor(from, kickCount[from] + 1);
      const p = first ? 0.5 : 0.40 + rnd() * 0.16;

      kick(from, to, p, wob, true);
      if (from !== "boy" && to !== "boy") npcToNpc++;
      if (first) bark("friend", "接住！", 1100);
      else if (wob) bark(from, from === "girl" ? "啊，歪了" : "偏了", 1100);
      else bark(from, "接着", 850);
    }

    function toLoose(x) {
      ball.looseFrom = ball.x;
      ball.looseX = D.clamp(x, CFG.xMin, CFG.xMax);
      ball.looseT = 0;
      ball.phase = "loose";
      pass = null;
    }

    function startFetch() {
      const cands = ["girl", "friend"].sort((p, q) => Math.abs(A[p].x - ball.x) - Math.abs(A[q].x - ball.x));
      fetcher = cands[0];
      A[fetcher].tx = ball.x;
      bark(fetcher, "我去捡", 1100);
      ball.phase = "fetch";
    }

    function tryCatch() {
      if (state !== "play" || !pass || pass.to !== "boy" || ball.phase !== "flying") return false;
      const ms = (pass.t - 1) * pass.dur * 1000;      // 负数是早按了
      if (ms < -CFG.late) { bark("boy", "太早", 650); return true; }  // 不罚，还能再按
      if (ms > CFG.late) return false;
      const a = Math.abs(ms);
      const grade = a <= CFG.good ? "很好" : a <= CFG.ok ? "接住了" : "差点";
      D.audio.right();
      catchBy("boy", grade);
      return true;
    }

    function catchBy(who, label) {
      // 「有效传接」只算玩家参与的那一来一回。
      // 一开始把两个 NPC 之间的球也计进去，结果自检里她们自己传了五个来回，
      // 玩家一次没碰到球，游戏就进了收尾——那还叫什么三人传球。
      // NPC 互传照旧发生（球路得成环），只是不顶目标数。
      const from = pass ? pass.from : null;
      if (who === "boy" || from === "boy") rally++;
      giveBall(who, who === "boy" ? 0 : 0.70 + rnd() * 0.30);
      if (who === "boy") bark("boy", label, 950);
      else bark(who, "这边", 800);
      // 操作提示统一交给顶部 #bgTip。底部那条 D.hint 的位置正好压在
      // 男主小腿上，球又在地面滚，多一层字就把球路挡了。
      if (rally === 3 && !shifted) shiftPositions();
    }

    /** 第四阶段：她换个接球位置，闺蜜改方向。只做一次。 */
    function shiftPositions() {
      shifted = true;
      A.girl.tx = 202;
      A.friend.tx = 330;
      bark("friend", "换个位置", 1200);
    }

    // ---------------------------------------------------------------- 更新

    function update(dt) {
      clock += dt;
      updateBubbles(dt);
      if (state !== "play" || frozen || D.dialogOpen()) return;

      // 走位只有两种：换了接球位置、或者去捡滚开的球。玩家原地不动。
      for (const k of ["girl", "friend", "boy"]) {
        const a = A[k];
        const d = a.tx - a.x;
        if (Math.abs(d) > 0.5) {
          a.moving = true;
          a.dir = d > 0 ? 1 : -1;
          a.x += Math.sign(d) * Math.min(Math.abs(d), 72 * dt);
        } else a.moving = false;
        a.scale = D.depthScale(a.y, 204, 250);
      }

      if (ball.phase === "flying" && pass) {
        // 传歪了的时候，接球的那个 NPC 会主动挪过去够一下。
        // 不能让球在离人二十像素的地方凭空吸到脚边——看着像瞬移。
        if (pass.to !== "boy" && Math.abs(pass.x1 - A[pass.to].x) > 6) {
          A[pass.to].tx = D.clamp(pass.x1, CFG.xMin, CFG.xMax);
        }
        pass.t += dt / pass.dur;
        const k = Math.min(1, pass.t);
        ball.x = D.lerp(pass.x0, pass.x1, k) +
                 (pass.t > 1 ? (pass.t - 1) * pass.dur * 42 * pass.dir : 0);
        ball.y = D.lerp(pass.y0, pass.y1, k);
        ball.spin += dt * (10 + 26 * pass.power);

        if (pass.t >= 1) {
          if (pass.to === "boy") {
            // 球到脚边后还留 late 毫秒，超过才算漏接。
            if (pass.t >= 1 + (CFG.late / 1000) / pass.dur) {
              misses++;
              bark("boy", "没接住", 950);
              toLoose(ball.x + pass.dir * 20);
            }
          } else if (pass.control) {
            D.audio.blip();
            catchBy(pass.to, "接着");
          } else {
            bark(pass.to, pass.over ? "没停住" : "没到", 1100);
            toLoose(ball.x + pass.dir * 24);
          }
        }
      } else if (ball.phase === "loose") {
        ball.looseT += dt;
        const k = Math.min(1, ball.looseT / 0.5);
        ball.x = D.lerp(ball.looseFrom, ball.looseX, 1 - Math.pow(1 - k, 2));
        ball.spin += dt * 8 * (1 - k);
        if (k >= 1) startFetch();
      } else if (ball.phase === "fetch") {
        if (Math.abs(A[fetcher].x - ball.x) < 7) {
          A[fetcher].tx = A[fetcher].x;
          giveBall(fetcher, 0.8);
        }
      } else if (ball.phase === "held") {
        const a = A[ball.holder];
        if (a) {
          ball.x = a.x + (a.dir > 0 ? 10 : -10);
          ball.y = a.y - 3;
        }
        if (ball.holder !== "boy") {
          holdT -= dt;
          if (holdT <= 0) npcKick();
        }
      }

      // 蓄力：按住空格力度来回扫，松开那一帧传出。
      // 用轮询而不是 keyup 监听，是为了让触控按钮和键盘走同一条路。
      const h = spaceHeld();
      if (!h) armed = true;
      if (state === "play" && ball.phase === "held" && ball.holder === "boy") {
        if (h && armed) {
          charging = true;
          chargeT += dt;
          const sw = (chargeT / 1.10) % 2;
          power = D.clamp(sw <= 1 ? sw : 2 - sw, 0.06, 0.98);
        } else if (!h && charging) {
          charging = false;
          chargeT = 0;
          const p = power;
          kick("boy", selected, p, 0, false);
          if (p < CFG.minPower) bark("boy", "没踢到", 900);
          else if (p > (selected === "girl" ? CFG.girlSweet[1] : 0.86)) bark("boy", "力大了", 900);
          else bark("boy", "给", 800);
          power = 0.34;
        }
      } else {
        charging = false;
        chargeT = 0;
      }

      if (!finishing && rally >= CFG.target) {
        finishing = true;
        state = "rest";
        finish();
        return;
      }
      syncHud();
    }

    // ---------------------------------------------------------------- 界面

    function select(who) {
      if (selected === who) return;
      selected = who;
      D.audio.click();
    }

    function syncHud() {
      el.count.textContent = "传接 " + rally + " / " + CFG.target;
      let t;
      if (ball.phase === "flying" && pass && pass.to === "boy") t = "球到脚边时按 空格 接住";
      else if (ball.phase === "held" && ball.holder === "boy") t = "A / D 选人　按住空格蓄力，绿区里松开";
      else if (ball.phase === "loose" || ball.phase === "fetch") t = "球滚开了，有人去捡";
      else t = "看球路，等传过来";
      if (t !== tipText) { tipText = t; el.tip.textContent = t; }
      el.toGirl.classList.toggle("on", selected === "girl");
      el.toFriend.classList.toggle("on", selected === "friend");
    }

    // ---------------------------------------------------------------- 绘制

    function drawGround(ctx) {
      // 复用已有的楼前空地素材（设计稿 10.1 让优先复用校园场景）。
      // 只补两道粉笔线，把「可以踢球的一小块地方」圈出来，不另做俯视地图。
      ctx.drawImage(D.img.field, 0, 0, W, H);
      ctx.save();
      ctx.strokeStyle = "rgba(246,238,216,.20)";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.ellipse(256, 246, 168, 30, 0, 0, TAU); ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = "rgba(246,238,216,.11)";
      ctx.beginPath(); ctx.moveTo(256, 216); ctx.lineTo(256, 288); ctx.stroke();
      ctx.restore();
    }

    function drawAim(ctx) {
      if (ball.phase !== "held" || ball.holder !== "boy" || state !== "play") return;
      const a = A.boy, b = A[selected];
      ctx.save();
      ctx.strokeStyle = "rgba(255,212,151,.42)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(a.x, a.y - 2); ctx.lineTo(b.x, b.y - 2); ctx.stroke();
      ctx.setLineDash([]);
      // 那个人正在说话时先让位给气泡，不然箭头和名字会压在气泡上。
      if (bubbles.some((x) => x.who === selected)) { ctx.restore(); return; }
      // 选中谁，谁头顶就有一个往下戳的小箭头
      const y = b.y - 72 * b.scale - 8 + Math.sin(clock * 5) * 2;
      ctx.fillStyle = "#ffd497";
      ctx.beginPath();
      ctx.moveTo(b.x, y + 7); ctx.lineTo(b.x - 5, y); ctx.lineTo(b.x + 5, y);
      ctx.closePath(); ctx.fill();
      ctx.font = '9px "Microsoft YaHei",sans-serif';
      ctx.textAlign = "center"; ctx.textBaseline = "bottom";
      ctx.fillText(NAME[selected], b.x, y - 1);
      ctx.restore();
    }

    function drawBall(ctx) {
      const x = Math.round(ball.x), y = Math.round(ball.y);
      ctx.save();
      ctx.globalAlpha = 0.30;
      ctx.fillStyle = "#171b20";
      ctx.beginPath(); ctx.ellipse(x, y + 5, 5, 1.8, 0, 0, TAU); ctx.fill();
      ctx.globalAlpha = 1;
      // 9px 的小足球：深色描边一圈，白底上三块随滚动转的黑斑
      ctx.fillStyle = "#20252b";
      ctx.beginPath(); ctx.arc(x, y, 5.2, 0, TAU); ctx.fill();
      ctx.fillStyle = "#f3f0e5";
      ctx.beginPath(); ctx.arc(x, y, 4.1, 0, TAU); ctx.fill();
      ctx.fillStyle = "#313841";
      for (let i = 0; i < 3; i++) {
        const a = ball.spin + i * (TAU / 3);
        ctx.fillRect(Math.round(x + Math.cos(a) * 2.2) - 1, Math.round(y + Math.sin(a) * 2.2) - 1, 2, 2);
      }
      ctx.restore();
    }

    function drawCatchRing(ctx) {
      if (state !== "play" || ball.phase !== "flying" || !pass || pass.to !== "boy") return;
      const k = D.clamp(pass.t, 0, 1);
      const r = 22 - 13 * k;
      const ms = Math.abs((pass.t - 1) * pass.dur * 1000);
      const col = ms <= CFG.good ? "#ffd497" : ms <= CFG.ok ? "#fff3da" : "#c6b6a8";
      const a = A.boy;
      ctx.save();
      ctx.strokeStyle = "rgba(255,243,214,.30)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(a.x, a.y - 2, 8, 3.4, 0, 0, TAU); ctx.stroke();
      ctx.strokeStyle = col;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.85;
      ctx.beginPath(); ctx.ellipse(a.x, a.y - 2, r, r * 0.42, 0, 0, TAU); ctx.stroke();
      ctx.restore();
    }

    function drawPower(ctx) {
      if (state !== "play" || ball.phase !== "held" || ball.holder !== "boy") return;
      const a = A.boy;
      const x = a.x - 44, y = a.y + 8, w = 88, h = 7;
      const s = selected === "girl" ? CFG.girlSweet : CFG.sweet;
      ctx.save();
      ctx.fillStyle = "rgba(20,16,22,.82)";
      ctx.fillRect(x - 3, y - 3, w + 6, h + 6);
      ctx.fillStyle = "#4a3d48";
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = "rgba(143,191,138,.65)";
      ctx.fillRect(x + s[0] * w, y, (s[1] - s[0]) * w, h);
      ctx.fillStyle = "#ffd497";
      ctx.fillRect(Math.round(x + power * w) - 1, y - 3, 3, h + 6);
      // 说明字放在条**下面**。写在上面会正好压住脚边的球和男主的小腿——
      // 那颗球是全场唯一要看的东西，不能被一行字盖掉。
      const label = selected === "girl" ? "传给她 · 绿区更窄" : "绿区里松开";
      const ly = y + h + 5;
      ctx.fillStyle = "rgba(20,16,22,.72)";
      ctx.fillRect(x - 12, ly - 1, w + 24, 12);
      ctx.font = '8px "Microsoft YaHei",sans-serif';
      ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillStyle = "#e2d0b8";
      ctx.fillText(label, x + w / 2, ly);
      ctx.restore();
    }

    function drawBubbles(ctx) {
      ctx.save();
      ctx.font = '10px "Microsoft YaHei",sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const b of bubbles) {
        const a = A[b.who];
        if (!a) continue;
        const w = Math.ceil(ctx.measureText(b.text).width) + 14;
        const x = D.clamp(a.x - w / 2, 4, W - w - 4);
        // 贴着头放。放高一点气泡就像钉在墙上的牌子，尾巴够不着人。
        const y = a.y - 72 * a.scale - 20 + Math.sin(clock * 4) * 1;
        const fade = Math.min(1, (b.dur - b.t) * 5);
        ctx.globalAlpha = 0.94 * fade;
        ctx.fillStyle = "#241f2c";
        ctx.fillRect(x, y, w, 17);
        ctx.strokeStyle = "#d8b58d";
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, w - 1, 16);
        ctx.fillStyle = "#241f2c";
        ctx.beginPath();
        ctx.moveTo(a.x - 4, y + 17); ctx.lineTo(a.x + 4, y + 17); ctx.lineTo(a.x, y + 21);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#fff0dc";
        ctx.fillText(b.text, x + w / 2, y + 9);
      }
      ctx.restore();
    }

    function draw(ctx) {
      if (!D.img.field) { ctx.fillStyle = "#241f28"; ctx.fillRect(0, 0, W, H); return; }
      drawGround(ctx);
      drawAim(ctx);

      const order = ["boy", "girl", "friend"].sort((p, q) => A[p].y - A[q].y);
      for (const k of order) D.shadow(ctx, A[k].x, A[k].y + 1, 48 * A[k].scale);
      for (const k of order) D.drawActor(ctx, A[k], clock);

      drawCatchRing(ctx);
      drawBall(ctx);
      drawPower(ctx);
      drawBubbles(ctx);
    }

    // ---------------------------------------------------------------- 收尾

    async function finish() {
      D.hint(null);
      D.objective(null);
      // 收尾是不踢了，别把上一脚的「这边」留在半空，跟「谁也没去捡」打架
      bubbles = [];
      // update 里一旦够了 5 次就直接 return，最后一帧的 HUD 没来得及刷，
      // 会一直停在 4/5。这里补上，并且让它在收尾对白期间留着。
      el.count.textContent = "传接 " + CFG.target + " / " + CFG.target;
      el.tip.textContent = "歇会儿";
      // 收尾对白框会盖住画面下半截，触控按钮提前收起来，别飘在字上面
      el.ctl.hidden = true;
      // 球停下来，谁也不去捡——休息就是不踢了
      ball.phase = "held";
      ball.holder = "boy";
      pass = null;
      for (const k of ["boy", "girl", "friend"]) { A[k].tx = A[k].x; A[k].moving = false; }

      const lines = [
        ["旁白", "球停在中间，谁也没去捡。"],
        ["闺蜜", "行了，歇会儿。"],
        ["朱里", "我好像有两脚踢歪了。"],
        ["我", "都滚回来了。"],
        ["旁白", "三个人在台阶上坐了一会儿。上课铃还没响，也没人提刚才传了几个。"]
      ];
      await D.lines(lines);

      state = "done";
      D.persist({
        ballGameCompleted: true,
        ballGamePasses: rally,
        ballGameMisses: misses,
        ballGameNpcToNpc: npcToNpc
      });
      host.done({
        id: "ball_pass",
        completed: true,
        events: ["ball:finished", "ball:shifted", "ball:npc_to_npc:" + npcToNpc],
        playerActions: ["passes:" + rally, "misses:" + misses, "miskicks:" +
          logs.filter((l) => l.wobble !== 0).length]
      });
    }

    // ---------------------------------------------------------------- 生命周期

    async function start() {
      host.setChapter("楼前空地 · 放学后");
      D.hint(null);              // 上一个小游戏可能留了一条没消失的提示
      D.objective("把球传起来", "五个来回就够了 · 不是比赛");
      el.hud.classList.add("show");
      el.ctl.hidden = false;
      el.toGirl.onclick = function () { select("girl"); };
      el.toFriend.onclick = function () { select("friend"); };
      el.act.onpointerdown = function (e) {
        e.preventDefault();
        D.audio.unlock();
        touchHeld = true;
        if (ball.phase === "flying" && pass && pass.to === "boy") tryCatch();
      };
      el.act.onpointerup = function () { touchHeld = false; };
      el.act.onpointercancel = function () { touchHeld = false; };
      syncHud();

      await D.fadeTo(0, 420);
      await D.sleep(200);

      await D.lines([
        ["旁白", "下周一，放学后。楼前那块空地还没什么人。"],
        ["旁白", "不是同一节体育课，只是三个人都还没走。"],
        ["闺蜜", "踢会儿？就传传球，别射门。"],
        ["朱里", "……我不太会踢。"],
        ["闺蜜", "知道。所以才说传球啊。"],
        ["我", "行。"],
        ["旁白", "球是旧的，气不太足，滚得慢。"]
      ]);

      state = "play";
      giveBall("friend", 0.85);
    }

    function press(key) {
      if (state !== "play" || D.dialogOpen()) return;
      const k = key.toLowerCase();
      if (ball.phase === "held" && ball.holder === "boy") {
        if (k === "a" || k === "arrowleft") select("girl");
        else if (k === "d" || k === "arrowright") select("friend");
      }
      if (key === " " || key === "Spacebar" || k === "e" || key === "Enter") {
        if (ball.phase === "flying" && pass && pass.to === "boy") tryCatch();
      }
    }

    return {
      id: "ball_pass",
      title: "体育活动",
      start: start,
      update: update,
      draw: draw,
      press: press,
      setFrozen: function (v) { frozen = !!v; },
      dispose: function () {
        D.hint(null);
        D.objective(null);
        el.hud.classList.remove("show");
        el.ctl.hidden = true;
        touchHeld = false;
      },
      get state() { return state; },
      get phase() { return ball.phase; },
      get holder() { return ball.holder; },
      get to() { return pass ? pass.to : null; },
      get from() { return pass ? pass.from : null; },
      get arrivalIn() { return pass ? (1 - pass.t) * pass.dur * 1000 : null; },
      get rally() { return rally; },
      get misses() { return misses; },
      get npcToNpc() { return npcToNpc; },
      get selected() { return selected; },
      get power() { return power; },
      get lastPower() { return lastPower; },
      get charging() { return charging; },
      get shifted() { return shifted; },
      get ball() { return { x: ball.x, y: ball.y }; },
      get logs() { return logs; },
      get actors() { return A; },
      get bubbles() { return bubbles; },
      get config() { return CFG; }
    };
  };

})(window);
