# UX design brief: Elgato’s little fortune room

## Intent

This is a short interactive horror story that begins as a gentle fortune-telling visit. The cute opening should feel sincere and comforting. The contrast comes from the sudden switch to the supplied scare videos only after a visitor chooses a horror door.

## Emotional path

The visitor is greeted by the supplied panda art, chooses how they are feeling, is invited to ask about their luck, meets Elgato using the supplied kitten photo, and hears an exaggeratedly cheerful promise about a bright future and everyone being happy. Three pastel CSS-illustrated doors provide a final choice. Door 1 offers a try-again action; the other doors each start one supplied video.

## Visual direction

Keep the opening warm, pastel, playful, and uncluttered, with a paper-like background, soft rounded surfaces, the supplied character images, and restrained motion. Avoid large gradients, glass-like panels, stock art, and unnecessary decoration. The partial plant/mug crops remain in the asset folder but are not shown in the interface.

The horror transition is abrupt. Where supported, a user's door click requests fullscreen and starts playback with the video's original audio. The full frame stays visible at its natural aspect ratio. After playback, the final frame remains for 2.4 seconds before the screen turns black. A subdued intentional restart appears only after five seconds in darkness.

## Accessibility and responsiveness

Choice controls are keyboard-operable and have visible focus styling. Image alternatives describe the supplied characters. The layout adapts from three desktop doors to full-width mobile rows, and reduced-motion settings disable ambient movement and minimize transitions.

## Media boundary

The dialogue and captions in jumpscare 1 are inseparable from the supplied files in their current form: visible captions are part of the image, and speech shares a mixed stereo audio stream with other sound. This project preserves that content in the original and browser-compatible playback copy instead of cropping, masking, or muting it.
