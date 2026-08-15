# glad-you-were-born

An interactive, no-build birthday experience for Sassy, made with plain HTML,
CSS, and browser JavaScript.

## Features

- Cinematic, click-driven story flow with typewriter and transition effects.
- Local image and audio assets with no personal-data storage.
- A cake reveal, 13 decorative balloons, a birthday banner, and five letter
  balloons spelling `SASSY`.
- Responsive layout, keyboard-visible focus, and reduced-motion support.

## Project structure

```text
glad-you-were-born/
├── index.html          # only runtime entry point
├── js/script.js        # narrative state machine and interactions
├── css/styles.css      # production styles and animations
├── assets/images/      # room, balloon, banner, and gift artwork
├── assets/audio/       # three local soundtrack files
├── PRD.md              # current product requirements
├── ASSET-LICENSES.md   # asset provenance and redistribution notes
├── LICENSE             # MIT source license
└── CONTRIBUTING.md     # contributor workflow
```

There is no package manager, bundler, build step, or test runner.

## Run locally

Serve the project over HTTP so relative assets and browser media policies work
as they do in a deployment:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. Opening `index.html` directly may work for
some browsers, but a local HTTP server is preferred.

## How the experience works

1. Turn on the light, start the music, and correct the intentionally wrong
   track: `we fell in love in october` by `girl in red`.
2. The corrected track is `Happy Birthday` by `Stevie Wonder`.
3. When that track ends, the runtime starts looping `Menjadi-Rumahmu` by
   `Orang Spesial` and updates the now-playing card. The same correct-song
   audio `ended` handler shows the gift overlay; its gift button reveals
   `assets/images/leon-grace.webp`.
4. Decorate the room, choose `KUE` or `USER`, light the cake, and release the
   13 decorative balloons.
5. The banner appears before the finale converges exactly five letter balloons
   into the top-arc spelling `SASSY`.
6. Separately, `Pesan dari user` invokes `showUserMessage()`, which starts the
   typewriter message sequence after hiding the cake.

## Assets and browser limitations

- Runtime artwork and audio are local and documented in
  [`ASSET-LICENSES.md`](ASSET-LICENSES.md). Redistribution permission for the
  supplied local assets has been confirmed by the owner.
- Browser autoplay policy can reject audio playback. The page shows a visible
  status message and the user can try the action again.
- Google Fonts and Material Symbols are external runtime resources, so the
  final font or icon appearance can vary when the network is unavailable.
- The supplied party-room raster remains unchanged by approval. Its embedded
  text is an accepted artwork limitation and is intentionally preserved.
- The app stores no personal data.

## Validation

Run the static checks available in the project:

```bash
node --check js/script.js
git diff --check
```

Also run the release stale-identity scan and complete the browser smoke
checklist in [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a change. Keep the
runtime file-based and update `PRD.md` and this README when copy or behavior
changes.

## License

Project source code and documentation use the [MIT License](LICENSE). Runtime
media and external resources have separate notes in
[`ASSET-LICENSES.md`](ASSET-LICENSES.md).
