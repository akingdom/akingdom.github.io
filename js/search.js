(function() {
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results-container');
    let index = null;
    let documents = null;

    function loadIndex() {
        fetch('assets/search_index.json')
            .then(response => response.json())
            .then(data => {
                index = lunr.Index.load(data.index);
                documents = data.docs;
                console.log('Search index loaded successfully.');
                // Optional: Give initial focus to the search box
                searchInput.focus();
            })
            .catch(error => {
                console.error('Failed to load search index:', error);
            });
    }

    // Simple debounce function to prevent too many calls
    let debounceTimer;
    function debounce(func, delay) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(func, delay);
    }

    searchInput.addEventListener('input', (event) => {
        const query = event.target.value;
        searchResultsContainer.innerHTML = ''; // Clear previous results

        if (!index || !query) {
            return;
        }

        debounce(() => {
            const results = index.search(query);
            if (results.length === 0) {
                searchResultsContainer.innerHTML = '<p>No results found.</p>';
                return;
            }

            const resultHTML = results.map(result => {
                const doc = documents.find(d => d.id === result.ref);
                if (!doc) return '';

                // Extract a snippet around the search term
                const matchIndex = doc.content.toLowerCase().indexOf(query.toLowerCase());
                let snippet = doc.content.substring(Math.max(0, matchIndex - 100), Math.min(doc.content.length, matchIndex + 100));
                snippet = '...' + snippet.replace(/\n/g, ' ').replace(/\s\s+/g, ' ') + '...';

                return `
                    <div class="search-result">
                        <h4><a href="${doc.url}">${doc.title}</a></h4>
                        <p><strong>Type:</strong> ${doc.type}</p>
                        <p>${snippet}</p>
                    </div>
                `;
            }).join('');

            searchResultsContainer.innerHTML = resultHTML;
        }, 300); // 300ms delay for debounce
    });

    loadIndex();
})();
