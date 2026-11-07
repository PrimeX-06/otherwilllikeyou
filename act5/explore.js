/* 单人探索层：场景图 + 走位 + 走到边缘换场景
 *
 * G01 里三个人一起走，走位归 trio 管；这一层是「只有玩家一个人」的时候用的。
 * 一个人站在走廊里找东西，没有队伍要维持，也没人跟着，逻辑比 trio 简单得多：
 * 只有一个人、一条 x 轴、一张场景表。
 *
 * 为什么 errand.js 不改成用它：G01 的换场景和交接演出是焊在同一个状态机里的，
 * 搬过来得把 state 一起搬，风险大于收益。等 G04 落地再一起收。
 */
(function (global) {
  "use strict";

  const D = global.DAILY;

  /** opts = { scenes, start, x, dir, y, speed, actors, drawBack, drawFront, onScene } */
  D.createExplore = function (opts) {
    const scenes = opts.scenes;
    const speed = opts.speed || 78;
    const extras = opts.actors || [];

    const actor = {
      key: "boy", x: 0, y: opts.y || 226, dir: 1, moving: false, phase: 0, scale: 1
    };

    let sc = opts.start;
    let t = 0;
    let edgeT = 0;
    let enabled = true;
    let transitioning = false;
    const visited = Object.create(null);

    function bounds() { return scenes[sc].walk; }

    const api = {
      actor: actor,
      extras: extras,

      get scene() { return sc; },
      get frozen() { return transitioning; },
      get t() { return t; },

      sceneDef: function () { return scenes[sc]; },

      place: function (x, dir) {
        const b = bounds();
        actor.x = D.clamp(x, b[0], b[1]);
        if (dir) actor.dir = dir;
        actor.moving = false;
      },

      /** 开门／关门：关着的时候玩家动不了，但边缘计时也一起清掉，
       *  否则读完对白会立刻被残留的计时送去下一个场景。 */
      enable: function (v) {
        enabled = !!v;
        if (!enabled) { edgeT = 0; actor.moving = false; }
      },
      isEnabled: function () { return enabled; },

      at: function (x, r) { return Math.abs(actor.x - x) <= (r || 40); },

      /** 立刻换（不淡入淡出）：开场摆位、演出结束归位。 */
      jump: function (name, x, dir) {
        sc = name;
        const b = bounds();
        if (x == null) actor.x = D.clamp(actor.x, b[0], b[1]);
        else api.place(x, dir);
      },

      /** 走到边缘继续按方向 → 淡出、换图、淡入。 */
      go: async function (next, dir) {
        if (transitioning || !scenes[next]) return;
        transitioning = true;
        enabled = false;
        edgeT = 0;
        await D.fadeTo(1, 230);
        sc = next;
        const b = bounds();
        actor.x = dir < 0 ? b[1] - 20 : b[0] + 20;
        actor.dir = dir < 0 ? -1 : 1;
        actor.moving = false;
        await D.fadeTo(0, 250);
        transitioning = false;
        enabled = true;
        const first = !visited[sc];
        visited[sc] = true;
        if (opts.onScene) opts.onScene(sc, first);
      },

      update: function (dt) {
        t += dt;
        if (transitioning) return;

        const b = bounds();
        const canWalk = enabled && !D.dialogOpen();
        const ax = canWalk ? D.axisX() : 0;

        if (ax !== 0) {
          actor.dir = ax;
          actor.moving = true;
          actor.x = D.clamp(actor.x + ax * speed * dt, b[0], b[1]);
        } else {
          actor.moving = false;
        }
        actor.scale = D.depthScale(actor.y, 204, 244);

        if (!canWalk) { edgeT = 0; return; }

        const S = scenes[sc];
        const atLeft = actor.x <= b[0] + 0.8 && ax < 0;
        const atRight = actor.x >= b[1] - 0.8 && ax > 0;
        const dir = atLeft ? -1 : atRight ? 1 : 0;

        if (!dir) { edgeT = 0; return; }
        edgeT += dt;
        if (edgeT < 0.3) return;
        edgeT = 0;
        const next = dir < 0 ? S.left : S.right;
        if (next) api.go(next, dir);
      },

      draw: function (ctx) {
        ctx.drawImage(D.img[scenes[sc].bg], 0, 0, D.W, D.H);
        if (opts.drawBack) opts.drawBack(ctx, sc, t);

        const list = [actor];
        for (const a of extras) if (!a.hidden) list.push(a);

        // 按 y 排序，站在后面的人先画——和 trio 一样的规矩，
        // 这样路过站在门口的人身边时，是前后错开而不是叠成一团。
        for (const a of list) a.scale = D.depthScale(a.y, 204, 244);
        const order = list.slice().sort(function (p, q) { return p.y - q.y; });
        for (const a of order) D.shadow(ctx, a.x, a.y + 1, D.FRAME_W * (a.scale || 1));
        for (const a of order) D.drawActor(ctx, a, t);

        if (opts.drawFront) opts.drawFront(ctx, sc, t);
      }
    };

    api.jump(opts.start, opts.x, opts.dir);
    return api;
  };

})(window);
