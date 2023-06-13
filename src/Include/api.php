<?php

use App\Http\Controllers\ApiPropertyController;
use App\Http\Controllers\ApiUserController;
use Illuminate\Support\Facades\Route; 
use Illuminate\Http\Request;

Route::get('/property', [ApiPropertyController::class, 'property']);
Route::get('/oneproperty', [ApiPropertyController::class, 'getOneProperty']);
Route::get('/buy', [ApiPropertyController::class, 'buy']);
Route::get('/rent', [ApiPropertyController::class, 'rent']);
Route::get('/properties', [ApiPropertyController::class, 'search_property']);
Route::post('/addProperty', [ApiPropertyController::class, 'storeProperty']);
Route::get('/user_property', [ApiPropertyController::class, 'user_property']);
Route::get('/oneupdateproperty', [ApiPropertyController::class, 'oneproperty']);
Route::get('/deleteProperty', [ApiPropertyController::class, 'deleteProperty']);
Route::post('/send_mail_to_owner', [ApiPropertyController::class, 'send_mail_to_owner']);
Route::post('/i_am_interested', [ApiPropertyController::class, 'i_am_interested']);
Route::post('/recently_view', [ApiPropertyController::class, 'recently_view']);


Route::post('/adduser', [ApiUserController::class, 'store']);
Route::post('/userupdate', [ApiUserController::class, 'update']);
Route::get('/user_name_img', [ApiUserController::class, 'user_name_img']);

Route::get('/test1', function(){
    return "hello";
});




