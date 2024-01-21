<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anggota extends Model
{
    use HasFactory;
    protected $fillable = ['nama', 'code',  'email', 'desa', 'phone', 'rw', 'rt', 'keterangan', 'kp', 'status'];

    public function status()
    {
        return $this->belongsTo(Status::class, 'status');
    }
}
 