import React from 'react';
import { Clock, CheckCircle2, AlertCircle, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RecentActivity: React.FC = () => {
  const { tasks } = useApp();

  // Generate recent activities from tasks
  const recentActivities = tasks
    .slice(0, 5)
    .map((task) => ({
      id: task.id,
      type: task.status === 'done' ? 'completed' : task.status === 'in-progress' ? 'started' : 'created',
      title: task.title,
      user: task.assignee?.name || 'Usuario',
      time: new Date(task.createdAt).toLocaleString('es-ES'),
      priority: task.priority,
    }));

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-success-600" />;
      case 'started':
        return <Clock className="w-5 h-5 text-warning-600" />;
      case 'created':
        return <AlertCircle className="w-5 h-5 text-primary-600" />;
      default:
        return <User className="w-5 h-5 text-gray-600" />;
    }
  };

  const getActivityText = (type: string) => {
    switch (type) {
      case 'completed':
        return 'completó';
      case 'started':
        return 'comenzó';
      case 'created':
        return 'creó';
      default:
        return 'actualizó';
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
        <Clock className="w-5 h-5 text-gray-500" />
      </div>

      <div className="space-y-4">
        {recentActivities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-shrink-0">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span>{' '}
                {getActivityText(activity.type)} la tarea{' '}
                <span className="font-medium text-primary-600">"{activity.title}"</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
            <div className="flex-shrink-0">
              <span className={`
                inline-flex px-2 py-1 text-xs font-medium rounded-full
                ${activity.priority === 'urgent' ? 'bg-error-100 text-error-800' :
                  activity.priority === 'high' ? 'bg-warning-100 text-warning-800' :
                  activity.priority === 'medium' ? 'bg-primary-100 text-primary-800' :
                  'bg-gray-100 text-gray-800'
                }
              `}>
                {activity.priority === 'urgent' ? 'Urgente' :
                 activity.priority === 'high' ? 'Alta' :
                 activity.priority === 'medium' ? 'Media' : 'Baja'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};