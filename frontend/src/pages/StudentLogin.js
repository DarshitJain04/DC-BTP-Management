import React, { useState } from 'react';
import instance from '../api/axios';
import styles from '../styles/pages/StudentLogin.module.css';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import backgroundImage from '../assets/loginback.jpg';
import Grid from '@material-ui/core/Grid';
import CancelIcon from '@material-ui/icons/Cancel';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [alert, setalert] = useState([]);
  const [show, setshow] = useState(true);

  const clearForm = () => {
    setError('');
    setEmail('');
    setPassword('');
  };

  function validateForm() {
    return (
      email.length > 0 &&
      email.match('(^[a-z]+).([0-9]+)') &&
      password.length > 0
    );
  }

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const body = { id: email, password: password };
    instance
      .post('LDAP_login/', body)
      .then((res) => {
        const { token, Dname } = res.data;
        localStorage.setItem('cdc_auth_token', token);
        localStorage.setItem('cdc_LoggedIn', true);
        localStorage.setItem('cdc_Dname', Dname);
        localStorage.setItem('cdc_loginType', 'Student');
        if (res.status === 201) {
          window.location = 'student-register';
        } else {
          window.location = 'student-dashboard';
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 400) {
            setError(error.response.data['Error']);
          } else {
            setError(error.response.status + ': LDAP Server Down Try Later');
          }
        }
        setLoading(false);
      });
  };
  React.useEffect(() => {
    instance
      .get('main/alerts/')
      .then((res) => {
        setalert(res.data.StudentLogin);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div
      style={{
        background: `url(${backgroundImage}) no-repeat fixed`,
        backgroundSize: 'cover',
        backgroundPosition: '50%',
        padding: '3%',
        justifyContent: 'center',
      }}
    >
      {show && alert.length !== 0 ? (
        <Grid container style={{ padding: '10px 10%', background: alert[1] }}>
          <CancelIcon onClick={() => setshow(false)} />
          <div style={{ margin: 'auto' }}>{alert[0]}</div>
        </Grid>
      ) : (
        <div />
      )}
      <div className={styles.background}>
        <div className={styles.Login}>
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
            onClose={handleCloseError}
          >
            <Alert onClose={handleCloseError} severity="error">
              {error}
            </Alert>
          </Snackbar>
          <h3 className={styles.heading}>Student Login</h3>
          <div className={styles.form}>
            <input
              className={styles.Loginform}
              autoFocus
              placeholder="Enter LDAP ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Enter LDAP Password"
              className={styles.Loginform}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <center style={{ marginTop: '0.5rem' }}>
            <button
              size="lg"
              onClick={clearForm}
              className={styles.clearButton}
            >
              Clear
            </button>
            <button
              size="lg"
              type="submit"
              disabled={!validateForm()}
              onClick={handleSubmit}
              className={styles.loginButton}
            >
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
