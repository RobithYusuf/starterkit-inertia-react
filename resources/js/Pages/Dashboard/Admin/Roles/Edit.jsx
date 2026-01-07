import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import TextInput from '@/Components/UI/Form/TextInput';

export default function RolesEdit({ role, permissionGroups }) {
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

    return (
        <DashboardLayout title="Edit Role">
            <Head title="Edit Role" />

            <div className="max-w-4xl">
                <Card>
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">Edit Role</h2>
                        <p className="text-sm text-gray-500">Update role permissions</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <TextInput
                            label="Role Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            disabled={isSuperAdmin}
                            required
                        />

                        {isSuperAdmin && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-sm text-yellow-800">
                                    Super-admin role has all permissions and cannot be modified.
                                </p>
                            </div>
                        )}

                        {!isSuperAdmin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">
                                    Permissions
                                </label>
                                <div className="space-y-6">
                                    {Object.entries(permissionGroups || {}).map(([group, permissions]) => (
                                        <div key={group} className="border rounded-lg p-4">
                                            <h4 className="font-medium text-gray-900 capitalize mb-3">{group}</h4>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {permissions.map((permission) => (
                                                    <label key={permission.id} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={data.permissions.includes(permission.name)}
                                                            onChange={() => togglePermission(permission.name)}
                                                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                                        />
                                                        <span className="ml-2 text-sm text-gray-700">{permission.name}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 pt-4">
                            {!isSuperAdmin && (
                                <Button type="submit" loading={processing}>
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
            </div>
        </DashboardLayout>
    );
}
