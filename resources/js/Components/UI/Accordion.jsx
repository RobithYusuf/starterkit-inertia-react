import { useState, useRef, useEffect } from 'react';

/**
 * Accordion Component
 * A collapsible content component
 */
export default function Accordion({
    children,
    type = 'single', // single, multiple
    defaultValue = [],
    className = '',
}) {
    const [openItems, setOpenItems] = useState(
        Array.isArray(defaultValue) ? defaultValue : [defaultValue].filter(Boolean)
    );

    const toggleItem = (value) => {
        if (type === 'single') {
            setOpenItems(openItems.includes(value) ? [] : [value]);
        } else {
            setOpenItems(
                openItems.includes(value)
                    ? openItems.filter((item) => item !== value)
                    : [...openItems, value]
            );
        }
    };

    return (
        <div className={`divide-y divide-gray-200 border border-gray-200 rounded-lg ${className}`}>
            {Array.isArray(children)
                ? children.map((child, index) =>
                    child ? (
                        <AccordionItemWrapper
                            key={child.props?.value || index}
                            isOpen={openItems.includes(child.props?.value)}
                            onToggle={() => toggleItem(child.props?.value)}
                        >
                            {child}
                        </AccordionItemWrapper>
                    ) : null
                )
                : children && (
                    <AccordionItemWrapper
                        isOpen={openItems.includes(children.props?.value)}
                        onToggle={() => toggleItem(children.props?.value)}
                    >
                        {children}
                    </AccordionItemWrapper>
                )}
        </div>
    );
}

// Wrapper to pass props to AccordionItem
function AccordionItemWrapper({ children, isOpen, onToggle }) {
    if (!children) return null;
    
    return (
        <div>
            {/* Clone children with isOpen and onToggle props */}
            {children.props && (
                <AccordionItem
                    {...children.props}
                    isOpen={isOpen}
                    onToggle={onToggle}
                />
            )}
        </div>
    );
}

/**
 * AccordionItem Component
 * Individual accordion item
 */
export function AccordionItem({
    value,
    title,
    children,
    icon,
    disabled = false,
    isOpen = false,
    onToggle,
    className = '',
}) {
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? contentRef.current.scrollHeight : 0);
        }
    }, [isOpen, children]);

    return (
        <div className={`${disabled ? 'opacity-50' : ''} ${className}`}>
            {/* Header */}
            <button
                type="button"
                onClick={() => !disabled && onToggle?.()}
                disabled={disabled}
                className={`
                    w-full flex items-center justify-between gap-4
                    px-4 py-4 text-left
                    hover:bg-gray-50 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500
                    ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3">
                    {icon && (
                        <span className="text-gray-400">
                            {icon}
                        </span>
                    )}
                    <span className="font-medium text-gray-900">
                        {title}
                    </span>
                </div>
                <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Content */}
            <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ height: `${height}px` }}
            >
                <div ref={contentRef} className="px-4 pb-4 text-gray-600">
                    {children}
                </div>
            </div>
        </div>
    );
}
