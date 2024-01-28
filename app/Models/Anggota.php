<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anggota extends Model
{
    use HasFactory;
    protected $fillable = ['nama', 'code',  'email', 'desa', 'phone', 'rw', 'rt', 'keterangan','keterangan', 'kp', 'status', 'progress', 'ajuan'];

    public function status()
    {
        return $this->belongsTo(Status::class, 'status');
    }
    public function desa()
    {
        return $this->belongsTo(Desa::class, 'desa');
    }
}
 