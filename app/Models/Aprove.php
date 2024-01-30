<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aprove extends Model
{
    use HasFactory;
    protected $fillable = ['code', 'code_penilaian',  'keterangan','status', 'id_anggota'];
    protected $table ="aproves";

    public function users()
    {
        return $this->belongsTo(User::class, 'user');
    }
    public function status()
    {
        return $this->belongsTo(Status::class, 'status');
    }
}

