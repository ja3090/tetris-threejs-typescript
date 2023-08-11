export class Interval {
  public interval: ReturnType<typeof setInterval>;
  public intervalMs: number;

  constructor(fn: () => void, intervalMs: number) {
    this.interval = setInterval(fn, intervalMs);
    this.intervalMs = intervalMs;
  }

  public clearInterval() {
    clearInterval(this.interval);
  }
}
