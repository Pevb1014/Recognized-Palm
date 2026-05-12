export const env = {
  mediapipeWasmPath:
    import.meta.env.VITE_MEDIAPIPE_WASM_PATH ??
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.15/wasm',
  handModelPath:
    import.meta.env.VITE_HAND_MODEL_PATH ??
    'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task'
} as const;
