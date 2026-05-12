import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import { env } from '../../../app/config/env';

export const createHandLandmarker = async (): Promise<HandLandmarker> => {
  const resolver = await FilesetResolver.forVisionTasks(env.mediapipeWasmPath);
  return HandLandmarker.createFromOptions(resolver, {
    baseOptions: {
      modelAssetPath: env.handModelPath
    },
    numHands: 2,
    runningMode: 'VIDEO',
    minHandDetectionConfidence: 0.5,
    minHandPresenceConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
};
