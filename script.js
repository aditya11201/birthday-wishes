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

"use strict";

/* --------------------------------------------------------------------------
   1. Asset URLs (Centralized)
   -------------------------------------------------------------------------- */
const ASSETS = Object.freeze({
  bg: {
    darkRoom:
      "https://lh3.googleusercontent.com/aida/ADBb0ug1rfOgHBfEFztBx_OsY3-1LhpnwtLLitGYyGzgZBhX0NZGxrp6938ecvccBmSKfi5B0X8CmIkPz6-BBRnwWq_5zoS-7H7EDgbkD_CV8MWewZtfADTcOXwOCV-jiLG_cFJo4eg3tdn2WsR69uQ3HuI1KuHlJmGq6cg9dI4BBOPci7zcg9lw9GVKxMHZfzAXwXY4ftP0BAXSEXQSm2SyftcTl9f-xtim0YaroZ3iNib0c0gMemOiQPjpu0VOxTmSmsr5dx_Yj2d3eA",
    litRoom:
      "https://lh3.googleusercontent.com/aida/ADBb0uiY2obPATJueKQQStwLi1bUr9yv1ZBCPH4_Navf2lq1BqZCeDh7jTFtKV_JU4sUDyBsVtnPA1NepQmHaIrItnlDOuvYHEfRa3Q4Zl43zv_lv0CPPrT2Q4o0wnnQF5Eq0PPW1OM5zmHaynVQqZuPSfuRsOKyi64Mv8zrc1RMN_ozoB1SaRxQqRkvUdv5C7bmQDZpWzRoNpeDzg22c7qseBkS08uhuJYB9FjPY43x_ew4f76kh5Al6keV259j9E5MaYJdyqj_GNGpMA",
    partyRoom:
      "https://lh3.googleusercontent.com/aida/ADBb0ugWdFcQULafxPOdSf-g_c0sN5JDPoc_NXne4cUoxEpMMMSVzawL1rLGpL7dhHb7FV4FyGaI196XYSQhEwxnxA-8sl5zLSisjeGaBrJdZiCjjY_wOb6NRi34ttMzmcZ5wh5PBladkbZjgDlAkqkDymF3A-ea6UtukRBVLdQJZhOi_A3zgFMuFl_26VI1Sl3a9uQdqv2b-hqSf6N3CeigIkkhasNtq_txXncAC7CAgW9EtxGw2M2-dMtZYAvGF2WmHkkWBPo4vDbaJg",
    finaleRoom:
      "https://lh3.googleusercontent.com/aida/ADBb0uhGlOFboZxromCjaa_0A6NRr4LWi1b-OjPEBV2EgQhKiLHMDzl4Q1HYH6-JU8oQWHLkt7-_nFTKR3lEfTcmmdPVPMSTJ7GU_CsId6IPCAd9iCQbcELqsY8_j9Km4bffuD1DoWa-IQ0M_OaouOTPGviZ4Es0J4xcmbMy_j5kReK-XSBVBSHkwX3MPa4Qjo80oS1M0fAxmAnZ1oBVDOJemBnd91uk9oVrXCSlSta6rdVZy0PReNAFSxmNYEK4jPe6qZisa-4Rfd2m",
  },
  balloons: [
    "b1.png",
    "b2.png",
    "b3.png",
    "b4.png",
    "b5.png",
    "b6.png",
    "b7.png",
  ],
});

/* --------------------------------------------------------------------------
   2. Screen Definitions (The Narrative)
   -------------------------------------------------------------------------- */
