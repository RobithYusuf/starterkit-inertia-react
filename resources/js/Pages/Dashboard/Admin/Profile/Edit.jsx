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
        profileForm.put('/admin/profile');
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        passwordForm.put('/admin/profile/password', {
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <DashboardLayout>
            <Head title="Profile" />

            <PageHeader 
                title="Profile" 
                description="Update your account information"
                breadcrumbs={breadcrumbs}
            />

            <div className="max-w-2xl space-y-6">
                {/* Profile Information */}
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Profile Information</h3>
                    <p className="text-sm text-gray-500 mb-4">Update your name and email address</p>
                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                        <TextInput
                            label="Name"
                            value={profileForm.data.name}
                            onChange={(e) => profileForm.setData('name', e.target.value)}
                            error={profileForm.errors.name}
                            required
                        />
                        <TextInput
                            label="Email"
                            type="email"
                            value={profileForm.data.email}
                            onChange={(e) => profileForm.setData('email', e.target.value)}
                            error={profileForm.errors.email}
                            required
                        />
                        <Button type="submit" loading={profileForm.processing}>
                            Save Changes
                        </Button>
                    </form>
                </Card>

                {/* Change Password */}
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Change Password</h3>
                    <p className="text-sm text-gray-500 mb-4">Ensure your account uses a secure password</p>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <PasswordInput
                            label="Current Password"
                            value={passwordForm.data.current_password}
                            onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                            error={passwordForm.errors.current_password}
                            required
                        />
                        <PasswordInput
                            label="New Password"
                            value={passwordForm.data.password}
                            onChange={(e) => passwordForm.setData('password', e.target.value)}
                            error={passwordForm.errors.password}
                            required
                        />
                        <PasswordInput
                            label="Confirm New Password"
                            value={passwordForm.data.password_confirmation}
                            onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                            error={passwordForm.errors.password_confirmation}
                            required
                        />
                        <Button type="submit" loading={passwordForm.processing}>
                            Update Password
                        </Button>
                    </form>
                </Card>
            </div>
        </DashboardLayout>
    );
}
