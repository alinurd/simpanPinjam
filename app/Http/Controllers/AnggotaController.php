<?php

namespace App\Http\Controllers;

use App\Models\Anggota;
use App\Models\Desa;
use App\Models\Kriteria;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnggotaController extends Controller
{
    protected $name;

    public function __construct()
    {
        $this->name = "anggota";
    }

    public function index()
    {
        $data['title'] = $this->name;
        $data['field'] = Anggota::with('status')->get();
        return Inertia::render(lcfirst($this->name).'/'.ucfirst($this->name))->with($data);
    }
    public function create()
    {
        $codeId = $this->getCodeRand("AGT-","anggota");
        $propsts = [true, false, false, false];
        $cr = Desa::get();
        $options = [];
        
        foreach ($cr as $q) {
            $options[] = [
                "title" =>  $q['nama'],
                "value" => $q['id'],
            ];
        }
        $optionsdesa = [];
        
        foreach ($cr as $q) {
            $optionsdesa[] = [
                "title" =>  $q['nama'],
                "value" => $q['id'],
            ];
        }

        $formInputs = [
            $this->formInput("code", "hidden", $codeId, ["", true, false, false]),
            $this->formInput("nama", "text", "", [true, false, false, false]),
            $this->formInput("email", "text", "", [true, false, false, false]),
            $this->formInput("phone", "number", "", [true, false, false, false]),
            $this->formInputDropdown("desa", "", "", $propsts, $optionsdesa),
            $this->formInput("rw", "number", "", [true, false, false, false]),
            $this->formInput("rt", "number", "", [true, false, false, false]),
            $this->formInput("kampung", "text", "", [true, false, false, false]),
            $this->formInput("keterangan", "area", "", [true, false, false, false]),
            //  $this->formInputDropdown("status", "", "", $propsts, $options),
         ];

        $data['title'] = $this->name;
        $data['mode'] = "create";
        $data['input'] = $formInputs;
        $data['code'] = $codeId;
        return Inertia::render(lcfirst($this->name).'/'.ucfirst($this->name) . "Form")->with($data);
    }

    public function store(Request $request)
    {
         // Validate the request data if needed
        //  dd($request);
         $request->validate([
            'code' => 'required|string',
            'nama' => 'required|string',
            'email' => 'required|string', 
            'phone' => 'required|numeric', 
            'desa' => 'required|numeric', 
            'rt' => 'required|numeric', 
            'rw' => 'required|numeric', 
            'keterangan' => 'required|string', 
            'kampung' => 'required|string', 
          ]);

         $code = $request->input('code');
         $nama = $request->input('nama');
         $phone = $request->input('phone');
         $email = $request->input('email');
         $desa = $request->input('desa');
         $rt = $request->input('rt');
         $rw = $request->input('rw');
         $keterangan = $request->input('keterangan');
         $kp = $request->input('kampung');
         $sts = 1;

         Anggota::insert([
            'code' => $code,
            'nama' => $nama,
            'email' => $email,
            'phone' => $phone,
            'desa' => $desa,
            'rt' => $rt,
            'rw' => $rw,
            'kp' => $kp,
            'keterangan' => $keterangan,
            'status' => $sts,
         ]);

     
  
        return response()->json([
        'action' => 'Create', 
        'message' => 'Data stored successfully', 
        'success' =>true, 
        'redirect' => $this->name,], 201); 
}


public function edit($code) {
    $codeId = $code;

            $field = Anggota::where("code", $code)->first();
     $propsts = [true, false, true, false];
     $propstsd = [true, false, false, false];

     $cr = Status::get();
     $options = [];
     
     foreach ($cr as $q) {
         $options[] = [
             "title" =>  $q['nama'],
             "value" => $q['id'],
         ];
     }
     $crd = Desa::get();
         
    
        $optionsdesa = [];
        
        foreach ($crd as $q) {
            $optionsdesa[] = [
                "title" =>  $q['nama'],
                "value" => $q['id'],
            ];
        }

        $formInputs = [
        $this->formInput("id", "hidden", $field['id'], ["", true, false, false]),
             $this->formInput("code", "hidden", $codeId, ["", true, false, false]),
            $this->formInput("nama", "text", $field['nama'], [true, false, false, false]),
            $this->formInput("email", "text", $field['email'], [true, false, false, false]),
            $this->formInput("phone", "number", $field['phone'], [true, false, false, false]),
            $this->formInputDropdown("desa", $field['desa'], $field['desa'], $propstsd, $optionsdesa),
            $this->formInput("rw", "number", $field['rw'], [true, false, false, false]),
            $this->formInput("rt", "number", $field['rt'], [true, false, false, false]),
            $this->formInput("kampung", "text", $field['kp'], [true, false, false, false]),
            $this->formInput("keterangan", "area", $field['keterangan'], [true, false, false, false]),
            $this->formInputDropdown("status", $field['status'], $field['status'], $propsts, $options),

     ];
    $data['title'] = $this->name;
    $data['mode'] = "update";
    $data['input'] = $formInputs;
    $data['code'] = $codeId;

    return Inertia::render(lcfirst($this->name).'/'.ucfirst($this->name) . "Form")->with($data);
}

public function update(Request $request)
{
    // Validate the request data if needed
    $request->validate([
             'id' => 'required',
              'nama' => 'required|string',
             'email' => 'required|string', 
             'phone' => 'required|numeric', 
             'desa' => 'required|numeric', 
             'rt' => 'required|numeric', 
             'rw' => 'required|numeric', 
             'keterangan' => 'required|string', 
             'kampung' => 'required|string', 
        ]);
        
        $id = $request->input('id');
        $code = $request->input('code');
         $nama = $request->input('nama');
         $phone = $request->input('phone');
         $email = $request->input('email');
         $desa = $request->input('desa');
         $rt = $request->input('rt');
         $rw = $request->input('rw');
         $keterangan = $request->input('keterangan');
         $kp = $request->input('kampung');
  
        
        $Kriteria = Anggota::find($id);
        if ($Kriteria) {
            $Kriteria->update([
                'code' => $code,
            'nama' => $nama,
            'email' => $email,
            'phone' => $phone,
            'desa' => $desa,
            'rt' => $rt,
            'rw' => $rw,
            'kp' => $kp,
            'keterangan' => $keterangan,
            ]);
        
            // Update successful
        }

        return response()->json([
        'action' => 'Update', 
        'message' => 'Data Updated successfully', 
        'success' =>true, 
        'redirect' =>'../'. $this->name,], 201); 
}

public function destroy($id)
{ 
    $parameter = Anggota::findOrFail($id);
    
    $parameter->delete();
    
    // Redirect or provide a response as needed
    // return response()->json([
    //     'action' => 'Delete', 
    // 'message' => 'Data Deleted successfully', 
    // 'success' =>true, 
    // 'redirect' =>'../'. $this->name,], 201);

    // All Inertia requests must receive a valid Inertia response, however a plain JSON response was received.{"action":"Delete","message":"Data Deleted successfully","success":true,"redirect":"../kriteria"}
}


public function getKriteriaById($id) {
 
            $field = Anggota::where("id", $id)->first();
            return response()->json([
                'action' => 'getById', 
            'message' => 'Get Data Kriteria successfully', 
            'success' =>true, 
            'data' =>$field, ], 201); 
}

}
