<?php
namespace App\Http\Controllers;

use App\Models\Kriteria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KriteriaController extends Controller
{
    protected $name;

    public function __construct()
    {
        $this->name = "kriteria";
    }

    public function index()
    {
        $data['title'] = $this->name;
        $data['field'] = Kriteria::get()->all();
        // $data['field'] = Kriteria::where("status", 1)->get();
                // dd($data['field']);
        return Inertia::render(ucfirst($this->name))->with($data);
    }

    public function create()
    {
        $codeId = $this->getCodeRand("CR-");
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
            $this->formInput("code", "hidden", $codeId, ["", true, false, false]),
            $this->formInput("nama", "text", "", [true, false, false, false]),
            $this->formInputDropdown("status", "", $propsts, $options),
            // Add more form inputs as needed
        ];

        $data['title'] = $this->name;
        $data['mode'] = "create";
        $data['input'] = $formInputs;
        $data['code'] = $codeId;

        return Inertia::render(ucfirst($this->name) . "Form")->with($data);
    }

    public function store(Request $request)
    {
         // Validate the request data if needed
        //  dd($request);
         $request->validate([
            'code' => 'required|string',
            'nama' => 'required|string',
            'status' => 'required|numeric', // Assuming 'status' is a numeric field, adjust as needed
         ]);
          $data = $request->only(['code','nama', 'status']); // Adjust field names accordingly
    
         Kriteria::insert($data);
 
        return response()->json([
            'action' => 'Create', 
        'message' => 'Data stored successfully', 
        'success' =>true, 
        'redirect' => $this->name,], 201); 
}


}
