<?php

namespace App\Http\Controllers;

use App\Models\Anggota;
use App\Models\Aprove;
use App\Models\Desa;
use App\Models\Kriteria;
use App\Models\Penilaian;
use App\Models\Status;
use App\Models\Subkriteria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $data['field'] = Anggota::with('status', 'progress')->get();
        return Inertia::render(lcfirst($this->name).'/'.ucfirst($this->name))->with($data);
    }
    public function review()
    {
        $data['title'] = $this->name;
        $anggotaCollection = Anggota::whereIn("status", [2, 3])->orWhere("progress", 3)->with('status')->get();

        foreach ($anggotaCollection as $anggota) {
            $anggotaId = $anggota->id;
        
            // Now you can use $anggotaId to fetch related data
            $data['pointTotal'] = Penilaian::selectRaw('SUM(penilaian) as tPoint')
                ->where('id_anggota', $anggotaId)
                ->where('type', 1)
                ->get();
        
            $data['point'] = Penilaian::where("id_anggota", $anggotaId)
                ->where("type", 1)
                ->get();
        
            $data['tinjau'] = Penilaian::where("id_anggota", $anggotaId)
                ->where("type", 2)
                ->get();
        }

        
         
            $data['bobotTotal'] = Kriteria::selectRaw('SUM(bobot) as tBobot')
            ->where('status', 1)
            ->where('type', 1)
            ->get(); 

             // $data['field'] = Anggota::where("status",">", 1)->get();
            $data['kriteria'] = Kriteria::where("status", 1)->where("type", 1)->get();
            $data['subKriteria'] = SubKriteria::where("status", 1)->get();
            $data['kriteriax'] = Kriteria::where("status", 1)->where("type", 2)->get();
            $data['subKriteriax'] = SubKriteria::where("status", 1)->get();
             $data['field'] = $anggotaCollection;
             $data['mode'] = 'review';


        return Inertia::render(lcfirst($this->name).'/'.ucfirst($this->name. "Review"))->with($data);
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
            $this->formInput("ajuan", "number", "", [true, false, false, false]),
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
         $ajuan = $request->input('ajuan');
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
            'ajuan' => $ajuan,
            'keterangan' => $keterangan,
            'status' => $sts,
         ]);

     
  
        return response()->json([
        'action' => 'Create', 
        'message' => 'Data stored successfully', 
        'success' =>true, 
        'redirect' => $this->name,], 201); 
}
    public function storeReview(Request $request)
    {
        
         // Validate the request data if needed
        //  dd($request);
         $codeId = $this->getCodeRand("RvW-","anggota");
         $code = $request->input('code');
         $sts = $request->input('submitId');
         $ket = $request->input('keterangan'); 
         $user = Auth::id();
         $p = Penilaian::where("code", $code)->first();
        $usr = Anggota::find($p->id_anggota);

         Aprove::insert([
             'user' => $user,
            'code' => $codeId,
            'code_penilaian' => $code,
            'status' => $sts,
            'keterangan' => $ket
         ]);
         if ($usr) {
             $usr->update([
                 'status' => $sts,
                 'progress' => 4,
             ]);
         
             // Update successful
         }
        return response()->json([
        'action' => 'Create', 
        'message' => 'Data stored successfully', 
        'success' =>true, 
        'redirect' => $this->name."Review"], 201); 
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
            $this->formInput("ajuan", "number", $field['ajuan'], [true, false, false, false]),
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
             'phone' => 'required', 
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


public function getAnggotaById ($id) {
 
            $field = Anggota::where("id", $id)->with('desa')->first();
            return response()->json([
                'action' => 'getById', 
            'message' => 'Get Data Kriteria successfully', 
            'success' =>true, 
            'data' =>$field, ], 201); 
}

public function getpointByAnggota ($id) {
 
    
    
    $anggota = Anggota::where("id", $id)->with('status')->first();
    $pn = Penilaian::where("id_anggota", $anggota->id)->first();
     $data['field'] = $anggota;
            // if($anggota['progress']==8){
            //     $p="xx";
            // }
            // dd($anggota);
            $data['pointTotal'] = Penilaian::selectRaw('SUM(penilaian) as tPoint')
            ->where('code', $pn->code)
            ->where('type', 1)
            ->get();
            $data['bobotTotal'] = Kriteria::selectRaw('SUM(bobot) as tBobot')
            ->where('status', 1)
            ->where('type', 1)
            ->get();
            // dd($data['bobotTotal'][0]['ttl']);
            // dd($data['pointTotal'][0]['ttl']);
            // dd($data['']);

            $data['point'] = Penilaian::where("code", $pn->code)->where("type", 1)->get();
            $data['tinjau'] = Penilaian::where("code", $pn->code)->where("type", 2)->get();


            return response()->json([
            'action' => 'getById', 
            'message' => 'Get Data Point successfully', 
            'success' =>true, 
            'data' =>$data, ], 201); 
}

}
