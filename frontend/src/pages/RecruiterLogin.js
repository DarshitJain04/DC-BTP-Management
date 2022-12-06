import React, { useState } from 'react';
import { useGoogleLogin } from 'react-google-login';
import GoogleButton from '../assets/google-icon.svg';
import styles from '../styles/pages/RecruiterLogin.module.css';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import instance from '../api/axios';
import backgroundImage from '../assets/loginback.jpg';
import Grid from '@material-ui/core/Grid';
import CancelIcon from '@material-ui/icons/Cancel';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const RecruiterLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [alert, setalert] = useState([]);
  const [show, setshow] = useState(true);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleCloseerror = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError('');
  };

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const body = { email: email, password: password };
    instance
      .post('login/', body)
      .then((res) => {
        //console.log(res.data);
        const { token, Dname } = res.data;
        localStorage.setItem('cdc_auth_token', token);
        localStorage.setItem('cdc_LoggedIn', true);
        localStorage.setItem('cdc_Dname', Dname);
        localStorage.setItem('cdc_loginType', 'Recruiter');
        window.location = 'recruiter-dashboard';
      })
      .catch(function (error) {
        if (error.response) {
          setError(error.response.data['Error']);
        }
        setLoading(false);
      });
  }

  const responseGoogle = (response) => {
    console.log(response);
  };

  const { sigIn } = useGoogleLogin({
    onSuccess: responseGoogle,
    onFailure: responseGoogle,
    clientId:
      '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com',
    isSignedIn: true,
    accessType: 'offline',
  });
  React.useEffect(() => {
    instance
      .get('main/alerts/')
      .then((res) => {
        setalert(res.data.CompanyLogin);
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
          onClose={handleCloseerror}
        >
          <Alert onClose={handleCloseerror} severity="error">
            {error}
          </Alert>
        </Snackbar>
        <h3 className={styles.heading}>Recruiter Login</h3>
        <div className={styles.form}>
          <input
            className={styles.Loginform}
            autoFocus
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            className={styles.Loginform}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <center className={styles.buttons} style={{ marginTop: '0.5rem' }}>
          <button
            size="lg"
            className={styles.registerButton}
            onClick={(e) => {
              e.preventDefault();
              window.location = 'recruiter-register';
            }}
          >
            Register
          </button>
          <button
            type="submit"
            size="lg"
            onClick={handleSubmit}
            disabled={!validateForm()}
            className={styles.loginButton}
          >
            Login
          </button>
          <hr />
          <p>OR</p>
          <div>
            <button onClick={sigIn} className={styles.googleSignIn}>
              <img
                src={GoogleButton}
                className={styles.googleButton}
                alt="Google sign-in"
              />
              Sign in with Google
            </button>
          </div>
        </center>
      </div>
    </div>
  );
};

export default RecruiterLogin;
