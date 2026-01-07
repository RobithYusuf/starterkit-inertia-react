import { Head, useForm, Link } from '@inertiajs/react';
import AuthLayout from '@/Components/Layouts/AuthLayout';
import TextInput from '@/Components/UI/Form/TextInput';
import Button from '@/Components/UI/Button';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <AuthLayout>
            <Head title="Forgot Password" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
                <p className="text-gray-600 mt-2">
                    Enter your email address and we'll send you a password reset link.
                </p>
            </div>

            {status && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    {status}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <TextInput
                    label="Email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    required
                    autoFocus
                />

                <Button type="submit" className="w-full" loading={processing}>
                    Send Reset Link
                </Button>

                <p className="text-center text-sm text-gray-600">
                    Remember your password?{' '}
                    <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
