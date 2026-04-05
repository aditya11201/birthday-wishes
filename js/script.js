/**
 * ==========================================================================
 * BIRTHDAY WISHES — Stasya Annesty
 * Interactive Birthday Experience for Stasya Annesty
 * ==========================================================================
 *
 * Architecture: State Machine Pattern
 * Each screen in the narrative is a state object that defines:
 * - text content, button labels, icons
 * - background image, overlay style
 * - component visibility (spotify, cake, balloons, banner)
 * - custom actions triggered on button click
 */

"use strict";

/* --------------------------------------------------------------------------
   1. Asset URLs (Centralized)
   -------------------------------------------------------------------------- */
const ASSETS = Object.freeze({
  bg: {
    darkRoom: "assets/images/ruang-gelap.webp",
    litRoom: "assets/images/ruang-terang.webp",
    partyRoom: "assets/images/ruang-pesta.webp",
    finaleRoom: "assets/images/ruang-pesta.webp",
  },
  balloons: [
    "assets/images/b1.png",
    "assets/images/b2.png",
    "assets/images/b3.png",
    "assets/images/b4.png",
    "assets/images/b5.png",
    "assets/images/b6.png",
    "assets/images/b7.png",
  ],
});

/* --------------------------------------------------------------------------
   2. Screen Definitions (The Narrative)
   -------------------------------------------------------------------------- */
const SCREENS = [
  // ── State 1: Dark Room ─────────────────────────────────────────────────
  {
    id: "dark-room",
    subtitle: "",
    title: "Gelap nih.... Coba nyalain lampunya ya stasya",
    btnLabel: "Nyalakan Lampu",
    btnIcon: "lightbulb",
    btnIconFill: true,
    bg: ASSETS.bg.darkRoom,
    overlay: "none",
    animatePulse: true,
    showTyping: false,
  },
  // ── State 2: Lights on — auto-erase → auto-advance ────────────────────
  {
    id: "light-on",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "Wih keren, sekarang lampunya udah nyala nih...",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "light",
    showTyping: true,
    autoEraseAndAdvance: true,
  },
  // ── State 3: Play music prompt ─────────────────────────────────────────
  {
    id: "play-music",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "Nah sekarang coba kamu coba nyalain musik nya",
    btnLabel: "Putar Musik",
    btnIcon: "music_note",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "light",
    showTyping: true,
  },
  // ── State 4: Wrong song — Spotify appears, auto-advance ────────────────
  {
    id: "wrong-song",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "Nah musiknya udah nyala nih",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "light",
    showTyping: true,
    autoAdvance: true,
    spotify: {
      song: "we fell in love in october",
      artist: "girl in red",
    },
  },
  // ── State 5: Fix the song ──────────────────────────────────────────────
  {
    id: "fix-song",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "Eh salah deng harusnya lagunya yang tema ulang tahun",
    btnLabel: "Perbaiki lagunya",
    btnIcon: "music_note",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "light",
    showTyping: true,
    spotify: {
      song: "we fell in love in october",
      artist: "girl in red",
    },
  },
  // ── State 6: Correct song — auto-advance ───────────────────────────────
  {
    id: "correct-song",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "Nah Lagunya udah bener nih Stasyaaa",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "light",
    showTyping: true,
    autoAdvance: true,
    spotify: { song: "Happy Birthday", artist: "Stevie Wonder" },
  },
  // ── State 7: Spotify disappears — auto-advance ─────────────────────────
  {
    id: "decorate-prompt",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "Nah sekarang Stasyaaaa",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "light",
    showTyping: true,
    autoAdvance: true,
  },
  // ── State 8: Help decorate ─────────────────────────────────────────────
  {
    id: "help-decorate",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "Bantu akuu yaa buat dekor ruangannya",
    btnLabel: "Tambahkan dekorasi",
    btnIcon: "celebration",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "light",
    showTyping: true,
  },
  // ── State 9: Room decorated — auto-advance ───────────────
  {
    id: "room-decorated",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "Nah sekarang ruangannya udah bagus nih stas",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.partyRoom,
    overlay: "light",
    showTyping: true,
    autoAdvance: true,
  },
  // ── State 10: The Choice — "Kue" or "Adit" ────────────────────────────
  {
    id: "the-choice",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "Stasya biasanya kalau ultah kamu butuh apa sih?",
    bg: ASSETS.bg.partyRoom,
    overlay: "medium",
    showTyping: true,
    showChoices: true,
  },
  // ── State 10B: Adit branch — auto-advance to cake ──────────────────────
  {
    id: "adit-branch",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "NO NO YA STASYAA ADIT PUNYA AKUU ~KAREN CANGTIPP YANG NGOMONG",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.partyRoom,
    overlay: "medium",
    showTyping: true,
    autoEraseAndAdvance: true,
    autoAdvanceDelay: 3500,
  },
  // ── State 11: Unlit cake ───────────────────────────────────────────────
  {
    id: "unlit-cake",
    subtitle: "",
    title: "Nah Tinggal nyalain lilinnya",
    btnLabel: "Nyalakan Lilinnya",
    btnIcon: "local_fire_department",
    btnIconFill: true,
    bg: ASSETS.bg.partyRoom,
    overlay: "none",
    showTyping: true,
    showCake: true,
    cakeUnlit: true,
  },
  // ── State 12: Lit cake — auto-advance ──────────────────────────────────
  {
    id: "cake-lit",
    subtitle: "",
    title: "Wih geloo apinya sekarang dah nyala nih stas",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.partyRoom,
    overlay: "none",
    showTyping: true,
    showCake: true,
    cakeUnlit: false,
    autoAdvance: true,
  },
  // ── State 13: Release balloons prompt ──────────────────────────────────
  {
    id: "release-balloons",
    subtitle: "",
    title: "Nah sekarang tinggal terbang in balonnya",
    btnLabel: "Lepas Balonnya",
    btnIcon: "toys",
    btnIconFill: true,
    bg: ASSETS.bg.partyRoom,
    overlay: "none",
    showTyping: true,
    showCake: true,
    cakeUnlit: false,
  },
  // ── State 14: Balloons flying ──────────────────────────────────────────
  {
    id: "balloons-flying",
    subtitle: "",
    title: "Nah balonnya udah terbang nih stasyaa",
    btnLabel: "HAPPY BIRTHDAY",
    btnIcon: "cake",
    btnIconFill: true,
    bg: ASSETS.bg.partyRoom,
    overlay: "none",
    showTyping: true,
    showCake: true,
    cakeUnlit: false,
    showBalloons: true,
  },
  // ── State 15: Banner drops ─────────────────────────────────────────────
  {
    id: "banner-drops",
    subtitle: "",
    title: "Gelooooo... anjay...",
    btnLabel: "stasyaa annesty",
    btnIcon: "favorite",
    btnIconFill: true,
    bg: ASSETS.bg.partyRoom,
    overlay: "none",
    showTyping: true,
    showCake: true,
    cakeUnlit: false,
    showBalloons: true,
    showBanner: true,
  },
  // ── State 16: Grand Finale — letter balloons ───────────────────────────
  {
    id: "grand-finale",
    subtitle: "",
    title: "",
    btnLabel: "",
    bg: ASSETS.bg.finaleRoom,
    overlay: "none",
    showCake: true,
    cakeUnlit: false,
    showBanner: true,
    showLetterBalloons: true,
    isFinale: true,
  },
];

