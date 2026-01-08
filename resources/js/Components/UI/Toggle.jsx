import { useState } from 'react';

/**
 * Toggle Component
 * A toggle switch for boolean values
 */
export default function Toggle({
    checked = false,
    onChange,
    disabled = false,
    size = 'md',
    color = 'primary',
    label,
    labelPosition = 'right', // left, right
    description,
    className = '',
    id,
    name,
}) {
    const [internalChecked, setInternalChecked] = useState(checked);
    const isChecked = onChange ? checked : internalChecked;

    const handleToggle = () => {
        if (disabled) return;
        
        if (onChange) {
            onChange(!checked);
        } else {
            setInternalChecked(!internalChecked);
        }
    };

    // Size variants
    const sizes = {
        sm: {
            track: 'w-8 h-4',
            thumb: 'w-3 h-3',
            translate: 'translate-x-4',
        },
        md: {
            track: 'w-11 h-6',
            thumb: 'w-5 h-5',
            translate: 'translate-x-5',
        },
        lg: {
            track: 'w-14 h-7',
            thumb: 'w-6 h-6',
            translate: 'translate-x-7',
        },
    };

    // Color variants
    const colors = {
        primary: 'bg-primary-600',
        success: 'bg-green-600',
        danger: 'bg-red-600',
        warning: 'bg-yellow-500',
        info: 'bg-blue-600',
    };

    const currentSize = sizes[size] || sizes.md;
    const activeColor = colors[color] || colors.primary;

    const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`inline-flex items-start gap-3 ${className}`}>
            {/* Left label */}
            {label && labelPosition === 'left' && (
                <div className="flex flex-col">
                    <label htmlFor={toggleId} className="text-sm font-medium text-gray-900 cursor-pointer">
                        {label}
                    </label>
                    {description && (
                        <span className="text-sm text-gray-500">{description}</span>
                    )}
                </div>
            )}

            {/* Toggle */}
            <button
                type="button"
                role="switch"
                id={toggleId}
                name={name}
                aria-checked={isChecked}
                disabled={disabled}
                onClick={handleToggle}
                className={`
                    relative inline-flex shrink-0 rounded-full
                    transition-colors duration-200 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                    ${currentSize.track}
                    ${isChecked ? activeColor : 'bg-gray-200'}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
            >
                <span
                    className={`
                        pointer-events-none inline-block rounded-full bg-white shadow-lg
                        transform transition-transform duration-200 ease-in-out
                        ${currentSize.thumb}
                        ${isChecked ? currentSize.translate : 'translate-x-0.5'}
                        mt-0.5
                    `}
                />
            </button>

            {/* Right label */}
            {label && labelPosition === 'right' && (
                <div className="flex flex-col">
                    <label htmlFor={toggleId} className="text-sm font-medium text-gray-900 cursor-pointer">
                        {label}
                    </label>
                    {description && (
                        <span className="text-sm text-gray-500">{description}</span>
                    )}
                </div>
            )}
        </div>
    );
}
