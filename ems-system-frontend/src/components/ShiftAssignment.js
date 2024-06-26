// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import { Modal, Form, Button } from 'react-bootstrap';
// import axios from 'axios';

// const ShiftAssignment = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [formData, setFormData] = useState({
//     employee_number: '',
//     shift_date: '',
//     start_time: '',
//     end_time: '',
//   });

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//     setShowModal(true);
//     setFormData({ ...formData, shift_date: date.toISOString().split('T')[0] });
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3000/api/shifts', formData);
//       setShowModal(false);
//       alert('Shift assigned successfully');
//     } catch (error) {
//       console.error('Error creating shift:', error);
//       alert('Failed to assign shift');
//     }
//   };

//   return (
//     <div>
//       <h1>Shift Assignment</h1>
//       <Calendar onClickDay={handleDateClick} />
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Assign Shift</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleFormSubmit}>
//             <Form.Group controlId="employee_number">
//               <Form.Label>Employee Number</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="employee_number"
//                 value={formData.employee_number}
//                 onChange={handleFormChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="shift_date">
//               <Form.Label>Shift Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="shift_date"
//                 value={formData.shift_date}
//                 onChange={handleFormChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="start_time">
//               <Form.Label>Start Time</Form.Label>
//               <Form.Control
//                 type="time"
//                 name="start_time"
//                 value={formData.start_time}
//                 onChange={handleFormChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="end_time">
//               <Form.Label>End Time</Form.Label>
//               <Form.Control
//                 type="time"
//                 name="end_time"
//                 value={formData.end_time}
//                 onChange={handleFormChange}
//                 required
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Assign Shift
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default ShiftAssignment;
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../styles/Shift.css';

const ShiftAssignment = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    employee_number: '',
    shift_date: '',
    start_time: '',
    end_time: '',
  });

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
    setFormData({ ...formData, shift_date: date.toISOString().split('T')[0] });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/shifts', formData);
      setShowModal(false);
      alert('Shift assigned successfully');
    } catch (error) {
      console.error('Error creating shift:', error);
      alert('Failed to assign shift');
    }
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
            <Form.Group controlId="employee_number">
              <Form.Label>Employee Number</Form.Label>
              <Form.Control
                type="text"
                name="employee_number"
                value={formData.employee_number}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="shift_date">
              <Form.Label>Shift Date</Form.Label>
              <Form.Control
                type="date"
                name="shift_date"
                value={formData.shift_date}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="start_time">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="end_time">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleFormChange}
                required
              />
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
