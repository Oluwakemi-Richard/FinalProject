// import React, { useState, useEffect } from 'react';
// import { Table, Button, Container } from 'react-bootstrap';
// import axios from 'axios';

// const PendingLeaves = () => {
//   const [pendingLeaves, setPendingLeaves] = useState([]);
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     fetchPendingLeaves();
//   }, []);

//   const fetchPendingLeaves = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/pending_leaves');
//       setPendingLeaves(response.data);
//     } catch (error) {
//       console.error('Error fetching pending leaves:', error);
//     }
//   };

//   const handleApprove = async (leaveId) => {
//     try {
//       await axios.put(`http://localhost:3000/api/pending_leaves/${leaveId}/approve`);
//       setSuccessMessage('Leave approved successfully.');
//       setTimeout(fetchPendingLeaves, 1000); // Refresh after 1 second
//       setPendingLeaves(pendingLeaves.map(leave => leave.id === leaveId ? { ...leave, status: 'approved' } : leave));
//     } catch (error) {
//       console.error('Error approving leave:', error);
//     }
//   };

//   const handleDisapprove = async (leaveId) => {
//     try {
//       await axios.put(`http://localhost:3000/api/pending_leaves/${leaveId}/disapprove`);
//       setSuccessMessage('Leave disapproved successfully.');
//       setTimeout(fetchPendingLeaves, 1000); // Refresh after 1 second
//       setPendingLeaves(pendingLeaves.map(leave => leave.id === leaveId ? { ...leave, status: 'disapproved' } : leave));
//     } catch (error) {
//       console.error('Error disapproving leave:', error);
//     }
//   };

//   return (
//     <Container>
//       <h1>Pending Leave Requests</h1>
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       {pendingLeaves.length > 0 ? (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Employee Name</th>
//               <th>Start Date</th>
//               <th>End Date</th>
//               <th>Reason</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pendingLeaves.map((leave) => (
//               <tr key={leave.id}>
//                 <td>{leave.employee.name}</td>
//                 <td>{leave.start_date}</td>
//                 <td>{leave.end_date}</td>
//                 <td>{leave.reason}</td>
//                 <td>
//                   <Button variant="success" onClick={() => handleApprove(leave.id)} disabled={leave.status !== 'pending'}>
//                     Approve
//                   </Button>
//                   <Button variant="danger" onClick={() => handleDisapprove(leave.id)} disabled={leave.status !== 'pending'}>
//                     Disapprove
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <p>No pending leave requests.</p>
//       )}
//     </Container>
//   );
// };

// export default PendingLeaves;

import React, { useState, useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import '../styles/PendingLeaves.css'; // Import CSS file for component styles

const PendingLeaves = () => {
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchPendingLeaves();
  }, []);

  const fetchPendingLeaves = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/pending_leaves');
      setPendingLeaves(response.data);
    } catch (error) {
      console.error('Error fetching pending leaves:', error);
    }
  };

  const handleApprove = async (leaveId) => {
    try {
      await axios.put(`http://localhost:3000/api/pending_leaves/${leaveId}/approve`);
      setSuccessMessage('Leave approved successfully.');
      setTimeout(() => {
        setSuccessMessage('');
        fetchPendingLeaves();
      }, 1000); // Refresh after 1 second
      setPendingLeaves(pendingLeaves.map(leave => leave.id === leaveId ? { ...leave, status: 'approved' } : leave));
    } catch (error) {
      console.error('Error approving leave:', error);
    }
  };

  const handleDisapprove = async (leaveId) => {
    try {
      await axios.put(`http://localhost:3000/api/pending_leaves/${leaveId}/disapprove`);
      setSuccessMessage('Leave disapproved successfully.');
      setTimeout(() => {
        setSuccessMessage('');
        fetchPendingLeaves();
      }, 1000); // Refresh after 1 second
      setPendingLeaves(pendingLeaves.map(leave => leave.id === leaveId ? { ...leave, status: 'disapproved' } : leave));
    } catch (error) {
      console.error('Error disapproving leave:', error);
    }
  };

  return (
    <Container>
      <h1>Pending Leave Requests</h1>
      {successMessage && <div className="alert">{successMessage}</div>}
      {pendingLeaves.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingLeaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.employee.name}</td>
                <td>{leave.start_date}</td>
                <td>{leave.end_date}</td>
                <td>{leave.reason}</td>
                <td>
                  <Button variant="success" onClick={() => handleApprove(leave.id)} disabled={leave.status !== 'pending'}>
                    Approve
                  </Button>
                  <Button variant="danger" onClick={() => handleDisapprove(leave.id)} disabled={leave.status !== 'pending'}>
                    Disapprove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No pending leave requests.</p>
      )}
    </Container>
  );
};

export default PendingLeaves;
