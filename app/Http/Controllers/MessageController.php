<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::with('user')
            ->orderBy('created_at')
            ->orderBy('id')
            ->get();
        return Inertia::render('Chat', ['messages' => $messages]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:4096'
        ]);

        $message = Message::create([
            'content' => $request->content,
            'user_id' => Auth::id(),
            'is_system' => false,
        ]);

        $systemMessage = Message::create([
            'content' => 'Your message has been received.',
            'user_id' => Auth::id(),
            'is_system' => true,
        ]);

        return self::index();
    }
}
