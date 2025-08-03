// A simple function to load the search index from an object.
// In a real application, this data would likely be fetched from a JSON file.
function loadSearchIndex(data) {
    let idx; // Declare a variable to hold the Lunr index

    idx = lunr(function () {
        this.ref('id');
        this.field('title');
        this.field('text');
        this.field('type');
        
        // This is the fixed loop that now correctly iterates over the data.documents array.
        if (data && data.documents && Array.isArray(data.documents)) {
            data.documents.forEach(doc => {
                // The doc object should have id, title, text, and type properties
                this.add(doc);
            });
        } else {
            console.error("The search index data is not in the expected format. It should have a 'documents' array.");
        }
    });

    return idx;
}

// Function to display the search results
function displayResults(results, resultsContainerId = 'search-results') {
    const resultsContainer = document.getElementById(resultsContainerId);
    if (!resultsContainer) {
        console.error(`Results container with ID "${resultsContainerId}" not found.`);
        return;
    }

    resultsContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="text-gray-500 text-center">No results found.</p>';
        return;
    }

    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.className = 'p-4 bg-gray-50 rounded-lg border border-gray-200 transition-shadow hover:shadow-md';
        const title = result.ref; // Lunr stores the reference in `result.ref`
        
        resultElement.innerHTML = `
            <h3 class="text-xl font-semibold text-indigo-700">${title}</h3>
        `;
        resultsContainer.appendChild(resultElement);
    });
}

// Debounce function to limit how often a function is called
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

// Your provided search index data, stored as a JavaScript object
const searchIndexData = {
    // ... (Your complete search index data object goes here)
    // IMPORTANT: Make sure your data object has a 'documents' array.
    "version": "2.3.9",
    "fields": [
        "title",
        "text",
        "type"
    ],
    "documents": [ // This is the new key based on your correction
        {
            "id": "akingdom/akingdom",
            "title": "akingdom/akingdom",
            "text": "",
            "type": "title"
        },
        {
            "id": "akingdom/akingdom.github.io",
            "title": "akingdom/akingdom.github.io",
            "text": "some text here",
            "type": "title"
        }
        // ... rest of your data, correctly formatted as objects with `id`, `title`, `text`, and `type`.
    ]
};

// Main function to initialize the search
(function() {
    const idx = loadSearchIndex(searchIndexData);
    const searchInput = document.getElementById('search-input');
    
    // The debounced search function
    const debouncedSearch = debounce(function(query) {
        if (idx) {
            const results = idx.search(query);
            displayResults(results);
        }
    }, 300);

    // The single event listener to handle all search input
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const query = event.target.value;
            if (query.trim() === '') {
                displayResults([]); // Clear results if input is empty
                return;
            }
            debouncedSearch(query);
        });
    } else {
        console.error("Search input element with ID 'search-input' not found.");
    }
})();
