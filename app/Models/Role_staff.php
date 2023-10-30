<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role_staff extends Model
{
    use HasFactory;

    protected $table = 'role_staff';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'staff_id',
        'role_id',
    ];
    public function staff()
    {
        return $this->belongsTo(Staff::class, 'staff_id');
    }
    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }
}
