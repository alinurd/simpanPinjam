<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles)    {
       // Periksa apakah pengguna telah login
       if (!Auth::check()) {
        return redirect('/login');
    }
    // Periksa apakah peran pengguna sesuai dengan salah satu dari peran yang diizinkan
    $u = Auth::user();
    $user= User::where('id', $u->id)->with('role')->get();
    // dd();
    foreach ($roles as $role) {
        // dd($next($request));
        if ($user[0]->role->name == $role) {
            return $next($request);
        }
    }

    // Jika peran pengguna tidak sesuai dengan yang diizinkan, kembalikan larangan akses
    return abort(403, 'Unauthorized');

    }
}
