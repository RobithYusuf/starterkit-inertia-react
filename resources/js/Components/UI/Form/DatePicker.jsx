import { useState, useRef, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { getDropdownContainer } from '@/Utils/portal';

/**
 * DatePicker Component
 * A calendar date picker component
 * 
 * React 19 compatible - uses useId hook
 * 
 * @param {string} value - Selected date value (ISO string)
 * @param {function} onChange - Callback when date changes
 * @param {string} label - Input label
 * @param {string} placeholder - Input placeholder
 * @param {string} error - Error message
 * @param {string} hint - Hint text
 * @param {boolean} disabled - Disable picker
 * @param {boolean} required - Mark as required
 * @param {string|Date} minDate - Minimum selectable date
 * @param {string|Date} maxDate - Maximum selectable date
 * @param {string} format - Date format string
 * @param {string} className - Additional CSS classes
 * @param {string} id - Custom input ID
 * @param {string} name - Input name
 */
export default function DatePicker({
    value,
    onChange,
    label,
    placeholder = 'Pilih tanggal',
    error,
    hint,
    disabled = false,
    required = false,
    minDate,
    maxDate,
    format = 'dd/MM/yyyy',
    className = '',
    id,
    name,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(() => {
        if (value) return new Date(value);
        return new Date();
    });
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);
    const calendarRef = useRef(null);

    // Use React's useId for SSR-safe unique IDs
    const generatedId = useId();
    const inputId = id || `datepicker${generatedId}`;

    // Days and months
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    // Format date for display
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        
        return format
            .replace('dd', day)
            .replace('MM', month)
            .replace('yyyy', year);
    };

    // Get days in month
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        
        const days = [];
        
        // Previous month days
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startingDay - 1; i >= 0; i--) {
            days.push({
                date: new Date(year, month - 1, prevMonthLastDay - i),
                isCurrentMonth: false,
            });
        }
        
        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                date: new Date(year, month, i),
                isCurrentMonth: true,
            });
        }
        
        // Next month days
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false,
            });
        }
        
        return days;
    };

    // Check if date is selectable
    const isDateSelectable = (date) => {
        if (minDate && date < new Date(minDate).setHours(0, 0, 0, 0)) return false;
        if (maxDate && date > new Date(maxDate).setHours(23, 59, 59, 999)) return false;
        return true;
    };

    // Check if date is selected
    const isDateSelected = (date) => {
        if (!value) return false;
        const selected = new Date(value);
        return date.toDateString() === selected.toDateString();
    };

    // Check if date is today
    const isToday = (date) => {
        return date.toDateString() === new Date().toDateString();
    };

    // Handle date selection
    const handleDateSelect = (date) => {
        if (!isDateSelectable(date)) return;
        onChange?.(date.toISOString().split('T')[0]);
        setIsOpen(false);
    };

    // Navigate months
    const goToPrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    // Update position
    useEffect(() => {
        if (isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const calendarHeight = 320;
            const spaceBelow = window.innerHeight - rect.bottom;
            const openUpward = spaceBelow < calendarHeight && rect.top > calendarHeight;
            
            setCoords({
                top: openUpward ? rect.top - calendarHeight - 4 : rect.bottom + 4,
                left: rect.left,
            });
        }
    }, [isOpen]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                isOpen &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target) &&
                calendarRef.current &&
                !calendarRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const calendarDays = getDaysInMonth(currentMonth);

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

            {/* Input Trigger */}
            <div ref={triggerRef} className="relative">
                <input
                    type="text"
                    id={inputId}
                    name={name}
                    value={formatDate(value)}
                    placeholder={placeholder}
                    readOnly
                    disabled={disabled}
                    onClick={() => !disabled && setIsOpen(true)}
                    aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                    aria-invalid={!!error}
                    aria-required={required}
                    className={`
                        w-full pl-10 pr-4 py-2.5 rounded-lg border bg-white
                        ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary-500'}
                        focus:outline-none focus:ring-2 focus:border-transparent
                        ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                {value && !disabled && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange?.('');
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label="Hapus tanggal"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
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

            {/* Calendar Popup */}
            {isOpen && createPortal(
                <div
                    ref={calendarRef}
                    className="fixed z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-80 animate-slide-in-up"
                    style={{
                        top: `${coords.top}px`,
                        left: `${coords.left}px`,
                    }}
                    role="dialog"
                    aria-label="Pilih tanggal"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            type="button"
                            onClick={goToPrevMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Bulan sebelumnya"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <span className="font-semibold text-gray-900">
                            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </span>
                        <button
                            type="button"
                            onClick={goToNextMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Bulan berikutnya"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Day names */}
                    <div className="grid grid-cols-7 gap-1 mb-2" role="row">
                        {days.map((day) => (
                            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2" role="columnheader">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-1" role="grid">
                        {calendarDays.map(({ date, isCurrentMonth }, index) => {
                            const selectable = isDateSelectable(date);
                            const selected = isDateSelected(date);
                            const today = isToday(date);

                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleDateSelect(date)}
                                    disabled={!selectable}
                                    aria-label={date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    aria-selected={selected}
                                    className={`
                                        w-9 h-9 text-sm rounded-lg transition-colors
                                        ${!isCurrentMonth ? 'text-gray-300' : ''}
                                        ${selectable && isCurrentMonth && !selected ? 'text-gray-700 hover:bg-gray-100' : ''}
                                        ${!selectable ? 'text-gray-300 cursor-not-allowed' : ''}
                                        ${selected ? 'bg-primary-600 text-white hover:bg-primary-700' : ''}
                                        ${today && !selected ? 'ring-2 ring-primary-500 ring-inset' : ''}
                                    `}
                                >
                                    {date.getDate()}
                                </button>
                            );
                        })}
                    </div>

                    {/* Today button */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => {
                                const today = new Date();
                                setCurrentMonth(today);
                                handleDateSelect(today);
                            }}
                            className="w-full py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                            Hari Ini
                        </button>
                    </div>
                </div>,
                getDropdownContainer()
            )}
        </div>
    );
}
