import { useState, useRef, useEffect, useId } from 'react';

/**
 * TagInput Component
 * A tag/chip input component with suggestions and validation
 * 
 * React 19 compatible - uses useId hook and ref as prop
 * 
 * @param {string[]} value - Array of current tags
 * @param {function} onChange - Callback when tags change
 * @param {string} label - Input label
 * @param {string} placeholder - Input placeholder
 * @param {string} error - Error message
 * @param {string} hint - Hint text
 * @param {boolean} disabled - Disable input
 * @param {boolean} required - Mark as required
 * @param {number} maxTags - Maximum number of tags
 * @param {boolean} allowDuplicates - Allow duplicate tags
 * @param {string[]} suggestions - Array of suggested tags
 * @param {function} validateTag - Custom validation function
 * @param {string} tagVariant - Tag color variant: 'primary' | 'secondary' | 'outline'
 * @param {string} separator - Separator for multiple tags
 * @param {string} className - Additional CSS classes
 * @param {string} id - Custom input ID
 * @param {string} name - Input name
 * @param {React.Ref} ref - Forwarded ref (React 19 style)
 */
export default function TagInput({
    value = [],
    onChange,
    label,
    placeholder = 'Ketik dan tekan Enter...',
    error,
    hint,
    disabled = false,
    required = false,
    maxTags,
    allowDuplicates = false,
    suggestions = [],
    validateTag,
    tagVariant = 'primary',
    separator = ',',
    className = '',
    id,
    name,
    ref, // React 19: ref as prop
}) {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [validationError, setValidationError] = useState('');
    
    const internalRef = useRef(null);
    const inputRef = ref || internalRef;
    const containerRef = useRef(null);
    const suggestionsRef = useRef(null);

    // Use React's useId for SSR-safe unique IDs
    const generatedId = useId();
    const inputId = id || `taginput${generatedId}`;

    // Tag color variants
    const tagColors = {
        primary: 'bg-primary-100 text-primary-700 hover:bg-primary-200',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        outline: 'bg-white text-primary-600 border border-primary-300 hover:bg-primary-50',
    };

    const colors = tagColors[tagVariant] || tagColors.primary;

    // Filter suggestions based on input
    const filteredSuggestions = suggestions.filter(
        s => s.toLowerCase().includes(inputValue.toLowerCase()) && 
             (allowDuplicates || !value.includes(s))
    );

    // Add a single tag
    const addTag = (tag) => {
        const trimmedTag = tag.trim();
        
        if (!trimmedTag) return false;
        
        if (!allowDuplicates && value.includes(trimmedTag)) {
            setValidationError('Tag sudah ada');
            setTimeout(() => setValidationError(''), 2000);
            return false;
        }
        
        if (maxTags && value.length >= maxTags) {
            setValidationError(`Maksimal ${maxTags} tags`);
            setTimeout(() => setValidationError(''), 2000);
            return false;
        }
        
        if (validateTag) {
            const result = validateTag(trimmedTag);
            if (result !== true) {
                setValidationError(result || 'Tag tidak valid');
                setTimeout(() => setValidationError(''), 2000);
                return false;
            }
        }

        onChange?.([...value, trimmedTag]);
        setInputValue('');
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        setValidationError('');
        return true;
    };

    // Add multiple tags from text with separator
    const addMultipleTags = (text) => {
        const tags = text.split(separator).map(t => t.trim()).filter(Boolean);
        const newValue = [...value];
        
        for (const tag of tags) {
            if (maxTags && newValue.length >= maxTags) break;
            if (!allowDuplicates && newValue.includes(tag)) continue;
            if (validateTag && validateTag(tag) !== true) continue;
            newValue.push(tag);
        }
        
        if (newValue.length > value.length) {
            onChange?.(newValue);
        }
        
        setInputValue('');
        setShowSuggestions(false);
    };

    // Remove tag by index
    const removeTag = (index) => {
        onChange?.(value.filter((_, i) => i !== index));
        // Focus input after removing
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Handle keyboard events
    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && filteredSuggestions[highlightedIndex]) {
                    addTag(filteredSuggestions[highlightedIndex]);
                } else {
                    addTag(inputValue);
                }
                break;
            case 'Backspace':
                if (!inputValue && value.length > 0) {
                    removeTag(value.length - 1);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setHighlightedIndex(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (showSuggestions && filteredSuggestions.length > 0) {
                    setHighlightedIndex(prev => 
                        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
                    );
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (showSuggestions && filteredSuggestions.length > 0) {
                    setHighlightedIndex(prev => 
                        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
                    );
                }
                break;
            case 'Tab':
                if (showSuggestions && highlightedIndex >= 0) {
                    e.preventDefault();
                    addTag(filteredSuggestions[highlightedIndex]);
                }
                break;
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        const val = e.target.value;
        
        // Check for separator to add multiple tags
        if (separator && val.includes(separator)) {
            addMultipleTags(val);
            return;
        }
        
        setInputValue(val);
        setShowSuggestions(val.length > 0 && filteredSuggestions.length > 0);
        setHighlightedIndex(-1);
        setValidationError('');
    };

    // Handle paste event
    const handlePaste = (e) => {
        const text = e.clipboardData.getData('text');
        if (separator && text.includes(separator)) {
            e.preventDefault();
            addMultipleTags(text);
        }
    };

    // Handle blur event
    const handleBlur = (e) => {
        // Don't close if clicking within container or suggestions
        if (containerRef.current?.contains(e.relatedTarget)) return;
        if (suggestionsRef.current?.contains(e.relatedTarget)) return;
        
        setTimeout(() => {
            setShowSuggestions(false);
            setHighlightedIndex(-1);
        }, 150);
        
        // Auto-add tag on blur if there's content
        if (inputValue.trim()) {
            addTag(inputValue);
        }
    };

    // Scroll highlighted suggestion into view
    useEffect(() => {
        if (highlightedIndex >= 0 && suggestionsRef.current?.children[0]) {
            const container = suggestionsRef.current.children[0];
            const item = container.children[highlightedIndex];
            if (item) {
                item.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [highlightedIndex]);

    // Handle outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowSuggestions(false);
                setHighlightedIndex(-1);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const displayError = error || validationError;
    const isMaxReached = maxTags && value.length >= maxTags;

    return (
        <div className={className} ref={containerRef}>
            {/* Label */}
            {label && (
                <label 
                    htmlFor={inputId} 
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                    {label}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}

            {/* Tags Display */}
            {value.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                    {value.map((tag, index) => (
                        <span
                            key={`${tag}-${index}`}
                            className={`
                                inline-flex items-center gap-1
                                px-2.5 py-1 text-sm font-medium rounded-md
                                transition-colors duration-150
                                ${colors}
                            `}
                        >
                            <span className="max-w-[150px] truncate">{tag}</span>
                            {!disabled && (
                                <button
                                    type="button"
                                    onClick={() => removeTag(index)}
                                    className="ml-0.5 rounded-full p-0.5 hover:bg-black/10 focus:outline-none transition-colors"
                                    aria-label={`Hapus ${tag}`}
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </span>
                    ))}
                </div>
            )}

            {/* Input Field */}
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    id={inputId}
                    name={name}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    onFocus={() => {
                        if (inputValue && filteredSuggestions.length > 0) {
                            setShowSuggestions(true);
                        }
                    }}
                    onBlur={handleBlur}
                    placeholder={isMaxReached ? 'Maksimal tag tercapai' : placeholder}
                    disabled={disabled || isMaxReached}
                    autoComplete="off"
                    aria-describedby={displayError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                    aria-invalid={!!displayError}
                    className={`
                        w-full rounded-lg border px-3 py-2.5 
                        text-gray-900 placeholder-gray-400 
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-offset-0
                        ${displayError 
                            ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-300 hover:border-gray-400 focus:border-primary-500 focus:ring-primary-500/20'
                        }
                        ${(disabled || isMaxReached) ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
                    `}
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <div ref={suggestionsRef} className="absolute z-50 w-full mt-1">
                        <div className="py-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-48 overflow-y-auto animate-slide-in-up">
                            {filteredSuggestions.map((suggestion, index) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                        addTag(suggestion);
                                        inputRef.current?.focus();
                                    }}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                    className={`
                                        w-full text-left px-3 py-2 text-sm
                                        flex items-center gap-2 transition-colors
                                        ${highlightedIndex === index 
                                            ? 'bg-primary-50 text-primary-700' 
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                    </svg>
                                    <span className="flex-1">{suggestion}</span>
                                    {highlightedIndex === index && (
                                        <kbd className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Enter</kbd>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer - hint/error and counter */}
            <div className="flex items-center justify-between mt-1.5">
                <div>
                    {displayError && (
                        <p id={`${inputId}-error`} className="text-sm text-red-600" role="alert">
                            {displayError}
                        </p>
                    )}
                    {!displayError && hint && (
                        <p id={`${inputId}-hint`} className="text-sm text-gray-500">
                            {hint}
                        </p>
                    )}
                </div>
                
                {maxTags && (
                    <span className={`text-sm ${isMaxReached ? 'text-amber-500' : 'text-gray-400'}`}>
                        {value.length}/{maxTags}
                    </span>
                )}
            </div>
        </div>
    );
}
