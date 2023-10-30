<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Intervention\Image\Facades\Image as Image;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'other_name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static function upload_img($imgCollections, $prefixFileName, $model, $field)
    {
        $latest_Photo_ids = [];
        foreach ($imgCollections as $key => $value) {

            $fileNameWithExt = $value->getClientOriginalName();

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
                if ($lowerCaseExt == "png") {
                    $new_image = imagecreatefrompng($value);
                }
                if ($lowerCaseExt == "jpg" || $lowerCaseExt == "jpeg") {
                    $new_image = imagecreatefromjpeg($value);
                }
                if ($lowerCaseExt == "gif") {
                    $new_image = imagecreatefromgif($value);
                }
                //
                //smaller resolution
                list($width, $height) = getimagesize($value);
                $new_width = 900;
                $new_height = ($height / $width) * 900;
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
                            // imagejpeg($img_rotate, $path, 100);
                        }
                    }
                }
                $newLook_img = $img_rotate != "" ? $img_rotate : $tmp_image;
                //  create new look for image from form
                imagejpeg($newLook_img, $path, 100);
                imagedestroy($new_image);
                imagedestroy($newLook_img);

                // $model->update([
                //     $field => $finalNameToStore,
                // ]);
                $model->$field =  $finalNameToStore;
                $model->save();
            }
        }
    }
}
