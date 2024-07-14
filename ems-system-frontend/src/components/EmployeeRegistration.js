// import React, { useEffect, useState } from 'react';
// import { Form, Button, Table, Tabs, Tab } from 'react-bootstrap';
// import axios from 'axios';

// const Employees = () => {
//   const [view, setView] = useState('create');
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
//   const [editMode, setEditMode] = useState(false);
//   const [error, setError] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [validationErrors, setValidationErrors] = useState({});

//   useEffect(() => {
//     if (view === 'view') {
//       fetchEmployees();
//     }
//   }, [view]);

//   const fetchEmployees = () => {
//     axios.get(`/api/employees?query=${searchQuery}`)
//       .then(response => {
//         setEmployees(response.data);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the employees!", error);
//       });
//   };

//   const validateField = (name, value) => {
//     let errorMessage = '';
//     switch (name) {
//       case 'employee_number':
//         if (!/^[a-zA-Z0-9]+$/.test(value)) {
//           errorMessage = 'Employee number can contain only digits and letters.';
//         }
//         break;
//       case 'name':
//         if (!/^[a-zA-Z\s\-]+$/.test(value) || !/\s/.test(value)) {
//           errorMessage = 'Name should contain first name and last name, and can only contain letters, spaces, and hyphens.';
//         }
//         break;
//       case 'position':
//       case 'department':
//       case 'branch':
//         if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
//           errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} should contain only letters, digits, and spaces.`;
//         }
//         break;
//       case 'email':
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//           errorMessage = 'Email is invalid.';
//         }
//         break;
//       case 'phone_number':
//         if (!/^\d+$/.test(value)) {
//           errorMessage = 'Phone number should contain only digits.';
//         }
//         break;
//       case 'start_date':
//       case 'date_of_birth':
//         if (!value) {
//           errorMessage = 'This field is required.';
//         }
//         break;
//       case 'salary':
//         if (isNaN(value)) {
//           errorMessage = 'Salary must be a number.';
//         }
//         break;
//       case 'gender':
//         if (!['Male', 'Female'].includes(value)) {
//           errorMessage = 'Gender is required.';
//         }
//         break;
//       default:
//         break;
//     }
//     setValidationErrors(prevErrors => ({
//       ...prevErrors,
//       [name]: errorMessage
//     }));
//     return errorMessage;
//   };

//   const handleBlur = (e) => {
//     validateField(e.target.name, e.target.value);
//   };

//   const validateForm = () => {
//     const errors = {};
//     for (let [key, value] of Object.entries(formData)) {
//       const error = validateField(key, value);
//       if (error) errors[key] = error;
//     }
//     return errors;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const errors = validateForm();
//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return;
//     }
//     const url = editMode ? `/api/employees/${formData.id}` : '/api/employees';
//     const method = editMode ? 'put' : 'post';
//     axios[method](url, { employee: formData })
//       .then(response => {
//         alert(editMode ? 'Employee updated successfully!' : 'Employee created successfully!');
//         setView('view');
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
//         const errorMessage = error.response.data;
//         if (typeof errorMessage === 'string') {
//           if (errorMessage.includes('Email has already been taken')) {
//             setValidationErrors({ email: 'Email has already been taken.' });
//           } else if (errorMessage.includes('Employee number has already been taken')) {
//             setValidationErrors({ employee_number: 'Employee number has already been taken.' });
//           } else {
//             setError(errorMessage || 'There was an error submitting the form!');
//           }
//         } else {
//           setError('There was an error submitting the form!');
//         }
//       });
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setValidationErrors({ ...validationErrors, [e.target.name]: '' });
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchEmployees();
//   };

//   const handleEdit = (employee) => {
//     setFormData(employee);
//     setEditMode(true);
//     setView('create');
//   };

