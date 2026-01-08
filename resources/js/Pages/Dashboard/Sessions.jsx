import { Head, useForm, usePage, router } from '@inertiajs/react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import PageHeader from '@/Components/Dashboard/PageHeader';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import PasswordInput from '@/Components/UI/Form/PasswordInput';
import { useState } from 'react';

export default function Sessions({ sessions }) {
    const { auth } = usePage().props;
    const isAdmin = auth?.user?.roles?.some(role => ['super-admin', 'admin'].includes(role));
    const [revokingSession, setRevokingSession] = useState(null);

    const breadcrumbs = [
        { label: 'Dashboard', href: isAdmin ? '/admin/dashboard' : '/dashboard' },
        { label: 'Sessions' },
    ];

    const { data, setData, delete: destroy, processing, errors, reset } = useForm({
        password: '',
    });

    // Base URL based on user role
    const baseUrl = isAdmin ? '/admin' : '';

    // Logout single session - no password required
    const handleRevokeSession = (sessionId) => {
        setRevokingSession(sessionId);
        router.delete(`${baseUrl}/sessions/${sessionId}`, {
            preserveScroll: true,
            onFinish: () => setRevokingSession(null),
        });
    };

    // Logout all other sessions - password required
    const handleRevokeOthers = () => {
        destroy(`${baseUrl}/sessions`, {
            preserveScroll: true,
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

            <div className="space-y-6">
                {/* Active Sessions Card */}
                <Card>
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Active Sessions</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            If necessary, you may log out of all of your other browser sessions across all of your devices.
                        </p>
                    </div>
                    
                    <div className="p-6">
                        <div className="space-y-4">
                            {sessions?.map((session) => (
                                <div
                                    key={session.id}
                                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        {session.device?.is_desktop ? (
                                            <div className="flex-shrink-0 p-3 bg-gray-100 rounded-lg">
                                                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                                                </svg>
                                            </div>
                                        ) : session.device?.is_tablet ? (
                                            <div className="flex-shrink-0 p-3 bg-gray-100 rounded-lg">
                                                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 4.5v15a2.25 2.25 0 002.25 2.25z" />
                                                </svg>
                                            </div>
                                        ) : (
                                            <div className="flex-shrink-0 p-3 bg-gray-100 rounded-lg">
                                                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                                </svg>
                                            </div>
                                        )}
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {session.device?.platform || 'Unknown'} - {session.device?.browser || 'Unknown'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {session.ip_address}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-0.5">
                                                {session.is_current_device ? (
                                                    <span className="text-green-600 font-medium">This device</span>
                                                ) : (
                                                    <>Last active {session.last_active}</>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {session.is_current_device ? (
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                Current
                                            </span>
                                        ) : (
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleRevokeSession(session.id)}
                                                loading={revokingSession === session.id}
                                                disabled={revokingSession !== null}
                                            >
                                                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                                </svg>
                                                Log Out
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {(!sessions || sessions.length === 0) && (
                                <div className="text-center py-12">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No sessions found</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Session management requires database driver for sessions.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Log Out Other Sessions Card */}
                {sessions && sessions.filter(s => !s.is_current_device).length > 0 && (
                    <Card>
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Log Out Other Sessions</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Please enter your password to confirm you would like to log out of your other browser sessions.
                            </p>
                        </div>
                        
                        <div className="p-6">
                            <div className="max-w-md space-y-4">
                                <PasswordInput
                                    label="Your Password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    error={errors.password}
                                    placeholder="Enter your password"
                                    required
                                />
                                <Button
                                    onClick={handleRevokeOthers}
                                    loading={processing}
                                    disabled={!data.password || processing || revokingSession !== null}
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                    </svg>
                                    Log Out Other Browser Sessions
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Info Card */}
                <Card className="bg-blue-50 border-blue-200">
                    <div className="p-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800">
                                    About Session Management
                                </h3>
                                <div className="mt-2 text-sm text-blue-700">
                                    <p>
                                        If you feel your account has been compromised, you should also update your password in the profile settings.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
