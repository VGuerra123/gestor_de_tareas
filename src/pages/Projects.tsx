import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/projects/ProjectCard';
import { Button } from '../components/common/Button';

export const Projects: React.FC = () => {
  const { projects, setCurrentProject } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleProjectClick = (project: any) => {
    setCurrentProject(project);
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Proyectos</h1>
          <p className="text-gray-600">Gestiona y supervisa todos tus proyectos</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Proyecto
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/50"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/50"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activos</option>
                <option value="planning">En planificación</option>
                <option value="completed">Completados</option>
                <option value="on-hold">En pausa</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProjectCard
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron proyectos</h3>
          <p className="text-gray-600">Intenta ajustar tus filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
};