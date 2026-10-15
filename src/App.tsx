import { useRef, useState } from 'react';
import { BackgroundDecor } from './components/BackgroundDecor';
import { CharacterDisplay } from './components/CharacterDisplay';
import { DoorCard } from './components/DoorCard';
import { JumpscareStage, type JumpscareStageHandle } from './components/JumpscareStage';
import { SpeechBubble } from './components/SpeechBubble';

type Scene =
  | 'greeting'
  | 'invitation'
  | 'introducing_elgato'
  | 'the_fortune'
  | 'choose_fate'
  | 'retry_outcome';
type GreeterAnswer = 'good' | 'bad';

const assetUrl = (fileName: string) => `${import.meta.env.BASE_URL}${fileName}`;

export const App = () => {
  const [scene, setScene] = useState<Scene>('greeting');
  const [greeterAnswer, setGreeterAnswer] = useState<GreeterAnswer | null>(null);
  const jumpscareRef = useRef<JumpscareStageHandle>(null);

  const restartStory = () => {
    setGreeterAnswer(null);
    setScene('greeting');
  };

  const startJumpscare = (fileName: string, repeatForMs = 0) => {
    // Keep this call in the door's click handler so fullscreen and media playback
    // are both initiated directly from the user's gesture.
    jumpscareRef.current?.start(assetUrl(fileName), repeatForMs);
  };

  return (
    <div className="app-shell">
      <BackgroundDecor />

      <header className="site-header">
        <div className="brand-lockup" aria-label="Elgato's little fortune room">
          <span className="brand-seal" aria-hidden="true">✦</span>
          <span className="brand-name">Elgato’s little fortune room</span>
        </div>
        <span className="header-note">a tiny tale about luck</span>
      </header>

      <main className={`story-card story-card-${scene}`}>
        <section key={scene} className={`scene scene-${scene}`} aria-live="polite">
          {scene === 'greeting' && (
            <>
              <p className="scene-kicker">A little hello</p>
              <CharacterDisplay
                src={assetUrl('greeter.png')}
                alt="A cheerful panda holding a small bouquet"
                badge="Here for you"
              />

              {!greeterAnswer ? (
                <>
                  <h1 className="sr-only">Hey! How are you doing??</h1>
                  <SpeechBubble>Hey! How are you doing??</SpeechBubble>
                  <div className="choice-row">
                    <button className="cute-btn" onClick={() => setGreeterAnswer('good')}>
                      Doing good!
                    </button>
                    <button
                      className="cute-btn cute-btn-peach"
                      onClick={() => setGreeterAnswer('bad')}
                    >
                      Not doing well
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="sr-only">A note from your greeter</h1>
                  <SpeechBubble>
                    {greeterAnswer === 'good'
                      ? 'Yay! That makes me so happy to hear. Let’s keep that good energy going!'
                      : 'Aw, I’m sorry to hear that. Don’t worry—something special might turn your day around.'}
                  </SpeechBubble>
                  <button className="cute-btn" onClick={() => setScene('invitation')}>
                    Continue <span aria-hidden="true">✦</span>
                  </button>
                </>
              )}
            </>
          )}

          {scene === 'invitation' && (
            <>
              <p className="scene-kicker">A question for you</p>
              <CharacterDisplay
                src={assetUrl('greeter.png')}
                alt="A cheerful panda holding a small bouquet"
                badge="Curious panda"
              />
              <h1 className="sr-only">Are you feeling lucky today?</h1>
              <SpeechBubble subtitle="There’s someone who would love to tell you what comes next.">
                Are you feeling lucky today?
                <span className="bubble-second-line">Wanna know your fate?</span>
              </SpeechBubble>
              <button className="cute-btn" onClick={() => setScene('introducing_elgato')}>
                Yes, tell me <span aria-hidden="true">✦</span>
              </button>
            </>
          )}

          {scene === 'introducing_elgato' && (
            <>
              <p className="scene-kicker">A very special visitor</p>
              <CharacterDisplay
                src={assetUrl('elgato.jpeg')}
                alt="Elgato, a wide-eyed grey tabby kitten"
                badge="Elgato the seer"
                isRound
                size="lg"
              />
              <h1 className="sr-only">Meet Elgato, your fortune-teller</h1>
              <SpeechBubble subtitle="Your personal fate teller">
                Well, well… hello there!
                <span className="bubble-second-line">I’m Elgato, your personal fate teller.</span>
              </SpeechBubble>
              <button className="cute-btn" onClick={() => setScene('the_fortune')}>
                Reveal my future <span aria-hidden="true">✦</span>
              </button>
            </>
          )}

          {scene === 'the_fortune' && (
            <>
              <p className="scene-kicker">A very bright future</p>
              <CharacterDisplay
                src={assetUrl('elgato.jpeg')}
                alt="Elgato, a wide-eyed grey tabby kitten"
                badge="The stars agree"
                isRound
                size="lg"
              />
              <h1 className="sr-only">Elgato’s cheerful fortune</h1>
              <SpeechBubble subtitle="The stars are aligning just for you…">
                <span>I see a very bright future ahead of you!</span>
                <span className="bubble-second-line">
                  Wonderful things are waiting for you. Everyone will be happy. Everything will work out.
                </span>
                <span className="bubble-whisper">Now, let’s see how lucky you really are…</span>
              </SpeechBubble>
              <button className="cute-btn" onClick={() => setScene('choose_fate')}>
                Choose my fate <span aria-hidden="true">⌑</span>
              </button>
            </>
          )}

          {scene === 'choose_fate' && (
            <>
              <p className="scene-kicker">The moment of truth</p>
              <div className="door-intro">
                <h1>Choose your fate.</h1>
                <p>Pick the door you feel luckiest about.</p>
              </div>
              <div className="door-grid" aria-label="Three doors to choose from">
                <DoorCard
                  doorNumber={1}
                  title="The Pastel Peach"
                  subtitle="Warmth & serenity"
                  onClick={() => setScene('retry_outcome')}
                />
                <DoorCard
                  doorNumber={2}
                  title="The Soft Sage"
                  subtitle="Mysteries of tomorrow"
                  onClick={() => startJumpscare('door-2.mp4', 5000)}
                />
                <DoorCard
                  doorNumber={3}
                  title="The Gentle Lavender"
                  subtitle="Whispers in the starlight"
                  onClick={() => startJumpscare('jumpscare-2.mp4')}
                />
              </div>
            </>
          )}

          {scene === 'retry_outcome' && (
            <>
              <p className="scene-kicker">A little detour</p>
              <CharacterDisplay
                src={assetUrl('elgato.jpeg')}
                alt="Elgato, looking thoughtful"
                badge="Not this one"
                isRound
              />
              <h1 className="sr-only">Try another door</h1>
              <SpeechBubble subtitle="Your destiny is still waiting behind another door…">
                Hmm… not quite. Want to try again?
              </SpeechBubble>
              <button className="cute-btn" onClick={() => setScene('choose_fate')}>
                Try again <span aria-hidden="true">⌑</span>
              </button>
            </>
          )}
        </section>
      </main>

      <footer className="site-footer">made with a little luck and a lot of whiskers</footer>

      <JumpscareStage ref={jumpscareRef} onRestart={restartStory} />
    </div>
  );
};

export default App;
