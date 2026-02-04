import { CONFIG } from './config.js';
import { getMovies, getLang } from './state/store.js';
import { elements } from './utils/dom.js';
import { debounce } from './utils/helpers.js';
import { fetchMovies } from './services/api.js';
import { updateInterfaceLanguage, toggleLanguage, setOnLanguageChange } from './services/i18n.js';
import { createMovieCard } from './components/card.js';
import { openDrawer, closeDrawer } from './components/drawer.js';
import { closeModal } from './components/modal.js';

function renderMovies() {
    const currentLang = getLang();
    const allMovies = getMovies();

    const filters = {
        year: elements.inputYear.value,
        director: elements.inputDirector.value,
        query: elements.inputTitle.value.toLowerCase(),
        sort: elements.sortFilter.value
    };

    let filtered = allMovies.filter(movie => {
        const matchesYear = !filters.year || movie.release_date === filters.year;
        const matchesDirector = !filters.director || movie.director === filters.director;
        const titles = CONFIG.TRANSLATIONS[movie.title] || { en: movie.title, pt: movie.title };
        const matchesQuery = titles.en.toLowerCase().includes(filters.query) ||
            titles.pt.toLowerCase().includes(filters.query);
        return matchesYear && matchesDirector && matchesQuery;
    });

    if (filters.sort === 'newest') {
        filtered.sort((a, b) => b.release_date - a.release_date);
    } else if (filters.sort === 'oldest') {
        filtered.sort((a, b) => a.release_date - b.release_date);
    }

    const hasActiveFilters = filters.year || filters.director || filters.query || filters.sort;
    elements.clearFiltersButton.classList.toggle('hidden', !hasActiveFilters);
    elements.clearFiltersButtonMob.classList.toggle('hidden', !hasActiveFilters);

    elements.itemsCount.innerText = `${filtered.length} ${CONFIG.I18N[currentLang].items}`;
    elements.movieList.innerHTML = '';

    if (filtered.length === 0) {
        const t = CONFIG.I18N[currentLang];
        elements.movieList.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-24 text-center px-4 bg-white/40 rounded-3xl border-2 border-dashed border-[#dcdad0]">
                <span class="material-symbols-outlined text-7xl text-ink-light/20 mb-6">mystery</span>
                <h3 class="text-3xl font-serif font-bold text-ink mb-2">${t.noResultsTitle}</h3>
                <p class="text-ink-light max-w-sm mb-8">${t.noResultsText}</p>
                <button id="trigger-clear" class="px-8 py-3 bg-[#eef0eb] text-ink font-bold rounded-xl hover:bg-ink hover:text-white transition-all">${t.clearFilters}</button>
            </div>
        `;
        const btn = document.getElementById('trigger-clear');
        if (btn) btn.addEventListener('click', () => elements.clearFiltersButton.click());
        return;
    }

    filtered.forEach(movie => elements.movieList.appendChild(createMovieCard(movie)));
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    setOnLanguageChange(renderMovies);
    fetchMovies(() => updateInterfaceLanguage());

    const debouncedRender = debounce(renderMovies, CONFIG.DEBOUNCE_DELAY);

    const sync = (el1, el2, event = 'change', isDebounced = false) => {
        const handler = isDebounced ? debouncedRender : renderMovies;
        el1.addEventListener(event, () => { el2.value = el1.value; handler(); });
        el2.addEventListener(event, () => { el1.value = el2.value; handler(); });
    };

    sync(elements.inputTitle, elements.inputTitleMob, 'input', true);
    sync(elements.inputYear, elements.inputYearMob);
    sync(elements.inputDirector, elements.inputDirectorMob);
    sync(elements.sortFilter, elements.sortFilterMob);

    elements.langToggle.addEventListener('click', toggleLanguage);

    const clearAll = () => {
        [elements.inputTitle, elements.inputTitleMob].forEach(el => el.value = '');
        [elements.inputYear, elements.inputYearMob].forEach(el => el.value = '');
        [elements.inputDirector, elements.inputDirectorMob].forEach(el => el.value = '');
        [elements.sortFilter, elements.sortFilterMob].forEach(el => el.value = '');
        renderMovies();
    };

    elements.clearFiltersButton.addEventListener('click', clearAll);
    elements.clearFiltersButtonMob.addEventListener('click', clearAll);

    elements.scrollTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    window.addEventListener('scroll', () => {
        const show = window.scrollY > 400;
        elements.scrollTopButton.classList.toggle('opacity-0', !show);
        elements.scrollTopButton.classList.toggle('translate-y-20', !show);
        elements.scrollTopButton.classList.toggle('pointer-events-none', !show);
        elements.scrollTopButton.classList.toggle('opacity-100', show);
        elements.scrollTopButton.classList.toggle('translate-y-0', show);
    });

    elements.mobileMenuBtn.addEventListener('click', openDrawer);
    elements.closeDrawer.addEventListener('click', closeDrawer);
    elements.drawerOverlay.addEventListener('click', closeDrawer);

    elements.closeModal.addEventListener('click', closeModal);
    elements.modalOverlay.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
});
