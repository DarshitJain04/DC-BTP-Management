import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from './pages/404';
import FacultyDashboard from './pages/FacultyDashboard';
import FacultyProjectsList from './pages/Faculty/FacultyProjectsList';
import FacultyCourseList from './pages/Faculty/FacultyCourseList';
import DepartmentCourseList from './pages/Department/DepartmentCourseList';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProjectsList from './pages/Student/ProjectsList';
import ProjectsApplied from './pages/Student/ProjectsApplied';
import ArchivedApplications from './pages/Student/ArchivedApplications';
import Login from './pages/Login';
import Navbar from './components/Navbar/Navbar';
import StudentProtected from './components/RestrictedRoutes/StudentProtected';
import FacultyProtected from './components/RestrictedRoutes/FacultyProtected';
import DepartmentProtected from './components/RestrictedRoutes/DepartmentProtected';

const App = () => {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Login} />
        <FacultyProtected
          path="/faculty-dashboard"
          component={FacultyDashboard}
        />
        <FacultyProtected
          path="/faculty-projects"
          component={FacultyProjectsList}
        />
        <FacultyProtected
          path="/faculty-courses"
          component={FacultyCourseList}
        />
        <DepartmentProtected
          path="/department-courses"
          component={DepartmentCourseList}
        />
        <StudentProtected path="/student-projects" component={ProjectsList} />
        <StudentProtected
          path="/student-projects-applied"
          component={ProjectsApplied}
        />
        <StudentProtected
          path="/student-archived-applications"
          component={ArchivedApplications}
        />
        <Route default component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
