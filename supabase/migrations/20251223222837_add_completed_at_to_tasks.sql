-- Add completed_at column to track when tasks are completed
ALTER TABLE tasks 
ADD COLUMN completed_at TIMESTAMPTZ DEFAULT NULL;

-- Add comment to document the column purpose
COMMENT ON COLUMN tasks.completed_at IS 'Timestamp when the task was completed';

-- Create index for better query performance when filtering by completed tasks
CREATE INDEX idx_tasks_completed_at ON tasks(completed_at) 
WHERE completed_at IS NOT NULL;