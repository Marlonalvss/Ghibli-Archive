export const elements = {
    inputYear: document.getElementById('year-filter'),
    inputTitle: document.getElementById('search'),
    inputDirector: document.getElementById('director-filter'),
    movieList: document.getElementById('movie-list'),
    sortFilter: document.getElementById('sort-filter'),
    clearFiltersButton: document.getElementById('clear-filters'),
    itemsCount: document.getElementById('items-count'),
    scrollTopButton: document.getElementById('scrollTopBtn'),
    loader: document.getElementById('loader-container'),

    // Mobile Drawer & Filters
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileDrawer: document.getElementById('mobile-drawer'),
    drawerContent: document.getElementById('drawer-content'),
    drawerOverlay: document.getElementById('drawer-overlay'),
    closeDrawer: document.getElementById('close-drawer'),
    inputYearMob: document.getElementById('year-filter-mobile'),
    inputTitleMob: document.getElementById('search-mobile'),
    inputDirectorMob: document.getElementById('director-filter-mobile'),
    sortFilterMob: document.getElementById('sort-filter-mobile'),
    clearFiltersButtonMob: document.getElementById('clear-filters-mobile'),

    // Modal
    modal: document.getElementById('movie-modal'),
    modalContent: document.getElementById('modal-content'),
    modalOverlay: document.getElementById('modal-overlay'),
    closeModal: document.getElementById('close-modal'),

    // I18n
    langToggle: document.getElementById('lang-toggle'),
    langLabel: document.getElementById('lang-label')
};

export const showLoader = (show) => {
    if (elements.loader) elements.loader.classList.toggle('hidden', !show);
    if (elements.movieList) elements.movieList.classList.toggle('hidden', show);
};
