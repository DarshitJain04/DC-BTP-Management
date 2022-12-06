import React, { useState, useEffect } from 'react';
import instance from '../../api/axios';
import Loading from '../Loading';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FadeInWhenVisible from '../Animation/FadeIn';
import FadeUpBigDataWhenVisible from '../Animation/FadeUpBigData';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    marginBottom: '2rem',
    [theme.breakpoints.down(460)]: {
      padding: 2,
    },
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(460)]: {
      paddingInline: 40,
    },
    width: 'auto',
    color: 'rgb(0,0,0)',
  },
  text_: {
    color: 'rgb(0,0,0)',
    fontsize: '1rem',
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

const Internships = () => {
  const classes = useStyles();
  const [loading, setLoding] = useState(true);
  const [text, settext] = useState([]);

  useEffect(() => {
    instance
      .get('main/navbar_suboptions/')
      .then((res) => {
        settext(
          res.data.filter((subOption) =>
            subOption.title.includes('Internships')
          )[0]
        );
      })
      .then(() => setLoding(false))
      .catch((error) => console.log(error));
  }, []);

  const createtext = () => {
    return { __html: text.description };
  };

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
                      class="fas fa-building"
                      style={{ margin: '0 1.2rem', padding: '0' }}
                    ></i>
                    Internships
                  </Paper>
                </FadeInWhenVisible>
              </Grid>
              <Grid item xs={12}>
                <FadeUpBigDataWhenVisible>
                  <Paper className={classes.paper}>
                    {text ? (
                      <p
                        dangerouslySetInnerHTML={createtext()}
                        className={classes.text_}
                      />
                    ) : (
                      <p>Coming soon...</p>
                    )}
                  </Paper>
                </FadeUpBigDataWhenVisible>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </div>
  );
};

export default Internships;
