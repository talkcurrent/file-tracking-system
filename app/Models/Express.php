<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Express extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'file_id',
        'forwarder_id',
        'forwarder_type',
        'receiver_id',
        'receiver_type',
        'accepted',
    ];

    public function receiver()
    {
        return $this->morphTo();
    }
    public function forwarder()
    {
        return $this->morphTo();
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
