import { Head, useForm, Link } from '@inertiajs/react';
import AuthLayout from '@/Components/Layouts/AuthLayout';
import TextInput from '@/Components/UI/Form/TextInput';
import PasswordInput from '@/Components/UI/Form/PasswordInput';
import Checkbox from '@/Components/UI/Form/Checkbox';
import Button from '@/Components/UI/Button';

export default function Login({ status, canResetPassword = true }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Login" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
                <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

            {status && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    {status}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <TextInput
                    label="Email Address"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    autoFocus
                />

                <PasswordInput
                    label="Password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                />

                <div className="flex items-center justify-between">
                    <Checkbox
                        label="Remember me"
                        checked={data.remember}
                        onChange={(checked) => setData('remember', checked)}
                    />

                    {canResetPassword && (
                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-primary-600 hover:text-primary-500"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                <Button type="submit" className="w-full" size="lg" loading={processing}>
                    Sign in
                </Button>

                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500">
                        Sign up
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
