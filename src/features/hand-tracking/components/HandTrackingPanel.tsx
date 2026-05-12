import { StatusPill } from '../../../shared/components/StatusPill';
import { useHandTracking } from '../hooks/useHandTracking';

export const HandTrackingPanel = () => {
  const { videoRef, canvasRef, state, running, start, pause } = useHandTracking();

  return (
    <section className="tracking-shell">
      <header>
        <h1>Recognized Palm</h1>
        <p>Real-time hand tracking with MediaPipe Tasks Vision</p>
      </header>

      <div className="status-grid">
        <StatusPill label="Camera" value={running ? 'Active' : 'Stopped'} active={running} />
        <StatusPill label="Tracking" value={state.status.toUpperCase()} active={state.status === 'tracking'} />
        <StatusPill label="Hands" value={String(state.handsDetected)} />
        <StatusPill label="FPS" value={String(state.fps)} />
      </div>

      <div className="stage">
        <video ref={videoRef} autoPlay muted playsInline className="video" />
        <canvas ref={canvasRef} className="overlay" />
      </div>

      <div className="footer-panel">
        <div>
          <strong>Handedness:</strong> {state.handedness.join(', ') || 'None'}
        </div>
        <div>
          <strong>Status:</strong> {state.error ?? 'Detection running'}
        </div>
      </div>

      <div className="actions">
        <button onClick={start} disabled={running}>Start Camera</button>
        <button onClick={pause} disabled={!running}>Pause</button>
      </div>
    </section>
  );
};
