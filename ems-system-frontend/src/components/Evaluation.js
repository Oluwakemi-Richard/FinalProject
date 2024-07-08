import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
// import Employees from './Employees';
import Appraisal from './Appraisal';
import ViewEmployee from './ViewEmployee';

const Evaluation = () => {
  return (
    <Tabs defaultActiveKey="appraisal" id="dashboard-tabs">
      {/* <Tab eventKey="employees" title="Employees">
        <Employees />
      </Tab> */}
      <Tab eventKey="appraisal" title="Appraisal">
        <Appraisal />
      </Tab>
      <Tab eventKey="view" title="Check Performance">
        <ViewEmployee />
      </Tab>
    </Tabs>
  );
};

export default Evaluation;
