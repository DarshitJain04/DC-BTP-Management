import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import instance from '../../api/axios';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Modal from '@material-ui/core/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    width: '100%',
  },
  papermodal: {
    position: 'absolute',
    marginLeft: window.innerWidth / 3.5,
    marginTop: window.innerHeight / 3,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function getDate(date) {
  date = new Date(date);
  return date.toDateString();
}

function Offers() {
  const classes = useStyles();
  const [intern, setinternData] = React.useState([]);
  const [job, setjobData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [resume, setresumeData] = React.useState([]);
  const [selcted, setselcted] = React.useState({});
  const [res, setres] = React.useState('None');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    instance
      .get('student/offers/')
      .then((res) => {
        console.log(res.data);
        let dat = [];
        try {
          res.data.Internships.forEach((element) => {
            element.name = element.company.name;
            element.type = 'Intern';
            dat.push(element);
          });
          setinternData(dat);
        } catch (e) {}
        dat = [];
        res.data.Jobs.forEach((element) => {
          element.name = element.company.name;
          element.type = 'Job';
          dat.push(element);
        });
        setjobData(dat);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
          if (error.response.status === 403) {
            window.alert(error.response.data['Error']);
          }
        }
      });
    instance
      .get('student/resumes/?approved=true')
      .then((res) => {
        console.log(res.data);
        setresumeData(res.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
          if (error.response.status === 403) {
            window.alert('Complete Your Profile');
            window.location = '/student-register';
          }
        }
      });
  }, []);

  function handelApply() {
    var form = new FormData();
    form.append('type', selcted.type);
    form.append('ad_id', selcted.id);
    form.append('resume', res);
    instance
      .post('/student/applied_offers/', form)
      .then((res) => {
        if (res.status === 200) {
          window.location = '/student-dashboard/offers';
        }
      })
      .catch(function (error) {
        if (error.response) {
          //setError(error.response.data['Error']);
        }
        //setLoading(false);
      });
  }
  function handelApply2() {
    var form = new FormData();
    console.log(selcted);
    form.append('type', selcted.type);
    form.append('ad_id', selcted.id);
    instance
      .post('/student/applied_offers/', form)
      .then((res) => {
        if (res.status === 200) {
          window.location = '/student-dashboard/offers';
        }
      })
      .catch(function (error) {
        if (error.response) {
          //setError(error.response.data['Error']);
        }
        //setLoading(false);
      });
  }
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {intern.length === 0 && job.length === 0 ? (
          <Grid item xs={12} sm={11}>
            <Paper className={classes.paper}>
              <React.Fragment>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  No Offers Available Currently
                </Typography>
              </React.Fragment>
            </Paper>{' '}
          </Grid>
        ) : (
          <div />
        )}

        {intern.length !== 0 ? (
          <Grid item xs={12} sm={11}>
            <Paper className={classes.paper}>
              <React.Fragment>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Intern Offers
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>S No.</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Job Designation</TableCell>
                      <TableCell>Expirees On</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {intern.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.designation}</TableCell>
                        <TableCell>{getDate(row.expiry)}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<VisibilityIcon />}
                            onClick={() => {
                              window.location =
                                '/student-dashboard/advertisement/' + row.id;
                            }}
                          >
                            View
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<SendIcon />}
                            onClick={(e) => {
                              setselcted(row);
                              if (row.allow_without_resume) {
                                handelApply2();
                              } else {
                                handleOpen();
                              }
                            }}
                          >
                            Apply
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </React.Fragment>
            </Paper>
          </Grid>
        ) : (
          <div></div>
        )}
        {job.length !== 0 ? (
          <Grid item xs={12} sm={11}>
            <Paper className={classes.paper}>
              <React.Fragment>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Job Offers
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>S No.</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Job Designation</TableCell>
                      <TableCell>Expirees On</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {job.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.designation}</TableCell>
                        <TableCell>{getDate(row.expiry)}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<VisibilityIcon />}
                            onClick={() => {
                              window.location =
                                '/student-dashboard/advertisement/' + row.id;
                            }}
                          >
                            View
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<SendIcon />}
                            onClick={(e) => {
                              setselcted(row);
                              if (row.allow_without_resume) {
                                handelApply2();
                              } else {
                                handleOpen();
                              }
                            }}
                          >
                            Apply
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </React.Fragment>
            </Paper>
          </Grid>
        ) : (
          <div></div>
        )}
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Grid container spacing={2} style={{ Top: '50%' }}>
          <Paper className={classes.papermodal}>
            <Typography
              component="h1"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Select Resume To Apply
            </Typography>
            <center>
              <Typography style={{ padding: '10px' }} gutterBottom>
                {selcted.designation} role offered by {selcted.name}
              </Typography>
              <Grid item xs={12} sm={6} style={{ margin: '30px' }}>
                <FormControl fullWidth>
                  <InputLabel>Resume *</InputLabel>
                  <Select
                    fullWidth
                    onChange={(e) => {
                      setres(e.target.value);
                    }}
                  >
                    {resume.map((row, index) => (
                      <MenuItem value={row.id}>{row.reference}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Button
                disabled={res === 'None'}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SendIcon />}
                onClick={handelApply}
              >
                Apply
              </Button>
            </center>
          </Paper>
        </Grid>
      </Modal>
    </React.Fragment>
  );
}

export default Offers;
