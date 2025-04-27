import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';
import { LogOut, CheckSquare, Menu, X } from 'lucide-react';

interface HeaderProps {
  onNewTask?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewTask }) => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <CheckSquare className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-xl font-bold text-gray-900">TaskManager</h1>
          </div>
          
          {user && (
            <>
              {/* Desktop menu */}
              <div className="hidden md:flex items-center space-x-4">
                {onNewTask && (
                  <Button
                    onClick={onNewTask}
                    size="sm"
                  >
                    New Task
                  </Button>
                )}
                
                <div className="text-sm text-gray-700">
                  {user.email}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  icon={<LogOut className="h-4 w-4" />}
                >
                  Logout
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                  <span className="sr-only">Open menu</span>
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile menu */}
        {user && isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-3">
              {onNewTask && (
                <Button
                  onClick={() => {
                    onNewTask();
                    setIsMenuOpen(false);
                  }}
                  fullWidth
                >
                  New Task
                </Button>
              )}
              
              <div className="text-sm text-gray-700 py-2">
                {user.email}
              </div>
              
              <Button
                variant="ghost"
                fullWidth
                onClick={signOut}
                icon={<LogOut className="h-4 w-4" />}
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;