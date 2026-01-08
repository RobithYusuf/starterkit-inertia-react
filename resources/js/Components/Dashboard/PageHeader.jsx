import { Link } from '@inertiajs/react';
import Card from '@/Components/UI/Card';
import Breadcrumb from '@/Components/UI/Breadcrumb';

export default function PageHeader({ 
    title = '', 
    description = '', 
    breadcrumbs = [], 
    actions = null,
    children 
}) {
    return (
        <div className="mb-6">
            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
                <Breadcrumb items={breadcrumbs} className="mb-4" />
            )}
            
            {/* Header Card */}
            <Card className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
                        {description && (
                            <p className="mt-1 text-sm text-gray-600">{description}</p>
                        )}
                    </div>
                    
                    {/* Actions - support both children and actions prop */}
                    {(actions || children) && (
                        <div className="flex flex-shrink-0 space-x-3">
                            {actions ? (
                                Array.isArray(actions) ? (
                                    actions.map((action, index) => (
                                        action.type === 'link' ? (
                                            <Link
                                                key={action.href || action.label || index}
                                                href={action.href}
                                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-all"
                                            >
                                                {action.icon && <span className="-ml-1 mr-2">{action.icon}</span>}
                                                {action.label}
                                            </Link>
                                        ) : (
                                            <button
                                                key={action.label || index}
                                                onClick={action.onClick}
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all"
                                            >
                                                {action.icon && <span className="-ml-1 mr-2">{action.icon}</span>}
                                                {action.label}
                                            </button>
                                        )
                                    ))
                                ) : actions
                            ) : children}
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