//   return (
//     <div>
//       <Tabs activeKey={view} onSelect={(k) => setView(k)} className="mb-3">
//         <Tab eventKey="create" title={editMode ? "Edit Employee" : "Create Employee"}>
//           <div>
//             <h1 className="mt-5">{editMode ? 'Edit Employee' : 'Create Employee'}</h1>
//             <form onSubmit={handleSubmit} className="mb-5">
//               <div className="form-group">
//                 <label htmlFor="employee_number">Employee Number</label>
//                 <input
//                   type="text"
//                   id="employee_number"
//                   name="employee_number"
//                   className={`form-control ${validationErrors.employee_number ? 'is-invalid' : ''}`}
//                   value={formData.employee_number}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   readOnly={editMode}
//                 />
//                 {validationErrors.employee_number && (
//                   <div className="invalid-feedback">{validationErrors.employee_number}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="name">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
//                   value={formData.name}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.name && (
//                   <div className="invalid-feedback">{validationErrors.name}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="position">Position</label>
//                 <input
//                   type="text"
//                   id="position"
//                   name="position"
//                   className={`form-control ${validationErrors.position ? 'is-invalid' : ''}`}
//                   value={formData.position}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.position && (
//                   <div className="invalid-feedback">{validationErrors.position}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="department">Department</label>
//                 <input
//                   type="text"
//                   id="department"
//                   name="department"
//                   className={`form-control ${validationErrors.department ? 'is-invalid' : ''}`}
//                   value={formData.department}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.department && (
//                   <div className="invalid-feedback">{validationErrors.department}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="branch">Branch</label>
//                 <input
//                   type="text"
//                   id="branch"
//                   name="branch"
//                   className={`form-control ${validationErrors.branch ? 'is-invalid' : ''}`}
//                   value={formData.branch}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.branch && (
//                   <div className="invalid-feedback">{validationErrors.branch}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="address">Address</label>
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   className={`form-control ${validationErrors.address ? 'is-invalid' : ''}`}
//                   value={formData.address}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.address && (
//                   <div className="invalid-feedback">{validationErrors.address}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="phone_number">Phone Number</label>
//                 <input
//                   type="text"
//                   id="phone_number"
//                   name="phone_number"
//                   className={`form-control ${validationErrors.phone_number ? 'is-invalid' : ''}`}
//                   value={formData.phone_number}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.phone_number && (
//                   <div className="invalid-feedback">{validationErrors.phone_number}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
//                   value={formData.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.email && (
//                   <div className="invalid-feedback">{validationErrors.email}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="start_date">Start Date</label>
//                 <input
//                   type="date"
//                   id="start_date"
//                   name="start_date"
//                   className={`form-control ${validationErrors.start_date ? 'is-invalid' : ''}`}
//                   value={formData.start_date}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.start_date && (
//                   <div className="invalid-feedback">{validationErrors.start_date}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="gender">Gender</label>
//                 <select
//                   id="gender"
//                   name="gender"
//                   className={`form-control ${validationErrors.gender ? 'is-invalid' : ''}`}
//                   value={formData.gender}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                 </select>
//                 {validationErrors.gender && (
//                   <div className="invalid-feedback">{validationErrors.gender}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="date_of_birth">Date of Birth</label>
//                 <input
//                   type="date"
//                   id="date_of_birth"
//                   name="date_of_birth"
//                   className={`form-control ${validationErrors.date_of_birth ? 'is-invalid' : ''}`}
//                   value={formData.date_of_birth}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.date_of_birth && (
//                   <div className="invalid-feedback">{validationErrors.date_of_birth}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="salary">Salary</label>
//                 <input
//                   type="number"
//                   id="salary"
//                   name="salary"
//                   className={`form-control ${validationErrors.salary ? 'is-invalid' : ''}`}
//                   value={formData.salary}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.salary && (
//                   <div className="invalid-feedback">{validationErrors.salary}</div>
//                 )}
//               </div>
//               {error && <div className="alert alert-danger">{error}</div>}
//               <Button type="submit" className="mt-3">{editMode ? 'Update Employee' : 'Add Employee'}</Button>
//             </form>
//           </div>
//         </Tab>
//         <Tab eventKey="view" title="View Employees">
//           <div>
//             <h1 className="mt-5">Search Employees</h1>
//             <form onSubmit={handleSearch} className="mb-5">
//               <div className="form-group">
//                 <label htmlFor="searchQuery">Search by Name, Email, or Employee Number</label>
//                 <input
//                   type="text"
//                   id="searchQuery"
//                   name="searchQuery"
//                   className="form-control"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//               <Button type="submit" className="mt-3">Search</Button>
//             </form>
//             {employees.length > 0 && (
//               <Table striped bordered hover>
//                 <thead>
//                   <tr>
//                     <th>Employee Number</th>
//                     <th>Name</th>
//                     <th>Position</th>
//                     <th>Department</th>
//                     <th>Branch</th>
//                     <th>Address</th>
//                     <th>Phone Number</th>
//                     <th>Email</th>
//                     <th>Start Date</th>
//                     <th>Gender</th>
//                     <th>Date of Birth</th>
//                     <th>Salary</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {employees.map((employee) => (
//                     <tr key={employee.id}>
//                       <td>{employee.employee_number}</td>
//                       <td>{employee.name}</td>
//                       <td>{employee.position}</td>
//                       <td>{employee.department}</td>
//                       <td>{employee.branch}</td>
//                       <td>{employee.address}</td>
//                       <td>{employee.phone_number}</td>
//                       <td>{employee.email}</td>
//                       <td>{employee.start_date}</td>
//                       <td>{employee.gender}</td>
//                       <td>{employee.date_of_birth}</td>
//                       <td>{employee.salary}</td>
//                       <td>
//                         <Button onClick={() => handleEdit(employee)} variant="secondary">Edit</Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             )}
//           </div>
//         </Tab>
//       </Tabs>
//     </div>
//   );
// };

