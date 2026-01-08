import { useState, useRef, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';

/**
 * Select Component
 * A custom styled dropdown select with search support
 * 
 * React 19 compatible - uses useId hook
 * 
 * @param {string} id - Custom input ID
 * @param {string} name - Input name
 * @param {string} value - Selected value
 * @param {function} onChange - Callback when value changes
 * @param {string} label - Input label
 * @param {Array} options - Array of options (string or {value, label})
 * @param {string} placeholder - Placeholder text
 * @param {string} error - Error message
 * @param {boolean} required - Show required indicator
 * @param {boolean} disabled - Disable select
 * @param {boolean} searchable - Enable search functionality
 * @param {string} size - Size variant: 'sm' | 'md' | 'lg'
 * @param {React.ReactNode} icon - Left icon
 * @param {string} className - Additional CSS classes
 */
export default function Select({
    id,
    name,
    value = '',
    onChange,
    label = '',
    options = [],
    placeholder = 'Select an option',
    error = '',
    hint = '',
    required = false,
    disabled = false,
    searchable = false,
    size = 'md',
    icon = null,
    className = '',
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);

    // Use React's useId for SSR-safe unique IDs
    const generatedId = useId();
    const inputId = id || `select${generatedId}`;
    const inputName = name || inputId;

    const sizes = {
        sm: 'h-9 text-sm',
        md: 'h-[42px] text-sm',
        lg: 'h-12 text-base'
    };

    // Normalize options to always have {value, label} format
    const normalizedOptions = options.map(opt =>
        typeof opt === 'object' ? opt : { value: opt, label: opt }
    );

    // Filter options based on search query
    const filteredOptions = searchable && searchQuery
        ? normalizedOptions.filter(opt =>
            opt.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : normalizedOptions;

    // Get selected option label
    const selectedOption = normalizedOptions.find(opt => opt.value === value);
    const selectedLabel = selectedOption?.label || '';

    const updateDropdownPosition = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            const dropdownMaxHeight = 250;
            const gap = 4;

            const showAbove = spaceBelow < dropdownMaxHeight && spaceAbove > spaceBelow;
            const estimatedHeight = Math.min(dropdownMaxHeight, filteredOptions.length * 40 + (searchable ? 50 : 0));

            setDropdownPosition({
                top: showAbove
                    ? rect.top - estimatedHeight - gap + window.scrollY
                    : rect.bottom + gap + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                showAbove,
                maxHeight: showAbove ? Math.min(spaceAbove - gap, dropdownMaxHeight) : Math.min(spaceBelow - gap, dropdownMaxHeight)
            });
        }
    };

    const openDropdown = () => {
        if (disabled) return;
        updateDropdownPosition();
        setIsOpen(true);
        setHighlightedIndex(filteredOptions.findIndex(opt => opt.value === value));

        if (searchable) {
            setTimeout(() => searchInputRef.current?.focus(), 10);
        }
    };

    const closeDropdown = () => {
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(-1);
    };

    const toggleDropdown = () => {
        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    };

    const selectOption = (option) => {
        if (option.disabled) return;
        onChange?.(option.value, option);
        closeDropdown();
    };

    const handleKeydown = (event) => {
        if (!isOpen) {
            if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
                event.preventDefault();
                openDropdown();
            }
            return;
        }

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                setHighlightedIndex(prev => Math.min(prev + 1, filteredOptions.length - 1));
                break;
            case 'ArrowUp':
                event.preventDefault();
                setHighlightedIndex(prev => Math.max(prev - 1, 0));
                break;
            case 'Enter':
                event.preventDefault();
                if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
                    selectOption(filteredOptions[highlightedIndex]);
                }
                break;
            case 'Escape':
                event.preventDefault();
                closeDropdown();
                triggerRef.current?.focus();
                break;
            case 'Tab':
                closeDropdown();
                break;
        }
    };

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                triggerRef.current && !triggerRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)
            ) {
                closeDropdown();
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            window.addEventListener('scroll', updateDropdownPosition, true);
            window.addEventListener('resize', updateDropdownPosition);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('scroll', updateDropdownPosition, true);
            window.removeEventListener('resize', updateDropdownPosition);
        };
    }, [isOpen]);

    return (
        <div className={className}>
            {label && (
                <label 
                    htmlFor={inputId} 
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                    {label}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}

            {/* Hidden input for form submission */}
            <input type="hidden" name={inputName} value={value} />

            {/* Trigger Button */}
            <div className="relative">
                {/* Left Icon */}
                {icon && (
                    <div className="absolute inset-y-0 left-0 w-11 flex items-center justify-center pointer-events-none z-10">
                        <span className="text-gray-400">
                            {icon}
                        </span>
                    </div>
                )}
                
                <button
                    ref={triggerRef}
                    type="button"
                    id={inputId}
                    onClick={toggleDropdown}
                    onKeyDown={handleKeydown}
                    disabled={disabled}
                    className={`w-full flex items-center justify-between ${icon ? 'pl-11' : 'pl-3'} pr-3 ${sizes[size]} border rounded-lg 
                        text-left transition-all duration-200 
                        focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                        ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
                        ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white cursor-pointer'}`}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                    aria-invalid={!!error}
                    aria-required={required}
                >
                    <span className={`flex-1 truncate ${selectedLabel ? 'text-gray-900' : 'text-gray-500'}`}>
                        {selectedLabel || placeholder}
                    </span>
                    <svg 
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="2" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
            </div>

            {hint && !error && (
                <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-gray-500">
                    {hint}
                </p>
            )}
            {error && (
                <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}

            {/* Dropdown Portal */}
            {isOpen && createPortal(
                <div
                    ref={dropdownRef}
                    className="fixed z-[9999] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden animate-slide-in-up"
                    style={{
                        top: dropdownPosition.top,
                        left: dropdownPosition.left,
                        width: dropdownPosition.width,
                        maxHeight: dropdownPosition.maxHeight || 250
                    }}
                    role="listbox"
                    aria-labelledby={inputId}
                >
                    {/* Search Input */}
                    {searchable && (
                        <div className="p-2 border-b border-gray-100">
                            <div className="relative">
                                <svg 
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth="2" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleKeydown}
                                    placeholder="Search..."
                                    className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-md
                                        focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                        </div>
                    )}

                    {/* Options List */}
                    <div className="overflow-y-auto" style={{ maxHeight: searchable ? 190 : 240 }}>
                        {filteredOptions.length === 0 ? (
                            <div className="px-3 py-6 text-center text-sm text-gray-500">
                                No options found
                            </div>
                        ) : (
                            filteredOptions.map((option, index) => (
                                <div
                                    key={option.value}
                                    role="option"
                                    aria-selected={option.value === value}
                                    onClick={() => selectOption(option)}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                    className={`flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors
                                        ${option.value === value ? 'bg-primary-50 text-primary-700' : ''}
                                        ${highlightedIndex === index && option.value !== value ? 'bg-gray-100' : ''}
                                        ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                                >
                                    <span className={`text-sm ${option.value === value ? 'font-medium' : ''}`}>
                                        {option.label}
                                    </span>
                                    {option.value === value && (
                                        <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
