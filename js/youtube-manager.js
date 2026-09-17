/**
 * Wylie Grizzlies Dugout App - YouTube Inning Playlist Engine
 * Manages between-innings YouTube playlists, full song browsing, and master dock integration.
 * Supports smooth volume fading and instant cuts on mobile.
 */

export const DEFAULT_PLAYLIST = {
  id: 'RDkOV2iTeGQik',
  title: 'Pantera Walk Mix (50+ Songs)',
  artist: 'Between-Innings Warm-Up Queue'
};

export class YouTubeInningsEngine {
  constructor() {
    this.player = null;
    this.isApiReady = false;
    this.isPlayerReady = false;
    this.isPlaying = false;
    this.isFading = false;
    this.masterVolume = 100;
    this.fadeIntervalId = null;

    this.currentPlaylist = this.loadSavedPlaylist();

    this.callbacks = {
      onPlay: () => {},
      onPause: () => {},
      onStop: () => {},
      onTrackChange: () => {},
      onFadeStart: () => {},
      onFadeProgress: () => {},
      onFadeComplete: () => {},
      onStateChange: () => {}
    };

    this._loadIframeApi();
  }

  on(event, fn) {
    if (this.callbacks[event] !== undefined) {
      this.callbacks[event] = fn;
    }
  }

  loadSavedPlaylist() {
    try {
      const saved = localStorage.getItem('grizzlies_active_playlist');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading saved playlist:', e);
    }
    return { ...DEFAULT_PLAYLIST };
  }

  savePlaylist(playlist) {
    this.currentPlaylist = playlist;
    localStorage.setItem('grizzlies_active_playlist', JSON.stringify(playlist));
  }

