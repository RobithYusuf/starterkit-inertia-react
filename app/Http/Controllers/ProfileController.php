<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Show the profile edit form
     */
    public function edit(Request $request)
    {
        $user = $request->user();
        
        // Determine the view based on user role
        $view = $user->hasAnyRole(['super-admin', 'admin']) 
            ? 'Dashboard/Admin/Profile/Edit' 
            : 'Dashboard/Member/Profile/Edit';
        
        return Inertia::render($view, [
            'user' => $user
        ]);
    }
    
    /**
     * Update profile information
     */
    public function update(Request $request)
    {
        $user = $request->user();
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id)
            ],
        ]);
        
        $user->update($validated);
        
        return back()->with('success', 'Profile updated successfully.');
    }
    
    /**
     * Update password
     */
    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);
        
        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);
        
        return back()->with('success', 'Password updated successfully.');
    }
}
