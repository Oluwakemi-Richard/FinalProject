import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Table } from 'react-bootstrap';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ViewEmployee = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [years, setYears] = useState([]);
  const [appraisals, setAppraisals] = useState([]);
  const [questionsHeadings, setQuestionsHeadings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchYears();
  }, []);

  const fetchYears = async () => {
    try {
      const response = await api.get('/api/appraisals/years');
      setYears(response.data);
    } catch (error) {
      console.error('Error fetching years:', error);
    }
  };

  const handleEmployeeSearch = async (query) => {
    setQuery(query);
    if (query.trim() !== '') {
      try {
        const response = await api.get(`/api/employees?query=${query}`);
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
      const response = await api.get(`/api/employees/${id}`);
      setEmployee(response.data);
      setQuery(response.data.name); // Set the query to the selected employee's name
      setSuggestions([]);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const fetchAppraisals = async () => {
    if (employee && selectedYear) {
      try {
        const response = await api.get(`/api/appraisals/${employee.id}/${selectedYear}`);
        setAppraisals(response.data);
        if (response.data.length > 0) {
          setQuestionsHeadings(Object.keys(response.data[0].questions || {}));
        }
      } catch (error) {
        console.error('Error fetching appraisals:', error);
      }
    }
  };

  const calculateAverageScore = (questions) => {
    const values = Object.values(questions || {}).map(Number);
    const sum = values.reduce((a, b) => a + b, 0);
    return values.length ? (sum / values.length).toFixed(2) : 'N/A';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container className="container">
      <h1>Check Performance</h1>
      <Form>
        <Form.Group controlId="employeeSearch">
          <Form.Label>Employee Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type to search..."
            value={query}
            onChange={(e) => handleEmployeeSearch(e.target.value)}
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
        </Form.Group>
        {employee && (
          <>
            <Form.Group controlId="appraisalYear">
              <Form.Label>Appraisal Year</Form.Label>
              <Form.Control
                as="select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Select year...</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button onClick={fetchAppraisals}>Fetch Appraisals</Button>
          </>
        )}
      </Form>
      {employee && selectedYear && (
        <>
          <h2>Appraisals for {employee.name} for the year {selectedYear}</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Month</th>
                <th>Appraised By</th>
                {questionsHeadings.map((heading) => (
                  <th key={heading}>{heading.replace(/_/g, ' ')}</th>
                ))}
                <th>Average Score</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {appraisals.map((appraisal) => (
                <tr key={appraisal.id}>
                  <td>{new Date(2023, appraisal.appraisal_month - 1).toLocaleString('default', { month: 'long' })}</td>
                  <td>{appraisal.appraised_by}</td>
                  {questionsHeadings.map((heading) => (
                    <td key={heading}>{appraisal.questions?.[heading] || 'N/A'}</td>
                  ))}
                  <td>{calculateAverageScore(appraisal.questions)}</td>
                  <td>{appraisal.notes}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button onClick={handlePrint}>Print/Save as PDF</Button>
        </>
      )}
    </Container>
  );
};

export default ViewEmployee;