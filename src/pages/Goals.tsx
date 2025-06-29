import React from 'react';
import { Target, TrendingUp, Calendar, CheckCircle2, BarChart3 } from 'lucide-react';

export const Goals: React.FC = () => {
  const goals = [
    {
      id: 1,
      title: 'Aumentar velocidad del equipo',
      description: 'Incrementar la velocidad promedio del equipo en un 25% durante este trimestre',
      progress: 68,
      target: 100,
      category: 'performance',
      dueDate: '2024-03-31',
      status: 'in-progress',
    },
    {
      id: 2,
      title: 'Reducir bugs en producción',
      description: 'Disminuir la cantidad de bugs críticos en producción a menos de 5 por sprint',
      progress: 85,
      target: 100,
      category: 'quality',
      dueDate: '2024-02-28',
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'Mejorar satisfacción del cliente',
      description: 'Alcanzar un NPS de 8.5 o superior basado en feedback de usuarios',
      progress: 100,
      target: 100,
      category: 'satisfaction',
      dueDate: '2024-01-31',
      status: 'completed',
    },
    {
      id: 4,
      title: 'Implementar CI/CD completo',
      description: 'Establecer pipeline completo de integración y despliegue continuo',
      progress: 40,
      target: 100,
      category: 'technical',
      dueDate: '2024-04-15',
      status: 'in-progress',
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance':
        return 'from-primary-500 to-primary-600';
      case 'quality':
        return 'from-success-500 to-success-600';
      case 'satisfaction':
        return 'from-secondary-500 to-secondary-600';
      case 'technical':
        return 'from-accent-500 to-accent-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance':
        return <TrendingUp className="w-5 h-5 text-white" />;
      case 'quality':
        return <CheckCircle2 className="w-5 h-5 text-white" />;
      case 'satisfaction':
        return <Target className="w-5 h-5 text-white" />;
      case 'technical':
        return <Target className="w-5 h-5 text-white" />;
      default:
        return <Target className="w-5 h-5 text-white" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'performance':
        return 'Rendimiento';
      case 'quality':
        return 'Calidad';
      case 'satisfaction':
        return 'Satisfacción';
      case 'technical':
        return 'Técnico';
      default:
        return category;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Objetivos</h1>
        <p className="text-gray-600">Seguimiento de metas y objetivos del equipo</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Objetivos Totales</p>
              <p className="text-3xl font-bold text-gray-900">{goals.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Completados</p>
              <p className="text-3xl font-bold text-gray-900">
                {goals.filter(g => g.status === 'completed').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-success-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">En Progreso</p>
              <p className="text-3xl font-bold text-gray-900">
                {goals.filter(g => g.status === 'in-progress').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-warning-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Progreso Promedio</p>
              <p className="text-3xl font-bold text-gray-900">
                {Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-secondary-50 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal, index) => (
          <div
            key={goal.id}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(goal.category)} rounded-xl flex items-center justify-center shadow-lg`}>
                  {getCategoryIcon(goal.category)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2  mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                    {goal.status === 'completed' && (
                      <CheckCircle2 className="w-5 h-5 text-success-500" />
                    )}
                  </div>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(goal.category)} text-white`}>
                    {getCategoryName(goal.category)}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{goal.description}</p>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progreso</span>
                <span className="text-sm font-bold text-gray-900">{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${getCategoryColor(goal.category)} transition-all duration-700 ease-out`}
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Vence: {new Date(goal.dueDate).toLocaleDateString('es-ES')}</span>
              </div>
              <span className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${goal.status === 'completed' 
                  ? 'bg-success-100 text-success-800' 
                  : 'bg-warning-100 text-warning-800'
                }
              `}>
                {goal.status === 'completed' ? 'Completado' : 'En Progreso'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};