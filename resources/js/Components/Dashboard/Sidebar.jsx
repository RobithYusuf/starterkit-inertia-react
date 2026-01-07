import { Link, usePage, router } from '@inertiajs/react';

const getAdminCategories = (isSuperAdmin) => [
    {
        id: 'main',
        name: 'Main',
        items: [
            { name: 'Dashboard', href: '/admin/dashboard', icon: 'home' },
            { name: 'Users', href: '/admin/users', icon: 'users' },
            ...(isSuperAdmin ? [
                { name: 'Roles', href: '/admin/roles', icon: 'shield' },
                { name: 'Permissions', href: '/admin/permissions', icon: 'key' },
            ] : []),
        ]
    },
    {
        id: 'account',
        name: 'Account',
        items: [
            { name: 'Profile', href: '/admin/profile', icon: 'user' },
            { name: 'Sessions', href: '/admin/sessions', icon: 'device' },
            { name: 'Settings', href: '/admin/settings', icon: 'cog' },
        ]
    },
    {
        id: 'developer',
        name: 'Developer',
        items: [
            { name: 'Components', href: '/admin/components', icon: 'cube' },
        ]
    }
];

const memberCategories = [
    {
        id: 'main',
        name: 'Main Menu',
        items: [
            { name: 'Dashboard', href: '/dashboard', icon: 'home' },
            { name: 'Profile', href: '/profile', icon: 'user' },
            { name: 'Sessions', href: '/sessions', icon: 'device' },
        ]
    }
];

function NavIcon({ name, className }) {
    const icons = {
        home: (
            <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        ),
        users: (
            <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
        ),
        shield: (
            <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
        ),
        key: (
            <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
        ),
        cube: (
            <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
        ),
        device: (
            <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
        ),
        cog: (
            <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        user: (
            <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        logout: (
            <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
        ),
    };
    return icons[name] || null;
}

export default function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse, isAdmin, user }) {
    const { url } = usePage();
    const isSuperAdmin = user?.roles?.includes('super-admin');
    
    const categories = isAdmin ? getAdminCategories(isSuperAdmin) : memberCategories;

    const isActive = (href) => {
        const currentPath = url.split('?')[0];
        if (href === '/') return currentPath === '/';
        return currentPath === href || currentPath.startsWith(href + '/');
    };

    const handleNavigation = (e, href) => {
        e.preventDefault();
        onClose?.();
        router.visit(href, {
            preserveScroll: false,
            preserveState: false,
        });
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <>
            {/* Desktop sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 ${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 transition-all duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className={`${isCollapsed ? 'px-2 py-4' : 'px-4 py-2.5'} border-b border-gray-200 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                        <Link 
                            href={isAdmin ? '/admin/dashboard' : '/dashboard'} 
                            className="flex items-center gap-2"
                        >
                            <div className={`${isCollapsed ? 'w-8 h-8' : 'w-9 h-9'} bg-primary-600 rounded-lg flex items-center justify-center`}>
                                <span className="text-white font-bold text-sm">SR</span>
                            </div>
                            {!isCollapsed && (
                                <div>
                                    <span className="font-bold text-gray-900">Starkit</span>
                                    <p className="text-[10px] text-gray-500 -mt-0.5">
                                        {isAdmin ? 'Admin Panel' : 'Member Area'}
                                    </p>
                                </div>
                            )}
                        </Link>
                        
                        {/* Mobile close button */}
                        <button
                            onClick={onClose}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className={`flex-1 overflow-y-auto ${isCollapsed ? 'px-2 py-3' : 'px-3 py-4'}`}>
                        {categories.map((category, index) => (
                            <div key={category.id}>
                                {/* Category separator for collapsed */}
                                {index > 0 && isCollapsed && (
                                    <div className="my-1 mx-1">
                                        <div className="border-t border-gray-200"></div>
                                    </div>
                                )}
                                
                                {/* Category label */}
                                {!isCollapsed && (
                                    <div className={`px-3 mb-2 ${index > 0 ? 'mt-3' : ''}`}>
                                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            {category.name}
                                        </h3>
                                    </div>
                                )}
                                
                                {/* Menu items */}
                                <div className="space-y-1">
                                    {category.items.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            onClick={(e) => handleNavigation(e, item.href)}
                                            className={`flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-3'} py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                                                isActive(item.href)
                                                    ? 'bg-primary-50 text-primary-700'
                                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                            title={isCollapsed ? item.name : ''}
                                        >
                                            <NavIcon 
                                                name={item.icon}
                                                className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'} shrink-0 ${
                                                    isActive(item.href) ? 'text-primary-600' : 'text-gray-400'
                                                }`}
                                            />
                                            {!isCollapsed && (
                                                <span className="ml-3">{item.name}</span>
                                            )}
                                            {isActive(item.href) && !isCollapsed && (
                                                <div className="ml-auto w-1 h-4 bg-primary-600 rounded-full"></div>
                                            )}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* User section - Logout */}
                    <div className="border-t border-gray-200 hidden md:block">
                        <div className={`${isCollapsed ? 'px-2 py-2' : 'px-3 py-3'}`}>
                            <button
                                onClick={handleLogout}
                                className={`flex items-center ${isCollapsed ? 'justify-center' : ''} w-full ${isCollapsed ? 'px-2' : 'px-3'} py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200`}
                                title={isCollapsed ? 'Logout' : ''}
                            >
                                <NavIcon 
                                    name="logout" 
                                    className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4 mr-3'} text-gray-400`}
                                />
                                {!isCollapsed && <span>Logout</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={onClose}
                ></div>
            )}
        </>
    );
}
