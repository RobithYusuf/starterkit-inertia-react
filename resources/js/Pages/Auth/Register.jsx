import { Head, useForm, Link } from '@inertiajs/react';
import AuthLayout from '@/Components/Layouts/AuthLayout';
import TextInput from '@/Components/UI/Form/TextInput';
import PasswordInput from '@/Components/UI/Form/PasswordInput';
import Button from '@/Components/UI/Button';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Register" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
                <p className="text-gray-600 mt-2">Start your journey with us today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <TextInput
                    label="Full Name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                    placeholder="John Doe"
                    required
                    autoComplete="name"
                    autoFocus
                />

                <TextInput
                    label="Email Address"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                />

                <PasswordInput
                    label="Password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    placeholder="Create a password"
                    required
                    autoComplete="new-password"
                />

                <PasswordInput
                    label="Confirm Password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    error={errors.password_confirmation}
                    placeholder="Confirm your password"
                    required
                    autoComplete="new-password"
                />

                <Button type="submit" className="w-full" size="lg" loading={processing}>
                    Create account
                </Button>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
