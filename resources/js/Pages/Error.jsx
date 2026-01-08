import { Head, Link } from '@inertiajs/react';
import Button from '@/Components/UI/Button';
import { ThemeProvider } from '@/Contexts/ThemeContext';

export default function Error({ status }) {
    const title = {
        503: 'Service Unavailable',
        500: 'Server Error',
        404: 'Page Not Found',
        403: 'Forbidden',
    }[status] || 'Error';
    
    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'You do not have permission to access this resource.',
    }[status] || 'An unexpected error occurred.';

    const icons = {
        503: (
            <svg className="w-16 h-16 text-yellow-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
        ),
        500: (
            <svg className="w-16 h-16 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
        ),
        404: (
            <svg className="w-16 h-16 text-primary-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
        ),
        403: (
            <svg className="w-16 h-16 text-orange-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
        ),
    };
    
    return (
        <ThemeProvider>
            <Head title={title} />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col">
                {/* Navigation */}
                <nav className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">SR</span>
                                </div>
                                <span className="font-semibold text-gray-800">Starter Kit</span>
                            </Link>
                        </div>
                    </div>
                </nav>
                
                {/* Error Content */}
                <main className="flex-grow flex items-center justify-center p-4">
                    <div className="text-center">
                        <p className="text-9xl font-bold text-gray-200">{status}</p>
                        <div className="mt-4 flex justify-center">
                            {icons[status] || icons[500]}
                        </div>
                        <h1 className="mt-6 text-3xl font-bold text-gray-900">{title}</h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">{description}</p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/">
                                <Button>
                                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                    Go to Homepage
                                </Button>
                            </Link>
                            <Button 
                                variant="secondary"
                                onClick={() => window.history.back()}
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                                Go Back
                            </Button>
                        </div>
                    </div>
                </main>
                
                {/* Footer */}
                <footer className="bg-white border-t border-gray-200">
                    <div className="max-w-7xl mx-auto py-6 px-4 text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} Starter Kit. Built with{' '}
                        <span className="text-red-500">♥</span>
                        {' '}using Laravel & React
                    </div>
                </footer>
            </div>
        </ThemeProvider>
    );
}
