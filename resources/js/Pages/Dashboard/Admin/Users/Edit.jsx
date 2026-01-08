import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import PageHeader from '@/Components/Dashboard/PageHeader';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import TextInput from '@/Components/UI/Form/TextInput';
import PasswordInput from '@/Components/UI/Form/PasswordInput';
import RadioOption from '@/Components/UI/Form/RadioOption';

export default function UsersEdit({ user, availableRoles }) {
    const [showPasswordError, setShowPasswordError] = useState(false);

    const breadcrumbs = [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Users', href: '/admin/users' },
        { label: 'Edit' },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
        role: user.role || 'member',
        is_active: user.is_active ?? true,
    });

    const checkPasswordMatch = () => {
        if (data.password && data.password.length > 0) {
            return data.password !== data.password_confirmation ? 'Passwords do not match' : '';
        }
        return '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (data.password) {
            setShowPasswordError(true);
            const passwordMatchError = checkPasswordMatch();

            if (passwordMatchError) {
                return;
            }
        }

        put(`/admin/users/${user.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <DashboardLayout>
            <Head title="Edit User" />

            <PageHeader 
                title="Edit User"
                description="Update user information"
                breadcrumbs={breadcrumbs}
            >
                <Link href="/admin/users">
                    <Button variant="secondary">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Back
                    </Button>
                </Link>
            </PageHeader>

            <Card>
                <div className="p-5">
                    <form onSubmit={handleSubmit} className="space-y-4 w-full p-0 lg:p-2">
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-800">User Information</h3>
                            <p className="text-sm text-gray-500 mt-1 mb-2">Update the user details below</p>
                        </div>

                        {/* Role Selection */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <RadioOption
                                    id="role-admin"
                                    name="role"
                                    value="admin"
                                    checked={data.role === 'admin'}
                                    onChange={(val) => setData('role', val)}
                                    title="Administrator"
                                    description="Full system access"
                                />
                                <RadioOption
                                    id="role-member"
                                    name="role"
                                    value="member"
                                    checked={data.role === 'member'}
                                    onChange={(val) => setData('role', val)}
                                    title="Member"
                                    description="Limited access"
                                />
                            </div>
                            {errors.role && (
                                <p className="mt-2 text-sm text-red-600">{errors.role}</p>
                            )}
                        </div>

                        {/* Name and Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <TextInput
                                label="Full Name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                                placeholder="Enter full name"
                                icon={
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                }
                                required
                            />
                            <TextInput
                                label="Email Address"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={errors.email}
                                placeholder="name@example.com"
                                icon={
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                }
                                required
                            />
                        </div>

                        {/* Password Section (Optional) */}
                        <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
                            <p className="text-sm text-yellow-800 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                Leave password fields empty to keep the current password
                            </p>
                        </div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <PasswordInput
                                label="New Password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                error={errors.password}
                                placeholder="Leave empty to keep current"
                            />
                            <PasswordInput
                                label="Confirm New Password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                error={errors.password_confirmation || (showPasswordError ? checkPasswordMatch() : '')}
                                placeholder="Leave empty to keep current"
                            />
                        </div>

                        {/* Status Selection */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account Status
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <RadioOption
                                    id="status-active"
                                    name="is_active"
                                    value={true}
                                    checked={data.is_active === true}
                                    onChange={() => setData('is_active', true)}
                                    title="Active"
                                    description="User can access"
                                    variant="success"
                                />
                                <RadioOption
                                    id="status-inactive"
                                    name="is_active"
                                    value={false}
                                    checked={data.is_active === false}
                                    onChange={() => setData('is_active', false)}
                                    title="Inactive"
                                    description="Access disabled"
                                    variant="danger"
                                />
                            </div>
                            {errors.is_active && (
                                <p className="mt-2 text-sm text-red-600">{errors.is_active}</p>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className="pt-4 mt-2 border-t border-gray-200 flex justify-end gap-3">
                            <Link href="/admin/users">
                                <Button type="button" variant="secondary">
                                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" loading={processing}>
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                                {processing ? 'Updating...' : 'Update'}
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </DashboardLayout>
    );
}
