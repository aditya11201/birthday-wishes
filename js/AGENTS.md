# JS KNOWLEDGE BASE

## OVERVIEW

`script.js` is the complete browser runtime: story data, state transitions, DOM
orchestration, audio, balloons, and finale effects for `glad-you-were-born`.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Asset registry | `script.js:20` | Room and balloon image paths |
| Story data | `script.js:44` | `SCREENS` array; order matters |
| Main controller | `script.js:343` | `ScreenManager` class |
| Screen transitions | `script.js:409`, `script.js:664` | Lamp switch and generic transitions |
| Audio transitions | `script.js:768` onward | Wrong song → birthday song → follow-up loop |
| Balloon creation | `script.js:1130`, `script.js:1164` | 13 simple balloons and five letter balloons |
| Finale transition | `script.js:1195`, `script.js:1225` | Convergence and message-button reveal |
| Typewriter flow | `script.js:1344`, `script.js:1370` | Staged message and `showUserMessage` |
| Startup hooks | `script.js:1416` | App bootstrap and message-button binding |

## RUNTIME CONTRACTS

- `choice-kue` routes to `unlit-cake`.
- `choice-user` routes to `user-branch`, which automatically advances to the
  cake route.
- `user-message-btn` is bound to `showUserMessage()`.
- The finale invariant is `const BALLOON_LETTERS = [..."SASSY"];`; it drives
  exactly five letter nodes.
- `user-branch` is the route ID; `USER` is the visible uppercase label.

## CONVENTIONS

- Edit `SCREENS` first when changing flow, copy, icons, or button labels.
- Treat `SCREENS` IDs as semantic route markers; later logic searches by them.
- Access DOM elements through `$()` and keep new runtime nodes addressable.
- Preserve the `isTransitioning` guard in transition methods.
- Create audio elements lazily and append them to `document.body`.
- Keep finale helpers as standalone functions below the class.
- Keep relative `assets/...` paths and update `ASSET-LICENSES.md` for asset
  changes.

## ANTI-PATTERNS

- Do not hardcode narrative branches outside `SCREENS` unless they are
  finale-specific.
- Do not rename `choice-kue`, `choice-user`, `user-message-btn`, or other DOM
  contracts without updating `index.html`.
- Do not add modular imports; this is a single-file browser script.
- Do not remove timing delays casually; reveals depend on their sequencing.
- Do not replace local asset paths with external URLs without an approved
  documentation and provenance update.

## GOTCHAS

- `ScreenManager.transitionTo()` also handles audio, widget, cake, balloon, and
  banner side effects.
- The wrong track is `girl-in-red-we-fell-in-love-in-october.mp3`; the correct
  track is `happy-birthday-stevie-wonder.mp3`; the follow-up loop is
  `menjadi-rumahmu.mp3`.
- Browser autoplay rejection is surfaced through `showAudioStatus()`.
- `showUserMessage()` expects the finale letter-balloon nodes to exist before
  starting the typewriter sequence.
