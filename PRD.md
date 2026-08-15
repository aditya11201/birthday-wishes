# Product Requirements Document: glad-you-were-born

## Product intent

`glad-you-were-born` is a cinematic, single-page birthday experience for
`Sassy`. The sender is represented as `user`; `USER` is reserved for the
existing visual branch label.

## Goals

- Deliver a memorable, interactive birthday greeting.
- Keep the experience responsive, keyboard-usable, and easy to run without a
  build system.
- Preserve the local story assets and the existing state-machine narrative.
- Avoid collecting or storing personal data.

## User stories

1. As Sassy, I can follow a guided sequence of lights, music, decoration, and
   birthday reveals.
2. As a user, I can use buttons and keyboard controls to move through the story.
3. As a user, I can choose the `KUE` or `USER` branch before the cake reveal.
4. As Sassy, I receive a final message, gift reveal, and `SASSY` balloon
   spelling.

## Functional requirements

### Narrative flow

1. **Welcome:** Show the dark room and the invitation to turn on the light.
2. **Lights and music:** Animate the light transition, then ask the user to
   start the soundtrack.
3. **Decoration:** Show the decorated party room after the decoration action.
4. **Choice:** `choice-kue` opens the unlit-cake route. `choice-user` opens
   `user-branch`, which automatically advances to the unlit cake.
5. **Cake:** Let the user light the candle, then automatically advance to the
   balloon prompt.
6. **Balloons and banner:** `Lepas Balonnya` creates 13 simple decorative
   balloons. The birthday action reveals the banner and moves to the finale.
7. **Finale:** Create exactly five letter balloons spelling `SASSY` in one
   top arc above the cake.
8. **Gift overlay:** The correct-song audio `ended` handler starts the follow-up
   track, updates the now-playing card, and shows the gift overlay. Its gift
   button reveals `assets/images/leon-grace.webp`.
9. **Message:** Separately, `user-message-btn` invokes `showUserMessage`, which
   hides the cake and starts the staged typewriter sequence.

### Audio behavior

- The wrong-song state plays and loops
  `assets/audio/girl-in-red-we-fell-in-love-in-october.mp3`; the now-playing
  card shows `we fell in love in october` by `girl in red`.
- The corrected state plays
  `assets/audio/happy-birthday-stevie-wonder.mp3`; the card shows `Happy
  Birthday` by `Stevie Wonder`.
- When the corrected track ends, the runtime starts looping
  `assets/audio/menjadi-rumahmu.mp3` and shows `Menjadi-Rumahmu` by `Orang
  Spesial`.
- The correct-song audio `ended` handler also shows the gift overlay and binds
  its gift button to reveal `assets/images/leon-grace.webp`; this does not start
  the typewriter sequence.
- Rejected playback shows a visible status message because browser autoplay
  policy may block audio.

## Non-functional requirements

- **Runtime:** Keep `index.html` as the only entry point and use plain HTML,
  CSS, and browser JavaScript. Do not add npm, a bundler, a framework, or a
  test runner.
- **Assets:** Keep runtime paths relative under `assets/`. External Google
  Fonts and Material Symbols may load from their upstream services.
- **Accessibility:** Preserve semantic buttons, visible focus, live status
  announcements, keyboard activation, and reduced-motion behavior.
- **Responsive design:** Test the story at 375px, 768px, 1024px, and 1440px.
- **Privacy:** Store no personal data in the page or browser storage.

## Release decisions

- The owner has confirmed permission to redistribute the supplied local image
  and audio assets; see [`ASSET-LICENSES.md`](ASSET-LICENSES.md).
- `assets/images/ruang-pesta.webp` remains unchanged by approval. Its embedded
  text is an accepted visual limitation and is intentionally documented rather
  than retouched.
- Source code and documentation use the MIT License. External fonts and icons
  remain subject to their upstream terms.
