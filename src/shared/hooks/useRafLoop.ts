import { useCallback, useEffect, useRef } from 'react';

export const useRafLoop = (callback: (time: number) => void, enabled: boolean) => {
  const frameRef = useRef<number>();

  const loop = useCallback(
    (time: number) => {
      callback(time);
      frameRef.current = requestAnimationFrame(loop);
    },
    [callback]
  );

  useEffect(() => {
    if (!enabled) return;
    frameRef.current = requestAnimationFrame(loop);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [enabled, loop]);
};
