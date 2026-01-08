import { Head, useForm, Link } from '@inertiajs/react';
import AuthLayout from '@/Components/Layouts/AuthLayout';
import TextInput from '@/Components/UI/Form/TextInput';
import PasswordInput from '@/Components/UI/Form/PasswordInput';
import Button from '@/Components/UI/Button';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email || '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/reset-password');
    };

    return (
        <AuthLayout>
            <Head title="Reset Password" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
                <p className="text-gray-600 mt-2">
                    Enter your new password below.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <TextInput
                    label="Email Address"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    placeholder="you@example.com"
                    required
                />

                <PasswordInput
                    label="New Password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    placeholder="Enter new password"
                    required
                />

                <PasswordInput
                    label="Confirm Password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    error={errors.password_confirmation}
                    placeholder="Confirm new password"
                    required
                />

                <Button type="submit" className="w-full" size="lg" loading={processing}>
                    Reset Password
                </Button>

                <p className="text-center text-sm text-gray-600">
                    <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                        Back to sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
