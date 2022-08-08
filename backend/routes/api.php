<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IpAddressController;

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

Route::get('/users',[UserController::class, 'index']);
Route::post('/users',[UserController::class, 'store']);
Route::get('/user',[UserController::class, 'show'])->middleware('auth:api');

Route::get('/ip-addresses', [IpAddressController::class, 'index']);
Route::post('/ip-address', [IpAddressController::class, 'store']);
Route::get('/ip-address/{id}', [IpAddressController::class, 'show']);
Route::put('/ip-address', [IpAddressController::class, 'update']);