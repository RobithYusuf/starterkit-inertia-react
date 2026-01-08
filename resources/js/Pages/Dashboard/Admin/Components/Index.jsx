import { Head } from '@inertiajs/react';
import { useState } from 'react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import PageHeader from '@/Components/Dashboard/PageHeader';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import TextInput from '@/Components/UI/Form/TextInput';
import PasswordInput from '@/Components/UI/Form/PasswordInput';
import Checkbox from '@/Components/UI/Form/Checkbox';
import Textarea from '@/Components/UI/Form/Textarea';
import Select from '@/Components/UI/Form/Select';
import RadioOption from '@/Components/UI/Form/RadioOption';
import DatePicker from '@/Components/UI/Form/DatePicker';
import FileUpload from '@/Components/UI/Form/FileUpload';
import MultiSelect from '@/Components/UI/Form/MultiSelect';
import TagInput from '@/Components/UI/Form/TagInput';
import Modal from '@/Components/UI/Modal';
import ConfirmModal from '@/Components/UI/ConfirmModal';
import Spinner from '@/Components/UI/Spinner';
import Skeleton, { SkeletonCard, SkeletonList } from '@/Components/UI/Skeleton';
import Progress, { CircularProgress } from '@/Components/UI/Progress';
import Badge from '@/Components/UI/Badge';
import Avatar, { AvatarGroup } from '@/Components/UI/Avatar';
import Tabs, { TabList, TabTrigger, TabContent, TabPanel } from '@/Components/UI/Tabs';
import Accordion, { AccordionItem } from '@/Components/UI/Accordion';
import Toggle from '@/Components/UI/Toggle';
import Tooltip from '@/Components/UI/Tooltip';
import Dropdown, { DropdownTrigger, DropdownMenu, DropdownItem, DropdownDivider } from '@/Components/UI/Dropdown';
import EmptyState from '@/Components/UI/EmptyState';
import StatCard, { StatCardGroup } from '@/Components/UI/StatCard';
import { useAlert } from '@/Contexts/AlertContext';

