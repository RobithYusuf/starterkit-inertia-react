import { useState, createContext, useContext } from 'react';

// Tab context
const TabContext = createContext(null);

/**
 * Tabs Component
 * A tabbed navigation component
 */
export default function Tabs({
    children,
    defaultValue,
    value,
    onChange,
    variant = 'default', // default, pills, underline
    size = 'md',
    className = '',
}) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    
    const currentValue = value !== undefined ? value : internalValue;
    
    const handleChange = (newValue) => {
        if (value === undefined) {
            setInternalValue(newValue);
        }
        onChange?.(newValue);
    };

    return (
        <TabContext.Provider value={{ value: currentValue, onChange: handleChange, variant, size }}>
            <div className={className}>
                {children}
            </div>
        </TabContext.Provider>
    );
}

/**
 * TabList Component
 * Container for tab triggers
 */
export function TabList({ children, className = '' }) {
    const context = useContext(TabContext);
    
    // Variant styles
    const variants = {
        default: 'border-b border-gray-200',
        pills: 'bg-gray-100 p-1 rounded-lg',
        underline: '',
    };

    return (
        <div
            className={`
                flex gap-1
                ${variants[context?.variant] || variants.default}
                ${className}
            `}
            role="tablist"
        >
            {children}
        </div>
    );
}

/**
 * TabTrigger Component
 * Individual tab button
 */
export function TabTrigger({ value, children, disabled = false, className = '' }) {
    const context = useContext(TabContext);
    const isActive = context?.value === value;

    // Size styles
    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    // Variant styles
    const getVariantStyles = () => {
        switch (context?.variant) {
            case 'pills':
                return isActive
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50';
            case 'underline':
                return isActive
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent';
            default:
                return isActive
                    ? 'text-primary-600 border-b-2 border-primary-600 -mb-px'
                    : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent -mb-px';
        }
    };

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            onClick={() => context?.onChange(value)}
            className={`
                font-medium transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                ${sizes[context?.size] || sizes.md}
                ${context?.variant === 'pills' ? 'rounded-md' : ''}
                ${getVariantStyles()}
                ${className}
            `}
        >
            {children}
        </button>
    );
}

/**
 * TabContent Component
 * Container for tab panels
 */
export function TabContent({ children, className = '' }) {
    return (
        <div className={`mt-4 ${className}`}>
            {children}
        </div>
    );
}

/**
 * TabPanel Component
 * Individual tab panel content
 */
export function TabPanel({ value, children, className = '' }) {
    const context = useContext(TabContext);
    const isActive = context?.value === value;

    if (!isActive) return null;

    return (
        <div
            role="tabpanel"
            className={`animate-fade-in ${className}`}
        >
            {children}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(4px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }
            `}</style>
        </div>
    );
}
