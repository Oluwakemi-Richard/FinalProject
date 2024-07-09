// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Auth.css';

// const SignIn = ({ onSignUpClick }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/users/sign_in', {
//         user: { email, password }
//       });
//       console.log(response.data);
//       alert('Signed in successfully!');
//       navigate('/dashboard');  // Redirect to dashboard
//     } catch (error) {
//       console.error('Error signing in', error);
//       alert('Failed to sign in');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Sign In</h2>
//       <form onSubmit={handleSignIn}>
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
//         <button type="submit">Sign In</button>
//       </form>
//       <p onClick={onSignUpClick}>Don't have an account? Sign Up</p>
//     </div>
//   );
// };

// export default SignIn;
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import { AuthContext } from '../App';

const SignIn = ({ onSignUpClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuthenticated, setSessionCookie } = useContext(AuthContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/sign_in', {
        user: { email, password }
      });
      setSessionCookie(response.headers['set-cookie']);
      setAuthenticated(true);
      alert('Signed in successfully!');
      navigate('/dashboard');  // Redirect to dashboard
    } catch (error) {
      console.error('Error signing in', error);
      alert('Failed to sign in');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      <p onClick={onSignUpClick}>Don't have an account? Sign Up</p>
    </div>
  );
};

export default SignIn;
