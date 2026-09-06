# MYSTIC HUNT — Infinity 2K26

> **Seek. Scan. Solve.**  
> Official QR Campaign & Trial Portal for **Mystic Hunt**, presented by the **Department of Computer Science & Engineering, SVPCET Nagpur** as part of **Infinity 2K26**.

---

## ✦ Overview

**Mystic Hunt** is an interactive, cinematic web experience designed to engage students across all academic backgrounds (both technical and non-technical). 

Players scan a promotional QR code, arrive at an ancient cosmic void with a locked golden treasure chest, open the chest to reveal the mystery via a sequential typewriter sequence, and solve one of four procedural mini-games to unseal the official event poster and registration portal.

---

## ✦ Repository Structure

```
Mystic Hunt/
├── index.html        # Semantic HTML5 markup, trial templates, and audio preloads
├── style.css         # Dark cosmic glassmorphic theme & multi-device responsive engine
├── script.js         # Procedural puzzle generation, Web Audio synthesis, and game state
├── chest_open.wav    # Authentic physical Foley SFX (heavy latch pop + wooden lid creak)
├── poster.jpg        # Official Infinity 2K26 Mystic Hunt reveal poster
└── README.md         # Complete project documentation and guide
```

---

## ✦ Core Features & User Flow

```
[ QR Code Scan / Direct URL ]
              ↓
  1. THE CHEST LOADING SCREEN
     • Master beat starts immediately with floating equalizer pill
     • Direct-click gating on #clChest (background clicks trigger tactile wobble & hint)
     • Authentic Foley latch pop and wooden lid friction creak (chest_open.wav)
              ↓
  2. SEQUENTIAL TYPEWRITER ENTRANCE
     • Zero-flash CSS gating (.seq-el and .seq-trial stay invisible until their step)
     • 10-step synchronized entrance:
       Brand Line → Infinite Crest → Glitch Title → Tagline → Lore Narrative →
       Live T-Minus Countdown → Meta Strip → Section Label → 4 Trial Cards → Footer
              ↓
  3. CHOOSE ANY OF 4 PROCEDURAL TRIALS
     • Trial I:   THE CHEST              (Wordle / Mastermind 4-digit code)
     • Trial II:  THE ASTRAL CIRCUIT     (Rotatable conduit pipe grid & voltage meter)
     • Trial III: THE SIGILS             (12-card celestial memory rune matching)
     • Trial IV:  THE CELESTIAL ASTROLABE (Concentric ring alignment with golden beam)
              ↓
  4. GRAND POSTER REVEAL & REGISTRATION
     • Golden celebration particle burst (goldBurst)
     • Unseals the official event poster (poster.jpg) with illuminated corner brackets
     • Event Date (10 Sept 2026), Venue (CSE, SVPCET), Team Size (2–4 Hunters), Prize (₹3000+)
     • Fee Schedule: Solo ₹50 · Duo ₹100 · Trio ₹150 · Squad ₹200
     • Primary CTA: [REGISTER NOW ➜] (Google Form)
     • Secondary CTA: [Visit Infinity 2K26 ↗] (Official Portal)
     • Replay button allowing players to try other trials
```

---

## ✦ The 4 Mini-Games (100% Non-Tech Friendly & Procedural)

All mini-games are designed without programming jargon, hex codes, or abstract boolean logic so that **any student from any background can solve them intuitively**. Every visit generates a brand-new layout:

### 1. Trial I — The Chest (Code Cracking)
* **How it works**: Players guess a 4-digit secret combination using an on-screen numeric keypad.
* **Instant Clues**: Each attempt displays feedback chips:
  - **Green**: Correct digit in the exact right spot.
  - **Amber**: Correct digit, but located in another position.
  - **Grey**: Digit is not in the combination.
* **Dynamic Generation**: A fresh 4-digit code ($1\dots 9$ distinct numbers) is randomly generated on each visit. Max 6 tries with a 60-second timer.

