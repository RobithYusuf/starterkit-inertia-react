/**
 * Progress Component
 * A progress bar with customizable appearance
 */
export default function Progress({
    value = 0,
    max = 100,
    size = 'md',
    color = 'primary',
    showLabel = false,
    labelPosition = 'right', // right, inside, top
    animated = false,
    striped = false,
    className = '',
}) {
    // Calculate percentage
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    // Size variants
    const sizes = {
        xs: 'h-1',
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4',
        xl: 'h-6',
    };

    // Color variants
    const colors = {
        primary: 'bg-primary-600',
        success: 'bg-green-600',
        warning: 'bg-yellow-500',
        danger: 'bg-red-600',
        info: 'bg-blue-600',
        gray: 'bg-gray-600',
    };

    // Label text
    const labelText = `${Math.round(percentage)}%`;

    return (
        <div className={`w-full ${className}`}>
            {/* Top label */}
            {showLabel && labelPosition === 'top' && (
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{labelText}</span>
                </div>
            )}

            <div className="flex items-center gap-3">
                {/* Progress bar container */}
                <div
                    className={`
                        flex-1 bg-gray-200 rounded-full overflow-hidden
                        ${sizes[size] || sizes.md}
                    `}
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={max}
                >
                    {/* Progress bar fill */}
                    <div
                        className={`
                            h-full rounded-full transition-all duration-500 ease-out
                            ${colors[color] || colors.primary}
                            ${striped ? 'progress-striped' : ''}
                            ${animated ? 'progress-animated' : ''}
                            ${showLabel && labelPosition === 'inside' ? 'flex items-center justify-center' : ''}
                        `}
                        style={{ width: `${percentage}%` }}
                    >
                        {/* Inside label */}
                        {showLabel && labelPosition === 'inside' && percentage > 10 && (
                            <span className="text-xs font-medium text-white px-2">
                                {labelText}
                            </span>
                        )}
                    </div>
                </div>

                {/* Right label */}
                {showLabel && labelPosition === 'right' && (
                    <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-right">
                        {labelText}
                    </span>
                )}
            </div>

            <style>{`
                .progress-striped {
                    background-image: linear-gradient(
                        45deg,
                        rgba(255, 255, 255, 0.15) 25%,
                        transparent 25%,
                        transparent 50%,
                        rgba(255, 255, 255, 0.15) 50%,
                        rgba(255, 255, 255, 0.15) 75%,
                        transparent 75%,
                        transparent
                    );
                    background-size: 1rem 1rem;
                }
                .progress-animated {
                    animation: progress-stripes 1s linear infinite;
                }
                @keyframes progress-stripes {
                    0% {
                        background-position: 1rem 0;
                    }
                    100% {
                        background-position: 0 0;
                    }
                }
            `}</style>
        </div>
    );
}

/**
 * CircularProgress Component
 * A circular progress indicator
 */
export function CircularProgress({
    value = 0,
    max = 100,
    size = 'md',
    color = 'primary',
    showLabel = true,
    strokeWidth,
    className = '',
}) {
    // Calculate percentage
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    // Size variants (diameter in pixels)
    const sizes = {
        sm: 40,
        md: 60,
        lg: 80,
        xl: 100,
    };

    const diameter = sizes[size] || sizes.md;
    const stroke = strokeWidth || Math.max(diameter / 10, 4);
    const radius = (diameter - stroke) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    // Color variants
    const colors = {
        primary: 'text-primary-600',
        success: 'text-green-600',
        warning: 'text-yellow-500',
        danger: 'text-red-600',
        info: 'text-blue-600',
        gray: 'text-gray-600',
    };

    return (
        <div className={`relative inline-flex items-center justify-center ${className}`}>
            <svg
                width={diameter}
                height={diameter}
                viewBox={`0 0 ${diameter} ${diameter}`}
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx={diameter / 2}
                    cy={diameter / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={stroke}
                    className="text-gray-200"
                />
                {/* Progress circle */}
                <circle
                    cx={diameter / 2}
                    cy={diameter / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className={`transition-all duration-500 ease-out ${colors[color] || colors.primary}`}
                />
            </svg>
            {showLabel && (
                <span className="absolute text-sm font-semibold text-gray-700">
                    {Math.round(percentage)}%
                </span>
            )}
        </div>
    );
}
