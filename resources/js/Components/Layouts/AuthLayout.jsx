import { Link } from '@inertiajs/react';
import { useTheme } from '@/Contexts/ThemeContext';

export default function AuthLayout({ children }) {
    const { theme } = useTheme();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" data-theme={theme}>
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">SR</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">Starkit React</span>
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
