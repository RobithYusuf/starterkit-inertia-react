<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $query = Role::with('permissions');
        
        // Search
        if ($search = $request->get('search')) {
            $query->where('name', 'like', "%{$search}%");
        }
        
        $perPage = $request->get('per_page', 10);
        
        $roles = $query->orderBy('name')
            ->paginate($perPage)
            ->withQueryString();
        
        // Format data for display
        $roles->through(function ($role) {
            $role->permissions_count = $role->permissions->count();
            $role->permissions_list = $role->permissions->pluck('name')->toArray();
            $role->users_count = $role->users()->count();
            $role->created_at_formatted = $role->created_at?->format('d M Y') ?? '-';
            return $role;
        });
        
        return Inertia::render('Dashboard/Admin/Roles/Index', [
            'roles' => $roles,
            'filters' => $request->only(['search', 'per_page']),
        ]);
    }
    
    public function create()
    {
        $permissions = Permission::orderBy('name')->get()->groupBy(function ($permission) {
            return explode('.', $permission->name)[0];
        });
        
        return Inertia::render('Dashboard/Admin/Roles/Create', [
            'permissionGroups' => $permissions,
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);
        
        $role = Role::create(['name' => $validated['name']]);
        
        if (!empty($validated['permissions'])) {
            $role->syncPermissions($validated['permissions']);
        }
        
        return redirect()->route('admin.roles.index')
            ->with('success', 'Role created successfully.');
    }
    
    public function edit(Role $role)
    {
        $permissions = Permission::orderBy('name')->get()->groupBy(function ($permission) {
            return explode('.', $permission->name)[0];
        });
        
        return Inertia::render('Dashboard/Admin/Roles/Edit', [
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('name')->toArray(),
            ],
            'permissionGroups' => $permissions,
        ]);
    }
    
    public function update(Request $request, Role $role)
    {
        // Prevent editing super-admin role name
        if ($role->name === 'super-admin' && $request->name !== 'super-admin') {
            return back()->with('error', 'Cannot rename super-admin role.');
        }
        
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'permissions' => 'array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);
        
        $role->update(['name' => $validated['name']]);
        $role->syncPermissions($validated['permissions'] ?? []);
        
        return redirect()->route('admin.roles.index')
            ->with('success', 'Role updated successfully.');
    }
    
    public function destroy(Role $role)
    {
        // Prevent deleting protected roles
        if (in_array($role->name, ['super-admin', 'admin', 'member'])) {
            return back()->with('error', 'Cannot delete default roles.');
        }
        
        // Check if role has users
        if ($role->users()->count() > 0) {
            return back()->with('error', 'Cannot delete role with assigned users.');
        }
        
        $role->delete();
        
        return redirect()->route('admin.roles.index')
            ->with('success', 'Role deleted successfully.');
    }
}
