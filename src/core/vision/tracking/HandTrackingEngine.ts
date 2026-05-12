import { HandLandmarker, HandLandmarkerResult } from '@mediapipe/tasks-vision';

export class HandTrackingEngine {
  constructor(private readonly handLandmarker: HandLandmarker) {}

  detect(video: HTMLVideoElement, timestamp: number): HandLandmarkerResult {
    return this.handLandmarker.detectForVideo(video, timestamp);
  }

  dispose(): void {
    this.handLandmarker.close();
  }
}
