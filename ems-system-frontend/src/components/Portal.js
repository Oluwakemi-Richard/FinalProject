import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Portal = () => {
  const user = {
    firstName: 'Oluwakemi',
    lastName: 'Richard',
  };

  const getInitials = () => {
    return user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();
  };

  return (
    <Container fluid>
      <Row>
        <Col md={10} className="offset-md-2 content">
          <Card className="mt-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <h2>Welcome, {user.firstName}</h2>
                <div className="profile-avatar">
                  <span className="initials">{getInitials()}</span>
                </div>
              </div>
              <p>Here you can manage various tasks.</p>
              <div className="dashboard-links">
                <Link to="/view-details" className="dashboard-link assign-shifts">View Details</Link>
                <Link to="/view-shifts" className="dashboard-link generate-payroll">View Shifts</Link>
                <Link to="/leave-request" className="dashboard-link check-notifications">Leave Request</Link>
                {/* <Link to="/appraisal" className="dashboard-link appraisal">Appraisal</Link> */}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Portal;
