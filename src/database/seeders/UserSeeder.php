<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'id' => 1,
            'first_name' => '太郎',
            'last_name' => '河原',
            'password' => Hash::make('password'),
            'email' => 'example@example.com',
        ]);
        User::factory()->count(10)->create();
    }
}
