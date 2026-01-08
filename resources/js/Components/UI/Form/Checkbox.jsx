import { useId } from 'react';

/**
 * Checkbox Component
 * A styled checkbox with label and description support
 * 
 * React 19 compatible - uses useId hook and ref as prop
 * 
 * @param {string} id - Custom input ID
 * @param {string} name - Input name
 * @param {boolean} checked - Checked state
 * @param {function} onChange - Callback when value changes
 * @param {string} value - Checkbox value
 * @param {string} label - Label text
 * @param {string} description - Description text
 * @param {boolean} disabled - Disable checkbox
 * @param {string} error - Error message
 * @param {string} size - Size variant: 'sm' | 'md' | 'lg'
 * @param {string} className - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref (React 19 style)
 */
export default function Checkbox({
    id,
    name,
    checked = false,
    onChange,
    value = '',
    label = '',
    description = '',
    disabled = false,
    error = '',
    size = 'md',
    className = '',
    ref, // React 19: ref as prop
}) {
    // Use React's useId for SSR-safe unique IDs
    const generatedId = useId();
    const inputId = id || `checkbox${generatedId}`;
    const inputName = name || inputId;

    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    };

    const handleChange = (event) => {
        onChange?.(event.target.checked, event);
    };

    return (
        <div className="flex items-start gap-3">
            <div className="flex items-center h-5 mt-0.5">
                <input
                    ref={ref}
                    type="checkbox"
                    id={inputId}
                    name={inputName}
                    value={value}
                    checked={checked}
                    disabled={disabled}
                    onChange={handleChange}
                    aria-describedby={description ? `${inputId}-description` : undefined}
                    aria-invalid={!!error}
                    className={`
                        ${sizes[size]} rounded border-gray-300 text-primary-600 
                        focus:ring-2 focus:ring-primary-500 focus:ring-offset-0
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-colors duration-200
                        ${error ? 'border-red-500' : ''}
                        ${className}
                    `}
                />
            </div>

            {(label || description) && (
                <div className="flex-1">
                    {label && (
                        <label
                            htmlFor={inputId}
                            className={`text-sm font-medium text-gray-700 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            {label}
                        </label>
                    )}
                    {description && (
                        <p 
                            id={`${inputId}-description`}
                            className="text-xs text-gray-500 mt-0.5"
                        >
                            {description}
                        </p>
                    )}
                    {error && (
                        <p className="text-sm text-red-600 mt-1" role="alert">
                            {error}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
