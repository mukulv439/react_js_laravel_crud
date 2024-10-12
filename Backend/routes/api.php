<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
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

Route::middleware('admin')->group(function () {
    Route::post('/flights', [FlightController::class, 'addFlight']);
});

Route::get('/flights', [FlightController::class, 'index']); // Read all flights
Route::get('/flights/{id}', [FlightController::class, 'show']); // Read a single flight
Route::post('/flights', [FlightController::class, 'store']); // Create a new flight
Route::put('/flights/{id}', [FlightController::class, 'update']); // Update an existing flight
Route::delete('/flights/{id}', [FlightController::class, 'destroy']); // Delete a flight

Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);