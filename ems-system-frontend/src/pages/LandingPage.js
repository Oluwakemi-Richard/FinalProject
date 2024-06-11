import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1>Welcome to the Employee Management System</h1>
          <p>Manage all your employees in one place.</p>
          <p>
            <Button variant="primary" as={Link} to="/employees">Get Started</Button>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
