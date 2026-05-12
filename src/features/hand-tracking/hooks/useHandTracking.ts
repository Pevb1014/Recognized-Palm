import { useCallback, useMemo, useRef, useState } from 'react';
import { useRafLoop } from '../../../shared/hooks/useRafLoop';
import type { HandTrackingState } from '../types/handTracking';
import { HandTrackingService } from '../services/HandTrackingService';

const initialState: HandTrackingState = {
  status: 'idle',
  fps: 0,
  handsDetected: 0,
  handedness: [],
  error: null,
  result: null
};

export const useHandTracking = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const service = useMemo(() => new HandTrackingService(), []);
  const [state, setState] = useState<HandTrackingState>(initialState);
  const [running, setRunning] = useState(false);

  const start = useCallback(async () => {
    if (!videoRef.current) return;
    try {
      setState((prev) => ({ ...prev, status: 'loading', error: null }));
      await service.initialize(videoRef.current);
      setRunning(true);
      setState((prev) => ({ ...prev, status: 'tracking' }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown camera error';
      setState((prev) => ({ ...prev, status: 'error', error: message }));
    }
  }, [service]);

  const pause = useCallback(() => {
    if (!videoRef.current) return;
    service.stop(videoRef.current);
    setRunning(false);
    setState((prev) => ({ ...prev, status: 'paused' }));
  }, [service]);

  const tick = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !running) return;
    try {
      const next = service.tick(videoRef.current, canvasRef.current);
      setState(next);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Tracking error';
      setState((prev) => ({ ...prev, status: 'error', error: message }));
      setRunning(false);
    }
  }, [running, service]);

  useRafLoop(tick, running);

  return { videoRef, canvasRef, state, running, start, pause };
};
