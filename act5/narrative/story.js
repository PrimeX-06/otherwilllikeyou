(function () {
  "use strict";
  const W = 512, H = 288;
  const canvas = document.getElementById("scene"), ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  const cg = document.getElementById("cg"), shade = document.getElementById("shade");
  const dialog = document.getElementById("dialog"), who = document.getElementById("who"), line = document.getElementById("line");
  const choice = document.getElementById("choice"), choiceQuestion = document.getElementById("choiceQuestion"), choiceItems = document.getElementById("choiceItems");
  const end = document.getElementById("end"), endTitle = document.getElementById("endTitle"), endBody = document.getElementById("endBody"), next = document.getElementById("next");
  const emotionTitle = document.getElementById("emotionTitle"), emotionLine = document.getElementById("emotionLine");
  const emotion = new StoryEmotion(document.getElementById("emotion"));
  const ASSET = {
    classroom: "../../assets/scenes/school_classroom_pixel.png",
    door: "../../assets/scenes/school_corridor_door_pixel.png",
    railing: "../../assets/scenes/school_corridor_railing_pixel.png",
    exit: "../../assets/cg/act5/story_g04_exit_512.png",
    corridorExit: "../../assets/cg/act5/story_g04_to_corridor_512.png",
    notebookOpen: "../../assets/minigame/prop_notebook_open.png",
    notebook: "../../assets/minigame/prop_notebook.png",
    boy: "../../assets/characters/boy/v2/boy_sheet_v2.png",
    girl: "../../assets/characters/girl/v2/girl_sheet_v2.png",
    friend: "../../assets/characters/friend/v2/friend_sheet_v2.png"
  };
  const im = {};
  const actors = { boy: null, girl: null, friend: null };
  const KEY = "our-story-act5-narrative-v1";
  const DAILY_KEY = "our-story-act5-daily-v1";
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch { saved = {}; }
  let scene = "loading", background = "classroom", now = 0, last = 0;
  let lines = [], lineIndex = 0, lineDone = null, timer = 0;
  let chosen = null, choices = [];
  let prop = null;

  function persist(patch) {
    Object.assign(saved, patch);
    try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch { /* private browsing */ }
  }
  function load(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`无法加载 ${src}`));
      image.src = src;
    });
  }
  function actor(key, x, frame = 0, y = 244) { return { key, x, y, frame, motion: null, alpha: 1 }; }
  function setStage(id, bg, setup = {}) {
    scene = id; background = bg; cg.hidden = true; prop = null;
    Object.keys(actors).forEach((key) => { actors[key] = setup[key] || null; });
    end.hidden = true; choice.hidden = true;
    document.getElementById("chapter").textContent = `第三幕 / ${id === "reveal" ? "走廊" : "藏不住的心事"}`;
  }
  function showCG(src, alt) { cg.src = src; cg.alt = alt; cg.hidden = false; }
  function showProp(key, x, y) { prop = { key, x, y, motion: null }; }
  function moveProp(x, y, seconds) {
    if (!prop) return Promise.resolve();
    return new Promise((resolve) => {
      prop.motion = { fromX: prop.x, fromY: prop.y, toX: x, toY: y, start: performance.now(), duration: seconds * 1000, resolve };
    });
  }
  function showLine() {
    clearInterval(timer);
    const item = lines[lineIndex];
    if (!item) {
      dialog.hidden = true;
      const done = lineDone; lineDone = null;
      if (done) done();
      return;
    }
    who.textContent = item[0]; line.textContent = "";
    const pose = item[2] || {};
    if (actors.boy) actors.boy.frame = pose.boy !== undefined ? pose.boy : (item[0] === "和臣" ? 24 : 0);
    if (actors.girl) actors.girl.frame = pose.girl !== undefined ? pose.girl : (item[0] === "朱里" ? 26 : 0);
    if (actors.friend) actors.friend.frame = pose.friend !== undefined ? pose.friend : (item[0] === "由乃" ? 29 : 0);
    let shown = 0;
    timer = setInterval(() => {
      line.textContent = item[1].slice(0, ++shown);
      if (shown >= item[1].length) clearInterval(timer);
    }, 27);
  }
  function say(items) {
    return new Promise((resolve) => {
      lines = items; lineIndex = 0; lineDone = resolve;
      dialog.hidden = false; showLine();
    });
  }
  function advance() {
    if (dialog.hidden) return false;
    const item = lines[lineIndex];
    if (item && line.textContent.length < item[1].length) {
      clearInterval(timer); line.textContent = item[1];
    } else { lineIndex++; showLine(); }
    return true;
  }
  function choose(question, options) {
    return new Promise((resolve) => {
      chosen = resolve; choices = options;
      choiceQuestion.textContent = question; choiceItems.innerHTML = "";
      options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button"; button.textContent = option;
        button.addEventListener("click", () => pick(index));
        choiceItems.appendChild(button);
      });
      choice.hidden = false;
    });
  }
  function pick(index) {
    if (!chosen || !choices[index]) return;
    const done = chosen; chosen = null; choice.hidden = true;
    done(index);
  }
  async function regulate(kind, title, description) {
    scene = kind === "quiet" ? "quiet" : "emotion";
    emotionTitle.textContent = title;
    emotionLine.textContent = description;
    await emotion.start(kind);
    persist(kind === "quiet" ? { disclosureRegulated: true } : { firstRegulated: true });
  }
  function finish(title, body, href, label, options) {
    scene = "end";
    const opt = options || {};
    endTitle.textContent = title; endBody.textContent = body;
    next.href = href; next.textContent = label;
    // 收尾是整条流程的最后一屏：回到根目录开始页时，要跳出第一幕里的
    // storyframe；否则开始页会被装进那个小框里。
    if (opt.top) next.setAttribute("target", "_top");
    else next.removeAttribute("target");
    end.hidden = false;
  }

  async function intro() {
    setStage("nextDay", "classroom", { boy: actor("boy", 205, 29, 251) });
    await say([["旁白", "第二天课间，我仍然会想起昨天护栏边的事。"], ["和臣·心声", "她要是再从那扇门进来，我还能像以前那样说话吗？"]]);
    scene = "greeting";
    showCG("../../assets/scenes/cg_doorway_wave_v2.png", "朱里来到和臣所在教室的门口");
    await say([["朱里", "和臣，你在这儿啊。"], ["和臣", "……嗯，在。"]]);
    await regulate("encounter", "怎么突然有点紧张……", "明明只是平常的一声招呼。可那句想说的话卡住了。");
    setStage("normalTalk", "classroom", { boy: actor("boy", 205, 0, 251), girl: actor("girl", 75, 0, 238) });
    await say([["朱里", "我刚才路过，想起还有件事没跟你说。"], ["和臣", "嗯，你说。"], ["朱里", "昨天那张稿纸，我已经夹进本子里了。"], ["和臣", "那就好。我还怕它又被风吹跑。"], ["旁白", "说了几句平常的话，心跳也慢慢回到了平常的声音。"]]);

    setStage("ordinaryDays", "door", { boy: actor("boy", 305, 2, 246) });
    await say([["旁白", "后来，我开始留意课间的脚步声。"], ["旁白", "有一次我走到走廊，她并不在。铃响之前，我还是回了自己的教室。"]]);
    setStage("meetingAgain", "door", { boy: actor("boy", 315, 2, 246), girl: actor("girl", 265, 3, 246) });
    await say([["旁白", "又有一次，她从自己的班级出来，正好看见我。"], ["朱里", "你也刚下课？"], ["和臣", "嗯。外面风还挺大。"]]);
    await regulate("familiar", "还是会在意。", "这一次，我想把话好好说完。");
    await say([["旁白", "我仍会脸红，但已经能带着这点不自然，继续听她说话。"]]);

    setStage("friendIntro", "door", { boy: actor("boy", 350, 2, 246), girl: actor("girl", 270, 3, 246), friend: actor("friend", 195, 3, 246) });
    await say([["由乃", "朱里，你的本子还在我这儿。"], ["朱里", "我刚想回去找你。"], ["由乃", "咦，你也在。上次在走廊见过吧？我是由乃。"], ["和臣", "嗯，和臣。"], ["朱里", "她和我一个班。刚才还帮我找东西。"], ["由乃", "先说好，我没把你的本子弄丢。"], ["朱里", "我又没说你弄丢。"]]);
    persist({ metYuno: true });
    const topic = await choose("课间还剩一会儿。你想怎样加入她们的聊天？", ["问问她们刚才聊什么", "说起昨天的广播", "先听她们说完"]);
    persist({ firstTrioTopic: ["theirConversation", "broadcast", "listen"][topic] });
    if (topic === 0) await say([["和臣", "你们刚才说什么本子？"], ["由乃", "她借我的练习本。我正好还回来。"], ["朱里", "就这件事，被她讲得像大事一样。"]]);
    if (topic === 1) await say([["和臣", "昨天的广播，你们班有人听到吗？"], ["由乃", "听到了。有人还问我，真是你们俩念的吗。"], ["朱里", "我说是呀，还念完了。"]]);
    if (topic === 2) await say([["旁白", "我没有急着插话。她们把本子翻了两页，又聊起班里的小事。"], ["由乃", "和臣，你也听着呢？"], ["和臣", "嗯，听着。"]]);
    await say([["旁白", "她们有自己的班级和日常。我偶尔走近，便也成了这些普通时刻的一部分。"]]);
    persist({ introCompleted: true });
    finish("那些普通的课间", "脸红的次数没有一下子变少。只是我渐渐学会了平复心情，也认识了由乃。往后还有许多一起度过的小事。", "../daily.html", "进入校园日常");
  }

  async function afterDaily() {
    // 开场接 G04 散场：球停、比分牌收起、三个人收东西。
    setStage("afterActivities", "railing", { boy: actor("boy", 170, 0, 244), friend: actor("friend", 265, 0, 244), girl: actor("girl", 350, 0, 244) });
    showCG(ASSET.exit, "球赛结束，三个人在楼前收东西");
    await say([["旁白", "球停在边线外。比分牌已经收起来了。"], ["旁白", "三个人把球和外套收拾好，沿着操场边往楼里走。"]]);
    cg.hidden = true;
    await say([["朱里", "我先回去一趟。"], ["由乃", "你的本子。"], ["朱里", "先放你那儿，明天还我。"], ["和臣", "嗯，明天见。"]]);
    // 朱里先走。过门 CG 的构图就是她往教室门走，和臣与由乃留在走廊。
    showCG(ASSET.corridorExit, "朱里先回教室，和臣与由乃留在走廊");
    await say([["旁白", "她朝楼梯口那边走，脚步比平时快。"]]);
    cg.hidden = true;

    setStage("reveal", "railing", { boy: actor("boy", 200, 0, 246), friend: actor("friend", 300, 3, 246) });
    showProp("notebookOpen", 286, 194);
    await say([
      ["旁白", "走廊里只剩我和由乃。她手里还拿着朱里的本子。"],
      ["和臣", "她今天走得挺急。"],
      ["由乃", "嗯。最近都这样。"],
      ["和臣", "家里有事？"],
      ["由乃", "不是。"]
    ]);
    showProp("notebook", 286, 192);
    await say([
      ["旁白", "由乃把本子合上，捏着书角停了一下。"],
      ["由乃", "和臣，上次在楼梯口说的事，你问了吗。"],
      ["和臣", "还没。"],
      ["由乃", "那现在记着：二班的宋遥，有没有喜欢的人。"],
      ["和臣", "……你自己怎么不问。"],
      ["由乃", "我去问，太像在替谁打听。"]
    ]);
    await say([
      ["和臣", "替谁？"],
      ["旁白", "由乃没接话。她把本子换到另一只手上。"],
      ["旁白", "本子摊开的那一页边上，露出半个名字。宋遥。"],
      ["和臣", "……这是朱里的本子。"],
      ["由乃", "嗯。所以别让她知道我看过。"]
    ]);
    shade.style.opacity = ".24";
    await regulate("quiet", "本子还在由乃手里。", "她只让我去问，却没说那页名字是什么意思。");
    shade.style.opacity = "0";
    const reply = await choose("由乃在旁边等着。", ["追问是不是朱里", "先不问"]);
    persist({ disclosureHeard: true, likedPersonKnown: false, disclosureReply: reply === 0 ? "asked" : "silent" });
    if (reply === 0) {
      await say([["和臣", "是不是朱里？"], ["由乃", "我没说。"], ["旁白", "她把本子递过来。", { friend: 33 }]]);
    } else {
      await say([["旁白", "我没有追问。由乃也没有再解释。"], ["旁白", "走了两步，她把本子放到我手里。", { friend: 33 }]]);
    }
    const arrival = moveProp(222, 194, .7);
    await say([
      ["由乃", "明天帮我还给她。", { friend: 33 }],
      ["由乃", "还有刚才那件事，你记着就行。"],
      ["和臣", "……好。"],
      ["和臣·心声", "本子比看上去沉一点。那一页的名字，我到底该不该去看。"]
    ]);
    await arrival;
    // 这里就是目前最新的剧情。回开始页，让整条流程有一个真正的出口；
    // 「重看这一段」仍然留在旁边。
    finish("本子还没还", "由乃只让我去问二班那个人，没说是替谁问。本子在我手里，明天要还给她；那一页的名字，我还没翻。", "../../index.html", "回到开头", { top: true });
  }

  function drawActor(person) {
    const image = im[person.key];
    if (!image) return;
    let frame = person.frame;
    if (person.motion) {
      const m = person.motion;
      const progress = Math.min(1, (performance.now() - m.start) / m.duration);
      person.x = m.from + (m.to - m.from) * progress;
      frame = m.frame + Math.floor(now * 10) % 4;
      if (progress >= 1) { person.motion = null; person.frame = m.to > m.from ? 3 : 2; m.resolve(); }
    }
    const scale = 1.4, w = 48 * scale, h = 72 * scale;
    ctx.drawImage(image, frame * 48, 0, 48, 72, Math.round(person.x - w / 2), Math.round(person.y - h), Math.round(w), Math.round(h));
  }
  function drawProp() {
    if (!prop) return;
    const image = im[prop.key];
    if (!image) return;
    if (prop.motion) {
      const m = prop.motion;
      const progress = Math.min(1, (performance.now() - m.start) / m.duration);
      prop.x = m.fromX + (m.toX - m.fromX) * progress;
      prop.y = m.fromY + (m.toY - m.fromY) * progress;
      if (progress >= 1) { prop.motion = null; m.resolve(); }
    }
    ctx.drawImage(image, Math.round(prop.x), Math.round(prop.y));
  }
  function frame(t) {
    const dt = last ? Math.min(.05, (t - last) / 1000) : 0; last = t; now += dt;
    emotion.update(dt);
    ctx.clearRect(0, 0, W, H);
    if (im[background]) ctx.drawImage(im[background], 0, 0, W, H);
    for (const person of Object.values(actors).filter(Boolean).sort((a, b) => a.y - b.y)) drawActor(person);
    drawProp();
    requestAnimationFrame(frame);
  }
  document.addEventListener("keydown", (event) => {
    if (["Space", "Enter", "KeyE", "Digit1", "Digit2", "Digit3", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.code)) event.preventDefault();
    if (emotion.active) {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "KeyA", "KeyD", "KeyW", "KeyS"].includes(event.code)) emotion.nudge(event.code);
      if (!event.repeat && ["Space", "Enter", "KeyE"].includes(event.code)) emotion.fire();
      return;
    }
    if (!dialog.hidden && ["KeyE", "Enter", "Space"].includes(event.code)) { advance(); return; }
    if (!choice.hidden && /^Digit[123]$/.test(event.code)) pick(Number(event.code.slice(-1)) - 1);
  });
  dialog.addEventListener("click", advance);
  document.getElementById("replay").addEventListener("click", () => { location.href = location.pathname + location.search; });
  Promise.all(Object.entries(ASSET).map(async ([key, src]) => { im[key] = await load(src); }))
    .then(() => { const after = new URLSearchParams(location.search).get("phase") === "after"; return after ? afterDaily() : intro(); })
    .catch((error) => { finish("场景未能打开", String(error), "../daily.html", "返回校园日常"); });
  requestAnimationFrame(frame);
  window.__narrative = {
    get scene() { return scene; },
    get lineIndex() { return lineIndex; },
    get emotion() { return { active: emotion.active, kind: emotion.kind, attempts: emotion.attempts, phase: emotion.phase, pull: emotion.pull, flight: emotion.flight && {good: emotion.flight.good} }; },
    get save() { return saved; },
    get actors() { return actors; },
    get prop() { return prop ? { key: prop.key, x: prop.x, y: prop.y } : null; }
  };
})();
