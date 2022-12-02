<?php

namespace Database\Seeders;

use App\Models\PrivateChatContent;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrivateChatContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PrivateChatContent::factory()->count(30)->create();
    }
}
