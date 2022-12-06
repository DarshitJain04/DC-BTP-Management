import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import instance from '../../api/axios';
import Loading from '../Loading';
import Link from '@material-ui/core/Link';
import FadeInWhenVisible from '../Animation/FadeIn';
import FadeUpBigDataWhenVisible from '../Animation/FadeUpBigData';

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
}));

const Profile = () => {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(true);
  const [values, setValues] = React.useState({
    name: '',
    domain: '',
    email: '',
    contact: '',
    url: '',
    city: '',
    state: '',
    pin_code: '',
    country: '',
  });

  React.useEffect(() => {
    instance
      .get('company/details/')
      .then((res) => {
        let data = res.data[0];
        // console.log(data);
        setValues({
          name: data.name,
          domain: data.domain,
          email: data.user.email,
          contact: data.contact,
          url: data.url,
          city: data.city,
          state: data.state,
          pin_code: data.pin_code,
          country: data.country,
        });
      })
      .catch((error) => console.log(error));
    setLoading(false);
  }, []);
  const preventDefault = (event) => event.preventDefault();

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <main className={classes.layout}>
          <FadeUpBigDataWhenVisible>
            <Paper className={classes.paper}>
              <Typography
                component="h3"
                variant="h5"
                align="center"
                style={{ paddingBottom: '7%' }}
              >
                Company Profile
              </Typography>
              <FadeInWhenVisible>
                <Grid item xs={12} sm={8}>
                  <Typography align="left" style={{ paddingBottom: '4%' }}>
                    Company : {values.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography align="left" style={{ paddingBottom: '4%' }}>
                    Domain : {values.domain}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography align="left" style={{ paddingBottom: '4%' }}>
                    Email : {values.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography align="left" style={{ paddingBottom: '4%' }}>
                    Contact : {values.contact}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography align="left" style={{ paddingBottom: '4%' }}>
                    URL :{' '}
                    <Link
                      href={values.url}
                      onClick={preventDefault}
                      color="inherit"
                    >
                      {values.name}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography align="left" style={{ paddingBottom: '4%' }}>
                    City : {values.city}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography align="left" style={{ paddingBottom: '4%' }}>
                    State : {values.state}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography align="left" style={{ paddingBottom: '4%' }}>
                    Pincode : {values.pin_code}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography align="left" style={{ paddingBottom: '4%' }}>
                    Country : {values.country === '0' ? 'India' : 'other'}
                  </Typography>
                </Grid>
              </FadeInWhenVisible>
            </Paper>
          </FadeUpBigDataWhenVisible>
        </main>
      )}
    </React.Fragment>
  );
};

export default Profile;
