import { Head, useForm, Link, usePage } from '@inertiajs/react';
import AuthLayout from '@/Components/Layouts/AuthLayout';
import Button from '@/Components/UI/Button';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});
    const { auth } = usePage().props;

    const handleResend = (e) => {
        e.preventDefault();
        post('/email/verification-notification');
    };

    return (
        <AuthLayout>
            <Head title="Verify Email" />

            <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
                <p className="text-gray-600 mt-2">
                    Thanks for signing up! Before getting started, please verify your email address 
                    by clicking on the link we just emailed to you.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    A new verification link has been sent to your email address.
                </div>
            )}

            <div className="space-y-4">
                <form onSubmit={handleResend}>
                    <Button type="submit" className="w-full" loading={processing}>
                        Resend Verification Email
                    </Button>
                </form>

                <form action="/logout" method="POST" className="text-center">
                    <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.content} />
                    <button
                        type="submit"
                        className="text-sm text-gray-600 hover:text-gray-900 underline"
                    >
                        Log Out
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
}
