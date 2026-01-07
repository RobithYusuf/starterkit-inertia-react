<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Define permissions by module
        $permissions = [
            // User Management
            'user.view',
            'user.create',
            'user.edit',
            'user.delete',
            
            // Role & Permission Management
            'role.view',
            'role.create',
            'role.edit',
            'role.delete',
            
            // Settings
            'settings.view',
            'settings.edit',
            
            // Dashboard
            'dashboard.admin',
            'dashboard.member',
            
            // Components (Developer)
            'components.view',
            
            // Profile
            'profile.view',
            'profile.edit',
            
            // Sessions
            'sessions.view',
            'sessions.revoke',
        ];

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        
        // Super Admin - has all permissions
        $superAdmin = Role::create(['name' => 'super-admin']);
        $superAdmin->givePermissionTo(Permission::all());
        
        // Admin - has most permissions except role management
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo([
            'user.view',
            'user.create',
            'user.edit',
            'user.delete',
            'settings.view',
            'settings.edit',
            'dashboard.admin',
            'components.view',
            'profile.view',
            'profile.edit',
            'sessions.view',
            'sessions.revoke',
        ]);
        
        // Member - basic permissions
        $member = Role::create(['name' => 'member']);
        $member->givePermissionTo([
            'dashboard.member',
            'profile.view',
            'profile.edit',
            'sessions.view',
            'sessions.revoke',
        ]);
    }
}
