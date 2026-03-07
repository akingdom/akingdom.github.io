// tts.js
window.versions={...(window.versions||{}), tts:'1.3.1'};

// Text-to-speech, example usage included at end of this file.
// 1.1.0 - updated with heartbeat monitoring and paused state tracking.
// 1.2.0 - merged inline speechControl UI behaviour (play/pause container toggle)
// 1.2.3 - bug fixes 
// 1.3.1 - position tracking, bug fixes
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

const storageKey = 'selectedVoiceName';

let isPaused = false;
let speaking = false;

let currentText = "";
let charIndex = 0;

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
  const voices = synth.getVoices();

  voices.sort((a,b)=>{
    const la=a.lang.toLowerCase();
    const lb=b.lang.toLowerCase();
    if(la!==lb) return la.localeCompare(lb);
    return a.name.localeCompare(b.name);
  });

  return voices;
}

function selectPreferredVoiceName(voices) {

  let preferredVoiceName = localStorage.getItem(storageKey);

  if (preferredVoiceName && !voices.some(v => v.name === preferredVoiceName)) {
    preferredVoiceName = null;
  }

  // FAILS - Safari sets default voice to the first voice ALWAYS. Reminder: don't implement this.
  // if (!preferredVoiceName) {
  //   const defaultVoice = voices.find(voice => voice.default);
  //   if (defaultVoice) {
  //     preferredVoiceName = defaultVoice.name;
  //   }
  // }

  if (!preferredVoiceName) {  // preferred voice not found.
    const preferredLanguages = navigator.languages || [];

    // Try to match preferred language voice
    const match = preferredLanguages.find(lang =>
      voices.some(v => v.lang.startsWith(lang))
    );

    preferredVoiceName = match ? voices.find(v => v.lang.startsWith(match)).name : null;

    if (!preferredVoiceName) {  // preferred language not found.
      const browserLanguage = navigator.language;
      // Try to match browser language voice
      const match2 = voices.find(v => v.lang.startsWith(browserLanguage));
      if(match2) preferredVoiceName = match2.name;
    }

    if (!preferredVoiceName) {  // all else failed
      if(voices.length > 0) {
        preferredVoiceName = voices[0].name;  // take whatever voice we can
      } else {
        preferredVoiceName = null;  // we have nothing.
      }
    }
  }

  return preferredVoiceName;
}

function getVoice() {

  const voices = getVoicesSorted();

  if(!voices.length) return null;

  let selectedName =
    config.voiceSelector?.value ||
    localStorage.getItem(storageKey);
  
  let voice = voices.find(v => v.name === selectedName);

  if(!voice){
    const preferredVoiceName = selectPreferredVoiceName(voices);
  
    voice =
      voices.find(v => v.lang === preferredVoiceName) ||
      voices.find(v => v.lang.startsWith(preferredVoiceName)) ||
      voices[0];
  }

  if(voice){
    localStorage.setItem(storageKey, voice.name);
  }

  return voice;
}

/* ------------------------------
   Voice Selector
--------------------------------*/

// Populate the voice selector with available voices.
function populateVoiceSelector(){

  const voices = getVoicesSorted();

  if(!config.voiceSelector) return;

  config.voiceSelector.innerHTML = "";

  const preferredVoiceName = selectPreferredVoiceName(voices);
  const savedVoice = localStorage.getItem(storageKey);

  let defaultIndex = -1;

  voices.forEach((voice, index)=>{

    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;

    if (voice.name === savedVoice) {
      defaultIndex = index;
    }
    else if (voice.name === preferredVoiceName && defaultIndex === -1) {
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

  synth.cancel(); // Required

// DO NOT DO THIS...
//   if(synth.speaking){
//     synth.cancel();
//   }

  currentUtterance = new SpeechSynthesisUtterance(text);

  currentUtterance.rate = 0.95;
  currentUtterance.pitch = 1;
  currentUtterance.volume = 1;

  const voice = getVoice();
  if(voice) currentUtterance.voice = voice;

  currentText = text;
  charIndex = 0;
  currentUtterance.onboundary = function(event){
    if(event.name === "word"){
      charIndex = event.charIndex;
    }
  };

  currentUtterance.onend = ()=>{
    speaking=false;
    isPaused=false;
    setSpeakingUI(false);
  };

  setTimeout(()=>{
  
    if(synth.speaking || synth.pending){
      synth.cancel();
    }
  
    synth.speak(currentUtterance);
  
  },50);

  speaking=true;
  isPaused=false;
  setSpeakingUI(true);
}

function play(){
  if(isPaused){
    resume();
    return;
  }

  const voices = synth.getVoices();
  if(voices.length){
    speak();
    return;
  }

  // Wait for voices
  const waitForVoices = () => {
    const voicesNow = synth.getVoices();
    if(voicesNow.length){
      speak();
      synth.removeEventListener('voiceschanged', waitForVoices);
    }
  };
  synth.addEventListener('voiceschanged', waitForVoices);

  // Fallback in case event already fired
  setTimeout(()=>{
    if(!speaking) speak();
  },120);
}

function resumeFromPosition(){

  if(!currentText) return;

  // Cancel current speech
  synth.cancel();

  const startIndex = charIndex;
  const remainingText = currentText.slice(startIndex);

  currentUtterance = new SpeechSynthesisUtterance(remainingText);

  const voice = getVoice();
  if(voice) currentUtterance.voice = voice;

  currentUtterance.rate = 0.95;
  currentUtterance.pitch = 1;
  currentUtterance.volume = 1;

  // Correct position tracking
  currentUtterance.onboundary = function(event){
    if(event.name === "word"){
      charIndex = startIndex + event.charIndex;
    }
  };

  currentUtterance.onend = ()=>{
    speaking = false;
    isPaused = false;
    setSpeakingUI(false);
    charIndex = 0;
  };

  // Delay fixes synth race condition
  setTimeout(()=>{
    synth.speak(currentUtterance);
    speaking = true;
    isPaused = false;
    setSpeakingUI(true);
  }, 50);

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
  
    const selectedVoice = config.voiceSelector.value;
    localStorage.setItem(storageKey, selectedVoice);
  
    if(currentText){ 
      // Resume from position using new voice
      resumeFromPosition();
    }
  
  });

  config.voiceSelector.addEventListener('change', () => {

    const selectedVoice = config.voiceSelector.value;
    localStorage.setItem(storageKey, selectedVoice);
  
    // If paused, resume with new voice
    if(isPaused && currentText){
      resumeFromPosition();
    }
  
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

  // Force browser to load voices early
  synth.getVoices();
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
