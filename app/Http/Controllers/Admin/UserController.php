<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with('roles');
        
        // Search
        if ($search = $request->get('search')) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }
        
        // Filter by role
        if ($role = $request->get('role')) {
            $query->whereHas('roles', function($q) use ($role) {
                $q->where('name', $role);
            });
        }
        
        // Filter by status
        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }
        
        // Sorting
        $sortField = $request->get('sort_field', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        // Validate sort field to prevent SQL injection
        $allowedSortFields = ['name', 'email', 'is_active', 'created_at'];
        if (!in_array($sortField, $allowedSortFields)) {
            $sortField = 'created_at';
        }
        
        $perPage = $request->get('per_page', 10);
        
        $users = $query->orderBy($sortField, $sortOrder)
            ->paginate($perPage)
            ->withQueryString();
        
        // Format data for display
        $users->through(function ($user) {
            $user->created_at_formatted = $user->created_at ? $user->created_at->format('d M Y') : '-';
            $user->role = $user->roles->first()?->name ?? 'member';
            $user->roles_list = $user->getRoleNames()->toArray();
            return $user;
        });
        
        // Get available roles for filter
        $roles = Role::pluck('name')->toArray();
        
        return Inertia::render('Dashboard/Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role', 'is_active', 'per_page', 'sort_field', 'sort_order']),
            'availableRoles' => $roles,
        ]);
    }
    
    public function create()
    {
        $roles = Role::pluck('name')->toArray();
        
        return Inertia::render('Dashboard/Admin/Users/Create', [
            'availableRoles' => $roles,
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|exists:roles,name',
            'is_active' => 'boolean',
        ]);
        
        $role = $validated['role'];
        unset($validated['role']);
        
        $validated['password'] = Hash::make($validated['password']);
        $validated['is_active'] = $validated['is_active'] ?? true;
        
        $user = User::create($validated);
        $user->assignRole($role);
        
        return redirect()->route('admin.users.index')
            ->with('success', 'User created successfully.');
    }
    
    public function edit(User $user)
    {
        $roles = Role::pluck('name')->toArray();
        
        return Inertia::render('Dashboard/Admin/Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->roles->first()?->name ?? 'member',
                'is_active' => $user->is_active,
            ],
            'availableRoles' => $roles,
        ]);
    }
    
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|string|exists:roles,name',
            'is_active' => 'boolean',
        ]);
        
        $role = $validated['role'];
        unset($validated['role']);
        
        if (empty($validated['password'])) {
            unset($validated['password']);
        } else {
            $validated['password'] = Hash::make($validated['password']);
        }
        
        $user->update($validated);
        $user->syncRoles([$role]);
        
        return redirect()->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }
    
    public function destroy(User $user)
    {
        // Prevent deleting yourself
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }
        
        // Prevent deleting super-admin
        if ($user->hasRole('super-admin')) {
            return back()->with('error', 'Cannot delete super-admin user.');
        }
        
        $user->delete();
        
        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }
}
