/**
 * Utility functions for formatting data
 */

/**
 * Format a date to a readable string
 * @param {Date|string|number} date - The date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export function formatDate(date, options = {}) {
    if (!date) return '';
    
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options,
    };
    
    try {
        const dateObj = date instanceof Date ? date : new Date(date);
        return new Intl.DateTimeFormat('id-ID', defaultOptions).format(dateObj);
    } catch (error) {
        console.error('Error formatting date:', error);
        return String(date);
    }
}

/**
 * Format a date to a short string (e.g., "12 Jan 2024")
 * @param {Date|string|number} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDateShort(date) {
    return formatDate(date, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Format a date with time
 * @param {Date|string|number} date - The date to format
 * @returns {string} Formatted datetime string
 */
export function formatDateTime(date) {
    return formatDate(date, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Format a date to relative time (e.g., "2 hours ago")
 * @param {Date|string|number} date - The date to format
 * @returns {string} Relative time string
 */
export function formatRelativeTime(date) {
    if (!date) return '';
    
    try {
        const dateObj = date instanceof Date ? date : new Date(date);
        const now = new Date();
        const diffInSeconds = Math.floor((now - dateObj) / 1000);
        
        const intervals = [
            { label: 'tahun', seconds: 31536000 },
            { label: 'bulan', seconds: 2592000 },
            { label: 'minggu', seconds: 604800 },
            { label: 'hari', seconds: 86400 },
            { label: 'jam', seconds: 3600 },
            { label: 'menit', seconds: 60 },
            { label: 'detik', seconds: 1 },
        ];
        
        for (const interval of intervals) {
            const count = Math.floor(diffInSeconds / interval.seconds);
            if (count >= 1) {
                return `${count} ${interval.label} yang lalu`;
            }
        }
        
        return 'Baru saja';
    } catch (error) {
        console.error('Error formatting relative time:', error);
        return String(date);
    }
}

/**
 * Format a number as currency
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: 'IDR')
 * @param {string} locale - Locale string (default: 'id-ID')
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = 'IDR', locale = 'id-ID') {
    if (amount === null || amount === undefined) return '';
    
    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    } catch (error) {
        console.error('Error formatting currency:', error);
        return String(amount);
    }
}

/**
 * Format a number with thousand separators
 * @param {number} number - The number to format
 * @param {string} locale - Locale string (default: 'id-ID')
 * @returns {string} Formatted number string
 */
export function formatNumber(number, locale = 'id-ID') {
    if (number === null || number === undefined) return '';
    
    try {
        return new Intl.NumberFormat(locale).format(number);
    } catch (error) {
        console.error('Error formatting number:', error);
        return String(number);
    }
}

/**
 * Format a number as percentage
 * @param {number} value - The value to format (0-1 or 0-100)
 * @param {number} decimals - Number of decimal places
 * @param {boolean} isDecimal - Whether the value is already a decimal (0-1)
 * @returns {string} Formatted percentage string
 */
export function formatPercentage(value, decimals = 0, isDecimal = false) {
    if (value === null || value === undefined) return '';
    
    const percentage = isDecimal ? value * 100 : value;
    return `${percentage.toFixed(decimals)}%`;
}

/**
 * Format file size to human readable format
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted file size string
 */
export function formatFileSize(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    if (!bytes) return '';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

/**
 * Truncate text with ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 50) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}

/**
 * Capitalize first letter of a string
 * @param {string} text - The text to capitalize
 * @returns {string} Capitalized text
 */
export function capitalize(text) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Convert string to title case
 * @param {string} text - The text to convert
 * @returns {string} Title case text
 */
export function toTitleCase(text) {
    if (!text) return '';
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Generate initials from a name
 * @param {string} name - Full name
 * @param {number} length - Number of initials to generate
 * @returns {string} Initials
 */
export function getInitials(name, length = 2) {
    if (!name) return '';
    
    const words = name.trim().split(/\s+/);
    const initials = words
        .slice(0, length)
        .map(word => word.charAt(0).toUpperCase())
        .join('');
    
    return initials;
}

/**
 * Slugify a string
 * @param {string} text - The text to slugify
 * @returns {string} Slugified text
 */
export function slugify(text) {
    if (!text) return '';
    
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Parse query string to object
 * @param {string} queryString - Query string to parse
 * @returns {Object} Parsed query parameters
 */
export function parseQueryString(queryString) {
    if (!queryString) return {};
    
    const query = queryString.startsWith('?') ? queryString.slice(1) : queryString;
    const pairs = query.split('&');
    const result = {};
    
    for (const pair of pairs) {
        const [key, value] = pair.split('=');
        if (key) {
            result[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
        }
    }
    
    return result;
}

/**
 * Build query string from object
 * @param {Object} params - Object to convert to query string
 * @returns {string} Query string
 */
export function buildQueryString(params) {
    if (!params || Object.keys(params).length === 0) return '';
    
    const pairs = Object.entries(params)
        .filter(([, value]) => value !== null && value !== undefined && value !== '')
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    
    return pairs.length > 0 ? `?${pairs.join('&')}` : '';
}

export default {
    formatDate,
    formatDateShort,
    formatDateTime,
    formatRelativeTime,
    formatCurrency,
    formatNumber,
    formatPercentage,
    formatFileSize,
    truncateText,
    capitalize,
    toTitleCase,
    getInitials,
    slugify,
    parseQueryString,
    buildQueryString,
};
