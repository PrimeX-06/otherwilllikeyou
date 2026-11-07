/* 第三幕 · 广播室 — 声音
 *
 * 一个音频文件都不加载，全部现场合成。两个原因：
 *   1. file:// 下 fetch 音频会被跨域拦掉，这套东西要能双击 html 就开；
 *   2. 节奏判定必须挂在 AudioContext.currentTime 上——它是唯一和「实际出声」
 *      严格同步的时钟。setTimeout / rAF 都会被节流，误差几十毫秒，
 *      正好是 PERFECT 和 GOOD 的差距。上一版用 rAF 计时试过，副歌一密集就散。
 *
 * 时钟约定：songTime() 返回「玩家此刻听到的第几秒」，已经扣掉了输出延迟和
 * 手感校准。判定、音符下落、字幕高亮、她的自动命中，全部读同一个数。
 */
(function (global) {
  "use strict";

  const BPM = 96;
  const SPB = 60 / BPM;        // 一拍多少秒
  const BAR = 4;               // 4/4
  const LOOKAHEAD = 0.22;      // 提前多少秒排程
  const TICK_MS = 30;          // 排程线程多久跑一次

  // Am – F – C – G，每个和弦两小节。root 是 MIDI 音高。
  const PROG = [
    { root: 45, fifth: 52, chord: [57, 60, 64] },
    { root: 41, fifth: 48, chord: [53, 57, 60] },
    { root: 48, fifth: 55, chord: [55, 60, 64] },
    { root: 43, fifth: 50, chord: [55, 59, 62] }
  ];

  // 两个人在五声音阶上的「说话音高」。她高一个纯五度，混在一起是和谐的。
  const VOICE = {
    her: { base: 60, wave: "triangle", bp: 1500, q: 1.1, len: 0.062 },
    me: { base: 55, wave: "square", bp: 980, q: 1.5, len: 0.055 }
  };
  const PENTA = [0, 2, 4, 7, 9];

  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

  function createAudio() {
    let ctx = null;
    let master, busMusic, busVoice, busSfx, hum, humGain;
    let nz = null;
    let ready = false;

    let songStart = 0;           // ctx 时间轴上「第 0 秒」的位置
    let running = false;         // 歌曲时钟是否在走
    let pausedAt = 0;
    let offsetSec = 0;           // 手感校准（秒），正数 = 玩家偏晚
    let schedSlot = 0;           // 已经排到第几个八分音符
    let timer = 0;
    let musicOn = true;

    function ensure() {
      if (ctx) return ctx;
      const AC = global.AudioContext || global.webkitAudioContext;
      ctx = new AC({ latencyHint: "interactive" });

      master = ctx.createGain();
      master.gain.value = 0.85;
      // 一点点低通：像素游戏的声音应该像从小喇叭里出来的，不是监听音箱
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 7600;
      lp.Q.value = 0.3;
      master.connect(lp);
      lp.connect(ctx.destination);

      busMusic = ctx.createGain(); busMusic.gain.value = 0.115; busMusic.connect(master);
      busVoice = ctx.createGain(); busVoice.gain.value = 0.150; busVoice.connect(master);
      busSfx = ctx.createGain(); busSfx.gain.value = 0.190; busSfx.connect(master);

      // 播音间的底噪：极低的白噪 + 一点电流声。有这个「房间感」，
      // 音符之间的空隙才不像静音，而像有人在憋着气等下一句。
      hum = ctx.createBufferSource();
      hum.buffer = noise();
      hum.loop = true;
      humGain = ctx.createGain();
      humGain.gain.value = 0;
      const hp = ctx.createBiquadFilter();
      hp.type = "bandpass";
      hp.frequency.value = 620;
      hp.Q.value = 0.7;
      hum.connect(hp); hp.connect(humGain); humGain.connect(master);
      hum.start();

      ready = true;
      return ctx;
    }

    function noise() {
      if (nz) return nz;
      const len = Math.floor(ctx.sampleRate * 1.2);
      nz = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = nz.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      return nz;
    }

    function unlock() {
      ensure();
      const p = ctx.state === "running" ? Promise.resolve() : ctx.resume();
      return p.then(() => {
        // 输出延迟是个不错的初值；玩家真做一次试音就会被覆盖
        if (!offsetSec && ctx.outputLatency) offsetSec = ctx.outputLatency;
        return true;
      });
    }

    // ------------------------------------------------------------ 时钟

    function now() { return ctx ? ctx.currentTime : 0; }

    /** 玩家此刻「听到」的第几秒。判定和画面都读这个。 */
    function songTime() {
      if (!ctx || !running) return pausedAt;
      return ctx.currentTime - songStart - offsetSec;
    }

    function startSong(lead) {
      ensure();
      songStart = ctx.currentTime + (lead == null ? 1.6 : lead);
      schedSlot = 0;
      running = true;
      pausedAt = 0;
      if (humGain) humGain.gain.setTargetAtTime(0.012, ctx.currentTime, 0.4);
      if (!timer) timer = setInterval(schedule, TICK_MS);
      schedule();
    }

    function stopSong() {
      // 顺序不能反：先把此刻的秒数存下来，再把时钟停下。
      // 反过来写的话 songTime() 会立刻返回旧的 pausedAt（0），
      // 画面上的特效就会拿到一个 -29 秒的时间差，光环半径算成负数直接抛错。
      if (running) pausedAt = songTime();
      running = false;
      if (timer) { clearInterval(timer); timer = 0; }
      if (humGain && ctx) humGain.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
    }

    /** 跳到某一秒。演示和自检用：不用真的等三分钟才能看到最后一段。 */
    function seek(t) {
      ensure();
      songStart = ctx.currentTime - t - offsetSec;
      schedSlot = Math.max(0, Math.ceil(t / (SPB / 2)));
      running = true;
      pausedAt = t;
      if (!timer) timer = setInterval(schedule, TICK_MS);
    }

    function setOffsetMs(ms) {
      offsetSec = Math.max(-0.15, Math.min(0.25, (ms || 0) / 1000));
    }
    function offsetMs() { return Math.round(offsetSec * 1000); }

    // ------------------------------------------------------------ 排程

    function schedule() {
      if (!ctx || !running) return;
      const horizon = ctx.currentTime + LOOKAHEAD;
      const slotDur = SPB / 2;
      let guard = 0;
      while (songStart + schedSlot * slotDur < horizon && guard++ < 64) {
        const at = songStart + schedSlot * slotDur;
        if (at >= ctx.currentTime - 0.02 && musicOn) grooveAt(schedSlot, at);
        schedSlot++;
      }
    }

    /** 一个八分音符格子里的鼓、贝斯、和声。 */
    function grooveAt(slot, at) {
      const bar = Math.floor(slot / 8);
      const inBar = (slot % 8) / 2;              // 0, .5, 1, ... 3.5
      const ch = PROG[Math.floor(bar / 2) % PROG.length];
      const beat = at;

      if (inBar === 0 || inBar === 2) kick(beat);
      if (inBar === 1 || inBar === 3) clap(beat);
      hat(beat, inBar % 1 === 0 ? 0.9 : 0.5);

      if (inBar === 0) bass(ch.root - 12, beat, 0.85);
      else if (inBar === 1.5) bass(ch.root, beat, 0.42);
      else if (inBar === 2) bass(ch.root - 12, beat, 0.62);
      else if (inBar === 3.5) bass(ch.fifth, beat, 0.36);

      // 每两小节起一次和声垫，铺满整两小节
      if (bar % 2 === 0 && inBar === 0) pad(ch.chord, beat, SPB * BAR * 2);
    }

    function kick(at) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(128, at);
      o.frequency.exponentialRampToValueAtTime(46, at + 0.10);
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(0.55, at + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 0.16);
      o.connect(g); g.connect(busMusic);
      o.start(at); o.stop(at + 0.18);
    }

    function clap(at) {
      const s = ctx.createBufferSource();
      s.buffer = noise();
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass"; bp.frequency.value = 1900; bp.Q.value = 1.4;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(0.16, at + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 0.10);
      s.connect(bp); bp.connect(g); g.connect(busMusic);
      s.start(at); s.stop(at + 0.12);
    }

    function hat(at, amp) {
      const s = ctx.createBufferSource();
      s.buffer = noise();
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass"; hp.frequency.value = 6800;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(0.05 * amp, at + 0.002);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 0.045);
      s.connect(hp); hp.connect(g); g.connect(busMusic);
      s.start(at); s.stop(at + 0.06);
    }

    function bass(midi, at, dur) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(hz(midi), at);
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(0.30, at + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
      o.connect(g); g.connect(busMusic);
      o.start(at); o.stop(at + dur + 0.02);
    }

    function pad(midis, at, dur) {
      for (const m of midis) {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(hz(m), at);
        g.gain.setValueAtTime(0.0001, at);
        g.gain.linearRampToValueAtTime(0.030, at + 0.35);
        g.gain.linearRampToValueAtTime(0.0001, at + dur);
        o.connect(g); g.connect(busMusic);
        o.start(at); o.stop(at + dur + 0.05);
      }
    }

    // ------------------------------------------------------------ 人声

    /**
     * 一个音节。她和他用不同音色，所以玩家能听出「这句是谁在读」——
     * 漏接时她替你补的那一下，如果音色不对，整段就白做了。
     */
    function blip(who, seed, when, opt) {
      if (!ctx) return;
      const v = VOICE[who] || VOICE.me;
      const at = Math.max(ctx.currentTime, when || ctx.currentTime);
      const o = opt || {};
      const step = PENTA[Math.abs(seed | 0) % 5] + 12 * (Math.floor(Math.abs(seed | 0) / 5) % 2);
      const f = hz(v.base + step);
      const len = o.len || v.len;
      const gain = o.gain == null ? 0.9 : o.gain;

      const osc = ctx.createOscillator();
      const sub = ctx.createOscillator();
      const g = ctx.createGain();
      const bp = ctx.createBiquadFilter();

      osc.type = v.wave;
      osc.frequency.setValueAtTime(f * 1.05, at);
      osc.frequency.exponentialRampToValueAtTime(f * 0.93, at + len);

      sub.type = "sine";
      sub.frequency.setValueAtTime(f / 2, at);
      const sg = ctx.createGain();
      sg.gain.value = 0.28;

      bp.type = "bandpass";
      bp.frequency.value = o.bp || v.bp;
      bp.Q.value = v.q;

      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(gain, at + 0.007);
      g.gain.exponentialRampToValueAtTime(0.0001, at + len);

      osc.connect(bp);
      sub.connect(sg); sg.connect(bp);
      bp.connect(g);
      g.connect(busVoice);
      osc.start(at); osc.stop(at + len + 0.02);
      sub.start(at); sub.stop(at + len + 0.02);
    }

    /** 一整块词的连读：按字数切成几个音节，稍微不均，像真的在念。 */
    function say(who, text, when, opt) {
      if (!ctx || !text) return;
      const n = Math.max(1, Math.min(6, Math.ceil(text.length / 2)));
      const base = when || ctx.currentTime;
      const o = opt || {};
      const span = o.span || Math.min(0.34, 0.062 * n + 0.05);
      const seed0 = o.seed || 0;
      for (let i = 0; i < n; i++) {
        const k = n === 1 ? 0 : i / (n - 1);
        // 音高句尾微微下压，念完一块会自然收住
        const bend = Math.round(-1.6 * k);
        blip(who, seed0 + i * 3 + bend, base + k * span, {
          gain: 0.72 + 0.28 * (1 - k),
          len: o.len
        });
      }
    }

    // ------------------------------------------------------------ 音效

    function tapPaper(when) {
      if (!ctx) return;
      const at = Math.max(ctx.currentTime, when || ctx.currentTime);
      const s = ctx.createBufferSource();
      s.buffer = noise();
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass"; bp.frequency.value = 2600; bp.Q.value = 0.9;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(0.20, at + 0.003);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 0.035);
      s.connect(bp); bp.connect(g); g.connect(busSfx);
      s.start(at); s.stop(at + 0.05);
    }

    function chime(when, good) {
      if (!ctx) return;
      const at = Math.max(ctx.currentTime, when || ctx.currentTime);
      const notes = good ? [84, 91] : [79, 86];
      notes.forEach((m, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = hz(m);
        const t = at + i * 0.045;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.13, t + 0.006);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
        o.connect(g); g.connect(busSfx);
        o.start(t); o.stop(t + 0.18);
      });
    }

    function thud(when) {
      if (!ctx) return;
      const at = Math.max(ctx.currentTime, when || ctx.currentTime);
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(120, at);
      o.frequency.exponentialRampToValueAtTime(58, at + 0.13);
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(0.26, at + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 0.17);
      o.connect(g); g.connect(busSfx);
      o.start(at); o.stop(at + 0.2);
    }

    /** 她替你接住那一下：一个上行的两音，音色和她说话一致。 */
    function cover(when) {
      if (!ctx) return;
      const at = Math.max(ctx.currentTime, when || ctx.currentTime);
      [67, 72, 76].forEach((m, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "triangle";
        o.frequency.value = hz(m);
        const t = at + i * 0.055;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.10, t + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        o.connect(g); g.connect(busSfx);
        o.start(t); o.stop(t + 0.24);
      });
    }

    function click(when) {
      if (!ctx) return;
      const at = Math.max(ctx.currentTime, when || ctx.currentTime);
      const s = ctx.createBufferSource();
      s.buffer = noise();
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass"; hp.frequency.value = 3200;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(0.16, at + 0.002);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 0.05);
      s.connect(hp); hp.connect(g); g.connect(busSfx);
      s.start(at); s.stop(at + 0.06);
    }

    /** 节拍器：试音校准用，和 BGM 的拍点对齐。 */
    function metronome(when, accent) {
      if (!ctx) return;
      const at = Math.max(ctx.currentTime, when || ctx.currentTime);
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square";
      o.frequency.value = accent ? 1320 : 880;
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(accent ? 0.14 : 0.09, at + 0.002);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 0.05);
      o.connect(g); g.connect(busSfx);
      o.start(at); o.stop(at + 0.06);
    }

    function setMusic(on) {
      musicOn = !!on;
      if (busMusic) busMusic.gain.setTargetAtTime(on ? 0.115 : 0.02, ctx.currentTime, 0.2);
    }

    return {
      BPM, SPB, BAR,
      unlock, ensure,
      now, songTime, startSong, stopSong, seek,
      setOffsetMs, offsetMs,
      blip, say, tapPaper, chime, thud, cover, click, metronome,
      setMusic,
      get ready() { return ready; },
      get ctx() { return ctx; }
    };
  }

  global.ACT3 = global.ACT3 || {};
  global.ACT3.createAudio = createAudio;
  global.ACT3.BPM = BPM;
  global.ACT3.SPB = SPB;
})(window);
