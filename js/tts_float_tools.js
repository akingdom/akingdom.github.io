// filename: /js/tts_float_tools.js

(function() {
    // 1. CSS Injection
    const style = document.createElement('style');
    style.textContent = `
        :root { --tts-primary: #157878; --tts-bg: #ffffff; }
        .tts-float-wrapper {
            position: fixed; bottom: 20px; right: 20px;
            z-index: 10000; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            display: flex; flex-direction: column; align-items: flex-end; gap: 12px;
        }
        .tts-palette {
            background: var(--tts-bg); border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            padding: 16px; display: none; flex-direction: column; gap: 12px;
            width: 240px; border: 1px solid rgba(0,0,0,0.1);
        }
        .tts-palette.expanded { display: flex; }
        .tts-main-fab {
            width: 50px; height: 50px; border-radius: 50%;
            background: var(--tts-primary); color: white;
            border: none; cursor: pointer; font-size: 22px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            display: flex; align-items: center; justify-content: center;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .tts-main-fab:hover { transform: scale(1.05); }
        .tts-main-fab:active { transform: scale(0.95); }
        .tts-controls { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .tts-btn {
            padding: 10px; border-radius: 8px; border: 1px solid #eee;
            background: #fff; cursor: pointer; font-size: 16px; transition: background 0.2s;
        }
        .tts-btn:hover { background: #f5f5f5; border-color: #ddd; }
        .tts-field { font-size: 13px; color: #444; display: flex; flex-direction: column; gap: 6px; }
        #tts-speed { cursor: pointer; accent-color: var(--tts-primary); }
        #tts-float-voice { 
            padding: 6px; border-radius: 4px; border: 1px solid #ddd; 
            font-size: 12px; max-width: 100%; 
        }
        @media (max-width: 600px) {
            .tts-float-wrapper { bottom: 15px; right: 15px; }
            .tts-palette { width: 200px; }
        }
    `;
    document.head.appendChild(style);

    // 2. The Logic Controller
    window.TTS_Float = {
        init: function() {
            this.injectHTML();
            this.setupListeners();
            this.initializeCoreTTS();
        },

        injectHTML: function() {
            const wrapper = document.createElement('div');
            wrapper.className = 'tts-float-wrapper';
            wrapper.innerHTML = `
                <div id="tts-palette" class="tts-palette">
                    <div class="tts-controls">
                        <button class="tts-btn" onclick="TTS.play()" title="Play/Resume">▶</button>
                        <button class="tts-btn" onclick="TTS.pause()" title="Pause">⏸</button>
                        <button class="tts-btn" onclick="TTS_Float.playFromTop()" title="Read from Viewport">📍</button>
                    </div>
                    <div class="tts-field">
                        <label>Speed: <b><span id="tts-speed-val">0.95</span>x</b></label>
                        <input type="range" id="tts-speed" min="0.5" max="2.0" step="0.05" value="0.95">
                    </div>
                    <div class="tts-field">
                        <label>Voice:</label>
                        <select id="tts-float-voice"></select>
                    </div>
                </div>
                <button id="tts-fab" class="tts-main-fab" title="Speech Controls">🎧</button>
            `;
            document.body.appendChild(wrapper);
        },

        initializeCoreTTS: function() {
            if (!window.TTS) return;

            TTS.init({
                container: "#audio-container", // Optional back-compat
                voiceSelector: "#tts-float-voice",
                textProvider: function () {
                    const root = document.querySelector('.markdown-body') || document.body;
                    const clone = root.cloneNode(true);
                    // Filter out non-content elements
                    const selectors = 'header, nav, .audio-controls, .tts-float-wrapper, script, style, #qrcode, h1, #skip-to-content';
                    clone.querySelectorAll(selectors).forEach(el => el.remove());
                    return clone.innerText.trim();
                }
            });
        },

        setupListeners: function() {
            const fab = document.getElementById('tts-fab');
            const palette = document.getElementById('tts-palette');
            const speedSlider = document.getElementById('tts-speed');
            const speedVal = document.getElementById('tts-speed-val');

            fab.addEventListener('click', () => {
                const isExpanded = palette.classList.toggle('expanded');
                fab.innerHTML = isExpanded ? '✕' : '🎧';
                fab.style.background = isExpanded ? '#666' : 'var(--tts-primary)';
            });

            speedSlider.addEventListener('input', (e) => {
                const val = e.target.value;
                speedVal.textContent = val;
                // Update speech rate globally if possible, or trigger a re-speak
                if (window.speechSynthesis.speaking) {
                    // Small hack: pause/resume can sometimes force rate updates in some browsers
                    // but usually requires a fresh Utterance.
                }
            });
        },

        playFromTop: function() {
            // 1. Identify the 'active' content area
            const contentArea = document.querySelector('.main-content') || document.querySelector('.markdown-body');
            if (!contentArea) return;
        
            // 2. Define the offset to get past the Top Bar/Header
            const scrollOffset = 150; 
        
            // 3. Find all readable elements specifically within the content area
            const elements = contentArea.querySelectorAll('p, h2, h3, blockquote, li');
            let foundElement = null;
        
            for (let el of elements) {
                const rect = el.getBoundingClientRect();
                
                // Check if the element is below the header and within the viewport
                if (rect.top >= scrollOffset && rect.top <= window.innerHeight) {
                    foundElement = el;
                    break;
                }
            }
        
            // 4. Fallback: If at the very top or scrolled past everything, start at the beginning
            if (!foundElement && elements.length > 0) {
                foundElement = elements[0];
            }
        
            if (foundElement) {
                console.log("TTS: Targeted start found at:", foundElement.innerText.substring(0, 30) + "...");
        
                // 5. THE BRIDGE
                // We set the pointer for the 'textProvider' you defined in the template
                window.TTS_StartElement = foundElement;
        
                // 6. TRIGGER
                // We use window.TTS.restart() because it handles synth.cancel() 
                // and the 'speaking' CSS classes in your core engine correctly.
                if (window.TTS && typeof window.TTS.restart === "function") {
                    window.TTS.restart();
                } else if (window.TTS) {
                    window.TTS.play();
                }
            }
        }
    };

    // Auto-run when the DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => TTS_Float.init());
    } else {
        TTS_Float.init();
    }
})();
