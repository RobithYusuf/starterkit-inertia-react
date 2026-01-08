import { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import PageHeader from '@/Components/Dashboard/PageHeader';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import TextInput from '@/Components/UI/Form/TextInput';
import PasswordInput from '@/Components/UI/Form/PasswordInput';

export default function ProfileEdit({ user }) {
    const { auth } = usePage().props;
    const currentUser = user || auth?.user;

    const [showPasswordFields, setShowPasswordFields] = useState(false);

    const breadcrumbs = [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Profile' },
    ];

    const profileForm = useForm({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        profileForm.put('/admin/profile', {
            preserveScroll: true,
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        passwordForm.put('/admin/profile/password', {
            onSuccess: () => {
                passwordForm.reset();
                setShowPasswordFields(false);
            },
            preserveScroll: true,
        });
    };

    const togglePasswordFields = () => {
        setShowPasswordFields(!showPasswordFields);
        if (showPasswordFields) {
            passwordForm.reset();
        }
    };

    // Format member since date
    const memberSince = currentUser?.created_at 
        ? new Date(currentUser.created_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
        : 'N/A';

    // Get role display
    const getRoleBadge = () => {
        const roles = currentUser?.roles || [];
        const roleName = roles[0]?.name || currentUser?.role || 'member';
        const isAdmin = roleName === 'admin' || roleName === 'super-admin';
        
        return {
            label: isAdmin ? 'Administrator' : 'Member',
            className: isAdmin 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-green-100 text-green-800'
        };
    };

    const roleBadge = getRoleBadge();

    return (
        <DashboardLayout>
            <Head title="Profile" />

            <PageHeader 
                title="Profile Settings" 
                description="Manage your account information and security"
                breadcrumbs={breadcrumbs}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card - Sidebar */}
                <div className="lg:col-span-1">
                    <Card className="p-6">
                        <div className="text-center">
                            {/* Avatar */}
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-100 rounded-full mb-4">
                                <svg className="w-12 h-12 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                            
                            {/* Name & Email */}
                            <h3 className="text-lg font-semibold text-gray-900">{currentUser?.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{currentUser?.email}</p>
                            
                            {/* Role Badge */}
                            <div className="mt-3">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${roleBadge.className}`}>
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    {roleBadge.label}
                                </span>
                            </div>
                            
                            {/* Member Since */}
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-xs text-gray-500">Member since</p>
                                <p className="text-sm font-medium text-gray-900 mt-1">{memberSince}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Forms */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Information */}
                    <Card>
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                            <p className="text-sm text-gray-500 mt-1">Update your account profile information and email address</p>
                        </div>
                        <form onSubmit={handleProfileSubmit} className="p-6 space-y-4">
                            <TextInput
                                label="Full Name"
                                value={profileForm.data.name}
                                onChange={(e) => profileForm.setData('name', e.target.value)}
                                error={profileForm.errors.name}
                                placeholder="Enter your full name"
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
                                value={profileForm.data.email}
                                onChange={(e) => profileForm.setData('email', e.target.value)}
                                error={profileForm.errors.email}
                                placeholder="your@email.com"
                                icon={
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                }
                                required
                            />
                            <div className="flex justify-end">
                                <Button type="submit" loading={profileForm.processing}>
                                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                    </svg>
                                    {profileForm.processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    </Card>

                    {/* Password Section */}
                    <Card>
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Password</h3>
                                <p className="text-sm text-gray-500 mt-1">Ensure your account is using a strong password</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={togglePasswordFields}
                            >
                                {showPasswordFields ? (
                                    <>
                                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Cancel
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                        Change
                                    </>
                                )}
                            </Button>
                        </div>
                        
                        {showPasswordFields ? (
                            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
                                <PasswordInput
                                    label="Current Password"
                                    value={passwordForm.data.current_password}
                                    onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                    error={passwordForm.errors.current_password}
                                    placeholder="Enter current password"
                                    required
                                />
                                <PasswordInput
                                    label="New Password"
                                    value={passwordForm.data.password}
                                    onChange={(e) => passwordForm.setData('password', e.target.value)}
                                    error={passwordForm.errors.password}
                                    placeholder="Enter new password"
                                    required
                                />
                                <PasswordInput
                                    label="Confirm New Password"
                                    value={passwordForm.data.password_confirmation}
                                    onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                    error={passwordForm.errors.password_confirmation}
                                    placeholder="Confirm new password"
                                    required
                                />
                                <div className="flex justify-end">
                                    <Button type="submit" loading={passwordForm.processing}>
                                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                        </svg>
                                        {passwordForm.processing ? 'Updating...' : 'Update Password'}
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <div className="p-6">
                                <p className="text-sm text-gray-500 flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>
                                    Click the "Change" button to update your password
                                </p>
                            </div>
                        )}
                    </Card>

                    {/* Security Tips */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h4 className="text-sm font-medium text-blue-900">Security Tips</h4>
                                <div className="mt-2 text-sm text-blue-700">
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Use a strong password with at least 8 characters</li>
                                        <li>Include numbers, symbols, and mixed case letters</li>
                                        <li>Don't reuse passwords from other websites</li>
                                        <li>Enable two-factor authentication when available</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
