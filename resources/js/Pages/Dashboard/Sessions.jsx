import { Head, useForm, usePage, router } from '@inertiajs/react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import PageHeader from '@/Components/Dashboard/PageHeader';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import PasswordInput from '@/Components/UI/Form/PasswordInput';

export default function Sessions({ sessions }) {
    const { auth } = usePage().props;
    const isAdmin = auth?.user?.roles?.some(role => ['super-admin', 'admin'].includes(role));

    const breadcrumbs = [
        { label: 'Dashboard', href: isAdmin ? '/admin/dashboard' : '/dashboard' },
        { label: 'Sessions' },
    ];

    const { data, setData, delete: destroy, processing, errors, reset } = useForm({
        password: '',
    });

    const handleRevokeSession = (sessionId) => {
        destroy(isAdmin ? `/admin/sessions/${sessionId}` : `/sessions/${sessionId}`, {
            data: { password: data.password },
            onSuccess: () => reset(),
        });
    };

    const handleRevokeOthers = () => {
        router.delete('/sessions', {
            data: { password: data.password },
            onSuccess: () => reset(),
        });
    };

    return (
        <DashboardLayout>
            <Head title="Sessions" />

            <PageHeader 
                title="Browser Sessions" 
                description="Manage and log out your active sessions on other browsers and devices"
                breadcrumbs={breadcrumbs}
            />

            <div className="max-w-4xl space-y-6">
                <Card className="p-6">
                    <div className="space-y-4">
                        {sessions?.map((session) => (
                            <div
                                key={session.id}
                                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    {session.device?.is_desktop ? (
                                        <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
                                            <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
                                            <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                            </svg>
                                        </div>
                                    )}
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {session.device?.platform} - {session.device?.browser}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {session.ip_address} - Last active {session.last_active}
                                        </div>
                                    </div>
                                </div>

                                {session.is_current_device ? (
                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                        This device
                                    </span>
                                ) : (
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleRevokeSession(session.id)}
                                        loading={processing}
                                    >
                                        Log Out
                                    </Button>
                                )}
                            </div>
                        ))}

                        {(!sessions || sessions.length === 0) && (
                            <p className="text-center text-gray-500 py-4">
                                No active sessions found.
                            </p>
                        )}
                    </div>
                </Card>

                {sessions?.length > 1 && (
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Log Out Other Sessions</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Enter your password to log out all other browser sessions.
                        </p>
                        <div className="space-y-4">
                            <PasswordInput
                                label="Password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                error={errors.password}
                                required
                            />
                            <Button
                                onClick={handleRevokeOthers}
                                loading={processing}
                                disabled={!data.password}
                            >
                                Log Out Other Sessions
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    );
}