const SCREENS = [
  // ── State 1: Dark Room — "Nyalakan Lampu" ─────────────────────────────
  {
    id: "dark-room",
    subtitle: "",
    title: "Gelap nih.... Coba nyalain lampunya ya stasya",
    btnLabel: "Nyalakan Lampu",
    btnIcon: "lightbulb",
    btnIconFill: true,
    bg: ASSETS.bg.darkRoom,
    overlay: "blackout",
    animatePulse: true,
    showTyping: false,
  },
  // ── State 2: Lights on — auto-erase → auto-advance ──────────────────
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    autoEraseAndAdvance: true,
=======
    autoAdvance: true,
>>>>>>> Stashed changes
=======
    autoAdvance: true,
>>>>>>> Stashed changes
=======
    autoAdvance: true,
>>>>>>> Stashed changes
=======
    autoAdvance: true,
>>>>>>> Stashed changes
=======
    autoAdvance: true,
>>>>>>> Stashed changes
=======
    autoAdvance: true,
>>>>>>> Stashed changes
=======
    autoAdvance: true,
>>>>>>> Stashed changes
=======
    autoAdvance: true,
>>>>>>> Stashed changes
=======
    autoAdvance: true,
>>>>>>> Stashed changes
  },
  // ── State 3: Play music prompt ───────────────────────────────────────
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
  // ── State 4: Wrong song — Spotify appears, auto-advance ─────────────
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
      song: "Each Time You Fall in Love",
      artist: "Cigarettes After Sex",
    },
  },
  // ── State 5: Fix the song ────────────────────────────────────────────
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
      song: "Each Time You Fall in Love",
      artist: "Cigarettes After Sex",
    },
  },
  // ── State 6: Correct song — auto-advance ─────────────────────────────
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
    spotify: { song: "Happy Birthday", artist: "Cigarettes After Sex" },
  },
  // ── State 7: Spotify disappears — auto-advance ──────────────────────
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
  // ── State 8: Help decorate ───────────────────────────────────────────
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // ── State 9: Room decorated — banner drops, auto-advance ────────────
=======
  // 8: Room decorated
>>>>>>> Stashed changes
=======
  // 8: Room decorated
>>>>>>> Stashed changes
=======
  // 8: Room decorated
>>>>>>> Stashed changes
=======
  // 8: Room decorated
>>>>>>> Stashed changes
=======
  // 8: Room decorated
>>>>>>> Stashed changes
=======
  // 8: Room decorated
>>>>>>> Stashed changes
=======
  // 8: Room decorated
>>>>>>> Stashed changes
=======
  // 8: Room decorated
>>>>>>> Stashed changes
=======
  // 8: Room decorated
>>>>>>> Stashed changes
  {
    id: "room-decorated",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "Nah sekarang ruangannya udah bagus nih stas",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "light",
    showTyping: true,
    autoAdvance: true,
  },
  // ── State 10: The Choice — "Kue" or "Adit" ──────────────────────────
  {
    id: "the-choice",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "Stasya biasanya kalau ultah kamu butuh apa sih?",
    bg: ASSETS.bg.litRoom,
    overlay: "medium",
    showTyping: true,
    showChoices: true,
  },
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // ── State 10B: Adit branch — auto-advance to cake ───────────────────
=======
  // 10: Adit Branch
=======
  // 10: Adit Branch
=======
  // 10: Adit Branch
=======
  // 10: Adit Branch
=======
  // 10: Adit Branch
=======
  // 10: Adit Branch
=======
  // 10: Adit Branch
=======
  // 10: Adit Branch
=======
  // 10: Adit Branch
  {
    id: "adit-branch",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "NO NO YA STASYAA ADIT PUNYA AKUU ~KAREN CANGTIPP YANG NGOMONG",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "medium",
    showTyping: true,
    autoAdvance: true,
  },
  // 11: Unlit Cake
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
  // 12: Cake appears
>>>>>>> Stashed changes
  {
    id: "adit-branch",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "NO NO YA STASYAA ADIT PUNYA AKUU ~KAREN CANGTIPP YANG NGOMONG",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "medium",
    showTyping: true,
    autoAdvance: true,
  },
  // 11: Unlit Cake
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
  // 12: Cake appears
>>>>>>> Stashed changes
  {
    id: "adit-branch",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "NO NO YA STASYAA ADIT PUNYA AKUU ~KAREN CANGTIPP YANG NGOMONG",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "medium",
    showTyping: true,
    autoAdvance: true,
  },
  // 11: Unlit Cake
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
  // 12: Cake appears
>>>>>>> Stashed changes
  {
    id: "adit-branch",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "NO NO YA STASYAA ADIT PUNYA AKUU ~KAREN CANGTIPP YANG NGOMONG",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "medium",
    showTyping: true,
    autoAdvance: true,
  },
  // 11: Unlit Cake
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
  // 12: Cake appears
