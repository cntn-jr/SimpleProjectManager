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
        $id = 1;
        for($user1_id = 1; $user1_id < 12; $user1_id++){
            for($user2_id = ($user1_id + 1); $user2_id < 12; $user2_id++){
                DB::table('private_chat_rooms')->insert([
                    'id' => $id++,
                    'user1_id' => $user1_id,
                    'user2_id' => $user2_id,
                ]);
            }
        }
    }
}
