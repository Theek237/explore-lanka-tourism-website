import { ENV_VARS } from "../config/envVars.js";

// Minimal client for Google Generative Language API (Gemini) using native fetch (Node 18+)
// Docs: https://ai.google.dev/api/rest

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

/**
 * Call Gemini to generate a travel plan.
 * @param {object} promptPayload - { systemPrompt: string, userContent: string }
 * @returns {Promise<string>} - The plain text content from Gemini response
 */
export async function callGemini(promptPayload) {
  if (!ENV_VARS.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not configured on the server");
  }

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: `${promptPayload.systemPrompt}\n\n${promptPayload.userContent}` }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
      // Force the model to return pure JSON (no markdown/code fences)
      response_mime_type: "application/json",
    },
  };

  const url = `${GEMINI_API_URL}?key=${encodeURIComponent(ENV_VARS.GEMINI_API_KEY)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    
    // Handle quota exceeded specifically
    if (res.status === 429) {
      throw new Error("Gemini API quota exceeded. Please try again later or upgrade your plan.");
    }
    
    throw new Error(`Gemini API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  // Extract first candidate's text
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Gemini returned no content");
  }
  return text;
}
