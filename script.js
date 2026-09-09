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
  }
  window.addEventListener('resize', resize);
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
  const target = new Date('2026-09-10T09:00:00+05:30').getTime();
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
  const BPM = 68;                              // slow mystic tempo
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
      comp.threshold.value = -18;
      comp.knee.value = 8;
      comp.ratio.value = 5;
      comp.attack.value = 0.005;
      comp.release.value = 0.15;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 4200; lp.Q.value = 0.5;
      master.connect(comp).connect(lp).connect(ctx.destination);
      return true;
    } catch(e){ return false; }
  }

  // ---- Sound design ----
  function kick(t){
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(38, t + 0.14);
    g.gain.setValueAtTime(0.55, t);
    g.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
    o.connect(g).connect(master);
    o.start(t); o.stop(t + 0.32);
  }
  function snare(t){
    // noise + tuned tone blend
    const dur = 0.18;
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for(let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 1500;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.28, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(hp).connect(g).connect(master);
    src.start(t); src.stop(t + dur);
    // Body
    const o = ctx.createOscillator(), og = ctx.createGain();
    o.type = 'triangle'; o.frequency.value = 200;
    og.gain.setValueAtTime(0.18, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    o.connect(og).connect(master);
    o.start(t); o.stop(t + 0.15);
  }
  function hihat(t, open){
    const dur = open ? 0.14 : 0.05;
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for(let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 7500;
    const g = ctx.createGain();
    g.gain.setValueAtTime(open ? 0.13 : 0.09, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(hp).connect(g).connect(master);
    src.start(t); src.stop(t + dur);
  }
  function bass(freq, t, dur=0.9){
    // Clean triangle bass (no more sawtooth buzz)
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'triangle'; o.frequency.value = freq;
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.value = 400;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.30, t + 0.02);
    g.gain.linearRampToValueAtTime(0.18, t + dur * 0.6);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(f).connect(g).connect(master);
    o.start(t); o.stop(t + dur);
    // Add a soft sine sub-octave for warmth (no buzz)
    const o2 = ctx.createOscillator(), g2 = ctx.createGain();
    o2.type = 'sine'; o2.frequency.value = freq / 2;
    g2.gain.setValueAtTime(0, t);
    g2.gain.linearRampToValueAtTime(0.20, t + 0.02);
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
    if(inBar === 0)  kick(t);
    if(inBar === 10) kick(t);
    // SNARE — beats 2 and 4
    if(inBar === 4 || inBar === 12) snare(t);
    // HI-HAT — softer, less "tss" (skip the ones the melody sits on)
    if(inBar === 2 || inBar === 6 || inBar === 10 || inBar === 14) hihat(t, false);
    // BASS — on beat 1 (root of chord)
    if(inBar === 0)  bass(BASS[bar], t, 1.6);
    // ARPEGGIO — every 2nd sixteenth, gentle background
    if(inBar % 2 === 0){
      const arpNote = ARP[bar][inBar / 2 % 8];
      arp(arpNote, t);
    }
    // PAD chord — start of every bar, held 3.5 seconds
    if(inBar === 0) pad(CHORDS[bar], 3.5, t);
    // BELL — occasional atmospheric chime
    if(Math.random() < 0.025) bell(t + Math.random() * STEP * 4);
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
  return { start, stop, isPlaying: () => playing, chestOpenFX, gameTone, errorTone };
})();

const musicBtn = document.getElementById('musicBtn');
musicBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if(music.isPlaying()){
    music.stop();
    musicBtn.classList.remove('playing');
  } else {
    if(music.start()) musicBtn.classList.add('playing');
  }
});


/* ================================================================
   7) CHEST LOADER — click to open, unlocks audio, starts typewriter
   ================================================================ */
const chestLoader = document.getElementById('chestLoader');
let hasEntered = false;

