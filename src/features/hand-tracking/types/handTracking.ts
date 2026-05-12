import type { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import type { DetectStatus } from '../../../shared/types/common';

export interface HandTrackingState {
  status: DetectStatus;
  fps: number;
  handsDetected: number;
  handedness: string[];
  error: string | null;
  result: HandLandmarkerResult | null;
}
