import React, { useState } from 'react';
import { Calendar, Flag, User, Tag } from 'lucide-react';
import { Task } from '../../types';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { mockUsers } from '../../data/mockData';

interface TaskFormProps {
  task?: Task | null;
  projectId: string;
  defaultStatus: Task['status'];
  onClose: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, projectId, defaultStatus, onClose }) => {
  const { createTask, updateTask, deleteTask } = useApp();
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || defaultStatus,
    priority: task?.priority || 'medium' as Task['priority'],
    assigneeId: task?.assignee?.id || '',
    estimatedHours: task?.estimatedHours || 8,
    dueDate: task?.dueDate || new Date().toISOString().split('T')[0],
    tags: task?.tags?.join(', ') || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      assignee: formData.assigneeId ? mockUsers.find(u => u.id === formData.assigneeId) : undefined,
      sprintId: '2', // Default sprint for demo
      projectId,
      estimatedHours: formData.estimatedHours,
      dueDate: formData.dueDate,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    if (task) {
      updateTask(task.id, taskData);
    } else {
      createTask(taskData);
    }
    
    onClose();
  };

  const handleDelete = () => {
    if (task && window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      deleteTask(task.id);
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Título de la tarea
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          placeholder="Ingresa el título de la tarea"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          placeholder="Describe la tarea en detalle"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Estado
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          >
            <option value="todo">Por Hacer</option>
            <option value="in-progress">En Progreso</option>
            <option value="done">Completada</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
            <Flag className="w-4 h-4 inline mr-1" />
            Prioridad
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
            <option value="urgent">Urgente</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="assigneeId" className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-1" />
            Asignado a
          </label>
          <select
            id="assigneeId"
            name="assigneeId"
            value={formData.assigneeId}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Sin asignar</option>
            {mockUsers.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="estimatedHours" className="block text-sm font-medium text-gray-700 mb-2">
            Horas estimadas
          </label>
          <input
            id="estimatedHours"
            name="estimatedHours"
            type="number"
            min="1"
            value={formData.estimatedHours}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
          <Calendar className="w-4 h-4 inline mr-1" />
          Fecha de vencimiento
        </label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
          <Tag className="w-4 h-4 inline mr-1" />
          Etiquetas (separadas por comas)
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          value={formData.tags}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          placeholder="frontend, api, testing"
        />
      </div>

      <div className="flex justify-between pt-4">
        <div>
          {task && (
            <Button
              type="button"
              variant="danger"
              onClick={handleDelete}
            >
              Eliminar Tarea
            </Button>
          )}
        </div>
        <div className="flex space-x-3">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            {task ? 'Actualizar' : 'Crear'} Tarea
          </Button>
        </div>
      </div>
    </form>
  );
};