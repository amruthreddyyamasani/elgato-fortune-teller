import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

type StagePhase = 'idle' | 'playing' | 'freeze' | 'freeze-video' | 'black' | 'error';

export interface JumpscareStageHandle {
  start: (videoSrc: string, repeatForMs?: number) => void;
}

interface JumpscareStageProps {
  onRestart: () => void;
}

export const JumpscareStage = forwardRef<JumpscareStageHandle, JumpscareStageProps>(
  function JumpscareStage({ onRestart }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sourceRef = useRef<string | null>(null);
    const repeatForMsRef = useRef(0);
    const loopTimerRef = useRef<number | null>(null);
    const [phase, setPhase] = useState<StagePhase>('idle');
    const [showReturnPrompt, setShowReturnPrompt] = useState(false);

    const clearLoopTimer = useCallback(() => {
      if (loopTimerRef.current !== null) {
        window.clearTimeout(loopTimerRef.current);
        loopTimerRef.current = null;
      }
    }, []);

    const showPlaybackError = useCallback(() => {
      clearLoopTimer();
      const video = videoRef.current;
      if (video) {
        video.loop = false;
        video.pause();
      }
      setPhase('error');
    }, [clearLoopTimer]);

    const freezeFinalFrame = useCallback(() => {
      clearLoopTimer();
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video) {
        video.loop = false;
        video.pause();
      }

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
          // Keep the browser's naturally held paused frame visible instead.
        }
      }
      setPhase(captured ? 'freeze' : 'freeze-video');
    }, [clearLoopTimer]);

    const beginEndLoop = useCallback(() => {
      const video = videoRef.current;
      const repeatForMs = repeatForMsRef.current;
      if (!video) {
        showPlaybackError();
        return;
      }
      if (repeatForMs <= 0) {
        freezeFinalFrame();
        return;
      }

      clearLoopTimer();
      try {
        video.loop = false;
        video.currentTime = 0;
        video.loop = true;
      } catch {
        showPlaybackError();
        return;
      }

      // Door 2 starts this short repeat window only after the first full play.
      // Its timer begins once the browser confirms that replay has started.
      void video.play().then(() => {
        loopTimerRef.current = window.setTimeout(() => {
          loopTimerRef.current = null;
          const activeVideo = videoRef.current;
          if (!activeVideo) {
            showPlaybackError();
            return;
          }
          activeVideo.loop = false;
          activeVideo.pause();
          freezeFinalFrame();
        }, repeatForMs);
      }).catch(showPlaybackError);
    }, [clearLoopTimer, freezeFinalFrame, showPlaybackError]);

    useEffect(() => () => clearLoopTimer(), [clearLoopTimer]);

    useImperativeHandle(ref, () => ({
      start: (videoSrc: string, repeatForMs = 0) => {
        sourceRef.current = videoSrc;
        repeatForMsRef.current = Number.isFinite(repeatForMs)
          ? Math.max(0, repeatForMs)
          : 0;
        clearLoopTimer();
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
          showPlaybackError();
          return;
        }

        video.pause();
        video.loop = false;
        video.removeAttribute('src');
        video.src = videoSrc;
        video.load();
        setPhase('playing');

        // Do not mute as a fallback. The supplied audio track is played intact.
        void video.play().catch(showPlaybackError);
      },
    }), [clearLoopTimer, showPlaybackError]);

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

    const tryPlaybackAgain = () => {
      const source = sourceRef.current;
      const video = videoRef.current;
      if (!source || !video) return;

      // This is an explicit button click, so browser gesture restrictions are met.
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        void document.documentElement.requestFullscreen().catch(() => undefined);
      }
      clearLoopTimer();
      video.pause();
      video.loop = false;
      video.src = source;
      video.load();
      setPhase('playing');
      void video.play().catch(showPlaybackError);
    };

    const awaken = () => {
      const video = videoRef.current;
      clearLoopTimer();
      if (video) {
        video.loop = false;
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
      sourceRef.current = null;
      repeatForMsRef.current = 0;
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
        aria-label="Full-screen video stage"
      >
        <video
          ref={videoRef}
          className="scare-video"
          playsInline
          preload="none"
          controls={false}
          onEnded={beginEndLoop}
          onError={() => {
            if (phase === 'playing') showPlaybackError();
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