/**
 * The final heartfelt messages for the typewriter sequence.
 * @type {string[]}
 */
const TYPEWRITER_SENTENCES = [
  "Untuk Stasya Annesty yang cangtippp.",
  "Maaf ya jika aku terlambat untuk menjadi yang pertama memberikan ucapan di hari spesialmu ini. Aku menyiapkan hadiah sederhana ini khusus untukmu; mungkin nilainya tidak besar, tapi proses pembuatannya sangat spesial karena aku melakukannya sambil membayangkan kebahagiaanmu di senyummu yang manis itu.",
  "Selamat ulang tahun yang ke-24, Stasyaaaa. Di usiamu yang baru ini, doa terbaikku selalu menyertaimu. Semoga kamu selalu sehat, panjang umur, dan segala impian yang kamu genggam segera tercapai. Aku berharap duniamu selalu penuh kemudahan dan rezekimu terus mengalir luas. Tetaplah menjadi sosok yang baik hati kepada siapa pun, karena itulah yang membuatmu begitu istimewa.",
  "Aku hanya ingin kamu tahu bahwa apa pun yang terjadi di depan nanti, aku akan selalu menjadi salah satu orang yang paling bahagia melihat kamu sukses dan bahagia. Terima kasih sudah lahir ke dunia dan menjadi bagian indah dalam ceritaku. Tetaplah bersinar, dan ingat kalau aku selalu di sini, mendukungmu dengan seluruh hatiku.",
  "Selamat merayakan hari spesialmu, MBG (My BestFriend Gueh).",
];

const FINAL_MESSAGE =
  "Untuk Stasya Annesty yang cangtippp.\n\nMaaf ya jika aku terlambat untuk menjadi yang pertama memberikan ucapan di hari spesialmu ini. Aku menyiapkan hadiah sederhana ini khusus untukmu; mungkin nilainya tidak besar, tapi proses pembuatannya sangat spesial karena aku melakukannya sambil membayangkan kebahagiaanmu di senyummu yang manis itu.\n\nSelamat ulang tahun yang ke-24, Stasyaaaa. Di usiamu yang baru ini, doa terbaikku selalu menyertaimu. Semoga kamu selalu sehat, panjang umur, dan segala impian yang kamu genggam segera tercapai. Aku berharap duniamu selalu penuh kemudahan dan rezekimu terus mengalir luas. Tetaplah menjadi sosok yang baik hati kepada siapa pun, karena itulah yang membuatmu begitu istimewa.\n\nAku hanya ingin kamu tahu bahwa apa pun yang terjadi di depan nanti, aku akan selalu menjadi salah satu orang yang paling bahagia melihat kamu sukses dan bahagia. Terima kasih sudah lahir ke dunia dan menjadi bagian indah dalam ceritaku. Tetaplah bersinar, dan ingat kalau aku selalu di sini, mendukungmu dengan seluruh hatiku.\n\nSelamat merayakan hari spesialmu, MBG (My BestFriend Gueh).";

