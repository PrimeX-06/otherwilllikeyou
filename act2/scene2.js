/* 第二幕 · 黑板报 — 场景与镜头
 *
 * 流程：次日走廊（对白）→ 镜头推近宣传栏旁的黑板 → 画 → 拉回，两个人看成果。
 */
(function (global) {
  "use strict";

  const W = 512, H = 288;
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  const el = (id) => document.getElementById(id);
  const bar = el("bar");
  const progEl = el("prog");
  const dlgEl = el("dlg");
  const dlgWho = el("dlgWho");
  const dlgLine = el("dlgLine");
  const hintEl = el("hint");
  const cardEl = el("card");
  const textIn = el("textin");
  const leaveEl = el("leave");
  const byeEl = el("bye");
  const byeLineEl = el("byeLine");

  // 退出之后去哪儿。宿主接进来时用 ?back=... 指定；单开就回学校故事。
  const BACK = (() => {
    try {
      return new URLSearchParams(location.search).get("back") || "../school-preview.html";
    } catch (e) {
      return "../school-preview.html";
    }
  })();

  const IMG = {
    corridor: "../assets/scenes/school_corridor_board_lowered_512.png",
    boy: "../assets/characters/boy/v2/boy_sheet_v2.png",
    girl: "../assets/characters/girl/v2/girl_sheet_v2.png",
    friend: "../assets/characters/friend/v2/friend_sheet_v2.png"
  };
  const img = {};

  const board = global.ACT2.Board.createBoard(canvas);
  const pick = global.ACT2.Lines.pick;
  const nextExchange = global.ACT2.Lines.exchange;

  // ---------------------------------------------------------------- 对白

  let dlg = null;
  function say(who, text, onDone) {
    dlg = { who, text, shown: 0, t: 0, onDone };
    dlgWho.textContent = who;
    dlgLine.textContent = "";
    dlgEl.classList.add("show");
  }
  function advance() {
    if (!dlg) return false;
    if (dlg.shown < dlg.text.length) {
      dlg.shown = dlg.text.length;
      dlgLine.textContent = dlg.text;
      return true;
    }
    const fn = dlg.onDone;
    dlg = null;
    dlgEl.classList.remove("show");
    if (fn) fn();
    return true;
  }
  function lines(items, done) {
    let i = 0;
    const next = () => {
      if (i >= items.length) { done && done(); return; }
      const [who, text] = items[i++];
      say(who, text, next);
    };
    next();
  }

  // 她画画时说话：走画布下面那条字幕，不挡笔。
  //
  // 画板期间只有这一条文字通道——她补完一笔、玩家擦掉一笔、她自己闲聊，
  // 全从这儿过，所以画面上永远有话说，不会一会儿冒一句一会儿没动静。
  const subsEl = el("subs");
  const subsWho = el("subsWho");
  const subsLine = el("subsLine");

  const chat = {
    on: false,
    manual: false,  // 手动推进（结尾那几句）；false 就是自己往下滚
    hold: 0,        // 这一句还显示多久
    gap: 0,         // 两句之间空多久
    queue: [],      // 待播的 [谁, 说什么]
    after: null     // manual 模式放完之后接什么
  };

  function subsShow(who, text, hold) {
    if (!text) return;
    subsWho.textContent = who;
    subsLine.textContent = text;
    subsEl.dataset.who = who;
    subsEl.classList.add("show");
    subsEl.classList.remove("quiet");
    chat.hold = hold == null ? 3.4 : hold;
  }
  function subsHide() {
    subsEl.classList.remove("show", "quiet");
    chat.hold = 0;
  }
  function herSay(text) {
    if (!text) return;
    // 已经退场 / 已经收尾，别再冒话：她的一句会盖掉退场那句，也会盖掉结尾对白
    if (sc.state === "leave" || sc.state === "done") return;
    subsShow("朱里", text, 3.6);
  }

  /** 一句念多久：按字数给，短句不拖，长句够看完。 */
  function holdFor(text) {
    return 2.4 + Math.min(2.4, text.length * 0.115);
  }

  /**
   * 字幕轮播。放完一段对话（2–3 句来回）自动接下一段，
   * 队列空了就再抽一段——「一直要有交谈」，不靠玩家点。
   */
  function chatStep(dt) {
    if (!chat.on || chat.manual) return;
    if (chat.hold > 0) {
      chat.hold -= dt;
      // 说完了不整条藏起来——底下站着两个人，藏起来就像信号断了。
      // 只把对话框压暗，0.32 秒后换下一句。
      if (chat.hold <= 0) { subsEl.classList.add("quiet"); chat.gap = 0.32; }
      return;
    }
    if (chat.gap > 0) {
      chat.gap -= dt;
      if (chat.gap > 0) return;
    }
    if (!chat.queue.length) chat.queue = nextExchange();
    const next = chat.queue.shift();
    if (!next) return;
    subsShow(next[0], next[1], holdFor(next[1]));
  }

  function chatStart(first) {
    chat.on = true;
    chat.queue = first ? [first] : [];
    chat.hold = 0;
    chat.gap = 0.5;
  }
  function chatStop() {
    chat.on = false;
    chat.manual = false;
    chat.after = null;
    chat.queue = [];
    subsHide();
  }

  /**
   * 手动推进的一段对白，走同一条对白区（不弹 #dlg）。
   *
   * 用在结尾：板子刚画完，玩家正想看看自己画了什么，这时候在中间压一个
   * 对话框等于把作品盖住。两个人站在画布下面说话，板子一直是完整的。
   */
  function talkLines(items, done) {
    chat.on = true;
    chat.manual = true;
    chat.queue = items.map((q) => [q[0], q[1]]);
    chat.after = done || null;
    chat.hold = 0;
    chat.gap = 0;
    talkNext();
  }

  function talkNext() {
    const next = chat.queue.shift();
    if (!next) {
      const fn = chat.after;
      chat.manual = false;
      chat.after = null;
      chat.on = false;
      subsHide();
      if (fn) fn();
      return;
    }
    subsShow(next[0], next[1], 0);
  }

  /** 手动模式下推进一句。返回 false 表示当前不是在等玩家按键。 */
  function advanceTalk() {
    if (!chat.manual) return false;
    talkNext();
    return true;
  }

  // ---------------------------------------------------------------- 场景状态

  const sc = {
    state: "class",     // class | approach | push | board | leave | done
    t: 0,
    zoom: 1,
    approach: 0,
    boardAlpha: 0,
    drawing: false,
    finished: false,
    walked: 0,          // 完成镜头里两个人走进来的进度
    leaveT: 0,          // 退出之后过了多久（用来等她说完那句再弹卡）
    byeShown: false,
    veil: 0             // 退场时压暗的遮罩，0..1
  };
  const friendCameo = { phase: "off", x: -35, t: 0, after: null };
  function startFriendCameo(after) {
    friendCameo.phase = "enter";
    friendCameo.x = -35;
    friendCameo.t = 0;
    friendCameo.after = after;
  }

  const girl = global.ACT2.Girl.create(board, {
    say: herSay,
    onAssist(kind) {
      emit("board:assist", { kind });
    },
    onChalk(idx) {
      // 递粉笔：调色板里那支亮一下，玩家自己决定用不用
      const sw = document.querySelectorAll("#palette button")[idx];
      if (sw) {
        sw.classList.add("offered");
        setTimeout(() => sw.classList.remove("offered"), 4000);
      }
      emit("board:assist", { kind: "chalk" });
    }
  });

  /** 给宿主（第二幕）听的事件。同页通信，不走 postMessage。 */
  function emit(name, detail) {
    global.dispatchEvent(new CustomEvent(name, { detail }));
  }

  // ---------------------------------------------------------------- 人物

  const FW = 48, FH = 72;
  // 降低后的走廊黑板约在 (294,81)–(474,170)。
  const BOARD_AT = { x: 384, y: 126 };

  const CH = {
    boy: { x: 215, y: 242, endX: 348, endY: 215, sheet: null, frames: 31 },
    girl: { x: 269, y: 242, endX: 420, endY: 215, sheet: null, frames: 33 }
  };

  function drawChar(who, t, alpha) {
    const c = CH[who];
    if (!c.sheet) return;
    const going = sc.state === "approach" || sc.state === "push";
    const k = going ? ease(sc.approach) : 0;
    const x = c.x + (c.endX - c.x) * k;
    const y = c.y + (c.endY - c.y) * k;
    const size = 1 + 0.18 * k;
    let f = !going ? Math.floor(t * 1.4) % 2
      : sc.state === "approach" && sc.t > 0.28 && sc.approach < 1
        ? 17 + Math.floor(sc.t * 8) % 4 : 4; // 背对镜头，朝黑板走
    if (sc.state === "class" && dlg?.who === (who === "girl" ? "朱里" : "和臣")) f = who === "girl" ? 26 : 24;
    ctx.save();
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    ctx.fillStyle = "rgba(0,0,0,.18)";
    ctx.beginPath();
    ctx.ellipse(x, y - 1, 13 * size, 4 * size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.drawImage(c.sheet, f * FW, 0, FW, FH, x - FW * size / 2, y - FH * size, FW * size, FH * size);
    ctx.restore();
  }

  // ---------------------------------------------------------------- 走廊

  function drawBackdrop(zoom, cx, cy, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    ctx.translate(W / 2, H / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(-cx, -cy);
    if (img.corridor) ctx.drawImage(img.corridor, 0, 0);
    drawChar("boy", sc.t);
    drawChar("girl", sc.t + 0.6);
    if (sc.state === "class" && friendCameo.phase !== "off" && img.friend) {
      const p = friendCameo.phase;
      const frame = p === "enter" ? 12 + Math.floor(sc.t * 8) % 4
        : p === "leave" ? 16 + Math.floor(sc.t * 8) % 4
          : dlg?.who === "由乃" ? 28 : 0;
      ctx.drawImage(img.friend, frame * FW, 0, FW, FH,
        Math.round(friendCameo.x - FW / 2), 242 - FH, FW, FH);
    }
    ctx.restore();
  }

  // ---------------------------------------------------------------- 循环

  let last = 0;
  let now = 0;

  function update(dt) {
    sc.t += dt;
    if (sc.state === "class" && friendCameo.phase === "enter") {
      friendCameo.t += dt;
      friendCameo.x = -35 + 155 * ease(friendCameo.t / 0.95);
      if (friendCameo.t >= 0.95) {
        friendCameo.phase = "talk";
        lines([
          ["旁白", "还没走到黑板前，走廊那头就有人叫了朱里一声。"],
          ["由乃", "朱里，原来你在这儿。"],
          ["朱里", "嗯，刚准备画。"],
          ["由乃", "难怪没在教室看见你。我先回去啦。"],
          ["朱里", "好，回头见。"],
          ["旁白", "她朝朱里挥挥手，经过我时也笑了一下。她们很熟，我那时还不太了解她。"]
        ], () => { friendCameo.phase = "leave"; friendCameo.t = 0; });
      }
    } else if (sc.state === "class" && friendCameo.phase === "leave") {
      friendCameo.t += dt;
      friendCameo.x = 120 - 155 * ease(friendCameo.t / 0.8);
      if (friendCameo.t >= 0.8) {
        friendCameo.phase = "off";
        const after = friendCameo.after;
        friendCameo.after = null;
        after?.();
      }
    }
    if (dlg) {
      dlg.t += dt;
      const target = Math.min(dlg.text.length, Math.floor(dlg.t * 30));
      if (target > dlg.shown) {
        dlg.shown = target;
        dlgLine.textContent = dlg.text.slice(0, dlg.shown);
      }
    }

    if (sc.state === "approach") {
      // 先回身，再沿走廊走到黑板前；走到位以后才推镜头。
      sc.approach = clamp((sc.t - 0.28) / 1.65, 0, 1);
      if (sc.t >= 1.93) { sc.state = "push"; sc.t = 0; }
    }

    if (sc.state === "push") {
      // 180 宽的黑板铺满 512 需要 2.84 倍，正好也把 92 高放到 262——几乎贴合，
      // 交叉淡入提前到 0.35s：那张背景是从生图稿缩下来的，放大太多会糊。
      sc.zoom = 1 + ease(sc.t / 1.2) * 1.84;
      sc.boardAlpha = clamp((sc.t - 0.35) / 0.6, 0, 1);
      if (sc.t >= 1.2) {
        sc.state = "board";
        sc.zoom = 2.84;
        sc.boardAlpha = 1;
        el("stage").classList.remove("cinematic");
        bar.classList.add("show");
        progEl.classList.add("show");
        leaveEl.classList.add("show");
        hint("照着淡线画，画完一块它自己就淡掉");
        emit("board:start", {});
        // 第一句当字幕起手，之后由字幕轮播接着往下说
        chatStart(["朱里", pick("open")]);
        // 上次没画完的接着画（?fresh=1 可以跳过，截图和测试用）
        if (!/(\?|&)fresh=1/.test(location.search)) {
          board.restoreSave().then((ok) => {
            if (!ok) return;
            syncUI();
            hint("接着上次画");
          });
        }
      }
    }

    if (sc.state === "board") {
      girl.update(dt, { drawing: sc.drawing });
      chatStep(dt);
      if (board.allDone() && !sc.finished) markReady();
      if (sc.veil > 0) sc.veil = Math.max(0, sc.veil - dt * 3.2);
    }

    // 退场：先让她把最后一句说完，再把卡推出来
    if (sc.state === "leave") {
      sc.leaveT += dt;
      // 压到 0.8 就停：全黑会把板子整个吃掉，而这张卡想说的是
      // 「东西还在，你先走」，黑板得留一点在背后。
      sc.veil = Math.min(0.8, sc.veil + dt * 2.6);
      if (sc.leaveT > 1.15 && !sc.byeShown) {
        sc.byeShown = true;
        subsHide();
        byeEl.classList.add("show");
      }
    }

    if (sc.state === "done" && sc.walked < 1) {
      sc.walked = Math.min(1, sc.walked + dt / 1.1);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    if (sc.state === "class" || sc.state === "approach") {
      drawBackdrop(1, W / 2, H / 2, 1);
      return;
    }

    if (sc.state === "push") {
      drawBackdrop(sc.zoom, BOARD_AT.x, BOARD_AT.y, 1);
      if (sc.boardAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = sc.boardAlpha;
        board.render(ctx);
        ctx.restore();
      }
      return;
    }

    // board / done
    board.render(ctx);

    if (sc.state === "done") {
      // 两个人从两边走进来，站在板前——镜头在黑板高度，只看到他们的上半身
      const k = ease(sc.walked);
      const boyX = -40 + (176 + 40) * k;
      const girlX = W + 40 - (W + 40 - 344) * k;
      const gy = 306;
      ctx.save();
      ctx.globalAlpha = k;
      ctx.fillStyle = "rgba(0,0,0,.22)";
      ctx.fillRect(0, 236, W, H - 236);
      ctx.restore();
      drawAt("boy", boyX, gy, k);
      drawAt("girl", girlX, gy, k);
    }

    // 退场压暗。盖在画布上而不是用 CSS 透明度：画布是同一块 canvas，
    // 用 DOM 淡出会把底下的 #stage 背景透出来，颜色对不上。
    if (sc.veil > 0.002) {
      ctx.save();
      ctx.globalAlpha = Math.min(1, sc.veil);
      ctx.fillStyle = "#0b0a0d";
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }
  }

  function drawAt(who, x, y, alpha) {
    const c = CH[who];
    if (!c.sheet) return;
    // 第 4 帧是「背对镜头」。站在黑板前看成果的两个人，应该是背对我们的。
    const f = 4;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(c.sheet, f * FW, 0, FW, FH, Math.round(x - FW / 2), Math.round(y - FH), FW, FH);
    ctx.restore();
  }

  function loop(t) {
    now = t;
    const dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
    last = t;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  function ease(t) {
    t = clamp(t, 0, 1);
    return 1 - Math.pow(1 - t, 3);
  }

  // ---------------------------------------------------------------- 界面

  const COLORS = board.COLORS;

  function buildUI() {
    const pal = el("palette");
    COLORS.forEach((c, i) => {
      const b = document.createElement("button");
      b.className = "sw" + (i === 0 ? " on" : "");
      b.style.background = c.hex;
      b.title = c.name + "（" + (i + 1) + "）";
      b.onclick = () => { board.setColor(i); repaintThumbs(); syncUI(); };
      pal.append(b);
    });

    const tools = el("tools");
    [["pen", "画笔", "B"], ["erase", "橡皮", "E"], ["line", "直线", "L"],
     ["rect", "方框", "R"], ["text", "文字", "T"], ["stamp", "图案", "S"]].forEach(([k, name, key]) => {
      const b = document.createElement("button");
      b.dataset.tool = k;
      b.innerHTML = `<span>${name}</span><i>${key}</i>`;
      b.onclick = () => { board.setTool(k); syncUI(); };
      tools.append(b);
    });

    // 底稿开关。淡线是朱里事先打的稿，想自己从头来的时候可以关掉。
    const gh = document.createElement("button");
    gh.id = "ghost";
    gh.className = "toggle";
    gh.innerHTML = "<span>底稿</span><i>G</i>";
    gh.title = "显示 / 隐藏预设草图（G）";
    gh.onclick = () => { board.setGhost(!board.state.ghost); syncUI(); };
    tools.append(gh);

    buildPatterns();

    const widths = el("widths");
    [1, 2, 3].forEach((w) => {
      const b = document.createElement("button");
      b.dataset.w = w;
      b.innerHTML = `<span style="width:${w * 3}px;height:${w * 3}px"></span>`;
      b.title = w + "px";
      b.onclick = () => { board.setWidth(w); syncUI(); };
      widths.append(b);
    });

    el("finish").onclick = finishBoard;
    el("look").onclick = () => cardEl.classList.add("min");
    el("out").onclick = quitToStory;
    el("nextBroadcastDone").onclick = enterBroadcast;
    leaveEl.onclick = leaveBoard;
    el("resume").onclick = resumeBoard;
    el("quit").onclick = quitToStory;
    el("nextBroadcast").onclick = enterBroadcast;
    el("again").onclick = () => {
      board.clearAll();
      board.lock(false);
      girl.reset();
      sc.state = "board";
      sc.finished = false;
      sc.walked = 0;
      sc.leaveT = 0;
      sc.byeShown = false;
      sc.veil = 0;
      cardEl.classList.remove("show", "min");
      byeEl.classList.remove("show");
      el("stage").classList.remove("fin", "over");
      bar.classList.add("show");
      progEl.classList.add("show");
      leaveEl.classList.add("show");
      chatStart(["朱里", "再来一张？稿子还在。"]);
      markReady(true);
      syncUI();
    };
    syncUI();
  }

  function syncUI() {
    document.querySelectorAll("#palette button").forEach((b, i) =>
      b.classList.toggle("on", i === board.state.colorIndex));
    document.querySelectorAll("#tools button[data-tool]").forEach((b) =>
      b.classList.toggle("on", b.dataset.tool === board.state.tool));
    const gh = document.getElementById("ghost");
    if (gh) gh.classList.toggle("on", !!board.state.ghost);
    document.querySelectorAll("#widths button").forEach((b) =>
      b.classList.toggle("on", +b.dataset.w === board.state.width));
    document.querySelectorAll("#pats button").forEach((b) =>
      b.classList.toggle("on", b.dataset.pid === board.state.pattern));
    el("stage").classList.toggle("pats", board.state.tool === "stamp");
    updateProgress();
  }

  // ---------------------------------------------------------------- 图案面板

  const PATS = global.ACT2.Patterns;

  /** 缩略图按当前粉笔色重画：图案本来就跟着笔色走，面板里也得是同一支笔。 */
  function paintThumb(cv) {
    const pat = PATS.BY_ID[cv.dataset.pid];
    if (!pat) return;
    const g = cv.getContext("2d");
    g.clearRect(0, 0, cv.width, cv.height);
    PATS.draw(g, pat, 0, 0, board.state.color, 1, { alpha: 0.96, grain: 0.05 });
  }

  function repaintThumbs() {
    document.querySelectorAll("#pats canvas").forEach(paintThumb);
  }

  function buildPatterns() {
    if (!PATS) return;
    const box = el("pats");
    let cat = null;
    PATS.PATTERNS.forEach((p) => {
      if (p.cat !== cat) {
        cat = p.cat;
        if (box.children.length) {
          const sep = document.createElement("i");
          box.append(sep);
        }
        const lab = document.createElement("em");
        lab.textContent = cat;
        box.append(lab);
      }
      const cv = document.createElement("canvas");
      cv.width = p.size;
      cv.height = p.size;
      cv.dataset.pid = p.id;
      paintThumb(cv);
      const b = document.createElement("button");
      b.dataset.pid = p.id;
      b.title = p.name + "（放好后可以拖动、方向键微调）";
      b.append(cv);
      b.onclick = () => { board.setPattern(p.id); syncUI(); };
      box.append(b);
    });
  }

  const CHIPS = { title: "标题", frame: "边框", main: "主图", deco: "装饰" };
  let lastSig = "";

  function updateProgress() {
    const r = board.regions();
    const box = el("prog");
    for (const k in CHIPS) {
      const chip = box.querySelector(`[data-k="${k}"]`);
      if (!chip) continue;
      const v = r[k];
      chip.classList.toggle("done", v.done);
      chip.classList.toggle("near", !v.done && nearEnough(k, v));
    }
    const ok = board.allDone();
    el("finish").classList.toggle("ready", ok);
    el("finish").disabled = !ok;
    if (ok) hint("四个区都齐了，可以完成");
    else hint(whatsMissing(r));

    const sig = Object.keys(CHIPS).map((k) => (r[k].done ? 1 : 0)).join("");
    if (sig !== lastSig) {
      lastSig = sig;
      emit("board:region", r);
    }
  }

  function nearEnough(k, v) {
    if (k === "frame") return Object.values(v.edges).some((e) => e >= board.NEED.edge * 0.6);
    if (k === "deco") return v.stamps >= 1;
    if (k === "title") return v.cover >= board.NEED.titleCover * 0.6;
    return v.cover >= board.NEED.mainCover * 0.6;
  }

  function whatsMissing(r) {
    if (!r.frame.done) {
      const bad = Object.entries(r.frame.edges)
        .filter(([, v]) => v < board.NEED.edge)
        .map(([k]) => ({ top: "上", bottom: "下", left: "左", right: "右" }[k]));
      return "边框还差：" + bad.join("、") + "（她会补）";
    }
    if (!r.title.done) return r.chars < board.NEED.titleChars ? "用文字工具在标题区写几个字" : "标题区再多写一点";
    if (!r.main.done) return "中间画点什么，大一点";
    if (!r.deco.done) return `放图案（${r.deco.stamps}/3）· 点一下放，按住能拖`;
    return "";
  }

  function hint(text) {
    if (!text) return;
    if (hintEl.textContent === text) return;
    hintEl.textContent = text;
  }

  function markReady(quiet) {
    if (!board.allDone()) return;
    if (!quiet) {
      setTimeout(() => herSay(pick("done")), 400);
    }
  }

  // ---------------------------------------------------------------- 完成

  function finishBoard() {
    if (sc.state !== "board") return;
    if (!board.allDone()) {
      herSay("先把四个区都填上吧。");
      return;
    }
    const png = board.toPNG(3);   // 下载给 3 倍：1344×720，贴在别处也不糊
    board.save();
    board.lock(true);
    sc.finished = true;
    sc.state = "done";
    sc.walked = 0;
    bar.classList.remove("show");
    el("stage").classList.remove("pats");
    el("stage").classList.add("fin");
    progEl.classList.remove("show");
    dlgEl.classList.remove("show");
    leaveEl.classList.remove("show");
    chatStop();

    const a = el("download");
    a.href = png;
    a.download = "黑板报.png";

    setTimeout(() => {
      // 结尾这几句走画布下面那条对白区，不弹 #dlg：
      // 板子刚画完，玩家正想看看自己画了什么，中间压一个对话框等于把作品盖住。
      talkLines([
        ["我", "……画完了。"],
        ["朱里", "站远一点看看，好像比刚才想的还好看。"],
        ["我", "边上的线，是你补的。"],
        ["朱里", "嗯。我们一起画的。"],
        ["我", "下次也一起吧。"]
      ], () => {
        // 对白读完了，两个小人退场、这条让出高度，卡再出来——
        // 两样东西同时盖在画上，谁都看不清
        el("stage").classList.add("over");
        setTimeout(() => {
          cardEl.classList.remove("min");
          cardEl.classList.add("show");
        }, 340);
      });
    }, 1200);

    emit("board:finish", { png, regions: board.regions() });
  }

  // ---------------------------------------------------------------- 随时离开

  /**
   * 随时可以走。
   *
   * 手上这一笔先收掉、存一次盘、她说一句，然后把画面压暗、推出一张收尾卡。
   * 卡上只有两个出口：接着画 / 离开。**不判断画完没画完**——玩家想走就走，
   * 存档已经落了，下次进来 restoreSave 接着这张。
   */
  function leaveBoard() {
    if (sc.state !== "board") return;
    if (activeId != null) { activeId = null; sc.drawing = false; board.up(); }
    girl.cancel();
    board.save();
    chatStop();
    const line = pick("leave");
    subsShow("朱里", line, 1.6);
    byeLineEl.textContent = "「" + line + "」";
    sc.state = "leave";
    sc.leaveT = 0;
    sc.byeShown = false;
    bar.classList.remove("show");
    progEl.classList.remove("show");
    leaveEl.classList.remove("show");
    el("stage").classList.remove("pats");
    emit("board:leave", { regions: board.regions() });
  }

  function resumeBoard() {
    if (sc.state !== "leave") return;
    sc.state = "board";
    sc.leaveT = 0;
    sc.byeShown = false;
    byeEl.classList.remove("show");
    bar.classList.add("show");
    progEl.classList.add("show");
    leaveEl.classList.add("show");
    subsHide();
    chatStart(["朱里", pick("back")]);
    syncUI();
  }

  function quitToStory() {
    emit("board:quit", { regions: board.regions() });
    const target = new URL(BACK, location.href);
    target.searchParams.set("from", "blackboard");
    target.searchParams.set("board", sc.finished ? "done" : "paused");
    location.href = target.href;
  }

  function enterBroadcast() {
    // 独立过场模块只接收作品预览和完成状态，不依赖学校预览页。
    board.save();
    try { localStorage.setItem("our-story-act2-board-preview-v1", board.toPNG(1)); } catch (e) { /* 预览可退回存档 PNG */ }
    const target = new URL("broadcast-bridge/index.html", location.href);
    target.searchParams.set("board", sc.finished ? "done" : "deferred");
    location.href = target.href;
  }

  // ---------------------------------------------------------------- 输入

  let activeId = null;

  function toBoard(e) {
    const r = canvas.getBoundingClientRect();
    const lx = (e.clientX - r.left) / r.width * W;
    const ly = (e.clientY - r.top) / r.height * H;
    return { x: lx - board.INNER.x, y: ly - board.INNER.y, lx, ly };
  }

  function openText(lx, ly) {
    const r = canvas.getBoundingClientRect();
    const k = r.width / W;
    textIn.style.display = "block";
    textIn.style.left = lx * k + "px";
    textIn.style.top = ly * k + "px";
    textIn.style.fontSize = Math.max(13, 16 * k) + "px";
    textIn.value = "";
    textIn.dataset.lx = lx;
    textIn.dataset.ly = ly;
    // 等这一下点击自己走完再聚焦：在 pointerdown 里 focus()，随后的默认焦点处理
    // 会把焦点丢回 body，输入框刚出现就被自己的 blur 收掉。
    setTimeout(() => textIn.focus(), 0);
  }

  function closeText(commit) {
    if (textIn.style.display !== "block") return;
    const lx = +textIn.dataset.lx, ly = +textIn.dataset.ly;
    const v = textIn.value.trim();
    textIn.style.display = "none";
    textIn.blur();
    if (commit && v) {
      const inTitle = ly >= board.INNER.y && ly <= board.INNER.y + board.REGION.title.h;
      board.commitText(v, lx - board.INNER.x, ly - board.INNER.y, inTitle ? 18 : 14);
      syncUI();
    }
  }

  textIn.addEventListener("keydown", (e) => {
    e.stopPropagation();
    if (e.key === "Enter") { closeText(true); }
    else if (e.key === "Escape") { closeText(false); }
  });
  textIn.addEventListener("blur", () => closeText(true));

  canvas.addEventListener("pointerdown", (e) => {
    if (sc.state !== "board") {
      if (advanceTalk()) return;
      if (sc.state === "class" || sc.state === "done") advance();
      return;
    }
    const p = toBoard(e);
    if (board.state.locked) return;
    if (board.state.tool === "text") { openText(p.lx, p.ly); return; }
    activeId = e.pointerId;
    canvas.setPointerCapture(e.pointerId);
    sc.drawing = true;
    girl.noteStroke(board.state.colorIndex);
    board.down(p.x, p.y);
  });

  canvas.addEventListener("pointermove", (e) => {
    const p = toBoard(e);
    if (activeId !== e.pointerId) {
      // 没在画：图案工具给个淡淡的预览，先看清会落在哪
      if (sc.state === "board") board.hover(p.x, p.y);
      return;
    }
    board.move(p.x, p.y);
  });

  canvas.addEventListener("pointerleave", () => board.hover(-1, -1));

  function endStroke(e) {
    if (activeId !== e.pointerId) return;
    activeId = null;
    sc.drawing = false;
    board.up();
    syncUI();
  }
  canvas.addEventListener("pointerup", endStroke);
  canvas.addEventListener("pointercancel", endStroke);

  window.addEventListener("keydown", (e) => {
    if (e.target === textIn) return;

    if (e.key === "Enter" || e.key === " " || e.key === "e" || e.key === "E") {
      if (dlg) { e.preventDefault(); advance(); return; }
      // 结尾那几句走对白区，同样按 E / 空格推进
      if (advanceTalk()) { e.preventDefault(); return; }
    }
    if (sc.state !== "board") return;

    const k = e.key.toLowerCase();
    // 随时能走。放在最前面，和工具键不打架（Esc 本来没绑东西）
    if (e.key === "Escape") { e.preventDefault(); leaveBoard(); return; }
    if ((e.ctrlKey || e.metaKey) && k === "z") {
      e.preventDefault();
      (e.shiftKey ? board.redo() : board.undo()).then(syncUI);
      return;
    }
    if (k === "b") board.setTool("pen");
    else if (k === "e") board.setTool("erase");
    else if (k === "l") board.setTool("line");
    else if (k === "r") board.setTool("rect");
    else if (k === "t") board.setTool("text");
    else if (k === "s") board.setTool("stamp");
    else if (k === "g") board.setGhost(!board.state.ghost);
    else if (k >= "1" && k <= "6") { board.setColor(+k - 1); repaintThumbs(); }
    else if (k === "enter" && board.allDone()) finishBoard();
    else if (e.key.indexOf("Arrow") === 0) {
      // 选中的图案：方向键微调，按住 Shift 走 4 像素
      const step = e.shiftKey ? 4 : 1;
      const dx = e.key === "ArrowLeft" ? -step : e.key === "ArrowRight" ? step : 0;
      const dy = e.key === "ArrowUp" ? -step : e.key === "ArrowDown" ? step : 0;
      if ((dx || dy) && board.state.sel != null) {
        e.preventDefault();
        board.nudgeSelected(dx, dy);
      }
    } else if ((k === "delete" || k === "backspace") && board.state.sel != null) {
      e.preventDefault();
      board.removeSelected();
    }
    syncUI();
  });

  board.on("region", () => updateProgress());
  board.on("change", () => { if (sc.state === "board") updateProgress(); });
  board.on("undo", () => girl.cancel());

  // 橡皮第一次用的时候她吭一声
  let eraseNoted = false;
  canvas.addEventListener("pointerdown", () => {
    if (sc.state === "board" && board.state.tool === "erase" && !eraseNoted) {
      eraseNoted = true;
      setTimeout(() => girl.noteErase(), 300);
    }
  });

  // ---------------------------------------------------------------- 启动

  function loadAll() {
    const keys = Object.keys(IMG);
    let left = keys.length;
    return new Promise((res) => {
      keys.forEach((k) => {
        const im = new Image();
        im.onload = () => {
          img[k] = im;
          if (k === "boy" || k === "girl") CH[k].sheet = im;
          if (--left === 0) res();
        };
        im.onerror = () => { if (--left === 0) res(); };
        im.src = IMG[k];
      });
    });
  }

  loadAll().then(() => {
    buildUI();
    el("loading").classList.remove("show");

    // 前一天在护栏边约好，第二天来到走廊宣传栏旁。
    lines([
      ["旁白", "第二天的课间，我们来到走廊宣传栏旁。昨天约好的那块黑板，还空着。"],
      ["朱里", "你真来了。我还担心你把昨天说的话忘了。"],
      ["和臣", "答应了你，当然要来。"]
    ], () => startFriendCameo(() => lines([
      ["朱里", "我在板上轻轻勾了几笔。你画中间，我来补旁边，好吗？"],
      ["和臣", "好，一起画吧。"]
    ], () => { sc.state = "approach"; sc.t = 0; })));

    requestAnimationFrame(loop);
  });

  // 调试口：测试脚本用
  global.__board = {
    board, girl, scene: sc, friendCameo,
    chat,   // 字幕轮播的状态，自检要看「是不是一直在滚」
    finish: finishBoard,
    leave: leaveBoard,
    resume: resumeBoard,
    state: () => ({
      state: sc.state,
      zoom: +sc.zoom.toFixed(2),
      drawing: sc.drawing,
      veil: +sc.veil.toFixed(2),
      assists: girl.assists,
      girlState: girl.state,
      regions: board.regions(),
      allDone: board.allDone(),
      locked: board.state.locked
    })
  };
})(window);
