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
    ballSheet: "../assets/minigame/ball_sheet.png",
    dayField: "../assets/minigame/cutscene_next_monday_field.png",
    g01Handoff: "../assets/cg/act5/story_g01_handoff_512.png",
    g03Bench: "../assets/cg/act5/story_g03_bench_512.png",
    g04Exit: "../assets/cg/act5/story_g04_exit_512.png",
    iconMon: "../assets/minigame/icon_day_mon.png",
    iconTue: "../assets/minigame/icon_day_tue.png",
    iconWed: "../assets/minigame/icon_day_wed.png",
    iconThu: "../assets/minigame/icon_day_thu.png",
    iconFri: "../assets/minigame/icon_day_fri.png",
    iconNextMon: "../assets/minigame/icon_day_nextmon.png",
    boy: "../assets/characters/boy/v2/boy_sheet_act5.png",
    girl: "../assets/characters/girl/v2/girl_sheet_act5_carry.png",
    friend: "../assets/characters/friend/v2/friend_sheet_act5_carry.png",
    npcBoyDown: "../assets/characters/npc_generated/boy_walk_down_sheet.png",
    npcBoyUp: "../assets/characters/npc_generated/boy_walk_up_sheet.png",
    npcBoyLeft: "../assets/characters/npc_generated/boy_walk_left_sheet.png",
    npcBoyRight: "../assets/characters/npc_generated/boy_walk_right_sheet.png",
    npcGirlDown: "../assets/characters/npc_generated/girl_walk_down_sheet.png",
    npcGirlUp: "../assets/characters/npc_generated/girl_walk_up_sheet.png",
    npcGirlLeft: "../assets/characters/npc_generated/girl_walk_left_sheet.png",
    npcGirlRight: "../assets/characters/npc_generated/girl_walk_right_sheet.png"
  };

  // 日常按日期排开，中间插两段只有一个人的短场景。
  const EVENTS = [
    { id: "errand", day: "周一", name: "一起去办事", playable: true, key: "errandCompleted" },
    { id: "jurie", day: "周二", name: "放学后的布告栏", playable: true, key: "soloJurieCompleted" },
    { id: "search", day: "周三", name: "校园寻物", playable: true, key: "searchCompleted" },
    { id: "yuno", day: "周四", name: "楼梯口的两瓶水", playable: true, key: "soloYunoCompleted" },
    { id: "word", day: "周五", name: "课间猜人物", playable: true, key: "wordGameCompleted" },
    { id: "ball", day: "下周一", name: "体育活动", playable: true, key: "ballGameCompleted" }
  ];

  // 自动时间线的跨日卡。周一 / 周五 / 下周一复用 assets/cg/act5 里的过门 CG；
  // 周三没有对应 CG，先拿走廊图压暗占位。
  // 日期和时间由卡面负责；各游戏自己的日期开场只出现一次，外层不再重述。
  const DAYS = [
    {
      day: "周一", sub: "第一节下课铃响过", bg: ASSETS.g01Handoff, icon: ASSETS.iconMon, bell: true,
      lines: [["旁白", "朱里在布告栏那边招了下手。"]]
    },
    {
      day: "周二", sub: "放学以后", bg: ASSETS.corridor, icon: ASSETS.iconTue,
      lines: []
    },
    {
      day: "周三", sub: "隔了一天", bg: ASSETS.corridor, icon: ASSETS.iconWed,
      lines: []
    },
    {
      day: "周四", sub: "午休，楼梯口", bg: ASSETS.stair, icon: ASSETS.iconThu,
      lines: []
    },
    {
      day: "周五", sub: "又过了两天", bg: ASSETS.g03Bench, icon: ASSETS.iconFri,
      lines: []
    },
    {
      day: "下周一", sub: "又过了一个周末", bg: ASSETS.dayField, icon: ASSETS.iconNextMon,
      lines: []
    }
  ];

  // 默认进来就按时间线走；?hub=1 才显示单场目录（调试 / 清存档）。
  const MANUAL_HUB = new URLSearchParams(location.search).get("hub") === "1";


  const GAME = {
    errand: function () { return D.games.errand; },
    jurie: function () { return D.games.soloJurie; },
    search: function () { return D.games.search; },
    yuno: function () { return D.games.soloYuno; },
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
  const storyCg = document.getElementById("storyCg");
  const dayCard = document.getElementById("dayCard");
  const dayBg = document.getElementById("dayBg");
  const dayIcon = document.getElementById("dayIcon");
  const dayName = document.getElementById("dayName");
  const daySub = document.getElementById("daySub");

  let current = null;
  let currentResolve = null;
  let last = 0;
  let raf = 0;
  let busy = false;
  const daysShown = [];

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
        // 以前只 resolve，谁都不调用 dispose()，G04 的比分牌就一直挂在目录上。
        if (typeof game.dispose === "function") game.dispose();
        resolve(result);
      };
      game.start();
    });
  }

  // ---------------------------------------------------------------- 目录

  function hasFinishedDailyEvents() {
    return !!D.store.chapterDailyDone || EVENTS.every(function (ev) { return !!D.store[ev.key]; });
  }

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
    document.getElementById("afterStoryHub").hidden = !hasFinishedDailyEvents();
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
    document.getElementById("afterStoryCard").hidden = !hasFinishedDailyEvents();
    document.getElementById("cardBack").hidden = !MANUAL_HUB;
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

  // ---------------------------------------------------------------- 自动时间线

  function nextUnfinishedIndex() {
    for (let i = 0; i < EVENTS.length; i++) {
      if (!D.store[EVENTS[i].key]) return i;
    }
    return EVENTS.length;
  }

  function resetDaily() {
    EVENTS.forEach(function (ev) { delete D.store[ev.key]; });
    delete D.store.chapterDailyDone;
    daysShown.length = 0;
    D.persist();
    renderHub();
  }

  /** 黑场里压一张日期卡，再回到画面上说一句短旁白。 */
  async function timeSkip(i) {
    const day = DAYS[i];
    daysShown.push(day.day);
    dayBg.src = day.bg;
    dayIcon.src = day.icon;
    dayName.textContent = day.day;
    daySub.textContent = day.sub;
    dayCard.hidden = false;
    requestAnimationFrame(function () { dayCard.classList.add("show"); });
    if (day.bell) D.audio.bell();
    await D.sleep(1150);
    dayCard.classList.remove("show");
    await D.sleep(320);
    dayCard.hidden = true;

    chapterEl.textContent = "校园日常 / " + day.day;
    if (day.lines.length) {
      await D.fadeTo(0, 240);
      await D.lines(day.lines);
      await D.fadeTo(1, 180);
    }
  }

  function showChapterCard() {
    showCard(
      "那几个日常",
      "周一送过东西，周二陪朱里贴完最后一张通知，周三找过一张卡，" +
      "周四午休在楼梯口碰见由乃，周五猜过几个词，下周一在楼前踢了一场球。" +
      "都是很小的事，小到当时没觉得有什么。" +
      "只是后来再走那条走廊，会下意识往她们班门口看一眼。",
      function () { resetDaily(); playAll(0); }
    );
  }

  /** 按时间线往下走。from 省略时从第一个没做完的日期续播。 */
  async function playAll(from) {
    if (busy) return;
    busy = true;
    hideHub();
    cardEl.classList.remove("show");
    cardEl.hidden = true;
    storyCg.hidden = true;
    D.audio.unlock();

    const start = Math.max(0, Math.min(
      typeof from === "number" ? from : nextUnfinishedIndex(),
      EVENTS.length));
    let ballPlayed = false;

    for (let i = start; i < EVENTS.length; i++) {
      if (D.store[EVENTS[i].key]) continue;
      await D.fadeTo(1, 220);
      await timeSkip(i);
      await runGame(GAME[EVENTS[i].id]());
      current = null;
      // G03 收尾已经说了上课铃；这里补一声，再做周末跳切。
      if (EVENTS[i].id === "word") D.audio.bell();
      if (EVENTS[i].id === "ball") ballPlayed = true;
    }

    // 比分 HUD 已经随 dispose 收掉。散场先看一张收东西的过门 CG，再出结果卡。
    if (ballPlayed) {
      await D.fadeTo(1, 200);
      storyCg.src = ASSETS.g04Exit;
      storyCg.alt = "球赛结束，三个人在楼前收东西";
      storyCg.hidden = false;
      chapterEl.textContent = "校园日常 / 下周一";
      await D.fadeTo(0, 300);
      await D.lines([["旁白", "散场时，天色已经暗了一些。"]]);
      await D.fadeTo(1, 220);
      storyCg.hidden = true;
      await D.fadeTo(0, 240);
    }

    busy = false;
    D.persist({ chapterDailyDone: true });
    // 结果卡是整章的收束，左上角别还挂着最后一场球赛的场景名
    chapterEl.textContent = "校园日常";
    showChapterCard();
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
    // F 是四个小游戏共用的「主动发起」。收在章节壳里统一路由，
    // 各游戏只要在 start() 里 D.onPoke(handler) 就能接住，不用各自改 press()。
    if (key.toLowerCase() === "f") { D.poke(); return; }
    if (current && current.press) current.press(key);
  });

  document.getElementById("stage").addEventListener("pointerdown", function () {
    D.audio.unlock();
    if (D.dialogOpen()) D.advance();
  });

  D.on("dialog:start", function () { if (current && current.setFrozen) current.setFrozen(true); });
  D.on("dialog:end", function () { if (current && current.setFrozen) current.setFrozen(false); });

  document.getElementById("hubStart").onclick = function () { playAll(0); };
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
    D.initReact({
      root: document.getElementById("react"),
      btn: document.getElementById("reactBtn")
    });

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
    raf = requestAnimationFrame(frame);

    if (MANUAL_HUB) {
      await D.fadeTo(0, 420);
      showHub();
      return;
    }

    const next = nextUnfinishedIndex();
    if (next >= EVENTS.length) {
      D.persist({ chapterDailyDone: true });
      await D.fadeTo(0, 420);
      chapterEl.textContent = "校园日常";
      showChapterCard();
      return;
    }

    // 从黑场直接起日期卡，别先露出一帧空走廊。
    playAll(next);
  })();

  // 自检和调试用
  global.__daily = {
    get current() { return current; },
    get busy() { return busy; },
    get daysShown() { return daysShown.slice(); },
    events: EVENTS,
    play: playEvent,
    playAll: playAll,
    hub: function () { showHub(); },
    store: function () { return D.store; }
  };

})(window);
