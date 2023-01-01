import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
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
import IndustryProjects from './pages/Student/IndustryProjects';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/faculty-dashboard" component={FacultyDashboard} />
        <Route path="/faculty-projects" component={FacultyProjectsList} />
        <Route path="/faculty-courses" component={FacultyCourseList} />
        <Route path="/department-courses" component={DepartmentCourseList} />
        <Route path="/student-projects" component={ProjectsList} />
        <Route path="/student-projects-applied" component={ProjectsApplied} />
        <Route
          path="/student-archived-applications"
          component={ArchivedApplications}
        />
        <Route
          path="/student-industry-applications"
          component={IndustryProjects}
        />
        <Route default component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