// Try to start ambient music the moment the user does ANYTHING on the loader
// (mouse move, touch, key press, scroll). This means music kicks in while the
// user is still looking at the chest, not only after they click it.
function tryStartMusicSilently(){
  if(!music.isPlaying()){
    if(music.start()) musicBtn.classList.add('playing');
  }
}
['mousemove', 'touchstart', 'pointermove', 'keydown', 'scroll', 'wheel'].forEach(ev => {
  document.addEventListener(ev, tryStartMusicSilently, { once: true, passive: true });
});
// Attempt immediate autoplay in case the browser allows it (Firefox often does)
window.addEventListener('load', () => setTimeout(tryStartMusicSilently, 100));

// Snapshot every data-type element's raw text once, up-front, so a safety
// fallback can always restore what the typewriter cleared.
document.querySelectorAll('[data-type]').forEach(el => {
  el.dataset.raw = el.textContent;
});

function enterExperience(){
  if(hasEntered) return;
  hasEntered = true;
  // 1) Ambient music (in case it hasn't started yet from mousemove/etc.)
  music.start();
  musicBtn.classList.add('playing');
  // 2) BIG chest-opening sound effect: bass drop + creak + click + whoosh + bells
  music.chestOpenFX();
  // 3) Play chest-open animation
  chestLoader.classList.add('opening');
  // 4) Fade out loader after ~1.4s (mid-animation) so the site starts revealing
  setTimeout(() => chestLoader.classList.add('gone'), 1400);
  setTimeout(() => chestLoader.remove(), 2400);
  // 5) Kick off typewriter after loader begins fading
  setTimeout(runTypewriter, 1000);
  // 6) SAFETY FALLBACK — no matter what, ensure ALL text is visible after 15s
  setTimeout(() => {
    document.querySelectorAll('[data-type]').forEach(el => {
      if((!el.textContent || !el.textContent.trim()) && el.dataset.raw){
        el.textContent = el.dataset.raw;
      }
    });
    document.querySelectorAll('[data-type-glitch]').forEach(el => {
      if((!el.textContent || !el.textContent.trim()) && el.dataset.typeGlitch){
        el.textContent = el.dataset.typeGlitch;
        el.setAttribute('data-text', el.dataset.typeGlitch);
      }
    });
  }, 15000);
}
chestLoader.addEventListener('click', enterExperience);
// Also unlock on any key press (accessibility)
document.addEventListener('keydown', () => { enterExperience(); }, { once: true });


/* ================================================================
   8) TYPEWRITER — reads original text, retypes into empty element
   ================================================================ */
function typeText(el, opts={}){
  const text = el.dataset.raw || el.textContent;
  el.dataset.raw = text;
  const speed = opts.speed || 40;
  el.textContent = '';
  el.style.visibility = 'visible';
  el.classList.add('typing');
  return new Promise(resolve => {
    if(!text){ el.classList.remove('typing'); resolve(); return; }
    let i = 0;
    const iv = setInterval(() => {
      el.textContent = text.slice(0, i + 1);
      i++;
      if(i >= text.length){
        clearInterval(iv);
        setTimeout(() => {
          el.classList.remove('typing');
          resolve();
        }, opts.hold || 120);
      }
    }, speed);
  });
}
function typeGlitch(el, opts={}){
  const text = el.dataset.typeGlitch || '';
  const speed = opts.speed || 130;
  el.textContent = '';
  el.setAttribute('data-text', '');
  el.style.visibility = 'visible';
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
        }, opts.hold || 200);
      }
    }, speed);
  });
}

async function runTypewriter(){
  const brand = document.querySelector('.brand-txt[data-type]');
  const t1    = document.querySelector('.title-main .glitch:not(.red)');
  const t2    = document.querySelector('.title-main .glitch.red');
  const tag   = document.querySelector('.tagline[data-type]');
  const lead  = document.querySelector('.lead[data-type]');
  const label = document.querySelector('.section-label span[data-type]');

  // Wrap in try/catch so any failure never leaves the page blank.
  try {
    if(brand) await typeText(brand,  { speed: 55, hold: 200 });
    if(t1)    await typeGlitch(t1,   { speed: 150, hold: 250 });
    if(t2)    await typeGlitch(t2,   { speed: 150, hold: 250 });
    if(tag)   await typeText(tag,    { speed: 90, hold: 250 });
    if(lead)  await typeText(lead,   { speed: 32, hold: 200 });
    if(label) await typeText(label,  { speed: 70, hold: 100 });
  } catch(e){
    // Fallback: if anything goes wrong, restore every text element instantly.
    [brand, tag, lead, label].forEach(el => { if(el && el.dataset.raw) el.textContent = el.dataset.raw; });
    if(t1) { t1.textContent = t1.dataset.typeGlitch || ''; t1.setAttribute('data-text', t1.textContent); }
    if(t2) { t2.textContent = t2.dataset.typeGlitch || ''; t2.setAttribute('data-text', t2.textContent); }
  }
  document.body.classList.add('typewriter-done');
}


