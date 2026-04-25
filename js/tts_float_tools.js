// filename: /js/tts_float_tools.js

(function() {
    // 1. CSS Injection
    const style = document.createElement('style');
    style.textContent = `
        :root { --tts-primary: #157878; --tts-bg: #ffffff; }
        .tts-float-wrapper {
            position: fixed; bottom: 20px; right: 20px;
            z-index: 10000; font-family: sans-serif;
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
            display: flex; align-items: center; justify-content: center;
        }
        .tts-controls { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .tts-btn {
            padding: 10px; border-radius: 8px; border: 1px solid #eee;
            background: #fff; cursor: pointer; font-size: 16px;
        }
        .tts-field { font-size: 13px; color: #444; display: flex; flex-direction: column; gap: 6px; }
        #tts-float-voice { padding: 4px; font-size: 12px; }
    `;
    document.head.appendChild(style);

    // 2. The Logic Controller
    window.TTS_Float = {
        init: function() {
            this.injectHTML();
            this.setupListeners();
            // initializeCoreTTS IS GONE. Jekyll template handles the init.
        },

        injectHTML: function() {
            const wrapper = document.createElement('div');
            wrapper.className = 'tts-float-wrapper';
            wrapper.innerHTML = `
                <div id="tts-palette" class="tts-palette">
                    <div class="tts-controls">
                        <button class="tts-btn" onclick="TTS.play()">▶</button>
                        <button class="tts-btn" onclick="TTS.pause()">⏸</button>
                        <button class="tts-btn" onclick="TTS_Float.playFromTop()">📍</button>
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
                <button id="tts-fab" class="tts-main-fab">🎧</button>
            `;
            document.body.appendChild(wrapper);
        },

        setupListeners: function() {
            const fab = document.getElementById('tts-fab');
            const palette = document.getElementById('tts-palette');
            const speedSlider = document.getElementById('tts-speed');
            const speedVal = document.getElementById('tts-speed-val');

            fab.addEventListener('click', () => {
                const isExpanded = palette.classList.toggle('expanded');
                fab.innerHTML = isExpanded ? '✕' : '🎧';
            });

            speedSlider.addEventListener('input', (e) => {
                speedVal.textContent = e.target.value;
            });
        },

        playFromTop: function() {
            const contentArea = document.querySelector('.main-content') || document.querySelector('.markdown-body');
            if (!contentArea) return;
        
            const scrollOffset = 150; 
            const elements = contentArea.querySelectorAll('p, h2, h3, blockquote, li');
            let foundElement = null;
        
            for (let el of elements) {
                const rect = el.getBoundingClientRect();
                if (rect.top >= scrollOffset && rect.top <= window.innerHeight) {
                    foundElement = el;
                    break;
                }
            }
        
            if (!foundElement && elements.length > 0) foundElement = elements[0];
        
            if (foundElement) {
                // Bridge to the Jekyll Template's Range-based textProvider
                window.TTS_StartElement = foundElement;
                if (window.TTS && typeof window.TTS.restart === "function") {
                    window.TTS.restart();
                } else if (window.TTS) {
                    window.TTS.play();
                }
            }
        }
    };

    // Auto-run
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => window.TTS_Float.init());
    } else {
        window.TTS_Float.init();
    }
})();
