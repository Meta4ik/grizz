/**
 * Wiley Grizzlies Walk-Up Music Soundboard App
 * Main Controller
 */

import { PLAYERS, HYPE_TRACKS } from './roster.js';
import { WalkUpAudioEngine } from './audio-player.js';
import { YouTubeInningsEngine } from './youtube-manager.js';

// Curated Full Tracklists for each Playlist (Populates the Song Jar)
export const PLAYLIST_TRACKS_MAP = {
  'EK-XfDRL2wA': {
    title: 'Baseball',
    subtitle: "Coach's Baseball Track (Getting Older)",
    tracks: [
      { id: 'EK-XfDRL2wA', title: 'Getting Older (Clean)', artist: 'Jaz Von ft. NBA YoungBoy' },
      { id: 'MVDJxMxzTL0', title: 'Wild Ones', artist: 'Jessie Murph, Jelly Roll' },
      { id: 'aXmmyuIqZyo', title: 'Fast Car', artist: 'Luke Combs' },
      { id: '1VRZq3J0uz4', title: 'Tennessee Whiskey', artist: 'Chris Stapleton' },
      { id: '7qaHdHpP530', title: 'Beer Never Broke My Heart', artist: 'Luke Combs' }
    ]
  },
  'XwxWsq4otGg': {
    title: 'Baseball Organ Music',
    subtitle: 'Ballpark Organ Classics • Matthew Kaminski',
    tracks: [
      { id: 'XwxWsq4otGg', title: 'The Star-Spangled Banner (Organ)', artist: 'Matthew Kaminski (Braves Organist)' },
      { id: 'EK-XfDRL2wA', title: 'Getting Older (Clean)', artist: 'Jaz Von ft. NBA YoungBoy' },
      { id: 'btPJPFnesV4', title: 'Eye of the Tiger (Charge Theme)', artist: 'Survivor' },
      { id: 'v2AC41dglnM', title: 'Thunderstruck', artist: 'AC/DC' },
      { id: '1w7OgIMMRc4', title: "Sweet Child O' Mine", artist: "Guns N' Roses" }
    ]
  },
  'PLfIVhrWS4Y_M': {
    title: 'Baseball Multi-Mix',
    subtitle: "Coach's Alternate Queue",
    tracks: [
      { id: 'EK-XfDRL2wA', title: 'Getting Older (Clean)', artist: 'Jaz Von ft. NBA YoungBoy' },
      { id: 'MVDJxMxzTL0', title: 'Wild Ones', artist: 'Jessie Murph, Jelly Roll' },
      { id: 'aXmmyuIqZyo', title: 'Fast Car', artist: 'Luke Combs' }
    ]
  },
  'RDkOV2iTeGQik': {
    title: 'Pantera Rock Mix',
    subtitle: 'High-Voltage Stadium Rock',
    tracks: [
      { id: 'kOV2iTeGQik', title: 'Walk', artist: 'Pantera' },
      { id: 'v2AC41dglnM', title: 'Thunderstruck', artist: 'AC/DC' },
      { id: '-tJYN-eG1zk', title: 'We Will Rock You', artist: 'Queen' },
      { id: 'btPJPFnesV4', title: 'Eye of the Tiger', artist: 'Survivor' },
      { id: 'y6120QOlsfU', title: 'Sandstorm', artist: 'Darude' },
      { id: '1w7OgIMMRc4', title: "Sweet Child O' Mine", artist: "Guns N' Roses" },
      { id: 'CdkvPOatV35', title: 'Crazy Train', artist: 'Ozzy Osbourne' }
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
      { id: 'nfWlot6h_JM', title: 'Shake It Off', artist: 'Taylor Swift' }
    ]
  },
  'RDCLAK5uy_nQkPLhMF6chdzKSlWdX8NHMrLVpdci-eU': {
    title: '90s Hits',
    subtitle: 'Classic 90s Stadium Bops',
    tracks: [
      { id: '6FEDrU85FLE', title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
      { id: 'C-u5WLJ9Yk4', title: '...Baby One More Time', artist: 'Britney Spears' },
      { id: 'fJ9rUzIMcZQ', title: 'Bohemian Rhapsody', artist: 'Queen' },
      { id: '34Na4j8AVgA', title: 'The Sign', artist: 'Ace of Base' },
      { id: 'hTWKbfoikeg', title: 'All Star', artist: 'Smash Mouth' }
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
      { id: 'n9U_F2e-WbE', title: 'Wagon Wheel', artist: 'Darius Rucker' }
    ]
  },
  'RDCLAK5uy_lMzHW51iFg1Kx0d_2EHpzbOgCrwtu8cgI': {
    title: '80s Hits',
    subtitle: '80s Power Anthems & Pop',
    tracks: [
      { id: 'djV11Xbc914', title: 'Take On Me', artist: 'a-ha' },
      { id: 'lDK9QqIzhwk', title: "Livin' On A Prayer", artist: 'Bon Jovi' },
      { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up', artist: 'Rick Astley' },
      { id: 'eH3giaIzONA', title: 'Jump', artist: 'Van Van' },
      { id: 'YkADj0TPrJA', title: "Don't Stop Believin'", artist: 'Journey' }
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

    // Active Playlist & Song Jar State (defaults to Coach's Baseball playlist)
    this.activePlaylistId = this.ytEngine?.currentPlaylist?.id || 'EK-XfDRL2wA';
    this.playlistSongs = this.loadPlaylistSongs(this.activePlaylistId);
    this.songJar = this.playlistSongs;

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
      pageWalkup: document.getElementById('pageWalkup'),
      pageInnings: document.getElementById('pageInnings'),

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
      ytRandomBtn: document.getElementById('ytRandomBtn'),
      ytPlaylistStatusTag: document.getElementById('ytPlaylistStatusTag'),
      playlistSelect: document.getElementById('playlistSelect'),
      organMusicBtn: document.getElementById('organMusicBtn'),

      // Inline Dugout Song Jar (Directly from the Playlist)
      inlineSongJarCard: document.getElementById('inlineSongJarCard'),
      inlineJarTitle: document.getElementById('inlineJarTitle'),
      inlineJarCountPill: document.getElementById('inlineJarCountPill'),
      inlineJarDrawRandomBtn: document.getElementById('inlineJarDrawRandomBtn'),
      inlineJarAddInput: document.getElementById('inlineJarAddInput'),
      inlineJarAddBtn: document.getElementById('inlineJarAddBtn'),
      inlineJarSongsList: document.getElementById('inlineJarSongsList'),

      // Master Dock (Sliding Drawer)
      masterDock: document.getElementById('masterDock'),
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

      // Sliders & DJ Crossfader
      masterCrossfader: document.getElementById('masterCrossfader'),
      crossfaderStatusBadge: document.getElementById('crossfaderStatusBadge'),
      crossfaderResetBtn: document.getElementById('crossfaderResetBtn'),
      fadeDurationSlider: document.getElementById('fadeDurationSlider'),
      fadeDurationVal: document.getElementById('fadeDurationVal'),
      presetPills: document.querySelectorAll('.preset-pill'),
      masterVolumeSlider: document.getElementById('masterVolumeSlider'),
      masterVolumeVal: document.getElementById('masterVolumeVal'),
      volIcon: document.getElementById('volIcon'),

      // Header buttons
      serverRefreshBtn: document.getElementById('serverRefreshBtn'),
      refreshIcon: document.getElementById('refreshIcon'),
      refreshLabel: document.getElementById('refreshLabel'),
      helpBtn: document.getElementById('helpBtn'),
      lineupToggleBtn: document.getElementById('lineupToggleBtn'),
      sortLabel: document.getElementById('sortLabel'),
      fullscreenBtn: document.getElementById('fullscreenBtn'),

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
    this.setupRallyToggle();
    this.updateSortLabel();
    this.updateOnDeckDisplay();
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
          battingSlotText = `#${slotIdx + 1} BATTER`;
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
          <div class="jersey-badge">#${player.number}</div>
          <div class="card-badges-wrap" id="badges-${player.id}">
            ${battingSlotText ? `<span class="card-status-badge on-deck-tag">${battingSlotText}</span>` : ''}
            ${batterBadgeHtml}
            <span class="card-status-badge" id="status-${player.id}" style="display: none;">PLAYING</span>
          </div>
        </div>
        <div class="card-bottom-row">
          <div class="player-name">${player.name}</div>
          <div class="song-title">${player.song}</div>
          <div class="song-artist">${player.artist}</div>
        </div>
      `;

      card.addEventListener('click', () => this.handleTrackClick(player));
      this.dom.playerGrid.appendChild(card);
    });

    // Update active visual if track is currently playing
    if (this.activeTrack) {
      this.updateActiveCardVisuals(this.activeTrack.id);
    }
  }

  updateBatterCardsState() {
    const cards = this.dom.playerGrid.querySelectorAll('.player-card');
    cards.forEach(card => {
      const id = card.dataset.id;
      const isAtBat = this.currentBatter && this.currentBatter.id === id;
      const isOnDeck = !isAtBat && this.onDeckPlayer && this.onDeckPlayer.id === id;

      card.classList.toggle('is-at-bat', !!isAtBat);
      card.classList.toggle('is-on-deck', !!isOnDeck);

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
    }

    this.audioEngine.play(track);
  }

  setupAudioCallbacks() {
    this.audioEngine.on('onPlay', (track) => {
      // Mutual exclusion
      if (this.ytEngine.isPlaying) {
        this.ytEngine.pause();
      }
      this.activeAudioSource = 'walkup';
      this.activeTrack = track;
      this.updateActiveCardVisuals(track.id);
      this.updateDockInfo(track, true);
      this.dom.fadeOutBtn.disabled = false;
      this.dom.stopCutBtn.disabled = false;
      this.dom.fadeOutBtn.classList.remove('is-fading');
      this.updateOnDeckAfterPlay(track);

      // Auto-restore fader to full volume if it was cut/muted
      if (this.dom.masterCrossfader && parseInt(this.dom.masterCrossfader.value, 10) >= 95) {
        this.resetCrossfader();
      }
    });

    this.audioEngine.on('onPause', (track) => {
      if (this.activeAudioSource === 'walkup') {
        this.updateDockInfo(track, false);
      }
    });

    this.audioEngine.on('onStop', (track) => {
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
        this.dom.liveEqBadge.classList.remove('active');
      }
    });

    this.audioEngine.on('onTimeUpdate', ({ currentTime, duration, progress, track }) => {
      if (this.activeAudioSource !== 'walkup') return;
      const mins = Math.floor(currentTime / 60);
      const secs = Math.floor(currentTime % 60).toString().padStart(2, '0');
      this.dom.dockTimer.textContent = `${mins}:${secs}`;
      
      const pct = Math.min(100, (progress * 100)).toFixed(1) + '%';
      this.dom.trackProgressFill.style.width = pct;

      // Card bottom progress
      if (track) {
        const cardProg = document.getElementById(`progress-${track.id}`);
        if (cardProg) {
          cardProg.style.width = pct;
        }
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
        this.dom.fadeBtnSubtitle.textContent = `Fading (${remainingTime}s)`;
        if (typeof progress === 'number') {
          const targetPos = Math.round(progress * 100);
          this.applyCrossfaderPosition(targetPos, true);
        }
      }
    });

    this.audioEngine.on('onFadeComplete', () => {
      if (this.activeAudioSource === 'walkup') {
        this.dom.fadeBtnSubtitle.textContent = `Over ${this.audioEngine.fadeDuration.toFixed(1)}s`;
        this.dom.fadeOutBtn.classList.remove('is-fading');
        this.applyCrossfaderPosition(100, true);
      }
    });

    this.audioEngine.on('onError', (err, track) => {
      console.error('Audio engine playback error:', err);
      alert(`Could not play audio for ${track?.name || 'track'}. Please check file path.`);
    });
  }

  setupYouTubeCallbacks() {
    this.ytEngine.on('onPlay', (playlist) => {
      // Mutual exclusion: stop walk-up audio when YouTube starts
      if (this.audioEngine.isPlaying) {
        this.audioEngine.stop();
      }
      this.activeAudioSource = 'youtube';

      // Update YouTube Stage UI
      this.dom.ytPulseDot.classList.add('active');
      this.dom.ytAudioPill.classList.add('playing');
      this.dom.ytAudioPill.textContent = 'PLAYING';
      this.dom.ytPlayIcon.style.display = 'none';
      this.dom.ytPauseIcon.style.display = 'block';

      // Update Master Dock
      const title = playlist ? playlist.title : 'YOUTUBE PLAYING';
      const artist = playlist ? (playlist.artist || 'Between Innings Music') : 'Between Innings Music';
      this.dom.dockPlayerName.textContent = title;
      this.dom.dockSongTitle.textContent = artist;
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

      // Sync organ quick-launch button highlight
      if (this.dom.organMusicBtn) {
        if (this.activePlaylistId === 'XwxWsq4otGg') {
          this.dom.organMusicBtn.classList.add('active');
        } else {
          this.dom.organMusicBtn.classList.remove('active');
        }
      }

      // Update inline song jar highlights
      this.renderInlineSongJar();
    });

    this.ytEngine.on('onPause', (playlist) => {
      this.dom.ytPulseDot.classList.remove('active');
      this.dom.ytAudioPill.classList.remove('playing');
      this.dom.ytAudioPill.textContent = 'PAUSED';
      this.dom.ytPlayIcon.style.display = 'block';
      this.dom.ytPauseIcon.style.display = 'none';

      if (this.activeAudioSource === 'youtube') {
        this.dom.liveEqBadge.classList.remove('active');
        if (this.dom.miniEqDot) this.dom.miniEqDot.classList.remove('active');
      }

      this.renderInlineSongJar();
    });

    this.ytEngine.on('onStop', (playlist) => {
      this.dom.ytPulseDot.classList.remove('active');
      this.dom.ytAudioPill.classList.remove('playing');
      this.dom.ytAudioPill.textContent = 'STOPPED';
      this.dom.ytPlayIcon.style.display = 'block';
      this.dom.ytPauseIcon.style.display = 'none';

      if (this.dom.organMusicBtn && this.activePlaylistId === 'XwxWsq4otGg') {
        this.dom.organMusicBtn.classList.remove('active');
      }

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

    this.ytEngine.on('onTrackChange', (playlist) => {
      if (!playlist) return;
      this.dom.ytCurrentTitle.textContent = playlist.title;
      this.dom.ytCurrentArtist.textContent = playlist.artist || 'Between-Innings Warm-Up Queue';
      if (this.activeAudioSource === 'youtube') {
        this.dom.dockPlayerName.textContent = playlist.title;
        if (this.dom.miniTrackText) this.dom.miniTrackText.textContent = playlist.title;
      }
      this.renderInlineSongJar();
    });

    this.ytEngine.on('onFadeStart', ({ track, duration }) => {
      this.triggerHaptic([30, 50, 30]);
      this.dom.fadeOutBtn.classList.add('is-fading');
    });

    this.ytEngine.on('onFadeProgress', ({ remainingTime, progress }) => {
      if (this.activeAudioSource === 'youtube') {
        this.dom.fadeBtnSubtitle.textContent = `Fading (${remainingTime}s)`;
        if (typeof progress === 'number') {
          const targetPos = Math.round(progress * 100);
          this.applyCrossfaderPosition(targetPos, true);
        }
      }
    });

    this.ytEngine.on('onFadeComplete', () => {
      if (this.activeAudioSource === 'youtube') {
        this.dom.fadeBtnSubtitle.textContent = `Over ${this.audioEngine.fadeDuration.toFixed(1)}s`;
        this.dom.fadeOutBtn.classList.remove('is-fading');
        this.applyCrossfaderPosition(100, true);
      }
      this.renderInlineSongJar();
    });
  }

  updateActiveCardVisuals(activeId) {
    this.clearActiveVisuals();
    const activeEl = document.getElementById(`btn-${activeId}`);
    if (activeEl) {
      activeEl.classList.add('playing');
      const statusBadge = document.getElementById(`status-${activeId}`);
      if (statusBadge) {
        statusBadge.style.display = 'inline-block';
        statusBadge.className = 'card-status-badge live';
        statusBadge.textContent = 'NOW PLAYING';
      }
    }
  }

  clearActiveVisuals() {
    document.querySelectorAll('.player-card, .hype-btn').forEach(el => {
      el.classList.remove('playing', 'fading');
      const cardId = el.dataset.id || el.id.replace('btn-', '');
      const statusBadge = document.getElementById(`status-${cardId}`);
      if (statusBadge) {
        statusBadge.style.display = 'none';
      }
      const prog = document.getElementById(`progress-${cardId}`);
      if (prog) {
        prog.style.width = '0%';
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
      this.dom.onDeckName.textContent = `#${this.onDeckPlayer.number} ${this.onDeckPlayer.name} (${this.onDeckPlayer.song})`;
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

    // 2. Full-Width DJ Master Crossfader
    if (this.dom.masterCrossfader) {
      this.dom.masterCrossfader.addEventListener('input', (e) => {
        const pos = parseInt(e.target.value, 10);
        this.applyCrossfaderPosition(pos, false);
      });
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

  updateFadeDuration(val) {
    this.audioEngine.setFadeDuration(val);
    this.dom.fadeDurationVal.textContent = `${val.toFixed(1)}s`;
    this.dom.fadeBtnSubtitle.textContent = `Over ${val.toFixed(1)}s`;
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
      this.audioEngine.stop();
      this.ytEngine.stop();
      this.activeAudioSource = 'none';
      this.dom.fadeOutBtn.disabled = true;
      this.dom.stopCutBtn.disabled = true;
      this.dom.fadeOutBtn.classList.remove('is-fading');
      this.dom.fadeBtnSubtitle.textContent = `Over ${this.audioEngine.fadeDuration.toFixed(1)}s`;
      this.dom.dockPlayerName.textContent = 'READY TO HIT';
      this.dom.dockSongTitle.textContent = 'Tap any player to drop their walk-up track';
      this.dom.dockTimer.textContent = '0:00';
      this.dom.trackProgressFill.style.width = '0%';
      this.dom.liveEqBadge.classList.remove('active');
    });

    // Play On Deck button
    this.dom.playOnDeckBtn.addEventListener('click', () => {
      if (this.onDeckPlayer) {
        this.handleTrackClick(this.onDeckPlayer);
      }
    });

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

    // Fullscreen toggle
    this.dom.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

    // Server Ping & App Refresh
    if (this.dom.serverRefreshBtn) {
      this.dom.serverRefreshBtn.addEventListener('click', () => this.handleServerRefresh());
    }

    // Help & Tips Modal
    this.dom.helpBtn.addEventListener('click', () => {
      this.triggerHaptic(15);
      this.dom.helpModal.style.display = 'flex';
    });
    this.dom.closeHelpModal.addEventListener('click', () => {
      this.dom.helpModal.style.display = 'none';
    });
    this.dom.gotItBtn.addEventListener('click', () => {
      this.dom.helpModal.style.display = 'none';
    });

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
    // Top Tab Pill clicks
    this.dom.tabWalkUp.addEventListener('click', () => this.switchPage('walkup'));
    this.dom.tabInnings.addEventListener('click', () => this.switchPage('innings'));

    // Mobile touch swipe gestures on pages track
    let touchStartX = 0;
    let touchStartY = 0;
    let isHorizontalSwipe = null;

    const wrapper = this.dom.pagesTrackWrapper;

    wrapper.addEventListener('touchstart', (e) => {
      // Don't intercept touches on sliders, youtube frame, or lineup handle
      if (e.target.closest('#ytPlayerContainer, input[type="range"], .lineup-drag-handle')) {
        return;
      }
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      isHorizontalSwipe = null;
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
      if (touchStartX === 0 && touchStartY === 0) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;

      if (isHorizontalSwipe === null && (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8)) {
        isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) + 5;
      }
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      if (touchStartX === 0 && touchStartY === 0) return;
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartX;

      if (isHorizontalSwipe && Math.abs(deltaX) > 45) {
        if (deltaX < 0 && this.currentPage === 'walkup') {
          // Swiped left -> show innings
          this.switchPage('innings');
        } else if (deltaX > 0 && this.currentPage === 'innings') {
          // Swiped right -> show walkup
          this.switchPage('walkup');
        }
      }

      touchStartX = 0;
      touchStartY = 0;
      isHorizontalSwipe = null;
    }, { passive: true });
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

    // Stage Play / Pause toggle (Outdoor Sunlight-Optimized Large Button)
    if (this.dom.ytPlayPauseBtn) {
      this.dom.ytPlayPauseBtn.addEventListener('click', () => {
        this.triggerHaptic(20);
        if (this.ytEngine.isPlaying) {
          this.ytEngine.pause();
        } else {
          activateYouTubeSource(this.ytEngine.currentPlaylist?.title);
          this.ytEngine.play();
        }
      });
    }

    // Next Track in playlist
    if (this.dom.ytNextBtn) {
      this.dom.ytNextBtn.addEventListener('click', () => {
        this.triggerHaptic(20);
        activateYouTubeSource();
        this.ytEngine.nextTrack();
      });
    }

    // Previous Track in playlist
    if (this.dom.ytPrevBtn) {
      this.dom.ytPrevBtn.addEventListener('click', () => {
        this.triggerHaptic(20);
        activateYouTubeSource();
        this.ytEngine.prevTrack();
      });
    }

    // Random Song / Shuffle Track
    const handleRandomTrack = () => {
      this.triggerHaptic([25, 40]);
      activateYouTubeSource();
      this.drawRandomSongFromJar();
    };

    if (this.dom.ytRandomBtn) {
      this.dom.ytRandomBtn.addEventListener('click', handleRandomTrack);
    }

    // Dedicated Quick-Launch Ballpark Organ Music Button
    if (this.dom.organMusicBtn) {
      this.dom.organMusicBtn.addEventListener('click', () => {
        this.triggerHaptic([30, 45]);
        const organId = 'XwxWsq4otGg';
        const organTitle = 'Baseball Organ Music';
        
        // If already selected and playing, toggle pause
        if (this.activePlaylistId === organId && this.ytEngine.isPlaying) {
          this.ytEngine.pause();
          this.dom.organMusicBtn.classList.remove('active');
        } else {
          // Switch playlist, sync dropdown, reset fader if muted, and immediately play organ music
          this.switchActivePlaylist(organId, organTitle);
          if (this.dom.playlistSelect) {
            this.dom.playlistSelect.value = organId;
          }
          this.dom.organMusicBtn.classList.add('active');
          this.resetCrossfader();
          activateYouTubeSource(organTitle);
          this.ytEngine.play();
        }
      });
    }

    // Preset Playlist Dropdown Menu (No auto-play on switch!)
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

    // Load playlist in cue mode (autoPlay = false) so audio doesn't start unexpectedly
    this.ytEngine.loadPlaylist(listId, title, false);

    if (this.dom.ytCurrentTitle) this.dom.ytCurrentTitle.textContent = title;
    if (this.dom.ytPlaylistStatusTag) this.dom.ytPlaylistStatusTag.textContent = '⚾ ' + title.toUpperCase();
    if (this.dom.dockSongTitle) this.dom.dockSongTitle.textContent = title;
    if (this.dom.miniTrackText) this.dom.miniTrackText.textContent = `${title} (Ready)`;

    // Sync organ button active state
    if (this.dom.organMusicBtn) {
      if (listId === 'XwxWsq4otGg') {
        this.dom.organMusicBtn.classList.add('active');
      } else {
        this.dom.organMusicBtn.classList.remove('active');
      }
    }

    // Fill the Song Jar with all of the tracks from this selected playlist!
    this.playlistSongs = this.loadPlaylistSongs(listId);
    this.renderInlineSongJar();
  }

  // =========================================================================
  // Inline Dugout Song Jar (Populated directly from Active Playlist)
  // =========================================================================
  loadPlaylistSongs(listId) {
    // 1. Try reading saved custom tracks for this specific playlist from localStorage
    try {
      const saved = localStorage.getItem('grizzlies_playlist_songs_' + listId);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const defaultList = PLAYLIST_TRACKS_MAP[listId]?.tracks || [];
          const existingIds = new Set(parsed.map(s => s.id));
          const missing = defaultList.filter(s => !existingIds.has(s.id));
          if (missing.length > 0) {
            const merged = [...parsed, ...missing];
            this.savePlaylistSongs(listId, merged);
            return merged;
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error loading playlist songs:', e);
    }

    // 2. Fall back to preset map for known playlists
    if (PLAYLIST_TRACKS_MAP[listId]) {
      const presetTracks = [...PLAYLIST_TRACKS_MAP[listId].tracks];
      this.savePlaylistSongs(listId, presetTracks);
      return presetTracks;
    }

    // 3. Fallback default
    return [...PLAYLIST_TRACKS_MAP['EK-XfDRL2wA'].tracks];
  }

  savePlaylistSongs(listId, songs) {
    this.playlistSongs = songs;
    this.songJar = songs;
    try {
      localStorage.setItem('grizzlies_playlist_songs_' + listId, JSON.stringify(songs));
    } catch (e) {
      console.warn('Error saving playlist songs:', e);
    }
    this.updateInlineJarBadge();
  }

  updateInlineJarBadge() {
    const count = this.playlistSongs ? this.playlistSongs.length : 0;
    if (this.dom.inlineJarCountPill) {
      this.dom.inlineJarCountPill.textContent = `${count} ${count === 1 ? 'SONG' : 'SONGS'}`;
    }
  }

  setupInlineSongJar() {
    this.updateInlineJarBadge();
    this.renderInlineSongJar();

    // Big Draw Random Song from Playlist Button
    if (this.dom.inlineJarDrawRandomBtn) {
      this.dom.inlineJarDrawRandomBtn.addEventListener('click', () => {
        this.triggerHaptic([30, 50]);
        this.drawRandomSongFromJar();
      });
    }

    // Quick Add Song to Active Playlist
    if (this.dom.inlineJarAddBtn) {
      this.dom.inlineJarAddBtn.addEventListener('click', () => {
        this.handleAddSongToInlineJar();
      });
    }

    if (this.dom.inlineJarAddInput) {
      this.dom.inlineJarAddInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.handleAddSongToInlineJar();
        }
      });
    }
  }

  renderInlineSongJar() {
    if (!this.dom.inlineJarSongsList) return;
    this.dom.inlineJarSongsList.innerHTML = '';

    const listInfo = PLAYLIST_TRACKS_MAP[this.activePlaylistId];
    const playlistTitle = listInfo ? listInfo.title : (this.ytEngine.currentPlaylist?.title || 'Baseball');
    if (this.dom.inlineJarTitle) {
      this.dom.inlineJarTitle.textContent = `⚾ ${playlistTitle.toUpperCase()} SONG JAR`;
    }

    const currentYtId = this.ytEngine?.currentPlaylist?.id;
    const isYtPlaying = this.activeAudioSource === 'youtube' && this.ytEngine.isPlaying;

    this.updateInlineJarBadge();

    this.playlistSongs.forEach((song, idx) => {
      const isThisPlaying = isYtPlaying && currentYtId === song.id;

      const card = document.createElement('div');
      card.className = `inline-jar-song-card ${isThisPlaying ? 'active' : ''}`;
      card.dataset.id = song.id;

      card.innerHTML = `
        <div class="song-card-left">
          <span class="song-index-badge">#${idx + 1}</span>
          <div class="song-card-text">
            <div class="song-card-title">${song.title}</div>
            <div class="song-card-artist">${song.artist || 'Between-Innings Track'}</div>
          </div>
        </div>
        <div class="song-card-actions">
          <button class="btn-song-play-row" title="${isThisPlaying ? 'Pause Track' : 'Play Track'}" aria-label="Play ${song.title}">
            ${isThisPlaying 
              ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>' 
              : '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'}
          </button>
          ${idx >= 3 ? `<button class="btn-song-delete-row" title="Remove Track">&times;</button>` : ''}
        </div>
      `;

      // Play button on row
      const playBtn = card.querySelector('.btn-song-play-row');
      playBtn.addEventListener('click', () => {
        this.triggerHaptic(20);
        if (isThisPlaying) {
          this.ytEngine.pause();
        } else {
          if (this.audioEngine.isPlaying) this.audioEngine.stop();
          this.activeAudioSource = 'youtube';
          this.dom.fadeOutBtn.disabled = false;
          this.dom.stopCutBtn.disabled = false;
          this.dom.liveEqBadge.classList.add('active');
          if (this.dom.miniEqDot) this.dom.miniEqDot.classList.add('active');
          if (this.dom.dockPlayerName) this.dom.dockPlayerName.textContent = song.title;
          if (this.dom.dockSongTitle) this.dom.dockSongTitle.textContent = song.artist || playlistTitle;
          if (this.dom.miniTrackText) this.dom.miniTrackText.textContent = song.title;
          this.ytEngine.playVideo(song.id, song.title, song.artist || playlistTitle);
          this.renderInlineSongJar();
        }
      });

      // Delete custom added button
      const delBtn = card.querySelector('.btn-song-delete-row');
      if (delBtn) {
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.triggerHaptic(15);
          const updated = this.playlistSongs.filter((_, i) => i !== idx);
          this.savePlaylistSongs(this.activePlaylistId, updated);
          this.renderInlineSongJar();
        });
      }

      this.dom.inlineJarSongsList.appendChild(card);
    });
  }

  drawRandomSongFromJar() {
    if (!this.playlistSongs || this.playlistSongs.length === 0) return;
    const randomIndex = Math.floor(Math.random() * this.playlistSongs.length);
    const chosen = this.playlistSongs[randomIndex];

    if (this.audioEngine.isPlaying) this.audioEngine.stop();
    this.activeAudioSource = 'youtube';
    this.dom.fadeOutBtn.disabled = false;
    this.dom.stopCutBtn.disabled = false;
    this.dom.liveEqBadge.classList.add('active');
    if (this.dom.miniEqDot) this.dom.miniEqDot.classList.add('active');

    const listInfo = PLAYLIST_TRACKS_MAP[this.activePlaylistId];
    const playlistTitle = listInfo ? listInfo.title : 'Baseball';

    if (this.dom.dockPlayerName) this.dom.dockPlayerName.textContent = chosen.title;
    if (this.dom.dockSongTitle) this.dom.dockSongTitle.textContent = chosen.artist || playlistTitle;
    if (this.dom.miniTrackText) this.dom.miniTrackText.textContent = `🎲 ${chosen.title}`;

    this.ytEngine.playVideo(chosen.id, chosen.title, chosen.artist || playlistTitle);
    this.renderInlineSongJar();
  }

  handleAddSongToInlineJar() {
    const rawInput = this.dom.inlineJarAddInput.value.trim();
    if (!rawInput) return;

    let videoId = null;
    let songTitle = rawInput;
    let artistName = 'Custom Track';

    const parsed = YouTubeInningsEngine.parseYouTubePlaylistInput(rawInput);
    if (parsed) {
      videoId = parsed.videoId || parsed.playlistId;
      songTitle = 'YouTube Track';
    } else {
      videoId = 'kOV2iTeGQik';
    }

    const newSong = {
      id: videoId,
      title: songTitle,
      artist: artistName
    };

    const updated = [...this.playlistSongs, newSong];
    this.savePlaylistSongs(this.activePlaylistId, updated);
    this.renderInlineSongJar();
    this.dom.inlineJarAddInput.value = '';
    this.triggerHaptic(25);

    // Fetch real title asynchronously via YouTube oEmbed
    if (videoId) {
      fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
        .then(res => res.json())
        .then(data => {
          if (data && data.title) {
            const found = this.playlistSongs.find(s => s.id === videoId && s.title === 'YouTube Track');
            if (found) {
              found.title = data.title;
              if (data.author_name) found.artist = data.author_name;
              this.savePlaylistSongs(this.activePlaylistId, this.playlistSongs);
              this.renderInlineSongJar();
            }
          }
        })
        .catch(() => {});
    }
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

    if (this.dom.dockDrawerHandleBar) {
      this.dom.dockDrawerHandleBar.addEventListener('click', () => {
        toggle();
      });

      this.dom.dockDrawerHandleBar.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      this.dom.dockDrawerHandleBar.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
          const deltaY = e.changedTouches[0].clientY - touchStartY;
          if (deltaY < -30) {
            toggle(true); // Swipe up to open
          } else if (deltaY > 30) {
            toggle(false); // Swipe down to collapse
          }
        }
      }, { passive: true });
    }

    if (this.dom.drawerToggleBtn) {
      this.dom.drawerToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggle();
      });
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
          <span class="lineup-batting-pos">#${idx + 1}</span>
          <div class="lineup-player-info">
            <div class="lineup-name-row">
              <span class="lineup-player-name">${player.name}</span>
              <span class="lineup-jersey-pill">#${player.number}</span>
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

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.grizzliesApp = new GrizzliesApp();
});
