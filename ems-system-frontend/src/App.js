// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import axios from 'axios';
// import Layout from './components/Layout';
// import LandingPage from './pages/LandingPage';
// import Dashboard from './components/Dashboard';
// import Portal from './components/Portal';
// import Employees from './components/Employees';
// import EmployeeRegistration from './components/EmployeeRegistration';
// import Attendance from './components/Attendance';
// import Payroll from './components/Payroll';
// import Appraisal from './components/Appraisal';
// import ViewEmployee from './components/ViewEmployee';
// import ViewDetails from './components/ViewDetails';
// import ViewShifts from './components/ViewShifts';
// import LeaveRequest from './components/LeaveRequest';
// import ShiftAssignment from './components/ShiftAssignment';
// import PendingLeaves from './components/PendingLeaves';
// import Evaluation from './components/Evaluation';


// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://localhost:3000';


// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/" element={<LandingPage />} />
//         <Route
//           path="*"
//           element={
//             <Layout>
//               <Routes>
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/employee-portal" element={<Portal />} />
//                 <Route path="/employees" element={<Employees />} />
//                 <Route path="/employee-registration" element={<EmployeeRegistration />} />
//                 <Route path="/attendance" element={<Attendance />} />
//                 <Route path="/payroll" element={<Payroll />} />
//                 <Route path="/appraisal" element={<Appraisal />} />
//                 <Route path="/view-employee" element={<ViewEmployee />} />
//                 <Route path="/view-details" element={<ViewDetails />} />
//                 <Route path="/view-shifts" element={<ViewShifts />} />
//                 <Route path="/leave-request" element={<LeaveRequest />} />
//                 <Route path="/shift-assignment" element={<ShiftAssignment />} />
//                 <Route path="/pending-leaves" element={<PendingLeaves />} />
//                 <Route path="/evaluation" element={<Evaluation />} />
//               </Routes>
//             </Layout>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './components/Dashboard';
import Portal from './components/Portal';
import Employees from './components/Employees';
import EmployeeRegistration from './components/EmployeeRegistration';
import Attendance from './components/Attendance';
import Payroll from './components/Payroll';
import Appraisal from './components/Appraisal';
import ViewEmployee from './components/ViewEmployee';
import ViewDetails from './components/ViewDetails';
import ViewShifts from './components/ViewShifts';
import LeaveRequest from './components/LeaveRequest';
import ShiftAssignment from './components/ShiftAssignment';
import PendingLeaves from './components/PendingLeaves';
import Evaluation from './components/Evaluation';

axios.defaults.withCredentials = true;
//axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.baseURL = 'https://finalproject-nydd.onrender.com';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/auth/status')
      .then(response => {
        setAuthenticated(response.data.logged_in);
        setLoading(false);
      })
      .catch(() => {
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee-portal" element={<Portal />} />
        <Route path="/view-shifts" element={<ViewShifts />} />
        <Route
          path="*"
          element={
            authenticated ? (
              <Layout>
                <Routes>
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/employee-registration" element={<EmployeeRegistration />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/payroll" element={<Payroll />} />
                  <Route path="/appraisal" element={<Appraisal />} />
                  <Route path="/view-employee" element={<ViewEmployee />} />
                  <Route path="/view-details" element={<ViewDetails />} />
                  <Route path="/leave-request" element={<LeaveRequest />} />
                  <Route path="/shift-assignment" element={<ShiftAssignment />} />
                  <Route path="/pending-leaves" element={<PendingLeaves />} />
                  <Route path="/evaluation" element={<Evaluation />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
