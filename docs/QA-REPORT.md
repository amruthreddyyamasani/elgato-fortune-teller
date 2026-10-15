# QA report — Door 2 media update

## Install and project checks

A clean `npm ci` installed 30 packages and reported zero vulnerabilities. `npm run lint` passed with zero warnings and errors. `npm run build` passed TypeScript project compilation and Vite 8.3.4 production bundling. The repository has no permanent unit/E2E script; the browser checks below used a temporary Playwright harness outside the project.

## Production-browser run

The built site was exercised in headless Chromium on desktop (1440×1000) and mobile (390×844). Door 1's **Try again** returned directly to door selection. The greeting, both responses, fortune sequence, character images, and all three doors loaded. No page exceptions or browser console errors occurred.

Door 2 loaded `/door-2.mp4` at 854×480, 30000/1001 fps, 2.809002 seconds, with H.264 video and stereo AAC. The input audio was non-silent (FFmpeg measured −7.1 dB mean and 0.0 dB peak); the browser reported `muted=false` and volume 1. Playback began from the door click, fullscreen was both supported and active in this Chromium run, and `object-fit: contain` was applied. After the first full playback, its loop remained active for 5.0135 seconds, then the displayed frame was paused and captured at 854×480. The configured freeze hold is 2.4 seconds; the observed transition in the headless run was approximately 2.81 seconds after the freeze state was detected, followed by black and the delayed intentional-restart control.

Door 3 continued to load the original `/jumpscare-2.mp4` at 854×480 and 6.222993 seconds. It remained unmuted, did not loop, and followed the original freeze/black/restart sequence. Its original and public playback files retain matching SHA-256 `0fc78927b49f5ac2f085872268e33b0ef2606277810bde0610e30c887f134fb8`.

At the mobile viewport there was no horizontal overflow; all images loaded and the three door cards remained equal width. Runtime assets returned successful HTTP 200 or valid byte-range HTTP 206 responses. The retired `public/jumpscare-1.mp4` was not requested.

A separate negative-path browser run deliberately returned HTTP 404 for the Door 2 clip. The stage displayed its explicit error and retry action, kept the video paused and unmuted, and did not silently skip to the ending. A simulated fullscreen denial still made one fullscreen request and left the fixed stage covering the full 390×844 viewport.

## Asset integrity and limitations

The new Door 2 source in `original-assets/door-2-supplied.mp4` and its runtime copy `public/door-2.mp4` are byte-identical to the uploaded file (SHA-256 `a0cd781269c34842eb1bf63ef7f195f1551168b7d01ae4870a5c8a93ed527d43`). No conversion or re-encoding was needed. The original archive's `original-assets/Jumpscare-1.mp4` remains unchanged; only its obsolete public playback derivative was removed.

Testing used Linux headless Chromium, not physical mobile devices or Firefox/Safari/Edge. The audio track, non-silent signal level, and browser unmuted playback state were checked, but playback was not subjectively auditioned on physical speakers. Fullscreen succeeded in Chromium; other browser/device policies may decline it, in which case the fixed viewport fallback remains available. No Vercel production site was tested: the existing Vercel project was not configured, and project creation previously returned 403 permission denied.
