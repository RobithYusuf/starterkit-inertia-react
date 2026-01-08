import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getTooltipContainer } from '@/Utils/portal';

/**
 * Tooltip Component
 * A tooltip that appears on hover
 */
export default function Tooltip({
    children,
    content,
    position = 'top', // top, bottom, left, right
    delay = 200,
    className = '',
    disabled = false,
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);
    const tooltipRef = useRef(null);
    const timeoutRef = useRef(null);

    const showTooltip = () => {
        if (disabled || !content) return;
        
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    const hideTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    // Calculate position
    useEffect(() => {
        if (isVisible && triggerRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current?.getBoundingClientRect() || { width: 0, height: 0 };
            
            let top = 0;
            let left = 0;
            
            const gap = 8;
            
            switch (position) {
                case 'top':
                    top = triggerRect.top - tooltipRect.height - gap;
                    left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                    break;
                case 'bottom':
                    top = triggerRect.bottom + gap;
                    left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                    break;
                case 'left':
                    top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                    left = triggerRect.left - tooltipRect.width - gap;
                    break;
                case 'right':
                    top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                    left = triggerRect.right + gap;
                    break;
            }
            
            // Keep tooltip within viewport
            const padding = 8;
            left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));
            top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding));
            
            setCoords({ top, left });
        }
    }, [isVisible, position]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Arrow position classes
    const arrowPositions = {
        top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-gray-900 border-x-transparent border-b-transparent',
        bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-gray-900 border-x-transparent border-t-transparent',
        left: 'right-0 top-1/2 translate-x-full -translate-y-1/2 border-l-gray-900 border-y-transparent border-r-transparent',
        right: 'left-0 top-1/2 -translate-x-full -translate-y-1/2 border-r-gray-900 border-y-transparent border-l-transparent',
    };

    return (
        <>
            {/* Trigger */}
            <span
                ref={triggerRef}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                onFocus={showTooltip}
                onBlur={hideTooltip}
                className={`inline-block ${className}`}
            >
                {children}
            </span>

            {/* Tooltip */}
            {isVisible && content && createPortal(
                <div
                    ref={tooltipRef}
                    role="tooltip"
                    className="fixed z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg animate-fade-in"
                    style={{
                        top: `${coords.top}px`,
                        left: `${coords.left}px`,
                    }}
                >
                    {content}
                    {/* Arrow */}
                    <span
                        className={`
                            absolute w-0 h-0 border-4
                            ${arrowPositions[position] || arrowPositions.top}
                        `}
                    />
                    <style>{`
                        @keyframes fade-in {
                            from { opacity: 0; transform: scale(0.95); }
                            to { opacity: 1; transform: scale(1); }
                        }
                        .animate-fade-in {
                            animation: fade-in 0.15s ease-out;
                        }
                    `}</style>
                </div>,
                getTooltipContainer()
            )}
        </>
    );
}
