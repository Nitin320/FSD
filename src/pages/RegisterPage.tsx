import React from 'react';
import AuthForm from '../components/AuthForm';
import { CheckSquare } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RegisterPage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="flex items-center mb-6 text-3xl font-bold text-blue-600">
        <CheckSquare className="h-10 w-10 mr-2" />
        TaskManager
      </div>
      <AuthForm isLogin={false} />
    </div>
  );
};

export default RegisterPage;