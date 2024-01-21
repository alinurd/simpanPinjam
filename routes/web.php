<?php

use App\Http\Controllers\AnggotaController;
use App\Http\Controllers\ParameterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Kriteria;
use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\SubkriteriaController;
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


    // kriteria Route
    Route::get('/kriteria', [KriteriaController::class, 'index'])->name('kriteria');
    Route::get('/kriteriaCreate', [KriteriaController::class, 'create'])->name('kriteriaCreate');
    Route::get('/kriteriaEdit/{code}', [KriteriaController::class, 'edit'])->name('kriteriaEdit');
        Route::post('/kriteriaCreate', [KriteriaController::class, 'store'])->name('kriteriaCreate.post');
        Route::post('/kriteriaUpdate', [KriteriaController::class, 'update'])->name('kriteriaUpdate.post');
        Route::delete('kriteriaDelete/{id}', [KriteriaController::class, 'destroy'])->name('kriteriaDelete');

        // subkriteria Route
    Route::get('/subkriteria', [SubkriteriaController::class, 'index'])->name('subkriteria');
    Route::get('/subkriteriaCreate', [SubKriteriaController::class, 'create'])->name('subkriteriaCreate');
    Route::get('/subkriteriaEdit/{code}', [SubKriteriaController::class, 'edit'])->name('subkriteriaEdit');
        Route::post('/subkriteriaCreate', [SubKriteriaController::class, 'store'])->name('subkriteriaCreate.post');
        Route::post('/subkriteriaUpdate', [SubKriteriaController::class, 'update'])->name('subkriteriaUpdate.post');
        Route::delete('subkriteriaDelete/{id}', [SubKriteriaController::class, 'destroy'])->name('subkriteriaDelete');

});