// export default Employees;
// import React, { useEffect, useState } from 'react';
// import { Form, Button, Table, Tabs, Tab } from 'react-bootstrap';
// import axios from 'axios';

// const Employees = () => {
//   const [view, setView] = useState('create');
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
//   const [editMode, setEditMode] = useState(false);
//   const [error, setError] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [validationErrors, setValidationErrors] = useState({});
//   const [sessionToken, setSessionToken] = useState('');

//   useEffect(() => {
//     // Assume you have a way to get the session token, e.g., from local storage or cookies
//     const token = localStorage.getItem('sessionToken');
//     setSessionToken(token);
//   }, []);

//   useEffect(() => {
//     if (view === 'view') {
//       fetchEmployees();
//     }
//   }, [view]);

//   const fetchEmployees = () => {
//     // axios.get(`/api/employees?query=${searchQuery}`, {
//     //   headers: { 'Authorization': `Bearer ${sessionToken}` }
//     // })
//     //   .then(response => {
//     //     setEmployees(response.data);
//     //   })
//     //   .catch(error => {
//     //     console.error("There was an error fetching the employees!", error);
//     //   });
//     axios.get(`/api/employees?query=${encodeURIComponent(searchQuery)}`, {
//       headers: {
//         'Authorization': `Bearer ${sessionToken}`,
//         'Accept': 'application/json' // Ensure this matches your server's expected format
//       }
//     })
//       .then(response => {
//         setEmployees(response.data);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the employees!", error);
//       });
    
//   };

//   const validateField = (name, value) => {
//     let errorMessage = '';
//     switch (name) {
//       case 'employee_number':
//         if (!/^[a-zA-Z0-9]+$/.test(value)) {
//           errorMessage = 'Employee number can contain only digits and letters.';
//         }
//         break;
//       case 'name':
//         if (!/^[a-zA-Z\s\-]+$/.test(value) || !/\s/.test(value)) {
//           errorMessage = 'Name should contain first name and last name, and can only contain letters, spaces, and hyphens.';
//         }
//         break;
//       case 'position':
//       case 'department':
//       case 'branch':
//         if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
//           errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} should contain only letters, digits, and spaces.`;
//         }
//         break;
//       case 'email':
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//           errorMessage = 'Email is invalid.';
//         }
//         break;
//       case 'phone_number':
//         if (!/^\d+$/.test(value)) {
//           errorMessage = 'Phone number should contain only digits.';
//         }
//         break;
//       case 'start_date':
//       case 'date_of_birth':
//         if (!value) {
//           errorMessage = 'This field is required.';
//         }
//         break;
//       case 'salary':
//         if (isNaN(value)) {
//           errorMessage = 'Salary must be a number.';
//         }
//         break;
//       case 'gender':
//         if (!['Male', 'Female'].includes(value)) {
//           errorMessage = 'Gender is required.';
//         }
//         break;
//       default:
//         break;
//     }
//     setValidationErrors(prevErrors => ({
//       ...prevErrors,
//       [name]: errorMessage
//     }));
//     return errorMessage;
//   };

//   const handleBlur = (e) => {
//     validateField(e.target.name, e.target.value);
//   };

//   const validateForm = () => {
//     const errors = {};
//     for (let [key, value] of Object.entries(formData)) {
//       const error = validateField(key, value);
//       if (error) errors[key] = error;
//     }
//     return errors;
//   };

