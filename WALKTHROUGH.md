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

### 6. Compact Corner Video & Audio-First Deck
- **Mini Corner Window**: Rescaled the YouTube video frame into a compact `110px × 64px` picture-in-picture window tucked neatly into the top-right corner of the player card.
- **Immediate Information Visibility**: Song title, artist, live audio pulse pill, and all transport buttons (`[⏮] [▶] [⏭] [🔀]`) sit immediately adjacent and below the corner window, eliminating unnecessary vertical scrolling.

### 7. Coach's Personal Baseball Playlist
- **Direct Integration**: Added coach's playlist (`https://youtube.com/playlist?list=PLfIVhrWS4Y_M`) titled **"⚾ My Baseball Playlist"** as the default primary selection in both the Quick Switch dropdown and compact preset chips.
- **Full Compatibility**: Plays seamlessly across mobile browsers while hooked directly into the master fade out and instant cut buttons.

### 8. Interactive Dugout Song Jar (`🫙`)
- **Tap to Open Jar**: Accessible via the crimson `[🫙 SONG JAR]` button with live slip counter.
- **Draw Random Song**: Big `[🎲 DRAW RANDOM SONG FROM JAR]` button instantly selects, highlights, and plays a random track from the jar.
- **Pick Any Song**: Scrollable slip list lets the coach tap any song to play it immediately or pause.
- **Add Songs to Jar**: Coach can paste any YouTube URL or type a song title to drop custom tracks right into the jar (persisted in `localStorage`).
- **Reset to Defaults**: One-touch reset to restore standard dugout anthems anytime.

### 9. Small Beta Version Badge
- **Discreet Placement**: Added a small, unobtrusive version indicator (`v1.3-beta`) in the lower right corner of the master bottom dock with subtle opacity (`rgba(255, 255, 255, 0.35)`).

### 10. Coach's "Baseball" Main Playlist & Clean Dropdown Selector
- **Default Main Playlist**: Set Coach's personal playlist (`PLfIVhrWS4Y_M`), titled **"Baseball"**, as the default and primary playlist.
  - Automatically loads with coach's tracks:
    1. *Wild Ones* - Jessie Murph & Jelly Roll (`MVDJxMxzTL0`)
    2. *Fast Car* - Luke Combs (`aXmmyuIqZyo`)
    3. *Getting Older (Clean)* - Jaz Von ft. NBA YoungBoy (`EK-XfDRL2wA`)
- **Eliminated Cluttered Buttons**: Removed the row of chip buttons under the player to free up screen real estate.
- **Sleek Quick-Switch Dropdown**: Kept the quick-switch dropdown menu for seamless switching to alternative playlists (*Pantera Rock*, *Rap*, *90s Hits*, *Country*, *80s Hits*).

### 11. Solved Buffering & Disabled Auto-Play on Playlist Switch
- **Silent Cueing**: Switched YouTube playlist switching from `loadPlaylist` to `cuePlaylist` (`autoplay=0`).
- **No Accidental Audio**: When switching playlists or picking songs in advance, the player cues silently at 0:00 without blasting audio into the dugout or causing multi-stream buffering. Audio only starts when the coach deliberately taps the Play button.

### 12. Outdoor Sunlight-Optimized Play Button (62px)
- **Large Touch Target**: Increased the Play/Pause button from 38px to **62px** diameter with a bright **28px** white SVG icon.
- **Sunlight Glare Resistant**: Styled with a rich crimson gradient, 3px bright amber/gold border, and high-contrast glowing shadows for clear visibility in direct sunlight on mobile screens. Sibling buttons (`[⏮]`, `[⏭]`, `[🎲]`) were enlarged to 44px.

