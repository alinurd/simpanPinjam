<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AnggotaController extends Controller
{
    public function index(){
        $data['title']="anggota";
        return Inertia::render('Anggota')->with($data);
    }
}
