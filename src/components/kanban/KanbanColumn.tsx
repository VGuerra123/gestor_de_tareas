import React from 'react';
import { Plus } from 'lucide-react';
import { Task } from '../../types';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  title: string;
  status: Task['status'];
  tasks: Task[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: Task['status']) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onTaskClick: (task: Task) => void;
  onAddTask: (status: Task['status']) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  status,
  tasks,
  onDragOver,
  onDrop,
  onDragStart,
  onTaskClick,
  onAddTask,
}) => {
  const getColumnColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'border-gray-300 bg-gray-50/50';
      case 'in-progress':
        return 'border-warning-300 bg-warning-50/50';
      case 'done':
        return 'border-success-300 bg-success-50/50';
      default:
        return 'border-gray-300 bg-gray-50/50';
    }
  };

  const getHeaderColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'text-gray-700 bg-gray-100';
      case 'in-progress':
        return 'text-warning-700 bg-warning-100';
      case 'done':
        return 'text-success-700 bg-success-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className={`flex-1 min-w-80 rounded-2xl border-2 border-dashed ${getColumnColor(status)} transition-all duration-200`}>
      <div className={`flex items-center justify-between p-4 rounded-t-2xl ${getHeaderColor(status)}`}>
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold">{title}</h3>
          <span className="bg-white/80 text-xs font-medium px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(status)}
          className="p-1 hover:bg-white/50 rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div
        className="p-4 space-y-3 min-h-96"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, status)}
      >
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <TaskCard
              task={task}
              onDragStart={onDragStart}
              onClick={() => onTaskClick(task)}
            />
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">No hay tareas en esta columna</p>
          </div>
        )}
      </div>
    </div>
  );
};