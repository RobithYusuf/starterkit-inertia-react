import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import PageHeader from '@/Components/Dashboard/PageHeader';
import Card from '@/Components/UI/Card';
import { useTheme } from '@/Contexts/ThemeContext';
import { useAlert } from '@/Contexts/AlertContext';

const presetThemes = {
    orange: {
        name: 'Orange',
        colors: { primary300: '#fdba74', primary500: '#f97316', primary700: '#c2410c' }
    },
    blue: {
        name: 'Blue',
        colors: { primary300: '#93c5fd', primary500: '#3b82f6', primary700: '#1d4ed8' }
    },
    emerald: {
        name: 'Emerald',
        colors: { primary300: '#6ee7b7', primary500: '#10b981', primary700: '#047857' }
    },
    purple: {
        name: 'Purple',
        colors: { primary300: '#c4b5fd', primary500: '#8b5cf6', primary700: '#6d28d9' }
    },
    slate: {
        name: 'Slate',
        colors: { primary300: '#cbd5e1', primary500: '#64748b', primary700: '#334155' }
    },
};

const alertPositions = [
    { value: 'top-left', label: 'Top Left', icon: '↖' },
    { value: 'top-center', label: 'Top Center', icon: '↑' },
    { value: 'top-right', label: 'Top Right', icon: '↗' },
    { value: 'bottom-left', label: 'Bottom Left', icon: '↙' },
    { value: 'bottom-center', label: 'Bottom Center', icon: '↓' },
    { value: 'bottom-right', label: 'Bottom Right', icon: '↘' }
];

export default function Settings() {
    const { theme, setTheme } = useTheme();
    const { addAlert, position, setPosition } = useAlert();

    const breadcrumbs = [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Settings' },
    ];

    const handleThemeChange = (themeName) => {
        setTheme(themeName);
        addAlert(`Theme: ${presetThemes[themeName].name}`, 'success');
    };

    const handleAlertPositionChange = (newPosition) => {
        setPosition(newPosition);
        addAlert('Alert position changed', 'success');
    };

    return (
        <DashboardLayout>
            <Head title="Settings" />

            <PageHeader 
                title="Settings" 
                description="Customize your application preferences"
                breadcrumbs={breadcrumbs}
            />

            <div className="space-y-6">
                {/* Theme Settings - Full Width */}
                <Card className="p-5">
                    <div className="mb-4">
                        <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                            </svg>
                            Theme
                        </h3>
                        <p className="text-sm text-gray-500">Choose your preferred color theme</p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {Object.entries(presetThemes).map(([key, themeData]) => (
                            <button
                                key={key}
                                onClick={() => handleThemeChange(key)}
                                className={`relative p-3 rounded-xl border-2 transition-all hover:shadow-md ${
                                    theme === key 
                                        ? 'border-primary-500 bg-primary-50 shadow-sm' 
                                        : 'border-gray-200 hover:border-gray-300 bg-white'
                                }`}
                            >
                                {/* Color palette */}
                                <div className="flex gap-1 mb-2 justify-center">
                                    <div 
                                        className="w-6 h-6 rounded-full shadow-sm" 
                                        style={{ backgroundColor: themeData.colors.primary300 }}
                                    />
                                    <div 
                                        className="w-6 h-6 rounded-full shadow-sm" 
                                        style={{ backgroundColor: themeData.colors.primary500 }}
                                    />
                                    <div 
                                        className="w-6 h-6 rounded-full shadow-sm" 
                                        style={{ backgroundColor: themeData.colors.primary700 }}
                                    />
                                </div>
                                
                                {/* Theme name */}
                                <span className={`text-sm font-medium block text-center ${
                                    theme === key ? 'text-primary-700' : 'text-gray-700'
                                }`}>
                                    {themeData.name}
                                </span>
                                
                                {/* Active indicator */}
                                {theme === key && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Alert Position */}
                    <Card className="p-5">
                        <div className="mb-4">
                            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                                Alert Position
                            </h3>
                            <p className="text-sm text-gray-500">Where notifications appear</p>
                        </div>
                        
                        {/* Position Grid */}
                        <div className="grid grid-cols-3 gap-2 p-3 bg-gray-100 rounded-lg">
                            {alertPositions.map((pos) => (
                                <button
                                    key={pos.value}
                                    onClick={() => handleAlertPositionChange(pos.value)}
                                    className={`flex flex-col items-center justify-center p-2 rounded-md transition-all text-center ${
                                        position === pos.value 
                                            ? 'bg-primary-500 text-white shadow-sm' 
                                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                    }`}
                                >
                                    <span className="text-lg mb-0.5">{pos.icon}</span>
                                    <span className="text-xs">{pos.label.split(' ')[1]}</span>
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Notifications */}
                    <Card className="p-5">
                        <div className="mb-4">
                            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                                Notifications
                            </h3>
                            <p className="text-sm text-gray-500">Email preferences</p>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-700">Email notifications</span>
                                <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">Soon</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-700">Weekly digest</span>
                                <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">Soon</span>
                            </div>
                        </div>
                    </Card>

                    {/* Other Settings */}
                    <Card className="p-5">
                        <div className="mb-4">
                            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Other
                            </h3>
                            <p className="text-sm text-gray-500">Additional preferences</p>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-700">Dark Mode</span>
                                <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">Soon</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-700">Language</span>
                                <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">Soon</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
