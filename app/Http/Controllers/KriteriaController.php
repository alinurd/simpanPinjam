<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class KriteriaController extends Controller
{
        //    $properti "required" => $prop[0],"readonly" => $prop[1],"disable" => $prop[2],"hidden" => $prop[3],

    public function index(){
        // dd("masuk");
        $data['title']="kriteria";
        return Inertia::render('Kriteria')->with($data);
    }
    public function create(){
        $inp= [
            $this->formInput("ssss", "text", "", [true, false, false, false]),
            $this->formInput("cost", "number", "", [true, false, false, false]),
            $this->formInputOption("cost", "number", "", [true, true, false, false]),
            // $this->getFomInputText("cost", "number", "", [true, true, false, false]),
        ];
$codeId=$this->getCodeRand("code");
        $data['title']="Kriteria";
        $data['mode']="create";
        $data['input']=$inp;
        $data['code']=$codeId;
        return Inertia::render('KriteriaForm')->with($data);
    }
}
