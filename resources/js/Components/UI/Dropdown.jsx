import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { getDropdownContainer } from '@/Utils/portal';

// Dropdown context
const DropdownContext = createContext(null);

/**
 * Dropdown Component
 * A dropdown menu component
 */
export default function Dropdown({
    children,
    className = '',
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const triggerRef = useRef(null);
    const menuRef = useRef(null);

    const toggle = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);

    // Update position when open
    useEffect(() => {
        if (isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const menuHeight = menuRef.current?.offsetHeight || 200;
            
            // Check if dropdown should open upward
            const spaceBelow = window.innerHeight - rect.bottom;
            const openUpward = spaceBelow < menuHeight && rect.top > menuHeight;
            
            setCoords({
                top: openUpward ? rect.top - menuHeight - 4 : rect.bottom + 4,
                left: rect.left,
                width: rect.width,
            });
        }
    }, [isOpen]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                isOpen &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target) &&
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                close();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Close on escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                close();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen]);

    return (
        <DropdownContext.Provider value={{ isOpen, toggle, close, triggerRef, menuRef, coords }}>
            <div className={`relative inline-block ${className}`}>
                {children}
            </div>
        </DropdownContext.Provider>
    );
}

/**
 * DropdownTrigger Component
 * The element that triggers the dropdown
 */
export function DropdownTrigger({ children, className = '' }) {
    const context = useContext(DropdownContext);

    return (
        <div
            ref={context?.triggerRef}
            onClick={context?.toggle}
            className={`cursor-pointer ${className}`}
        >
            {children}
        </div>
    );
}

/**
 * DropdownMenu Component
 * The dropdown menu container
 */
export function DropdownMenu({
    children,
    align = 'left', // left, right, center
    width = 'auto', // auto, trigger, or specific width
    className = '',
}) {
    const context = useContext(DropdownContext);

    if (!context?.isOpen) return null;

    // Calculate alignment offset
    const getLeftPosition = () => {
        const { left, width: triggerWidth } = context.coords;
        const menuWidth = width === 'trigger' ? triggerWidth : 200;
        
        switch (align) {
            case 'right':
                return left + triggerWidth - menuWidth;
            case 'center':
                return left + (triggerWidth - menuWidth) / 2;
            default:
                return left;
        }
    };

    const menuContent = (
        <div
            ref={context.menuRef}
            className={`
                fixed z-50 py-2 bg-white rounded-lg shadow-lg border border-gray-200
                animate-dropdown-in
                ${className}
            `}
            style={{
                top: `${context.coords.top}px`,
                left: `${getLeftPosition()}px`,
                minWidth: width === 'trigger' ? `${context.coords.width}px` : width === 'auto' ? '180px' : width,
            }}
            role="menu"
        >
            {children}
            <style>{`
                @keyframes dropdown-in {
                    from { 
                        opacity: 0; 
                        transform: translateY(-8px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                .animate-dropdown-in {
                    animation: dropdown-in 0.15s ease-out;
                }
            `}</style>
        </div>
    );

    return createPortal(menuContent, getDropdownContainer());
}

/**
 * DropdownItem Component
 * Individual menu item
 */
export function DropdownItem({
    children,
    onClick,
    icon,
    disabled = false,
    danger = false,
    className = '',
}) {
    const context = useContext(DropdownContext);

    const handleClick = (e) => {
        if (disabled) return;
        onClick?.(e);
        context?.close();
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            className={`
                w-full flex items-center gap-3 px-4 py-2 text-sm text-left
                transition-colors duration-150
                ${disabled 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : danger 
                        ? 'text-red-600 hover:bg-red-50' 
                        : 'text-gray-700 hover:bg-gray-100'
                }
                ${className}
            `}
            role="menuitem"
        >
            {icon && (
                <span className={`w-5 h-5 ${danger ? 'text-red-500' : 'text-gray-400'}`}>
                    {icon}
                </span>
            )}
            {children}
        </button>
    );
}

/**
 * DropdownDivider Component
 * A divider between menu items
 */
export function DropdownDivider() {
    return <hr className="my-2 border-gray-200" />;
}

/**
 * DropdownLabel Component
 * A label/header for a group of items
 */
export function DropdownLabel({ children, className = '' }) {
    return (
        <div className={`px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider ${className}`}>
            {children}
        </div>
    );
}
