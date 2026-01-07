import { Head } from '@inertiajs/react';
import { useState } from 'react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import PageHeader from '@/Components/Dashboard/PageHeader';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import TextInput from '@/Components/UI/Form/TextInput';
import PasswordInput from '@/Components/UI/Form/PasswordInput';
import Checkbox from '@/Components/UI/Form/Checkbox';
import { useAlert } from '@/Contexts/AlertContext';

export default function ComponentsIndex() {
    const { addAlert } = useAlert();
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const breadcrumbs = [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Components' },
    ];

    const tabs = [
        { label: 'Buttons', icon: 'mouse' },
        { label: 'Forms', icon: 'edit' },
        { label: 'Feedback', icon: 'bell' },
        { label: 'Cards', icon: 'card' },
    ];

    const handleLoading = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <DashboardLayout>
            <Head title="Components" />

            <PageHeader 
                title="Components Library" 
                description="Preview and documentation for all UI components"
                breadcrumbs={breadcrumbs}
            />

            {/* Tabs */}
            <div className="mb-6">
                <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-lg w-fit">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                                activeTab === index
                                    ? 'bg-white text-primary-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Buttons Tab */}
            {activeTab === 0 && (
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Button Variants</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button>Primary</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="danger">Danger</Button>
                            <Button variant="ghost">Ghost</Button>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Button Sizes</h3>
                        <div className="flex flex-wrap items-center gap-3">
                            <Button size="sm">Small</Button>
                            <Button size="md">Medium</Button>
                            <Button size="lg">Large</Button>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Button States</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button loading={loading} onClick={handleLoading}>
                                {loading ? 'Loading...' : 'Click for Loading'}
                            </Button>
                            <Button disabled>Disabled</Button>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Button with Icons</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button>
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Add Item
                            </Button>
                            <Button variant="secondary">
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                                Upload
                            </Button>
                            <Button variant="danger">
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                Delete
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

            {/* Forms Tab */}
            {activeTab === 1 && (
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Text Inputs</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                            <TextInput
                                label="Default Input"
                                placeholder="Enter text..."
                            />
                            <TextInput
                                label="With Hint"
                                placeholder="Enter email..."
                                hint="We'll never share your email"
                            />
                            <TextInput
                                label="Required Field"
                                placeholder="Required..."
                                required
                            />
                            <TextInput
                                label="With Error"
                                error="This field is required"
                            />
                            <TextInput
                                label="Disabled"
                                disabled
                                value="Disabled input"
                            />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Password Input</h3>
                        <div className="max-w-md">
                            <PasswordInput
                                label="Password"
                                placeholder="Enter password..."
                            />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Checkbox</h3>
                        <div className="space-y-3">
                            <Checkbox
                                label="Default checkbox"
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}
                            />
                            <Checkbox
                                label="Checked checkbox"
                                checked={true}
                                onChange={() => {}}
                            />
                            <Checkbox
                                label="Disabled checkbox"
                                disabled
                            />
                        </div>
                    </Card>
                </div>
            )}

            {/* Feedback Tab */}
            {activeTab === 2 && (
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Notifications</h3>
                        <p className="text-sm text-gray-500 mb-4">Click buttons to trigger different alert types</p>
                        <div className="flex flex-wrap gap-3">
                            <Button onClick={() => addAlert('This is a success message!', 'success')}>
                                Success Alert
                            </Button>
                            <Button variant="danger" onClick={() => addAlert('This is an error message!', 'error')}>
                                Error Alert
                            </Button>
                            <Button variant="secondary" onClick={() => addAlert('This is a warning message!', 'warning')}>
                                Warning Alert
                            </Button>
                            <Button variant="ghost" onClick={() => addAlert('This is an info message!', 'info')}>
                                Info Alert
                            </Button>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Static Alerts</h3>
                        <div className="space-y-3">
                            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium text-green-800">Success! Your changes have been saved.</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium text-red-800">Error! Something went wrong.</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium text-yellow-800">Warning! Please review before continuing.</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium text-blue-800">Info: New updates are available.</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Cards Tab */}
            {activeTab === 3 && (
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Variants</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="p-5">
                                <h4 className="font-semibold text-gray-900">Basic Card</h4>
                                <p className="text-sm text-gray-500 mt-2">A simple card with padding and border.</p>
                            </Card>
                            <Card className="p-5 bg-primary-50 border-primary-200">
                                <h4 className="font-semibold text-primary-900">Colored Card</h4>
                                <p className="text-sm text-primary-700 mt-2">Card with custom background color.</p>
                            </Card>
                            <Card className="p-5 shadow-lg">
                                <h4 className="font-semibold text-gray-900">Elevated Card</h4>
                                <p className="text-sm text-gray-500 mt-2">Card with larger shadow.</p>
                            </Card>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Card with Header</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <div className="px-5 py-4 border-b border-gray-200">
                                    <h4 className="font-semibold text-gray-900">Card Title</h4>
                                </div>
                                <div className="p-5">
                                    <p className="text-sm text-gray-500">Card content goes here.</p>
                                </div>
                            </Card>
                            <Card>
                                <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
                                    <h4 className="font-semibold text-gray-900">With Action</h4>
                                    <Button size="sm">Action</Button>
                                </div>
                                <div className="p-5">
                                    <p className="text-sm text-gray-500">Card with action button in header.</p>
                                </div>
                            </Card>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stat Cards</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="p-5">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Users</p>
                                        <p className="text-2xl font-bold text-gray-900">1,234</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-5">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Revenue</p>
                                        <p className="text-2xl font-bold text-gray-900">$45.2k</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-5">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-yellow-100 rounded-lg">
                                        <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Orders</p>
                                        <p className="text-2xl font-bold text-gray-900">567</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-5">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-purple-100 rounded-lg">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Growth</p>
                                        <p className="text-2xl font-bold text-gray-900">+24%</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Card>
                </div>
            )}
        </DashboardLayout>
    );
}
