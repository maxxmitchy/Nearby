<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::post('register', 'Auth\RegisterController@register');

Route::post('login', 'Auth\LoginController@login')->middleware('verified');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

Route::post('marker', 'MarkerController@index');
Route::post('markerUpload', 'MarkerController@store');
Route::resource('restaurant', 'RestaurantController');
Route::resource('category', 'CategoryController');
Route::resource('dish', 'DishController');
Route::resource('addon', 'AddOnController');
Route::resource('ingredient', 'IngredientController');
Route::get('userrestaurant', 'RestaurantController@getUserRestaurant');
Route::post('userrestaurant/{restaurant}', 'RestaurantController@updateRestaurant');
Auth::routes(['verify' => true]);

Route::get('api/email/verify', 'Auth\VerificationController@show')->name('verification.notice');
Route::get('api/email/verify/{id}', 'Auth\VerificationController@verify')->name('verification.verify');
Route::get('api/email/resend', 'Auth\VerificationController@resend')->name('verification.resend');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
