export class FpsMeter {
  private lastTime = performance.now();
  private frames = 0;
  private fps = 0;

  tick(): number {
    this.frames += 1;
    const now = performance.now();
    if (now - this.lastTime >= 1000) {
      this.fps = Math.round((this.frames * 1000) / (now - this.lastTime));
      this.frames = 0;
      this.lastTime = now;
    }
    return this.fps;
  }
}
