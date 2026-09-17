# Implementation Plan: Between-Innings Music Page with Swipe Navigation & YouTube Integration

Add a dedicated **"Between Innings"** page to the Wylie Grizzlies baseball dugout app. Coaches can seamlessly switch between the **Walk-Up Batters** board and the **Between Innings** music suite either by **swiping left/right** or **tapping the top navigation tabs**. The new page integrates the YouTube playlist/video provided by the user (`https://youtu.be/kOV2iTeGQik` - Pantera "Walk"), provides an Inning Warm-Up countdown timer, and synchronizes with the master dock's **Fade Out** and **Stop / Cut** buttons.

---

## User Review Required

- **Mutual Audio Exclusivity**: Playing a walk-up batter will immediately pause/stop any between-innings YouTube music, and playing YouTube music will immediately stop any walk-up track to avoid double-audio in the dugout.
- **Master Dock Fade Out & Stop**: The bottom dock's **FADE OUT** and **CUT / STOP** buttons will work for YouTube as well, smoothly ramping down YouTube's volume over the selected fade duration (e.g., 2.0s) and stopping when the umpire signals play.
- **Custom Playlists & Songs**: Coaches will be able to paste any YouTube URL or playlist link to add to their between-innings library, stored locally in `localStorage`.

---

## Proposed Changes

### Navigation & Page Layout

#### [MODIFY] [index.html](file:///Users/mw/Sites/grizzlies%20baseball%20app/index.html)
- Add a top Dugout Navigation Pill bar below the header:
  - `[ ⚾ WALK-UP BATTERS ]` and `[ ⚡ BETWEEN INNINGS ]`
- Wrap the main arena into a horizontal slide container (`.pages-track-wrapper` and `.pages-track`):
  - **Slide 1 (`#pageWalkUp`)**: Contains the existing Stadium Hype Horns + Batter Walk-Up Cards + Search + On-Deck banner.
  - **Slide 2 (`#pageInnings`)**: The new Between-Innings experience containing:
    1. **YouTube Player Screen**: Sleek embedded player with dugout Crimson Red styling, live track title, and channel info.
    2. **Inning Warm-Up Timer**: 2:00 / 1:30 countdown timer widget for timing the 8 warm-up pitches between innings.
    3. **Quick Add YouTube Track / Playlist**: Input field to paste any YouTube song or playlist URL.
    4. **Inning Hype Playlist Grid**: Default tracklist featuring Pantera - "Walk" (`kOV2iTeGQik`) as #1, along with classic stadium rally anthems, with one-tap play buttons and delete capability for custom songs.

---

### Logic & YouTube Engine

#### [NEW] [js/youtube-manager.js](file:///Users/mw/Sites/grizzlies%20baseball%20app/js/youtube-manager.js)
- Loads and interfaces with the official YouTube IFrame Player API (`https://www.youtube.com/iframe_api`).
- Manages playlist state (defaults with Pantera - "Walk" + saved items from `localStorage`).
- Implements:
  - `playTrack(videoId, title, artist)`
  - `pause()`, `stop()`
  - `fadeOut(durationSeconds)`: Uses `setInterval` to step down `player.setVolume(vol)` smoothly to zero, then pauses.
  - `setVolume(volumePercent)`: Respects the master volume slider.
  - URL parser supporting standard formats (`youtu.be/...`, `youtube.com/watch?v=...`, `youtube.com/playlist?list=...`).

#### [MODIFY] [js/app.js](file:///Users/mw/Sites/grizzlies%20baseball%20app/js/app.js)
- Wire up tab switching (`walkup` vs `innings`) with active pill indicators.
- Implement touch gesture swipe detection (`touchstart`, `touchmove`, `touchend`) with horizontal thresholding (>40px deltaX with horizontal priority) so vertical scrolling remains silky-smooth.
- Synchronize audio playback:
  - When walk-up audio starts, pause YouTube player.
  - When YouTube player starts, stop walk-up audio and update dock track text and EQ badge.
- Wire master dock **FADE OUT** and **CUT / STOP** buttons to control whichever player is active.
- Implement the Inning Warm-Up Countdown Timer (Play/Pause, Reset, +30s).

---

### Styling & Responsive Motion

#### [MODIFY] [css/style.css](file:///Users/mw/Sites/grizzlies%20baseball%20app/css/style.css)
- Add styles for Dugout Tab Pills (`.dugout-tabs-nav`, `.dugout-tab`, `.dugout-tab.active`).
- Add styles for 2-page horizontal slide track (`.pages-track-wrapper`, `.pages-track`, `.page-view`).
- Add styles for YouTube player container, video wrapper, and status indicators.
- Add styles for Inning Warm-Up Timer (digital athletic font, glowing countdown ring/bar).
- Add styles for Inning Playlist items (cover thumbnail, title, artist, play/remove controls).

---

## Verification Plan

### Automated / Browser Verification
1. Run local HTTP server (`python3 -m http.server 8844`).
2. Test:
   - Click navigation between "Walk-Up Batters" and "Between Innings" tabs.
   - Touch/drag swipe simulation between the two pages.
   - YouTube player embed loads and plays Pantera - "Walk".
   - Clicking a walk-up batter pauses YouTube and starts walk-up track.
   - Clicking Between-Innings track stops walk-up track and plays YouTube.
   - Master dock **FADE OUT** button smoothly fades down YouTube volume.
   - Master dock **CUT / STOP** instantly kills YouTube playback.
   - Warm-up timer countdown counts down and resets cleanly.
3. Test on simulated iPhone 16 Pro Max viewport (440x956 px).

### Git & Deployment
1. Commit all changes cleanly.
2. Push to GitHub repo `https://github.com/Meta4ik/grizz` on branch `main` to trigger Vercel deployment.