//   // const handleSubmit = (event) => {
//   //   event.preventDefault();
//   //   const errors = validateForm();
//   //   if (Object.keys(errors).length > 0) {
//   //     setValidationErrors(errors);
//   //     return;
//   //   }
//   //   const url = editMode ? `/api/employees/${formData.id}` : '/api/employees';
//   //   const method = editMode ? 'put' : 'post';
//   //   axios[method](url, { employee: formData }, {
//   //     headers: { 'Authorization': `Bearer ${sessionToken}` }
//   //   })
//   //     .then(response => {
//   //       alert(editMode ? 'Employee updated successfully!' : 'Employee created successfully!');
//   //       setView('view');
//   //       setFormData({
//   //         name: '',
//   //         position: '',
//   //         employee_number: '',
//   //         department: '',
//   //         branch: '',
//   //         address: '',
//   //         phone_number: '',
//   //         email: '',
//   //         start_date: '',
//   //         gender: '',
//   //         date_of_birth: '',
//   //         salary: ''
//   //       });
//   //     })
//   //     .catch(error => {
//   //       const errorMessage = error.response.data;
//   //       if (typeof errorMessage === 'string') {
//   //         if (errorMessage.includes('Email has already been taken')) {
//   //           setValidationErrors({ email: 'Email has already been taken.' });
//   //         } else if (errorMessage.includes('Employee number has already been taken')) {
//   //           setValidationErrors({ employee_number: 'Employee number has already been taken.' });
//   //         } else {
//   //           setError(errorMessage || 'There was an error submitting the form!');
//   //         }
//   //       } else {
//   //         setError('There was an error submitting the form!');
//   //       }
//   //     });
//   // };
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const errors = validateForm();
//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return;
//     }
    
//     const url = editMode ? `/api/employees/${formData.id}` : '/api/employees';
//     const method = editMode ? 'put' : 'post';
  
//     axios({
//       method: method,
//       url: url,
//       data: { employee: formData },
//       headers: {
//         'Authorization': `Bearer ${sessionToken}`,
//         'Content-Type': 'application/json' 
//       }
//     })
//       .then(response => {
//         alert(editMode ? 'Employee updated successfully!' : 'Employee created successfully!');
//         setView('view');
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
//         const errorMessage = error.response.data;
//         if (typeof errorMessage === 'string') {
//           if (errorMessage.includes('Email has already been taken')) {
//             setValidationErrors({ email: 'Email has already been taken.' });
//           } else if (errorMessage.includes('Employee number has already been taken')) {
//             setValidationErrors({ employee_number: 'Employee number has already been taken.' });
//           } else {
//             setError(errorMessage || 'There was an error submitting the form!');
//           }
//         } else {
//           setError('There was an error submitting the form!');
//         }
//       });
//   };
  

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setValidationErrors({ ...validationErrors, [e.target.name]: '' });
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchEmployees();
//   };

//   const handleEdit = (employee) => {
//     setFormData(employee);
//     setEditMode(true);
//     setView('create');
//   };

