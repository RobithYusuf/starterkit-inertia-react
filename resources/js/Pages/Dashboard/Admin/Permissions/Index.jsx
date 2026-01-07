import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import PageHeader from '@/Components/Dashboard/PageHeader';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import { useAlert } from '@/Contexts/AlertContext';

export default function PermissionsIndex({ roles, permissionGroups }) {
    const { addAlert } = useAlert();
    const [loading, setLoading] = useState({});
    const [expandedGroups, setExpandedGroups] = useState(
        permissionGroups?.reduce((acc, group) => ({ ...acc, [group.name]: true }), {}) || {}
    );

    const breadcrumbs = [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Permissions' },
    ];

    const toggleGroup = (groupName) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupName]: !prev[groupName]
        }));
    };

    const expandAll = () => {
        setExpandedGroups(
            permissionGroups?.reduce((acc, group) => ({ ...acc, [group.name]: true }), {}) || {}
        );
    };

    const collapseAll = () => {
        setExpandedGroups(
            permissionGroups?.reduce((acc, group) => ({ ...acc, [group.name]: false }), {}) || {}
        );
    };

    const handleToggle = async (permissionId, roleId, roleName, currentState) => {
        const key = `${permissionId}-${roleId}`;
        setLoading(prev => ({ ...prev, [key]: true }));

        try {
            const response = await fetch('/admin/permissions/toggle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    permission_id: permissionId,
                    role_id: roleId,
                    enabled: !currentState,
                }),
            });

            const data = await response.json();

            if (data.success) {
                addAlert(data.message, 'success');
                router.reload({ only: ['permissionGroups'] });
            } else {
                addAlert(data.message || 'Failed to update permission', 'error');
            }
        } catch (error) {
            addAlert('Failed to update permission', 'error');
        } finally {
            setLoading(prev => ({ ...prev, [key]: false }));
        }
    };

    // Calculate stats
    const totalPermissions = permissionGroups?.reduce((acc, group) => acc + group.permissions.length, 0) || 0;
    const totalRoles = roles?.length || 0;

    return (
        <DashboardLayout>
            <Head title="Permissions" />

            <PageHeader 
                title="Permission Matrix" 
                description="Manage permissions for all roles in one place"
                breadcrumbs={breadcrumbs}
            >
                <Link href="/admin/permissions/create">
                    <Button>
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add Permission
                    </Button>
                </Link>
            </PageHeader>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <Card className="p-4">
                    <div className="text-2xl font-bold text-gray-900">{totalPermissions}</div>
                    <div className="text-sm text-gray-500">Total Permissions</div>
                </Card>
                <Card className="p-4">
                    <div className="text-2xl font-bold text-gray-900">{totalRoles}</div>
                    <div className="text-sm text-gray-500">Total Roles</div>
                </Card>
                <Card className="p-4">
                    <div className="text-2xl font-bold text-gray-900">{permissionGroups?.length || 0}</div>
                    <div className="text-sm text-gray-500">Permission Groups</div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        <span className="text-sm text-gray-600">Granted</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
                        <span className="text-sm text-gray-600">Not Granted</span>
                    </div>
                </Card>
            </div>

            {/* Controls */}
            <div className="flex gap-2 mb-4">
                <Button variant="secondary" size="sm" onClick={expandAll}>
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                    Expand All
                </Button>
                <Button variant="secondary" size="sm" onClick={collapseAll}>
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                    </svg>
                    Collapse All
                </Button>
            </div>

            {/* Permission Groups */}
            <div className="space-y-4">
                {permissionGroups?.map((group) => (
                    <Card key={group.name} className="overflow-hidden">
                        <button
                            onClick={() => toggleGroup(group.name)}
                            className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${getGroupColor(group.name)}`}></div>
                                <span className="font-semibold text-gray-900 capitalize">{group.label}</span>
                                <span className="text-sm text-gray-500">({group.permissions.length} permissions)</span>
                            </div>
                            <svg
                                className={`h-5 w-5 text-gray-500 transform transition-transform ${
                                    expandedGroups[group.name] ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {expandedGroups[group.name] && (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Permission
                                            </th>
                                            {roles?.map((role) => (
                                                <th key={role.id} className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    {role.name}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {group.permissions.map((permission) => (
                                            <tr key={permission.id} className="hover:bg-gray-50">
                                                <td className="px-5 py-3 text-sm text-gray-700">
                                                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{permission.name}</code>
                                                </td>
                                                {roles?.map((role) => {
                                                    const isEnabled = permission.roles[role.name];
                                                    const isLoading = loading[`${permission.id}-${role.id}`];
                                                    const isSuperAdmin = role.is_super_admin;

                                                    return (
                                                        <td key={role.id} className="px-4 py-3 text-center">
                                                            {isSuperAdmin ? (
                                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                                                                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                </span>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleToggle(permission.id, role.id, role.name, isEnabled)}
                                                                    disabled={isLoading}
                                                                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                                                                        isLoading ? 'opacity-50 cursor-wait' : 'hover:scale-110'
                                                                    } ${isEnabled ? 'bg-green-100' : 'bg-gray-100 hover:bg-gray-200'}`}
                                                                >
                                                                    {isEnabled ? (
                                                                        <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                        </svg>
                                                                    ) : (
                                                                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                        </svg>
                                                                    )}
                                                                </button>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </DashboardLayout>
    );
}

function getGroupColor(group) {
    const colors = {
        user: 'bg-blue-500',
        role: 'bg-purple-500',
        settings: 'bg-gray-500',
        dashboard: 'bg-green-500',
        components: 'bg-orange-500',
        profile: 'bg-cyan-500',
        sessions: 'bg-red-500',
    };
    return colors[group] || 'bg-primary-500';
}
