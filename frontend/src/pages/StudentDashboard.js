import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Home from '../components/StudentDashboard/Home';
import UploadResume from '../components/StudentDashboard/UplaodResume';
import Offers from '../components/StudentDashboard/Offers';
import SuggestionInquiry from '../components/StudentDashboard/SuggestionInquiry';
import Profile from '../components/StudentDashboard/Profile';
import Grid from '@material-ui/core/Grid';
import CancelIcon from '@material-ui/icons/Cancel';
import instance from '../api/axios';
import {
  mainListItems,
  secondaryListItems,
} from '../components/StudentDashboard/MenuItems';
import ViewAdvertisement from '../components/StudentDashboard/ViewAdvertisement';
import NormsForm from '../components/RegistrationForms/NormsForm';
import PlacementCalendar from '../components/StudentDashboard/PlacementCalendar';
import Internships from '../components/StudentDashboard/Internships';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: '#f0f0f0',
    color: '#000',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    minHeight: '100vh',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [alert, setalert] = useState([]);
  const [show, setshow] = useState(true);
  const handleDrawerClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    instance
      .get('main/alerts/')
      .then((res) => {
        setalert(res.data.StudentDashboard);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={classes.root}>
      {show && alert.length !== 0 ? (
        <Grid container style={{ padding: '10px 10%', background: alert[1] }}>
          <CancelIcon onClick={() => setshow(false)} />
          <div style={{ margin: 'auto' }}>{alert[0]}</div>
        </Grid>
      ) : (
        <div />
      )}
      <CssBaseline />
      <Drawer
        variant={window.innerWidth >= 1350 ? 'permanent' : 'temporary'}
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton
            onClick={handleDrawerClose}
            onMouseEnter={handleDrawerClose}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Router>
            <Switch>
              <Route path="/student-dashboard/" exact component={Home} />
              <Route
                path="/student-dashboard/profile"
                exact
                component={Profile}
              />
              <Route
                path="/student-dashboard/UploadResume"
                exact
                component={UploadResume}
              />
              <Route
                path="/student-dashboard/offers"
                exact
                component={Offers}
              />
              <Route
                path="/student-dashboard/suggestion_inquiry"
                exact
                component={SuggestionInquiry}
              />
              <Route
                path="/student-dashboard/advertisement/:id"
                exact
                component={ViewAdvertisement}
              />
              <Route
                path="/student-dashboard/norms-guidelines"
                exact
                component={NormsForm}
              />
              <Route
                path="/student-dashboard/placement-calendar"
                exact
                component={PlacementCalendar}
              />
              <Route
                path="/student-dashboard/info"
                exact
                component={Internships}
              />
            </Switch>
          </Router>
        </Container>
      </main>
    </div>
  );
}
