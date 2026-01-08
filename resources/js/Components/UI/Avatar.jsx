import { getInitials } from '@/Utils/formatters';

/**
 * Avatar Component
 * A user avatar with image or initials fallback
 */
export default function Avatar({
    src,
    alt = 'Avatar',
    name,
    size = 'md',
    shape = 'circle', // circle, square, rounded
    status, // online, offline, away, busy
    className = '',
    onClick,
}) {
    // Size variants
    const sizes = {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-16 h-16 text-xl',
        '2xl': 'w-20 h-20 text-2xl',
    };

    // Shape variants
    const shapes = {
        circle: 'rounded-full',
        square: 'rounded-none',
        rounded: 'rounded-lg',
    };

    // Status colors
    const statusColors = {
        online: 'bg-green-500',
        offline: 'bg-gray-400',
        away: 'bg-yellow-500',
        busy: 'bg-red-500',
    };

    // Status sizes based on avatar size
    const statusSizes = {
        xs: 'w-1.5 h-1.5 border',
        sm: 'w-2 h-2 border',
        md: 'w-2.5 h-2.5 border-2',
        lg: 'w-3 h-3 border-2',
        xl: 'w-4 h-4 border-2',
        '2xl': 'w-5 h-5 border-2',
    };

    // Generate background color from name
    const getColorFromName = (name) => {
        if (!name) return 'bg-gray-400';
        const colors = [
            'bg-red-500',
            'bg-orange-500',
            'bg-amber-500',
            'bg-yellow-500',
            'bg-lime-500',
            'bg-green-500',
            'bg-emerald-500',
            'bg-teal-500',
            'bg-cyan-500',
            'bg-sky-500',
            'bg-blue-500',
            'bg-indigo-500',
            'bg-violet-500',
            'bg-purple-500',
            'bg-fuchsia-500',
            'bg-pink-500',
            'bg-rose-500',
        ];
        const charCode = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
        return colors[charCode % colors.length];
    };

    const initials = name ? getInitials(name) : '';
    const bgColor = getColorFromName(name);

    const handleKeyDown = (e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick(e);
        }
    };

    return (
        <div
            className={`
                relative inline-flex items-center justify-center
                ${sizes[size] || sizes.md}
                ${shapes[shape] || shapes.circle}
                ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
                ${className}
            `}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className={`
                        w-full h-full object-cover
                        ${shapes[shape] || shapes.circle}
                    `}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling?.classList.remove('hidden');
                    }}
                />
            ) : null}
            
            {/* Fallback with initials */}
            <div
                className={`
                    ${src ? 'hidden' : ''}
                    w-full h-full flex items-center justify-center
                    ${bgColor} text-white font-medium
                    ${shapes[shape] || shapes.circle}
                `}
            >
                {initials || (
                    <svg className="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                )}
            </div>

            {/* Status indicator */}
            {status && (
                <span
                    className={`
                        absolute bottom-0 right-0
                        ${statusSizes[size] || statusSizes.md}
                        ${statusColors[status] || statusColors.offline}
                        rounded-full border-white
                    `}
                />
            )}
        </div>
    );
}

/**
 * AvatarGroup Component
 * A group of overlapping avatars
 */
export function AvatarGroup({
    avatars = [],
    max = 4,
    size = 'md',
    className = '',
}) {
    const displayAvatars = avatars.slice(0, max);
    const remainingCount = avatars.length - max;

    // Overlap margin based on size
    const overlapMargins = {
        xs: '-ml-2',
        sm: '-ml-2.5',
        md: '-ml-3',
        lg: '-ml-4',
        xl: '-ml-5',
        '2xl': '-ml-6',
    };

    // Remaining count sizes
    const countSizes = {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
        '2xl': 'w-20 h-20 text-xl',
    };

    return (
        <div className={`flex items-center ${className}`}>
            {displayAvatars.map((avatar, index) => (
                <div
                    key={avatar.id || index}
                    className={`
                        ${index > 0 ? overlapMargins[size] || overlapMargins.md : ''}
                        ring-2 ring-white rounded-full
                    `}
                    style={{ zIndex: displayAvatars.length - index }}
                >
                    <Avatar
                        src={avatar.src}
                        name={avatar.name}
                        alt={avatar.alt || avatar.name}
                        size={size}
                    />
                </div>
            ))}
            {remainingCount > 0 && (
                <div
                    className={`
                        ${overlapMargins[size] || overlapMargins.md}
                        ${countSizes[size] || countSizes.md}
                        ring-2 ring-white rounded-full
                        bg-gray-200 text-gray-600 font-medium
                        flex items-center justify-center
                    `}
                    style={{ zIndex: 0 }}
                >
                    +{remainingCount}
                </div>
            )}
        </div>
    );
}
