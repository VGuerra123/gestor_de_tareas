import React, { useState } from 'react';
import { Task } from '../../types';
import { useApp } from '../../context/AppContext';
import { KanbanColumn } from './KanbanColumn';
import { Modal } from '../common/Modal';
import { TaskForm } from './TaskForm';

interface KanbanBoardProps {
  projectId: string;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ projectId }) => {
  const { tasks, updateTask, createTask } = useApp();
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTaskStatus, setNewTaskStatus] = useState<Task['status']>('todo');

  const projectTasks = tasks.filter(task => task.projectId === projectId);
  
  const todoTasks = projectTasks.filter(task => task.status === 'todo');
  const inProgressTasks = projectTasks.filter(task => task.status === 'in-progress');
  const doneTasks = projectTasks.filter(task => task.status === 'done');

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== status) {
      updateTask(draggedTask.id, { status });
    }
    setDraggedTask(null);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleAddTask = (status: Task['status']) => {
    setSelectedTask(null);
    setNewTaskStatus(status);
    setIsTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
      <div className="flex space-x-6 overflow-x-auto pb-4">
        <KanbanColumn
          title="Por Hacer"
          status="todo"
          tasks={todoTasks}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onTaskClick={handleTaskClick}
          onAddTask={handleAddTask}
        />
        
        <KanbanColumn
          title="En Progreso"
          status="in-progress"
          tasks={inProgressTasks}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onTaskClick={handleTaskClick}
          onAddTask={handleAddTask}
        />
        
        <KanbanColumn
          title="Completadas"
          status="done"
          tasks={doneTasks}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onTaskClick={handleTaskClick}
          onAddTask={handleAddTask}
        />
      </div>

      <Modal
        isOpen={isTaskModalOpen}
        onClose={handleCloseModal}
        title={selectedTask ? 'Editar Tarea' : 'Nueva Tarea'}
        size="lg"
      >
        <TaskForm
          task={selectedTask}
          projectId={projectId}
          defaultStatus={newTaskStatus}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
};