(() => {
  "use strict";

  const W = 512, H = 288, L = window.BROADCAST_BRIDGE_LAYOUT;
  const boardStatus = new URLSearchParams(location.search).get("board") === "done" ? "done" : "deferred";
  const resumeReady = new URLSearchParams(location.search).get("resume") === "ready";
  const canvas = document.getElementById("scene"), ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  const cg = document.getElementById("cg"), shade = document.getElementById("shade");
  const dialog = document.getElementById("dialog"), whoEl = document.getElementById("who"), lineEl = document.getElementById("line");
  const controls = document.getElementById("controls"), hint = document.getElementById("hint");
  const walkButton = document.getElementById("walk"), actButton = document.getElementById("act"), ready = document.getElementById("ready");
  const sources = {
    board: "../../assets/scenes/school_corridor_board_lowered_512.png",
    corridor: "assets/broadcast_corridor.png",
    corridorOpen: "assets/broadcast_corridor_open.png",
    room: "assets/broadcast_room_single_desk.png",
    roomOpen: "assets/broadcast_room_single_desk_open.png",
    boy: "../../assets/characters/boy/v2/boy_sheet_v2.png",
    girl: "../../assets/characters/girl/v2/girl_sheet_v2.png"
  };
  const images = {}, boy = { ...L.boardBoy }, girl = { ...L.boardGirl };
  let scene = "loading", elapsed = 0, last = 0, action = null, lines = [], lineIndex = 0;
  let typeTimer = 0;
  let held = new Set(), autoWalk = false, artwork = null;

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`无法加载 ${src}`));
      image.src = src;
    });
  }
  function loadArtwork() {
    try {
      const full = localStorage.getItem("our-story-act2-board-preview-v1");
      const saved = JSON.parse(localStorage.getItem("our-story-act2-board-v2") || "null");
      return loadImage(full || saved?.png || "").catch(() => null);
    } catch { return Promise.resolve(null); }
  }
  function drawSprite(image, frame, x, feet, scale = 1) {
    if (!image) return;
    const w = 48 * scale, h = 72 * scale;
    ctx.drawImage(image, frame * 48, 0, 48, 72, Math.round(x - w / 2), Math.round(feet - h), Math.round(w), Math.round(h));
  }
  function textAtBoard() {
    ctx.drawImage(images.board, 0, 0, W, H);
    if (artwork) { const a = L.boardArt; ctx.drawImage(artwork, a.x, a.y, a.w, a.h); }
  }
  function drawSign() {
    ctx.save();
    ctx.fillStyle = "#5b3025"; ctx.textAlign = "center"; ctx.font = "bold 9px Microsoft YaHei";
    ctx.fillText("广播室", L.corridor.signX, L.corridor.signY);
    ctx.restore();
  }
  function roomImage() { return ["girlWalk", "girlHandoff", "girlSit", "girlWait", "ready"].includes(scene) ? images.roomOpen : images.room; }
  function roomBase() { ctx.drawImage(roomImage(), 0, 0, W, H); }
  function roomFigures(girlX = null, girlFrame = 4, boyFrame = 4) {
    roomBase();
    const seated = ["roomSit", "turn", "cg", "girlWalk", "girlHandoff", "girlWait", "girlSit", "ready"].includes(scene);
    const boyFeet = seated ? L.room.seatFootY : boy.y - (L.room.entryX - boy.x) / (L.room.entryX - L.room.seatX) * 22;
    drawSprite(images.boy, boyFrame, boy.x, boyFeet, 1.25);
    if (girlX !== null) {
      const girlFeet = L.room.girlFootY - (L.room.girlEntryX - girlX) / (L.room.girlEntryX - L.room.girlStationX) * (L.room.girlFootY - L.room.girlSeatFootY);
      drawSprite(images.girl, girlFrame, girlX, girlFeet, 1.2);
      // 朱里进门时带着稿纸；靠近桌位后把它放下。
      if (scene === "girlWalk" || scene === "girlHandoff" && elapsed < .55) {
        const paperX = Math.round(girlX - (scene === "girlHandoff" ? 27 : 14));
        ctx.fillStyle = "#f7ead7";
        ctx.fillRect(paperX, Math.round(girlFeet - 43), 11, 14);
        ctx.fillStyle = "#b99d80";
        ctx.fillRect(paperX + 1, Math.round(girlFeet - 40), 7, 1);
      }
    }
    // 唯一播音桌的前板挡住两人的下半身，桌面与麦克风留在前景。
    const d = L.foreground.sharedDesk;
    ctx.drawImage(roomImage(), d.x, d.y, d.w, d.h, d.x, d.y, d.w, d.h);
  }
  function showLines(items, done) {
    lines = items; lineIndex = 0; action = done; dialog.hidden = false; controls.hidden = true; displayLine();
  }
  function displayLine() {
    const line = lines[lineIndex];
    clearInterval(typeTimer);
    if (!line) { dialog.hidden = true; const done = action; action = null; done?.(); return; }
    whoEl.textContent = line[0]; lineEl.textContent = "";
    // The first act prints every line a character at a time (34 chars/s);
    // this page keeps the same reading rhythm instead of dropping the whole
    // sentence at once. E completes the line first, then moves on.
    let shown = 0;
    const text = line[1];
    typeTimer = setInterval(() => {
      shown += 1;
      lineEl.textContent = text.slice(0, shown);
      if (shown >= text.length) clearInterval(typeTimer);
    }, 29);
  }
  function advance() {
    if (dialog.hidden) return;
    const line = lines[lineIndex];
    if (line && lineEl.textContent.length < line[1].length) {
      clearInterval(typeTimer);
      lineEl.textContent = line[1];
      return;
    }
    lineIndex++; displayLine();
  }
  function enter(next) {
    scene = next; elapsed = 0; autoWalk = false; held.clear();
    controls.hidden = true; dialog.hidden = true; clearInterval(typeTimer); ready.hidden = true; cg.hidden = true;
    shade.style.opacity = "0";
    if (next === "board") showLines([["旁白", boardStatus === "done" ? "我们退后一步，看了看刚画好的黑板报。" : "画到这里，我们先把粉笔收好。黑板报还留着，之后可以接着画。"]], () => enter("split"));
    if (next === "corridor") {
      boy.x = L.corridor.boyStartX; boy.y = L.corridor.footY;
      showLines([["旁白", "最后一节课后，轮到我们做晚间广播。"], ["旁白", "我先过去了。"]], () => { controls.hidden = false; updateControls(); });
    }
    if (next === "roomWalk") {
      boy.x = L.room.entryX; boy.y = L.room.footY;
      showLines([["旁白", "屋里还没有人。我把稿纸放到桌上，朝自己的位置走去。"]], () => { controls.hidden = false; updateControls(); });
    }
    if (next === "cg") {
      cg.hidden = false;
      showLines([["朱里", "你先到了啊。"], ["和臣", "嗯，刚到。"]], () => enter("girlWalk"));
    }
    if (next === "girlWalk") { girl.x = L.room.girlEntryX; girl.y = L.room.girlFootY; }
    if (next === "girlHandoff") girl.x = L.room.girlStationX;
    if (next === "girlSit") girl.x = L.room.girlStationX;
    if (next === "ready") {
      boy.x = L.room.seatX; boy.y = L.room.seatFootY;
      girl.x = L.room.girlStationX; girl.y = L.room.girlSeatFootY;
      ready.hidden = false;
    }
  }
  function updateControls() {
    if (scene === "corridor") {
      const near = boy.x >= L.corridor.doorReachX;
      hint.textContent = near ? "到了广播室门前。" : "按住 D / → 走向广播室；也可以点“走过去”。";
      walkButton.hidden = near; actButton.hidden = !near;
      actButton.textContent = "推门进入 E";
    } else if (scene === "roomWalk") {
      const near = boy.x <= L.room.seatReachX;
      hint.textContent = near ? "和臣在麦克风前坐下。" : "按住 A / ← 走向左边的座位。";
      walkButton.hidden = near; actButton.hidden = !near;
      actButton.textContent = "坐下 E";
    }
  }
  function perform() {
    if (scene === "corridor" && boy.x >= L.corridor.doorReachX) enter("corridorOpen");
    else if (scene === "roomWalk" && boy.x <= L.room.seatReachX) { boy.x = L.room.seatX; boy.y = L.room.seatFootY; enter("roomSit"); }
  }
  function update(dt) {
    elapsed += dt;
    if (scene === "split" && elapsed >= 2.3) enter("timecut");
    if (scene === "timecut" && elapsed >= 1.6) enter("corridor");
    if (scene === "corridor" && dialog.hidden) {
      if ((held.has("ArrowRight") || held.has("KeyD") || autoWalk) && boy.x < L.corridor.doorX) { boy.x = Math.min(L.corridor.doorX, boy.x + dt * 86); updateControls(); }
    }
    if (scene === "corridorOpen" && elapsed >= 1.1) enter("roomWalk");
    if (scene === "roomWalk" && dialog.hidden) {
      if ((held.has("ArrowLeft") || held.has("KeyA") || autoWalk) && boy.x > L.room.seatX + 5) { boy.x = Math.max(L.room.seatX + 5, boy.x - dt * 84); updateControls(); }
    }
    if (scene === "roomSit" && elapsed >= 1.3) enter("turn");
    if (scene === "turn" && elapsed >= .75) enter("cg");
    if (scene === "girlWalk") {
      girl.x = Math.max(L.room.girlStationX, girl.x - dt * 76);
      if (girl.x <= L.room.girlStationX) {
        enter("girlHandoff");
      }
    }
    if (scene === "girlHandoff" && elapsed >= .75) enter("girlSit");
    if (scene === "girlSit" && elapsed >= .8) {
      showLines([["朱里", "稿子我带来了。那，我们开始吧？"]], () => enter("ready"));
        scene = "girlWait";
    }
  }
  function render() {
    ctx.clearRect(0, 0, W, H);
    if (scene === "board" || scene === "split" || scene === "timecut") {
      textAtBoard();
      if (scene === "board") {
        drawSprite(images.boy, 4, L.boardBoy.x, L.boardBoy.y, 1.18); drawSprite(images.girl, 4, L.boardGirl.x, L.boardGirl.y, 1.18);
      } else if (scene === "split") {
        const t = Math.min(1, elapsed / 2.3), step = 9 + (Math.floor(elapsed * 8) % 4);
        drawSprite(images.boy, step, L.boardBoy.x - 230 * t, L.boardBoy.y + 18 * t, 1.18);
        drawSprite(images.girl, 13 + (Math.floor(elapsed * 8) % 4), L.boardGirl.x + 84 * t, L.boardGirl.y + 18 * t, 1.18);
      }
      if (scene === "timecut") { ctx.fillStyle = `rgba(22,19,27,${Math.min(1, .5 + elapsed)})`; ctx.fillRect(0, 0, W, H); }
    } else if (scene === "corridor" || scene === "corridorOpen") {
      ctx.drawImage(scene === "corridorOpen" && elapsed > .2 ? images.corridorOpen : images.corridor, 0, 0, W, H);
      drawSign();
      const walking = scene === "corridor" && (held.has("ArrowRight") || held.has("KeyD") || autoWalk);
      drawSprite(images.boy, walking ? 13 + (Math.floor(elapsed * 9) % 4) : 3, scene === "corridorOpen" ? boy.x + elapsed * 18 : boy.x, boy.y, 1.1);
      if (scene === "corridorOpen") { ctx.fillStyle = `rgba(18,16,24,${Math.min(1, elapsed)})`; ctx.fillRect(0, 0, W, H); }
    } else if (scene === "roomWalk") {
      roomFigures(null, 4, (held.has("ArrowLeft") || held.has("KeyA") || autoWalk) ? 9 + (Math.floor(elapsed * 9) % 4) : 2);
    } else if (scene === "roomSit" || scene === "turn" || scene === "cg") {
      roomFigures(null, 2, scene === "roomSit" && elapsed < .4 ? 21 : scene === "turn" && elapsed > .28 ? 3 : 0);
    } else if (scene === "girlWalk" || scene === "girlHandoff" || scene === "girlSit" || scene === "girlWait" || scene === "ready") {
      roomFigures(girl.x, scene === "girlWalk" ? 9 + (Math.floor(elapsed * 9) % 4) : scene === "girlHandoff" ? 30 : scene === "girlSit" && elapsed < .4 ? 21 : 0, 0);
    }
  }
  function loop(now) {
    const dt = last ? Math.min(.05, (now - last) / 1000) : 0; last = now;
    if (scene !== "loading") { update(dt); render(); }
    requestAnimationFrame(loop);
  }
  function onKey(e) {
    if (["ArrowRight", "ArrowLeft", "KeyD", "KeyA", "KeyE", "Enter", "Space"].includes(e.code)) e.preventDefault();
    held.add(e.code);
    if (e.repeat) return;
    if (!dialog.hidden && ["KeyE", "Enter", "Space"].includes(e.code)) { advance(); return; }
    if (e.code === "KeyE") {
      if (scene === "corridor" && boy.x < L.corridor.doorReachX) { boy.x = Math.min(L.corridor.doorX, boy.x + 25); updateControls(); }
      else if (scene === "roomWalk" && boy.x > L.room.seatReachX) { boy.x = Math.max(L.room.seatX + 5, boy.x - 25); updateControls(); }
      else perform();
    }
  }
  document.addEventListener("keydown", onKey);
  document.addEventListener("keyup", (e) => held.delete(e.code));
  document.addEventListener("blur", () => held.clear());
  dialog.addEventListener("click", advance);
  walkButton.addEventListener("click", () => { autoWalk = true; });
  actButton.addEventListener("click", perform);
  document.getElementById("replay").addEventListener("click", () => enter("board"));
  const broadcastUrl = new URL("../../act3/broadcast.html", location.href);
  broadcastUrl.searchParams.set("from", "bridge");
  broadcastUrl.searchParams.set("back", `../act2/broadcast-bridge/index.html?board=${boardStatus}&resume=ready`);
  document.getElementById("start-broadcast").href = broadcastUrl.href;

  Promise.all(Object.entries(sources).map(async ([key, src]) => { images[key] = await loadImage(src); })).then(async () => {
    artwork = await loadArtwork();
    enter(resumeReady ? "ready" : "board");
  }).catch((error) => {
    ready.hidden = false;
    ready.querySelector("h1").textContent = "场景资源加载失败";
    ready.querySelector("p").textContent = error.message;
  });
  requestAnimationFrame(loop);
  window.__broadcastBridge = { get scene() { return scene; }, get boyX() { return boy.x; }, get girlX() { return girl.x; }, enter };
})();
