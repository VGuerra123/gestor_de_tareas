import React from 'react';
import { Calendar, Users, TrendingUp } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'completed':
        return 'Completado';
      case 'on-hold':
        return 'En Pausa';
      case 'planning':
        return 'Planificación';
      default:
        return status;
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-800';
      case 'completed':
        return 'bg-primary-100 text-primary-800';
      case 'on-hold':
        return 'bg-gray-100 text-gray-800';
      case 'planning':
        return 'bg-warning-100 text-warning-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: project.color }}
          />
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {project.name}
          </h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {getStatusText(project.status)}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progreso</span>
          <span className="text-sm font-bold text-gray-900">{project.progress}%</span>
        </div>
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
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(project.endDate).toLocaleDateString('es-ES')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{project.teamMembers.length}</span>
          </div>
        </div>
        <TrendingUp className="w-4 h-4 text-primary-500" />
      </div>

      <div className="flex -space-x-2 mt-4">
        {project.teamMembers.slice(0, 4).map((member) => (
          <img
            key={member.id}
            src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}`}
            alt={member.name}
            className="w-8 h-8 rounded-full border-2 border-white object-cover"
            title={member.name}
          />
        ))}
        {project.teamMembers.length > 4 && (
          <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
            +{project.teamMembers.length - 4}
          </div>
        )}
      </div>
    </div>
  );
};