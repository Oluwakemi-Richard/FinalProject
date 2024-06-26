import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const Attendance = () => {
  const [attendances, setAttendances] = useState([]);
  const [staffName, setStaffName] = useState('');
  const [shiftDate, setShiftDate] = useState('');

  const fetchAttendances = async () => {
    try {
      const params = {};
      if (staffName) params.staff_name = staffName;
      if (shiftDate) params.shift_date = shiftDate;

      const response = await axios.get('http://localhost:3000/api/attendances', { params });
      setAttendances(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  useEffect(() => {
    fetchAttendances();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAttendances();
  };

  return (
    <div>
      <h1>Attendance</h1>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="staffName">
          <Form.Label>Staff Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter staff name"
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="shiftDate">
          <Form.Label>Shift Date</Form.Label>
          <Form.Control
            type="date"
            value={shiftDate}
            onChange={(e) => setShiftDate(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Staff Name</th>
            <th>Shift Date</th>
            <th>Assigned Shift</th>
            <th>Time Worked</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((attendance) => (
            <tr key={attendance.id}>
              <td>{attendance.staff_name}</td>
              <td>{attendance.shift_date}</td>
              <td>{attendance.assigned_shift}</td>
              <td>{attendance.time_worked}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Attendance;
