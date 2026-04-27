# CSS KNOWLEDGE BASE

## OVERVIEW
Production styling lives in `styles.css`: tokens, layout, glass buttons, overlays, cake, balloons, Spotify card, finale, and all animation keyframes.

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Design tokens | `styles.css:9` | Color, font, easing variables |
| Main layout | `styles.css:99`, `styles.css:138` | App canvas + content area |
| Typography system | `styles.css:154` | Subtitle/title/footer text rules |
| Button styling | `styles.css:214` | `.glass-button*`, waiting state |
| Balloon visuals | `styles.css:672` onward | Decorative + letter balloons |
| Typewriter/finale | `styles.css:755` onward | Typewriter area + finale mode |
| Motion primitives | `styles.css:905` onward | Keyframes for typing, bounce, banner, fire |
| Legacy cake source | `cake.less` | Reference/original flame cake styling |

## CONVENTIONS
- CSS custom properties in `:root` are the local design token source of truth.
- JS toggles classes/inline styles; keep selectors aligned with runtime behavior.
- Responsive rules are inline with sections via `@media`, not split into separate files.
- Visual naming is component-first (`glass-button`, `letter-balloon`, `spotify-card`).
- `cake.less` is archival/experimental; `styles.css` is what the page actually loads.

## ANTI-PATTERNS
- Do not delete animation keyframes that appear unused without checking JS-triggered states.
- Do not move production rules into `cake.less`; it is not loaded by `index.html`.
- Do not rename state classes like `.active`, `.converged`, `.visible`, `.btn-waiting` without JS review.
- Do not assume Tailwind covers these styles; most behavior is bespoke CSS here.

## GOTCHAS
- Several elements start hidden and become visible only through JS class toggles.
- Mobile behavior is handled near the bottom of the file; check both desktop and small-screen media queries.
- Finale layout overrides live at the end of the file and can trump earlier section rules.
