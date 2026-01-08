import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import PageHeader from '@/Components/Dashboard/PageHeader';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import TextInput from '@/Components/UI/Form/TextInput';

export default function RolesCreate({ permissionGroups }) {
    const breadcrumbs = [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Roles', href: '/admin/roles' },
        { label: 'Create' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        permissions: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/roles');
    };

    const togglePermission = (permissionName) => {
        const newPermissions = data.permissions.includes(permissionName)
            ? data.permissions.filter(p => p !== permissionName)
            : [...data.permissions, permissionName];
        setData('permissions', newPermissions);
    };

    const toggleGroup = (permissions) => {
        const permissionNames = permissions.map(p => p.name);
        const allSelected = permissionNames.every(name => data.permissions.includes(name));
        
        if (allSelected) {
            setData('permissions', data.permissions.filter(p => !permissionNames.includes(p)));
        } else {
            const newPermissions = [...new Set([...data.permissions, ...permissionNames])];
            setData('permissions', newPermissions);
        }
    };

    return (
        <DashboardLayout>
            <Head title="Create Role" />

            <PageHeader 
                title="Create New Role" 
                description="Define a new role with specific permissions"
                breadcrumbs={breadcrumbs}
            >
                <Link href="/admin/roles">
                    <Button variant="secondary">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Back to Roles
                    </Button>
                </Link>
            </PageHeader>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Role Name */}
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-4">Role Information</h3>
                        <div className="max-w-md">
                            <TextInput
                                label="Role Name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                                placeholder="e.g., editor, moderator"
                                required
                            />
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Permissions */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-semibold text-gray-900">Permissions</h3>
                            <span className="text-sm text-gray-500">{data.permissions.length} selected</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {Object.entries(permissionGroups || {}).map(([group, permissions]) => {
                                const allSelected = permissions.every(p => data.permissions.includes(p.name));
                                const someSelected = permissions.some(p => data.permissions.includes(p.name));
                                
                                return (
                                    <div key={group} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-medium text-gray-900 capitalize">{group}</h4>
                                            <button
                                                type="button"
                                                onClick={() => toggleGroup(permissions)}
                                                className={`text-xs px-2 py-1 rounded ${
                                                    allSelected 
                                                        ? 'bg-primary-100 text-primary-700' 
                                                        : someSelected
                                                            ? 'bg-yellow-100 text-yellow-700'
                                                            : 'bg-gray-100 text-gray-600'
                                                }`}
                                            >
                                                {allSelected ? 'Deselect All' : 'Select All'}
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {permissions.map((permission) => (
                                                <label key={permission.id} className="flex items-center cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.permissions.includes(permission.name)}
                                                        onChange={() => togglePermission(permission.name)}
                                                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                                                        {permission.name.split('.')[1] || permission.name}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Actions */}
                    <div className="flex gap-4">
                        <Button type="submit" loading={processing}>
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Create Role
                        </Button>
                        <Link href="/admin/roles">
                            <Button type="button" variant="secondary">Cancel</Button>
                        </Link>
                    </div>
                </form>
            </Card>
        </DashboardLayout>
    );
}
