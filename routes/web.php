<?php

use App\Http\Controllers\AnggotaController;
use App\Http\Controllers\ParameterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', function(){
    return to_route('login');
});

Route::middleware('guest','web')->group(function () {
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [LoginController::class, 'login'])->name('login.post');
});


Route::middleware('auth','web')->group(function () {
    Route::get('/anggota',[AnggotaController::class,'index'])->name('anggota');
    Route::get('/parameter',[ParameterController::class,'index'])->name('parameter');
    Route::get('/dashboard',[DashboardController::class,'index'])->name('dashboard');
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
});
