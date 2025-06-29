import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  Settings, 
  BarChart3,
  Target,
  LogOut,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Proyectos', href: '/projects', icon: FolderOpen },
  { name: 'Equipo', href: '/team', icon: Users },
  { name: 'Reportes', href: '/reports', icon: BarChart3 },
  { name: 'Objetivos', href: '/goals', icon: Target },
  { name: 'Configuración', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { logout } = useApp();
  const location = useLocation();

  return (
    <div className="w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 shadow-xl">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Gestor Ágil</h1>
              <p className="text-sm text-gray-600">Proyectos</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg transform scale-105' 
                    : 'text-gray-700 hover:bg-white/20 hover:text-gray-900 hover:scale-105'
                  }
                `}
              >
                <item.icon className={`mr-3 w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <LogOut className="mr-3 w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};