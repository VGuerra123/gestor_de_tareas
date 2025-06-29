import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, BarChart3, Target } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { KanbanBoard } from '../components/kanban/KanbanBoard';
import { Button } from '../components/common/Button';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, tasks } = useApp();

  const project = projects.find(p => p.id === id);
  const projectTasks = tasks.filter(t => t.projectId === id);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Proyecto no encontrado</h2>
          <p className="text-gray-600 mb-4">El proyecto que buscas no existe o no tienes permisos para verlo.</p>
          <Button onClick={() => navigate('/projects')}>
            Volver a Proyectos
          </Button>
        </div>
      </div>
    );
  }

  const completedTasks = projectTasks.filter(t => t.status === 'done').length;
  const totalTasks = projectTasks.length;
  const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/projects')}
          className="p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
          </div>
          <p className="text-gray-600">{project.description}</p>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Progreso General</p>
              <p className="text-3xl font-bold text-gray-900">{project.progress}%</p>
            </div>
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Tareas Completadas</p>
              <p className="text-3xl font-bold text-gray-900">{completedTasks}/{totalTasks}</p>
            </div>
            <div className="w-12 h-12 bg-success-50 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Miembros del Equipo</p>
              <p className="text-3xl font-bold text-gray-900">{project.teamMembers.length}</p>
            </div>
            <div className="w-12 h-12 bg-secondary-50 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Fecha de Entrega</p>
              <p className="text-lg font-bold text-gray-900">
                {new Date(project.endDate).toLocaleDateString('es-ES')}
              </p>
            </div>
            <div className="w-12 h-12 bg-warning-50 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipo del Proyecto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.teamMembers.map((member) => (
            <div key={member.id} className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
              <img
                src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}`}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-600 capitalize">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tablero de Tareas</h3>
        <KanbanBoard projectId={project.id} />
      </div>
    </div>
  );
};