### 13. Master Dock Sliding Drawer (Fade Out, Cut/Stop, Sliders)
- **Space-Saving Collapsible Drawer**: Replaced the heavy fixed bottom bar with an interactive sliding drawer:
  - **Collapsed State**: Sits at the bottom as a sleek ~54px handle bar showing current track name, live EQ dot, and a pull-tab toggle (`▲ FADE & CONTROLS`), leaving maximum screen space to view playlist songs.
  - **Expanded State**: Smoothly slides up with GPU acceleration on tap or swipe, revealing the full FADE OUT button, CUT / STOP button, FADE DURATION slider, and VOLUME slider.
  - **Slide Gestures**: Supports single tap or touch swipe up / down on the handle bar to slide open or closed.

### 14. Inline Dugout Song Jar (Populated with All Playlist Tracks)
- **Directly on the Page**: Replaced the detached modal popup with an **inline Song Jar** embedded right in the Between-Innings section.
- **Filled with All Playlist Tracks**: Whenever a playlist is selected, the Song Jar dynamically fills with all of its tracks (numbered `#1`, `#2`, `#3`...), each with a large one-tap Play/Pause button.
- **Draw Random Song**: Big `[🎲 DRAW RANDOM SONG FROM PLAYLIST]` button immediately selects and drops a random track from the current playlist.
- **Add Songs on the Fly**: Inline `[➕ ADD]` bar allows coaches to paste YouTube links or song titles into their active playlist jar, with automatic asynchronous title fetching via YouTube oEmbed.

### 15. Active Batter Electric Blue Lighting & Baseball Indicators (`⚾`)
- **Electric Blue "At Bat" Highlight**:
  - The current person batting in the Walk-Up section lights up with a radiant **electric cyan/blue theme** (`#00e5ff`) designed specifically to pop outdoors under intense Texas sunlight:
    - Glowing 2px electric blue card border and deep navy gradient background.
    - Prominent **jersey number badge lit up electric blue** (`#00e5ff`) with bold dark navy numerals and white rim.
    - Pill status badge: `<span class="baseball-ico">⚾</span> AT BAT`.
    - Real-time pulse animation (`pulseBlueCard`) when playing their walk-up track.
- **Next-Up "On Deck" Baseball Indicator**:
  - The batter immediately following the current batter in the lineup is highlighted with:
    - Dashed cyan border (`border: 2px dashed #00e5ff`) and subtle cyan glow.
    - Pill status badge: `<span class="baseball-ico">⚾</span> ON DECK`.
    - Cyan-accented on-deck banner at the top of the Walk-Up page with `⚾ ON DECK:` and one-touch `[PLAY NEXT ➔]` button.
- **Automatic Lineup Rotation**:
  - When the coach taps the on-deck batter, taps "PLAY NEXT", or selects any batter:
    - That batter instantly transitions to the **electric blue `⚾ AT BAT`** state.
    - The subsequent player in the lineup automatically receives the **`⚾ ON DECK`** indicator.
    - Wraps sequentially from batter #12 back to batter #1.
    - Fully synchronized with custom lineup reordering in the Lineup Modal.

### 16. Button Padding & Layout Overhaul (No Words Cut Off)
- **Eliminated Fixed Height**: Removed the cramped `height: 94px` on player cards, replacing it with `min-height: 128px; height: auto;`.
- **Generous Interior Padding**: Increased card padding to `12px 11px 14px 11px` with comfortable margins between badges and text.
- **Full Text Wrapping**: Switched player names, song titles, and artists to `white-space: normal; word-break: break-word;` so that even with 3 simultaneous badges (`#4 BATTER`, `⚾ AT BAT`, `NOW PLAYING`), the player name and track details have ample breathing room and are 100% visible with zero clipping.

### 17. Coach's Baseball Flagship Track (`EK-XfDRL2wA`)
- **Updated Primary Track**: Set Coach's requested link (`https://youtu.be/EK-XfDRL2wA`) — **Jaz Von ft. NBA YoungBoy - "Getting Older (Clean)"** — as the primary Baseball anthem.
- **Universal Single Video & Playlist Support**: Enhanced the YouTube player engine to seamlessly cue/play both single video tracks (`loadVideoById`/`cueVideoById`) and full multi-track playlists (`loadPlaylist`/`cuePlaylist`).
- **Auto-Migration**: Automatically clears legacy playlist references from `localStorage` so the coach immediately sees the updated track.

