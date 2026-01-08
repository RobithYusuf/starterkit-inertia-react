/**
 * Spinner Component
 * A loading spinner with customizable size and color
 */
export default function Spinner({
    size = 'md',
    color = 'primary',
    className = '',
    label = 'Loading...',
    showLabel = false,
}) {
    // Size variants
    const sizes = {
        xs: 'w-3 h-3 border',
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-8 h-8 border-2',
        xl: 'w-12 h-12 border-3',
    };

    // Color variants
    const colors = {
        primary: 'border-primary-600 border-t-transparent',
        white: 'border-white border-t-transparent',
        gray: 'border-gray-600 border-t-transparent',
        current: 'border-current border-t-transparent',
    };

    return (
        <div className={`inline-flex items-center gap-2 ${className}`} role="status">
            <div
                className={`
                    rounded-full animate-spin
                    ${sizes[size] || sizes.md}
                    ${colors[color] || colors.primary}
                `}
            />
            {showLabel && (
                <span className="text-sm text-gray-600">{label}</span>
            )}
            <span className="sr-only">{label}</span>
        </div>
    );
}
