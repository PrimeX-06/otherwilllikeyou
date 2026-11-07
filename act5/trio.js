/* 三人同行：玩家控制男主，朱里和闺蜜跟随。
 *
 * 为什么是一维：项目里所有学校场景素材都是正面平视的横版走廊（墙地分界在 y≈200），
 * 做俯视格子地图会和现有美术打架。所以「走路」只沿 x 轴，深度靠 y 和缩放区分——
 * 三个人分别站在地面不同的 y 上，互相穿过的时候看起来是前后错开，不是叠在一起。
 */
(function (global) {
  "use strict";

  const D = global.DAILY;

  D.createTrio = function (opts) {
    const cfg = Object.assign({
      speed: 74,          // 玩家速度 px/s
      slots: [46, 92],    // 朱里、闺蜜各自跟在身后多远（精灵 48 宽，间隔要大于它才不叠）
      gain: 4.2,          // 跟随增益：越大跟得越紧，越小越松
      catchUp: 1.55,      // 追赶时最多能比玩家快多少倍
      sep: 12,            // 两个人靠太近就互相让开
      waitGap: 92         // 带路的人被落下这么远，会停下来等
    }, opts || {});

    // y 越大越靠近镜头。三人错开，互相穿过时才像前后站位。
    // y 是脚底。地板从 y≈190 开始，走位线放在中段 225 左右：
    // 再往下就站到画面最前沿了，对白框一出来整个人就没了。
    const boy = { key: "boy", x: 150, y: 226, dir: 1, moving: false, phase: 0, scale: 1 };
    const girl = { key: "girl", x: 116, y: 214, dir: 1, moving: false, phase: 0.6, scale: 1 };
    const friend = { key: "friend", x: 82, y: 238, dir: 1, moving: false, phase: 0.3, scale: 1 };
    const all = [girl, boy, friend];

    let bounds = [40, 472];
    let frozen = false;
    let paused = false;   // 整段接管（开场走位、交接动画）时用
    let t = 0;
    let leadTarget = null;   // 带路的目标点；走到就停下等，玩家超过她之后自动结束
    let waitSince = 0;
    let lagged = false;

    const api = {
      boy: boy, girl: girl, friend: friend, actors: all,
      onLag: null,        // 带路的人等太久时回调一次

      setBounds: function (a, b) { bounds = [a, b]; },

      freeze: function (v) {
        frozen = !!v;
        if (frozen) { boy.moving = false; girl.moving = false; friend.moving = false; }
      },
      isFrozen: function () { return frozen; },

      /** 完全停更，交给调用方自己摆位。 */
      pause: function (v) { paused = !!v; },

      /** 让闺蜜先走到前面一个点停下等。玩家走过去之后她自然落到队伍后面，
       *  不用再从人堆里穿回来——这是「带路」最省事也最像人的写法。 */
      leadTo: function (x) { leadTarget = x; },
      isLeading: function () { return leadTarget != null; },

      /** 直接摆位（换场景、开场）。 */
      place: function (x, spread) {
        const s = spread == null ? 34 : spread;
        boy.x = x;
        girl.x = x - s;
        friend.x = x - s * 1.9;
        for (const a of all) { a.moving = false; a.dir = 1; }
      },

      /** 全部朝向某一边（对白时让她们转过来）。 */
      face: function (dir) {
        for (const a of all) a.dir = dir;
      },

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
        for (let i = 0; i < 2; i++) {
          const c = i === 0 ? girl : friend;
          let tx;

          const leading = c === friend && leadTarget != null;
          if (leading && (boy.x < c.x - 26 || boy.x > c.x + 26)) {
            // 玩家已经走到她前面（或后面）了，带路结束，交还给普通跟随
            leadTarget = null;
          }

          if (leading && leadTarget != null) {
            // 玩家还没动，她就先跑出去，看起来像抢跑；等他抬脚再走
            tx = boy.moving ? leadTarget : c.x;
          } else {
            tx = boy.x - boy.dir * cfg.slots[i];
          }

          const d = tx - c.x;
          const ad = Math.abs(d);
          const maxSp = cfg.speed * cfg.catchUp;
          const want = Math.min(maxSp, ad * cfg.gain);

          if (ad > 1.2) {
            c.x += Math.sign(d) * want * dt;
            c.moving = want > 10;
            if (c.moving) c.dir = Math.sign(d);
          } else {
            c.moving = false;
            // 站住的时候转过来看玩家
            if (!frozen) c.dir = boy.x >= c.x ? 1 : -1;
          }
          c.x = D.clamp(c.x, bounds[0], bounds[1]);

          // 她在前面等，玩家却一直没跟上来
          if (leading && !c.moving && Math.abs(boy.x - c.x) > cfg.waitGap * 0.7) {
            if (!waitSince) waitSince = t;
            if (t - waitSince > 1.8 && !lagged) {
              lagged = true;
              if (api.onLag) api.onLag(c);
            }
          } else {
            waitSince = 0;
          }
        }

        // 两个人别挤在一起
        const g = girl.x, f = friend.x;
        if (Math.abs(g - f) < cfg.sep) {
          const push = (cfg.sep - Math.abs(g - f)) / 2;
          const s = g <= f ? -1 : 1;
          girl.x = D.clamp(g + s * push, bounds[0], bounds[1]);
          friend.x = D.clamp(f - s * push, bounds[0], bounds[1]);
        }

        // 按深度算一点缩放
        for (const a of all) a.scale = D.depthScale(a.y, 204, 244);
      },

      draw: function (ctx) {
        // 按 y 排序，站在后面的人先画
        const order = all.slice().sort((p, q) => p.y - q.y);
        for (const a of order) {
          D.shadow(ctx, a.x, a.y + 1, D.FRAME_W * (a.scale || 1));
        }
        for (const a of order) D.drawActor(ctx, a, t);
      }
    };

    return api;
  };

})(window);
