export interface User {
  id: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
  userId: string;
}

export type TaskFilter = 'All' | 'Active' | 'Completed';

export interface AuthState {
  user: User | null;
  session: any;
  loading: boolean;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: TaskFilter;
}