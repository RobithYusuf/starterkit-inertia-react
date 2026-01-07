import { Link } from '@inertiajs/react';

export default function Pagination({ links, from, to, total, className = '' }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 py-3 sm:px-6 border-t border-gray-200 ${className}`}>
            <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{from}</span> to{' '}
                <span className="font-semibold text-gray-900">{to}</span> of{' '}
                <span className="font-semibold text-gray-900">{total}</span> results
            </div>
            <nav className="flex items-center gap-1">
                {links.map((link, index) => {
                    const isFirst = index === 0;
                    const isLast = index === links.length - 1;
                    const isPrevNext = isFirst || isLast;
                    
                    // Disabled state (no URL and not active)
                    if (!link.url && !link.active) {
                        return (
                            <span
                                key={index}
                                className={`px-3 py-1.5 text-sm rounded-lg text-gray-400 bg-gray-50 border border-gray-200 cursor-not-allowed ${
                                    isPrevNext ? 'hidden sm:inline-flex' : ''
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    }

                    // Active state
                    if (link.active) {
                        return (
                            <span
                                key={index}
                                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-primary-600 text-white border border-primary-600"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    }

                    // Normal clickable state
                    return (
                        <Link
                            key={index}
                            href={link.url}
                            className={`px-3 py-1.5 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors ${
                                isPrevNext ? 'hidden sm:inline-flex' : ''
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                })}
            </nav>
        </div>
    );
}
