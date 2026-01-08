import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/Components/Layouts/AuthLayout';
import PasswordInput from '@/Components/UI/Form/PasswordInput';
import Button from '@/Components/UI/Button';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors } = useForm({
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/user/confirm-password');
    };

    return (
        <AuthLayout>
            <Head title="Confirm Password" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Confirm Password</h2>
                <p className="text-gray-600 mt-2">
                    Please confirm your password before continuing.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <PasswordInput
                    label="Password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    placeholder="Enter your password"
                    required
                    autoFocus
                />

                <Button type="submit" className="w-full" size="lg" loading={processing}>
                    Confirm
                </Button>
            </form>
        </AuthLayout>
    );
}
