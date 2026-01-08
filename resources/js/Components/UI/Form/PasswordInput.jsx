import { useState, useId } from 'react';

/**
 * PasswordInput Component
 * A password input with visibility toggle
 * 
 * React 19 compatible - uses useId hook and ref as prop
 * 
 * @param {string} label - Input label
 * @param {string} error - Error message
 * @param {string} hint - Hint text
 * @param {React.ReactNode} icon - Left icon
 * @param {boolean} required - Show required indicator
 * @param {boolean} disabled - Disable input
 * @param {string} className - Additional CSS classes for input
 * @param {string} containerClassName - Additional CSS classes for container
 * @param {React.Ref} ref - Forwarded ref (React 19 style)
 */
export default function PasswordInput({
    label,
    error,
    hint,
    icon,
    required = false,
    disabled = false,
    className = '',
    containerClassName = '',
    id,
    ref, // React 19: ref as prop
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);
    
    // Use React's useId for SSR-safe unique IDs
    const generatedId = useId();
    const inputId = id || `password${generatedId}`;
    
    const hasIcon = !!icon;

    const inputClasses = `
        w-full rounded-lg border py-2.5 text-gray-900 placeholder-gray-400 
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-0
        ${hasIcon ? 'pl-11' : 'pl-3'} pr-11
        ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
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
                    type={showPassword ? 'text' : 'password'}
                    id={inputId}
                    className={inputClasses}
                    disabled={disabled}
                    aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                    aria-invalid={!!error}
                    aria-required={required}
                    {...props}
                />
                
                {/* Toggle Password Visibility Button */}
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 w-11 flex items-center justify-center text-gray-400 hover:text-gray-600 focus:outline-none"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    )}
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
        </div>
    );
}
