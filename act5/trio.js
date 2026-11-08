/* 三人同行：玩家控制男主，朱里和由乃跟随。
 *
 * 为什么是一维：项目里所有学校场景素材都是正面平视的横版走廊（墙地分界在 y≈200），
 * 做俯视格子地图会和现有美术打架。所以「走路」只沿 x 轴，前后站位靠脚底 y 错开——
 * 三个人分别站在地面不同的 y 上，互相穿过的时候看起来是前后错开，不是叠在一起。
 *
 * 跟随只有一条硬规矩：不许迎面穿过主角。目标位跳到他另一侧时，
 * 同伴慢半拍同向跟着，等他自己走过去，人自然落到身后。
 */
(function (global) {
  "use strict";

  const D = global.DAILY;

  D.createTrio = function (opts) {
    const cfg = Object.assign({
      speed: 74,          // 玩家速度 px/s
      slots: [46, 92],    // 朱里、由乃各自跟在身后多远（精灵 48 宽，间隔要大于它才不叠）
      gain: 4.2,          // 跟随增益：越大跟得越紧，越小越松
      catchUp: 1.55,      // 追赶时最多能比玩家快多少倍
      lagRatio: 0.7       // 需要换边时只慢半拍跟着走
    }, opts || {});

    // y 越大越靠近镜头。三人错开，互相穿过时才像前后站位。
    // y 是脚底。地板从 y≈190 开始，走位线放在中段 225 左右：
    // 再往下就站到画面最前沿了，对白框一出来整个人就没了。
    const boy = { key: "boy", x: 150, y: 226, dir: 1, moving: false, phase: 0 };
    const girl = { key: "girl", x: 116, y: 214, dir: 1, moving: false, phase: 0.6 };
    const friend = { key: "friend", x: 82, y: 238, dir: 1, moving: false, phase: 0.3 };
    const all = [girl, boy, friend];

    let bounds = [40, 472];
    let frozen = false;
    let paused = false;   // 整段接管（开场走位、交接动画）时用
    let t = 0;

    const api = {
      boy: boy, girl: girl, friend: friend, actors: all,

      setBounds: function (a, b) { bounds = [a, b]; },

      freeze: function (v) {
        frozen = !!v;
        if (frozen) { boy.moving = false; girl.moving = false; friend.moving = false; }
      },
      isFrozen: function () { return frozen; },

      /** 完全停更，交给调用方自己摆位。 */
      pause: function (v) { paused = !!v; },

      /** 直接摆位（换场景、开场）。 */
      place: function (x, spread) {
        const s = spread == null ? 34 : spread;
        boy.x = x;
        girl.x = x - s;
        friend.x = x - s * 1.9;
        for (const a of all) { a.moving = false; a.dir = 1; }
      },

      /** 全部朝向某一边（对白时让她们转过来）。 */
      face: function (dir) { for (const a of all) a.dir = dir; },

      distance: function (a, b) { return Math.abs(a.x - b.x); },

      update: function (dt) {
        t += dt;
        if (paused) return;

        // ---- 玩家
        const ax = frozen ? 0 : D.axisX();
        if (ax !== 0) {
          boy.dir = ax;
          boy.moving = true;
          boy.x = D.clamp(boy.x + ax * cfg.speed * dt, bounds[0], bounds[1]);
        } else {
          boy.moving = false;
        }

        // ---- 同伴
        // 「身后」跟着主角朝向走：朝右时身后在左，朝左时身后在右。
        // 两个目标位天然差 slots[1] - slots[0] = 46，不需要事后互推。
        const back = -boy.dir;
        for (let i = 0; i < 2; i++) {
          const c = i === 0 ? girl : friend;
          const tx = boy.x + back * cfg.slots[i];

          const d = tx - c.x;
          const ad = Math.abs(d);
          const maxSp = cfg.speed * cfg.catchUp;
          const want = Math.min(maxSp, ad * cfg.gain);

          // 主角一转身，目标位会瞬间跳到他另一侧。直接追过去就得迎面穿过他——
          // 老版本正是这么干的：主角往右、她俩往左跑，挤到边界还互相顶住，
          // 看着像在躲他。现在改成慢半拍同向跟着，等主角自己走过去，
          // 她自然落到身后，再恢复跟随。
          const crossing = ax !== 0 && (c.x - boy.x) * (tx - boy.x) < 0;
          if (crossing) {
            c.x += ax * cfg.speed * cfg.lagRatio * dt;
            c.moving = true;
            c.dir = ax;
          } else if (ad > 1.2) {
            c.x += Math.sign(d) * want * dt;
            c.moving = want > 10;
            if (c.moving) c.dir = Math.sign(d);
          } else {
            c.moving = false;
            // 站住的时候转过来看玩家
            if (!frozen) c.dir = boy.x >= c.x ? 1 : -1;
          }
          c.x = D.clamp(c.x, bounds[0], bounds[1]);
        }
      },

      draw: function (ctx) {
        // 按 y 排序，站在后面的人先画
        const order = all.slice().sort((p, q) => p.y - q.y);
        for (const a of order) {
          D.shadow(ctx, a.x, a.y + 1, D.FRAME_W);
        }
        for (const a of order) D.drawActor(ctx, a, t);
      }
    };

    return api;
  };

})(window);