>>>>>>> Stashed changes
  {
    id: "adit-branch",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "NO NO YA STASYAA ADIT PUNYA AKUU ~KAREN CANGTIPP YANG NGOMONG",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "medium",
    showTyping: true,
    autoAdvance: true,
  },
  // 11: Unlit Cake
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
  // 12: Cake appears
>>>>>>> Stashed changes
  {
    id: "adit-branch",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "NO NO YA STASYAA ADIT PUNYA AKUU ~KAREN CANGTIPP YANG NGOMONG",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "medium",
    showTyping: true,
    autoAdvance: true,
  },
  // 11: Unlit Cake
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
  // 12: Cake appears
>>>>>>> Stashed changes
  {
    id: "adit-branch",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "NO NO YA STASYAA ADIT PUNYA AKUU ~KAREN CANGTIPP YANG NGOMONG",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "medium",
    showTyping: true,
    autoAdvance: true,
  },
  // 11: Unlit Cake
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
  // 12: Cake appears
>>>>>>> Stashed changes
  {
    id: "adit-branch",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "NO NO YA STASYAA ADIT PUNYA AKUU ~KAREN CANGTIPP YANG NGOMONG",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "medium",
    showTyping: true,
    autoAdvance: true,
  },
  // 11: Unlit Cake
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
  // 12: Cake appears
>>>>>>> Stashed changes
  {
    id: "adit-branch",
    subtitle: "DIBUAT DENGAN SEPENUH HATI",
    title: "NO NO YA STASYAA ADIT PUNYA AKUU ~KAREN CANGTIPP YANG NGOMONG",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "medium",
    showTyping: true,
    autoAdvance: true,
  },
  // 11: Unlit Cake
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
  // 12: Cake appears
