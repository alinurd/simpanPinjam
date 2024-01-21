<?php

namespace App\Http\Controllers;

// use App\Models\Anggota; // Import the Anggota model
use App\Entities\Anggota; // Adjust the namespace as needed
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
 

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public static function getCodeRand($q)
    {
        // dd();
        $codePrefix = $q;
        $randomNumber = mt_rand(1000, 9999);  
        // $lastId = '-' . (1 + Para::latest('id')->value('id')) . '-';
        $codeId = $codePrefix . $randomNumber;

        // $codePrefix = "FRM";
        // $randomNumber = mt_rand(1000, 9999);  
        // Class "Anggota" not found
        // $lastId = '-' . (1 + ucfirst($tbl)::latest('id')->value('id')) . '-';
        // $codeId = $codePrefix . $lastId. $randomNumber;



        return $codeId ;
    }

    public static function getProperiInput($prop)
    {
        // dd($prop);
        return [
            "required" => $prop[0],
            "readonly" => $prop[1],
            "disable" => $prop[2],
            "hidden" => $prop[3],
        ];
    }



    public static function formInput($name, $type, $value, $prop = [])
{
    // dd($value);
    return [
        $name => [
            "title" => $name,
            "type" => $type,
            "value" => $value,
            "properti" => self::getProperiInput($prop),
        ],
    ];
}

    public static function formInputDropdown($name, $type,  $value, $prop=[], $options=[])
    {
        return [
          
            $name => [
                "title" => $name,
                "type" => "dropdown",
                "value" => $value,
                "options" => $options,
                "properti" => self::getProperiInput($prop),
                ]
            ];
            
    }
 
    




}
