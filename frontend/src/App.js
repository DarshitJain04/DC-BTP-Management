import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/404';
import StudentLogin from './pages/StudentLogin';
import RecruiterLogin from './pages/RecruiterLogin';
import RecruiterRegister from './pages/RecruiterRegister';
import RecruiterDashboard from './pages/RecruiterDashboard';
import StudentRegister from './pages/StudentRegister';
import StudentDashboard from './pages/StudentDashboard';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import StudentProtected from './components/RestrictedRoutes/StudentProtected';
import CompanyProtected from './components/RestrictedRoutes/CompanyProtected';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/student-login" component={StudentLogin} />
        <Route path="/student-register" component={StudentRegister} />
        <StudentProtected
          path="/student-dashboard/"
          component={StudentDashboard}
        />
        <Route path="/recruiter-login" component={RecruiterLogin} />
        <Route path="/recruiter-register" component={RecruiterRegister} />
        <CompanyProtected
          path="/recruiter-dashboard"
          component={RecruiterDashboard}
        />
        <Route default component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
