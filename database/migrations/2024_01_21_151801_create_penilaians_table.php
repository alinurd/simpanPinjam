<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('penilaians', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->integer('type');
            $table->string('id_anggota');
            $table->integer('id_kriteria');
            $table->integer('id_subkriteria');
            $table->string('penilaian');
            $table->text('keterangan');
            $table->string('status');
             $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaians');
    }
};
