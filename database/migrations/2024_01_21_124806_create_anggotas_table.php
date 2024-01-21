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
        Schema::create('anggotas', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('nama');
            $table->string('email')->unique();
            $table->integer('phone')->unique();
            $table->integer('desa');
            $table->integer('rw');
            $table->integer('rt');
            $table->string('kp');
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
        Schema::dropIfExists('anggotas');
    }
};
