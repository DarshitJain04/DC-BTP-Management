import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import instance from '../../api/axios';
import Loading from '../Loading';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FadeInWhenVisible from '../Animation/FadeIn';
import FadeUpBigDataWhenVisible from '../Animation/FadeUpBigData';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    marginBottom: '2rem',
    [theme.breakpoints.down(460)]: {
      padding: 15,
    },
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(460)]: {
      paddingInline: 40,
    },
    width: 'auto',
    fontSize: '1rem',
    color: 'black',
  },
  text: {
    color: 'rgb(0,0,0)',
    fontsize: '1rem',
    marginTop: '4%',
    marginBottom: '2%',
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

const localizer = momentLocalizer(moment);

function getDate(date) {
  date = new Date(date);
  return date.toDateString();
}

const createdes = (upcoming) => {
  return { __html: upcoming.description };
};

const PlacementCalendar = () => {
  const classes = useStyles();
  const [loading, setLoding] = useState(false);
  const [dialog, setdialog] = useState({});
  const [open, setopen] = useState(false);
  const [data, setdata] = useState([]);
  const [upcoming, setupcoming] = useState([]);

  const handleClickOpen = (event) => {
    setdialog(event);
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
    setdialog({});
  };

  useEffect(() => {
    instance
      .get('main/navbar_suboptions?search=Upcoming Companies')
      .then((res) => {
        setupcoming(res.data[0]);
      })
      .catch((error) => console.log(error));
    instance
      .get('main/placement_calendar/')
      .then((res) => {
        setdata(res.data);
      })
      .then(() => setLoding(false))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ height: 'auto', width: '100%' }}>
      {loading ? (
        <Loading />
      ) : (
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
                      class="fas fa-calendar-alt"
                      style={{ margin: '0 1.2rem', padding: '0' }}
                    ></i>
                    Placement Calendar
                  </Paper>
                </FadeInWhenVisible>
              </Grid>
              <Grid item xs={12}>
                <FadeUpBigDataWhenVisible>
                  <Paper className={classes.paper}>
                    <Calendar
                      localizer={localizer}
                      events={data}
                      startAccessor="start"
                      endAccessor="end"
                      style={{ height: 500 }}
                      onSelectEvent={(event, e) => handleClickOpen(event)}
                    />
                  </Paper>
                </FadeUpBigDataWhenVisible>
              </Grid>
              <Grid item xs={12}>
                <FadeUpBigDataWhenVisible>
                  <Paper className={classes.paper}>
                    <Typography
                      component="h5"
                      variant="h5"
                      style={{ fontSize: 25, textAlign: 'center' }}
                    >
                      Upcoming Companies
                    </Typography>
                    {upcoming ? (
                      <p
                        dangerouslySetInnerHTML={createdes(upcoming)}
                        className={classes.text}
                      />
                    ) : (
                      <p className={classes.text}>Coming soon...</p>
                    )}
                  </Paper>
                </FadeUpBigDataWhenVisible>
              </Grid>
            </Grid>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {dialog.title} ({getDate(dialog.start)} - {getDate(dialog.end)})
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {dialog.description}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </>
      )}
    </div>
  );
};

export default PlacementCalendar;
