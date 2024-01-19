<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class KriteriaController extends Controller
{
    public function index(){
        // dd("masuk");
        $data['title']="kriteria";
        return Inertia::render('Kriteria')->with($data);
    }
    public function create(){
        // dd("masuk");
        $data['title']="Kriteria";
        $data['mode']="Create";
        return Inertia::render('KriteriaCreate')->with($data);
    }
}
