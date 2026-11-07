/* G03《课间猜词》— 三人轮流猜词
 *
 * 三个回合：闺蜜主持 → 女主主持 → 闺蜜主持（这题难一点，可以主动要提示）。
 * 猜错不会卡住：再给一条提示，还可以继续猜；三次机会用完之后直接公布答案。
 *
 * 判分只影响结束时的措辞，不影响任何剧情走向——设计稿第 5.11 节。
 * 题库在下面 QUESTIONS 里，加题只改这个数组。
 */
(function (global) {
  "use strict";

  const D = global.DAILY;
  D.games = D.games || {};

  const QUESTIONS = [
    {
      id: "chalk",
      host: "friend",
      answer: "粉笔",
      aliases: ["粉笔头", "白粉笔"],
      clues: [
        "教室里天天见。",
        "能写字，写完会越来越短。",
        "老师一扔，全班都听得见。"
      ],
      options: ["粉笔", "铅笔", "橡皮", "黑板擦"],
      hostLines: ["这个你肯定知道。", "急什么，我还没说提示呢。"],
      npc: { who: "girl", right: false, text: "黑板擦？" }
    },
    {
      id: "schedule",
      host: "girl",
      answer: "课表",
      aliases: ["课程表", "作息表"],
      clues: [
        "贴在教室前面那面墙上。",
        "每天都要抬头看一眼。",
        "上面写着第几节是谁的课。"
      ],
      options: ["课表", "值日表", "座位表", "考试安排"],
      hostLines: ["换我来出。", "这个……你们应该都知道。"],
      npc: { who: "friend", right: false, text: "座位表吧？" }
    },
    {
      id: "evening",
      host: "friend",
      answer: "晚自习",
      aliases: ["晚自修", "夜自习"],
      clues: [
        "天黑了才开始。",
        "教室里很安静，只有翻书和笔尖的声音。",
        "结束的时候，走廊一下子全是人。"
      ],
      options: ["晚自习", "值日", "班会", "课间操"],
      hostLines: ["最后一题，难点儿的。", "想不出来可以问我要提示。"],
      npc: { who: "girl", right: false, text: "……班会？" }
    }
  ];

  const WHO = { girl: "朱里", me: "和臣", friend: "闺蜜" };

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
      el.chips = Array.prototype.slice.call(document.querySelectorAll("#wg .chip"));
    }

    // ---------------------------------------------------------------- 面板

    function show() {
      el.root.hidden = false;
      el.root.classList.add("show");
    }
    function hide() {
      el.root.classList.remove("show");
      el.root.hidden = true;
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
      q.options.forEach(function (text, i) {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = text;
        b.dataset.index = String(i);
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

    // ---------------------------------------------------------------- 回合

    async function playRound(i) {
      const q = QUESTIONS[i];
      const dead = [];
      let shown = 1;
      let npcSaid = false;

      setRound(i);
      el.say.textContent = "";
      el.say.classList.remove("show");
      el.host.textContent = "";
      el.host.classList.remove("show");
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

    function submitText() {
      if (state !== "ask" || !choiceResolve) return;
      const q = QUESTIONS[idx];
      const v = norm(el.input.value);
      if (!v) return;
      const hit = norm(q.answer) === v || q.aliases.some(function (a) { return norm(a) === v; });
      if (hit) {
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
      show();
      state = "intro";
      // 章节壳进来之前把画面压黑了，这里要自己淡回来——
      // #fade 盖在所有面板上面，不淡掉的话整个猜词界面是全黑的。
      await D.fadeTo(0, 320);

      await say(null, "课间，走廊尽头那张长椅。", 1400);
      await say("friend", "闲着也是闲着，玩个猜词。", 1300);
      await say("me", "怎么玩？", 1000);
      await say("friend", "我出题，你们俩猜。猜对换下一个。", 1500);

      let got = 0;
      for (let i = 0; i < QUESTIONS.length; i++) {
        idx = i;
        const ok = await playRound(i);
        if (ok) got++;
      }

      el.hintBtn.hidden = true;
      state = "done";

      // 收尾交回画布上的对白
      hide();
      const lines = [
        ["闺蜜", got === QUESTIONS.length ? "全对。行啊你。" : got >= 2 ? "差不多吧。" : "……下次让着你点。"],
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
      title: "课间猜词",
      start: start,
      update: update,
      draw: draw,
      press: press,
      setFrozen: function () { },
      get state() { return state; },
      get stats() { return { correct: correct, hints: hints, tries: tries }; }
    };
  };

})(window);
