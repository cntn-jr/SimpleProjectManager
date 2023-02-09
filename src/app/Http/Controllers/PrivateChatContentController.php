<?php

namespace App\Http\Controllers;

use App\Models\PrivateChatContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PrivateChatContentController extends Controller
{
    public function index($room_id){
        $private_chat_content_model = new PrivateChatContent();
        $chat_contents = $private_chat_content_model->getChatContents($room_id);
        return response()->json($chat_contents);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'room_id' => ['required', 'exists:private_chat_rooms,id',],
            'content' => ['string', 'max:63',],
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->toArray();
            $response['errors'] = ['room_id' => [], 'user_id' => [], 'content' => [],];
            foreach ($errors as $error_key => $error) {
                $response['errors'][$error_key] = $error;
            };
            return response()->json($request, 401);
        }
        $login_user = Auth::user();
        $user_id = $login_user->id;
        $new_content = new PrivateChatContent();
        $new_content->room_id = $request->room_id;
        $new_content->user_id = $user_id;
        $new_content->content = $request->content;
        $new_content->save();
    }
}
