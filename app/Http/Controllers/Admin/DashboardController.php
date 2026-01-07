<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_users' => User::count(),
            'total_admins' => User::role(['super-admin', 'admin'])->count(),
            'total_members' => User::role('member')->count(),
            'active_users' => User::where('is_active', true)->count(),
        ];
        
        $recent_users = User::with('roles')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->roles->first()?->name ?? 'member',
                    'is_active' => $user->is_active,
                    'created_at' => $user->created_at->format('M d, Y'),
                ];
            });
        
        return Inertia::render('Dashboard/Admin/Index', [
            'stats' => $stats,
            'recentUsers' => $recent_users,
        ]);
    }
}
