/**
 * Custom React Hooks
 * Centralized exports for all custom hooks
 */

// Re-export hooks from context
export { useAlert } from '@/Contexts/AlertContext';
export { useTheme } from '@/Contexts/ThemeContext';

/**
 * usePermission Hook
 * Check user permissions easily
 */
import { usePage } from '@inertiajs/react';

export function usePermission() {
    const { auth } = usePage().props;
    const user = auth?.user;
    
    /**
     * Check if user has a specific permission
     * @param {string} permission - Permission to check
     * @returns {boolean}
     */
    const can = (permission) => {
        return user?.permissions?.includes(permission) ?? false;
    };
    
    /**
     * Check if user has any of the specified permissions
     * @param {string[]} permissions - Permissions to check
     * @returns {boolean}
     */
    const canAny = (permissions) => {
        return permissions.some(p => can(p));
    };
    
    /**
     * Check if user has all of the specified permissions
     * @param {string[]} permissions - Permissions to check
     * @returns {boolean}
     */
    const canAll = (permissions) => {
        return permissions.every(p => can(p));
    };
    
    /**
     * Check if user has a specific role
     * @param {string} role - Role to check
     * @returns {boolean}
     */
    const hasRole = (role) => {
        return user?.roles?.includes(role) ?? false;
    };
    
    /**
     * Check if user has any of the specified roles
     * @param {string[]} roles - Roles to check
     * @returns {boolean}
     */
    const hasAnyRole = (roles) => {
        return roles.some(r => hasRole(r));
    };
    
    /**
     * Check if user is an admin (admin or super-admin)
     * @returns {boolean}
     */
    const isAdmin = () => {
        return hasAnyRole(['admin', 'super-admin']);
    };
    
    /**
     * Check if user is a super admin
     * @returns {boolean}
     */
    const isSuperAdmin = () => {
        return hasRole('super-admin');
    };
    
    return {
        user,
        can,
        canAny,
        canAll,
        hasRole,
        hasAnyRole,
        isAdmin,
        isSuperAdmin,
    };
}

/**
 * useDebounce Hook
 * Debounce a value with specified delay
 */
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

/**
 * useLocalStorage Hook
 * Persist state in localStorage
 */
export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
}

/**
 * useClickOutside Hook
 * Detect clicks outside of a ref element
 */
import { useRef, useCallback } from 'react';

export function useClickOutside(callback) {
    const ref = useRef(null);

    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClick);
        document.addEventListener('touchstart', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('touchstart', handleClick);
        };
    }, [callback]);

    return ref;
}

/**
 * useMediaQuery Hook
 * Check if a media query matches
 */
export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const media = window.matchMedia(query);
        setMatches(media.matches);

        const listener = (e) => setMatches(e.matches);
        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
}

/**
 * useIsMobile Hook
 * Check if the viewport is mobile size
 */
export function useIsMobile() {
    return useMediaQuery('(max-width: 768px)');
}

/**
 * useCopyToClipboard Hook
 * Copy text to clipboard
 */
export function useCopyToClipboard() {
    const [copied, setCopied] = useState(false);

    const copy = useCallback(async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            return true;
        } catch (error) {
            console.error('Failed to copy:', error);
            setCopied(false);
            return false;
        }
    }, []);

    return { copy, copied };
}

/**
 * useToggle Hook
 * Toggle between true and false
 */
export function useToggle(initialValue = false) {
    const [value, setValue] = useState(initialValue);
    
    const toggle = useCallback(() => setValue(v => !v), []);
    const setTrue = useCallback(() => setValue(true), []);
    const setFalse = useCallback(() => setValue(false), []);
    
    return [value, { toggle, setTrue, setFalse, setValue }];
}
