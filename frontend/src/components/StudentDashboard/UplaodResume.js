import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import instance from '../../api/axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    width: '100%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function UploadResume() {
  const classes = useStyles();
  const [file, setFile] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [ref, setRef] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleCloseerror = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  };

  const handleChangeRef = (event) => {
    setRef(event.target.value);
  };
  const handleChangeFile = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = () => {
    setLoading(true);
    var form = new FormData();
    form.append('file', file, file.name);
    form.append('reference', ref);
    instance
      .post('/student/resumes/', form)
      .then((res) => {
        setOpen(true);
        setRef('');
        setFile('');
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
    setLoading(false);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <Paper className={classes.paper}>
          <React.Fragment>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Upload Resume
            </Typography>
            <Typography
              variant="subtitle"
              style={{ color: 'red', marginLeft: '30px' }}
            >
              You can upload a maximum of 7 Resume which cannot be edited later
              <br />
              ** After uploading, please check if resume is properly uploaded on
              the Dashboard
            </Typography>
          </React.Fragment>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Paper className={classes.paper}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                component="label"
                style={{ margin: '30px' }}
              >
                <CloudUploadIcon style={{ margin: '10px' }} />
                Upload Resume
                <input
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={handleChangeFile}
                />
              </Button>
              {file && file.name}
              <br />
              <Typography
                variant="subtitle"
                style={{ color: 'red', marginLeft: '30px' }}
              >
                You can only upload PDF Resumes
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="Refrence Name"
                label="Refrence Name"
                value={ref}
                onChange={handleChangeRef}
                fullWidth
                autoComplete="Refrence Name"
                helperText="Enter a reference name for this resume by which you can remember the details of this particular resume"
              />
            </Grid>
            <Grid item xs={12}>
              <center>
                <Button
                  variant="contained"
                  component="label"
                  disabled={!(file && ref)}
                  style={{ margin: '30px' }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </center>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Resume Uploaded Suceessfully!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseerror}>
        <Alert onClose={handleCloseerror} severity="error">
          Resume Upload Failed, Try Again Later
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default UploadResume;
