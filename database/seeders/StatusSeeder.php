<?php

namespace Database\Seeders;

use App\Models\Status as ModelsStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Use an array to provide multiple records to the create method
        ModelsStatus::insert([
            [
                'id' => 0,
                'Kelompok' => '1',
                'nama' => 'Tidak Aktif',
            ],
            [
                'id' => 1,
                'Kelompok' => '1',
                'nama' => 'Aktif',
            ],
            [
                'id' => 2,
                'Kelompok' => 'verifikasi',
                'nama' => 'Survey',
            ],
            [
                'id' => 3,
                'Kelompok' => 'verifikasi',
                'nama' => 'Saran Pengawas',
            ],
            [
                'id' => 4,
                'Kelompok' => 'verifikasi',
                'nama' => 'Penilaian Pengurus',
            ],
            [
                'id' => 5,
                'Kelompok' => 'verifikasi',
                'nama' => 'Aprove',
            ],
            [
                'id' => 6,
                'Kelompok' => 'verifikasi',
                'nama' => 'Reject',
            ],
        ]);
    }
}
