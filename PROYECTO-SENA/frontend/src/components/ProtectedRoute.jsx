import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole');

  // Si no hay sesión o el rol no es 1 (Admin), mandalo al login
  if (userRole !== '1') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;