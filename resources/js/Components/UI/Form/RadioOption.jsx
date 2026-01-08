import { useId } from 'react';

/**
 * RadioOption Component
 * A visual radio button with title and description
 * 
 * React 19 compatible - uses useId hook
 * 
 * @param {string} id - Custom input ID
 * @param {string} name - Radio group name
 * @param {*} value - Radio value
 * @param {boolean} checked - Checked state
 * @param {function} onChange - Callback when value changes
 * @param {string} title - Title text
 * @param {string} description - Description text
 * @param {React.ReactNode} icon - Optional icon
 * @param {string} variant - Variant: 'default' | 'success' | 'danger'
 * @param {boolean} disabled - Disable radio
 */
export default function RadioOption({
    id,
    name,
    value,
    checked = false,
    onChange,
    title = '',
    description = '',
    icon = null,
    variant = 'default',
    disabled = false,
}) {
    // Use React's useId for SSR-safe unique IDs
    const generatedId = useId();
    const inputId = id || `radio${generatedId}`;

    const getColors = () => {
        const colorMap = {
            default: {
                border: checked ? 'var(--color-primary-600)' : '#e5e7eb',
                bg: checked ? 'var(--color-primary-50)' : 'white',
                icon: checked ? 'var(--color-primary-600)' : '#9ca3af',
                check: 'var(--color-primary-600)'
            },
            success: {
                border: checked ? '#10b981' : '#e5e7eb',
                bg: checked ? '#d1fae5' : 'white',
                icon: checked ? '#10b981' : '#9ca3af',
                check: '#10b981'
            },
            danger: {
                border: checked ? '#ef4444' : '#e5e7eb',
                bg: checked ? '#fee2e2' : 'white',
                icon: checked ? '#ef4444' : '#9ca3af',
                check: '#ef4444'
            }
        };
        return colorMap[variant] || colorMap.default;
    };

    const colors = getColors();

    const handleClick = () => {
        if (!disabled && onChange) {
            onChange(value);
        }
    };

    return (
        <label
            htmlFor={inputId}
            className={`relative block p-3 rounded-lg border transition-all duration-200 cursor-pointer
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-sm'}`}
            style={{
                borderColor: colors.border,
                backgroundColor: colors.bg,
            }}
            onClick={handleClick}
        >
            <input
                id={inputId}
                type="radio"
                name={name}
                value={typeof value === 'boolean' ? String(value) : value}
                checked={checked}
                onChange={() => {}}
                disabled={disabled}
                className="sr-only"
                aria-describedby={description ? `${inputId}-description` : undefined}
            />

            <div className="flex items-start">
                {/* Custom Radio Circle */}
                <div 
                    className="flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-200 flex-shrink-0 mt-0.5"
                    style={{ borderColor: checked ? colors.check : '#d1d5db' }}
                    aria-hidden="true"
                >
                    {checked && (
                        <div 
                            className="w-2 h-2 rounded-full transition-all duration-200"
                            style={{ backgroundColor: colors.check }}
                        />
                    )}
                </div>

                {/* Content */}
                <div className="ml-3 flex-1">
                    <div className="flex items-start">
                        {icon && (
                            <span 
                                className="text-base mr-2.5 flex-shrink-0 mt-0.5"
                                style={{ color: colors.icon }}
                                aria-hidden="true"
                            >
                                {icon}
                            </span>
                        )}

                        <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">
                                {title}
                            </div>
                            {description && (
                                <div 
                                    id={`${inputId}-description`}
                                    className="mt-0.5 text-xs text-gray-500"
                                >
                                    {description}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </label>
    );
}
