/**
 * ==========================================================================
 * BIRTHDAY WISHES — Tasya's Gala
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

'use strict';

/* --------------------------------------------------------------------------
   1. Asset URLs (Centralized)
   -------------------------------------------------------------------------- */
const ASSETS = Object.freeze({
  bg: {
    darkRoom: 'https://lh3.googleusercontent.com/aida/ADBb0ug1rfOgHBfEFztBx_OsY3-1LhpnwtLLitGYyGzgZBhX0NZGxrp6938ecvccBmSKfi5B0X8CmIkPz6-BBRnwWq_5zoS-7H7EDgbkD_CV8MWewZtfADTcOXwOCV-jiLG_cFJo4eg3tdn2WsR69uQ3HuI1KuHlJmGq6cg9dI4BBOPci7zcg9lw9GVKxMHZfzAXwXY4ftP0BAXSEXQSm2SyftcTl9f-xtim0YaroZ3iNib0c0gMemOiQPjpu0VOxTmSmsr5dx_Yj2d3eA',
    litRoom: 'https://lh3.googleusercontent.com/aida/ADBb0uiY2obPATJueKQQStwLi1bUr9yv1ZBCPH4_Navf2lq1BqZCeDh7jTFtKV_JU4sUDyBsVtnPA1NepQmHaIrItnlDOuvYHEfRa3Q4Zl43zv_lv0CPPrT2Q4o0wnnQF5Eq0PPW1OM5zmHaynVQqZuPSfuRsOKyi64Mv8zrc1RMN_ozoB1SaRxQqRkvUdv5C7bmQDZpWzRoNpeDzg22c7qseBkS08uhuJYB9FjPY43x_ew4f76kh5Al6keV259j9E5MaYJdyqj_GNGpMA',
    partyRoom: 'https://lh3.googleusercontent.com/aida/ADBb0ugWdFcQULafxPOdSf-g_c0sN5JDPoc_NXne4cUoxEpMMMSVzawL1rLGpL7dhHb7FV4FyGaI196XYSQhEwxnxA-8sl5zLSisjeGaBrJdZiCjjY_wOb6NRi34ttMzmcZ5wh5PBladkbZjgDlAkqkDymF3A-ea6UtukRBVLdQJZhOi_A3zgFMuFl_26VI1Sl3a9uQdqv2b-hqSf6N3CeigIkkhasNtq_txXncAC7CAgW9EtxGw2M2-dMtZYAvGF2WmHkkWBPo4vDbaJg',
    finaleRoom: 'https://lh3.googleusercontent.com/aida/ADBb0uhGlOFboZxromCjaa_0A6NRr4LWi1b-OjPEBV2EgQhKiLHMDzl4Q1HYH6-JU8oQWHLkt7-_nFTKR3lEfTcmmdPVPMSTJ7GU_CsId6IPCAd9iCQbcELqsY8_j9Km4bffuD1DoWa-IQ0M_OaouOTPGviZ4Es0J4xcmbMy_j5kReK-XSBVBSHkwX3MPa4Qjo80oS1M0fAxmAnZ1oBVDOJemBnd91uk9oVrXCSlSta6rdVZy0PReNAFSxmNYEK4jPe6qZisa-4Rfd2m',
  },
  balloons: ['b1.png', 'b2.png', 'b3.png', 'b4.png', 'b5.png', 'b6.png', 'b7.png'],
});

/* --------------------------------------------------------------------------
   2. Screen Definitions (The Narrative)
   -------------------------------------------------------------------------- */
