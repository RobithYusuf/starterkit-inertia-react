<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class SessionController extends Controller
{
    /**
     * Get all sessions for the current user.
     */
    public function index(Request $request)
    {
        $sessions = $this->getSessions($request);
        
        return Inertia::render('Dashboard/Sessions', [
            'sessions' => $sessions,
        ]);
    }
    
    /**
     * Get the session data for the current user.
     */
    protected function getSessions(Request $request)
    {
        if (config('session.driver') !== 'database') {
            return collect();
        }
        
        return collect(
            DB::connection(config('session.connection'))
                ->table(config('session.table', 'sessions'))
                ->where('user_id', $request->user()->getAuthIdentifier())
                ->orderBy('last_activity', 'desc')
                ->get()
        )->map(function ($session) use ($request) {
            $device = $this->parseUserAgent($session->user_agent ?? '');
            
            return (object) [
                'id' => $session->id,
                'ip_address' => $session->ip_address,
                'is_current_device' => $session->id === $request->session()->getId(),
                'last_active' => Carbon::createFromTimestamp($session->last_activity)->diffForHumans(),
                'last_active_at' => Carbon::createFromTimestamp($session->last_activity)->toDateTimeString(),
                'device' => $device,
            ];
        });
    }
    
    /**
     * Parse user agent string to extract device info.
     */
    protected function parseUserAgent(string $userAgent): array
    {
        $browser = 'Unknown';
        $platform = 'Unknown';
        $isDesktop = true;
        $isMobile = false;
        $isTablet = false;
        
        // Detect browser
        if (preg_match('/Edge|Edg/i', $userAgent)) {
            $browser = 'Edge';
        } elseif (preg_match('/Chrome/i', $userAgent) && !preg_match('/Edge|Edg/i', $userAgent)) {
            $browser = 'Chrome';
        } elseif (preg_match('/Firefox/i', $userAgent)) {
            $browser = 'Firefox';
        } elseif (preg_match('/Safari/i', $userAgent) && !preg_match('/Chrome/i', $userAgent)) {
            $browser = 'Safari';
        } elseif (preg_match('/Opera|OPR/i', $userAgent)) {
            $browser = 'Opera';
        } elseif (preg_match('/MSIE|Trident/i', $userAgent)) {
            $browser = 'Internet Explorer';
        }
        
        // Detect platform
        if (preg_match('/Windows/i', $userAgent)) {
            $platform = 'Windows';
        } elseif (preg_match('/Macintosh|Mac OS/i', $userAgent)) {
            $platform = 'macOS';
        } elseif (preg_match('/Linux/i', $userAgent) && !preg_match('/Android/i', $userAgent)) {
            $platform = 'Linux';
        } elseif (preg_match('/Android/i', $userAgent)) {
            $platform = 'Android';
            $isMobile = true;
            $isDesktop = false;
        } elseif (preg_match('/iPhone/i', $userAgent)) {
            $platform = 'iOS';
            $isMobile = true;
            $isDesktop = false;
        } elseif (preg_match('/iPad/i', $userAgent)) {
            $platform = 'iPadOS';
            $isTablet = true;
            $isDesktop = false;
        }
        
        // Detect mobile/tablet
        if (preg_match('/Mobile/i', $userAgent)) {
            $isMobile = true;
            $isDesktop = false;
        }
        if (preg_match('/Tablet/i', $userAgent)) {
            $isTablet = true;
            $isMobile = false;
            $isDesktop = false;
        }
        
        return [
            'browser' => $browser,
            'platform' => $platform,
            'is_desktop' => $isDesktop,
            'is_mobile' => $isMobile,
            'is_tablet' => $isTablet,
        ];
    }
    
    /**
     * Delete the given session.
     */
    public function destroy(Request $request, string $sessionId)
    {
        $request->validate([
            'password' => ['required', 'string'],
        ]);
        
        if (!Hash::check($request->password, $request->user()->password)) {
            throw ValidationException::withMessages([
                'password' => [__('This password does not match our records.')],
            ]);
        }
        
        DB::connection(config('session.connection'))
            ->table(config('session.table', 'sessions'))
            ->where('id', $sessionId)
            ->where('user_id', $request->user()->getAuthIdentifier())
            ->delete();
        
        return back()->with('success', 'Session has been logged out.');
    }
    
    /**
     * Delete all other sessions except the current one.
     */
    public function destroyOthers(Request $request)
    {
        $request->validate([
            'password' => ['required', 'string'],
        ]);
        
        if (!Hash::check($request->password, $request->user()->password)) {
            throw ValidationException::withMessages([
                'password' => [__('This password does not match our records.')],
            ]);
        }
        
        DB::connection(config('session.connection'))
            ->table(config('session.table', 'sessions'))
            ->where('user_id', $request->user()->getAuthIdentifier())
            ->where('id', '!=', $request->session()->getId())
            ->delete();
        
        return back()->with('success', 'All other sessions have been logged out.');
    }
}
