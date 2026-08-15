# PROJECT KNOWLEDGE BASE

**Project:** `glad-you-were-born`
**Canonical recipient:** `Sassy`
**Canonical sender:** `user` (`USER` only for the visual branch label)

## OVERVIEW

Static single-page birthday experience built with plain HTML, vanilla browser
JavaScript, custom CSS, local media, Google Fonts, and Material Symbols. It has
no package manager, build pipeline, framework, or test runner.

## STRUCTURE

```text
glad-you-were-born/
├── index.html          # only runtime entry point
├── js/script.js        # narrative state machine and interactions
├── css/styles.css      # production styles and animations
├── assets/images/      # room, balloon, banner, and gift artwork
├── assets/audio/       # three local soundtrack files
├── README.md           # public setup and usage
├── CONTRIBUTING.md     # contributor workflow
├── ASSET-LICENSES.md   # provenance and redistribution notes
└── PRD.md              # current product requirements
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| App startup | `index.html`, `js/script.js:1416` | `DOMContentLoaded` creates `ScreenManager` |
| Narrative flow | `js/script.js:44` | `SCREENS` order is the user journey |
| Main controller | `js/script.js:343` | `ScreenManager` owns transitions, audio, and finale |
| DOM contracts | `index.html` + `js/script.js` | IDs are hard dependencies; update both together |
| Typewriter finale | `js/script.js:286`, `js/script.js:1344` | Sentence list and sequence runner |
| Letter balloons | `js/script.js:295`, `js/script.js:1164` | Exactly five letters spelling `SASSY` |
| Visual system | `css/styles.css` | Tokens, components, animation, and responsive rules |
| Product intent | `PRD.md` | Current narrative and release decisions |

## CODE MAP

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `SCREENS` | constant array | `js/script.js:44` | Defines every narrative state |
| `TYPEWRITER_SENTENCES` | constant array | `js/script.js:286` | Staged finale copy |
| `BALLOON_LETTERS` | constant array | `js/script.js:295` | `SASSY` letter data |
| `$` | function | `js/script.js:311` | Central DOM lookup helper |
| `ScreenManager` | class | `js/script.js:343` | Transition orchestration |
| `startTypewriterSequence` | async function | `js/script.js:1344` | Runs the message reveal |
| `showUserMessage` | function | `js/script.js:1370` | Switches finale to message mode |

## CONVENTIONS

- Run locally with `python3 -m http.server 8000`; HTTP is preferred over a
  direct file URL.
- Keep `index.html` as the only runtime entry point and keep new story steps in
  `SCREENS`.
- Preserve DOM IDs, especially `choice-user`, `user-message-btn`, and
  `user-branch`; JavaScript queries them directly.
- Keep media paths relative under `assets/` and record provenance in
  `ASSET-LICENSES.md`.
- Keep active production styles in `css/styles.css`.
- User-facing story copy is Indonesian; use `Sassy` and `user` consistently.
- The page stores no personal data.

## ANTI-PATTERNS

- Do not add npm, a bundler, a framework, or a test runner.
- Do not change a DOM ID in one file without updating its counterpart.
- Do not scatter narrative steps across ad-hoc flags; extend `SCREENS`.
- Do not replace relative local media paths with unapproved external assets.
- Do not edit `assets/images/ruang-pesta.webp`; its embedded text is an
  approved and documented artwork limitation.

## UNIQUE STYLES

- Cinematic state-machine narrative rather than a scroll-based page.
- Handcrafted CSS with glow, typewriter, banner, balloon, and finale motion.
- Finale logic coordinates text, cake, balloons, and audio timing.

## COMMANDS

```bash
# run locally
python3 -m http.server 8000

# syntax and whitespace checks
node --check js/script.js
git diff --check
```

## NOTES

- The wrong-song state loops `we fell in love in october` by `girl in red`.
- The corrected state plays `Happy Birthday` by `Stevie Wonder`; its end
  starts the looping `Menjadi-Rumahmu` track by `Orang Spesial`.
- The balloon release creates 13 decorative balloons; the finale creates five
  letter balloons spelling `SASSY` above the cake.
- Browser autoplay policy may block audio; the runtime exposes a visible
  status message for that path.
- The owner confirmed redistribution permission for local media. Google Fonts
  and Material Symbols remain external resources under upstream terms.
