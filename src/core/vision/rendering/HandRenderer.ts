import type { NormalizedLandmark } from '@mediapipe/tasks-vision';
import { HAND_CONNECTIONS } from '../../../shared/constants/hand';

export class HandRenderer {
  constructor(private readonly ctx: CanvasRenderingContext2D) {}

  clear(width: number, height: number): void {
    this.ctx.clearRect(0, 0, width, height);
  }

  drawHand(landmarks: NormalizedLandmark[], width: number, height: number): void {
    this.ctx.strokeStyle = '#00e5ff';
    this.ctx.lineWidth = 2;
    HAND_CONNECTIONS.forEach(([start, end]) => {
      const p1 = landmarks[start];
      const p2 = landmarks[end];
      this.ctx.beginPath();
      this.ctx.moveTo(p1.x * width, p1.y * height);
      this.ctx.lineTo(p2.x * width, p2.y * height);
      this.ctx.stroke();
    });

    this.ctx.fillStyle = '#7c4dff';
    landmarks.forEach((point) => {
      this.ctx.beginPath();
      this.ctx.arc(point.x * width, point.y * height, 4, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
}
