import { useId } from 'react';

/**
 * Textarea Component
 * A multi-line text input with character count support
 * 
 * React 19 compatible - uses useId hook and ref as prop
 * 
 * @param {string} label - Input label
 * @param {string} error - Error message
 * @param {string} hint - Hint text
 * @param {boolean} required - Show required indicator
 * @param {boolean} disabled - Disable input
 * @param {boolean} readOnly - Make input read-only
 * @param {number} rows - Number of rows
 * @param {number} maxLength - Maximum character length
 * @param {boolean} showCount - Show character count
 * @param {string} resize - Resize behavior: 'none' | 'vertical' | 'horizontal' | 'both'
 * @param {string} className - Additional CSS classes for textarea
 * @param {string} containerClassName - Additional CSS classes for container
 * @param {React.Ref} ref - Forwarded ref (React 19 style)
 */
export default function Textarea({
    label,
    error,
    hint,
    required = false,
    disabled = false,
    readOnly = false,
    rows = 4,
    maxLength = null,
    showCount = false,
    resize = 'vertical',
    className = '',
    containerClassName = '',
    value = '',
    id,
    ref, // React 19: ref as prop
    ...props
}) {
    // Use React's useId for SSR-safe unique IDs
    const generatedId = useId();
    const textareaId = id || `textarea${generatedId}`;
    
    const charCount = value?.length || 0;

    const resizeClasses = {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize'
    };

    const textareaClasses = `
        w-full rounded-lg border px-3 py-2.5 text-gray-900 placeholder-gray-400 
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-0
        ${resizeClasses[resize] || resizeClasses.vertical}
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
                    htmlFor={textareaId}
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                    {label}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}
            <textarea
                ref={ref}
                id={textareaId}
                rows={rows}
                maxLength={maxLength}
                disabled={disabled}
                readOnly={readOnly}
                className={textareaClasses}
                value={value}
                aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
                aria-invalid={!!error}
                aria-required={required}
                {...props}
            />
            <div className="flex justify-between mt-1.5">
                {error ? (
                    <p id={`${textareaId}-error`} className="text-sm text-red-600" role="alert">
                        {error}
                    </p>
                ) : hint ? (
                    <p id={`${textareaId}-hint`} className="text-sm text-gray-500">
                        {hint}
                    </p>
                ) : (
                    <span></span>
                )}
                
                {showCount && (
                    <p className="text-xs text-gray-500">
                        {charCount}{maxLength ? ` / ${maxLength}` : ''}
                    </p>
                )}
            </div>
        </div>
    );
}