//   return (
//     <div>
//       <Tabs activeKey={view} onSelect={(k) => setView(k)} className="mb-3">
//         <Tab eventKey="create" title={editMode ? "Edit Employee" : "Create Employee"}>
//           <div>
//             <h1 className="mt-5">{editMode ? 'Edit Employee' : 'Create Employee'}</h1>
//             <form onSubmit={handleSubmit} className="mb-5">
//               <div className="form-group">
//                 <label htmlFor="employee_number">Employee Number</label>
//                 <input
//                   type="text"
//                   id="employee_number"
//                   name="employee_number"
//                   className={`form-control ${validationErrors.employee_number ? 'is-invalid' : ''}`}
//                   value={formData.employee_number}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   readOnly={editMode}
//                 />
//                 {validationErrors.employee_number && (
//                   <div className="invalid-feedback">{validationErrors.employee_number}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="name">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
//                   value={formData.name}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.name && (
//                   <div className="invalid-feedback">{validationErrors.name}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="position">Position</label>
//                 <input
//                   type="text"
//                   id="position"
//                   name="position"
//                   className={`form-control ${validationErrors.position ? 'is-invalid' : ''}`}
//                   value={formData.position}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.position && (
//                   <div className="invalid-feedback">{validationErrors.position}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="department">Department</label>
//                 <input
//                   type="text"
//                   id="department"
//                   name="department"
//                   className={`form-control ${validationErrors.department ? 'is-invalid' : ''}`}
//                   value={formData.department}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.department && (
//                   <div className="invalid-feedback">{validationErrors.department}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="branch">Branch</label>
//                 <input
//                   type="text"
//                   id="branch"
//                   name="branch"
//                   className={`form-control ${validationErrors.branch ? 'is-invalid' : ''}`}
//                   value={formData.branch}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.branch && (
//                   <div className="invalid-feedback">{validationErrors.branch}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="address">Address</label>
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   className={`form-control ${validationErrors.address ? 'is-invalid' : ''}`}
//                   value={formData.address}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.address && (
//                   <div className="invalid-feedback">{validationErrors.address}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="phone_number">Phone Number</label>
//                 <input
//                   type="text"
//                   id="phone_number"
//                   name="phone_number"
//                   className={`form-control ${validationErrors.phone_number ? 'is-invalid' : ''}`}
//                   value={formData.phone_number}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.phone_number && (
//                   <div className="invalid-feedback">{validationErrors.phone_number}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
//                   value={formData.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.email && (
//                   <div className="invalid-feedback">{validationErrors.email}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="start_date">Start Date</label>
//                 <input
//                   type="date"
//                   id="start_date"
//                   name="start_date"
//                   className={`form-control ${validationErrors.start_date ? 'is-invalid' : ''}`}
//                   value={formData.start_date}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.start_date && (
//                   <div className="invalid-feedback">{validationErrors.start_date}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="gender">Gender</label>
//                 <select
//                   id="gender"
//                   name="gender"
//                   className={`form-control ${validationErrors.gender ? 'is-invalid' : ''}`}
//                   value={formData.gender}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                 </select>
//                 {validationErrors.gender && (
//                   <div className="invalid-feedback">{validationErrors.gender}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="date_of_birth">Date of Birth</label>
//                 <input
//                   type="date"
//                   id="date_of_birth"
//                   name="date_of_birth"
//                   className={`form-control ${validationErrors.date_of_birth ? 'is-invalid' : ''}`}
//                   value={formData.date_of_birth}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.date_of_birth && (
//                   <div className="invalid-feedback">{validationErrors.date_of_birth}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="salary">Salary</label>
//                 <input
//                   type="number"
//                   id="salary"
//                   name="salary"
//                   className={`form-control ${validationErrors.salary ? 'is-invalid' : ''}`}
//                   value={formData.salary}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.salary && (
//                   <div className="invalid-feedback">{validationErrors.salary}</div>
//                 )}
//               </div>
//               {error && <div className="alert alert-danger">{error}</div>}
//               <Button type="submit" className="mt-3">{editMode ? 'Update Employee' : 'Add Employee'}</Button>
//             </form>
//           </div>
//         </Tab>
//         <Tab eventKey="view" title="View Employees">
//           <div>
//             <h1 className="mt-5">Search Employees</h1>
//             <form onSubmit={handleSearch} className="mb-5">
//               <div className="form-group">
//                 <label htmlFor="searchQuery">Search by Name, Email, or Employee Number</label>
//                 <input
//                   type="text"
//                   id="searchQuery"
//                   name="searchQuery"
//                   className="form-control"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//               <Button type="submit" className="mt-3">Search</Button>
//             </form>
//             {employees.length > 0 && (
//               <Table striped bordered hover>
//                 <thead>
//                   <tr>
//                     <th>Employee Number</th>
//                     <th>Name</th>
//                     <th>Position</th>
//                     <th>Department</th>
//                     <th>Branch</th>
//                     <th>Address</th>
//                     <th>Phone Number</th>
//                     <th>Email</th>
//                     <th>Start Date</th>
//                     <th>Gender</th>
//                     <th>Date of Birth</th>
//                     <th>Salary</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {employees.map((employee) => (
//                     <tr key={employee.id}>
//                       <td>{employee.employee_number}</td>
//                       <td>{employee.name}</td>
//                       <td>{employee.position}</td>
//                       <td>{employee.department}</td>
//                       <td>{employee.branch}</td>
//                       <td>{employee.address}</td>
//                       <td>{employee.phone_number}</td>
//                       <td>{employee.email}</td>
//                       <td>{employee.start_date}</td>
//                       <td>{employee.gender}</td>
//                       <td>{employee.date_of_birth}</td>
//                       <td>{employee.salary}</td>
//                       <td>
//                         <Button onClick={() => handleEdit(employee)} variant="secondary">Edit</Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             )}
//           </div>
//         </Tab>
//       </Tabs>
//     </div>
//   );
// };

// export default Employees;
// import React, { useEffect, useState } from 'react';
// import { Form, Button, Table, Tabs, Tab } from 'react-bootstrap';
// import axios from 'axios';
// import '../styles/Employees.css'; // Import the CSS file

// const Employees = () => {
//   const [view, setView] = useState('create');
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
//   const [editMode, setEditMode] = useState(false);
//   const [error, setError] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [validationErrors, setValidationErrors] = useState({});
//   const [sessionToken, setSessionToken] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('sessionToken');
//     setSessionToken(token);
//   }, []);

//   const fetchEmployees = () => {
//     axios.get(`/api/employees?query=${encodeURIComponent(searchQuery)}`, {
//       headers: {
//         'Authorization': `Bearer ${sessionToken}`,
//         'Accept': 'application/json'
//       }
//     })
//       .then(response => {
//         setEmployees(response.data);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the employees!", error);
//       });
//   };

