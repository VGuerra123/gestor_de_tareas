import React from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';

export const ProjectProgress: React.FC = () => {
  const { projects } = useApp();
  const activeProjects = projects.filter(p => p.status === 'active');

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-success-500';
      case 'planning':
        return 'bg-warning-500';
      case 'completed':
        return 'bg-primary-500';
      case 'on-hold':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Progreso de Proyectos</h3>
        <TrendingUp className="w-5 h-5 text-gray-500" />
      </div>

      <div className="space-y-6">
        {activeProjects.map((project) => (
          <div key={project.id} className="animate-slide-up">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <h4 className="font-medium text-gray-900">{project.name}</h4>
              </div>
              <span className="text-sm font-medium text-gray-600">{project.progress}%</span>
            </div>
            
            <div className="mb-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${project.progress}%`,
                    backgroundColor: project.color,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(project.endDate).toLocaleDateString('es-ES')}</span>
              </div>
              <div className="flex -space-x-2">
                {project.teamMembers.slice(0, 3).map((member) => (
                  <img
                    key={member.id}
                    src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}`}
                    alt={member.name}
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  />
                ))}
                {project.teamMembers.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                    +{project.teamMembers.length - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};