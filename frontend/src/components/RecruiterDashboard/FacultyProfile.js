import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import instance from '../../api/axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonalDetailsForm from '../RegistrationForms/PersonalDetailsForm';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    height: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginBottom: theme.spacing(3),
    BorderRadius: theme.spacing(3),
    padding: theme.spacing(5),
    textAlign: '-webkit-center',
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(6),
      borderRadius: theme.spacing(7),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(7),
    marginLeft: theme.spacing(1),
  },
}));

const FacultyProfile = () => {
  const classes = useStyles();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const [values1, setValues1] = React.useState({
    name: '',
    email: '',
    role: '',
    program_branch: '',
  });

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError('');
  };

  const handleSubmit = () => {
    setLoading(true);
    var form = new FormData();
    form.append('name', values1.name);
    form.append('email', values1.email);
    form.append('role', values1.role);
    form.append('program_branch', values1.program_branch);
    instance
      .put('/profile/faculty_profile/', form)
      .then((res) => {
        if (res.status === 200) {
          window.alert('details updated successfully');
          window.location.reload();
        }
      })
      .catch(function (error) {
        if (error.response) {
          setError('Invalid Form. All * fields are required');
        }
        setLoading(false);
      });
  };

  React.useEffect(() => {
    instance
      .get('profile/faculty_profile/')
      .then((res) => {
        console.log(res.data);
        setValues1({
          name: res.data.user.first_name,
          email: res.data.user.email,
          role: res.data.role.role,
          program_branch: res.data.program_branch.name,
        });
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, []);

  return (
    <React.Fragment>
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
        <Snackbar open={error !== ''} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error">
            {error}
          </Alert>
        </Snackbar>
        <Paper className={classes.paper}>
          <Typography
            component="h3"
            variant="h5"
            align="center"
            style={{ paddingBottom: '7%' }}
          >
            Faculty Profile Edit
          </Typography>
          <React.Fragment>
            <PersonalDetailsForm p1={values1} p2={setValues1} />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.button}
            >
              Update
            </Button>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default FacultyProfile;
