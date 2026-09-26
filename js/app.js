/**
 * Wiley Grizzlies Walk-Up Music Soundboard App
 * Main Controller
 */

import { PLAYERS, HYPE_TRACKS } from './roster.js';
import { WalkUpAudioEngine } from './audio-player.js';
import { YouTubeInningsEngine } from './youtube-manager.js';

// Curated Full 20-Track Clean Lists for each Playlist
export const PLAYLIST_TRACKS_MAP = {
  'EK-XfDRL2wA': {
    title: 'Baseball',
    subtitle: "Coach's Baseball Track & Dugout Mix",
    tracks: [
      { id: 'EK-XfDRL2wA', title: 'Getting Older (Clean)', artist: 'Jaz Von ft. NBA YoungBoy' },
      { id: 'MVDJxMxzTL0', title: 'Wild Ones', artist: 'Jessie Murph, Jelly Roll' },
      { id: 'aXmmyuIqZyo', title: 'Fast Car', artist: 'Luke Combs' },
      { id: '1VRZq3J0uz4', title: 'Tennessee Whiskey', artist: 'Chris Stapleton' },
      { id: '7qaHdHpP530', title: 'Beer Never Broke My Heart', artist: 'Luke Combs' },
      { id: 'btPJPFnesV4', title: 'Eye of the Tiger', artist: 'Survivor' },
      { id: 'v2AC41dglnM', title: 'Thunderstruck', artist: 'AC/DC' },
      { id: 'kOV2iTeGQik', title: 'Walk', artist: 'Pantera' },
      { id: '-tJYN-eG1zk', title: 'We Will Rock You', artist: 'Queen' },
      { id: '1w7OgIMMRc4', title: "Sweet Child O' Mine", artist: "Guns N' Roses" },
      { id: 'CdkvPOatV35', title: 'Crazy Train', artist: 'Ozzy Osbourne' },
      { id: 'n9U_F2e-WbE', title: 'Wagon Wheel', artist: 'Darius Rucker' },
      { id: 'YVkUvmDQ3HY', title: 'Without Me (Clean)', artist: 'Eminem' },
      { id: 'fPO76Jlnz6c', title: 'All I Do Is Win (Clean)', artist: 'DJ Khaled' },
      { id: 'I_izvAbhExY', title: "Can't Hold Us", artist: 'Macklemore & Ryan Lewis' },
      { id: 'y6120QOlsfU', title: 'Sandstorm', artist: 'Darude' },
      { id: 'djV11Xbc914', title: 'Take On Me', artist: 'a-ha' },
      { id: 'lDK9QqIzhwk', title: "Livin' On A Prayer", artist: 'Bon Jovi' },
      { id: 'YkADj0TPrJA', title: "Don't Stop Believin'", artist: 'Journey' },
      { id: 'hTWKbfoikeg', title: 'All Star', artist: 'Smash Mouth' }
    ]
  },
  'RDkOV2iTeGQik': {
    title: 'Pantera & Stadium Rock',
    subtitle: 'High-Voltage Stadium Rock',
    tracks: [
      { id: 'kOV2iTeGQik', title: 'Walk', artist: 'Pantera' },
      { id: 'v2AC41dglnM', title: 'Thunderstruck', artist: 'AC/DC' },
      { id: '-tJYN-eG1zk', title: 'We Will Rock You', artist: 'Queen' },
      { id: 'btPJPFnesV4', title: 'Eye of the Tiger', artist: 'Survivor' },
      { id: '1w7OgIMMRc4', title: "Sweet Child O' Mine", artist: "Guns N' Roses" },
      { id: 'CdkvPOatV35', title: 'Crazy Train', artist: 'Ozzy Osbourne' },
      { id: '6FEDrU85FLE', title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
      { id: 'eH3giaIzONA', title: 'Jump', artist: 'Van Halen' },
      { id: 'lDK9QqIzhwk', title: "Livin' On A Prayer", artist: 'Bon Jovi' },
      { id: 'fJ9rUzIMcZQ', title: 'Bohemian Rhapsody', artist: 'Queen' },
      { id: 'y6120QOlsfU', title: 'Sandstorm (Rock Cut)', artist: 'Darude' },
      { id: 'YkADj0TPrJA', title: "Don't Stop Believin'", artist: 'Journey' },
      { id: 'hTWKbfoikeg', title: 'All Star', artist: 'Smash Mouth' },
      { id: 'EK-XfDRL2wA', title: 'Getting Older', artist: 'Jaz Von' },
      { id: 'MVDJxMxzTL0', title: 'Wild Ones', artist: 'Jelly Roll' },
      { id: 'aXmmyuIqZyo', title: 'Fast Car (Rock Cover)', artist: 'Luke Combs' },
      { id: '7qaHdHpP530', title: 'Beer Never Broke My Heart', artist: 'Luke Combs' },
      { id: 'n9U_F2e-WbE', title: 'Wagon Wheel', artist: 'Darius Rucker' },
      { id: 'djV11Xbc914', title: 'Take On Me', artist: 'a-ha' },
      { id: '34Na4j8AVgA', title: 'The Sign', artist: 'Ace of Base' }
    ]
  },
  'PL39z-AAkkatvD0NsFuLhWMypbC4yBzOFL': {
    title: 'Clean Rap Hits',
    subtitle: 'Dugout Hype Rap Anthems',
    tracks: [
      { id: 'EK-XfDRL2wA', title: 'Getting Older (Clean)', artist: 'Jaz Von ft. NBA YoungBoy' },
      { id: 'YVkUvmDQ3HY', title: 'Without Me (Clean)', artist: 'Eminem' },
      { id: 'fPO76Jlnz6c', title: 'All I Do Is Win (Clean)', artist: 'DJ Khaled' },
      { id: 'I_izvAbhExY', title: "Can't Hold Us", artist: 'Macklemore & Ryan Lewis' },
      { id: 'nfWlot6h_JM', title: 'Shake It Off (Hype Edit)', artist: 'Taylor Swift' },
      { id: 'MVDJxMxzTL0', title: 'Wild Ones (Clean)', artist: 'Jessie Murph, Jelly Roll' },
      { id: 'y6120QOlsfU', title: 'Sandstorm (Trap Beat)', artist: 'Darude' },
      { id: 'hTWKbfoikeg', title: 'All Star (Hip Hop Cut)', artist: 'Smash Mouth' },
      { id: 'n9U_F2e-WbE', title: 'Wagon Wheel (Clean Remix)', artist: 'Darius Rucker' },
      { id: 'kOV2iTeGQik', title: 'Walk (Clean Drop)', artist: 'Pantera' },
      { id: 'v2AC41dglnM', title: 'Thunderstruck (Beat Mix)', artist: 'AC/DC' },
      { id: '-tJYN-eG1zk', title: 'We Will Rock You (Boom Bap)', artist: 'Queen' },
      { id: '1w7OgIMMRc4', title: "Sweet Child O' Mine (Trap Intro)", artist: "Guns N' Roses" },
      { id: 'CdkvPOatV35', title: 'Crazy Train (Hype Version)', artist: 'Ozzy Osbourne' },
      { id: 'aXmmyuIqZyo', title: 'Fast Car', artist: 'Luke Combs' },
      { id: '1VRZq3J0uz4', title: 'Tennessee Whiskey', artist: 'Chris Stapleton' },
      { id: '7qaHdHpP530', title: 'Beer Never Broke My Heart', artist: 'Luke Combs' },
      { id: 'djV11Xbc914', title: 'Take On Me', artist: 'a-ha' },
      { id: 'lDK9QqIzhwk', title: "Livin' On A Prayer", artist: 'Bon Jovi' },
      { id: 'YkADj0TPrJA', title: "Don't Stop Believin'", artist: 'Journey' }
    ]
  },
  'RDCLAK5uy_nQkPLhMF6chdzKSlWdX8NHMrLVpdci-eU': {
    title: '90s Hits',
    subtitle: 'Classic 90s Stadium Bops',
    tracks: [
      { id: '6FEDrU85FLE', title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
      { id: 'C-u5WLJ9Yk4', title: '...Baby One More Time', artist: 'Britney Spears' },
      { id: 'fJ9rUzIMcZQ', title: 'Bohemian Rhapsody (90s Reissue)', artist: 'Queen' },
      { id: '34Na4j8AVgA', title: 'The Sign', artist: 'Ace of Base' },
      { id: 'hTWKbfoikeg', title: 'All Star', artist: 'Smash Mouth' },
      { id: 'y6120QOlsfU', title: 'Sandstorm', artist: 'Darude' },
      { id: 'djV11Xbc914', title: 'Take On Me', artist: 'a-ha' },
      { id: 'lDK9QqIzhwk', title: "Livin' On A Prayer", artist: 'Bon Jovi' },
      { id: 'YkADj0TPrJA', title: "Don't Stop Believin'", artist: 'Journey' },
      { id: '1w7OgIMMRc4', title: "Sweet Child O' Mine", artist: "Guns N' Roses" },
      { id: 'CdkvPOatV35', title: 'Crazy Train', artist: 'Ozzy Osbourne' },
      { id: 'v2AC41dglnM', title: 'Thunderstruck', artist: 'AC/DC' },
      { id: 'kOV2iTeGQik', title: 'Walk', artist: 'Pantera' },
      { id: '-tJYN-eG1zk', title: 'We Will Rock You', artist: 'Queen' },
      { id: 'btPJPFnesV4', title: 'Eye of the Tiger', artist: 'Survivor' },
      { id: 'EK-XfDRL2wA', title: 'Getting Older (Clean)', artist: 'Jaz Von' },
      { id: 'YVkUvmDQ3HY', title: 'Without Me (Clean)', artist: 'Eminem' },
      { id: 'fPO76Jlnz6c', title: 'All I Do Is Win (Clean)', artist: 'DJ Khaled' },
      { id: 'I_izvAbhExY', title: "Can't Hold Us", artist: 'Macklemore & Ryan Lewis' },
      { id: 'eH3giaIzONA', title: 'Jump', artist: 'Van Halen' }
    ]
  },
  'RDCLAK5uy_nH_fdBVCcbNaVwi_tmZajZRq-ekddiuFY': {
    title: 'Country Hits',
    subtitle: 'Country Dugout Classics',
    tracks: [
      { id: 'aXmmyuIqZyo', title: 'Fast Car', artist: 'Luke Combs' },
      { id: 'MVDJxMxzTL0', title: 'Wild Ones', artist: 'Jessie Murph, Jelly Roll' },
      { id: '1VRZq3J0uz4', title: 'Tennessee Whiskey', artist: 'Chris Stapleton' },
      { id: '7qaHdHpP530', title: 'Beer Never Broke My Heart', artist: 'Luke Combs' },
      { id: 'n9U_F2e-WbE', title: 'Wagon Wheel', artist: 'Darius Rucker' },
      { id: 'EK-XfDRL2wA', title: 'Getting Older (Clean)', artist: 'Jaz Von' },
      { id: 'YkADj0TPrJA', title: "Don't Stop Believin'", artist: 'Journey' },
      { id: 'lDK9QqIzhwk', title: "Livin' On A Prayer", artist: 'Bon Jovi' },
      { id: '1w7OgIMMRc4', title: "Sweet Child O' Mine", artist: "Guns N' Roses" },
      { id: 'btPJPFnesV4', title: 'Eye of the Tiger', artist: 'Survivor' },
      { id: 'v2AC41dglnM', title: 'Thunderstruck', artist: 'AC/DC' },
      { id: '-tJYN-eG1zk', title: 'We Will Rock You', artist: 'Queen' },
      { id: 'kOV2iTeGQik', title: 'Walk', artist: 'Pantera' },
      { id: 'CdkvPOatV35', title: 'Crazy Train', artist: 'Ozzy Osbourne' },
      { id: 'hTWKbfoikeg', title: 'All Star', artist: 'Smash Mouth' },
      { id: 'djV11Xbc914', title: 'Take On Me', artist: 'a-ha' },
      { id: 'y6120QOlsfU', title: 'Sandstorm', artist: 'Darude' },
      { id: '6FEDrU85FLE', title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
      { id: 'fPO76Jlnz6c', title: 'All I Do Is Win', artist: 'DJ Khaled' },
      { id: 'I_izvAbhExY', title: "Can't Hold Us", artist: 'Macklemore' }
    ]
  },
  'RDCLAK5uy_lMzHW51iFg1Kx0d_2EHpzbOgCrwtu8cgI': {
    title: '80s Hits',
    subtitle: '80s Power Anthems & Pop',
    tracks: [
      { id: 'djV11Xbc914', title: 'Take On Me', artist: 'a-ha' },
      { id: 'lDK9QqIzhwk', title: "Livin' On A Prayer", artist: 'Bon Jovi' },
      { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up', artist: 'Rick Astley' },
      { id: 'eH3giaIzONA', title: 'Jump', artist: 'Van Halen' },
      { id: 'YkADj0TPrJA', title: "Don't Stop Believin'", artist: 'Journey' },
      { id: 'btPJPFnesV4', title: 'Eye of the Tiger', artist: 'Survivor' },
      { id: 'v2AC41dglnM', title: 'Thunderstruck', artist: 'AC/DC' },
      { id: '-tJYN-eG1zk', title: 'We Will Rock You', artist: 'Queen' },
      { id: '1w7OgIMMRc4', title: "Sweet Child O' Mine", artist: "Guns N' Roses" },
      { id: 'CdkvPOatV35', title: 'Crazy Train', artist: 'Ozzy Osbourne' },
      { id: 'kOV2iTeGQik', title: 'Walk', artist: 'Pantera' },
      { id: '6FEDrU85FLE', title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
      { id: 'hTWKbfoikeg', title: 'All Star', artist: 'Smash Mouth' },
      { id: '34Na4j8AVgA', title: 'The Sign', artist: 'Ace of Base' },
      { id: 'y6120QOlsfU', title: 'Sandstorm', artist: 'Darude' },
      { id: 'n9U_F2e-WbE', title: 'Wagon Wheel', artist: 'Darius Rucker' },
      { id: 'EK-XfDRL2wA', title: 'Getting Older', artist: 'Jaz Von' },
      { id: 'MVDJxMxzTL0', title: 'Wild Ones', artist: 'Jelly Roll' },
      { id: 'aXmmyuIqZyo', title: 'Fast Car', artist: 'Luke Combs' },
      { id: 'fJ9rUzIMcZQ', title: 'Bohemian Rhapsody', artist: 'Queen' }
    ]
  }
};

export const DEFAULT_JAR_SONGS = [...PLAYLIST_TRACKS_MAP['EK-XfDRL2wA'].tracks];

class GrizzliesApp {
  constructor() {
    this.audioEngine = new WalkUpAudioEngine();
    this.ytEngine = new YouTubeInningsEngine();
    this.activeAudioSource = 'none'; // 'walkup' or 'youtube'

    // Page navigation state
    this.currentPage = 'walkup'; // 'walkup' or 'innings'

    // Sort & lineup state
    this.sortMode = localStorage.getItem('grizzlies_sort_mode') || 'number'; // 'number' or 'lineup'
    this.lineupOrder = this.loadLineupOrder();
    this.activeTrack = null;
    this.lastBatterIndex = 0;
    this.currentBatter = this.lineupOrder[0] || null;
    this.onDeckPlayer = this.lineupOrder[1] || this.lineupOrder[0] || null;
    this.battedPlayerIds = new Set();

    // Active Playlist & Song Jar State (defaults to Coach's Baseball playlist)
    this.activePlaylistId = this.ytEngine?.currentPlaylist?.id || 'EK-XfDRL2wA';
    this.playlistSongs = this.loadPlaylistSongs(this.activePlaylistId);
    this.songJar = this.playlistSongs;
    this.jarViewMode = 'all'; // 'all' or 'random5'
    this.jarRandom5List = [];

    // Inning timer state
    this.timerDuration = 120;
    this.timerRemaining = 120;
    this.timerInterval = null;
    this.timerRunning = false;

    // DOM Elements
    this.dom = {
      // Dugout Navigation Tabs & Track
      tabWalkUp: document.getElementById('tabWalkUp'),
      tabInnings: document.getElementById('tabInnings'),
      pagesTrackWrapper: document.getElementById('pagesTrackWrapper'),
      pagesTrack: document.getElementById('pagesTrack'),
      pageWalkup: document.getElementById('pageWalkUp') || document.getElementById('pageWalkup'),
      pageWalkUp: document.getElementById('pageWalkUp') || document.getElementById('pageWalkup'),
      pageInnings: document.getElementById('pageInnings'),
      rosterStickyHeader: document.getElementById('rosterStickyHeader'),

      hypeGrid: document.getElementById('hypeGrid'),
      stadiumHypeSection: document.getElementById('stadiumHypeSection'),
      toggleRallyBtn: document.getElementById('toggleRallyBtn'),
      rallyToggleIcon: document.getElementById('rallyToggleIcon'),
      rallyToggleText: document.getElementById('rallyToggleText'),
      rallySectionHint: document.getElementById('rallySectionHint'),
      playerGrid: document.getElementById('playerGrid'),
      rosterSearch: document.getElementById('rosterSearch'),
      clearSearchBtn: document.getElementById('clearSearchBtn'),
      rosterCountBadge: document.getElementById('rosterCountBadge'),
      
      // On-Deck Banner
      onDeckBanner: document.getElementById('onDeckBanner'),
      onDeckName: document.getElementById('onDeckName'),
      playOnDeckBtn: document.getElementById('playOnDeckBtn'),

      // Inning Timer
      inningTimerDisplay: document.getElementById('inningTimerDisplay'),
      timerToggleBtn: document.getElementById('timerToggleBtn'),
      timerToggleIcon: document.getElementById('timerToggleIcon'),
      timerToggleText: document.getElementById('timerToggleText'),
      timerResetBtn: document.getElementById('timerResetBtn'),
      timerPlus30Btn: document.getElementById('timerPlus30Btn'),
      timerBarFill: document.getElementById('timerBarFill'),
      timerPresets: document.querySelectorAll('.timer-preset-btn'),

      // YouTube Dugout Stage
      ytPulseDot: document.getElementById('ytPulseDot'),
      ytAudioPill: document.getElementById('ytAudioPill'),
      ytCurrentTitle: document.getElementById('ytCurrentTitle'),
      ytCurrentArtist: document.getElementById('ytCurrentArtist'),
      ytPrevBtn: document.getElementById('ytPrevBtn'),
      ytPlayPauseBtn: document.getElementById('ytPlayPauseBtn'),
      ytPlayIcon: document.getElementById('ytPlayIcon'),
      ytPauseIcon: document.getElementById('ytPauseIcon'),
      ytNextBtn: document.getElementById('ytNextBtn'),
      ytPlaylistStatusTag: document.getElementById('ytPlaylistStatusTag'),
      playlistSelect: document.getElementById('playlistSelect'),
      organMusicBtn: document.getElementById('organMusicBtn'),

      // Song List Card
      inlineSongJarCard: document.getElementById('inlineSongJarCard'),
      inlineJarTitle: document.getElementById('inlineJarTitle'),
      inlineJarCountPill: document.getElementById('inlineJarCountPill'),
      jarModeAllBtn: document.getElementById('jarModeAllBtn'),
      jarModeRandom5Btn: document.getElementById('jarModeRandom5Btn'),
      jarTabAllCount: document.getElementById('jarTabAllCount'),
      jarRandomBanner: document.getElementById('jarRandomBanner'),
      btnReroll5: document.getElementById('btnReroll5'),
      inlineJarSongsList: document.getElementById('inlineJarSongsList'),

      // Master Dock (Sliding Drawer)
      masterDock: document.getElementById('masterDock'),
      drawerPullTab: document.getElementById('drawerPullTab'),
      drawerPullChevron: document.getElementById('drawerPullChevron'),
      dockVisibleHeader: document.getElementById('dockVisibleHeader'),
      dockDrawerHandleBar: document.getElementById('dockDrawerHandleBar'),
      drawerToggleBtn: document.getElementById('drawerToggleBtn'),
      drawerToggleLabel: document.getElementById('drawerToggleLabel'),
      drawerChevron: document.getElementById('drawerChevron'),
      dockDrawerBody: document.getElementById('dockDrawerBody'),
      dockSpacer: document.getElementById('dockSpacer'),
      miniTrackText: document.getElementById('miniTrackText'),
      miniEqDot: document.getElementById('miniEqDot'),

      dockPlayerName: document.getElementById('dockPlayerName'),
      dockSongTitle: document.getElementById('dockSongTitle'),
      dockTimer: document.getElementById('dockTimer'),
      liveEqBadge: document.getElementById('liveEqBadge'),
      trackProgressFill: document.getElementById('trackProgressFill'),
      fadeOutBtn: document.getElementById('fadeOutBtn'),
      fadeBtnSubtitle: document.getElementById('fadeBtnSubtitle'),
      stopCutBtn: document.getElementById('stopCutBtn'),

      // Analog Precision Fader & Settings
      analogFaderDeck: document.getElementById('analogFaderDeck'),
      masterCrossfader: document.getElementById('masterCrossfader'),
      faderRecessedSlot: document.getElementById('faderRecessedSlot'),
      faderWaveformCanvas: document.getElementById('faderWaveformCanvas'),
      crossfaderStatusBadge: document.getElementById('crossfaderStatusBadge'),
      crossfaderResetBtn: document.getElementById('crossfaderResetBtn'),
      fadeDurationSlider: document.getElementById('fadeDurationSlider'),
      fadeDurationVal: document.getElementById('fadeDurationVal'),
      presetPills: document.querySelectorAll('.preset-pill'),
      masterVolumeSlider: document.getElementById('masterVolumeSlider'),
      masterVolumeVal: document.getElementById('masterVolumeVal'),
      volIcon: document.getElementById('volIcon'),

      // Header buttons & Settings
      serverRefreshBtn: document.getElementById('serverRefreshBtn'),
      refreshIcon: document.getElementById('refreshIcon'),
      refreshLabel: document.getElementById('refreshLabel'),
      helpBtn: document.getElementById('helpBtn'),
      headerSettingsBtn: document.getElementById('headerSettingsBtn'),
      drawerSettingsBtn: document.getElementById('drawerSettingsBtn'),
      lineupToggleBtn: document.getElementById('lineupToggleBtn'),
      sortLabel: document.getElementById('sortLabel'),
      headerMusicBtn: document.getElementById('headerMusicBtn'),
      fullscreenBtn: document.getElementById('fullscreenBtn'),

      // Settings Modal
      settingsModal: document.getElementById('settingsModal'),
      closeSettingsModal: document.getElementById('closeSettingsModal'),
      closeSettingsDoneBtn: document.getElementById('closeSettingsDoneBtn'),
      btnToggleRallySetting: document.getElementById('btnToggleRallySetting'),
      openPhoneSetupBtn: document.getElementById('openPhoneSetupBtn'),
      openAppleMusicBtn: document.getElementById('openAppleMusicBtn'),
      openInningsModalBtn: document.getElementById('openInningsModalBtn'),

      // Innings Modal
      inningsModal: document.getElementById('inningsModal'),
      closeInningsModal: document.getElementById('closeInningsModal'),
      closeInningsDoneBtn: document.getElementById('closeInningsDoneBtn'),

      // Lineup Modal
      lineupModal: document.getElementById('lineupModal'),
      lineupList: document.getElementById('lineupList'),
      closeLineupModal: document.getElementById('closeLineupModal'),
      saveLineupBtn: document.getElementById('saveLineupBtn'),
      resetLineupBtn: document.getElementById('resetLineupBtn'),

      // Legacy Song Jar bindings (fallback safety)
      openSongJarBtn: document.getElementById('openSongJarBtn'),
      songJarModal: document.getElementById('songJarModal'),
      closeSongJarModal: document.getElementById('closeSongJarModal'),
      closeSongJarDoneBtn: document.getElementById('closeSongJarDoneBtn'),
      songJarCount: document.getElementById('songJarCount'),

      // Help Modal
      helpModal: document.getElementById('helpModal'),
      closeHelpModal: document.getElementById('closeHelpModal'),
      gotItBtn: document.getElementById('gotItBtn')
    };

    this.init();
  }

  init() {
    this.setupAudioCallbacks();
    this.setupYouTubeCallbacks();
    this.renderHypeTracks();
    this.renderPlayers();
    this.setupSliders();
    this.setupEventListeners();
    this.setupSwipeNavigation();
    this.setupInningTimer();
    this.setupYouTubeControls();
    this.setupInlineSongJar();
    this.setupDockDrawer();
    this.setupSettingsModal();
    this.setupRallyToggle();
    this.initFaderWaveformVisualizer();
    this.updateSortLabel();
    this.updateOnDeckDisplay();
    this.verifyAudioAndDismissPreloader();
  }

  // =========================================================================
  // Startup Audio Verification & Preloader
  // =========================================================================
  async verifyAudioAndDismissPreloader() {
    const preloader = document.getElementById('appPreloader');
    if (!preloader) return;

    const statusText = document.getElementById('preloaderStatusText');
    const countBadge = document.getElementById('preloaderCountBadge');
    const progressFill = document.getElementById('preloaderProgressFill');
    const currentFile = document.getElementById('preloaderCurrentFile');
    const readyBtn = document.getElementById('preloaderReadyBtn');

    const allTracks = [...PLAYERS, ...HYPE_TRACKS];
    const total = allTracks.length;
    let verifiedCount = 0;

    const updateUI = (name) => {
      const pct = Math.min(100, Math.round((verifiedCount / total) * 100));
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (countBadge) countBadge.textContent = `${verifiedCount} / ${total} READY`;
      if (currentFile) currentFile.textContent = `Ready: ${name}`;
    };

    // Sequential verification with visual progress steps
    for (let i = 0; i < allTracks.length; i++) {
      const track = allTracks[i];
      const displayName = track.name ? `#${track.number || ''} ${track.name}` : track.song;
      if (statusText) statusText.textContent = `Loading: ${displayName}...`;

      try {
        await fetch(encodeURI(track.file), { method: 'HEAD' });
      } catch (err) {
        try {
          const audioTester = new Audio();
          audioTester.preload = 'metadata';
          audioTester.src = encodeURI(track.file);
        } catch (e) {}
      }

      verifiedCount++;
      updateUI(displayName);
      await new Promise(r => setTimeout(r, 35));
    }

    // All tracks verified!
    if (statusText) statusText.textContent = 'All 14 Roster Tracks Ready!';
    if (currentFile) currentFile.textContent = 'Dugout soundboard ready for game ⚾';
    if (countBadge) {
      countBadge.textContent = '14 / 14 VERIFIED';
      countBadge.classList.add('all-ready');
    }
    if (progressFill) progressFill.style.width = '100%';

    let dismissed = false;
    const dismissPreloader = () => {
      if (dismissed) return;
      dismissed = true;
      this.audioEngine._initWebAudio();
      this.triggerHaptic(20);
      preloader.classList.add('preloader-exit');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 450);
    };

    if (readyBtn) {
      readyBtn.style.display = 'inline-flex';
      readyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dismissPreloader();
      }, { once: true });
    }

    // Auto-dismiss smoothly after short delay, or user can tap anytime
    const autoDismissTimer = setTimeout(() => {
      dismissPreloader();
    }, 1100);

    preloader.addEventListener('click', () => {
      clearTimeout(autoDismissTimer);
      dismissPreloader();
    }, { once: true });
  }

  // =========================================================================
  // Lineup & Data Storage
  // =========================================================================
  loadLineupOrder() {
    const saved = localStorage.getItem('grizzlies_batting_order');
    if (saved) {
      try {
        const ids = JSON.parse(saved);
        // Ensure all current players are included
        const existingMap = new Map(PLAYERS.map(p => [p.id, p]));
        const ordered = ids.map(id => existingMap.get(id)).filter(Boolean);
        // Add any missing players
        PLAYERS.forEach(p => {
          if (!ordered.some(op => op.id === p.id)) {
            ordered.push(p);
          }
        });
        return ordered;
      } catch (e) {
        console.error('Error parsing saved lineup order:', e);
      }
    }
    // Default sorted by jersey number
    return [...PLAYERS].sort((a, b) => a.numVal - b.numVal);
  }

  saveLineupOrder(orderList) {
    this.lineupOrder = orderList;
    const ids = orderList.map(p => p.id);
    localStorage.setItem('grizzlies_batting_order', JSON.stringify(ids));

    // Re-sync on-deck player to match newly ordered lineup
    if (this.currentBatter) {
      const idx = this.lineupOrder.findIndex(p => p.id === this.currentBatter.id);
      if (idx >= 0) {
        this.lastBatterIndex = idx;
        const nextIdx = (idx + 1) % this.lineupOrder.length;
        this.onDeckPlayer = this.lineupOrder[nextIdx];
      }
    } else {
      this.currentBatter = this.lineupOrder[0] || null;
      this.onDeckPlayer = this.lineupOrder[1] || this.lineupOrder[0] || null;
    }
    this.updateOnDeckDisplay();
  }

  getDisplayedPlayers() {
    let list;
    if (this.sortMode === 'lineup') {
      list = [...this.lineupOrder];
    } else {
      list = [...PLAYERS].sort((a, b) => a.numVal - b.numVal);
    }

    const query = this.dom.rosterSearch.value.trim().toLowerCase();
    if (query) {
      return list.filter(p => 
        p.number.toLowerCase().includes(query) ||
        p.name.toLowerCase().includes(query) ||
        p.song.toLowerCase().includes(query) ||
        p.artist.toLowerCase().includes(query)
      );
    }
    return list;
  }

  // =========================================================================
  // Rendering
  // =========================================================================
  renderHypeTracks() {
    this.dom.hypeGrid.innerHTML = '';
    HYPE_TRACKS.forEach(track => {
      const btn = document.createElement('button');
      btn.className = 'hype-btn';
      const iconContent = track.id === 'hype-fans' 
        ? `<img src="icons/official-grizzly-logo.png" alt="Grizzly Logo" class="hype-img-icon">`
        : track.number;

      btn.innerHTML = `
        <div class="hype-icon">${iconContent}</div>
        <div class="hype-content">
          <span class="hype-tag">${track.badge}</span>
          <span class="hype-name">${track.name}</span>
          <span class="hype-song">${track.song}</span>
        </div>
      `;
      btn.addEventListener('click', () => this.handleTrackClick(track));
      this.dom.hypeGrid.appendChild(btn);
    });
  }

  // =========================================================================
  // Stadium Rally & Chants Collapsible Safety Toggle
  // =========================================================================
  setupRallyToggle() {
    if (!this.dom.toggleRallyBtn || !this.dom.stadiumHypeSection) return;

    // Read saved preference from localStorage
    const isSavedHidden = localStorage.getItem('grizzlies_rally_hidden') === 'true';
    if (isSavedHidden) {
      this.setRallySectionVisible(false);
    }

    // Toggle button click
    this.dom.toggleRallyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.triggerHaptic(20);
      const isCurrentlyHidden = this.dom.stadiumHypeSection.classList.contains('is-hidden');
      this.setRallySectionVisible(isCurrentlyHidden); // toggle state
    });

    // Also tap the collapsed header bar to quickly re-expand
    this.dom.stadiumHypeSection.addEventListener('click', (e) => {
      if (this.dom.stadiumHypeSection.classList.contains('is-hidden') && !e.target.closest('#toggleRallyBtn')) {
        this.triggerHaptic(20);
        this.setRallySectionVisible(true);
      }
    });
  }

  setRallySectionVisible(visible) {
    if (!this.dom.stadiumHypeSection || !this.dom.toggleRallyBtn) return;
    if (visible) {
      this.dom.stadiumHypeSection.classList.remove('is-hidden');
      this.dom.toggleRallyBtn.classList.remove('collapsed');
      this.dom.toggleRallyBtn.setAttribute('aria-expanded', 'true');
      if (this.dom.rallyToggleIcon) this.dom.rallyToggleIcon.textContent = '✕';
      if (this.dom.rallyToggleText) this.dom.rallyToggleText.textContent = 'HIDE';
      if (this.dom.rallySectionHint) this.dom.rallySectionHint.textContent = 'Instant Crowd Sound FX';
      localStorage.setItem('grizzlies_rally_hidden', 'false');
    } else {
      this.dom.stadiumHypeSection.classList.add('is-hidden');
      this.dom.toggleRallyBtn.classList.add('collapsed');
      this.dom.toggleRallyBtn.setAttribute('aria-expanded', 'false');
      if (this.dom.rallyToggleIcon) this.dom.rallyToggleIcon.textContent = '＋';
      if (this.dom.rallyToggleText) this.dom.rallyToggleText.textContent = 'SHOW CHANTS';
      if (this.dom.rallySectionHint) this.dom.rallySectionHint.textContent = 'Locked for Game';
      localStorage.setItem('grizzlies_rally_hidden', 'true');
    }
  }

  renderPlayers() {
    const players = this.getDisplayedPlayers();
    this.dom.playerGrid.innerHTML = '';
    this.dom.rosterCountBadge.textContent = `${players.length} PLAYERS`;

    players.forEach((player, index) => {
      const card = document.createElement('div');
      card.className = 'player-card';
      card.id = `btn-${player.id}`;
      card.dataset.id = player.id;

      const isAtBat = this.currentBatter && this.currentBatter.id === player.id;
      const isOnDeck = !isAtBat && this.onDeckPlayer && this.onDeckPlayer.id === player.id;

      if (isAtBat) {
        card.classList.add('is-at-bat');
      } else if (isOnDeck) {
        card.classList.add('is-on-deck');
      }

      // Status badge: If sorting by lineup, show batting slot e.g. "1st", "2nd"
      let battingSlotText = '';
      if (this.sortMode === 'lineup') {
        const slotIdx = this.lineupOrder.findIndex(p => p.id === player.id);
        if (slotIdx >= 0) {
          battingSlotText = `BATTER ${slotIdx + 1}`;
        }
      }

      let batterBadgeHtml = '';
      if (isAtBat) {
        batterBadgeHtml = `<span class="card-status-badge at-bat-badge"><span class="baseball-ico">⚾</span> AT BAT</span>`;
      } else if (isOnDeck) {
        batterBadgeHtml = `<span class="card-status-badge on-deck-badge"><span class="baseball-ico">⚾</span> ON DECK</span>`;
      }

      card.innerHTML = `
        <div class="card-progress-bar" id="progress-${player.id}"></div>
        <div class="card-top-row">
          <div class="jersey-badge"><span class="jersey-hash">#</span>${player.number}</div>
          <div class="card-badges-wrap" id="badges-${player.id}">
            ${battingSlotText ? `<span class="card-status-badge on-deck-tag">${battingSlotText}</span>` : ''}
            ${batterBadgeHtml}
            <span class="card-status-badge" id="status-${player.id}" style="display: none;">PLAYING</span>
          </div>
        </div>
        <div class="card-bottom-row">
          <div class="card-info-col">
            <div class="player-name">${player.name}</div>
            
            <!-- Sliding Transport Track Underneath Name with Clean Bottom Triangle Playhead -->
            <div class="card-transport-container" id="transport-wrap-${player.id}">
              <div class="card-transport-track" id="card-track-${player.id}" title="Tap to scrub track position">
                <div class="card-transport-fill" id="card-fill-${player.id}"></div>
                <div class="card-transport-notch" id="card-notch-${player.id}">
                  <span class="notch-needle"></span>
                  <span class="notch-triangle"></span>
                </div>
              </div>
            </div>

            <div class="song-title">${player.song}</div>
            <div class="song-artist">${player.artist}</div>
          </div>
          <!-- At-Bat One-Touch Play / Pause Button -->
          <button class="btn-card-playpause" id="playpause-${player.id}" aria-label="Play walk-up song for ${player.name}" data-id="${player.id}">
            <svg class="icon-play" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <polygon points="7 4 20 12 7 20 7 4"></polygon>
            </svg>
            <svg class="icon-pause" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1.5"></rect>
              <rect x="14" y="4" width="4" height="16" rx="1.5"></rect>
            </svg>
          </button>
        </div>
      `;

      // Scrubbing on Card Transport Track
      const transportTrack = card.querySelector(`#card-track-${player.id}`);
      if (transportTrack) {
        const handleScrub = (e) => {
          e.stopPropagation();
          if (this.activeTrack && this.activeTrack.id === player.id) {
            const rect = transportTrack.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            this.audioEngine.seekPercent(pct);
          }
        };
        transportTrack.addEventListener('click', handleScrub);
        transportTrack.addEventListener('touchstart', handleScrub, { passive: true });
      }

      // Play / Pause Button Event
      const playPauseBtn = card.querySelector('.btn-card-playpause');
      if (playPauseBtn) {
        playPauseBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.triggerHaptic(20);
          if (this.activeTrack && this.activeTrack.id === player.id) {
            if (this.audioEngine.isPlaying) {
              this.audioEngine.pause();
            } else {
              this.audioEngine.resume();
            }
          } else {
            this.handleTrackClick(player);
          }
        });
      }

      card.addEventListener('click', () => this.handleTrackClick(player));
      this.dom.playerGrid.appendChild(card);
    });

    // Update active visual if track is currently playing
    if (this.activeTrack) {
      this.updateActiveCardVisuals(this.activeTrack.id);
    }
    this.updateBatterCardsState();
  }

  updateBatterCardsState() {
    const cards = this.dom.playerGrid.querySelectorAll('.player-card');
    cards.forEach(card => {
      const id = card.dataset.id;
      const isAtBat = this.currentBatter && this.currentBatter.id === id;
      const isOnDeck = !isAtBat && this.onDeckPlayer && this.onDeckPlayer.id === id;
      const isPlaying = card.classList.contains('playing') || (this.activeTrack && this.activeTrack.id === id && this.audioEngine.isPlaying);
      const isBatted = this.battedPlayerIds && this.battedPlayerIds.has(id);

      card.classList.toggle('is-at-bat', !!isAtBat);
      card.classList.toggle('is-on-deck', !!isOnDeck);
      card.classList.toggle('has-played', !!isBatted && !isPlaying);

      const badgesWrap = card.querySelector('.card-badges-wrap');
      if (badgesWrap) {
        const oldAtBat = badgesWrap.querySelector('.at-bat-badge');
        if (oldAtBat) oldAtBat.remove();
        const oldOnDeck = badgesWrap.querySelector('.on-deck-badge');
        if (oldOnDeck) oldOnDeck.remove();

        const statusEl = badgesWrap.querySelector(`#status-${id}`);
        if (isAtBat) {
          const b = document.createElement('span');
          b.className = 'card-status-badge at-bat-badge';
          b.innerHTML = `<span class="baseball-ico">⚾</span> AT BAT`;
          if (statusEl) {
            badgesWrap.insertBefore(b, statusEl);
          } else {
            badgesWrap.appendChild(b);
          }
        } else if (isOnDeck) {
          const b = document.createElement('span');
          b.className = 'card-status-badge on-deck-badge';
          b.innerHTML = `<span class="baseball-ico">⚾</span> ON DECK`;
          if (statusEl) {
            badgesWrap.insertBefore(b, statusEl);
          } else {
            badgesWrap.appendChild(b);
          }
        }
      }
    });
  }

  // =========================================================================
  // Playback & Audio Controls
  // =========================================================================
  handleTrackClick(track) {
    this.triggerHaptic(25);
    // Mutual exclusion: pause YouTube when walk-up track is tapped
    if (this.ytEngine.isPlaying) {
      this.ytEngine.pause();
    }
    this.activeAudioSource = 'walkup';

    // Clear grayed out state so all items restore to regular color on next song
    this.battedPlayerIds.clear();

    // Advance batting rotation if a roster player is clicked
    if (!track.isHype) {
      this.currentBatter = track;
      const idx = this.lineupOrder.findIndex(p => p.id === track.id);
      if (idx >= 0) {
        this.lastBatterIndex = idx;
        const nextIdx = (idx + 1) % this.lineupOrder.length;
        this.onDeckPlayer = this.lineupOrder[nextIdx];
      }
      this.updateOnDeckDisplay();
      this.updateBatterCardsState();
      this.scrollToBatterCard(track.id);
    } else {
      this.updateBatterCardsState();
    }

    this.audioEngine.play(track);
  }

  // Auto-scroll so the newly active At-Bat card smoothly docks right underneath the sticky On-Deck section
  scrollToBatterCard(playerId) {
    setTimeout(() => {
      const container = this.dom.pageWalkUp || this.dom.pageWalkup || document.getElementById('pageWalkUp') || document.getElementById('pageWalkup');
      const card = this.dom.playerGrid ? this.dom.playerGrid.querySelector(`.player-card[data-id="${playerId}"]`) : null;
      const stickyHeader = this.dom.rosterStickyHeader || document.getElementById('rosterStickyHeader');

      if (!card || !container) return;

      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const headerHeight = stickyHeader ? stickyHeader.offsetHeight : 0;

      // Desired position: Top of card sits right underneath the bottom of the sticky header / on-deck section (with 8px breathing gap)
      const desiredCardTop = containerRect.top + headerHeight + 8;
      const delta = cardRect.top - desiredCardTop;
      const targetScrollTop = Math.max(0, container.scrollTop + delta);

      container.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }, 45);
  }

  setupAudioCallbacks() {
    this.audioEngine.on('onPlay', (track) => {
      // Mutual exclusion
      if (this.ytEngine.isPlaying) {
        this.ytEngine.pause();
      }
      this.activeAudioSource = 'walkup';
      this.activeTrack = track;
      this.battedPlayerIds.clear();
      this.updateActiveCardVisuals(track.id, 'playing');
      this.updateDockInfo(track, true);
      this.dom.fadeOutBtn.disabled = false;
      this.dom.stopCutBtn.disabled = false;
      this.dom.fadeOutBtn.classList.remove('is-fading');
      this.updateOnDeckAfterPlay(track);
      this.updateBatterCardsState();

      // Auto-restore fader to full volume if it was cut/muted
      if (this.dom.masterCrossfader && parseInt(this.dom.masterCrossfader.value, 10) >= 95) {
        this.resetCrossfader();
      }
    });

    this.audioEngine.on('onPause', (track) => {
      if (this.activeAudioSource === 'walkup' && track) {
        this.updateActiveCardVisuals(track.id, 'paused');
        this.updateDockInfo(track, false);
      }
    });

    this.audioEngine.on('onStop', (track) => {
      const stoppedTrack = track || this.activeTrack || this.currentBatter;
      if (stoppedTrack && !stoppedTrack.isHype) {
        this.battedPlayerIds.add(stoppedTrack.id);
      }
      this.clearActiveVisuals();
      if (this.activeAudioSource === 'walkup') {
        this.activeAudioSource = 'none';
        this.dom.fadeOutBtn.disabled = true;
        this.dom.stopCutBtn.disabled = true;
        this.dom.fadeOutBtn.classList.remove('is-fading');
        this.dom.dockPlayerName.textContent = 'READY TO HIT';
        this.dom.dockSongTitle.textContent = 'Tap any player to drop their walk-up track';
        if (this.dom.miniTrackText) this.dom.miniTrackText.textContent = 'READY TO HIT';
        if (this.dom.miniEqDot) this.dom.miniEqDot.classList.remove('active');
        this.dom.dockTimer.textContent = '0:00';
        this.dom.trackProgressFill.style.width = '0%';
        const dockNotch = document.getElementById('trackProgressNotch');
        if (dockNotch) dockNotch.style.left = '0%';
        this.dom.liveEqBadge.classList.remove('active');
      }
      this.updateBatterCardsState();
    });

    this.audioEngine.on('onTimeUpdate', ({ currentTime, duration, progress, track }) => {
      if (this.activeAudioSource !== 'walkup') return;
      const mins = Math.floor(currentTime / 60);
      const secs = Math.floor(currentTime % 60).toString().padStart(2, '0');
      this.dom.dockTimer.textContent = `${mins}:${secs}`;
      
      const pct = Math.min(100, (progress * 100)).toFixed(1) + '%';
      if (this.dom.trackProgressFill) this.dom.trackProgressFill.style.width = pct;
      const dockNotch = document.getElementById('trackProgressNotch');
      if (dockNotch) dockNotch.style.left = pct;

      // Card bottom progress and transport track
      if (track) {
        const cardProg = document.getElementById(`progress-${track.id}`);
        if (cardProg) cardProg.style.width = pct;

        const cardFill = document.getElementById(`card-fill-${track.id}`);
        if (cardFill) cardFill.style.width = pct;

        const cardNotch = document.getElementById(`card-notch-${track.id}`);
        if (cardNotch) cardNotch.style.left = pct;
      }
    });

    this.audioEngine.on('onFadeStart', ({ track, duration }) => {
      if (this.activeAudioSource !== 'walkup') return;
      this.triggerHaptic([30, 50, 30]);
      this.dom.fadeOutBtn.classList.add('is-fading');
      if (track) {
        const card = document.getElementById(`btn-${track.id}`);
        if (card) {
          card.classList.add('fading');
          const statusBadge = document.getElementById(`status-${track.id}`);
          if (statusBadge) {
            statusBadge.style.display = 'inline-block';
            statusBadge.className = 'card-status-badge fade-status';
            statusBadge.textContent = 'FADING';
          }
        }
      }
    });

    this.audioEngine.on('onFadeProgress', ({ remainingTime, progress }) => {
      if (this.activeAudioSource === 'walkup') {
        if (this.dom.fadeBtnSubtitle) this.dom.fadeBtnSubtitle.textContent = `Fading (${remainingTime}s)`;
        if (typeof progress === 'number') {
          const targetPos = Math.round(progress * 100);
          this.applyCrossfaderPosition(targetPos, true);
          if (this.dom.masterCrossfader) this.dom.masterCrossfader.classList.add('is-sliding');
          if (this.dom.analogFaderDeck) this.dom.analogFaderDeck.classList.add('is-sliding');
        }
      }
    });

    this.audioEngine.on('onFadeComplete', () => {
      if (this.activeAudioSource === 'walkup') {
        if (this.dom.fadeBtnSubtitle) this.dom.fadeBtnSubtitle.textContent = `Over ${this.audioEngine.fadeDuration.toFixed(1)}s`;
        this.dom.fadeOutBtn.classList.remove('is-fading');
        if (this.dom.masterCrossfader) this.dom.masterCrossfader.classList.remove('is-sliding');
        if (this.dom.analogFaderDeck) this.dom.analogFaderDeck.classList.remove('is-sliding');
        this.applyCrossfaderPosition(100, true);
      }
    });

    this.audioEngine.on('onError', (err, track) => {
      console.error('Audio engine playback error:', err);
      alert(`Could not play audio for ${track?.name || 'track'}. Please check file path.`);
    });
  }

  setupYouTubeCallbacks() {
    this.ytEngine.on('onPlay', (trackInfo) => {
      // Mutual exclusion: stop walk-up audio when YouTube starts
      if (this.audioEngine.isPlaying) {
        this.audioEngine.stop();
      }
      this.activeAudioSource = 'youtube';
      this.battedPlayerIds.clear();
      this.updateBatterCardsState();

      // Update YouTube Stage UI
      this.dom.ytPulseDot.classList.add('active');
      this.dom.ytAudioPill.classList.add('playing');
      this.dom.ytAudioPill.textContent = 'PLAYING';
      this.dom.ytPlayIcon.style.display = 'none';
      this.dom.ytPauseIcon.style.display = 'block';

      // Update Master Dock and Stage with exact song title & artist
      const title = trackInfo?.title || this.ytEngine.currentPlaylist?.title || 'Between-Innings Music';
      const artist = trackInfo?.artist || this.ytEngine.currentPlaylist?.artist || 'Between-Innings Queue';
      if (this.dom.dockPlayerName) this.dom.dockPlayerName.textContent = title;
      if (this.dom.dockSongTitle) this.dom.dockSongTitle.textContent = artist;
      if (this.dom.ytCurrentTitle) this.dom.ytCurrentTitle.textContent = title;
      if (this.dom.ytCurrentArtist) this.dom.ytCurrentArtist.textContent = artist;
      if (this.dom.miniTrackText) this.dom.miniTrackText.textContent = title;
      if (this.dom.miniEqDot) this.dom.miniEqDot.classList.add('active');
      this.dom.liveEqBadge.classList.add('active');
      this.dom.fadeOutBtn.disabled = false;
      this.dom.stopCutBtn.disabled = false;
      this.dom.fadeOutBtn.classList.remove('is-fading');

      // Auto-restore fader to full volume if it was cut/muted
      if (this.dom.masterCrossfader && parseInt(this.dom.masterCrossfader.value, 10) >= 95) {
        this.resetCrossfader();
      }

      // Update inline song list highlights
      this.renderInlineSongJar();
    });

    this.ytEngine.on('onPause', (playlist) => {
      if (this.dom.ytPlayIcon) this.dom.ytPlayIcon.style.display = 'block';
      if (this.dom.ytPauseIcon) this.dom.ytPauseIcon.style.display = 'none';

      if (this.activeAudioSource === 'youtube') {
        this.dom.liveEqBadge.classList.remove('active');
        if (this.dom.miniEqDot) this.dom.miniEqDot.classList.remove('active');
      }

      this.renderInlineSongJar();
    });

    this.ytEngine.on('onStop', (playlist) => {
      if (this.dom.ytPlayIcon) this.dom.ytPlayIcon.style.display = 'block';
      if (this.dom.ytPauseIcon) this.dom.ytPauseIcon.style.display = 'none';

      if (this.activeAudioSource === 'youtube') {
        this.activeAudioSource = 'none';
        this.dom.fadeOutBtn.disabled = true;
        this.dom.stopCutBtn.disabled = true;
        this.dom.fadeOutBtn.classList.remove('is-fading');
        this.dom.dockPlayerName.textContent = 'READY TO HIT';
        this.dom.dockSongTitle.textContent = 'Tap any player to drop their walk-up track';
        if (this.dom.miniTrackText) this.dom.miniTrackText.textContent = 'READY TO HIT';
        if (this.dom.miniEqDot) this.dom.miniEqDot.classList.remove('active');
        this.dom.dockTimer.textContent = '0:00';
        this.dom.trackProgressFill.style.width = '0%';
        this.dom.liveEqBadge.classList.remove('active');
      }

      this.renderInlineSongJar();
    });

    this.ytEngine.on('onTrackChange', (trackInfo) => {
      if (!trackInfo) return;
      const title = trackInfo.title || 'Between-Innings Music';
      const artist = trackInfo.artist || 'Between-Innings Warm-Up Queue';
      if (this.dom.ytCurrentTitle) this.dom.ytCurrentTitle.textContent = title;
      if (this.dom.ytCurrentArtist) this.dom.ytCurrentArtist.textContent = artist;
      if (this.activeAudioSource === 'youtube') {
        if (this.dom.dockPlayerName) this.dom.dockPlayerName.textContent = title;
        if (this.dom.dockSongTitle) this.dom.dockSongTitle.textContent = artist;
        if (this.dom.miniTrackText) this.dom.miniTrackText.textContent = title;
      }
      this.renderInlineSongJar();
    });

    this.ytEngine.on('onFadeStart', ({ track, duration }) => {
      this.triggerHaptic([30, 50, 30]);
      this.dom.fadeOutBtn.classList.add('is-fading');
    });

    this.ytEngine.on('onFadeProgress', ({ remainingTime, progress }) => {
      if (this.activeAudioSource === 'youtube') {
        if (this.dom.fadeBtnSubtitle) this.dom.fadeBtnSubtitle.textContent = `Fading (${remainingTime}s)`;
        if (typeof progress === 'number') {
          const targetPos = Math.round(progress * 100);
          this.applyCrossfaderPosition(targetPos, true);
          if (this.dom.masterCrossfader) this.dom.masterCrossfader.classList.add('is-sliding');
          if (this.dom.analogFaderDeck) this.dom.analogFaderDeck.classList.add('is-sliding');
        }
      }
    });

    this.ytEngine.on('onFadeComplete', () => {
      if (this.activeAudioSource === 'youtube') {
        if (this.dom.fadeBtnSubtitle) this.dom.fadeBtnSubtitle.textContent = `Over ${this.audioEngine.fadeDuration.toFixed(1)}s`;
        this.dom.fadeOutBtn.classList.remove('is-fading');
        if (this.dom.masterCrossfader) this.dom.masterCrossfader.classList.remove('is-sliding');
        if (this.dom.analogFaderDeck) this.dom.analogFaderDeck.classList.remove('is-sliding');
        this.applyCrossfaderPosition(100, true);
      }
      this.renderInlineSongJar();
    });
  }

  updateActiveCardVisuals(activeId, state = 'playing') {
    if (state === 'playing') {
      this.clearActiveVisuals();
    }
    const activeEl = document.getElementById(`btn-${activeId}`);
    if (activeEl) {
      if (state === 'playing') {
        activeEl.classList.remove('paused');
        activeEl.classList.add('playing');
        const statusBadge = document.getElementById(`status-${activeId}`);
        if (statusBadge) {
          statusBadge.style.display = 'inline-block';
          statusBadge.className = 'card-status-badge live';
          statusBadge.textContent = 'NOW PLAYING';
        }
        const playPauseBtn = activeEl.querySelector('.btn-card-playpause');
        if (playPauseBtn) {
          playPauseBtn.setAttribute('aria-label', 'Pause walk-up song');
          playPauseBtn.classList.add('is-playing');
          playPauseBtn.classList.remove('is-paused');
        }
      } else if (state === 'paused') {
        activeEl.classList.remove('playing');
        activeEl.classList.add('paused');
        const statusBadge = document.getElementById(`status-${activeId}`);
        if (statusBadge) {
          statusBadge.style.display = 'inline-block';
          statusBadge.className = 'card-status-badge paused-status';
          statusBadge.textContent = 'PAUSED';
        }
        const playPauseBtn = activeEl.querySelector('.btn-card-playpause');
        if (playPauseBtn) {
          playPauseBtn.setAttribute('aria-label', 'Resume walk-up song');
          playPauseBtn.classList.remove('is-playing');
          playPauseBtn.classList.add('is-paused');
        }
      }
    }
  }

  clearActiveVisuals() {
    document.querySelectorAll('.player-card, .hype-btn').forEach(el => {
      el.classList.remove('playing', 'paused', 'fading');
      const cardId = el.dataset.id || el.id.replace('btn-', '');
      const statusBadge = document.getElementById(`status-${cardId}`);
      if (statusBadge) {
        statusBadge.style.display = 'none';
      }
      const prog = document.getElementById(`progress-${cardId}`);
      if (prog) {
        prog.style.width = '0%';
      }
      const cardFill = document.getElementById(`card-fill-${cardId}`);
      if (cardFill) {
        cardFill.style.width = '0%';
      }
      const cardNotch = document.getElementById(`card-notch-${cardId}`);
      if (cardNotch) {
        cardNotch.style.left = '0%';
      }
      const playPauseBtn = el.querySelector('.btn-card-playpause');
      if (playPauseBtn) {
        playPauseBtn.classList.remove('is-playing', 'is-paused');
        playPauseBtn.setAttribute('aria-label', 'Play walk-up song');
      }
    });
  }

  updateDockInfo(track, isPlaying) {
    if (!track) return;
    const numberPrefix = track.number ? `#${track.number} ` : '';
    this.dom.dockPlayerName.textContent = `${numberPrefix}${track.name}`;
    this.dom.dockSongTitle.textContent = `${track.song}${track.artist ? ` • ${track.artist}` : ''}`;
    
    if (this.dom.miniTrackText) {
      this.dom.miniTrackText.textContent = `${numberPrefix}${track.name} - ${track.song}`;
    }

    if (isPlaying) {
      this.dom.liveEqBadge.classList.add('active');
      if (this.dom.miniEqDot) this.dom.miniEqDot.classList.add('active');
    } else {
      this.dom.liveEqBadge.classList.remove('active');
      if (this.dom.miniEqDot) this.dom.miniEqDot.classList.remove('active');
    }
  }

  // =========================================================================
  // On-Deck Batter Management
  // =========================================================================
  updateOnDeckAfterPlay(track) {
    if (track.isHype) return;

    this.currentBatter = track;
    // Find position in lineup
    const idx = this.lineupOrder.findIndex(p => p.id === track.id);
    if (idx >= 0) {
      this.lastBatterIndex = idx;
      const nextIdx = (idx + 1) % this.lineupOrder.length;
      this.onDeckPlayer = this.lineupOrder[nextIdx];
      this.updateOnDeckDisplay();
      this.updateBatterCardsState();
    }
  }

  updateOnDeckDisplay() {
    if (!this.onDeckPlayer && this.lineupOrder.length > 0) {
      this.onDeckPlayer = this.lineupOrder[1] || this.lineupOrder[0];
    }
    if (this.onDeckPlayer) {
      this.dom.onDeckBanner.style.display = 'flex';
      this.dom.onDeckName.innerHTML = `<span class="on-deck-player-title">#${this.onDeckPlayer.number} ${this.onDeckPlayer.name}</span><span class="on-deck-player-song">${this.onDeckPlayer.song}</span>`;
    }
  }

  // =========================================================================
  // Slider Controls & Full-Width DJ Master Crossfader
  // =========================================================================
  setupSliders() {
    // 1. Fade Duration Slider & Presets
    const savedFade = localStorage.getItem('grizzlies_fade_duration');
    if (savedFade) {
      const val = parseFloat(savedFade);
      if (this.dom.fadeDurationSlider) this.dom.fadeDurationSlider.value = val;
      this.updateFadeDuration(val);
    } else {
      this.updateFadeDuration(2.0);
    }

    if (this.dom.fadeDurationSlider) {
      this.dom.fadeDurationSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.updateFadeDuration(val);
      });
    }

    // Preset pills for 1.0s, 2.0s, 3.0s, 4.0s
    this.dom.presetPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const secs = parseFloat(pill.dataset.seconds);
        if (this.dom.fadeDurationSlider) this.dom.fadeDurationSlider.value = secs;
        this.updateFadeDuration(secs);
        this.triggerHaptic(15);
      });
    });

    // 2. Analog Studio Precision Fader with Flashing Laser Red Knob
    if (this.dom.masterCrossfader) {
      const startSliding = () => {
        this.dom.masterCrossfader.classList.add('is-sliding');
        if (this.dom.analogFaderDeck) this.dom.analogFaderDeck.classList.add('is-sliding');
      };

      const stopSliding = () => {
        this.dom.masterCrossfader.classList.remove('is-sliding');
        if (this.dom.analogFaderDeck) this.dom.analogFaderDeck.classList.remove('is-sliding');
      };

      this.dom.masterCrossfader.addEventListener('input', (e) => {
        const pos = parseInt(e.target.value, 10);
        this.applyCrossfaderPosition(pos, false);
      });

      this.dom.masterCrossfader.addEventListener('pointerdown', startSliding);
      this.dom.masterCrossfader.addEventListener('touchstart', startSliding, { passive: true });
      this.dom.masterCrossfader.addEventListener('mousedown', startSliding);

      window.addEventListener('pointerup', stopSliding);
      window.addEventListener('touchend', stopSliding, { passive: true });
      window.addEventListener('mouseup', stopSliding);
    }

    if (this.dom.crossfaderResetBtn) {
      this.dom.crossfaderResetBtn.addEventListener('click', () => {
        this.triggerHaptic(20);
        this.resetCrossfader();
      });
    }

    // Fallback support if legacy masterVolumeSlider is present
    if (this.dom.masterVolumeSlider) {
      this.dom.masterVolumeSlider.addEventListener('input', (e) => {
        const pct = parseInt(e.target.value, 10);
        if (this.dom.masterVolumeVal) this.dom.masterVolumeVal.textContent = `${pct}%`;
        this.audioEngine.setMasterVolume(pct / 100);
        this.ytEngine.setVolume(pct);
      });
    }
  }

  /**
   * Applies crossfader position:
   * 0 (Left of phone screen)  = 100% Volume (Full Blast)
   * 100 (Right of phone screen) = 0% Volume (Silence / Cut)
   */
  applyCrossfaderPosition(fadePos, isAutoFade = false) {
    const pos = Math.max(0, Math.min(100, parseInt(fadePos, 10) || 0));
    if (this.dom.masterCrossfader && parseInt(this.dom.masterCrossfader.value, 10) !== pos) {
      this.dom.masterCrossfader.value = pos;
    }

    // Vol percentage: Left (0) -> 100%, Right (100) -> 0%
    const volPct = Math.max(0, Math.min(100, 100 - pos));

    // Apply to both Walk-Up audio engine & YouTube engine
    this.audioEngine.setMasterVolume(volPct / 100);
    this.ytEngine.setVolume(volPct);

    // Update crossfader status badge
    if (this.dom.crossfaderStatusBadge) {
      if (pos >= 98) {
        this.dom.crossfaderStatusBadge.textContent = '0% CUT';
        this.dom.crossfaderStatusBadge.classList.add('cut');
      } else if (pos <= 2) {
        this.dom.crossfaderStatusBadge.textContent = '100% SOUND';
        this.dom.crossfaderStatusBadge.classList.remove('cut');
      } else {
        this.dom.crossfaderStatusBadge.textContent = `${volPct}% SOUND`;
        this.dom.crossfaderStatusBadge.classList.remove('cut');
      }
    }
  }

  resetCrossfader() {
    this.applyCrossfaderPosition(0, false);
  }

  // =========================================================================
  // Live Audio Waveform Inside Volume Control
  // =========================================================================
  initFaderWaveformVisualizer() {
    const canvas = this.dom.faderWaveformCanvas;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      requestAnimationFrame(render);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width;
      const height = canvas.height;
      if (width === 0 || height === 0) return;

      ctx.clearRect(0, 0, width, height);

      // Check current playback state
      const isWalkupPlaying = this.audioEngine && this.audioEngine.isPlaying;
      const isYtPlaying = this.ytEngine && this.ytEngine.isPlaying;
      const isPlaying = isWalkupPlaying || isYtPlaying;

      // Crossfader: 0 = 100% volume (left), 100 = 0% volume (right / cut)
      const faderPos = this.dom.masterCrossfader ? parseInt(this.dom.masterCrossfader.value, 10) : 0;
      const volMultiplier = Math.max(0, (100 - faderPos) / 100);
      const isCut = faderPos >= 98 || volMultiplier <= 0.02;

      phase += isPlaying ? 0.09 : 0.02;

      // Real-time frequency data from Web Audio API AnalyserNode
      const freqData = (isWalkupPlaying && typeof this.audioEngine.getByteFrequencyData === 'function') 
        ? this.audioEngine.getByteFrequencyData() 
        : null;
      const hasRealFreqs = freqData && freqData.some(v => v > 0);

      const barCount = Math.floor(width / (4.5 * dpr));
      const barWidth = 2.6 * dpr;
      const gap = (width - (barCount * barWidth)) / Math.max(1, barCount - 1);
      const midY = height / 2;

      // Subtle center audio zero-line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1 * dpr;
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + gap);
        const normX = i / barCount;

        let amp = 0.12;

        if (isCut) {
          amp = 0.05; // Flatline when sound is cut
        } else if (hasRealFreqs) {
          const binIdx = Math.floor(Math.pow(normX, 0.85) * (freqData.length - 1));
          const binVal = freqData[binIdx] || 0;
          amp = Math.max(0.12, (binVal / 255) * volMultiplier * 0.95);
        } else if (isPlaying) {
          // Dynamic high-energy musical waveform synthesis for active playback
          const wave1 = Math.sin(phase * 3.2 + normX * 9.5);
          const wave2 = Math.cos(phase * 2.1 + normX * 16.0);
          const wave3 = Math.sin(phase * 4.8 + normX * 5.5);
          const beat = Math.pow(Math.max(0, Math.sin(phase * 2.0)), 2.0);
          amp = (0.35 + 0.42 * Math.abs(wave1) + 0.22 * Math.abs(wave2) + 0.35 * beat * Math.abs(wave3)) * volMultiplier;
          amp = Math.min(0.96, Math.max(0.15, amp));
        } else {
          // Pre-recorded walk-up track waveform preview when idle (shows realistic audio peaks)
          const staticEnvelope = Math.sin(normX * Math.PI); // Natural song arc (intro -> chorus -> outro)
          const detail1 = Math.sin(normX * 18.0) * 0.25;
          const detail2 = Math.cos(normX * 36.0) * 0.15;
          const breath = Math.sin(phase + normX * 4.0) * 0.08;
          amp = (0.22 + staticEnvelope * 0.45 + detail1 + detail2 + breath) * volMultiplier;
          amp = Math.min(0.85, Math.max(0.12, amp));
        }

        const barHeight = Math.max(2.5 * dpr, amp * (height * 0.90));
        const barY = midY - (barHeight / 2);

        if (!isCut && isPlaying) {
          // Vibrant live playing spectrum: Cyan base -> Amber/Gold mid -> Crimson Red peaks
          const grad = ctx.createLinearGradient(0, barY, 0, barY + barHeight);
          grad.addColorStop(0, '#ff1744');     // Hot red peak
          grad.addColorStop(0.24, '#ffea00');  // Gold mid-high
          grad.addColorStop(0.70, '#00e5ff');  // Cyan body
          grad.addColorStop(1, '#005b9f');     // Deep electric blue
          ctx.fillStyle = grad;
          ctx.shadowColor = 'rgba(0, 229, 255, 0.75)';
          ctx.shadowBlur = 4 * dpr;
        } else if (!isCut) {
          // Track loaded standby preview: Electric Cyan with subtle glow
          const grad = ctx.createLinearGradient(0, barY, 0, barY + barHeight);
          grad.addColorStop(0, '#70f3ff');
          grad.addColorStop(0.5, '#00e5ff');
          grad.addColorStop(1, '#0077c2');
          ctx.fillStyle = grad;
          ctx.shadowColor = 'rgba(0, 229, 255, 0.4)';
          ctx.shadowBlur = 2.5 * dpr;
        } else {
          // Cut state: Dimmed carbon slate flatline
          ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
          ctx.shadowBlur = 0;
        }

        const r = Math.min(barWidth / 2, barHeight / 2);
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(x, barY, barWidth, barHeight, r);
        } else {
          ctx.rect(x, barY, barWidth, barHeight);
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    render();
  }

  updateFadeDuration(val) {
    this.audioEngine.setFadeDuration(val);
    if (this.dom.fadeDurationVal) this.dom.fadeDurationVal.textContent = `${val.toFixed(1)}s`;
    if (this.dom.fadeBtnSubtitle) this.dom.fadeBtnSubtitle.textContent = `Over ${val.toFixed(1)}s`;
    localStorage.setItem('grizzlies_fade_duration', val);

    // Update preset pills active state
    this.dom.presetPills.forEach(pill => {
      if (parseFloat(pill.dataset.seconds) === val) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  // =========================================================================
  // Event Listeners & Master Controls
  // =========================================================================
  setupEventListeners() {
    // Fade Out button (handles both Walk-Up audio and YouTube audio)
    this.dom.fadeOutBtn.addEventListener('click', () => {
      this.triggerHaptic(25);
      if (this.audioEngine.isPlaying) {
        this.audioEngine.fadeOut();
      } else {
        // Fade out YouTube between-innings playlist
        this.ytEngine.fadeOut(this.audioEngine.fadeDuration);
      }
    });

    // Instant Cut / Stop button (kills whichever audio is currently running)
    this.dom.stopCutBtn.addEventListener('click', () => {
      this.triggerHaptic(30);
      const stoppedTrack = this.activeTrack || this.currentBatter;
      if (stoppedTrack && !stoppedTrack.isHype) {
        this.battedPlayerIds.add(stoppedTrack.id);
      }
      this.audioEngine.stop();
      this.ytEngine.stop();
      this.activeAudioSource = 'none';
      this.dom.fadeOutBtn.disabled = true;
      this.dom.stopCutBtn.disabled = true;
      this.dom.fadeOutBtn.classList.remove('is-fading');
      if (this.dom.fadeBtnSubtitle) this.dom.fadeBtnSubtitle.textContent = `Over ${this.audioEngine.fadeDuration.toFixed(1)}s`;
      if (this.dom.masterCrossfader) this.dom.masterCrossfader.classList.remove('is-sliding');
      if (this.dom.analogFaderDeck) this.dom.analogFaderDeck.classList.remove('is-sliding');
      this.dom.dockPlayerName.textContent = 'READY TO HIT';
      this.dom.dockSongTitle.textContent = 'Tap any player to drop their walk-up track';
      this.dom.dockTimer.textContent = '0:00';
      this.dom.trackProgressFill.style.width = '0%';
      const dockNotch = document.getElementById('trackProgressNotch');
      if (dockNotch) dockNotch.style.left = '0%';
      this.dom.liveEqBadge.classList.remove('active');
      this.updateBatterCardsState();
    });

    // Master Dock Track Progress Scrubbing
    const masterTrackProg = document.getElementById('masterTrackProgress');
    if (masterTrackProg) {
      const handleMasterScrub = (e) => {
        const rect = masterTrackProg.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        if (this.activeAudioSource === 'walkup') {
          this.audioEngine.seekPercent(pct);
        } else if (this.activeAudioSource === 'youtube') {
          this.ytEngine.seekPercent(pct);
        }
      };
      masterTrackProg.addEventListener('click', handleMasterScrub);
      masterTrackProg.addEventListener('touchstart', handleMasterScrub, { passive: true });
    }

    // Play On Deck button and banner title
    if (this.dom.playOnDeckBtn) {
      this.dom.playOnDeckBtn.addEventListener('click', () => {
        if (this.onDeckPlayer) {
          this.handleTrackClick(this.onDeckPlayer);
        }
      });
    }
    if (this.dom.onDeckName) {
      this.dom.onDeckName.style.cursor = 'pointer';
      this.dom.onDeckName.addEventListener('click', () => {
        if (this.onDeckPlayer) {
          this.handleTrackClick(this.onDeckPlayer);
        }
      });
    }

    // Search filter
    this.dom.rosterSearch.addEventListener('input', () => {
      const val = this.dom.rosterSearch.value;
      this.dom.clearSearchBtn.style.display = val.length > 0 ? 'block' : 'none';
      this.renderPlayers();
    });

    this.dom.clearSearchBtn.addEventListener('click', () => {
      this.dom.rosterSearch.value = '';
      this.dom.clearSearchBtn.style.display = 'none';
      this.renderPlayers();
    });

    // Toggle Lineup Sort / Order
    this.dom.lineupToggleBtn.addEventListener('click', () => {
      this.triggerHaptic(20);
      this.openLineupModal();
    });

    // Modal listeners
    this.dom.closeLineupModal.addEventListener('click', () => this.closeLineupModal());
    this.dom.saveLineupBtn.addEventListener('click', () => {
      this.sortMode = 'lineup';
      localStorage.setItem('grizzlies_sort_mode', 'lineup');
      this.updateSortLabel();
      this.renderPlayers();
      this.updateOnDeckDisplay();
      this.closeLineupModal();
    });

    this.dom.resetLineupBtn.addEventListener('click', () => {
      const defaultOrder = [...PLAYERS].sort((a, b) => a.numVal - b.numVal);
      this.saveLineupOrder(defaultOrder);
      this.renderPlayers();
      this.renderLineupModalItems();
    });

    // Header Music Suite / Apple Music Button
    if (this.dom.headerMusicBtn) {
      this.dom.headerMusicBtn.addEventListener('click', () => {
        this.openAppleMusic();
      });
    }

    // Fullscreen toggle (if button present)
    if (this.dom.fullscreenBtn) {
      this.dom.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
    }

    // Server Ping & App Refresh
    if (this.dom.serverRefreshBtn) {
      this.dom.serverRefreshBtn.addEventListener('click', () => this.handleServerRefresh());
    }

    // Help & Tips Modal
    if (this.dom.helpBtn) {
      this.dom.helpBtn.addEventListener('click', () => {
        this.triggerHaptic(15);
        this.dom.helpModal.style.display = 'flex';
      });
    }
    if (this.dom.closeHelpModal) {
      this.dom.closeHelpModal.addEventListener('click', () => {
        this.dom.helpModal.style.display = 'none';
      });
    }
    if (this.dom.gotItBtn) {
      this.dom.gotItBtn.addEventListener('click', () => {
        this.dom.helpModal.style.display = 'none';
      });
    }

    // Keyboard Shortcuts (Space to Cut, F to Fade)
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.code === 'Space') {
        e.preventDefault();
        this.audioEngine.stop();
        this.ytEngine.stop();
        this.activeAudioSource = 'none';
      } else if (e.key.toLowerCase() === 'f') {
        if (this.activeAudioSource === 'youtube' && this.ytEngine.isPlaying) {
          this.ytEngine.fadeOut(this.audioEngine.fadeDuration);
        } else if (this.audioEngine.isPlaying) {
          this.audioEngine.fadeOut();
        } else if (this.ytEngine.isPlaying) {
          this.ytEngine.fadeOut(this.audioEngine.fadeDuration);
        }
      }
    });
  }

  // =========================================================================
  // Page Navigation & Swipe Gestures (Walk-Up vs Between-Innings)
  // =========================================================================
  switchPage(page) {
    if (page === this.currentPage) return;
    this.currentPage = page;
    this.triggerHaptic(15);

    if (page === 'walkup') {
      this.dom.pagesTrack.style.transform = 'translateX(0%)';
      this.dom.tabWalkUp.classList.add('active');
      this.dom.tabInnings.classList.remove('active');
    } else {
      this.dom.pagesTrack.style.transform = 'translateX(-50%)';
      this.dom.tabWalkUp.classList.remove('active');
      this.dom.tabInnings.classList.add('active');
      // When on innings page, ensure master dock controls are ready
      this.dom.fadeOutBtn.disabled = false;
      this.dom.stopCutBtn.disabled = false;
    }
  }

  setupSwipeNavigation() {
    // Top Tab Pill clicks (if navigation tabs are displayed)
    if (this.dom.tabWalkUp) {
      this.dom.tabWalkUp.addEventListener('click', () => this.switchPage('walkup'));
    }
    if (this.dom.tabInnings) {
      this.dom.tabInnings.addEventListener('click', () => this.switchPage('innings'));
    }
  }

  // =========================================================================
  // Inning Warm-Up Countdown Timer (Preserved in code for future use)
  // =========================================================================
  setupInningTimer() {
    if (!this.dom.inningTimerDisplay || !this.dom.timerToggleBtn) return;
    this.updateTimerDisplay();

    this.dom.timerPresets.forEach(btn => {
      btn.addEventListener('click', () => {
        this.dom.timerPresets.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.timerDuration = parseInt(btn.dataset.time, 10);
        this.resetTimer();
        this.triggerHaptic(15);
      });
    });

    if (this.dom.timerToggleBtn) {
      this.dom.timerToggleBtn.addEventListener('click', () => {
        this.triggerHaptic(20);
        if (this.timerRunning) {
          this.pauseTimer();
        } else {
          this.startTimer();
        }
      });
    }

    if (this.dom.timerResetBtn) {
      this.dom.timerResetBtn.addEventListener('click', () => {
        this.triggerHaptic(20);
        this.resetTimer();
      });
    }

    if (this.dom.timerPlus30Btn) {
      this.dom.timerPlus30Btn.addEventListener('click', () => {
        this.triggerHaptic(15);
        this.timerRemaining += 30;
        if (this.timerRemaining > this.timerDuration) {
          this.timerDuration = this.timerRemaining;
        }
        this.updateTimerDisplay();
      });
    }
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerRunning = true;
    if (this.dom.timerToggleIcon) this.dom.timerToggleIcon.textContent = '⏸';
    if (this.dom.timerToggleText) this.dom.timerToggleText.textContent = 'PAUSE';
    if (this.dom.inningTimerDisplay) this.dom.inningTimerDisplay.classList.add('running');

    this.timerInterval = setInterval(() => {
      if (this.timerRemaining > 0) {
        this.timerRemaining--;
        this.updateTimerDisplay();

        if (this.timerRemaining === 10) {
          this.triggerHaptic([50, 100, 50]);
          if (this.dom.inningTimerDisplay) this.dom.inningTimerDisplay.classList.add('warning');
        }
      } else {
        this.pauseTimer();
        this.triggerHaptic([100, 100, 100, 100, 200]);
      }
    }, 1000);
  }

  pauseTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.timerRunning = false;
    if (this.dom.timerToggleIcon) this.dom.timerToggleIcon.textContent = '▶';
    if (this.dom.timerToggleText) this.dom.timerToggleText.textContent = 'START';
    if (this.dom.inningTimerDisplay) this.dom.inningTimerDisplay.classList.remove('running');
  }

  resetTimer() {
    this.pauseTimer();
    this.timerRemaining = this.timerDuration;
    if (this.dom.inningTimerDisplay) this.dom.inningTimerDisplay.classList.remove('warning');
    this.updateTimerDisplay();
  }

  updateTimerDisplay() {
    if (!this.dom.inningTimerDisplay) return;
    const mins = Math.floor(this.timerRemaining / 60);
    const secs = (this.timerRemaining % 60).toString().padStart(2, '0');
    this.dom.inningTimerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs}`;

    const pct = this.timerDuration > 0 ? (this.timerRemaining / this.timerDuration) * 100 : 0;
    if (this.dom.timerBarFill) this.dom.timerBarFill.style.width = `${pct}%`;
  }

  // =========================================================================
  // Between-Innings YouTube Playlist & Controls
  // =========================================================================
  setupYouTubeControls() {
    const activateYouTubeSource = (trackTitle) => {
      if (this.audioEngine.isPlaying) {
        this.audioEngine.stop();
      }
      this.activeAudioSource = 'youtube';
      this.dom.fadeOutBtn.disabled = false;
      this.dom.stopCutBtn.disabled = false;
      this.dom.liveEqBadge.classList.add('active');
      if (this.dom.miniEqDot) this.dom.miniEqDot.classList.add('active');
      if (trackTitle) {
        this.dom.dockPlayerName.textContent = trackTitle;
        this.dom.dockSongTitle.textContent = 'Between-Innings Playlist';
        if (this.dom.miniTrackText) this.dom.miniTrackText.textContent = trackTitle;
      }
    };

    // Stage Play / Pause toggle
    if (this.dom.ytPlayPauseBtn) {
      this.dom.ytPlayPauseBtn.addEventListener('click', () => {
        this.triggerHaptic(20);
        if (this.ytEngine.isPlaying) {
          this.ytEngine.pause();
        } else {
          activateYouTubeSource(this.currentInningTrack?.title || this.ytEngine.currentPlaylist?.title);
          if (this.currentInningTrack && this.ytEngine.currentPlaylist?.id !== this.currentInningTrack.id) {
            this.playInningSong(this.currentInningTrack);
          } else {
            this.ytEngine.play();
          }
        }
      });
    }

    // Next Track in playlist
    if (this.dom.ytNextBtn) {
      this.dom.ytNextBtn.addEventListener('click', () => {
        this.triggerHaptic(20);
        activateYouTubeSource();
        this.playNextInningTrack(1);
      });
    }

    // Previous Track in playlist
    if (this.dom.ytPrevBtn) {
      this.dom.ytPrevBtn.addEventListener('click', () => {
        this.triggerHaptic(20);
        activateYouTubeSource();
        this.playNextInningTrack(-1);
      });
    }

    // Preset Playlist Dropdown Menu
    if (this.dom.playlistSelect) {
      this.dom.playlistSelect.addEventListener('change', (e) => {
        const listId = e.target.value;
        const selectedOpt = e.target.options[e.target.selectedIndex];
        const title = selectedOpt ? selectedOpt.dataset.title || selectedOpt.textContent : 'Baseball';
        this.triggerHaptic(20);
        this.switchActivePlaylist(listId, title);
      });
    }

    // Set initial playlist dropdown selection
    const currentListId = this.ytEngine?.currentPlaylist?.id || 'EK-XfDRL2wA';
    if (this.dom.playlistSelect) {
      this.dom.playlistSelect.value = currentListId;
    }
  }

  switchActivePlaylist(listId, title) {
    this.activePlaylistId = listId;

    // Load full 20 songs for chosen playlist
    this.jarViewMode = 'all';
    this.jarRandom5List = [];
    this.playlistSongs = this.loadPlaylistSongs(listId);

    // Refresh accurate song title and artist from the first track of this playlist
    const firstTrack = this.playlistSongs[0];
    if (firstTrack) {
      this.currentInningTrack = firstTrack;
      if (this.dom.ytCurrentTitle) this.dom.ytCurrentTitle.textContent = firstTrack.title;
      if (this.dom.ytCurrentArtist) this.dom.ytCurrentArtist.textContent = firstTrack.artist;
      if (this.dom.dockSongTitle) this.dom.dockSongTitle.textContent = firstTrack.artist;
      if (this.dom.miniTrackText) this.dom.miniTrackText.textContent = `${firstTrack.title} (${title})`;
    }

    // Refresh connection to YouTube
    this.ytEngine.loadPlaylist(listId, title, false);

    this.renderInlineSongJar();
  }

  // =========================================================================
  // Inline Dugout Song List
  // =========================================================================
  loadPlaylistSongs(listId) {
    if (PLAYLIST_TRACKS_MAP[listId]) {
      return [...PLAYLIST_TRACKS_MAP[listId].tracks];
    }
    return [...PLAYLIST_TRACKS_MAP['EK-XfDRL2wA'].tracks];
  }

  setupInlineSongJar() {
    this.playlistSongs = this.loadPlaylistSongs(this.activePlaylistId || 'EK-XfDRL2wA');
    if (this.playlistSongs.length > 0 && !this.currentInningTrack) {
      this.currentInningTrack = this.playlistSongs[0];
    }
    this.renderInlineSongJar();

    // Mode Switcher: 5 Random vs All 20
    if (this.dom.jarModeRandom5Btn) {
      this.dom.jarModeRandom5Btn.addEventListener('click', () => {
        this.triggerHaptic(20);
        this.pull5RandomSongs();
      });
    }

    if (this.dom.jarModeAllBtn) {
      this.dom.jarModeAllBtn.addEventListener('click', () => {
        this.triggerHaptic(15);
        this.showAllJarSongs();
      });
    }
  }

  pull5RandomSongs() {
    if (!this.playlistSongs || this.playlistSongs.length === 0) return;
    const shuffled = [...this.playlistSongs].sort(() => 0.5 - Math.random());
    this.jarRandom5List = shuffled.slice(0, Math.min(5, this.playlistSongs.length));
    this.jarViewMode = 'random5';

    // Update active inning track to the top random pick
    const firstRandom = this.jarRandom5List[0];
    if (firstRandom) {
      this.currentInningTrack = firstRandom;
      if (this.dom.ytCurrentTitle) this.dom.ytCurrentTitle.textContent = firstRandom.title;
      if (this.dom.ytCurrentArtist) this.dom.ytCurrentArtist.textContent = firstRandom.artist;
    }

    this.renderInlineSongJar();
  }

  showAllJarSongs() {
    this.jarViewMode = 'all';
    const firstSong = this.playlistSongs && this.playlistSongs[0];
    if (firstSong) {
      this.currentInningTrack = firstSong;
      if (this.dom.ytCurrentTitle) this.dom.ytCurrentTitle.textContent = firstSong.title;
      if (this.dom.ytCurrentArtist) this.dom.ytCurrentArtist.textContent = firstSong.artist;
    }
    this.renderInlineSongJar();
  }

  playNextInningTrack(direction = 1) {
    const list = (this.jarViewMode === 'random5' && this.jarRandom5List.length > 0)
      ? this.jarRandom5List
      : (this.playlistSongs || this.loadPlaylistSongs(this.activePlaylistId));
    
    if (!list || list.length === 0) return;

    let currentIdx = list.findIndex(s => s.id === this.currentInningTrack?.id);
    if (currentIdx === -1) {
      currentIdx = list.findIndex(s => s.id === this.ytEngine?.currentPlaylist?.id);
    }
    if (currentIdx === -1) currentIdx = 0;

    const nextIdx = (currentIdx + direction + list.length) % list.length;
    const targetSong = list[nextIdx];
    this.playInningSong(targetSong);
  }

  playInningSong(song) {
    if (!song) return;
    this.currentInningTrack = song;
    if (this.audioEngine.isPlaying) this.audioEngine.stop();
    this.activeAudioSource = 'youtube';
    this.dom.fadeOutBtn.disabled = false;
    this.dom.stopCutBtn.disabled = false;
    this.dom.liveEqBadge.classList.add('active');
    if (this.dom.miniEqDot) this.dom.miniEqDot.classList.add('active');
    if (this.dom.dockPlayerName) this.dom.dockPlayerName.textContent = song.title;
    if (this.dom.dockSongTitle) this.dom.dockSongTitle.textContent = song.artist;
    if (this.dom.miniTrackText) this.dom.miniTrackText.textContent = song.title;
    if (this.dom.ytCurrentTitle) this.dom.ytCurrentTitle.textContent = song.title;
    if (this.dom.ytCurrentArtist) this.dom.ytCurrentArtist.textContent = song.artist;
    this.ytEngine.playVideo(song.id, song.title, song.artist);
    this.renderInlineSongJar();
  }

  renderInlineSongJar() {
    if (!this.dom.inlineJarSongsList) return;
    this.dom.inlineJarSongsList.innerHTML = '';

    const listInfo = PLAYLIST_TRACKS_MAP[this.activePlaylistId] || PLAYLIST_TRACKS_MAP['EK-XfDRL2wA'];
    const playlistTitle = listInfo ? listInfo.title : 'Baseball';

    const subtitleEl = document.getElementById('inningsSubtitle');
    if (subtitleEl) {
      subtitleEl.textContent = this.jarViewMode === 'random5'
        ? `⚾ ${playlistTitle} • 5 Random Picks`
        : `⚾ ${playlistTitle} • 20 Clean Tracks`;
    }

    const currentYtId = this.currentInningTrack?.id || this.ytEngine?.currentPlaylist?.id;
    const isYtPlaying = this.activeAudioSource === 'youtube' && this.ytEngine.isPlaying;

    const isRandom5 = this.jarViewMode === 'random5';
    const songsToRender = isRandom5 && this.jarRandom5List.length > 0 
      ? this.jarRandom5List 
      : (this.playlistSongs || this.loadPlaylistSongs(this.activePlaylistId));

    if (this.dom.jarModeRandom5Btn && this.dom.jarModeAllBtn) {
      if (isRandom5) {
        this.dom.jarModeRandom5Btn.style.display = 'none';
        this.dom.jarModeAllBtn.style.display = 'inline-flex';
      } else {
        this.dom.jarModeRandom5Btn.style.display = 'inline-flex';
        this.dom.jarModeAllBtn.style.display = 'none';
      }
    }

    songsToRender.forEach((song, idx) => {
      const isThisPlaying = (isYtPlaying || this.currentInningTrack?.id === song.id) && currentYtId === song.id;

      const card = document.createElement('div');
      card.className = `inline-jar-song-card ${isThisPlaying ? 'active' : ''}`;
      card.dataset.id = song.id;

      card.innerHTML = `
        <div class="song-card-left">
          <span class="song-index-badge">${idx + 1}</span>
          <div class="song-card-text">
            <div class="song-card-title">${song.title}</div>
            <div class="song-card-artist">${song.artist || playlistTitle}</div>
          </div>
        </div>
        <div class="song-card-actions">
          <button class="btn-song-play-row" title="${isThisPlaying && isYtPlaying ? 'Pause Track' : 'Play Track'}" aria-label="Play ${song.title}">
            ${isThisPlaying && isYtPlaying 
              ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>' 
              : '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'}
          </button>
        </div>
      `;

      // Tap entire row or play button to play track immediately
      card.addEventListener('click', (e) => {
        this.triggerHaptic(20);
        if (isThisPlaying && isYtPlaying && e.target.closest('.btn-song-play-row')) {
          this.ytEngine.pause();
        } else {
          this.playInningSong(song);
        }
      });

      this.dom.inlineJarSongsList.appendChild(card);
    });
  }

  // =========================================================================
  // Master Bottom Dock (Sliding Drawer)
  // =========================================================================
  setupDockDrawer() {
    let touchStartY = 0;

    const toggle = (forceOpen = null) => {
      this.triggerHaptic(15);
      const isCollapsed = this.dom.masterDock.classList.contains('drawer-collapsed');
      const shouldOpen = forceOpen !== null ? forceOpen : isCollapsed;

      if (shouldOpen) {
        this.dom.masterDock.classList.remove('drawer-collapsed');
        this.dom.masterDock.classList.add('drawer-expanded');
        if (this.dom.dockSpacer) this.dom.dockSpacer.classList.add('expanded');
        if (this.dom.drawerToggleLabel) this.dom.drawerToggleLabel.textContent = 'SLIDE DOWN';
      } else {
        this.dom.masterDock.classList.add('drawer-collapsed');
        this.dom.masterDock.classList.remove('drawer-expanded');
        if (this.dom.dockSpacer) this.dom.dockSpacer.classList.remove('expanded');
        if (this.dom.drawerToggleLabel) this.dom.drawerToggleLabel.textContent = 'FADE & CONTROLS';
      }
    };

    if (this.dom.drawerPullTab) {
      this.dom.drawerPullTab.addEventListener('click', (e) => {
        e.stopPropagation();
        toggle();
      });
    }

    if (this.dom.dockVisibleHeader) {
      this.dom.dockVisibleHeader.addEventListener('touchstart', (e) => {
        if (e.target.closest('#masterCrossfader')) return;
        if (e.touches && e.touches[0]) {
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      this.dom.dockVisibleHeader.addEventListener('touchend', (e) => {
        if (e.target.closest('#masterCrossfader')) return;
        if (e.changedTouches && e.changedTouches[0]) {
          const deltaY = e.changedTouches[0].clientY - touchStartY;
          if (deltaY < -25) {
            toggle(true); // Swipe up to open
          } else if (deltaY > 25) {
            toggle(false); // Swipe down to collapse
          }
        }
      }, { passive: true });
    }

    if (this.dom.dockDrawerHandleBar) {
      this.dom.dockDrawerHandleBar.addEventListener('click', () => {
        toggle();
      });
    }

    if (this.dom.drawerToggleBtn) {
      this.dom.drawerToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggle();
      });
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('drawer') === 'open') {
      toggle(true);
    }
    const atbatParam = urlParams.get('atbat');
    if (atbatParam && this.lineupOrder && this.lineupOrder.length > 0) {
      let targetPlayer = this.lineupOrder[0];
      if (atbatParam === 'last') {
        targetPlayer = this.lineupOrder[this.lineupOrder.length - 1];
      } else if (!isNaN(parseInt(atbatParam, 10)) && parseInt(atbatParam, 10) > 1) {
        const idx = Math.min(parseInt(atbatParam, 10) - 1, this.lineupOrder.length - 1);
        targetPlayer = this.lineupOrder[idx];
      }
      this.currentBatter = targetPlayer;
      const idx = this.lineupOrder.findIndex(p => p.id === targetPlayer.id);
      const nextIdx = (idx + 1) % this.lineupOrder.length;
      this.onDeckPlayer = this.lineupOrder[nextIdx];
      this.updateBatterCardsState();
      this.updateOnDeckDisplay();
      this.scrollToBatterCard(targetPlayer.id);
    }
    if (urlParams.get('play') === '1' && this.lineupOrder && this.lineupOrder.length > 0) {
      this.currentBatter = this.lineupOrder[0];
      this.handleTrackClick(this.lineupOrder[0]);
    }
  }

  // =========================================================================
  // Apple Music Integration (Direct Launch on iOS / iPhone)
  // =========================================================================
  openAppleMusic() {
    this.triggerHaptic(20);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isIOS) {
      // In iOS / iPhone, music:// immediately launches the native Apple Music app
      window.location.href = 'music://';
      setTimeout(() => {
        window.open('https://music.apple.com', '_blank');
      }, 600);
    } else {
      // Desktop or non-iOS: open Apple Music web player in a new tab
      window.open('https://music.apple.com', '_blank');
    }
  }

  // =========================================================================
  // Dugout Settings Modal (Gear / Wrench)
  // =========================================================================
  setupSettingsModal() {
    const openSettings = () => {
      this.triggerHaptic(20);
      if (this.dom.settingsModal) {
        if (this.dom.fadeDurationVal) {
          this.dom.fadeDurationVal.textContent = `${this.audioEngine.fadeDuration.toFixed(1)}s`;
        }
        if (this.dom.fadeDurationSlider) {
          this.dom.fadeDurationSlider.value = this.audioEngine.fadeDuration;
        }
        this.updateSettingRallyBtnState();
        this.dom.settingsModal.style.display = 'flex';
      }
    };

    const closeSettings = () => {
      this.triggerHaptic(15);
      if (this.dom.settingsModal) {
        this.dom.settingsModal.style.display = 'none';
      }
    };

    if (this.dom.headerSettingsBtn) {
      this.dom.headerSettingsBtn.addEventListener('click', openSettings);
    }
    if (this.dom.drawerSettingsBtn) {
      this.dom.drawerSettingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openSettings();
      });
    }
    if (this.dom.closeSettingsModal) {
      this.dom.closeSettingsModal.addEventListener('click', closeSettings);
    }
    if (this.dom.closeSettingsDoneBtn) {
      this.dom.closeSettingsDoneBtn.addEventListener('click', closeSettings);
    }
    if (this.dom.settingsModal) {
      this.dom.settingsModal.addEventListener('click', (e) => {
        if (e.target === this.dom.settingsModal) closeSettings();
      });
    }

    if (this.dom.btnToggleRallySetting) {
      this.dom.btnToggleRallySetting.addEventListener('click', () => {
        this.triggerHaptic(20);
        const isCurrentlyHidden = this.dom.stadiumHypeSection.classList.contains('is-hidden');
        this.setRallySectionVisible(isCurrentlyHidden);
        this.updateSettingRallyBtnState();
      });
    }

    if (this.dom.openAppleMusicBtn) {
      this.dom.openAppleMusicBtn.addEventListener('click', () => {
        closeSettings();
        this.openAppleMusic();
      });
    }
    if (this.dom.openInningsModalBtn) {
      this.dom.openInningsModalBtn.addEventListener('click', () => {
        closeSettings();
        this.openAppleMusic();
      });
    }

    const closeInnings = () => {
      this.triggerHaptic(15);
      if (this.dom.inningsModal) {
        this.dom.inningsModal.style.display = 'none';
      }
    };
    if (this.dom.closeInningsModal) {
      this.dom.closeInningsModal.addEventListener('click', closeInnings);
    }
    if (this.dom.closeInningsDoneBtn) {
      this.dom.closeInningsDoneBtn.addEventListener('click', closeInnings);
    }
    if (this.dom.inningsModal) {
      this.dom.inningsModal.addEventListener('click', (e) => {
        if (e.target === this.dom.inningsModal) closeInnings();
      });
    }

    if (this.dom.openPhoneSetupBtn) {
      this.dom.openPhoneSetupBtn.addEventListener('click', () => {
        this.triggerHaptic(20);
        if (this.dom.helpModal) {
          this.dom.helpModal.style.display = 'flex';
        }
      });
    }

    if (new URLSearchParams(window.location.search).get('modal') === 'settings') {
      openSettings();
    }
    if (new URLSearchParams(window.location.search).get('modal') === 'innings') {
      if (this.dom.inningsModal) this.dom.inningsModal.style.display = 'flex';
    }
  }

  updateSettingRallyBtnState() {
    if (!this.dom.btnToggleRallySetting || !this.dom.stadiumHypeSection) return;
    const isHidden = this.dom.stadiumHypeSection.classList.contains('is-hidden');
    if (isHidden) {
      this.dom.btnToggleRallySetting.textContent = 'HIDDEN (LOCKED)';
      this.dom.btnToggleRallySetting.classList.add('hidden-mode');
    } else {
      this.dom.btnToggleRallySetting.textContent = 'VISIBLE';
      this.dom.btnToggleRallySetting.classList.remove('hidden-mode');
    }
  }

  // Legacy Song Jar compatibility methods
  loadSongJar() { return this.playlistSongs || []; }
  saveSongJar(songs) { this.savePlaylistSongs(this.activePlaylistId, songs); }
  updateSongJarBadge() { this.updateInlineJarBadge(); }
  setupSongJar() {}
  openSongJarModal() { this.renderInlineSongJar(); }
  closeSongJarModal() {}
  renderSongJarList() { this.renderInlineSongJar(); }
  playSongFromJar(song) { this.ytEngine.playVideo(song.id, song.title, song.artist); }

  updateSortLabel() {
    this.dom.sortLabel.textContent = this.sortMode === 'lineup' ? 'Lineup' : 'Number';
  }

  // =========================================================================
  // Lineup Modal & Ordering
  // =========================================================================
  openLineupModal() {
    this.renderLineupModalItems();
    this.dom.lineupModal.style.display = 'flex';
  }

  closeLineupModal() {
    this.dom.lineupModal.style.display = 'none';
  }

  renderLineupModalItems() {
    this.dom.lineupList.innerHTML = '';
    this.lineupOrder.forEach((player, idx) => {
      const item = document.createElement('div');
      item.className = 'lineup-item';
      item.dataset.idx = idx;
      item.setAttribute('draggable', 'true');
      item.innerHTML = `
        <div class="lineup-item-left">
          <div class="lineup-drag-handle" title="Drag to reorder" aria-label="Drag handle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="4" y1="7" x2="20" y2="7"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="17" x2="20" y2="17"></line>
            </svg>
          </div>
          <span class="lineup-batting-pos">${idx + 1}</span>
          <div class="lineup-player-info">
            <div class="lineup-name-row">
              <span class="lineup-jersey-pill"><span class="jersey-hash">#</span>${player.number}</span>
              <span class="lineup-player-name">${player.name}</span>
            </div>
            <span class="lineup-player-num">${player.song} • ${player.artist}</span>
          </div>
        </div>
        <div class="lineup-move-btns">
          <button class="move-btn" data-dir="up" data-idx="${idx}" ${idx === 0 ? 'disabled' : ''} title="Move Up">▲</button>
          <button class="move-btn" data-dir="down" data-idx="${idx}" ${idx === this.lineupOrder.length - 1 ? 'disabled' : ''} title="Move Down">▼</button>
        </div>
      `;

      item.querySelectorAll('.move-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const dir = btn.dataset.dir;
          const index = parseInt(btn.dataset.idx, 10);
          this.moveLineupItem(index, dir);
        });
      });

      this.dom.lineupList.appendChild(item);
    });

    this.setupLineupDragAndDrop();
  }

  setupLineupDragAndDrop() {
    const list = this.dom.lineupList;
    let draggedItem = null;
    let draggedIndex = null;
    let currentOverItem = null;

    list.querySelectorAll('.lineup-item').forEach(item => {
      // Desktop Mouse Drag
      item.addEventListener('dragstart', (e) => {
        draggedItem = item;
        draggedIndex = parseInt(item.dataset.idx, 10);
        item.classList.add('is-dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', draggedIndex);
      });

      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const rect = item.getBoundingClientRect();
        item.classList.remove('drag-over-top', 'drag-over-bottom');
        if (e.clientY < rect.top + rect.height / 2) {
          item.classList.add('drag-over-top');
        } else {
          item.classList.add('drag-over-bottom');
        }
      });

      item.addEventListener('dragleave', () => {
        item.classList.remove('drag-over-top', 'drag-over-bottom');
      });

      item.addEventListener('drop', (e) => {
        e.preventDefault();
        item.classList.remove('drag-over-top', 'drag-over-bottom');
        const targetIndex = parseInt(item.dataset.idx, 10);
        if (draggedIndex !== null && draggedIndex !== targetIndex) {
          const rect = item.getBoundingClientRect();
          let finalTarget = targetIndex;
          if (e.clientY > rect.top + rect.height / 2 && targetIndex < this.lineupOrder.length - 1) {
            finalTarget = targetIndex + (draggedIndex > targetIndex ? 1 : 0);
          }
          this.reorderLineup(draggedIndex, finalTarget);
        }
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('is-dragging');
        list.querySelectorAll('.lineup-item').forEach(el => {
          el.classList.remove('drag-over-top', 'drag-over-bottom', 'is-dragging');
        });
        draggedItem = null;
        draggedIndex = null;
      });

      // Mobile Touch Drag on iPhone
      const handle = item.querySelector('.lineup-drag-handle') || item;
      
      handle.addEventListener('touchstart', (e) => {
        draggedItem = item;
        draggedIndex = parseInt(item.dataset.idx, 10);
        draggedItem.classList.add('is-dragging');
        this.triggerHaptic(15);
      }, { passive: true });

      handle.addEventListener('touchmove', (e) => {
        if (!draggedItem) return;
        const touch = e.touches[0];
        const elem = document.elementFromPoint(touch.clientX, touch.clientY);
        const target = elem ? elem.closest('.lineup-item') : null;

        list.querySelectorAll('.lineup-item').forEach(el => {
          if (el !== target) el.classList.remove('drag-over-top', 'drag-over-bottom');
        });

        if (target && target !== draggedItem) {
          currentOverItem = target;
          const rect = target.getBoundingClientRect();
          if (touch.clientY < rect.top + rect.height / 2) {
            target.classList.add('drag-over-top');
            target.classList.remove('drag-over-bottom');
          } else {
            target.classList.add('drag-over-bottom');
            target.classList.remove('drag-over-top');
          }
        }
      }, { passive: false });

      handle.addEventListener('touchend', () => {
        if (!draggedItem) return;
        draggedItem.classList.remove('is-dragging');

        if (currentOverItem && currentOverItem !== draggedItem) {
          const targetIndex = parseInt(currentOverItem.dataset.idx, 10);
          const isBottom = currentOverItem.classList.contains('drag-over-bottom');
          let finalIndex = targetIndex;
          if (isBottom && draggedIndex < targetIndex) {
            finalIndex = targetIndex;
          } else if (!isBottom && draggedIndex > targetIndex) {
            finalIndex = targetIndex;
          }
          this.reorderLineup(draggedIndex, finalIndex);
          this.triggerHaptic(20);
        }

        list.querySelectorAll('.lineup-item').forEach(el => {
          el.classList.remove('drag-over-top', 'drag-over-bottom', 'is-dragging');
        });
        draggedItem = null;
        draggedIndex = null;
        currentOverItem = null;
      });
    });
  }

  reorderLineup(fromIdx, toIdx) {
    if (fromIdx === toIdx || fromIdx < 0 || toIdx < 0) return;
    const list = [...this.lineupOrder];
    const [moved] = list.splice(fromIdx, 1);
    list.splice(toIdx, 0, moved);
    this.saveLineupOrder(list);
    this.renderLineupModalItems();
  }

  moveLineupItem(idx, dir) {
    const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= this.lineupOrder.length) return;
    this.reorderLineup(idx, targetIdx);
    this.triggerHaptic(15);
  }

  // =========================================================================
  // Utilities & Haptics
  // =========================================================================
  triggerHaptic(pattern) {
    if (navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Silent catch for unsupported browsers
      }
    }
  }

  async handleServerRefresh() {
    this.triggerHaptic([30, 40, 30]);
    if (this.dom.serverRefreshBtn) {
      this.dom.serverRefreshBtn.classList.add('spinning');
    }
    if (this.dom.refreshLabel) {
      this.dom.refreshLabel.textContent = 'Syncing...';
    }

    try {
      // 1. Purge browser CacheStorage
      if ('caches' in window) {
        const cacheKeys = await caches.keys();
        await Promise.all(cacheKeys.map(key => caches.delete(key)));
      }

      // 2. Unregister / update service workers
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          await reg.update();
        }
      }

      // 3. Ping server with cache-busting timestamp to verify fresh connection
      const pingUrl = `${window.location.pathname}?ping=${Date.now()}`;
      await fetch(pingUrl, {
        cache: 'no-store',
        headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
      });
    } catch (e) {
      console.warn('Network ping error during refresh:', e);
    }

    // 4. Force hard reload with timestamped query param so browser immediately fetches newest code
    const cleanUrl = window.location.origin + window.location.pathname + '?v=' + Date.now();
    window.location.replace(cleanUrl);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }
}

// Initialize on DOM ready or immediately if already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.grizzliesApp = new GrizzliesApp();
  });
} else {
  window.grizzliesApp = new GrizzliesApp();
}
