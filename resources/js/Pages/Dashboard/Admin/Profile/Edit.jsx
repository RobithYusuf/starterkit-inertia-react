import { Head, useForm, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import TextInput from '@/Components/UI/Form/TextInput';
import PasswordInput from '@/Components/UI/Form/PasswordInput';

export default function ProfileEdit({ user }) {
    const { auth } = usePage().props;
    const currentUser = user || auth?.user;

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
        <DashboardLayout title="Profile">
            <Head title="Profile" />

            <div className="max-w-2xl space-y-6">
                {/* Profile Information */}
                <Card>
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                        <p className="text-sm text-gray-500">Update your account information</p>
                    </div>
                    <form onSubmit={handleProfileSubmit} className="p-6 space-y-6">
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
                <Card>
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
                        <p className="text-sm text-gray-500">Ensure your account uses a secure password</p>
                    </div>
                    <form onSubmit={handlePasswordSubmit} className="p-6 space-y-6">
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
