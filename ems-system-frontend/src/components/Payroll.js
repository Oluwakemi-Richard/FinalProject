import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Payroll = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [payDate, setPayDate] = useState('');
  const [tab, setTab] = useState('current');
  const [rolesSummary, setRolesSummary] = useState([]);

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
      calculateRolesSummary(response.data);
    } catch (error) {
      console.error('Error fetching payroll data:', error);
    }
  };

  const fetchPastPayrollData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/payrolls/past');
      setPayrollData(response.data);
      calculateRolesSummary(response.data);
    } catch (error) {
      console.error('Error fetching past payroll data:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPayrollData();
  };

  const handleBonusChange = (employeeNumber, value) => {
    const updatedData = payrollData.map(data => {
      if (data.employee_number === employeeNumber) {
        const newBonus = parseFloat(value) || 0;
        const newNetPay = data.gross_pay + newBonus - data.tax - data.pension - (data.other_deductions || 0);
        return { ...data, bonus: newBonus, net_pay: newNetPay };
      }
      return data;
    });
    setPayrollData(updatedData);
  };

  const handleDeductionChange = (employeeNumber, value) => {
    const updatedData = payrollData.map(data => {
      if (data.employee_number === employeeNumber) {
        const newDeduction = parseFloat(value) || 0;
        const newNetPay = data.gross_pay + (data.bonus || 0) - data.tax - data.pension - newDeduction;
        return { ...data, other_deductions: newDeduction, net_pay: newNetPay };
      }
      return data;
    });
    setPayrollData(updatedData);
  };

  const calculateRolesSummary = (data) => {
    const summary = data.reduce((acc, curr) => {
      const role = curr.role || 'Unknown';
      if (!acc[role]) {
        acc[role] = {
          totalEmployees: 0,
          totalGrossPay: 0,
          totalTax: 0,
          totalNetPay: 0
        };
      }
      acc[role].totalEmployees += 1;
      acc[role].totalGrossPay += curr.gross_pay;
      acc[role].totalTax += curr.tax;
      acc[role].totalNetPay += curr.net_pay;
      return acc;
    }, {});

    const summaryArray = Object.keys(summary).map(role => ({
      role,
      ...summary[role]
    }));

    setRolesSummary(summaryArray);
  };

  const exportToPdf = () => {
    const doc = new jsPDF();
    doc.text(`Payroll for the Month of ${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`, 14, 22);
    doc.autoTable({
      head: [
        ['Employee Name', 'Pay Rate', 'Hours Worked', 'Gross Pay', 'Bonuses', 'Tax', 'Pension', 'Other Deductions', 'Net Pay']
      ],
      body: payrollData.map(data => [
        data.employee_name,
        `£${data.pay_rate}`,
        data.total_hours_worked.toFixed(2),
        `£${data.gross_pay.toFixed(2)}`,
        `£${data.bonus || 0}`,
        `£${data.tax.toFixed(2)}`,
        `£${data.pension.toFixed(2)}`,
        `£${data.other_deductions || 0}`,
        `£${data.net_pay.toFixed(2)}`
      ]),
      startY: 30
    });

    doc.autoTable({
      head: [['Role', 'Total Employees', 'Total Gross Pay', 'Total Tax', 'Total Net Pay']],
      body: rolesSummary.map(role => [
        role.role,
        role.totalEmployees,
        `£${role.totalGrossPay.toFixed(2)}`,
        `£${role.totalTax.toFixed(2)}`,
        `£${role.totalNetPay.toFixed(2)}`
      ]),
      startY: doc.autoTable.previous.finalY + 10
    });

    doc.save('payroll.pdf');
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
            <Button variant="secondary" className="ml-2" onClick={exportToPdf}>
              Export to PDF
            </Button>
          </Form>
          <h2>Payroll for the Month of {new Date(year, month - 1).toLocaleString('default', { month: 'long' })} {year}</h2>
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
                  <td>
                    <Form.Control
                      type="number"
                      value={data.bonus || 0}
                      onChange={(e) => handleBonusChange(data.employee_number, e.target.value)}
                      onBlur={() => setPayrollData([...payrollData])}
                    />
                  </td>
                  <td>£{data.tax.toFixed(2)}</td>
                  <td>£{data.pension.toFixed(2)}</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={data.other_deductions || 0}
                      onChange={(e) => handleDeductionChange(data.employee_number, e.target.value)}
                      onBlur={() => setPayrollData([...payrollData])}
                    />
                  </td>
                  <td>£{data.net_pay.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h2>Summary by Role</h2>
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Role</th>
                <th>Total Employees</th>
                <th>Total Gross Pay</th>
                <th>Total Tax</th>
                <th>Total Net Pay</th>
              </tr>
            </thead>
            <tbody>
              {rolesSummary.map((summary, index) => (
                <tr key={index}>
                  <td>{summary.role}</td>
                  <td>{summary.totalEmployees}</td>
                  <td>£{summary.totalGrossPay.toFixed(2)}</td>
                  <td>£{summary.totalTax.toFixed(2)}</td>
                  <td>£{summary.totalNetPay.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default Payroll;
