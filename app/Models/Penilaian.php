<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penilaian extends Model
{
    use HasFactory;
    protected $fillable = ['code', 'id_anggota',  'id_kriteria', 'id_subkriteria', 'penilaian', 'keterangan', 'type', 'status'];
    
    
    public function anggota()
    {
        return $this->belongsTo(Anggota::class, 'id_anggota');
    }
}
