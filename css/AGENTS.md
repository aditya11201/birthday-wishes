# CSS KNOWLEDGE BASE

## OVERVIEW

Production styling lives solely in `styles.css`: tokens, layout, glass buttons,
overlays, the CSS cake, balloons, Spotify card, finale, and animation keyframes.
The active `styles.css` file is the only cake styling source used by the page.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Design tokens | `styles.css:9` | Color, font, and easing variables |
| Main layout | `styles.css:108`, `styles.css:147` | App canvas and content area |
| Typography system | `styles.css:167` | Subtitle, title, and footer rules |
| Button styling | `styles.css:227`, `styles.css:338` | Glass buttons and waiting state |
| Cake styling | `styles.css:519` | Active cake container and CSS cake rules |
| Balloon visuals | `styles.css:731` onward | Decorative and letter balloons |
| Typewriter/finale | `styles.css:814`, `styles.css:1116` | Typewriter, final message, and finale mode |
| Motion primitives | `styles.css:936` onward | Typing, bounce, banner, flame, and cursor keyframes |

## CONVENTIONS

- CSS custom properties in `:root` are the local design-token source of truth.
- `styles.css` is the sole production source for cake styling; keep cake,
  frosting, candle, and flame rules there.
- JS toggles classes and inline styles; keep selectors aligned with runtime
  behavior.
- Responsive rules are inline with sections via `@media`, not split into
  separate files.
- Visual naming is component-first (`glass-button`, `letter-balloon`,
  `spotify-card`).

## ANTI-PATTERNS

- Do not delete animation keyframes that appear unused without checking
  JS-triggered states.
- Do not create a second or uncompiled cake stylesheet; update the active
  `styles.css` rules instead.
- Do not rename state classes such as `.active`, `.converged`, `.visible`, or
  `.btn-waiting` without JS review.
- Do not assume Tailwind covers these styles; most behavior is bespoke CSS here.

## GOTCHAS

- Several elements start hidden and become visible only through JS class toggles.
- Mobile behavior is handled near the bottom of the file; check desktop and
  small-screen media queries.
- Finale layout overrides live at the end of the file and can trump earlier
  section rules.
