import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import Header from '../components/Header';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Modal from '../components/Modal';
import { Task, TaskFilter, TaskFormData } from '../types';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const {
    tasks,
    loading,
    error,
    filter,
    setFilter,
    createTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask,
  } = useTasks(user?.id);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  const handleAddTask = (taskData: TaskFormData) => {
    createTask(taskData);
    setIsAddModalOpen(false);
  };

  const handleEditTask = (taskData: TaskFormData) => {
    if (currentTask) {
      updateTask(currentTask.id, { ...taskData });
      setIsEditModalOpen(false);
      setCurrentTask(undefined);
    }
  };

  const handleOpenEditModal = (task: Task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };

  const handleFilterChange = (newFilter: TaskFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNewTask={() => setIsAddModalOpen(true)} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Tasks</h2>
          
          <TaskList
            tasks={tasks}
            loading={loading}
            filter={filter}
            onFilterChange={handleFilterChange}
            onToggleComplete={toggleTaskCompletion}
            onDelete={deleteTask}
            onEdit={handleOpenEditModal}
          />
        </div>
      </main>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Task"
      >
        <TaskForm onSubmit={handleAddTask} onCancel={() => setIsAddModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setCurrentTask(undefined);
        }}
        title="Edit Task"
      >
        <TaskForm
          initialTask={currentTask}
          onSubmit={handleEditTask}
          onCancel={() => {
            setIsEditModalOpen(false);
            setCurrentTask(undefined);
          }}
        />
      </Modal>
    </div>
  );
};

export default DashboardPage;