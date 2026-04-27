# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-25
**Commit:** fce2ab6
**Branch:** main

## OVERVIEW
Static single-page birthday experience. Plain HTML + vanilla JS + custom CSS, with Tailwind loaded from CDN and no npm/build pipeline.

## STRUCTURE
```text
birthday-wishes/
├── index.html          # only runtime HTML entry
├── js/
│   └── script.js       # full interaction/state machine
├── css/
│   ├── styles.css      # production styles + animations
│   └── cake.less       # legacy/reference cake styling source
├── assets/
│   ├── images/         # backgrounds, banner, balloon art, gift image
│   └── audio/          # wrong-song, birthday song, finale audio
├── raw/                # ignored prototype/archive snapshots
└── PRD.md              # original product requirements
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| App startup | `index.html`, `js/script.js:1325` | `DOMContentLoaded` creates `ScreenManager` |
| Narrative flow | `js/script.js:41` | `SCREENS` array order is the user journey |
| Main controller | `js/script.js:345` | `ScreenManager` owns transitions, audio, finale |
| DOM contracts | `index.html` + `js/script.js` | IDs are hard dependencies; rename in both places |
| Typewriter finale | `js/script.js:283`, `js/script.js:1251` | Sentence list + sequence runner |
| Visual system | `css/styles.css` | Tokens, component styles, animations, responsive rules |
| Cake styling history | `css/cake.less` | Not wired into runtime build |
| Product intent | `PRD.md` | Good for narrative/spec checks |
| Prototype history | `raw/*` | Archived iterations, not production source of truth |

## CODE MAP
| Symbol | Type | Location | Refs | Role |
|--------|------|----------|------|------|
| `SCREENS` | constant array | `js/script.js:41` | many internal reads | Defines every narrative state |
| `TYPEWRITER_SENTENCES` | constant array | `js/script.js:283` | typewriter flow | Finale message staging |
| `BALLOON_LETTERS` | constant array | `js/script.js:295` | letter balloon creation | STASYA/ANNESTY reveal |
| `$` | function | `js/script.js:333` | used throughout | Central DOM lookup helper |
| `ScreenManager` | class | `js/script.js:345` | app entrypoint | Transition orchestration |
| `startTypewriterSequence` | async function | `js/script.js:1251` | called from finale path | Runs message reveal |
| `showAditMessage` | function | `js/script.js:1277` | click handler | Swaps finale into message mode |

## CONVENTIONS
- Runtime is file-based: open `index.html`; no build, bundler, or package scripts.
- Keep IDs stable. JS queries many elements directly via `getElementById` helper.
- New story steps belong in `SCREENS`, not scattered boolean flags.
- Audio/image paths are relative string literals under `assets/`.
- Tailwind config is inline in `index.html`; custom styling lives in `css/styles.css`.
- Project language is Indonesian in the user-facing story copy.

## ANTI-PATTERNS (THIS PROJECT)
- Do not treat `raw/` as production code; `.gitignore` excludes it.
- Do not assume tooling exists; there is no `package.json`, test runner, linter, or CI.
- Do not change DOM IDs in HTML without updating JS references.
- Do not add a second runtime entry page unless you also redefine startup/documentation.
- Do not rely on `cake.less` being compiled automatically.

## UNIQUE STYLES
- Cinematic state-machine narrative rather than section-by-section scroll page.
- Mixed styling model: Tailwind CDN utilities in HTML + large handcrafted CSS file.
- Heavy animation vocabulary: glow, typewriter, banner drop, balloon bounce, finale convergence.
- Finale logic couples text, cake, balloons, and audio timing tightly.

## COMMANDS
```bash
# run locally
open index.html

# alternative simple local server if needed
python -m http.server 8000

# inspect tracked files
git ls-files
```

## NOTES
- LSP TypeScript codemap was unavailable because the repo has no local TypeScript install.
- `raw/` contains numbered design snapshots (`code.html`, `screen.png`, optional `DESIGN.md`).
- `assets/audio/` drives the story timing; missing files will break narrative progression.
- `index.html` embeds the Tailwind theme config instead of using a config file.
