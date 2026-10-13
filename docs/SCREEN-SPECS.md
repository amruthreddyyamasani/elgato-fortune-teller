# Screen specifications

## Greeting and warm response

The first screen uses the supplied panda illustration in a lightly framed sticker panel. A speech bubble asks **“Hey! How are you doing??”** and presents the two exact choices: **Doing good!** and **Not doing well**. The selected response is followed by a single Continue button.

## Fortune invitation and Elgato

The panda asks **“Are you feeling lucky today?”** followed by **“Wanna know your fate?”**. The next screen introduces Elgato using the supplied 554×554 kitten photo. Elgato then promises a bright future, wonderful things, and that everyone will be happy.

## Three doors

Desktop shows three CSS-illustrated arch doors in one row. Narrow viewports stack the same cards vertically. Door labels and full accessible names are retained for keyboard/screen-reader users.

- **Door 1:** opens a brief Elgato retry screen. The **Try again** action returns immediately to door selection.
- **Door 2:** plays the H.264 playback version of supplied jumpscare 1.
- **Door 3:** plays supplied jumpscare 2.

## Horror playback and ending

A door click requests fullscreen when supported and starts unmuted video playback with the supplied soundtrack. The video fills the screen using `object-fit: contain`, preserving its full frame and aspect ratio. Its final frame is held for 2.4 seconds before a black screen. The black screen has no prompt for five seconds; afterward, an understated, keyboard-accessible restart button appears. Escape or browser policy may leave playback outside fullscreen, but the fixed stage still fills the viewport.

The cute story uses a responsive layout, visible keyboard focus, and a system reduced-motion preference. It uses local supplied artwork and CSS rather than external image assets or an animation library.
