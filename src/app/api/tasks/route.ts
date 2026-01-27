import { NextRequest, NextResponse } from "next/server";
import { TaskService } from "@/features/tasks/services/taskService";

/**
 * GET /api/tasks
 * Fetch all tasks
 */
export async function GET() {
  try {
    const { data, error } = await TaskService.getTasks();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ tasks: data }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in GET /api/tasks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tasks
 * Create a new task
 *
 * Request body:
 * {
 *   text: string (required)
 *   priority: "High" | "Medium" | "Low" (optional, defaults to "Medium")
 *   due_date: string | null (optional)
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, priority, due_date } = body;

    // Validation
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Task text is required" },
        { status: 400 }
      );
    }

    const validPriorities = ["High", "Medium", "Low"];
    const taskPriority =
      priority && validPriorities.includes(priority) ? priority : "Medium";

    const { data, error } = await TaskService.createTask(
      text,
      taskPriority,
      due_date || null
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ task: data }, { status: 201 });
  } catch (error) {
    console.error("Unexpected error in POST /api/tasks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
