import { createInertiaApp, router } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { AlertProvider } from "@/Contexts/AlertContext";
import { ThemeProvider } from "@/Contexts/ThemeContext";

// Preset themes for progress bar color
const presetThemes = {
    orange: { primary600: '#ea580c' },
    blue: { primary600: '#2563eb' },
    emerald: { primary600: '#059669' },
    purple: { primary600: '#9333ea' },
    slate: { primary600: '#475569' },
};

// Setup global route function from Ziggy
window.route = window.route || function() {
    console.warn('Route function not available. Make sure Ziggy is loaded.');
    return '#';
};

// Get current theme color for progress bar
function getProgressColor() {
    const savedTheme = localStorage.getItem('appTheme') || 'orange';
    const theme = presetThemes[savedTheme];
    return theme ? theme.primary600 : '#ea580c';
}

// Setup page transition effects
let isNavigating = false;

router.on('before', () => {
    if (!isNavigating) {
        isNavigating = true;
        document.body.classList.add('page-transitioning');
    }
});

router.on('navigate', () => {
    setTimeout(() => {
        document.body.classList.remove('page-transitioning');
        isNavigating = false;
    }, 50);
});

router.on('success', () => {
    // Instant scroll to top - more responsive
    window.scrollTo(0, 0);
});

createInertiaApp({
    resolve: async (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        const page = pages[`./Pages/${name}.jsx`];
        
        if (!page) {
            console.error(`Page not found: ${name}`);
            return pages[`./Pages/Error.jsx`] || null;
        }
        
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <ThemeProvider>
                <AlertProvider>
                    <App {...props} />
                </AlertProvider>
            </ThemeProvider>
        );
    },
    progress: {
        color: getProgressColor(),
        showSpinner: true,
        delay: 100,
    },
});
