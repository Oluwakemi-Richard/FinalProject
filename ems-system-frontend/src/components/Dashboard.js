// import React from 'react';
// import ShiftAssignment from './ShiftAssignment';

// const Dashboard = () => (
//   <div>
//     <h1>Dashboard</h1>
//     <p>Dashboard in progress</p>
//     <ShiftAssignment />
//   </div>
// );

// export default Dashboard;
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
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
                <Link to="/shift-assignment" className="dashboard-link assign-shifts">Assign Shifts</Link>
                <Link to="/payroll" className="dashboard-link generate-payroll">Generate Payroll</Link>
                <Link to="/check-notifications" className="dashboard-link check-notifications">Check Notifications</Link>
                <Link to="/appraisal" className="dashboard-link appraisal">Appraisal</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
