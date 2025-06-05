"use client";
import { useState } from "react";

export default function AITool() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.choices?.[0]?.message?.content || "No response from AI.");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="my-6 p-4 bg-white dark:bg-blue-950 rounded shadow max-w-xl">
      <form onSubmit={handleAsk} className="flex gap-2 mb-4">
        <input
          className="flex-1 px-2 py-1 rounded border border-blue-200 dark:bg-blue-900 dark:text-white"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Ask the AI anything..."
        />
        <button
          type="submit"
          className="text-blue-900 bg-blue-200 px-4 py-2 rounded hover:bg-blue-300 transition-colors duration-200 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800"
          disabled={loading}
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </form>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {response && (
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
          <strong>AI says:</strong> {response}
        </div>
      )}
    </div>
  );
}