//   const validateField = (name, value) => {
//     let errorMessage = '';
//     switch (name) {
//       case 'employee_number':
//         if (!/^[a-zA-Z0-9]+$/.test(value)) {
//           errorMessage = 'Employee number can contain only digits and letters.';
//         }
//         break;
//       case 'name':
//         if (!/^[a-zA-Z\s\-]+$/.test(value) || !/\s/.test(value)) {
//           errorMessage = 'Name should contain first name and last name, and can only contain letters, spaces, and hyphens.';
//         }
//         break;
//       case 'position':
//       case 'department':
//       case 'branch':
//         if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
//           errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} should contain only letters, digits, and spaces.`;
//         }
//         break;
//       case 'email':
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//           errorMessage = 'Email is invalid.';
//         }
//         break;
//       case 'phone_number':
//         if (!/^\d+$/.test(value)) {
//           errorMessage = 'Phone number should contain only digits.';
//         }
//         break;
//       case 'start_date':
//       case 'date_of_birth':
//         if (!value) {
//           errorMessage = 'This field is required.';
//         }
//         break;
//       case 'salary':
//         if (isNaN(value)) {
//           errorMessage = 'Salary must be a number.';
//         }
//         break;
//       case 'gender':
//         if (!['Male', 'Female'].includes(value)) {
//           errorMessage = 'Gender is required.';
//         }
//         break;
//       default:
//         break;
//     }
//     setValidationErrors(prevErrors => ({
//       ...prevErrors,
//       [name]: errorMessage
//     }));
//     return errorMessage;
//   };

//   const handleBlur = (e) => {
//     validateField(e.target.name, e.target.value);
//   };

//   const validateForm = () => {
//     const errors = {};
//     for (let [key, value] of Object.entries(formData)) {
//       const error = validateField(key, value);
//       if (error) errors[key] = error;
//     }
//     return errors;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const errors = validateForm();
//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return;
//     }
    
//     const url = editMode ? `/api/employees/${formData.id}` : '/api/employees';
//     const method = editMode ? 'put' : 'post';
  
//     axios({
//       method: method,
//       url: url,
//       data: { employee: formData },
//       headers: {
//         'Authorization': `Bearer ${sessionToken}`,
//         'Content-Type': 'application/json' 
//       }
//     })
//       .then(response => {
//         alert(editMode ? 'Employee updated successfully!' : 'Employee created successfully!');
//         setView('view');
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
//         const errorMessage = error.response.data;
//         if (typeof errorMessage === 'string') {
//           if (errorMessage.includes('Email has already been taken')) {
//             setValidationErrors({ email: 'Email has already been taken.' });
//           } else if (errorMessage.includes('Employee number has already been taken')) {
//             setValidationErrors({ employee_number: 'Employee number has already been taken.' });
//           } else {
//             setError(errorMessage || 'There was an error submitting the form!');
//           }
//         } else {
//           setError('There was an error submitting the form!');
//         }
//       });
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setValidationErrors({ ...validationErrors, [e.target.name]: '' });
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchEmployees();
//   };

//   const handleEdit = (employee) => {
//     setFormData(employee);
//     setEditMode(true);
//     setView('create');
//   };

