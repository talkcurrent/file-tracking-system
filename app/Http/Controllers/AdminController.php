<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Admin;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\Role;
use App\Models\Role_staff;
use App\Models\Secretary;
use App\Models\Staff;
use App\Models\VC;
use App\Traits\AdminLogin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use phpDocumentor\Reflection\Types\Boolean;
use phpDocumentor\Reflection\Types\Self_;

class AdminController extends Controller
{
    use AdminLogin;

    public function get_super()
    {
        $admin = Admin::with(['profile'])
            ->where('id',  Auth::guard('admin')->user()->id)
            ->first();
        echo json_encode($admin);
    }
    public function get_faculties()
    {
        $faculties = Faculty::withCount('departments')
            ->orderBY('id', 'desc')
            ->skip(0)
            ->take(20)
            ->get();
        echo json_encode($faculties);
    }
    public function get_departments()
    {
        $departments = Department::with('faculty')
            ->withCount('staffs')
            ->orderBY('id', 'desc')
            ->skip(0)
            ->take(20)
            ->get();
        echo json_encode($departments);
    }

    public function get_staffs()
    {
        $staffs = Staff::with(['roles', 'addresses', 'profile', 'department', 'links', 'educations'])
            ->orderBY('id', 'desc')
            ->skip(0)
            ->take(20)
            ->get();
        echo json_encode($staffs);
    }

    public function new_faculty()
    {
        $faculty = new Faculty();

        $faculty->f_name = request()->name;
        $faculty->motto = request()->motto;
        $faculty->save();

        echo json_encode("Faculty created successfully!");
    }

    public function new_department()
    {
        $department = new Department();

        $department->faculty_id = request()->faculty_id;
        $department->d_name = request()->name;
        $department->motto = request()->motto;
        $department->save();

        echo json_encode("Department created successfully!");
    }

    public function new_role()
    {
        $role = new Role();

        $role->role_name = request()->role_name;
        $role->role_desc = request()->role_desc;
        $role->save();

        echo json_encode("Role created successfully!");
    }

    public function edit_role()
    {
        $role = Role::find(intval(request()->role_id));

        $role->role_name = request()->role_name;
        $role->role_desc = request()->role_desc;
        $role->save();


        echo json_encode("Role edited successfully!");
    }

    public function update_dept()
    {
        $dept = Department::find(intval(request()->deptId));

        $dept->faculty_id = request()->faculty_id;
        $dept->d_name = request()->name;
        $dept->motto = request()->motto;
        $dept->save();

        $department = Department::with('faculty')
            ->withCount('staffs')
            ->where('id', request()->deptId)
            ->first();

        echo json_encode($department);
    }

    public function update_faculty()
    {
        $faculty = Faculty::find(intval(request()->facultyId));

        $faculty->f_name = request()->name;
        $faculty->motto = request()->motto;
        $faculty->save();

        $faculty = faculty::withCount('departments')
            ->where('id', request()->facultyId)
            ->first();

        echo json_encode($faculty);
    }

    public function delete_role()
    {
        $role = Role::find(intval(request()->role_id));
        $role->delete();

        echo json_encode("Role deleted successfully!");
    }

    public function delete_dept()
    {
        $dept = Department::find(intval(request()->deptId));
        $dept->delete();

        echo json_encode("Department deleted successfully!");
    }

    public function delete_faculty()
    {
        $faculty = Faculty::find(intval(request()->facultyId));
        $faculty->delete();

        echo json_encode("Faculty deleted successfully!");
    }

    public function delete_staff()
    {
        //first remove user from kind of roles
        Role_staff::where('staff_id', request()->staffId)->delete();

        Staff::find(intval(request()->staffId))->delete();

        echo json_encode("Staff deleted successfully!");
    }

    static function hasRole($userId, $roleId)
    {
        return (bool) Role_staff::where('staff_id', $userId)
            ->where('role_id', $roleId)->count();
    }

    public function assing_remove_role(Request $request)
    {
        $to_do = request()->to_do;
        $role_id = request()->role_id;
        $staff_id = request()->staff_id;

        // $role = Role::find(intval($role_id));
        $staff_obj = Staff::find(intval($staff_id));

        $userHasRole = self::hasRole($staff_id, $role_id);

        switch ($to_do) {
            case 'Removing':
                if ($userHasRole) {
                    $staff_obj->roles()->detach(intval($role_id));
                }
                $staff = Staff::with(['roles', 'addresses', 'profile', 'department', 'links', 'educations'])
                    ->where('id', $staff_id)->first();

                echo json_encode($staff);
                break;
            case 'Assigning':
                if (!$userHasRole) {
                    $staff_obj->roles()->attach(intval($role_id));
                }
                $staff =  Staff::with(['roles', 'addresses', 'profile', 'department', 'links', 'educations'])
                    ->where('id', $staff_id)->first();

                echo json_encode($staff);
                break;
        }
    }

    public function new_staff()
    {
        $staff = new Staff();

        $staff->department_id = request()->department_id;
        $staff->first_name = request()->first_name;
        $staff->last_name = request()->last_name;
        $staff->other_name = request()->other_name;
        $staff->phone_no = request()->phone_num;
        $staff->email = request()->e_mail;
        $staff->gender = request()->gender;
        $staff->password = Hash::make("staff");
        $staff->save();

        $staff->addresses()->create([
            "description" => request()->address1,
        ]);
        $staff->addresses()->create([
            "description" => request()->address2,
        ]);
        $staff->links()->create([
            "description" => "facebook",
            "url" => request()->facebook,
        ]);
        $staff->links()->create([
            "description" => "instagram",
            "url" => request()->instagram,
        ]);
        $staff->links()->create([
            "description" => "twitter",
            "url" => request()->twitter,
        ]);
        $staff->links()->create([
            "description" => "linkedIn",
            "url" => request()->linkedIn,
        ]);
        $staff->links()->create([
            "description" => "website",
            "url" => request()->website,
        ]);

        $staff->educations()->create([
            "institution" => request()->institution,
            "cert_awarded" => request()->cert_awarded,
            "yr_of_grad" => request()->yr_of_grad,
        ]);

        $staff->profile()->create([
            "dp" => request()->gender == "male" ? "imageboy.jpg" : "imagegirl.jpg",
            "work" => request()->work,
            "biography" => request()->biography,
        ]);

        echo json_encode($staff);
    }
}
