import React from 'react';
import { Calendar, User, Flag } from 'lucide-react';
import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onClick: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart, onClick }) => {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'text-error-600 bg-error-50';
      case 'high':
        return 'text-warning-600 bg-warning-50';
      case 'medium':
        return 'text-primary-600 bg-primary-50';
      case 'low':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityText = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'Urgente';
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Baja';
      default:
        return priority;
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105 group"
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
          {task.title}
        </h4>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
          <Flag className="w-3 h-3" />
          <span>{getPriorityText(task.priority)}</span>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}

      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{task.tags.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>{new Date(task.dueDate).toLocaleDateString('es-ES')}</span>
        </div>
        
        {task.assignee && (
          <div className="flex items-center space-x-2">
            <User className="w-3 h-3 text-gray-400" />
            <img
              src={task.assignee.avatar || `https://ui-avatars.com/api/?name=${task.assignee.name}`}
              alt={task.assignee.name}
              className="w-6 h-6 rounded-full object-cover"
              title={task.assignee.name}
            />
          </div>
        )}
      </div>
    </div>
  );
};