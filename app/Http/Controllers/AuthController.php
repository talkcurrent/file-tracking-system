<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Department;
use App\Models\Express;
use App\Models\Faculty;
use App\Models\File;
use App\Models\Role;
use App\Models\Staff;
use App\Traits\Query;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class AuthController extends Controller
{
    use Query;
    //
    public function get_faculties()
    {
        $faculties = Faculty::withCount('departments')
            ->orderBY('id', 'desc')
            ->skip(0)
            ->take(20)
            ->get();
        echo json_encode($faculties);
    }

    public function get_counts()
    {
        $staff_count = Staff::count();
        $archive_count = File::where('archived', true)->count();
        $file_count = File::count();

        echo json_encode([
            "staff_count" => $staff_count,
            "archive_count" => $archive_count,
            "file_count" => $file_count,
        ]);
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

    public function get_files()
    {
        // dd();
        $files = File::with(['creator.profile'])
            ->where('deleted', false)
            ->where('archived', false)
            ->orderBY('id', 'desc')
            ->skip(0)
            ->take(20)
            ->get();
        echo json_encode($files);
    }

    public function get_roles()
    {
        // dd();
        $roles = Role::all();
        echo json_encode($roles);
    }

    public function get_file_expresses()
    {
        //file movements. From creator down to editors
        $id = request()->id;
        $files = Express::with([
            'receiver.profile',
            'forwarder.profile',
            'file'
        ])->where('file_id', $id)
            ->orderBY('id', 'asc')
            ->skip(0)
            ->take(20)
            ->get();

        echo json_encode($files);
    }
    public function get_file_forwarded()
    {
        $guard = request()->guard;
        $files = File::with([
            'expresses', 'creator.profile'
        ])->whereHas(
            'expresses',
            fn ($query) => $query
                ->where('forwarder_id', Auth::guard()->user($guard)->id)
                ->where('forwarder_type', get_class(Auth::guard($guard)->user()))
        )
            ->where('archived', false)
            ->where('deleted', false)
            ->orderBY('id', 'desc')
            ->skip(0)
            ->take(20)
            ->get();

        echo json_encode($files);
    }

    public function get_file_received()
    {
        $guard = request()->guard;
        // dd(Hash::make("admin"));

        if ($guard == "admin") {
            $files = File::with([
                'expresses', 'creator.profile'
            ])
                ->whereHas(
                    'expresses',
                    fn (Builder $query) => $query
                        ->where('forwarded', false)
                        ->where('receiver_id', Auth::guard($guard)->user()->id)
                        ->where('receiver_type', get_class(Auth::guard($guard)->user()))
                )
                ->orDoesntHave('expresses')
                ->where('archived', false)
                ->where('deleted', false)
                ->orderBY('id', 'desc')
                ->skip(0)
                ->take(20)
                ->get();
        } else {
            $files = File::with([
                'expresses', 'creator.profile'
            ])->whereHas(
                'expresses',
                fn ($query) => $query
                    ->where('forwarded', false)
                    ->where('receiver_id', Auth::guard($guard)->user()->id)
                    ->where('receiver_type', get_class(Auth::guard($guard)->user()))
            )
                ->where('archived', false)
                ->where('deleted', false)
                ->orderBY('id', 'desc')
                ->skip(0)
                ->take(20)
                ->get();
        }

        echo json_encode($files);
    }

    public function get_file()
    {
        $id = request()->id;

        $file = File::where('id', $id)
            ->where('archived', false)
            ->where('deleted', false)
            ->first();

        echo json_encode($file);
    }

    public function edit_file()
    {
        $id = request()->id;
        $content = request()->content;
        $title = request()->title;

        File::where('id', $id)
            ->update([
                "content" => $content,
                "title" => $title,
            ]);

        echo json_encode("Success!");
    }

    public function archive_file()
    {
        $id = request()->id;
        $file = File::with(['creator', 'expresses.receiver'])
            ->where('id', $id)
            ->where('deleted', false)
            ->first();

        $html = Self::replace_img_src($file->content);
        $pdf_name = $file->id . "_" . strtoupper(implode("_", explode(" ", $file->title))) . ".pdf";
        PDF::loadHTML($html)->save("storage/pdf/$pdf_name");

        //mark archive true
        $file->archived = true;
        $file->save();

        echo json_encode("Success");
    }

    public function get_archive_files()
    {
        $files = File::with(['creator', 'expresses.receiver'])
            ->where('archived', true)
            ->get();

        echo json_encode($files);
    }

    public function get_deleted_files()
    {
        $files = File::with(['creator', 'expresses.receiver'])
            ->where('deleted', true)
            ->get();

        echo json_encode($files);
    }

    public function restore_file()
    {
        $id = request()->id;
        $file = File::find(intval($id));

        $file->deleted = 0;
        $file->save();

        echo json_encode("Successfully restored!");
    }

    public function searchStaffs(Request $request)
    {
        // dd(Auth::guard()->user());
        $searchKeys = request()->searchKeys;
        $guard = request()->guard;
        // DB::statement('ALTER TABLE staff ADD FULLTEXT search(first_name, last_name, other_name)');
        // DB::statement('ALTER TABLE departments ADD FULLTEXT search(d_name)');

        $staffs = Staff::with(['roles', 'addresses', 'profile', 'department', 'links', 'educations'])
            ->whereRaw(
                'MATCH(first_name, last_name, other_name) AGAINST(? IN BOOLEAN MODE)',
                array(self::h_wildcards($searchKeys))
            )
            ->orWhereHas(
                'department',
                fn ($query) =>
                $query->where('d_name', 'Like', '%' . $searchKeys . '%')
            )
            ->where('id', '!=', Auth::guard($guard)->user()->id)
            ->skip(0)
            ->take(20)
            ->get();
        echo json_encode($staffs);
    }

    public function forward_file()
    {
        $staffId = request()->staffId;
        $fileId = request()->fileId;
        $model = request()->model;
        $guard = request()->guard;
        $admin = Admin::find(intval($staffId));
        $staff = Staff::find(intval($staffId));

        //mark received file true first before forwarding to another staff
        Express::where('file_id', intval($fileId))
            ->where('receiver_id', Auth::guard($guard)->user()->id)
            ->where('receiver_type', get_class(Auth::guard($guard)->user()))
            ->where('forwarded', false)
            ->update([
                'forwarded' => true
            ]);

        switch ($model) {
            case 'admin':
                $admin->received()->create([
                    'file_id' => intval($fileId),
                    'forwarder_id' => Auth::guard($guard)->user()->id,
                    'forwarder_type' => get_class(Auth::guard($guard)->user()),
                ]);

                break;
            case 'staff':
                $staff->received()->create([
                    'file_id' => intval($fileId),
                    'forwarder_id' => Auth::guard($guard)->user()->id,
                    'forwarder_type' => get_class(Auth::guard($guard)->user()),
                ]);
                break;
        }

        echo json_encode("Success!");
    }
    public function get_staff()
    {
        $id = request()->id;

        $staff = Staff::with(['roles', 'addresses', 'profile', 'department', 'links', 'educations'])
            ->where('id', $id)
            ->first();
        echo json_encode($staff);
    }

    public function get_faculty()
    {
        $id = request()->id;
        $faculty = Faculty::with(["departments" => function ($query) {
            $query->withCount('staffs');
        }])
            ->withCount('departments')
            ->where('id', $id)
            ->first();
        echo json_encode($faculty);
    }

    public function get_department()
    {
        $id = request()->id;
        $department = Department::with([
            'faculty',
            'staffs' //this staffs relationship needs to be limited to 10 or so to enable fast load
        ])->withCount('staffs')
            ->where('id', $id)
            ->first();
        echo json_encode($department);
    }

    public function create_file(Request $request)
    {
        $guard = request()->guard;
        $creator =  Auth::guard($guard)->user();
        $title = request()->title;
        $content = request()->content;
        $tracking_id = strtoupper(self::generateRandChars($title, 10));

        $file = new File();
        $file->title = $title;
        $file->created_by = $creator->id;
        $file->tracking_id = $tracking_id;
        $file->content = $content;
        $file->save();

        echo json_encode("Success!");
    }

    public function delete_file(Request $request)
    {
        $id = request()->id;
        $file = File::find(intval($id));
        $file->deleted = true;
        $file->save();

        echo json_encode("File successfully deleted!");
    }

    public function put_contents(Request $request)
    {
        $imgCollections = request()->imgCollections;
        if ($request->hasFile('imgCollections')) {
            list($uploadPath, $file_name) = $this->upload_img($imgCollections, "content");
        }
        echo json_encode($uploadPath);
    }

    public function upload_dp(Request $request)
    {
        $imgCollections = request()->imgCollections;
        $guard = request()->guard;
        $user = Auth::guard($guard)->user();

        // dd(request()->imgCollections);
        if ($request->hasFile('imgCollections')) {
            list($uploadPath, $file_name) = $this->upload_img($imgCollections, "dp");
            $user->profile()->update([
                "dp" => $file_name
            ]);
        }
        echo json_encode("Profile updated!");
    }

    public function edit_staff(Request $request)
    {
        $staff =  Staff::find(intval(Auth::guard('staff')->user()->id));

        $staff->first_name = request()->first_name;
        $staff->last_name = request()->last_name;
        $staff->other_name = request()->other_name;
        $staff->phone_no = request()->phone_num;
        $staff->email = request()->e_mail;
        $staff->gender = request()->gender;
        $staff->save();

        $staff->profile()->update([
            "work" => request()->work,
            "biography" => request()->biography,
        ]);
        echo json_encode("Profile updated!");
    }

    static function upload_img($imgCollections, $prefixFileName)
    {
        foreach ($imgCollections as $key => $value) {

            $fileNameWithExt = $value->getClientOriginalName();

            //     $path = 'images/V.png';
            // $path = public_path("storage/video/$finalNameToStore");
            // $type = pathinfo($path, PATHINFO_EXTENSION);
            // $data = file_get_contents($path);
            // $logo = 'data:image/' . $type . ';base64,' . base64_encode($data);

            $arrayName_ext = explode(".", $fileNameWithExt);
            $fileName = $arrayName_ext[0];
            $extension = end($arrayName_ext);
            $lowerCaseExt = strToLower($extension);
            $allowed_ext = ["png", "jpg", "PNG", "GIF", "gif", "JPG", "jpeg", "JPEG"];

            if (in_array($lowerCaseExt, $allowed_ext)) {
                $fileName = pathInfo($fileNameWithExt, PATHINFO_FILENAME);

                $fileNameToStore = $prefixFileName . '_' . time() . '_' . md5($fileName) . '_' . $key . '.' . $lowerCaseExt;
                $finalNameToStore = str_replace([' ', ':', ';', '\'', '-', ',', '/', '<'], '', $fileNameToStore);
                $path = $value->storeAs('storage/image', $finalNameToStore);
                $new_image = '';
                list($width, $height) = getimagesize($value);

                if ($lowerCaseExt == "png") {
                    $new_image = imagecreatefrompng($value);
                }
                if ($lowerCaseExt == "jpg" || $lowerCaseExt == "jpeg") {
                    $new_image = imagecreatefromjpeg($value);
                }
                if ($lowerCaseExt == "gif") {
                    $new_image = imagecreatefromgif($value);
                }

                $new_width = 500;
                $new_height = ($height / $width) * 500;
                $tmp_image = imagecreatetruecolor($new_width, $new_height);

                imagealphablending($tmp_image, true);
                imagesavealpha($tmp_image, true);
                $red = imagecolorallocate($tmp_image, 255, 0, 0);
                $white = imagecolorallocate($tmp_image, 255, 255, 255);
                imagefill($tmp_image, 0, 0, $white);

                // Make the background transparent
                imagecolortransparent($tmp_image, $white);

                imagecopyresampled($tmp_image, $new_image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
                //image intervention way
                $exif = Image::make($value)->exif();
                //Procedural way
                // $exif = exif_read_data($_FILES['imgCollections']['tmp_name'][$key],  "IFD0");
                //
                $img_rotate = "";
                if ($exif && isset($exif['Orientation'])) {
                    $orientation = $exif['Orientation'];
                    if ($orientation != 1) {
                        $deg = 0;
                        switch ($orientation) {
                            case 3:
                                $deg = 180;
                                break;
                            case 6:
                                $deg = 270;
                                break;
                            case 8:
                                $deg = 90;
                                break;
                        }
                        if ($deg) {
                            $img_rotate = imagerotate($tmp_image, $deg, 0);
                        }
                    }
                }
                $newLook_img = $img_rotate != "" ? $img_rotate : $tmp_image;
                //  create new look for image from form
                imagejpeg($newLook_img, $path, 100);
                imagedestroy($new_image);
                imagedestroy($newLook_img);
            }
        }
        return [$path, $finalNameToStore];
    }
}
