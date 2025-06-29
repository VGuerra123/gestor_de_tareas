import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { auth } = useApp();

  return (
    <header className="bg-white/20 backdrop-blur-lg border-b border-white/20 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar proyectos, tareas..."
              className="w-full pl-10 pr-4 py-2 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-white/20 rounded-xl transition-all duration-200">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 px-3 py-2 bg-white/30 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              {auth.user?.avatar ? (
                <img 
                  src={auth.user.avatar} 
                  alt={auth.user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-800">{auth.user?.name}</p>
              <p className="text-xs text-gray-600 capitalize">{auth.user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};