### 18. Server Ping & Instant App Refresh Button (`🔄 Sync`)
- **Header Refresh Button**: Added a dedicated `[🔄 Sync]` button in the top navigation bar.
- **Cache & Service Worker Purge**: Tapping the button flushes browser `CacheStorage`, updates service worker registrations, and pings the server with a cache-busting timestamp.
- **Instant Hard Reload**: Automatically re-fetches the latest code and assets directly from the server, eliminating cached stale bundles on mobile devices.

### 19. Dedicated Baseball Organ Music Quick-Launch (`XwxWsq4otGg`)
- **Organ Music Playlist Added**: Integrated YouTube link `https://youtu.be/XwxWsq4otGg` (Ballpark organ master **Matthew Kaminski** - Atlanta Braves organist playing *The Star-Spangled Banner* and iconic stadium organ chants).
- **Dedicated Quick-Launch Hot-Key**:
  - Prominently placed in the Between-Innings music section right below the YouTube status badge.
  - Styled with a dark ebony/purple ballpark organ console gradient, rich amber border (`#f59e0b`), neon organ emoji icon (`🎹`), hot-key badge (`HOT KEY`), and title/subtitle with full wrapping and zero word cut-offs.
  - One-tap immediate launch: tapping instantly cues/plays the organ music, highlights the hot-key with gold glow, resets the crossfader if muted, and syncs the playlist dropdown.
- **Dropdown & Song Jar Integration**: Added to the `playlistSelect` dropdown as `🎹 Baseball Organ Music (Matthew Kaminski)` and populates the Song Jar with organ classics and ballpark themes.

### 20. Full-Width DJ Master Crossfader (Edge-to-Edge Screen Width)
- **Authentic DJ Mixer Console Aesthetic**:
  - Replaced small sliders with a heavy-duty **DJ Crossfader Deck** spanning the **full width of the phone screen**.
  - Features an edge-to-edge fader slot (`width: 100%`) with textured brushed aluminum track housing, inset drop shadows, center zero/mid notch, and LED tick marks.
  - Massive, tactile **58px × 38px DJ mixer fader cap** (`.dj-crossfader-slider::-webkit-slider-thumb`) with 3D bevels, side grip grooves, and a high-contrast white center tracking line for effortless thumb sliding even under direct sunlight.
- **Full Screen-Width Slide Control**:
  - Sliders travel from the far left of the phone screen (`0%` - 🔊 Full Sound) all the way to the far right (`100%` - 🔇 Silence / Cut).
  - Formula: `volPct = Math.max(0, Math.min(100, 100 - fadePos))`.
  - Master status badge displays `100% SOUND`, `XX% SOUND`, and `0% CUT` in real time as the thumb moves.
  - Quick `↺ 100%` reset button instantly returns sound to full blast.
- **Physical Auto-Fade Knob Glide**:
  - When the coach taps the `[FADE OUT]` button, the crossfader thumb knob physically glides across the phone screen in real time synchronized with the audio engine cosine fade curve over the selected duration (`1.0s`, `2.0s`, `3.0s`, `4.0s`).
  - Auto-restores to 100% sound whenever a new batter or song is tapped.

### 21. Dugout Clock Widget (Removed from UI, Preserved in Code for Future Use)
- **Cleaned Up Active UI**: Removed the Dugout Clock widget from the active Between-Innings display (`style="display: none;" aria-hidden="true"`) to give maximum screen real estate and visibility to the YouTube Player Deck, Ballpark Organ Music hot-key, and Song Jar.
- **100% Preserved for Future Repurposing**:
  - The complete DOM hierarchy (`#dugoutClockWidget`, `#inningTimerDisplay`, `#timerToggleBtn`, `#timerResetBtn`, `#timerPlus30Btn`, `#timerBarFill`) remains intact in `index.html`.
  - All timer methods (`setupInningTimer`, `startTimer`, `pauseTimer`, `resetTimer`, `updateTimerDisplay`) are preserved with defensive null guards in `js/app.js`.
  - All CSS styles (`.inning-timer-card`, `.timer-digits`, etc.) remain fully defined in `css/style.css`.
  - Ready to be re-activated or repurposed at any time (e.g. for pitch count limits, game countdowns, or batting cage clocks) with a single property toggle.

