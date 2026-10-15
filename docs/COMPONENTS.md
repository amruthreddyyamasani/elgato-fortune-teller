# Component reference

## `App` (`src/App.tsx`)

Owns the story scene state, the greeter answer, scene transitions, and the reference to `JumpscareStage`. Runtime asset URLs are constructed using Vite's `BASE_URL` for relative-path deployments. Door 2 passes a 5,000 ms repeat window; Door 3 uses the default no-repeat behavior.

## `CharacterDisplay` (`src/components/CharacterDisplay.tsx`)

Props: `src`, `alt`, optional `badge`, optional `size` (`md` or `lg`), and optional `isRound`. Shows the supplied character image in a framed sticker-style panel. The image remains contained or circularly cropped according to its explicit scene design.

## `SpeechBubble` (`src/components/SpeechBubble.tsx`)

Props: `children: ReactNode` and optional `subtitle`. Renders dialogue in a status region with a small speech tail and responsive sizing.

## `DoorCard` (`src/components/DoorCard.tsx`)

Props: `doorNumber`, `title`, `subtitle`, and `onClick`. The door illustration is CSS-only. Each button has a descriptive accessible name and a visible focus ring.

## `BackgroundDecor` (`src/components/BackgroundDecor.tsx`)

Keeps the background-decoration component boundary. The supplied mug and plant crops are preserved in `public/` but not rendered because they contain fragments of adjacent artwork and lettering. The site uses CSS paper grain and line art instead.

## `JumpscareStage` (`src/components/JumpscareStage.tsx`)

Accepts `onRestart` and exposes an imperative `start(videoSrc, repeatForMs?)` method through a React ref. The door click calls it directly so playback and the fullscreen request occur within the click gesture. The optional repeat window is zero by default; Door 2 sets it to 5,000 ms and Door 3 leaves it disabled. The stage never uses an automatic muted fallback. At playback end it pauses and captures the displayed frame to canvas when possible (or retains the paused video frame), holds it for 2.4 seconds, then shows black. After five seconds, an understated explicit restart button appears. Playback failures stop media and offer an explicit retry.
