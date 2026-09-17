/**
 * Wiley Grizzlies Walk-Up Audio Player Engine
 * Handles smooth audio playback, exponential volume fade-outs, and mobile audio unlock.
 */

export class WalkUpAudioEngine {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = "auto";
    
    this.currentTrack = null;
    this.isPlaying = false;
    this.isFading = false;
    
    // Master volume (0.0 to 1.0)
    this.masterVolume = 1.0;
    
    // Fade duration in seconds (customizable via slider)
    this.fadeDuration = 2.0;
    
    // Auto-fade limit in seconds (0 = disabled)
    this.autoFadeLimit = 0;
    this.autoFadeTimer = null;
    
    this.fadeAnimationId = null;
    this.timeUpdateTimer = null;

    // Event listeners
    this.callbacks = {
      onPlay: () => {},
      onPause: () => {},
      onStop: () => {},
      onTimeUpdate: () => {},
      onFadeStart: () => {},
      onFadeProgress: () => {},
      onFadeComplete: () => {},
      onError: () => {}
    };

    this._setupNativeListeners();
    this._setupAudioUnlock();
  }

  on(event, fn) {
    if (this.callbacks[event] !== undefined) {
      this.callbacks[event] = fn;
    }
  }

  _setupNativeListeners() {
    this.audio.addEventListener("play", () => {
      this.isPlaying = true;
      this.callbacks.onPlay(this.currentTrack);
      this._startTimeTracking();
    });

    this.audio.addEventListener("pause", () => {
      if (!this.isFading) {
        this.isPlaying = false;
        this.callbacks.onPause(this.currentTrack);
        this._stopTimeTracking();
      }
    });

    this.audio.addEventListener("ended", () => {
      this.isPlaying = false;
      this.isFading = false;
      this.callbacks.onStop(this.currentTrack);
      this._stopTimeTracking();
    });

    this.audio.addEventListener("error", (e) => {
      console.error("Audio playback error:", e);
      this.isPlaying = false;
      this.isFading = false;
      this.callbacks.onError(e, this.currentTrack);
      this._stopTimeTracking();
    });
  }

  _setupAudioUnlock() {
    // Mobile Safari requires user interaction before audio can play unrestricted
    const unlock = () => {
      this.audio.play().then(() => {
        this.audio.pause();
        this.audio.currentTime = 0;
      }).catch(() => {
        // Silent catch for initial unlock attempt
      });
      window.removeEventListener("touchend", unlock, true);
      window.removeEventListener("click", unlock, true);
    };

    window.addEventListener("touchend", unlock, true);
    window.addEventListener("click", unlock, true);
  }

  _startTimeTracking() {
    this._stopTimeTracking();
    this.timeUpdateTimer = setInterval(() => {
      if (this.isPlaying && this.audio) {
        const currentTime = this.audio.currentTime || 0;
        const duration = this.audio.duration || 0;
        const progress = duration > 0 ? (currentTime / duration) : 0;
        this.callbacks.onTimeUpdate({
          currentTime,
          duration,
          progress,
          track: this.currentTrack
        });

        // Auto fade check if enabled
        if (this.autoFadeLimit > 0 && currentTime >= this.autoFadeLimit && !this.isFading) {
          this.fadeOut();
        }
      }
    }, 100);
  }

  _stopTimeTracking() {
    if (this.timeUpdateTimer) {
      clearInterval(this.timeUpdateTimer);
      this.timeUpdateTimer = null;
    }
  }

  /**
   * Set fade out duration (seconds)
   */
  setFadeDuration(seconds) {
    this.fadeDuration = Math.max(0.5, Math.min(10.0, parseFloat(seconds) || 2.0));
  }

  /**
   * Set master volume (0.0 to 1.0)
   */
  setMasterVolume(val) {
    this.masterVolume = Math.max(0.0, Math.min(1.0, parseFloat(val) || 1.0));
    if (!this.isFading && this.audio) {
      this.audio.volume = this.masterVolume;
    }
  }

  /**
   * Set auto-fade cutoff limit in seconds (0 to disable)
   */
  setAutoFadeLimit(seconds) {
    this.autoFadeLimit = Math.max(0, parseInt(seconds, 10) || 0);
  }

  /**
   * Play a track
   */
  async play(track) {
    // If fading currently, stop animation
    if (this.isFading) {
      cancelAnimationFrame(this.fadeAnimationId);
      this.isFading = false;
    }

    // If same track is playing, toggle pause/play
    if (this.currentTrack && this.currentTrack.id === track.id) {
      if (this.isPlaying) {
        this.audio.pause();
        this.isPlaying = false;
        this.callbacks.onPause(this.currentTrack);
        return;
      } else {
        this.audio.volume = this.masterVolume;
        try {
          await this.audio.play();
          this.isPlaying = true;
          return;
        } catch (err) {
          console.error("Error resuming audio:", err);
        }
      }
    }

    // Switch to new track
    this.currentTrack = track;
    this.audio.pause();
    this.audio.src = encodeURI(track.file);
    this.audio.currentTime = 0;
    this.audio.volume = this.masterVolume;

    try {
      await this.audio.play();
      this.isPlaying = true;
    } catch (err) {
      console.warn("Autoplay interaction notice:", err);
      this.callbacks.onError(err, track);
    }
  }

  /**
   * Restart current track from beginning
   */
  restart() {
    if (this.currentTrack) {
      if (this.isFading) {
        cancelAnimationFrame(this.fadeAnimationId);
        this.isFading = false;
      }
      this.audio.currentTime = 0;
      this.audio.volume = this.masterVolume;
      this.audio.play();
      this.isPlaying = true;
    }
  }

  /**
   * Instant CUT / STOP with no fade
   */
  stop() {
    if (this.isFading) {
      cancelAnimationFrame(this.fadeAnimationId);
      this.isFading = false;
    }
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.volume = this.masterVolume;
    }
    this.isPlaying = false;
    const stoppedTrack = this.currentTrack;
    this.callbacks.onStop(stoppedTrack);
    this._stopTimeTracking();
  }

  /**
   * Smooth exponential fade out over `this.fadeDuration` seconds
   */
  fadeOut(customDuration = null) {
    if (!this.isPlaying || this.isFading) {
      return;
    }

    const duration = (customDuration !== null ? customDuration : this.fadeDuration) * 1000;
    const startVolume = this.audio.volume;
    const startTime = performance.now();

    this.isFading = true;
    this.callbacks.onFadeStart({
      track: this.currentTrack,
      duration: duration / 1000
    });

    const stepFade = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1.0, elapsed / duration);

      // Smooth cosine ease-out curve for natural, pleasant studio fade out
      // Cosine curve: 1 at 0, 0 at 1
      const easedFactor = 0.5 * (1 + Math.cos(progress * Math.PI));
      const currentVol = Math.max(0.0, startVolume * easedFactor);

      if (this.audio) {
        this.audio.volume = currentVol;
      }

      this.callbacks.onFadeProgress({
        progress,
        currentVolume: currentVol,
        remainingTime: Math.max(0, ((duration - elapsed) / 1000).toFixed(1))
      });

      if (progress < 1.0 && this.isFading && this.isPlaying) {
        this.fadeAnimationId = requestAnimationFrame(stepFade);
      } else {
        // Fade completed
        this.isFading = false;
        if (this.audio) {
          this.audio.pause();
          this.audio.currentTime = 0;
          this.audio.volume = this.masterVolume; // Reset volume for next song
        }
        this.isPlaying = false;
        this.callbacks.onFadeComplete(this.currentTrack);
        this.callbacks.onStop(this.currentTrack);
        this._stopTimeTracking();
      }
    };

    this.fadeAnimationId = requestAnimationFrame(stepFade);
  }
}
