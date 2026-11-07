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

  // 卡在楼梯口窗台上。楼梯间的窗台横在 y≈150、x 165..500，这一格是空的，
  // 放得下，而且从地面看过去正好在视线上方一点——不走近不会注意到。
  const CARD = { scene: "stair", x: 300, y: 150 };

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
            text: "左边窗台的灰里有一块干净的长方形印子——有东西在这儿放过，又被拿走了。",
            from: "走廊 · 左边窗台"
          },
          {
            kind: "remember",
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
          text: "她说过，她们班的人爱在这根柱子上画道道。",
          from: "楼上 · 柱子"
        }]
      }
    ]
  };

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
    const ex = D.createExplore({
      scenes: SCENES,
      start: "corridor",
      x: 176,
      dir: 1,
      actors: [GIRL, FRIEND],
      drawBack: drawBack,
      onScene: onScene
    });

    const el = {
      btn: document.getElementById("nbBtn"),
      nb: document.getElementById("nb"),
      list: document.getElementById("nbList"),
      empty: document.getElementById("nbEmpty"),
      hintBtn: document.getElementById("nbHint"),
      close: document.getElementById("nbClose"),
      msg: document.getElementById("msg")
    };

    let state = "intro";        // intro | search | found | done
    let clues = [];
    let hints = 0;
    let near = null;
    let nbOpen = false;
    let msgTimer = 0;

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
      el.hintBtn.textContent = hints >= HINTS.length ? "问过了" : "问问闺蜜";
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
    }

    // ---------------------------------------------------------------- 消息

    function toast(text, ms) {
      el.msg.innerHTML = "";
      const b = document.createElement("b");
      b.textContent = "闺蜜";
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

    // ---------------------------------------------------------------- 看东西

    async function look(p) {
      ex.enable(false);
      D.hint(null);
      await D.lines(p.lines);
      addClues(p.clues);
      D.audio.click();
      ex.enable(true);
    }

    // ---------------------------------------------------------------- 找到

    async function find() {
      state = "found";
      ex.enable(false);
      D.hint(null);
      await D.lines([
        ["旁白", "窗台上落着一层薄灰。靠外那一角，压着一张卡。"],
        ["我", "……在这儿。"],
        ["旁白", "卡的边角被晒得有点卷。上面是她的照片，头发比现在短。"]
      ]);

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
        searchHints: hints
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

    /** 收尾按「看了多少」分三种说法。三种都只说她怎么反应，不说她高不高兴。 */
    function closing() {
      if (clues.length <= 2) {
        return D.lines([
          ["闺蜜", "这么快？"],
          ["我", "……在楼梯口，窗台上。"],
          ["朱里", "窗台？"],
          ["我", "嗯。压在最外头那一角。"],
          ["闺蜜", "你怎么直接就找到了。"],
          ["我", "……运气。"],
          ["朱里", "……谢谢。"]
        ]);
      }
      if (clues.length <= 5) {
        return D.lines([
          ["闺蜜", "找到了？"],
          ["我", "楼梯口的窗台上。"],
          ["朱里", "我上午去接水……"],
          ["朱里", "……你怎么知道。"],
          ["我", "门没关严，笔帽没盖。你走得太急了。"],
          ["朱里", "……"],
          ["闺蜜", "行了行了，快去食堂吧。"]
        ]);
      }
      return D.lines([
        ["朱里", "……你去了楼上？"],
        ["我", "嗯。"],
        ["闺蜜", "他把整栋楼都看了一遍。"],
        ["朱里", "为什么。"],
        ["我", "……不为什么。"],
        ["旁白", "她低下头，把卡塞回卡套。卡套上挂着一个小小的挂件。"],
        ["旁白", "我没问她为什么一直不挂在脖子上。"]
      ]);
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
      host.setChapter("走廊");
      D.objective("帮她把校园卡找回来", "她上午出去过一趟 —— 到处看看，按 E");
      el.btn.hidden = false;
      updateBadge();
      renderNotebook();

      el.btn.onclick = function () { nbOpen ? closeNotebook() : openNotebook(); };
      el.close.onclick = closeNotebook;
      el.hintBtn.onclick = askFriend;

      ex.enable(false);
      await D.fadeTo(0, 420);
      await D.sleep(220);

      await D.lines([
        ["旁白", "周三，中午。走廊里没什么人。"],
        ["朱里", "……等一下。"],
        ["我", "怎么了？"],
        ["朱里", "卡不见了。校园卡。"],
        ["闺蜜", "书包翻两遍了。"],
        ["朱里", "中午还得去食堂。"],
        ["闺蜜", "你去帮她找找？她上午就出去过一趟，就一会儿。"],
        ["我", "……行。"],
        ["朱里", "要是找不到就算了，我下午去补办。"],
        ["我", "先找找。"]
      ]);

      state = "search";
      ex.enable(true);
      D.hint("A / D 走路　Tab 打开线索本", 3600);
    }

    function update(dt) {
      ex.update(dt);

      // 她们只在走廊门口等。extras 是全局画一遍的，不在这儿关掉，
      // 玩家上楼的时候会看见她俩也站在楼梯口——她们根本没跟过来。
      const atDoor = ex.scene === "corridor";
      GIRL.hidden = !atDoor;
      FRIEND.hidden = !atDoor;

      if (state !== "search" || nbOpen || D.dialogOpen()) { near = null; return; }

      // 卡自己不是「互动点」——它一直躺在那儿，走过去按 E 就捡。
      // 没听过任何线索也捡得起来，这是设计稿明确要求的。
      if (ex.scene === CARD.scene && ex.at(CARD.x, 46)) {
        near = null;
        D.hint("E · 看看窗台", 0);
        return;
      }

      near = null;
      for (const p of POINTS[ex.scene] || []) {
        if (p.used) continue;
        if (ex.at(p.x, p.r)) { near = p; break; }
      }
      if (near) D.hint("E · " + near.label, 0);
      else D.hint(null);
    }

    function press(key) {
      if (key === "Tab") { nbOpen ? closeNotebook() : openNotebook(); return; }
      if (key === "Escape") { closeNotebook(); return; }
      if (nbOpen) return;
      if (state !== "search") return;
      if (D.dialogOpen()) return;

      const k = key.toLowerCase();
      if (k !== "e" && key !== "Enter") return;

      if (ex.scene === CARD.scene && ex.at(CARD.x, 46)) { find(); return; }
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
      get state() { return state; },
      get scene() { return ex.scene; },
      get x() { return ex.actor.x; },
      get clues() { return clues; },
      get hints() { return hints; },
      get girlVisible() { return !GIRL.hidden; },
      cardX: CARD.x
    };
  };

})(window);
