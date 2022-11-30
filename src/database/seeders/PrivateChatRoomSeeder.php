<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrivateChatRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('private_chat_rooms')->insert([
            'id' => 1,
            'user1_id' => 1,
            'user2_id' => 2,
        ]);
        DB::table('private_chat_rooms')->insert([
            'id' => 2,
            'user1_id' => 1,
            'user2_id' => 3,
        ]);
        DB::table('private_chat_rooms')->insert([
            'id' => 3,
            'user1_id' => 1,
            'user2_id' => 4,
        ]);
        DB::table('private_chat_rooms')->insert([
            'id' => 4,
            'user1_id' => 1,
            'user2_id' => 5,
        ]);
    }
}
