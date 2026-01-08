/**
 * Skeleton Component
 * A loading placeholder with shimmer effect
 */
export default function Skeleton({
    variant = 'text', // text, circular, rectangular, rounded
    width,
    height,
    className = '',
    animation = 'pulse', // pulse, wave, none
    lines = 1,
}) {
    // Base classes
    const baseClasses = 'bg-gray-200';

    // Animation classes
    const animations = {
        pulse: 'animate-pulse',
        wave: 'skeleton-wave',
        none: '',
    };

    // Variant classes
    const variants = {
        text: 'h-4 rounded',
        circular: 'rounded-full',
        rectangular: '',
        rounded: 'rounded-lg',
    };

    // Default dimensions based on variant
    const getDefaultDimensions = () => {
        switch (variant) {
            case 'circular':
                return { width: width || '40px', height: height || '40px' };
            case 'rectangular':
                return { width: width || '100%', height: height || '100px' };
            case 'rounded':
                return { width: width || '100%', height: height || '100px' };
            case 'text':
            default:
                return { width: width || '100%', height: height || '16px' };
        }
    };

    const dimensions = getDefaultDimensions();

    // Render multiple lines for text variant
    if (variant === 'text' && lines > 1) {
        return (
            <div className={`space-y-2 ${className}`}>
                {Array.from({ length: lines }).map((_, index) => (
                    <div
                        key={index}
                        className={`
                            ${baseClasses}
                            ${variants[variant]}
                            ${animations[animation] || animations.pulse}
                        `}
                        style={{
                            width: index === lines - 1 ? '75%' : dimensions.width,
                            height: dimensions.height,
                        }}
                    />
                ))}
            </div>
        );
    }

    return (
        <>
            <div
                className={`
                    ${baseClasses}
                    ${variants[variant] || variants.text}
                    ${animations[animation] || animations.pulse}
                    ${className}
                `}
                style={{
                    width: dimensions.width,
                    height: dimensions.height,
                }}
            />
            {animation === 'wave' && (
                <style>{`
                    @keyframes skeleton-wave {
                        0% {
                            background-position: -200px 0;
                        }
                        100% {
                            background-position: calc(200px + 100%) 0;
                        }
                    }
                    .skeleton-wave {
                        background: linear-gradient(
                            90deg,
                            #e5e7eb 0px,
                            #f3f4f6 50px,
                            #e5e7eb 100px
                        );
                        background-size: 200px 100%;
                        animation: skeleton-wave 1.2s ease-in-out infinite;
                    }
                `}</style>
            )}
        </>
    );
}

/**
 * SkeletonCard Component
 * A pre-built skeleton for card layouts
 */
export function SkeletonCard({ className = '' }) {
    return (
        <div className={`bg-white rounded-lg p-4 shadow-sm ${className}`}>
            <div className="flex items-center gap-4 mb-4">
                <Skeleton variant="circular" width="48px" height="48px" />
                <div className="flex-1">
                    <Skeleton variant="text" width="60%" className="mb-2" />
                    <Skeleton variant="text" width="40%" height="12px" />
                </div>
            </div>
            <Skeleton variant="text" lines={3} />
        </div>
    );
}

/**
 * SkeletonTable Component
 * A pre-built skeleton for table layouts
 */
export function SkeletonTable({ rows = 5, columns = 4, className = '' }) {
    return (
        <div className={`bg-white rounded-lg overflow-hidden ${className}`}>
            {/* Header */}
            <div className="flex gap-4 p-4 bg-gray-50 border-b">
                {Array.from({ length: columns }).map((_, i) => (
                    <Skeleton key={i} variant="text" width={`${100 / columns}%`} height="20px" />
                ))}
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex gap-4 p-4 border-b last:border-b-0">
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <Skeleton key={colIndex} variant="text" width={`${100 / columns}%`} />
                    ))}
                </div>
            ))}
        </div>
    );
}

/**
 * SkeletonList Component
 * A pre-built skeleton for list layouts
 */
export function SkeletonList({ items = 3, className = '' }) {
    return (
        <div className={`space-y-4 ${className}`}>
            {Array.from({ length: items }).map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                    <Skeleton variant="circular" width="40px" height="40px" />
                    <div className="flex-1">
                        <Skeleton variant="text" width="70%" className="mb-2" />
                        <Skeleton variant="text" width="50%" height="12px" />
                    </div>
                </div>
            ))}
        </div>
    );
}
