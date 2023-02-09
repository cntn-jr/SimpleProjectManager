<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class PrivateChatContent extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'room_id',
        'content',
    ];

    public function getChatContents($room_id)
    {
        $chat_content = DB::table('private_chat_contents')->select(['private_chat_contents.id as content_id', 'room_id', 'content', 'private_chat_contents.created_at as content_created_at', 'first_name', 'last_name'])->where('room_id', $room_id)->latest('private_chat_contents.created_at')->join('users', 'users.id', '=', 'private_chat_contents.user_id')->get();
        return $chat_content;
    }
}
