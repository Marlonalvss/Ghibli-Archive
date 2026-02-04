tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#13ec5b",
                "primary-dark": "#0ea841",
                "background-light": "#fcfbf4",
                "background-dark": "#102216",
                "ink": "#1e201e",
                "ink-light": "#5a6e60",
            },
            fontFamily: {
                "display": ["Spline Sans", "sans-serif"],
                "serif": ["Playfair Display", "serif"],
            },
            borderRadius: { "DEFAULT": "0.5rem", "lg": "0.75rem", "xl": "1rem", "2xl": "1.5rem", "full": "9999px" },
        },
    },
}
