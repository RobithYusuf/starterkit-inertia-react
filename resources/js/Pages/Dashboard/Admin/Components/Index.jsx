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
    const [modalOpen, setModalOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const breadcrumbs = [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Components' },
    ];

    const tabs = [
        { label: 'Buttons' },
        { label: 'Forms' },
        { label: 'Feedback' },
        { label: 'Data Display' },
        { label: 'Navigation' },
        { label: 'Overlays' },
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
            <div className="mb-6 overflow-x-auto">
                <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit min-w-full sm:min-w-0">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
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

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Button Groups</h3>
                        <div className="flex flex-wrap gap-4">
                            <div className="inline-flex rounded-lg shadow-sm">
                                <Button className="rounded-r-none border-r-0">Left</Button>
                                <Button className="rounded-none border-x-0">Middle</Button>
                                <Button className="rounded-l-none border-l-0">Right</Button>
                            </div>
                            <div className="inline-flex rounded-lg shadow-sm">
                                <Button variant="secondary" className="rounded-r-none">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" />
                                    </svg>
                                </Button>
                                <Button variant="secondary" className="rounded-none border-x border-gray-300">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                                    </svg>
                                </Button>
                                <Button variant="secondary" className="rounded-l-none">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                </Button>
                            </div>
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
                            <TextInput label="Default Input" placeholder="Enter text..." />
                            <TextInput label="With Hint" placeholder="Enter email..." hint="We'll never share your email" />
                            <TextInput label="Required Field" placeholder="Required..." required />
                            <TextInput label="With Error" error="This field is required" />
                            <TextInput label="Disabled" disabled value="Disabled input" />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Password Input</h3>
                        <div className="max-w-md">
                            <PasswordInput label="Password" placeholder="Enter password..." />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Checkbox</h3>
                        <div className="space-y-3">
                            <Checkbox label="Default checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                            <Checkbox label="Checked checkbox" checked={true} onChange={() => {}} />
                            <Checkbox label="Disabled checkbox" disabled />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Radio Buttons</h3>
                        <div className="space-y-3">
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="radio-demo" defaultChecked className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500" />
                                <span className="ml-2 text-sm text-gray-700">Option 1</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="radio-demo" className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500" />
                                <span className="ml-2 text-sm text-gray-700">Option 2</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="radio-demo" disabled className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500" />
                                <span className="ml-2 text-sm text-gray-400">Disabled option</span>
                            </label>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Default Select</label>
                                <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                                    <option>Select an option</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                    <option>Option 3</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Disabled Select</label>
                                <select disabled className="w-full rounded-lg border-gray-300 shadow-sm bg-gray-100">
                                    <option>Disabled</option>
                                </select>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Textarea</h3>
                        <div className="max-w-xl">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea 
                                rows={4} 
                                placeholder="Enter your message..."
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Toggle Switch</h3>
                        <div className="space-y-4">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-700">Toggle off</span>
                            </label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-700">Toggle on</span>
                            </label>
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
                            <Button onClick={() => addAlert('This is a success message!', 'success')}>Success Alert</Button>
                            <Button variant="danger" onClick={() => addAlert('This is an error message!', 'error')}>Error Alert</Button>
                            <Button variant="secondary" onClick={() => addAlert('This is a warning message!', 'warning')}>Warning Alert</Button>
                            <Button variant="ghost" onClick={() => addAlert('This is an info message!', 'info')}>Info Alert</Button>
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

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Bars</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Progress</span>
                                    <span className="text-gray-900 font-medium">25%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-primary-600 h-2 rounded-full" style={{width: '25%'}}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Progress</span>
                                    <span className="text-gray-900 font-medium">50%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-600 h-2 rounded-full" style={{width: '50%'}}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Progress</span>
                                    <span className="text-gray-900 font-medium">75%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-yellow-500 h-2 rounded-full" style={{width: '75%'}}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Completed</span>
                                    <span className="text-gray-900 font-medium">100%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '100%'}}></div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Loading Spinners</h3>
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
                            <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                                <span className="text-sm text-gray-600">Loading...</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skeleton Loading</h3>
                        <div className="space-y-4">
                            <div className="animate-pulse flex items-center gap-4">
                                <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                            <div className="animate-pulse space-y-3">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Data Display Tab */}
            {activeTab === 3 && (
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Badges</h3>
                        <div className="flex flex-wrap gap-3">
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">Default</span>
                            <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">Primary</span>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Success</span>
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">Danger</span>
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">Warning</span>
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">Info</span>
                            <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">Purple</span>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Avatars</h3>
                        <div className="flex flex-wrap items-end gap-4">
                            <div className="flex flex-col items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                                    <span className="text-xs font-medium text-primary-700">XS</span>
                                </div>
                                <span className="text-xs text-gray-500">xs</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                    <span className="text-sm font-medium text-primary-700">SM</span>
                                </div>
                                <span className="text-xs text-gray-500">sm</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                                    <span className="text-base font-medium text-primary-700">MD</span>
                                </div>
                                <span className="text-xs text-gray-500">md</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                                    <span className="text-lg font-medium text-primary-700">LG</span>
                                </div>
                                <span className="text-xs text-gray-500">lg</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
                                    <span className="text-xl font-medium text-primary-700">XL</span>
                                </div>
                                <span className="text-xs text-gray-500">xl</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Avatar Groups</h3>
                        <div className="flex -space-x-2">
                            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center border-2 border-white">
                                <span className="text-sm font-medium text-red-700">A</span>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white">
                                <span className="text-sm font-medium text-blue-700">B</span>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center border-2 border-white">
                                <span className="text-sm font-medium text-green-700">C</span>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-white">
                                <span className="text-sm font-medium text-yellow-700">D</span>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white">
                                <span className="text-sm font-medium text-gray-700">+3</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Table</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-900">John Doe</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">john@example.com</td>
                                        <td className="px-4 py-3"><span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">Admin</span></td>
                                        <td className="px-4 py-3"><span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Active</span></td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-900">Jane Smith</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">jane@example.com</td>
                                        <td className="px-4 py-3"><span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Member</span></td>
                                        <td className="px-4 py-3"><span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Active</span></td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-900">Bob Wilson</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">bob@example.com</td>
                                        <td className="px-4 py-3"><span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Member</span></td>
                                        <td className="px-4 py-3"><span className="inline-flex rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">Inactive</span></td>
                                    </tr>
                                </tbody>
                            </table>
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
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
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

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">List</h3>
                        <ul className="divide-y divide-gray-200">
                            <li className="py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-sm font-medium text-blue-700">JD</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                                        <p className="text-xs text-gray-500">john@example.com</p>
                                    </div>
                                </div>
                                <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Active</span>
                            </li>
                            <li className="py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                        <span className="text-sm font-medium text-purple-700">JS</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Jane Smith</p>
                                        <p className="text-xs text-gray-500">jane@example.com</p>
                                    </div>
                                </div>
                                <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Active</span>
                            </li>
                            <li className="py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                        <span className="text-sm font-medium text-gray-700">BW</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Bob Wilson</p>
                                        <p className="text-xs text-gray-500">bob@example.com</p>
                                    </div>
                                </div>
                                <span className="inline-flex rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">Inactive</span>
                            </li>
                        </ul>
                    </Card>
                </div>
            )}

            {/* Navigation Tab */}
            {activeTab === 4 && (
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Breadcrumbs</h3>
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                                <li className="inline-flex items-center">
                                    <a href="#" className="text-sm text-gray-500 hover:text-primary-600">Home</a>
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <a href="#" className="ml-1 text-sm text-gray-500 hover:text-primary-600 md:ml-2">Products</a>
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-1 text-sm font-medium text-gray-900 md:ml-2">Details</span>
                                </li>
                            </ol>
                        </nav>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tabs</h3>
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8">
                                <a href="#" className="border-b-2 border-primary-500 py-2 px-1 text-sm font-medium text-primary-600">Profile</a>
                                <a href="#" className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Settings</a>
                                <a href="#" className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Notifications</a>
                            </nav>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pills Tabs</h3>
                        <div className="flex flex-wrap gap-2">
                            <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg">Active</button>
                            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Tab 2</button>
                            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Tab 3</button>
                            <button className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed" disabled>Disabled</button>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pagination</h3>
                        <nav className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">100</span> results</p>
                            <div className="flex gap-1">
                                <button className="px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                                <button className="px-3 py-1.5 text-sm font-medium text-white bg-primary-600 border border-primary-600 rounded-lg">1</button>
                                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
                            </div>
                        </nav>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Steps</h3>
                        <ol className="flex items-center w-full">
                            <li className="flex items-center text-primary-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-primary-200 after:border-4 after:inline-block">
                                <span className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full shrink-0">
                                    <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </li>
                            <li className="flex items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-4 after:inline-block">
                                <span className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-full shrink-0 text-white font-medium">2</span>
                            </li>
                            <li className="flex items-center">
                                <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shrink-0 text-gray-500 font-medium">3</span>
                            </li>
                        </ol>
                    </Card>
                </div>
            )}

            {/* Overlays Tab */}
            {activeTab === 5 && (
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Modal</h3>
                        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
                        
                        {modalOpen && (
                            <div className="fixed inset-0 z-50 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4">
                                    <div className="fixed inset-0 bg-black/50" onClick={() => setModalOpen(false)}></div>
                                    <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Modal Title</h3>
                                        <p className="text-sm text-gray-500 mb-4">This is a simple modal dialog. You can put any content here.</p>
                                        <div className="flex justify-end gap-3">
                                            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                                            <Button onClick={() => setModalOpen(false)}>Confirm</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dropdown</h3>
                        <div className="relative inline-block">
                            <Button onClick={() => setDropdownOpen(!dropdownOpen)}>
                                Dropdown
                                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Button>
                            
                            {dropdownOpen && (
                                <>
                                    <div className="fixed inset-0" onClick={() => setDropdownOpen(false)}></div>
                                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Duplicate</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Archive</a>
                                        <hr className="my-1" />
                                        <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                                    </div>
                                </>
                            )}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tooltip</h3>
                        <div className="flex flex-wrap gap-4">
                            <div className="relative group">
                                <Button variant="secondary">Hover me</Button>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Tooltip text
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                </div>
                            </div>
                        </div>
                    </Card>

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
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Empty States</h3>
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-semibold text-gray-900">No items</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by creating a new item.</p>
                            <div className="mt-6">
                                <Button>
                                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    New Item
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </DashboardLayout>
    );
}
