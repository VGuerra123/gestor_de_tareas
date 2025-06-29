import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { mockUsers } from '../data/mockData';

export const Team: React.FC = () => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-error-100 text-error-800';
      case 'manager':
        return 'bg-primary-100 text-primary-800';
      case 'developer':
        return 'bg-success-100 text-success-800';
      case 'designer':
        return 'bg-secondary-100 text-secondary-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'manager':
        return 'Gerente';
      case 'developer':
        return 'Desarrollador';
      case 'designer':
        return 'Diseñador';
      default:
        return role;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Equipo</h1>
        <p className="text-gray-600">Conoce a los miembros de tu equipo de trabajo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockUsers.map((member, index) => (
          <div
            key={member.id}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-center mb-4">
              <img
                src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}`}
                alt={member.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(member.role)}`}>
                {getRoleText(member.role)}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{member.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+34 600 000 000</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Madrid, España</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <div className="text-center">
                  <p className="font-medium text-gray-900">8</p>
                  <p className="text-gray-600">Proyectos</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900">24</p>
                  <p className="text-gray-600">Tareas</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900">95%</p>
                  <p className="text-gray-600">Completado</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};