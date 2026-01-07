import { Link } from '@inertiajs/react';
import { useTheme } from '@/Contexts/ThemeContext';
import Logo from '@/Components/Shared/Logo';

export default function AuthLayout({ children }) {
    const { theme } = useTheme();

    return (
        <div className="min-h-screen flex" data-theme={theme}>
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
                {/* Pattern overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
                
                <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
                    <Link href="/" className="mb-12">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                                <span className="text-2xl font-bold">SR</span>
                            </div>
                            <div>
                                <span className="text-2xl font-bold">Starkit React</span>
                                <p className="text-sm text-primary-200">Laravel 12 Inertia React</p>
                            </div>
                        </div>
                    </Link>

                    <div className="text-center max-w-md">
                        <h1 className="text-3xl font-bold mb-4">
                            Build Modern Apps Faster
                        </h1>
                        <p className="text-primary-100 text-lg leading-relaxed">
                            A complete starter kit with authentication, user management, 
                            role-based access control, and beautiful UI components.
                        </p>
                    </div>

                    {/* Features list */}
                    <div className="mt-12 space-y-4">
                        {[
                            'Laravel 12 + React 19 + Inertia.js',
                            'Role-Based Access Control (Spatie)',
                            '5 Beautiful Color Themes',
                            'Production Ready Setup',
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-primary-100">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
                {/* Mobile logo */}
                <div className="lg:hidden mb-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">SR</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900">Starkit React</span>
                            <p className="text-xs text-gray-500">Laravel 12 Inertia React</p>
                        </div>
                    </Link>
                </div>

                <div className="mx-auto w-full max-w-sm">
                    {children}
                </div>
            </div>
        </div>
    );
}
