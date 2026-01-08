import { useId } from 'react';

/**
 * TextInput Component
 * A flexible text input with label, icons, error, and hint support
 * 
 * React 19 compatible - uses useId hook and ref as prop
 * 
 * @param {string} label - Input label
 * @param {string} error - Error message
 * @param {string} hint - Hint text below input
 * @param {React.ReactNode} icon - Left icon
 * @param {React.ReactNode} rightIcon - Right icon
 * @param {boolean} required - Show required indicator
 * @param {boolean} disabled - Disable input
 * @param {boolean} readOnly - Make input read-only
 * @param {string} className - Additional CSS classes for input
 * @param {string} containerClassName - Additional CSS classes for container
 * @param {React.Ref} ref - Forwarded ref (React 19 style)
 */
export default function TextInput({
    label,
    error,
    hint,
    icon,
    rightIcon,
    required = false,
    disabled = false,
    readOnly = false,
    className = '',
    containerClassName = '',
    id,
    ref, // React 19: ref as prop
    ...props
}) {
    // Use React's useId for SSR-safe unique IDs
    const generatedId = useId();
    const inputId = id || `textinput${generatedId}`;
    
    const hasLeftIcon = !!icon;
    const hasRightIcon = !!rightIcon;
    
    // Calculate padding based on icons
    const getPaddingClasses = () => {
        if (hasLeftIcon && hasRightIcon) return 'pl-11 pr-11';
        if (hasLeftIcon) return 'pl-11 pr-3';
        if (hasRightIcon) return 'pl-3 pr-11';
        return 'px-3';
    };

    const inputClasses = `
        w-full rounded-lg border py-2.5 text-gray-900 placeholder-gray-400 
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-0
        ${getPaddingClasses()}
        ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        ${readOnly ? 'bg-gray-50' : ''}
        ${error 
            ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
            : 'border-gray-300 hover:border-gray-400 focus:border-primary-500 focus:ring-primary-500/20'
        }
        ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
        <div className={containerClassName}>
            {label && (
                <label 
                    htmlFor={inputId}
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                    {label}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}
            <div className="relative">
                {/* Left Icon */}
                {icon && (
                    <div className="absolute inset-y-0 left-0 w-11 flex items-center justify-center pointer-events-none">
                        <span className="text-gray-400">
                            {icon}
                        </span>
                    </div>
                )}
                
                <input
                    ref={ref}
                    id={inputId}
                    className={inputClasses}
                    disabled={disabled}
                    readOnly={readOnly}
                    aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                    aria-invalid={!!error}
                    aria-required={required}
                    {...props}
                />
                
                {/* Right Icon */}
                {rightIcon && (
                    <div className="absolute inset-y-0 right-0 w-11 flex items-center justify-center pointer-events-none">
                        <span className="text-gray-400">
                            {rightIcon}
                        </span>
                    </div>
                )}
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
        </div>
    );
}