/* ================================================================
   9) TRIAL 1 — CHEST  (random code, reveals answer on lose)
   ================================================================ */
(function chest(){
  const CODE_LEN = 4, MAX_TRIES = 6, TIME_LIMIT = 60;
  let secret = genCode(), entry = [], triesLeft = MAX_TRIES, timeLeft = TIME_LIMIT, timerId = null, done = false;
  const digits = document.querySelectorAll('#codebox .digit');
  const historyEl = document.getElementById('history');
  const triesEl = document.getElementById('tries');
  const timerEl = document.getElementById('timer');
  const hintEl = document.getElementById('chestHint');
  const tryBtn = document.getElementById('tryBtn');
  const chestEl = document.getElementById('chest');

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
    if(triesLeft <= 0) loseWithAnswer("Out of attempts.");
    else hintEl.textContent = triesLeft === 1 ? "Last try! Read the runes carefully…" : "Not yet. Study the colors.";
  }
  function startTimer(){
    if(timerId) return;
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
    chestEl.classList.add('open'); hintEl.textContent = "The chest opens…";
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
  document.getElementById('keypad').addEventListener('click', (e) => {
    const b = e.target.closest('.key'); if(!b || done) return;
    const k = b.dataset.k; startTimer();
    if(k === 'clear'){ entry = []; render(); return; }
    if(k === 'try'){ submit(); return; }
    if(entry.length < CODE_LEN){ entry.push(Number(k)); render(); }
  });
  render();
})();


/* ================================================================
   10) TRIAL 2 — MAP  (random every load, 4 diffs, tight targets)
   ================================================================ */
