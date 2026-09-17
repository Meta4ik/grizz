/**
 * Wiley Grizzlies Walk-Up Music Soundboard App
 * Main Controller
 */

import { PLAYERS, HYPE_TRACKS } from './roster.js';
import { WalkUpAudioEngine } from './audio-player.js';
import { YouTubeInningsEngine } from './youtube-manager.js';

// Default Songs in the Dugout Song Jar (Coach's playlist selections + Dugout Anthems)
export const DEFAULT_JAR_SONGS = [
  { id: 'EK-XfDRL2wA', title: 'Getting Older (Clean)', artist: 'Jaz Von ft. NBA YoungBoy' },
  { id: 'aXmmyuIqZyo', title: 'Fast Car', artist: 'Luke Combs' },
  { id: 'MVDJxMxzTL0', title: 'Wild Ones', artist: 'Jessie Murph, Jelly Roll' },
  { id: 'kOV2iTeGQik', title: 'Walk', artist: 'Pantera' },
  { id: 'v2AC41dglnM', title: 'Thunderstruck', artist: 'AC/DC' },
  { id: '-tJYN-eG1zk', title: 'We Will Rock You', artist: 'Queen' },
  { id: 'y6120QOlsfU', title: 'Sandstorm', artist: 'Darude' },
  { id: 'btPJPFnesV4', title: 'Eye of the Tiger', artist: 'Survivor' }
];

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
    this.lastBatterIndex = -1;
    this.onDeckPlayer = null;

    // Song Jar state
    this.songJar = this.loadSongJar();

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
      ytRandomBannerBtn: document.getElementById('ytRandomBannerBtn'),
      ytUrlInput: document.getElementById('ytUrlInput'),
      btnAddYtTrack: document.getElementById('btnAddYtTrack'),
      playlistSelect: document.getElementById('playlistSelect'),
      playlistChips: document.querySelectorAll('.playlist-chip'),

      // Master Dock
      masterDock: document.getElementById('masterDock'),
      dockPlayerName: document.getElementById('dockPlayerName'),
      dockSongTitle: document.getElementById('dockSongTitle'),
      dockTimer: document.getElementById('dockTimer'),
      liveEqBadge: document.getElementById('liveEqBadge'),
      trackProgressFill: document.getElementById('trackProgressFill'),
      fadeOutBtn: document.getElementById('fadeOutBtn'),
      fadeBtnSubtitle: document.getElementById('fadeBtnSubtitle'),
      stopCutBtn: document.getElementById('stopCutBtn'),

      // Sliders
      fadeDurationSlider: document.getElementById('fadeDurationSlider'),
      fadeDurationVal: document.getElementById('fadeDurationVal'),
      presetPills: document.querySelectorAll('.preset-pill'),
      masterVolumeSlider: document.getElementById('masterVolumeSlider'),
      masterVolumeVal: document.getElementById('masterVolumeVal'),
      volIcon: document.getElementById('volIcon'),

      // Header buttons
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

      // Song Jar Elements
      openSongJarBtn: document.getElementById('openSongJarBtn'),
      songJarModal: document.getElementById('songJarModal'),
      closeSongJarModal: document.getElementById('closeSongJarModal'),
      closeSongJarDoneBtn: document.getElementById('closeSongJarDoneBtn'),
      songJarCount: document.getElementById('songJarCount'),
      jarSongsCountText: document.getElementById('jarSongsCountText'),
      jarDrawRandomBtn: document.getElementById('jarDrawRandomBtn'),
      jarSongInput: document.getElementById('jarSongInput'),
      jarAddSongBtn: document.getElementById('jarAddSongBtn'),
      jarSongsList: document.getElementById('jarSongsList'),
      jarResetDefaultBtn: document.getElementById('jarResetDefaultBtn'),

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
    this.setupSongJar();
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

  renderPlayers() {
    const players = this.getDisplayedPlayers();
    this.dom.playerGrid.innerHTML = '';
    this.dom.rosterCountBadge.textContent = `${players.length} PLAYERS`;

    players.forEach((player, index) => {
      const card = document.createElement('div');
      card.className = 'player-card';
      card.id = `btn-${player.id}`;
      card.dataset.id = player.id;

      // Status badge: If sorting by lineup, show batting slot e.g. "1st", "2nd"
      let battingSlotText = '';
      if (this.sortMode === 'lineup') {
        const slotIdx = this.lineupOrder.findIndex(p => p.id === player.id);
        if (slotIdx >= 0) {
          battingSlotText = `#${slotIdx + 1} BATTER`;
        }
      }

      card.innerHTML = `
        <div class="card-progress-bar" id="progress-${player.id}"></div>
        <div class="card-top-row">
          <div class="jersey-badge">#${player.number}</div>
          <div class="card-badges-wrap">
            ${battingSlotText ? `<span class="card-status-badge on-deck-tag">${battingSlotText}</span>` : ''}
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

    this.audioEngine.on('onFadeProgress', ({ remainingTime }) => {
      if (this.activeAudioSource === 'walkup') {
        this.dom.fadeBtnSubtitle.textContent = `Fading (${remainingTime}s)`;
      }
    });

    this.audioEngine.on('onFadeComplete', () => {
      if (this.activeAudioSource === 'walkup') {
        this.dom.fadeBtnSubtitle.textContent = `Over ${this.audioEngine.fadeDuration.toFixed(1)}s`;
        this.dom.fadeOutBtn.classList.remove('is-fading');
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
      this.dom.liveEqBadge.classList.add('active');
      this.dom.fadeOutBtn.disabled = false;
      this.dom.stopCutBtn.disabled = false;
      this.dom.fadeOutBtn.classList.remove('is-fading');
    });

    this.ytEngine.on('onPause', (playlist) => {
      this.dom.ytPulseDot.classList.remove('active');
      this.dom.ytAudioPill.classList.remove('playing');
      this.dom.ytAudioPill.textContent = 'PAUSED';
      this.dom.ytPlayIcon.style.display = 'block';
      this.dom.ytPauseIcon.style.display = 'none';

      if (this.activeAudioSource === 'youtube') {
        this.dom.liveEqBadge.classList.remove('active');
      }
    });

    this.ytEngine.on('onStop', (playlist) => {
      this.dom.ytPulseDot.classList.remove('active');
      this.dom.ytAudioPill.classList.remove('playing');
      this.dom.ytAudioPill.textContent = 'STOPPED';
      this.dom.ytPlayIcon.style.display = 'block';
      this.dom.ytPauseIcon.style.display = 'none';

      if (this.activeAudioSource === 'youtube') {
        this.activeAudioSource = 'none';
        this.dom.fadeOutBtn.disabled = true;
        this.dom.stopCutBtn.disabled = true;
        this.dom.fadeOutBtn.classList.remove('is-fading');
        this.dom.dockPlayerName.textContent = 'READY TO HIT';
        this.dom.dockSongTitle.textContent = 'Tap any player to drop their walk-up track';
        this.dom.dockTimer.textContent = '0:00';
        this.dom.trackProgressFill.style.width = '0%';
        this.dom.liveEqBadge.classList.remove('active');
      }
    });

    this.ytEngine.on('onTrackChange', (playlist) => {
      if (!playlist) return;
      this.dom.ytCurrentTitle.textContent = playlist.title;
      this.dom.ytCurrentArtist.textContent = playlist.artist || 'Between-Innings Warm-Up Queue';
    });

    this.ytEngine.on('onFadeStart', ({ track, duration }) => {
      this.triggerHaptic([30, 50, 30]);
      this.dom.fadeOutBtn.classList.add('is-fading');
    });

    this.ytEngine.on('onFadeProgress', ({ remainingTime }) => {
      if (this.activeAudioSource === 'youtube') {
        this.dom.fadeBtnSubtitle.textContent = `Fading (${remainingTime}s)`;
      }
    });

    this.ytEngine.on('onFadeComplete', () => {
      if (this.activeAudioSource === 'youtube') {
        this.dom.fadeBtnSubtitle.textContent = `Over ${this.audioEngine.fadeDuration.toFixed(1)}s`;
        this.dom.fadeOutBtn.classList.remove('is-fading');
      }
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
    
    if (isPlaying) {
      this.dom.liveEqBadge.classList.add('active');
    } else {
      this.dom.liveEqBadge.classList.remove('active');
    }
  }

  // =========================================================================
  // On-Deck Batter Management
  // =========================================================================
  updateOnDeckAfterPlay(track) {
    if (track.isHype) return;

    // Find position in lineup
    const idx = this.lineupOrder.findIndex(p => p.id === track.id);
    if (idx >= 0) {
      this.lastBatterIndex = idx;
      const nextIdx = (idx + 1) % this.lineupOrder.length;
      this.onDeckPlayer = this.lineupOrder[nextIdx];
      this.updateOnDeckDisplay();
    }
  }

  updateOnDeckDisplay() {
    if (this.onDeckPlayer) {
      this.dom.onDeckBanner.style.display = 'flex';
      this.dom.onDeckName.textContent = `#${this.onDeckPlayer.number} ${this.onDeckPlayer.name} (${this.onDeckPlayer.song})`;
    } else {
      // Default to first batter in lineup
      this.onDeckPlayer = this.lineupOrder[0];
      this.dom.onDeckBanner.style.display = 'flex';
      this.dom.onDeckName.textContent = `#${this.onDeckPlayer.number} ${this.onDeckPlayer.name} (${this.onDeckPlayer.song})`;
    }
  }

  // =========================================================================
  // Slider Controls
  // =========================================================================
  setupSliders() {
    // 1. Fade Duration Slider
    const savedFade = localStorage.getItem('grizzlies_fade_duration');
    if (savedFade) {
      const val = parseFloat(savedFade);
      this.dom.fadeDurationSlider.value = val;
      this.updateFadeDuration(val);
    } else {
      this.updateFadeDuration(2.0);
    }

    this.dom.fadeDurationSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      this.updateFadeDuration(val);
    });

    // Preset pills for 1.0s, 2.0s, 3.0s, 4.0s
    this.dom.presetPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const secs = parseFloat(pill.dataset.seconds);
        this.dom.fadeDurationSlider.value = secs;
        this.updateFadeDuration(secs);
        this.triggerHaptic(15);
      });
    });

    // 2. Master Volume Slider
    this.dom.masterVolumeSlider.addEventListener('input', (e) => {
      const pct = parseInt(e.target.value, 10);
      this.dom.masterVolumeVal.textContent = `${pct}%`;
      this.audioEngine.setMasterVolume(pct / 100);
      this.ytEngine.setVolume(pct);
      
      // Update icon
      if (pct === 0) {
        this.dom.volIcon.textContent = '🔇';
      } else if (pct < 50) {
        this.dom.volIcon.textContent = '🔉';
      } else {
        this.dom.volIcon.textContent = '🔊';
      }
    });
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
      this.renderLineupModalItems();
    });

    // Fullscreen toggle
    this.dom.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

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
  // Inning Warm-Up Countdown Timer (2:00 / 1:30 / 1:00)
  // =========================================================================
  setupInningTimer() {
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

    this.dom.timerToggleBtn.addEventListener('click', () => {
      this.triggerHaptic(20);
      if (this.timerRunning) {
        this.pauseTimer();
      } else {
        this.startTimer();
      }
    });

    this.dom.timerResetBtn.addEventListener('click', () => {
      this.triggerHaptic(20);
      this.resetTimer();
    });

    this.dom.timerPlus30Btn.addEventListener('click', () => {
      this.triggerHaptic(15);
      this.timerRemaining += 30;
      if (this.timerRemaining > this.timerDuration) {
        this.timerDuration = this.timerRemaining;
      }
      this.updateTimerDisplay();
    });
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerRunning = true;
    this.dom.timerToggleIcon.textContent = '⏸';
    this.dom.timerToggleText.textContent = 'PAUSE';
    this.dom.inningTimerDisplay.classList.add('running');

    this.timerInterval = setInterval(() => {
      if (this.timerRemaining > 0) {
        this.timerRemaining--;
        this.updateTimerDisplay();

        if (this.timerRemaining === 10) {
          this.triggerHaptic([50, 100, 50]);
          this.dom.inningTimerDisplay.classList.add('warning');
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
    this.dom.timerToggleIcon.textContent = '▶';
    this.dom.timerToggleText.textContent = 'START';
    this.dom.inningTimerDisplay.classList.remove('running');
  }

  resetTimer() {
    this.pauseTimer();
    this.timerRemaining = this.timerDuration;
    this.dom.inningTimerDisplay.classList.remove('warning');
    this.updateTimerDisplay();
  }

  updateTimerDisplay() {
    const mins = Math.floor(this.timerRemaining / 60);
    const secs = (this.timerRemaining % 60).toString().padStart(2, '0');
    this.dom.inningTimerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs}`;

    const pct = this.timerDuration > 0 ? (this.timerRemaining / this.timerDuration) * 100 : 0;
    this.dom.timerBarFill.style.width = `${pct}%`;
  }

  // =========================================================================
  // Between-Innings YouTube Playlist & Controls
  // =========================================================================
  setupYouTubeControls() {
    const activateYouTubeSource = (trackTitle) => {
      if (this.activeAudioSource === 'walkup') {
        this.audioEngine.stop();
      }
      this.activeAudioSource = 'youtube';
      this.dom.fadeOutBtn.disabled = false;
      this.dom.stopCutBtn.disabled = false;
      this.dom.liveEqBadge.classList.add('active');
      if (trackTitle) {
        this.dom.dockPlayerName.textContent = trackTitle;
        this.dom.dockSongTitle.textContent = 'Between-Innings Playlist';
      }
    };

    // Stage Play / Pause toggle
    this.dom.ytPlayPauseBtn.addEventListener('click', () => {
      this.triggerHaptic(20);
      if (this.ytEngine.isPlaying) {
        this.ytEngine.pause();
      } else {
        activateYouTubeSource(this.ytEngine.currentPlaylist?.title);
        this.ytEngine.play();
      }
    });

    // Next Track in playlist
    this.dom.ytNextBtn.addEventListener('click', () => {
      this.triggerHaptic(20);
      activateYouTubeSource();
      this.ytEngine.nextTrack();
    });

    // Previous Track in playlist
    this.dom.ytPrevBtn.addEventListener('click', () => {
      this.triggerHaptic(20);
      activateYouTubeSource();
      this.ytEngine.prevTrack();
    });

    // Random Song / Shuffle Track
    const handleRandomTrack = () => {
      this.triggerHaptic([25, 40]);
      activateYouTubeSource();
      this.ytEngine.playRandomTrack();
    };

    if (this.dom.ytRandomBtn) {
      this.dom.ytRandomBtn.addEventListener('click', handleRandomTrack);
    }
    if (this.dom.ytRandomBannerBtn) {
      this.dom.ytRandomBannerBtn.addEventListener('click', handleRandomTrack);
    }

    // Load Playlist button
    this.dom.btnAddYtTrack.addEventListener('click', () => {
      this.handleLoadPlaylist();
    });

    this.dom.ytUrlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.handleLoadPlaylist();
      }
    });

    // Preset Playlist Chips
    this.dom.playlistChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const listId = chip.dataset.list;
        const title = chip.dataset.title;
        this.dom.playlistChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        if (this.dom.playlistSelect) {
          this.dom.playlistSelect.value = listId;
        }
        this.triggerHaptic(20);
        activateYouTubeSource(title);
        this.ytEngine.loadPlaylist(listId, title);
      });
    });

    // Preset Playlist Dropdown Menu
    if (this.dom.playlistSelect) {
      this.dom.playlistSelect.addEventListener('change', (e) => {
        const listId = e.target.value;
        const selectedOpt = e.target.options[e.target.selectedIndex];
        const title = selectedOpt ? selectedOpt.dataset.title || selectedOpt.textContent : 'Dugout Playlist';
        this.dom.playlistChips.forEach(c => {
          if (c.dataset.list === listId) {
            c.classList.add('active');
          } else {
            c.classList.remove('active');
          }
        });
        this.triggerHaptic(20);
        activateYouTubeSource(title);
        this.ytEngine.loadPlaylist(listId, title);
      });
    }

    // Highlight the active preset chip and dropdown on launch if matched
    const currentListId = this.ytEngine?.currentPlaylist?.id;
    if (currentListId) {
      let matched = false;
      this.dom.playlistChips.forEach(c => {
        if (c.dataset.list === currentListId) {
          c.classList.add('active');
          matched = true;
        } else {
          c.classList.remove('active');
        }
      });
      if (this.dom.playlistSelect) {
        this.dom.playlistSelect.value = currentListId;
      }
    }
  }

  handleLoadPlaylist() {
    const rawInput = this.dom.ytUrlInput.value.trim();
    if (!rawInput) return;

    const parsed = YouTubeInningsEngine.parseYouTubePlaylistInput(rawInput);
    if (!parsed || !parsed.playlistId) {
      alert('Could not parse YouTube playlist or video link. Please paste a valid YouTube playlist URL or video link.');
      return;
    }

    const playlistTitle = parsed.isMix ? 'Custom Dugout Mix (50+ Songs)' : 'Custom Inning Playlist';
    this.ytEngine.loadPlaylist(parsed.playlistId, playlistTitle);
    this.dom.ytUrlInput.value = '';
    this.dom.playlistChips.forEach(c => c.classList.remove('active'));
    if (this.dom.playlistSelect) {
      this.dom.playlistSelect.value = '';
    }
    this.triggerHaptic(25);
  }

  // =========================================================================
  // Dugout Song Jar Methods
  // =========================================================================
  loadSongJar() {
    try {
      const saved = localStorage.getItem('grizzlies_song_jar');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure new coach default songs are merged in if not present
          const existingIds = new Set(parsed.map(s => s.id));
          const missingCoachTracks = DEFAULT_JAR_SONGS.filter(s => !existingIds.has(s.id));
          if (missingCoachTracks.length > 0) {
            const merged = [...missingCoachTracks, ...parsed];
            this.saveSongJar(merged);
            return merged;
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error loading song jar:', e);
    }
    return [...DEFAULT_JAR_SONGS];
  }

  saveSongJar(songs) {
    this.songJar = songs;
    try {
      localStorage.setItem('grizzlies_song_jar', JSON.stringify(songs));
    } catch (e) {
      console.warn('Error saving song jar:', e);
    }
    this.updateSongJarBadge();
  }

  updateSongJarBadge() {
    const count = this.songJar ? this.songJar.length : 0;
    if (this.dom.songJarCount) {
      this.dom.songJarCount.textContent = count;
    }
    if (this.dom.jarSongsCountText) {
      this.dom.jarSongsCountText.textContent = count;
    }
  }

  setupSongJar() {
    this.updateSongJarBadge();

    if (this.dom.openSongJarBtn) {
      this.dom.openSongJarBtn.addEventListener('click', () => {
        this.triggerHaptic(20);
        this.openSongJarModal();
      });
    }

    if (this.dom.closeSongJarModal) {
      this.dom.closeSongJarModal.addEventListener('click', () => {
        this.closeSongJarModal();
      });
    }

    if (this.dom.closeSongJarDoneBtn) {
      this.dom.closeSongJarDoneBtn.addEventListener('click', () => {
        this.closeSongJarModal();
      });
    }

    if (this.dom.songJarModal) {
      this.dom.songJarModal.addEventListener('click', (e) => {
        if (e.target === this.dom.songJarModal) {
          this.closeSongJarModal();
        }
      });
    }

    if (this.dom.jarDrawRandomBtn) {
      this.dom.jarDrawRandomBtn.addEventListener('click', () => {
        this.triggerHaptic([30, 50]);
        this.drawRandomSongFromJar();
      });
    }

    if (this.dom.jarAddSongBtn) {
      this.dom.jarAddSongBtn.addEventListener('click', () => {
        this.handleAddSongToJar();
      });
    }

    if (this.dom.jarSongInput) {
      this.dom.jarSongInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.handleAddSongToJar();
        }
      });
    }

    if (this.dom.jarResetDefaultBtn) {
      this.dom.jarResetDefaultBtn.addEventListener('click', () => {
        if (confirm('Reset song jar to default baseball anthems?')) {
          this.saveSongJar([...DEFAULT_JAR_SONGS]);
          this.renderSongJarList();
          this.triggerHaptic(20);
        }
      });
    }
  }

  openSongJarModal() {
    this.renderSongJarList();
    if (this.dom.songJarModal) {
      this.dom.songJarModal.style.display = 'flex';
    }
  }

  closeSongJarModal() {
    if (this.dom.songJarModal) {
      this.dom.songJarModal.style.display = 'none';
    }
  }

  renderSongJarList() {
    if (!this.dom.jarSongsList) return;
    this.dom.jarSongsList.innerHTML = '';

    const currentYtId = this.ytEngine?.currentPlaylist?.id;

    this.songJar.forEach((song, idx) => {
      const isPlaying = this.activeAudioSource === 'youtube' && this.ytEngine.isPlaying && currentYtId === song.id;

      const item = document.createElement('div');
      item.className = `jar-song-item ${isPlaying ? 'active' : ''}`;
      item.dataset.id = song.id;

      item.innerHTML = `
        <div class="jar-song-left" style="display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1;">
          <span style="font-size: 0.72rem; font-weight: 800; color: var(--text-dim); width: 18px;">#${idx + 1}</span>
          <div class="jar-song-info">
            <div class="jar-song-title">${song.title}</div>
            <div class="jar-song-artist">${song.artist}</div>
          </div>
        </div>
        <div class="jar-song-actions" style="display: flex; align-items: center; gap: 6px;">
          <button class="btn-jar-play" title="Play Track">
            ${isPlaying ? '❚❚ PAUSE' : '▶ PLAY'}
          </button>
          <button class="btn-jar-del" title="Remove from Jar" style="background: none; border: none; color: var(--text-dim); font-size: 0.95rem; cursor: pointer; padding: 4px;">
            ✕
          </button>
        </div>
      `;

      // Play button click
      const playBtn = item.querySelector('.btn-jar-play');
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.triggerHaptic(20);
        if (isPlaying) {
          this.ytEngine.pause();
          playBtn.textContent = '▶ PLAY';
          item.classList.remove('active');
        } else {
          this.playSongFromJar(song);
        }
      });

      // Clicking row also plays
      item.addEventListener('click', (e) => {
        if (e.target.closest('.btn-jar-del')) return;
        this.triggerHaptic(20);
        this.playSongFromJar(song);
      });

      // Delete button click
      const delBtn = item.querySelector('.btn-jar-del');
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.songJar.length <= 1) {
          alert('Keep at least one song in the jar!');
          return;
        }
        const updated = this.songJar.filter((_, i) => i !== idx);
        this.saveSongJar(updated);
        this.renderSongJarList();
      });

      this.dom.jarSongsList.appendChild(item);
    });
  }

  playSongFromJar(song) {
    if (this.audioEngine.isPlaying) {
      this.audioEngine.stop();
    }
    this.activeAudioSource = 'youtube';
    this.dom.fadeOutBtn.disabled = false;
    this.dom.stopCutBtn.disabled = false;
    this.dom.liveEqBadge.classList.add('active');
    this.dom.dockPlayerName.textContent = song.title;
    this.dom.dockSongTitle.textContent = song.artist || 'Dugout Song Jar';

    this.ytEngine.playVideo(song.id, song.title, song.artist);
    this.renderSongJarList();
  }

  drawRandomSongFromJar() {
    if (!this.songJar || this.songJar.length === 0) return;
    const randomIndex = Math.floor(Math.random() * this.songJar.length);
    const chosen = this.songJar[randomIndex];

    this.playSongFromJar(chosen);

    // Visual feedback: scroll to chosen track and highlight
    const items = this.dom.jarSongsList.querySelectorAll('.jar-song-item');
    if (items[randomIndex]) {
      items[randomIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      items[randomIndex].classList.add('active');
    }
  }

  handleAddSongToJar() {
    const raw = this.dom.jarSongInput.value.trim();
    if (!raw) return;

    let videoId = null;
    let title = raw;
    let artist = 'Custom Jar Pick';

    // Parse YouTube URL if provided
    const ytMatch = raw.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch && ytMatch[1]) {
      videoId = ytMatch[1];
      title = `YouTube Track (${videoId.slice(0, 6)})`;
    } else {
      if (raw.includes(' - ')) {
        const parts = raw.split(' - ');
        artist = parts[0].trim();
        title = parts[1].trim();
      } else if (raw.toLowerCase().includes(' by ')) {
        const parts = raw.split(/\s+by\s+/i);
        title = parts[0].trim();
        artist = parts[1].trim();
      }
      videoId = 'MVDJxMxzTL0'; // Standard audio stream container
    }

    const newSong = {
      id: videoId,
      title: title,
      artist: artist
    };

    const updated = [newSong, ...this.songJar];
    this.saveSongJar(updated);
    this.renderSongJarList();
    this.dom.jarSongInput.value = '';
    this.triggerHaptic(25);

    // If a YouTube video link was pasted, fetch real title and artist asynchronously
    if (videoId && videoId !== 'MVDJxMxzTL0') {
      fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
        .then(res => res.json())
        .then(data => {
          if (data && data.title) {
            const found = this.songJar.find(s => s.id === videoId);
            if (found) {
              found.title = data.title;
              if (data.author_name) found.artist = data.author_name;
              this.saveSongJar(this.songJar);
              this.renderSongJarList();
            }
          }
        })
        .catch(() => {});
    }
  }

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
