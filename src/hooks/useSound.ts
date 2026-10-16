import { useCallback } from 'react';

class SoundEngine {
  private audioContext: AudioContext | null = null;
  private _enabled = true;
  
  get enabled() { return this._enabled; }
  set enabled(val: boolean) { this._enabled = val; }
  
  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  playTick() {
    if (!this._enabled) return;
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800 + Math.random() * 400;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }

  playWin(rarity: string) {
    if (!this._enabled) return;
    const ctx = this.getContext();
    const frequencies: Record<string, number[]> = {
      consumer: [400, 500],
      industrial: [500, 600],
      milspec: [600, 700, 800],
      restricted: [700, 800, 900, 1000],
      classified: [800, 1000, 1200, 1400],
      covert: [900, 1100, 1300, 1500, 1700],
      knife: [1000, 1200, 1400, 1600, 1800, 2000],
    };
    
    const freqs = frequencies[rarity] || frequencies.consumer;
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      const startTime = ctx.currentTime + i * 0.1;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  }

  playClick() {
    if (!this._enabled) return;
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 1200;
    osc.type = 'square';
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.03);
  }

  playUpgrade() {
    if (!this._enabled) return;
    const ctx = this.getContext();
    for (let i = 0; i < 5; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 400 + i * 200;
      osc.type = 'sine';
      const startTime = ctx.currentTime + i * 0.08;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);
      osc.start(startTime);
      osc.stop(startTime + 0.2);
    }
  }

  playFail() {
    if (!this._enabled) return;
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 200;
    osc.type = 'sawtooth';
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  }

  playTrade() {
    if (!this._enabled) return;
    const ctx = this.getContext();
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'triangle';
      const startTime = ctx.currentTime + i * 0.12;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.1, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  playSpin() {
    if (!this._enabled) return;
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 300;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  }
}

export const soundEngine = new SoundEngine();

export function useSound() {
  const playTick = useCallback(() => soundEngine.playTick(), []);
  const playWin = useCallback((rarity: string) => soundEngine.playWin(rarity), []);
  const playClick = useCallback(() => soundEngine.playClick(), []);
  const playUpgrade = useCallback(() => soundEngine.playUpgrade(), []);
  const playFail = useCallback(() => soundEngine.playFail(), []);
  const playTrade = useCallback(() => soundEngine.playTrade(), []);
  const playSpin = useCallback(() => soundEngine.playSpin(), []);

  return { playTick, playWin, playClick, playUpgrade, playFail, playTrade, playSpin };
}
