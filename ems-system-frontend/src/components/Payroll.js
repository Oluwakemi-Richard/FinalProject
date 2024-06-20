// import React, { useState, useEffect } from 'react';
// import { Form, Button, Table } from 'react-bootstrap';
// import axios from 'axios';

// const Payroll = () => {
//   const [payrolls, setPayrolls] = useState([]);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const [payDate, setPayDate] = useState('');
//   const [employees, setEmployees] = useState([]);
//   const [summary, setSummary] = useState({
//     totalEmployees: 0,
//     totalGrossPay: 0,
//     totalNetPay: 0,
//     totalTax: 0,
//   });

//   const PAY_RATE = 15; // Pay rate per hour in pounds

//   const handleCreatePayroll = async () => {
//     // Fetch attendance data
//     try {
//       const response = await axios.get('http://localhost:3000/api/attendances', {
//         params: { month, year }
//       });
//       const employeeData = response.data;
//       const processedEmployees = employeeData.map(employee => {
//         const hoursWorked = calculateHoursWorked(employee);
//         const grossPay = hoursWorked * PAY_RATE;
//         const tax = grossPay * 0.1;
//         const pension = grossPay * 0.05;
//         return {
//           ...employee,
//           hoursWorked,
//           grossPay,
//           bonuses: 0,
//           tax,
//           pension,
//           otherDeductions: 0,
//           netPay: grossPay - tax - pension
//         };
//       });
//       setEmployees(processedEmployees);
//       calculateSummary(processedEmployees);
//       setShowCreateForm(true);
//     } catch (error) {
//       console.error('Error fetching employee data:', error);
//     }
//   };

//   const calculateHoursWorked = (employee) => {
//     // Logic to calculate hours worked from attendance data
//     return employee.hoursWorked || 0;
//   };

//   const calculateSummary = (employees) => {
//     const totalEmployees = employees.length;
//     const totalGrossPay = employees.reduce((sum, emp) => sum + emp.grossPay, 0);
//     const totalNetPay = employees.reduce((sum, emp) => sum + emp.netPay, 0);
//     const totalTax = employees.reduce((sum, emp) => sum + emp.tax, 0);
//     setSummary({ totalEmployees, totalGrossPay, totalNetPay, totalTax });
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedEmployees = [...employees];
//     const employee = updatedEmployees[index];
//     employee[field] = parseFloat(value) || 0;
//     employee.netPay = employee.grossPay + employee.bonuses - employee.tax - employee.pension - employee.otherDeductions;
//     setEmployees(updatedEmployees);
//     calculateSummary(updatedEmployees);
//   };

//   return (
//     <div>
//       <h1>Payroll</h1>
//       <Button onClick={() => setShowCreateForm(false)}>View Past Payrolls</Button>
//       <Button onClick={() => setShowCreateForm(true)}>Create New Payroll</Button>
//       {!showCreateForm ? (
//         <div>
//           {/* Placeholder for viewing past payrolls */}
//           <p>Past payrolls will be displayed here.</p>
//         </div>
//       ) : (
//         <div>
//           <Form>
//             <Form.Group controlId="month">
//               <Form.Label>Month</Form.Label>
//               <Form.Control as="select" value={month} onChange={(e) => setMonth(e.target.value)}>
//                 <option value="">Select Month</option>
//                 {Array.from({ length: 12 }, (_, i) => (
//                   <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="year">
//               <Form.Label>Year</Form.Label>
//               <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)} />
//             </Form.Group>
//             <Form.Group controlId="payDate">
//               <Form.Label>Pay Date</Form.Label>
//               <Form.Control type="date" value={payDate} onChange={(e) => setPayDate(e.target.value)} />
//             </Form.Group>
//             <Button variant="primary" onClick={handleCreatePayroll}>Generate Payroll</Button>
//           </Form>

//           <Table striped bordered hover className="mt-4">
//             <thead>
//               <tr>
//                 <th>Employee Name</th>
//                 <th>Pay Rate</th>
//                 <th>Hours Worked</th>
//                 <th>Gross Pay</th>
//                 <th>Bonuses</th>
//                 <th>Tax</th>
//                 <th>Pension</th>
//                 <th>Other Deductions</th>
//                 <th>Net Pay</th>
//               </tr>
//             </thead>
//             <tbody>
//               {employees.map((employee, index) => (
//                 <tr key={employee.id}>
//                   <td>{employee.staff_name}</td>
//                   <td>{PAY_RATE}</td>
//                   <td>{employee.hoursWorked}</td>
//                   <td>{employee.grossPay.toFixed(2)}</td>
//                   <td>
//                     <Form.Control
//                       type="number"
//                       value={employee.bonuses}
//                       onChange={(e) => handleInputChange(index, 'bonuses', e.target.value)}
//                     />
//                   </td>
//                   <td>{employee.tax.toFixed(2)}</td>
//                   <td>{employee.pension.toFixed(2)}</td>
//                   <td>
//                     <Form.Control
//                       type="number"
//                       value={employee.otherDeductions}
//                       onChange={(e) => handleInputChange(index, 'otherDeductions', e.target.value)}
//                     />
//                   </td>
//                   <td>{employee.netPay.toFixed(2)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//           <div className="mt-4">
//             <p>Total Employees: {summary.totalEmployees}</p>
//             <p>Total Gross Pay: {summary.totalGrossPay.toFixed(2)}</p>
//             <p>Total Net Pay: {summary.totalNetPay.toFixed(2)}</p>
//             <p>Total Tax: {summary.totalTax.toFixed(2)}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Payroll;

import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const Payroll = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [payDate, setPayDate] = useState('');

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

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPayrollData();
  };

  return (
    <div>
      <h1>Payroll</h1>
      <Button variant="primary" onClick={() => alert('View past payrolls clicked')}>View Past Payrolls</Button>
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
              <td>{data.staff_name}</td>
              <td>{data.pay_rate}</td>
              <td>{data.total_hours_worked.toFixed(2)}</td>
              <td>{data.gross_pay.toFixed(2)}</td>
              <td contentEditable>{data.bonuses || 0}</td>
              <td>{data.tax.toFixed(2)}</td>
              <td>{data.pension.toFixed(2)}</td>
              <td contentEditable>{data.other_deductions || 0}</td>
              <td>{data.net_pay.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="mt-4">
        <p>Total Employees: {payrollData.length}</p>
        <p>Total Gross Pay: {payrollData.reduce((acc, data) => acc + data.gross_pay, 0).toFixed(2)}</p>
        <p>Total Net Pay: {payrollData.reduce((acc, data) => acc + data.net_pay, 0).toFixed(2)}</p>
        <p>Total Tax: {payrollData.reduce((acc, data) => acc + data.tax, 0).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Payroll;