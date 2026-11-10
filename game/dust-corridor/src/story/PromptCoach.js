function wrap(a) { return Math.atan2(Math.sin(a), Math.cos(a)); }

export class PromptCoach {
  constructor() { this.reset(); }
  reset() { this.cooldown = 10; this.pending = null; }

  update(dt, { sister, player, story, panel, enabled }) {
    if (!enabled || !player.alive) { this.pending = null; return; }
    this.cooldown -= dt;
    if (this.pending) {
      const call = this.pending;
      if (!call.started) { if (story.clock > call.expires) this.pending = null; return; }
      call.remaining -= dt;
      const turn = wrap(player.yaw - call.yaw);
      const followed = call.side ? turn * call.side >= 0.35 : Math.abs(turn) >= 0.7;
      if (followed || call.remaining <= 0) {
        story.enqueue([{ speaker: '朱里', text: followed ? '对，就是那儿。' : '……算了，你自己打吧。' }],
          { key: 'coach-reply', mode: 'PLAYER', ttl: 5 });
        this.pending = null;
      }
      return;
    }
    if (this.cooldown > 0) return;
    const point = sister.targetVisible && sister.target ? sister.target.position
      : sister.hasSuspicion && sister.suspicionTime < 3 ? sister.suspicion : null;
    if (!point) return;
    const angle = wrap(Math.atan2(-(point.x - player.position.x), -(point.z - player.position.z)) - player.yaw);
    if (Math.abs(angle) < 0.4) return;
    const back = Math.abs(angle) > 2.1;
    const side = back ? 0 : Math.sign(angle);
    const kind = back ? 'LOOK_BACK' : side > 0 ? 'LOOK_LEFT' : 'LOOK_RIGHT';
    const text = back ? '后面！' : side > 0 ? '左边！' : '右边！';
    const call = { side, started: false, remaining: 1.5, yaw: player.yaw, expires: story.clock + 8 };
    this.pending = call;
    const queued = story.enqueue([{ speaker: '朱里', text, onShow: () => {
      if (this.pending !== call) return;
      call.started = true;
      call.yaw = player.yaw;
      panel.flash(kind, text);
    } }], { key: 'coach-call', mode: 'PLAYER', ttl: 8 });
    if (!queued) this.pending = null;
    this.cooldown = 12;
  }
}
