import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

const THEMES = ['orange', 'blue', 'emerald', 'purple', 'slate'];

const presetThemes = {
    orange: {
        name: 'Orange',
        primary600: '#ea580c',
    },
    blue: {
        name: 'Blue',
        primary600: '#2563eb',
    },
    emerald: {
        name: 'Emerald',
        primary600: '#059669',
    },
    purple: {
        name: 'Purple',
        primary600: '#9333ea',
    },
    slate: {
        name: 'Slate',
        primary600: '#475569',
    },
};

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('appTheme') || 'orange';
        }
        return 'orange';
    });
    
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('darkMode') === 'true';
        }
        return false;
    });
    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('appTheme', theme);
    }, [theme]);
    
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', String(darkMode));
    }, [darkMode]);
    
    const toggleDarkMode = () => setDarkMode(prev => !prev);
    
    const currentTheme = presetThemes[theme] || presetThemes.orange;
    
    return (
        <ThemeContext.Provider value={{ 
            theme, 
            setTheme, 
            darkMode, 
            toggleDarkMode, 
            themes: THEMES,
            presetThemes,
            currentTheme
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}

export default ThemeContext;