//   return (
//     <div>
//       <Tabs activeKey={view} onSelect={(k) => setView(k)} className="mb-3">
//         <Tab eventKey="create" title={editMode ? "Edit Employee" : "Create Employee"}>
//           <div>
//             <h1 className="mt-5">{editMode ? 'Edit Employee' : 'Create Employee'}</h1>
//             <form onSubmit={handleSubmit} className="mb-5">
//               <div className="form-group">
//                 <label htmlFor="employee_number">Employee Number</label>
//                 <input
//                   type="text"
//                   id="employee_number"
//                   name="employee_number"
//                   className={`form-control ${validationErrors.employee_number ? 'is-invalid' : ''}`}
//                   value={formData.employee_number}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   readOnly={editMode}
//                 />
//                 {validationErrors.employee_number && (
//                   <div className="invalid-feedback">{validationErrors.employee_number}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="name">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
//                   value={formData.name}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.name && (
//                   <div className="invalid-feedback">{validationErrors.name}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="position">Position</label>
//                 <input
//                   type="text"
//                   id="position"
//                   name="position"
//                   className={`form-control ${validationErrors.position ? 'is-invalid' : ''}`}
//                   value={formData.position}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.position && (
//                   <div className="invalid-feedback">{validationErrors.position}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="department">Department</label>
//                 <input
//                   type="text"
//                   id="department"
//                   name="department"
//                   className={`form-control ${validationErrors.department ? 'is-invalid' : ''}`}
//                   value={formData.department}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.department && (
//                   <div className="invalid-feedback">{validationErrors.department}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="branch">Branch</label>
//                 <input
//                   type="text"
//                   id="branch"
//                   name="branch"
//                   className={`form-control ${validationErrors.branch ? 'is-invalid' : ''}`}
//                   value={formData.branch}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.branch && (
//                   <div className="invalid-feedback">{validationErrors.branch}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="address">Address</label>
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   className={`form-control ${validationErrors.address ? 'is-invalid' : ''}`}
//                   value={formData.address}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.address && (
//                   <div className="invalid-feedback">{validationErrors.address}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="phone_number">Phone Number</label>
//                 <input
//                   type="text"
//                   id="phone_number"
//                   name="phone_number"
//                   className={`form-control ${validationErrors.phone_number ? 'is-invalid' : ''}`}
//                   value={formData.phone_number}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.phone_number && (
//                   <div className="invalid-feedback">{validationErrors.phone_number}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
//                   value={formData.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.email && (
//                   <div className="invalid-feedback">{validationErrors.email}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="start_date">Start Date</label>
//                 <input
//                   type="date"
//                   id="start_date"
//                   name="start_date"
//                   className={`form-control ${validationErrors.start_date ? 'is-invalid' : ''}`}
//                   value={formData.start_date}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.start_date && (
//                   <div className="invalid-feedback">{validationErrors.start_date}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="gender">Gender</label>
//                 <select
//                   id="gender"
//                   name="gender"
//                   className={`form-control ${validationErrors.gender ? 'is-invalid' : ''}`}
//                   value={formData.gender}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 >
//                   <option value="">Select</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                 </select>
//                 {validationErrors.gender && (
//                   <div className="invalid-feedback">{validationErrors.gender}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="date_of_birth">Date of Birth</label>
//                 <input
//                   type="date"
//                   id="date_of_birth"
//                   name="date_of_birth"
//                   className={`form-control ${validationErrors.date_of_birth ? 'is-invalid' : ''}`}
//                   value={formData.date_of_birth}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.date_of_birth && (
//                   <div className="invalid-feedback">{validationErrors.date_of_birth}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="salary">Salary</label>
//                 <input
//                   type="number"
//                   id="salary"
//                   name="salary"
//                   className={`form-control ${validationErrors.salary ? 'is-invalid' : ''}`}
//                   value={formData.salary}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {validationErrors.salary && (
//                   <div className="invalid-feedback">{validationErrors.salary}</div>
//                 )}
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 {editMode ? 'Update' : 'Create'} Employee
//               </button>
//             </form>
//           </div>
//         </Tab>
//         <Tab eventKey="view" title="View Employees">
//           <div>
//             <h1 className="mt-5">Employee List</h1>
//             <Form onSubmit={handleSearch} className="mb-3">
//               <Form.Group controlId="searchQuery">
//                 <Form.Label>Search Employees</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter search query"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </Form.Group>
//               <Button variant="primary" type="submit">
//                 Search
//               </Button>
//             </Form>
//             <div className="table-responsive"> {/* Added this wrapper for responsive table */}
//               <Table striped bordered hover>
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Employee Number</th>
//                     <th>Name</th>
//                     <th>Position</th>
//                     <th>Department</th>
//                     <th>Branch</th>
//                     <th>Address</th>
//                     <th>Phone Number</th>
//                     <th>Email</th>
//                     <th>Start Date</th>
//                     <th>Gender</th>
//                     <th>Date of Birth</th>
//                     <th>Salary</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {employees.map(employee => (
//                     <tr key={employee.id}>
//                       <td>{employee.id}</td>
//                       <td>{employee.employee_number}</td>
//                       <td>{employee.name}</td>
//                       <td>{employee.position}</td>
//                       <td>{employee.department}</td>
//                       <td>{employee.branch}</td>
//                       <td>{employee.address}</td>
//                       <td>{employee.phone_number}</td>
//                       <td>{employee.email}</td>
//                       <td>{employee.start_date}</td>
//                       <td>{employee.gender}</td>
//                       <td>{employee.date_of_birth}</td>
//                       <td>{employee.salary}</td>
//                       <td>
//                         <Button variant="info" onClick={() => handleEdit(employee)}>Edit</Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </div>
//           </div>
//         </Tab>
//       </Tabs>
//     </div>
//   );
// };

// export default Employees;

