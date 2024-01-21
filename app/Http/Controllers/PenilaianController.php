<?php

namespace App\Http\Controllers;

use App\Models\Anggota;
use App\Models\Subkriteria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenilaianController extends Controller
{
    protected $name;

    public function __construct()
    {
        $this->name = "penilaian";
    }

    public function index()
    {
        $data['title'] = $this->name;
        $data['field'] = Subkriteria::with('kriteria')->get();
        $data['field'] = Anggota::where("status", 1)->get();
        // dd($data['field']);
        return Inertia::render(lcfirst($this->name).'/'.ucfirst($this->name))->with($data);
        
    }
}
