<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class PrivateChatRoom extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user1_id',
        'user2_id',
        // 'project_id',
    ];

    public function getRooms($user_id)
    {
        // user1_idのユーザと同じチャットルームの相手ユーザを取得
        $rooms1 = DB::table('private_chat_rooms')->select('private_chat_rooms.id as room_id', 'users2.first_name', 'users2.last_name',)->where('user1_id', $user_id)->join('users as users2', 'private_chat_rooms.user2_id', '=', 'users2.id')->get();
        // user2_idのユーザと同じチャットルームの相手ユーザを取得
        $rooms2 = DB::table('private_chat_rooms')->select('private_chat_rooms.id as room_id', 'users1.first_name', 'users1.last_name',)->where('user2_id', $user_id)->join('users as users1', 'private_chat_rooms.user1_id', '=', 'users1.id')->get();
        // 結合
        $rooms = [...$rooms1, ...$rooms2];
        return $rooms;
    }
}