### 2. Trial II — The Astral Circuit (Conduit Power Flow)
* **How it works**: A $4\times 4$ power grid connects Energy Source $\alpha$ (top-left) to Core $\Omega$ (bottom-right). Players tap conduit tiles to rotate them $90^\circ$ clockwise.
* **Real-time Feedback**: Live Breadth-First Search (BFS) electric flood-fill lights up energized conduits in glowing neon cyan with a real-time percentage voltage meter ($0\% \to 100\%$).
* **Dynamic Generation**: Procedural self-avoiding random walk algorithm generates a brand-new guaranteed solvable path from $(0,0)$ to $(3,3)$ on each visit, with randomized starting rotations.

### 3. Trial III — The Sigils (Celestial Rune Pairs)
* **How it works**: 12 cards arranged in a $4\times 3$ grid. Players tap cards to flip and match pairs of ancient astronomical symbols.
* **Real-time Feedback**: Matched pairs lock in with golden/green glow and melodic chime confirmation.
* **Dynamic Generation**: A random subset of 6 runes is chosen from a 16-rune pool (`✦`, `★`, `◆`, `▲`, `●`, `⬡`, `☽`, `☼`, etc.) and shuffled randomly on each visit.

### 4. Trial IV — The Celestial Astrolabe (Ring Alignment)
* **How it works**: 3 concentric brass rings (Outer, Middle, Inner) carrying ancient celestial symbols. Target runes are displayed at the top.
* **Real-time Feedback**: Players tap the ratchet rotation buttons (or the rings themselves) to rotate each ring $45^\circ$ until its target rune aligns along the vertical golden ley-line beam.
* **Dynamic Generation**: 3 new target glyphs are randomly selected, and initial ring angles are scrambled away from the solved state on each visit.

---

## ✦ Sound Design & Music Architecture

The experience features a unified audio system built on Web Audio API and mechanical Foley SFX:

* **Instant Master Beat**:
  - Starts playing immediately upon opening the page without waiting for the chest to open.
  - Continues grooving seamlessly across the chest opening and throughout all mini-game trials.
* **Acoustic & Electronic Groove ($74\text{ BPM}$)**:
  - **Punchy Sub Kick**: Sub-bass frequency drop ($155\text{ Hz} \to 40\text{ Hz}$) with a snappy $950\text{ Hz}$ transient click.
  - **Snappy Snare / Rim-Clap**: Crisp highpass noise burst + tuned $210\text{ Hz}$ acoustic body.
  - **Rhythmic Percussion Pops (`pop()`)**: Snappy organic woodblock / bubble-pop transients ($540\text{ Hz} \to 880\text{ Hz}$) placed on syncopated 16th steps ($3, 7, 11, 14, 15$).
  - **Dynamic Hi-Hats**: Velocity-accented $7.5\text{ kHz}$ hats with open-hat turnarounds into the next bar.
  - **Walking Bassline**: Lowpass-filtered triangle wave ($380\text{ Hz}$) with sub-sine warmth that walks root notes, fifth harmonics, and measure bounces.
  - **Atmospheric Chords & Arpeggio**: Warm progression ($\text{Am} \to \text{F} \to \text{C} \to \text{G}$) with shimmering 16th-note celestial arpeggios and chimes.
* **Realistic Foley Chest Opening**:
  - Dedicated Foley audio asset (`chest_open.wav`, 158.8 KB) producing an authentic mechanical latch pop and heavy wooden lid creak (zero synthesizer chords).
* **Infinity 2K26 Glass Equalizer Pill**:
  - Positioned in the top-right corner.
  - 3-bar dancing visualizer dynamically reflects audio playback.
  - One-tap toggle to mute/unmute at any point.

---

## ✦ Cross-Device & Cross-Browser Responsiveness

The site is built with a responsive engine covering all form factors:

