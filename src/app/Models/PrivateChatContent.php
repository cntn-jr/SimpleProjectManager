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
        $chat_content = DB::table('private_chat_contents')->select(['id', 'room_id', 'content', 'created_at'])->where('room_id', $room_id)->latest('created_at')->get();
        return $chat_content;
    }
}
