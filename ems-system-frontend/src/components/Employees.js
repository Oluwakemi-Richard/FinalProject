// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Employees = () => {
//   const [employees, setEmployees] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     position: '',
//     employee_number: '',
//     department: '',
//     branch: '',
//     address: '',
//     phone_number: '',
//     email: '',
//     start_date: '',
//     gender: '',
//     date_of_birth: '',
//     salary: ''
//   });

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = () => {
//     axios.get('/api/employees')
//       .then(response => {
//         setEmployees(response.data);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the employees!", error);
//       });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios.post('/api/employees', { employee: formData })
//       .then(response => {
//         fetchEmployees(); // Refresh the list of employees after a new one is added
//         setFormData({
//           name: '',
//           position: '',
//           employee_number: '',
//           department: '',
//           branch: '',
//           address: '',
//           phone_number: '',
//           email: '',
//           start_date: '',
//           gender: '',
//           date_of_birth: '',
//           salary: ''
//         });
//       })
//       .catch(error => {
//         console.error("There was an error posting the employee!", error);
//       });
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div>
//       <h1 className="mt-5">Employees</h1>
//       <form onSubmit={handleSubmit} className="mb-5">
//         <div className="form-group">
//           <label htmlFor="employee_number">Employee Number</label>
//           <input
//             type="text"
//             id="employee_number"
//             name="employee_number"
//             className="form-control"
//             value={formData.employee_number}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             className="form-control"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="position">Position</label>
//           <input
//             type="text"
//             id="position"
//             name="position"
//             className="form-control"
//             value={formData.position}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="department">Department</label>
//           <input
//             type="text"
//             id="department"
//             name="department"
//             className="form-control"
//             value={formData.department}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="branch">Branch</label>
//           <input
//             type="text"
//             id="branch"
//             name="branch"
//             className="form-control"
//             value={formData.branch}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="address">Address</label>
//           <input
//             type="text"
//             id="address"
//             name="address"
//             className="form-control"
//             value={formData.address}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="phone_number">Phone Number</label>
//           <input
//             type="text"
//             id="phone_number"
//             name="phone_number"
//             className="form-control"
//             value={formData.phone_number}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             className="form-control"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="start_date">Start Date</label>
//           <input
//             type="date"
//             id="start_date"
//             name="start_date"
//             className="form-control"
//             value={formData.start_date}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="gender">Gender</label>
//           <input
//             type="text"
//             id="gender"
//             name="gender"
//             className="form-control"
//             value={formData.gender}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="date_of_birth">Date of Birth</label>
//           <input
//             type="date"
//             id="date_of_birth"
//             name="date_of_birth"
//             className="form-control"
//             value={formData.date_of_birth}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="salary">Salary</label>
//           <input
//             type="number"
//             id="salary"
//             name="salary"
//             className="form-control"
//             value={formData.salary}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary mt-3">Add Employee</button>
//       </form>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Employee Number</th>
//             <th>Name</th>
//             <th>Position</th>
//             <th>Department</th>
//             <th>Branch</th>
//             <th>Address</th>
//             <th>Phone Number</th>
//             <th>Email</th>
//             <th>Start Date</th>
//             <th>Gender</th>
//             <th>Date of Birth</th>
//             <th>Salary</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map(employee => (
//             <tr key={employee.id}>
//               <td>{employee.id}</td>
//               <td>{employee.employee_number}</td>
//               <td>{employee.name}</td>
//               <td>{employee.position}</td>
//               <td>{employee.department}</td>
//               <td>{employee.branch}</td>
//               <td>{employee.address}</td>
//               <td>{employee.phone_number}</td>
//               <td>{employee.email}</td>
//               <td>{employee.start_date}</td>
//               <td>{employee.gender}</td>
//               <td>{employee.date_of_birth}</td>
//               <td>{employee.salary}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Employees;
import React, { useEffect, useState, useContext } from 'react';
import { Form, Button, Table, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../App';

const Employees = () => {
  const [view, setView] = useState('create');
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
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const { sessionCookie } = useContext(AuthContext);

  useEffect(() => {
    if (view === 'view') {
      fetchEmployees();
    }
  }, [view]);

  const fetchEmployees = () => {
    axios.get(`/api/employees?query=${searchQuery}`, { headers: { 'Cookie': sessionCookie } })
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the employees!", error);
      });
  };

  const validateField = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'employee_number':
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
          errorMessage = 'Employee number can contain only digits and letters.';
        }
        break;
      case 'name':
        if (!/^[a-zA-Z\s\-]+$/.test(value) || !/\s/.test(value)) {
          errorMessage = 'Name should contain first name and last name, and can only contain letters, spaces, and hyphens.';
        }
        break;
      case 'position':
      case 'department':
      case 'branch':
        if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} should contain only letters, digits, and spaces.`;
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = 'Email is invalid.';
        }
        break;
      case 'phone_number':
        if (!/^\d+$/.test(value)) {
          errorMessage = 'Phone number should contain only digits.';
        }
        break;
      case 'start_date':
      case 'date_of_birth':
        if (!value) {
          errorMessage = 'This field is required.';
        }
        break;
      case 'salary':
        if (isNaN(value)) {
          errorMessage = 'Salary must be a number.';
        }
        break;
      case 'gender':
        if (!['Male', 'Female'].includes(value)) {
          errorMessage = 'Gender is required.';
        }
        break;
      default:
        break;
    }
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage
    }));
    return errorMessage;
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const validateForm = () => {
    const errors = {};
    for (let [key, value] of Object.entries(formData)) {
      const error = validateField(key, value);
      if (error) errors[key] = error;
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    const url = editMode ? `/api/employees/${formData.id}` : '/api/employees';
    const method = editMode ? 'put' : 'post';
    axios[method](url, { employee: formData }, { headers: { 'Cookie': sessionCookie } })
      .then(() => {
        alert(editMode ? 'Employee updated successfully!' : 'Employee created successfully!');
        setView('view');
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
        setEditMode(false);
      })
      .catch(error => {
        const errorMessage = error.response?.data;
        if (typeof errorMessage === 'string') {
          if (errorMessage.includes('Email has already been taken')) {
            setValidationErrors(prevErrors => ({
              ...prevErrors,
              email: 'Email has already been taken.'
            }));
          } else if (errorMessage.includes('Employee number has already been taken')) {
            setValidationErrors(prevErrors => ({
              ...prevErrors,
              employee_number: 'Employee number has already been taken.'
            }));
          } else {
            setError(errorMessage || 'Unknown error occurred');
          }
        }
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Tabs
        activeKey={view}
        onSelect={(k) => setView(k)}
        className="mb-3"
      >
        <Tab eventKey="create" title="Create Employee">
          <Form onSubmit={handleSubmit} className="mb-5">
            <Form.Group controlId="employee_number">
              <Form.Label>Employee Number</Form.Label>
              <Form.Control
                type="text"
                name="employee_number"
                value={formData.employee_number}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!validationErrors.employee_number}
                readOnly={editMode}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.employee_number}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!validationErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="position">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!validationErrors.position}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.position}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!validationErrors.department}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.department}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="branch">
              <Form.Label>Branch</Form.Label>
              <Form.Control
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!validationErrors.branch}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.branch}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!validationErrors.address}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="phone_number">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!validationErrors.phone_number}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.phone_number}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!validationErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="start_date">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!validationErrors.start_date}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.start_date}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!validationErrors.gender}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {validationErrors.gender}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="date_of_birth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!validationErrors.date_of_birth}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.date_of_birth}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="salary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!validationErrors.salary}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.salary}
              </Form.Control.Feedback>
            </Form.Group>
            {error && <div className="alert alert-danger">{error}</div>}
            <Button type="submit" className="mt-3">{editMode ? 'Update Employee' : 'Create Employee'}</Button>
          </Form>
        </Tab>
        <Tab eventKey="view" title="View Employees">
          <Form className="mb-3">
            <Form.Group controlId="searchQuery">
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search employees"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
            <Button onClick={fetchEmployees}>Search</Button>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Employee Number</th>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Branch</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.employee_number}</td>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.branch}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone_number}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => {
                        setFormData(employee);
                        setEditMode(true);
                        setView('create');
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </>
  );
};

export default Employees;
