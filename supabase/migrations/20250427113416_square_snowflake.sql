/*
  # Initial schema setup for task manager

  1. New Tables
    - `tasks` - Stores all user tasks
      - `id` - Unique identifier for each task
      - `title` - The task title
      - `description` - Detailed task description (optional)
      - `completed` - Boolean flag for task completion status
      - `priority` - Task priority level (Low, Medium, High)
      - `created_at` - Timestamp when task was created
      - `user_id` - Foreign key to the auth.users table
  
  2. Security
    - Enable Row Level Security (RLS) on the tasks table
    - Create policies to ensure users can only:
      - Read their own tasks
      - Insert their own tasks
      - Update their own tasks
      - Delete their own tasks
*/

-- Create the tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  priority TEXT CHECK (priority IN ('Low', 'Medium', 'High')) DEFAULT 'Medium',
  created_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create access policies
-- Allow users to read only their own tasks
CREATE POLICY "Users can read their own tasks"
  ON tasks
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert their own tasks
CREATE POLICY "Users can insert their own tasks"
  ON tasks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own tasks
CREATE POLICY "Users can update their own tasks"
  ON tasks
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Allow users to delete their own tasks
CREATE POLICY "Users can delete their own tasks"
  ON tasks
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS tasks_user_id_idx ON tasks (user_id);
CREATE INDEX IF NOT EXISTS tasks_completed_idx ON tasks (completed);