>>>>>>> Stashed changes
  {
    id: "adit-branch",
    subtitle: "",
    title: "NO NO YA STASYAA ADIT PUNYA AKUU ~KAREN CANGTIPP YANG NGOMONG",
    btnLabel: "MENUNGGU PERINTAH...",
    btnIcon: "auto_awesome",
    btnIconFill: true,
    bg: ASSETS.bg.litRoom,
    overlay: "medium",
    showTyping: true,
    autoAdvance: true,
    autoAdvanceDelay: 3000,
  },
  // ── State 11: Unlit cake — "Nyalakan Lilinnya" ──────────────────────
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
    cakeLit: false,
  },
  // ── State 12: Lit cake — auto-advance ───────────────────────────────
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
    cakeLit: true,
    autoAdvance: true,
  },
  // ── State 13: Release balloons prompt ───────────────────────────────
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
    cakeLit: true,
  },
  // ── State 14: Balloons flying ───────────────────────────────────────
  {
    id: "balloons-flying",
    subtitle: "",
    title: "Nah balonnya udah terbang nih stasyaa",
    btnLabel: "HAPPY BIRTHDAY",
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    btnIcon: "cake",
    btnIconFill: true,
=======
    btnIcon: "🥳🎉",
    btnIconFill: false,
>>>>>>> Stashed changes
=======
    btnIcon: "🥳🎉",
    btnIconFill: false,
>>>>>>> Stashed changes
=======
    btnIcon: "🥳🎉",
    btnIconFill: false,
>>>>>>> Stashed changes
=======
    btnIcon: "🥳🎉",
    btnIconFill: false,
>>>>>>> Stashed changes
=======
    btnIcon: "🥳🎉",
    btnIconFill: false,
>>>>>>> Stashed changes
=======
    btnIcon: "🥳🎉",
    btnIconFill: false,
>>>>>>> Stashed changes
=======
    btnIcon: "🥳🎉",
    btnIconFill: false,
>>>>>>> Stashed changes
=======
    btnIcon: "🥳🎉",
    btnIconFill: false,
>>>>>>> Stashed changes
=======
    btnIcon: "🥳🎉",
    btnIconFill: false,
>>>>>>> Stashed changes
    bg: ASSETS.bg.partyRoom,
    overlay: "none",
    showTyping: true,
    showCake: true,
    cakeLit: true,
    showBalloons: true,
  },
  // ── State 15: Banner drops ──────────────────────────────────────────
  {
    id: "banner-drops",
    subtitle: "",
    title: "Gelooooo... anjay...",
    btnLabel: "stasyaa annesty",
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    btnIcon: "favorite",
    btnIconFill: true,
=======
    btnIcon: "💕",
    btnIconFill: false,
>>>>>>> Stashed changes
=======
    btnIcon: "💕",
    btnIconFill: false,
>>>>>>> Stashed changes
=======
    btnIcon: "💕",
    btnIconFill: false,
>>>>>>> Stashed changes
=======
    btnIcon: "💕",
    btnIconFill: false,
>>>>>>> Stashed changes
=======
    btnIcon: "💕",
    btnIconFill: false,
>>>>>>> Stashed changes
=======
    btnIcon: "💕",
    btnIconFill: false,
>>>>>>> Stashed changes
=======
    btnIcon: "💕",
    btnIconFill: false,
>>>>>>> Stashed changes
=======
    btnIcon: "💕",
    btnIconFill: false,
>>>>>>> Stashed changes
=======
    btnIcon: "💕",
    btnIconFill: false,
>>>>>>> Stashed changes
    bg: ASSETS.bg.partyRoom,
    overlay: "none",
    showTyping: true,
    showCake: true,
    cakeLit: true,
    showBalloons: true,
    showBanner: true,
  },
  // ── State 16: Grand Finale — letter balloons ────────────────────────
  {
    id: "grand-finale",
    subtitle: "",
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    title: "Gelooooo... anjay...",
    btnLabel: "Pesan dari Adit",
    btnIcon: "mail",
    btnIconFill: true,
=======
    title: "",
    btnLabel: "",
>>>>>>> Stashed changes
=======
    title: "",
    btnLabel: "",
>>>>>>> Stashed changes
=======
    title: "",
    btnLabel: "",
>>>>>>> Stashed changes
=======
    title: "",
    btnLabel: "",
>>>>>>> Stashed changes
=======
    title: "",
    btnLabel: "",
>>>>>>> Stashed changes
=======
    title: "",
    btnLabel: "",
>>>>>>> Stashed changes
=======
    title: "",
    btnLabel: "",
>>>>>>> Stashed changes
=======
    title: "",
    btnLabel: "",
>>>>>>> Stashed changes
=======
    title: "",
    btnLabel: "",
>>>>>>> Stashed changes
    bg: ASSETS.bg.finaleRoom,
    overlay: "none",
    showCake: true,
    cakeLit: true,
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
  "On your birthday, I want to take a moment to express my love for you.",
  "You're not just my girlfriend but my best friend and my rock.",
  "Today, I celebrate you and all the wonderful qualities that make you so incredibly special.",
];

const FINAL_MESSAGE =
  "On your birthday, I want to take a moment to express my love for you. You're not just my girlfriend but my best friend and my rock. Today, I celebrate you and all the wonderful qualities that make you so incredibly special.";

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

<<<<<<< Updated upstream
    // Choice buttons — track which was clicked
    $("choice-kue").addEventListener("click", () => this.advanceChoice("kue"));
    $("choice-adit").addEventListener("click", () => this.advanceChoice("adit"));
