import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import '../App.css';

const ViewShifts = () => {
  const [shifts, setShifts] = useState([]);
  const [tab, setTab] = useState('upcoming');
  const [employeeNumber, setEmployeeNumber] = useState('1003');

  useEffect(() => {
    fetchShifts();
  }, [tab]);

  const fetchShifts = async () => {
    try {
      const endpoint = tab === 'upcoming' ? 'upcoming_shifts' : tab === 'ongoing' ? 'ongoing_shifts' : 'past_shifts';
      const response = await axios.get(`/api/shifts/${endpoint}`, {
        params: { employee_number: employeeNumber }
      });
      setShifts(response.data);
    } catch (error) {
      console.error('Error fetching shifts:', error);
    }
  };

  const handleCheckIn = async (shiftId) => {
    try {
      await axios.put(`/api/attendances/${shiftId}/check_in`);
      alert('Checked in successfully');
      fetchShifts(); // Refresh the shifts to reflect the change
    } catch (error) {
      console.error('Error checking in:', error);
    }
  };

  const handleCheckOut = async (shiftId) => {
    try {
      await axios.put(`/api/attendances/${shiftId}/check_out`, { employee_number: employeeNumber });
      alert('Checked out successfully');
      fetchShifts(); // Refresh the shifts to reflect the change
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  const canCheckIn = (shift) => {
    return !shift.checked_in && !shifts.some(s => s.id !== shift.id && s.checked_out);
  };

  const canCheckOut = (shift) => {
    return shift.checked_in && !shifts.some(s => s.id !== shift.id && s.checked_in);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>{tab === 'upcoming' ? 'Upcoming Shifts' : tab === 'ongoing' ? 'Ongoing Shifts' : 'Past Shifts'}</h1>
          <Tabs activeKey={tab} onSelect={(k) => setTab(k)} className="mb-3 tabs-container">
            <Tab eventKey="upcoming" title="Upcoming Shifts"></Tab>
            <Tab eventKey="ongoing" title="Ongoing Shifts"></Tab>
            <Tab eventKey="past" title="Past Shifts"></Tab>
          </Tabs>
          {tab === 'ongoing' && shifts.length === 0 ? (
            <p>You have no ongoing shifts</p>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Shift Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shifts.map(shift => (
                    <tr key={shift.id}>
                      <td>{shift.shift_date}</td>
                      <td>{shift.start_time}</td>
                      <td>{shift.end_time}</td>
                      <td className="button-container">
                        {!shift.checked_in && canCheckIn(shift) && (
                          <Button variant="primary" onClick={() => handleCheckIn(shift.id)}>Check In</Button>
                        )}
                        {shift.checked_in && !shift.checked_out && canCheckOut(shift) && (
                          <Button variant="danger" onClick={() => handleCheckOut(shift.id)}>Check Out</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewShifts;
