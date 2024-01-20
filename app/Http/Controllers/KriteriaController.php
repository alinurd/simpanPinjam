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
        
        $codePrefix = "Sts-";
        $randomNumber = mt_rand(1000, 9999);  
        // $lastId = '-' . (1 + Para::latest('id')->value('id')) . '-';
        $codeId = $codePrefix . $randomNumber;

      
        $options[] = [
            "title" =>"Actif",
            "value" => 1,
            "properti" => $this->getProperiInput(true, true, "", "" ),
        ];
 
        $inp = [
            "status" => [
                "title" => "status",
                "type" => "dropdown",
                "value" => "",
                "options" => $options,
                    
            ],
            "code" => [
                "title" => "code",
                "type" => "text",
                "value" => $codeId,
                "properti" => $this->getProperiInput(true, "", "", "" )
            ],
            "cost" => [
                "title" => "cost",
                "type" => "number",
                "value" => "",
                "properti" => $this->getProperiInput(true, "", "", "" )
            ],
            
            "name" => [
                "title" => "name",
                "type" => "text",
                "value" => "value defult",
                "properti" => $this->getProperiInput(true, "", "", "" )
    
            ], 
            "keterangan" => [
                "title" => "keterangan",
                "type" => "area",
                "value" => "",
                            "properti" => $this->getProperiInput("", "", "", true )
    
            ], 
            "Check" => [
                "title" => "Check",
                "type" => "check",
                            "properti" => $this->getProperiInput(true, true, "", "" ),
                "options" => [
                    [
                        "title" => "check 1",
                        "name" => "check1",
                        "value" => 1,
                    ],
                    [
                        "title" => "check 2",
                        "name" => "check2",
                        "value" => 2,
                    ],
                    [
                        "title" => "check 3",
                        "name" => "check3",
                        "value" => 2,
                    ],
                ],
            ],
            
            "Radio" => [
                "title" => "radio",
                "type" => "radio",
                "value" => 1,
                "properti" => $this->getProperiInput(true, true, "", "" ),
                "options" => [
                    [
                        "title" => "Rekomendasi",
                         "value" => 1,
                     ],
                    [
                        "title" => "Tidak Rokomendasi",
                         "value" =>2,
                     ], 
                ],
            ],
             
    
        ];

        $data['title']="Kriteria";
        $data['mode']="create";
        $data['input']=$inp;
        $data['code']=$codeId;
        return Inertia::render('KriteriaForm')->with($data);
    }
}
