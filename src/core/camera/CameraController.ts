export class CameraController {
  private stream: MediaStream | null = null;

  async start(video: HTMLVideoElement): Promise<MediaStream> {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    });

    video.srcObject = this.stream;
    await video.play();
    return this.stream;
  }

  stop(video: HTMLVideoElement): void {
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
    video.pause();
    video.srcObject = null;
  }

  isActive(): boolean {
    return Boolean(this.stream?.active);
  }
}
