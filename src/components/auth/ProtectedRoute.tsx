import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { auth } = useApp();

  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};