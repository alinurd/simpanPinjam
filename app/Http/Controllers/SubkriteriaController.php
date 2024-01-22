<?php
namespace App\Http\Controllers;

use App\Models\Kriteria;
use App\Models\Subkriteria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubkriteriaController extends Controller
{
    protected $name;

    public function __construct()
    {
        $this->name = "subkriteria";
    }

    public function index()
    {
        $data['title'] = $this->name;
        $data['field'] = Subkriteria::with('kriteria')->get();
        // $data['field'] = Kriteria::where("status", 1)->get();
        // dd($data['field']);
        return Inertia::render(lcfirst($this->name).'/'.ucfirst($this->name))->with($data);
    }
    
    public function create()
    {
        $codeId = $this->getCodeRand("SCR-");
        $propsts = [true, false, false, false];
        $options = [
            [
                "title" => "Aktif",
                "value" => 1,
            ],
            [
                "title" => "Tidak Aktif",
                "value" => 0,
                ]
            ];
            // $cr = Kriteria::where("status", 1)->get();
            $cr = Kriteria::get();
            $optionsCr = [];
            
            foreach ($cr as $q) {
                $optionsCr[] = [
                    "title" =>  $q['code'] . " - " . $q['nama'],
                    "value" => $q['id'],
                    "jenis" => $q['type'],
                ];
            }
            

        $formInputs = [
            $this->formInputDropdown("kriteria", "", "", $propsts, $optionsCr),
            $this->formInput("code", "hidden", $codeId, ["", true, false, false]),
            $this->formInput("nama", "text", "", [true, false, false, false]),
            $this->formInput("bobot", "number", "", [true, false, false, false]),
            $this->formInputDropdown("status", "", "", $propsts, $options),
            // Add more form inputs as needed
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
         $kr = Kriteria::where("id", $request->input('kriteria'))->first();
        //  dd($kr);

         if($kr && $kr['type']!=1){
             $request->merge(['bobot' => 0]);
            }else{
                $request->merge(['bobot' =>$request->input('bobot') ]);
            }

         $request->validate([
            'kriteria' => 'required|numeric',
            'code' => 'required|string',
            'nama' => 'required|string',
            'bobot' => 'required|numeric', // Assuming 'status' is a numeric field, adjust as needed
            'status' => 'required|numeric', // Assuming 'status' is a numeric field, adjust as needed
         ]);
 
 
         $code = $request->input('code');
         $nama = $request->input('nama');
         $bobot = $request->input('bobot');
         $status = $request->input('status');
         $kriteria = $request->input('kriteria');
          $jenis = $request->input('jenis'); 

         Subkriteria::insert([
            'code' => $code,
            'nama' => $nama,
            'bobot' => $bobot,
            'status' => $status,
            'id_kriteria' => $kriteria,
        ]);
        $this->setStatusKriteriaByBobot($kriteria);

        //  Subkriteria::($data);
 
        return response()->json([
            'action' => 'Create', 
        'message' => 'Data stored successfully', 
        'success' =>true, 
        'redirect' => $this->name,], 201); 
}


public function edit($code) {
    $codeId = $code;

            $field = Subkriteria::where("code", $code)->first();
// dd($field);
    $propsts = [true, false, false, false];
    $options = [
        [
            "title" => "Aktif",
            "value" => 1,
        ],
        [
            "title" => "Tidak Aktif",
            "value" => 0,
        ]
    ];
    $cr = Kriteria::get();
    $optionsCr = [];
    
    foreach ($cr as $q) {
        $optionsCr[] = [
            "title" =>  $q['code'] . " - " . $q['nama'],
            "value" => $q['id'],
        ];
    }
    $formInputs = [
        $this->formInput("id", "hidden", $field['id'], ["", true, false, false]),
        $this->formInput("code", "text", $codeId, ["", true, false, false]),
        $this->formInputDropdown("kriteria","", $field['id_kriteria'], $propsts, $optionsCr),
        $this->formInput("nama", "text", $field['nama'], [true, false, false, false]),
        $this->formInput("bobot", "number", $field['bobot'], [true, false, false, false]),
        $this->formInputDropdown("status", "", $field['status'], $propsts, $options),
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
            'code' => 'required|string',
            'bobot' => 'required|numeric',
            'nama' => 'required|string',
            'kriteria' => 'required|numeric', // Assuming 'status' is a numeric field, adjust as needed
            'status' => 'required|numeric', // Assuming 'status' is a numeric field, adjust as needed
        ]);
        
        $id = $request->input('id');
        $nama = $request->input('nama');
        $bobot = $request->input('bobot');
        $status = $request->input('status');
        $kriteria = $request->input('kriteria');
        // dd($bobot);
        
        $Kriteria = Subkriteria::find($id);
        // dd($qx['bobot']);  
        
        if ($Kriteria) {
            $Kriteria->update([
                'nama' => $nama,
                'bobot' => $bobot,
                'status' => $status,
                'id_kriteria' => $kriteria,
            ]);
$this->setStatusKriteriaByBobot($kriteria);
         }

        return response()->json([
            'action' => 'Update', 
        'message' => 'Data Updated successfully', 
        'success' =>true, 
        'redirect' =>'../'. $this->name,], 201); 
}

public function destroy($id)
{ 
    $parameter = Subkriteria::findOrFail($id);

    $parameter->delete();
  }


  public function setStatusKriteriaByBobot($kriteria) {
 
    $qk = kriteria::where("id",$kriteria)->first();
    $qq= $this->getByKriteria($kriteria);
    
    $totalBobot = 0;
    foreach ($qq as $subkriteria) {
        $bobot = $subkriteria->bobot;
        $totalBobot += $bobot;
    }
    $xx = Kriteria::find($qk['id']);
    if($totalBobot != $qk['bobot']){
        if ($xx) {
            $xx->update([ 
                'status' =>0,
            ]);
    }
    }else{
        $xx->update([ 
            'status' =>1,
        ]);
    }


    return true; 
}


  public function getByKriteria($id) {
 
    $field = Subkriteria::where("id_kriteria", $id)->where("status", 1)->get();
    return $field; 
}


}
