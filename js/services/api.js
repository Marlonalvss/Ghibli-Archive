import { CONFIG } from '../config.js';
import { showLoader, elements } from '../utils/dom.js';
import { getLang, setMovies } from '../state/store.js';

export async function fetchMovies(onSuccessCallback) {
    showLoader(true);
    try {
        const response = await fetch(CONFIG.API_URL);
        if (!response.ok) throw new Error('Failed to fetch Ghibli movies');
        const movies = await response.json();
        setMovies(movies);
        populateFilters(movies);
        if (onSuccessCallback) onSuccessCallback();
    } catch (error) {
        console.error('Error:', error);
        const t = CONFIG.I18N[getLang()];
        if (elements.movieList) {
            elements.movieList.innerHTML = `
            <div class="col-span-full text-center py-20 bg-white/50 rounded-2xl border-2 border-[#e6e4dc]">
                <span class="material-symbols-outlined text-6xl text-ink-light mb-4">cloud_off</span>
                <p class="text-2xl font-serif font-bold text-ink">${t.errorTitle}</p>
                <p class="text-ink-light mb-6">${t.errorText}</p>
                <button onclick="location.reload()" class="px-8 py-3 bg-primary text-background-dark rounded-xl font-bold hover:bg-primary-dark transition-all">${t.tryAgain}</button>
            </div>
        `;
        }
    } finally {
        showLoader(false);
    }
}

function populateFilters(movies) {
    const years = [...new Set(movies.map(m => m.release_date))].sort((a, b) => b - a);
    const directors = [...new Set(movies.map(m => m.director))].sort();

    years.forEach(year => {
        elements.inputYear.appendChild(new Option(year, year));
        elements.inputYearMob.appendChild(new Option(year, year));
    });

    directors.forEach(director => {
        elements.inputDirector.appendChild(new Option(director, director));
        elements.inputDirectorMob.appendChild(new Option(director, director));
    });
}
