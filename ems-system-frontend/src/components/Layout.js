// import React from 'react';
// import { Container, Navbar, Nav } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import Footer from './Footer';

// const Layout = ({ children }) => {
//   return (
//     <div>
//       <Navbar bg="dark" variant="dark" expand="lg">
//         <Navbar.Brand as={Link} to="/">EMS</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="mr-auto">
//             <Nav.Link as={Link} to="/">Home</Nav.Link>
//             <Nav.Link as={Link} to="/employees">Employees</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//       <Container>
//         {children}
//       </Container>
//       <Footer />
//     </div>
//   );
// };

// export default Layout;

// src/components/Layout.js


import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      <Navbar bg="dark" variant="dark" className="flex-column p-3" style={{ height: '100vh', width: '250px' }}>
        <Navbar.Brand as={Link} to="/">EMS</Navbar.Brand>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/employee-registration">Employee Registration</Nav.Link>
          <Nav.Link as={Link} to="/attendance">Attendance</Nav.Link>
          <Nav.Link as={Link} to="/payroll">Payroll</Nav.Link>
          <Nav.Link as={Link} to="/appraisal">Appraisal</Nav.Link>
          <Nav.Link as={Link} to="/view-employee">View Employee</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="p-4" style={{ marginLeft: '250px' }}>
        {children}
      </Container>
    </div>
  );
};

export default Layout;