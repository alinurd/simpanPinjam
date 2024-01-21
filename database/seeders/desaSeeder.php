<?php

namespace Database\Seeders;

use App\Models\Desa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class desaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Desa::insert([
            [
                'id' => 1,
                'nama' => 'Kiarasari',
            ],
            [
                'id' => 2,
                'nama' => 'Kiarapandak',
            ],
            [
                'id' => 3,
                'nama' => 'Urug',
            ],
            [
                'id' => 4,
                'nama' => 'Harkatjaya',
            ],
            [
                'id' => 5,
                'nama' => 'Sukajaya',
            ],
            [
                'id' => 6,
                'nama' => 'Cipayung',
            ],
            [
                'id' => 7,
                'nama' => 'Jayaraharja',
            ],
            [
                'id' => 8,
                'nama' => 'Sukamulih',
            ],
            [
                'id' => 9,
                'nama' => 'Pasirmadang',
            ],
            [
                'id' => 10,
                'nama' => 'Cilkeuksa',
            ],
            [
                'id' => 11,
                'nama' => 'Cisarua',
            ],
            
        ]);
    }
}