(function mapTrial(){
  const TIME_LIMIT = 60;
  const NUM_DIFFS = 4;
  const HIT_RADIUS = 9;

  const ELEMENTS = [
    { id: 'star',    draw: (x,y) => `<g transform="translate(${x},${y})"><polygon points="0,-8 2,-2 8,-1 3,3 5,10 0,6 -5,10 -3,3 -8,-1 -2,-2" fill="#e8c987"/></g>` },
    { id: 'skull',   draw: (x,y) => `<g transform="translate(${x},${y})"><ellipse rx="9" ry="8" fill="#3a2410"/><circle cx="-3" cy="-1" r="2" fill="#e8c987"/><circle cx="3" cy="-1" r="2" fill="#e8c987"/><rect x="-1.5" y="3" width="1" height="4" fill="#e8c987"/><rect x="0.5" y="3" width="1" height="4" fill="#e8c987"/></g>` },
    { id: 'x',       draw: (x,y) => `<g transform="translate(${x},${y})"><line x1="-7" y1="-7" x2="7" y2="7" stroke="#c51111" stroke-width="3"/><line x1="7" y1="-7" x2="-7" y2="7" stroke="#c51111" stroke-width="3"/></g>` },
    { id: 'tree',    draw: (x,y) => `<g transform="translate(${x},${y})"><circle r="7" fill="#2a3e1a"/><rect x="-1" y="5" width="2" height="7" fill="#3a2410"/></g>` },
    { id: 'gem',     draw: (x,y) => `<g transform="translate(${x},${y})"><polygon points="0,-7 5,0 0,7 -5,0" fill="#7ee8ff" opacity="0.85"/><polygon points="0,-7 5,0 -5,0" fill="#fff" opacity="0.4"/></g>` },
    { id: 'feather', draw: (x,y) => `<g transform="translate(${x},${y})"><path d="M 0 -8 Q 4 -4 4 4 Q 2 8 0 8 Q -2 8 -4 4 Q -4 -4 0 -8" fill="#6B2FBB"/><line x1="0" y1="-6" x2="0" y2="8" stroke="#000" stroke-width="0.5"/></g>` },
    { id: 'moon',    draw: (x,y) => `<g transform="translate(${x},${y})"><path d="M -5 -6 Q 5 -6 5 4 Q 0 -1 -5 4 Z" fill="#efe6cf"/></g>` },
    { id: 'anchor',  draw: (x,y) => `<g transform="translate(${x},${y})"><circle cx="0" cy="-6" r="2" fill="none" stroke="#3a2410" stroke-width="1.5"/><line x1="0" y1="-4" x2="0" y2="6" stroke="#3a2410" stroke-width="1.5"/><path d="M -5 4 Q 0 8 5 4" stroke="#3a2410" stroke-width="1.5" fill="none"/></g>` },
  ];

  const mapA = document.getElementById('mapA');
  const mapB = document.getElementById('mapB');
  const foundEl = document.getElementById('mapFound');
  const totalEl = document.getElementById('mapTotal');
  const timerEl = document.getElementById('mapTimer');
  const hintEl = document.getElementById('mapHint');

  let found = new Set(), done = false, timeLeft = TIME_LIMIT, timerId = null;
  let diffMap = {}, placements = [];

  function randPos(){ return { x: 15 + Math.random() * 70, y: 12 + Math.random() * 76 }; }
  function dist(a, b){ const dx = a.x - b.x, dy = a.y - b.y; return Math.sqrt(dx * dx + dy * dy); }
  function farRandomPos(fromList, min = 25){
    for(let tries = 0; tries < 30; tries++){
      const p = randPos();
      if(fromList.every(o => dist(o, p) >= min)) return p;
    }
    return randPos();
  }
  function generate(){
    const shuffled = [...ELEMENTS].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, 7 + Math.floor(Math.random() * 2));
    placements = []; diffMap = {};
    const usedPos = [];
    chosen.forEach(el => {
      const p = farRandomPos(usedPos, 22);
      usedPos.push(p);
      placements.push({ el, x: p.x, y: p.y });
    });
    const diffChoices = [...placements].sort(() => Math.random() - 0.5).slice(0, NUM_DIFFS);
    diffChoices.forEach(pl => {
      const roll = Math.random();
      let kind, bPos = { x: pl.x, y: pl.y };
      if(roll < 0.6){ kind = 'shift'; bPos = farRandomPos([...usedPos, pl], 28); }
      else if(roll < 0.8){ kind = 'missB'; }
      else { kind = 'missA'; }
      diffMap[pl.el.id] = { a: { x: pl.x, y: pl.y }, b: bPos, kind };
    });
    totalEl.textContent = NUM_DIFFS;
  }

  function svgWrap(inner, which){
    const isA = which === 'a';
    return `
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="parch-${which}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8c987"/><stop offset="1" stop-color="#a8804a"/></linearGradient>
          <radialGradient id="pspot-${which}" cx="0.5" cy="0.5" r="0.7"><stop offset="0" stop-color="rgba(255,220,140,0.3)"/><stop offset="1" stop-color="rgba(60,30,5,0.5)"/></radialGradient>
          <filter id="grime-${which}"><feTurbulence baseFrequency="0.9" numOctaves="2" seed="${isA ? 3 : 7}" /><feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.15  0 0 0 0 0.05  0 0 0 0.18 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
        </defs>
        <rect width="100" height="100" fill="url(#parch-${which})"/>
        <rect width="100" height="100" fill="url(#pspot-${which})" opacity="0.6"/>
        <rect width="100" height="100" filter="url(#grime-${which})" opacity="0.6"/>
        <path d="M 0 0 L 6 3 L 4 7 L 9 10 L 3 15 L 0 13 Z" fill="#3a2410"/>
        <path d="M 100 100 L 94 97 L 96 93 L 91 90 L 97 85 L 100 87 Z" fill="#3a2410"/>
        <path d="M 15 30 Q 45 45 55 65 Q 65 80 85 82" stroke="#8a2a10" stroke-width="0.8" stroke-dasharray="1.5 2" fill="none"/>
        ${inner}
        <rect x="1" y="1" width="98" height="98" fill="none" stroke="#3a2410" stroke-width="0.6" stroke-dasharray="3 1.5"/>
      </svg>
    `;
  }
  function render(){
    const buildInner = which => {
      const isA = which === 'a';
      let out = '';
      placements.forEach(pl => {
        const diff = diffMap[pl.el.id];
        if(!diff){ out += pl.el.draw(pl.x, pl.y); return; }
        if(diff.kind === 'shift'){ out += pl.el.draw(isA ? diff.a.x : diff.b.x, isA ? diff.a.y : diff.b.y); }
        else if(diff.kind === 'missB'){ if(isA) out += pl.el.draw(diff.a.x, diff.a.y); }
        else if(diff.kind === 'missA'){ if(!isA) out += pl.el.draw(diff.b.x, diff.b.y); }
      });
      return out;
    };
    mapA.innerHTML = svgWrap(buildInner('a'), 'a');
    mapB.innerHTML = svgWrap(buildInner('b'), 'b');
  }

  let built = false;
  function build(){
    if(built) return; built = true;
    generate(); render();
    [mapA, mapB].forEach((panel, side) => {
      panel.addEventListener('click', (e) => onTap(e, panel, side === 0 ? 'a' : 'b'));
      panel.addEventListener('touchstart', (e) => onTap(e.touches[0], panel, side === 0 ? 'a' : 'b'), { passive: true });
    });
    startTimer();
  }
  function onTap(e, panel, side){
    if(done) return;
    const rect = panel.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    for(const [id, d] of Object.entries(diffMap)){
      if(found.has(id)) continue;
      const target = d[side];
      if(d.kind === 'missA' && side === 'a') continue;
      if(d.kind === 'missB' && side === 'b') continue;
      const dx = x - target.x, dy = y - target.y;
      if(Math.sqrt(dx * dx + dy * dy) <= HIT_RADIUS){
        found.add(id);
        placeMark(mapA, d.a.x, d.a.y, 'green');
        placeMark(mapB, d.b.x, d.b.y, 'green');
        foundEl.textContent = found.size;
        if(found.size >= NUM_DIFFS) win();
        return;
      }
    }
    placeMark(panel, x, y, 'red', true);
  }
  function placeMark(panel, x, y, color, transient, late){
    const m = document.createElement('div');
    m.className = color === 'green' ? 'map-marker' + (late ? ' late' : '') : 'map-miss';
    m.style.left = x + '%'; m.style.top = y + '%';
    panel.appendChild(m);
    if(transient) setTimeout(() => m.remove(), 500);
  }
  function startTimer(){
    if(timerId) return;
    timerId = setInterval(() => {
      timeLeft--;
      const m = String(Math.floor(timeLeft / 60)).padStart(2, '0');
      const s = String(timeLeft % 60).padStart(2, '0');
      timerEl.textContent = `${m}:${s}`;
      if(timeLeft <= 10) timerEl.classList.add('low');
      if(timeLeft <= 0){ clearInterval(timerId); revealAllAndFinish(); }
    }, 1000);
  }
  function win(){
    done = true; clearInterval(timerId);
    hintEl.textContent = "The maps align…";
    setTimeout(() => completeTrial(1), 800);
  }
  function revealAllAndFinish(){
    done = true; screenFlash();
    let missed = 0;
    Object.entries(diffMap).forEach(([id, d]) => {
      if(!found.has(id)){
        missed++;
        placeMark(mapA, d.a.x, d.a.y, 'green', false, true);
        placeMark(mapB, d.b.x, d.b.y, 'green', false, true);
      }
    });
    hintEl.classList.add('reveal-answer');
    hintEl.textContent = `Time's up.  ${missed} shift${missed === 1 ? '' : 's'} unseen — now marked in amber.`;
    setTimeout(() => completeTrial(1), 3200);
  }
  const obs = new MutationObserver(() => {
    if(document.getElementById('s-map').classList.contains('on')) build();
  });
  obs.observe(document.getElementById('s-map'), { attributes: true, attributeFilter: ['class'] });
})();


