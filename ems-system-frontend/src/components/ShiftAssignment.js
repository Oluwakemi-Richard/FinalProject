import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../styles/Shift.css';

const ShiftAssignment = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    employee_number: '',
    employee_name: '',
    shift_date: '',
    start_time: '',
    end_time: '',
  });
  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
    setFormData({ ...formData, shift_date: date.toISOString().split('T')[0] });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.employee_number) newErrors.employee_number = 'Employee number is required';
    if (!formData.employee_name) newErrors.employee_name = 'Employee name is required';
    if (!formData.shift_date) newErrors.shift_date = 'Shift date is required';
    if (!formData.start_time) newErrors.start_time = 'Start time is required';
    if (!formData.end_time) newErrors.end_time = 'End time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:3000/api/shifts', formData);
      setShowModal(false);
      alert('Shift assigned successfully');
    } catch (error) {
      console.error('Error creating shift:', error);
      alert('Failed to assign shift');
    }
  };

  const handleEmployeeSearch = async (query) => {
    setQuery(query);
    if (query.trim() !== '') {
      try {
        const response = await axios.get(`http://localhost:3000/api/employees?query=${query}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching employee suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleEmployeeSelect = (employee) => {
    setFormData({ ...formData, employee_number: employee.employee_number, employee_name: employee.name });
    setSuggestions([]);
    setQuery(employee.name);
  };

  return (
    <div className="shift-assignment-container">
      <h1>Shift Assignment</h1>
      <Calendar
        className="custom-calendar"
        onClickDay={handleDateClick}
        value={selectedDate}
      />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Shift</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="employee_name">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                name="employee_name"
                value={query}
                onChange={(e) => handleEmployeeSearch(e.target.value)}
                isInvalid={!!errors.employee_name}
                autoComplete="off"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.employee_name}
              </Form.Control.Feedback>
              {suggestions.length > 0 && (
                <div className="suggestions">
                  {suggestions.map((s) => (
                    <div key={s.id} onClick={() => handleEmployeeSelect(s)}>
                      {s.name}
                    </div>
                  ))}
                </div>
              )}
            </Form.Group>
            <Form.Group controlId="employee_number">
              <Form.Label>Employee Number</Form.Label>
              <Form.Control
                type="text"
                name="employee_number"
                value={formData.employee_number}
                onChange={handleFormChange}
                isInvalid={!!errors.employee_number}
                readOnly
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.employee_number}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="shift_date">
              <Form.Label>Shift Date</Form.Label>
              <Form.Control
                type="date"
                name="shift_date"
                value={formData.shift_date}
                onChange={handleFormChange}
                isInvalid={!!errors.shift_date}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.shift_date}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="start_time">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleFormChange}
                isInvalid={!!errors.start_time}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.start_time}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="end_time">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleFormChange}
                isInvalid={!!errors.end_time}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.end_time}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Assign Shift
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ShiftAssignment;
