import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Schaut nach, ob ein Token im Speicher liegt
  const token = localStorage.getItem('portfolio_token');

  if (!token) {
    // Kein Token? Ab zurück zum Login
    return <Navigate to="/login" replace />;
  }

  // Token existiert? Seite freigeben
  return children;
}

export default ProtectedRoute;