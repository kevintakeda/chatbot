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
        $messages = Message::with('user')->latest()->get();
        return Inertia::render('Messages/Index', ['messages' => $messages]);
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

        return response()->json(['message' => $message]);
    }
}
