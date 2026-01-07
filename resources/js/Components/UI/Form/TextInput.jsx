import { forwardRef } from 'react';

const TextInput = forwardRef(function TextInput({
    label,
    error,
    hint,
    required = false,
    className = '',
    containerClassName = '',
    ...props
}, ref) {
    const inputClasses = `
        w-full rounded-lg border px-4 py-2.5 text-gray-900 placeholder-gray-400 
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-0
        disabled:bg-gray-100 disabled:cursor-not-allowed
        ${error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
            : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500/20'
        }
        ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
        <div className={containerClassName}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}
            <input
                ref={ref}
                className={inputClasses}
                {...props}
            />
            {hint && !error && (
                <p className="mt-1.5 text-sm text-gray-500">{hint}</p>
            )}
            {error && (
                <p className="mt-1.5 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
});

export default TextInput;
