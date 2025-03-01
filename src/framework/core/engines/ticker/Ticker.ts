export interface Ticker {
  startLoop(callback: (deltaTime: number) => void): void;
  stopLoop(): void;
}