/* ================================================================
   11) TRIAL 3 — SIGILS  (random pool, reveals on timeout)
   ================================================================ */
(function sigils(){
  const POOL = ['☾','✦','☠','⚔','⚗','⌛','☥','☯','⚚','✵','⚝','☬','♆','⚕','ᛗ','ᚦ'];
  const TIME_LIMIT = 60;
  const grid = document.getElementById('memoGrid');
  const matchEl = document.getElementById('matches');
  const moveEl = document.getElementById('moves');
  const hintEl = document.getElementById('sigilHint');
  let flipped = [], matches = 0, moves = 0, lock = false, built = false;
  let timerId = null, done = false;

  function shuffle(a){
    for(let i = a.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function build(){
    if(built) return; built = true;
    const symbols = shuffle([...POOL]).slice(0, 6);
    const deck = shuffle([...symbols, ...symbols]);
    grid.innerHTML = '';
    deck.forEach(sym => {
      const card = document.createElement('div');
      card.className = 'card'; card.dataset.sym = sym;
      card.innerHTML = `<div class="card-inner"><div class="card-face card-back">✦</div><div class="card-face card-front">${sym}</div></div>`;
      card.addEventListener('click', () => flip(card));
      grid.appendChild(card);
    });
    timerId = setTimeout(loseWithReveal, TIME_LIMIT * 1000);
  }
  function flip(card){
    if(lock || done) return;
    if(card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    flipped.push(card);
    if(flipped.length === 2){
      moves++; moveEl.textContent = moves;
      const [a, b] = flipped;
      if(a.dataset.sym === b.dataset.sym){
        setTimeout(() => {
          a.classList.add('matched'); b.classList.add('matched');
          flipped = []; matches++; matchEl.textContent = matches;
          if(matches === 6){
            done = true; clearTimeout(timerId);
            hintEl.textContent = "The sigils align…";
            setTimeout(() => completeTrial(2), 800);
          }
        }, 300);
      } else {
        lock = true;
        setTimeout(() => {
          a.classList.remove('flipped'); b.classList.remove('flipped');
          flipped = []; lock = false;
        }, 800);
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
    hintEl.textContent = "Time's up.  All sigils now revealed.";
    setTimeout(() => completeTrial(2), 3200);
  }
  const obs = new MutationObserver(() => {
    if(document.getElementById('s-sigils').classList.contains('on')) build();
  });
  obs.observe(document.getElementById('s-sigils'), { attributes: true, attributeFilter: ['class'] });
})();


/* ================================================================
   12) TRIAL 4 — THE ORACLE  (Simon-Says with mystic runes & tones)
   ================================================================ */
(function oracle(){
  const TIME_LIMIT = 60;
  const NOTES = [523.25, 659.25, 783.99, 987.77]; // C5, E5, G5, B5 (Cmaj7 chord)
  const SEQ_LENS = [3, 4, 5];  // Round 1: 3, Round 2: 4, Round 3: 5

  const stage    = document.getElementById('s-oracle');
  const grid     = document.getElementById('oracleGrid');
  const roundEl  = document.getElementById('oracleRound');
  const timerEl  = document.getElementById('oracleTimer');
  const stateEl  = document.getElementById('oracleState');
  const hintEl   = document.getElementById('oracleHint');
  const startBtn = document.getElementById('oracleStart');
  const tiles    = () => grid.querySelectorAll('.oracle-tile');

  let round = 0, sequence = [], userIdx = 0, accepting = false;
  let done = false, timeLeft = TIME_LIMIT, timerId = null, built = false;

  function lightTile(idx, duration=400){
    const tile = tiles()[idx];
    if(!tile) return;
    tile.classList.add('active');
    music.gameTone(NOTES[idx], 0.4, 0.4);
    setTimeout(() => tile.classList.remove('active'), duration);
  }

  function playSequence(){
    accepting = false;
    stateEl.textContent = '✦ WATCH THE ORACLE ✦';
    stateEl.className = 'oracle-state watch';
    sequence.forEach((idx, i) => {
      setTimeout(() => {
        lightTile(idx, 450);
        if(i === sequence.length - 1){
          setTimeout(() => {
            accepting = true;
            userIdx = 0;
            stateEl.textContent = '➤ NOW REPEAT IT';
            stateEl.className = 'oracle-state repeat';
          }, 600);
        }
      }, 600 + i * 700);
    });
  }

  function newRound(){
    userIdx = 0;
    sequence = [];
    const len = SEQ_LENS[round];
    for(let i = 0; i < len; i++) sequence.push(Math.floor(Math.random() * 4));
    roundEl.textContent = round + 1;
    setTimeout(playSequence, 600);
  }

  function onTileTap(idx){
    if(!accepting || done) return;
    lightTile(idx, 300);
    if(idx === sequence[userIdx]){
      userIdx++;
      if(userIdx >= sequence.length){
        accepting = false;
        round++;
        if(round >= SEQ_LENS.length){
          win();
        } else {
          stateEl.textContent = `✓ ROUND ${round} — NEXT UP…`;
          stateEl.className = 'oracle-state repeat';
          setTimeout(newRound, 1200);
        }
      }
    } else {
      // Wrong tile
      accepting = false;
      const tile = tiles()[idx];
      tile.classList.add('wrong');
      music.errorTone();
      setTimeout(() => tile.classList.remove('wrong'), 500);
      loseWithReveal();
    }
  }

  function startTimer(){
    if(timerId) return;
    timerId = setInterval(() => {
      timeLeft--;
      const m = String(Math.floor(timeLeft / 60)).padStart(2, '0');
      const s = String(timeLeft % 60).padStart(2, '0');
      timerEl.textContent = `${m}:${s}`;
      if(timeLeft <= 10) timerEl.classList.add('low');
      if(timeLeft <= 0){ clearInterval(timerId); loseWithReveal("Time's up."); }
    }, 1000);
  }

  function win(){
    done = true; clearInterval(timerId);
    stateEl.textContent = '✦ THE ORACLE APPROVES ✦';
    stateEl.className = 'oracle-state repeat';
    hintEl.classList.add('reveal-answer');
    hintEl.textContent = 'All three rounds echoed back. The hunt awaits.';
    // Victory chord
    music.gameTone(523, 1.0);
    music.gameTone(659, 1.0);
    music.gameTone(784, 1.2);
    setTimeout(() => completeTrial(3), 1400);
  }

  function loseWithReveal(prefix){
    done = true; clearInterval(timerId); screenFlash();
    stateEl.textContent = prefix ? '✕  ' + prefix + '  ✕' : '✕ WRONG RUNE ✕';
    stateEl.className = 'oracle-state wrong';
    hintEl.classList.add('reveal-answer');
    hintEl.textContent = 'The sequence was: ' + sequence.map(i => tiles()[i].textContent).join(' ');
    // Replay the correct sequence slowly so user sees the answer
    sequence.forEach((idx, i) => {
      setTimeout(() => lightTile(idx, 500), 1200 + i * 700);
    });
    const revealTime = 1200 + sequence.length * 700 + 800;
    setTimeout(() => completeTrial(3), revealTime);
  }

  function build(){
    if(built) return; built = true;
    // Wire tile clicks
    tiles().forEach((tile, i) => {
      tile.addEventListener('click', () => onTileTap(i));
    });
    startBtn.addEventListener('click', () => {
      if(round > 0 || done) return;
      startBtn.disabled = true;
      startTimer();
      newRound();
    });
  }

  const obs = new MutationObserver(() => { if(stage.classList.contains('on')) build(); });
  obs.observe(stage, { attributes: true, attributeFilter: ['class'] });
})();


/* ================================================================
   13) REVEAL — replay
   ================================================================ */
document.getElementById('replay').addEventListener('click', () => show('s-intro'));

})();
