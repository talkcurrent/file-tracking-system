<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'faculty_id',
        'd_name',
        'motto',
    ];

    public function staffs()
    {
        return $this->hasMany(Staff::class);
    }

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }
}
