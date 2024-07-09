import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

const Layout = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="layout-wrapper">
      <Navbar bg="dark" variant="dark" expand="md" className="navbar" expanded={expanded}>
        <Navbar.Brand as={Link} to="/dashboard" onClick={() => setExpanded(false)}>EMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/dashboard" onClick={() => setExpanded(false)}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/employee-portal" onClick={() => setExpanded(false)}>Portal</Nav.Link>
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
