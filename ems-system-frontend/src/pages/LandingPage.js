// // import React from 'react';
// // import { Container, Row, Col, Button } from 'react-bootstrap';
// // import { Link } from 'react-router-dom';

// // const LandingPage = () => {
// //   return (
// //     <Container className="mt-5">
// //       <Row className="justify-content-md-center">
// //         <Col md="auto">
// //           <h1>Welcome to the Employee Management System</h1>
// //           <p>Manage all your employees in one place.</p>
// //           <p>
// //             <Button variant="primary" as={Link} to="/employees">Get Started</Button>
// //           </p>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default LandingPage;
// // import React, { useState } from 'react';
// // import SignIn from '../components/SignIn';
// // import Register from '../components/Register';

// // const LandingPage = () => {
// //   const [showSignUp, setShowSignUp] = useState(false);

// //   return (
// //     <div className="landing-page">
// //       {showSignUp ? (
// //         <Register onSignInClick={() => setShowSignUp(false)} />
// //       ) : (
// //         <SignIn onSignUpClick={() => setShowSignUp(true)} />
// //       )}
// //     </div>
// //   );
// // };

// // export default LandingPage;

// import React, { useState } from 'react';
// import SignIn from '../components/SignIn';
// import Register from '../components/Register';

// const LandingPage = () => {
//   const [showSignUp, setShowSignUp] = useState(false);

//   return (
//     <div className="landing-page">
//       {showSignUp ? (
//         <Register onSignInClick={() => setShowSignUp(false)} />
//       ) : (
//         <SignIn onSignUpClick={() => setShowSignUp(true)} />
//       )}
//     </div>
//   );
// };

// export default LandingPage;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Login from '../components/Login';
// import Register from '../components/Register';
// import '../styles/Auth.css'; 

// const LandingPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       navigate('/dashboard');
//     }
//   }, [navigate]);

//   return (
//     <div className="auth-container">
//       <h1>Welcome</h1>
//       <div className="switch-buttons">
//         <button onClick={() => setIsLogin(true)}>Login</button>
//         <button onClick={() => setIsLogin(false)}>Register</button>
//       </div>
//       {isLogin ? <Login /> : <Register />}
//     </div>
//   );
// };

// export default LandingPage;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// import api from '../services/api';
// import Login from '../components/Login';
// import Register from '../components/Register';
// import '../styles/LandingPage.css'; 

// const LandingPage = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLogin, setShowLogin] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the user is already logged in
//     const token = localStorage.getItem('token');
//     if (token) {
//       api
//         .get('/api/current_employee', {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then(() => {
//           setIsLoggedIn(true);
//           navigate('/dashboard');
//         })
//         .catch(() => {
//           setIsLoggedIn(false);
//         });
//     }
//   }, [navigate]);

//   const toggleForm = () => {
//     setShowLogin(!showLogin);
//   };

//   if (isLoggedIn) {
//     return <h1>Redirecting to dashboard...</h1>;
//   }

//   return (
//     <div className="landing-page">
//       <div className="form-container">
//         {showLogin ? <Login /> : <Register />}
//         {/* <p onClick={toggleForm}>
//           {showLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Sign In'}
//         </p> */}
//          <p onClick={toggleForm} style={{ cursor: 'pointer', textDecoration: 'underline', color: '#007bff' }}>
//           {showLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Login from '../components/Login';
import Register from '../components/Register';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    
    if (token && email) {
      api.get('/api/current_employee', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setIsLoggedIn(true);
        if (email === 'ade1111@gmail.com') {
          navigate('/dashboard');
        } else {
          navigate('/employee-portal');
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
    }
  }, [navigate]);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  if (isLoggedIn) {
    return <h1>Redirecting...</h1>;
  }

  return (
    <div className="landing-page">
      <div className="form-container">
        {showLogin ? <Login /> : <Register />}
        <p onClick={toggleForm} style={{ cursor: 'pointer', textDecoration: 'underline', color: '#007bff' }}>
          {showLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
        </p>
      </div>
    </div>
  );
};

export default LandingPage;

