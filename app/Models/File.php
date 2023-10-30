<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'created_by',
        'tracking_id',
        'content',
        'deleted',
        'forwarded',
    ];

    public function archives()
    {
        return $this->belongsToMany(Archive::class, 'archive_file')->withTimestamps();
    }
    public function expresses()
    {
        return $this->hasMany(Express::class);
    }

    public function editors()
    {
        return $this->hasMany(Editor::class);
    }

    public function creator()
    {
        return $this->belongsTo(Admin::class, 'created_by');
    }
}
