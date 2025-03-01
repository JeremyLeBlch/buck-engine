import {Ticker} from "../../../core/engines/ticker/Ticker.ts";

export default class RequestAnimationFrameTicker implements Ticker {
  private requestId: number | null = null;
  private lastFrameTime: number = 0;
  private callback: ((deltaTime: number) => void) | null = null;

  public startLoop(callback: (deltaTime: number) => void): void {
    this.callback = callback;
    this.lastFrameTime = performance.now();
    this.requestId = requestAnimationFrame((now) => this.loop(now));
  }

  public stopLoop(): void {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
  }

  private loop(now: number){
    const deltaTime = (now - this.lastFrameTime);
    this.lastFrameTime = now;
    if (this.callback) {
      this.callback(deltaTime / 1000);
    }
    this.requestId = requestAnimationFrame((now) => this.loop(now));
  }
}