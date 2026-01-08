import { Head, useForm, Link } from '@inertiajs/react';
import AuthLayout from '@/Components/Layouts/AuthLayout';
import Button from '@/Components/UI/Button';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const handleResend = (e) => {
        e.preventDefault();
        post('/email/verification-notification');
    };

    return (
        <AuthLayout>
            <Head title="Verify Email" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
                <p className="text-gray-600 mt-2">
                    Please verify your email address by clicking the link we sent you.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    A new verification link has been sent to your email.
                </div>
            )}

            <div className="space-y-4">
                <form onSubmit={handleResend}>
                    <Button type="submit" className="w-full" size="lg" loading={processing}>
                        Resend Verification Email
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    <Link 
                        href="/logout" 
                        method="post" 
                        as="button"
                        className="font-medium text-primary-600 hover:text-primary-500"
                    >
                        Log out
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
