/* G01《一起去办事》— 三人同行 + 走廊探索 + 轻量交付
 *
 * 三个场景连成一条路：走廊（她们教室门口）→ 楼梯口 → 楼上护栏走廊（收集箱在尽头）。
 * 玩家只管男主，朱里和闺蜜跟着走；闺蜜知道地方，出发时会自己走到前面带路。
 *
 * 设计稿第 3 章。沿途两个互动点是可选的，不影响通关。
 */
(function (global) {
  "use strict";

  const D = global.DAILY;
  D.games = D.games || {};

  const SCENES = {
    corridor: { bg: "corridor", walk: [46, 468], left: "stair", name: "走廊" },
    stair: { bg: "stair", walk: [64, 456], left: "railing", right: "corridor", name: "楼梯口" },
    railing: { bg: "railing", walk: [52, 466], right: "stair", name: "楼上 · 走廊" }
  };

  const BOX_X = 176;      // 交接点（箱子）在护栏走廊上的位置
  const DOOR_X = 256;     // 走廊背景上那扇教室门的位置

  D.games.errand = function (host) {
    const trio = D.createTrio();
    let t = 0;
    let sc = "corridor";
    let state = "intro";        // intro | walk | handover | outro | done
    let edgeT = 0;
    let transitioning = false;
    let near = null;
    let boxGlow = 0;
    let introT = 0;
    let handoverT = 0;
    const seen = { stair: false, railing: false };

    // ---------------------------------------------------------------- 场景

    function applyScene() {
      const S = SCENES[sc];
      trio.setBounds(S.walk[0], S.walk[1]);
      host.setBackground(S.bg);
      host.setChapter(S.name);
    }

    function setObjective() {
      if (sc === "corridor") {
        D.objective("和她们一起把材料送到楼上", "目的地：走廊尽头的收集箱");
      } else if (sc === "stair") {
        D.objective("和她们一起把材料送到楼上", "上楼 → 走到楼梯口最左边");
      } else {
        D.objective("把材料放进收集箱", "走到箱子旁边，按 E");
      }
    }

    function spawn(dir) {
      const S = SCENES[sc];
      const x = dir < 0 ? S.walk[1] - 20 : S.walk[0] + 20;
      trio.place(x, 34);
      trio.face(dir < 0 ? -1 : 1);
    }

    async function goScene(next, dir) {
      transitioning = true;
      trio.freeze(true);
      await D.fadeTo(1, 230);
      sc = next;
      applyScene();
      spawn(dir);
      setObjective();
      await D.fadeTo(0, 250);
      transitioning = false;
      trio.freeze(false);
      onEnter(next);
    }

    function onEnter(name) {
      if (name === "stair" && !seen.stair) {
        seen.stair = true;
        D.lines([
          ["闺蜜", "从这儿上去。"],
          ["朱里", "你走这么快干嘛。"],
          ["闺蜜", "我熟啊。"]
        ]);
      } else if (name === "railing" && !seen.railing) {
        seen.railing = true;
        D.lines([
          ["闺蜜", "到了。就那个箱子。"],
          ["我", "……放进去就行？"],
          ["朱里", "嗯。盖子上有张纸，照着填一下。"]
        ]);
      }
    }

    // ---------------------------------------------------------------- 交互点

    // 交互点只建一次。每帧新建的话 `used` 标记会跟着丢，同一个点能反复触发。
    const POINTS = {
      corridor: [{ x: DOOR_X, r: 44, label: "看一眼教室里", used: false, run: lookClassroom }],
      stair: [{ x: 336, r: 52, label: "看看操场", used: false, run: lookWindow }]
    };

    function points() { return POINTS[sc] || []; }

    async function lookClassroom() {
      trio.freeze(true);
      await D.lines([
        ["旁白", "门没关严。里面有人在擦黑板，椅子拖得吱吱响。"],
        ["我", "……你们刚才就是从这儿出来的。"],
        ["朱里", "被你看出来了。"]
      ]);
      trio.freeze(false);
    }

    async function lookWindow() {
      trio.freeze(true);
      await D.lines([
        ["旁白", "窗户开着一条缝，操场上的哨声断断续续飘上来。"],
        ["闺蜜", "又在踢球。"],
        ["朱里", "每周都踢。"]
      ]);
      trio.freeze(false);
    }

    // ---------------------------------------------------------------- 交接

    async function handover() {
      state = "handover";
      trio.freeze(true);
      handoverT = 0;
      D.hint(null);
      trio.face(-1);
      await D.lines([
        ["旁白", "箱子靠墙放着，盖子上压了一张写了字的纸。"],
        ["我", "放这儿就行？"],
        ["闺蜜", "对，放进去就好。"]
      ]);
      await D.sleep(200);
      await D.lines([
        ["朱里", "……搞定。"],
        ["闺蜜", "比我想的快。"],
        ["旁白", "三个人站在门口，谁也没急着走。"]
      ]);
      state = "outro";
      D.objective(null);
      D.hint(null);
      await D.lines([
        ["朱里", "回去吧。"],
        ["闺蜜", "下节数学。"],
        ["我", "……"],
        ["旁白", "那天下午，我第一次觉得，这条走廊其实挺短的。"]
      ]);
      state = "done";
      D.persist({ errandCompleted: true });
      host.done({
        id: "errand",
        completed: true,
        events: ["errand:delivered", "errand:looked_classroom", "errand:looked_window"],
        playerActions: ["walk", "deliver"]
      });
    }

    // ---------------------------------------------------------------- 生命周期

    async function start() {
      applyScene();
      // 开场：玩家站在走廊偏左，两人正好从教室门里出来
      trio.pause(true);
      trio.boy.x = 172;
      trio.boy.dir = 1;
      trio.girl.x = DOOR_X + 4;
      trio.girl.dir = -1;
      trio.friend.x = DOOR_X + 18;
      trio.friend.dir = -1;
      introT = 0;
      state = "intro";
      setObjective();

      await D.fadeTo(0, 420);
      await D.sleep(260);

      await D.lines([
        ["旁白", "课间，走廊里全是人。"],
        ["朱里", "和臣？"],
        ["我", "嗯？"],
        ["闺蜜", "哦——你就是和臣。"],
        ["我", "……我们见过？"],
        ["闺蜜", "我坐她旁边。天天听她提。"],
        ["朱里", "喂。"]
      ]);

      // 她们走到他旁边
      await walkOut();

      await D.lines([
        ["朱里", "我们要去那边一趟。"],
        ["我", "去做什么？"],
        ["闺蜜", "送个东西。"],
        ["朱里", "你要一起来吗？"],
        ["我", "行。"]
      ]);

      state = "walk";
      trio.pause(false);
      trio.freeze(false);
      D.objective("和她们一起把材料送到楼上", "跟着闺蜜走 —— A / D 或 ← / →");
      D.hint("A / D 或 ← / → 走路", 3200);

      // 她俩转过身，闺蜜先走到前面那个位置停下等——目的地在左边
      trio.face(-1);
      trio.boy.dir = -1;
      trio.leadTo(96);
      trio.onLag = async function (who) {
        if (who.key !== "friend") return;
        if (D.dialogOpen()) return;
        if (seen.lagLine) return;
        seen.lagLine = true;
        trio.freeze(true);
        await D.lines([["闺蜜", "你怎么还在后面？"]]);
        trio.freeze(false);
      };
    }

    /** 开场那段：两个人从门里出来，走到他身边。 */
    function walkOut() {
      return new Promise(function (resolve) {
        const from = { girl: trio.girl.x, friend: trio.friend.x };
        const to = { girl: trio.boy.x + 40, friend: trio.boy.x + 78 };
        const t0 = t;
        const DUR = 0.95;
        (function step() {
          const k = D.clamp((t - t0) / DUR, 0, 1);
          const e = k * k * (3 - 2 * k);
          trio.girl.x = D.lerp(from.girl, to.girl, e);
          trio.friend.x = D.lerp(from.friend, to.friend, e);
          trio.girl.moving = k < 1;
          trio.friend.moving = k < 1;
          trio.girl.dir = -1;
          trio.friend.dir = -1;
          if (k < 1) { requestAnimationFrame(step); return; }
          trio.girl.moving = false;
          trio.friend.moving = false;
          trio.girl.dir = 1;
          trio.friend.dir = 1;
          resolve();
        })();
      });
    }

    function update(dt) {
      t += dt;
      boxGlow += dt;

      // 开场时 trio 是 pause 的：它只推进动画时间，不动位置，
      // 位置由 walkOut 自己逐帧摆——不然两个人会从门里直接瞬移到男主身边。
      trio.update(dt);

      if (transitioning || state !== "walk") { near = null; return; }

      // 走到场景边缘就换图
      const S = SCENES[sc];
      const ax = D.axisX();
      const atLeft = trio.boy.x <= S.walk[0] + 0.8 && ax < 0;
      const atRight = trio.boy.x >= S.walk[1] - 0.8 && ax > 0;
      const dir = atLeft ? -1 : atRight ? 1 : 0;
      if (dir === 0) { edgeT = 0; }
      else {
        edgeT += dt;
        const next = dir < 0 ? S.left : S.right;
        if (edgeT > 0.3) {
          edgeT = 0;
          if (next) goScene(next, dir);
        }
      }

      // 交互点
      near = null;
      for (const p of points()) {
        if (p.used) continue;
        if (Math.abs(trio.boy.x - p.x) < p.r) { near = p; break; }
      }
      if (near) D.hint("E · " + near.label, 0);
      else if (!D.dialogOpen()) D.hint(null);

      // 走到箱子旁边就提示；按不按 E 由 press 处理，不在这里读按住状态
      if (sc === "railing" && Math.abs(trio.boy.x - BOX_X) < 52) {
        D.hint("E · 把材料放进去", 0);
      }
    }

    function press(key) {
      if (state !== "walk" || transitioning) return;
      if (D.dialogOpen()) return;
      const k = key.toLowerCase();
      if (k !== "e" && key !== "Enter") return;
      if (sc === "railing" && Math.abs(trio.boy.x - BOX_X) < 52) { handover(); return; }
      if (near && !near.used) {
        near.used = true;
        D.hint(null);
        near.run();
      }
    }

    // ---------------------------------------------------------------- 绘制

    function draw(ctx) {
      ctx.drawImage(D.img[SCENES[sc].bg], 0, 0, D.W, D.H);

      if (sc === "railing") drawBox(ctx);

      trio.draw(ctx);

      // 交互点的浮动提示
      if (near) {
        const y = 150 + Math.sin(t * 4) * 2;
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = "rgba(20,16,22,.78)";
        ctx.fillRect(near.x - 9, y - 8, 18, 16);
        ctx.strokeStyle = "rgba(255,226,180,.9)";
        ctx.lineWidth = 1;
        ctx.strokeRect(near.x - 8.5, y - 7.5, 17, 15);
        ctx.fillStyle = "#ffe2b4";
        ctx.font = 'bold 11px "Microsoft YaHei",sans-serif';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("E", near.x, y);
        ctx.restore();
      }
    }

    function drawBox(ctx) {
      const x = BOX_X, y = 230;
      const pulse = 0.5 + 0.5 * Math.sin(boxGlow * 2.6);

      // 地上的光圈
      ctx.save();
      ctx.globalAlpha = 0.16 + pulse * 0.12;
      ctx.fillStyle = "#ffd9a0";
      ctx.beginPath();
      ctx.ellipse(x, y, 26, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 纸箱
      ctx.fillStyle = "#8a5f3c";
      ctx.fillRect(x - 13, y - 17, 26, 17);
      ctx.fillStyle = "#b98a5a";
      ctx.fillRect(x - 13, y - 17, 26, 5);
      ctx.fillStyle = "#6f4a2d";
      ctx.fillRect(x - 13, y - 12, 26, 1);
      ctx.fillStyle = "#d8c39a";
      ctx.fillRect(x - 2, y - 17, 4, 12);       // 胶带
      ctx.fillStyle = "#3a2a20";
      ctx.fillRect(x - 13, y - 1, 26, 1);
      ctx.fillRect(x - 13, y - 17, 1, 17);
      ctx.fillRect(x + 12, y - 17, 1, 17);

      // 盖子上那张写了字的纸
      ctx.fillStyle = "#f2ead6";
      ctx.fillRect(x - 8, y - 22, 16, 5);
      ctx.fillStyle = "#b7a98c";
      ctx.fillRect(x - 6, y - 21, 9, 1);
      ctx.fillRect(x - 6, y - 19, 6, 1);
    }

    return {
      id: "errand",
      title: "一起去办事",
      start: start,
      update: update,
      draw: draw,
      press: press,
      trio: trio,
      setFrozen: function (v) { trio.freeze(v); },
      get state() { return state; },
      get scene() { return sc; },
      get boxX() { return BOX_X; }
    };
  };

})(window);
