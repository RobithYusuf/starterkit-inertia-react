import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

/**
 * ConfirmModal Component
 * A confirmation dialog with customizable actions
 */
export default function ConfirmModal({
    isOpen = false,
    onClose,
    onConfirm,
    title = 'Konfirmasi',
    message = 'Apakah Anda yakin ingin melanjutkan?',
    confirmText = 'Ya, Lanjutkan',
    cancelText = 'Batal',
    variant = 'danger', // danger, warning, info
    loading = false,
    icon,
}) {
    const [isLoading, setIsLoading] = useState(false);

    // Variant styles
    const variants = {
        danger: {
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
            buttonVariant: 'danger',
            defaultIcon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
        },
        warning: {
            iconBg: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            buttonVariant: 'primary',
            defaultIcon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        info: {
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            buttonVariant: 'primary',
            defaultIcon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    };

    const currentVariant = variants[variant] || variants.danger;

    const handleConfirm = async () => {
        if (onConfirm) {
            setIsLoading(true);
            try {
                await onConfirm();
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="sm"
            showCloseButton={false}
            closeOnOverlay={!isLoading && !loading}
            closeOnEscape={!isLoading && !loading}
        >
            <div className="text-center py-4">
                {/* Icon */}
                <div className={`mx-auto w-14 h-14 rounded-full ${currentVariant.iconBg} flex items-center justify-center mb-4`}>
                    <span className={currentVariant.iconColor}>
                        {icon || currentVariant.defaultIcon}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {title}
                </h3>

                {/* Message */}
                <p className="text-gray-600 mb-6">
                    {message}
                </p>

                {/* Actions */}
                <div className="flex gap-3 justify-center">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={isLoading || loading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={currentVariant.buttonVariant}
                        onClick={handleConfirm}
                        loading={isLoading || loading}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
