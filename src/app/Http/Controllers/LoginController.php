<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, true)) {
            $login_user_id = Auth::user()->id;
            $login_user = User::find($login_user_id);
            $login_user->tokens()->delete();
            $login_user->createToken("login:user{$login_user->id}")->plainTextToken;
            return response()->json();
        }
        return response()->json([], 401);
    }

    public function logout(){
        $login_user_id = Auth::user()->id;
        $login_user = User::find($login_user_id);
        $login_user->tokens()->delete();
        auth('web')->logout();
    }

    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email', 'unique:users,email'],
            'first_name' => ['required', 'string', 'max:63'],
            'last_name' => ['required', 'string', 'max:63'],
            'password' => ['required', 'max:31', 'min:8', 'regex:/[a-z]/', 'regex:/[A-Z]/', 'regex:/[0-9]/', 'regex:/[-_]/',],
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->toArray();
            $response['errors'] = ['email' => [], 'first_name' => [], 'last_name' => [], 'password' => []];
            foreach ($errors as $error_key => $error) {
                $response['errors'][$error_key] = $error;
            };
            return response()->json($response, 401);
        }

        User::create([
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'password' => Hash::make($request->password),
        ]);
    }

    public function getLoginUser(Request $request){
        $login_user = Auth::user();
        return response()->json($login_user);
    }
}
