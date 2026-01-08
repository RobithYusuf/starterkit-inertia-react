import { useState, useRef, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { getDropdownContainer } from '@/Utils/portal';

/**
 * MultiSelect Component
 * A multi-value select component with search and tags
 * 
 * React 19 compatible - uses useId hook
 * 
 * @param {Array} value - Array of selected values
 * @param {function} onChange - Callback when selection changes
 * @param {Array} options - Array of options {value, label}
 * @param {string} label - Input label
 * @param {string} placeholder - Placeholder text
 * @param {string} searchPlaceholder - Search input placeholder
 * @param {string} error - Error message
 * @param {string} hint - Hint text
 * @param {boolean} disabled - Disable select
 * @param {boolean} required - Mark as required
 * @param {boolean} searchable - Enable search
 * @param {boolean} clearable - Show clear all button
 * @param {number} maxItems - Maximum selectable items
 * @param {string} className - Additional CSS classes
 * @param {string} id - Custom input ID
 * @param {string} name - Input name
 */
export default function MultiSelect({
    value = [],
    onChange,
    options = [],
    label,
    placeholder = 'Pilih opsi...',
    searchPlaceholder = 'Cari...',
    error,
    hint,
    disabled = false,
    required = false,
    searchable = true,
    clearable = true,
    maxItems,
    className = '',
    id,
    name,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const triggerRef = useRef(null);
    const menuRef = useRef(null);
    const searchInputRef = useRef(null);

    // Use React's useId for SSR-safe unique IDs
    const generatedId = useId();
    const inputId = id || `multiselect${generatedId}`;

    // Filter options based on search
    const filteredOptions = options.filter(option => {
        const labelMatch = option.label.toLowerCase().includes(search.toLowerCase());
        const notSelected = !value.includes(option.value);
        return labelMatch && notSelected;
    });

    // Get selected option labels
    const getSelectedLabel = (val) => {
        const option = options.find(o => o.value === val);
        return option?.label || val;
    };

    // Handle option selection
    const handleSelect = (optionValue) => {
        if (maxItems && value.length >= maxItems) return;
        
        const newValue = [...value, optionValue];
        onChange?.(newValue);
        setSearch('');
    };

    // Handle option removal
    const handleRemove = (optionValue) => {
        const newValue = value.filter(v => v !== optionValue);
        onChange?.(newValue);
    };

    // Handle clear all
    const handleClear = () => {
        onChange?.([]);
    };

    // Update position
    useEffect(() => {
        if (isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const menuHeight = 250;
            const spaceBelow = window.innerHeight - rect.bottom;
            const openUpward = spaceBelow < menuHeight && rect.top > menuHeight;
            
            setCoords({
                top: openUpward ? rect.top - menuHeight - 4 : rect.bottom + 4,
                left: rect.left,
                width: rect.width,
            });
        }
    }, [isOpen]);

    // Focus search on open
    useEffect(() => {
        if (isOpen && searchable) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 0);
        }
    }, [isOpen, searchable]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                isOpen &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target) &&
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                setIsOpen(false);
                setSearch('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className={className}>
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

            {/* Trigger */}
            <div
                ref={triggerRef}
                id={inputId}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                aria-invalid={!!error}
                aria-required={required}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                tabIndex={disabled ? -1 : 0}
                onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }
                }}
                className={`
                    min-h-[42px] w-full px-3 py-2 rounded-lg border bg-white
                    flex flex-wrap items-center gap-2
                    ${error ? 'border-red-500' : isOpen ? 'border-primary-500 ring-2 ring-primary-500/20' : 'border-gray-300'}
                    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}
                    focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                `}
            >
                {/* Selected tags */}
                {value.length > 0 ? (
                    <>
                        {value.map((val) => (
                            <span
                                key={val}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 text-sm rounded-md"
                            >
                                {getSelectedLabel(val)}
                                {!disabled && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemove(val);
                                        }}
                                        className="hover:text-primary-900"
                                        aria-label={`Hapus ${getSelectedLabel(val)}`}
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </span>
                        ))}
                    </>
                ) : (
                    <span className="text-gray-400">{placeholder}</span>
                )}

                {/* Actions */}
                <div className="ml-auto flex items-center gap-1">
                    {clearable && value.length > 0 && !disabled && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClear();
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600"
                            aria-label="Hapus semua"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                    <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Hint & Error */}
            {hint && !error && (
                <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-gray-500">
                    {hint}
                </p>
            )}
            {error && (
                <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-500" role="alert">
                    {error}
                </p>
            )}

            {/* Dropdown menu */}
            {isOpen && createPortal(
                <div
                    ref={menuRef}
                    className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden animate-slide-in-up"
                    style={{
                        top: `${coords.top}px`,
                        left: `${coords.left}px`,
                        width: `${coords.width}px`,
                    }}
                    role="listbox"
                    aria-labelledby={inputId}
                >
                    {/* Search */}
                    {searchable && (
                        <div className="p-2 border-b border-gray-200">
                            <div className="relative">
                                <svg
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={searchPlaceholder}
                                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    )}

                    {/* Options */}
                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    role="option"
                                    aria-selected={value.includes(option.value)}
                                    onClick={() => handleSelect(option.value)}
                                    disabled={maxItems && value.length >= maxItems}
                                    className={`
                                        w-full text-left px-4 py-2.5 text-sm transition-colors
                                        ${maxItems && value.length >= maxItems
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }
                                    `}
                                >
                                    {option.label}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-8 text-center text-sm text-gray-500">
                                Tidak ada opsi
                            </div>
                        )}
                    </div>

                    {/* Max items info */}
                    {maxItems && (
                        <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
                            {value.length} / {maxItems} dipilih
                        </div>
                    )}
                </div>,
                getDropdownContainer()
            )}
        </div>
    );
}
