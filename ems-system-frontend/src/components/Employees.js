import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    employee_number: '',
    department: '',
    branch: '',
    address: '',
    phone_number: '',
    email: '',
    start_date: '',
    gender: '',
    date_of_birth: '',
    salary: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get('/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the employees!", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/employees', { employee: formData })
      .then(response => {
        fetchEmployees(); // Refresh the list of employees after a new one is added
        setFormData({
          name: '',
          position: '',
          employee_number: '',
          department: '',
          branch: '',
          address: '',
          phone_number: '',
          email: '',
          start_date: '',
          gender: '',
          date_of_birth: '',
          salary: ''
        });
      })
      .catch(error => {
        console.error("There was an error posting the employee!", error);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="mt-5">Employees</h1>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="form-group">
          <label htmlFor="employee_number">Employee Number</label>
          <input
            type="text"
            id="employee_number"
            name="employee_number"
            className="form-control"
            value={formData.employee_number}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            id="position"
            name="position"
            className="form-control"
            value={formData.position}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            className="form-control"
            value={formData.department}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Branch</label>
          <input
            type="text"
            id="branch"
            name="branch"
            className="form-control"
            value={formData.branch}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            className="form-control"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="start_date">Start Date</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            className="form-control"
            value={formData.start_date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            id="gender"
            name="gender"
            className="form-control"
            value={formData.gender}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            className="form-control"
            value={formData.date_of_birth}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            className="form-control"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add Employee</button>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Number</th>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Branch</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Start Date</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.employee_number}</td>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.branch}</td>
              <td>{employee.address}</td>
              <td>{employee.phone_number}</td>
              <td>{employee.email}</td>
              <td>{employee.start_date}</td>
              <td>{employee.gender}</td>
              <td>{employee.date_of_birth}</td>
              <td>{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;