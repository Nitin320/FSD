import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Task, TaskFilter, TaskFormData } from '../types';
import { v4 as uuidv4 } from 'uuid';

export function useTasks(userId: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TaskFilter>('All');

  // Fetch tasks from Supabase
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchTasks() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setTasks(data as Task[]);
        setError(null);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [userId]);

  // Create a new task
  async function createTask(taskData: TaskFormData) {
    if (!userId) return null;
    
    try {
      const newTask: Task = {
        id: uuidv4(),
        title: taskData.title,
        description: taskData.description,
        completed: false,
        priority: taskData.priority,
        created_at: new Date().toISOString(),
        user_id: userId,
      };

      const { error } = await supabase.from('tasks').insert([newTask]);

      if (error) {
        throw error;
      }

      setTasks((prevTasks) => [newTask, ...prevTasks]);
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task. Please try again.');
      return null;
    }
  }

  // Update a task
  async function updateTask(taskId: string, updates: Partial<Task>) {
    try {
      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId)
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...updates } : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task. Please try again.');
    }
  }

  // Toggle task completion status
  async function toggleTaskCompletion(taskId: string) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const newStatus = !task.completed;
    await updateTask(taskId, { completed: newStatus });
  }

  // Delete a task
  async function deleteTask(taskId: string) {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task. Please try again.');
    }
  }

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  return {
    tasks: filteredTasks,
    loading,
    error,
    filter,
    setFilter,
    createTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask,
  };
}