import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import instance from '../api/axios';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonalDetailsForm from '../components/RegistrationForms/PersonalDetailsForm';
import AcademicDetailsForm from '../components/RegistrationForms/AcademicDetailsForm';
import NormsForm from '../components/RegistrationForms/NormsForm';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import CancelIcon from '@material-ui/icons/Cancel';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(11),
    marginBottom: theme.spacing(3),
    BorderRadius: theme.spacing(3),
    padding: theme.spacing(5),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(6),
      borderRadius: theme.spacing(7),
    },
  },
  stepper: {
    padding: theme.spacing(5, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Personal Details', 'Academic details', 'Norms Acceptance'];

const StudentRegister = () => {
  const classes = useStyles();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);

  const [values1, setValues1] = React.useState({
    birthday: '',
    phonenumber: '',
    padd: '',
    cadd: '',
    category: '',
    national: '',
    disable: '',
    photo: '',
  });
  const [values2, setValues2] = React.useState({
    gpa: '',
    ugclg: '',
    ugpa: '',
    ugyear: '',
    ugprbr: '',
    jeeair: '',
    by12: '',
    by10: '',
    bn12: '',
    bn10: '',
    bp12: '',
    bp10: '',
    check: false,
  });
  const [check, setCheck] = React.useState(false);
  const [alert, setalert] = React.useState([]);
  const [show, setshow] = React.useState(true);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalDetailsForm p1={values1} p2={setValues1} />;
      case 1:
        return <AcademicDetailsForm p1={values2} p2={setValues2} />;
      case 2:
        return <NormsForm p1={check} p2={setCheck} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError('');
  };

  const handleSubmit = () => {
    // console.log(values1);
    setLoading(true);
    var form = new FormData();
    try {
      form.append('std_image', values1.photo, values1.photo.name);
    } catch {}
    form.append('gpa', values2.gpa);
    form.append('ug_college', values2.ugclg);
    form.append('ug_gpa', values2.ugpa);
    form.append('ug_passing_year', values2.ugyear);
    form.append('ug_program_branch', values2.ugprbr);
    form.append('phone', values1.phonenumber);
    form.append('dob', values1.birthday);
    form.append('category', values1.category);
    form.append('jee_air', values2.jeeair);
    form.append('physical_disability', values1.disable);
    form.append('nationality', values1.national);
    form.append('permanent_address', values1.padd);
    form.append('current_address', values1.cadd);
    form.append('x_year', values2.by10);
    form.append('x_board_name', values2.bn10);
    form.append('x_percentage', values2.bp10);
    form.append('xii_year', values2.by12);
    form.append('xii_board_name', values2.bn12);
    form.append('xii_percentage', values2.bp12);
    instance
      .post('/student/details/', form)
      .then((res) => {
        if (res.status === 200) {
          window.location = '/student-dashboard';
        }
      })
      .catch(function (error) {
        if (error.response) {
          setError(error.response.data['Error']);
        }
        setLoading(false);
      });
  };

  React.useEffect(() => {
    instance
      .get('main/alerts/')
      .then((res) => {
        setalert(res.data.StudentRegister);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <React.Fragment>
      {show && alert.length !== 0 ? (
        <Grid container style={{ padding: '10px 10%', background: alert[1] }}>
          <CancelIcon onClick={() => setshow(false)} />
          <div style={{ margin: 'auto' }}>{alert[0]}</div>
        </Grid>
      ) : (
        <div />
      )}
      <CssBaseline />
      <main className={classes.layout}>
        <Backdrop
          style={{
            zIndex: 1,
            color: '#fff',
          }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          open={error !== ''}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <Alert onClose={handleCloseError} severity="error">
            {error}
          </Alert>
        </Snackbar>
        <Paper className={classes.paper}>
          <Typography component="h3" variant="h5" align="center">
            Student Registeration
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Loading ...
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep !== steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!check}
                      onClick={handleSubmit}
                      className={classes.button}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default StudentRegister;
