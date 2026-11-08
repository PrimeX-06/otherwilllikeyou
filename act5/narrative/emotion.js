/* 心绪：拉住胃部，把一句话送到对方那里。失败只重试这一小段。 */
(function (global) {
  "use strict";
  const WORDS = {
    encounter: { good: "刚才……你说什么？", bad: ["啊，没事。", "我、我不是那个意思！"] },
    familiar: { good: "嗯，我在听。", bad: ["天气……挺好的。", "没、没有。"] },
    quiet: { good: "……你说的，我听见了。", bad: ["算了。", "我不知道。"] }
  };
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

  class EmotionController {
    constructor(root) {
      this.root = root;
      this.canvas = root.querySelector("#heartGame");
      this.ctx = this.canvas.getContext("2d");
      this.message = root.querySelector("#focusMessage");
      this.active = false;
      this.kind = "encounter";
      this.attempts = 0;
      this.phase = 0;
      this.level = 1;
      this.pull = { x: 190, y: 153 };
      this.dragging = false;
      this.flight = null;
      this.resolve = null;
      this.sound = null;
      this.timer = null;
      this.canvas.addEventListener("pointerdown", e => this.pointerDown(e));
      this.canvas.addEventListener("pointermove", e => this.pointerMove(e));
      this.canvas.addEventListener("pointerup", e => this.pointerUp(e));
      this.canvas.addEventListener("pointercancel", () => { this.dragging = false; });
    }

    unlock() {
      if (this.sound) { this.sound.resume?.(); return; }
      try { this.sound = new (global.AudioContext || global.webkitAudioContext)(); this.sound.resume(); }
      catch { this.sound = null; }
    }
    beat() {
      if (!this.sound || this.sound.state !== "running" || this.kind === "quiet") return;
      const now = this.sound.currentTime;
      const o = this.sound.createOscillator(), g = this.sound.createGain();
      o.type = "sine"; o.frequency.value = 82;
      g.gain.setValueAtTime(.018 * this.level, now);
      g.gain.exponentialRampToValueAtTime(.0001, now + .11);
      o.connect(g).connect(this.sound.destination); o.start(now); o.stop(now + .12);
    }

    start(kind) {
      this.stop();
      this.kind = WORDS[kind] ? kind : "encounter";
      this.active = true;
      this.attempts = 0;
      this.level = this.kind === "familiar" ? .72 : 1;
      this.phase = 0;
      this.root.hidden = false;
      this.root.dataset.kind = this.kind;
      this.reset();
      return new Promise(resolve => { this.resolve = resolve; });
    }
    reset() {
      this.dragging = false;
      this.flight = null;
      this.pull = { x: 190, y: 153 };
      this.message.textContent = this.attempts ? "没关系。再拉一次，这回慢一点。" : "抓住胃部，向左拉。心跳放慢时松开。";
      this.draw();
    }
    point(e) {
      const r = this.canvas.getBoundingClientRect();
      return { x: (e.clientX-r.left)*640/r.width, y: (e.clientY-r.top)*300/r.height };
    }
    pointerDown(e) {
      if (!this.active || this.flight || this.timer) return;
      const p = this.point(e);
      if (Math.hypot(p.x-190,p.y-153)>80) return;
      this.unlock(); this.dragging = true;
      this.canvas.setPointerCapture(e.pointerId);
      this.pointerMove(e);
    }
    pointerMove(e) {
      if (!this.dragging) return;
      const p = this.point(e);
      this.pull = { x: clamp(p.x,55,265), y:clamp(p.y,65,240) };
      this.draw();
    }
    pointerUp(e) {
      if (!this.dragging) return;
      this.pointerMove(e); this.dragging = false; this.fire();
    }
    nudge(code) {
      if (!this.active || this.flight || this.timer) return;
      this.unlock();
      const step = 12;
      if (code === "ArrowLeft" || code === "KeyA") this.pull.x -= step;
      if (code === "ArrowRight" || code === "KeyD") this.pull.x += step;
      if (code === "ArrowUp" || code === "KeyW") this.pull.y -= step;
      if (code === "ArrowDown" || code === "KeyS") this.pull.y += step;
      this.pull.x = clamp(this.pull.x,55,265);
      this.pull.y = clamp(this.pull.y,65,240);
      this.draw();
    }
    fire() {
      if (!this.active || this.flight || this.timer) return;
      this.unlock();
      const dx = 190-this.pull.x, dy = 153-this.pull.y;
      const power = Math.hypot(dx,dy);
      if (power < 18) { this.message.textContent = "话还卡在喉咙里。再向后拉一点。"; return; }
      const easy = Math.min(this.attempts,5);
      const angle = Math.abs(Math.atan2(dy,dx));
      const rhythm = Math.sin(this.phase);
      const good = dx > 0 && power >= 52-easy*8 && power <= 113+easy*12 && angle <= .20+easy*.09 && rhythm <= -.10+easy*.18;
      const reason = dx <= 0 || angle > .20+easy*.09 ? "方向偏了" : power > 113+easy*12 ? "太用力了" : power < 52-easy*8 ? "力气太轻了" : "心跳抢先了一拍";
      this.flight = { t:0, dx, dy, good, reason, text:good ? WORDS[this.kind].good : WORDS[this.kind].bad[this.attempts%2] };
      this.message.textContent = good ? "这句话，终于往她那边去了。" : `${reason}，话飞了出去……`;
    }
    update(dt) {
      if (!this.active) return;
      const previous = this.phase;
      this.phase += dt * (this.kind === "familiar" ? 3.2 : 4.2) / (1+this.attempts*.12);
      if (Math.floor(previous/(Math.PI*2)) !== Math.floor(this.phase/(Math.PI*2))) this.beat();
      if (this.flight) {
        this.flight.t = Math.min(1, this.flight.t + dt*1.7);
        if (this.flight.t >= 1 && !this.timer) {
          const result = this.flight;
          this.message.textContent = result.good ? `“${result.text}”` : `“${result.text}”——不是想说的那句。`;
          this.timer = global.setTimeout(() => {
            this.timer = null;
            if (result.good) this.finish();
            else { this.attempts++; this.level = Math.max(.22,this.level-.13); this.reset(); }
          }, result.good ? 900 : 1100);
        }
      }
      this.root.style.setProperty("--emotion", this.level.toFixed(3));
      this.draw();
    }
    draw() {
      const c=this.ctx; c.clearRect(0,0,640,300);
      const pixel=(x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h);};
      const pulse=(Math.sin(this.phase)+1)/2;
      c.fillStyle="#272331df"; c.fillRect(0,0,640,300);
      for(let i=0;i<3;i++) { pixel(39,240+i*7,560,2,"#6b5660"); }
      // Pale safe band widens after each attempt; the target stays in the same place.
      const radius=24+Math.min(this.attempts,5)*7;
      c.strokeStyle="#f2c8a0"; c.lineWidth=3;
      c.strokeRect(530-radius/2,153-radius/2,radius,radius);
      pixel(532,143,7,20,"#f3d9b7"); pixel(525,150,20,7,"#f3d9b7");
      c.font="18px Microsoft YaHei"; c.textAlign="center"; c.fillStyle="#fff0dc";
      c.fillText("想说的话",538,108);
      c.fillStyle=this.kind==="quiet"?"#99b8ce":"#dc8c88";
      c.beginPath();c.arc(190,153,31+pulse*8,0,Math.PI*2);c.fill();
      c.fillStyle="#f4d2bb";c.beginPath();c.arc(190,153,24,0,Math.PI*2);c.fill();
      c.fillStyle="#3b2e3b";c.font="15px Microsoft YaHei";c.fillText("胃",190,159);
      c.strokeStyle="#ffdaaf";c.lineWidth=3;c.beginPath();c.moveTo(190,153);c.lineTo(this.pull.x,this.pull.y);c.stroke();
      c.fillStyle="#ffdaa9";c.beginPath();c.arc(this.pull.x,this.pull.y,9,0,Math.PI*2);c.fill();
      c.fillStyle="#f6e4d0";c.font="14px Microsoft YaHei";c.fillText("← 向后拉",175,223);
      pixel(276,262,180,7,"#725561");
      pixel(276,262,180*pulse,7,"#e5ab9c");
      c.fillText("心跳",245,270);
      if(this.flight) {
        const f=this.flight, t=f.t, x=190+340*t, y=153-f.dy*t+(f.good?0:70*t*t);
        c.fillStyle=f.good?"#fff0d8":"#f0aba7";c.font="bold 18px Microsoft YaHei";
        c.fillText(f.text,x,y);
      }
    }
    finish() {
      const done=this.resolve; this.resolve=null; this.stop(); if(done) done();
    }
    stop() {
      if(this.timer) global.clearTimeout(this.timer);
      this.timer=null; this.active=false; this.dragging=false; this.root.hidden=true;
    }
  }
  global.StoryEmotion=EmotionController;
})(window);