const SCREENS = [
  // 0: Dark Room - Turn on the light
  {
    id: 'dark-room',
    subtitle: '',
    title: 'Gelap nih.... Coba nyalain lampunya ya stasya',
    btnLabel: 'Turn On The Light',
    btnIcon: 'lightbulb',
    btnIconFill: true,
    bg: ASSETS.bg.darkRoom,
    overlay: 'blackout',
    animatePulse: true,
    showTyping: false,
  },
  // 1: Light is on
  {
    id: 'light-on',
    subtitle: 'DIBUAT DENGAN SEPENUH HATI',
    title: 'Wih keren, sekarang lampunya udah nyala nih...',
    btnLabel: 'Putar Musik',
    btnIcon: 'auto_awesome',
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: 'light',
    showTyping: true,
  },
  // 2: Play music prompt
  {
    id: 'play-music',
    subtitle: 'DIBUAT DENGAN SEPENUH HATI',
    title: 'Nah sekarang coba kamu coba nyalain musik nya',
    btnLabel: 'Putar Musik',
    btnIcon: 'auto_awesome',
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: 'light',
    showTyping: true,
  },
  // 3: Wrong song playing
  {
    id: 'wrong-song',
    subtitle: 'DIBUAT DENGAN SEPENUH HATI',
    title: 'Nah musiknya udah nyala nih',
    btnLabel: 'MENUNGGU PERINTAH...',
    btnIcon: 'auto_awesome',
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: 'light',
    showTyping: true,
    spotify: { song: 'Each Time You Fall in Love', artist: 'Cigarettes After Sex' },
  },
  // 4: Fix the song
  {
    id: 'fix-song',
    subtitle: 'DIBUAT DENGAN SEPENUH HATI',
    title: 'Eh salah deng harusnya lagunya yang tema ulang tahun',
    btnLabel: 'PERBAIKI LAGUNYA',
    btnIcon: 'auto_awesome',
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: 'light',
    showTyping: true,
    spotify: { song: 'Each Time You Fall in Love', artist: 'Cigarettes After Sex' },
  },
  // 5: Correct song
  {
    id: 'correct-song',
    subtitle: 'DIBUAT DENGAN SEPENUH HATI',
    title: 'Eh salah deng harusnya lagunya yang tema ulang tahun',
    btnLabel: 'PERBAIKI LAGUNYA',
    btnIcon: 'auto_awesome',
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: 'light',
    showTyping: true,
    spotify: { song: 'Happy Birthday', artist: 'Cigarettes After Sex' },
  },
  // 6: Decorate prompt
  {
    id: 'decorate-prompt',
    subtitle: 'DIBUAT DENGAN SEPENUH HATI',
    title: 'Nah sekarang Stasyaaaa',
    btnLabel: 'MENUNGGU PERINTAH...',
    btnIcon: 'auto_awesome',
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: 'light',
    showTyping: true,
  },
  // 7: Help decorate
  {
    id: 'help-decorate',
    subtitle: 'DIBUAT DENGAN SEPENUH HATI',
    title: 'Bantu akuu yaa buat dekor ruangannya',
    btnLabel: 'Tambahkan dekorasi',
    btnIcon: 'auto_awesome',
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: 'light',
    showTyping: true,
  },
  // 8: Room decorated — banner is now visible as the decoration
  {
    id: 'room-decorated',
    subtitle: 'DIBUAT DENGAN SEPENUH HATI',
    title: 'Nah sekarang ruangannya udah bagus nih stas',
    btnLabel: 'MENUNGGU PERINTAH...',
    btnIcon: 'auto_awesome',
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: 'light',
    showTyping: true,
    showBanner: true,
  },
  // 9: The Choice
  {
    id: 'the-choice',
    subtitle: 'DIBUAT DENGAN SEPENUH HATI',
    title: 'Stasya biasanya kalau ultah kamu butuh apa sih?',
    bg: ASSETS.bg.litRoom,
    overlay: 'medium',
    showTyping: true,
    showChoices: true,
  },
  // 10: Cake appears
  {
    id: 'cake-appears',
    subtitle: '',
    title: 'Wih geloo apinya sekarang dah nyala nih stas',
    btnLabel: 'Menunggu perintah...',
    btnIcon: 'mode_fan',
    btnIconFill: true,
    bg: ASSETS.bg.partyRoom,
    overlay: 'none',
    showTyping: true,
    showCake: true,
  },
  // 11: Release balloons
  {
    id: 'release-balloons',
    subtitle: '',
    title: 'Nah sekarang tinggal terbang in balonnya',
    btnLabel: 'lepas balonnya',
    btnIcon: 'mode_fan',
    btnIconFill: true,
    bg: ASSETS.bg.partyRoom,
    overlay: 'none',
    showTyping: true,
    showCake: true,
  },
  // 12: Balloons flying
  {
    id: 'balloons-flying',
    subtitle: '',
    title: 'Nah balonnya udah terbang nih stasyaa',
    btnLabel: 'HAPPY BIRTHDAY',
    btnIcon: 'local_fire_department',
    btnIconFill: true,
    bg: ASSETS.bg.partyRoom,
    overlay: 'none',
    showTyping: true,
    showCake: true,
    showBalloons: true,
  },
  // 13: Banner drops - "Gelooo"
  {
    id: 'banner-drops',
    subtitle: '',
    title: 'Gelooooo... anjay...',
    btnLabel: 'stasyaa annesty',
    btnIcon: 'local_fire_department',
    btnIconFill: true,
    bg: ASSETS.bg.partyRoom,
    overlay: 'none',
    showTyping: true,
    showCake: true,
    showBalloons: true,
    showBanner: true,
  },
  // 14: Grand Finale
  {
    id: 'grand-finale',
    subtitle: '',
    title: 'Gelooooo... anjay...',
    btnLabel: 'Stasya Annesty',
    btnIcon: 'auto_awesome',
    btnIconFill: true,
    bg: ASSETS.bg.finaleRoom,
    overlay: 'none',
    showCake: true,
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
  'Watching you grow another year older is the greatest gift of all.',
  'You bring light into every room you enter, and I hope this year is as spectacular as the person you are.',
  'May all your dreams take flight today.',
];

const FINAL_MESSAGE =
  'Watching you grow another year older is the greatest gift of all. You bring light into every room you enter, and I hope this year is as spectacular as the person you are. May all your dreams take flight today.';

/** Letters for the balloon name reveal: STASYA (top arc) + ANNESTY (bottom row) */
const BALLOON_LETTERS = ['S', 'T', 'A', 'S', 'Y', 'A', 'A', 'N', 'N', 'E', 'S', 'T', 'Y'];

/** Balloon animation durations and delays for each letter */
const BALLOON_TIMINGS = [
  { dur: '9.1s, 11.2s', delay: '-1.2s, -0.5s' },
  { dur: '7.5s, 13.4s', delay: '-2.3s, -3.1s' },
  { dur: '11.2s, 8.7s', delay: '-4.5s, -1.8s' },
  { dur: '6.8s, 10.9s', delay: '-0.8s, -5.4s' },
  { dur: '12.1s, 9.5s', delay: '-6.7s, -2.2s' },
  { dur: '8.3s, 14.1s', delay: '-3.2s, -7.8s' },
  { dur: '10.4s, 7.2s', delay: '-5.1s, -4.6s' },
  { dur: '7.9s, 12.8s', delay: '-1.9s, -0.9s' },
  { dur: '13.2s, 10.1s', delay: '-8.2s, -6.3s' },
  { dur: '9.7s, 11.9s', delay: '-4.1s, -5.8s' },
  { dur: '11.5s, 8.4s', delay: '-0.4s, -2.7s' },
  { dur: '6.4s, 13.9s', delay: '-6.1s, -8.4s' },
  { dur: '14.3s, 9.2s', delay: '-9.5s, -4.9s' },
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
    $('action-btn').addEventListener('click', () => this.advance());

    // Choice buttons
    $('choice-kue').addEventListener('click', () => this.advance());
    $('choice-adit').addEventListener('click', () => this.advance());
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

    this.transitionTo(nextIndex);
  }

  /**
   * Smoothly transition between screens
   * @param {number} index - Target screen index
   */
  transitionTo(index) {
    this.isTransitioning = true;
    const contentArea = $('content-area');

    // Fade out
    contentArea.style.opacity = '0';
    contentArea.style.transition = 'opacity 0.4s ease-out';

    setTimeout(() => {
      this.currentIndex = index;
      this.render(SCREENS[index]);

      // Fade in
      setTimeout(() => {
        contentArea.style.opacity = '1';
        this.isTransitioning = false;
      }, 100);
    }, 400);
  }

  /**
   * Render a screen state to the DOM
   * @param {Object} screen - Screen data object
   */
  render(screen) {
    const canvas = $('app-canvas');
    const overlay = $('overlay');
    const subtitleEl = $('screen-subtitle');
    const titleEl = $('screen-title');
    const actionBtn = $('action-btn');
    const choiceButtons = $('choice-buttons');
    const spotifyWidget = $('spotify-widget');
    const cakeContainer = $('cake-container');
    const balloonContainer = $('balloon-container');
    const bannerEl = $('birthday-banner');
    const letterBalloonContainer = $('letter-balloon-container');
    const titleWrapper = $('title-wrapper');

    // --- Background ---
    canvas.style.backgroundImage = `url("${screen.bg}")`;

    // --- Overlay ---
    overlay.className = '';
    switch (screen.overlay) {
      case 'blackout':
        overlay.classList.add('overlay--blackout');
        break;
      case 'light':
        overlay.classList.add('overlay--light');
        break;
      case 'medium':
        overlay.classList.add('overlay--medium');
        break;
      default:
        break;
    }

    // --- Subtitle ---
    if (screen.subtitle) {
      subtitleEl.textContent = screen.subtitle;
      subtitleEl.style.display = '';
    } else {
      subtitleEl.style.display = 'none';
    }

    // --- Title with optional typing animation ---
    titleEl.textContent = screen.title;
    if (screen.showTyping) {
      titleWrapper.classList.add('typing-container');
      titleEl.classList.add('typing-text');
      // Force animation restart
      titleEl.style.animation = 'none';
      titleEl.offsetHeight; // trigger reflow
      titleEl.style.animation = '';
    } else {
      titleWrapper.classList.remove('typing-container');
      titleEl.classList.remove('typing-text');
    }

    // Pulse effect for dark room
    if (screen.animatePulse) {
      titleWrapper.parentElement.classList.add('animate-pulse-gentle');
    } else {
      titleWrapper.parentElement.classList.remove('animate-pulse-gentle');
    }

    // --- Action Button ---
    if (screen.btnLabel) {
      actionBtn.style.display = '';
      const iconEl = actionBtn.querySelector('.btn-icon');
      const labelEl = actionBtn.querySelector('.btn-label');
      iconEl.textContent = screen.btnIcon;
      iconEl.style.fontVariationSettings = screen.btnIconFill
        ? '"FILL" 1'
        : '';
      labelEl.textContent = screen.btnLabel;
    } else {
      actionBtn.style.display = 'none';
    }

    // --- Choice Buttons ---
    if (screen.showChoices) {
      choiceButtons.classList.add('active');
      actionBtn.style.display = 'none';
    } else {
      choiceButtons.classList.remove('active');
    }

    // --- Spotify Widget ---
    if (screen.spotify) {
      $('spotify-song-name').textContent = screen.spotify.song;
      $('spotify-artist-name').textContent = screen.spotify.artist;
      spotifyWidget.classList.add('active');
    } else {
      spotifyWidget.classList.remove('active');
    }

    // --- Cake ---
    if (screen.showCake) {
      cakeContainer.classList.add('active');
    } else {
      cakeContainer.classList.remove('active');
    }

    // --- Simple Balloons ---
    if (screen.showBalloons && !this.simpleBalloonsCreated) {
      this.createSimpleBalloons();
      balloonContainer.classList.add('active');
    } else if (screen.showBalloons) {
      balloonContainer.classList.add('active');
    } else {
      balloonContainer.classList.remove('active');
    }

    // --- Banner ---
    if (screen.showBanner) {
      // Remove and re-add to restart animation
      bannerEl.classList.remove('active');
      bannerEl.offsetHeight; // reflow
      bannerEl.classList.add('active');
    } else {
      bannerEl.classList.remove('active');
    }

    // --- Letter Balloons ---
    if (screen.showLetterBalloons && !this.letterBalloonsCreated) {
      this.createLetterBalloons();
      letterBalloonContainer.classList.add('active');
    } else if (screen.showLetterBalloons) {
      letterBalloonContainer.classList.add('active');
    }
  }

  /**
   * Create simple decorative bouncing balloons (14 total)
   */
  createSimpleBalloons() {
    const container = $('balloon-container');
    container.innerHTML = '';
    const durations = [
      [8.2, 11.4], [10.5, 13.8], [7.3, 10.9], [9.1, 12.6],
      [11.2, 8.7], [6.4, 9.8], [12.8, 14.2], [8.9, 11.1],
      [9.7, 12.3], [11.5, 7.9], [10.2, 14.8], [7.8, 10.4],
      [11.9, 13.1], [9.4, 11.7],
    ];

    for (let i = 0; i < 14; i++) {
      const img = document.createElement('img');
      img.className = 'balloon-bounce';
      img.src = ASSETS.balloons[i % ASSETS.balloons.length];
      img.alt = 'Balloon';
      img.style.width = '60px';
      img.style.animationDuration = `${durations[i][0]}s, ${durations[i][1]}s`;
      container.appendChild(img);
    }
    this.simpleBalloonsCreated = true;
  }

  /**
   * Create letter balloons that spell STASYA + ANNESTY
   */
  createLetterBalloons() {
    const container = $('letter-balloon-container');
    container.innerHTML = '';
    const balloonImgCycle = [0, 2, 1, 3, 0, 2, 1, 3, 0, 2, 1, 3, 0];

    BALLOON_LETTERS.forEach((letter, i) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'letter-balloon';
      wrapper.id = `lb-${i}`;
      wrapper.style.animationDuration = BALLOON_TIMINGS[i].dur;
      wrapper.style.animationDelay = BALLOON_TIMINGS[i].delay;

      const img = document.createElement('img');
      img.src = ASSETS.balloons[balloonImgCycle[i]];
      img.alt = `Balloon ${letter}`;

      const span = document.createElement('span');
      span.className = 'balloon-text';
      span.textContent = letter;

      wrapper.appendChild(img);
      wrapper.appendChild(span);
      container.appendChild(wrapper);
    });

    this.letterBalloonsCreated = true;
  }

  /**
   * Grand Finale transition — orchestrates the climactic sequence
   * @param {Object} screen - The finale screen data
   */
  transitionToFinale(screen) {
    this.isTransitioning = true;

    // Hide simple balloons, fade content
    $('balloon-container').classList.remove('active');
    $('content-area').style.opacity = '0';
    $('content-area').style.transition = 'opacity 0.6s ease-out';

    setTimeout(() => {
      this.render(screen);

      // Setup the finale layout
      const canvas = $('app-canvas');
      canvas.style.backgroundPosition = 'center 85%';

      $('content-area').style.opacity = '1';
      this.isTransitioning = false;

      // Replace the main action button handler for the finale
      const actionBtn = $('action-btn');
      const newBtn = actionBtn.cloneNode(true);
      actionBtn.parentNode.replaceChild(newBtn, actionBtn);

      newBtn.addEventListener('click', () => {
        this.triggerGrandFinale();
      });
    }, 600);
  }

  /**
   * Grand Finale animation — converges letter balloons, reveals message button
   */
  triggerGrandFinale() {
    const actionBtn = $('action-btn');
    const balloons = document.querySelectorAll('.letter-balloon');
    const textBlock = $('title-section');
    const aditBtn = $('adit-message-btn');

    // Fade out trigger button and text
    actionBtn.style.opacity = '0';
    actionBtn.style.pointerEvents = 'none';
    actionBtn.style.transition = 'opacity 0.8s ease-out';

    textBlock.style.opacity = '0';
    textBlock.style.transition = 'opacity 0.8s ease-out';

    // Show "Pesan dari Adit" button after a delay
    setTimeout(() => {
      aditBtn.style.display = 'flex';
      aditBtn.offsetHeight; // reflow
      aditBtn.style.opacity = '1';
      aditBtn.style.pointerEvents = 'auto';
    }, 1500);

    // Converge balloons into formation
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radiusXTop = 280;
    const radiusYTop = 130;

    balloons.forEach((b, index) => {
      const rect = b.getBoundingClientRect();
      b.style.left = rect.left + 'px';
      b.style.top = rect.top + 'px';
      b.offsetHeight; // reflow
      b.classList.add('converged');

      let finalX, finalY;
      if (index < 6) {
        // STASYA — arc formation
        const angle = (index - 2.5) * 20;
        const rad = (angle - 90) * (Math.PI / 180);
        finalX = centerX + radiusXTop * Math.cos(rad) - 40;
        finalY = centerY + radiusYTop * Math.sin(rad) - 220;
      } else {
        // ANNESTY — horizontal row
        const spacing = 100;
        finalX = centerX + (index - 9) * spacing - 40;
        finalY = centerY + 250;
      }

      b.style.left = finalX + 'px';
      b.style.top = finalY + 'px';
      b.style.transform = 'scale(1.2)';
      b.style.zIndex = '30';

      // Reveal letter text after convergence
      setTimeout(() => {
        const text = b.querySelector('.balloon-text');
        if (text) text.classList.add('visible');
      }, 1400);
    });

    // Darken the background
    setTimeout(() => {
      document.body.style.backgroundColor = '#050505';
    }, 500);
  }
}

