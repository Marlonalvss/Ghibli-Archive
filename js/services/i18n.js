import { CONFIG } from '../config.js';
import { getLang, setLang } from '../state/store.js';
import { elements } from '../utils/dom.js';

let onLanguageChangeCallback = null;

export function setOnLanguageChange(callback) {
    onLanguageChangeCallback = callback;
}

export function updateInterfaceLanguage() {
    const currentLang = getLang();

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = CONFIG.I18N[currentLang][key];
        if (!translation) return;

        if (el.tagName === 'INPUT') {
            el.placeholder = translation;
        } else {
            el.textContent = translation;
        }
    });

    if (elements.langLabel) elements.langLabel.textContent = currentLang.toUpperCase();
    document.documentElement.lang = currentLang;

    if (onLanguageChangeCallback) onLanguageChangeCallback();
}

export function toggleLanguage() {
    const next = getLang() === 'en' ? 'pt' : 'en';
    setLang(next);
    updateInterfaceLanguage();
}
