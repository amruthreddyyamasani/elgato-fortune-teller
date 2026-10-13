# QA report

## Automated project checks

A clean install from the delivered ZIP completed with `npm ci` (30 packages, audit reported 0 vulnerabilities). `npm run build` passed TypeScript project compilation and Vite 8.3.4 production bundling. `npm run lint` passed with zero warnings and zero errors. There is no standalone unit-test or E2E test script in `package.json`; browser coverage was run with a temporary Playwright harness outside the project.

## Browser run

The final production build was exercised in headless Chromium at 1440×1000 and 390×844. The flow passed through both greeting answers, both fortune questions, the supplied Elgato photo, the cheerful prediction, all three doors, and Door 1’s retry action back to door selection. No browser console errors or page exceptions were observed.

Both videos were played through to their `ended` events from the door interaction. Video 1 reported 1080×1920, 23.082688 seconds; video 2 reported 854×480, 6.222993 seconds. For both, playback stayed unmuted at nonzero volume, `object-fit: contain` was applied, and the Fullscreen API was available and active in this Chromium run. The final-frame canvas matched the video's intrinsic dimensions. The freeze, black screen, delayed restart prompt, and intentional restart all completed.

The 390px layout had document width 390px with no horizontal overflow. Door cards stacked in one column with equal widths. Loaded image assets reported nonzero natural dimensions; all public image, favicon, and video requests returned HTTP 200 from the preview.

## Media integrity and limitations

The AAC audio stream in the H.264 playback derivative of jumpscare 1 has the same SHA-256 bitstream hash as the original audio stream: `b2686f29ea40db75f014a8e21aae40cf49d12b27af7e7a0080d9834354aa4eef`. The original HEVC file remains unchanged. Jumpscare 1 has no separate subtitle stream; captions are burned into the image and commentary is mixed with the other audio. Clean removal without crop, mask, or audio damage was not feasible, so the supplied captions and dialogue remain.

The browser run used Linux headless Chromium rather than physical iOS/Android devices or a matrix of Firefox/Safari/Edge versions. The audio stream was confirmed present, unmuted, and played by the browser; it was not subjectively auditioned on physical speakers. Fullscreen remains dependent on each visitor's browser and device policies.
