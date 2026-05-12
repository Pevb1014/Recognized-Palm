export const syncCanvasSize = (video: HTMLVideoElement, canvas: HTMLCanvasElement): void => {
  const width = video.videoWidth;
  const height = video.videoHeight;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
};