| Device Category | Viewport Width | Key Responsive Behaviors |
|---|---|---|
| **Micro / Foldables** | $\le 340\text{px}$ | Compact $10\text{px}$ padding; scaled astrolabe stage ($0.76\times$ scale); compact $4\times 4$ circuit grid; reduced keypad and digit sizes; zero horizontal scroll. |
| **Small Phones** | $341\text{px} - 400\text{px}$ | Fluid typography via CSS `clamp()`; astrolabe scaled to $0.88\times$; 2-column trial card grid; touch-friendly 44px+ buttons. |
| **Standard Phones** | $401\text{px} - 599\text{px}$ | Full-size $320\text{px}$ astrolabe stage; spacious card padding; fluid countdown. |
| **Tablets (Portrait)** | $600\text{px} - 719\text{px}$ | Centered container; 2-column cards; generous touch margins. |
| **Tablets (Landscape) & Laptops** | $720\text{px} - 1024\text{px}$ | $780\text{px}$ container; 4-column trial cards (`repeat(4, 1fr)`); 4-column meta and reveal info grids. |
| **Large Desktops & Monitors** | $\ge 1025\text{px}$ | $840\text{px}$ container; enhanced 3D hover states; cursor particle trail. |
| **Landscape Mobile** | Height $\le 520\text{px}$ | Chest loader features vertical scroll fallback; chest max-height clamped to $48\text{vh}$; compact topbar; astrolabe scaled to $0.68\times$. |

### Cross-Browser Hardening:
- **Safe Area Insets**: Uses `env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`, `env(safe-area-inset-left)`, and `env(safe-area-inset-right)` for notch and Dynamic Island support on modern iOS and Android devices.
- **Touch Responsiveness**: `touch-action: manipulation;` applied to all interactive controls to remove the 300ms mobile tap delay.
- **Autoplay Handling**: Automatic gesture listeners (`pointerdown`, `touchstart`, `mousemove`, `keydown`, `click`) unlock audio instantly on any interaction if restricted by browser autoplay policy.
- **Canvas Scaling**: Dynamic pixel ratio clamping (`devicePixelRatio` up to 2.0) with automated resize and orientation change handlers.
- **Vendor Prefixes**: `-webkit-backdrop-filter`, `-webkit-overflow-scrolling: touch`, `-webkit-user-select`, and `-webkit-tap-highlight-color: transparent`.

---

## ✦ How to Run Locally

1. **Option A: Static Web Server (Recommended)**
   Open terminal in the project directory:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Or using Node.js
   npx serve .
   ```
   Open `http://localhost:8000` in any browser.

2. **Option B: Direct Browser Launch**
   Double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox.

---

## ✦ Deployment

Deployable to any static hosting provider by simply uploading the repository directory:
- **Vercel**: Run `vercel` or connect your GitHub repository.
- **Netlify**: Drag-and-drop the folder into Netlify Drop.
- **GitHub Pages**: Push to repository and enable GitHub Pages in Settings.
- **College Web Server**: Copy all files to the public HTML directory.

---

## ✦ Event Information & Links

* **Event**: Mystic Hunt — Infinity 2K26
* **Department**: Computer Science & Engineering, SVPCET Nagpur
* **Date**: 10 September 2026
* **Venue**: CSE Department, SVPCET
* **Team Size**: 2–4 Hunters
* **Prize Pool**: ₹3,000+
* **Registration Fees**: Solo ₹50 · Duo ₹100 · Trio ₹150 · Squad ₹200
* **Registration Form**: [https://forms.gle/XKHtQAXZiLTi1JfJ7](https://forms.gle/XKHtQAXZiLTi1JfJ7)
* **Official Infinity Portal**: [https://infinity-2026.vercel.app/](https://infinity-2026.vercel.app/)
* **Student Coordinators**:
  - Rishi Walokar: `+91 93733 34727`
  - Dhanshree Hande: `+91 75586 45260`
