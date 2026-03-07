# Browser Text-to-Speech (TTS)

`tts.js`

A **lightweight, dependency-free text-to-speech system** for static websites and documentation.

It uses the browser’s built-in **Web Speech API**, so there are:

* 🚫 **No external services**
* 🚫 **No API keys**
* 🚫 **No tracking**
* 🚫 **No bandwidth cost**

Everything runs **locally in the user's browser**.

---

# Why use it?

### 🧠 Accessibility

Allows users to **listen to content instead of reading**.

Helpful for:

* vision impairment
* dyslexia
* fatigue or cognitive overload
* multitasking

---

### 📱 Mobile friendly

Users can **listen while scrolling** or doing other tasks.

---

### ⚡ Fast and lightweight

* ~10KB JS
* no dependencies
* works on static sites

---

### 🔒 Privacy-friendly

Unlike cloud TTS services:

* no text is sent to servers
* no usage tracking
* no API costs

---

### 🌍 Multilingual support

Uses **all voices installed in the user's system**.

Typical browsers provide:

* multiple English voices
* many international voices
* male and female variants

---

# Features

✔ Play / Pause / Restart
✔ Voice selection
✔ Resume from position
✔ Works with dynamic content extraction
✔ Automatic preferred language detection
✔ Mobile-friendly controls
✔ Handles browser speech engine quirks

---

# Quick Example

Add controls anywhere in your page.

```html
<!-- SPEECH -->
<style>

/* Hide pause by default, show when speaking */
#pause-btn { display: none !important; }
.speaking #play-btn { display: none !important; }
.speaking #pause-btn { display: inline-block !important; }

/* Mobile friendly layout */
.audio-controls { margin: 1em 0; display: flex; gap: 10px; }

.audio-controls button {
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
  font-size: 16px;
  cursor: pointer;
}

#voice-select {
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 6px;
  max-width: 10rem;
}

</style>

<script src="../js/tts.js"></script>

<script>
document.addEventListener("DOMContentLoaded", () => {

  TTS.init({
    container: "#audio-container",
    voiceSelector: "#voice-select",

    textProvider: function () {

      const root = document.querySelector('.markdown-body') || document.body;
      const clone = root.cloneNode(true);

      const selectors =
        'header, nav, .audio-controls, script, style, #qrcode, h1, #skip-to-content';

      clone.querySelectorAll(selectors).forEach(el => el.remove());

      return clone.innerText.trim();
    }
  });

});
</script>

<div class="audio-controls" id="audio-container">

  <select id="voice-select"></select>

  <button id="play-btn" onclick="speechControl.play()">▶ Speak</button>
  <button id="pause-btn" onclick="speechControl.pause()">⏸ Pause</button>
  <button id="restart-btn" onclick="speechControl.restart()">🔄 Re-Speak</button>

</div>
```

---

# How it works

1. The page extracts readable text via `textProvider()`
2. The script creates a `SpeechSynthesisUtterance`
3. The browser's speech engine reads the content aloud
4. Users can pause, resume, restart, or change voice

---

# Browser Support

Supported in all modern browsers:

| Browser | Status                          |
| ------- | ------------------------------- |
| Chrome  | ✔ Full                          |
| Edge    | ✔ Full                          |
| Safari  | ✔ Works (voice loading delayed) |
| Firefox | ⚠ Partial                       |

Firefox supports the API but often **does not provide voices by default**.

---

# Limitations

These are limitations of the **Web Speech API itself**:

* Voice quality depends on the user’s system
* Voice availability varies by OS
* Some browsers require **a short delay after `cancel()` before `speak()`**
* Boundary events are approximate

The library includes workarounds for the most common issues.

---

# Recommended Use Cases

Ideal for:

* documentation sites
* blogs
* knowledge bases
* accessibility improvements
* static sites (Hugo, Jekyll, MkDocs, etc.)

---

# Future Improvements

Possible enhancements:

* sentence chunking for long texts
* speech progress indicator
* reading highlight
* speed control
* auto-scroll

---

# Summary

This script provides a **simple, private, zero-cost way to add text-to-speech to any website**.

Perfect for **improving accessibility with minimal complexity**.
