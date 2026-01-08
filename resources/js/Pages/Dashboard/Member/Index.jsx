import { Head, usePage, Link } from '@inertiajs/react';
import DashboardLayout from '@/Components/Layouts/DashboardLayout';
import Card from '@/Components/UI/Card';
import StatCard, { StatCardGroup } from '@/Components/UI/StatCard';

export default function MemberDashboard() {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <DashboardLayout title="Dashboard">
            <Head title="Member Dashboard" />

            <div className="grid gap-6">
                {/* Welcome Card */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Welcome back, {user?.name}!
                    </h2>
                    <p className="text-gray-600">
                        This is your member dashboard. You can manage your profile and view your sessions from here.
                    </p>
                </Card>

                {/* Quick Stats */}
                <StatCardGroup columns={2}>
                    <StatCard 
                        title="Your Role"
                        value={user?.roles?.[0] || 'Member'}
                        color="primary"
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        }
                    />
                    <StatCard 
                        title="Email"
                        value={user?.email}
                        color="success"
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        }
                    />
                </StatCardGroup>

                {/* Quick Actions */}
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Link
                            href="/profile"
                            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
                        >
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            <span className="font-medium text-gray-700">Edit Profile</span>
                        </Link>
                        <Link
                            href="/sessions"
                            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
                        >
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                            </svg>
                            <span className="font-medium text-gray-700">Manage Sessions</span>
                        </Link>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
