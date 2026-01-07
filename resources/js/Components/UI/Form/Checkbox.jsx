import { forwardRef } from 'react';

const Checkbox = forwardRef(function Checkbox({
    label,
    error,
    className = '',
    ...props
}, ref) {
    return (
        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input
                    ref={ref}
                    type="checkbox"
                    className={`
                        h-4 w-4 rounded border-gray-300 text-primary-600 
                        focus:ring-2 focus:ring-primary-500 focus:ring-offset-0
                        transition-colors duration-200
                        ${className}
                    `}
                    {...props}
                />
            </div>
            {label && (
                <label className="ml-2 text-sm text-gray-600 select-none cursor-pointer">
                    {label}
                </label>
            )}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
});

export default Checkbox;
