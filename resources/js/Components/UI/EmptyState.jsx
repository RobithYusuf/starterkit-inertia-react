/**
 * EmptyState Component
 * A placeholder for empty content areas
 */
export default function EmptyState({
    icon,
    title = 'No data found',
    description,
    action,
    actionLabel,
    onAction,
    size = 'md', // sm, md, lg
    className = '',
}) {
    // Size variants
    const sizes = {
        sm: {
            container: 'py-8',
            icon: 'w-12 h-12',
            title: 'text-base',
            description: 'text-sm',
        },
        md: {
            container: 'py-12',
            icon: 'w-16 h-16',
            title: 'text-lg',
            description: 'text-sm',
        },
        lg: {
            container: 'py-16',
            icon: 'w-20 h-20',
            title: 'text-xl',
            description: 'text-base',
        },
    };

    const currentSize = sizes[size] || sizes.md;

    // Default icon
    const defaultIcon = (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1.5" 
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
            />
        </svg>
    );

    return (
        <div className={`flex flex-col items-center justify-center text-center ${currentSize.container} ${className}`}>
            {/* Icon */}
            <div className={`${currentSize.icon} text-gray-300 mb-4`}>
                {icon || defaultIcon}
            </div>

            {/* Title */}
            <h3 className={`font-semibold text-gray-900 mb-2 ${currentSize.title}`}>
                {title}
            </h3>

            {/* Description */}
            {description && (
                <p className={`text-gray-500 max-w-sm mb-6 ${currentSize.description}`}>
                    {description}
                </p>
            )}

            {/* Action */}
            {(action || (actionLabel && onAction)) && (
                <div>
                    {action || (
                        <button
                            type="button"
                            onClick={onAction}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            {actionLabel}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

/**
 * EmptySearch Component
 * A specific empty state for search results
 */
export function EmptySearch({ query = '', onClear, className = '' }) {
    return (
        <EmptyState
            icon={
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="1.5" 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                </svg>
            }
            title="No results found"
            description={query ? `We couldn't find anything matching "${query}". Try a different search term.` : 'Try adjusting your search or filter to find what you\'re looking for.'}
            actionLabel={onClear ? 'Clear search' : undefined}
            onAction={onClear}
            className={className}
        />
    );
}

/**
 * EmptyError Component
 * A specific empty state for errors
 */
export function EmptyError({ message = 'Something went wrong', onRetry, className = '' }) {
    return (
        <EmptyState
            icon={
                <svg className="w-full h-full text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="1.5" 
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                    />
                </svg>
            }
            title="Error"
            description={message}
            actionLabel={onRetry ? 'Try again' : undefined}
            onAction={onRetry}
            className={className}
        />
    );
}