/* --------------------------------------------------------------------------
   5. Typewriter Engine
   -------------------------------------------------------------------------- */

/**
 * Types a sentence character by character
 * @param {HTMLElement} el - Target element
 * @param {string} text - Text to type
 * @param {number} speed - Ms per character
 * @returns {Promise<void>}
 */
function typeSentence(el, text, speed = 40) {
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
 * @param {HTMLElement} el - Target element
 * @param {number} speed - Ms per character
 * @returns {Promise<void>}
 */
function deleteSentence(el, speed = 20) {
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
  const display = $('typewriter-text');
  const typewriterArea = $('typewriter-area');
  const finalMessage = $('final-message');

  for (let i = 0; i < TYPEWRITER_SENTENCES.length; i++) {
    await typeSentence(display, TYPEWRITER_SENTENCES[i]);
    await new Promise((r) => setTimeout(r, 1000));
    await deleteSentence(display);
    await new Promise((r) => setTimeout(r, 500));
  }

  // Fade out typewriter, show final message
  typewriterArea.style.opacity = '0';
  setTimeout(() => {
    typewriterArea.classList.remove('active');
    finalMessage.classList.add('active');
    setTimeout(() => {
      finalMessage.classList.add('visible');
    }, 50);
  }, 500);
}

/**
 * "Pesan dari Adit" button handler — transitions to typewriter mode
 */
function showAditMessage() {
  const cake = $('cake-container');
  const aditBtn = $('adit-message-btn');
  const balloons = document.querySelectorAll('.letter-balloon');
  const footerDate = $('footer-date');
  const typewriterArea = $('typewriter-area');

  // Hide cake
  cake.style.opacity = '0';
  cake.style.transform = 'scale(0.8)';
  cake.style.transition = 'all 0.8s ease-in-out';

  // Hide button
  aditBtn.style.opacity = '0';
  aditBtn.style.pointerEvents = 'none';

  // Hide footer
  if (footerDate) footerDate.style.opacity = '0';

  // Move ANNESTY balloons up beneath STASYA
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  balloons.forEach((b, index) => {
    if (index >= 6) {
      const spacing = 100;
      const finalX = centerX + (index - 9) * spacing - 40;
      const finalY = centerY - 100;
      b.style.left = finalX + 'px';
      b.style.top = finalY + 'px';
    }
  });

  // After cake fades, show typewriter
  setTimeout(() => {
    cake.style.display = 'none';
    typewriterArea.classList.add('active');
    startTypewriterSequence();
  }, 800);
}

/* --------------------------------------------------------------------------
   6. Initialization
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const app = new ScreenManager();
  app.init();

  // Bind the "Pesan dari Adit" button
  $('adit-message-btn').addEventListener('click', showAditMessage);
});
