<?php

namespace App\Http\Controllers;

use App\Models\PrivateChatContent;
use Illuminate\Http\Request;

class PrivateChatContentController extends Controller
{
    public function index($room_id){
        $private_chat_content_model = new PrivateChatContent();
        $chat_contents = $private_chat_content_model->getChatContents($room_id);
        return response()->json($chat_contents);
    }
}
