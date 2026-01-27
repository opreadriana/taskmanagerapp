import { NextRequest, NextResponse } from "next/server";
import { TaskService } from "@/features/tasks/services/taskService";

/**
 * PUT /api/tasks/[id]
 * Update a task (toggle done status or update properties)
 *
 * Request body:
 * {
 *   done?: boolean
 *   text?: string
 *   priority?: "High" | "Medium" | "Low"
 *   due_date?: string | null
 * }
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Validate at least one field is being updated
    if (Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    const { data, error } = await TaskService.updateTask(id, body);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ task: data }, { status: 200 });
  } catch (error) {
    console.error(`Unexpected error in PUT /api/tasks/[id]:`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tasks/[id]
 * Delete a task
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { error } = await TaskService.deleteTask(id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Unexpected error in DELETE /api/tasks/[id]:`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
