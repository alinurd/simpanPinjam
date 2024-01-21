<?php
namespace App\Http\Controllers;

use App\Models\Kriteria;
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
        $data['field'] = Kriteria::get()->all();
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
            $cr = Kriteria::where("status", 1)->get();
            $optionsCr = [];
            
            foreach ($cr as $q) {
                $optionsCr[] = [
                    "title" =>  $q['code'] . " - " . $q['nama'],
                    "value" => $q['id'],
                ];
            }
            

        $formInputs = [
            $this->formInputDropdown("id_kriteria", "", "", $propsts, $optionsCr),
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
        //  dd($request);
         $request->validate([
            'code' => 'required|string',
            'nama' => 'required|string',
            'bobot' => 'required|numeric', // Assuming 'status' is a numeric field, adjust as needed
            'status' => 'required|numeric', // Assuming 'status' is a numeric field, adjust as needed
         ]);
          $data = $request->only(['code','nama','bobot', 'status']); // Adjust field names accordingly
    
         Kriteria::insert($data);
 
        return response()->json([
            'action' => 'Create', 
        'message' => 'Data stored successfully', 
        'success' =>true, 
        'redirect' => $this->name,], 201); 
}


public function edit($code) {
    $codeId = $code;

            $field = Kriteria::where("code", $code)->first();
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

    $formInputs = [
        $this->formInput("id", "hidden", $field['id'], ["", true, false, false]),
        $this->formInput("code", "text", $codeId, ["", true, false, false]),
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
            'status' => 'required|numeric', // Assuming 'status' is a numeric field, adjust as needed
        ]);
        
        $id = $request->input('id');
        $nama = $request->input('nama');
        $bobot = $request->input('bobot');
        $status = $request->input('status');
        // dd($bobot);
        
        $Kriteria = Kriteria::find($id);
        
        if ($Kriteria) {
            $Kriteria->update([
                'nama' => $nama,
                'bobot' => $bobot,
                'status' => $status,
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
    $parameter = Kriteria::findOrFail($id);

    $parameter->delete();

    // Redirect or provide a response as needed
    // return response()->json([
    //     'action' => 'Delete', 
    // 'message' => 'Data Deleted successfully', 
    // 'success' =>true, 
    // 'redirect' =>'../'. $this->name,], 201);

    // All Inertia requests must receive a valid Inertia response, however a plain JSON response was received.{"action":"Delete","message":"Data Deleted successfully","success":true,"redirect":"../kriteria"}
}



}
