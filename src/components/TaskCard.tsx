import React from 'react';
import { Task } from '../types';
import { format, isValid } from 'date-fns';
import { CheckCircle, Circle, Trash, Edit, Clock } from 'lucide-react';
import Button from './Button';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  const priorityColors = {
    Low: 'bg-blue-100 text-blue-800',
    Medium: 'bg-amber-100 text-amber-800',
    High: 'bg-red-100 text-red-800',
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return isValid(date) ? format(date, 'MMM dd, yyyy') : 'Invalid date';
  };

  return (
    <div className={`p-4 mb-3 bg-white rounded-lg shadow transition-all duration-200 hover:shadow-md ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between">
        <div className="flex-1">
          <div className="flex items-start sm:items-center">
            <button
              onClick={() => onToggleComplete(task.id)}
              className="mr-3 flex-shrink-0 text-gray-400 hover:text-blue-500 transition-colors"
              aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {task.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            
            <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
          </div>
          
          {task.description && (
            <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
          
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className={`px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            
            <span className="flex items-center text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              {formatDate(task.created_at)}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-1 mt-3 sm:mt-0 sm:ml-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            aria-label="Edit task"
            icon={<Edit className="h-4 w-4" />}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            icon={<Trash className="h-4 w-4 text-red-500" />}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;