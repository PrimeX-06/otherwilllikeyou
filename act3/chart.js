/* 第三幕 · 广播室 — 谱面
 *
 * 把 script.js 的「谁、说什么、占几拍」摊平到一条绝对时间轴上。
 * 这里不判、不画、不出声，只产出三样东西：
 *
 *   notes   每个音符的绝对时间（秒）、轨道、类型、按住多久、对应哪个词块
 *   display 字幕要一行一行显示的文本，已经按「谁说的」分好
 *   cues    她提前敲稿子的提示点（你要连续念四句以上时，她先给你一下）
 *
 * 全部是纯函数、没有随机数：同样的稿子每次生成的谱面逐字节相同，
 * 自检才能拿它当基准。
 */
(function (global) {
  "use strict";

  const BPM = 96;
  const SPB = 60 / BPM;

  const CUE_RUN = 4;        // 连着四句以上轮到你，她才给提示
  const COVER_DELAY = 0.9;  // 漏接之后，她隔多久替你补上（拍）

  function build(script, opt) {
    const o = opt || {};
    const leadBeats = o.leadBeats == null ? 4 : o.leadBeats;
    const bpm = o.bpm || BPM;
    const spb = 60 / bpm;

    let beat = leadBeats;
    const notes = [];
    const lines = [];

    for (const line of script) {
      // 和上一行同拍起：收尾那句两个人是一起说的
      if (line.same && lines.length) beat = lines[lines.length - 1].startBeat;
      const startBeat = beat;
      const chunks = [];

      for (const c of line.chunks) {
        const len = c.beats == null ? 1 : c.beats;
        if (c.k === "rest") { beat += len; continue; }
        const n = {
          id: notes.length,
          lane: line.who,
          type: c.k,                       // tap | hold | relay
          beat,
          time: beat * spb,
          dur: c.k === "hold" ? len * spb : 0,
          text: c.text,
          line: lines.length,
          chunk: chunks.length,
          chord: false
        };
        notes.push(n);
        chunks.push({ text: c.text, beat, type: c.k, lane: line.who, noteId: n.id });
        beat += len;
      }
      lines.push({ who: line.who, startBeat, endBeat: beat, chunks });
    }

    notes.sort((a, b) => a.beat - b.beat || (a.lane === "her" ? -1 : 1));

    // 同一点落下的两个音符 = 合唱（只有最后那句）
    const byBeat = new Map();
    for (const n of notes) {
      const key = n.beat.toFixed(3);
      if (byBeat.has(key)) {
        byBeat.get(key).chord = true;
        n.chord = true;
      } else byBeat.set(key, n);
    }

    // 字幕行：同一拍起的几行合成一行（合唱那句显示成「两人」）
    const display = [];
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      const group = [l];
      while (i + 1 < lines.length && lines[i + 1].startBeat === l.startBeat) {
        group.push(lines[++i]);
      }
      const who = group.length > 1 ? "both"
        : group[0].who === "her" ? "her" : "me";
      // 合唱那句两个人的词块一模一样，字幕上只留一份——
      // 不然会显示成「下次见。下次见。」
      const all = group.flatMap((g) => g.chunks);
      const same = group.length > 1 && all.every((c) => c.text === all[0].text);
      display.push({
        who,
        startBeat: l.startBeat,
        endBeat: Math.max(...group.map((g) => g.endBeat)),
        chunks: same ? [all[0]] : all
      });
    }

    // 她要提前敲一下稿子的地方：连着四句以上都是你的
    const cues = [];
    let run = [];
    const flush = () => {
      if (run.length >= CUE_RUN) {
        cues.push({
          beat: run[0].beat - 1,
          time: (run[0].beat - 1) * spb,
          noteId: run[0].id,
          len: run.length
        });
      }
      run = [];
    };
    for (const n of notes) {
      if (n.lane === "me") run.push(n);
      else flush();
    }
    flush();

    // 漏接接力音符时，她替你把这一句接过去：粉轨补一个「托」的音符
    const covers = [];
    for (const n of notes) {
      if (n.type !== "relay") continue;
      covers.push({
        beat: n.beat + COVER_DELAY,
        time: (n.beat + COVER_DELAY) * spb,
        forNote: n.id,
        line: n.line
      });
    }

    const totalBeats = beat;
    return {
      bpm, spb, leadBeats,
      notes, lines, display, cues, covers,
      totalBeats,
      duration: totalBeats * spb,
      count: notes.length,
      mine: notes.filter((n) => n.lane === "me").length,
      hers: notes.filter((n) => n.lane === "her").length,
      types: notes.reduce((m, n) => { m[n.type] = (m[n.type] || 0) + 1; return m; }, {})
    };
  }

  global.ACT3 = global.ACT3 || {};
  global.ACT3.buildChart = build;
  global.ACT3.CUE_RUN = CUE_RUN;
})(window);
