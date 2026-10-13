# Asset inventory and media verification

## Supplied originals

`original-assets/` contains the four original files from the provided archive. These remain unmodified:

- ` elgato(The Fortune-teller).jpeg` — 554×554 supplied Elgato kitten photo.
- `Reference image.jpg` — 736×1104 supplied character/sticker reference sheet.
- `Jumpscare-1.mp4` — HEVC video, 1080×1920 at 30 fps, AAC stereo at 48 kHz, duration 23.082667 seconds.
- `Jumpscare2.mp4` — H.264 video, 854×480 at 30000/1001 fps, AAC stereo at 44.1 kHz, duration 6.222993 seconds.

The contents are preserved in the `original-assets/` directory; the app serves deployment copies from `public/`.

## App asset mapping

- `public/elgato.jpeg` — byte-identical copy of the supplied Elgato photo.
- `public/greeter.png` — existing panda image derivative from the supplied reference sheet, used in the opening scenes.
- `public/plant.png`, `public/mug.png` — existing derivatives from the reference sheet. They are retained unchanged but intentionally not rendered because the crops include fragments of nearby artwork and lettering.
- `public/jumpscare-1.mp4` — H.264 playback derivative of original video 1. The image is re-encoded without cropping, subtitles, or overlays; the existing AAC audio stream is stream-copied. It retains the original 1080×1920 framing and approximately 23.08-second duration.
- `public/jumpscare-2.mp4` — supplied H.264 video 2, copied for public serving.
- `public/favicon.svg`, `public/icons.svg` — existing project files.

All runtime asset references use Vite's `BASE_URL` so relative asset paths work from a root domain or a hosted project subpath.

## Jumpscare 1 dialogue and captions

The MP4 contains no separate subtitle/caption stream. The visible captions and embedded social watermark are rasterized into the picture. Its spoken commentary is mixed into a single stereo AAC stream; there are no isolated dialogue or sound-effect tracks. Speech recognition found spoken commentary across much of the 23-second clip. A clean removal that preserves sound effects, timing, image framing, and moving content is not available from the supplied mix without introducing significant artifacts. Therefore both the source file and public playback copy retain the original content. The file was not muted, cropped, masked, or overwritten.

## Integrity checks

The supplied asset SHA-256 values recorded before editing:

- Elgato photo: `d5d20b4aafd672fa127f7a1271e962c53bdf9dec871a110f828a7beefa3cba0c`
- Jumpscare 1 original: `9bea7fe1957525449e8307c3129be4f704b7a4a810431055010f09d79b181483`
- Jumpscare 2 original: `0fc78927b49f5ac2f085872268e33b0ef2606277810bde0610e30c887f134fb8`
- Reference sheet: `1bc6e6da8991fab10314ce272ce9d7a942e2ea5bc3fc84712a8c91bff716b097`
