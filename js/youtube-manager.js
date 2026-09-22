/**
 * Wylie Grizzlies Dugout App - YouTube Inning Playlist Engine
 * Manages between-innings YouTube playlists, full song browsing, and master dock integration.
 * Supports smooth volume fading and instant cuts on mobile.
 */

export const DEFAULT_PLAYLIST = {
  id: 'EK-XfDRL2wA',
  title: 'Baseball',
  artist: 'Jaz Von ft. NBA YoungBoy • Getting Older (Clean)'
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
    this._setupPostMessageListener();
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
        const parsed = JSON.parse(saved);
        // Automatically migrate to new Coach's baseball track if old placeholder was saved
        if (parsed && parsed.id === 'PLfIVhrWS4Y_M') {
          return { ...DEFAULT_PLAYLIST };
        }
        if (parsed && parsed.id) return parsed;
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

    // PLAYING === 1, BUFFERING === 3, CUED === 5
    if (state === window.YT.PlayerState.PLAYING || state === window.YT.PlayerState.BUFFERING) {
      if (state === window.YT.PlayerState.PLAYING) {
        this.isPlaying = true;
      }
      let currentTrackInfo = this.currentPlaylist;
      if (!currentTrackInfo || !currentTrackInfo.title) {
        if (this.player && typeof this.player.getVideoData === 'function') {
          try {
            const videoData = this.player.getVideoData();
            if (videoData && videoData.title) {
              currentTrackInfo = {
                id: videoData.video_id || (this.currentPlaylist ? this.currentPlaylist.id : ''),
                title: videoData.title,
                artist: videoData.author || 'Dugout Inning Track'
              };
              this.currentPlaylist = currentTrackInfo;
            }
          } catch (e) {}
        }
      }
      if (state === window.YT.PlayerState.PLAYING) {
        this.callbacks.onPlay(currentTrackInfo || this.currentPlaylist);
      }
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

  _setupPostMessageListener() {
    window.addEventListener('message', (event) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (!data) return;

        if (data.info && data.info.videoData && data.info.videoData.title) {
          const vData = data.info.videoData;
          const trackInfo = {
            id: vData.video_id || this.currentPlaylist.id,
            title: vData.title,
            artist: vData.author || this.currentPlaylist.artist || this.currentPlaylist.title
          };
          this.currentPlaylist = trackInfo;
          this.callbacks.onTrackChange(trackInfo);
          if (this.isPlaying) {
            this.callbacks.onPlay(trackInfo);
          }
        }

        let playerState = null;
        if (data.event === 'onStateChange') {
          playerState = data.info;
        } else if (data.event === 'infoDelivery' && data.info && data.info.playerState !== undefined) {
          playerState = data.info.playerState;
        }

        if (playerState !== null) {
          this._handleStateChange(playerState);
        }
      } catch (e) {}
    });
  }

  _sendCommand(func, args = '') {
    const iframe = document.getElementById('ytPlayerFrame');
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: func,
          args: args
        }), '*');
      } catch (e) {
        console.warn('postMessage command error:', e);
      }
    }
  }

  loadPlaylist(playlistId, title = 'Baseball', autoPlay = false) {
    this._cancelFade();
    const playlist = {
      id: playlistId,
      title: title,
      artist: 'Between-Innings Queue'
    };
    this.savePlaylist(playlist);

    const isPlaylist = playlistId.startsWith('PL') || playlistId.startsWith('RD');
    let loadedViaApi = false;

    if (this.player) {
      try {
        if (isPlaylist) {
          if (autoPlay && typeof this.player.loadPlaylist === 'function') {
            this.player.loadPlaylist({
              list: playlistId,
              listType: 'playlist'
            });
            loadedViaApi = true;
          } else if (!autoPlay && typeof this.player.cuePlaylist === 'function') {
            this.player.cuePlaylist({
              list: playlistId,
              listType: 'playlist'
            });
            loadedViaApi = true;
          }
        } else {
          // Single video track
          if (autoPlay && typeof this.player.loadVideoById === 'function') {
            this.player.loadVideoById(playlistId);
            loadedViaApi = true;
          } else if (!autoPlay && typeof this.player.cueVideoById === 'function') {
            this.player.cueVideoById(playlistId);
            loadedViaApi = true;
          }
        }
      } catch (e) {}
    }

    if (isPlaylist) {
      if (autoPlay) {
        this._sendCommand('loadPlaylist', { list: playlistId, listType: 'playlist' });
      } else {
        this._sendCommand('cuePlaylist', { list: playlistId, listType: 'playlist' });
      }
    } else {
      if (autoPlay) {
        this._sendCommand('loadVideoById', [playlistId]);
      } else {
        this._sendCommand('cueVideoById', [playlistId]);
      }
    }

    if (!loadedViaApi) {
      const iframe = document.getElementById('ytPlayerFrame');
      if (iframe) {
        const originParam = window.location.origin ? `&origin=${encodeURIComponent(window.location.origin)}` : '';
        const autoplayVal = autoPlay ? 1 : 0;
        if (isPlaylist) {
          iframe.src = `https://www.youtube.com/embed/videoseries?list=${playlistId}&enablejsapi=1&playsinline=1&autoplay=${autoplayVal}${originParam}`;
        } else {
          iframe.src = `https://www.youtube.com/embed/${playlistId}?enablejsapi=1&playsinline=1&autoplay=${autoplayVal}${originParam}`;
        }
        setTimeout(() => this._initPlayer(), 1200);
      }
    }

    this.isPlaying = autoPlay;
    this.callbacks.onTrackChange(playlist);
    if (autoPlay) {
      this.callbacks.onPlay(playlist);
    } else {
      this.callbacks.onPause(playlist);
    }
  }

  playVideoAtIndex(index) {
    this._cancelFade();
    this.isPlaying = true;
    if (this.player && typeof this.player.playVideoAt === 'function') {
      try {
        this.player.setVolume(this.masterVolume);
        this.player.playVideoAt(index);
        this.callbacks.onPlay(this.currentPlaylist);
        return;
      } catch (e) {}
    }
    this._sendCommand('setVolume', [this.masterVolume]);
    this._sendCommand('playVideoAt', [index]);
    this.callbacks.onPlay(this.currentPlaylist);
  }

  getPlaylistVideos() {
    if (this.player && typeof this.player.getPlaylist === 'function') {
      try {
        const list = this.player.getPlaylist();
        if (Array.isArray(list) && list.length > 0) {
          return list;
        }
      } catch (e) {}
    }
    return [];
  }

  play() {
    this._cancelFade();
    this.isPlaying = true;
    if (this.player && typeof this.player.playVideo === 'function') {
      try {
        this.player.setVolume(this.masterVolume);
        this.player.playVideo();
      } catch (e) {}
    }
    this._sendCommand('setVolume', [this.masterVolume]);
    this._sendCommand('playVideo');
    this.callbacks.onPlay(this.currentPlaylist);
  }

  pause() {
    this._cancelFade();
    this.isPlaying = false;
    if (this.player && typeof this.player.pauseVideo === 'function') {
      try { this.player.pauseVideo(); } catch (e) {}
    }
    this._sendCommand('pauseVideo');
    this.callbacks.onPause(this.currentPlaylist);
  }

  stop() {
    this._cancelFade();
    this.isPlaying = false;
    if (this.player && typeof this.player.stopVideo === 'function') {
      try { this.player.stopVideo(); } catch (e) {}
    }
    if (this.player && typeof this.player.pauseVideo === 'function') {
      try { this.player.pauseVideo(); } catch (e) {}
    }
    this._sendCommand('stopVideo');
    this._sendCommand('pauseVideo');
    this.callbacks.onStop(this.currentPlaylist);
  }

  nextTrack() {
    this._cancelFade();
    this.isPlaying = true;
    if (this.player && typeof this.player.nextVideo === 'function') {
      try { this.player.nextVideo(); } catch (e) {}
    }
    this._sendCommand('nextVideo');
  }

  prevTrack() {
    this._cancelFade();
    this.isPlaying = true;
    if (this.player && typeof this.player.previousVideo === 'function') {
      try { this.player.previousVideo(); } catch (e) {}
    }
    this._sendCommand('previousVideo');
  }

  playVideo(videoId, title = 'Dugout Track', artist = 'Song Jar Selection') {
    this._cancelFade();
    this.isPlaying = true;
    const track = {
      id: videoId,
      title: title,
      artist: artist
    };
    this.currentPlaylist = track;
    this.savePlaylist(track);

    let loadedViaApi = false;
    if (this.player && typeof this.player.loadVideoById === 'function') {
      try {
        this.player.setVolume(this.masterVolume);
        this.player.loadVideoById({
          videoId: videoId,
          startSeconds: 0
        });
        loadedViaApi = true;
      } catch (e) {}
    }

    this._sendCommand('loadVideoById', { videoId: videoId, startSeconds: 0 });
    this._sendCommand('setVolume', [this.masterVolume]);
    this._sendCommand('playVideo');

    if (!loadedViaApi) {
      const iframe = document.getElementById('ytPlayerFrame');
      if (iframe) {
        const originParam = window.location.origin ? `&origin=${encodeURIComponent(window.location.origin)}` : '';
        iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&playsinline=1&autoplay=1${originParam}`;
        setTimeout(() => this._initPlayer(), 1200);
      }
    }

    this.callbacks.onTrackChange(track);
    this.callbacks.onPlay(track);
  }

  playRandomTrack() {
    this._cancelFade();
    if (typeof this.player?.setVolume === 'function') {
      try { this.player.setVolume(this.masterVolume); } catch (e) {}
    }
    this._sendCommand('setVolume', [this.masterVolume]);

    // Try selecting a random index from the playlist array
    if (typeof this.player?.getPlaylist === 'function') {
      const list = this.player.getPlaylist();
      if (Array.isArray(list) && list.length > 0) {
        const currentIndex = typeof this.player.getPlaylistIndex === 'function' ? this.player.getPlaylistIndex() : -1;
        let targetIndex = Math.floor(Math.random() * list.length);
        if (targetIndex === currentIndex && list.length > 1) {
          targetIndex = (targetIndex + 1 + Math.floor(Math.random() * (list.length - 1))) % list.length;
        }
        if (typeof this.player.playVideoAt === 'function') {
          try {
            this.player.playVideoAt(targetIndex);
            this.isPlaying = true;
            return;
          } catch (e) {}
        }
      }
    }

    // Fallback: shuffle playlist order and play next
    if (typeof this.player?.setShuffle === 'function') {
      try { this.player.setShuffle(true); } catch (e) {}
    }
    this._sendCommand('setShuffle', true);

    if (typeof this.player?.nextVideo === 'function') {
      try { this.player.nextVideo(); } catch (e) {}
    }
    this._sendCommand('nextVideo');
    this.isPlaying = true;
  }

  setVolume(pct) {
    this.masterVolume = Math.max(0, Math.min(100, pct));
    if (!this.isFading && this.player && typeof this.player.setVolume === 'function') {
      try { this.player.setVolume(this.masterVolume); } catch (e) {}
    }
    if (!this.isFading) {
      this._sendCommand('setVolume', [this.masterVolume]);
    }
  }

  fadeOut(durationSeconds = 2.0) {
    this._cancelFade();
    this.isFading = true;

    const startVol = this.masterVolume;
    const startTime = Date.now();
    const durationMs = durationSeconds * 1000;

    this.callbacks.onFadeStart({ track: this.currentPlaylist, duration: durationSeconds });

    this.fadeIntervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1.0, elapsed / durationMs);
      const remainingSecs = Math.max(0, ((durationMs - elapsed) / 1000)).toFixed(1);

      const targetVol = Math.round(startVol * (1.0 - progress));
      if (this.player && typeof this.player.setVolume === 'function') {
        try { this.player.setVolume(targetVol); } catch (e) {}
      }
      this._sendCommand('setVolume', [targetVol]);

      this.callbacks.onFadeProgress({ remainingTime: remainingSecs, progress });

      if (progress >= 1.0) {
        this._cancelFade();
        this.stop();
        if (this.player && typeof this.player.setVolume === 'function') {
          try { this.player.setVolume(this.masterVolume); } catch (e) {}
        }
        this._sendCommand('setVolume', [this.masterVolume]);
        this.isPlaying = false;
        this.callbacks.onFadeComplete();
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
