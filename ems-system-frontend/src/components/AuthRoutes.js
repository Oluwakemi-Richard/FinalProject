import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoutes = ({ children }) => {
  const email = localStorage.getItem('email');

  if (email !== 'ade1111@gmail.com') {
    return <Navigate to="/"/>;
  }

  return children;
};

export default AuthRoutes;
