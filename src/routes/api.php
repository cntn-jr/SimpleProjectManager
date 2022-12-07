<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', 'App\Http\Controllers\LoginController@login');
Route::post('signup', 'App\Http\Controllers\LoginController@signup');
Route::post('logout', 'App\Http\Controllers\LoginController@logout');
Route::get('user', 'App\Http\Controllers\LoginController@getLoginUser');
Route::get('isAuth', 'App\Http\Controllers\LoginController@isAuth');


Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('home', 'App\Http\Controllers\HomeController@index');
    Route::get('task', 'App\Http\Controllers\TaskController@index');
    Route::get('task/finished', 'App\Http\Controllers\TaskController@getFinishedTask');
    Route::post('task/store', 'App\Http\Controllers\TaskController@store');
    Route::put('task/update', 'App\Http\Controllers\TaskController@update');
    Route::put('task/finish', 'App\Http\Controllers\TaskController@finish');
    Route::put('task/delete', 'App\Http\Controllers\TaskController@delete');
    Route::get('schedules', 'App\Http\Controllers\ScheduleController@index');
    Route::post('schedule/store', 'App\Http\Controllers\ScheduleController@store');
    Route::put('schedule/update', 'App\Http\Controllers\ScheduleController@update');
    Route::put('schedule/delete', 'App\Http\Controllers\ScheduleController@delete');
    Route::get('room/private', 'App\Http\Controllers\PrivateChatRoomController@index');
    Route::get('room/{id}/content', 'App\Http\Controllers\PrivateChatContentController@index');
});
