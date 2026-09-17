# Walkthrough: Between-Innings Music Page, YouTube Player & Swipe Navigation

We have added a dedicated **Between-Innings Music Suite** to the Wylie Grizzlies baseball dugout app, allowing coaches to seamlessly transition between individual batter walk-up tracks and stadium-pumping warm-up music between half-innings.

---

## What Was Added & Changed

### 1. Dugout Tab Switcher & Touch Swipe Navigation
- **Pill Navigation Bar**: Added `[ ⚾ WALK-UP BATTERS ]` and `[ ⚡ BETWEEN INNINGS ]` tabs right below the header.
- **Swipe-to-Switch Gesture**: Implemented hardware-accelerated horizontal slide container (`.pages-track-wrapper` and `.pages-track`). Coaches can **swipe left or right** on the screen or **tap the tabs** to instantly glide between pages.
- **Vertical Scroll Protection**: The swipe gesture specifically prioritizes horizontal movements so vertical scrolling through the 12 batters or inning playlist remains fluid and natural.

### 2. Embedded YouTube Dugout Stage
- **Embedded Player**: Integrated the YouTube IFrame Player API within a 16:9 responsive frame with Wylie Crimson Red styling and live equalizer indicators.
- **Flagship Track**: Pre-loaded with **Pantera - "Walk"** (`kOV2iTeGQik`) as requested.
- **Quick Controls**: Integrated Stage Play / Pause, Previous, and Next track buttons.

### 3. Curated Inning Playlist & Custom Link Adder
- **Default Anthems**:
  1. **Pantera** - "Walk" *(Coach Pick)*
  2. **AC/DC** - "Thunderstruck" *(Stadium Hype)*
  3. **Queen** - "We Will Rock You" *(Dugout Stomp)*
  4. **Zombie Nation** - "Kernkraft 400" *(Rally Hymn)*
  5. **Ozzy Osbourne** - "Crazy Train" *(All Aboard)*
  6. **Foghat** - "Slow Ride" *(Classic Groove)*
- **Add Any Song / Playlist**: Coaches can paste any YouTube URL (e.g., `https://youtu.be/...`, `https://www.youtube.com/watch?v=...`, `https://www.youtube.com/playlist?list=...`) to add custom tracks into `localStorage`.

### 4. Inning Warm-Up Countdown Timer (Little League Clock)
- **Digital Clock**: Teko athletic font display (`02:00`, `01:30`, `01:00` quick chips).
- **Controls**: `▶ START`, `⏸ PAUSE`, `↺ RESET`, and `+30s` quick buttons.
- **Visual Alert**: Progress bar drains as time runs out, with glowing crimson text and pulsing warning when under 10 seconds remain.

### 5. Master Dock Synchronization & Fade Controls
- **Mutual Audio Exclusion**:
  - Tapping any walk-up batter immediately pauses YouTube playback.
  - Playing any between-innings track immediately stops the walk-up audio engine.
- **Master Dock Fade Out**: Clicking the big **FADE OUT** button smoothly attenuates volume down to zero (over the chosen fade duration slider: 1.0s, 2.0s, 3.0s, etc.) whether listening to walk-up music or YouTube!
- **Master Dock CUT / STOP**: Clicking **CUT / STOP** instantly silences whatever audio is playing.
- **Volume Slider**: Controls both Web Audio and YouTube player volume simultaneously.

### 6. Small Beta Version Badge
- **Discreet Placement**: Added a small, unobtrusive `v1.2-beta` version indicator in the lower right corner of the master bottom dock.
- **Styling**: Rendered in clean typography with subtle opacity (`rgba(255, 255, 255, 0.35)`) and `pointer-events: none` so it never interferes with touch gestures or audio sliders.

---

## Verification & Deployment
1. Tested locally via `python3 -m http.server 8844` on iPhone 16 Pro Max viewport bounds.
2. Verified swipe navigation, full-width screen bounds, YouTube playlist player, and dock integration.
3. Pushed directly to GitHub `main` for automated Vercel deployment.
