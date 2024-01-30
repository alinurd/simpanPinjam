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
    Route::get('/parameter',[ParameterController::class,'index'])->name('parameter')->middleware('check.role:admin');
   Route::get('/dashboard',[DashboardController::class,'index'])->name('dashboard');
   Route::post('/logout', [LoginController::class, 'logout'])->name('logout');


   // kriteria Route
   Route::get('/kriteria', [KriteriaController::class, 'index'])->name('kriteria')->middleware('check.role:admin');
   Route::get('/kriteriaCreate', [KriteriaController::class, 'create'])->name('kriteriaCreate')->middleware('check.role:admin');
   Route::get('/kriteriaEdit/{code}', [KriteriaController::class, 'edit'])->name('kriteriaEdit')->middleware('check.role:admin');
   Route::get('/kriteriaById/{id}', [KriteriaController::class, 'getKriteriaById'])->name('kriteriaById')->middleware('check.role:admin');
       Route::post('/kriteriaCreate', [KriteriaController::class, 'store'])->name('kriteriaCreate.post')->middleware('check.role:admin');
       Route::post('/kriteriaUpdate', [KriteriaController::class, 'update'])->name('kriteriaUpdate.post')->middleware('check.role:admin');
       Route::delete('kriteriaDelete/{id}', [KriteriaController::class, 'destroy'])->name('kriteriaDelete')->middleware('check.role:admin');

       // subkriteria Route
   Route::get('/subkriteria', [SubkriteriaController::class, 'index'])->name('subkriteria')->middleware('check.role:admin');
   Route::get('/subkriteriaCreate', [SubKriteriaController::class, 'create'])->name('subkriteriaCreate')->middleware('check.role:admin');
   Route::get('/subkriteriaEdit/{code}', [SubKriteriaController::class, 'edit'])->name('subkriteriaEdit')->middleware('check.role:admin');
       Route::post('/subkriteriaCreate', [SubKriteriaController::class, 'store'])->name('subkriteriaCreate.post')->middleware('check.role:admin');
       Route::post('/subkriteriaUpdate', [SubKriteriaController::class, 'update'])->name('subkriteriaUpdate.post')->middleware('check.role:admin');
       Route::delete('subkriteriaDelete/{id}', [SubKriteriaController::class, 'destroy'])->name('subkriteriaDelete')->middleware('check.role:admin');

       // anggota Route


       Route::get('/anggotaReview', [AnggotaController::class, 'review'])
       ->name('anggotaReview')
       ->middleware('check.role:pengawas,admin,pengurus');  
       
       Route::get('/anggotaAprv', [AnggotaController::class, 'aprv'])->name('AnggotaAprv')->middleware('check.role:pengurus');
   Route::get('/anggota', [AnggotaController::class, 'index'])->name('anggota')->middleware('check.role:admin');
   Route::get('/anggotaCreate', [AnggotaController::class, 'create'])->name('anggotaCreate')->middleware('check.role:admin');
   Route::get('/anggotaEdit/{code}', [AnggotaController::class, 'edit'])->name('anggotaEdit')->middleware('check.role:admin');
   Route::get('/anggotaById/{id}', [AnggotaController::class, 'getAnggotaById'])->name('anggotaById');
   Route::get('/pointByAnggota/{id}', [AnggotaController::class, 'getpointByAnggota'])->name('pointByAnggota');
       Route::post('/anggotaCreate', [AnggotaController::class, 'store'])->name('anggotaCreate.post')->middleware('check.role:admin');
       Route::post('/anggotaReview', [AnggotaController::class, 'storeReview'])->name('anggotaReview.post')->middleware('check.role:pengawas');
       Route::post('/anggotaAprv', [AnggotaController::class, 'storeAprv'])->name('anggotaAprv.post')->middleware('check.role:pengurus');
       Route::post('/anggotaUpdate', [AnggotaController::class, 'update'])->name('anggotaUpdate.post')->middleware('check.role:admin');
       Route::delete('anggotaDelete/{id}', [AnggotaController::class, 'destroy'])->name('anggotaDelete')->middleware('check.role:admin');

       // penilaian Route
   Route::get('/penilaian', [PenilaianController::class, 'index'])->name('penilaian')->middleware('check.role:petugas');
   Route::get('/penilaianCreate', [PenilaianController::class, 'create'])->name('penilaianCreate')->middleware('check.role:petugas');
   Route::get('/penilaianEdit/{code}', [PenilaianController::class, 'edit'])->name('penilaianEdit')->middleware('check.role:petugas');
       Route::post('/penilaianCreate', [PenilaianController::class, 'store'])->name('penilaianCreate.post')->middleware('check.role:petugas');
       Route::post('/penilaianUpdate', [PenilaianController::class, 'update'])->name('penilaianUpdate.post')->middleware('check.role:petugas');
       Route::delete('penilaianDelete/{id}', [PenilaianController::class, 'destroy'])->name('penilaianDelete')->middleware('check.role:petugas');

});
