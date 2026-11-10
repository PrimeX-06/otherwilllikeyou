import { CONTROL_MODE } from '../control/ControlBus.js';

export class SegmentStats {
  constructor() { this.reset(); }

  reset() {
    this.playerKills = 0;
    this.playerDeaths = 0;
    this.herKills = 0;
    this.herDeaths = 0;
    this.herStreak = 0;
    this.ammoEmpty = false;
  }

  recordKill(event, mode) {
    const hers = mode === CONTROL_MODE.SISTER_AI;
    if (event.involvesPlayer === 'killer') {
      if (hers) { this.herKills++; this.herStreak++; }
      else this.playerKills++;
    } else if (event.involvesPlayer === 'victim') {
      if (hers) { this.herDeaths++; this.herStreak = 0; }
      else this.playerDeaths++;
    }
  }

  context(player, weapon, mode, prompts) {
    if (mode === CONTROL_MODE.PLAYER && player.alive && weapon.ammo === 0) this.ammoEmpty = true;
    return {
      kills: this.playerKills, deaths: this.playerDeaths,
      herKills: this.herKills, herDeaths: this.herDeaths, herStreak: this.herStreak,
      hp: player.health / player.maxHealth, alive: player.alive,
      ammoEmpty: this.ammoEmpty, controlMode: mode, prompts
    };
  }

  result(scores, prompts = {}) {
    return {
      winner: scores.A === scores.B ? null : scores.A > scores.B ? 'A' : 'B',
      playerKills: this.playerKills, playerDeaths: this.playerDeaths,
      herKills: this.herKills, herDeaths: this.herDeaths,
      prompts: { issued: 0, accepted: 0, refused: 0, savedHer: 0, ...prompts }
    };
  }
}
