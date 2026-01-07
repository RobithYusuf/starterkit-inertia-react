<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    public function index(Request $request)
    {
        // Get all roles
        $roles = Role::orderBy('name')->get()->map(fn($role) => [
            'id' => $role->id,
            'name' => $role->name,
            'is_super_admin' => $role->name === 'super-admin',
        ]);
        
        // Get all permissions grouped by module
        $allPermissions = Permission::orderBy('name')->get();
        
        // Build permission matrix
        $permissionGroups = [];
        foreach ($allPermissions as $permission) {
            $parts = explode('.', $permission->name);
            $group = $parts[0] ?? 'other';
            $action = $parts[1] ?? $permission->name;
            
            if (!isset($permissionGroups[$group])) {
                $permissionGroups[$group] = [
                    'name' => $group,
                    'label' => ucfirst($group),
                    'permissions' => [],
                ];
            }
            
            // Get roles that have this permission
            $rolePermissions = [];
            foreach ($roles as $role) {
                $roleModel = Role::find($role['id']);
                $rolePermissions[$role['name']] = $roleModel->hasPermissionTo($permission);
            }
            
            $permissionGroups[$group]['permissions'][] = [
                'id' => $permission->id,
                'name' => $permission->name,
                'action' => $action,
                'roles' => $rolePermissions,
            ];
        }
        
        return Inertia::render('Dashboard/Admin/Permissions/Index', [
            'roles' => $roles,
            'permissionGroups' => array_values($permissionGroups),
        ]);
    }
    
    /**
     * Toggle permission for a role (AJAX endpoint)
     */
    public function toggle(Request $request)
    {
        $validated = $request->validate([
            'permission_id' => 'required|exists:permissions,id',
            'role_id' => 'required|exists:roles,id',
            'enabled' => 'required|boolean',
        ]);
        
        $permission = Permission::find($validated['permission_id']);
        $role = Role::find($validated['role_id']);
        
        // Prevent modifying super-admin permissions
        if ($role->name === 'super-admin') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot modify super-admin permissions',
            ], 403);
        }
        
        if ($validated['enabled']) {
            $role->givePermissionTo($permission);
        } else {
            $role->revokePermissionTo($permission);
        }
        
        // Clear permission cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        
        return response()->json([
            'success' => true,
            'message' => $validated['enabled'] 
                ? "Permission '{$permission->name}' granted to '{$role->name}'"
                : "Permission '{$permission->name}' revoked from '{$role->name}'",
        ]);
    }
    
    public function create()
    {
        $groups = Permission::all()
            ->map(fn($p) => explode('.', $p->name)[0])
            ->unique()
            ->sort()
            ->values()
            ->toArray();
        
        $roles = Role::orderBy('name')->pluck('name')->toArray();
        
        return Inertia::render('Dashboard/Admin/Permissions/Create', [
            'groups' => $groups,
            'roles' => $roles,
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name|regex:/^[a-z]+\.[a-z]+$/',
            'roles' => 'array',
            'roles.*' => 'string|exists:roles,name',
        ], [
            'name.regex' => 'Permission name must be in format: module.action (e.g., user.view)',
        ]);
        
        $permission = Permission::create(['name' => $validated['name']]);
        
        // Always give to super-admin
        $superAdmin = Role::findByName('super-admin');
        if ($superAdmin) {
            $superAdmin->givePermissionTo($permission);
        }
        
        // Assign to other roles if specified
        if (!empty($validated['roles'])) {
            foreach ($validated['roles'] as $roleName) {
                if ($roleName !== 'super-admin') {
                    $role = Role::findByName($roleName);
                    $role->givePermissionTo($permission);
                }
            }
        }
        
        return redirect()->route('admin.permissions.index')
            ->with('success', 'Permission created successfully.');
    }
    
    public function destroy(Permission $permission)
    {
        // Remove from all roles first
        foreach (Role::all() as $role) {
            $role->revokePermissionTo($permission);
        }
        
        $permission->delete();
        
        return redirect()->route('admin.permissions.index')
            ->with('success', 'Permission deleted successfully.');
    }
}
