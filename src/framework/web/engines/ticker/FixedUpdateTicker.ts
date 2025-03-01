import {Ticker} from "../../../core/engines/ticker/Ticker.ts";

export default class FixedUpdateTicker implements Ticker {
  private readonly interval: number;
  private lastTime: number;
  private accumulator: number;
  private callback: (deltaTime: number) => void;
  private running: boolean;

  constructor(fps: number) {
    this.interval = 1000 / fps; // ms
    this.lastTime = 0;
    this.accumulator = 0;
    this.callback = () => {}; // nothing at start
    this.running = false;
  }

  startLoop(callback: (deltaTime: number) => void) {
    if (this.running) return;

    this.callback = callback;
    this.running = true;
    this.lastTime = performance.now();
    this.tick();
  }

  stopLoop() {
    this.running = false;
  }

  private tick() {
    if (!this.running) return;

    const now = performance.now();
    const deltaTime = now - this.lastTime;
    this.lastTime = now;
    this.accumulator += deltaTime;

    while (this.accumulator >= this.interval) {
      this.callback(this.interval / 1000); // Passer deltaTime en secondes
      this.accumulator -= this.interval;
    }

    requestAnimationFrame(() => this.tick());
  }
}