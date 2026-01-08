import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import PageHeader from '@/Components/Dashboard/PageHeader';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import TextInput from '@/Components/UI/Form/TextInput';

export default function RolesEdit({ role, permissionGroups }) {
    const breadcrumbs = [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Roles', href: '/admin/roles' },
        { label: `Edit: ${role.name}` },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: role.name || '',
        permissions: role.permissions || [],
    });

    const isSuperAdmin = role.name === 'super-admin';

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/roles/${role.id}`);
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
            <Head title={`Edit Role: ${role.name}`} />

            <PageHeader 
                title={`Edit Role: ${role.name}`}
                description="Update role name and permissions"
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
                                disabled={isSuperAdmin}
                                required
                            />
                        </div>
                    </div>

                    {/* Super Admin Warning */}
                    {isSuperAdmin && (
                        <>
                            <hr className="border-gray-200" />
                            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                                <div>
                                    <h4 className="font-medium text-yellow-800">Super Admin Role</h4>
                                    <p className="text-sm text-yellow-700 mt-1">
                                        Super-admin role has all permissions and cannot be modified. This role automatically has access to all features.
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Permissions */}
                    {!isSuperAdmin && (
                        <>
                            <hr className="border-gray-200" />
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
                        </>
                    )}

                    <hr className="border-gray-200" />

                    {/* Actions */}
                    <div className="flex gap-4">
                        {!isSuperAdmin && (
                            <Button type="submit" loading={processing}>
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                Update Role
                            </Button>
                        )}
                        <Link href="/admin/roles">
                            <Button type="button" variant="secondary">
                                {isSuperAdmin ? 'Back' : 'Cancel'}
                            </Button>
                        </Link>
                    </div>
                </form>
            </Card>
        </DashboardLayout>
    );
}
