import { CONFIG } from '../config.js';
import { getLang } from '../state/store.js';
import { sanitize } from '../utils/helpers.js';
import { openModal } from './modal.js';

export function createMovieCard(movie) {
    const currentLang = getLang();
    const titles = CONFIG.TRANSLATIONS[movie.title] || { en: movie.title, pt: movie.title };
    const displayTitle = titles[currentLang];

    const safe = {
        title: sanitize(displayTitle),
        director: sanitize(movie.director),
        release_date: sanitize(movie.release_date),
        score: (movie.rt_score / 10).toFixed(1),
        image: movie.image
    };

    const article = document.createElement('article');
    article.className = 'flex flex-col gap-4 group cursor-pointer animate-fade-in';

    article.innerHTML = `
        <div class="relative w-full aspect-[2/3] overflow-hidden rounded-xl bg-gray-200 shadow-md group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-300">
            <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style="background-image: url('${safe.image}')"></div>
            <div class="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs font-bold tracking-wide">${safe.score}</div>
        </div>
        <div class="flex flex-col gap-1">
            <h3 class="text-xl font-serif font-bold text-ink leading-tight group-hover:text-primary-dark transition-colors line-clamp-1">${safe.title}</h3>
            <div class="flex items-center justify-between text-sm text-ink-light">
                <span>${safe.release_date}</span>
                <span class="w-1 h-1 bg-ink-light rounded-full opacity-50"></span>
                <span class="line-clamp-1 italic">${safe.director}</span>
            </div>
        </div>
    `;

    article.addEventListener('click', () => openModal(movie));
    return article;
}