/** Letters for the balloon name reveal: STASYA (top arc) + ANNESTY (bottom row) */
const BALLOON_LETTERS = [
  "S",
  "T",
  "A",
  "S",
  "Y",
  "A",
  "A",
  "N",
  "N",
  "E",
  "S",
  "T",
  "Y",
];

/** Balloon animation durations and delays for each letter */
const BALLOON_TIMINGS = [
  { dur: "9.1s, 11.2s", delay: "-1.2s, -0.5s" },
  { dur: "7.5s, 13.4s", delay: "-2.3s, -3.1s" },
  { dur: "11.2s, 8.7s", delay: "-4.5s, -1.8s" },
  { dur: "6.8s, 10.9s", delay: "-0.8s, -5.4s" },
  { dur: "12.1s, 9.5s", delay: "-6.7s, -2.2s" },
  { dur: "8.3s, 14.1s", delay: "-3.2s, -7.8s" },
  { dur: "10.4s, 7.2s", delay: "-5.1s, -4.6s" },
  { dur: "7.9s, 12.8s", delay: "-1.9s, -0.9s" },
  { dur: "13.2s, 10.1s", delay: "-8.2s, -6.3s" },
  { dur: "9.7s, 11.9s", delay: "-4.1s, -5.8s" },
  { dur: "11.5s, 8.4s", delay: "-0.4s, -2.7s" },
  { dur: "6.4s, 13.9s", delay: "-6.1s, -8.4s" },
  { dur: "14.3s, 9.2s", delay: "-9.5s, -4.9s" },
];

/* --------------------------------------------------------------------------
   3. DOM Element References
   -------------------------------------------------------------------------- */

/** @returns {HTMLElement} Safe element getter */
function $(id) {
  return document.getElementById(id);
}

/* --------------------------------------------------------------------------
   4. Screen Manager — State Machine
   -------------------------------------------------------------------------- */

/**
 * Manages the entire screen transition flow.
 * Handles DOM updates, component visibility, and animation triggers.
 */
class ScreenManager {
  constructor() {
    this.currentIndex = 0;
    this.isTransitioning = false;
    this.simpleBalloonsCreated = false;
    this.letterBalloonsCreated = false;
  }

  /**
   * Initialize the app and render the first screen
   */
  init() {
    this.bindEvents();
    this.render(SCREENS[0]);
  }

  /**
   * Bind click events using event delegation
   */
  bindEvents() {
    // Main action button
    $("action-btn").addEventListener("click", () => this.advance());

    // Choice buttons — route to correct branch
    $("choice-kue").addEventListener("click", () => {
      if (this.isTransitioning) return;
      const targetIndex = SCREENS.findIndex((s) => s.id === "unlit-cake");
      this.transitionTo(targetIndex);
    });
    $("choice-adit").addEventListener("click", () => {
      if (this.isTransitioning) return;
      const targetIndex = SCREENS.findIndex((s) => s.id === "adit-branch");
      this.transitionTo(targetIndex);
    });
  }

  /**
   * Advance to the next screen in the narrative
   */
  advance() {
    if (this.isTransitioning) return;
    if (this.currentIndex >= SCREENS.length - 1) return;

    const nextIndex = this.currentIndex + 1;
    const nextScreen = SCREENS[nextIndex];

    // Handle the Grand Finale differently
    if (nextScreen.isFinale) {
      this.currentIndex = nextIndex;
      this.transitionToFinale(nextScreen);
      return;
    }

    // Special in-place animated transition for "Nyalakan Lampu" (screen 0 → 1)
    if (this.currentIndex === 0) {
      this.transitionLampSwitch(nextIndex);
      return;
    }

    this.transitionTo(nextIndex);
  }

  /**
   * Special in-place animated transition for "Nyalakan Lampu" (screen 0 → 1).
   * @param {number} index - Target screen index
   */
  async transitionLampSwitch(index) {
    this.isTransitioning = true;
    const nextScreen = SCREENS[index];

    const canvas = $("app-canvas");
    const overlay = $("overlay");
    const titleEl = $("screen-title");
    const titleWrapper = $("title-wrapper");
    const subtitleEl = $("screen-subtitle");
    const actionBtn = $("action-btn");

    // Remove pulse animation immediately
    titleWrapper.parentElement.classList.remove("animate-pulse-gentle");

    // Pre-load new background
    canvas.style.backgroundImage = `url("${nextScreen.bg}")`;

    // Set button to "waiting" state
    this.setBtnWaiting();

    // Show blinking cursor on title during deletion
    titleEl.classList.add("cursor-active");

    // Delete current title text character by character
    await this.deleteTextAnimated(titleEl);

    // "Lights on": transition overlay blackout → light
    overlay.className = "";
    overlay.classList.add("overlay--light");

    // Reveal subtitle with fade-in
    if (nextScreen.subtitle) {
      subtitleEl.textContent = nextScreen.subtitle;
      subtitleEl.style.opacity = "0";
      subtitleEl.style.display = "";
      subtitleEl.style.transition = "opacity 0.8s ease";
      setTimeout(() => {
        subtitleEl.style.opacity = "1";
      }, 300);
    }

    // Update current state index
    this.currentIndex = index;

    // Type new title text character by character
    await this.typeTextAnimated(titleEl, nextScreen.title, 45);

    // Remove cursor after typing completes
    titleEl.classList.remove("cursor-active");

    // Handle autoEraseAndAdvance (State 2 special behavior)
    if (nextScreen.autoEraseAndAdvance) {
      this.isTransitioning = false;
      setTimeout(async () => {
        titleEl.classList.add("cursor-active");
        await this.deleteTextAnimated(titleEl);
        titleEl.classList.remove("cursor-active");
        setTimeout(() => this.advance(), 500);
      }, 1500);
      return;
    }

    // Restore button with new screen's content
    this.setBtnReady(nextScreen);
    this.isTransitioning = false;
  }

