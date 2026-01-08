import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import TextInput from '@/Components/UI/Form/TextInput';
import Checkbox from '@/Components/UI/Form/Checkbox';

export default function PermissionsCreate({ groups, roles }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        roles: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/permissions');
    };

    const toggleRole = (roleName) => {
        const newRoles = data.roles.includes(roleName)
            ? data.roles.filter(r => r !== roleName)
            : [...data.roles, roleName];
        setData('roles', newRoles);
    };

    return (
        <DashboardLayout title="Create Permission">
            <Head title="Create Permission" />

            <div className="max-w-2xl">
                <Card>
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">Create New Permission</h2>
                        <p className="text-sm text-gray-500">Add a new permission to the system</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <TextInput
                            label="Permission Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            placeholder="e.g., post.create, comment.delete"
                            hint="Format: module.action (e.g., user.view, post.edit)"
                            required
                        />

                        {groups?.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Existing Groups
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {groups.map((group) => (
                                        <span
                                            key={group}
                                            className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                                        >
                                            {group}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Assign to Roles (optional)
                            </label>
                            <p className="text-xs text-gray-500 mb-3">
                                Permission will automatically be assigned to super-admin
                            </p>
                            <div className="space-y-2">
                                {roles?.filter(r => r !== 'super-admin').map((role) => (
                                    <Checkbox
                                        key={role}
                                        label={role}
                                        checked={data.roles.includes(role)}
                                        onChange={() => toggleRole(role)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button type="submit" loading={processing}>
                                Create Permission
                            </Button>
                            <Link href="/admin/permissions">
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
