import { useState, useRef, useId } from 'react';
import { formatFileSize } from '@/Utils/formatters';

/**
 * FileUpload Component
 * A drag and drop file upload component
 * 
 * React 19 compatible - uses useId hook
 * 
 * @param {File|File[]} value - Current file(s)
 * @param {function} onChange - Callback when files change
 * @param {string} label - Input label
 * @param {string} accept - Accepted file types
 * @param {boolean} multiple - Allow multiple files
 * @param {number} maxSize - Maximum file size in bytes
 * @param {number} maxFiles - Maximum number of files
 * @param {string} error - Error message
 * @param {string} hint - Hint text
 * @param {boolean} disabled - Disable upload
 * @param {boolean} required - Mark as required
 * @param {boolean} preview - Show file previews
 * @param {string} description - Custom description text
 * @param {string} className - Additional CSS classes
 * @param {string} id - Custom input ID
 * @param {string} name - Input name
 */
export default function FileUpload({
    value,
    onChange,
    label,
    accept,
    multiple = false,
    maxSize = 5 * 1024 * 1024, // 5MB default
    maxFiles = 5,
    error,
    hint,
    disabled = false,
    required = false,
    preview = true,
    description,
    className = '',
    id,
    name,
}) {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState(value || []);
    const [uploadError, setUploadError] = useState('');
    const inputRef = useRef(null);

    // Use React's useId for SSR-safe unique IDs
    const generatedId = useId();
    const inputId = id || `fileupload${generatedId}`;

    // Handle file selection
    const handleFiles = (selectedFiles) => {
        setUploadError('');
        const fileList = Array.from(selectedFiles);
        
        // Validate file count
        if (!multiple && fileList.length > 1) {
            setUploadError('Hanya boleh upload 1 file');
            return;
        }

        if (multiple && files.length + fileList.length > maxFiles) {
            setUploadError(`Maksimal ${maxFiles} file`);
            return;
        }

        // Validate files
        const validFiles = [];
        for (const file of fileList) {
            // Check file type
            if (accept) {
                const acceptedTypes = accept.split(',').map(t => t.trim());
                const fileType = file.type;
                const fileExt = '.' + file.name.split('.').pop().toLowerCase();
                
                const isValid = acceptedTypes.some(type => {
                    if (type.startsWith('.')) {
                        return fileExt === type.toLowerCase();
                    }
                    if (type.endsWith('/*')) {
                        return fileType.startsWith(type.replace('/*', '/'));
                    }
                    return fileType === type;
                });

                if (!isValid) {
                    setUploadError(`File ${file.name} tidak valid. Format yang diizinkan: ${accept}`);
                    continue;
                }
            }

            // Check file size
            if (file.size > maxSize) {
                setUploadError(`File ${file.name} terlalu besar. Maksimal ${formatFileSize(maxSize)}`);
                continue;
            }

            validFiles.push(file);
        }

        if (validFiles.length > 0) {
            const newFiles = multiple ? [...files, ...validFiles] : validFiles;
            setFiles(newFiles);
            onChange?.(multiple ? newFiles : newFiles[0]);
        }
    };

    // Handle drag events
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        
        if (disabled) return;
        
        const droppedFiles = e.dataTransfer.files;
        handleFiles(droppedFiles);
    };

    // Handle input change
    const handleInputChange = (e) => {
        handleFiles(e.target.files);
        e.target.value = ''; // Reset input
    };

    // Remove file
    const removeFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        onChange?.(multiple ? newFiles : null);
    };

    // Check if file is an image
    const isImage = (file) => {
        return file.type.startsWith('image/');
    };

    // Get file preview URL
    const getPreviewUrl = (file) => {
        if (typeof file === 'string') return file;
        return URL.createObjectURL(file);
    };

    const displayError = error || uploadError;

    return (
        <div className={className}>
            {/* Label */}
            {label && (
                <label 
                    htmlFor={inputId} 
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                    {label}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}

            {/* Drop Zone */}
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => !disabled && inputRef.current?.click()}
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-describedby={displayError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                aria-invalid={!!displayError}
                onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
                        e.preventDefault();
                        inputRef.current?.click();
                    }
                }}
                className={`
                    relative border-2 border-dashed rounded-xl p-6 text-center transition-colors
                    ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}
                    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer hover:border-primary-400 hover:bg-gray-50'}
                    ${displayError ? 'border-red-500' : ''}
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                `}
            >
                <input
                    ref={inputRef}
                    type="file"
                    id={inputId}
                    name={name}
                    accept={accept}
                    multiple={multiple}
                    disabled={disabled}
                    onChange={handleInputChange}
                    className="hidden"
                    aria-required={required}
                />

                <div className="space-y-2">
                    {/* Icon */}
                    <div 
                        className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${isDragging ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}`}
                        aria-hidden="true"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>

                    {/* Text */}
                    <div>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-primary-600">Klik untuk upload</span> atau drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {description || `${accept || 'Semua file'} (Maks. ${formatFileSize(maxSize)})`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Hint & Error */}
            {hint && !displayError && (
                <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-gray-500">
                    {hint}
                </p>
            )}
            {displayError && (
                <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-500" role="alert">
                    {displayError}
                </p>
            )}

            {/* File Previews */}
            {preview && files.length > 0 && (
                <div className="mt-4 space-y-3" role="list" aria-label="File yang diupload">
                    {files.map((file, index) => (
                        <div
                            key={file.name + file.size + index}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                            role="listitem"
                        >
                            {/* Preview */}
                            {isImage(file) ? (
                                <img
                                    src={getPreviewUrl(file)}
                                    alt={file.name}
                                    className="w-12 h-12 rounded-lg object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center" aria-hidden="true">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            )}

                            {/* File info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {formatFileSize(file.size)}
                                </p>
                            </div>

                            {/* Remove button */}
                            {!disabled && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(index);
                                    }}
                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    aria-label={`Hapus ${file.name}`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
