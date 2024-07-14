// import React from 'react';
// import api from '../services/api';
// import { useNavigate } from 'react-router-dom';

// const Logout = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await api.delete('/logout');
//       // Clear the token from local storage
//       localStorage.removeItem('token');
//       alert('Logged out successfully');
//       navigate('/login');
//     } catch (error) {
//       alert('Logout failed');
//       console.error('Logout error:', error); // Log error details for debugging
//     }
//   };

//   return (
//     <button onClick={handleLogout}>Logout</button>
//   );
// };

// export default Logout;
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    
    // Show an alert message
    alert('Logged out successfully');
    
    // Navigate to the homepage
    navigate('/');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
