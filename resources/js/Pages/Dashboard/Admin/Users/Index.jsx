import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import PageHeader from '@/Components/Dashboard/PageHeader';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import Select from '@/Components/UI/Form/Select';
import SearchInput from '@/Components/UI/Form/SearchInput';
import Pagination from '@/Components/UI/Pagination';
import Badge from '@/Components/UI/Badge';
import ConfirmModal from '@/Components/UI/ConfirmModal';
import { useDebounce } from '@/Hooks';

export default function UsersIndex({ users, filters, availableRoles }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [role, setRole] = useState(filters?.role || '');
    const [deleteModal, setDeleteModal] = useState({ open: false, user: null });
    const [status, setStatus] = useState(filters?.status || '');
    const [isFiltering, setIsFiltering] = useState(false);
    
    // Debounce search value (400ms delay)
    const debouncedSearch = useDebounce(search, 400);

    const breadcrumbs = [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Users' },
    ];

    // Role options for filter
    const roleOptions = [
        { value: '', label: 'All Roles' },
        ...(availableRoles || []).map(r => ({ value: r.name, label: r.name }))
    ];

    // Status options for filter
    const statusOptions = [
        { value: '', label: 'All Status' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
    ];

    // Apply filters function
    const applyFilters = useCallback((newFilters = {}) => {
        const params = {
            search: newFilters.search ?? debouncedSearch,
            role: newFilters.role ?? role,
            status: newFilters.status ?? status,
        };

        // Remove empty params
        Object.keys(params).forEach(key => {
            if (params[key] === '' || params[key] === null || params[key] === undefined) {
                delete params[key];
            }
        });

        setIsFiltering(true);
        router.get('/admin/users', params, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsFiltering(false),
        });
    }, [debouncedSearch, role, status]);

    // Auto-search when debounced search changes
    useEffect(() => {
        // Skip initial render
        if (debouncedSearch === (filters?.search || '')) return;
        applyFilters({ search: debouncedSearch });
    }, [debouncedSearch]);

    // Handle role filter change
    const handleRoleChange = (newRole) => {
        setRole(newRole);
        applyFilters({ role: newRole });
    };

    // Handle status filter change
    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        applyFilters({ status: newStatus });
    };

    // Clear all filters
    const handleClearFilters = () => {
        setSearch('');
        setRole('');
        setStatus('');
        setIsFiltering(true);
        router.get('/admin/users', {}, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsFiltering(false),
        });
    };

    // Check if any filter is active
    const hasActiveFilters = search || role || status;

    // Count active filters
    const activeFilterCount = [search, role, status].filter(Boolean).length;

    const handleDelete = (user) => {
        setDeleteModal({ open: true, user });
    };

    const confirmDelete = () => {
        if (deleteModal.user) {
            router.delete(`/admin/users/${deleteModal.user.id}`, {
                onSuccess: () => setDeleteModal({ open: false, user: null }),
            });
        }
    };

    return (
        <DashboardLayout>
            <Head title="Users" />

            <PageHeader 
                title="Users" 
                description="Manage user accounts"
                breadcrumbs={breadcrumbs}
            >
                <Link href="/admin/users/create">
                    <Button>
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add User
                    </Button>
                </Link>
            </PageHeader>

            <Card>
                {/* Filters */}
                <div className="border-b border-gray-200 p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        {/* Search Input */}
                        <SearchInput
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onClear={() => setSearch('')}
                            placeholder="Search by name or email..."
                            loading={isFiltering}
                            className="flex-1"
                        />

                        {/* Role Filter */}
                        <Select
                            value={role}
                            onChange={handleRoleChange}
                            options={roleOptions}
                            placeholder="All Roles"
                            className="w-full sm:w-44"
                        />

                        {/* Status Filter */}
                        <Select
                            value={status}
                            onChange={handleStatusChange}
                            options={statusOptions}
                            placeholder="All Status"
                            className="w-full sm:w-40"
                        />

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="md"
                                onClick={handleClearFilters}
                                className="whitespace-nowrap"
                            >
                                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Clear ({activeFilterCount})
                            </Button>
                        )}
                    </div>

                    {/* Active Filters Display */}
                    {hasActiveFilters && (
                        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                            <span className="text-sm text-gray-500">Active filters:</span>
                            {search && (
                                <Badge variant="secondary" size="sm" removable onRemove={() => setSearch('')}>
                                    Search: "{search}"
                                </Badge>
                            )}
                            {role && (
                                <Badge variant="secondary" size="sm" removable onRemove={() => handleRoleChange('')}>
                                    Role: {role}
                                </Badge>
                            )}
                            {status && (
                                <Badge variant="secondary" size="sm" removable onRemove={() => handleStatusChange('')}>
                                    Status: {status}
                                </Badge>
                            )}
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="px-4 sm:px-6 py-3 bg-gray-50 border-b border-gray-200">
                    <p className="text-sm text-gray-600">
                        Showing <span className="font-medium">{users?.from || 0}</span> to{' '}
                        <span className="font-medium">{users?.to || 0}</span> of{' '}
                        <span className="font-medium">{users?.total || 0}</span> users
                    </p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Joined
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {users?.data?.length > 0 ? (
                                users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary-100 flex items-center justify-center">
                                                    <span className="text-sm font-medium text-primary-700">
                                                        {user.name?.charAt(0)?.toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                user.role === 'super-admin' 
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : user.role === 'admin' 
                                                        ? 'bg-blue-100 text-blue-800' 
                                                        : 'bg-green-100 text-green-800'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                user.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.is_active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                {user.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {user.created_at_formatted}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link
                                                    href={`/admin/users/${user.id}/edit`}
                                                    className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(user)}
                                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                        </svg>
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {hasActiveFilters 
                                                ? 'Try adjusting your search or filter criteria.'
                                                : 'Get started by creating a new user.'}
                                        </p>
                                        {hasActiveFilters && (
                                            <Button variant="ghost" size="sm" onClick={handleClearFilters} className="mt-3">
                                                Clear filters
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <Pagination 
                    links={users?.links}
                    from={users?.from}
                    to={users?.to}
                    total={users?.total}
                />
            </Card>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, user: null })}
                onConfirm={confirmDelete}
                title="Delete User"
                message={`Are you sure you want to delete "${deleteModal.user?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
            />
        </DashboardLayout>
    );
}
