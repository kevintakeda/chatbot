<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'user_id'];

    // Define relationship with User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
