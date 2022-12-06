import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import instance from '../../api/axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SuggestionInquiryForm from './SuggestionInquiryForm';

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

const SuggestionInquiry = () => {
  const classes = useStyles();
  const [values1, setValues1] = React.useState({
    category: '',
    sendto: '',
    subject: '',
    text: '',
  });

  const handleSubmit = () => {
    var form = new FormData();
    form.append('category', values1.category);
    form.append('sendto', values1.sendto);
    form.append('subject', values1.subject);
    form.append('text', values1.text);
    instance
      .post('/student/suggestion_inquiry/', form)
      .then((res) => {
        if (res.status === 200) {
          window.alert('submitted successfully');
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            component="h3"
            variant="h5"
            align="center"
            style={{ paddingBottom: '7%' }}
          >
            Suggestion/Inquiry
          </Typography>
          <React.Fragment>
            <SuggestionInquiryForm p1={values1} p2={setValues1} />
            <Button
              disabled={
                values1.sendto === '' ||
                values1.category === '' ||
                values1.subject === '' ||
                values1.text === ''
                  ? true
                  : false
              }
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.button}
            >
              Submit
            </Button>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default SuggestionInquiry;
