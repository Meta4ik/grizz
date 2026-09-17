/**
 * Wiley Grizzlies Walk-Up Music Soundboard App
 * Main Controller
 */

import { PLAYERS, HYPE_TRACKS } from './roster.js';
import { WalkUpAudioEngine } from './audio-player.js';

class GrizzliesApp {
  constructor() {
    this.audioEngine = new WalkUpAudioEngine();
    
    // Sort & lineup state
    this.sortMode = localStorage.getItem('grizzlies_sort_mode') || 'number'; // 'number' or 'lineup'
    this.lineupOrder = this.loadLineupOrder();
    this.activeTrack = null;
    this.lastBatterIndex = -1;
    this.onDeckPlayer = null;

    // DOM Elements
    this.dom = {
      hypeGrid: document.getElementById('hypeGrid'),
      playerGrid: document.getElementById('playerGrid'),
      rosterSearch: document.getElementById('rosterSearch'),
      clearSearchBtn: document.getElementById('clearSearchBtn'),
      rosterCountBadge: document.getElementById('rosterCountBadge'),
      
      // On-Deck Banner
      onDeckBanner: document.getElementById('onDeckBanner'),
      onDeckName: document.getElementById('onDeckName'),
      playOnDeckBtn: document.getElementById('playOnDeckBtn'),

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

      // Help Modal
      helpModal: document.getElementById('helpModal'),
      closeHelpModal: document.getElementById('closeHelpModal'),
      gotItBtn: document.getElementById('gotItBtn')
    };

    this.init();
  }

  init() {
    this.setupAudioCallbacks();
    this.renderHypeTracks();
    this.renderPlayers();
    this.setupSliders();
    this.setupEventListeners();
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
    this.audioEngine.play(track);
  }

  setupAudioCallbacks() {
    this.audioEngine.on('onPlay', (track) => {
      this.activeTrack = track;
      this.updateActiveCardVisuals(track.id);
      this.updateDockInfo(track, true);
      this.dom.fadeOutBtn.disabled = false;
      this.dom.stopCutBtn.disabled = false;
      this.dom.fadeOutBtn.classList.remove('is-fading');
      this.updateOnDeckAfterPlay(track);
    });

    this.audioEngine.on('onPause', (track) => {
      this.updateDockInfo(track, false);
    });

    this.audioEngine.on('onStop', (track) => {
      this.clearActiveVisuals();
      this.dom.fadeOutBtn.disabled = true;
      this.dom.stopCutBtn.disabled = true;
      this.dom.fadeOutBtn.classList.remove('is-fading');
      this.dom.dockPlayerName.textContent = 'READY TO HIT';
      this.dom.dockSongTitle.textContent = 'Tap any player to drop their walk-up track';
      this.dom.dockTimer.textContent = '0:00';
      this.dom.trackProgressFill.style.width = '0%';
      this.dom.liveEqBadge.classList.remove('active');
    });

    this.audioEngine.on('onTimeUpdate', ({ currentTime, duration, progress, track }) => {
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
      this.dom.fadeBtnSubtitle.textContent = `Fading (${remainingTime}s)`;
    });

    this.audioEngine.on('onFadeComplete', () => {
      this.dom.fadeBtnSubtitle.textContent = `Over ${this.audioEngine.fadeDuration.toFixed(1)}s`;
      this.dom.fadeOutBtn.classList.remove('is-fading');
    });

    this.audioEngine.on('onError', (err, track) => {
      console.error('Audio engine playback error:', err);
      alert(`Could not play audio for ${track?.name || 'track'}. Please check file path.`);
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
  // Event Listeners
  // =========================================================================
  setupEventListeners() {
    // Fade Out button
    this.dom.fadeOutBtn.addEventListener('click', () => {
      this.audioEngine.fadeOut();
    });

    // Instant Cut / Stop button
    this.dom.stopCutBtn.addEventListener('click', () => {
      this.triggerHaptic(30);
      this.audioEngine.stop();
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
      } else if (e.key.toLowerCase() === 'f') {
        this.audioEngine.fadeOut();
      }
    });
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
