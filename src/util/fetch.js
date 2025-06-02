import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function callAI(messages) {
  const url = "https://openrouter.ai/api/v1/chat/completions";
  const key = import.meta.env.VITE_AI_KEY;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemma-3-27b-it:free",
      messages,
    }),
  });

  const data = await response.json();

  return data.choices[0].message;
}
