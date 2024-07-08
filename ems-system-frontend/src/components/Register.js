// import React, { useState } from 'react';
// import axios from 'axios';
// import '../styles/Auth.css';

// const Register = ({ onSignInClick }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordConfirmation, setPasswordConfirmation] = useState('');

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/users', {
//         user: { email, password, password_confirmation: passwordConfirmation }
//       });
//       console.log(response.data);
//       alert('Signed up successfully!');
//     } catch (error) {
//       console.error('Error signing up', error);
//       alert('Failed to sign up');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSignUp}>
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
//         <input
//           type="password"
//           placeholder="Password Confirmation"
//           value={passwordConfirmation}
//           onChange={(e) => setPasswordConfirmation(e.target.value)}
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//       <p onClick={onSignInClick}>Already have an account? Sign In</p>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const SignUp = ({ onSignInClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users', {
        user: { email, password, password_confirmation: passwordConfirmation }
      });
      console.log(response.data);
      alert('Signed up successfully!');
      navigate('/dashboard');  // Redirect to dashboard
    } catch (error) {
      console.error('Error signing up', error);
      alert('Failed to sign up');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
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
        <input
          type="password"
          placeholder="Password Confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p onClick={onSignInClick}>Already have an account? Sign In</p>
    </div>
  );
};

export default SignUp;

