<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Login\AdminLoginController;
use App\Http\Controllers\Login\UserLoginController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['guest'])->group(function () {
    Route::view('/', 'welcome')->name('welcome');
    Route::post('/login', [UserLoginController::class, 'login']);
    // Route::post('/ap_status', [GuestController::class, 'ap_status']);
});

Route::middleware(
    ['auth:admin,staff']
    /**no whitespace in the middleware array */
)->group(function () {
    //admin
    Route::view('/super/staff/{id}', 'dashboard.admin'); //bookmarkable
    Route::view('/super/department/{id}', 'dashboard.admin'); //bookmarkable
    Route::view('/super/faculty/{id}', 'dashboard.admin'); //bookmarkable
    Route::view('/super/edit/file/{id}', 'dashboard.admin'); //bookmarkable
    Route::view('/edit/file/{id}', 'dashboard.admin'); //bookmarkable
    //staff
    Route::view('/staff/{id}', 'dashboard.staff'); //bookmarkable
    Route::view('/department/{id}', 'dashboard.staff'); //bookmarkable
    Route::view('/faculty/{id}', 'dashboard.staff'); //bookmarkable
    //admins and staffs
    Route::post('/get_counts', [AuthController::class, 'get_counts']);
    Route::post('/get_staffs', [AuthController::class, 'get_staffs']);
    Route::post('/get_faculties', [AuthController::class, 'get_faculties']);
    Route::post('/get_departments', [AuthController::class, 'get_departments']);
    Route::post('/get_files', [AuthController::class, 'get_files']);
    Route::post('/create_file', [AuthController::class, 'create_file']);
    Route::post('/delete_file', [AuthController::class, 'delete_file']);
    Route::post('/edit_file', [AuthController::class, 'edit_file']);
    Route::post('/searchStaffs', [AuthController::class, 'searchStaffs']);
    Route::post('/forward_file', [AuthController::class, 'forward_file']);
    Route::post('/get_file_expresses', [AuthController::class, 'get_file_expresses']);
    Route::post('/get_file_forwarded', [AuthController::class, 'get_file_forwarded']);
    Route::post('/get_file_received', [AuthController::class, 'get_file_received']);
    Route::post('/get_archive_files', [AuthController::class, 'get_archive_files']);
    Route::post('/get_deleted_files', [AuthController::class, 'get_deleted_files']);
    Route::post('/archive_file', [AuthController::class, 'archive_file']);
    Route::post('/restore_file', [AuthController::class, 'restore_file']);
    Route::post('/upload_dp', [AuthController::class, 'upload_dp']);
    Route::post('/edit_staff', [AuthController::class, 'edit_staff']);

    Route::post('/get_staff', [AuthController::class, 'get_staff']);
    Route::post('/get_file', [AuthController::class, 'get_file']);
    Route::post('/get_faculty', [AuthController::class, 'get_faculty']);
    Route::post('/get_department', [AuthController::class, 'get_department']);
    Route::post('/put_contents', [AuthController::class, 'put_contents']);
    Route::post('/get_roles', [AuthController::class, 'get_roles']);
});

// admin routes
Route::prefix('super')->group(function () {

    Route::middleware(['guest:admin'])->group(function () {
        Route::view('/', 'welcome')->name('admin_login');;
        Route::post('/login', [AdminLoginController::class, 'login']);
    });

    Route::middleware(['auth:admin'])->group(function () {
        Route::get('/logout', [AdminController::class, 'logout']);
        Route::view('/dashboard', 'dashboard.admin');
        Route::view('/profile', 'dashboard.admin');
        Route::view('/staffs', 'dashboard.admin');
        Route::view('/files', 'dashboard.admin');
        Route::view('/archives', 'dashboard.admin');
        Route::view('/express', 'dashboard.admin');
        Route::view('/trash', 'dashboard.admin');
        Route::view('/settings', 'dashboard.admin');
        Route::view('/faculties', 'dashboard.admin');
        Route::view('/departments', 'dashboard.admin');
        Route::post('/get_super', [AdminController::class, 'get_super']);

        Route::post('/new_staff', [AdminController::class, 'new_staff']);
        Route::post('/new_faculty', [AdminController::class, 'new_faculty']);
        Route::post('/new_department', [AdminController::class, 'new_department']);
        Route::post('/new_role', [AdminController::class, 'new_role']);
        Route::post('/edit_role', [AdminController::class, 'edit_role']);
        Route::post('/delete_role', [AdminController::class, 'delete_role']);
        Route::post('/assing_remove_role', [AdminController::class, 'assing_remove_role']);
        Route::post('/delete_dept', [AdminController::class, 'delete_dept']);
        Route::post('/update_dept', [AdminController::class, 'update_dept']);
        Route::post('/delete_faculty', [AdminController::class, 'delete_faculty']);
        Route::post('/update_faculty', [AdminController::class, 'update_faculty']);
        Route::post('/delete_staff', [AdminController::class, 'delete_staff']);
    });
});
//staff routes
Route::middleware(['auth:staff'])->group(function () {
    Route::view('/dashboard', 'dashboard.staff');
    Route::view('/profile', 'dashboard.staff');
    Route::view('/staffs', 'dashboard.staff');
    Route::view('/files', 'dashboard.staff');
    Route::view('/archives', 'dashboard.staff');
    Route::view('/express', 'dashboard.staff');
    Route::view('/trash', 'dashboard.staff');
    Route::view('/settings', 'dashboard.staff');
    Route::view('/faculties', 'dashboard.staff');
    Route::view('/departments', 'dashboard.staff');
    Route::view('/settings', 'dashboard.staff');

    Route::get('/logout', [UserController::class, 'logout']);
    Route::post('/get_staff', [UserController::class, 'get_staff']);
    Route::post('/update_address', [UserController::class, 'update_address']);
    Route::post('/update_link', [UserController::class, 'update_link']);
    Route::post('/update_cert', [UserController::class, 'update_cert']);
});

// Auth::routes();
