/* 第三幕 · 校园日常 — 章节壳
 *
 * 负责：加载资源、目录、按顺序串起四个小游戏、统一的按键路由。
 * 小游戏自己不知道彼此存在，也不知道章节怎么结束——它只调 host.done()。
 */
(function (global) {
  "use strict";

  const D = global.DAILY;
  const W = D.W, H = D.H;

  const ASSETS = {
    corridor: "../assets/scenes/school_corridor_door_pixel.png",
    stair: "../act4/after-broadcast/assets/stairwell.png",
    railing: "../assets/scenes/school_corridor_railing_pixel.png",
    field: "../assets/scenes/school_exterior.png",
    boy: "../assets/characters/boy/v2/boy_sheet_v2.png",
    girl: "../assets/characters/girl/v2/girl_sheet_v2.png",
    friend: "../assets/characters/friend/v2/friend_sheet_v2.png"
  };

  // 四个日常按日期排开，不硬凑成同一天（设计稿第 7 章）。
  const EVENTS = [
    { id: "errand", day: "周一", name: "一起去办事", playable: true, key: "errandCompleted" },
    { id: "search", day: "周三", name: "校园寻物", playable: true, key: "searchCompleted" },
    { id: "word", day: "周五", name: "课间猜词", playable: true, key: "wordGameCompleted" },
    { id: "ball", day: "下周一", name: "体育活动", playable: true, key: "ballGameCompleted" }
  ];

  const GAME = {
    errand: function () { return D.games.errand; },
    search: function () { return D.games.search; },
    word: function () { return D.games.wordgame; },
    ball: function () { return D.games.ball; }
  };

  const canvas = document.getElementById("scene");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  const hubEl = document.getElementById("hub");
  const hubList = document.getElementById("hubList");
  const cardEl = document.getElementById("card");
  const cardTitle = document.getElementById("cardTitle");
  const cardBody = document.getElementById("cardBody");
  const chapterEl = document.getElementById("chapter");

  let current = null;
  let currentResolve = null;
  let last = 0;
  let raf = 0;
  let busy = false;

  // ---------------------------------------------------------------- host

  const host = {
    setBackground: function () { /* 背景由各小游戏自己画 */ },
    setChapter: function (text) { chapterEl.textContent = "校园日常 / " + text; },
    done: function (result) {
      const r = currentResolve;
      currentResolve = null;
      if (r) r(result);
    }
  };

  function runGame(factory) {
    return new Promise(function (resolve) {
      const game = factory(host);
      current = game;
      currentResolve = function (result) {
        // 小游戏自己的 HUD / 面板在这里统一收掉。
        // 以前只 resolve，谁都不调用 dispose()，G04 的「传接 5/5」就一直挂在目录和结果卡上。
        if (typeof game.dispose === "function") game.dispose();
        resolve(result);
      };
      game.start();
    });
  }

  // ---------------------------------------------------------------- 目录

  function renderHub() {
    hubList.innerHTML = "";
    EVENTS.forEach(function (ev) {
      const done = ev.key && D.store[ev.key];
      const li = document.createElement("li");
      li.className = ev.playable ? (done ? "done" : "playable") : "locked";
      li.dataset.id = ev.id;

      const day = document.createElement("span");
      day.className = "day";
      day.textContent = ev.day;

      const name = document.createElement("span");
      name.className = "name";
      name.textContent = ev.name;

      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = done ? "已完成" : ev.playable ? "可玩" : ev.tag;

      li.append(day, name, tag);
      if (ev.playable && !busy) {
        li.addEventListener("click", function () { playEvent(ev.id); });
      }
      hubList.appendChild(li);
    });
  }

  function showHub() {
    renderHub();
    hubEl.hidden = false;
    requestAnimationFrame(function () { hubEl.classList.add("show"); });
    chapterEl.textContent = "校园日常";
  }

  function hideHub() {
    hubEl.classList.remove("show");
    hubEl.hidden = true;
  }

  function showCard(title, body, again) {
    cardTitle.textContent = title;
    cardBody.textContent = body;
    cardEl.hidden = false;
    requestAnimationFrame(function () { cardEl.classList.add("show"); });
    document.getElementById("cardAgain").onclick = function () {
      cardEl.classList.remove("show");
      cardEl.hidden = true;
      if (again) again();
    };
    document.getElementById("cardBack").onclick = function () {
      cardEl.classList.remove("show");
      cardEl.hidden = true;
      showHub();
    };
  }

  // ---------------------------------------------------------------- 串场

  async function playEvent(id) {
    if (busy || !GAME[id]) return;
    busy = true;
    hideHub();
    cardEl.hidden = true;

    await D.fadeTo(1, 220);
    await runGame(GAME[id]());
    current = null;
    await D.fadeTo(1, 200);
    await D.fadeTo(0, 240);

    busy = false;
    showHub();
  }

  /** 按顺序走一遍：周一 → 周三 → 周五 → 章节尾。 */
  async function playAll() {
    if (busy) return;
    busy = true;
    hideHub();
    cardEl.hidden = true;

    await D.fadeTo(1, 220);
    await runGame(D.games.errand);
    current = null;
    await D.fadeTo(1, 180);

    chapterEl.textContent = "校园日常 / 隔了一天";
    await D.lines([
      ["旁白", "隔了一天。"],
      ["旁白", "走廊还是那条走廊。她站在教室门口，书包翻开着。"],
      ["闺蜜", "哟，又碰上了。"],
      ["朱里", "……正好。"]
    ]);
    await D.fadeTo(0, 240);

    await runGame(D.games.search);
    current = null;
    await D.fadeTo(1, 180);

    chapterEl.textContent = "校园日常 / 又过了两天";
    await D.lines([
      ["旁白", "又过了两天。"],
      ["旁白", "课间十分钟，教室里闹哄哄的。"],
      ["闺蜜", "来来来，玩个猜词。"]
    ]);
    await D.fadeTo(0, 240);

    await runGame(D.games.wordgame);
    current = null;
    await D.fadeTo(1, 180);

    chapterEl.textContent = "校园日常 / 又过了一个周末";
    await D.lines([
      ["旁白", "又过了一个周末。"],
      ["旁白", "放学后楼前那块空地还没什么人。"]
    ]);
    await D.fadeTo(0, 240);

    await runGame(D.games.ball);
    current = null;
    await D.fadeTo(1, 200);
    await D.fadeTo(0, 240);

    busy = false;
    D.persist({ chapterDailyDone: true });
    // 结果卡是整章的收束，左上角别还挂着最后一场球赛的场景名
    chapterEl.textContent = "校园日常";
    showCard(
      "那几个日常",
      "周一送过东西，周三找过一张卡，周五猜过几个词，下周一在楼前把球来回推了几趟。" +
      "都是很小的事，小到当时没觉得有什么。" +
      "只是后来再走那条走廊，会下意识往她们班门口看一眼。",
      playAll
    );
  }

  // ---------------------------------------------------------------- 循环

  function drawIdle() {
    if (D.img.corridor) ctx.drawImage(D.img.corridor, 0, 0, W, H);
    else { ctx.fillStyle = "#241f28"; ctx.fillRect(0, 0, W, H); }
    ctx.fillStyle = "rgba(24,18,26,.55)";
    ctx.fillRect(0, 0, W, H);
  }

  function frame(ts) {
    if (!last) last = ts;
    const dt = Math.min(0.05, (ts - last) / 1000);
    last = ts;

    if (current && current.update) current.update(dt);
    ctx.clearRect(0, 0, W, H);
    if (current && current.draw) current.draw(ctx);
    else drawIdle();

    raf = requestAnimationFrame(frame);
  }

  // ---------------------------------------------------------------- 输入

  D.onPress(function (key) {
    D.audio.unlock();
    if (D.dialogOpen()) { D.advance(); return; }
    if (current && current.press) current.press(key);
  });

  document.getElementById("stage").addEventListener("pointerdown", function () {
    D.audio.unlock();
    if (D.dialogOpen()) D.advance();
  });

  D.on("dialog:start", function () { if (current && current.setFrozen) current.setFrozen(true); });
  D.on("dialog:end", function () { if (current && current.setFrozen) current.setFrozen(false); });

  document.getElementById("hubStart").onclick = playAll;
  document.getElementById("hubReset").onclick = function () {
    D.wipe();
    renderHub();
  };

  // ---------------------------------------------------------------- 启动

  (async function boot() {
    D.initDialog({
      root: document.getElementById("dialog"),
      who: document.getElementById("who"),
      line: document.getElementById("line")
    });
    const objEl = document.getElementById("obj");
    D.initObjective({
      root: objEl,
      title: objEl.querySelector("b"),
      sub: document.getElementById("objSub")
    });
    D.initHint(document.getElementById("hint"));
    D.initFade(document.getElementById("fade"));

    try {
      await D.loadAll(ASSETS);
    } catch (e) {
      cardEl.hidden = false;
      cardEl.classList.add("show");
      cardTitle.textContent = "资源没加载上";
      cardBody.textContent = String(e && e.message ? e.message : e);
      return;
    }

    renderHub();
    await D.fadeTo(0, 420);
    raf = requestAnimationFrame(frame);
  })();

  // 自检和调试用
  global.__daily = {
    get current() { return current; },
    get busy() { return busy; },
    events: EVENTS,
    play: playEvent,
    playAll: playAll,
    hub: function () { showHub(); },
    store: function () { return D.store; }
  };

})(window);
