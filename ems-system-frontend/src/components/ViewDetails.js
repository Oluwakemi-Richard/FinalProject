import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Employee.css';

const ViewDetails = () => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get('/api/details/1001');
        setDetails(response.data);
      } catch (error) {
        setError('Error fetching employee details. Please try again later.');
        console.error('Error fetching employee details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="view-details-container">
      <h1>Employee Details</h1>
      <div className="details-card">
        <div className="details-item">
          <span className="details-label">Employee ID:</span>
          <span className="details-value">{details.id || 'N/A'}</span>
        </div>
        <div className="details-item">
          <span className="details-label">Name:</span>
          <span className="details-value">{details.name || 'N/A'}</span>
        </div>
        <div className="details-item">
          <span className="details-label">Department:</span>
          <span className="details-value">{details.department || 'N/A'}</span>
        </div>
        <div className="details-item">
          <span className="details-label">Position:</span>
          <span className="details-value">{details.position || 'N/A'}</span>
        </div>
        <div className="details-item">
          <span className="details-label">Email:</span>
          <span className="details-value">{details.email || 'N/A'}</span>
        </div>
        <div className="details-item">
          <span className="details-label">Address:</span>
          <span className="details-value">{details.address || 'N/A'}</span>
        </div>
        <div className="details-item">
          <span className="details-label">Phone Number:</span>
          <span className="details-value">{details.phone_number || 'N/A'}</span>
        </div>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default ViewDetails;