export default function ComponentsIndex() {
    const { addAlert } = useAlert();
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    
    // Form states
    const [selectedDate, setSelectedDate] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [selectedItems, setSelectedItems] = useState(['react']);
    const [tags, setTags] = useState(['Laravel', 'React']);
    const [toggleState, setToggleState] = useState(true);
    const [radioValue, setRadioValue] = useState('option1');
    const [selectValue, setSelectValue] = useState('');
    const [tabValue, setTabValue] = useState('tab1');
    const [progressValue, setProgressValue] = useState(65);

    const breadcrumbs = [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Components' },
    ];

    const tabs = [
        { label: 'Buttons', icon: '🔘' },
        { label: 'Forms', icon: '📝' },
        { label: 'Feedback', icon: '💬' },
        { label: 'Data Display', icon: '📊' },
        { label: 'Navigation', icon: '🧭' },
        { label: 'Overlays', icon: '🪟' },
    ];

    const handleLoading = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    const multiSelectOptions = [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue.js' },
        { value: 'angular', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'nextjs', label: 'Next.js' },
        { value: 'nuxt', label: 'Nuxt.js' },
    ];

    const selectOptions = [
        { value: '', label: 'Select an option' },
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const avatarData = [
        { name: 'John Doe' },
        { name: 'Jane Smith' },
        { name: 'Bob Wilson' },
        { name: 'Alice Brown' },
        { name: 'Charlie Davis' },
    ];

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
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
                                activeTab === index
                                    ? 'bg-white text-primary-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <span>{tab.icon}</span>
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
                            <Button variant="link">Link</Button>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Button Sizes</h3>
                        <div className="flex flex-wrap items-center gap-3">
                            <Button size="xs">Extra Small</Button>
                            <Button size="sm">Small</Button>
                            <Button size="md">Medium</Button>
                            <Button size="lg">Large</Button>
                            <Button size="xl">Extra Large</Button>
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Textarea</h3>
                        <div className="max-w-xl">
                            <Textarea label="Message" placeholder="Enter your message..." rows={4} />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                            <Select 
                                label="Default Select" 
                                options={selectOptions}
                                value={selectValue}
                                onChange={setSelectValue}
                            />
                            <Select label="Disabled Select" options={selectOptions} disabled />
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
                        <div className="space-y-3 max-w-md">
                            <RadioOption
                                id="radio-option1"
                                name="demo-radio"
                                value="option1"
                                checked={radioValue === 'option1'}
                                onChange={() => setRadioValue('option1')}
                                title="Option 1"
                                description="This is the first option"
                            />
                            <RadioOption
                                id="radio-option2"
                                name="demo-radio"
                                value="option2"
                                checked={radioValue === 'option2'}
                                onChange={() => setRadioValue('option2')}
                                title="Option 2"
                                description="This is the second option"
                            />
                            <RadioOption
                                id="radio-option3"
                                name="demo-radio"
                                value="option3"
                                checked={radioValue === 'option3'}
                                onChange={() => setRadioValue('option3')}
                                title="Option 3"
                                description="This option is disabled"
                                disabled
                            />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Toggle Switch</h3>
                        <div className="space-y-4">
                            <Toggle 
                                label="Enable notifications" 
                                checked={toggleState} 
                                onChange={setToggleState}
                            />
                            <Toggle 
                                label="Dark mode" 
                                description="Use dark theme across the app"
                                checked={false} 
                                onChange={() => {}}
                            />
                            <Toggle 
                                label="Disabled toggle" 
                                disabled
                            />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Date Picker</h3>
                        <div className="max-w-md">
                            <DatePicker 
                                label="Select Date" 
                                value={selectedDate}
                                onChange={setSelectedDate}
                                placeholder="Pick a date..."
                            />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Multi Select</h3>
                        <div className="max-w-md">
                            <MultiSelect 
                                label="Select Frameworks" 
                                options={multiSelectOptions}
                                value={selectedItems}
                                onChange={setSelectedItems}
                                placeholder="Choose frameworks..."
                                maxItems={4}
                            />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tag Input</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TagInput 
                                label="Basic Tags" 
                                value={tags}
                                onChange={setTags}
                                placeholder="Ketik dan tekan Enter..."
                                hint="Pisahkan dengan koma atau tekan Enter"
                                suggestions={['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'PHP', 'Java', 'C#']}
                                maxTags={5}
                            />
                            <TagInput 
                                label="Secondary Variant" 
                                value={['Design', 'UI/UX']}
                                onChange={() => {}}
                                tagVariant="secondary"
                                placeholder="Add skills..."
                                suggestions={['Design', 'Development', 'Marketing']}
                            />
                            <TagInput 
                                label="Outline Variant" 
                                value={['React', 'Vue']}
                                onChange={() => {}}
                                tagVariant="outline"
                                placeholder="Add frameworks..."
                            />
                            <TagInput 
                                label="With Validation" 
                                value={[]}
                                onChange={() => {}}
                                placeholder="Min 3 characters..."
                                validateTag={(tag) => tag.length >= 3 || 'Minimal 3 karakter'}
                                hint="Tag minimal 3 karakter"
                            />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">File Upload</h3>
                        <div className="max-w-xl">
                            <FileUpload 
                                label="Upload Files" 
                                accept="image/*,.pdf"
                                multiple
                                value={uploadedFiles}
                                onChange={setUploadedFiles}
                                description="PNG, JPG, PDF up to 5MB"
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
                            <Button onClick={() => addAlert('This is a success message!', 'success')}>Success Alert</Button>
                            <Button variant="danger" onClick={() => addAlert('This is an error message!', 'error')}>Error Alert</Button>
                            <Button variant="secondary" onClick={() => addAlert('This is a warning message!', 'warning')}>Warning Alert</Button>
                            <Button variant="ghost" onClick={() => addAlert('This is an info message!', 'info')}>Info Alert</Button>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Spinner Component</h3>
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <Spinner size="xs" />
                                <span className="text-xs text-gray-500">xs</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Spinner size="sm" />
                                <span className="text-xs text-gray-500">sm</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Spinner size="md" />
                                <span className="text-xs text-gray-500">md</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Spinner size="lg" />
                                <span className="text-xs text-gray-500">lg</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Spinner size="xl" />
                                <span className="text-xs text-gray-500">xl</span>
                            </div>
                            <Spinner size="md" showLabel label="Loading data..." />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Bar</h3>
                        <div className="space-y-6 max-w-xl">
                            <Progress value={25} showLabel />
                            <Progress value={50} color="success" showLabel />
                            <Progress value={75} color="warning" showLabel striped animated />
                            <Progress value={100} color="info" showLabel />
                            
                            <div className="flex items-center gap-4 pt-4">
                                <Button size="sm" onClick={() => setProgressValue(Math.max(0, progressValue - 10))}>-10</Button>
                                <Progress value={progressValue} showLabel className="flex-1" />
                                <Button size="sm" onClick={() => setProgressValue(Math.min(100, progressValue + 10))}>+10</Button>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Circular Progress</h3>
                        <div className="flex flex-wrap items-center gap-8">
                            <CircularProgress value={25} size="sm" />
                            <CircularProgress value={50} size="md" color="success" />
                            <CircularProgress value={75} size="lg" color="warning" />
                            <CircularProgress value={progressValue} size="xl" color="info" />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skeleton Loading</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-3">Text Skeleton</p>
                                <Skeleton variant="text" lines={4} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-3">Card Skeleton</p>
                                <SkeletonCard />
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm font-medium text-gray-700 mb-3">List Skeleton</p>
                                <SkeletonList items={3} />
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Data Display Tab */}
            {activeTab === 3 && (
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Badge Component</h3>
                        <div className="flex flex-wrap gap-3">
                            <Badge>Default</Badge>
                            <Badge variant="primary">Primary</Badge>
                            <Badge variant="success">Success</Badge>
                            <Badge variant="danger">Danger</Badge>
                            <Badge variant="warning">Warning</Badge>
                            <Badge variant="info">Info</Badge>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4">
                            <Badge variant="primary" dot>With Dot</Badge>
                            <Badge variant="success" rounded>Rounded</Badge>
                            <Badge variant="danger" size="lg">Large</Badge>
                            <Badge variant="info" removable onRemove={() => addAlert('Badge removed!', 'info')}>Removable</Badge>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Avatar Component</h3>
                        <div className="flex flex-wrap items-end gap-4 mb-6">
                            <div className="flex flex-col items-center gap-2">
                                <Avatar name="John Doe" size="xs" />
                                <span className="text-xs text-gray-500">xs</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Avatar name="Jane Smith" size="sm" />
                                <span className="text-xs text-gray-500">sm</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Avatar name="Bob Wilson" size="md" status="online" />
                                <span className="text-xs text-gray-500">md</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Avatar name="Alice Brown" size="lg" status="away" />
                                <span className="text-xs text-gray-500">lg</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Avatar name="Charlie Davis" size="xl" status="busy" />
                                <span className="text-xs text-gray-500">xl</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-3">Avatar Group</p>
                            <AvatarGroup avatars={avatarData} max={4} />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stat Cards</h3>
                        <StatCardGroup>
                            <StatCard 
                                title="Total Users" 
                                value="1,234"
                                trend={{ value: 12, direction: 'up', label: 'vs last month' }}
                                icon={
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                    </svg>
                                }
                            />
                            <StatCard 
                                title="Revenue" 
                                value="$45.2k"
                                color="success"
                                trend={{ value: 8, direction: 'up' }}
                            />
                            <StatCard 
                                title="Orders" 
                                value="567"
                                color="warning"
                                trend={{ value: 3, direction: 'down' }}
                            />
                            <StatCard 
                                title="Growth" 
                                value="+24%"
                                color="info"
                            />
                        </StatCardGroup>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tooltip Component</h3>
                        <div className="flex flex-wrap gap-4">
                            <Tooltip content="Top tooltip" position="top">
                                <Button variant="secondary">Hover (Top)</Button>
                            </Tooltip>
                            <Tooltip content="Bottom tooltip" position="bottom">
                                <Button variant="secondary">Hover (Bottom)</Button>
                            </Tooltip>
                            <Tooltip content="Left tooltip" position="left">
                                <Button variant="secondary">Hover (Left)</Button>
                            </Tooltip>
                            <Tooltip content="Right tooltip" position="right">
                                <Button variant="secondary">Hover (Right)</Button>
                            </Tooltip>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Empty State</h3>
                        <EmptyState 
                            title="No items found"
                            description="Get started by creating your first item."
                            actionLabel="Create Item"
                            onAction={() => addAlert('Create item clicked!', 'info')}
                        />
                    </Card>
                </div>
            )}

            {/* Navigation Tab */}
            {activeTab === 4 && (
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tabs Component</h3>
                        <Tabs value={tabValue} onChange={setTabValue}>
                            <TabList>
                                <TabTrigger value="tab1">Profile</TabTrigger>
                                <TabTrigger value="tab2">Settings</TabTrigger>
                                <TabTrigger value="tab3">Notifications</TabTrigger>
                                <TabTrigger value="tab4" disabled>Disabled</TabTrigger>
                            </TabList>
                            <TabContent>
                                <TabPanel value="tab1">
                                    <p className="text-gray-600">This is the Profile tab content. You can put any content here.</p>
                                </TabPanel>
                                <TabPanel value="tab2">
                                    <p className="text-gray-600">This is the Settings tab content. Configure your preferences here.</p>
                                </TabPanel>
                                <TabPanel value="tab3">
                                    <p className="text-gray-600">This is the Notifications tab content. Manage your notifications.</p>
                                </TabPanel>
                            </TabContent>
                        </Tabs>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tabs Variants</h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-3">Pills Variant</p>
                                <Tabs defaultValue="pills1" variant="pills">
                                    <TabList>
                                        <TabTrigger value="pills1">Tab 1</TabTrigger>
                                        <TabTrigger value="pills2">Tab 2</TabTrigger>
                                        <TabTrigger value="pills3">Tab 3</TabTrigger>
                                    </TabList>
                                </Tabs>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-3">Underline Variant</p>
                                <Tabs defaultValue="under1" variant="underline">
                                    <TabList>
                                        <TabTrigger value="under1">Tab 1</TabTrigger>
                                        <TabTrigger value="under2">Tab 2</TabTrigger>
                                        <TabTrigger value="under3">Tab 3</TabTrigger>
                                    </TabList>
                                </Tabs>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Accordion Component</h3>
                        <Accordion type="single" defaultValue={['item1']}>
                            <AccordionItem value="item1" title="What is React?">
                                React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".
                            </AccordionItem>
                            <AccordionItem value="item2" title="What is Inertia.js?">
                                Inertia.js lets you quickly build modern single-page React, Vue and Svelte apps using classic server-side routing and controllers.
                            </AccordionItem>
                            <AccordionItem value="item3" title="What is Laravel?">
                                Laravel is a web application framework with expressive, elegant syntax. It provides a structure and starting point for creating your application.
                            </AccordionItem>
                        </Accordion>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dropdown Component</h3>
                        <div className="flex flex-wrap gap-4">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button>
                                        Options
                                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => addAlert('Edit clicked', 'info')}>Edit</DropdownItem>
                                    <DropdownItem onClick={() => addAlert('Duplicate clicked', 'info')}>Duplicate</DropdownItem>
                                    <DropdownItem onClick={() => addAlert('Archive clicked', 'info')}>Archive</DropdownItem>
                                    <DropdownDivider />
                                    <DropdownItem danger onClick={() => addAlert('Delete clicked', 'error')}>Delete</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <Dropdown>
                                <DropdownTrigger>
                                    <Button variant="secondary">
                                        With Icons
                                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem 
                                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>}
                                    >
                                        Edit
                                    </DropdownItem>
                                    <DropdownItem 
                                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>}
                                    >
                                        Duplicate
                                    </DropdownItem>
                                    <DropdownDivider />
                                    <DropdownItem 
                                        danger
                                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>}
                                    >
                                        Delete
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </Card>
                </div>
            )}

            {/* Overlays Tab */}
            {activeTab === 5 && (
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Modal Component</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
                            <Button variant="danger" onClick={() => setConfirmModalOpen(true)}>Open Confirm Modal</Button>
                        </div>
                        
                        <Modal
                            isOpen={modalOpen}
                            onClose={() => setModalOpen(false)}
                            title="Modal Title"
                            footer={
                                <>
                                    <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                                    <Button onClick={() => {
                                        setModalOpen(false);
                                        addAlert('Action confirmed!', 'success');
                                    }}>Confirm</Button>
                                </>
                            }
                        >
                            <p className="text-gray-600">
                                This is a modal dialog component. It uses React Portal to render outside the DOM hierarchy,
                                ensuring proper z-index handling and accessibility.
                            </p>
                            <p className="text-gray-600 mt-4">
                                Features include:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                                <li>Escape key to close</li>
                                <li>Click outside to close</li>
                                <li>Focus trap</li>
                                <li>Body scroll lock</li>
                                <li>Smooth animations</li>
                            </ul>
                        </Modal>

                        <ConfirmModal
                            isOpen={confirmModalOpen}
                            onClose={() => setConfirmModalOpen(false)}
                            onConfirm={() => {
                                setConfirmModalOpen(false);
                                addAlert('Item deleted!', 'success');
                            }}
                            title="Delete Item"
                            message="Are you sure you want to delete this item? This action cannot be undone."
                            confirmText="Delete"
                            cancelText="Cancel"
                            variant="danger"
                        />
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Modal Variants</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button variant="danger" onClick={() => setConfirmModalOpen(true)}>Danger</Button>
                            <Button variant="secondary" onClick={() => addAlert('Warning modal - implement as needed', 'warning')}>Warning</Button>
                            <Button onClick={() => addAlert('Info modal - implement as needed', 'info')}>Info</Button>
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
                </div>
            )}
        </DashboardLayout>
    );
}
