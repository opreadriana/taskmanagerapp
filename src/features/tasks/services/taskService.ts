import { supabase } from "../../../../supabaseClient";
import { Task } from "../components/TasksContext";

/**
 * Service layer for task operations
 * Handles all database interactions for tasks
 */

export class TaskService {
  /**
   * Fetch all tasks from the database
   */
  static async getTasks(): Promise<{
    data: Task[] | null;
    error: Error | null;
  }> {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("id, text, done, priority, due_date, completed_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching tasks:", error);
        return { data: null, error: new Error(error.message) };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Unexpected error fetching tasks:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Create a new task
   */
  static async createTask(
    text: string,
    priority: "High" | "Medium" | "Low",
    due_date: string | null
  ): Promise<{ data: Task | null; error: Error | null }> {
    try {
      // Validate input
      if (!text || text.trim().length === 0) {
        return { data: null, error: new Error("Task text is required") };
      }

      const { data, error } = await supabase
        .from("tasks")
        .insert([
          {
            text: text.trim(),
            done: false,
            priority: priority || "Medium",
            due_date,
            completed_at: null,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error creating task:", error);
        return { data: null, error: new Error(error.message) };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Unexpected error creating task:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Update a task (toggle done status or update properties)
   */
  static async updateTask(
    taskId: string,
    updates: Partial<Task>
  ): Promise<{ data: Task | null; error: Error | null }> {
    try {
      // If toggling done status, update completed_at timestamp
      if ("done" in updates) {
        updates.completed_at = updates.done ? new Date().toISOString() : null;
      }

      const { data, error } = await supabase
        .from("tasks")
        .update(updates)
        .eq("id", taskId)
        .select()
        .single();

      if (error) {
        console.error("Error updating task:", error);
        return { data: null, error: new Error(error.message) };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Unexpected error updating task:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Delete a task
   */
  static async deleteTask(taskId: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);

      if (error) {
        console.error("Error deleting task:", error);
        return { error: new Error(error.message) };
      }

      return { error: null };
    } catch (error) {
      console.error("Unexpected error deleting task:", error);
      return { error: error as Error };
    }
  }
}
