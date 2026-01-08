import { useState, useEffect, useRef } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import AlertContainer from '@/Components/UI/AlertContainer';
import { useAlert } from '@/Contexts/AlertContext';
import { useTheme } from '@/Contexts/ThemeContext';

export default function DashboardLayout({ children, title = '' }) {
    const { auth, flash } = usePage().props;
    const { addAlert } = useAlert();
    const { theme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    
    // Track processed flash messages to prevent duplicates
    const processedFlashRef = useRef(new Set());

    // Handle flash messages - only process each unique message once
    useEffect(() => {
        if (!flash) return;
        
        const processFlash = (type, message) => {
            if (!message) return;
            
            // Create unique key for this flash message
            const flashKey = `${type}:${message}`;
            
            // Skip if already processed
            if (processedFlashRef.current.has(flashKey)) return;
            
            // Mark as processed
            processedFlashRef.current.add(flashKey);
            
            // Show alert
            addAlert(message, type);
            
            // Clean up after 3 seconds (allow same message again later)
            setTimeout(() => {
                processedFlashRef.current.delete(flashKey);
            }, 3000);
        };
        
        processFlash('success', flash.success);
        processFlash('error', flash.error);
        processFlash('warning', flash.warning);
        processFlash('info', flash.info);
    }, [flash?.success, flash?.error, flash?.warning, flash?.info, addAlert]);

    // Check window size and set sidebar state
    useEffect(() => {
        const checkWindowSize = () => {
            const width = window.innerWidth;
            if (width >= 768 && width < 1024) {
                setSidebarCollapsed(true);
            } else if (width >= 1024) {
                const savedCollapsed = localStorage.getItem('sidebarCollapsed');
                if (savedCollapsed !== null) {
                    setSidebarCollapsed(savedCollapsed === 'true');
                }
            }
        };

        checkWindowSize();
        window.addEventListener('resize', checkWindowSize);
        return () => window.removeEventListener('resize', checkWindowSize);
    }, []);

    const toggleSidebarCollapse = () => {
        const newState = !sidebarCollapsed;
        setSidebarCollapsed(newState);
        localStorage.setItem('sidebarCollapsed', newState);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    const user = auth?.user;
    const isAdmin = user?.roles?.some(role => ['super-admin', 'admin'].includes(role));

    return (
        <div className="min-h-screen bg-gray-50 dashboard-layout" data-theme={theme}>
            <AlertContainer />
            
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <Sidebar 
                    isOpen={sidebarOpen} 
                    onClose={() => setSidebarOpen(false)}
                    isCollapsed={sidebarCollapsed}
                    onToggleCollapse={toggleSidebarCollapse}
                    isAdmin={isAdmin}
                    user={user}
                />

                {/* Main Content */}
                <div className={`flex-1 flex flex-col overflow-hidden ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} transition-all duration-300`}>
                    {/* Top Bar */}
                    <header className="bg-white border-b border-gray-200 shadow-sm">
                        <div className="h-16 flex items-center justify-between px-3 sm:px-4 lg:px-6">
                            {/* Sidebar toggle buttons */}
                            <div className="flex items-center">
                                {/* Mobile menu button */}
                                <button
                                    id="sidebar-toggle"
                                    onClick={() => setSidebarOpen(true)}
                                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                </button>
                                
                                {/* Tablet/Desktop collapse button */}
                                <button
                                    onClick={toggleSidebarCollapse}
                                    className="hidden md:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                                >
                                    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                </button>
                            </div>

                            {/* Right side items */}
                            <div className="flex items-center space-x-4">
                                {/* User menu */}
                                <div className="relative">
                                    <button
                                        id="user-menu-button"
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                    >
                                        <div className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center ring-2 ring-white">
                                            <span className="text-sm font-semibold text-primary-700">
                                                {user?.name?.charAt(0)?.toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="hidden sm:block text-sm font-medium text-gray-700">
                                            {user?.name}
                                        </span>
                                        <svg className={`w-4 h-4 text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {userMenuOpen && (
                                        <>
                                            <div 
                                                className="fixed inset-0 z-40" 
                                                onClick={() => setUserMenuOpen(false)} 
                                            />
                                            <div
                                                id="user-menu-dropdown"
                                                className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden"
                                            >
                                                {/* User Info */}
                                                <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                                </div>
                                                
                                                {/* Menu Items */}
                                                <div className="py-1">
                                                    <Link
                                                        href={isAdmin ? '/admin/profile' : '/profile'}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                        onClick={() => setUserMenuOpen(false)}
                                                    >
                                                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        Profile
                                                    </Link>
                                                    
                                                    <Link
                                                        href={isAdmin ? '/admin/settings' : '/settings'}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                        onClick={() => setUserMenuOpen(false)}
                                                    >
                                                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        Settings
                                                    </Link>
                                                </div>
                                                
                                                {/* Logout */}
                                                <div className="border-t border-gray-200 py-1">
                                                    <button
                                                        onClick={(e) => {
                                                            setUserMenuOpen(false);
                                                            handleLogout(e);
                                                        }}
                                                        className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors text-left"
                                                    >
                                                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                                        </svg>
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>
                    
                    {/* Page Content */}
                    <main className="flex-1 overflow-y-auto">
                        <div className="p-3 sm:p-4 lg:p-6">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
