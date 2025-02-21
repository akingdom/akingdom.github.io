// tts.js
this.versions={...(this.versions||{}), tts:'1.0.5'};
/* Text-to-speech, example usage:
  <script>
    // Initialize TTS with element references via parameters.
        TTS.init({
          speakButton: '#speakButton',
          toggleButton: '#toggleVoiceSelector',
          // Optionally, you can provide a pre-created voice selector element.
          // If omitted, one will be created and appended to the document.
          voiceSelector: null,
          // Function that returns the text to be spoken (using the rendered Markdown).
          textProvider: function() {
            return document.getElementById('markdown-container').innerText;
          }
        });
  </script>
*/
// tts.js
(function() {
  let voices = [];
  let config = {
    speakButton: null,     // Element or selector for the speak button
    toggleButton: null,    // Element or selector for the voice options toggle button
    voiceSelector: null,   // Element or selector for the voice dropdown (optional)
    textProvider: null     // Function that returns the text to speak
  };
  const storageKey = 'selectedVoice';

  // Helper to resolve a DOM element from a selector or element reference.
  function resolveElement(el) {
    if (typeof el === 'string') {
      return document.querySelector(el);
    }
    return el;
  }

  // Create a voice selector element if none is provided.
  function createVoiceSelector() {
    const selector = document.createElement('select');
    selector.style.display = 'none'; // Hidden by default
    return selector;
  }

  // Populate the voice selector with available voices.
  function populateVoiceSelector() {
		voices = window.speechSynthesis.getVoices();
		if (!config.voiceSelector) return;
		config.voiceSelector.innerHTML = '';

		// Sort voices by language (primary), then by name (secondary)
		voices.sort((a, b) => {
				const langA = a.lang.toLowerCase();
				const langB = b.lang.toLowerCase();
				if (langA < langB) return -1;
				if (langA > langB) return 1;
				// Same language, sort by name
				const nameA = a.name.toLowerCase();
				const nameB = b.name.toLowerCase();
				if (nameA < nameB) return -1;
				if (nameA > nameB) return 1;
				return 0; // Exactly the same.
		});

		voices.forEach((voice, index) => {
				const option = document.createElement('option');
				option.value = index;
				option.textContent = `${voice.name} (${voice.lang})`;
				config.voiceSelector.appendChild(option);
		});

		const savedVoiceIndex = localStorage.getItem(storageKey);
		if (savedVoiceIndex && voices[savedVoiceIndex]) {
				config.voiceSelector.value = savedVoiceIndex;
		}
	}

  // Initialize the voice selector element.
  function initVoiceSelector() {
    // Resolve the element if a selector was passed.
    config.voiceSelector = resolveElement(config.voiceSelector);
    if (!config.voiceSelector) {
      config.voiceSelector = createVoiceSelector();
      document.body.appendChild(config.voiceSelector);
    }
    populateVoiceSelector();
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceSelector;
    }
    config.voiceSelector.addEventListener('change', () => {
      localStorage.setItem(storageKey, config.voiceSelector.value);
    });
  }

  // Speak the provided text using the selected voice.
  function speak(text) {
    if (!text) return;
	// Clear any previous utterances
	window.speechSynthesis.cancel();
	  
    const utterance = new SpeechSynthesisUtterance(text);
	utterance.rate = 1;      // Normal speed == 1
	utterance.pitch = 1;     // Normal pitch == 1
	utterance.volume = 1;    // Normal volume (0 to 1) == 1
    if (config.voiceSelector && voices[config.voiceSelector.value]) {
      utterance.voice = voices[config.voiceSelector.value];
    }
    window.speechSynthesis.speak(utterance);
  }

  // Attach listener to the speak button.
  function attachSpeakButtonListener() {
    const btn = resolveElement(config.speakButton);
    if (btn && typeof config.textProvider === 'function') {
      btn.addEventListener('click', function() {
        const text = config.textProvider();
        speak(text);
      });
    }
  }

  // Attach listener to the toggle button (to show/hide the voice selector).
  function attachToggleButtonListener() {
    const btn = resolveElement(config.toggleButton);
    if (btn && config.voiceSelector) {
      btn.addEventListener('click', function() {
        config.voiceSelector.style.display = 
          (config.voiceSelector.style.display === 'none' || config.voiceSelector.style.display === '')
            ? 'block'
            : 'none';
      });
    }
  }

  function show() {
      const elements = [
        resolveElement(config.speakButton),
        resolveElement(config.toggleButton)
//         ,resolveElement(config.voiceSelector)
	  ];
	elements.forEach((e) => {
	  if(e != undefined) e.style.display = 'block';
    });
  }

  function hide() {
      const elements = [
        resolveElement(config.speakButton),
        resolveElement(config.toggleButton),
        resolveElement(config.voiceSelector)
	  ];
	elements.forEach((e) => {
	  if(e != undefined) e.style.display = 'none';
    });
  }
  
  
  
  // Expose the TTS object with init and speak functions.
  window.TTS = {
    /**
     * Initialize TTS with configuration options.
     * Options:
     *   - speakButton: Element or selector for the speak button.
     *   - toggleButton: Element or selector for the toggle button for voice options.
     *   - voiceSelector: Element or selector for the voice dropdown (optional).
     *   - textProvider: Function returning the text to speak.
     */
    init: function(options) {
      config = Object.assign({}, config, options);
      initVoiceSelector();
      attachSpeakButtonListener();
      attachToggleButtonListener();
    },
    speak: speak,
    show: show,
    hide: hide
  };
})();
