// import React, { useState } from 'react';
// import { Container, Navbar, Nav } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import '../App.css';

// const Layout = ({ children }) => {
//   const [expanded, setExpanded] = useState(false);

//   const toggleNavbar = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <div className="layout-wrapper">
//       <Navbar bg="dark" variant="dark" expand="md" className="navbar" expanded={expanded}>
//         <Navbar.Brand as={Link} to="/dashboard" onClick={() => setExpanded(false)}>EMS</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="flex-column">
//             <Nav.Link as={Link} to="/dashboard" onClick={() => setExpanded(false)}>Dashboard</Nav.Link>
//             <Nav.Link as={Link} to="/employee-portal" onClick={() => setExpanded(false)}>Portal</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//       <Container className="main-content">
//         {children}
//       </Container>
//     </div>
//   );
// };

// export default Layout;
import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
//import axios from 'axios';
import '../App.css';
import logo from '../assets/logo-company.png';
import api from '../services/api';
import Login from '../components/Login';


const Layout = ({ children, setAuthenticated }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   delete api.defaults.headers.common['Authorization'];
  //   setIsLoggedIn(false);
  //   alert('Logged out successfully');
  //   navigate('/login');
  // };
  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   alert('Logged out successfully');
  //   navigate('/');
  // };
  const handleLogout = () => {
    localStorage.clear();
    alert('Logged out successfully');
    navigate('/');
  };
  


  return (
    <div className="layout-wrapper">
      <Navbar expand="md" className="navbar" expanded={expanded}>
      <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>
        <img id='c_logo' src={logo} alt="Company Logo" />
        {/* <img src={'../assets/logo.png'} alt="Logo" /> */}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/dashboard" onClick={() => setExpanded(false)}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/employee-portal" onClick={() => setExpanded(false)}>Portal</Nav.Link>
            <Nav.Link className="logout-link" onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="main-content">
        {children}
      </Container>
    </div>
  );
};

export default Layout;
