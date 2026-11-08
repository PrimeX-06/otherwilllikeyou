/* 单人探索层：场景图 + 双轴走位 + 走到左右边缘换场景
 *
 * G01 里三个人一起走，走位归 trio 管；这一层是「只有玩家一个人」的时候用的。
 * 走廊场景是平视的，但地面从 y≈200 一直铺到画面底部，所以除了左右，
 * 还能往墙根（W / 上）和镜头前（S / 下）走一段：站得越靠前，人越大，
 * 和路人、道具的前后遮挡也按 y 排序。
 *
 * 换场景仍然只发生在左右边缘——墙根和镜头前是走不出去的。
 *
 * 为什么 errand.js 不改成用它：G01 的换场景和交接演出是焊在同一个状态机里的，
 * 搬过来得把 state 一起搬，风险大于收益。
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
      key: "boy", x: 0, y: opts.y || 226, dir: 1, face: "down",
      moving: false, phase: 0, scale: 1
    };

    let sc = opts.start;
    let t = 0;
    let edgeT = 0;
    let enabled = true;
    let transitioning = false;
    const visited = Object.create(null);

    function bounds() { return scenes[sc].walk; }
    function boundsY() { return scenes[sc].y || [202, 258]; }

    const api = {
      actor: actor,
      extras: extras,

      get scene() { return sc; },
      get frozen() { return transitioning; },
      get t() { return t; },

      sceneDef: function () { return scenes[sc]; },

      place: function (x, dir, y) {
        const b = bounds();
        const by = boundsY();
        actor.x = D.clamp(x, b[0], b[1]);
        if (y != null) actor.y = D.clamp(y, by[0], by[1]);
        else actor.y = D.clamp(actor.y, by[0], by[1]);
        if (dir) {
          actor.face = dir === "left" || dir < 0 ? "left" : "right";
          actor.dir = actor.face;
        }
        actor.moving = false;
      },

      /** 开门／关门：关着的时候玩家动不了，但边缘计时也一起清掉，
       *  否则读完对白会立刻被残留的计时送去下一个场景。 */
      enable: function (v) {
        enabled = !!v;
        if (!enabled) { edgeT = 0; actor.moving = false; }
      },
      isEnabled: function () { return enabled; },

      /** 只比左右，留给「走廊另一端」这种不需要纵深的判定。 */
      at: function (x, r) { return Math.abs(actor.x - x) <= (r || 40); },

      /** 双轴判定：先看左右，再看前后。y 和 ry 省略时退化成 at()。 */
      near: function (x, y, rx, ry) {
        if (Math.abs(actor.x - x) > (rx || 40)) return false;
        if (y == null) return true;
        return Math.abs(actor.y - y) <= (ry || 18);
      },

      /** 立刻换（不淡入淡出）：开场摆位、演出结束归位。 */
      jump: function (name, x, dir, y) {
        sc = name;
        const b = bounds();
        const by = boundsY();
        if (x == null) actor.x = D.clamp(actor.x, b[0], b[1]);
        else api.place(x, dir, y);
        actor.y = D.clamp(actor.y, by[0], by[1]);
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
        const by = boundsY();
        actor.x = dir < 0 ? b[1] - 20 : b[0] + 20;
        actor.y = D.clamp(actor.y, by[0], by[1]);
        actor.dir = dir < 0 ? "left" : "right";
        actor.face = actor.dir;
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
        const by = boundsY();
        const canWalk = enabled && !D.dialogOpen();
        const ax = canWalk ? D.axisX() : 0;
        const ay = canWalk ? D.axisY() : 0;

        if (ax !== 0 || ay !== 0) {
          // 斜着走不能比直线快
          const len = Math.sqrt(ax * ax + ay * ay);
          actor.x = D.clamp(actor.x + ax / len * speed * dt, b[0], b[1]);
          actor.y = D.clamp(actor.y - ay / len * speed * dt, by[0], by[1]);
          // 有前后方向时优先用四向行走帧；只左右走时仍用侧面帧。
          if (ay > 0) actor.dir = "up";
          else if (ay < 0) actor.dir = "down";
          else actor.dir = ax > 0 ? "right" : "left";
          actor.face = actor.dir;
          actor.moving = true;
        } else {
          actor.moving = false;
        }

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
        const order = list.slice().sort(function (p, q) { return p.y - q.y; });
        for (const a of order) {
          D.shadow(ctx, a.x, a.y + 1, D.FRAME_W * (a.size || 1));
        }
        for (const a of order) D.drawActor(ctx, a, t);

        if (opts.drawFront) opts.drawFront(ctx, sc, t);
      }
    };

    api.jump(opts.start, opts.x, opts.dir);
    return api;
  };

})(window);
