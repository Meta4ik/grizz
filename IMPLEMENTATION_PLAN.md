# Implementation Plan: Between-Innings Playlist Refinements, Sunlight Play Button, Sliding Dock Drawer & Inline Song Jar

Refine the between-innings music suite in the Wylie Grizzlies baseball dugout app to address buffering, eliminate unwanted auto-play, optimize outdoor visibility under bright sunlight, and replace the fixed bottom dock with a sleek sliding drawer so coaches can easily browse the playlist "Song Jar".

## Proposed Changes

### 1. Main Playlist: "Baseball" & Clean Dropdown Selector
- **Primary Playlist**: Set Coach's playlist (`PLfIVhrWS4Y_M`), titled **"Baseball"**, as the default and primary between-innings playlist. It contains:
  1. *Wild Ones* - Jessie Murph & Jelly Roll (`MVDJxMxzTL0`)
  2. *Fast Car* - Luke Combs (`aXmmyuIqZyo`)
  3. *Getting Older (Clean)* - Jaz Von ft. NBA YoungBoy (`EK-XfDRL2wA`)
  (plus any coach-added tracks).
- **Remove Chip Buttons**: Remove the row of button chips (`#playlistChipsWrap`) from the layout to reduce clutter and free up vertical space.
- **Quick Switch Dropdown**: Keep the clean `<select id="playlistSelect">` dropdown as the single quick switch selector for alternative playlists (Pantera Rock, Rap, 90s Hits, Country, 80s Hits).

---

### 2. Prevent Auto-Play & Fix Playlist Buffering
- In [youtube-manager.js](file:///Users/mw/Sites/grizzlies%20baseball%20app/js/youtube-manager.js):
  - When switching playlists via the dropdown, use `player.cuePlaylist(...)` instead of `player.loadPlaylist(...)`.
  - Send the `cuePlaylist` postMessage command instead of `loadPlaylist`.
  - For iframe fallbacks, ensure `autoplay=0` instead of `autoplay=1`.
  - Ensure the audio engine remains in `paused` / `ready` state on switch without firing audio streams until the user taps **PLAY**.
  - This stops surprise playback in the dugout and eliminates multi-stream buffering.

---

### 3. Large Sunlight-Ready Outdoor Play Button
- In [css/style.css](file:///Users/mw/Sites/grizzlies%20baseball%20app/css/style.css) & [index.html](file:///Users/mw/Sites/grizzlies%20baseball%20app/index.html):
  - Increase the Between-Innings Play/Pause button (`#ytPlayPauseBtn`) from 38px to **62px** in diameter.
  - Scale play/pause SVG icons to **28px** with bright high-contrast white fill.
  - Add a high-contrast glowing border and subtle ring shadow so it pops clearly against mobile screen glare in direct sunlight.
  - Enlarge transport buttons (`⏮`, `⏭`, `🎲`) to **44px** with comfortable touch targets.

---

### 4. Sliding Drawer for Master Bottom Dock (Fade Out, Cut/Stop, Sliders)
- In [index.html](file:///Users/mw/Sites/grizzlies%20baseball%20app/index.html), [css/style.css](file:///Users/mw/Sites/grizzlies%20baseball%20app/css/style.css), & [js/app.js](file:///Users/mw/Sites/grizzlies%20baseball%20app/js/app.js):
  - Convert `#masterDock` into a collapsible sliding drawer:
    - **Collapsed Mode**: Collapses down to a compact ~54px bottom bar showing the current track name, live timer, and a clear tap/slide pull-tab button (`▲ MASTER CONTROLS [Fade / Stop]`).
    - **Expanded Mode**: Slides up smoothly with hardware-accelerated CSS transition to reveal the full master suite:
      - **FADE OUT** button (with current duration subtitle)
      - **CUT / STOP** button (instant kill)
      - **FADE DURATION** slider + 1s, 2s, 3s, 4s chips
      - **MASTER VOLUME** slider
      - Toggle arrow flips to `▼ SLIDE DOWN`
    - **Interactive Gestures**:
      - Single tap on the handle bar toggles the drawer open/closed.
      - Touch swipe up / down on the dock glides it open / shut.
    - Reduce the bottom dock spacer when collapsed so the page content and playlist songs are fully visible on iPhone screens.

---

### 5. Inline "Song Jar" Directly from the Active Playlist
- Replace the popup modal approach with an **inline Song Jar** embedded directly on the Between-Innings page:
  - Header: **"⚾ BASEBALL SONG JAR"** (dynamically updates with playlist title) + live track count badge.
  - **Draw Random Song**: Prominent `[🎲 DRAW RANDOM SONG]` button to immediately pick and cue/play a track from the jar.
  - **Inline Song List**: Clean, scrollable list of tracks with index badges (`#1`, `#2`, `#3`), track title, artist, and large one-tap Play buttons.
  - **Add Track to Jar**: Quick input field to paste any YouTube link or song name to append to the active Song Jar on the fly (saved in `localStorage`).
  - Active playing track receives a glowing crimson border and animated equalizer bars.

---

## User Review Required

> [!IMPORTANT]
> **No Modal Needed for Song Jar**: The Song Jar list will now be displayed directly on the Between-Innings page instead of requiring coaches to open a separate popup modal. Tapping the Random button or any track in the list cues or plays that track directly.
>
> **Auto-Play Disabled on Switch**: Changing the dropdown will now cue the playlist silently ready at 0:00. You'll tap the newly enlarged Play button when you want music to start.

---

## Verification Plan

### Automated / Syntax & Build Verification
1. Validate JavaScript syntax via Node (`node -c js/app.js`, `node -c js/youtube-manager.js`, `node -c js/audio-player.js`).
2. Verify HTML structure and valid tags in `index.html`.

### Manual & Interactive Testing
1. Launch local web server and test on mobile viewport (iPhone 16 Pro Max / Safari dimensions: 430px × 932px).
2. Verify:
   - **Default Playlist**: Loads "Baseball" (`PLfIVhrWS4Y_M`) with Jessie Murph / Jelly Roll, Luke Combs, Jaz Von.
   - **No Auto-Play on Switch**: Changing dropdown to Pantera or Country cues playlist without auto-playing audio.
   - **Play Button**: Test large 62px play/pause button outdoor styling and responsive toggle.
   - **Sliding Drawer**: Tap handle to slide bottom controls down; verify screen space opens up; tap again or swipe to slide back up; verify Fade Out and Cut/Stop remain fully functional.
   - **Inline Song Jar**: Test picking individual songs, drawing a random song, and adding a track to the jar.
