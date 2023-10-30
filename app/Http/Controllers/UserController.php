<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Education;
use App\Models\Link;
use App\Models\Staff;
use App\Traits\Query;
use App\Traits\VcLogin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    use Query, VcLogin;

    public function get_staff()
    {
        $user = Staff::with(['roles', 'addresses', 'profile', 'department', 'links', 'educations'])
            ->where('id',  Auth::guard('staff')->user()->id)
            ->first();
        echo json_encode($user);
    }

    public function update_address()
    {
        Address::where('id', request()->addressId)->update([
            "description" => request()->description,
        ]);

        echo json_encode("Address updated successfully");
    }

    public function update_link()
    {
        Link::where('id', request()->id)->update([
            "url" => request()->url,
        ]);

        echo json_encode("Link updated successfully");
    }

    public function update_cert()
    {
        switch (request()->todo) {
            case 'edit':
                Education::where('id', request()->id)->update([
                    "institution" => request()->institution,
                    "cert_awarded" => request()->cert_awarded,
                    "yr_of_grad" => request()->yr_of_grad,
                ]);
                echo json_encode("Certificate updated successfully");
                break;

            default:
                Auth::guard('staff')->user()->educations()->create([
                    "institution" => request()->institution,
                    "cert_awarded" => request()->cert_awarded,
                    "yr_of_grad" => request()->yr_of_grad,
                ]);
                echo json_encode("Certificate added successfully");
                break;
        }
    }
}
