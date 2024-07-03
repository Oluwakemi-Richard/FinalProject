import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Table } from 'react-bootstrap';
import axios from 'axios';

const LeaveRequest = () => {
  const [employee, setEmployee] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchEmployeeAndLeaves();
  }, []);

  const fetchEmployeeAndLeaves = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/employees?email=boob123@gmail.com');
      const employee = response.data[0]; // Assuming the API returns an array of employees
      console.log('Fetched employee:', employee);
      setEmployee(employee);
      if (employee) fetchLeaves(employee.id);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const fetchLeaves = async (employeeId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/employees/${employeeId}/leaves`);
      console.log('Fetched leaves:', response.data);
      setLeaves(response.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
      setLeaves([]); // Handle no records case
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!employee) return;
    try {
      const response = await axios.post(`http://localhost:3000/api/employees/${employee.id}/leaves`, {
        leave: {
          start_date: startDate,
          end_date: endDate,
          reason: reason,
        },
      });
      setLeaves([...leaves, response.data]);
      setStartDate('');
      setEndDate('');
      setReason('');
    } catch (error) {
      console.error('Error submitting leave:', error);
    }
  };

  const handleDelete = async (leaveId) => {
    if (!employee) return;
    try {
      await axios.delete(`http://localhost:3000/api/employees/${employee.id}/leaves/${leaveId}`);
      setLeaves(leaves.filter((leave) => leave.id !== leaveId));
    } catch (error) {
      console.error('Error deleting leave:', error);
    }
  };

  const calculateLeaveDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    let totalDays = 0;
    let currentDate = startDate;

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude weekends
        totalDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return totalDays;
  };

  return (
    <Container>
      <h1>Leave Management</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="reason">
          <Form.Label>Reason</Form.Label>
          <Form.Control
            as="select"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          >
            <option value="">Select a reason</option>
            <option value="Vacation">Vacation</option>
            <option value="Sick">Sick</option>
            <option value="Personal">Personal</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {leaves.length > 0 ? (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Total Leave Days</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.start_date}</td>
                <td>{leave.end_date}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
                <td>{calculateLeaveDays(leave.start_date, leave.end_date)}</td>
                <td>
                  {leave.status === 'pending' && (
                    <Button variant="danger" onClick={() => handleDelete(leave.id)}>
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No leave records found.</p>
      )}
    </Container>
  );
};

export default LeaveRequest;
