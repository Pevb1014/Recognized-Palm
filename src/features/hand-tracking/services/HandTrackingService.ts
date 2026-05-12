import { CameraController } from '../../../core/camera/CameraController';
import { FpsMeter } from '../../../core/performance/FpsMeter';
import { createHandLandmarker } from '../../../core/vision/mediapipe/HandLandmarkerFactory';
import { HandRenderer } from '../../../core/vision/rendering/HandRenderer';
import { HandTrackingEngine } from '../../../core/vision/tracking/HandTrackingEngine';
import { syncCanvasSize } from '../../../shared/utils/canvas';
import type { HandTrackingState } from '../types/handTracking';

export class HandTrackingService {
  private camera = new CameraController();
  private fpsMeter = new FpsMeter();
  private engine: HandTrackingEngine | null = null;

  async initialize(video: HTMLVideoElement): Promise<void> {
    await this.camera.start(video);
    const landmarker = await createHandLandmarker();
    this.engine = new HandTrackingEngine(landmarker);
  }

  tick(video: HTMLVideoElement, canvas: HTMLCanvasElement): HandTrackingState {
    const ctx = canvas.getContext('2d');
    if (!ctx || !this.engine) throw new Error('Tracking service not initialized');

    syncCanvasSize(video, canvas);
    const result = this.engine.detect(video, performance.now());
    const renderer = new HandRenderer(ctx);
    renderer.clear(canvas.width, canvas.height);
    result.landmarks.forEach((hand) => renderer.drawHand(hand, canvas.width, canvas.height));

    return {
      status: 'tracking',
      fps: this.fpsMeter.tick(),
      handsDetected: result.landmarks.length,
      handedness: result.handedness.map((item) => item[0]?.categoryName ?? 'Unknown'),
      error: null,
      result
    };
  }

  stop(video: HTMLVideoElement): void {
    this.camera.stop(video);
    this.engine?.dispose();
    this.engine = null;
  }
}
