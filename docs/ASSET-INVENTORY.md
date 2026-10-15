# Asset inventory and media verification

## Supplied originals

`original-assets/` preserves the four files from the original project archive and the newly supplied Door 2 clip. The supplied sources are not overwritten or re-encoded.

- ` elgato(The Fortune-teller).jpeg` — 554×554 supplied Elgato kitten photo.
- `Reference image.jpg` — 736×1104 supplied character/sticker reference sheet.
- `Jumpscare-1.mp4` — original project video, HEVC 1080×1920 at 30 fps, stereo AAC at 48 kHz, 23.082667 seconds. Retained unchanged; no longer used by Door 2.
- `Jumpscare2.mp4` — Door 3 video, H.264 854×480 at 30000/1001 fps, stereo AAC at 44.1 kHz, 6.222993 seconds. Retained unchanged.
- `door-2-supplied.mp4` — newly supplied Door 2 source, H.264 854×480 at 30000/1001 fps, stereo AAC at 44.1 kHz, 2.809002 seconds. SHA-256: `a0cd781269c34842eb1bf63ef7f195f1551168b7d01ae4870a5c8a93ed527d43`.

## App asset mapping

- `public/elgato.jpeg` — byte-identical copy of the supplied Elgato photo.
- `public/greeter.png` — existing panda image derivative from the supplied reference sheet, used in the opening scenes.
- `public/plant.png`, `public/mug.png` — existing derivatives from the reference sheet. Retained unchanged but not rendered because their crops include fragments of nearby artwork and lettering.
- `public/door-2.mp4` — byte-identical copy of `original-assets/door-2-supplied.mp4`. Its H.264/AAC format is browser-compatible, so no conversion or remuxing was needed. After the first full play, the player repeats this video for a five-second window, then freezes the displayed frame for 2.4 seconds before black.
- `public/jumpscare-2.mp4` — byte-identical copy of the original Door 3 video. Door 3 playback and timing remain unchanged.
- The obsolete `public/jumpscare-1.mp4` derivative has been removed after the application reference was changed. `original-assets/Jumpscare-1.mp4` is preserved unchanged.
- `public/favicon.svg`, `public/icons.svg` — existing project files.

All runtime asset references use Vite's `BASE_URL` so relative asset paths work from a root domain or a hosted project subpath.

## Retained original-video note

The original archive's `Jumpscare-1.mp4` has no separate subtitle/caption stream. Its visible captions are rasterized into the picture and its spoken commentary is mixed into one stereo AAC stream. That original remains unchanged in `original-assets/`; it is no longer used for Door 2 playback.

## Integrity checks

- New Door 2 source, preserved original, and runtime copy share SHA-256 `a0cd781269c34842eb1bf63ef7f195f1551168b7d01ae4870a5c8a93ed527d43`.
- Door 3 original and runtime copy share SHA-256 `0fc78927b49f5ac2f085872268e33b0ef2606277810bde0610e30c887f134fb8`.
- Original Door 2 source `Jumpscare-1.mp4` remains SHA-256 `9bea7fe1957525449e8307c3129be4f704b7a4a810431055010f09d79b181483`.
