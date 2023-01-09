<?php

namespace Database\Factories;

use App\Models\PrivateChatContent;
use App\Models\PrivateChatRoom;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

class PrivateChatContentFactory extends Factory
{

    protected $model = PrivateChatContent::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $last_room = DB::table('private_chat_rooms')->orderBy('id', "desc")->get();
        $room_id = $this->faker->numberBetween(1, $last_room[0]->id);
        $private_chat_room = PrivateChatRoom::find($room_id);
        $user_id = "";
        // メッセージを送ったユーザをランダムで選択する
        if($this->faker->boolean()){
            $user_id = $private_chat_room->user1_id;
        }else{
            $user_id = $private_chat_room->user2_id;
        }
        $content_num = $this->faker->numberBetween(10, 20);
        $created_at = $this->faker->dateTimeBetween("-6month", "+6month");
        return [
            'room_id' => $room_id,
            'content' => $this->faker->realText($content_num),
            'user_id' => $user_id,
            'created_at' => $created_at,
            'updated_at' => $created_at,
        ];
    }
}
