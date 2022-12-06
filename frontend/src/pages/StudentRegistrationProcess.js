import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import StarsIcon from '@material-ui/icons/Stars';
import { makeStyles } from '@material-ui/core/styles';
import FadeInWhenVisible from '../components/Animation/FadeIn';
import Login from '../assets/student_procedure/login.jpg';
import Adetails from '../assets/student_procedure/Adetails.jpg';
import Pdetails from '../assets/student_procedure/Pdetails.jpg';
import Ndetails from '../assets/student_procedure/Ndetails.jpg';
import ResumeUp from '../assets/student_procedure/ResumeUp.jpg';
import RDashboard from '../assets/student_procedure/RDashboard.jpg';
import Offers from '../assets/student_procedure/Offers.jpg';
import Aoffers from '../assets/student_procedure/Aoffers.jpg';
import Dashboard from '../assets/student_procedure/Dashboard.jpg';
import SI from '../assets/student_procedure/SI.jpg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    marginBottom: '2rem',
    [theme.breakpoints.down(460)]: {
      padding: 25,
      overflowX: 'hidden',
    },
  },
  paper: {
    padding: theme.spacing(2),
    width: 'auto',
    fontSize: '1rem',
    color: 'black',
    textAlign: 'center',
  },
  card: {
    fontSize: '1rem',
    color: 'black',
  },
  heading: {
    fontSize: '1.8rem',
    color: '#fff',
    backgroundColor: '#012970',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
}));

const IconStyle = {
  background: '#1d1642',
  color: 'white',
  fontWeight: 800,
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  fontSize: 'x-large',
};

const StudentRegistrationProcess = () => {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="lg" className={classes.root}>
        <Grid container spacing={3}>
          <Grid style={{ marginTop: '30px' }} item xs={12}>
            <FadeInWhenVisible>
              <Paper
                className={classes.heading}
                style={{ background: '#012970', color: '#fff' }}
                elevation={2}
              >
                <i
                  class="fas fa-file-alt"
                  style={{ margin: '0 1.2rem', padding: '0' }}
                ></i>
                Student Registeration Procedure
              </Paper>
            </FadeInWhenVisible>
          </Grid>
          <VerticalTimeline>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={IconStyle}
              icon={1}
            >
              <p className={classes.card}>
                Use your LDAP credentials to Login in portal{' '}
                <Link to="/student-login">Student Login</Link>{' '}
              </p>
              <br />
              <img src={Login} alt="logo" style={{ maxWidth: '100%' }} />
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={IconStyle}
              icon={2}
            >
              <p className={classes.card}>
                You will be redirected to profile creation page if not already
                created
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={IconStyle}
              icon={'2A'}
            >
              <p className={classes.card}>
                Enter your Personal Details and click Next
              </p>
              <br />
              <img src={Pdetails} alt="logo" style={{ maxWidth: '100%' }} />
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={IconStyle}
              icon={'2B'}
            >
              <p className={classes.card}>
                Enter your Academic Details and click Next
              </p>
              <br />
              <img src={Adetails} alt="logo" style={{ maxWidth: '100%' }} />
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={IconStyle}
              icon={'2C'}
            >
              <p className={classes.card}>
                Read and accept the Placement Norms and click Submit
              </p>
              <br />
              <img src={Ndetails} alt="logo" style={{ maxWidth: '100%' }} />
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={IconStyle}
              icon={'3A'}
            >
              <p className={classes.card}>
                Upload your resume for approval <br />
                <ul
                  style={{
                    listStyle: 'number',
                    marginLeft: '10%',
                    marginTop: '5%',
                  }}
                >
                  <li>
                    {' '}
                    Navigate to Upload section from Menu{' '}
                    <Link to="/student-dashboard/UploadResume">
                      Upload Resume
                    </Link>
                  </li>
                  <li> Click and select the Resume File to upload </li>
                  <li> Enter any refrence name for your resume</li>
                  <li>Click on submit to submit resume for approval</li>
                </ul>
              </p>
              <br />
              <img src={ResumeUp} alt="logo" style={{ maxWidth: '100%' }} />
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={IconStyle}
              icon={'3B'}
            >
              <p className={classes.card}>
                Check Uploaded Resume <br />
                <ul
                  style={{
                    listStyle: 'number',
                    marginLeft: '10%',
                    marginTop: '5%',
                  }}
                >
                  <li>
                    {' '}
                    Navigate to Dashboard{' '}
                    <Link to="/student-dashboard">Dashboard</Link>
                  </li>
                  <li> All resumes are listed in this section </li>
                  <li> Check the status of the resume</li>
                  <li>Click to open the resume</li>
                  <li>Delete the resume</li>
                  <div
                    style={{
                      margin: 'auto',
                      color: 'red',
                      fontSize: '0.92rem',
                    }}
                  >
                    ** Only non approved resumes could be deleted
                  </div>
                </ul>
              </p>
              <br />
              <img src={RDashboard} alt="logo" style={{ maxWidth: '100%' }} />
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={IconStyle}
              icon={'4'}
            >
              <p className={classes.card}>
                View Available Offers <br />
                <ul
                  style={{
                    listStyle: 'number',
                    marginLeft: '10%',
                    marginTop: '5%',
                  }}
                >
                  <li>
                    {' '}
                    Navigate to Offers Page{' '}
                    <Link to="/student-dashboard/offers">Offers</Link>
                  </li>
                  <li> All Offers are listed in this section </li>
                  <li>Click to view offer detials</li>
                  <div
                    style={{
                      margin: 'auto',
                      color: 'red',
                      fontSize: '0.92rem',
                    }}
                  >
                    ** Only offers that met your eligibility will be listed here
                  </div>
                </ul>
              </p>
              <br />
              <img src={Offers} alt="logo" style={{ maxWidth: '100%' }} />
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={IconStyle}
              icon={'5'}
            >
              <p className={classes.card}>
                Apply for an offer <br />
                <ul
                  style={{
                    listStyle: 'number',
                    marginLeft: '10%',
                    marginTop: '5%',
                  }}
                >
                  <li>
                    {' '}
                    Navigate to Offers Page{' '}
                    <Link to="/student-dashboard/offers">Offers</Link>
                  </li>
                  <li> Click on the apply button </li>
                  <li>Select the Resume</li>
                  <li>Click Submit</li>
                  <div
                    style={{
                      margin: 'auto',
                      color: 'red',
                      fontSize: '0.92rem',
                    }}
                  >
                    ** You will only be able to apply using a approved resume
                  </div>
                </ul>
              </p>
              <br />
              <img src={Aoffers} alt="logo" style={{ maxWidth: '100%' }} />
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={IconStyle}
              icon={6}
            >
              <p className={classes.card}>
                View Applied Offers and Status on{' '}
                <Link to="/student-dashboard">Dashboard</Link>{' '}
              </p>
              <br />
              <img src={Dashboard} alt="logo" style={{ maxWidth: '100%' }} />
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={IconStyle}
              icon={7}
            >
              <p className={classes.card}>
                Submit{' '}
                <Link to="/student-dashboard/suggestion_inquiry">
                  Suggestion/Inquiry
                </Link>{' '}
              </p>
              <br />
              <img src={SI} alt="logo" style={{ maxWidth: '100%' }} />
            </VerticalTimelineElement>
            <VerticalTimelineElement
              iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
              icon={<StarsIcon />}
            >
              <p className={classes.card}>
                <b>
                  Happy Placement season !<br />
                  <i style={{ paddingLeft: '25%' }}> - Team CDC</i>
                </b>
              </p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </Grid>
      </Container>
    </>
  );
};

export default StudentRegistrationProcess;
