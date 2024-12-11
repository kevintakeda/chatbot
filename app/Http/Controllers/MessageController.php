<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Services\Gemini;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MessageController extends Controller
{
    protected $geminiService;
    public function __construct(Gemini $geminiService)
    {
        $this->geminiService = $geminiService;
    }

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

        try {
            $systemMessageContent = $this->geminiService->generateContent($request->content);
        } catch (\Exception $e) {
            logger()->error('Failed to generate content: ' . $e->getMessage());
            $systemMessageContent = 'Your message has been received.';
        }


        $systemMessage = Message::create([
            'content' => $systemMessageContent,
            'user_id' => Auth::id(),
            'is_system' => true,
        ]);

        return self::index();
    }
}
