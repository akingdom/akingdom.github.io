// tts.js
this.versions={...(this.versions||{}), tts:'1.0.12'};
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
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nameA.localeCompare(nameB);
    });

    let selectedLanguage = localStorage.getItem(storageKey);
    if (selectedLanguage && !voices.some(voice => voice.lang === selectedLanguage)) {
      selectedLanguage = null; // Reset if stored language is not available
    }

    if (!selectedLanguage) {
      const defaultVoice = voices.find(voice => voice.default);
      if (defaultVoice) {
        selectedLanguage = defaultVoice.lang;
      }
    }

    if (!selectedLanguage) {
      const preferredLanguages = navigator.languages || [];
      selectedLanguage = preferredLanguages.find(lang =>
        voices.some(voice => voice.lang.startsWith(lang))
      );
    }

    if (!selectedLanguage) {
      const browserLanguage = navigator.language;
      if (voices.some(voice => voice.lang.startsWith(browserLanguage))) {
        selectedLanguage = browserLanguage;
      }
    }

    if (!selectedLanguage) {
      selectedLanguage = 'en-GB';
    }

    let defaultIndex = -1;
    voices.forEach((voice, index) => {
      const option = document.createElement('option');
      option.value = voice.lang;
      option.textContent = `${voice.name} (${voice.lang})`;
      config.voiceSelector.appendChild(option);
      if (voice.lang === selectedLanguage && defaultIndex === -1) {
        defaultIndex = index;
      }
    });

    if (defaultIndex !== -1) {
      config.voiceSelector.selectedIndex = defaultIndex;
      localStorage.setItem(storageKey, selectedLanguage);
    }
  }

  // Initialize the voice selector element.
  function initVoiceSelector() {
    // Resolve the element if a selector was passed.
   config.voiceSelector = resolveElement(config.voiceSelector) || createVoiceSelector();
    if (!config.voiceSelector.parentNode) {
      document.body.appendChild(config.voiceSelector);
    }

    populateVoiceSelector();

    config.voiceSelector.addEventListener('change', () => {
      const selectedLang = config.voiceSelector.value;
      localStorage.setItem(storageKey, selectedLang);
    });

    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceSelector;
    }
}

  // Speak the provided text using the selected voice.
  function speak(text) {
    if (!text) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedLang = config.voiceSelector.value;
    const selectedVoice = voices.find(voice => voice.lang === selectedLang);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      console.error('No matching voice found.');
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
  
  function noPreference() {
    localStorage.removeItem(storageKey);
    if (config.voiceSelector) {
	config.voiceSelector.selectedIndex = -1;
    }
    initVoiceSelector(); // Re-trigger voice selection after clearing
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
    hide: hide,
    noPreference: noPreference
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
// TTS.noPreference();
*/
