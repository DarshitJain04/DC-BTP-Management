import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/404';
import FacultyDashboard from './pages/FacultyDashboard';
import FacultyProjects from './pages/FacultyProjects';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProjectsList from './pages/Student/ProjectsList';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/faculty-dashboard" component={FacultyDashboard} />
        <Route path="/faculty-projects" component={FacultyProjects} />
        <Route path="/student-projects" component={ProjectsList} />
        <Route default component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
