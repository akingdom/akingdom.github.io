/**
 * search.js
 *
 * This script provides a client-side search functionality for a static website.
 * It fetches a search index from a JSON file, initializes a Lunr.js index,
 * and handles user input to display search results dynamically.
 *
 * NOTE: This version is designed to be called directly from an 'oninput'
 * attribute on your search input element in the HTML.
 */

// Use an IIFE (Immediately Invoked Function Expression) to avoid global scope pollution.
(function() {
    let idx = null; // This will hold the Lunr index after it's loaded.
    const searchResultsDiv = document.getElementById('search-results');

    /**
     * Loads the search index from a JSON file and initializes Lunr.js.
     * @param {string} url The URL to the search index JSON file.
     * @returns {Promise<lunr.Index|null>} A promise that resolves to the initialized
     * Lunr index or null on error.
     */
    async function loadSearchIndex(url) {
        try {
            console.log(`Attempting to fetch search index from: ${url}`);
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch search index: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Search index data loaded successfully.");

            // Initialize Lunr.js index
            const newIndex = lunr(function () {
                this.ref('id'); // The reference field for the document
                this.field('title'); // A searchable field
                this.field('text');  // Another searchable field
                this.field('type');  // Another searchable field

                let documentsAdded = 0;
                if (data && data.documents && Array.isArray(data.documents)) {
                    data.documents.forEach(doc => {
                        this.add(doc);
                        documentsAdded++;
                    });
                    console.log(`Lunr index built with ${documentsAdded} documents.`);
                } else {
                    console.error("The search index data is not in the expected format. It should have a 'documents' array.");
                }
            });
            return newIndex;
        } catch (error) {
            console.error("Error loading or building search index:", error);
            return null;
        }
    }

    /**
     * Displays the search results in the UI.
     * @param {Array<lunr.Result>} results The array of search results.
     */
    function displayResults(results) {
        if (!searchResultsDiv) {
            console.error("Search results container element with ID 'search-results' not found.");
            return;
        }
        
        searchResultsDiv.innerHTML = ''; // Clear previous results

        if (results.length === 0) {
            searchResultsDiv.innerHTML = '<p class="text-gray-500 text-center p-4">No results found.</p>';
            return;
        }

        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'p-4 bg-white rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-md mb-2';
            const title = result.ref; // Lunr stores the reference in `result.ref`
            
            resultElement.innerHTML = `
                <h3 class="text-xl font-semibold text-indigo-700">${title}</h3>
                <a href="${title}" class="text-indigo-500 hover:text-indigo-600 hover:underline mt-1 inline-block text-sm">
                    View Page
                </a>
            `;
            searchResultsDiv.appendChild(resultElement);
        });
    }

    /**
     * A debouncing function to limit how often a function is called.
     * @param {Function} func The function to debounce.
     * @param {number} delay The delay in milliseconds.
     * @returns {Function} The debounced function.
     */
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    // The main execution block.
    document.addEventListener('DOMContentLoaded', async function() {
        console.log("DOM content loaded. Initializing search functionality.");

        if (!searchResultsDiv) {
            console.error("Required DOM element 'search-results' not found. Search functionality is disabled.");
            return;
        }

        // Asynchronously load the search index.
        idx = await loadSearchIndex('assets/search_index.json');
        
        if (!idx) {
            console.error("Could not initialize Lunr index. Search functionality is disabled.");
        } else {
            console.log("Lunr index is now available for searching.");
        }
    });
    
    // --- Public Function ---
    // This is the function that will be called directly from your HTML 'oninput' attribute.
    const debouncedSearch = debounce(function(query) {
        if (idx) {
            const results = idx.search(query);
            displayResults(results);
        } else {
            console.log("Search index not yet available. Please wait.");
        }
    }, 300);

    // Make the search function globally accessible.
    window.handleSearchInput = function(element) {
        const query = element.value;
        if (query.trim() === '') {
            displayResults([]);
            return;
        }
        debouncedSearch(query);
    };

})();
