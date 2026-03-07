// tts.js
window.versions={...(window.versions||{}), tts:'1.2.0'};

// Text-to-speech, example usage included at end of this file.
// 1.1.0 - updated with heartbeat monitoring and paused state tracking.
// 1.2.0 - merged inline speechControl UI behaviour (play/pause container toggle)
(function() {

const synth = window.speechSynthesis;

let voices = [];
let currentUtterance = null;

let config = {
  speakButton: null,
  toggleButton: null,
  voiceSelector: null,
  textProvider: null,
  container: null, // 1.2.0 (for speaking CSS state)
  isInitialized: false
};

const storageKey = 'selectedVoiceLang';

let isPaused = false;
let speaking = false;


/* ------------------------------
   Helpers
--------------------------------*/

function resolveElement(el){
  return typeof el === "string" ? document.querySelector(el) : el;
}

function getContainer(){ //1.2.0
  return resolveElement(config.container) || document.getElementById("audio-container");
}

function setSpeakingUI(active){ //1.2.0
  const container = getContainer();
  if(!container) return;

  if(active){
    container.classList.add("speaking");
  }else{
    container.classList.remove("speaking");
  }
}

function getVoicesSorted() {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  voices.sort((a,b)=>{
    const la=a.lang.toLowerCase();
    const lb=b.lang.toLowerCase();
    if(la!==lb) return la.localeCompare(lb);
    return a.name.localeCompare(b.name);
  });

  return voices;
}

function selectPreferredLang(voices) {

  let selectedLang = localStorage.getItem(storageKey);

  if (selectedLang && !voices.some(v => v.lang === selectedLang)) {
    selectedLang = null;
  }

  // FAILS - Safari sets default voice to the first voice ALWAYS. Reminder: don't implement this.
  // if (!selectedLang) {
  //   const defaultVoice = voices.find(voice => voice.default);
  //   if (defaultVoice) {
  //     selectedLang = defaultVoice.lang;
  //   }
  // }

  if (!selectedLang) {
    const preferredLanguages = navigator.languages || [];

    selectedLang = preferredLanguages.find(lang =>
      voices.some(v => v.lang.startsWith(lang))
    );

    if (!selectedLang) {
      const browserLanguage = navigator.language;

      if (voices.some(v => v.lang.startsWith(browserLanguage))) {
        selectedLang = browserLanguage;
      }
    }

    if (!selectedLang) {
      selectedLang = 'en-GB';
    }
  }

  return selectedLang;
}

function getVoice() {

  const voices = getVoicesSorted();

  if(!voices.length) return null;

  let selectedLang =
    config.voiceSelector?.value ||
    selectPreferredLang(voices);

  const voice = voices.find(v => v.lang === selectedLang)
    || voices.find(v => v.lang.startsWith(selectedLang))
    || voices[0];

  if(voice){
    localStorage.setItem(storageKey, voice.lang);
  }

  return voice;
}

// Populate the voice selector with available voices.
function populateVoiceSelector(){

  const voices = getVoicesSorted();

  if(!config.voiceSelector) return;

  config.voiceSelector.innerHTML = "";

  const preferredLang = selectPreferredLang(voices);

  let defaultIndex = -1;

  voices.forEach((voice, index)=>{

    const option = document.createElement('option');
    option.value = voice.lang;
    option.textContent = `${voice.name} (${voice.lang})`;

    if (voice.lang === preferredLang && defaultIndex === -1) {
      defaultIndex = index;
    }

    config.voiceSelector.appendChild(option);
  });

  if(defaultIndex !== -1){
    config.voiceSelector.selectedIndex = defaultIndex;
  }
}

// Create a voice selector element if none is provided.
function createVoiceSelector() {
  const selector = document.createElement('select');
  selector.style.display = 'none'; // Hidden by default
  selector.id = 'voiceSelector'; // Add an ID for easy selection (optional)
  return selector;
}

/* ------------------------------
   Speech Engine
--------------------------------*/


function speak(){

  if (!config.isInitialized) { console.error('TTS system is not initialized.'); return; }

  if(!config.textProvider) return;

  const text = config.textProvider();

  if(!text || !text.trim()) return;

  synth.cancel();

  currentUtterance = new SpeechSynthesisUtterance(text);

  currentUtterance.rate = 0.95;
  currentUtterance.pitch = 1;
  currentUtterance.volume = 1;

  const voice = getVoice();
  if(voice) currentUtterance.voice = voice;

  currentUtterance.onend = ()=>{
    speaking=false;
    isPaused=false;
    setSpeakingUI(false);
  };

  synth.speak(currentUtterance);

  speaking=true;
  isPaused=false;
  setSpeakingUI(true);
}

function play(){

  if(isPaused){
    resume();
    return;
  }

  speak();
}

function resume(){

  if(synth.paused){
    synth.resume();
    isPaused=false;
    speaking=true;
    setSpeakingUI(true);
  }
}

function pause(){

  if(synth.speaking){
    synth.pause();
    isPaused=true;
    speaking=false;
    setSpeakingUI(false);
  }
}

function restart(){

  synth.cancel();
  speaking=false;
  isPaused=false;
  setSpeakingUI(false);

  speak();
}


/* ------------------------------
   Heartbeat Monitor
--------------------------------*/

// Detect silent finish (Safari/Chrome bugs)
setInterval(()=>{
  if(!synth.speaking && !isPaused){
    speaking=false;
    setSpeakingUI(false);
  }
},300);


/* ------------------------------
   Button Wiring
--------------------------------*/

// Initialize the voice selector element.
function initVoiceSelector() {

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

  config.isInitialized = true;
}

// Attach listener to the speak button.
function attachSpeakButtonListener() {
  const btn = resolveElement(config.speakButton);

  if (!btn) return;

  btn.addEventListener("click", play);
}

// Attach listener to the toggle button (to show/hide the voice selector).
function attachToggleButtonListener() {
  const btn = resolveElement(config.toggleButton);
  if (btn && config.voiceSelector) {
    btn.addEventListener('click', () => {
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

elements.forEach((e)=>{
    if(e) e.style.display='block';
});
}

function hide() {
    const elements = [
      resolveElement(config.speakButton),
      resolveElement(config.toggleButton),
      resolveElement(config.voiceSelector)
  ];

elements.forEach((e)=>{
  if(e) e.style.display='none';
});
}

function noPreference() {
  localStorage.removeItem(storageKey);
  if (config.voiceSelector) {
    config.voiceSelector.selectedIndex = -1;
  }
  initVoiceSelector();
}

function init(options) {
  config = Object.assign({}, config, options);

  config.container = resolveElement(config.container);

  initVoiceSelector();
  attachSpeakButtonListener();
  attachToggleButtonListener();
}


/* ------------------------------
   Public API
--------------------------------*/

window.TTS = {
  /**
   * Initialize TTS with configuration options.
   * Options:
   *   - speakButton: Element or selector for the speak button.
   *   - toggleButton: Element or selector for the toggle button for voice options.
   *   - voiceSelector: Element or selector for the voice dropdown (optional).
   *   - textProvider: Function returning the text to speak.
   *   - container: Element or selector for the 
   */
  init: init,
  speak: speak,
  play: play,
  pause: pause,
  restart: restart,
  show: show,
  hide: hide,
  noPreference: noPreference
};

/* Backwards compatibility with inline snippet */
window.speechControl = {
  play: play,
  pause: pause,
  restart: restart
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
