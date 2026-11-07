/* 第三幕 · 广播室 — 判定与双轨
 *
 * 两条轨道：粉的是她的，蓝的是你的。她的自动命中，你的自己按。
 *
 * 三个「她在帮你」的设计都落在这里，而且都不靠字幕解释：
 *   补位  你漏掉一个接力音符 → 她的粉轨在 0.9 拍后补一个「托」的音符，
 *         用她的音色把那半句念出来。玩家听到的是「这句被人接住了」。
 *   提示  连着四句以上轮到你 → 她提前一拍敲一下稿纸，你的轨道上出现一个虚影音符。
 *   合流  最后一句两条轨道同一拍落下。
 *
 * 判定时钟只认 audio.songTime()。这个文件里没有一处 setTimeout。
 */
(function (global) {
  "use strict";

  const WIN = { perfect: 0.070, good: 0.150, ok: 0.250 };
  const BASE = { perfect: 1000, good: 700, ok: 400, miss: 0 };
  const RANK = [
    [0.95, "S"], [0.88, "A"], [0.78, "B"], [0.65, "C"], [0, "D"]
  ];

  /** 纯函数：偏差多少秒 → 档位。自检直接调它，不用跑实时。 */
  function judge(delta) {
    const a = Math.abs(delta);
    if (a <= WIN.perfect) return "perfect";
    if (a <= WIN.good) return "good";
    if (a <= WIN.ok) return "ok";
    return "miss";
  }

  function createRhythm(chart, audio, hooks) {
    const h = hooks || {};

    const HERS = chart.notes.filter((n) => n.lane === "her")
      .map((n) => Object.assign({}, n));
    const MINE = chart.notes.filter((n) => n.lane === "me")
      .map((n) => Object.assign({}, n));

    // 她的「托」音符：漏接接力之后补进来，也走她的轨道、也自动命中。
    // 关键：一开始 active = false。要是不加这个开关，它会从一开始就跟着
    // 谱面往下落——玩家还没漏，就看见「她准备替我念」的音符在半空中，
    // 而且不管你接没接住，到点都会替你把那句念一遍（同一句话念两遍）。
    const covers = [];
    for (const c of chart.covers) {
      const src = chart.notes.find((n) => n.id === c.forNote);
      if (!src) continue;
      const cov = {
        id: 9000 + c.forNote,
        lane: "her",
        type: "cover",
        beat: c.beat,
        time: c.time,
        dur: 0,
        text: src.text,
        line: src.line,
        chunk: src.chunk,
        forNote: c.forNote,
        chord: false,
        judged: false,
        cover: true,
        active: false
      };
      covers.push(cov);
    }
    const HER_ALL = HERS.concat(covers).sort((a, b) => a.time - b.time);

    const S = {
      t: 0,
      hIdx: 0,
      mIdx: 0,
      combo: 0,
      maxCombo: 0,
      score: 0,
      counts: { perfect: 0, good: 0, ok: 0, miss: 0 },
      rescues: 0,
      rescued: [],          // 被接住的音符 id
      hold: null,
      last: null,           // { tier, delta, at, text }
      cue: null,            // { time, len, fired }
      cuesFired: 0,
      finished: false,
      herDone: 0,
      skipped: 0          // 跳段时略过的音符，不算漏、也不进准确率的分母
    };

    function mult() { return 1 + Math.min(0.5, S.combo * 0.01); }

    function award(tier, note, extra) {
      const k = extra == null ? 1 : extra;
      if (tier === "miss") {
        S.combo = 0;
        S.counts.miss++;
        return 0;
      }
      // 倍率用「命中之前」的连击算：第一个 PERFECT 就该是整 1000，
      // 先加连击再算倍率的话，第一次命中会莫名其妙多出 1%。
      const m = mult();
      S.combo++;
      S.maxCombo = Math.max(S.maxCombo, S.combo);
      S.counts[tier]++;
      const add = Math.round(BASE[tier] * m * k);
      S.score += add;
      return add;
    }

    // ---------------------------------------------------------- 她的轨道

    function hitHer(n) {
      if (n.judged) return;
      n.judged = true;
      n.result = "perfect";
      S.herDone++;
      if (n.cover) {
        // 替你把这一句念出来：音色是她的，音量比她平时低一点，像在压着嗓子补
        audio.say("her", n.text, audio.now(), { gain: 0.85 });
        audio.cover(audio.now());
        h.onCover && h.onCover(n);
        return;
      }
      audio.say("her", n.text, audio.now());
      h.onHerNote && h.onHerNote(n);
    }

    // ---------------------------------------------------------- 我的轨道

    function missNote(n) {
      if (n.judged) return;
      n.judged = true;
      n.result = "miss";
      award("miss", n);
      S.last = { tier: "miss", delta: 0, at: S.t, text: n.text };
      h.onJudge && h.onJudge("miss", n, 0);
      if (n.type === "relay") rescue(n);
    }

    /** 她替你接住漏掉的接力。不是惩罚，是让这一句还能继续往下念。 */
    function rescue(n) {
      const cov = covers.find((c) => c.forNote === n.id);
      if (!cov) return;
      cov.active = true;      // 到这一步她才真的开口替他补
      S.rescues++;
      S.rescued.push(n.id);
      h.onRescue && h.onRescue(n, cov);
    }

    function findTarget(t) {
      let best = null;
      let bestD = 1e9;
      for (let i = S.mIdx; i < MINE.length && i < S.mIdx + 5; i++) {
        const n = MINE[i];
        if (n.judged) continue;
        const d = t - n.time;
        if (d < -WIN.ok) break;
        if (Math.abs(d) > WIN.ok) continue;
        if (Math.abs(d) < Math.abs(bestD)) { best = n; bestD = d; }
      }
      return best ? { note: best, delta: bestD } : null;
    }

    /** 按一下。返回判定结果，场景拿它决定放什么音效。 */
    function press(t) {
      if (S.finished) return null;
      const hit = findTarget(t);
      if (!hit) {
        // 抢话：按早了，但附近确实没音符。不扣分，只当没按——
        // 朗读的时候手会乱动，这里扣分只会让人不敢按。
        h.onIdle && h.onIdle();
        return null;
      }
      const n = hit.note;
      const tier = judge(hit.delta);
      n.judged = true;
      n.result = tier;
      n.delta = hit.delta;
      const gain = award(tier, n, 1);
      S.last = { tier, delta: hit.delta, at: t, text: n.text };

      if (n.type === "hold") {
        S.hold = { note: n, from: t, ratio: 0 };
      }
      audio.say("me", n.text, audio.now(), { gain: tier === "miss" ? 0.4 : 1 });
      if (tier === "perfect") audio.chime(audio.now(), true);
      else if (tier === "good") audio.chime(audio.now(), false);
      else if (tier === "ok") audio.tapPaper(audio.now());
      h.onJudge && h.onJudge(tier, n, hit.delta, gain);
      return { tier, delta: hit.delta, note: n };
    }

    /** 松手。按住的比例决定这条长音的得分。 */
    function release(t) {
      const st = S.hold;
      if (!st) return;
      S.hold = null;
      const n = st.note;
      const need = Math.max(0.18, n.dur);
      const held = Math.max(0, t - Math.max(st.from, n.time));
      const ratio = Math.min(1, held / need);
      n.heldRatio = ratio;
      if (ratio < 0.85) {
        // 松早了：补一点分回来，但不改档位——档位是按下那一刻定的
        const back = Math.round(BASE[n.result || "ok"] * 0.35 * (1 - ratio));
        S.score -= back;
        h.onHoldBreak && h.onHoldBreak(n, ratio);
      } else {
        h.onHoldDone && h.onHoldDone(n, ratio);
      }
    }

    // ---------------------------------------------------------- 每帧

    function update(t) {
      S.t = t;

      // 她：到点就命中。不等待、不判定，这就是「自动」。
      // 没被激活的「托」音符直接跳过——hIdx 照样往前走，
      // 不然一个没被用上的补位音符会把整条轨道卡死。
      while (S.hIdx < HER_ALL.length && t >= HER_ALL[S.hIdx].time) {
        const n = HER_ALL[S.hIdx++];
        if (n.cover && !n.active) continue;
        hitHer(n);
      }

      // 我：过了窗口还没按，就是漏
      while (S.mIdx < MINE.length && MINE[S.mIdx].judged) S.mIdx++;
      while (S.mIdx < MINE.length && t > MINE[S.mIdx].time + WIN.ok) {
        missNote(MINE[S.mIdx]);
        S.mIdx++;
        while (S.mIdx < MINE.length && MINE[S.mIdx].judged) S.mIdx++;
      }

      // 长按按到尾巴自然松开
      if (S.hold) {
        const n = S.hold.note;
        if (t >= n.time + n.dur + 0.08) release(n.time + n.dur);
      }

      // 她提前敲稿子：连着四句以上轮到你的时候，先给你一下
      while (S.cuesFired < chart.cues.length && chart.cues[S.cuesFired].time <= t) {
        const next = chart.cues[S.cuesFired++];
        S.cue = { time: next.time, len: next.len, noteId: next.noteId, until: t + 0.55 };
        audio.tapPaper(audio.now());
        h.onCue && h.onCue(next);
      }
      if (S.cue && t > S.cue.until) S.cue = null;

      if (!S.finished && S.mIdx >= MINE.length && S.hIdx >= HER_ALL.length) {
        S.finished = true;
        S.finishedAt = t;
        h.onFinish && h.onFinish(stats());
      }
    }

    function accuracy() {
      const total = (MINE.length - S.skipped) || 1;
      const got = S.counts.perfect * 1 + S.counts.good * 0.7 + S.counts.ok * 0.4;
      return Math.max(0, Math.min(1, got / total));
    }

    function rank() {
      const a = accuracy();
      for (const [k, v] of RANK) if (a >= k) return v;
      return "D";
    }

    function stats() {
      return {
        score: S.score,
        combo: S.maxCombo,
        counts: Object.assign({}, S.counts),
        total: MINE.length - S.skipped,
        accuracy: accuracy(),
        rank: rank(),
        rescues: S.rescues
      };
    }

    /** 谱面上还没判的音符（画的时候用）。没被激活的补位音符不画。 */
    function live() {
      return {
        hers: HER_ALL.filter((n) => !n.cover || n.active),
        mine: MINE, hold: S.hold, cue: S.cue, last: S.last
      };
    }

    /** 跳到某一秒：把这之前的音符全部标成「略过」，不判、不计分。
     *  演示脚本靠它直接看最后一段，不用真的等三分钟。 */
    function skipTo(t) {
      while (S.hIdx < HER_ALL.length && HER_ALL[S.hIdx].time < t) {
        HER_ALL[S.hIdx].judged = true;
        HER_ALL[S.hIdx].result = "skip";
        S.hIdx++;
      }
      while (S.mIdx < MINE.length && MINE[S.mIdx].time < t) {
        const n = MINE[S.mIdx];
        if (!n.judged) { n.judged = true; n.result = "skip"; S.skipped++; }
        S.mIdx++;
      }
      S.t = t;
      S.combo = 0;
    }

    function reset() {
      S.hIdx = 0; S.mIdx = 0; S.combo = 0; S.maxCombo = 0; S.score = 0;
      S.counts = { perfect: 0, good: 0, ok: 0, miss: 0 };
      S.rescues = 0; S.rescued = []; S.hold = null; S.last = null;
      S.cue = null; S.cuesFired = 0; S.finished = false; S.herDone = 0; S.skipped = 0;
      for (const n of HER_ALL) { n.judged = false; n.result = null; }
      for (const c of covers) c.active = false;
      for (const n of MINE) { n.judged = false; n.result = null; n.heldRatio = 0; }
    }

    return {
      WIN, judge,
      press, release, update, reset, skipTo,
      stats, live,
      get state() { return S; },
      get mine() { return MINE; },
      get hers() { return HER_ALL; },
      get covers() { return covers; }
    };
  }

  global.ACT3 = global.ACT3 || {};
  global.ACT3.createRhythm = createRhythm;
  global.ACT3.JUDGE_WIN = WIN;
})(window);
