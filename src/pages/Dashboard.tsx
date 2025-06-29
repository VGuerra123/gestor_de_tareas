import React from 'react';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { ProjectProgress } from '../components/dashboard/ProjectProgress';
import { RecentActivity } from '../components/dashboard/RecentActivity';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Resumen general de tus proyectos y tareas</p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectProgress />
        <RecentActivity />
      </div>
    </div>
  );
};