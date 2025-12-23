"use client";
import { useState } from "react";
import { useTasks } from "../tasks/context/TasksContext";

export default function AITool() {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState<
    { user: string; ai: string; loading?: boolean }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { tasks } = useTasks();

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

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

    // Add user message and loading AI response immediately
    setConversation((prev) => [
      ...prev,
      {
        user: prompt,
        ai: "AI is thinking...",
        loading: true,
      },
    ]);
    setPrompt("");

    try {
      console.log("Sending request to API...");
      const res = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      console.log("Response received:", res.status);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Data received:", data);

      const aiResponse =
        data.choices?.[0]?.message?.content || "No response from AI.";

      // Update the loading message with actual response
      setConversation((prev) => {
        const newConv = [...prev];
        const lastIndex = newConv.length - 1;
        if (newConv[lastIndex]?.loading) {
          newConv[lastIndex] = {
            user: newConv[lastIndex].user,
            ai: aiResponse,
            loading: false,
          };
        }
        return newConv;
      });
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
      // Update loading message with error
      setConversation((prev) => {
        const newConv = [...prev];
        const lastIndex = newConv.length - 1;
        if (newConv[lastIndex]?.loading) {
          newConv[lastIndex] = {
            user: newConv[lastIndex].user,
            ai: "Sorry, I encountered an error. Please try again.",
            loading: false,
          };
        }
        return newConv;
      });
    } finally {
      setLoading(false);
    }
  }
  console.log("conversation array: ", conversation);

  return (
    <div className="p-4 bg-white dark:bg-blue-950 rounded shadow flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 min-h-0">
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
          <strong>AI:</strong> Hello, I am your personal AI Assistant. How can I
          help you today?
        </div>

        {conversation.map((exchange, index) => (
          <div key={index} className="space-y-2">
            <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded ml-4">
              <strong>You:</strong> {exchange.user}
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
              <strong>AI:</strong>{" "}
              {exchange.loading ? (
                <span className="italic text-gray-500">
                  {exchange.ai} <span className="animate-pulse">●</span>
                </span>
              ) : (
                exchange.ai
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
        <form onSubmit={handleAsk} className="flex gap-2">
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
        {conversation.length === 0 && (
          <div className="text-xs text-gray-500 mt-2">
            Powered by ChatGPT (gpt-3.5-turbo)
          </div>
        )}
      </div>
    </div>
  );
}