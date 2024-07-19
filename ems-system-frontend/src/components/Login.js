// import React, { useState } from 'react';
// import api from '../services/api';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/login', { user: { email, password } });
//       // Save the token in local storage
//       localStorage.setItem('token', response.data.token);
//       alert('Login successful');
//       navigate('/');
//     } catch (error) {
//       alert('Login failed');
//       console.error('Login error:', error); // Log error details for debugging
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import api from '../services/api';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/login', { user: { email, password } });
//       // Save the token and email in local storage
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('email', email);
//       alert('Login successful');
//       navigate('/dashboard');
//     } catch (error) {
//       alert('Login failed');
//       console.error('Login error:', error); // Log error details for debugging
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// //import axios from 'axios';
// import '../styles/Auth.css';
// import api from '../services/api';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/login', { user: { email, password } });
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('email', email);

//       const employeeResponse = await api.get('/api/current_employee', {
//         headers: { Authorization: `Bearer ${response.data.token}` },
//       });
//       console.log(employeeResponse)
//       localStorage.setItem('employeeName', employeeResponse.data.name);

//       alert('Login successful');
//       navigate('/dashboard');
//     } catch (error) {
//       localStorage.clear();
//       alert('Login failed');
//       console.error('Login error:', error);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Auth.css';
// import api from '../services/api';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/login', { user: { email, password } });
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('email', email);

//       try {
//         const employeeResponse = await api.get('/api/current_employee', {
//           headers: { Authorization: `Bearer ${response.data.token}` },
//         });

//         localStorage.setItem('employeeName', employeeResponse.data.name);
//         alert('Login successful');
//         navigate('/dashboard');
//       } catch (employeeError) {
//         console.error('Employee error:', employeeError);
//         localStorage.clear();
//         alert('Only employees can access this application.');
//       }

//     } catch (error) {
//       localStorage.clear();
//       alert('Login failed');
//       console.error('Login error:', error);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { user: { email, password } });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', email);

      try {
        const employeeResponse = await api.get('/api/current_employee', {
          headers: { Authorization: `Bearer ${response.data.token}` },
        });

        localStorage.setItem('employeeName', employeeResponse.data.name);
        alert('Login successful');
        
        // Navigate to dashboard if the email is ade1111@gmail.com, else navigate to employee portal
        if (email === 'ade1111@gmail.com') {
          navigate('/dashboard');
        } else {
          navigate('/employee-portal');
        }
      } catch (employeeError) {
        console.error('Employee error:', employeeError);
        localStorage.clear();
        alert('Only employees can access this application.');
      }

    } catch (error) {
      localStorage.clear();
      alert('Login failed');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
