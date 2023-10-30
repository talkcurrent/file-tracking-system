<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'motto',
        'f_name',
    ];

    public function departments()
    {
        return $this->hasMany(Department::class);
    }

    public function staffs()
    {
        return $this->hasManyThrough(Staff::class, Department::class);
    }
}