=======
    // Choice buttons
    $("choice-kue").addEventListener("click", () => {
      const targetIndex = SCREENS.findIndex((s) => s.id === "unlit-cake");
      this.transitionTo(targetIndex);
    });
    $("choice-adit").addEventListener("click", () => {
      const targetIndex = SCREENS.findIndex((s) => s.id === "adit-branch");
      this.transitionTo(targetIndex);
    });
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
   * Handle choice button clicks — routes to the correct branch.
   * "Kue" → next screen (unlit cake). "Adit" → adit-branch screen.
   * @param {string} choice - "kue" or "adit"
   */
  advanceChoice(choice) {
    if (this.isTransitioning) return;

    if (choice === "adit") {
      // Find the adit-branch screen
      const aditIndex = SCREENS.findIndex((s) => s.id === "adit-branch");
      if (aditIndex !== -1) {
        this.transitionTo(aditIndex);
        return;
      }
    }

    // "Kue" or fallback: skip the adit-branch screen, go straight to unlit-cake
    const cakeIndex = SCREENS.findIndex((s) => s.id === "unlit-cake");
    if (cakeIndex !== -1) {
      this.transitionTo(cakeIndex);
    } else {
      this.advance();
    }
  }

  /**
   * Special in-place animated transition for "Nyalakan Lampu" (screen 0 → 1).
   * - Deletes old title text character by character (backspace effect)
   * - Smoothly swaps button icon + label (fade, no page flip)
   * - Crossfades overlay from blackout → light (lights-on effect)
   * - Types new title text character by character (typewriter effect)
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
    const iconEl = actionBtn.querySelector(".btn-icon");
    const labelEl = actionBtn.querySelector(".btn-label");

    // ── 0. Remove pulse animation immediately ──────────────────────────────
    titleWrapper.parentElement.classList.remove("animate-pulse-gentle");

    // ── 1. Pre-load new background (still hidden under the blackout overlay)
    canvas.style.backgroundImage = `url("${nextScreen.bg}")`;

    // ── 2. Set button to "waiting" state — no blank moment ────────────────
    this.setBtnWaiting();

    // ── 3. Show blinking cursor on title during deletion ───────────────────
    titleEl.classList.add("cursor-active");

    // ── 4. Delete current title text character by character ───────────────
    await this.deleteTextAnimated(titleEl);

    // ── 6. "Lights on": transition overlay blackout → light (CSS handles it)
    overlay.className = "";
    overlay.classList.add("overlay--light");

    // ── 7. Reveal subtitle with fade-in ───────────────────────────────────
    if (nextScreen.subtitle) {
      subtitleEl.textContent = nextScreen.subtitle;
      subtitleEl.style.opacity = "0";
      subtitleEl.style.display = "";
      subtitleEl.style.transition = "opacity 0.8s ease";
      setTimeout(() => {
        subtitleEl.style.opacity = "1";
      }, 300);
    }

    // ── 8. Update current state index ─────────────────────────────────────
    this.currentIndex = index;

    // ── 9. Type new title text character by character ─────────────────────
    await this.typeTextAnimated(titleEl, nextScreen.title, 45);

    // ── 10. Remove cursor after typing completes ──────────────────────────
    titleEl.classList.remove("cursor-active");

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    // ── 11. Handle autoEraseAndAdvance (State 2 special behavior) ──────────
    if (nextScreen.autoEraseAndAdvance) {
      // Keep button in waiting state, pause to let user read, then erase and advance
      this.isTransitioning = false;
      setTimeout(async () => {
        titleEl.classList.add("cursor-active");
        await this.deleteTextAnimated(titleEl);
        titleEl.classList.remove("cursor-active");
        setTimeout(() => this.advance(), 500);
      }, 1500);
      return;
    }

    // ── 12. Restore button with new screen's content ──────────────────────
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    if (nextScreen.autoAdvance) {
      this.isTransitioning = false;
      setTimeout(() => this.advance(), 1500);
      return;
    }

    // ── 11. Restore button with new screen's content ──────────────────────
>>>>>>> Stashed changes
    this.setBtnReady(nextScreen);

    this.isTransitioning = false;
  }

  /**
   * Deletes element text content character by character (backspace effect).
   * @param {HTMLElement} element
   * @returns {Promise<void>}
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
      }, 35);
    });
  }

  /**
   * Types text into an element character by character (typewriter effect).
   * @param {HTMLElement} element
   * @param {string} text
   * @param {number} speed - milliseconds per character
   * @returns {Promise<void>}
   */
  typeTextAnimated(element, text, speed = 45) {
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
   * Shows "MENUNGGU PERINTAH..." with a dimmed appearance so the user
   * never sees a blank button, and the button cannot be interacted with.
   */
  setBtnWaiting() {
    const actionBtn = $("action-btn");
    // Already in waiting state — nothing to change
    if (actionBtn.classList.contains("btn-waiting")) return;
    const iconEl = actionBtn.querySelector(".btn-icon");
    const labelEl = actionBtn.querySelector(".btn-label");

    // Quickly fade out current content
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
   * @param {Object} screen      - The target screen data object
   * @param {boolean} fromHidden - Pass true when the button was display:none
   *                               (e.g. coming from a choice-buttons screen)
   */
  setBtnReady(screen, fromHidden = false) {
    const actionBtn = $("action-btn");
    const iconEl = actionBtn.querySelector(".btn-icon");
    const labelEl = actionBtn.querySelector(".btn-label");

    if (fromHidden) {
      // Button was hidden — set content, then fade the whole button in
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
      // Button is visible in waiting state — fade out text, swap, fade in
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
   * Universal in-place animated transition between any two screens.
   *
   * Per-element behaviour:
   *  • Title      — delete char-by-char → type char-by-char (when text changes)
   *  • Button     — fade-out icon+label → swap content → fade-in (when changed)
   *  • Subtitle   — fade-out → swap → fade-in (when changed)
   *  • Overlay    — CSS `transition: background 1s ease-in-out` (built-in)
   *  • Background — swapped instantly while overlay hides it
   *  • Spotify    — song name fade-out → swap → fade-in (when changed)
   *  • Cake / Balloons / Banner — their own CSS animations
   *  • Choice buttons — fade-in AFTER title has finished typing
   *
   * @param {number} index - Target screen index
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
    const iconEl = actionBtn.querySelector(".btn-icon");
    const labelEl = actionBtn.querySelector(".btn-label");

    // ── Safety: remove dark-room pulse ────────────────────────────────
    titleWrapper.parentElement.classList.remove("animate-pulse-gentle");

    // ── Background (swap instantly — overlay hides the cut) ───────────
    if (next.bg !== current.bg) {
      canvas.style.backgroundImage = `url("${next.bg}")`;
    }

    // ── Overlay (CSS transition: 1 s ease-in-out already defined) ─────
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
          break; // "none" → just clear the class
      }
    }

    // ── Button: set to waiting state when title is animating ─────────
    const titleChanged = next.title !== current.title;
    if (titleChanged && current.btnLabel && !current.showChoices) {
      this.setBtnWaiting();
    }

    // ── Transitioning FROM a choice-screen → fade out choice buttons ──
    if (current.showChoices && !next.showChoices) {
      choiceButtons.style.transition = "opacity 0.3s ease";
      choiceButtons.style.opacity = "0";
      setTimeout(() => {
        choiceButtons.classList.remove("active");
        choiceButtons.style.opacity = "";
        choiceButtons.style.transition = "";
      }, 350);
    }

    // ── Title: strip CSS animation, add JS cursor, delete old text ─────
    if (titleChanged) {
      titleWrapper.classList.remove("typing-container");
      titleEl.classList.remove("typing-text");
      titleEl.style.animation = "none";
      titleEl.offsetHeight; // reflow
      titleEl.classList.add("cursor-active");

      await this.deleteTextAnimated(titleEl);
    }

    // ── Subtitle transition ────────────────────────────────────────────
    if (next.subtitle !== current.subtitle) {
      if (!current.subtitle && next.subtitle) {
        // Subtitle appearing
        subtitleEl.textContent = next.subtitle;
        subtitleEl.style.opacity = "0";
        subtitleEl.style.display = "";
        subtitleEl.style.transition = "opacity 0.8s ease";
        setTimeout(() => {
          subtitleEl.style.opacity = "1";
        }, 200);
      } else if (current.subtitle && !next.subtitle) {
        // Subtitle disappearing
        subtitleEl.style.transition = "opacity 0.5s ease";
        subtitleEl.style.opacity = "0";
        setTimeout(() => {
          subtitleEl.style.display = "none";
          subtitleEl.style.opacity = "";
        }, 500);
      } else {
        // Subtitle text changing
        subtitleEl.style.transition = "opacity 0.3s ease";
        subtitleEl.style.opacity = "0";
        setTimeout(() => {
          subtitleEl.textContent = next.subtitle;
          subtitleEl.style.opacity = "1";
        }, 300);
      }
    }

    // ── Advance state index ────────────────────────────────────────────
    this.currentIndex = index;

    // ── Spotify widget ────────────────────────────────────────────────
    if (next.spotify) {
      const songEl = $("spotify-song-name");
      const artistEl = $("spotify-artist-name");
      if (current.spotify) {
        // Widget already visible — animate song change if needed
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
        // Widget appearing
        songEl.textContent = next.spotify.song;
        artistEl.textContent = next.spotify.artist;
        spotifyWidget.classList.add("active");
      }
    } else if (current.spotify) {
      // Widget disappearing
      spotifyWidget.classList.remove("active");
    }

    // ── Cake ──────────────────────────────────────────────────────────
    if (next.showCake && !current.showCake) {
      cakeContainer.classList.add("active");
    } else if (!next.showCake && current.showCake) {
      cakeContainer.classList.remove("active");
    }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    // ── Cake lit/unlit toggle ─────────────────────────────────────────
    if (next.showCake) {
      const cakeEl = cakeContainer.querySelector(".cake");
      if (next.cakeLit) {
        cakeEl.classList.remove("cake--unlit");
      } else {
        cakeEl.classList.add("cake--unlit");
      }
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    // Toggle unlit state (flames)
    if (next.showCake) {
      const flames = cakeContainer.querySelectorAll(".fuego");
      flames.forEach((f) => (f.style.display = next.cakeUnlit ? "none" : ""));
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    }

    // ── Simple balloons ───────────────────────────────────────────────
    if (next.showBalloons) {
      if (!this.simpleBalloonsCreated) this.createSimpleBalloons();
      balloonContainer.classList.add("active");
    } else if (!next.showBalloons && current.showBalloons) {
      balloonContainer.classList.remove("active");
    }

    // ── Banner ────────────────────────────────────────────────────────
    if (next.showBanner && !current.showBanner) {
      bannerEl.classList.remove("active");
      bannerEl.offsetHeight; // reflow → restart drop animation
      bannerEl.classList.add("active");
    } else if (!next.showBanner && current.showBanner) {
      bannerEl.classList.remove("active");
    }

    // ── Type new title text ───────────────────────────────────────────
    if (titleChanged) {
      await this.typeTextAnimated(titleEl, next.title, 45);
      titleEl.classList.remove("cursor-active");
    }

    // ── Restore button / reveal choices AFTER title finishes typing ───
    if (next.showChoices && !current.showChoices) {
      // Going TO choice screen: fade out the waiting button, then show choices
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
      // State 2 special: auto-erase text, then auto-advance (no button click)
      this.isTransitioning = false;
      setTimeout(async () => {
        titleEl.classList.add("cursor-active");
        await this.deleteTextAnimated(titleEl);
        titleEl.classList.remove("cursor-active");
        setTimeout(() => this.advance(), 500);
      }, 1500);
      return;
    } else if (next.autoAdvance) {
      // Auto-advance screen: keep button in waiting state (visually locked),
      // then automatically advance after a short reading pause.
      const delay = next.autoAdvanceDelay || 1500;
      this.isTransitioning = false;
      setTimeout(() => this.advance(), delay);
      return;
    } else if (next.btnLabel && titleChanged) {
      // Normal transition: restore button from waiting state
      // fromHidden = true when coming from a choice screen
      this.setBtnReady(next, current.showChoices);
    }

    this.isTransitioning = false;
  }

  /**
   * Render a screen state to the DOM
   * @param {Object} screen - Screen data object
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

    // --- Background ---
    canvas.style.backgroundImage = `url("${screen.bg}")`;

    // --- Overlay ---
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

    // --- Subtitle ---
    if (screen.subtitle) {
      subtitleEl.textContent = screen.subtitle;
      subtitleEl.style.display = "";
    } else {
      subtitleEl.style.display = "none";
    }

    // --- Title with optional typing animation ---
    titleEl.textContent = screen.title;
    if (screen.showTyping) {
      titleWrapper.classList.add("typing-container");
      titleEl.classList.add("typing-text");
      // Force animation restart
      titleEl.style.animation = "none";
      titleEl.offsetHeight; // trigger reflow
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

    // --- Action Button ---
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

    // --- Choice Buttons ---
    if (screen.showChoices) {
      choiceButtons.classList.add("active");
      actionBtn.style.display = "none";
    } else {
      choiceButtons.classList.remove("active");
    }

    // --- Spotify Widget ---
    if (screen.spotify) {
      $("spotify-song-name").textContent = screen.spotify.song;
      $("spotify-artist-name").textContent = screen.spotify.artist;
      spotifyWidget.classList.add("active");
    } else {
      spotifyWidget.classList.remove("active");
    }

    // --- Cake ---
    if (screen.showCake) {
      cakeContainer.classList.add("active");
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      const cakeEl = cakeContainer.querySelector(".cake");
      if (screen.cakeLit) {
        cakeEl.classList.remove("cake--unlit");
      } else {
        cakeEl.classList.add("cake--unlit");
      }
=======
      const flames = cakeContainer.querySelectorAll(".fuego");
      flames.forEach((f) => (f.style.display = screen.cakeUnlit ? "none" : ""));
>>>>>>> Stashed changes
=======
      const flames = cakeContainer.querySelectorAll(".fuego");
      flames.forEach((f) => (f.style.display = screen.cakeUnlit ? "none" : ""));
>>>>>>> Stashed changes
=======
      const flames = cakeContainer.querySelectorAll(".fuego");
      flames.forEach((f) => (f.style.display = screen.cakeUnlit ? "none" : ""));
>>>>>>> Stashed changes
=======
      const flames = cakeContainer.querySelectorAll(".fuego");
      flames.forEach((f) => (f.style.display = screen.cakeUnlit ? "none" : ""));
>>>>>>> Stashed changes
=======
      const flames = cakeContainer.querySelectorAll(".fuego");
      flames.forEach((f) => (f.style.display = screen.cakeUnlit ? "none" : ""));
>>>>>>> Stashed changes
=======
      const flames = cakeContainer.querySelectorAll(".fuego");
      flames.forEach((f) => (f.style.display = screen.cakeUnlit ? "none" : ""));
>>>>>>> Stashed changes
=======
      const flames = cakeContainer.querySelectorAll(".fuego");
      flames.forEach((f) => (f.style.display = screen.cakeUnlit ? "none" : ""));
>>>>>>> Stashed changes
=======
      const flames = cakeContainer.querySelectorAll(".fuego");
      flames.forEach((f) => (f.style.display = screen.cakeUnlit ? "none" : ""));
>>>>>>> Stashed changes
    } else {
      cakeContainer.classList.remove("active");
    }

    // --- Simple Balloons ---
    if (screen.showBalloons && !this.simpleBalloonsCreated) {
      this.createSimpleBalloons();
      balloonContainer.classList.add("active");
    } else if (screen.showBalloons) {
      balloonContainer.classList.add("active");
    } else {
      balloonContainer.classList.remove("active");
    }

    // --- Banner ---
    if (screen.showBanner) {
      // Remove and re-add to restart animation
      bannerEl.classList.remove("active");
      bannerEl.offsetHeight; // reflow
      bannerEl.classList.add("active");
    } else {
      bannerEl.classList.remove("active");
    }

    // --- Letter Balloons ---
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
   * @param {Object} screen - The finale screen data
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

    // Move cake down to center it between balloons and button
    if (cake) {
      cake.style.transform = "scale(1) translateY(80px)";
      cake.style.transition = "transform 1.5s ease-out";
    }

    // Fade out trigger button and text
    actionBtn.style.opacity = "0";
    actionBtn.style.pointerEvents = "none";
    actionBtn.style.transition = "opacity 0.8s ease-out";

    textBlock.style.opacity = "0";
    textBlock.style.transition = "opacity 0.8s ease-out";

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
        // STASYA — arc formation (garis merah)
        const angle = (index - 2.5) * 20;
        const rad = (angle - 90) * (Math.PI / 180);
        finalX = centerX + radiusXTop * Math.cos(rad) - 40;
        finalY = centerY + radiusYTop * Math.sin(rad) - 180;
      } else {
        // ANNESTY — arc formation (garis hijau)
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
      // ANNESTY — arc formation (garis hijau)
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
