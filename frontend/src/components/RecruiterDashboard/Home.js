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
import Chip from '@material-ui/core/Chip';

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

function Home() {
  const classes = useStyles();
  const [intern, setinternData] = React.useState([]);
  const [job, setjobData] = React.useState([]);

  React.useEffect(() => {
    instance
      .get('company/get_company_ann/')
      .then((res) => {
        console.log(res.data);
        let dat = [];
        res.data.internship.forEach((element) => {
          element.count = element.active ? element.get_offers_count : '-';
          element.type = 'Intern';
          dat.push(element);
        });
        setinternData(dat);
        dat = [];
        res.data.job.forEach((element) => {
          element.count = element.active ? element.get_offers_count : '-';
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
  }, []);

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
                  No Announcements Added
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
                  Intern Announcements
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>S No.</TableCell>
                      <TableCell>Job Designation</TableCell>
                      <TableCell>Expirees On</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>No. of Students Registered</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {intern.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.designation}</TableCell>
                        <TableCell>
                          {row.active ? getDate(row.expiry) : '-'}
                        </TableCell>
                        <TableCell>
                          {row.active ? (
                            <Chip color="green" label="Active" />
                          ) : row.show_company ? (
                            <Chip color="red" label="Inactive" />
                          ) : (
                            <Chip label="In Review" />
                          )}
                        </TableCell>
                        <TableCell>
                          <center>{row.count}</center>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            disabled={!row.show_company}
                            className={classes.button}
                            endIcon={<VisibilityIcon />}
                            onClick={() => {
                              window.location =
                                '/recruiter-dashboard/advertisement/' + row.id;
                            }}
                          >
                            View
                          </Button>
                          <Button
                            variant="contained"
                            disabled={!row.active}
                            color="primary"
                            className={classes.button}
                            endIcon={<SendIcon />}
                            onClick={() => {
                              window.location =
                                '/recruiter-dashboard/student-list/' + row.id;
                            }}
                          >
                            View Students
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
                  Job Announcements
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>S No.</TableCell>
                      <TableCell>Job Designation</TableCell>
                      <TableCell>Expirees On</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>No. of Students Registered</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {job.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.designation}</TableCell>
                        <TableCell>
                          {row.active ? getDate(row.expiry) : '-'}
                        </TableCell>
                        <TableCell>
                          {row.active ? (
                            <Chip color="green" label="Active" />
                          ) : row.show_company ? (
                            <Chip color="red" label="Inactive" />
                          ) : (
                            <Chip label="In Review" />
                          )}
                        </TableCell>
                        <TableCell>
                          <center>{row.count}</center>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            disabled={!row.show_company}
                            className={classes.button}
                            endIcon={<VisibilityIcon />}
                            onClick={() => {
                              window.location =
                                '/recruiter-dashboard/advertisement/' + row.id;
                            }}
                          >
                            View
                          </Button>
                          <Button
                            variant="contained"
                            disabled={!row.active}
                            color="primary"
                            className={classes.button}
                            endIcon={<SendIcon />}
                            onClick={() => {
                              window.location =
                                '/recruiter-dashboard/student-list/' + row.id;
                            }}
                          >
                            View Students
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
    </React.Fragment>
  );
}

export default Home;
