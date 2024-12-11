<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Auth;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'user_id'];

    // Define relationship with User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $casts = [
        'is_system' => 'boolean',
    ];

    public static function createSystemMessage(string $content)
    {
        $systemMessage = new self();
        $systemMessage->content = $content;
        $systemMessage->user_id = Auth::id();
        $systemMessage->is_system = true;
        $systemMessage->save();

        return $systemMessage;
    }
}
