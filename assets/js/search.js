(function() {
    const searchForm = document.getElementById('search-form');
    const searchQueryInput = document.getElementById('search-query');
    const searchResultsContainer = document.getElementById('search-results');
    const noResultsMessage = document.getElementById('no-results');

    const mobileSearchForm = document.getElementById('mobile-search-form');
    const mobileSearchInput = document.getElementById('search-input-mobile');

    let idx;
    let documents;

    function loadSearchIndex() {
       fetch('/search-index.json')
            .then(response => response.json())
            .then(data => {
                documents = data;
                idx = lunr(function() {
                    this.field('title', { boost: 10 });
                    this.field('content');
                    this.field('author');
                    this.ref('id');

                    documents.forEach(doc => {
                        this.add(doc);
                    });
                });
                handleSearchQuery();
            })
            .catch(err => {
                console.error("Error al cargar el índice de búsqueda:", err);
                if (searchResultsContainer) {
                    searchResultsContainer.innerHTML = '<p class="text-danger">Hubo un problema al cargar la funcionalidad de búsqueda.</p>';
                }
            });
    }

    function displaySearchResults(results) {
        if (!searchResultsContainer) return;
        if (results.length) {
            let html = '<ul class="list-group">';
            results.forEach(result => {
                const doc = documents.find(d => d.id === result.ref);
                if (doc) {
                    html += `<li class="list-group-item">
                               <a href="${doc.url}" class="text-decoration-none">
                                 <h5 class="mb-1">${doc.title}</h5>
                               </a>
                               <p class="mb-1">${doc.content.substring(0, 150)}...</p>
                               <small>${doc.date}</small>
                             </li>`;
                }
            });
            html += '</ul>';
            searchResultsContainer.innerHTML = html;
            noResultsMessage.style.display = 'none';
        } else {
            searchResultsContainer.innerHTML = '';
            noResultsMessage.style.display = 'block';
        }
    }

    function handleSearchQuery() {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query && idx && documents) {
            if (searchQueryInput) searchQueryInput.value = query;
            if (mobileSearchInput) mobileSearchInput.value = query;
            const results = idx.search(query);
            displaySearchResults(results);
        } else if (idx && documents && searchResultsContainer) {
            searchResultsContainer.innerHTML = '<p class="text-center text-muted">Ingresa un término de búsqueda para ver los resultados.</p>';
        }
    }

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchQueryInput.value.trim();
            if (query) {
                window.location.href = `/search/?q=${encodeURIComponent(query)}`;
            }
        });
        loadSearchIndex(); // Iniciar la carga del índice al entrar en la página de búsqueda
    }

    if (mobileSearchForm) {
        mobileSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = mobileSearchInput.value.trim();
            if (query) {
                window.location.href = `/search/?q=${encodeURIComponent(query)}`;
            }
        });
    }
})();