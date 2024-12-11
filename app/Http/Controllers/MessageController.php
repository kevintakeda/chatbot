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

        $messages = Message::with('user')
            ->orderBy('created_at')
            ->orderBy('id')
            ->get()->map(function ($message) {
                return [
                    'role' => $message->is_system ? 'model' : 'user',
                    'parts' => ['text' => $message->content],
                ];
            })
            ->toArray();

        try {
            $systemMessageContent = $this->geminiService->generateContent($messages);
        } catch (\Exception $e) {
            logger()->error('Failed to generate content: ' . $e->getMessage());
            $systemMessageContent = 'Something went wrong!';
        }

        $systemMessage = Message::createSystemMessage($systemMessageContent);

        return self::index();
    }

    public function clearMessages()
    {
        Message::where('user_id', Auth::id())->delete();
        return self::index();
    }
}
