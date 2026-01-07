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
    
    return (
        <ThemeProvider>
            <Head title={title} />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col">
                {/* Navigation */}
                <nav className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link href="/" className="flex items-center gap-2">
                                <svg className="w-8 h-8 text-primary-600" viewBox="0 0 50 52" fill="currentColor">
                                    <path d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 0 1-.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054L.402 39.944A.801.801 0 0 1 0 39.25V6.334c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.053-.04.079-.06.029-.024.055-.05.088-.069h.001l9.61-5.533a.802.802 0 0 1 .8 0l9.61 5.533h.002c.032.02.059.045.088.068.026.02.055.038.078.06.028.029.048.062.072.094.017.024.04.045.054.071.023.04.036.082.052.124.008.023.022.044.028.068a.809.809 0 0 1 .028.209v20.559l8.008-4.611v-10.51c0-.07.01-.141.028-.208.007-.024.02-.045.028-.068.016-.042.03-.085.052-.124.015-.026.037-.047.054-.071.024-.032.044-.065.072-.093.023-.023.052-.04.078-.06.03-.024.056-.05.088-.069h.001l9.611-5.533a.801.801 0 0 1 .8 0l9.61 5.533c.034.02.06.045.09.068.025.02.054.038.077.06.028.029.048.062.072.094.018.024.04.045.054.071.023.039.036.082.052.124.009.023.022.044.028.068z" />
                                </svg>
                                <span className="font-semibold text-gray-800">Starter Kit</span>
                            </Link>
                        </div>
                    </div>
                </nav>
                
                {/* Error Content */}
                <main className="flex-grow flex items-center justify-center p-4">
                    <div className="text-center">
                        <p className="text-9xl font-bold text-gray-200">{status}</p>
                        <div className="mt-4">
                            <i className="fas fa-exclamation-circle text-6xl text-primary-500"></i>
                        </div>
                        <h1 className="mt-6 text-3xl font-bold text-gray-900">{title}</h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">{description}</p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/" icon="fas fa-home">
                                Go to Homepage
                            </Button>
                            <Button 
                                variant="outline" 
                                icon="fas fa-arrow-left"
                                onClick={() => window.history.back()}
                            >
                                Go Back
                            </Button>
                        </div>
                    </div>
                </main>
                
                {/* Footer */}
                <footer className="bg-white border-t border-gray-200">
                    <div className="max-w-7xl mx-auto py-6 px-4 text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} Starter Kit. Built with{' '}
                        <i className="fas fa-heart text-red-500 mx-1"></i>
                        using Laravel & React
                    </div>
                </footer>
            </div>
        </ThemeProvider>
    );
}
