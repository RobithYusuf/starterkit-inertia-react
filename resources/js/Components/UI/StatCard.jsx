/**
 * StatCard Component
 * A statistics card with icon and trend indicator
 */
export default function StatCard({
    title,
    value,
    icon,
    trend, // { value: number, direction: 'up' | 'down', label?: string }
    description,
    color = 'primary', // primary, success, warning, danger, info
    size = 'md', // sm, md, lg
    loading = false,
    className = '',
}) {
    // Color variants
    const colors = {
        primary: {
            bg: 'bg-primary-50',
            icon: 'text-primary-600',
            trend: {
                up: 'text-primary-600',
                down: 'text-red-600',
            },
        },
        success: {
            bg: 'bg-green-50',
            icon: 'text-green-600',
            trend: {
                up: 'text-green-600',
                down: 'text-red-600',
            },
        },
        warning: {
            bg: 'bg-yellow-50',
            icon: 'text-yellow-600',
            trend: {
                up: 'text-green-600',
                down: 'text-red-600',
            },
        },
        danger: {
            bg: 'bg-red-50',
            icon: 'text-red-600',
            trend: {
                up: 'text-green-600',
                down: 'text-red-600',
            },
        },
        info: {
            bg: 'bg-blue-50',
            icon: 'text-blue-600',
            trend: {
                up: 'text-green-600',
                down: 'text-red-600',
            },
        },
    };

    // Size variants
    const sizes = {
        sm: {
            container: 'p-4',
            iconBox: 'w-10 h-10',
            iconSize: 'w-5 h-5',
            title: 'text-xs',
            value: 'text-xl',
        },
        md: {
            container: 'p-5',
            iconBox: 'w-12 h-12',
            iconSize: 'w-6 h-6',
            title: 'text-sm',
            value: 'text-2xl',
        },
        lg: {
            container: 'p-6',
            iconBox: 'w-14 h-14',
            iconSize: 'w-7 h-7',
            title: 'text-base',
            value: 'text-3xl',
        },
    };

    const currentColor = colors[color] || colors.primary;
    const currentSize = sizes[size] || sizes.md;

    // Default icon
    const defaultIcon = (
        <svg className={currentSize.iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    );

    // Trend arrow icons
    const trendIcons = {
        up: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        ),
        down: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        ),
    };

    if (loading) {
        return (
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${currentSize.container} ${className}`}>
                <div className="animate-pulse">
                    <div className="flex items-center gap-4">
                        <div className={`${currentSize.iconBox} bg-gray-200 rounded-xl`} />
                        <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                            <div className="h-6 bg-gray-200 rounded w-3/4" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${currentSize.container} ${className}`}>
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`${currentSize.iconBox} ${currentColor.bg} rounded-xl flex items-center justify-center shrink-0`}>
                    <span className={currentColor.icon}>
                        {icon || defaultIcon}
                    </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Title */}
                    <p className={`font-medium text-gray-500 ${currentSize.title}`}>
                        {title}
                    </p>

                    {/* Value and Trend */}
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className={`font-bold text-gray-900 ${currentSize.value}`}>
                            {value}
                        </span>
                        
                        {trend && (
                            <span className={`inline-flex items-center gap-0.5 text-sm font-medium ${currentColor.trend[trend.direction]}`}>
                                {trendIcons[trend.direction]}
                                {trend.value}%
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    {(description || trend?.label) && (
                        <p className="text-xs text-gray-500 mt-1">
                            {description || trend?.label}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

/**
 * StatCardGroup Component
 * A container for multiple stat cards
 */
export function StatCardGroup({ children, columns = 4, className = '' }) {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <div className={`grid gap-4 ${gridCols[columns] || gridCols[4]} ${className}`}>
            {children}
        </div>
    );
}
