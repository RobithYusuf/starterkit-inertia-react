import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import PageHeader from '@/Components/Dashboard/PageHeader';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import ConfirmModal from '@/Components/UI/ConfirmModal';

export default function RolesIndex({ roles, filters }) {
    const [deleteModal, setDeleteModal] = useState({ open: false, role: null });

    const breadcrumbs = [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Roles' },
    ];

    const handleDelete = (role) => {
        setDeleteModal({ open: true, role });
    };

    const confirmDelete = () => {
        if (deleteModal.role) {
            router.delete(`/admin/roles/${deleteModal.role.id}`, {
                onSuccess: () => setDeleteModal({ open: false, role: null }),
            });
        }
    };

    return (
        <DashboardLayout>
            <Head title="Roles" />

            <PageHeader 
                title="Roles" 
                description="Manage user roles and their permissions"
                breadcrumbs={breadcrumbs}
            >
                <Link href="/admin/roles/create">
                    <Button>
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add Role
                    </Button>
                </Link>
            </PageHeader>

            <Card>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Role Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Permissions
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Users
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {roles?.data?.map((role) => (
                                <tr key={role.id} className="hover:bg-gray-50">
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                                            role.name === 'super-admin' 
                                                ? 'bg-purple-100 text-purple-800'
                                                : role.name === 'admin' 
                                                    ? 'bg-blue-100 text-blue-800' 
                                                    : 'bg-green-100 text-green-800'
                                        }`}>
                                            {role.name}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        <span className="font-medium text-gray-900">{role.permissions_count}</span> permissions
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        <span className="font-medium text-gray-900">{role.users_count}</span> users
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                href={`/admin/roles/${role.id}/edit`}
                                                className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                            </Link>
                                            {!['super-admin', 'admin', 'member'].includes(role.name) && (
                                                <button
                                                    onClick={() => handleDelete(role)}
                                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, role: null })}
                onConfirm={confirmDelete}
                title="Delete Role"
                message={`Are you sure you want to delete role "${deleteModal.role?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
            />
        </DashboardLayout>
    );
}
