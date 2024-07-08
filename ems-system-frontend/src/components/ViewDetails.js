import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ViewDetails = () => {
  const [details, setDetails] = useState({});
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/details/1001');
        setDetails(response.data);
        setAddress(response.data.address);
        setPhoneNumber(response.data.phone_number);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchDetails();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3000/api/details/1001', { address, phone_number: phoneNumber });
      alert('Details updated successfully');
    } catch (error) {
      console.error('Error updating details:', error);
    }
  };

  return (
    <div>
      <h1>Employee Details</h1>
      <Form onSubmit={handleUpdate}>
        {Object.keys(details).map((key) => (
          key !== 'address' && key !== 'phone_number' && (
            <Form.Group key={key} controlId={key}>
              <Form.Label>{key.replace('_', ' ').toUpperCase()}</Form.Label>
              <Form.Control type="text" value={details[key]} readOnly />
            </Form.Group>
          )
        ))}
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">Update</Button>
      </Form>
    </div>
  );
};

export default ViewDetails;