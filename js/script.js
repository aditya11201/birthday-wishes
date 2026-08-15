/**
 * ==========================================================================
 * GLAD-YOU-WERE-BORN — SASSY
 * Interactive Birthday Experience for Sassy
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

const PROJECT_NAME = "glad-you-were-born";
const RECIPIENT_NAME = "Sassy";
const SENDER_NAME = "user";

/* --------------------------------------------------------------------------
   2. Screen Definitions (The Narrative)
   -------------------------------------------------------------------------- */
const SCREENS = [
  // ── State 1: Dark Room ─────────────────────────────────────────────────
  {
    id: "dark-room",
    subtitle: "",
    title: `Gelap nih.... Coba nyalain lampunya ya ${RECIPIENT_NAME}`,
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
    title: `Nah Lagunya udah bener nih ${RECIPIENT_NAME}`,
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
    title: `Nah sekarang ${RECIPIENT_NAME}`,
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
    title: `Nah sekarang ruangannya udah bagus nih ${RECIPIENT_NAME}`,
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.partyRoom,
    overlay: "light",
    showTyping: true,
    autoAdvance: true,
  },
  // ── State 10: The Choice — "Kue" or "USER" ───────────────────────────
  {
    id: "the-choice",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: `${RECIPIENT_NAME} biasanya kalau ultah kamu butuh apa sih?`,
    bg: ASSETS.bg.partyRoom,
    overlay: "medium",
    showTyping: true,
    showChoices: true,
  },
  // ── State 10B: USER branch — auto-advance to cake ──────────────────────
  {
    id: "user-branch",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: `NO NO YA ${RECIPIENT_NAME.toUpperCase()} ${SENDER_NAME.toUpperCase()} PUNYA AKUU ~KAREN CANGTIPP YANG NGOMONG`,
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
    title: `Wih geloo apinya sekarang dah nyala nih ${RECIPIENT_NAME}`,
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
    title: `Nah balonnya udah terbang nih ${RECIPIENT_NAME}`,
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
    btnLabel: RECIPIENT_NAME,
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
    bg: ASSETS.bg.partyRoom,
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
  `Untuk ${RECIPIENT_NAME} yang cangtippp.`,
  "Maaf ya jika aku terlambat untuk menjadi yang pertama memberikan ucapan di hari spesialmu ini. Aku menyiapkan hadiah sederhana ini khusus untukmu; mungkin nilainya tidak besar, tapi proses pembuatannya sangat spesial karena aku melakukannya sambil membayangkan kebahagiaanmu di senyummu yang manis itu.",
  `Selamat ulang tahun yang ke-24, ${RECIPIENT_NAME}. Di usiamu yang baru ini, doa terbaikku selalu menyertaimu. Semoga kamu selalu sehat, panjang umur, dan segala impian yang kamu genggam segera tercapai. Aku berharap duniamu selalu penuh kemudahan dan rezekimu terus mengalir luas. Tetaplah menjadi sosok yang baik hati kepada siapa pun, karena itulah yang membuatmu begitu istimewa.`,
  "Aku hanya ingin kamu tahu bahwa apa pun yang terjadi di depan nanti, aku akan selalu menjadi salah satu orang yang paling bahagia melihat kamu sukses dan bahagia. Terima kasih sudah lahir ke dunia dan menjadi bagian indah dalam ceritaku. Tetaplah bersinar, dan ingat kalau aku selalu di sini, mendukungmu dengan seluruh hatiku.",
  "Selamat merayakan hari spesialmu, MBG (My BestFriend Gueh).",
];

/** Letters for the balloon name reveal: SASSY */
const BALLOON_LETTERS = [..."SASSY"];

/** Balloon animation durations and delays for each letter */
const BALLOON_TIMINGS = [
  { dur: "9.1s, 11.2s", delay: "-1.2s, -0.5s" },
  { dur: "7.5s, 13.4s", delay: "-2.3s, -3.1s" },
  { dur: "11.2s, 8.7s", delay: "-4.5s, -1.8s" },
  { dur: "6.8s, 10.9s", delay: "-0.8s, -5.4s" },
  { dur: "12.1s, 9.5s", delay: "-6.7s, -2.2s" },
];

/* --------------------------------------------------------------------------
   3. DOM Element References
   -------------------------------------------------------------------------- */

/** @returns {HTMLElement} Safe element getter */
function $(id) {
  return document.getElementById(id);
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const prefersReducedMotion = () =>
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

const motionDelay = (duration) => (prefersReducedMotion() ? 0 : duration);

const scheduleMotion = (callback, duration) =>
  setTimeout(callback, motionDelay(duration));

const waitForSequence = (duration) =>
  prefersReducedMotion()
    ? Promise.resolve()
    : new Promise((resolve) => setTimeout(resolve, duration));

const seekAudio = (audio, seconds) => {
  if (!audio || !Number.isFinite(seconds)) return;
  const requestedTime = Math.max(0, seconds);

  const applySeek = () => {
    try {
      const duration = Number(audio.duration);
      if (!Number.isFinite(duration) || duration <= 0) return;
      audio.currentTime = Math.min(
        requestedTime,
        Math.max(0, duration - 1),
      );
    } catch {
      // Browsers can reject seeking while media metadata is unavailable.
    }
  };

  try {
    if (audio.readyState >= 1 && Number.isFinite(Number(audio.duration))) {
      applySeek();
    } else {
      audio.addEventListener("loadedmetadata", applySeek, { once: true });
    }
  } catch {
    // A detached or unsupported media element should not break the story.
  }
};

function announceNarrativeStatus(message) {
  const status = $("narrative-status");
  if (status) status.textContent = message;
}

const FINALE_BALLOON_SIZE = 80;
const FINALE_BALLOON_SCALE = 1.2;

function getFinaleBalloonGeometry(index) {
  const midpoint = (BALLOON_LETTERS.length - 1) / 2;
  const angle = (index - midpoint) * 18;
  const rad = (angle - 90) * (Math.PI / 180);
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const sidePadding = Math.min(24, Math.max(8, window.innerWidth * 0.04));
  const arcSin = Math.sin((midpoint * 18 * Math.PI) / 180);
  const maxRadiusX = Math.max(
    0,
    (window.innerWidth / 2 -
      sidePadding -
      FINALE_BALLOON_SIZE * (FINALE_BALLOON_SCALE - 0.5)) /
      arcSin,
  );
  const radiusX = Math.min(280, maxRadiusX);
  const radiusY = Math.min(
    100,
    Math.max(0, window.innerHeight / 2 - 180 - 16),
  );

  return {
    left: centerX + radiusX * Math.cos(rad) - FINALE_BALLOON_SIZE / 2,
    top: centerY + radiusY * Math.sin(rad) - 180,
  };
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
    this.autoAdvanceTimer = null;
    this.audioRetryScreenId = null;
    this.audioRequestToken = 0;
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
    $("action-btn").addEventListener("click", () => {
      if (this.audioRetryScreenId) {
        this.retryBlockedAudio();
        return;
      }
      this.advance();
    });

    // Choice buttons — route to correct branch
    $("choice-kue").addEventListener("click", () => {
      if (this.isTransitioning) return;
      const targetIndex = SCREENS.findIndex((s) => s.id === "unlit-cake");
      this.transitionTo(targetIndex);
    });
    $("choice-user").addEventListener("click", () => {
      if (this.isTransitioning) return;
      const targetIndex = SCREENS.findIndex((s) => s.id === "user-branch");
      this.transitionTo(targetIndex);
    });
  }

  clearAutoAdvance() {
    if (this.autoAdvanceTimer !== null) {
      clearTimeout(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
    }
  }

  nextAudioRequestToken() {
    this.audioRequestToken += 1;
    return this.audioRequestToken;
  }

  isCurrentAudioRequest(requestToken) {
    return requestToken === this.audioRequestToken;
  }

  scheduleAutoAdvance(callback, delay, screen) {
    this.clearAutoAdvance();
    if (this.audioRetryScreenId === screen.id) return;
    this.autoAdvanceTimer = scheduleMotion(() => {
      this.autoAdvanceTimer = null;
      callback();
    }, delay);
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
    this.clearAutoAdvance();
    this.nextAudioRequestToken();
    this.setChoiceButtonsDisabled(true);
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

    // Reveal subtitle smoothly
    if (nextScreen.subtitle) {
      subtitleEl.textContent = nextScreen.subtitle;
      subtitleEl.style.opacity = "0";
      subtitleEl.style.display = "";
      subtitleEl.style.transition = "opacity 0.8s ease";
      scheduleMotion(() => {
        subtitleEl.style.opacity = "1";
      }, 300);
    }

    // Update current state index
    this.currentIndex = index;

    // Type new title text character by character
    await this.typeTextAnimated(titleEl, nextScreen.title, 45);

    // Remove cursor after typing completes
    titleEl.classList.remove("cursor-active");
    announceNarrativeStatus(nextScreen.title);

    // Handle autoEraseAndAdvance (State 2 special behavior)
    if (nextScreen.autoEraseAndAdvance) {
      this.isTransitioning = false;
      scheduleMotion(async () => {
        titleEl.classList.add("cursor-active");
        await this.deleteTextAnimated(titleEl);
        titleEl.classList.remove("cursor-active");
        scheduleMotion(() => this.advance(), 500);
      }, 1500);
      this.setChoiceButtonsDisabled(false);
      return;
    }

    // Restore button with new screen's content
    this.setBtnReady(nextScreen);
    this.setChoiceButtonsDisabled(false);
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
      if (prefersReducedMotion()) {
        element.textContent = "";
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
      if (prefersReducedMotion()) {
        element.textContent = text;
        resolve();
        return;
      }
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
    actionBtn.disabled = true;
    actionBtn.setAttribute("aria-disabled", "true");
    actionBtn.setAttribute("aria-busy", "true");
    this.setChoiceButtonsDisabled(true);
    if (actionBtn.classList.contains("btn-waiting")) return;
    const iconEl = actionBtn.querySelector(".btn-icon");
    const labelEl = actionBtn.querySelector(".btn-label");

    iconEl.style.transition = "opacity 0.15s ease";
    labelEl.style.transition = "opacity 0.15s ease";
    iconEl.style.opacity = "0";
    labelEl.style.opacity = "0";

    const applyWaitingState = () => {
      iconEl.textContent = "auto_awesome";
      iconEl.style.fontVariationSettings = '"FILL" 1';
      labelEl.textContent = "MENUNGGU PERINTAH...";
      iconEl.style.opacity = "1";
      labelEl.style.opacity = "1";
      actionBtn.classList.add("btn-waiting");
    };

    if (prefersReducedMotion()) applyWaitingState();
    else scheduleMotion(applyWaitingState, 150);
  }

  /**
   * Synchronizes semantic disabled state for both choice buttons.
   */
  setChoiceButtonsDisabled(disabled) {
    ["choice-kue", "choice-user"].forEach((id) => {
      const button = $(id);
      if (!button) return;
      button.disabled = disabled;
      if (disabled) {
        button.setAttribute("aria-disabled", "true");
        button.setAttribute("aria-busy", "true");
      } else {
        button.removeAttribute("aria-disabled");
        button.removeAttribute("aria-busy");
      }
    });
  }

  /**
   * Restores the action button from waiting state to the target screen's content.
   */
  setBtnReady(screen, fromHidden = false) {
    const actionBtn = $("action-btn");
    const iconEl = actionBtn.querySelector(".btn-icon");
    const labelEl = actionBtn.querySelector(".btn-label");

    const applyReadyContent = () => {
      iconEl.textContent = screen.btnIcon;
      iconEl.style.fontVariationSettings = screen.btnIconFill
        ? '"FILL" 1'
        : "";
      labelEl.textContent = screen.btnLabel;
      iconEl.style.opacity = "1";
      labelEl.style.opacity = "1";
      actionBtn.classList.remove("btn-waiting");
      actionBtn.disabled = false;
      actionBtn.removeAttribute("aria-disabled");
      actionBtn.removeAttribute("aria-busy");
      actionBtn.setAttribute("aria-label", screen.btnLabel);
    };

    if (fromHidden) {
      applyReadyContent();
      actionBtn.style.display = "";
      actionBtn.style.opacity = "0";
      actionBtn.style.transition = "opacity 0.5s ease";
      scheduleMotion(() => {
        actionBtn.style.opacity = "1";
        actionBtn.style.transition = "";
      }, 60);
    } else {
      iconEl.style.transition = "opacity 0.2s ease";
      labelEl.style.transition = "opacity 0.2s ease";
      iconEl.style.opacity = "0";
      labelEl.style.opacity = "0";
      if (prefersReducedMotion()) applyReadyContent();
      else scheduleMotion(applyReadyContent, 200);
    }
  }

  /**
   * Announces audio playback failures without interrupting the narrative.
   */
  showAudioStatus(message) {
    const status = $("audio-status");
    if (!status) return;
    status.textContent = message;
    status.classList.add("active");
  }

  clearAudioStatus() {
    const status = $("audio-status");
    if (!status) return;
    status.textContent = "";
    status.classList.remove("active");
  }

  handleAudioBlocked(screen, requestToken) {
    if (!this.isCurrentAudioRequest(requestToken)) return;
    this.clearAutoAdvance();
    this.audioRetryScreenId = screen.id;
    this.showAudioStatus(
      'Musik diblokir browser. Tekan tombol "Putar Musik Lagi" untuk mencoba lagi.',
    );

    if (
      !this.isTransitioning &&
      this.currentIndex === SCREENS.indexOf(screen)
    ) {
      this.setAudioRetryReady(screen);
    }
  }

  setAudioRetryReady(screen) {
    const actionBtn = $("action-btn");
    const iconEl = actionBtn.querySelector(".btn-icon");
    const labelEl = actionBtn.querySelector(".btn-label");

    actionBtn.style.display = "";
    actionBtn.classList.remove("btn-waiting");
    actionBtn.disabled = false;
    actionBtn.removeAttribute("aria-disabled");
    actionBtn.removeAttribute("aria-busy");
    actionBtn.setAttribute("aria-label", "Putar Musik Lagi");
    iconEl.textContent = "music_note";
    iconEl.style.fontVariationSettings = screen.btnIconFill ? '"FILL" 1' : "";
    iconEl.style.opacity = "1";
    labelEl.textContent = "Putar Musik Lagi";
    labelEl.style.opacity = "1";
    this.setChoiceButtonsDisabled(false);
  }

  retryBlockedAudio() {
    const screen = SCREENS[this.currentIndex];
    if (!screen || this.audioRetryScreenId !== screen.id) return;

    const audioId = screen.id === "wrong-song" ? "audio-wrong" : "audio-correct";
    const audio = $(audioId);
    if (!audio) return;

    const requestToken = this.nextAudioRequestToken();
    this.audioRetryScreenId = null;
    this.setBtnWaiting();
    this.showAudioStatus("Mencoba memutar musik...");
    seekAudio(audio, screen.id === "wrong-song" ? 130 : 0);
    this.fadeInAudio(
      audio,
      1,
      3000,
      () => this.handleAudioBlocked(screen, requestToken),
      () => this.clearAudioStatus(),
      requestToken,
    );
    this.scheduleAutoAdvance(
      () => this.advance(),
      screen.autoAdvanceDelay || 1500,
      screen,
    );
  }

  /**
   * Fades in audio smoothly to prevent jarring the user.
   */
  fadeInAudio(
    audio,
    targetVolume = 1,
    duration = 3000,
    onBlocked,
    onStarted,
    requestToken,
  ) {
    audio.volume = 0;
    const step = targetVolume / (duration / 50);
    let fadeInterval;
    const isCurrentRequest = () =>
      requestToken === undefined || this.isCurrentAudioRequest(requestToken);

    const handleBlocked = () => {
      clearInterval(fadeInterval);
      if (!isCurrentRequest()) return;
      if (onBlocked) {
        onBlocked();
      } else {
        this.showAudioStatus("Musik diblokir browser.");
      }
    };

    let playback;
    try {
      playback = audio.play();
    } catch {
      handleBlocked();
      return;
    }

    Promise.resolve(playback).then(
      () => {
        if (isCurrentRequest() && onStarted) onStarted();
        fadeInterval = setInterval(() => {
          if (audio.paused) {
            clearInterval(fadeInterval);
            return;
          }
          if (audio.volume + step < targetVolume) {
            audio.volume += step;
          } else {
            audio.volume = targetVolume;
            clearInterval(fadeInterval);
          }
        }, 50);
      },
      handleBlocked,
    );
  }

  startAudioForScreen(screen, requestToken = this.nextAudioRequestToken()) {
    if (screen.id === "wrong-song") {
      let audio = $("audio-wrong");
      if (!audio) {
        audio = new Audio(
          "assets/audio/girl-in-red-we-fell-in-love-in-october.mp3",
        );
        audio.id = "audio-wrong";
        audio.loop = true;
        document.body.appendChild(audio);
      }
      seekAudio(audio, 130);
      this.fadeInAudio(
        audio,
        1,
        3000,
        () => this.handleAudioBlocked(screen, requestToken),
        () => this.clearAudioStatus(),
        requestToken,
      );
      return;
    }

    if (screen.id !== "correct-song") return;

    const wrongAudio = $("audio-wrong");
    if (wrongAudio) {
      const fadeOutInterval = setInterval(() => {
        if (wrongAudio.paused || wrongAudio.volume <= 0.1) {
          clearInterval(fadeOutInterval);
          wrongAudio.pause();
          return;
        }
        wrongAudio.volume = Math.max(0, wrongAudio.volume - 0.1);
      }, 50);
    }

    let correctAudio = $("audio-correct");
    if (!correctAudio) {
      correctAudio = new Audio(
        "assets/audio/happy-birthday-stevie-wonder.mp3",
      );
      correctAudio.id = "audio-correct";
      correctAudio.loop = false;

      correctAudio.addEventListener("ended", () => {
        let nextAudio = $("audio-next");
        if (!nextAudio) {
          nextAudio = new Audio("assets/audio/menjadi-rumahmu.mp3");
          nextAudio.id = "audio-next";
          nextAudio.loop = true;
          document.body.appendChild(nextAudio);
        }
        seekAudio(nextAudio, 0);
        const followUpRequestToken = this.nextAudioRequestToken();
        this.fadeInAudio(
          nextAudio,
          1,
          3000,
          () => this.showAudioStatus("Musik lanjutan diblokir browser."),
          () => this.clearAudioStatus(),
          followUpRequestToken,
        );

        const spotifyWidget = $("spotify-widget");
        const songEl = $("spotify-song-name");
        const artistEl = $("spotify-artist-name");

        songEl.style.transition = "opacity 0.3s ease";
        songEl.style.opacity = "0";
        scheduleMotion(() => {
          songEl.textContent = "Menjadi-Rumahmu";
          artistEl.textContent = "Orang Spesial";
          songEl.style.opacity = "1";
          spotifyWidget.classList.add("active");

          const giftOverlay = $("gift-overlay");
          const finalMessageBox = $("final-message");
          if (giftOverlay) {
            if (finalMessageBox) {
              finalMessageBox.scrollTop = 0;
              finalMessageBox.style.overflow = "hidden";
            }
            giftOverlay.style.display = "flex";
            giftOverlay.style.opacity = "0";
            giftOverlay.style.transition = "opacity 1s ease";
            scheduleMotion(() => {
              giftOverlay.style.opacity = "1";
            }, 100);

            const giftBtn = $("gift-btn");
            if (giftBtn && !giftBtn.hasAttribute("data-bound")) {
              giftBtn.setAttribute("data-bound", "true");
              giftBtn.addEventListener("click", () => {
                const finalMsgText = document.querySelector(
                  ".final-message-text",
                );
                if (finalMsgText) {
                  const image = document.createElement("img");
                  image.src = "assets/images/leon-grace.webp";
                  image.alt = "Leon Grace";
                  image.className = "gift-reveal-image";
                  finalMsgText.replaceChildren(image);
                }
                giftOverlay.style.opacity = "0";
                scheduleMotion(() => {
                  giftOverlay.style.display = "none";
                  if (finalMessageBox) {
                    finalMessageBox.style.overflow = "auto";
                  }
                }, 1000);
              });
            }
          }

          setTimeout(() => {
            spotifyWidget.classList.remove("active");
          }, 20000);
        }, 300);
      });

      document.body.appendChild(correctAudio);
    }
    seekAudio(correctAudio, 0);
    this.fadeInAudio(
      correctAudio,
      1,
      3000,
      () => this.handleAudioBlocked(screen, requestToken),
      () => this.clearAudioStatus(),
      requestToken,
    );
  }

  /**
   * Universal in-place animated transition between any two screens.
   */
  async transitionTo(index) {
    this.isTransitioning = true;
    this.clearAutoAdvance();
    const audioRequestToken = this.nextAudioRequestToken();
    this.setChoiceButtonsDisabled(true);
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
    const revealingChoices = next.showChoices && !current.showChoices;
    const leavingChoices = current.showChoices && !next.showChoices;
    if (titleChanged && current.btnLabel && !current.showChoices) {
      this.setBtnWaiting();
    }

    // Transitioning FROM a choice-screen → fade out choice buttons
    if (leavingChoices) {
      choiceButtons.style.transition = "opacity 0.3s ease";
      choiceButtons.style.opacity = "0";
      scheduleMotion(() => {
        choiceButtons.classList.remove("active");
        choiceButtons.style.opacity = "";
        choiceButtons.style.transition = "";
        this.setChoiceButtonsDisabled(false);
      }, 350);
    }

    // Start requested audio before the first awaited title animation so the
    // browser's user-activation window is still open.
    this.currentIndex = index;
    this.startAudioForScreen(next, audioRequestToken);

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
        scheduleMotion(() => {
          subtitleEl.style.opacity = "1";
        }, 200);
      } else if (current.subtitle && !next.subtitle) {
        subtitleEl.style.transition = "opacity 0.5s ease";
        subtitleEl.style.opacity = "0";
        scheduleMotion(() => {
          subtitleEl.style.display = "none";
          subtitleEl.style.opacity = "";
        }, 500);
      } else {
        subtitleEl.style.transition = "opacity 0.3s ease";
        subtitleEl.style.opacity = "0";
        scheduleMotion(() => {
          subtitleEl.textContent = next.subtitle;
          subtitleEl.style.opacity = "1";
        }, 300);
      }
    }

    // Spotify widget
    if (next.spotify) {
      const songEl = $("spotify-song-name");
      const artistEl = $("spotify-artist-name");
      if (current.spotify) {
        if (next.spotify.song !== current.spotify.song) {
          songEl.style.transition = "opacity 0.3s ease";
          songEl.style.opacity = "0";
          scheduleMotion(() => {
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
    if (next.title) announceNarrativeStatus(next.title);

    // Restore button / reveal choices AFTER title finishes typing
    if (next.showChoices && !current.showChoices) {
      actionBtn.style.transition = "opacity 0.3s ease";
      actionBtn.style.opacity = "0";
      scheduleMotion(() => {
        actionBtn.style.display = "none";
        actionBtn.style.opacity = "";
        actionBtn.style.transition = "";
        actionBtn.classList.remove("btn-waiting");

        choiceButtons.style.opacity = "0";
        choiceButtons.classList.add("active");
        choiceButtons.style.transition = "opacity 0.6s ease";
        scheduleMotion(() => {
          choiceButtons.style.opacity = "1";
          this.setChoiceButtonsDisabled(false);
        }, 60);
      }, 320);
    } else if (next.autoEraseAndAdvance) {
      // Auto-erase text, then auto-advance
      const delay = next.autoAdvanceDelay || 1500;
      if (!leavingChoices) this.setChoiceButtonsDisabled(false);
      this.isTransitioning = false;
      scheduleMotion(async () => {
        titleEl.classList.add("cursor-active");
        await this.deleteTextAnimated(titleEl);
        titleEl.classList.remove("cursor-active");
        scheduleMotion(() => this.advance(), 500);
      }, delay);
      return;
    } else if (next.autoAdvance) {
      const delay = next.autoAdvanceDelay || 1500;
      if (!leavingChoices) this.setChoiceButtonsDisabled(false);
      this.isTransitioning = false;
      if (this.audioRetryScreenId === next.id) {
        this.setAudioRetryReady(next);
        return;
      }
      this.scheduleAutoAdvance(() => this.advance(), delay, next);
      return;
    } else if (next.btnLabel && titleChanged) {
      this.setBtnReady(
        next,
        current.showChoices || actionBtn.style.display === "none",
      );
    }

    if (!revealingChoices && !leavingChoices) {
      this.setChoiceButtonsDisabled(false);
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
    if (screen.title) {
      announceNarrativeStatus(screen.title);
    } else if (screen.isFinale) {
      announceNarrativeStatus("Finale dimulai.");
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
      actionBtn.disabled = false;
      actionBtn.removeAttribute("aria-disabled");
      actionBtn.removeAttribute("aria-busy");
      actionBtn.setAttribute("aria-label", screen.btnLabel);
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

    this.setChoiceButtonsDisabled(this.isTransitioning);
  }

  /**
   * Create simple decorative bouncing balloons (13 total per PRD spec)
   */
  createSimpleBalloons() {
    const container = $("balloon-container");
    container.replaceChildren();
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
   * Create letter balloons that spell SASSY
   */
  createLetterBalloons() {
    const container = $("letter-balloon-container");
    container.replaceChildren();
    const balloonImgCycle = [0, 2, 1, 3];

    BALLOON_LETTERS.forEach((letter, i) => {
      const wrapper = document.createElement("div");
      wrapper.className = "letter-balloon";
      wrapper.id = `lb-${i}`;
      wrapper.style.animationDuration = BALLOON_TIMINGS[i].dur;
      wrapper.style.animationDelay = BALLOON_TIMINGS[i].delay;

      const img = document.createElement("img");
      img.src = ASSETS.balloons[balloonImgCycle[i % balloonImgCycle.length]];
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
    this.clearAutoAdvance();
    this.nextAudioRequestToken();
    this.setBtnWaiting();

    // Hide simple balloons, fade content
    $("balloon-container").classList.remove("active");
    $("content-area").style.opacity = "0";
    $("content-area").style.transition = "opacity 0.6s ease-out";

    scheduleMotion(() => {
      this.render(screen);

      // Setup the finale layout
      const canvas = $("app-canvas");
      canvas.style.backgroundPosition = "center 85%";

      $("content-area").classList.add("finale-mode");

      $("content-area").style.opacity = "1";
      this.setChoiceButtonsDisabled(false);
      this.isTransitioning = false;

      // Automatically trigger the finale animations
      this.triggerGrandFinale();
    }, 600);
  }

  /**
   * Grand Finale animation — converges letter balloons, reveals message button
   */
  triggerGrandFinale() {
    const balloons = document.querySelectorAll(".letter-balloon");
    const userMessageBtn = $("user-message-btn");
    const cake = $("cake-container");

    const userMessageLabel = userMessageBtn.querySelector(
      ".btn-label--small",
    );
    if (userMessageLabel) {
      userMessageLabel.textContent = `Pesan dari ${SENDER_NAME}`;
    }
    userMessageBtn.setAttribute(
      "aria-label",
      `Open message from ${SENDER_NAME}`,
    );
    userMessageBtn.disabled = false;
    userMessageBtn.removeAttribute("aria-disabled");
    userMessageBtn.removeAttribute("aria-busy");

    // Move cake down to its natural responsive position
    if (cake) {
      cake.style.transform = "scale(1)";
      cake.style.transition = "transform 1.5s ease-out";
    }

    // Show "Pesan dari user" button after a delay
    scheduleMotion(() => {
      userMessageBtn.style.display = "flex";
      userMessageBtn.offsetHeight; // reflow
      userMessageBtn.style.opacity = "1";
      userMessageBtn.style.pointerEvents = "auto";
    }, 1500);

    balloons.forEach((b, index) => {
      const rect = b.getBoundingClientRect();
      b.style.left = rect.left + "px";
      b.style.top = rect.top + "px";
      b.offsetHeight; // reflow
      b.classList.add("converged");

      const { left: finalX, top: finalY } = getFinaleBalloonGeometry(index);

      b.style.left = finalX + "px";
      b.style.top = finalY + "px";
      b.style.transform = "scale(1.2)";
      b.style.zIndex = "30";

      // Reveal letter text after convergence
      scheduleMotion(() => {
        const text = b.querySelector(".balloon-text");
        if (text) text.classList.add("visible");
      }, 1400);
    });

    // Darken the background
    scheduleMotion(() => {
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
    if (prefersReducedMotion()) {
      el.textContent += text;
      resolve();
      return;
    }
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
    if (prefersReducedMotion()) {
      el.textContent = "";
      resolve();
      return;
    }
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
    announceNarrativeStatus(
      `Pesan ${i + 1} dari ${TYPEWRITER_SENTENCES.length} selesai.`,
    );
    await waitForSequence(1000);
    await deleteSentence(display);
    await waitForSequence(500);
  }

  // Fade out typewriter, show final message
  typewriterArea.style.opacity = "0";
  scheduleMotion(() => {
    typewriterArea.classList.remove("active");
    finalMessage.classList.add("active");
    scheduleMotion(() => {
      finalMessage.classList.add("visible");
    }, 50);
  }, 500);
}

/**
 * "Pesan dari user" button handler — transitions to typewriter mode
 */
function showUserMessage() {
  const cake = $("cake-container");
  const userMessageBtn = $("user-message-btn");
  const balloons = document.querySelectorAll(".letter-balloon");
  const footerDate = $("footer-date");
  const typewriterArea = $("typewriter-area");

  if (!userMessageBtn || userMessageBtn.disabled) return;
  userMessageBtn.disabled = true;
  userMessageBtn.setAttribute("aria-disabled", "true");
  userMessageBtn.setAttribute("aria-busy", "true");

  // Hide cake
  cake.style.opacity = "0";
  cake.style.transform = "translateY(120px) scale(0.8)";
  cake.style.transition =
    "transform 0.8s ease-in-out, opacity 0.8s ease-in-out";

  // Hide button
  userMessageBtn.style.opacity = "0";
  userMessageBtn.style.pointerEvents = "none";

  // Hide footer
  if (footerDate) footerDate.style.opacity = "0";

  balloons.forEach((b, index) => {
    const { left: finalX, top: finalY } = getFinaleBalloonGeometry(index);
    b.style.left = finalX + "px";
    b.style.top = finalY + "px";
  });

  // After cake fades, show typewriter
  scheduleMotion(() => {
    cake.style.display = "none";
    typewriterArea.classList.add("active");
    startTypewriterSequence();
  }, 800);
}

/* --------------------------------------------------------------------------
   6. Initialization
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.title = PROJECT_NAME;
  const app = new ScreenManager();
  app.init();

  // Bind the "Pesan dari user" button
  $("user-message-btn").addEventListener("click", showUserMessage);
});
