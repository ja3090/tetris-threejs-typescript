export class Interval {
  public interval: ReturnType<typeof setInterval>;
  public fn;
  public intervalMs: number;

  constructor(fn: () => void, intervalMs: number) {
    this.interval = setInterval(fn, intervalMs);
    this.fn = fn;
    this.intervalMs = intervalMs;
  }

  public clearInterval() {
    clearInterval(this.interval);
  }

  public setInterval(fn: () => void, intervalMs: number) {
    this.interval = setInterval(fn, intervalMs);
    this.intervalMs = intervalMs;
  }

  public changeTime(intervalMs: number) {
    clearInterval(this.interval);
    this.interval = setInterval(this.fn, intervalMs);
  }
}
