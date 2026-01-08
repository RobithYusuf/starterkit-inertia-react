import { useId } from 'react';

/**
 * SearchInput Component
 * A search input with icon, loading state, and clear button
 * 
 * @param {string} value - Search value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {boolean} loading - Show loading spinner
 * @param {string} size - Input size: 'sm', 'md', 'lg'
 * @param {string} className - Additional CSS classes
 * @param {boolean} autoFocus - Auto focus on mount
 */
export default function SearchInput({
    value = '',
    onChange,
    onClear,
    placeholder = 'Search...',
    loading = false,
    size = 'md',
    className = '',
    autoFocus = false,
    disabled = false,
    id,
    ...props
}) {
    const generatedId = useId();
    const inputId = id || `search${generatedId}`;

    const sizes = {
        sm: 'h-9 text-sm',
        md: 'h-[42px] text-sm',
        lg: 'h-12 text-base',
    };

    const iconSizes = {
        sm: 'h-4 w-4',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
    };

    const handleClear = () => {
        if (onClear) {
            onClear();
        } else if (onChange) {
            // Simulate event with empty value
            onChange({ target: { value: '' } });
        }
    };

    return (
        <div className={`relative ${className}`}>
            {/* Search/Loading Icon */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {loading ? (
                    <svg 
                        className={`animate-spin ${iconSizes[size]} text-gray-400`} 
                        fill="none" 
                        viewBox="0 0 24 24"
                    >
                        <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                        />
                        <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                ) : (
                    <svg 
                        className={`${iconSizes[size]} text-gray-400`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="2" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" 
                        />
                    </svg>
                )}
            </div>

            {/* Input */}
            <input
                type="text"
                id={inputId}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoFocus={autoFocus}
                disabled={disabled}
                className={`
                    block w-full ${sizes[size]} pl-10 pr-10
                    border border-gray-300 rounded-lg 
                    text-gray-900 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                    hover:border-gray-400
                    disabled:bg-gray-100 disabled:cursor-not-allowed
                    transition-colors
                `.trim().replace(/\s+/g, ' ')}
                {...props}
            />

            {/* Clear Button */}
            {value && !disabled && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear search"
                >
                    <svg 
                        className={iconSizes[size]} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="2" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M6 18L18 6M6 6l12 12" 
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}
