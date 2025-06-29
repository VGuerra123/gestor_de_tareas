import React from 'react';
import { BarChart3, CheckCircle2, Clock, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DashboardStats: React.FC = () => {
  const { projects, tasks } = useApp();

  const stats = [
    {
      name: 'Proyectos Activos',
      value: projects.filter(p => p.status === 'active').length,
      icon: BarChart3,
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-600',
    },
    {
      name: 'Tareas Completadas',
      value: tasks.filter(t => t.status === 'done').length,
      icon: CheckCircle2,
      color: 'from-success-500 to-success-600',
      bgColor: 'bg-success-50',
      textColor: 'text-success-600',
    },
    {
      name: 'En Progreso',
      value: tasks.filter(t => t.status === 'in-progress').length,
      icon: Clock,
      color: 'from-warning-500 to-warning-600',
      bgColor: 'bg-warning-50',
      textColor: 'text-warning-600',
    },
    {
      name: 'Miembros del Equipo',
      value: new Set(projects.flatMap(p => p.teamMembers.map(m => m.id))).size,
      icon: Users,
      color: 'from-secondary-500 to-secondary-600',
      bgColor: 'bg-secondary-50',
      textColor: 'text-secondary-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={stat.name}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};