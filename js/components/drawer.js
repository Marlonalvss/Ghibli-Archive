import { elements } from '../utils/dom.js';

export function openDrawer() {
    if (!elements.mobileDrawer) return;
    elements.mobileDrawer.classList.remove('hidden');
    setTimeout(() => {
        elements.drawerContent.classList.remove('-translate-x-full');
    }, 10);
    document.body.style.overflow = 'hidden';
}

export function closeDrawer() {
    if (!elements.drawerContent) return;
    elements.drawerContent.classList.add('-translate-x-full');
    setTimeout(() => {
        elements.mobileDrawer.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}
