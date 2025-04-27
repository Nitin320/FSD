import React from 'react';
import { Task, TaskFilter } from '../types';
import TaskCard from './TaskCard';
import { CheckCircle, List, XCircle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  filter,
  onFilterChange,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  const filterButtons: { label: TaskFilter; icon: React.ReactNode }[] = [
    { label: 'All', icon: <List className="h-4 w-4" /> },
    { label: 'Active', icon: <XCircle className="h-4 w-4" /> },
    { label: 'Completed', icon: <CheckCircle className="h-4 w-4" /> },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {filterButtons.map(({ label, icon }) => (
          <button
            key={label}
            onClick={() => onFilterChange(label)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md inline-flex items-center transition-colors ${
              filter === label
                ? 'bg-blue-100 text-blue-800'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="mr-1.5">{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">No tasks found</p>
          <p className="text-sm text-gray-400 mt-1">
            {filter === 'All'
              ? 'Create a new task to get started'
              : `No ${filter.toLowerCase()} tasks available`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;