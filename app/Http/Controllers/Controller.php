<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public static function getCodeRand($q)
    {
        $codePrefix = $q;
        $randomNumber = mt_rand(1000, 9999);  
        // $lastId = '-' . (1 + Para::latest('id')->value('id')) . '-';
        $codeId = $codePrefix . $randomNumber;
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

    public static function formInputDropdown($name,  $value, $prop=[], $options=[])
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
