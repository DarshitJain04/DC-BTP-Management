import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import instance from '../../api/axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonalDetailsForm from '../RegistrationForms/PersonalDetailsForm';
import AcademicDetailsForm from '../RegistrationForms/AcademicDetailsForm';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { getLink } from '../../utils/getLink';

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

const Profile = () => {
  const classes = useStyles();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);

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
  });
  const [check, setCheck] = React.useState(false);

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
    form.append('year', values2.year);
    form.append('roll_no', values2.roll_no);
    instance
      .put('/student/details/', form)
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
      .get('student/details/')
      .then((res) => {
        let data = res.data;
        if (!data.AllowedEdit) {
          setError('Profile Edit is not allowed now');
        } else {
          setCheck(true);
        }
        // console.log(res.data);
        setValues1({
          birthday: data.dob,
          phonenumber: data.phone,
          padd: data.permanent_address,
          cadd: data.current_address,
          category: data.category,
          national: data.nationality,
          disable: data.physical_disability,
          photo: getLink(data.std_image),
        });
        setValues2({
          year: data.year,
          roll_no: data.roll_no,
          gpa: data.gpa,
          ugclg: data.ug_college,
          ugpa: data.ug_gpa,
          ugyear: data.ug_passing_year,
          ugprbr: data.ug_program_branch,
          jeeair: data.jee_air,
          by12: data.xii_year,
          by10: data.x_year,
          bn12: data.xii_board_name,
          bn10: data.x_board_name,
          bp12: data.xii_percentage,
          bp10: data.x_percentage,
        });
      })
      .catch((error) => console.log(error));
    setLoading(false);
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
            Student Profile Edit
          </Typography>
          <React.Fragment>
            <PersonalDetailsForm p1={values1} p2={setValues1} />
            <AcademicDetailsForm p1={values2} p2={setValues2} />
            <Button
              variant="contained"
              color="primary"
              disabled={!check}
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

export default Profile;
