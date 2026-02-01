<!-- QR Code -->
<style>
/* 1. Target the GitHub markdown wrapper */
.markdown-body {
  position: relative;
}
/* 2. Override the inline absolute and float the QR code */
#qrcode {
  position: static !important;
  float: right;
  margin: 1em;       /* space around the QR */
  width: 8em;        /* your desired size */
  height: 8em;
}
/* 3. Ensure the first heading clears the QR float */
.markdown-body > h1:first-child,
.markdown-body > h2:first-child {
  clear: left;
  margin-top: 0;     /* remove any unwanted gap */
}

</style>
<div id="qrcode">
</div>
<script src="../js/qrcode.js"></script>
<script>// Updated QR code display for github websites.
(function(){
  function init(){
    const container = document.getElementById('qrcode');
    if (!container) return;

    // 1. Figure out the CSS size in px
    const cssW = container.clientWidth;
    const cssH = container.clientHeight;
    const dpr  = window.devicePixelRatio || 1;

    // 2. Generate a DPR-aware QR
    new QRCode(container, {
      text: location.href,
      width:  cssW * dpr,
      height: cssH * dpr,
      correctLevel: QRCode.CorrectLevel.H
    });

    // 3. Grab the visible element (img first, then canvas)
    const el = container.querySelector('img') || container.querySelector('canvas');
    if (!el) return;

    // 4. Force it back to CSS pixel size
    el.style.width  = cssW + 'px';
    el.style.height = cssH + 'px';
    el.style.display = 'block';
  }

  // Run at DOM ready, even if script is injected after the event
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
  
<!-- SPEECH -->
<style>

/* Text-to-speech - Hide pause by default, hide play when active */
/* Update: Added !important to force the toggle */
#pause-btn { display: none !important; }
.speaking #play-btn { display: none !important; }
.speaking #pause-btn { display: inline-block !important; }

/* The rest is for mobile-friendly sizing */
.audio-controls { margin: 1em 0; display: flex; gap: 10px; }
.audio-controls button {
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
  font-size: 16px;
  cursor: pointer;
}
</style><script>// text to speech (notoriouly finicky to get right)
(function() {
    const synth = window.speechSynthesis;
    let isPaused = false;

    // A helper to get the container safely
    function getContainer() {
        return document.getElementById('audio-container');
    }

    // Heartbeat: Automatic switch back when finished
    setInterval(() => {
        const container = getContainer();
        if (container && !synth.speaking && !isPaused) {
            container.classList.remove('speaking');
        }
    }, 300);

    function getCleanText() {
        const root = document.querySelector('.markdown-body') || document.body;
        const clone = root.cloneNode(true);
        const selectors = 'header, nav, .audio-controls, script, style, #qrcode, h1';
        clone.querySelectorAll(selectors).forEach(el => el.remove());
        return clone.innerText.trim();
    }

    window.speechControl = {
        play: function() {
            const container = getContainer();
            if (!container) return;

            if (isPaused) {
                synth.resume();
                isPaused = false;
                container.classList.add('speaking');
            } else {
                synth.cancel();
                const utterance = new SpeechSynthesisUtterance(getCleanText());
                utterance.rate = 0.95;
                
                // Backup for standard-compliant browsers
                utterance.onend = () => {
                    isPaused = false;
                    container.classList.remove('speaking');
                };

                synth.speak(utterance);
                container.classList.add('speaking');
                isPaused = false;
            }
        },
        pause: function() {
            const container = getContainer();
            synth.pause();
            isPaused = true;
            if (container) container.classList.remove('speaking');
        },
        restart: function() {
            synth.cancel();
            isPaused = false;
            const container = getContainer();
            if (container) container.classList.remove('speaking');
            this.play();
        }
    };
})();
</script>
<div class="audio-controls" id="audio-container">
    <button id="play-btn" onclick="speechControl.play()">▶ Listen to this guide</button>
    <button id="pause-btn" onclick="speechControl.pause()">⏸ Pause</button>
    <button id="restart-btn" onclick="speechControl.restart()">🔄 Restart</button>
</div>

# Understanding the Trap: Why facing the "bad times" is the way out.


*A guide on how to be honest about the mess so you can finally move through it.*
When you’re going through a rough patch, it helps to look at it like you’re a detective trying to figure out how a trap works. If you don't slow down to see exactly what’s holding you back, you never really get the chance to cry or be sad about it—and strangely, being honest about that sadness is the only way to finally feel better and move into a happier space.
A lot of people hate "positive thinking" or "affirmations" because they feel fake. If you just tell yourself "I’m happy" when you’re actually hurting, you’re just ignoring the problem, which keeps you stuck. It’s like trying to pretend a trap isn't there while it’s still clamped on your leg.
But there’s a big difference between **pretending** and **telling the truth.** >
* **Pretending (Delusional):** Ignoring the trap and hoping it goes away.
* **Telling the Truth (Grounded):** Saying, "Yes, this trap is real and it hurts, but I am not alone, and there is a way through this even if I can't see it all yet."


The goal is to study the "bad time" so you can see how it’s built. Once you understand it, you aren't just a victim anymore. You’re mapping out the mess so you can take it apart, piece by piece—sometimes by yourself, and sometimes with a bit of help.
In the end, it’s not just about getting out of the trap; it’s about becoming the kind of person who knows how traps work. That way, you can keep yourself safe in the future. You move from being "stuck" to being someone who has the power to find the exit, so the "bad times" don't get to tell you who you are anymore.
Once you’re out, those same honest truths act like a shield, helping you stay free and keep your space peaceful.