  _loadIframeApi() {
    if (window.YT && window.YT.Player) {
      this.isApiReady = true;
      this._initPlayer();
      return;
    }

    const prevOnReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevOnReady === 'function') prevOnReady();
      this.isApiReady = true;
      this._initPlayer();
    };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(tag, firstScript);
    }
  }

  _initPlayer() {
    const iframe = document.getElementById('ytPlayerFrame');
    if (!iframe) {
      setTimeout(() => this._initPlayer(), 300);
      return;
    }

    try {
      this.player = new window.YT.Player('ytPlayerFrame', {
        events: {
          onReady: (event) => {
            this.isPlayerReady = true;
            if (this.player && typeof this.player.setVolume === 'function') {
              this.player.setVolume(this.masterVolume);
            }
            this.callbacks.onTrackChange(this.currentPlaylist);
          },
          onStateChange: (event) => {
            this._handleStateChange(event.data);
          }
        }
      });
    } catch (err) {
      console.warn('YouTube player attachment notice:', err);
    }
  }

  _handleStateChange(state) {
    if (!window.YT) return;

    // PLAYING === 1
    if (state === window.YT.PlayerState.PLAYING) {
      this.isPlaying = true;
      this.callbacks.onPlay(this.currentPlaylist);
    }
    // PAUSED === 2
    else if (state === window.YT.PlayerState.PAUSED) {
      this.isPlaying = false;
      this.callbacks.onPause(this.currentPlaylist);
    }
    // ENDED === 0
    else if (state === window.YT.PlayerState.ENDED) {
      this.isPlaying = false;
      this.callbacks.onStop(this.currentPlaylist);
    }
    this.callbacks.onStateChange(state);
  }

  loadPlaylist(playlistId, title = 'Dugout Inning Playlist') {
    this._cancelFade();
    const playlist = {
      id: playlistId,
      title: title,
      artist: 'Between-Innings Queue'
    };
    this.savePlaylist(playlist);

    const iframe = document.getElementById('ytPlayerFrame');
    if (iframe) {
      iframe.src = `https://www.youtube.com/embed/videoseries?list=${playlistId}&enablejsapi=1&playsinline=1`;
    }

    if (this.player && typeof this.player.loadPlaylist === 'function') {
      try {
        this.player.loadPlaylist({
          list: playlistId,
          listType: 'playlist'
        });
      } catch (e) {
        // Fallback handled by iframe src
      }
    }

    this.callbacks.onTrackChange(playlist);
  }

  play() {
    this._cancelFade();
    if (this.player && typeof this.player.playVideo === 'function') {
      this.player.setVolume(this.masterVolume);
      this.player.playVideo();
      this.isPlaying = true;
    }
  }

  pause() {
    this._cancelFade();
    if (this.player && typeof this.player.pauseVideo === 'function') {
      this.player.pauseVideo();
      this.isPlaying = false;
    }
  }

  stop() {
    this._cancelFade();
    if (this.player && typeof this.player.stopVideo === 'function') {
      this.player.stopVideo();
      this.isPlaying = false;
      this.callbacks.onStop(this.currentPlaylist);
    }
  }

  nextTrack() {
    if (this.player && typeof this.player.nextVideo === 'function') {
      this.player.nextVideo();
    }
  }

  prevTrack() {
    if (this.player && typeof this.player.previousVideo === 'function') {
      this.player.previousVideo();
    }
  }

  setVolume(pct) {
    this.masterVolume = Math.max(0, Math.min(100, pct));
    if (!this.isFading && this.player && typeof this.player.setVolume === 'function') {
      this.player.setVolume(this.masterVolume);
    }
  }

  fadeOut(durationSeconds = 2.0) {
    if (!this.isPlaying || !this.player) return;

    this._cancelFade();
    this.isFading = true;

    const startVol = typeof this.player.getVolume === 'function' ? this.player.getVolume() : this.masterVolume;
    const startTime = Date.now();
    const durationMs = durationSeconds * 1000;

    this.callbacks.onFadeStart({ track: this.currentPlaylist, duration: durationSeconds });

    this.fadeIntervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1.0, elapsed / durationMs);
      const remainingSecs = Math.max(0, ((durationMs - elapsed) / 1000)).toFixed(1);

      const targetVol = Math.round(startVol * (1.0 - progress));
      if (typeof this.player.setVolume === 'function') {
        this.player.setVolume(targetVol);
      }

      this.callbacks.onFadeProgress({ remainingTime: remainingSecs });

      if (progress >= 1.0) {
        this._cancelFade();
        if (typeof this.player.pauseVideo === 'function') {
          this.player.pauseVideo();
        }
        if (typeof this.player.setVolume === 'function') {
          this.player.setVolume(this.masterVolume);
        }
        this.isPlaying = false;
        this.callbacks.onFadeComplete();
        this.callbacks.onStop(this.currentPlaylist);
      }
    }, 50);
  }

  _cancelFade() {
    if (this.fadeIntervalId) {
      clearInterval(this.fadeIntervalId);
      this.fadeIntervalId = null;
    }
    this.isFading = false;
  }

  /**
   * Helper to parse playlist ID or video ID to mix playlist
   */
  static parseYouTubePlaylistInput(input) {
    if (!input) return null;
    const str = input.trim();

    // 1. Direct Playlist ID parameter in URL e.g. list=PL... or list=RD...
    const listMatch = str.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    if (listMatch) {
      return { playlistId: listMatch[1], isMix: listMatch[1].startsWith('RD') };
    }

    // 2. Direct 34-char playlist ID string
    if (/^(PL|RD|FL|UU|LL)[a-zA-Z0-9_-]{10,}$/.test(str)) {
      return { playlistId: str, isMix: str.startsWith('RD') };
    }

    // 3. Single video link -> generate YouTube mix playlist for that track!
    let videoId = null;
    const shortMatch = str.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) videoId = shortMatch[1];

    const watchMatch = str.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch) videoId = watchMatch[1];

    const embedMatch = str.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) videoId = embedMatch[1];

    if (/^[a-zA-Z0-9_-]{11}$/.test(str)) videoId = str;

    if (videoId) {
      // YouTube Mix playlist for this video
      return { playlistId: `RD${videoId}`, videoId: videoId, isMix: true };
    }

    return null;
  }
}
