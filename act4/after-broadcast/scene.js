(() => {
  "use strict";
  const W = 512, H = 288;
  const canvas = document.getElementById("scene"), ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  const cg = document.getElementById("cg"), memoryMontage = document.getElementById("memoryMontage"), fade = document.getElementById("fade");
  const memoryShards = [...memoryMontage.querySelectorAll(".memory-shard")], memoryPortrait = document.getElementById("memoryPortrait");
  const blushCut = document.getElementById("blushCut"), blushBoy = document.getElementById("blushBoy"), blushGirl = document.getElementById("blushGirl");
  const dialog = document.getElementById("dialog"), who = document.getElementById("who"), line = document.getElementById("line");
  const caption = document.getElementById("caption"), captionWho = document.getElementById("captionWho"), captionLine = document.getElementById("captionLine");
  const controls = document.getElementById("controls"), narration = document.getElementById("narration"), hint = document.getElementById("hint");
  const autoButton = document.getElementById("auto"), inspectButton = document.getElementById("inspect"), ending = document.getElementById("ending");
  const SRC = {
    door: "../../act2/broadcast-bridge/assets/broadcast_corridor.png",
    doorOpen: "../../act2/broadcast-bridge/assets/broadcast_corridor_open.png",
    railing: "assets/railing.png",
    railingNotice: "assets/railing_notice.png",
    stair: "assets/stairwell.png",
    snack: "assets/cg_snack_handoff_v2.png",
    final: "../../assets/scenes/cg_corridor_lean_back.png",
    doorwayMemory: "../../assets/scenes/cg_doorway_wave_v2.png",
    boardMemory: "../../assets/scenes/school_corridor_board_lowered_512.png",
    broadcastMemory: "../../act2/broadcast-bridge/assets/cg_turn_to_zhuli_single_desk.png",
    boy: "../../assets/characters/boy/v2/boy_sheet_v2.png",
    girl: "../../assets/characters/girl/v2/girl_sheet_v2.png"
  };
  const MEMORIES = [
    { text: "靠在护栏上，风吹过来，我的脑子里却忽然闪过好多小事。" },
    { src: SRC.doorwayMemory, text: "教室门口，朱里朝我挥手。那时我还没想到，自己会越来越期待听见她叫我的名字。" },
    { src: SRC.boardMemory, text: "画黑板报的时候，她把粉笔递给我，自己留下来补那些细细的边。" },
    { src: SRC.broadcastMemory, text: "广播室里，红灯亮起。她坐在旁边，等我把那句话说完。" },
    { src: SRC.snack, text: "还有刚才那张被风吹走的稿纸，和她留给我的最后一块饼干。" },
    { text: "这些事都很小。可不知从什么时候起，每次想起那段日子，我总会先想起她。" },
    { text: "后来我才明白，我是在这样一点一点地，喜欢上了朱里。" }
  ];
  const image = {};
  const boy = { x: 380, y: 232 }, girl = { x: 415, y: 232 };
  const held = new Set();
  let scene = "loading", elapsed = 0, last = 0, autoWalk = false;
  let dialogLines = [], dialogIndex = 0, afterDialog = null;
  let dialogTimer = 0, captionTimer = 0;
  let captionQueue = [], captionTime = 0, captionIndex = 0;
  let smallTalk = false, afterTalk = false, snackDistance = 0, finalLines = false, windowSeen = false, railTalkSeen = false;
  let paperX = 142, paperCaught = false;
  const WALK_SPEED = 25;
  let sound = null, stepClock = 0, ballClock = 0;

  function load(src) {
    return new Promise((resolve, reject) => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = () => reject(new Error(`无法加载 ${src}`));
      im.src = src;
    });
  }
  function unlockSound() {
    if (sound) return;
    try { sound = new (window.AudioContext || window.webkitAudioContext)(); sound.resume(); } catch { sound = null; }
  }
  function tone(freq, duration, volume = .012) {
    if (!sound || sound.state !== "running") return;
    const osc = sound.createOscillator(), gain = sound.createGain();
    const now = sound.currentTime;
    osc.type = "sine"; osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
    osc.connect(gain).connect(sound.destination);
    osc.start(now); osc.stop(now + duration);
  }
  function say(items, done) {
    dialogLines = items; dialogIndex = 0; afterDialog = done;
    controls.hidden = true; dialog.hidden = false; showLine();
  }
  function showLine() {
    const item = dialogLines[dialogIndex];
    clearInterval(dialogTimer);
    if (!item) {
      dialog.hidden = true;
      const done = afterDialog; afterDialog = null; done?.();
      return;
    }
    if (scene === "memory") showMemoryMontage(dialogIndex);
    if (scene === "blush") {
      blushBoy.classList.toggle("is-speaking", item[0] === "和臣");
      blushGirl.classList.toggle("is-speaking", item[0] === "朱里");
    }
    who.textContent = item[0]; line.textContent = "";
    // Same rhythm as the first act: one character at a time, E first completes
    // the sentence and only then moves to the next one.
    let shown = 0;
    const text = item[1];
    dialogTimer = setInterval(() => {
      shown += 1;
      line.textContent = text.slice(0, shown);
      if (shown >= text.length) clearInterval(dialogTimer);
    }, 29);
  }
  function showMemoryMontage(index) {
    memoryMontage.hidden = false;
    memoryShards.forEach((shard, i) => shard.classList.toggle("is-shown", index > i));
    memoryPortrait.classList.toggle("is-shown", index >= 5);
  }
  function advance() {
    if (dialog.hidden) return;
    const item = dialogLines[dialogIndex];
    if (item && line.textContent.length < item[1].length) {
      clearInterval(dialogTimer);
      line.textContent = item[1];
      return;
    }
    dialogIndex++; showLine();
  }
  function captions(items) {
    captionQueue = items; captionIndex = 0; captionTime = 0;
    showCaption();
  }
  function showCaption() {
    const item = captionQueue[captionIndex];
    clearInterval(captionTimer);
    caption.hidden = !item;
    if (item) {
      captionWho.textContent = item[0]; captionLine.textContent = "";
      let shown = 0;
      const text = item[1];
      captionTimer = setInterval(() => {
        shown += 1;
        captionLine.textContent = text.slice(0, shown);
        if (shown >= text.length) clearInterval(captionTimer);
      }, 38);
    }
  }
  function advanceCaption() {
    if (caption.hidden) return;
    const item = captionQueue[captionIndex];
    if (item && captionLine.textContent.length < item[1].length) {
      clearInterval(captionTimer);
      captionLine.textContent = item[1];
      return;
    }
    captionIndex++; captionTime = 0; showCaption();
    if (captionIndex >= captionQueue.length) captionQueue = [];
  }
  function enter(next) {
    scene = next; elapsed = 0;
    clearInterval(dialogTimer); clearInterval(captionTimer);
    dialog.classList.remove("subtitle-style");
    memoryMontage.hidden = true;
    blushCut.hidden = true;
    memoryShards.forEach((shard) => shard.classList.remove("is-shown"));
    memoryPortrait.classList.remove("is-shown");
    dialog.hidden = true; ending.hidden = true; caption.hidden = true; captionQueue = [];
    controls.hidden = !["doorWalk", "railingWalk", "railPause", "paperWalk", "paperChase", "lullWalk", "snack", "afterSnack", "stairWalk", "stairPause"].includes(next);
    inspectButton.hidden = true;
    cg.hidden = true;
    if (next === "exit") { boy.x = 380; girl.x = 415; autoWalk = false; paperCaught = false; }
    if (next === "firstWords") {
      boy.x = 320; girl.x = 355;
      say([["和臣", "刚才开头，我是不是念得太快了？"], ["朱里", "有一点。后面你等我停下，就正好了。"], ["和臣", "我还以为没接上。"], ["朱里", "接上了呀。"], ["和臣", "……嗯。"], ["朱里", "外面安静了。走一会儿？"]], () => enter("doorWalk"));
    }
    if (["railingWalk", "paperWalk", "lullWalk", "afterSnack", "stairWalk"].includes(next)) {
      boy.x = 395; girl.x = 430;
    }
    if (next === "railPause") {
      autoWalk = false;
      girl.x = boy.x + 30;
    }
    if (next === "railTalk") {
      say([["朱里", "等一下。你看，操场上还有人在踢球。"], ["和臣", "都这个点了，还不回去？"], ["朱里", "我们不也绕了远路吗。"], ["和臣", "……是你带的路。"], ["朱里", "可你一直跟着呀。"], ["和臣", "好吧，再走一段。"]], () => { railTalkSeen = true; enter("railingWalkResume"); });
    }
    if (next === "railingWalkResume") { scene = "railingWalk"; controls.hidden = false; }
    if (next === "paperWalk") { paperX = 142; paperCaught = false; }
    if (next === "paperAlert") {
      boy.x = 262; girl.x = 297;
      say([["朱里", "哎，稿纸飞走一张。"], ["和臣", "在前面，我去拿。"]], () => enter("paperChase"));
    }
    if (next === "paperFound") {
      paperCaught = true; autoWalk = false;
      say([["和臣", "拿到了。边角有点折。"], ["朱里", "给我，我把它压平。"], ["和臣", "风还在吹，你按着这边。"], ["朱里", "这样呢？"], ["和臣", "好了。夹进你的本子里吧。"], ["朱里", "嗯。这回不会再跑了。"]], () => enter("lullWalk"));
    }
    if (next === "paperPick") { autoWalk = false; }
    if (next === "snackTurn") { autoWalk = false; }
    if (next === "snack") {
      snackDistance = 0; autoWalk = false; cg.src = SRC.snack; cg.alt = "朱里在白色护栏旁递给和臣一块饼干"; cg.hidden = false;
      say([["朱里", "你刚才在广播室，肚子叫了一声。"], ["和臣", "……你连这个都听见了？"], ["朱里", "离得那么近，当然听见了。给，刚好还有一块。"], ["和臣", "那我不客气了。"], ["朱里", "嗯，留着走到楼梯口再吃也行。"]], () => { controls.hidden = false; updateHint(); });
    }
    if (next === "stairWords") {
      boy.x = 225; girl.x = 260;
      say([["朱里", "下去就是校门了。"], ["和臣", "嗯。"], ["朱里", "饼干怎么样？"], ["和臣", "已经吃完了。你留的那块很甜。"], ["朱里", "那下次我多带一点。"], ["和臣", "……下次我们还走这边吗？"], ["朱里", "你想走的话，就走。"], ["和臣", "好。"]], () => enter("final"));
    }
    if (next === "final") {
      cg.src = SRC.final; cg.alt = "和臣与朱里并肩靠在学校走廊的白色护栏前"; cg.hidden = false;
      finalLines = false;
    }
    if (next === "memory") {
      cg.src = SRC.final; cg.alt = "和臣与朱里并肩靠在学校走廊的白色护栏前"; cg.hidden = false;
      dialog.classList.add("subtitle-style");
      say(MEMORIES.map((beat) => ["和臣·心声", beat.text]), () => enter("blush"));
    }
    if (next === "blush") {
      cg.src = SRC.final; cg.hidden = false; blushCut.hidden = false;
      dialog.classList.add("subtitle-style");
      say([["朱里", "和臣？怎么了？"], ["和臣", "没、没什么。"], ["朱里", "可是你脸都红了。"], ["和臣", "我、我先下去了。明天见！"]], () => enter("hurryAway"));
    }
    if (next === "hurryAway") { boy.x = 305; girl.x = 365; autoWalk = false; }
    if (next === "girlAlone") {
      boy.x = -40; girl.x = 365;
      dialog.classList.add("subtitle-style");
      say([["朱里", "……明天见，和臣。"]], () => enter("ending"));
    }
    if (next === "ending") { boy.x = -40; girl.x = 365; ending.hidden = false; }
    updateHint();
  }
  function updateHint() {
    hint.textContent = scene === "doorWalk" ? "门在身后轻轻合上。走廊里只剩下我们的脚步声。"
      : scene === "railingWalk" ? "护栏外的操场还亮着。我们顺着走廊往前。"
      : scene === "railPause" ? "朱里忽然停在护栏边，像是发现了什么。"
      : scene === "paperWalk" ? "风从护栏外吹进来，朱里手里的稿纸轻轻一晃。"
      : scene === "paperChase" ? "那张稿纸被风推到了前面，落在地砖上。"
      : scene === "lullWalk" ? "我们没急着说话，只听见鞋底擦过地砖的声音。"
      : scene === "snack" ? "朱里把最后一块饼干递过来，等着我接。"
      : scene === "afterSnack" ? "饼干的甜味还留在嘴里，楼梯口已经不远了。"
      : scene === "stairWalk" ? "楼梯口的光斜斜落下来，我们放慢了脚步。"
      : scene === "stairPause" ? "朱里背对着我，在护栏旁停了下来。"
      : "";
    autoButton.textContent = autoWalk ? "停一会儿" : scene === "snack" ? "接过饼干，往前走" : "继续往前走";
    autoButton.hidden = ["stairPause", "railPause"].includes(scene);
    const atWindow = scene === "doorWalk" && boy.x < 145 && boy.x > 79 && !windowSeen;
    const atPaper = scene === "paperChase" && boy.x <= 175;
    const atRail = scene === "stairPause";
    const atTalk = scene === "railPause";
    inspectButton.hidden = !(atWindow || atPaper || atRail || atTalk);
    inspectButton.textContent = atTalk ? "听朱里说" : atPaper ? "捡起稿纸" : atRail ? "走到她身边" : "看看教室";
  }
  function moving() { return held.has("ArrowLeft") || held.has("KeyA") || autoWalk; }
  function walk(dt) {
    if (!moving() || !dialog.hidden || captionQueue.length) return;
    boy.x -= WALK_SPEED * dt;
    if (scene === "paperChase") boy.x = Math.max(132, boy.x);
    girl.x += (boy.x + 35 - girl.x) * Math.min(1, dt * 7);
    stepClock += dt;
    if (stepClock > .43) { tone(115, .055, .004); stepClock = 0; }
  }
  function update(dt) {
    elapsed += dt;
    fade.style.opacity = ["railingWalk", "paperWalk", "lullWalk", "afterSnack", "stairWalk", "hurryAway"].includes(scene) ? String(Math.max(0, 1 - elapsed / .55) * .65) : "0";
    if (captionQueue.length) {
      captionTime += dt;
      if (captionTime > 4.1) advanceCaption();
    }
    if (scene === "exit" && elapsed >= 2.2) enter("firstWords");
    if (["doorWalk", "railingWalk", "paperWalk", "paperChase", "lullWalk", "afterSnack", "stairWalk"].includes(scene)) {
      walk(dt); updateHint();
    }
    if (scene === "doorWalk" && boy.x <= 72) enter("railingWalk");
    if (scene === "railingWalk") {
      if (!smallTalk && boy.x <= 300) { smallTalk = true; captions([["朱里", "明天数学作业好像还有两页。"], ["和臣", "我一页都还没看。"], ["朱里", "我也是。"], ["和臣", "刚才还想着广播，差点忘了。"]]); }
      if (!railTalkSeen && boy.x <= 185) { enter("railPause"); return; }
      if (boy.x <= 75) enter("paperWalk");
    }
    if (scene === "paperWalk" && boy.x <= 262) enter("paperAlert");
    if (scene === "paperPick" && elapsed >= .8) enter("paperFound");
    if (scene === "lullWalk") {
      ballClock += dt;
      if (ballClock > 3.1) { tone(96, .12, .003); ballClock = 0; }
      if (boy.x <= 225 && elapsed >= 5) enter("snackTurn");
    }
    if (scene === "snackTurn") {
      if (elapsed < .7) boy.x -= 42 * dt;
      if (elapsed >= 1.35) enter("snack");
    }
    if (scene === "snack" && dialog.hidden && moving()) {
      snackDistance += WALK_SPEED * dt;
      if (snackDistance > 75) { enter("afterSnack"); captions([["和臣", "……谢了。"], ["朱里", "嗯。"]]); }
    }
    if (scene === "afterSnack") {
      if (!afterTalk && boy.x <= 210 && captionQueue.length === 0) { afterTalk = true; captions([["和臣", "这个挺好吃的。"], ["朱里", "我也喜欢这个。"], ["和臣", "下次我也带点。"]]); }
      if (boy.x <= 75) enter("stairWalk");
    }
    if (scene === "stairWalk" && boy.x <= 225) { autoWalk = false; enter("stairPause"); }
    if (scene === "final" && elapsed >= 2.2 && !finalLines) {
      finalLines = true;
      enter("memory");
    }
    if (scene === "hurryAway") {
      boy.x -= 112 * dt;
      if (boy.x <= 30) enter("girlAlone");
    }
  }
  function sprite(im, frame, x, feet, scale = 1.45) {
    const w = 48 * scale, h = 72 * scale;
    ctx.drawImage(im, frame * 48, 0, 48, 72, Math.round(x - w / 2), Math.round(feet - h), Math.round(w), Math.round(h));
  }
  function render() {
    ctx.clearRect(0, 0, W, H);
    const atDoor = ["exit", "firstWords", "doorWalk"].includes(scene);
    const atStair = ["stairWalk", "stairPause", "stairWords", "hurryAway", "girlAlone", "ending"].includes(scene);
    const atNotice = ["paperWalk", "paperAlert", "paperChase", "paperPick", "paperFound", "afterSnack"].includes(scene);
    const bg = atDoor ? (scene === "exit" && elapsed < 1.25 ? image.doorOpen : image.door)
      : atStair ? image.stair : atNotice ? image.railingNotice : image.railing;
    ctx.drawImage(bg, 0, 0, W, H);
    if (["snack", "final", "memory", "blush"].includes(scene)) return;
    const walking = scene === "hurryAway" || moving() && dialog.hidden && !captionQueue.length && ["doorWalk", "railingWalk", "paperWalk", "paperChase", "lullWalk", "afterSnack", "stairWalk"].includes(scene);
    let bx = boy.x, gx = girl.x;
    if (scene === "exit") { const k = Math.min(1, elapsed / 1.3); bx = 380 - 60 * k; gx = 415 - 60 * k; }
    const step = Math.floor(elapsed * (scene === "hurryAway" ? 12 : 7)) % 4;
    const speaker = !dialog.hidden ? dialogLines[dialogIndex]?.[0] : null;
    const boyFrame = scene === "snackTurn" ? (elapsed < .35 ? 9 + step : elapsed < .7 ? 0 : 3)
      : scene === "hurryAway" ? 9 + step
      : scene === "paperPick" ? 25
      : scene === "stairWords" ? 4
        : speaker === "和臣" ? 24
          : walking || scene === "exit" && elapsed < 1.3 ? 9 + step : 2;
    const girlFrame = scene === "snackTurn" ? 2
      : ["hurryAway", "girlAlone", "ending"].includes(scene) ? 2
      : ["stairPause", "stairWords", "railPause", "railTalk"].includes(scene) ? 4
      : speaker === "朱里" ? 26
        : walking || scene === "exit" && elapsed < 1.3 ? 9 + step : 2;
    if (!["girlAlone", "ending"].includes(scene)) sprite(image.boy, boyFrame, bx, 232);
    sprite(image.girl, girlFrame, gx, 232);
    if (!paperCaught && (["paperWalk", "paperAlert", "paperChase"].includes(scene) || scene === "paperPick" && elapsed < .38)) {
      const falling = scene === "paperWalk";
      const t = falling ? Math.min(1, elapsed / 4.7) : 1;
      const px = falling ? 405 + (paperX - 405) * t + Math.sin(elapsed * 9) * (1 - t) * 5 : paperX;
      const py = falling ? 167 + 46 * t + Math.sin(elapsed * 11) * (1 - t) * 8 : 213 + Math.sin(elapsed * 5) * 2;
      const tilt = falling ? Math.sin(elapsed * 7) * (1 - t) * .32 : 0;
      ctx.save(); ctx.translate(Math.round(px), Math.round(py)); ctx.rotate(tilt);
      ctx.fillStyle = "#665048"; ctx.fillRect(-1, 1, 17, 12);
      ctx.fillStyle = "#f8ead4"; ctx.fillRect(0, 0, 15, 10);
      ctx.fillStyle = "#c3a38e";
      ctx.fillRect(2, 3, 10, 1);
      ctx.fillRect(2, 6, 7, 1);
      ctx.restore();
    }
  }
  function loop(now) {
    const dt = last ? Math.min(.05, (now - last) / 1000) : 0; last = now;
    if (scene !== "loading") { update(dt); render(); }
    narration.hidden = controls.hidden || !dialog.hidden || !caption.hidden;
    requestAnimationFrame(loop);
  }
  document.addEventListener("keydown", (e) => {
    if (["ArrowLeft", "KeyA", "KeyE", "Enter", "Space"].includes(e.code)) e.preventDefault();
    unlockSound(); held.add(e.code);
    if (e.repeat) return;
    if (!dialog.hidden && ["KeyE", "Enter", "Space"].includes(e.code)) { advance(); return; }
    if (!caption.hidden && ["KeyE", "Enter", "Space"].includes(e.code)) { advanceCaption(); return; }
    if (e.code === "KeyE" && !inspectButton.hidden) inspectButton.click();
  });
  document.addEventListener("keyup", (e) => held.delete(e.code));
  document.addEventListener("blur", () => held.clear());
  dialog.addEventListener("click", advance);
  caption.addEventListener("click", advanceCaption);
  autoButton.addEventListener("click", () => { unlockSound(); autoWalk = !autoWalk; updateHint(); });
  inspectButton.addEventListener("click", () => {
    if (scene === "railPause") { enter("railTalk"); return; }
    if (scene === "paperChase") { enter("paperPick"); return; }
    if (scene === "stairPause") { enter("stairWords"); return; }
    if (scene !== "doorWalk") return;
    windowSeen = true; autoWalk = false;
    say([["和臣", "教室里只剩桌椅了，和平时看着不太一样。"], ["朱里", "窗户也没关严。"], ["和臣", "难怪一路都有风。"]], () => { controls.hidden = false; updateHint(); });
  });
  document.getElementById("replay").addEventListener("click", () => { smallTalk = false; afterTalk = false; windowSeen = false; railTalkSeen = false; captionQueue = []; enter("exit"); });
  Promise.all(Object.entries(SRC).map(async ([key, src]) => { image[key] = await load(src); }))
    .then(() => enter("exit"))
    .catch((err) => { ending.hidden = false; ending.querySelector("h1").textContent = "场景资源加载失败"; ending.querySelector("p").textContent = err.message; });
  requestAnimationFrame(loop);
  window.__afterBroadcast = { get scene() { return scene; }, get dialogIndex() { return dialogIndex; }, get boyX() { return boy.x; }, get girlX() { return girl.x; }, enter };
})();
