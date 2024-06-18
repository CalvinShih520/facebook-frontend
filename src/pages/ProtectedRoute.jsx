import React from 'react';
import { Navigate } from 'react-router-dom';
import TokenService from '../services/token.service';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!TokenService.getLocalAccessToken();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
