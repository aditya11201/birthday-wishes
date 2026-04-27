# JS KNOWLEDGE BASE

## OVERVIEW
`script.js` is the whole runtime: data model, controller, DOM orchestration, audio, and finale effects.

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Story data | `script.js:41` | `SCREENS` array; order matters |
| Asset registry | `script.js:20` | Background + balloon image paths |
| Main controller | `script.js:345` | `ScreenManager` class |
| Screen-to-screen animation | `script.js:398`, `script.js:555` | Lamp switch + generic transitions |
| Audio transitions | `script.js:717` onward | Wrong song → birthday song → finale loop |
| Balloon creation | `script.js:1130`, `script.js:1160` | Simple + letter balloons |
| Finale text flow | `script.js:1219`, `script.js:1251`, `script.js:1277` | Typewriter + reveal |
| Startup hooks | `script.js:1325` | App bootstrap + message button binding |

## CONVENTIONS
- Prefer editing `SCREENS` first when changing flow, copy, icons, or button labels.
- `id` values in `SCREENS` are semantic route markers; later logic searches by them.
- DOM access goes through `$()` for IDs; keep new runtime nodes addressable.
- Transition methods guard with `isTransitioning`; preserve that pattern.
- Audio elements are created lazily and appended to `document.body`.
- Finale helpers are standalone functions below the class, not class methods.

## ANTI-PATTERNS
- Do not hardcode new branches outside `SCREENS` unless truly finale-specific.
- Do not rename `choice-kue`, `choice-adit`, `adit-message-btn`, or other IDs without HTML updates.
- Do not assume modular imports exist; this is a single-file browser script.
- Do not remove timing delays casually; many reveals depend on sequencing.
- Do not replace relative `assets/...` paths with external URLs unless all references are updated.

## GOTCHAS
- `ScreenManager.transitionTo()` also handles audio/widget/cake/banner side effects.
- `showAditMessage()` expects finale balloon nodes to already exist.
- `FINAL_MESSAGE` and `TYPEWRITER_SENTENCES` duplicate similar content on purpose for different reveal modes.
