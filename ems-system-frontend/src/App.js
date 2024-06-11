// import logo from './logo.svg';
// import './App.css';
// import Employees from './components/Employees';

// function App() {
//   return (
//     <div className="App">
//       <Employees />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Employees from './components/Employees';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
