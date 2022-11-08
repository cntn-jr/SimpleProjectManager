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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'api'], function () {
    Route::get('home', 'App\Http\Controllers\HomeController@index');
    Route::get('task', 'App\Http\Controllers\TaskController@index');
    Route::post('task/store', 'App\Http\Controllers\TaskController@store');
    Route::put('task/finish', 'App\Http\Controllers\TaskController@finish');
    Route::put('task/delete', 'App\Http\Controllers\TaskController@delete');
});
