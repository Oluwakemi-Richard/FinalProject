import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <Container>
        <Row>
          <Col>
            <p className="mb-0">© 2024 Employee Management System</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;