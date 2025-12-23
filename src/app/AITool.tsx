"use client";
import { useState } from "react";
import { useTasks } from "./context/TasksContext";

export default function AITool() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPrompt, setLastPrompt] = useState<string | null>(null);

  const { tasks } = useTasks();

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    // check if the prompt includes the word 'tasks' and if it does, send tasks' information to endpoint, so we can get a result based on that
    let finalPrompt = prompt;
    if (
      prompt.toLowerCase().includes("tasks") ||
      prompt.toLowerCase().includes("task")
    ) {
      const tasksText = tasks.length
        ? tasks
            .map((t) => {
              const dueStr = t.due_date
                ? ` (Due: ${new Date(t.due_date).toLocaleDateString()})`
                : "";
              return `${t.done ? "[x]" : "[ ]"} ${t.text} [${t.priority}]${dueStr}`;
            })
            .join(", ")
        : "No tasks found.";
      finalPrompt = `${prompt}\nHere are my tasks: ${tasksText}`;
    }

    // check to avoid sending null/empty trimmed string prompt to OpenAI API
    if (
      !finalPrompt ||
      typeof finalPrompt !== "string" ||
      !finalPrompt.trim()
    ) {
      setError("Please enter a prompt.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt }),
      });
      const data = await res.json();
      setResponse(
        data.choices?.[0]?.message?.content || "No response from AI."
      );
      setLastPrompt(finalPrompt);
      setPrompt("");
    } catch {
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
          onChange={(e) => setPrompt(e.target.value)}
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
          <strong>You:</strong> {lastPrompt}
          <br /> <br />
          <strong>AI:</strong> {response}
        </div>
      )}
      {!response && (
        <div className="text-xs text-gray-500 mb-2">
          Powered by ChatGPT (gpt-3.5-turbo)
        </div>
      )}
    </div>
  );
}
