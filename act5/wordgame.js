/* G03《课间猜人物》— 三人轮流猜动漫 / 游戏 / 电影里的角色
 *
 * 九个回合，三类各三题：动漫（路飞、鸣人、哆啦A梦）、游戏（马里奥、林克、皮卡丘）、
 * 电影（达斯·维达、杰克·斯派洛、哈利·波特）。每题给一张剪影 + 三条线索，四选一。
 *
 * 剪影只画「人形轮廓 + 一件标志性道具」，不重绘原作形象、不画脸；
 * 名字照写，属于同人引用。图在 assets/silhouettes/，生成脚本 tools/make-silhouettes.py。
 *
 * 猜错不会卡住：再给一条提示，还可以继续猜；线索用完之后直接公布答案。
 * 判分只影响结束时的措辞，不影响任何剧情走向。
 * 题库在下面 QUESTIONS 里，加题只改这个数组；正确答案的位置故意每题不同。
 *
 * 六题之后「换你出题」不是一道选择题，而是一小段自己主持的回合：
 * 先挑一个词，再从三句线索里挑两句像的。挑到那句其实属于别的词的，
 * 她俩会顺着猜偏；再补一句就回来了。不给分、不计时、不改结局。
 */
(function (global) {
  "use strict";

  const D = global.DAILY;
  D.games = D.games || {};

  const QUESTIONS = [
    {
      id: "luffy",
      cat: "anime",
      sil: "../assets/silhouettes/silhouette_anime_01.png",
      host: "friend",
      answer: "路飞",
      aliases: ["蒙奇D路飞", "草帽路飞"],
      clues: [
        "帽子是草编的，帽檐很宽。",
        "胳膊能伸得特别长。",
        "他说要找到一个大宝藏。"
      ],
      options: ["路飞", "鸣人", "黑崎一护", "坂田银时"],
      hostLines: ["换点不一样的。猜人。", "第一题，动漫里的。"],
      npc: { who: "girl", right: false, text: "鸣人？" },
      banter: { who: "friend", text: "人家戴的是护额，不是草帽。" }
    },
    {
      id: "naruto",
      cat: "anime",
      sil: "../assets/silhouettes/silhouette_anime_02.png",
      host: "girl",
      answer: "鸣人",
      aliases: ["漩涡鸣人", "鸣人君"],
      clues: [
        "脸上有几道像胡须的纹。",
        "头上绑着一块铁牌。",
        "他总说要当上火影。"
      ],
      options: ["黑崎一护", "鸣人", "沢田纲吉", "日向翔阳"],
      hostLines: ["换我出。这个你们肯定认识。", "……我描述得可能不太准。"],
      npc: { who: "friend", right: false, text: "黑崎一护？" },
      banter: { who: "girl", text: "人家拿的是斩魄刀，不是苦无。" }
    },
    {
      id: "doraemon",
      cat: "anime",
      sil: "../assets/silhouettes/silhouette_anime_03.png",
      host: "friend",
      answer: "哆啦A梦",
      aliases: ["哆啦a梦", "机器猫", "叮当猫"],
      clues: [
        "他没有耳朵。",
        "肚子上有个口袋，能掏出东西。",
        "他怕老鼠。"
      ],
      options: ["龙猫", "皮卡丘", "哆啦A梦", "蜡笔小新"],
      hostLines: ["再来一个，小时候都看过。", "这个应该最好猜。"],
      npc: { who: "girl", right: false, text: "龙猫？" },
      banter: { who: "friend", text: "龙猫有耳朵，还很大。" }
    },
    {
      id: "mario",
      cat: "game",
      sil: "../assets/silhouettes/silhouette_game_01.png",
      host: "girl",
      answer: "马里奥",
      aliases: ["超级马里奥", "马力欧", "mario"],
      clues: [
        "戴红帽子，留胡子。",
        "从水管里钻出来。",
        "踩扁蘑菇，去救公主。"
      ],
      options: ["索尼克", "林克", "吃豆人", "马里奥"],
      hostLines: ["换个游戏的。和臣应该会。", "我不太玩，听你们说过。"],
      npc: { who: "friend", right: false, text: "索尼克？" },
      banter: { who: "girl", text: "索尼克跑得比他快。" }
    },
    {
      id: "link",
      cat: "game",
      sil: "../assets/silhouettes/silhouette_game_02.png",
      host: "friend",
      answer: "林克",
      aliases: ["塞尔达", "link"],
      clues: [
        "一身绿衣服，帽子是尖的。",
        "背后背着剑和盾。",
        "他进别人家会摔罐子。"
      ],
      options: ["林克", "克劳德", "但丁", "马里奥"],
      hostLines: ["这个有点难。", "提示可以问我要。"],
      npc: { who: "girl", right: false, text: "克劳德？" },
      banter: { who: "friend", text: "克劳德的头发比他长多了。" }
    },
    {
      id: "pikachu",
      cat: "game",
      sil: "../assets/silhouettes/silhouette_game_03.png",
      host: "girl",
      answer: "皮卡丘",
      aliases: ["皮卡丘", "pikachu"],
      clues: [
        "黄色的，尾巴像一道闪电。",
        "会放电。",
        "他最好的朋友是个训练家。"
      ],
      options: ["伊布", "皮卡丘", "杰尼龟", "小火龙"],
      hostLines: ["最后一个游戏的。", "这个连我都知道。"],
      npc: { who: "friend", right: false, text: "伊布？" },
      banter: { who: "girl", text: "伊布的尾巴是毛的。" }
    },
    {
      id: "vader",
      cat: "movie",
      sil: "../assets/silhouettes/silhouette_movie_01.png",
      host: "friend",
      answer: "达斯·维达",
      aliases: ["达斯维达", "黑武士", "维达"],
      clues: [
        "黑色头盔，披着斗篷。",
        "呼吸声很重。",
        "他说「我是你父亲」。"
      ],
      options: ["蝙蝠侠", "钢铁侠", "达斯·维达", "万磁王"],
      hostLines: ["换电影。这个有点年头了。", "和臣应该看过。"],
      npc: { who: "girl", right: false, text: "蝙蝠侠？" },
      banter: { who: "friend", text: "蝙蝠侠不这么喘气。" }
    },
    {
      id: "jack",
      cat: "movie",
      sil: "../assets/silhouettes/silhouette_movie_02.png",
      host: "girl",
      answer: "杰克·斯派洛",
      aliases: ["杰克船长", "杰克", "斯派洛"],
      clues: [
        "戴三角帽，头发很长。",
        "走路摇摇晃晃。",
        "他总在找朗姆酒和船。"
      ],
      options: ["印第安纳·琼斯", "阿拉贡", "尼奥", "杰克·斯派洛"],
      hostLines: ["这个我熟。", "……他走路的样子很好认。"],
      npc: { who: "friend", right: false, text: "阿拉贡？" },
      banter: { who: "girl", text: "阿拉贡不喝朗姆酒。" }
    },
    {
      id: "harry",
      cat: "movie",
      sil: "../assets/silhouettes/silhouette_movie_03.png",
      host: "friend",
      answer: "哈利·波特",
      aliases: ["哈利波特", "哈利"],
      clues: [
        "圆眼镜，额头有一道闪电形的疤。",
        "手里拿着一根魔杖。",
        "他在九又四分之三站台上车。"
      ],
      options: ["哈利·波特", "罗恩", "佛罗多", "彼得·帕克"],
      hostLines: ["最后一题，电影。", "这个太出名了，送分。"],
      npc: { who: "girl", right: false, text: "罗恩？" },
      banter: { who: "friend", text: "罗恩没那道疤。" }
    }
  ];

  const CAT = { anime: "动漫", game: "游戏", movie: "电影" };

  // 换你出题：玩家挑一个词，再挑两句「像」的线索。
  // 每个词三句，其中一句其实是另一个词的——真挑错了，她俩会顺着这句猜偏，
  // 但不会卡住：再给一句就回来了。不给分、不计时。
  const SWAP_ROUNDS = [
    {
      word: "抢票",
      clues: [
        { text: "得盯着开票那一下。", fits: true },
        { text: "看完先别急着跟人说。", fits: false, mislead: "剧透" },
        { text: "手慢一点就没了。", fits: true }
      ]
    },
    {
      word: "剧透",
      clues: [
        { text: "得拉着人一起点，才点得着。", fits: false, mislead: "抢票" },
        { text: "一句话说早了，后面就没意思。", fits: true },
        { text: "有人比你先看完，你就坐不住了。", fits: true }
      ]
    },
    {
      word: "片尾曲",
      clues: [
        { text: "字幕滚完了，还不走。", fits: true },
        { text: "散场了，有人还在哼。", fits: true },
        { text: "得盯着开票时间。", fits: false, mislead: "抢票" }
      ]
    }
  ];

  const WHO = { girl: "朱里", me: "和臣", friend: "由乃" };

  function norm(s) {
    return String(s || "").replace(/[\s,，。、．.!！?？~～"'“”‘’·]/g, "");
  }

  D.games.wordgame = function (host) {
    let idx = 0;
    let correct = 0;
    let hints = 0;
    let tries = 0;
    let choiceResolve = null;
    let sayResolve = null;
    let state = "idle";
    let teased = false;
    let streak = 0;

    // ---- 主动互动 ----------------------------------------------------------
    // F = 抢答 / 插话：把主持人还没念完的那句直接带过去，角色马上接一句。
    // 三题之后还有一段「换你出题」：玩家挑词、挑线索，她俩边听边猜，不给分、不计时。
    let pokeCount = 0, typedReacted = false;
    let swapChoice = -2, swapTimer = 0, swapKey = null;
    let swapState = "idle";      // idle | pick | clues | done
    let swapUsed = 0;            // 这段插曲里真的说出了几句线索

    const el = {};

    function grab() {
      el.root = document.getElementById("wg");
      el.round = document.getElementById("wgRound");
      el.host = document.getElementById("wgHost");
      el.clues = document.getElementById("wgClues");
      el.opts = document.getElementById("wgOpts");
      el.say = document.getElementById("wgSay");
      el.hintBtn = document.getElementById("wgHint");
      el.input = document.getElementById("wgInput");
      el.send = document.getElementById("wgSend");
      el.figure = document.getElementById("wgFigure");
      el.sil = document.getElementById("wgSil");
      el.cat = document.getElementById("wgCat");
      el.chips = Array.prototype.slice.call(document.querySelectorAll("#wg .chip"));
      el.swap = document.getElementById("wgSwap");
      el.swapLead = document.getElementById("wgSwapLead");
      el.swapOpts = document.getElementById("wgSwapOpts");
      el.swapClues = document.getElementById("wgSwapClues");
      el.swapSay = document.getElementById("wgSwapSay");
    }

    // ---------------------------------------------------------------- 面板

    function show() {
      // 重玩时要把上一段「换你出题」留下的隐藏状态全部复位
      el.swap.hidden = true;
      el.swapOpts.hidden = false;
      el.swapClues.hidden = true;
      el.swapOpts.innerHTML = "";
      el.swapClues.innerHTML = "";
      el.swapSay.textContent = "";
      el.swapSay.classList.remove("show");
      swapState = "idle";
      swapUsed = 0;
      swapChoice = -2;
      el.clues.hidden = false;
      el.opts.hidden = false;
      el.figure.hidden = false;
      el.root.querySelector(".wg-tools").hidden = false;
      el.input.disabled = false;
      el.send.disabled = false;
      el.root.hidden = false;
      el.root.classList.add("show");
    }
    function hide() {
      el.root.classList.remove("show");
      el.root.hidden = true;
      document.getElementById("wgSwap").hidden = true;
    }

    function highlight(who) {
      el.chips.forEach(function (c) {
        c.classList.toggle("on", c.dataset.who === who);
      });
    }

    function setRound(i) {
      el.round.textContent = "第 " + (i + 1) + " / " + QUESTIONS.length + " 回合";
    }

    /** 面板上的一句话。自动推进，点面板可以提前跳过。
     *  target = "host" 时写进上方那条主持人的位置（会一直留着），
     *  否则写进下面那条临时的反应行。 */
    function say(who, text, ms, target) {
      const box = target === "host" ? el.host : el.say;
      box.textContent = (who && target !== "host" ? WHO[who] + "：" : "") + text;
      box.classList.add("show");
      if (who) highlight(who);
      return new Promise(function (resolve) {
        const timer = setTimeout(finish, ms || 1500);
        function finish() {
          clearTimeout(timer);
          el.root.removeEventListener("click", onClick);
          sayResolve = null;
          resolve();
        }
        function onClick(e) {
          if (e.target.closest("button")) return;
          finish();
        }
        sayResolve = finish;
        el.root.addEventListener("click", onClick);
      });
    }

    function renderClues(q, n) {
      el.clues.innerHTML = "";
      for (let i = 0; i < n && i < q.clues.length; i++) {
        const li = document.createElement("li");
        li.textContent = q.clues[i];
        el.clues.appendChild(li);
      }
    }

    function renderOptions(q, dead) {
      el.opts.innerHTML = "";
      const right = q.options.indexOf(q.answer);
      q.options.forEach(function (text, i) {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = text;
        b.dataset.index = String(i);
        // 正确答案的位置每题不同，标出来只给自动化脚本按「答对」那条路走，
        // 玩家看到的仍然只是四个词，不显示任何标记。
        if (i === right) b.dataset.ans = "1";
        if (dead.indexOf(i) >= 0) b.disabled = true;
        b.addEventListener("click", function () { pick(i); });
        el.opts.appendChild(b);
      });
    }

    function pick(i) {
      if (state !== "ask" || !choiceResolve) return;
      const r = choiceResolve;
      choiceResolve = null;
      state = "wait";
      D.audio.click();
      r(i);
    }

    function ask() {
      state = "ask";
      return new Promise(function (resolve) { choiceResolve = resolve; });
    }

    /** 玩家主动插话。不新增回合、不改答案，只是让节奏能被玩家推一下。 */
    function poke() {
      if (state === "done" || state === "swap" || D.dialogOpen() || el.root.hidden) return;
      pokeCount++;
      D.audio.click();
      D.react("我", "我猜到了，能说了吗？", 1000);
      D.react("由乃", state === "ask" ? "那就说啊。" : "急什么，还没说完呢。", 1500);
      // 主持人的话没念完就直接进题目——和 press() 里 E 的跳过是同一条路
      if (sayResolve && state !== "ask") { const f = sayResolve; sayResolve = null; f(); }
    }

    // ---------------------------------------------------------------- 回合

    async function playRound(i) {
      const q = QUESTIONS[i];
      const dead = [];
      let shown = 1;
      let npcSaid = false;

      setRound(i);
      // 换题就换剪影和分类标签。剪影只是「那一类人」的轮廓 + 道具，
      // 不画脸、不重绘原作——认人还是靠线索。
      el.figure.hidden = false;
      el.cat.textContent = CAT[q.cat] || "";
      el.sil.src = q.sil;
      el.sil.alt = "第 " + (i + 1) + " 题的剪影";
      el.say.textContent = "";
      el.say.classList.remove("show");
      el.host.textContent = "";
      el.host.classList.remove("show");
      // 半场闲聊把题面收起来了，下一题要自己恢复
      el.clues.hidden = false;
      el.opts.hidden = false;
      el.root.querySelector(".wg-tools").hidden = false;
      renderClues(q, shown);
      renderOptions(q, dead);
      el.hintBtn.hidden = false;
      el.hintBtn.disabled = false;
      el.input.value = "";

      highlight(q.host);
      for (const line of q.hostLines) await say(q.host, line, 1250, "host");

      // 第一次求助之后，主持人会松口
      el.hintBtn.onclick = function () {
        if (state !== "ask") return;
        if (shown >= q.clues.length) { D.audio.wrong(); return; }
        shown++;
        hints++;
        renderClues(q, shown);
        D.audio.click();
      };

      el.send.onclick = submitText;
      el.input.onkeydown = function (e) {
        if (e.key === "Enter") { e.preventDefault(); submitText(); }
      };

      while (true) {
        // NPC 先说一句，制造「轮到你」的感觉
        if (!npcSaid) {
          npcSaid = true;
          await D.sleep(240);
          await say(q.npc.who, q.npc.text, 1200);
          // 她俩偶尔互相拆一句。猜词是课间聊天，不该是「出题—作答—下一题」。
          if (q.banter) await say(q.banter.who, q.banter.text, 1150);
        }

        highlight("me");
        const picked = await ask();
        tries++;

        if (picked === q.options.indexOf(q.answer)) {
          correct++;
          streak++;
          D.audio.right();
          dead.push(picked);
          renderOptions(q, dead);
          highlight(q.host);
          await say(q.host, "对了。", 900);

          // 轻微打趣：连对两题，或者和 NPC 想到一块儿去了
          if (!teased && streak >= 2) {
            teased = true;
            await say("friend", "你是不是偷偷背过题库？", 1400);
            await say("me", "没有。", 900);
          } else if (!teased && q.npc.right) {
            teased = true;
            await say("friend", "你俩想一块儿去了。", 1400);
          }
          return true;
        }

        streak = 0;
        D.audio.wrong();
        dead.push(picked);
        renderOptions(q, dead);

        if (shown < q.clues.length) {
          shown++;
          renderClues(q, shown);
          await say(q.host, "不对。再听一条。", 1200);
          continue;
        }

        // 提示用完了，公布答案，往下走
        const right = q.options.indexOf(q.answer);
        dead.push(right);
        renderOptions(q, dead);
        await say(q.host, "算了，是「" + q.answer + "」。", 1600);
        return false;
      }
    }

    /** 半场：话题自己跑远一会儿。不是回合、不给选项、不计分。
     *  六题连着答会变成小测验，中间这段是让它仍像「课间十分钟」。 */
    async function interlude() {
      state = "chat";
      el.say.textContent = "";
      el.say.classList.remove("show");
      el.host.textContent = "";
      el.host.classList.remove("show");
      el.clues.hidden = true;
      el.opts.hidden = true;
      el.figure.hidden = true;
      el.hintBtn.hidden = true;
      el.root.querySelector(".wg-tools").hidden = true;
      el.round.textContent = "课间 · 接了趟水";
      await say(null, "有人去接了趟水。回来的时候，话题已经跑远了。", 1500);
      await say("friend", "对了，那档综艺上周停播了。", 1300);
      await say("girl", "是放假吧。", 1100);
      await say("friend", "那也算理由啊。", 1200);
      await say("me", "……下一题呢？", 1000);
    }

    /** 六题之后换玩家出题：先挑一个词，再从三句里挑「像」的。
     *  挑到那句其实属于另一个词的，她俩就会顺着猜偏——不扣分，再给一句就回来了。
     *  没有倒计时；真不点，6 秒后自己往下走，绝不把玩家拦在这儿。 */
    function swapRound() {
      return new Promise(function (resolve) {
        const picked = [];
        let resolved = false;

        state = "swap";
        swapState = "pick";
        swapChoice = -2;
        swapUsed = 0;

        el.clues.hidden = true;
        el.opts.hidden = true;
        el.figure.hidden = true;
        el.root.querySelector(".wg-tools").hidden = true;
        el.host.classList.remove("show");
        el.say.classList.remove("show");
        el.round.textContent = "换你出题";
        highlight("friend");

        el.swapLead.textContent = "由乃：「换你出一个，我们来猜。」";
        el.swapOpts.hidden = false;
        el.swapOpts.innerHTML = "";
        el.swapClues.hidden = true;
        el.swapClues.innerHTML = "";
        el.swapSay.textContent = "";
        el.swapSay.classList.remove("show");
        SWAP_ROUNDS.forEach(function (r, i) {
          const b = document.createElement("button");
          b.type = "button";
          b.textContent = r.word;
          b.addEventListener("click", function () { choose(i); });
          el.swapOpts.appendChild(b);
        });
        el.swap.hidden = false;

        function setSay(who, text) {
          el.swapSay.textContent = WHO[who] + "：" + text;
          el.swapSay.classList.add("show");
          highlight(who);
        }

        /** 她不点，就替她往下走。计时只用来兜底，不挂在 HUD 上、不算成绩。 */
        function armAuto() {
          clearTimeout(swapTimer);
          swapTimer = setTimeout(function () {
            if (swapState === "pick") { choose(0); return; }
            if (swapState !== "clues") return;
            const b = el.swapClues.querySelector("button:not(:disabled)");
            if (b) b.click();
          }, 6000);
        }

        function choose(i) {
          if (swapState !== "pick") return;
          swapState = "clues";
          swapChoice = i;
          D.audio.click();
          const round = SWAP_ROUNDS[i];
          setSay("me", "「" + round.word + "」。");
          el.swapOpts.hidden = true;
          el.swapOpts.innerHTML = "";
          el.swapLead.textContent = "你出「" + round.word + "」。挑两句最像的，别提这个词。";
          el.swapClues.innerHTML = "";
          round.clues.forEach(function (c, j) {
            const b = document.createElement("button");
            b.type = "button";
            b.textContent = c.text;
            b.dataset.clue = String(j);
            b.addEventListener("click", function () { give(j, b); });
            el.swapClues.appendChild(b);
          });
          el.swapClues.hidden = false;
          armAuto();
        }

        function give(j, btn) {
          if (swapState !== "clues" || btn.disabled) return;
          const round = SWAP_ROUNDS[swapChoice];
          const clue = round.clues[j];
          btn.disabled = true;
          picked.push(j);
          swapUsed = picked.length;
          D.audio.click();
          setSay("me", clue.text);
          clearTimeout(swapTimer);
          // 让她俩先听完这一句，再决定往哪边猜
          swapTimer = setTimeout(function () {
            if (swapState !== "clues") return;
            if (!clue.fits) {
              D.audio.wrong();
              setSay("friend", "……" + clue.mislead + "？");
            } else {
              const fits = picked.filter(function (k) {
                return round.clues[k].fits;
              }).length;
              if (fits >= 2) { finish(); return; }
              D.audio.blip();
              setSay("girl", "再说一句。");
            }
            // 三句都说了还没猜中（正常不会发生），也收尾，不把人卡在这儿
            if (picked.length >= round.clues.length) finish();
            else armAuto();
          }, 950);
        }

        function finish() {
          if (swapState === "done") return;
          swapState = "done";
          clearTimeout(swapTimer);
          if (swapKey) { window.removeEventListener("keydown", swapKey); swapKey = null; }
          el.swapClues.hidden = true;
          el.swapOpts.hidden = true;
          const round = SWAP_ROUNDS[swapChoice];
          const used = swapUsed;
          D.audio.right();
          setSay("friend", "……" + round.word + "？");
          setTimeout(function () {
            setSay("girl", "嗯。就是。");
            setTimeout(function () {
              setSay("friend", used >= 3
                ? "中间那句不像，你故意的吧。"
                : "两句就猜到了，你出得太好猜。");
              setTimeout(function () {
                el.swap.hidden = true;
                if (!resolved) { resolved = true; resolve(); }
              }, 1150);
            }, 850);
          }, 850);
        }

        function onKey(e) {
          const n = Number(e.key);
          if (!(n >= 1 && n <= 3)) return;
          if (swapState === "pick") choose(n - 1);
          else if (swapState === "clues") {
            const b = el.swapClues.querySelector('button[data-clue="' + (n - 1) + '"]');
            if (b && !b.disabled) b.click();
          }
        }
        window.addEventListener("keydown", onKey);
        swapKey = onKey;
        armAuto();
      });
    }

    function submitText() {
      if (state !== "ask" || !choiceResolve) return;
      const q = QUESTIONS[idx];
      const v = norm(el.input.value);
      if (!v) return;
      const hit = norm(q.answer) === v || q.aliases.some(function (a) { return norm(a) === v; });
      if (hit) {
        // 手写是对的，也让角色即时看见一次——不然这个可选输入像没人接
        if (!typedReacted) {
          typedReacted = true;
          D.react("由乃", "还能直接写出来啊。", 1500);
        }
        // 手写对了也走「选项命中」那条路，省得两套反馈
        const i = q.options.indexOf(q.answer);
        pick(i);
      } else {
        D.audio.wrong();
        el.input.value = "";
        el.say.textContent = WHO[q.host] + "：不对。";
        el.say.classList.add("show");
      }
    }

    // ---------------------------------------------------------------- 生命周期

    async function start() {
      grab();
      D.clearReact();
      D.onPoke(poke);
      show();
      state = "intro";
      D.reactHint("F · 抢答");
      // 章节壳进来之前把画面压黑了，这里要自己淡回来——
      // #fade 盖在所有面板上面，不淡掉的话整个猜词界面是全黑的。
      await D.fadeTo(0, 320);

      await say(null, "课间，走廊尽头那张长椅。", 1400);
      await say("friend", "闲着也是闲着，猜点东西吧。", 1300);
      await say("me", "猜什么？", 1000);
      await say("friend", "随便啊。最近听的、玩的、班里传的，都行。", 1600);
      await say("girl", "别出太难的。", 1100);

      let got = 0;
      for (let i = 0; i < QUESTIONS.length; i++) {
        if (i === 3) await interlude();   // 前半场三题结束，聊两句再回来
        idx = i;
        const ok = await playRound(i);
        if (ok) got++;
      }

      el.hintBtn.hidden = true;
      await swapRound();
      D.reactHint(false);
      state = "done";

      // 收尾交回画布上的对白
      hide();
      const lines = [
        ["由乃", got === QUESTIONS.length ? "全对。行啊你。" : got >= 4 ? "差不多吧。" : "……下次让着你点。"],
        ["朱里", "他刚才想了好久。"],
        ["我", "没有很久。"],
        ["旁白", "上课铃响了。三个人从长椅上站起来，谁也没提刚才那几道题。"]
      ];
      await D.lines(lines);

      D.persist({ wordGameCompleted: true, wordGameCorrect: got, wordGameHints: hints });
      host.done({
        id: "word_guess",
        completed: true,
        events: ["wordgame:finished"],
        playerActions: ["rounds:" + QUESTIONS.length, "correct:" + got, "hints:" + hints]
      });
    }

    function update() { /* 面板驱动，没有逐帧逻辑 */ }

    function draw(ctx) {
      // 猜词时画面只做背景：压暗一层，让人专心看面板
      ctx.drawImage(D.img.railing, 0, 0, D.W, D.H);
      ctx.fillStyle = "rgba(24,18,26,.62)";
      ctx.fillRect(0, 0, D.W, D.H);
    }

    function press(key) {
      const k = key.toLowerCase();
      if (k === "e" || key === "Enter") {
        // 对白里按 E 提前跳过当前这句
        if (sayResolve && state !== "ask") { const f = sayResolve; sayResolve = null; f(); }
      }
    }

    return {
      id: "word_guess",
      title: "课间猜人物",
      start: start,
      update: update,
      draw: draw,
      press: press,
      setFrozen: function () { },
      dispose: function () {
        D.onPoke(null);
        D.reactHint(false);
        D.clearReact();
        clearTimeout(swapTimer);
        if (swapKey) { window.removeEventListener("keydown", swapKey); swapKey = null; }
        hide();
      },
      get state() { return state; },
      get rounds() { return QUESTIONS.length; },
      get pokeCount() { return pokeCount; },
      get swapChoice() { return swapChoice; },
      get swapState() { return swapState; },
      get swapUsed() { return swapUsed; },
      get stats() { return { correct: correct, hints: hints, tries: tries }; }
    };
  };

})(window);
