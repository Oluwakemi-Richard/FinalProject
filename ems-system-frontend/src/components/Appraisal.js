import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Appraisal.css';

const Appraisal = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [appraisalData, setAppraisalData] = useState({
    appraised_by: '',
    appraisal_date: new Date().toISOString().substr(0, 10), // Default to current date (YYYY-MM-DD format)
    notes: '',
    questions: {
      Communication: '',
      TechnicalSkills: '',
      Teamwork: '',
      ProblemSolving: '',
      Punctuality: ''
    },
    employee_id: null,
    appraisal_month: '',
    appraisal_year: new Date().getFullYear().toString() // Default to current year
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');
  const [availableMonths, setAvailableMonths] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (employee) {
      fetchAvailableMonths(); // Fetch available months when employee is selected
    }
  }, [employee]);

  const fetchAvailableMonths = async () => {
    try {
      const response = await axios.get(`/api/employees/${employee.id}/available_months`, {
        params: { appraisal_year: appraisalData.appraisal_year }
      });
      setAvailableMonths(response.data || []);
    } catch (error) {
      console.error('Error fetching available months:', error);
      setAvailableMonths([]);
    }
  };

  const handleEmployeeSearch = async (query) => {
    setQuery(query);
    if (query.trim() !== '') {
      try {
        const response = await axios.get(`/api/employees?query=${query}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching employee suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleEmployeeSelect = async (id) => {
    try {
      const response = await axios.get(`/api/employees/${id}`);
      setEmployee(response.data);
      setAppraisalData({ ...appraisalData, employee_id: id });
      setSuggestions([]);  // Hide suggestions
      setQuery(response.data.name); // Set the query to the selected employee's name
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppraisalData({ ...appraisalData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const handleQuestionChange = (question, value) => {
    setAppraisalData({
      ...appraisalData,
      questions: { ...appraisalData.questions, [question]: value }
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!appraisalData.employee_id) errors.employee_id = 'Employee is required';
    if (!appraisalData.appraised_by) errors.appraised_by = 'Appraised By is required';
    if (!appraisalData.appraisal_date) errors.appraisal_date = 'Appraisal Date is required';
    if (!appraisalData.appraisal_month) errors.appraisal_month = 'Appraisal Month is required';
    Object.keys(appraisalData.questions).forEach(question => {
      if (!appraisalData.questions[question]) errors[`questions.${question}`] = `${question} is required`;
    });
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      await axios.post('/api/appraisals', appraisalData);
      setAlertMessage('Appraisal submitted successfully');
      setAlertVariant('success');
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      console.error('Error submitting appraisal:', error);
      setAlertMessage('Failed to submit appraisal');
      setAlertVariant('danger');
    }
  };

  // Map month numbers to names
  const monthNames = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <Container className="container">
      <h1>Appraisal</h1>
      {alertMessage && <Alert variant={alertVariant}>{alertMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="employeeSearch">
          <Form.Label>Employee Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type to search..."
            value={query}
            onChange={(e) => handleEmployeeSearch(e.target.value)}
            isInvalid={!!validationErrors.employee_id}
          />
          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map((s) => (
                <div key={s.id} onClick={() => handleEmployeeSelect(s.id)}>
                  {s.name}
                </div>
              ))}
            </div>
          )}
          <Form.Control.Feedback type="invalid">
            {validationErrors.employee_id}
          </Form.Control.Feedback>
        </Form.Group>
        {employee && (
          <>
            <Card>
              <Card.Body>
                <Card.Title>{employee.name}</Card.Title>
                <Card.Text>Employee Number: {employee.employee_number}</Card.Text>
                <Card.Text>Department: {employee.department}</Card.Text>
                <Card.Text>Branch: {employee.branch}</Card.Text>
                <Card.Text>Position: {employee.position}</Card.Text>
              </Card.Body>
            </Card>
            <Form.Group controlId="appraisalYear">
              <Form.Label>Appraisal Year</Form.Label>
              <Form.Control
                type="text"
                name="appraisal_year"
                value={appraisalData.appraisal_year}
                onChange={handleInputChange}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="appraisalMonth">
              <Form.Label>Select Month</Form.Label>
              <Form.Control
                as="select"
                value={appraisalData.appraisal_month}
                onChange={(e) => setAppraisalData({ ...appraisalData, appraisal_month: e.target.value })}
                isInvalid={!!validationErrors.appraisal_month}
              >
                <option value="">Select...</option>
                {availableMonths.length > 0 && availableMonths.map((month) => (
                  <option key={month} value={month}>
                    {monthNames[month]}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {validationErrors.appraisal_month}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="appraised_by">
              <Form.Label>Appraised By</Form.Label>
              <Form.Control
                type="text"
                name="appraised_by"
                value={appraisalData.appraised_by}
                onChange={handleInputChange}
                isInvalid={!!validationErrors.appraised_by}
                required
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.appraised_by}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="appraisal_date">
              <Form.Label>Appraisal Date</Form.Label>
              <Form.Control
                type="date"
                name="appraisal_date"
                value={appraisalData.appraisal_date}
                onChange={handleInputChange}
                isInvalid={!!validationErrors.appraisal_date}
                required
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.appraisal_date}
              </Form.Control.Feedback>
            </Form.Group>
            <h2>Kindly rate this employee on a scale of 1 to 5</h2>
            {["Communication", "TechnicalSkills", "Teamwork", "ProblemSolving", "Punctuality"].map((question) => (
              <Form.Group controlId={question} key={question}>
                <Form.Label>{question}</Form.Label>
                {[1, 2, 3, 4, 5].map(score => (
                  <Form.Check
                    key={score}
                    type="radio"
                    label={score}
                    name={`questions.${question}`}
                    value={score}
                    onChange={(e) => handleQuestionChange(question, score)}
                    isInvalid={!!validationErrors[`questions.${question}`]}
                  />
                ))}
                <Form.Control.Feedback type="invalid">
                  {validationErrors[`questions.${question}`]}
                </Form.Control.Feedback>
              </Form.Group>
            ))}
            <Form.Group controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                value={appraisalData.notes}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button type="submit">Submit Appraisal</Button>
          </>
        )}
      </Form>
    </Container>
  );
};

export default Appraisal;
