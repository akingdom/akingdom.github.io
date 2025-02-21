// tts.js
this.versions={...(this.versions||{}), tts:'1.0.8'};
// Text-to-speech, example usage included at end of this file.
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
	selector.id = "voiceSelector"; // Add an ID for easy selection (optional)
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

    // Language Detection and Initial Voice Selection (Correctly placed):
    let selectedLanguage;
    const preferredLanguages = navigator.languages;
    if (preferredLanguages && preferredLanguages.length > 0) {
		for (const lang of preferredLanguages) {
			const availableVoices = speechSynthesis.getVoices().filter(voice => voice.lang.startsWith(lang));
			if (availableVoices.length > 0) {
				selectedLanguage = lang;
				break;
			}
		}
    }

    if (!selectedLanguage) {
        const browserLanguage = navigator.language;
            const availableVoices = speechSynthesis.getVoices().filter(voice => voice.lang.startsWith(browserLanguage));
            if (availableVoices.length > 0) {
                selectedLanguage = browserLanguage;
            }
    }

    if (!selectedLanguage) {
        selectedLanguage = 'en-US'; // Fallback default
	}

	const availableVoices = speechSynthesis.getVoices().filter(voice => voice.lang.startsWith(selectedLanguage));

	if (availableVoices.length > 0) {
		let initialVoiceIndex = localStorage.getItem(storageKey);
		if (initialVoiceIndex && availableVoices[initialVoiceIndex] && availableVoices[initialVoiceIndex].lang.startsWith(selectedLanguage)) {
			config.voiceSelector.value = initialVoiceIndex;
		} else {
			config.voiceSelector.value = 0;
		}
	} else {
		console.error("No suitable voices found for selected language. Using fallback.");
		config.voiceSelector.value = -1;
	}
}

  // Speak the provided text using the selected voice.
  function speak(text) {
    if (!text) return;
	// Clear any previous utterances
	window.speechSynthesis.cancel();
	  
    const utterance = new SpeechSynthesisUtterance(text);

        const selectedVoiceIndex = config.voiceSelector.value;
        if (selectedVoiceIndex >= 0 && voices[selectedVoiceIndex]) {
            utterance.voice = voices[selectedVoiceIndex];
        } else {
            console.error("No voice selected or available.");
            return;
    }

        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

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

/*
// Example usage in your HTML:
document.addEventListener('DOMContentLoaded', () => {  // Wait for the DOM to load
    TTS.init({
        speakButton: '#speakButton',
        toggleButton: '#toggleVoiceSelector',
        voiceSelector: '#voiceSelector', // If you have a pre-existing selector
        textProvider: function () {
            return document.getElementById('markdown-container').innerText;
        }
    });

    // Example of calling speak directly (e.g., after some event)
    const someText = "This is some example text.";
    const speakButton = document.getElementById("speakButton");
    speakButton.addEventListener("click", () => {
        TTS.speak(someText);
    })

    // Show/hide Example
    const showButton = document.getElementById("showButton");
    showButton.addEventListener("click", () => {
        TTS.show();
    })
    const hideButton = document.getElementById("hideButton");
    hideButton.addEventListener("click", () => {
        TTS.hide();
    })

});
// Clear the default voice if desired for testing
// localStorage.removeItem('selectedVoice'); 
*/
