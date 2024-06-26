import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <Navbar bg="dark" variant="dark" className="navbar">
        <Navbar.Brand as={Link} to="/">EMS</Navbar.Brand>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/employee-registration">Employee Registration</Nav.Link>
          <Nav.Link as={Link} to="/attendance">Attendance</Nav.Link>
          <Nav.Link as={Link} to="/payroll">Payroll</Nav.Link>
          <Nav.Link as={Link} to="/appraisal">Appraisal</Nav.Link>
          <Nav.Link as={Link} to="/view-employee">View Employee</Nav.Link>
          <Nav.Link as={Link} to="/view-details">View Details</Nav.Link>
          <Nav.Link as={Link} to="/view-shifts">View Shifts</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="main-content">
        {children}
      </Container>
    </div>
  );
};

export default Layout;
