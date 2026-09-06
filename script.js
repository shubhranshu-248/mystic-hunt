/* ===================================================================
   MYSTIC HUNT — Infinity 2K26  (v5)
   Golden chest opening loader · loud melodic ambient beat · no-flash
   typewriter · live countdown · gold-burst · cursor trail · 4 trials
   =================================================================== */

(function(){
'use strict';

/* ================================================================
   1) MOVING BACKGROUND — canvas particle network (no pink)
   ================================================================ */
(function bg(){
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, dpr = 1;
  const NODES = [];
  const N = window.innerWidth < 720 ? 45 : 80;
  const COLORS = [
    'rgba(255,215,107,',   // gold
    'rgba(126,232,255,',   // cyan
    'rgba(107,47,187,',    // violet
    'rgba(255,138,26,',    // orange
    'rgba(197,17,17,'      // red
  ];
  function resize(){
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = canvas.width = window.innerWidth * dpr;
    h = canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    if(NODES && NODES.length){
      for(const n of NODES){
        if(n.x > w) n.x = Math.random() * w;
        if(n.y > h) n.y = Math.random() * h;
      }
    }
  }
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('orientationchange', () => setTimeout(resize, 150), { passive: true });
  resize();
  for(let i = 0; i < N; i++){
    NODES.push({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4 * dpr, vy: (Math.random() - 0.5) * 0.4 * dpr,
      r: (Math.random() * 1.6 + 0.6) * dpr,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      tw: Math.random() * Math.PI * 2
    });
  }
  function tick(){
    ctx.clearRect(0, 0, w, h);
    const linkDist = 140 * dpr;
    for(let i = 0; i < NODES.length; i++){
      const a = NODES[i];
      for(let j = i + 1; j < NODES.length; j++){
        const b = NODES[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if(d < linkDist){
          const alpha = (1 - d / linkDist) * 0.18;
          ctx.strokeStyle = 'rgba(126,232,255,' + alpha + ')';
          ctx.lineWidth = 0.5 * dpr;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for(const n of NODES){
      n.tw += 0.02;
      const twinkle = 0.55 + Math.sin(n.tw) * 0.35;
      n.x += n.vx; n.y += n.vy;
      if(n.x < 0 || n.x > w) n.vx *= -1;
      if(n.y < 0 || n.y > h) n.vy *= -1;
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
      grad.addColorStop(0, n.c + (twinkle * 0.6) + ')');
      grad.addColorStop(1, n.c + '0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = n.c + twinkle + ')';
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
})();


/* ================================================================
   2) CHEST LOADER EMBERS
   ================================================================ */
(function embers(){
  const c = document.getElementById('clEmbers');
  if(!c) return;
  for(let i = 0; i < 25; i++){
    const s = document.createElement('span');
    s.style.left = Math.random() * 100 + '%';
    s.style.animationDuration = (7 + Math.random() * 8) + 's';
    s.style.animationDelay = (Math.random() * 10) + 's';
    s.style.width = s.style.height = (3 + Math.random() * 4) + 'px';
    c.appendChild(s);
  }
})();


/* ================================================================
   3) COUNTDOWN — live to Sept 10, 2026 09:00 IST
   ================================================================ */
(function countdown(){
  const target = new Date('2026-09-10T10:00:00+05:30').getTime();
  const cd = document.getElementById('countdown');
  const dEl = document.getElementById('cdD');
  const hEl = document.getElementById('cdH');
  const mEl = document.getElementById('cdM');
  const sEl = document.getElementById('cdS');
  function pad(n){ return String(n).padStart(2, '0'); }
  function tick(){
    const diff = target - Date.now();
    if(diff <= 0){
      cd.innerHTML = '<span class="cd-label" style="color:var(--green)">✦ THE HUNT IS LIVE ✦</span>';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);
    dEl.textContent = pad(d);
    hEl.textContent = pad(h);
    mEl.textContent = pad(m);
    sEl.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
})();


/* ================================================================
   4) NAVIGATION
   ================================================================ */
const screens = document.querySelectorAll('.screen');
function show(id){
  screens.forEach(s => s.classList.toggle('on', s.id === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if(id === 's-chest' && typeof initChestTrial === 'function') initChestTrial();
  if(id === 's-circuit' && typeof initCircuitTrial === 'function') initCircuitTrial();
  if(id === 's-sigils' && typeof initSigilsTrial === 'function') initSigilsTrial();
  if(id === 's-astrolabe' && typeof initAstrolabeTrial === 'function') initAstrolabeTrial();
}
document.querySelectorAll('.trial').forEach(t => {
  t.addEventListener('click', () => show(t.dataset.go));
});
document.querySelectorAll('[data-back]').forEach(b => {
  b.addEventListener('click', () => show('s-intro'));
});
function completeTrial(idx){
  const trials = document.querySelectorAll('.trial');
  if(trials[idx]) trials[idx].classList.add('done');
  goldBurst(); // crazy add
  setTimeout(() => show('reveal'), 1100);
}


/* ================================================================
   5) GOLD BURST + SCREEN FLASH + CURSOR TRAIL (fx layer)
   ================================================================ */
function goldBurst(x, y){
  if(x == null) x = window.innerWidth / 2;
  if(y == null) y = window.innerHeight / 2;
  const COUNT = 40;
  for(let i = 0; i < COUNT; i++){
    const p = document.createElement('div');
    p.className = 'burst-p';
    const angle = (i / COUNT) * Math.PI * 2 + Math.random() * 0.3;
    const dist = 80 + Math.random() * 180;
    p.style.left = x + 'px'; p.style.top = y + 'px';
    p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    p.style.animationDuration = (1.1 + Math.random() * 0.7) + 's';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1800);
  }
}
function screenFlash(){
  const f = document.createElement('div');
  f.className = 'screen-flash';
  document.body.appendChild(f);
  setTimeout(() => f.remove(), 700);
}
// Cursor trail (desktop only, throttled)
if(window.matchMedia && window.matchMedia('(pointer: fine)').matches){
  let lastT = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if(now - lastT < 40) return;
    lastT = now;
    const t = document.createElement('div');
    t.className = 'cursor-trail';
    t.style.left = e.clientX + 'px';
    t.style.top = e.clientY + 'px';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 900);
  }, { passive: true });
}


/* ================================================================
   6) MUSIC — loud melodic ambient with proper beat
   ================================================================ */
const music = (function(){
  let ctx = null, master = null, comp = null, playing = false;
  let schedulerId = null, nextTime = 0, step = 0;
  const BPM = 74;                              // energetic mystic tempo
  const STEP = 60 / BPM / 4;                    // sixteenth-note length in seconds

  function ensure(){
    if(ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if(!AC) return false;
    try {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0;
      comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -16;
      comp.knee.value = 8;
      comp.ratio.value = 4.5;
      comp.attack.value = 0.004;
      comp.release.value = 0.14;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 4600; lp.Q.value = 0.5;
      master.connect(comp).connect(lp).connect(ctx.destination);
      return true;
    } catch(e){ return false; }
  }

  // ---- Sound design ----
  function kick(t, punch=true){
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(155, t);
    o.frequency.exponentialRampToValueAtTime(40, t + 0.16);
    g.gain.setValueAtTime(punch ? 0.65 : 0.48, t);
    g.gain.exponentialRampToValueAtTime(0.008, t + 0.32);
    o.connect(g).connect(master);
    o.start(t); o.stop(t + 0.35);

    // Punch transient click
    const clickO = ctx.createOscillator(), clickG = ctx.createGain();
    clickO.type = 'triangle';
    clickO.frequency.setValueAtTime(950, t);
    clickO.frequency.exponentialRampToValueAtTime(140, t + 0.018);
    clickG.gain.setValueAtTime(0.24, t);
    clickG.gain.exponentialRampToValueAtTime(0.001, t + 0.024);
    clickO.connect(clickG).connect(master);
    clickO.start(t); clickO.stop(t + 0.03);
  }

  function snare(t){
    // Crisp noise burst + tuned acoustic body
    const dur = 0.18;
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for(let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 1600;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.32, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(hp).connect(g).connect(master);
    src.start(t); src.stop(t + dur);

    // Body
    const o = ctx.createOscillator(), og = ctx.createGain();
    o.type = 'triangle'; o.frequency.value = 210;
    og.gain.setValueAtTime(0.22, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    o.connect(og).connect(master);
    o.start(t); o.stop(t + 0.15);
  }

  // Rhythmic percussion pops & woodblock clicks
  function pop(t, pitch=540, gain=0.22){
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(pitch * 1.7, t);
    o.frequency.exponentialRampToValueAtTime(pitch, t + 0.045);
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    o.connect(g).connect(master);
    o.start(t); o.stop(t + 0.07);

    // Harmonic click pop
    const o2 = ctx.createOscillator(), g2 = ctx.createGain();
    o2.type = 'triangle';
    o2.frequency.setValueAtTime(pitch * 2.8, t);
    o2.frequency.exponentialRampToValueAtTime(pitch * 0.9, t + 0.02);
    g2.gain.setValueAtTime(gain * 0.35, t);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
    o2.connect(g2).connect(master);
    o2.start(t); o2.stop(t + 0.03);
  }

  function hihat(t, open=false, gain=0.08){
    const dur = open ? 0.14 : 0.04;
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for(let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 7500;
    const g = ctx.createGain();
    g.gain.setValueAtTime(open ? gain * 1.4 : gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(hp).connect(g).connect(master);
    src.start(t); src.stop(t + dur);
  }

  function bass(freq, t, dur=0.6, gain=0.34){
    // Clean triangle bass with sub-sine warmth
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'triangle'; o.frequency.value = freq;
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.value = 380;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.02);
    g.gain.linearRampToValueAtTime(gain * 0.65, t + dur * 0.6);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(f).connect(g).connect(master);
    o.start(t); o.stop(t + dur);

    // Warm sub-sine
    const o2 = ctx.createOscillator(), g2 = ctx.createGain();
    o2.type = 'sine'; o2.frequency.value = freq / 2;
    g2.gain.setValueAtTime(0, t);
    g2.gain.linearRampToValueAtTime(gain * 0.65, t + 0.02);
    g2.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o2.connect(g2).connect(master);
    o2.start(t); o2.stop(t + dur);
  }

  // ---- Special CHEST-OPEN sound effect (creak → click → whoosh → bell cascade) ----
  function chestOpenFX(){
    if(!ensure()) return;
    if(ctx.state === 'suspended'){ try { ctx.resume(); } catch(e){} }
    const t = ctx.currentTime;

    // 1. Deep bass drop (magic pulse)
    const bo = ctx.createOscillator(), bg = ctx.createGain();
    bo.type = 'sine';
    bo.frequency.setValueAtTime(160, t);
    bo.frequency.exponentialRampToValueAtTime(28, t + 0.5);
    bg.gain.setValueAtTime(0.9, t);
    bg.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
    bo.connect(bg).connect(master);
    bo.start(t); bo.stop(t + 1.05);

    // 2. Wooden creak — bandpass sawtooth sliding up
    const co = ctx.createOscillator(), cg = ctx.createGain();
    co.type = 'sawtooth';
    co.frequency.setValueAtTime(70, t);
    co.frequency.linearRampToValueAtTime(220, t + 1.2);
    const cf = ctx.createBiquadFilter();
    cf.type = 'bandpass'; cf.frequency.value = 320; cf.Q.value = 3;
    cg.gain.setValueAtTime(0.18, t);
    cg.gain.linearRampToValueAtTime(0.06, t + 1.3);
    cg.gain.exponentialRampToValueAtTime(0.001, t + 1.4);
    co.connect(cf).connect(cg).connect(master);
    co.start(t); co.stop(t + 1.4);

    // 3. Metal lock click (~0.35s in)
    const clk = ctx.createOscillator(), clkG = ctx.createGain();
    clk.type = 'triangle';
    clk.frequency.setValueAtTime(3200, t + 0.35);
    clk.frequency.exponentialRampToValueAtTime(900, t + 0.42);
    clkG.gain.setValueAtTime(0.35, t + 0.35);
    clkG.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    clk.connect(clkG).connect(master);
    clk.start(t + 0.35); clk.stop(t + 0.55);

    // 4. Whoosh — noise sweep from low to high (magical release)
    const wDur = 1.4;
    const buf = ctx.createBuffer(1, ctx.sampleRate * wDur, ctx.sampleRate);
    const dd = buf.getChannelData(0);
    for(let i = 0; i < dd.length; i++) dd[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(); src.buffer = buf;
    const wf = ctx.createBiquadFilter();
    wf.type = 'bandpass'; wf.Q.value = 3;
    wf.frequency.setValueAtTime(500, t + 0.5);
    wf.frequency.exponentialRampToValueAtTime(5500, t + 1.7);
    const wg = ctx.createGain();
    wg.gain.setValueAtTime(0, t + 0.5);
    wg.gain.linearRampToValueAtTime(0.35, t + 0.75);
    wg.gain.exponentialRampToValueAtTime(0.001, t + 1.9);
    src.connect(wf).connect(wg).connect(master);
    src.start(t + 0.5); src.stop(t + 1.9);

    // 5. Bell cascade — C-major arpeggio (magical reveal)
    const bellNotes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    bellNotes.forEach((freq, i) => {
      const dly = 0.8 + i * 0.11;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0, t + dly);
      g.gain.linearRampToValueAtTime(0.28, t + dly + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + dly + 2.2);
      o.connect(g).connect(master);
      o.start(t + dly); o.stop(t + dly + 2.3);
      const o2 = ctx.createOscillator(), g2 = ctx.createGain();
      o2.type = 'sine'; o2.frequency.value = freq * 2;
      g2.gain.setValueAtTime(0, t + dly);
      g2.gain.linearRampToValueAtTime(0.11, t + dly + 0.02);
      g2.gain.exponentialRampToValueAtTime(0.001, t + dly + 1.6);
      o2.connect(g2).connect(master);
      o2.start(t + dly); o2.stop(t + dly + 1.7);
    });

    // 6. High-freq sparkle shimmer
    for(let i = 0; i < 10; i++){
      const dly = 1.0 + Math.random() * 1.6;
      const freq = 2200 + Math.random() * 3800;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0, t + dly);
      g.gain.linearRampToValueAtTime(0.07, t + dly + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + dly + 0.6);
      o.connect(g).connect(master);
      o.start(t + dly); o.stop(t + dly + 0.7);
    }
  }
  function arp(freq, t){
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'triangle'; o.frequency.value = freq;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.13, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    o.connect(g).connect(master);
    o.start(t); o.stop(t + 0.4);
  }
  function pad(chord, dur, t){
    chord.forEach((freq, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.11 - i * 0.02, t + dur * 0.4);
      g.gain.linearRampToValueAtTime(0, t + dur);
      o.connect(g).connect(master);
      o.start(t); o.stop(t + dur + 0.1);
    });
  }
  function bell(t){
    const notes = [523, 587, 659, 784, 880];
    const n = notes[Math.floor(Math.random() * notes.length)];
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = n;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.09, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + 2.5);
    o.connect(g).connect(master);
    o.start(t); o.stop(t + 2.6);
    // 2nd harmonic
    const o2 = ctx.createOscillator(), g2 = ctx.createGain();
    o2.type = 'sine'; o2.frequency.value = n * 2;
    g2.gain.setValueAtTime(0, t);
    g2.gain.linearRampToValueAtTime(0.04, t + 0.02);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 1.8);
    o2.connect(g2).connect(master);
    o2.start(t); o2.stop(t + 1.9);
  }
  // (sub-drone removed — the sawtooth "trrrr" is gone)

  // Chord progression: Am, F, C, G (looped)
  const CHORDS = [
    [220, 262, 330],    // Am (A, C, E)
    [174.6, 220, 262],  // F  (F, A, C)
    [261.6, 329.6, 392],// C  (C, E, G)
    [196, 246.9, 293.7] // G  (G, B, D)
  ];
  const BASS = [110, 87.3, 130.8, 98]; // A2, F2, C3, G2 (raised octave, less rumbly)
  // Arpeggio pattern per chord (16 steps, only some fire)
  const ARP = [
    [220, 262, 330, 392, 330, 262, 220, 262], // Am arp
    [174, 220, 262, 349, 262, 220, 174, 220], // F arp
    [261, 329, 392, 523, 392, 329, 261, 329], // C arp
    [196, 246, 293, 392, 293, 246, 196, 246]  // G arp
  ];

  // (Melody line removed — was too childish. Ambient beat + arp + pad remain.)

  // Schedule note events at time t for a given step index (4-bar loop, 64 steps)
  function playStep(s, t){
    const bar = Math.floor(s / 16);      // 0..3
    const inBar = s % 16;                // 0..15

    // KICK — beat 1 and syncopated "3.5" for groove
    if(inBar === 0)  kick(t, true);
    if(inBar === 10) kick(t, false);

    // SNARE / RIM-CLAP — beats 2 and 4
    if(inBar === 4 || inBar === 12) snare(t);

    // RHYTHMIC PERCUSSION POPS & BUBBLES (Enhanced as requested: "beats...pops etc")
    if(inBar === 3)  pop(t, 460, 0.20);             // low bubble pop
    if(inBar === 7)  pop(t, 780, 0.24);             // bright woodblock pop
    if(inBar === 11) pop(t, 580, 0.22);             // acoustic mid pop
    if(inBar === 14) pop(t, 880, 0.26);             // high syncopated pop
    if(inBar === 15) pop(t + STEP * 0.45, 960, 0.16); // pickup bounce

    // HI-HATS — groove with dynamic velocity
    if(inBar === 2 || inBar === 6 || inBar === 10) hihat(t, false, 0.08);
    if(inBar === 8)  hihat(t, false, 0.11);
    if(inBar === 14) hihat(t, true, 0.13); // open hat into next bar

    // BASS GROOVE — walking root & harmonic octave bounce
    if(inBar === 0)  bass(BASS[bar], t, STEP * 5, 0.36);
    if(inBar === 8)  bass(BASS[bar] * 1.5, t, STEP * 3, 0.26);
    if(inBar === 12) bass(BASS[bar], t, STEP * 2.5, 0.22);

    // ARPEGGIO — shimmering celestial 16th-note layer
    if(inBar % 2 === 0){
      const arpNote = ARP[bar][(inBar / 2) % 8];
      arp(arpNote, t);
    }

    // PAD chord — start of every bar, lush sustain
    if(inBar === 0) pad(CHORDS[bar], 3.6, t);

    // BELL — occasional atmospheric chime
    if(inBar === 0 && (bar === 0 || bar === 2)) bell(t + 0.08);
    if(Math.random() < 0.03) bell(t + Math.random() * STEP * 3);
  }

  function scheduler(){
    while(nextTime < ctx.currentTime + 0.2){
      playStep(step, nextTime);
      step = (step + 1) % 64; // 4-bar loop of 16 sixteenth notes
      nextTime += STEP;
    }
  }

  function start(){
    if(!ensure()) return false;
    if(playing) return true;
    if(ctx.state === 'suspended'){
      try { ctx.resume(); } catch(e){}
    }
    playing = true;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.95, ctx.currentTime + 0.8);
    // Immediate confirmation chord (obvious it worked)
    pad([220, 277, 330, 440], 2.5, ctx.currentTime);
    bell(ctx.currentTime + 0.15);
    nextTime = ctx.currentTime + 0.15;
    step = 0;
    schedulerId = setInterval(scheduler, 25);
    return true;
  }
  function stop(){
    if(!ctx || !playing) return;
    playing = false;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
    clearInterval(schedulerId);
    schedulerId = null;
  }
  // Expose a simple tone for other modules (e.g., The Oracle) to play
  function gameTone(freq, dur=0.35, gain=0.35){
    if(!ensure()) return;
    if(ctx.state === 'suspended'){ try { ctx.resume(); } catch(e){} }
    const t = ctx.currentTime;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'triangle'; o.frequency.value = freq;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(master);
    o.start(t); o.stop(t + dur + 0.05);
    // shimmer harmonic
    const o2 = ctx.createOscillator(), g2 = ctx.createGain();
    o2.type = 'sine'; o2.frequency.value = freq * 2;
    g2.gain.setValueAtTime(0, t);
    g2.gain.linearRampToValueAtTime(gain * 0.35, t + 0.02);
    g2.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.7);
    o2.connect(g2).connect(master);
    o2.start(t); o2.stop(t + dur);
  }
  function errorTone(){
    if(!ensure()) return;
    if(ctx.state === 'suspended'){ try { ctx.resume(); } catch(e){} }
    const t = ctx.currentTime;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sawtooth'; o.frequency.setValueAtTime(180, t);
    o.frequency.exponentialRampToValueAtTime(60, t + 0.5);
    g.gain.setValueAtTime(0.3, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    o.connect(g).connect(master);
    o.start(t); o.stop(t + 0.7);
  }
  // Authentic sound effects via Web Audio / Audio element
  function mechanicalClick(){
    if(!ensure()) return;
    if(ctx.state === 'suspended'){ try { ctx.resume(); } catch(e){} }
    const t = ctx.currentTime;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(2800, t);
    o.frequency.exponentialRampToValueAtTime(800, t + 0.035);
    g.gain.setValueAtTime(0.28, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    o.connect(g).connect(master);
    o.start(t); o.stop(t + 0.045);
  }

  return { start, stop, isPlaying: () => playing, gameTone, errorTone, mechanicalClick, ensureContext: ensure };
})();

/* ================================================================
   6B) MASTER AUDIO CONTROLLER (Plays immediately by default)
   ================================================================ */
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let userMuted = false;

if(bgMusic){
  bgMusic.volume = 0.9;
  bgMusic.addEventListener('playing', () => {
    if(!userMuted) musicBtn.classList.add('playing');
  });
  bgMusic.addEventListener('pause', () => {
    if(userMuted) musicBtn.classList.remove('playing');
  });
}

// Authentic chest opening sound player (pure realistic Foley sound effect, no tune)
const chestAudio = new Audio('chest_open.wav');
chestAudio.preload = 'auto';
function playChestOpenSound(){
  try {
    chestAudio.currentTime = 0;
    const p = chestAudio.play();
    if(p && p.catch) p.catch(() => {});
  } catch(e){}
}

// Start or resume master music immediately
function tryStartMusic(){
  if(userMuted || !bgMusic) return;
  if(bgMusic.paused){
    const p = bgMusic.play();
    if(p && p.then){
      p.then(() => {
        musicBtn.classList.add('playing');
      }).catch(() => {
        // Waiting for first user gesture per browser policy
      });
    }
  }
  // Resume Web Audio context for instant sound effects
  if(music && music.ensureContext){
    music.ensureContext();
  }
}

// Toggle audio on/off via floating equalizer pill
musicBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if(!bgMusic) return;
  if(!bgMusic.paused){
    userMuted = true;
    bgMusic.pause();
    musicBtn.classList.remove('playing');
  } else {
    userMuted = false;
    const p = bgMusic.play();
    if(p && p.then){
      p.then(() => {
        musicBtn.classList.add('playing');
      }).catch(() => {});
    }
  }
});

// Start immediately on script execution, DOM ready, and window load
tryStartMusic();
document.addEventListener('DOMContentLoaded', tryStartMusic);
window.addEventListener('load', () => setTimeout(tryStartMusic, 50));

// Instant gesture listeners on any interaction across the entire window
['pointerdown', 'touchstart', 'mousedown', 'pointermove', 'mousemove', 'keydown', 'wheel', 'scroll', 'click'].forEach(ev => {
  document.addEventListener(ev, tryStartMusic, { passive: true });
});

// If user switches tabs and comes back, ensure audio resumes if unmuted
document.addEventListener('visibilitychange', () => {
  if(!document.hidden && !userMuted && bgMusic && bgMusic.paused){
    tryStartMusic();
  }
});


/* ================================================================
   7) CHEST LOADER — click to open, unlocks audio, starts typewriter
   ================================================================ */
const chestLoader = document.getElementById('chestLoader');
const clChest = document.getElementById('clChest');
const clHint = document.getElementById('clHint');
let hasEntered = false;

function enterExperience(){
  if(hasEntered) return;
  hasEntered = true;

  // 1) Ensure master music is playing (groove continues seamlessly)
  tryStartMusic();

  // 2) Pure sound effect: exact heavy wooden chest opening (no bells, no tunes)
  playChestOpenSound();

  // 3) Play chest open animation
  chestLoader.classList.add('opening');

  // 4) Fade out loader
  setTimeout(() => chestLoader.classList.add('gone'), 1200);
  setTimeout(() => chestLoader.remove(), 2100);

  // 5) Start one-by-one sequential reveal
  setTimeout(runTypewriter, 900);
}

// STRICT CHEST CLICK: Only open when user taps the chest itself!
if(clChest){
  clChest.addEventListener('click', (e) => {
    e.stopPropagation();
    enterExperience();
  });
}
if(chestLoader){
  chestLoader.addEventListener('click', (e) => {
    if(hasEntered) return;
    tryStartMusic();
    if(e.target.closest('#clChest')) return;
    // Clicked outside chest: give visual hint and wobble
    if(clChest){
      clChest.classList.remove('wobble');
      void clChest.offsetWidth;
      clChest.classList.add('wobble');
    }
    if(clHint){
      clHint.classList.add('alert');
      clHint.textContent = '✦ TAP DIRECTLY ON THE CHEST ✦';
      setTimeout(() => {
        clHint.classList.remove('alert');
        clHint.textContent = '✦ TAP DIRECTLY ON THE CHEST ✦';
      }, 750);
    }
  });
}


/* ================================================================
   8) TYPEWRITER — Sequential One-By-One Reveal
   ================================================================ */
function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

function typeTextInto(el, text, speed=35){
  el.textContent = '';
  el.classList.add('typing');
  return new Promise(resolve => {
    let i = 0;
    const iv = setInterval(() => {
      el.textContent = text.slice(0, i + 1);
      i++;
      if(i >= text.length){
        clearInterval(iv);
        setTimeout(() => {
          el.classList.remove('typing');
          resolve();
        }, 80);
      }
    }, speed);
  });
}

function typeGlitchInto(el, text, speed=100){
  el.textContent = '';
  el.setAttribute('data-text', '');
  el.classList.add('typing');
  return new Promise(resolve => {
    let i = 0;
    const iv = setInterval(() => {
      const partial = text.slice(0, i + 1);
      el.textContent = partial;
      el.setAttribute('data-text', partial);
      i++;
      if(i >= text.length){
        clearInterval(iv);
        setTimeout(() => {
          el.classList.remove('typing');
          resolve();
        }, 120);
      }
    }, speed);
  });
}

async function runTypewriter(){
  const seqBrand = document.getElementById('seqBrand');
  const brandTxt = document.getElementById('brandTxt');
  const seqCrest = document.getElementById('seqCrest');
  const seqTitle = document.getElementById('seqTitle');
  const titleMystic = document.getElementById('titleMystic');
  const titleHunt = document.getElementById('titleHunt');
  const seqTagline = document.getElementById('seqTagline');
  const seqLead = document.getElementById('seqLead');
  const countdown = document.getElementById('countdown');
  const seqMeta = document.getElementById('seqMeta');
  const seqLabel = document.getElementById('seqLabel');
  const sectionLabelTxt = document.getElementById('sectionLabelTxt');
  const trials = document.querySelectorAll('.trials .seq-trial');
  const seqFoot = document.getElementById('seqFoot');

  // Step 1: Brand line drops down & types
  if(seqBrand && brandTxt){
    seqBrand.classList.add('seq-show');
    await typeTextInto(brandTxt, brandTxt.dataset.seqText || '', 40);
    await sleep(140);
  }

  // Step 2: Crest scales in
  if(seqCrest){
    seqCrest.classList.add('seq-show');
    await sleep(220);
  }

  // Step 3: Title emerges & types
  if(seqTitle){
    seqTitle.classList.add('seq-show');
    if(titleMystic){
      await typeGlitchInto(titleMystic, titleMystic.dataset.seqGlitch || '', 110);
    }
    if(titleHunt){
      await typeGlitchInto(titleHunt, titleHunt.dataset.seqGlitch || '', 110);
    }
    await sleep(160);
  }

  // Step 4: Tagline types
  if(seqTagline){
    seqTagline.classList.add('seq-show');
    await typeTextInto(seqTagline, seqTagline.dataset.seqText || '', 60);
    await sleep(130);
  }

  // Step 5: Lead narrative types
  if(seqLead){
    seqLead.classList.add('seq-show');
    await typeTextInto(seqLead, seqLead.dataset.seqText || '', 24);
    await sleep(160);
  }

  // Step 6: Countdown drops down
  if(countdown){
    countdown.classList.add('seq-show');
    await sleep(140);
  }

  // Step 7: Meta strip slides up
  if(seqMeta){
    seqMeta.classList.add('seq-show');
    await sleep(160);
  }

  // Step 8: Section label types
  if(seqLabel && sectionLabelTxt){
    seqLabel.classList.add('seq-show');
    await typeTextInto(sectionLabelTxt, sectionLabelTxt.dataset.seqText || '', 45);
    await sleep(130);
  }

  // Step 9: 4 Trial cards cascade into place one by one
  for(let i = 0; i < trials.length; i++){
    trials[i].classList.add('seq-show');
    await sleep(140);
  }

  // Step 10: Footer signature
  if(seqFoot){
    seqFoot.classList.add('seq-show');
  }
}


/* ================================================================
   9) TRIAL 1 — THE CHEST  (Wordle / Mastermind Number Guessing)
   ================================================================ */
let initChestTrial = null;
(function chestModule(){
  const CODE_LEN = 4, MAX_TRIES = 6, TIME_LIMIT = 60;
  let secret = [], entry = [], triesLeft = MAX_TRIES, timeLeft = TIME_LIMIT, timerId = null, done = false;
  let wired = false;

  const digits = document.querySelectorAll('#codebox .digit');
  const historyEl = document.getElementById('history');
  const triesEl = document.getElementById('tries');
  const timerEl = document.getElementById('timer');
  const hintEl = document.getElementById('chestHint');
  const tryBtn = document.getElementById('tryBtn');
  const chestEl = document.getElementById('chest');
  const keypad = document.getElementById('keypad');

  function genCode(){
    const pool = [1,2,3,4,5,6,7,8,9], out = [];
    for(let i = 0; i < CODE_LEN; i++) out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    return out;
  }

  function render(){
    digits.forEach((d, i) => {
      d.textContent = entry[i] ?? '';
      d.classList.toggle('filled', entry[i] !== undefined);
      d.classList.toggle('active', i === entry.length && entry.length < CODE_LEN);
    });
    tryBtn.disabled = entry.length !== CODE_LEN || done;
  }

  function score(g){
    const r = new Array(CODE_LEN).fill('grey'), used = new Array(CODE_LEN).fill(false);
    for(let i = 0; i < CODE_LEN; i++) if(g[i] === secret[i]){ r[i] = 'green'; used[i] = true; }
    for(let i = 0; i < CODE_LEN; i++){
      if(r[i] === 'green') continue;
      for(let j = 0; j < CODE_LEN; j++){
        if(!used[j] && g[i] === secret[j]){ r[i] = 'amber'; used[j] = true; break; }
      }
    }
    return r;
  }

  function addRow(g, s){
    const row = document.createElement('div'); row.className = 'attempt';
    g.forEach((n, i) => {
      const el = document.createElement('div'); el.className = 'slot ' + s[i]; el.textContent = n;
      row.appendChild(el);
    });
    historyEl.appendChild(row);
    while(historyEl.children.length > 4) historyEl.removeChild(historyEl.firstChild);
  }

  function submit(){
    if(entry.length !== CODE_LEN || done) return;
    const g = entry.slice(), s = score(g);
    addRow(g, s);
    if(s.every(x => x === 'green')){ win(); return; }
    triesLeft--; triesEl.textContent = triesLeft;
    entry = []; render();
    chestEl.classList.add('shake');
    setTimeout(() => chestEl.classList.remove('shake'), 400);
    music.errorTone();
    if(triesLeft <= 0) loseWithAnswer("Out of attempts.");
    else hintEl.textContent = triesLeft === 1 ? "Last try! Read the runes carefully…" : "Not yet. Study the green & amber clues.";
  }

  function startTimer(){
    clearInterval(timerId);
    timerId = setInterval(() => {
      timeLeft--;
      const m = String(Math.floor(timeLeft / 60)).padStart(2, '0');
      const s = String(timeLeft % 60).padStart(2, '0');
      timerEl.textContent = `${m}:${s}`;
      if(timeLeft <= 10) timerEl.classList.add('low');
      if(timeLeft <= 0){ clearInterval(timerId); loseWithAnswer("Time's up."); }
    }, 1000);
  }

  function win(){
    done = true; clearInterval(timerId);
    chestEl.classList.add('open'); hintEl.textContent = "The chest opens… The mystery is unsealed!";
    music.gameTone(523, 0.4);
    setTimeout(() => music.gameTone(659, 0.4), 150);
    setTimeout(() => music.gameTone(784, 0.6), 300);
    setTimeout(() => completeTrial(0), 900);
  }

  function loseWithAnswer(prefix){
    done = true; clearInterval(timerId); screenFlash();
    digits.forEach((d, i) => {
      d.textContent = secret[i];
      d.classList.remove('active');
      d.classList.add('filled', 'revealed');
    });
    hintEl.classList.add('reveal-answer');
    hintEl.textContent = `${prefix}  The code was  ${secret.join(' · ')}`;
    setTimeout(() => {
      chestEl.classList.add('open');
      setTimeout(() => completeTrial(0), 700);
    }, 3200);
  }

  initChestTrial = function(){
    clearInterval(timerId);
    timerId = null;
    secret = genCode();
    entry = [];
    triesLeft = MAX_TRIES;
    timeLeft = TIME_LIMIT;
    done = false;

    historyEl.innerHTML = '';
    triesEl.textContent = String(MAX_TRIES);
    timerEl.textContent = '01:00';
    timerEl.classList.remove('low');
    hintEl.classList.remove('reveal-answer');
    hintEl.textContent = 'Enter 4 digits, tap the rune ✦';
    chestEl.classList.remove('open', 'shake');

    digits.forEach(d => {
      d.textContent = '';
      d.classList.remove('filled', 'revealed', 'active');
    });

    render();
    startTimer();

    if(!wired){
      wired = true;
      keypad.addEventListener('click', (e) => {
        const btn = e.target.closest('.key');
        if(!btn || done) return;
        const k = btn.dataset.k;
        music.mechanicalClick();
        if(k === 'clear'){ entry.pop(); render(); }
        else if(k === 'try'){ submit(); }
        else if(entry.length < CODE_LEN && !entry.includes(Number(k))){
          entry.push(Number(k)); render();
        }
      });
      document.addEventListener('keydown', (e) => {
        const stage = document.getElementById('s-chest');
        if(!stage || !stage.classList.contains('on') || done) return;
        if(e.key >= '1' && e.key <= '9'){
          const n = Number(e.key);
          if(entry.length < CODE_LEN && !entry.includes(n)){
            music.mechanicalClick(); entry.push(n); render();
          }
        } else if(e.key === 'Backspace'){
          music.mechanicalClick(); entry.pop(); render();
        } else if(e.key === 'Enter'){
          music.mechanicalClick(); submit();
        }
      });
    }
  };
})();


/* ================================================================
   10) TRIAL 2 — THE ASTRAL CIRCUIT  (Conduit Power Routing)
   ================================================================ */
let initCircuitTrial = null;
(function circuitModule(){
  const TIME_LIMIT = 60;
  const stage = document.getElementById('s-circuit');
  const gridEl = document.getElementById('circuitGrid');
  const voltEl = document.getElementById('circuitVoltage');
  const statEl = document.getElementById('circuitStatus');
  const timerEl = document.getElementById('circuitTimer');
  const hintEl = document.getElementById('circuitHint');
  const endTerm = document.getElementById('circuitEndTerm');

  // Bitmasks: N=1, E=2, S=4, W=8
  let grid = []; // 16 cells: { r, c, baseMask, rot, powered, element }
  let timerId = null, timeLeft = TIME_LIMIT, done = false;

  function rotateMask(mask, rot){
    let m = mask;
    for(let i = 0; i < (rot % 4); i++){
      m = ((m << 1) & 15) | ((m & 8) ? 1 : 0);
    }
    return m;
  }

  function createTileSvg(mask){
    const N = !!(mask & 1);
    const E = !!(mask & 2);
    const S = !!(mask & 4);
    const W = !!(mask & 8);
    let d = '';
    if(N) d += 'M 25 25 L 25 0 ';
    if(E) d += 'M 25 25 L 50 25 ';
    if(S) d += 'M 25 25 L 25 50 ';
    if(W) d += 'M 25 25 L 0 25 ';

    return `
      <svg viewBox="0 0 50 50">
        <path class="pipe-bg" d="${d}"/>
        <path class="pipe-core" d="${d}"/>
        <circle cx="25" cy="25" r="4.5" fill="#ffd76b" opacity="0.8"/>
      </svg>
    `;
  }

  function generateSolvableMaze(){
    let path = [{ r: 0, c: 0 }];
    let visited = new Set(['0,0']);
    let curr = { r: 0, c: 0 };

    while(curr.r !== 3 || curr.c !== 3){
      const deltas = [{ dr: -1, dc: 0 }, { dr: 1, dc: 0 }, { dr: 0, dc: -1 }, { dr: 0, dc: 1 }];
      const candidates = [];
      for(const d of deltas){
        const nr = curr.r + d.dr, nc = curr.c + d.dc;
        if(nr >= 0 && nr < 4 && nc >= 0 && nc < 4 && !visited.has(`${nr},${nc}`)){
          candidates.push({ r: nr, c: nc });
        }
      }
      if(candidates.length === 0){
        return generateSolvableMaze();
      }
      candidates.sort((a, b) => {
        const da = Math.abs(3 - a.r) + Math.abs(3 - a.c);
        const db = Math.abs(3 - b.r) + Math.abs(3 - b.c);
        return (da - db) + (Math.random() - 0.5) * 2;
      });
      curr = candidates[0];
      visited.add(`${curr.r},${curr.c}`);
      path.push(curr);
    }

    const cells = [];
    const pathSet = new Map();
    path.forEach((p, idx) => pathSet.set(`${p.r},${p.c}`, idx));

    const DIRS = {
      '-1,0': 1, // North
      '0,1':  2, // East
      '1,0':  4, // South
      '0,-1': 8  // West
    };

    for(let r = 0; r < 4; r++){
      for(let c = 0; c < 4; c++){
        const key = `${r},${c}`;
        let baseMask = 0;
        if(pathSet.has(key)){
          const idx = pathSet.get(key);
          if(idx === 0){
            baseMask |= 8; // West
          } else {
            const prev = path[idx - 1];
            baseMask |= DIRS[`${prev.r - r},${prev.c - c}`];
          }
          if(idx === path.length - 1){
            baseMask |= 2; // East
          } else {
            const next = path[idx + 1];
            baseMask |= DIRS[`${next.r - r},${next.c - c}`];
          }
        } else {
          const presets = [3, 6, 12, 9, 5, 10, 7, 11];
          baseMask = presets[Math.floor(Math.random() * presets.length)];
        }

        const rot = Math.floor(Math.random() * 3) + 1;
        cells.push({ r, c, baseMask, rot, powered: false, element: null });
      }
    }
    return cells;
  }

  function updatePowerFlow(){
    grid.forEach(cell => cell.powered = false);

    const startCell = grid[0];
    const startEff = rotateMask(startCell.baseMask, startCell.rot);
    if(startEff & 8){
      startCell.powered = true;
      const queue = [startCell];
      const visited = new Set(['0,0']);
      const OPPOSITE = { 1: 4, 2: 8, 4: 1, 8: 2 };
      const DIRS = [
        { dir: 1, dr: -1, dc: 0 },
        { dir: 2, dr: 0, dc: 1 },
        { dir: 4, dr: 1, dc: 0 },
        { dir: 8, dr: 0, dc: -1 }
      ];

      while(queue.length > 0){
        const curr = queue.shift();
        const currEff = rotateMask(curr.baseMask, curr.rot);
        for(const d of DIRS){
          if(currEff & d.dir){
            const nr = curr.r + d.dr, nc = curr.c + d.dc;
            if(nr >= 0 && nr < 4 && nc >= 0 && nc < 4){
              const key = `${nr},${nc}`;
              if(!visited.has(key)){
                const neighbor = grid[nr * 4 + nc];
                const neighborEff = rotateMask(neighbor.baseMask, neighbor.rot);
                if(neighborEff & OPPOSITE[d.dir]){
                  neighbor.powered = true;
                  visited.add(key);
                  queue.push(neighbor);
                }
              }
            }
          }
        }
      }
    }

    let poweredCount = 0;
    grid.forEach(cell => {
      if(cell.element){
        cell.element.classList.toggle('powered', cell.powered);
        if(cell.powered) poweredCount++;
      }
    });

    const voltage = Math.round((poweredCount / 16) * 100);
    voltEl.textContent = `${voltage}%`;

    const endCell = grid[15];
    const endEff = rotateMask(endCell.baseMask, endCell.rot);
    if(endCell.powered && (endEff & 2)){
      winCircuit();
    } else {
      endTerm.classList.remove('active');
      statEl.textContent = 'OFFLINE';
      statEl.className = 'status-locked';
    }
  }

  function winCircuit(){
    if(done) return;
    done = true;
    clearInterval(timerId);
    endTerm.classList.add('active');
    statEl.textContent = 'ONLINE';
    statEl.className = 'status-unlocked';
    voltEl.textContent = '100%';
    hintEl.classList.add('reveal-answer');
    hintEl.textContent = '✦ CURRENT FLOWING — REACTOR FULLY ENERGIZED ✦';
    music.gameTone(523, 0.4);
    setTimeout(() => music.gameTone(659, 0.4), 160);
    setTimeout(() => music.gameTone(784, 0.8), 320);
    setTimeout(() => completeTrial(1), 1100);
  }

  function autoSolveAndFinish(){
    done = true;
    clearInterval(timerId);
    screenFlash();
    grid.forEach(cell => {
      cell.rot = 0;
      if(cell.element){
        cell.element.style.transform = `rotate(0deg)`;
      }
    });
    updatePowerFlow();
    hintEl.classList.add('reveal-answer');
    hintEl.textContent = "Time's up. Ancient circuit stabilizes automatically.";
    setTimeout(() => completeTrial(1), 2600);
  }

  function startTimer(){
    clearInterval(timerId);
    timerId = setInterval(() => {
      timeLeft--;
      const m = String(Math.floor(timeLeft / 60)).padStart(2, '0');
      const s = String(timeLeft % 60).padStart(2, '0');
      timerEl.textContent = `${m}:${s}`;
      if(timeLeft <= 10) timerEl.classList.add('low');
      if(timeLeft <= 0){
        clearInterval(timerId);
        autoSolveAndFinish();
      }
    }, 1000);
  }

  initCircuitTrial = function(){
    clearInterval(timerId);
    timerId = null;
    timeLeft = TIME_LIMIT;
    done = false;

    gridEl.innerHTML = '';
    timerEl.textContent = '01:00';
    timerEl.classList.remove('low');
    hintEl.classList.remove('reveal-answer');
    hintEl.textContent = 'Tap conduit tiles to rotate them. Connect the glowing line to Core Ω.';
    statEl.textContent = 'OFFLINE';
    statEl.className = 'status-locked';
    voltEl.textContent = '0%';
    endTerm.classList.remove('active');

    grid = generateSolvableMaze();

    grid.forEach(cell => {
      const tileEl = document.createElement('div');
      tileEl.className = 'circuit-tile';
      tileEl.innerHTML = createTileSvg(cell.baseMask);
      tileEl.style.transform = `rotate(${cell.rot * 90}deg)`;
      cell.element = tileEl;

      tileEl.addEventListener('click', () => {
        if(done) return;
        cell.rot = (cell.rot + 1) % 4;
        tileEl.style.transform = `rotate(${cell.rot * 90}deg)`;
        music.mechanicalClick();
        updatePowerFlow();
      });

      gridEl.appendChild(tileEl);
    });

    updatePowerFlow();
    startTimer();
  };
})();


/* ================================================================
   11) TRIAL 3 — SIGILS  (Memory Rune Pairs)
   ================================================================ */
let initSigilsTrial = null;
(function sigilsModule(){
  const POOL = ['☾','✦','☠','⚔','⚗','⌛','☥','☯','⚚','✵','⚝','☬','♆','⚕','ᛗ','ᚦ'];
  const TIME_LIMIT = 60;
  const grid = document.getElementById('memoGrid');
  const matchEl = document.getElementById('matches');
  const moveEl = document.getElementById('moves');
  const hintEl = document.getElementById('sigilHint');
  let flipped = [], matches = 0, moves = 0, lock = false, done = false;
  let timerId = null;

  function shuffle(a){
    for(let i = a.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function flip(card){
    if(lock || done) return;
    if(card.classList.contains('flipped') || card.classList.contains('matched')) return;
    music.mechanicalClick();
    card.classList.add('flipped');
    flipped.push(card);
    if(flipped.length === 2){
      moves++; moveEl.textContent = moves;
      const [a, b] = flipped;
      if(a.dataset.sym === b.dataset.sym){
        setTimeout(() => {
          a.classList.add('matched'); b.classList.add('matched');
          flipped = []; matches++; matchEl.textContent = matches;
          music.gameTone(659, 0.2);
          if(matches === 6){
            done = true; clearTimeout(timerId);
            hintEl.textContent = "✦ ALL SIGILS MATCHED — THE HUNT AWAKENS ✦";
            music.gameTone(523, 0.4);
            setTimeout(() => music.gameTone(784, 0.6), 200);
            setTimeout(() => completeTrial(2), 850);
          }
        }, 250);
      } else {
        lock = true;
        music.errorTone();
        setTimeout(() => {
          a.classList.remove('flipped'); b.classList.remove('flipped');
          flipped = []; lock = false;
        }, 750);
      }
    }
  }

  function loseWithReveal(){
    if(done) return;
    done = true; screenFlash();
    document.querySelectorAll('#memoGrid .card').forEach(c => {
      if(!c.classList.contains('matched')) c.classList.add('flipped', 'revealed');
    });
    hintEl.classList.add('reveal-answer');
    hintEl.textContent = "Time's up. All sigils now revealed.";
    setTimeout(() => completeTrial(2), 2800);
  }

  initSigilsTrial = function(){
    clearTimeout(timerId);
    flipped = [];
    matches = 0;
    moves = 0;
    lock = false;
    done = false;

    matchEl.textContent = '0';
    moveEl.textContent = '0';
    hintEl.classList.remove('reveal-answer');
    hintEl.textContent = 'Tap two sigils to reveal them.';

    const symbols = shuffle([...POOL]).slice(0, 6);
    const deck = shuffle([...symbols, ...symbols]);
    grid.innerHTML = '';

    deck.forEach(sym => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.sym = sym;
      card.innerHTML = `<div class="card-inner"><div class="card-face card-back">✦</div><div class="card-face card-front">${sym}</div></div>`;
      card.addEventListener('click', () => flip(card));
      grid.appendChild(card);
    });

    timerId = setTimeout(loseWithReveal, TIME_LIMIT * 1000);
  };
})();


/* ================================================================
   12) TRIAL 4 — THE CELESTIAL ASTROLABE (Concentric Alignment Rings)
   ================================================================ */
let initAstrolabeTrial = null;
(function astrolabeModule(){
  const GLYPHS = ['☾', '✦', '☠', '⚔', '☥', '☬', '⚕', 'ᛗ'];
  const TIME_LIMIT = 60;

  const stage = document.getElementById('s-astrolabe');
  const timerEl = document.getElementById('astrolabeTimer');
  const hintEl = document.getElementById('astrolabeHint');
  const alignedEl = document.getElementById('astrolabeAligned');
  const statEl = document.getElementById('astrolabeStatus');
  const beamEl = document.getElementById('astrolabeBeam');

  const tGlyphOuter = document.getElementById('tGlyphOuter');
  const tGlyphMid = document.getElementById('tGlyphMid');
  const tGlyphInner = document.getElementById('tGlyphInner');

  const tStatOuter = document.getElementById('tStatOuter');
  const tStatMid = document.getElementById('tStatMid');
  const tStatInner = document.getElementById('tStatInner');

  const slotOuter = document.getElementById('targetOuter');
  const slotMid = document.getElementById('targetMid');
  const slotInner = document.getElementById('targetInner');

  const ringOuterEl = document.getElementById('ringOuter');
  const ringMidEl = document.getElementById('ringMid');
  const ringInnerEl = document.getElementById('ringInner');

  const btnOuter = document.getElementById('btnRotateOuter');
  const btnMid = document.getElementById('btnRotateMid');
  const btnInner = document.getElementById('btnRotateInner');

  let angles = { outer: 0, mid: 0, inner: 0 };
  let targets = { outer: '', mid: '', inner: '' };
  let timerId = null, timeLeft = TIME_LIMIT, done = false;
  let wired = false;

  function populateRing(ringEl, radius){
    ringEl.innerHTML = '';
    GLYPHS.forEach((g, i) => {
      const node = document.createElement('div');
      node.className = 'astro-node';
      const deg = i * 45 - 90;
      const rad = deg * Math.PI / 180;
      const x = radius + Math.cos(rad) * radius - 16;
      const y = radius + Math.sin(rad) * radius - 16;
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      node.textContent = g;
      ringEl.appendChild(node);
    });
  }

  function getTopGlyph(ringAngle){
    const step = ((-ringAngle % 360) + 360) % 360 / 45;
    const idx = Math.round(step) % 8;
    return GLYPHS[idx];
  }

  function checkAlignment(){
    const topOuter = getTopGlyph(angles.outer);
    const topMid = getTopGlyph(angles.mid);
    const topInner = getTopGlyph(angles.inner);

    const mOuter = topOuter === targets.outer;
    const mMid = topMid === targets.mid;
    const mInner = topInner === targets.inner;

    slotOuter.classList.toggle('aligned', mOuter);
    tStatOuter.textContent = mOuter ? 'ALIGNED' : 'WAITING';

    slotMid.classList.toggle('aligned', mMid);
    tStatMid.textContent = mMid ? 'ALIGNED' : 'WAITING';

    slotInner.classList.toggle('aligned', mInner);
    tStatInner.textContent = mInner ? 'ALIGNED' : 'WAITING';

    let count = 0;
    if(mOuter) count++;
    if(mMid) count++;
    if(mInner) count++;

    alignedEl.textContent = count;

    if(count === 3){
      winAstrolabe();
    } else {
      beamEl.classList.remove('aligned-beam');
      statEl.textContent = 'LOCKED';
      statEl.className = 'status-locked';
    }
  }

  function rotateRing(ringName){
    if(done) return;
    angles[ringName] = (angles[ringName] + 45) % 360;
    const el = ringName === 'outer' ? ringOuterEl : (ringName === 'mid' ? ringMidEl : ringInnerEl);
    el.style.transform = `rotate(${angles[ringName]}deg)`;
    music.mechanicalClick();
    checkAlignment();
  }

  function winAstrolabe(){
    if(done) return;
    done = true;
    clearInterval(timerId);
    beamEl.classList.add('aligned-beam');
    statEl.textContent = 'UNSEALED';
    statEl.className = 'status-unlocked';
    hintEl.classList.add('reveal-answer');
    hintEl.textContent = '✦ THE CELESTIAL RINGS ALIGN — THE SEAL IS BROKEN ✦';
    music.gameTone(523, 0.5);
    setTimeout(() => music.gameTone(659, 0.5), 180);
    setTimeout(() => music.gameTone(784, 0.6), 360);
    setTimeout(() => music.gameTone(1046.5, 0.9), 540);
    setTimeout(() => completeTrial(3), 1300);
  }

  function autoSolveAndFinish(){
    done = true;
    clearInterval(timerId);
    screenFlash();

    ['outer', 'mid', 'inner'].forEach(ringName => {
      const targetG = targets[ringName];
      const targetIdx = GLYPHS.indexOf(targetG);
      const winAngle = ((-targetIdx * 45) % 360 + 360) % 360;
      angles[ringName] = winAngle;
      const el = ringName === 'outer' ? ringOuterEl : (ringName === 'mid' ? ringMidEl : ringInnerEl);
      el.style.transform = `rotate(${winAngle}deg)`;
    });

    checkAlignment();
    hintEl.classList.add('reveal-answer');
    hintEl.textContent = "Time's up. The ancient astrolabe locks automatically.";
    setTimeout(() => completeTrial(3), 2600);
  }

  function startTimer(){
    clearInterval(timerId);
    timerId = setInterval(() => {
      timeLeft--;
      const m = String(Math.floor(timeLeft / 60)).padStart(2, '0');
      const s = String(timeLeft % 60).padStart(2, '0');
      timerEl.textContent = `${m}:${s}`;
      if(timeLeft <= 10) timerEl.classList.add('low');
      if(timeLeft <= 0){
        clearInterval(timerId);
        autoSolveAndFinish();
      }
    }, 1000);
  }

  initAstrolabeTrial = function(){
    clearInterval(timerId);
    timerId = null;
    timeLeft = TIME_LIMIT;
    done = false;

    timerEl.textContent = '01:00';
    timerEl.classList.remove('low');
    hintEl.classList.remove('reveal-answer');
    hintEl.textContent = 'Rotate each ring until target glyphs cross the vertical beam.';
    statEl.textContent = 'LOCKED';
    statEl.className = 'status-locked';
    beamEl.classList.remove('aligned-beam');

    populateRing(ringOuterEl, 145);
    populateRing(ringMidEl, 102.5);
    populateRing(ringInnerEl, 62.5);

    const pool = [...GLYPHS];
    targets.outer = pool[Math.floor(Math.random() * pool.length)];
    targets.mid = pool[Math.floor(Math.random() * pool.length)];
    targets.inner = pool[Math.floor(Math.random() * pool.length)];

    tGlyphOuter.textContent = targets.outer;
    tGlyphMid.textContent = targets.mid;
    tGlyphInner.textContent = targets.inner;

    ['outer', 'mid', 'inner'].forEach(ringName => {
      const targetIdx = GLYPHS.indexOf(targets[ringName]);
      const solvedAngle = ((-targetIdx * 45) % 360 + 360) % 360;
      let scramble = solvedAngle;
      while(scramble === solvedAngle){
        scramble = Math.floor(Math.random() * 8) * 45;
      }
      angles[ringName] = scramble;
      const el = ringName === 'outer' ? ringOuterEl : (ringName === 'mid' ? ringMidEl : ringInnerEl);
      el.style.transform = `rotate(${scramble}deg)`;
    });

    checkAlignment();
    startTimer();

    if(!wired){
      wired = true;
      btnOuter.addEventListener('click', () => rotateRing('outer'));
      btnMid.addEventListener('click', () => rotateRing('mid'));
      btnInner.addEventListener('click', () => rotateRing('inner'));

      ringOuterEl.addEventListener('click', () => rotateRing('outer'));
      ringMidEl.addEventListener('click', () => rotateRing('mid'));
      ringInnerEl.addEventListener('click', () => rotateRing('inner'));
    }
  };
})();


/* ================================================================
   13) REVEAL — replay
   ================================================================ */
document.getElementById('replay').addEventListener('click', () => show('s-intro'));

})();
