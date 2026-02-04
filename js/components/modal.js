import { CONFIG } from '../config.js';
import { getLang } from '../state/store.js';
import { sanitize } from '../utils/helpers.js';
import { elements } from '../utils/dom.js';

export function openModal(movie) {
    const currentLang = getLang();
    const t = CONFIG.I18N[currentLang];
    const translatedTitles = CONFIG.TRANSLATIONS[movie.title] || { en: movie.title, pt: movie.title };
    const displayTitle = translatedTitles[currentLang];
    const secondaryTitle = currentLang === 'en' ? (translatedTitles.pt || translatedTitles.en) : (translatedTitles.en || translatedTitles.pt);
    const translatedDescriptions = CONFIG.DESCRIPTIONS[movie.title] || { en: movie.description, pt: movie.description };
    const displayDescription = translatedDescriptions[currentLang] || movie.description;

    const safe = {
        title: sanitize(displayTitle),
        originalTitle: sanitize(secondaryTitle),
        description: sanitize(displayDescription),
        director: sanitize(movie.director),
        producer: sanitize(movie.producer),
        release_date: sanitize(movie.release_date),
        rt_score: sanitize(movie.rt_score),
        running_time: movie.running_time,
        image: movie.image,
        banner: movie.movie_banner
    };

    elements.modalContent.innerHTML = `
        <div class="flex flex-col">
            <div class="relative h-64 md:h-80 w-full">
                <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('${safe.banner}')"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-background-light via-background-light/20 to-transparent"></div>
            </div>
            <div class="px-8 md:px-12 pb-12 -mt-20 relative z-10">
                <div class="flex flex-col md:flex-row gap-10 items-start">
                    <div class="w-48 md:w-64 flex-shrink-0 shadow-2xl rounded-xl overflow-hidden border-4 border-white">
                        <img src="${safe.image}" alt="${safe.title}" class="w-full h-auto">
                    </div>
                    <div class="flex flex-col pt-16 md:pt-24 flex-grow">
                        <div class="flex flex-wrap items-center gap-3 mb-2">
                             <span class="bg-primary/20 text-primary-dark font-bold text-xs uppercase tracking-widest px-2 py-1 rounded">${safe.release_date}</span>
                             <span class="bg-ink/5 text-ink-light font-bold text-xs uppercase tracking-widest px-2 py-1 rounded">${Math.floor(safe.running_time / 60)}h ${safe.running_time % 60}m</span>
                             <span class="bg-yellow-100 text-yellow-700 font-bold text-xs uppercase tracking-widest px-2 py-1 rounded flex items-center gap-1">
                                <span class="material-symbols-outlined text-sm">star</span> ${safe.rt_score}%
                             </span>
                        </div>
                        <h2 class="text-4xl md:text-5xl font-serif font-bold text-ink mb-1 tracking-tight">${safe.title}</h2>
                        <p class="text-xl text-ink-light font-medium italic mb-8 border-b-2 border-[#e6e4dc] pb-4">${safe.originalTitle}</p>
                        <div class="space-y-8">
                            <div>
                                <h4 class="text-sm uppercase font-bold text-ink tracking-widest mb-3 flex items-center gap-2">
                                    <span class="material-symbols-outlined text-primary-dark">notes</span> ${t.synopsis}
                                </h4>
                                <p class="text-ink-light leading-relaxed font-medium text-lg">${safe.description}</p>
                            </div>
                            <div class="grid grid-cols-2 gap-8 pt-4 border-t border-dashed border-[#dcdad0]">
                                <div>
                                    <h4 class="text-xs uppercase font-bold text-ink-light tracking-widest mb-1">${t.director}</h4>
                                    <p class="text-ink font-bold text-lg">${safe.director}</p>
                                </div>
                                <div>
                                    <h4 class="text-xs uppercase font-bold text-ink-light tracking-widest mb-1">${t.producer}</h4>
                                    <p class="text-ink font-bold text-lg">${safe.producer}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    elements.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

export function closeModal() {
    elements.modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}