import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Tabs, Tab } from 'react-bootstrap';
import api from '../services/api'; // Import your api service
import '../styles/Employees.css'; // Import the CSS file

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
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('sessionToken');
    setSessionToken(token);
    fetchEmployees();
  }, [sessionToken]);

  const fetchEmployees = () => {
    api.get(`/api/employees?query=${encodeURIComponent(searchQuery)}`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Accept': 'application/json'
      }
    })
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
  
    api({
      method: method,
      url: url,
      data: { employee: formData },
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json' 
      }
    })
      .then(response => {
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
        fetchEmployees();
      })
      .catch(error => {
        const errorMessage = error.response.data;
        if (typeof errorMessage === 'string') {
          if (errorMessage.includes('Email has already been taken')) {
            setValidationErrors({ email: 'Email has already been taken.' });
          } else if (errorMessage.includes('Employee number has already been taken')) {
            setValidationErrors({ employee_number: 'Employee number has already been taken.' });
          } else {
            setError(errorMessage || 'There was an error submitting the form!');
          }
        } else {
          setError('There was an error submitting the form!');
        }
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: '' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees();
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setEditMode(true);
    setView('create');
  };
return (
  <div>
    <Tabs activeKey={view} onSelect={(k) => setView(k)} className="mb-3">
      <Tab eventKey="create" title={editMode ? "Edit Employee" : "Create Employee"}>
        <div>
          <h1 className="mt-5">{editMode ? 'Edit Employee' : 'Create Employee'}</h1>
          <form onSubmit={handleSubmit} className="mb-5">
            <div className="form-group">
              <label htmlFor="employee_number">Employee Number</label>
              <input
                type="text"
                id="employee_number"
                name="employee_number"
                className={`form-control ${validationErrors.employee_number ? 'is-invalid' : ''}`}
                value={formData.employee_number}
                onChange={handleChange}
                onBlur={handleBlur}
                readOnly={editMode}
              />
              {validationErrors.employee_number && (
                <div className="invalid-feedback">{validationErrors.employee_number}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {validationErrors.name && (
                <div className="invalid-feedback">{validationErrors.name}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                className={`form-control ${validationErrors.position ? 'is-invalid' : ''}`}
                value={formData.position}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {validationErrors.position && (
                <div className="invalid-feedback">{validationErrors.position}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                className={`form-control ${validationErrors.department ? 'is-invalid' : ''}`}
                value={formData.department}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {validationErrors.department && (
                <div className="invalid-feedback">{validationErrors.department}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="branch">Branch</label>
              <input
                type="text"
                id="branch"
                name="branch"
                className={`form-control ${validationErrors.branch ? 'is-invalid' : ''}`}
                value={formData.branch}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {validationErrors.branch && (
                <div className="invalid-feedback">{validationErrors.branch}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className={`form-control ${validationErrors.address ? 'is-invalid' : ''}`}
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {validationErrors.address && (
                <div className="invalid-feedback">{validationErrors.address}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                className={`form-control ${validationErrors.phone_number ? 'is-invalid' : ''}`}
                value={formData.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {validationErrors.phone_number && (
                <div className="invalid-feedback">{validationErrors.phone_number}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {validationErrors.email && (
                <div className="invalid-feedback">{validationErrors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="start_date">Start Date</label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                className={`form-control ${validationErrors.start_date ? 'is-invalid' : ''}`}
                value={formData.start_date}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {validationErrors.start_date && (
                <div className="invalid-feedback">{validationErrors.start_date}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                className={`form-control ${validationErrors.gender ? 'is-invalid' : ''}`}
                value={formData.gender}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {validationErrors.gender && (
                <div className="invalid-feedback">{validationErrors.gender}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="date_of_birth">Date of Birth</label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                className={`form-control ${validationErrors.date_of_birth ? 'is-invalid' : ''}`}
                value={formData.date_of_birth}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {validationErrors.date_of_birth && (
                <div className="invalid-feedback">{validationErrors.date_of_birth}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="salary">Salary</label>
              <input
                type="number"
                id="salary"
                name="salary"
                className={`form-control ${validationErrors.salary ? 'is-invalid' : ''}`}
                value={formData.salary}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {validationErrors.salary && (
                <div className="invalid-feedback">{validationErrors.salary}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              {editMode ? 'Update' : 'Create'} Employee
            </button>
          </form>
        </div>
      </Tab>
      <Tab eventKey="view" title="View Employees">
        <div>
          <h1 className="mt-5">Employee List</h1>
          <Form onSubmit={handleSearch} className="mb-3">
            <Form.Group controlId="searchQuery">
              <Form.Label>Search Employees</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter search query"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
          <div className="table-responsive"> {/* Added this wrapper for responsive table */}
            <Table striped bordered hover>
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
                  <th>Actions</th>
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
                    <td>
                      <Button variant="info" onClick={() => handleEdit(employee)}>Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Tab>
    </Tabs>
  </div>
);
};

export default Employees;
