import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

type StagePhase = 'idle' | 'playing' | 'freeze' | 'freeze-video' | 'black' | 'error';

export interface JumpscareStageHandle {
  start: (videoSrc: string) => void;
}

interface JumpscareStageProps {
  onRestart: () => void;
}

export const JumpscareStage = forwardRef<JumpscareStageHandle, JumpscareStageProps>(
  function JumpscareStage({ onRestart }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sourceRef = useRef<string | null>(null);
    const [phase, setPhase] = useState<StagePhase>('idle');
    const [showReturnPrompt, setShowReturnPrompt] = useState(false);

    useImperativeHandle(ref, () => ({
      start: (videoSrc: string) => {
        sourceRef.current = videoSrc;
        setShowReturnPrompt(false);

        // Both privileged requests are made synchronously from the door click.
        const root = document.documentElement;
        if (!document.fullscreenElement && root.requestFullscreen) {
          void root.requestFullscreen().catch(() => {
            // Fullscreen is optional; playback continues in the fixed viewport.
          });
        }

        const video = videoRef.current;
        if (!video) {
          setPhase('error');
          return;
        }

        video.pause();
        video.removeAttribute('src');
        video.src = videoSrc;
        video.load();
        setPhase('playing');

        // Do not mute as a fallback. The supplied audio track is played intact.
        void video.play().catch(() => {
          setPhase('error');
        });
      },
    }), []);

    useEffect(() => {
      if (phase !== 'freeze' && phase !== 'freeze-video') return;
      const timer = window.setTimeout(() => setPhase('black'), 2400);
      return () => window.clearTimeout(timer);
    }, [phase]);

    useEffect(() => {
      if (phase !== 'black') return;
      const timer = window.setTimeout(() => setShowReturnPrompt(true), 5000);
      return () => window.clearTimeout(timer);
    }, [phase]);

    const freezeFinalFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      let captured = false;
      if (video && canvas && video.videoWidth > 0 && video.videoHeight > 0) {
        try {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const context = canvas.getContext('2d');
          if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            captured = true;
          }
        } catch {
          // Keep the browser's naturally held end frame visible instead.
        }
      }
      setPhase(captured ? 'freeze' : 'freeze-video');
    };

    const tryPlaybackAgain = () => {
      const source = sourceRef.current;
      const video = videoRef.current;
      if (!source || !video) return;

      // This is an explicit button click, so browser gesture restrictions are met.
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        void document.documentElement.requestFullscreen().catch(() => undefined);
      }
      video.pause();
      video.src = source;
      video.load();
      setPhase('playing');
      void video.play().catch(() => setPhase('error'));
    };

    const awaken = () => {
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
      sourceRef.current = null;
      setShowReturnPrompt(false);
      setPhase('idle');
      if (document.fullscreenElement && document.exitFullscreen) {
        void document.exitFullscreen().catch(() => undefined);
      }
      onRestart();
    };

    const keepVideoFrame = phase === 'playing' || phase === 'freeze-video';

    return (
      <section
        className={`scare-stage ${phase === 'idle' ? 'is-idle' : `is-${phase}`}`}
        aria-hidden={phase === 'idle'}
        aria-label="Full-screen horror video"
      >
        <video
          ref={videoRef}
          className="scare-video"
          playsInline
          preload="none"
          controls={false}
          onEnded={freezeFinalFrame}
          onError={() => {
            if (phase === 'playing') setPhase('error');
          }}
          style={{ display: keepVideoFrame ? 'block' : 'none' }}
        />

        <canvas
          ref={canvasRef}
          className="scare-freeze-frame"
          aria-hidden="true"
          style={{ display: phase === 'freeze' ? 'block' : 'none' }}
        />

        {phase === 'black' && (
          <div className="scare-blackout">
            {showReturnPrompt && (
              <button className="scare-return" type="button" onClick={awaken}>
                click anywhere to awaken
              </button>
            )}
          </div>
        )}

        {phase === 'error' && (
          <div className="scare-error" role="alert">
            <div className="scare-error-content">
              <p>This video could not start in this browser. Your original audio has not been muted.</p>
              <button type="button" onClick={tryPlaybackAgain}>Tap to try again</button>
            </div>
          </div>
        )}
      </section>
    );
  },
);

export default JumpscareStage;
