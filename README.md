# Elgato’s Little Fortune Room

A cute, interactive fortune-telling experience built with React and Vite, featuring the character and reference artwork supplied with the project.

## Experience

A welcoming sequence invites visitors to answer a couple of lighthearted prompts and receive an upbeat fortune from Elgato. The experience is client-side, responsive, and designed for desktop and mobile browsers.

## Requirements

- Node.js **20.19+** or **22.12+**
- npm **10+**

## Install and run

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). No API keys or backend services are required.

## Build and check

```bash
npm run lint
npm run build
npm run preview
```

`npm run build` type-checks the TypeScript project and creates a production build in `dist/`. `npm run preview` serves that build locally. There is no dedicated unit-test or E2E runner in `package.json`; supporting project and QA notes are in `docs/`.

## Deployment

The project emits relative asset URLs (`base: './'`), so it works at a domain root or under a repository subpath. Vercel settings for the repository are:

- Framework preset: **Vite**
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`

After the Git repository is connected, Vercel can automatically deploy production changes pushed to `main`.

## Assets

- Original supplied assets are retained byte-for-byte in `original-assets/`.
- Runtime images and media are sourced from the supplied project artwork and files; no stock or generated character imagery is used.
- `public/` contains the runtime copies referenced by the app. A small number of imperfect reference-sheet crops are kept for provenance but are not rendered.
- The app requires no environment variables. `.env.example` is informational only; do not commit local `.env` files or credentials.

## Project map

```text
Fate/
├── .env.example
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
├── index.html
├── vite.config.ts
├── tsconfig*.json
├── original-assets/          # byte-for-byte supplied originals
├── public/                   # runtime assets
├── src/
│   ├── App.tsx               # experience flow and scene state
│   ├── App.css
│   ├── index.css              # theme, layouts, responsive rules, motion
│   ├── main.tsx
│   └── components/
└── docs/                     # flow, screens, design, assets, QA, components
```
