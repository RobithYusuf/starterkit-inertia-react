import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import TextInput from '@/Components/UI/Form/TextInput';

export default function RolesCreate({ permissionGroups }) {
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

    return (
        <DashboardLayout title="Create Role">
            <Head title="Create Role" />

            <div className="max-w-4xl">
                <Card>
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">Create New Role</h2>
                        <p className="text-sm text-gray-500">Define a new role with specific permissions</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <TextInput
                            label="Role Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            placeholder="e.g., editor, moderator"
                            required
                        />

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

                        <div className="flex gap-4 pt-4">
                            <Button type="submit" loading={processing}>
                                Create Role
                            </Button>
                            <Link href="/admin/roles">
                                <Button type="button" variant="secondary">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </Card>
            </div>
        </DashboardLayout>
    );
}
