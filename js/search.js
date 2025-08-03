document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results-container');

  let searchIndex;
  let documents;

  // Fetch the search index and initialize Lunr.js
  async function loadSearchIndex() {
    try {
      const response = await fetch('/assets/search_index.json');
      const data = await response.json();
      documents = data.documents;

      searchIndex = lunr(function() {
        this.ref('id');
        this.field('title', { boost: 10 });
        this.field('text');
        
        if (data && data.documents && Array.isArray(data.documents)) {
          data.documents.forEach(doc => {
            this.add(doc);
          }, this);
        } else {
          console.error("The data object is not in the expected format or .documents is not an array.");
        }

      });

      // After the index is loaded, enable the search input
      searchInput.disabled = false;
      searchInput.placeholder = 'Search my gists, repos, and website...';
    } catch (error) {
      console.error('Error loading search index:', error);
      searchInput.placeholder = 'Search is temporarily unavailable.';
      searchInput.disabled = true;
    }
  }

  // Handle search input
  searchInput.addEventListener('keyup', (event) => {
    const query = event.target.value.trim();
    resultsContainer.innerHTML = '';

    if (query.length > 0) {
      resultsContainer.style.display = 'block';
      const results = searchIndex.search(query);
      displayResults(results, query);
    } else {
      resultsContainer.style.display = 'none';
    }
  });

  // Display search results
  function displayResults(results, query) {
    if (results.length === 0) {
      resultsContainer.innerHTML = `<p>No results found for "${query}".</p>`;
      return;
    }

    const fragment = document.createDocumentFragment();

    results.forEach(result => {
      const doc = documents.find(d => d.id === result.ref);
      if (doc) {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result';
        resultItem.innerHTML = `
          <h4><a href="${doc.url}">${doc.title}</a></h4>
        `;
        fragment.appendChild(resultItem);
      }
    });

    resultsContainer.appendChild(fragment);
  }

  // Load the search index on page load
  loadSearchIndex();
});