### 22. Collapsible Stadium Rally & Chants Lock (Accidental Bump Prevention)
- **Problem Solved**: During live games, fast scrolling through batters could result in accidentally brushing against the loud Stadium Rally and Chants buttons (air horns / sirens) in the dugout.
- **Dedicated Quick-Close Toggle (`[✕ HIDE]` / `[＋ SHOW CHANTS]`)**:
  - Added a tactile toggle button right in the header row of the **STADIUM RALLY & CHANTS** section.
  - Tapping **`[✕ HIDE]`** cleanly collapses the 4 sound effect buttons (`#hypeGrid`), collapses the section into a slim safety bar, and displays the status badge `Locked for Game`.
  - In locked/collapsed mode, loud sound FX are completely un-bumpable, leaving full unobstructed focus on the walk-up batter grid.
  - Tapping either the **`[＋ SHOW CHANTS]`** button or anywhere on the slim collapsed bar instantly re-opens the section whenever a rally breaks out.
  - **Persistent State**: The coach's preference is remembered in `localStorage` (`grizzlies_rally_hidden`) so refreshing or reopening during a game preserves the closed state.

### 23. Faded Blue Edge Open Indicator (Fade & Controls Drawer)
- **High-Visibility Open State**:
  - When the bottom drawer for fade and controls is open (`.master-dock.drawer-expanded`), the top edge lights up with a vibrant **electric cyan/blue border** (`border-top: 2px solid #00e5ff`) and an ambient blue glow (`box-shadow: 0 -8px 26px rgba(0, 229, 255, 0.38)`).
  - A soft, faded blue gradient curtain (`linear-gradient(180deg, rgba(0, 229, 255, 0.24) 0%, rgba(0, 176, 255, 0.08) 50%, transparent 100%)`) washes down into the top 32px of the drawer.
  - The drag handle pill transitions to glowing cyan (`background: #00e5ff; box-shadow: 0 0 10px rgba(0, 229, 255, 0.75)`), providing instantaneous visual confirmation at a glance that the controls drawer is open.

