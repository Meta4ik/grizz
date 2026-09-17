/**
 * Wylie Grizzlies Dugout App - YouTube Inning Music Engine
 * Controls between-innings YouTube music, custom playlists, and master dock integration.
 * Supports smooth volume fading and instant cuts on mobile.
 */

export const DEFAULT_INNING_TRACKS = [
  {
    id: 'kOV2iTeGQik',
    title: 'Walk',
    artist: 'Pantera',
    tag: 'COACH PICK',
    duration: '5:15',
    isDefault: true
  },
  {
    id: 'v2AC41dglnM',
    title: 'Thunderstruck',
    artist: 'AC/DC',
    tag: 'STADIUM HYPE',
    duration: '4:52',
    isDefault: true
  },
  {
    id: '-tJYN-eG1zk',
    title: 'We Will Rock You',
    artist: 'Queen',
    tag: 'DUGOUT STOMP',
    duration: '2:01',
    isDefault: true
  },
  {
    id: 'z5LW07FTJbI',
    title: 'Kernkraft 400 (Sport Chant)',
    artist: 'Zombie Nation',
    tag: 'RALLY HYMN',
    duration: '3:30',
    isDefault: true
  },
  {
    id: 'tMDFv5m18Pw',
    title: 'Crazy Train',
    artist: 'Ozzy Osbourne',
    tag: 'ALL ABOARD',
    duration: '4:56',
    isDefault: true
  },
  {
    id: 'GcCNcgoyG_0',
    title: 'Slow Ride',
    artist: 'Foghat',
    tag: 'CLASSIC GROOVE',
    duration: '3:58',
    isDefault: true
  }
];

export class YouTubeInningsEngine {
  constructor() {
    this.player = null;
    this.isApiReady = false;
    this.isPlayerReady = false;
    this.currentTrack = null;
    this.isPlaying = false;
    this.isFading = false;
    this.masterVolume = 100; // 0-100 for YouTube API
    this.fadeIntervalId = null;

    this.tracks = this.loadTracks();

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

  loadTracks() {
    try {
      const saved = localStorage.getItem('grizzlies_custom_inning_tracks');
      if (saved) {
        const custom = JSON.parse(saved);
        // Combine default with custom
        return [...DEFAULT_INNING_TRACKS, ...custom];
      }
    } catch (e) {
      console.warn('Error loading custom inning tracks:', e);
    }
    return [...DEFAULT_INNING_TRACKS];
  }

  saveCustomTrack(track) {
    this.tracks.push(track);
    const custom = this.tracks.filter(t => !t.isDefault);
    localStorage.setItem('grizzlies_custom_inning_tracks', JSON.stringify(custom));
  }

  removeTrack(id) {
    this.tracks = this.tracks.filter(t => t.id !== id);
    const custom = this.tracks.filter(t => !t.isDefault);
    localStorage.setItem('grizzlies_custom_inning_tracks', JSON.stringify(custom));
  }

  _loadIframeApi() {
    if (window.YT && window.YT.Player) {
      this.isApiReady = true;
      this._initPlayer();
      return;
    }

    // Set global callback
    const prevOnReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevOnReady === 'function') prevOnReady();
      this.isApiReady = true;
      this._initPlayer();
    };

    // Check if script tag is already in DOM
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(tag, firstScript);
    }
  }

  _initPlayer() {
    const container = document.getElementById('ytPlayerContainer');
    if (!container) {
      setTimeout(() => this._initPlayer(), 300);
      return;
    }

    const defaultTrack = this.tracks[0] || DEFAULT_INNING_TRACKS[0];
    this.currentTrack = defaultTrack;

    try {
      this.player = new window.YT.Player('ytPlayerFrame', {
        height: '100%',
        width: '100%',
        videoId: defaultTrack.id,
        playerVars: {
          autoplay: 0,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          controls: 1,
          fs: 0,
          iv_load_policy: 3
        },
        events: {
          onReady: (event) => {
            this.isPlayerReady = true;
            this.player.setVolume(this.masterVolume);
            this.callbacks.onTrackChange(this.currentTrack);
          },
          onStateChange: (event) => {
            this._handleStateChange(event.data);
          }
        }
      });
    } catch (err) {
      console.error('Failed to initialize YouTube player:', err);
    }
  }

  _handleStateChange(state) {
    if (!window.YT) return;
    
    // YT.PlayerState.PLAYING === 1
    if (state === window.YT.PlayerState.PLAYING) {
      this.isPlaying = true;
      this.callbacks.onPlay(this.currentTrack);
    } 
    // YT.PlayerState.PAUSED === 2
    else if (state === window.YT.PlayerState.PAUSED) {
      this.isPlaying = false;
      this.callbacks.onPause(this.currentTrack);
    } 
    // YT.PlayerState.ENDED === 0
    else if (state === window.YT.PlayerState.ENDED) {
      this.isPlaying = false;
      this.callbacks.onStop(this.currentTrack);
    }
    this.callbacks.onStateChange(state);
  }

  playTrack(track) {
    if (!this.player || !this.isPlayerReady) {
      console.warn('YouTube player not ready yet');
      return;
    }

    this._cancelFade();
    this.currentTrack = track;
    this.player.setVolume(this.masterVolume);

    if (this.player.getVideoData && this.player.getVideoData().video_id === track.id) {
      this.player.playVideo();
    } else {
      this.player.loadVideoById(track.id);
    }

    this.isPlaying = true;
    this.callbacks.onTrackChange(track);
  }

  pause() {
    this._cancelFade();
    if (this.player && this.isPlayerReady && typeof this.player.pauseVideo === 'function') {
      this.player.pauseVideo();
      this.isPlaying = false;
    }
  }

  stop() {
    this._cancelFade();
    if (this.player && this.isPlayerReady && typeof this.player.stopVideo === 'function') {
      this.player.stopVideo();
      this.isPlaying = false;
      this.callbacks.onStop(this.currentTrack);
    }
  }

  setVolume(pct) {
    // pct: 0 to 100
    this.masterVolume = Math.max(0, Math.min(100, pct));
    if (!this.isFading && this.player && this.isPlayerReady && typeof this.player.setVolume === 'function') {
      this.player.setVolume(this.masterVolume);
    }
  }

  fadeOut(durationSeconds = 2.0) {
    if (!this.isPlaying || !this.player || !this.isPlayerReady) return;

    this._cancelFade();
    this.isFading = true;

    const startVol = typeof this.player.getVolume === 'function' ? this.player.getVolume() : this.masterVolume;
    const startTime = Date.now();
    const durationMs = durationSeconds * 1000;

    this.callbacks.onFadeStart({ track: this.currentTrack, duration: durationSeconds });

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
        this.player.pauseVideo();
        // Restore volume for next play
        this.player.setVolume(this.masterVolume);
        this.isPlaying = false;
        this.callbacks.onFadeComplete();
        this.callbacks.onStop(this.currentTrack);
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
   * Helper to parse video ID from various YouTube URL formats
   */
  static parseYouTubeId(input) {
    if (!input) return null;
    const str = input.trim();

    // Direct 11 char video id
    if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
      return str;
    }

    // youtu.be/<id>
    const shortMatch = str.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) return shortMatch[1];

    // youtube.com/watch?v=<id>
    const watchMatch = str.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch) return watchMatch[1];

    // youtube.com/embed/<id>
    const embedMatch = str.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) return embedMatch[1];

    return null;
  }
}
