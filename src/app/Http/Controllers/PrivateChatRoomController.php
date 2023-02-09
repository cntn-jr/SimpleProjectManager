<?php

namespace App\Http\Controllers;

use App\Models\PrivateChatRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PrivateChatRoomController extends Controller
{
    public function index(){
        $login_user = Auth::user();
        $user_id = $login_user->id;
        $private_chat_room_model = new PrivateChatRoom();
        $user1_ids = $private_chat_room_model->getRooms($user_id);
        return response()->json($user1_ids);
    }
}
