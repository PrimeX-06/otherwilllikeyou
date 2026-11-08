/* G02《校园寻物》— 线索收集 + 环境观察
 *
 * 周三中午，她的校园卡不见了。她在教室门口翻书包，你一个人出去找。
 *
 * 设计稿第 4 章要求的三件事，都在这里：
 *  1. 八处可看的东西，只有四处跟卡有关，其余是**真的、但没用**的观察——
 *     不是假线索。找东西的时候本来就大部分白看。
 *  2. 线索分三种：亲眼看见 / 我记得 / 我猜的。猜的那条在对话里就把话说全了
 *     （「也可能只是谁的手蹭到了」），线索本里也单独归一类，不和观察混着放。
 *  3. 卡一直就在楼梯口的窗台上。不需要先听完线索才能捡——
 *     提前找到的话，收尾对话会承认「你怎么直接就找到了」。
 *  4. 摊开线索之后能打开二楼平面图，把地点钉出来，拼「她上午去过哪」。
 *     钉的先后就是画的线——三站顺序不对，线也拐不到一块儿去。
 *     拼对不拦路、拼错也不拦路；拼对只换来一句「果然在这儿」和一条明路。
 */
(function (global) {
  "use strict";

  const D = global.DAILY;
  D.games = D.games || {};

  // 走廊是平视的，但地面从 y≈200 铺到画面底部：左右换场景，
  // 前后（W / 上、S / 下）只在地面里走，站得越靠前越大。
  const FLOOR = [204, 258];

  const SCENES = {
    corridor: { bg: "corridor", walk: [46, 468], y: FLOOR, left: "stair", name: "走廊" },
    stair: { bg: "stair", walk: [64, 456], y: FLOOR, left: "railing", right: "corridor", name: "楼梯口" },
    railing: { bg: "railing", walk: [52, 466], y: FLOOR, right: "stair", name: "楼上 · 走廊" }
  };

  // 卡在楼梯口窗台上。楼梯间的窗台横在 y≈150、x 165..500，这一格是空的，
  // 放得下，而且从地面看过去正好在视线上方一点——不走近不会注意到。
  // standY 是玩家站在地上能看窗台的那条线，不是卡本身的高度。
  const CARD = { scene: "stair", x: 300, y: 150, standY: 214 };

  // 门口站着的两个人。她们不进队伍，就在原地等——G02 是一个人找东西，
  // 三个人一起翻箱倒柜反而不像话。
  const GIRL = { key: "girl", x: 238, y: 212, dir: 1, moving: false, phase: 0.4, scale: 1 };
  const FRIEND = { key: "friend", x: 204, y: 236, dir: 1, moving: false, phase: 0.9, scale: 1 };

  // ---------------------------------------------------------------- 八处

  const POINTS = {
    corridor: [
      {
        id: "door", x: 256, r: 46, label: "看一眼门缝",
        lines: [
          ["旁白", "门没关严，留了一道缝。"],
          ["旁白", "里面桌子都没收，练习册摊着，笔搁在页边上。"],
          ["我", "……笔帽都没盖。"],
          ["旁白", "走得很急。"]
        ],
        clues: [{
          kind: "see",
          pin: "classroom",
          text: "教室里的桌子没收，笔搁在练习册上，笔帽没盖。",
          from: "走廊 · 门缝"
        }]
      },
      {
        id: "board", x: 338, r: 44, label: "看布告栏",
        lines: [
          ["旁白", "布告栏上钉着几张通知，最上面那张是新的。"],
          ["我", "「校园卡挂失补办流程」……"],
          ["旁白", "底下那张被撕掉了一半，只剩日期。"]
        ],
        clues: [{
          kind: "see",
          pin: "lostfound",
          text: "布告栏最上面新钉了一张「校园卡挂失补办流程」。",
          from: "走廊 · 布告栏"
        }]
      },
      {
        id: "sill", x: 95, r: 44, label: "看左边窗台",
        lines: [
          ["旁白", "窗台上落了一层灰，被太阳照得发白。"],
          ["我", "……这块是干净的。"],
          ["旁白", "灰里有一个长方形的印子，边角很齐。有东西在这儿放过一阵，又被拿走了。"],
          ["我", "她只在一个地方会把卡掏出来。"],
          ["旁白", "接水的时候。开水房要刷卡。"]
        ],
        clues: [
          {
            kind: "see",
            pin: "windowsill",
            text: "左边窗台的灰里有一块干净的长方形印子——有东西在这儿放过，又被拿走了。",
            from: "走廊 · 左边窗台"
          },
          {
            kind: "remember",
            pin: "cooler",
            text: "她说过，卡她只在接水的时候拿出来——开水房要刷卡。",
            from: "走廊 · 左边窗台"
          }
        ]
      },
      {
        id: "plate", x: 203, r: 40, label: "看门边的牌子",
        lines: [
          ["旁白", "门边钉着一块小牌子。"],
          ["我", "高二（三）班。"],
          ["旁白", "牌子下沿被人用指甲刮花了一小块，看不出原来是什么。"]
        ],
        clues: [{
          kind: "see",
          pin: "classroom",
          text: "门边的牌子写着高二（三）班，下沿被刮花了一小块。",
          from: "走廊 · 班级牌"
        }]
      }
    ],

    stair: [
      {
        id: "rail", x: 120, r: 44, label: "看扶手",
        lines: [
          ["旁白", "扶手是铁的，摸上去冰手。"],
          ["我", "这儿蹭了一道白灰。"],
          ["旁白", "还没干透。"],
          ["我", "……有人刚扶着这儿上过楼。"],
          ["旁白", "（这是猜的。也可能只是谁的手蹭到了。）"]
        ],
        clues: [{
          kind: "guess",
          pin: "stair",
          text: "扶手上有一道没干的白灰，可能刚有人扶着上过楼。",
          from: "楼梯口 · 扶手"
        }]
      },
      {
        id: "can", x: 430, r: 44, label: "看垃圾桶",
        lines: [
          ["旁白", "垃圾桶快满了，边上还压着一个没塞进去的纸袋。"],
          ["我", "……面包袋。"],
          ["旁白", "袋子上的日期是今天。"]
        ],
        clues: [{
          kind: "see",
          pin: "bin",
          text: "垃圾桶快满了，最上面那个面包袋的日期是今天。",
          from: "楼梯口 · 垃圾桶"
        }]
      }
    ],

    railing: [
      {
        id: "ledge", x: 200, r: 46, label: "看栏杆平台",
        lines: [
          ["旁白", "栏杆平台上放着一个空水瓶，瓶身被晒得发烫。"],
          ["我", "不是她的。"],
          ["旁白", "瓶子上贴着一张写了名字的标签，字不是她的。"]
        ],
        clues: [{
          kind: "see",
          pin: "stair",
          text: "栏杆平台上有个空水瓶，标签上的名字不是她。",
          from: "楼上 · 栏杆"
        }]
      },
      {
        id: "column", x: 336, r: 44, label: "看柱子",
        lines: [
          ["旁白", "柱子上有几道很浅的铅笔印，一道压着一道。"],
          ["我", "她说过，她们班的人爱在这根柱子上画道道。"],
          ["旁白", "一道一道，从低到高。"]
        ],
        clues: [{
          kind: "remember",
          pin: "stair",
          text: "她说过，她们班的人爱在这根柱子上画道道。",
          from: "楼上 · 柱子"
        }]
      }
    ]
  };

  // 互动点的纵向站位：墙上的东西在墙根，垃圾桶在靠前一点的地面。
  // 玩家不必精确站到某条线上，但站在镜头最前面时够不到墙根。
  const SPOT_Y = {
    door: 214, board: 214, sill: 214, plate: 214,
    rail: 214, can: 226, ledge: 214, column: 214
  };
  Object.keys(POINTS).forEach(function (scene) {
    POINTS[scene].forEach(function (p) { p.y = SPOT_Y[p.id] == null ? 216 : SPOT_Y[p.id]; });
  });

  // ---------------------------------------------------------------- 平面图上的地点

  // x / y 是 assets/minigame/map_floor2.png（256×160）上的坐标，不是场景坐标。
  // 位置尽量贴着图上已有的标签：窗台 / 饮水 / 招领 / 教室 / 楼梯；
  // 垃圾桶和监控在图上没有字，面板里补两个小标签。
  const SPOTS = {
    classroom: { x: 52, y: 27, name: "教室" },
    windowsill: { x: 37, y: 73, name: "窗台" },
    cooler: { x: 102, y: 73, name: "饮水机" },
    bin: { x: 146, y: 73, name: "垃圾桶" },
    lostfound: { x: 183, y: 73, name: "招领处" },
    cctv: { x: 218, y: 73, name: "监控" },
    stair: { x: 238, y: 39, name: "楼梯" }
  };

  // 她上午真正走过的那三站，顺序就是地图上那条线的顺序：
  // 先从教室出来，去饮水机接水掏了卡，最后把卡落在楼梯口的窗台上。
  // 「我猜的」那条（扶手）钉在 stair 上，而 stair 不在答案里——
  // 把它也钉上，路线就多出一站；去掉它，正好三站。
  const ROUTE = ["classroom", "cooler", "windowsill"];

  // 三级提示。不说「去楼梯口」，先说「她上午只出去过一次」，
  // 让玩家自己把方向想出来；连按三次才给到底。
  const HINTS = [
    "你先别翻了。她上午就出去过一次，就一会儿。",
    "出去那次是接水。接水得刷卡。",
    "楼梯口那个窗台。你去看一眼就知道了。"
  ];

  const KIND = {
    see: { label: "亲眼看见", cls: "k-see" },
    remember: { label: "我记得", cls: "k-rem" },
    guess: { label: "我猜的", cls: "k-gue" }
  };

  // ---------------------------------------------------------------- 游戏

  D.games.search = function (host) {
    // 每个场景各有一小队路人。换场景时只放当前这一队出来，
    // 免得楼上楼下的人影被同一批对象带着走。
    const crowds = {
      corridor: D.createCrowd({ count: 2, xMin: 46, xMax: 468, yMin: 202, yMax: 211, size: 0.78, alpha: 0.6, speed: 20, seed: 11 }),
      stair: D.createCrowd({ count: 2, xMin: 64, xMax: 456, yMin: 202, yMax: 211, size: 0.78, alpha: 0.6, speed: 18, seed: 22 }),
      railing: D.createCrowd({ count: 2, xMin: 52, xMax: 466, yMin: 202, yMax: 211, size: 0.78, alpha: 0.6, speed: 21, seed: 33 })
    };
    const walkers = [];
    Object.keys(crowds).forEach(function (k) {
      crowds[k].actors.forEach(function (a) { a.scene = k; walkers.push(a); });
    });

    const ex = D.createExplore({
      scenes: SCENES,
      start: "corridor",
      x: 176,
      dir: 1,
      y: 228,
      actors: [GIRL, FRIEND].concat(walkers),
      drawBack: drawBack,
      onScene: onScene
    });

    const el = {
      btn: document.getElementById("nbBtn"),
      nb: document.getElementById("nb"),
      list: document.getElementById("nbList"),
      empty: document.getElementById("nbEmpty"),
      hintBtn: document.getElementById("nbHint"),
      mapBtn: document.getElementById("nbMap"),
      close: document.getElementById("nbClose"),
      msg: document.getElementById("msg"),
      map: document.getElementById("map"),
      mapWrap: document.getElementById("mapWrap"),
      mapRoute: document.getElementById("mapRoute"),
      mapCount: document.getElementById("mapCount"),
      mapCheck: document.getElementById("mapCheck"),
      mapClose: document.getElementById("mapClose"),
      mapSaid: document.getElementById("mapSaid"),
      mapPick: document.getElementById("mapPick"),
      mapPickLead: document.getElementById("mapPickLead"),
      mapPickList: document.getElementById("mapPickList"),
      mapPickClose: document.getElementById("mapPickClose")
    };

    let state = "intro";        // intro | search | found | done
    let clues = [];
    let hints = 0;
    let near = null;
    let nbOpen = false;
    let mapOpen = false;
    let mapBuilt = false;
    let pins = [];              // 玩家钉上的地点 id，按点击先后排 —— 顺序就是答案的一部分
    let pinClue = {};           // 地点 id → 用来钉它的那条线索；取消时放回线索池
    let pickFor = null;         // 正在等证据的地点
    let routeSolved = false;
    let routeTries = 0;
    let msgTimer = 0;

    // ---- 主动互动 ----------------------------------------------------------
    // F 是自言自语 / 随口问一句，不是提示：不碰 hints、不动线索本、不给方向。
    // 「问问由乃」那三级提示是另一套东西，次数不能被这里吃掉。
    let pokeCount = 0, lastPoke = -9, mumbleIdx = 0;
    let idleT = 0, idleReacted = false;
    let returnChoice = -1;          // -1 = 没选（超时照常往下走）
    let choiceTimer = 0, choiceKey = null;
    const MUMBLE = [
      { me: "她上午到底去哪儿了……", who: "由乃", back: "我哪能一直盯着她。" },
      { me: "会不会压根没带出来？", who: "由乃", back: "那就更找不着了。" },
      { me: "先上楼看一眼吧。", who: "由乃", back: "随你，慢点走。" }
    ];

    // ---------------------------------------------------------------- 线索本

    function updateBadge() {
      el.btn.querySelector("b").textContent = String(clues.length);
      el.btn.classList.toggle("has", clues.length > 0);
    }

    function renderNotebook() {
      el.list.innerHTML = "";
      const order = ["see", "remember", "guess"];
      let any = false;
      for (const k of order) {
        for (const c of clues) {
          if (c.kind !== k) continue;
          any = true;
          const li = document.createElement("li");
          li.className = KIND[k].cls;

          const tag = document.createElement("i");
          tag.textContent = KIND[k].label;

          const span = document.createElement("span");
          span.textContent = c.text;

          const em = document.createElement("em");
          em.textContent = c.from;

          li.append(tag, span, em);
          el.list.appendChild(li);
        }
      }
      el.empty.hidden = any;
      el.hintBtn.disabled = hints >= HINTS.length;
      el.hintBtn.textContent = hints >= HINTS.length ? "问过了" : "问问由乃";
    }

    function openNotebook() {
      if (nbOpen || state !== "search") return;
      nbOpen = true;
      renderNotebook();
      el.nb.hidden = false;
      requestAnimationFrame(function () { el.nb.classList.add("show"); });
      ex.enable(false);
      D.hint(null);
    }

    function closeNotebook() {
      if (!nbOpen) return;
      nbOpen = false;
      el.nb.classList.remove("show");
      setTimeout(function () { if (!nbOpen) el.nb.hidden = true; }, 200);
      if (state === "search") ex.enable(true);
    }

    function addClues(list) {
      for (const c of list) {
        if (clues.some(function (x) { return x.text === c.text; })) continue;
        clues.push(c);
      }
      updateBadge();
      refreshBadges();
    }

    // ---------------------------------------------------------------- 平面图

    /** 每个地点上挂几条线索。挂的是「她可能去过这儿」的证据，
     *  不是答案——尤其「我猜的」那条也会挂上去，徽章用虚线框提醒它不可靠。 */
    function clueCountAt() {
      const out = {};
      for (const c of clues) {
        if (!c.pin) continue;
        if (!out[c.pin]) out[c.pin] = { n: 0, guess: 0 };
        out[c.pin].n += 1;
        if (c.kind === "guess") out[c.pin].guess += 1;
      }
      return out;
    }

    /** 七个地点由 SPOTS 生成，坐标只写一份；HTML 里只留空的地图。 */
    function buildMap() {
      if (mapBuilt) return;
      mapBuilt = true;
      const LABELS = { bin: "垃圾桶", cctv: "监控" };
      for (const id of Object.keys(SPOTS)) {
        const s = SPOTS[id];
        const b = document.createElement("button");
        b.type = "button";
        b.className = "spot";
        b.dataset.spot = id;
        b.style.left = (s.x / 256 * 100).toFixed(2) + "%";
        b.style.top = (s.y / 160 * 100).toFixed(2) + "%";
        b.setAttribute("aria-label", s.name);
        b.title = s.name;
        const cnt = document.createElement("b");
        cnt.className = "cnt";
        cnt.hidden = true;
        b.appendChild(cnt);
        // 钉上的先后：第 1 站、第 2 站……拼路线时得按这个顺序读
        const ord = document.createElement("i");
        ord.className = "ord";
        ord.hidden = true;
        b.appendChild(ord);
        b.addEventListener("click", function () { clickSpot(id); });
        el.mapWrap.appendChild(b);
      }
      // 图上没有「垃圾桶」「监控」两个标签，补两个小字
      for (const id of Object.keys(LABELS)) {
        const s = SPOTS[id];
        const tag = document.createElement("span");
        tag.className = "map-tag";
        tag.textContent = LABELS[id];
        tag.style.left = (s.x / 256 * 100).toFixed(2) + "%";
        tag.style.top = (s.y / 160 * 100 + 8).toFixed(2) + "%";
        el.mapWrap.appendChild(tag);
      }
    }

    function refreshBadges() {
      if (!mapBuilt) return;
      const counts = clueCountAt();
      for (const b of el.mapWrap.querySelectorAll(".spot")) {
        const info = counts[b.dataset.spot];
        const cnt = b.querySelector(".cnt");
        cnt.hidden = !info;
        cnt.textContent = info ? String(info.n) : "";
        cnt.classList.toggle("gue", !!info && info.guess > 0);
      }
    }

    /** 钉上的站按点击先后编号，地图上那条线也跟着一路画过去。
     *  这让「顺序」变成看得见的东西：顺序错了，线会拐回去。 */
    function refreshPins() {
      if (!mapBuilt) return;
      for (const b of el.mapWrap.querySelectorAll(".spot")) {
        const i = pins.indexOf(b.dataset.spot);
        const on = i >= 0;
        b.classList.toggle("pin", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
        b.setAttribute("aria-label", on
          ? SPOTS[b.dataset.spot].name + "，第 " + (i + 1) + " 站，证据：" + pinClue[b.dataset.spot].text
          : SPOTS[b.dataset.spot].name);
        b.title = on
          ? SPOTS[b.dataset.spot].name + "：" + pinClue[b.dataset.spot].text
          : SPOTS[b.dataset.spot].name;
        const ord = b.querySelector(".ord");
        if (ord) {
          ord.hidden = !on;
          ord.textContent = on ? String(i + 1) : "";
        }
      }
      el.mapCount.textContent = "钉了 " + pins.length + " 个";
      // 钉到第二站才连线；线按照玩家点的先后走，拼错的时候也在
      const pts = pins.map(function (id) {
        return SPOTS[id].x + "," + SPOTS[id].y;
      }).join(" ");
      el.mapRoute.setAttribute("points", pts);
      el.map.classList.toggle("drawing", pins.length >= 2 && !routeSolved);
    }

    function openMap() {
      if (mapOpen || state !== "search") return;
      if (nbOpen) closeNotebook();
      buildMap();
      closePick();
      refreshBadges();
      refreshPins();
      if (!routeSolved) {
        el.mapSaid.textContent = pins.length >= 2
          ? "线往哪儿拐，她就往哪儿走。顺序也能点错。"
          : "她上午可能去过哪儿？";
      }
      mapOpen = true;
      el.map.hidden = false;
      requestAnimationFrame(function () { el.map.classList.add("show"); });
      ex.enable(false);
      D.hint(null);
    }

    function closeMap() {
      if (!mapOpen) return;
      closePick();
      mapOpen = false;
      el.map.classList.remove("show");
      setTimeout(function () { if (!mapOpen) el.map.hidden = true; }, 200);
      if (state === "search") ex.enable(true);
    }

    /** 还没被钉出去的线索。钉地点之前得先挑一句能证明「她来过这儿」的话。 */
    function availableClues() {
      const used = Object.keys(pinClue).map(function (id) { return pinClue[id]; });
      return clues.filter(function (c) {
        return c.pin && used.indexOf(c) < 0;
      });
    }

    function closePick() {
      pickFor = null;
      el.map.classList.remove("picking");
      el.mapPick.hidden = true;
      el.mapPickList.innerHTML = "";
    }

    function openPick(id) {
      pickFor = id;
      el.map.classList.add("picking");
      el.mapPickLead.textContent = "「" + SPOTS[id].name + "」——哪一句能证明她来过这儿？";
      el.mapPickList.innerHTML = "";
      availableClues().forEach(function (c) {
        const b = document.createElement("button");
        b.type = "button";
        const span = document.createElement("span");
        span.textContent = c.text;
        const tag = document.createElement("i");
        tag.textContent = KIND[c.kind].label + " · " + c.from;
        b.append(span, tag);
        b.addEventListener("click", function () { pickClue(c); });
        el.mapPickList.appendChild(b);
      });
      el.mapPick.hidden = false;
      D.audio.click();
      el.mapSaid.textContent = "先别急着钉——看哪一句真的指向这儿。";
    }

    /** 挑中的句子得真的属于这个地点，才钉得上。
     *  挑错只提醒一句，面板不关、线索也不扣——让她自己再读一遍。 */
    function pickClue(c) {
      if (!pickFor || routeSolved) return;
      const id = pickFor;
      if (c.pin !== id) {
        D.audio.wrong();
        el.mapSaid.textContent = "这句说的是别的地方。再读一遍它写的是哪儿。";
        return;
      }
      D.audio.right();
      pins.push(id);
      pinClue[id] = c;
      closePick();
      refreshPins();
      refreshBadges();
      sayPins();
    }

    function sayPins() {
      if (!pins.length) el.mapSaid.textContent = "她上午可能去过哪儿？";
      else if (pins.length === 1) el.mapSaid.textContent = "钉上了。接着找下一句能对上的。";
      else el.mapSaid.textContent = "线往哪儿拐，她就往哪儿走。顺序也能点错。";
    }

    /** 点地点：钉过了就取消（把证据放回线索池）；没钉过就先摊开线索让她挑。 */
    function clickSpot(id) {
      if (routeSolved) return;
      const i = pins.indexOf(id);
      if (i >= 0) {
        pins.splice(i, 1);
        delete pinClue[id];
        if (pickFor === id) closePick();
        D.audio.click();
        refreshPins();
        sayPins();
        return;
      }
      if (!availableClues().length) {
        D.audio.wrong();
        el.mapSaid.textContent = clues.some(function (c) { return c.pin; })
          ? "手里的线索都钉完了。想想还有没有别的地方没看。"
          : "还没有能钉的线索。先去走廊和楼梯口看看。";
        return;
      }
      openPick(id);
    }

    /** 地点集合对、顺序也要对。先报「多 / 少一站」，再报顺序——
     *  顺序错的时候不点名，只提醒「顺着走过的先后」，让她自己把线顺过来。 */
    function verifyRoute() {
      if (pins.length < ROUTE.length) {
        return { ok: false, said: "少了一站。她上午出去，不止这一会儿。" };
      }
      if (pins.length > ROUTE.length) {
        return { ok: false, said: "多了一站。有一站，我其实没看见她。" };
      }
      const same = ROUTE.every(function (id) { return pins.indexOf(id) >= 0; });
      if (!same) return { ok: false, said: "这条线对不上。再想想。" };
      for (let i = 0; i < ROUTE.length; i++) {
        if (pins[i] !== ROUTE[i]) {
          return {
            ok: false,
            said: routeTries >= 3
              ? "地方都对。她是先出的教室，再去接的水，最后才上的楼梯。"
              : "地方都对，可顺序不对。线得顺着她走过的先后画。"
          };
        }
      }
      return { ok: true, said: "" };
    }

    function checkRoute() {
      if (!mapOpen || routeSolved) return;
      if (!pins.length) { el.mapSaid.textContent = "还没钉。先点一个地方。"; return; }
      routeTries += 1;
      const r = verifyRoute();
      if (!r.ok) {
        D.audio.wrong();
        el.mapSaid.textContent = r.said;
        return;
      }
      solveRoute();
    }

    /** 拼对了才给的那一下：线亮起来、目标卡改口，省掉一次瞎走。
     *  存档只记「拼出来过」这个布尔，不记钉了几次、错了几次。 */
    function solveRoute() {
      routeSolved = true;
      closePick();
      D.persist({ searchRouteSolved: true });
      D.audio.right();
      el.mapRoute.setAttribute("points", ROUTE.map(function (id) {
        return SPOTS[id].x + "," + SPOTS[id].y;
      }).join(" "));
      el.map.classList.remove("drawing");
      el.map.classList.add("solved");
      el.mapCheck.disabled = true;
      el.mapCheck.textContent = "就是这条";
      el.mapSaid.textContent = "那就是这条。先出教室，去饮水机接水掏了卡，最后落在楼梯口窗台上。";
      D.objective("帮她把校园卡找回来", "她上午去过教室、饮水机、窗台 —— 卡多半在楼梯口的窗台上");
    }

    // ---------------------------------------------------------------- 消息

    function toast(text, ms) {
      el.msg.innerHTML = "";
      const b = document.createElement("b");
      b.textContent = "由乃";
      const p = document.createElement("span");
      p.textContent = text;
      el.msg.append(b, p);
      el.msg.classList.add("show");
      clearTimeout(msgTimer);
      msgTimer = setTimeout(function () { el.msg.classList.remove("show"); }, ms || 5200);
    }

    function askFriend() {
      if (hints >= HINTS.length) return;
      // 第一次问的时候她在走廊里看不见你，所以先问一句「你在哪儿呢」
      const text = hints === 0 ? "你在哪儿呢。　" + HINTS[0] : HINTS[hints];
      hints += 1;
      toast(text);
      D.audio.click();
      renderNotebook();
    }

    function poke() {
      if (state !== "search" || nbOpen || mapOpen || D.dialogOpen()) return;
      if (ex.t - lastPoke < 1.0) return;
      lastPoke = ex.t;
      const m = MUMBLE[mumbleIdx++ % MUMBLE.length];
      pokeCount++;
      D.audio.blip();
      // 故意不写 hints += 1，也不调 toast()：这不是向她求助，只是自己嘀咕一句
      D.react("我", m.me, 1000);
      D.react(m.who, m.back, 1700);
    }

    /** 找到卡之后：怎么还给她。三个说法只改收尾第一句，不改结局、不记分。
     *  不选也照样往下走（4 秒后自动用默认），所以不拦关、不逼玩家做选择。 */
    function chooseReturn() {
      return new Promise(function (resolve) {
        const box = document.getElementById("giveBack");
        box.hidden = false;
        requestAnimationFrame(function () { box.classList.add("show"); });
        let done = false;

        function finish(i) {
          if (done) return;
          done = true;
          clearTimeout(choiceTimer);
          window.removeEventListener("keydown", onKey);
          choiceKey = null;
          box.classList.remove("show");
          setTimeout(function () { box.hidden = true; }, 200);
          returnChoice = i;
          D.reactHint(false);
          if (i >= 0) {
            D.react("我", ["给，找到了。", "放你桌上了。", "朱里——"][i], 1200);
          }
          resolve(i);
        }
        function onKey(e) {
          if (e.key === "1" || e.key === "2" || e.key === "3") finish(Number(e.key) - 1);
          else if (e.key === "f" || e.key === "F" || e.key === "Enter" || e.key === " ") finish(0);
        }
        box.onclick = function (e) {
          const b = e.target.closest("button[data-i]");
          if (b) finish(Number(b.dataset.i));
        };
        window.addEventListener("keydown", onKey);
        choiceKey = onKey;
        // 给玩家留出真的想一想的时间。3.6 秒连读完三个选项都紧，
        // 更别说选；不选也会自己往下走，这里放宽到 6 秒。
        choiceTimer = setTimeout(function () { finish(-1); }, 6000);
      });
    }

    // ---------------------------------------------------------------- 看东西

    async function look(p) {
      ex.enable(false);
      D.hint(null);
      await D.lines(p.lines);
      addClues(p.clues);
      D.audio.click();
      // 玩家刚看完一处，马上落一句自己的反应，别让「记线索」像交作业
      D.react("我", "记一下。", 1200);
      ex.enable(true);
    }

    // ---------------------------------------------------------------- 找到

    async function find() {
      state = "found";
      ex.enable(false);
      D.hint(null);
      D.reactHint(false);
      D.clearReact();
      await D.lines([
        ["旁白", "窗台上落着一层薄灰。靠外那一角，压着一张卡。"],
        ["我", routeSolved ? "……果然在这儿。" : "……还真是这儿。"],
        ["旁白", "卡的边角被晒得有点卷。上面是她的照片，头发比现在短。"]
      ]);

      // 还卡之前让玩家拿一下主意。不选也会自己往下走，不拦关。
      await chooseReturn();

      await D.fadeTo(1, 300);
      ex.jump("corridor", 176, 1);
      host.setChapter("走廊");
      await D.fadeTo(0, 300);

      await closing();

      state = "done";
      el.btn.hidden = true;
      D.objective(null);
      D.hint(null);
      D.persist({
        searchCompleted: true,
        searchClues: clues.length,
        searchHints: hints,
        searchRouteSolved: routeSolved
      });
      host.done({
        id: "search",
        completed: true,
        clues: clues.length,
        total: 9,
        hints: hints,
        early: clues.length <= 2
      });
    }

    /** 收尾按「看了多少」分三种说法。三种都只说她怎么反应，不说她高不高兴。
     *  「怎么还」那一步只给最前面添一句，不改后面任何一句、不改结局。 */
    function closing() {
      const lead = returnChoice === 1 ? [["我", "放你桌上了。"]]
                 : returnChoice === 2 ? [["我", "朱里——找到了。"]]
                 : [];
      let base;
      if (clues.length <= 2) {
        base = [
          ["由乃", "这么快？"],
          ["我", "……在楼梯口，窗台上。"],
          ["朱里", "窗台？"],
          ["我", "嗯。压在最外头那一角。"],
          ["由乃", "你怎么直接就找到了。"],
          ["我", "……运气。"],
          ["朱里", "……谢谢。"]
        ];
      } else if (clues.length <= 5) {
        base = [
          ["由乃", "找到了？"],
          ["我", "楼梯口的窗台上。"],
          ["朱里", "我上午去接水……"],
          ["朱里", "……你怎么知道。"],
          ["我", "门没关严，笔帽没盖。你走得太急了。"],
          ["朱里", "……"],
          ["由乃", "行了行了，快去食堂吧。"]
        ];
      } else {
        base = [
          ["朱里", "……你去了楼上？"],
          ["我", "嗯。"],
          ["由乃", "他把整栋楼都看了一遍。"],
          ["朱里", "为什么。"],
          ["我", "……不为什么。"],
          ["旁白", "她低下头，把卡塞回卡套。卡套上挂着一个小小的挂件。"],
          ["旁白", "我没问她为什么一直不挂在脖子上。"]
        ];
      }
      return D.lines(lead.concat(base));
    }

    // ---------------------------------------------------------------- 换场景

    function onScene(name, first) {
      if (!first || state !== "search") return;
      if (name === "stair") {
        D.lines([["旁白", "楼梯口的窗户开着，风一阵一阵灌进来。"]]);
      } else if (name === "railing") {
        D.lines([["旁白", "楼上比楼下安静。操场上有人在跑。"]]);
      }
    }

    // ---------------------------------------------------------------- 生命周期

    async function start() {
      D.clearReact();
      D.onPoke(poke);
      host.setChapter("走廊");
      D.objective("帮她把校园卡找回来", "她上午出去过一趟 —— 到处看看，按 E");
      el.btn.hidden = false;
      updateBadge();
      renderNotebook();

      el.btn.onclick = function () { nbOpen ? closeNotebook() : openNotebook(); };
      el.close.onclick = closeNotebook;
      el.hintBtn.onclick = askFriend;
      el.mapBtn.onclick = openMap;
      el.mapCheck.onclick = checkRoute;
      el.mapClose.onclick = closeMap;
      el.mapPickClose.onclick = closePick;

      ex.enable(false);
      await D.fadeTo(0, 420);
      await D.sleep(220);

      await D.lines([
        ["旁白", "周三，中午。走廊里只剩几个赶着去食堂的人。"],
        ["朱里", "……等一下。"],
        ["我", "怎么了？"],
        ["朱里", "卡不见了。校园卡。"],
        ["由乃", "书包翻两遍了。"],
        ["朱里", "中午还得去食堂。"],
        ["由乃", "你去帮她找找？她上午就出去过一趟，就一会儿。"],
        ["我", "……行。"],
        ["朱里", "要是找不到就算了，我下午去补办。"],
        ["我", "先找找。"]
      ]);

      state = "search";
      ex.enable(true);
      D.reactHint("F · 自言自语");
      D.hint("WASD 走路　Tab 打开线索本", 3600);
    }

    function update(dt) {
      ex.update(dt);

      // 她们只在走廊门口等。extras 是全局画一遍的，不在这儿关掉，
      // 玩家上楼的时候会看见她俩也站在楼梯口——她们根本没跟过来。
      const atDoor = ex.scene === "corridor";
      GIRL.hidden = !atDoor;
      FRIEND.hidden = !atDoor;

      for (const k in crowds) {
        const here = ex.scene === k;
        crowds[k].setHidden(!here);
        if (here) crowds[k].update(dt);
      }

      if (state !== "search" || nbOpen || mapOpen || D.dialogOpen()) { near = null; return; }

      // 站太久就自己嘀咕一句。不是提示，不给方向。
      if (D.axisX() !== 0 || D.axisY() !== 0) { idleT = 0; idleReacted = false; }
      else {
        idleT += dt;
        if (idleT > 6 && !idleReacted) {
          idleReacted = true;
          D.react("我", "……先从哪儿看起。", 1500);
        }
      }

      // 卡自己不是「互动点」——它一直躺在那儿，走过去按 E 就捡。
      // 没听过任何线索也捡得起来，这是设计稿明确要求的。
      if (ex.scene === CARD.scene && ex.near(CARD.x, CARD.standY, 46, 20)) {
        near = null;
        D.hint("E · 看看窗台", 0);
        return;
      }

      near = null;
      for (const p of POINTS[ex.scene] || []) {
        if (p.used) continue;
        if (ex.near(p.x, p.y, p.r, 20)) { near = p; break; }
      }
      if (near) D.hint("E · " + near.label, 0);
      else D.hint(null);
    }

    function press(key) {
      if (mapOpen) {
        if (key === "Tab" || key === "Escape") closeMap();
        return;
      }
      if (key === "Tab") { nbOpen ? closeNotebook() : openNotebook(); return; }
      if (key === "Escape") { closeNotebook(); return; }
      if (nbOpen) return;
      if (state !== "search") return;
      if (D.dialogOpen()) return;

      const k = key.toLowerCase();
      if (k !== "e" && key !== "Enter") return;

      if (ex.scene === CARD.scene && ex.near(CARD.x, CARD.standY, 46, 20)) { find(); return; }
      if (near && !near.used) {
        near.used = true;
        look(near);
      }
    }

    function draw(ctx) {
      ex.draw(ctx);
      if (near) drawPrompt(ctx, near.x);
    }

    // ---------------------------------------------------------------- 绘制

    function drawPrompt(ctx, x) {
      const y = 150 + Math.sin(ex.t * 4) * 2;
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = "rgba(20,16,22,.78)";
      ctx.fillRect(x - 9, y - 8, 18, 16);
      ctx.strokeStyle = "rgba(255,226,180,.9)";
      ctx.lineWidth = 1;
      ctx.strokeRect(x - 8.5, y - 7.5, 17, 15);
      ctx.fillStyle = "#ffe2b4";
      ctx.font = 'bold 11px "Microsoft YaHei",sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("E", x, y);
      ctx.restore();
    }

    /** 窗台上那张卡。走近了才有一点反光，不走近就是一块很不起眼的白。
     *  找到之后先别急着擦掉——旁白还在说「压着一张卡」，
     *  画面上却空了，等于把话说了一半。等离开这个场景再收。 */
    function drawBack(ctx, scene, t) {
      if (scene !== CARD.scene) return;
      if (state === "done") return;

      const x = CARD.x, y = CARD.y;
      ctx.save();

      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "#2b2b33";
      ctx.fillRect(x - 5, y - 1, 11, 3);       // 卡压在窗台上的影子

      ctx.globalAlpha = 1;
      ctx.fillStyle = "#2f3238";
      ctx.fillRect(x - 5, y - 12, 10, 12);     // 一圈深色边，不然白卡会溶进白石台
      ctx.fillStyle = "#f4f1e6";
      ctx.fillRect(x - 4, y - 11, 8, 10);
      ctx.fillStyle = "#5f86a8";
      ctx.fillRect(x - 4, y - 11, 8, 3);       // 顶上那道蓝
      ctx.fillStyle = "#c8c0ae";
      ctx.fillRect(x - 3, y - 7, 2, 2);        // 照片
      ctx.fillRect(x - 3, y - 4, 5, 1);
      ctx.fillRect(x - 3, y - 2, 4, 1);

      if (Math.abs(ex.actor.x - x) < 120) {
        const k = 0.5 + 0.5 * Math.sin(t * 3.4);
        ctx.globalAlpha = 0.2 + k * 0.5;
        ctx.fillStyle = "#fffdf2";
        ctx.fillRect(x + 3, y - 12, 2, 1);
      }
      ctx.restore();
    }

    return {
      id: "search",
      title: "校园寻物",
      start: start,
      update: update,
      draw: draw,
      press: press,
      setFrozen: function (v) { ex.enable(!v); },
      dispose: function () {
        D.onPoke(null);
        D.reactHint(false);
        D.clearReact();
        clearTimeout(choiceTimer);
        if (choiceKey) { window.removeEventListener("keydown", choiceKey); choiceKey = null; }
        const box = document.getElementById("giveBack");
        if (box) { box.classList.remove("show"); box.hidden = true; }
        mapOpen = false;
        closePick();
        el.map.classList.remove("show");
        el.map.hidden = true;
        el.btn.hidden = true;
      },
      get state() { return state; },
      get scene() { return ex.scene; },
      get x() { return ex.actor.x; },
      get y() { return ex.actor.y; },
      get clues() { return clues; },
      get hints() { return hints; },
      get pokeCount() { return pokeCount; },
      get returnChoice() { return returnChoice; },
      get girlVisible() { return !GIRL.hidden; },
      get mapOpen() { return mapOpen; },
      get pins() { return pins.slice(); },
      get evidence() { return Object.assign({}, pinClue); },
      get pickFor() { return pickFor; },
      get routeSolved() { return routeSolved; },
      get routeTries() { return routeTries; },
      spots: SPOTS,
      route: ROUTE,
      cardX: CARD.x
    };
  };

})(window);
