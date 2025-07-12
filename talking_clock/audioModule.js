// audioModule.js  ── tuned to StrokeToneLowPassEnd.aiff
// (C) 2023-2025 Andrew Kingdom
async function createStrokeBuffer(
  audioCtx,
  {
    /* Core pitch & timing ----------------------------------------------- */
    frequency      = 1_000,      // Fundamental ≈ 1 kHz
    duration       = 0.1184,     // 5 221 samples @ 44 100 Hz
    /* Amplitude envelope (all in seconds) ------------------------------- */
    attack         = 0.003,      // Very quick rise
    decay          = 0.040,      // Ease down to the plateau
    sustainTime    = 0.049,      // Length of plateau before the spike
    release        = 0.016,      // Fall‑off after spike
    /* Envelope levels (0 – 1) ------------------------------------------ */
    initialPeak    = 0.35,       // Level reached at end of attack
    plateauLevel   = 0.30,       // Quasi‑sustain level
    spikeLevel     = 0.45,       // Short emphasis just before release
    /* Filter & oscillator ---------------------------------------------- */
    lowpass        = 2_500,      // Matches mellow roll‑off in sample
    qFactor        = 0.707,      // Butterworth (maximally flat)
    oscillatorType = 'sine'      // Sample shows minimal over‑tones
  } = {}
) {
  /* --------------------------------------------------------------------
     1.  Prepare an OfflineAudioContext large enough for the whole note
     ------------------------------------------------------------------ */
  const { sampleRate } = audioCtx;
  const frameCount     = Math.ceil(sampleRate * duration);
  const offCtx         = new OfflineAudioContext(1, frameCount, sampleRate);

  /* --------------------------------------------------------------------
     2.  Build signal chain   Oscillator → Gain(ADSR) → LPF → Destination
     ------------------------------------------------------------------ */
  const osc     = offCtx.createOscillator();
  const gain    = offCtx.createGain();
  const lpf     = offCtx.createBiquadFilter();

  osc.frequency.value = frequency;
  osc.type            = oscillatorType;

  lpf.type            = 'lowpass';
  lpf.frequency.value = lowpass;
  lpf.Q.value         = qFactor;

  /* --------------------------------------------------------------------
     3.  Programme amplitude curve (times are absolute, relative to 0 s)
         ——┬──peak───decay───plateau─────┬ spike ┬─release───┬ zero
           │          ↓                  │       │            ↓
     level 0──────────┐                  │       │            └──────────
                      └initialPeak       │       │
                                          plateau│
                                                 spikeLevel
     ------------------------------------------------------------------ */
  const atkEnd   = attack;                                // ~0.003 s
  const decEnd   = atkEnd + decay;                        // ~0.043 s
  const platEnd  = decEnd + sustainTime;                  // ~0.092 s
  const spikePos = platEnd;                               // ~0.092 s
  const relEnd   = spikePos + release;                    // ~0.108 s

  gain.gain.setValueAtTime(0,              0);
  gain.gain.linearRampToValueAtTime(initialPeak, atkEnd);
  gain.gain.linearRampToValueAtTime(plateauLevel, decEnd);
  gain.gain.setValueAtTime(plateauLevel,  decEnd);
  gain.gain.setValueAtTime(plateauLevel,  platEnd);
  gain.gain.linearRampToValueAtTime(spikeLevel,  spikePos);
  gain.gain.linearRampToValueAtTime(0,           relEnd);

  /* Connect & render */
  osc.connect(gain).connect(lpf).connect(offCtx.destination);
  osc.start(0);
  osc.stop(duration);

  return offCtx.startRendering();
}
