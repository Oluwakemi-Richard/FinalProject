import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-dark text-white mt-4 py-3" style={{ position: 'fixed', bottom: 0, width: '100%' }}>
    <Container>
      <p className="mb-0 text-center">© 2024 EMS, All Rights Reserved.</p>
    </Container>
  </footer>
);

export default Footer;