<?php

namespace Database\Seeders;

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
            'first_name' => '河原',
            'last_name' => '太郎',
            'password' => Hash::make('password'),
            'email' => 'example@example.com',
        ]);
        DB::table('users')->insert([
            'id' => 2,
            'first_name' => '河原',
            'last_name' => '雅哉',
            'password' => Hash::make('password'),
            'email' => 'example2@example.com',
        ]);
        DB::table('users')->insert([
            'id' => 3,
            'first_name' => '河原',
            'last_name' => '誠一郎',
            'password' => Hash::make('password'),
            'email' => 'example3@example.com',
        ]);DB::table('users')->insert([
            'id' => 4,
            'first_name' => '西田',
            'last_name' => '太郎',
            'password' => Hash::make('password'),
            'email' => 'example4@example.com',
        ]);DB::table('users')->insert([
            'id' => 5,
            'first_name' => '清水',
            'last_name' => '太郎',
            'password' => Hash::make('password'),
            'email' => 'example5@example.com',
        ]);
    }
}
