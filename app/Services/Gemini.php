<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class Gemini
{
  protected $apiKey;

  public function __construct()
  {
    $this->apiKey = config('services.gemini.key');
  }

  public function generateContent(string $input): string
  {
    $response = Http::post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={$this->apiKey}", [
      'contents' => [
        [
          'role' => 'user',
          'parts' => [
            [
              'text' => $input,
            ],
          ],
        ],
      ],
      'generationConfig' => [
        'temperature' => 1,
        'topK' => 40,
        'topP' => 0.95,
        'maxOutputTokens' => 8192,
        'responseMimeType' => 'text/plain',
      ],
    ]);

    if ($response->successful()) {
      return $response->json('candidates.0.content.parts.0.text');
    }

    throw new \Exception('Failed to generate content: ' . $response->body());
  }
}
