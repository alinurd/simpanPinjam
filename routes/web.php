<?php

use App\Http\Controllers\AnggotaController;
use App\Http\Controllers\ParameterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Kriteria;
use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PenilaianController;
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
     Route::get('/parameter',[ParameterController::class,'index'])->name('parameter');
    Route::get('/dashboard',[DashboardController::class,'index'])->name('dashboard');
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');


    // kriteria Route
    Route::get('/kriteria', [KriteriaController::class, 'index'])->name('kriteria');
    Route::get('/kriteriaCreate', [KriteriaController::class, 'create'])->name('kriteriaCreate');
    Route::get('/kriteriaEdit/{code}', [KriteriaController::class, 'edit'])->name('kriteriaEdit');
    Route::get('/kriteriaById/{id}', [KriteriaController::class, 'getKriteriaById'])->name('kriteriaById');
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

        // anggota Route
    Route::get('/anggota', [AnggotaController::class, 'index'])->name('anggota');
    Route::get('/anggotaCreate', [AnggotaController::class, 'create'])->name('anggotaCreate');
    Route::get('/anggotaEdit/{code}', [AnggotaController::class, 'edit'])->name('anggotaEdit');
    Route::get('/anggotaById/{id}', [AnggotaController::class, 'getAnggotaById'])->name('anggotaById');
        Route::post('/anggotaCreate', [AnggotaController::class, 'store'])->name('anggotaCreate.post');
        Route::post('/anggotaUpdate', [AnggotaController::class, 'update'])->name('anggotaUpdate.post');
        Route::delete('anggotaDelete/{id}', [AnggotaController::class, 'destroy'])->name('anggotaDelete');

        // penilaian Route
    Route::get('/penilaian', [PenilaianController::class, 'index'])->name('penilaian');
    Route::get('/penilaianCreate', [PenilaianController::class, 'create'])->name('penilaianCreate');
    Route::get('/penilaianEdit/{code}', [PenilaianController::class, 'edit'])->name('penilaianEdit');
        Route::post('/penilaianCreate', [PenilaianController::class, 'store'])->name('penilaianCreate.post');
        Route::post('/penilaianUpdate', [PenilaianController::class, 'update'])->name('penilaianUpdate.post');
        Route::delete('penilaianDelete/{id}', [PenilaianController::class, 'destroy'])->name('penilaianDelete');

});
