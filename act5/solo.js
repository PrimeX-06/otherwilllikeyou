/* 单人日常：只有朱里 / 只有由乃
 *
 * 两段很短的小场景，插在周一、周三、周五之间：
 *   周二放学后 · 朱里一个人贴最后一张通知；
 *   周四午休　 · 由乃在楼梯口等人，脚边放着两瓶水。
 *
 * 没有小游戏，只有一段可以自己走过去的对话。走位用 explore 的双轴层，
 * 玩家可以从墙根绕到镜头前，站得越靠前只是越靠下，人不会跟着放大。
 */
(function (global) {
  "use strict";

  const D = global.DAILY;
  D.games = D.games || {};

  const SCENES = {
    afterSchool: {
      bg: "corridor", walk: [46, 468], y: [204, 258],
      name: "走廊 · 放学后"
    },
    noonStair: {
      bg: "stair", walk: [64, 456], y: [204, 258],
      name: "楼梯口 · 午休"
    }
  };

  let choiceCleanup = null;

  /** 和 G02 的「怎么还」同一个样式。不选也会自己往下走。 */
  function choose(lead, options) {
    return new Promise(function (resolve) {
      const box = document.getElementById("soloChoice");
      const leadEl = document.getElementById("soloChoiceLead");
      const list = document.getElementById("soloChoiceBtns");
      if (!box || !leadEl || !list) { resolve(0); return; }

      leadEl.textContent = lead;
      list.innerHTML = "";

      let done = false;
      let timer = 0;

      function finish(i) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        window.removeEventListener("keydown", onKey);
        choiceCleanup = null;
        box.classList.remove("show");
        setTimeout(function () { box.hidden = true; }, 200);
        resolve(i);
      }

      function onKey(e) {
        const n = Number(e.key);
        if (n >= 1 && n <= options.length) finish(n - 1);
      }

      options.forEach(function (text, i) {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = text;
        b.onclick = function () { D.audio.click(); finish(i); };
        list.appendChild(b);
      });

      box.hidden = false;
      requestAnimationFrame(function () { box.classList.add("show"); });
      window.addEventListener("keydown", onKey);
      timer = setTimeout(function () { finish(0); }, 9000);
      choiceCleanup = function () { finish(0); };
    });
  }

  function drawPrompt(ctx, x, y, t) {
    const py = y - 78 + Math.sin(t * 4) * 2;
    ctx.save();
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = "rgba(20,16,22,.78)";
    ctx.fillRect(x - 9, py - 8, 18, 16);
    ctx.strokeStyle = "rgba(255,226,180,.9)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x - 8.5, py - 7.5, 17, 15);
    ctx.fillStyle = "#ffe2b4";
    ctx.font = 'bold 11px "Microsoft YaHei",sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("E", x, py);
    ctx.restore();
  }

  function soloGame(cfg) {
    return function (host) {
      const crowd = D.createCrowd(cfg.crowd);
      const companion = cfg.companion;

      const ex = D.createExplore({
        scenes: SCENES,
        start: cfg.start,
        x: cfg.startX,
        y: cfg.startY,
        dir: 1,
        actors: [companion].concat(crowd.actors)
      });

      let state = "intro";     // intro | approach | talk | done
      let near = false;
      let hintOn = false;

      function setHint(on) {
        if (on === hintOn) return;
        hintOn = on;
        D.hint(on ? "E · 说话" : null, 0);
      }

      function poke() {
        if (state !== "approach" || D.dialogOpen() || !cfg.mumble) return;
        D.audio.blip();
        D.react("我", cfg.mumble, 1300);
        D.react(cfg.who, near ? cfg.mumbleBack : cfg.mumbleFar, 1500);
      }

      async function talk() {
        if (state !== "approach") return;
        state = "talk";
        near = false;
        setHint(false);
        D.reactHint(false);
        ex.enable(false);

        await D.lines(cfg.open);
        const reply = await choose(cfg.lead, cfg.options);
        await D.lines(cfg.branches[reply]);
        await D.lines(cfg.close);

        state = "done";
        D.persist({ [cfg.doneKey]: true, [cfg.replyKey]: cfg.replies[reply] });
        host.done({ id: cfg.id, completed: true, reply: cfg.replies[reply] });
      }

      async function start() {
        D.clearReact();
        D.onPoke(poke);
        host.setChapter(cfg.chapter);
        D.objective(cfg.objective, cfg.sub);
        D.hint(null);
        ex.enable(false);

        await D.fadeTo(0, 420);
        await D.sleep(220);

        await D.lines(cfg.intro);

        state = "approach";
        ex.enable(true);
        D.reactHint("F · 自言自语");
        D.hint(cfg.approachHint, 3600);
        hintOn = false;
      }

      function update(dt) {
        ex.update(dt);
        crowd.update(dt);

        // 她一直看着玩家：站在左边就往左转，站在右边就往右转。
        if (state === "approach") {
          const left = ex.actor.x < companion.x;
          companion.face = left ? "left" : "right";
          companion.dir = left ? -1 : 1;
        }

        if (state !== "approach" || D.dialogOpen()) { near = false; return; }
        near = ex.near(companion.x, companion.y, 54, 30);
        setHint(near);
      }

      function press(key) {
        if (state !== "approach" || D.dialogOpen()) return;
        const k = key.toLowerCase();
        if (k === "e" || key === "Enter") {
          if (!near) return;
          D.audio.click();
          talk();
        }
      }

      function draw(ctx) {
        ex.draw(ctx);
        if (near && state === "approach") drawPrompt(ctx, companion.x, companion.y, ex.t);
      }

      function dispose() {
        D.onPoke(null);
        D.reactHint(false);
        D.clearReact();
        D.hint(null);
        D.objective(null);
        if (choiceCleanup) { choiceCleanup(); choiceCleanup = null; }
        const box = document.getElementById("soloChoice");
        if (box) { box.classList.remove("show"); box.hidden = true; }
      }

      return {
        id: cfg.id,
        title: cfg.title,
        start: start,
        update: update,
        draw: draw,
        press: press,
        setFrozen: function (v) { ex.enable(!v && state === "approach"); },
        dispose: dispose,
        get state() { return state; },
        get x() { return ex.actor.x; },
        get y() { return ex.actor.y; },
        get target() { return { x: companion.x, y: companion.y }; },
        get near() { return near; },
        get scene() { return cfg.start; }
      };
    };
  }

  D.games.soloJurie = soloGame({
    id: "solo_jurie",
    title: "放学后的布告栏",
    chapter: "周二 · 只剩朱里",
    start: "afterSchool",
    startX: 132,
    startY: 232,
    companion: {
      key: "girl", x: 334, y: 220, dir: -1, face: "left",
      moving: false, phase: 0.6, scale: 1
    },
    crowd: { count: 2, xMin: 46, xMax: 468, yMin: 202, yMax: 211, size: 0.78, alpha: 0.6, speed: 18, seed: 41 },
    objective: "她还在布告栏那边",
    sub: "WASD 走近她",
    approachHint: "WASD 走路 · 走到她身边按 E",
    intro: [
      ["旁白", "周二，放学以后。走廊里只开了一半的灯。"],
      ["旁白", "布告栏前站着一个人，怀里还抱着一摞通知，最底下压着一个本子。"],
      ["朱里", "……你还没走？"],
      ["我", "回来拿东西。"],
      ["朱里", "哦。"],
      ["旁白", "她把最后一张通知按在板上，边角还是翘着。"]
    ],
    mumble: "……她一个人贴到什么时候。",
    mumbleBack: "看什么，过来搭把手。",
    mumbleFar: "……别站在那儿看。",
    who: "朱里",
    open: [
      ["我", "要帮忙吗。"],
      ["朱里", "不用。就差这一张。"],
      ["旁白", "她低头去撕胶带，撕了两次都没撕开。"],
      ["我", "……给我吧。"],
      ["旁白", "她没说话，把胶带递过来。"],
      ["旁白", "两个人一起把那张通知按平。她退开半步看了看，还是没说什么。"],
      ["旁白", "夹在通知底下的本子滑出来，摊在地上。"],
      ["旁白", "那一页写了几行字。还没看清，她就伸手按住了。"],
      ["我", "……本子。"],
      ["朱里", "别看。"],
      ["旁白", "她把本子捡起来，合得很用力。"],
      ["朱里", "和臣。"],
      ["我", "嗯？"],
      ["朱里", "你说……一个人有件事一直没跟别人讲，是不是很奇怪。"],
      ["我", "看是什么事。"]
    ],
    lead: "她还在等你说下去。",
    options: ["你想说的时候再说", "现在也可以讲"],
    branches: [
      [
        ["朱里", "……嗯。"],
        ["旁白", "她像是松了口气，又像是更不知道该说什么。"],
        ["朱里", "本子的事，你就当没看见。"]
      ],
      [
        ["朱里", "……现在还不行。"],
        ["旁白", "她笑了一下，很快就收回去了。"],
        ["朱里", "别问。至少今天别问。"]
      ]
    ],
    close: [
      ["旁白", "她把剩下的胶带塞回口袋，把本子放进书包最里面。"],
      ["朱里", "我先走了。明天见。"],
      ["旁白", "她走得比平时快。走到楼梯口才想起来，回头跟我挥了一下手。"]
    ],
    doneKey: "soloJurieCompleted",
    replyKey: "soloJurieReply",
    replies: ["gentle", "direct"]
  });

  D.games.soloYuno = soloGame({
    id: "solo_yuno",
    title: "楼梯口的两瓶水",
    chapter: "周四 · 只剩由乃",
    start: "noonStair",
    startX: 154,
    startY: 234,
    companion: {
      key: "friend", x: 306, y: 218, dir: -1, face: "left",
      moving: false, phase: 1.1, scale: 1
    },
    crowd: { count: 2, xMin: 64, xMax: 456, yMin: 202, yMax: 211, size: 0.78, alpha: 0.6, speed: 16, seed: 52 },
    objective: "由乃在楼梯口等着",
    sub: "WASD 走过去拿水",
    approachHint: "WASD 走路 · 走到她身边按 E",
    intro: [
      ["旁白", "周四，午休。楼梯口的窗户开着，风把窗帘吹得一下一下。"],
      ["旁白", "由乃坐在台阶边上，脚边放着两瓶水。"],
      ["由乃", "来得正好。帮我拿一瓶。"],
      ["我", "给谁的？"],
      ["由乃", "朱里的。她还在楼上。"],
      ["旁白", "她把其中一瓶递给我，瓶身还是凉的。"]
    ],
    mumble: "……她今天怎么坐在这儿。",
    mumbleBack: "站那么远干什么，水不要了？",
    mumbleFar: "喂，水要化了。",
    who: "由乃",
    open: [
      ["我", "她最近老往楼上跑。"],
      ["由乃", "嗯。二班那边。"],
      ["我", "去找人？"],
      ["旁白", "由乃拧开自己那瓶，喝了一口，没马上回答。"],
      ["由乃", "大概吧。"],
      ["由乃", "和臣，你认识二班的宋遥吗？"],
      ["我", "听过名字。怎么了。"],
      ["旁白", "她把瓶盖拧紧，抬起眼睛。"],
      ["由乃", "帮我去问问她，现在有没有喜欢的人。"],
      ["我", "……你自己怎么不问。"],
      ["由乃", "我去问，太像在替谁打听。"]
    ],
    lead: "由乃把瓶盖拧紧，等我把话接下去。",
    options: ["为什么让我去问", "为什么不能告诉朱里"],
    branches: [
      [
        ["我", "为什么让我去问。"],
        ["由乃", "你去问，她不会多想。"],
        ["我", "……你会想得挺多。"],
        ["由乃", "所以我才不去。"]
      ],
      [
        ["我", "为什么不能告诉朱里。"],
        ["由乃", "她要是知道我在替她打听，会先跟我急。"],
        ["我", "你们俩真麻烦。"],
        ["由乃", "嗯。你也一样。"]
      ]
    ],
    close: [
      ["旁白", "上课铃响之前，她先上楼了。"],
      ["由乃", "水给她带上去。"],
      ["旁白", "走了两级台阶，她又停下来。"],
      ["由乃", "还有，别跟朱里说是我让你问的。"],
      ["我", "……刚才还让我去问。"],
      ["由乃", "问的是二班，不是她。"],
      ["我", "……"],
      ["由乃", "对。就这样。"]
    ],
    doneKey: "soloYunoCompleted",
    replyKey: "soloYunoReply",
    replies: ["whyMe", "secret"]
  });

})(window);
