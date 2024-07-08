import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('/api/auth/status');
        if (!response.data.logged_in) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        navigate('/');
      }
    };

    checkAuthStatus();
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
