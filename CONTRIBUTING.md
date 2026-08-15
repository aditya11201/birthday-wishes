# Contributing

Thanks for helping maintain `glad-you-were-born`. Keep changes small, reviewable,
and compatible with the file-based browser runtime.

## Branches

Use one of these prefixes:

- `feat/*` for user-facing behavior or copy.
- `fix/*` for corrections.
- `chore/*` for maintenance and documentation.

Do not work directly on `main`. Open a pull request from a topic branch.

## Keep the project no-build

- Use plain HTML, CSS, and browser JavaScript.
- Do not add npm packages, a bundler, a framework, or a test runner.
- Keep `index.html` as the only runtime entry point.
- Preserve relative paths under `assets/` and keep DOM IDs synchronized with
  `js/script.js`.

## Copy and asset rules

- The canonical recipient is `Sassy`; the sender is `user`. Use `USER` only for
  the existing visual branch label.
- Keep the finale at exactly five letter balloons spelling `SASSY`.
- Update `PRD.md` and `README.md` whenever copy or runtime behavior changes.
- Record new or changed local assets in `ASSET-LICENSES.md`.
- Do not retouch `assets/images/ruang-pesta.webp`; its embedded text is an
  approved, documented artwork limitation.

## Validation

Before opening a pull request:

```bash
node --check js/script.js
git diff --check
python3 -m http.server 8000
```

Run this exact stale-token scan from the project root:

```bash
git grep -n -E 'Stas'"ya|STAS"'YA|Anne'"sty|ANN"'ESTY|Ad'"it|AD"'IT|Birthday'"SurpriseWeb|birthday-"'wishes' \
  -- . \
  ':(exclude)assets/images/ruang-pesta.webp' \
  ':(exclude)docs/superpowers/specs/**'
```

The adjacent shell-quoted pieces form one regex argument, so this command does
not match its own documented pattern. `git grep` does not search Git metadata;
the pathspecs also exclude the approved binary party-room artwork and the
migration-spec directory. The command must return no matches in active files.

### Browser smoke checklist

- [ ] Serve over HTTP and complete the light, music, decoration, cake, balloon,
      banner, and finale sequence.
- [ ] Exercise both `KUE` and `USER` branches.
- [ ] Confirm the wrong-song, corrected-song, and follow-up soundtrack states.
- [ ] Confirm blocked audio produces visible status text.
- [ ] Navigate with the keyboard and verify visible focus and disabled states.
- [ ] Test reduced motion at 375px, 768px, 1024px, and 1440px widths.
- [ ] Check the browser console and network panel for errors or missing assets.

## Pull requests

Include:

1. A short summary of the behavior or documentation change.
2. The validation commands and browser checks you ran.
3. Any known limitation, especially changes involving supplied artwork or
   external runtime resources.
