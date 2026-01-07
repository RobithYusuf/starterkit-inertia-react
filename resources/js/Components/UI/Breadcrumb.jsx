import { Link } from '@inertiajs/react';

export default function Breadcrumb({ items = [], separator = 'chevron', className = '' }) {
    return (
        <nav className={`flex ${className}`} aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                {items.map((item, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index > 0 && (
                            separator === 'chevron' ? (
                                <svg className="w-5 h-5 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                            ) : (
                                <span className="mx-2 text-gray-400">{separator}</span>
                            )
                        )}
                        
                        {item.href && index < items.length - 1 ? (
                            <Link 
                                href={item.href}
                                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                            >
                                {item.icon && <span className="mr-2">{item.icon}</span>}
                                {item.label}
                            </Link>
                        ) : (
                            <span className="inline-flex items-center text-sm font-medium text-gray-500">
                                {item.icon && <span className="mr-2">{item.icon}</span>}
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
