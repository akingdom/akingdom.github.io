/**
 * search.js
 *
 * Fetches a prebuilt Lunr JSON index from
 * https://akingdom.github.io/assets/search_index.json,
 * initializes Lunr, and provides live, grouped search
 * with ESC-to-clear and minimum-query-length handling.
 */

;(function() {
  // CONFIGURATION
  const INDEX_URL        = `${location.origin}/assets/search_index.json`;
  const INPUT_ID         = 'search-input';
  const RESULTS_ID       = 'search-results';
  const MIN_QUERY_LENGTH = 2;
  const DEBOUNCE_DELAY   = 300; // milliseconds

  // STATE
  let lunrIndex = null;
  let documents = [];

  // ELEMENT GETTERS
  function getSearchInput() {return document.getElementById(INPUT_ID);}
  function getResultsContainer() {return document.getElementById(RESULTS_ID);}
  function getSearchIcon() {return document.querySelector('#search-container .search-icon');}
  function getClearIcon() {return document.querySelector('#search-container .clear-button');}

  // DEBOUNCE HELPER
  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  // SHOW/HIDE ICON
  function showIcon(visible) {
    const search = getSearchIcon();
    if (search) {
      if (visible) search.classList.remove('hidden');
      else         search.classList.add('hidden');
    }
    const clear = getClearIcon();
    if (clear) {
      if (visible) clear.classList.add('hidden');
      else         clear.classList.remove('hidden');
    }
  }

  // CLEAR OUT ANY LISTED RESULTS
  function clearResults() {
    getResultsContainer().innerHTML = '';
  }

  function clearSearchInput(eventOrElement) {
    getResultsContainer().innerHTML = '';
    getSearchInput().value = '';
    showIcon(true);
  }

  // RENDER MATCHES GROUPED BY TYPE
  function renderResults(matches) {
    const container = getResultsContainer();
    container.innerHTML = '';
    if (!matches.length) {
      container.innerHTML =
        '<p class="text-gray-500 text-center p-4">No results found.</p>';
      return;
    }

    // Group docs by their `type` field
    const groups = matches.reduce((acc, match) => {
      const doc = documents.find(d => d.id === match.ref);
      if (!doc) return acc;
      (acc[doc.type] = acc[doc.type] || []).push(doc);
      return acc;
    }, {});

    // For each type, render a header + its items
    Object.entries(groups).forEach(([type, docs]) => {
      // Section header
      const heading = document.createElement('h3');
      heading.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      heading.className = 'mt-4 mb-2 font-bold';
      container.appendChild(heading);

      // Items
      docs.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'search-result';

        // Select an icon by type
        let icon = '';
        switch (type) {
          case 'repository': icon = '🔧'; break;
          case 'gist':       icon = '✂️'; break;
          case 'page':       icon = '📄'; break;
          case 'menu':       icon = '🔗'; break;
          default:           icon = '';
        }

        // Build mark‐up
        card.innerHTML = `
          <h4>
            ${icon} <a href="${doc.url}" target="_blank">${doc.title}</a>
          </h4>
          ${doc.text
            ? `<p class="text-sm text-gray-600">${doc.text.slice(0, 150)}${doc.text.length > 150 ? '…' : ''}</p>`
            : ''}
        `;
        container.appendChild(card);
      });
    });
  }

  // PERFORM A LUNR SEARCH AND RENDER
  function performSearch(query) {
    if (!lunrIndex) return;
    // wildcard suffix for partial matches
    const results = lunrIndex.search(`${query}*`);
    renderResults(results);
  }

  // DEBOUNCED SEARCH HOOK
  const debouncedSearch = debounce(performSearch, DEBOUNCE_DELAY);

  // HANDLE INPUT EVENTS (for oninput="" or addEventListener)
  function handleSearchInput(eventOrElement) {
    const value = eventOrElement.target
      ? eventOrElement.target.value
      : eventOrElement.value;
    
    showIcon(value.length == 0);
    
    if (!value || value.length < MIN_QUERY_LENGTH) {
      clearResults();
      return;
    }
    debouncedSearch(value.trim().toLowerCase());
  }

  // HANDLE ESC KEY TO CLEAR
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      getSearchInput().value = '';
      showIcon(true);
      clearResults();
    }
  }

  // LOAD THE INDEX JSON, INIT LUNR
  async function loadSearchIndex() {
    try {
      const res  = await fetch(INDEX_URL);
      const json = await res.json();
    
      // load the Lunr index
      lunrIndex = lunr.Index.load(json.index);
    
      // rebuild the documents array from json.store
      documents = Object.entries(json.store).map(([id, meta]) => ({
        id,
        title: meta.title,
        url:   meta.url,
        type:  meta.type || 'page',   // if you emitted type
        text:  meta.text || ''        // if you emitted excerpt
      }));
    
      // enable the live input
      const input = getSearchInput();
      input.disabled    = false;
      input.placeholder = 'Search my content…';
    } catch (err) {
      console.error('Error loading search index:', err);
      input.disabled    = true;
      input.placeholder = 'Search unavailable';
    }
  }

  // ON DOM READY: kick off index load & wire events
  document.addEventListener('DOMContentLoaded', () => {
    input      = getSearchInput();
    container = getResultsContainer();
    if (!input || !container) {
      console.error('Search input or results container missing.');
      return;
    }

    // wire up input + keydown
    input.addEventListener('input', handleSearchInput);
    input.addEventListener('keydown', handleKeydown);

    // disable until index is ready
    input.disabled    = true;
    input.placeholder = 'Loading search…';
    showIcon(true);

    // fetch & initialize
    loadSearchIndex();

    // support inline oninput calls
    window.handleSearchInput = handleSearchInput;
    window.clearSearchInput = clearSearchInput;
  });
})();
