<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\ComponentsController;
use App\Http\Controllers\ProfileController;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;

Route::get('/', function () {
    return Inertia\Inertia::render('Welcome');
});

// Auth Routes - Manual untuk Inertia
Route::middleware('guest')->group(function () {
    // Login
    Route::get('/login', function () {
        return Inertia\Inertia::render('Auth/Login');
    })->name('login');
    
    // Register
    Route::get('/register', function () {
        return Inertia\Inertia::render('Auth/Register');
    })->name('register');
    
    // Forgot Password
    Route::get('/forgot-password', function () {
        return Inertia\Inertia::render('Auth/ForgotPassword');
    })->name('password.request');
    
    // Reset Password
    Route::get('/reset-password/{token}', function ($token) {
        return Inertia\Inertia::render('Auth/ResetPassword', [
            'token' => $token,
            'email' => request()->email
        ]);
    })->name('password.reset');
});

// Email Verification Routes
Route::middleware('auth')->group(function () {
    Route::get('/email/verify', function () {
        return Inertia\Inertia::render('Auth/VerifyEmail', [
            'status' => session('status')
        ]);
    })->name('verification.notice');
    
    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
        $request->fulfill();
        
        $user = $request->user();
        if ($user->hasAnyRole(['admin', 'super-admin'])) {
            return redirect('/admin/dashboard')->with('success', 'Email verified successfully!');
        }
        return redirect('/dashboard')->with('success', 'Email verified successfully!');
    })->middleware('signed')->name('verification.verify');
    
    Route::post('/email/verification-notification', function (Request $request) {
        $request->user()->sendEmailVerificationNotification();
        return back()->with('status', 'verification-link-sent');
    })->middleware('throttle:6,1')->name('verification.send');
});

// Admin Routes (super-admin and admin)
Route::middleware(['auth', 'role:super-admin,admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // User Management
    Route::resource('users', UserController::class);
    
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password');
    
    // Sessions
    Route::get('/sessions', [\App\Http\Controllers\SessionController::class, 'index'])->name('sessions.index');
    
    // Settings
    Route::get('/settings', function () {
        return Inertia\Inertia::render('Dashboard/Admin/Settings');
    })->name('settings');
    
    // Components Library
    Route::get('/components', [ComponentsController::class, 'index'])->name('components');
});

// Super Admin Only Routes
Route::middleware(['auth', 'role:super-admin'])->prefix('admin')->name('admin.')->group(function () {
    // Role Management (super-admin only)
    Route::resource('roles', RoleController::class);
    
    // Permission Management (super-admin only)
    Route::resource('permissions', PermissionController::class)->except(['edit', 'update', 'show']);
    Route::post('/permissions/toggle', [PermissionController::class, 'toggle'])->name('permissions.toggle');
});

// Member Routes
Route::middleware(['auth', 'role:member'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia\Inertia::render('Dashboard/Member/Index');
    })->name('member.dashboard');
    
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password');
    
    // Sessions
    Route::get('/sessions', [\App\Http\Controllers\SessionController::class, 'index'])->name('sessions.index');
});

// Session Management (shared routes)
Route::middleware('auth')->group(function () {
    Route::delete('/sessions/{session}', [\App\Http\Controllers\SessionController::class, 'destroy'])->name('sessions.destroy');
    Route::delete('/sessions', [\App\Http\Controllers\SessionController::class, 'destroyOthers'])->name('sessions.destroy-others');
});

// Logout route - available for authenticated users
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');
