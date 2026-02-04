const state = {
    currentLang: localStorage.getItem('ghibli-lang') || 'en',
    allMovies: [],
};

export const getLang = () => state.currentLang;
export const setLang = (lang) => {
    state.currentLang = lang;
    localStorage.setItem('ghibli-lang', lang);
};

export const getMovies = () => state.allMovies;
export const setMovies = (movies) => {
    state.allMovies = movies;
};

export default state;
