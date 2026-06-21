<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', function () {
    $users = \App\Models\User::all();
    return response()->json($users);
});

Route::get('/users/{id}', function ($id) {
    $user = \App\Models\User::find($id);
    if (!$user) {
        return response()->json([
            'message' => 'User not found'
        ], 404);
    }
    return response()->json($user);
});

Route::put('/users/{id}', function (Request $request, $id) {
    $user = \App\Models\User::find($id);
    if (!$user) {
        return response()->json([
            'message' => 'User not found'
        ], 404);
    }
    $request->validate([
        'name'  => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $id,
    ]);
    $user->update([
        'name'  => $request->name,
        'email' => $request->email,
    ]);
    return response()->json([
        'message' => 'User updated successfully',
        'user'    => $user
    ]);
});

Route::delete('/users/{id}', function ($id) {
    $user = \App\Models\User::find($id);
    if (!$user) {
        return response()->json([
            'message' => 'User not found'
        ], 404);
    }
    $user->delete();
    return response()->json([
        'message' => 'User deleted successfully'
    ]);
});