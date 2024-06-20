// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
// import LandingPage from './pages/LandingPage';
// import Employees from './components/Employees';

// const App = () => {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route exact path="/" element={<LandingPage />} />
//           <Route path="/employees" element={<Employees />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import EmployeeRegistration from './components/EmployeeRegistration';
import Attendance from './components/Attendance';
import Payroll from './components/Payroll';
import Appraisal from './components/Appraisal';
import ViewEmployee from './components/ViewEmployee';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/employee-registration" element={<EmployeeRegistration />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/appraisal" element={<Appraisal />} />
                <Route path="/view-employee" element={<ViewEmployee />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
