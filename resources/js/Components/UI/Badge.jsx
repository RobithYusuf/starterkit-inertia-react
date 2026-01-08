/**
 * Badge Component
 * A label/tag component with various styles
 */
export default function Badge({
    children,
    variant = 'default', // default, primary, success, warning, danger, info
    size = 'md',
    rounded = false,
    dot = false,
    removable = false,
    onRemove,
    className = '',
}) {
    // Size variants
    const sizes = {
        xs: 'text-xs px-1.5 py-0.5',
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-0.5',
        lg: 'text-sm px-3 py-1',
    };

    // Color variants
    const variants = {
        default: 'bg-gray-100 text-gray-700 border border-gray-200',
        primary: 'bg-primary-100 text-primary-700 border border-primary-200',
        success: 'bg-green-100 text-green-700 border border-green-200',
        warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
        danger: 'bg-red-100 text-red-700 border border-red-200',
        info: 'bg-blue-100 text-blue-700 border border-blue-200',
    };

    // Dot colors
    const dotColors = {
        default: 'bg-gray-400',
        primary: 'bg-primary-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        danger: 'bg-red-500',
        info: 'bg-blue-500',
    };

    return (
        <span
            className={`
                inline-flex items-center gap-1.5 font-medium
                ${sizes[size] || sizes.md}
                ${variants[variant] || variants.default}
                ${rounded ? 'rounded-full' : 'rounded-md'}
                ${className}
            `}
        >
            {dot && (
                <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || dotColors.default}`} />
            )}
            {children}
            {removable && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="ml-0.5 -mr-1 p-0.5 rounded-full hover:bg-black/10 transition-colors"
                    aria-label="Remove"
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </span>
    );
}

/**
 * BadgeGroup Component
 * A container for multiple badges
 */
export function BadgeGroup({ children, className = '' }) {
    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {children}
        </div>
    );
}
