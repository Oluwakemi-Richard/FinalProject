// import React, { useState, useEffect } from 'react';
// import { Form, Button, Table } from 'react-bootstrap';
// import axios from 'axios';

// const Payroll = () => {
//   const [payrollData, setPayrollData] = useState([]);
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const [payDate, setPayDate] = useState('');

//   const fetchPayrollData = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/payrolls/calculate', {
//         params: { month, year }
//       });
//       setPayrollData(response.data);
//     } catch (error) {
//       console.error('Error fetching payroll data:', error);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchPayrollData();
//   };

//   return (
//     <div>
//       <h1>Payroll</h1>
//       <Button variant="primary" onClick={() => alert('View past payrolls clicked')}>View Past Payrolls</Button>
//       <Form onSubmit={handleSearch} className="mt-4">
//         <Form.Group controlId="month">
//           <Form.Label>Month</Form.Label>
//           <Form.Control
//             as="select"
//             value={month}
//             onChange={(e) => setMonth(e.target.value)}
//           >
//             <option value="">Select Month</option>
//             {[...Array(12).keys()].map(m => (
//               <option key={m + 1} value={m + 1}>{new Date(0, m).toLocaleString('default', { month: 'long' })}</option>
//             ))}
//           </Form.Control>
//         </Form.Group>
//         <Form.Group controlId="year">
//           <Form.Label>Year</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter year"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="payDate">
//           <Form.Label>Pay Date</Form.Label>
//           <Form.Control
//             type="date"
//             value={payDate}
//             onChange={(e) => setPayDate(e.target.value)}
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Create Payroll
//         </Button>
//       </Form>

//       <Table striped bordered hover className="mt-4">
//         <thead>
//           <tr>
//             <th>Employee Name</th>
//             <th>Pay Rate</th>
//             <th>Hours Worked</th>
//             <th>Gross Pay</th>
//             <th>Bonuses</th>
//             <th>Tax</th>
//             <th>Pension</th>
//             <th>Other Deductions</th>
//             <th>Net Pay</th>
//           </tr>
//         </thead>
//         <tbody>
//           {payrollData.map((data, index) => (
//             <tr key={index}>
//               <td>{data.employee_name}</td>
//               <td>£{data.pay_rate}</td>
//               <td>{data.total_hours_worked.toFixed(2)}</td>
//               <td>£{data.gross_pay.toFixed(2)}</td>
//               <td contentEditable>{data.bonuses || 0}</td>
//               <td>£{data.tax.toFixed(2)}</td>
//               <td>£{data.pension.toFixed(2)}</td>
//               <td contentEditable>{data.other_deductions || 0}</td>
//               <td>£{data.net_pay.toFixed(2)}</td>
//             </tr>
//           ))}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td colSpan="2">Total Employees</td>
//             <td>{payrollData.length}</td>
//             <td>Total Gross Pay</td>
//             <td>£{payrollData.reduce((acc, data) => acc + data.gross_pay, 0).toFixed(2)}</td>
//             <td>Total Tax</td>
//             <td>£{payrollData.reduce((acc, data) => acc + data.tax, 0).toFixed(2)}</td>
//             <td>Total Net Pay</td>
//             <td>£{payrollData.reduce((acc, data) => acc + data.net_pay, 0).toFixed(2)}</td>
//           </tr>
//         </tfoot>
//       </Table>
//     </div>
//   );
// };

// export default Payroll;
import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';

const Payroll = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [payDate, setPayDate] = useState('');
  const [tab, setTab] = useState('current');

  useEffect(() => {
    if (tab === 'current') {
      fetchPayrollData();
    } else if (tab === 'past') {
      fetchPastPayrollData();
    }
  }, [tab]);

  const fetchPayrollData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/payrolls/calculate', {
        params: { month, year }
      });
      setPayrollData(response.data);
    } catch (error) {
      console.error('Error fetching payroll data:', error);
    }
  };

  const fetchPastPayrollData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/payrolls/past');
      setPayrollData(response.data);
    } catch (error) {
      console.error('Error fetching past payroll data:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPayrollData();
  };

  return (
    <div>
      <Tabs activeKey={tab} onSelect={(k) => setTab(k)} className="mb-3">
        <Tab eventKey="current" title="Current Payroll"></Tab>
        <Tab eventKey="past" title="Past Payroll"></Tab>
      </Tabs>

      {tab === 'current' && (
        <>
          <h1>Generate Payroll</h1>
          <Form onSubmit={handleSearch} className="mt-4">
            <Form.Group controlId="month">
              <Form.Label>Month</Form.Label>
              <Form.Control
                as="select"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                {[...Array(12).keys()].map(m => (
                  <option key={m + 1} value={m + 1}>{new Date(0, m).toLocaleString('default', { month: 'long' })}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="year">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="payDate">
              <Form.Label>Pay Date</Form.Label>
              <Form.Control
                type="date"
                value={payDate}
                onChange={(e) => setPayDate(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Payroll
            </Button>
          </Form>
        </>
      )}

      {tab === 'past' && (
        <h1>Past Payroll</h1>
      )}

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Pay Rate</th>
            <th>Hours Worked</th>
            <th>Gross Pay</th>
            <th>Bonuses</th>
            <th>Tax</th>
            <th>Pension</th>
            <th>Other Deductions</th>
            <th>Net Pay</th>
          </tr>
        </thead>
        <tbody>
          {payrollData.map((data, index) => (
            <tr key={index}>
              <td>{data.employee_name}</td>
              <td>£{data.pay_rate}</td>
              <td>{data.total_hours_worked.toFixed(2)}</td>
              <td>£{data.gross_pay.toFixed(2)}</td>
              <td contentEditable>{data.bonuses || 0}</td>
              <td>£{data.tax.toFixed(2)}</td>
              <td>£{data.pension.toFixed(2)}</td>
              <td contentEditable>{data.other_deductions || 0}</td>
              <td>£{data.net_pay.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Total Employees</td>
            <td>{payrollData.length}</td>
            <td>Total Gross Pay</td>
            <td>£{payrollData.reduce((acc, data) => acc + data.gross_pay, 0).toFixed(2)}</td>
            <td>Total Tax</td>
            <td>£{payrollData.reduce((acc, data) => acc + data.tax, 0).toFixed(2)}</td>
            <td>Total Net Pay</td>
            <td>£{payrollData.reduce((acc, data) => acc + data.net_pay, 0).toFixed(2)}</td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default Payroll;