import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import instance from '../api/axios';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
  },
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
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(5),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(12),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

export default function RecruiterRegister() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    domain: '',
    email: '',
    password: '',
    cpassword: '',
    contact: '',
    url: '',
    city: '',
    state: '',
    pin_code: '',
    country: 0,
  });
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [categoryCompany, setCategoryCompany] = React.useState('');
  const [industrySector, setIndustrySector] = React.useState('');
  const mergeDomain = () => {
    setValues({
      ...values,
      ...{
        domain: categoryCompany + '/' + industrySector,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mergeDomain();
    console.log(values);
    setLoading(true);
    var form = new FormData();
    for (const key in values) {
      form.append(key, values[key]);
    }
    instance
      .post('company/companydetails_add/', form)
      .then((res) => {
        //console.log(res.data);
        if (res.status === 201) {
          window.location = 'recruiter-login';
          setLoading(false);
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
          setError(error.response.status + ': ' + error.response.data['Error']);
        }
        setLoading(false);
      });
  };
  const handleCloseerror = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError('');
  };
  return (
    <React.Fragment>
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
        onClose={handleCloseerror}
      >
        <Alert onClose={handleCloseerror} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            component="h3"
            variant="h5"
            align="center"
            style={{ margin: '20px' }}
          >
            Company Registeration
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  label="Name of the Company"
                  value={values.name}
                  onChange={(e) => {
                    setValues({ ...values, ...{ name: e.target.value } });
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category of the Company *</InputLabel>
                  <Select
                    fullWidth
                    value={categoryCompany}
                    onChange={(e) => {
                      setCategoryCompany(e.target.value);
                    }}
                  >
                    <MenuItem value={'Public Sector'}>Public Sector</MenuItem>
                    <MenuItem value={'Government Owned'}>
                      Government Owned
                    </MenuItem>
                    <MenuItem value={'Private Sector'}>Private Sector</MenuItem>
                    <MenuItem value={'MNC (Indian Origin)'}>
                      MNC (Indian Origin)
                    </MenuItem>
                    <MenuItem value={'MNC (Foreign Origin)'}>
                      MNC (Foreign Origin)
                    </MenuItem>
                    <MenuItem value={'Start-up'}>Start-up</MenuItem>
                    <MenuItem value={'University/Institution'}>
                      University/Institution
                    </MenuItem>
                    <MenuItem value={'Others'}>Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Industry Sector *</InputLabel>
                  <Select
                    fullWidth
                    value={industrySector}
                    onChange={(e) => {
                      setIndustrySector(e.target.value);
                    }}
                  >
                    <MenuItem value={'Analytics'}>Analytics</MenuItem>
                    <MenuItem value={'Consulting'}>Consulting</MenuItem>
                    <MenuItem value={'Core (Technical)'}>
                      Core (Technical)
                    </MenuItem>
                    <MenuItem value={'Finance'}>Finance</MenuItem>
                    <MenuItem value={'IT'}>IT</MenuItem>
                    <MenuItem value={'Management'}>Management</MenuItem>
                    <MenuItem value={'Teaching and Research'}>
                      Teaching and Research
                    </MenuItem>
                    <MenuItem value={'Others'}>Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Divider variant="middle" orientation="horizontal" />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  label="Email"
                  helperText="This will be used as the username"
                  fullWidth
                  type="email"
                  value={values.email}
                  onChange={(e) => {
                    setValues({ ...values, ...{ email: e.target.value } });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Password"
                  fullWidth
                  type="password"
                  value={values.password}
                  onChange={(e) => {
                    setValues({ ...values, ...{ password: e.target.value } });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Conform Password"
                  error={values.password !== values.cpassword}
                  helperText={
                    values.password !== values.cpassword
                      ? 'Password didnot match'
                      : ''
                  }
                  fullWidth
                  type="password"
                  value={values.cpassword}
                  onChange={(e) => {
                    setValues({ ...values, ...{ cpassword: e.target.value } });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider variant="middle" orientation="horizontal" />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  label="Contact Number"
                  type="number"
                  value={values.contact}
                  onChange={(e) => {
                    setValues({ ...values, ...{ contact: e.target.value } });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  label="Company Url"
                  type="url"
                  helperText="Enter the URL of your company's website (Must start with https/http)"
                  value={values.url}
                  onChange={(e) => {
                    setValues({ ...values, ...{ url: e.target.value } });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="City"
                  value={values.city}
                  onChange={(e) => {
                    setValues({ ...values, ...{ city: e.target.value } });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="State"
                  value={values.state}
                  onChange={(e) => {
                    setValues({ ...values, ...{ state: e.target.value } });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Pincode"
                  type="number"
                  value={values.pin_code}
                  onChange={(e) => {
                    setValues({ ...values, ...{ pin_code: e.target.value } });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Country *</InputLabel>
                  <Select
                    fullWidth
                    value={values.country}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ country: e.target.value },
                      });
                    }}
                  >
                    <MenuItem value={0}>Indian</MenuItem>
                    <MenuItem value={1}>Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <center>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Submit
              </Button>
            </center>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
}