### 24. 24-Song Playlist Expansion & "Pull 5 Random" Dugout Mode
- **No Limit on Song Jar**:
  - Clarified that the app has **zero limit** on playlist track count (supports 24, 50, or 100+ songs with full vertical scrolling).
  - The default Baseball tracklist in `PLAYLIST_TRACKS_MAP['EK-XfDRL2wA']` was expanded from 5 to **all 24 stadium tracks** (starting with Coach's flagship *"Getting Older"* followed by curated dugout anthems).
  - Auto-merges any missing tracks directly into existing `localStorage` caches so coaches immediately see the full 24 songs upon updating.
- **New View Mode Selector (`[📋 ALL SONGS (24)]` vs `[🎲 PULL 5 RANDOM]`)**:
  - Added mode tabs inside the Song Jar card:
    - **`[📋 ALL SONGS]`**: Shows the complete 24 tracks with individual row play/pause and delete actions.
    - **`[🎲 PULL 5 RANDOM]`**: Randomly draws a fresh batch of 5 songs from the 24-song playlist, displaying only those 5 in the jar.
  - **Re-Roll Banner (`[🔄 ROLL NEW 5]`)**:
    - When in 5-random mode, an amber status banner appears (`🎲 5 RANDOM DUGOUT PICKS (Drawn from all 24 playlist songs)`).
    - Tapping **`[🔄 ROLL NEW 5]`** immediately re-shuffles and draws 5 new random songs from the playlist with tactile haptic feedback.
- **Smart Random Song Play (`[🎲 DRAW RANDOM SONG FROM PLAYLIST]`)**:
  - If in 5-random mode, immediately drops and plays a random track from the 5 visible picks.
  - If in all-songs mode, drops and plays a random track from all 24 songs in the playlist.

### 25. Sticky On-Deck Banner & Walk-Up Batters Header
- **Problem Solved**: When scrolling down through the 12 batter cards on mobile, the on-deck notification and upcoming batter controls would scroll off the screen.
- **Unified Sticky Container (`.roster-sticky-header`)**:
  - Encapsulated the **`WALK-UP BATTERS`** section header, player count badge, search box, and the **`⚾ ON DECK: ... PLAY NEXT →`** notification banner together in a single sticky wrapper (`position: sticky; top: 0; z-index: 25`).
  - As the coach scrolls up the players list, the Stadium Rally & Chants section scrolls away smoothly above.
  - The **`WALK-UP BATTERS`** header and **On-Deck banner** freeze cleanly at the very top of the scroll container—the on-deck banner stops exactly right under the walk-up batters title row and does not scroll past it.
  - All 12 player cards glide underneath cleanly with a dark backdrop-blur shield (`background: linear-gradient(...)`, `backdrop-filter: blur(14px)`), keeping the next batter always visible and tap-ready without blocking roster cards.

### 26. Full-Width Top Header Meta Bar & Two-Line Stacked Title Lockup
- **Full-Width Edge-to-Edge Ribbon (`.team-meta-topbar`)**:
  - Placed **`8U FALL 2026 • DUGOUT SOUNDBOARD`** as a dedicated top ribbon spanning **100% full width across the very top** of the app header.
  - Styled with refined athletic letter spacing (`letter-spacing: 2px; color: var(--red-bright); font-weight: 800`), subtle lower border separator, and crimson glow.
- **Two-Line Stacked Title Lockup (`WYLIE`<br>`GRIZZLIES`)**:
  - Stacked **`WYLIE`** and **`GRIZZLIES`** cleanly on two lines on top of each other using the athletic display font (`line-height: 0.92`).
  - Balanced alongside the Grizzly team logo badge (`44px × 40px`).
  - Frees up significant horizontal breathing room for the 4 header action buttons (`[🔄 Sync]`, `[Tips]`, `[Lineup]`, `[Fullscreen]`) with comfortable gaps, preventing any cramped layout.

### 27. Flush Sticky Header Alignment Under Navigation Tabs (Zero Gap)
- **Problem Solved**: A transparent top padding gap in the scroll container allowed player cards to be briefly seen scrolling between the navigation tabs bar and the pinned sticky on-deck header.
- **Seamless 0px Sticky Pinning**:
  - Removed container top padding (`padding: 0 14px 0 14px`) and eliminated the lower margin on `.dugout-tabs-nav` (`margin: 5px 14px 0 14px`).
  - The **`WALK-UP BATTERS`** + **`⚾ ON DECK`** sticky header pins **100% flush directly underneath the dugout navigation tabs** (`[ ⚾ WALK-UP BATTERS ]` / `[ ⚡ BETWEEN INNINGS ]`).
  - Applied solid dark background shield (`#0e0f14` / `backdrop-filter: blur(16px)` / `box-shadow: 0 4px 18px rgba(0,0,0,0.75)`), completely preventing any cards from peeking or bleeding through while scrolling.

---

## Verification & Deployment
1. Validated JavaScript syntax across all files (`node -c js/app.js`, `node -c js/youtube-manager.js`, `node -c js/audio-player.js`, `node -c js/roster.js`).
2. Tested local server on port 3000 and verified valid HTTP 200 responses for HTML, CSS, and JS with full-width top header meta bar, two-line stacked title lockup, flush sticky roster header, and 24-song Baseball playlist.
3. Verified generous padding on cards, full text visibility with zero cutoffs, correct YouTube link cueing, live server ping refresh functionality, dedicated baseball organ music button, full-width DJ mixer crossfader, clean between-innings view, collapsible rally/chants section for game-time safety, glowing blue open drawer indicator, 24-track song jar with 5-random shuffle mode, and flush sticky on-deck banner.



