// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ProtectedRoute = ({ children }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const response = await axios.get('/authentication/login');
//         if (!response.data.logged_in) {
//           navigate('/');
//         }
//       } catch (error) {
//         console.error('Error checking auth status:', error);
//         navigate('/');
//       }
//     };

//     checkAuthStatus();
//   }, [navigate]);

//   return children;
// };

// export default ProtectedRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

