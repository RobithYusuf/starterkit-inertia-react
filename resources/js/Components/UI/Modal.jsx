import { useEffect, useRef, useState, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import { getModalContainer } from '@/Utils/portal';

/**
 * Modal Component
 * A flexible modal/dialog component with portal rendering
 * 
 * @param {boolean} isOpen - Whether the modal is open
 * @param {function} onClose - Callback when modal should close
 * @param {string} title - Modal title
 * @param {React.ReactNode} children - Modal content
 * @param {string} size - Modal size: 'sm' | 'md' | 'lg' | 'xl' | 'full'
 * @param {boolean} closeOnOverlay - Close modal when clicking overlay
 * @param {boolean} closeOnEscape - Close modal when pressing Escape
 * @param {boolean} showCloseButton - Show close button in header
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} footer - Footer content
 */
export default function Modal({
    isOpen = false,
    onClose,
    title,
    children,
    size = 'md',
    closeOnOverlay = true,
    closeOnEscape = true,
    showCloseButton = true,
    className = '',
    footer,
}) {
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef(null);
    const previousActiveElement = useRef(null);
    const titleId = useId();

    // Size variants
    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full mx-4',
    };

    // Handle escape key
    const handleEscape = useCallback((e) => {
        if (e.key === 'Escape' && closeOnEscape && onClose) {
            onClose();
        }
    }, [closeOnEscape, onClose]);

    // Handle overlay click
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget && closeOnOverlay && onClose) {
            onClose();
        }
    };

    // Mount effect
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Handle open/close
    useEffect(() => {
        if (isOpen) {
            // Store current active element
            previousActiveElement.current = document.activeElement;
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Add escape listener
            document.addEventListener('keydown', handleEscape);
            
            // Focus modal
            setTimeout(() => {
                modalRef.current?.focus();
            }, 0);
        } else {
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Restore focus
            if (previousActiveElement.current) {
                previousActiveElement.current.focus();
            }
        }

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, handleEscape]);

    if (!mounted || !isOpen) return null;

    const modalContent = (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
        >
            <div
                ref={modalRef}
                tabIndex={-1}
                className={`
                    relative w-full ${sizes[size] || sizes.md} 
                    bg-white rounded-xl shadow-2xl 
                    transform transition-all duration-200 
                    animate-scale-in
                    ${className}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                        {title && (
                            <h3 id={titleId} className="text-lg font-semibold text-gray-900">
                                {title}
                            </h3>
                        )}
                        {showCloseButton && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Close modal"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );

    return createPortal(modalContent, getModalContainer());
}
