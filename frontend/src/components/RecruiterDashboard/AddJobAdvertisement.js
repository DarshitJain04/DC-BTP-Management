import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Checkbox from '@material-ui/core/Checkbox';
import instance from '../../api/axios';

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

export default function AddAdvertisement() {
  const classes = useStyles();
  const [file, setFile] = React.useState('');
  const [values, setValues] = React.useState({});
  const [selectedBraches, setselectedBraches] = React.useState([[0, false]]);
  const [error, setError] = React.useState('');
  const [su, setsu] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [btech, setBtech] = React.useState([]);
  const [mtech, setMtech] = React.useState([]);
  const [msc, setMsc] = React.useState([]);
  const [phd, setPhd] = React.useState([]);
  const [mba, setMba] = React.useState([]);

  React.useEffect(() => {
    instance
      .get('student/get_barnches/')
      .then((res) => {
        console.log(res.data);
        setBtech(
          res.data.filter((subOption) => subOption.program.includes('BTech'))
        );
        setMsc(
          res.data.filter((subOption) => subOption.program.includes('Msc'))
        );
        setMtech(
          res.data.filter((subOption) => subOption.program.includes('MTech'))
        );
        setPhd(
          res.data.filter((subOption) => subOption.program.includes('Phd'))
        );
        setMba(
          res.data.filter((subOption) => subOption.program.includes('MBA'))
        );
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    var form = new FormData();
    for (const key in values) {
      form.append(key, values[key]);
    }
    if (file) {
      form.append('description_file', file, file.name);
    }
    form.append('selectedBraches', selectedBraches);
    //console.log(values);
    //console.log(selectedBraches);
    instance
      .post('company/job_ann_add/', form)
      .then((res) => {
        //console.log(res.data);
        if (res.status === 201) {
          setsu('Form Submitted successfully, Under Review');
          setValues({});
        }
        setLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
          setError(error.response.status + ': ' + error.response.data['Error']);
        }
        setLoading(false);
      });
  };
  const handleChangeFile = (event) => {
    setFile(event.target.files[0]);
  };
  const handleCloseerror = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError('');
    setsu('');
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
      <Snackbar
        open={su !== ''}
        autoHideDuration={6000}
        onClose={handleCloseerror}
      >
        <Alert onClose={handleCloseerror} severity="success">
          {su}
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
            JOB ANNOUNCEMENT FORM
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Job Designation"
                  value={values.designation}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      ...{ designation: e.target.value },
                    });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  label="Job Description"
                  value={values.description || (file && file.name)}
                  helperText="Enter or Upload Pdf"
                  onChange={(e) => {
                    setValues({
                      ...values,
                      ...{ description: e.target.value },
                    });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" component="label">
                  <AttachFileIcon />
                  <input
                    type="file"
                    accept="application/pdf"
                    hidden
                    onChange={handleChangeFile}
                  />
                </Button>
                {/* {file && file.name} */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Tenative Joining Date"
                  value={values.tentative_join_date}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      ...{ tentative_join_date: e.target.value },
                    });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Tentative Job Location"
                  value={values.tentative_join_location}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      ...{ tentative_job_location: e.target.value },
                    });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Time required to issue offer letter if the student is selected"
                  type="number"
                  helperText="Enter number of weeks/months"
                  value={values.time_issue_letter}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      ...{ time_issue_letter: e.target.value },
                    });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Any Bond/Contract"
                  value={values.bond_details}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      ...{ bond_details: e.target.value },
                    });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Divider variant="middle" orientation="horizontal" />
              </Grid>
              <Grid item xs={12}>
                <b style={{ fontSize: '1.1rem' }}>
                  Please mark the discipline in which you are interested to
                  recruit in :-
                </b>
              </Grid>
              <Grid item xs={12}>
                <center
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: 'grey',
                  }}
                >
                  {' '}
                  Bachelor of Technology <br />
                  <div style={{ fontSize: '0.8rem' }}>
                    Admission to B.Tech Programmes is through IIT-Joint Entrance
                    Examination (Advanced)
                  </div>{' '}
                </center>
              </Grid>
              <Grid container style={{ marginLeft: '6%' }}>
                {btech.map((element) => (
                  <Grid item xs={12} sm={6}>
                    <Checkbox
                      value={element.id}
                      onChange={(e) => {
                        setselectedBraches([
                          ...selectedBraches,
                          [e.target.value, e.target.checked],
                        ]);
                      }}
                    />{' '}
                    {element.name}
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12}>
                <center
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: 'grey',
                  }}
                >
                  {' '}
                  Master of Technology <br />
                  <div style={{ fontSize: '0.8rem' }}>
                    Admission to M.Tech. Programmes is through GATE
                  </div>{' '}
                </center>
              </Grid>
              <Grid container style={{ marginLeft: '6%' }}>
                {mtech.map((element) => (
                  <Grid item xs={12} sm={6}>
                    <Checkbox
                      value={element.id}
                      onChange={(e) => {
                        setselectedBraches([
                          ...selectedBraches,
                          [e.target.value, e.target.checked],
                        ]);
                      }}
                    />{' '}
                    {element.name}
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12}>
                <center
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: 'grey',
                  }}
                >
                  {' '}
                  Master of Science
                </center>
              </Grid>
              <Grid container style={{ marginLeft: '6%' }}>
                {msc.map((element) => (
                  <Grid item xs={12} sm={6}>
                    <Checkbox
                      value={element.id}
                      onChange={(e) => {
                        setselectedBraches([
                          ...selectedBraches,
                          [e.target.value, e.target.checked],
                        ]);
                      }}
                    />{' '}
                    {element.name}
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12}>
                <center
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: 'grey',
                  }}
                >
                  {' '}
                  Doctor of Philosophy <br />
                </center>
              </Grid>
              <Grid container style={{ marginLeft: '6%' }}>
                {phd.map((element) => (
                  <Grid item xs={12} sm={6}>
                    <Checkbox
                      value={element.id}
                      onChange={(e) => {
                        setselectedBraches([
                          ...selectedBraches,
                          [e.target.value, e.target.checked],
                        ]);
                      }}
                    />{' '}
                    {element.name}
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12}>
                <center
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: 'grey',
                  }}
                >
                  {' '}
                  Master of Business Administration <br />
                  <div style={{ fontSize: '0.8rem' }}>
                    Admission to MBA program is through CAT
                  </div>{' '}
                </center>
              </Grid>
              <Grid container style={{ marginLeft: '6%' }}>
                {mba.map((element) => (
                  <Grid item xs={12} sm={6}>
                    <Checkbox
                      value={element.id}
                      onChange={(e) => {
                        setselectedBraches([
                          ...selectedBraches,
                          [e.target.value, e.target.checked],
                        ]);
                      }}
                    />{' '}
                    {element.name}
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12}>
                <Divider variant="middle" orientation="horizontal" />
              </Grid>
              <Grid item xs={12}>
                <b style={{ fontSize: '1.1rem' }}>Package Details :-</b>
                <Grid
                  item
                  xs={12}
                  style={{ fontSize: '0.7rem', margin: '1rem' }}
                >
                  <b>
                    * in lacs per annum (LPA) <br />* Leave 0 if not apllicable
                  </b>
                </Grid>
              </Grid>

              <Grid container style={{ marginLeft: '6%' }}>
                <Grid item xs={12} style={{ paddingBottom: '10px' }}>
                  <b>BTech</b>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Basic"
                    type="number"
                    defaultValue={0}
                    value={values.btech_basic}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ btech_basic: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Monthly Fixed Salary"
                    type="number"
                    defaultValue={0}
                    value={values.btech_monthly_salary}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ btech_monthly_salary: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} style={{ padding: '10px' }}></Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Variables"
                    type="number"
                    defaultValue={0}
                    value={values.btech_variables}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ btech_variables: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Gross Salary"
                    type="number"
                    defaultValue={0}
                    value={values.btech_gross_salary}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ btech_gross_salary: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Cost to Company"
                    type="number"
                    defaultValue={0}
                    value={values.btech_cost_to_company}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ btech_cost_to_company: e.target.value },
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container style={{ marginLeft: '6%', marginTop: '5%' }}>
                <Grid item xs={12} style={{ paddingBottom: '10px' }}>
                  <b>MTech</b>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Basic"
                    type="number"
                    defaultValue={0}
                    value={values.mtech_basic}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ mtech_basic: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Monthly Fixed Salary"
                    type="number"
                    defaultValue={0}
                    value={values.mtech_monthly_salary}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ mtech_monthly_salary: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} style={{ padding: '10px' }}></Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Variables"
                    type="number"
                    defaultValue={0}
                    value={values.mtech_variables}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ mtech_variables: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Gross Salary"
                    type="number"
                    defaultValue={0}
                    value={values.mtech_gross_salary}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ mtech_gross_salary: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Cost to Company"
                    type="number"
                    defaultValue={0}
                    value={values.mtech_cost_to_company}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ mtech_cost_to_company: e.target.value },
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container style={{ marginLeft: '6%', marginTop: '5%' }}>
                <Grid item xs={12} style={{ paddingBottom: '10px' }}>
                  <b>M.Sc</b>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Basic"
                    type="number"
                    defaultValue={0}
                    value={values.msc_basic}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ msc_basic: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Monthly Fixed Salary"
                    type="number"
                    defaultValue={0}
                    value={values.msc_monthly_salary}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ msc_monthly_salary: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} style={{ padding: '10px' }}></Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Variables"
                    type="number"
                    defaultValue={0}
                    value={values.msc_variables}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ msc_variables: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Gross Salary"
                    type="number"
                    defaultValue={0}
                    value={values.msc_gross_salary}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ msc_gross_salary: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Cost to Company"
                    type="number"
                    defaultValue={0}
                    value={values.msc_cost_to_company}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ msc_cost_to_company: e.target.value },
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container style={{ marginLeft: '6%', marginTop: '5%' }}>
                <Grid item xs={12} style={{ paddingBottom: '10px' }}>
                  <b>Ph.D</b>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Basic"
                    type="number"
                    defaultValue={0}
                    value={values.phd_basic}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ phd_basic: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Monthly Fixed Salary"
                    type="number"
                    defaultValue={0}
                    value={values.phd_monthly_salary}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ phd_monthly_salary: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} style={{ padding: '10px' }}></Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Variables"
                    type="number"
                    defaultValue={0}
                    value={values.phd_variables}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ phd_variables: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Gross Salary"
                    type="number"
                    defaultValue={0}
                    value={values.phd_gross_salary}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ phd_gross_salary: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Cost to Company"
                    type="number"
                    defaultValue={0}
                    value={values.phd_cost_to_company}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ phd_cost_to_company: e.target.value },
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container style={{ marginLeft: '6%', marginTop: '5%' }}>
                <Grid item xs={12} style={{ paddingBottom: '10px' }}>
                  <b>MBA</b>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Basic"
                    type="number"
                    defaultValue={0}
                    value={values.mba_basic}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ mba_basic: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Monthly Fixed Salary"
                    type="number"
                    defaultValue={0}
                    value={values.mba_monthly_salary}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ mba_monthly_salary: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} style={{ padding: '10px' }}></Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Variables"
                    type="number"
                    defaultValue={0}
                    value={values.mba_variables}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ mba_variables: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Gross Salary"
                    type="number"
                    defaultValue={0}
                    value={values.mba_gross_salary}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ mba_gross_salary: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Cost to Company"
                    type="number"
                    defaultValue={0}
                    value={values.mba_cost_to_company}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ mba_cost_to_company: e.target.value },
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="middle" orientation="horizontal" />
              </Grid>
              <Grid item xs={12}>
                <b style={{ fontSize: '1.1rem' }}>Selection Criteria:-</b>
              </Grid>
              <Grid item xs={12}>
                <b style={{ fontSize: '0.8rem', marginLeft: '4%' }}>
                  1. UG-CGPA Eligibility Criteria
                </b>
              </Grid>
              <Grid container style={{ marginLeft: '10%', marginTop: '1%' }}>
                <Grid item xs={4} style={{ paddingRight: '10px' }}>
                  <TextField
                    label="BTech"
                    type="number"
                    defaultValue={0}
                    value={values.btech_min_ucpga}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ btech_min_ucpga: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4} style={{ paddingRight: '10px' }}>
                  <TextField
                    label="MTech"
                    type="number"
                    defaultValue={0}
                    value={values.mtech_min_ucgpa}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ mtech_min_ucpga: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4} style={{ paddingRight: '10px' }}>
                  <TextField
                    label="MSc"
                    type="number"
                    defaultValue={0}
                    value={values.msc_min_ucgpa}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ msc_min_ucpga: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={{ paddingRight: '10px', marginTop: '10px' }}
                >
                  <TextField
                    label="Ph.D"
                    type="number"
                    defaultValue={0}
                    value={values.phd_min_ucgpa}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ phd_min_ucpga: e.target.value },
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <b style={{ fontSize: '0.8rem', marginLeft: '7%' }}>
                  PG-CGPA Eligibility Criteria
                </b>
              </Grid>
              <Grid container style={{ marginLeft: '10%', marginTop: '1%' }}>
                <Grid item xs={4} style={{ paddingRight: '10px' }}>
                  <TextField
                    label="MTech"
                    type="number"
                    defaultValue={0}
                    value={values.mtech_min_pcgpa}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ mtech_min_pcpga: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4} style={{ paddingRight: '10px' }}>
                  <TextField
                    label="MSc"
                    type="number"
                    defaultValue={0}
                    value={values.msc_min_pcgpa}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ msc_min_pcpga: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={4} style={{ paddingRight: '10px' }}>
                  <TextField
                    label="Ph.D"
                    type="number"
                    defaultValue={0}
                    value={values.phd_min_pcgpa}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ phd_min_pcpga: e.target.value },
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <b style={{ fontSize: '0.8rem', marginLeft: '4%' }}>
                  2.
                  <Checkbox
                    value={values.resume_required}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ resume_required: e.target.checked },
                      });
                    }}
                  />{' '}
                  Shortlist from Resumes{' '}
                </b>
              </Grid>
              <Grid item xs={12}>
                <b style={{ fontSize: '0.8rem', marginLeft: '4%' }}>
                  3.
                  <Checkbox
                    value={values.allow_backlog}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ allow_backlog: e.target.checked },
                      });
                    }}
                  />{' '}
                  Allow students who have backlogs{' '}
                </b>
              </Grid>
              <Grid item xs={12}>
                <b style={{ fontSize: '0.8rem', marginLeft: '4%' }}>
                  4. Any Other Criteria:{' '}
                </b>
              </Grid>
              <Grid item xs={10} style={{ marginLeft: '8%' }}>
                <TextField
                  value={values.any_other_criteria}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      ...{ any_other_criteria: e.target.value },
                    });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <b style={{ fontSize: '0.8rem', marginLeft: '4%' }}>
                  5. Further rounds for the shortlisted students
                </b>
              </Grid>
              <Grid container style={{ marginLeft: '8%' }}>
                <Grid container>
                  <b style={{ fontSize: '0.8rem', marginLeft: '4%' }}>
                    A. Technical Test
                    <Checkbox
                      value={values.ppt_round}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          ...{ technical_round: e.target.checked },
                        });
                      }}
                    />{' '}
                  </b>
                  <Grid
                    container
                    style={{
                      marginLeft: '10%',
                      marginBottom: '2%',
                    }}
                  >
                    <Grid item xs={6}>
                      <TextField
                        label="Weightage"
                        type="number"
                        helperText="Out of 10"
                        value={values.technical_round_weightage}
                        onChange={(e) => {
                          setValues({
                            ...values,
                            ...{ technical_round_weightage: e.target.value },
                          });
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <b style={{ fontSize: '0.8rem', marginLeft: '4%' }}>
                    B. Aptitude Test
                    <Checkbox
                      value={values.aptitude_test_required}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          ...{ aptitude_test_required: e.target.checked },
                        });
                      }}
                    />{' '}
                  </b>
                  <Grid
                    container
                    style={{
                      marginLeft: '10%',
                      marginBottom: '2%',
                    }}
                  >
                    <Grid item xs={6}>
                      <TextField
                        label="Weightage"
                        type="number"
                        helperText="Out of 10"
                        value={values.aptitude_round_weightage}
                        onChange={(e) => {
                          setValues({
                            ...values,
                            ...{ aptitude_round_weightage: e.target.value },
                          });
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <b style={{ fontSize: '0.8rem', marginLeft: '4%' }}>
                    C. Group Discussion
                    <Checkbox
                      value={values.group_discussion_required}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          ...{ group_discussion_required: e.target.checked },
                        });
                      }}
                    />{' '}
                  </b>
                  <Grid
                    container
                    style={{
                      marginLeft: '10%',
                      marginBottom: '2%',
                    }}
                  >
                    <Grid item xs={6}>
                      <TextField
                        label="Weightage"
                        type="number"
                        helperText="Out of 10"
                        value={values.gd_round_weightage}
                        onChange={(e) => {
                          setValues({
                            ...values,
                            ...{ gd_round_weightage: e.target.value },
                          });
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <b style={{ fontSize: '0.8rem', marginLeft: '4%' }}>
                    D. Technical Interview
                    <Checkbox
                      value={values.ti_round}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          ...{ ti_round: e.target.checked },
                        });
                      }}
                    />{' '}
                  </b>
                  <Grid
                    container
                    style={{
                      marginLeft: '10%',
                      marginBottom: '2%',
                    }}
                  >
                    <Grid item xs={6}>
                      <TextField
                        label="Weightage"
                        type="number"
                        helperText="Out of 10"
                        value={values.ti_round_weightage}
                        onChange={(e) => {
                          setValues({
                            ...values,
                            ...{ ti_round_weightage: e.target.value },
                          });
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <b style={{ fontSize: '0.8rem', marginLeft: '4%' }}>
                    F. HR Interview
                    <Checkbox
                      value={values.hr_round}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          ...{ hr_round: e.target.checked },
                        });
                      }}
                    />{' '}
                  </b>
                  <Grid
                    container
                    style={{
                      marginLeft: '10%',
                      marginBottom: '2%',
                    }}
                  >
                    <Grid item xs={6}>
                      <TextField
                        label="Weightage"
                        type="number"
                        helperText="Out of 10"
                        value={values.hr_round_weightage}
                        onChange={(e) => {
                          setValues({
                            ...values,
                            ...{ hr_round_weightage: e.target.value },
                          });
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <b style={{ fontSize: '0.8rem', marginLeft: '4%' }}>
                    G. Other
                    <Checkbox
                      value={values.other_round}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          ...{ other_round: e.target.checked },
                        });
                      }}
                    />{' '}
                  </b>
                  <Grid
                    container
                    style={{
                      marginLeft: '10%',
                      marginBottom: '2%',
                    }}
                  >
                    <Grid item xs={6}>
                      <TextField
                        label="Name"
                        value={values.other_round_name}
                        onChange={(e) => {
                          setValues({
                            ...values,
                            ...{ other_round_name: e.target.value },
                          });
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Weightage"
                        type="number"
                        helperText="Out of 10"
                        value={values.other_round_weightage}
                        onChange={(e) => {
                          setValues({
                            ...values,
                            ...{ other_round_weightage: e.target.value },
                          });
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="middle" orientation="horizontal" />
              </Grid>
              <Grid item xs={12}>
                <b style={{ fontSize: '1rem', marginLeft: '4%' }}>
                  Slot required for Pre-Placement Talk :
                  <Checkbox
                    value={values.pre_talk}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ pre_talk: e.target.checked },
                      });
                    }}
                  />{' '}
                </b>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="middle" orientation="horizontal" />
              </Grid>
              <Grid item xs={12}>
                <b style={{ fontSize: '1rem', marginLeft: '4%' }}>
                  Contact Detials :-
                </b>
              </Grid>
              <Grid
                container
                style={{
                  marginLeft: '10%',
                  marginBottom: '2%',
                }}
              >
                <Grid item xs={11}>
                  <TextField
                    required
                    label="Contact Person"
                    fullWidth
                    value={values.contact_person}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ contact_person: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    required
                    label="Designation"
                    fullWidth
                    value={values.con_designation}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ con_designation: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    required
                    label="Email"
                    fullWidth
                    type="email"
                    value={values.con_email}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ con_email: e.target.value },
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    required
                    label="Phone"
                    fullWidth
                    type="number"
                    value={values.con_phone}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ...{ con_phone: e.target.value },
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={11}>
                <Divider variant="middle" orientation="horizontal" />
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
