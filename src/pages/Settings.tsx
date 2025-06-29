import React from 'react';
import { User, Bell, Shield, Palette, Globe } from 'lucide-react';
import { Button } from '../components/common/Button';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
        <p className="text-gray-600">Personaliza tu experiencia en la plataforma</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Perfil de Usuario</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    defaultValue="Ana García"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="ana@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biografía
                </label>
                <textarea
                  rows={3}
                  defaultValue="Gerente de proyectos con más de 5 años de experiencia en metodologías ágiles."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-warning-50 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-warning-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Notificaciones</h3>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Nuevas tareas asignadas', enabled: true },
                { label: 'Actualizaciones de proyecto', enabled: true },
                { label: 'Recordatorios de fechas límite', enabled: false },
                { label: 'Comentarios en tareas', enabled: true },
                { label: 'Cambios en el equipo', enabled: false },
              ].map((notification, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{notification.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={notification.enabled}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-error-50 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-error-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Seguridad</h3>
            </div>

            <div className="space-y-4">
              <Button variant="outline" className="w-full">
                Cambiar Contraseña
              </Button>
              <Button variant="outline" className="w-full">
                Configurar Autenticación de Dos Factores
              </Button>
              <Button variant="outline" className="w-full">
                Ver Sesiones Activas
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Appearance */}
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-secondary-50 rounded-xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Apariencia</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tema
                </label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200">
                  <option>Claro</option>
                  <option>Oscuro</option>
                  <option>Automático</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Principal
                </label>
                <div className="flex space-x-2">
                  {['bg-primary-500', 'bg-secondary-500', 'bg-accent-500', 'bg-success-500'].map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full ${color} border-2 border-white shadow-md hover:scale-110 transition-transform duration-200`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Idioma</h3>
            </div>

            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200">
              <option>Español</option>
              <option>English</option>
              <option>Français</option>
              <option>Deutsch</option>
            </select>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button variant="primary" className="w-full">
              Guardar Cambios
            </Button>
            <Button variant="outline" className="w-full">
              Restablecer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};