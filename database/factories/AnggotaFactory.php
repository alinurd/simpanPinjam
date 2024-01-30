<?php

namespace Database\Factories;

use App\Models\Anggota;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnggotaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $this->faker->addProvider(new \Faker\Provider\id_ID\Person($this->faker));
        $this->faker->addProvider(new \Faker\Provider\id_ID\Address($this->faker));

        return [
            'nama' => $this->faker->name,
            'code' => $this->faker->unique()->randomNumber(),
            'email' => $this->faker->unique()->safeEmail,
            'desa' => $this->faker->city,
            'phone' => $this->faker->phoneNumber,
            'rw' => $this->faker->randomNumber(2),
            'rt' => $this->faker->randomNumber(2),
            'keterangan' => $this->faker->sentence,
            'kp' => $this->faker->cityPrefix,
            'status' => $this->faker->numberBetween(1, 2), // Contoh status dari 1 hingga 5
            'progress' => $this->faker->randomNumber(2),
            'ajuan' => $this->faker->date(),
        ];
    }
}
