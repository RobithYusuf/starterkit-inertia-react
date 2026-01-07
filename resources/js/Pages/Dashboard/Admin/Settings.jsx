import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import Card from '@/Components/UI/Card';
import { useTheme } from '@/Contexts/ThemeContext';

const themes = [
    { id: 'orange', name: 'Orange', color: 'bg-orange-500' },
    { id: 'blue', name: 'Blue', color: 'bg-blue-500' },
    { id: 'emerald', name: 'Emerald', color: 'bg-emerald-500' },
    { id: 'purple', name: 'Purple', color: 'bg-purple-500' },
    { id: 'slate', name: 'Slate', color: 'bg-slate-500' },
];

export default function Settings() {
    const { theme, setTheme } = useTheme();

    return (
        <DashboardLayout title="Settings">
            <Head title="Settings" />

            <div className="max-w-4xl space-y-6">
                {/* Theme Settings */}
                <Card>
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">Theme</h2>
                        <p className="text-sm text-gray-500">Choose your preferred color theme</p>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {themes.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setTheme(t.id)}
                                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                                        theme === t.id
                                            ? 'border-primary-500 bg-primary-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div className={`h-10 w-10 rounded-full ${t.color}`} />
                                    <span className="text-sm font-medium text-gray-700">{t.name}</span>
                                    {theme === t.id && (
                                        <svg className="h-5 w-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Application Info */}
                <Card>
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">Application</h2>
                        <p className="text-sm text-gray-500">Application information</p>
                    </div>
                    <div className="p-6">
                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Version</dt>
                                <dd className="text-sm text-gray-900">1.0.0</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Framework</dt>
                                <dd className="text-sm text-gray-900">Laravel 12 + React 19 + Inertia.js</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">CSS Framework</dt>
                                <dd className="text-sm text-gray-900">Tailwind CSS v4</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Auth</dt>
                                <dd className="text-sm text-gray-900">Laravel Fortify + Spatie Permission</dd>
                            </div>
                        </dl>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
