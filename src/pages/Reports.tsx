import React from 'react';
import { BarChart3, TrendingUp, Clock, Target } from 'lucide-react';

export const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reportes</h1>
        <p className="text-gray-600">Análisis y métricas de rendimiento de tus proyectos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productivity Chart */}
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Productividad del Equipo</h3>
            <BarChart3 className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {[
              { name: 'Ana García', value: 85, color: 'bg-primary-500' },
              { name: 'Carlos López', value: 92, color: 'bg-success-500' },
              { name: 'María Rodríguez', value: 78, color: 'bg-secondary-500' },
              { name: 'David Martín', value: 88, color: 'bg-warning-500' },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="text-gray-600">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sprint Burndown */}
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Burndown Chart</h3>
            <TrendingUp className="w-5 h-5 text-gray-500" />
          </div>
          <div className="h-48 flex items-end justify-between space-x-2">
            {[40, 35, 30, 28, 22, 18, 15, 12, 8, 5, 2, 0].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-primary-500 to-primary-300 rounded-t transition-all duration-1000 ease-out hover:from-primary-600 hover:to-primary-400"
                  style={{ height: `${(value / 40) * 100}%`, minHeight: value > 0 ? '8px' : '0' }}
                />
                <span className="text-xs text-gray-500 mt-2">D{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Time Tracking */}
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Tiempo por Proyecto</h3>
            <Clock className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {[
              { name: 'Plataforma E-commerce', hours: 156, total: 200, color: 'from-primary-500 to-primary-600' },
              { name: 'App Móvil Financiera', hours: 89, total: 150, color: 'from-secondary-500 to-secondary-600' },
              { name: 'Sistema CRM', hours: 34, total: 180, color: 'from-accent-500 to-accent-600' },
            ].map((project) => (
              <div key={project.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{project.name}</span>
                  <span className="text-gray-600">{project.hours}h / {project.total}h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${project.color} transition-all duration-700`}
                    style={{ width: `${(project.hours / project.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Goals Progress */}
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Objetivos del Sprint</h3>
            <Target className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-6">
            {[
              { title: 'Completar API de autenticación', completed: true, dueDate: '2024-01-25' },
              { title: 'Implementar dashboard principal', completed: true, dueDate: '2024-01-27' },
              { title: 'Crear tests unitarios', completed: false, dueDate: '2024-01-30' },
              { title: 'Documentar endpoints', completed: false, dueDate: '2024-02-01' },
            ].map((goal, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center
                  ${goal.completed ? 'bg-success-500' : 'bg-gray-300'}
                `}>
                  {goal.completed && <Target className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${goal.completed ? 'text-gray-900' : 'text-gray-600'}`}>
                    {goal.title}
                  </p>
                  <p className="text-sm text-gray-500">{goal.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};