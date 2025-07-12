// clock.js
// (C) 2023‑2025 Andrew Kingdom
(() => {
  'use strict';

  /* ─── GLOBAL CONSTANTS ────────────────────────────────────────────── */
  const PERIOD  = 10;   // seconds between precise markers
  const STROKES = 3;    // beeps per cycle
  const FPS     = 20;   // canvas refresh fps
  const TICK_MS = 100;  // scheduler tick for audio
  const SILENCE = 0.7;  // quiet before final beep

  // Non‑customisable maths helpers
  const PHI = (1 + Math.sqrt(5)) / 2;
  const TAU = 2 * Math.PI;
  const modTau = a => (a % TAU + TAU) % TAU;   // fold any value into 0…2π

  // Spring timing (ms)
  const HOLD_MS = 120;   // pause on old mark
  const OUT_MS  = 110;   // ease out (overshoot)
  const BACK_MS = 120;   // ease back to marker

  // Persistent storage
  const STORAGE_KEY = 'clockSelectedVoice';

  /* ─── UI ELEMENT REFERENCES ──────────────────────────────────────── */
  const staticC   = document.getElementById('staticLayer');
  const staticCtx = staticC.getContext('2d');
  const dynC      = document.getElementById('dynamicLayer');
  const ctx       = dynC.getContext('2d');
  const overlay   = document.getElementById('startOverlay');
  const voiceSel  = document.getElementById('voiceSelect');

  /* ─── STATE ──────────────────────────────────────────────────────── */
  // Audio
  let audioCtx, gainNode, strokeBuf;
  let nextBoundary = 0;
  let beepTimes    = [0, 0, 0];
  let speechTime   = 0;
  const fired      = { beeps: [false, false, false], speech: false };

  // Speech
  let voices = [], selectedVoice = '';
  let meanSpeechDur = 1.0;
  let boundaryDate  = null;

  // Second‑hand spring animation
  let lastSec   = new Date().getSeconds();        // integer second last drawn
  let oldSecAng = modTau((lastSec / 60) * TAU);   // angle we start from
  let newSecAng = oldSecAng;                      // angle to land on
  let animStart = 0;                              // performance.now() of spring start
  let animating = false;

  // Misc UI
  let gestureUnlocked    = false;
  let audioUnlockedCount = STROKES; // skip first few beeps so scheduling stabilises
  let speechUnlocked     = false;
  let muted              = localStorage.getItem('clockMuted') === 'true';

  /* ─── INIT ───────────────────────────────────────────────────────── */
  window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('resize', onResize);
    onResize();
    drawStaticFace();
    startDynamicLoop();
    populateVoices();
  });

  // First gesture unlock for iOS / Chrome autoplay rules
  function onFirstGesture () {
    if (gestureUnlocked) return;
    gestureUnlocked = true;
    overlay.style.display = 'none';
    initAudio();
  }
  document.body.addEventListener('pointerdown', onFirstGesture, { once:true });
  document.body.addEventListener('keydown',    onFirstGesture, { once:true });

  /* ─── VOICES ─────────────────────────────────────────────────────── */
  function populateVoices () {
    voices          = speechSynthesis.getVoices();
    voiceSel.innerHTML = '';

    // Off / strokes‑only options
    const opts = [
      { val:'silent', txt:'🔇 Silent (all off)' },
      { val:'none',   txt:'🎵 No voice (strokes only)' }
    ];
    opts.forEach(o => {
      const el = document.createElement('option');
      el.value = o.val; el.textContent = o.txt;
      voiceSel.appendChild(el);
    });

    // Group real voices by locale for readability
    const groups = voices.reduce((acc,v)=>{
      const [lang,region] = v.lang.toLowerCase().split(/[-_]/);
      const key = region ? `${lang}-${region.toUpperCase()}` : lang;
      (acc[key] = acc[key]||[]).push(v);
      return acc;
    },{});
    const dn = new Intl.DisplayNames([navigator.language],{type:'language'});
    Object.keys(groups).sort().forEach(key=>{
      const og = document.createElement('optgroup');
      og.label = dn.of(key) || key;
      groups[key].forEach(v=>{
        const o = document.createElement('option');
        o.value = v.name; o.textContent = v.name;
        og.appendChild(o);
      });
      voiceSel.appendChild(og);
    });

    // Pick default voice
    const brit = voices.find(v=>v.lang==='en-GB' && /male/i.test(v.name));
    let defaultName = brit? brit.name : (voices[0]?.name || 'none');
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && [...voiceSel.options].some(o=>o.value===saved)) defaultName = saved;
    voiceSel.value   = defaultName;
    selectedVoice    = defaultName;
  }
  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voiceSel.addEventListener('change', () => {
    selectedVoice = voiceSel.value;
    localStorage.setItem(STORAGE_KEY, selectedVoice);
  });

  /* ─── AUDIO ──────────────────────────────────────────────────────── */
  async function initAudio () {
    audioCtx  = new (window.AudioContext||window.webkitAudioContext)();
    gainNode  = audioCtx.createGain();
    gainNode.connect(audioCtx.destination);
    strokeBuf = await createStrokeBuffer(audioCtx);

    setupNextCycle();
    setInterval(tickAudio, TICK_MS);
  }

  // Schedule next beep/voice cycle
  function setupNextCycle () {
    const now        = new Date();
    const secsNow    = now.getSeconds() + now.getMilliseconds()/1000;
    const slotSec    = Math.ceil(secsNow / PERIOD) * PERIOD;
    boundaryDate     = new Date(now.getTime() + (slotSec-secsNow)*1000);

    const ctxNow     = audioCtx.currentTime;
    const leadTime   = (boundaryDate - Date.now())/1000;
    nextBoundary     = ctxNow + leadTime + 0.0005;

    // Beeps at −2 s, −1 s, 0 s
    beepTimes = [2,1,0].map(k => nextBoundary - (STROKES-k-1));

    // Speech timing
    const estDur = Math.max(meanSpeechDur, 1.0);
    let tgt = nextBoundary - SILENCE - estDur;
    const maxLead = STROKES * 1.1;
    if (audioCtx.currentTime + maxLead < tgt) tgt = audioCtx.currentTime + maxLead;
    speechTime = tgt;

    fired.beeps.fill(false);
    fired.speech = false;
  }

  function tickAudio () {
    const now = audioCtx.currentTime;
    beepTimes.forEach((t,i)=>{
      if (!fired.beeps[i] && now>=t) { playBeep(); fired.beeps[i]=true; }
    });
    if (!fired.speech && now>=speechTime) { playSpeech(); fired.speech=true; }
    if (fired.beeps.every(Boolean) && fired.speech) setupNextCycle();
  }

  function playBeep () {
    if (audioUnlockedCount>0) { audioUnlockedCount--; return; }
    if (selectedVoice==='silent'||localStorage.getItem('clockMuted')==='true') return;
    const src = audioCtx.createBufferSource();
    src.buffer = strokeBuf;
    src.connect(gainNode);
    src.start();
  }

  function playSpeech () {
    if (selectedVoice==='silent'||selectedVoice==='none'||audioUnlockedCount>0||localStorage.getItem('clockMuted')==='true') return;
    if (!speechUnlocked) { speechUnlocked=true; return; }

    const vObj  = voices.find(v=>v.name===selectedVoice);
    const lang  = vObj?.lang || 'en-GB';
    const txt   = buildAnnouncement(boundaryDate, lang, STROKES, ordinal);

    if (speechSynthesis.speaking) speechSynthesis.cancel();
    const utt   = new SpeechSynthesisUtterance(txt);
    utt.voice   = vObj || voices.find(v=>v.lang.startsWith(lang.split('-')[0])) || null;
    utt.lang    = utt.voice?.lang || lang;
    const jitter = (b,d)=>b + (Math.random()*2-1)*d;
    utt.rate   = jitter(1.0,0.07);
    utt.pitch  = jitter(1.0,0.08);
    utt.volume = jitter(1.0,0.05);
    utt.onend  = e=>{ meanSpeechDur = 0.25*meanSpeechDur + 0.75*(e.elapsedTime/1000); };
    speechSynthesis.speak(utt);
  }

  function ordinal (n) { return ['st','nd','rd'][n-1]||'th'; }

  /* ─── STATIC DIAL ────────────────────────────────────────────────── */
  function onResize () {
    [staticC,dynC].forEach(c=>{ c.width=innerWidth; c.height=innerHeight; });
    drawStaticFace();
  }

  function drawStaticFace () {
    const w=staticC.width, h=staticC.height, cx=w/2, cy=h/2, r=Math.min(cx,cy)*0.9;

    // outer rim
    const g = staticCtx.createRadialGradient(cx,cy,r*0.95,cx,cy,r);
    g.addColorStop(0,'#ccc'); g.addColorStop(0.5,'#888'); g.addColorStop(1,'#222');
    staticCtx.fillStyle=g; staticCtx.beginPath(); staticCtx.arc(cx,cy,r,0,TAU); staticCtx.fill();

    // face
    staticCtx.fillStyle='#f8f4e6';
    staticCtx.beginPath(); staticCtx.arc(cx,cy,r*0.88,0,TAU); staticCtx.fill();

    // 5‑minute spokes
    staticCtx.save(); staticCtx.translate(cx,cy);
    staticCtx.strokeStyle='rgba(0,0,0,0.05)'; staticCtx.lineWidth=1;
    for (let i=0;i<60;i+=5){
      staticCtx.rotate(i/60*TAU);
      staticCtx.beginPath(); staticCtx.moveTo(r*0.7,0); staticCtx.lineTo(r*0.88,0); staticCtx.stroke();
      staticCtx.rotate(-i/60*TAU);
    }
    staticCtx.restore();

    // numerals
    const nums=['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];
    staticCtx.font=`${r*0.12}px serif`; staticCtx.textAlign='center'; staticCtx.textBaseline='middle'; staticCtx.fillStyle='#333';
    nums.forEach((n,i)=>{
      const ang=i/12*TAU - Math.PI/2;
      staticCtx.fillText(n, cx+Math.cos(ang)*r*0.72, cy+Math.sin(ang)*r*0.72);
    });

    // minute ticks
    for (let i=0;i<60;i++){
      const ang=i/60*TAU, outer=r*0.88, inner=outer-(i%5?r*0.04:r*0.08);
      staticCtx.beginPath(); staticCtx.strokeStyle='#555'; staticCtx.lineWidth=i%5?1.5:3;
      staticCtx.moveTo(cx+Math.cos(ang)*outer, cy+Math.sin(ang)*outer);
      staticCtx.lineTo(cx+Math.cos(ang)*inner, cy+Math.sin(ang)*inner); staticCtx.stroke();
    }
  }

  /* ─── DYNAMIC HANDS ─────────────────────────────────────────────── */
  function startDynamicLoop () {
    setInterval(()=>{ if (!document.hidden) drawDynamic(new Date()); }, 1000/FPS);
  }

  function drawDynamic (now) {
    const w=dynC.width, h=dynC.height, cx=w/2, cy=h/2, r=Math.min(cx,cy)*0.9;
    const tailLen=r*0.07, minLen=0.9;
    ctx.clearRect(0,0,w,h);

    const ms = now.getMilliseconds();
    const secFloat = now.getSeconds();  // crisp tick; add ms/1000 for sweep mode
    const minFloat = now.getMinutes() + (secFloat+ms/1000)/60;
    const hrFloat  = (now.getHours()%12) + minFloat/60;

    /* ── spring state machine ── */
    if (secFloat !== lastSec) {
      lastSec   = secFloat;
      oldSecAng = modTau(newSecAng);
      newSecAng = modTau(secFloat/60 * TAU);
      animStart = performance.now();
      animating = true;
    }

    // --- compute seconds‑hand angle ---
    let sAng;
    if (animating) {
      const MAX_DT = HOLD_MS + OUT_MS + BACK_MS;
      let dt = performance.now() - animStart; if (dt>MAX_DT) dt=MAX_DT;

      let startAng = oldSecAng;
      let endAng   = newSecAng;
      if (endAng <= startAng) endAng += TAU;   // always forward
      const over   = endAng + (TAU/60)*0.10;   // 10 % overshoot

      if      (dt < HOLD_MS)                       sAng = startAng;
      else if (dt < HOLD_MS+OUT_MS)                sAng = lerp(startAng, over, (dt-HOLD_MS)/OUT_MS);
      else if (dt < HOLD_MS+OUT_MS+BACK_MS)        sAng = lerp(over, endAng, (dt-HOLD_MS-OUT_MS)/BACK_MS);
      else { animating=false; sAng=endAng; }
    }
    if (!animating) sAng = newSecAng;   // rest phase — fixed on marker

    /* ── draw hour hand (leaf) ── */
    const hLen = r*0.5, hW=Math.min(hLen/PHI, r*0.03), hAng=modTau(hrFloat/12*TAU);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(hAng);
    ctx.strokeStyle='#333'; ctx.lineWidth=hW;
    const cpY=-hLen*0.4, cpX=hW*2;
    ctx.beginPath(); ctx.moveTo(0,tailLen); ctx.lineTo(-hW,0);
    ctx.quadraticCurveTo(-cpX,cpY,0,-hLen);
    ctx.quadraticCurveTo(cpX,cpY,hW,0); ctx.lineTo(0,tailLen); ctx.closePath(); ctx.stroke(); ctx.restore();

    /* ── minute hand ── */
    const mAng = modTau(minFloat/60*TAU);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(mAng);
    ctx.fillStyle='#333';
    ctx.beginPath(); ctx.moveTo(0,tailLen); ctx.lineTo(-r*0.04,0);
    ctx.lineTo(0,-r*minLen + r*0.04); ctx.lineTo(r*0.04,0); ctx.lineTo(0,tailLen);
    ctx.closePath(); ctx.fill(); ctx.restore();

    /* ── second hand ── */
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(modTau(sAng));
    ctx.strokeStyle='#d00'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(0,tailLen); ctx.lineTo(0,-r*0.85);
    ctx.stroke(); ctx.restore();
  }

  const lerp = (a,b,t)=>a+(b-a)*t;

  /* ─── MUTE BUTTON ───────────────────────────────────────────────── */
  const muteBtn = document.getElementById('muteButton');
  updateMuteButton();
  muteBtn.addEventListener('click',()=>{
    muted=!muted; localStorage.setItem('clockMuted',muted); updateMuteButton();
  });
  function updateMuteButton(){ muteBtn.textContent = muted?'🔇':'🔊'; }

  /* ─── VISIBILITY RESET ──────────────────────────────────────────── */
  document.addEventListener('visibilitychange',()=>{
    if (!document.hidden){
      animating=false;
      lastSec  = new Date().getSeconds();
      newSecAng= oldSecAng = modTau(lastSec/60*TAU);
    }
  });
})();