  /**
   * Deletes element text content character by character (backspace effect).
   */
  deleteTextAnimated(element) {
    return new Promise((resolve) => {
      let text = element.textContent;
      if (!text.length) {
        resolve();
        return;
      }
      const interval = setInterval(() => {
        text = text.slice(0, -1);
        element.textContent = text;
        if (!text.length) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  }

  /**
   * Types text into an element character by character (typewriter effect).
   */
  typeTextAnimated(element, text, speed = 75) {
    return new Promise((resolve) => {
      element.textContent = "";
      let i = 0;
      const interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  /**
   * Crossfades the action button into a "waiting / disabled" state.
   */
  setBtnWaiting() {
    const actionBtn = $("action-btn");
    if (actionBtn.classList.contains("btn-waiting")) return;
    const iconEl = actionBtn.querySelector(".btn-icon");
    const labelEl = actionBtn.querySelector(".btn-label");

    iconEl.style.transition = "opacity 0.15s ease";
    labelEl.style.transition = "opacity 0.15s ease";
    iconEl.style.opacity = "0";
    labelEl.style.opacity = "0";

    setTimeout(() => {
      iconEl.textContent = "auto_awesome";
      iconEl.style.fontVariationSettings = '"FILL" 1';
      labelEl.textContent = "MENUNGGU PERINTAH...";
      iconEl.style.opacity = "1";
      labelEl.style.opacity = "1";
      actionBtn.classList.add("btn-waiting");
    }, 150);
  }

  /**
   * Restores the action button from waiting state to the target screen's content.
   */
  setBtnReady(screen, fromHidden = false) {
    const actionBtn = $("action-btn");
    const iconEl = actionBtn.querySelector(".btn-icon");
    const labelEl = actionBtn.querySelector(".btn-label");

    if (fromHidden) {
      iconEl.textContent = screen.btnIcon;
      iconEl.style.fontVariationSettings = screen.btnIconFill ? '"FILL" 1' : "";
      labelEl.textContent = screen.btnLabel;
      iconEl.style.opacity = "1";
      labelEl.style.opacity = "1";
      actionBtn.classList.remove("btn-waiting");
      actionBtn.style.display = "";
      actionBtn.style.opacity = "0";
      actionBtn.style.transition = "opacity 0.5s ease";
      setTimeout(() => {
        actionBtn.style.opacity = "1";
        actionBtn.style.transition = "";
      }, 60);
    } else {
      iconEl.style.transition = "opacity 0.2s ease";
      labelEl.style.transition = "opacity 0.2s ease";
      iconEl.style.opacity = "0";
      labelEl.style.opacity = "0";
      setTimeout(() => {
        iconEl.textContent = screen.btnIcon;
        iconEl.style.fontVariationSettings = screen.btnIconFill
          ? '"FILL" 1'
          : "";
        labelEl.textContent = screen.btnLabel;
        iconEl.style.opacity = "1";
        labelEl.style.opacity = "1";
        actionBtn.classList.remove("btn-waiting");
      }, 200);
    }
  }

  /**
   * Fades in audio smoothly to prevent jarring the user.
   */
  fadeInAudio(audio, targetVolume = 1, duration = 3000) {
    audio.volume = 0;
    audio.play().catch((e) => console.log("Audio play blocked:", e));

    const step = targetVolume / (duration / 50);
    const fadeInterval = setInterval(() => {
      if (audio.volume + step < targetVolume) {
        audio.volume += step;
      } else {
        audio.volume = targetVolume;
        clearInterval(fadeInterval);
      }
    }, 50);
  }

  /**
   * Universal in-place animated transition between any two screens.
   */
  async transitionTo(index) {
    this.isTransitioning = true;
    const current = SCREENS[this.currentIndex];
    const next = SCREENS[index];

    const canvas = $("app-canvas");
    const overlay = $("overlay");
    const titleEl = $("screen-title");
    const titleWrapper = $("title-wrapper");
    const subtitleEl = $("screen-subtitle");
    const actionBtn = $("action-btn");
    const choiceButtons = $("choice-buttons");
    const spotifyWidget = $("spotify-widget");
    const cakeContainer = $("cake-container");
    const balloonContainer = $("balloon-container");
    const bannerEl = $("birthday-banner");

    // Safety: remove dark-room pulse
    titleWrapper.parentElement.classList.remove("animate-pulse-gentle");

    // Background swap
    if (next.bg !== current.bg) {
      canvas.style.backgroundImage = `url("${next.bg}")`;
    }

    // Overlay transition
    if (next.overlay !== current.overlay) {
      overlay.className = "";
      switch (next.overlay) {
        case "blackout":
          overlay.classList.add("overlay--blackout");
          break;
        case "light":
          overlay.classList.add("overlay--light");
          break;
        case "medium":
          overlay.classList.add("overlay--medium");
          break;
        default:
          break;
      }
    }

    // Button: set to waiting state when title is animating
    const titleChanged = next.title !== current.title;
    if (titleChanged && current.btnLabel && !current.showChoices) {
      this.setBtnWaiting();
    }

    // Transitioning FROM a choice-screen → fade out choice buttons
    if (current.showChoices && !next.showChoices) {
      choiceButtons.style.transition = "opacity 0.3s ease";
      choiceButtons.style.opacity = "0";
      setTimeout(() => {
        choiceButtons.classList.remove("active");
        choiceButtons.style.opacity = "";
        choiceButtons.style.transition = "";
      }, 350);
    }

    // Title: delete old text
    if (titleChanged) {
      titleWrapper.classList.remove("typing-container");
      titleEl.classList.remove("typing-text");
      titleEl.style.animation = "none";
      titleEl.offsetHeight; // reflow
      titleEl.classList.add("cursor-active");
      await this.deleteTextAnimated(titleEl);
    }

    // Subtitle transition
    if (next.subtitle !== current.subtitle) {
      if (!current.subtitle && next.subtitle) {
        subtitleEl.textContent = next.subtitle;
        subtitleEl.style.opacity = "0";
        subtitleEl.style.display = "";
        subtitleEl.style.transition = "opacity 0.8s ease";
        setTimeout(() => {
          subtitleEl.style.opacity = "1";
        }, 200);
      } else if (current.subtitle && !next.subtitle) {
        subtitleEl.style.transition = "opacity 0.5s ease";
        subtitleEl.style.opacity = "0";
        setTimeout(() => {
          subtitleEl.style.display = "none";
          subtitleEl.style.opacity = "";
        }, 500);
      } else {
        subtitleEl.style.transition = "opacity 0.3s ease";
        subtitleEl.style.opacity = "0";
        setTimeout(() => {
          subtitleEl.textContent = next.subtitle;
          subtitleEl.style.opacity = "1";
        }, 300);
      }
    }

    // Advance state index
    this.currentIndex = index;

    // Audio Trigger
    if (next.id === "wrong-song") {
      let audio = $("audio-wrong");
      if (!audio) {
        audio = new Audio(
          "assets/audio/girl-in-red-we-fell-in-love-in-october.mp3",
        );
        audio.id = "audio-wrong";
        audio.loop = true;
        document.body.appendChild(audio);
      }
      audio.currentTime = 130; // 2 minutes 10 seconds
      this.fadeInAudio(audio, 1, 3000);
    } else if (next.id === "correct-song") {
      // Stop the wrong audio
      let wrongAudio = $("audio-wrong");
      if (wrongAudio) {
        // Fade out slightly before pause to be smooth
        const fadeOutInterval = setInterval(() => {
          if (wrongAudio.volume > 0.1) {
            wrongAudio.volume -= 0.1;
          } else {
            clearInterval(fadeOutInterval);
            wrongAudio.pause();
          }
        }, 50);
      }

      // Play the correct audio
      let correctAudio = $("audio-correct");
      if (!correctAudio) {
        correctAudio = new Audio(
          "assets/audio/happy-birthday-stevie-wonder.mp3",
        );
        correctAudio.id = "audio-correct";
        correctAudio.loop = false;

        // When Happy Birthday finishes, play "Menjadi-Rumahmu"
        correctAudio.addEventListener("ended", () => {
          let nextAudio = $("audio-next");
          if (!nextAudio) {
            nextAudio = new Audio("assets/audio/menjadi-rumahmu.mp3");
            nextAudio.id = "audio-next";
            nextAudio.loop = true;
            document.body.appendChild(nextAudio);
          }
          nextAudio.currentTime = 0;
          this.fadeInAudio(nextAudio, 1, 3000);

          // Update and show Spotify widget
          const spotifyWidget = $("spotify-widget");
          const songEl = $("spotify-song-name");
          const artistEl = $("spotify-artist-name");

          songEl.style.transition = "opacity 0.3s ease";
          songEl.style.opacity = "0";
          setTimeout(() => {
            songEl.textContent = "Menjadi-Rumahmu";
            artistEl.textContent = "Orang Spesial";
            songEl.style.opacity = "1";
            spotifyWidget.classList.add("active");

            // Hide Spotify widget after 20 seconds
            setTimeout(() => {
              spotifyWidget.classList.remove("active");
            }, 20000);
          }, 300);
        });

        document.body.appendChild(correctAudio);
      }
      correctAudio.currentTime = 0;
      this.fadeInAudio(correctAudio, 1, 3000);
    }

    // Spotify widget
    if (next.spotify) {
      const songEl = $("spotify-song-name");
      const artistEl = $("spotify-artist-name");
      if (current.spotify) {
        if (next.spotify.song !== current.spotify.song) {
          songEl.style.transition = "opacity 0.3s ease";
          songEl.style.opacity = "0";
          setTimeout(() => {
            songEl.textContent = next.spotify.song;
            artistEl.textContent = next.spotify.artist;
            songEl.style.opacity = "1";
          }, 300);
        }
      } else {
        songEl.textContent = next.spotify.song;
        artistEl.textContent = next.spotify.artist;
        spotifyWidget.classList.add("active");
      }
    } else if (current.spotify) {
      spotifyWidget.classList.remove("active");
    }

    // Cake
    if (next.showCake && !current.showCake) {
      cakeContainer.classList.add("active");
    } else if (!next.showCake && current.showCake) {
      cakeContainer.classList.remove("active");
    }

    // Toggle unlit state (flames)
    if (next.showCake) {
      const flames = cakeContainer.querySelectorAll(".fuego");
      flames.forEach((f) => (f.style.display = next.cakeUnlit ? "none" : ""));
    }

    // Simple balloons
    if (next.showBalloons) {
      if (!this.simpleBalloonsCreated) this.createSimpleBalloons();
      balloonContainer.classList.add("active");
    } else if (!next.showBalloons && current.showBalloons) {
      balloonContainer.classList.remove("active");
    }

    // Banner
    if (next.showBanner && !current.showBanner) {
      bannerEl.classList.remove("active");
      bannerEl.offsetHeight; // reflow
      bannerEl.classList.add("active");
    } else if (!next.showBanner && current.showBanner) {
      bannerEl.classList.remove("active");
    }

    // Type new title text
    if (titleChanged) {
      await this.typeTextAnimated(titleEl, next.title, 45);
      titleEl.classList.remove("cursor-active");
    }

    // Restore button / reveal choices AFTER title finishes typing
    if (next.showChoices && !current.showChoices) {
      actionBtn.style.transition = "opacity 0.3s ease";
      actionBtn.style.opacity = "0";
      setTimeout(() => {
        actionBtn.style.display = "none";
        actionBtn.style.opacity = "";
        actionBtn.style.transition = "";
        actionBtn.classList.remove("btn-waiting");

        choiceButtons.style.opacity = "0";
        choiceButtons.classList.add("active");
        choiceButtons.style.transition = "opacity 0.6s ease";
        setTimeout(() => {
          choiceButtons.style.opacity = "1";
        }, 60);
      }, 320);
    } else if (next.autoEraseAndAdvance) {
      // Auto-erase text, then auto-advance
      const delay = next.autoAdvanceDelay || 1500;
      this.isTransitioning = false;
      setTimeout(async () => {
        titleEl.classList.add("cursor-active");
        await this.deleteTextAnimated(titleEl);
        titleEl.classList.remove("cursor-active");
        setTimeout(() => this.advance(), 500);
      }, delay);
      return;
    } else if (next.autoAdvance) {
      const delay = next.autoAdvanceDelay || 1500;
      this.isTransitioning = false;
      setTimeout(() => this.advance(), delay);
      return;
    } else if (next.btnLabel && titleChanged) {
      this.setBtnReady(
        next,
        current.showChoices || actionBtn.style.display === "none",
      );
    }

    this.isTransitioning = false;
  }

  /**
   * Render a screen state to the DOM
   */
  render(screen) {
    const canvas = $("app-canvas");
    const overlay = $("overlay");
    const subtitleEl = $("screen-subtitle");
    const titleEl = $("screen-title");
    const actionBtn = $("action-btn");
    const choiceButtons = $("choice-buttons");
    const spotifyWidget = $("spotify-widget");
    const cakeContainer = $("cake-container");
    const balloonContainer = $("balloon-container");
    const bannerEl = $("birthday-banner");
    const letterBalloonContainer = $("letter-balloon-container");
    const titleWrapper = $("title-wrapper");

    // Background
    canvas.style.backgroundImage = `url("${screen.bg}")`;

    // Overlay
    overlay.className = "";
    switch (screen.overlay) {
      case "blackout":
        overlay.classList.add("overlay--blackout");
        break;
      case "light":
        overlay.classList.add("overlay--light");
        break;
      case "medium":
        overlay.classList.add("overlay--medium");
        break;
      default:
        break;
    }

    // Subtitle
    if (screen.subtitle) {
      subtitleEl.textContent = screen.subtitle;
      subtitleEl.style.display = "";
    } else {
      subtitleEl.style.display = "none";
    }

    // Title with optional typing animation
    titleEl.textContent = screen.title;
    if (screen.showTyping) {
      titleWrapper.classList.add("typing-container");
      titleEl.classList.add("typing-text");
      titleEl.style.animation = "none";
      titleEl.offsetHeight;
      titleEl.style.animation = "";
    } else {
      titleWrapper.classList.remove("typing-container");
      titleEl.classList.remove("typing-text");
    }

    // Pulse effect for dark room
    if (screen.animatePulse) {
      titleWrapper.parentElement.classList.add("animate-pulse-gentle");
    } else {
      titleWrapper.parentElement.classList.remove("animate-pulse-gentle");
    }

    // Action Button
    if (screen.btnLabel) {
      actionBtn.style.display = "";
      const iconEl = actionBtn.querySelector(".btn-icon");
      const labelEl = actionBtn.querySelector(".btn-label");
      iconEl.textContent = screen.btnIcon;
      iconEl.style.fontVariationSettings = screen.btnIconFill ? '"FILL" 1' : "";
      labelEl.textContent = screen.btnLabel;
    } else {
      actionBtn.style.display = "none";
    }

    // Choice Buttons
    if (screen.showChoices) {
      choiceButtons.classList.add("active");
      actionBtn.style.display = "none";
    } else {
      choiceButtons.classList.remove("active");
    }

    // Spotify Widget
    if (screen.spotify) {
      $("spotify-song-name").textContent = screen.spotify.song;
      $("spotify-artist-name").textContent = screen.spotify.artist;
      spotifyWidget.classList.add("active");
    } else {
      spotifyWidget.classList.remove("active");
    }

    // Cake
    if (screen.showCake) {
      cakeContainer.classList.add("active");
      const flames = cakeContainer.querySelectorAll(".fuego");
      flames.forEach((f) => (f.style.display = screen.cakeUnlit ? "none" : ""));
    } else {
      cakeContainer.classList.remove("active");
    }

    // Simple Balloons
    if (screen.showBalloons && !this.simpleBalloonsCreated) {
      this.createSimpleBalloons();
      balloonContainer.classList.add("active");
    } else if (screen.showBalloons) {
      balloonContainer.classList.add("active");
    } else {
      balloonContainer.classList.remove("active");
    }

    // Banner
    if (screen.showBanner) {
      bannerEl.classList.remove("active");
      bannerEl.offsetHeight;
      bannerEl.classList.add("active");
    } else {
      bannerEl.classList.remove("active");
    }

    // Letter Balloons
    if (screen.showLetterBalloons && !this.letterBalloonsCreated) {
      this.createLetterBalloons();
      letterBalloonContainer.classList.add("active");
    } else if (screen.showLetterBalloons) {
      letterBalloonContainer.classList.add("active");
    }
  }

  /**
   * Create simple decorative bouncing balloons (13 total per PRD spec)
   */
  createSimpleBalloons() {
    const container = $("balloon-container");
    container.innerHTML = "";
    const durations = [
      [8.2, 11.4],
      [10.5, 13.8],
      [7.3, 10.9],
      [9.1, 12.6],
      [11.2, 8.7],
      [6.4, 9.8],
      [12.8, 14.2],
      [8.9, 11.1],
      [9.7, 12.3],
      [11.5, 7.9],
      [10.2, 14.8],
      [7.8, 10.4],
      [11.9, 13.1],
    ];

    for (let i = 0; i < 13; i++) {
      const img = document.createElement("img");
      img.className = "balloon-bounce";
      img.src = ASSETS.balloons[i % ASSETS.balloons.length];
      img.alt = "Balloon";
      img.style.width = "60px";
      img.style.animationDuration = `${durations[i][0]}s, ${durations[i][1]}s`;
      container.appendChild(img);
    }
    this.simpleBalloonsCreated = true;
  }

  /**
   * Create letter balloons that spell STASYA + ANNESTY
   */
  createLetterBalloons() {
    const container = $("letter-balloon-container");
    container.innerHTML = "";
    const balloonImgCycle = [0, 2, 1, 3, 0, 2, 1, 3, 0, 2, 1, 3, 0];

    BALLOON_LETTERS.forEach((letter, i) => {
      const wrapper = document.createElement("div");
      wrapper.className = "letter-balloon";
      wrapper.id = `lb-${i}`;
      wrapper.style.animationDuration = BALLOON_TIMINGS[i].dur;
      wrapper.style.animationDelay = BALLOON_TIMINGS[i].delay;

      const img = document.createElement("img");
      img.src = ASSETS.balloons[balloonImgCycle[i]];
      img.alt = `Balloon ${letter}`;

      const span = document.createElement("span");
      span.className = "balloon-text";
      span.textContent = letter;

      wrapper.appendChild(img);
      wrapper.appendChild(span);
      container.appendChild(wrapper);
    });

    this.letterBalloonsCreated = true;
  }

  /**
   * Grand Finale transition — orchestrates the climactic sequence
   */
  transitionToFinale(screen) {
    this.isTransitioning = true;

    // Hide simple balloons, fade content
    $("balloon-container").classList.remove("active");
    $("content-area").style.opacity = "0";
    $("content-area").style.transition = "opacity 0.6s ease-out";

    setTimeout(() => {
      this.render(screen);

      // Setup the finale layout
      const canvas = $("app-canvas");
      canvas.style.backgroundPosition = "center 85%";

      $("content-area").classList.add("finale-mode");

      $("content-area").style.opacity = "1";
      this.isTransitioning = false;

      // Automatically trigger the finale animations
      this.triggerGrandFinale();
    }, 600);
  }

  /**
   * Grand Finale animation — converges letter balloons, reveals message button
   */
  triggerGrandFinale() {
    const actionBtn = $("action-btn");
    const balloons = document.querySelectorAll(".letter-balloon");
    const textBlock = $("title-section");
    const aditBtn = $("adit-message-btn");
    const cake = $("cake-container");

    // Move cake down to its natural responsive position
    if (cake) {
      cake.style.transform = "scale(1)";
      cake.style.transition = "transform 1.5s ease-out";
    }

    // Show "Pesan dari Adit" button after a delay
    setTimeout(() => {
      aditBtn.style.display = "flex";
      aditBtn.offsetHeight; // reflow
      aditBtn.style.opacity = "1";
      aditBtn.style.pointerEvents = "auto";
    }, 1500);

    // Converge balloons into formation
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radiusXTop = 280;
    const radiusYTop = 100;
    const radiusXBottom = 250;
    const radiusYBottom = 80;

    balloons.forEach((b, index) => {
      const rect = b.getBoundingClientRect();
      b.style.left = rect.left + "px";
      b.style.top = rect.top + "px";
      b.offsetHeight; // reflow
      b.classList.add("converged");

      let finalX, finalY;
      if (index < 6) {
        // STASYA — arc formation
        const angle = (index - 2.5) * 20;
        const rad = (angle - 90) * (Math.PI / 180);
        finalX = centerX + radiusXTop * Math.cos(rad) - 40;
        finalY = centerY + radiusYTop * Math.sin(rad) - 180;
      } else {
        // ANNESTY — arc formation
        const angle = (index - 9) * 20;
        const rad = (angle - 90) * (Math.PI / 180);
        finalX = centerX + radiusXBottom * Math.cos(rad) - 40;
        finalY = centerY + radiusYBottom * Math.sin(rad) - 20;
      }

      b.style.left = finalX + "px";
      b.style.top = finalY + "px";
      b.style.transform = "scale(1.2)";
      b.style.zIndex = "30";

      // Reveal letter text after convergence
      setTimeout(() => {
        const text = b.querySelector(".balloon-text");
        if (text) text.classList.add("visible");
      }, 1400);
    });

    // Darken the background
    setTimeout(() => {
      document.body.style.backgroundColor = "#050505";
    }, 500);
  }
}

/* --------------------------------------------------------------------------
   5. Typewriter Engine
   -------------------------------------------------------------------------- */

/**
 * Types a sentence character by character
 */
function typeSentence(el, text, speed = 70) {
  return new Promise((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i === text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

/**
 * Deletes text character by character
 */
function deleteSentence(el, speed = 35) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      el.textContent = el.textContent.slice(0, -1);
      if (el.textContent.length === 0) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

/**
 * Runs the full typewriter sequence then shows the final message
 */
async function startTypewriterSequence() {
  const display = $("typewriter-text");
  const typewriterArea = $("typewriter-area");
  const finalMessage = $("final-message");

  for (let i = 0; i < TYPEWRITER_SENTENCES.length; i++) {
    await typeSentence(display, TYPEWRITER_SENTENCES[i]);
    await new Promise((r) => setTimeout(r, 1000));
    await deleteSentence(display);
    await new Promise((r) => setTimeout(r, 500));
  }

  // Fade out typewriter, show final message
  typewriterArea.style.opacity = "0";
  setTimeout(() => {
    typewriterArea.classList.remove("active");
    finalMessage.classList.add("active");
    setTimeout(() => {
      finalMessage.classList.add("visible");
    }, 50);
  }, 500);
}

/**
 * "Pesan dari Adit" button handler — transitions to typewriter mode
 */
function showAditMessage() {
  const cake = $("cake-container");
  const aditBtn = $("adit-message-btn");
  const balloons = document.querySelectorAll(".letter-balloon");
  const footerDate = $("footer-date");
  const typewriterArea = $("typewriter-area");

  // Hide cake
  cake.style.opacity = "0";
  cake.style.transform = "translateY(120px) scale(0.8)";
  cake.style.transition = "all 0.8s ease-in-out";

  // Hide button
  aditBtn.style.opacity = "0";
  aditBtn.style.pointerEvents = "none";

  // Hide footer
  if (footerDate) footerDate.style.opacity = "0";

  // Move ANNESTY balloons up beneath STASYA
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const radiusXBottom = 250;
  const radiusYBottom = 80;

  balloons.forEach((b, index) => {
    if (index >= 6) {
      // ANNESTY — arc formation
      const angle = (index - 9) * 20;
      const rad = (angle - 90) * (Math.PI / 180);
      const finalX = centerX + radiusXBottom * Math.cos(rad) - 40;
      const finalY = centerY + radiusYBottom * Math.sin(rad) - 20;
      b.style.left = finalX + "px";
      b.style.top = finalY + "px";
    }
  });

  // After cake fades, show typewriter
  setTimeout(() => {
    cake.style.display = "none";
    typewriterArea.classList.add("active");
    startTypewriterSequence();
  }, 800);
}

/* --------------------------------------------------------------------------
   6. Initialization
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const app = new ScreenManager();
  app.init();

  // Bind the "Pesan dari Adit" button
  $("adit-message-btn").addEventListener("click", showAditMessage);
});
