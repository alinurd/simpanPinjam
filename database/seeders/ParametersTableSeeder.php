<?php

namespace Database\Seeders;

use App\Models\Parameter as ModelsParameter;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
 class ParametersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ModelsParameter::create([
            'nama' => 'Example Name',
            'code' => 'ABC123',
            'status' => 'Active',
            // Add any other columns
        ]);
    }
}
