<?php

namespace App\Http\Controllers;

use App\Models\Anggota;
use App\Models\Kriteria;
use App\Models\Penilaian;
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
        $data['field'] = Anggota::where("status", 1)->get();
        $data['kriteria'] = Kriteria::where("status", 1)->where("type", 1)->get();
        $data['subKriteria'] = SubKriteria::where("status", 1)->get();
        $data['kriteriax'] = Kriteria::where("status", 1)->where("type", 2)->get();
        $data['subKriteriax'] = SubKriteria::where("status", 1)->get();
        // dd($data['field']);
        $codeId = $this->getCodeRand("PNL-");

        $data['mode'] = "create";
        $data['codeId'] = $codeId;
        $data['title'] = $this->name;
        // $data['title'] = $this->name;
        // $data['input'] = $formInputs;



        return Inertia::render(lcfirst($this->name).'/'.ucfirst($this->name))->with($data);
        
    }

    public function store(Request $request)
    {
         // Validate the request data if needed
        //  dd($request);
         $request->validate([
             'codeId' => 'required|string',
             'keterangan' => 'required|string',
            'id_anggota' => 'required|numeric',
            // 'sts' => 'required',
          ]);
 
 // Assuming $request->kriteria, $request->subkriteria, and $request->penilaian are arrays
for ($i = 0; $i < count($request->kriteria); $i++) {
   $rePenilaian= Penilaian::insert([
        'status' =>$request->sts, // Assuming 'code' is not an array
        'type' => $request->type, // Assuming 'code' is not an array
        'code' => $request->codeId, // Assuming 'code' is not an array
        'id_anggota' => $request->id_anggota, // Assuming 'id_anggota' is not an array
        'id_kriteria' => $request->kriteria[$i],
        'id_subkriteria' => $request->subkriteria[$i],
        'penilaian' => $request->penilaian[$i],
        'keterangan' => $request->keterangan, // Is this intended?
    ]);
  
    
        // Update successful
    }
    $agt = Anggota::find($request->id_anggota);
    if ($agt) {
        $agt->update([
            'progress' => $request->sts, //type progres penilaian
        ]);
}
 
 
        return response()->json([
            'action' => 'Create', 
        'message' => 'Data stored successfully', 
        'success' =>true, 
        'redirect' => $this->name,], 201); 
}

}
