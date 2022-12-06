import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
function Copyright() {
  return (
    <Typography variant="body2" style={{ color: '#012970' }} align="center">
      {'Copyright © '}
      <Link color="inherit">CDC, IITJ</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: 'white',
    background:
      'url(https://www.linkpicture.com/q/hero-bg_1.png) top center no-repeat',
    color: '#012970',
    padding: theme.spacing(3, 0),
  },
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <>
      <Container style={{ background: '#f6f9ff', padding: '20px 0' }}>
        <Typography component={'span'} variant="h6" align="center" gutterBottom>
          <div>
            <Tooltip arrow title="facebook">
              <IconButton
                href="https://www.facebook.com/SPC.IITJ/"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                style={{ color: '#012970' }}
              >
                <FacebookIcon />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Linkedin">
              <IconButton
                href="https://in.linkedin.com/in/career-development-cell-iit-jodhpur-62a31352"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#012970' }}
                variant="outlined"
              >
                <LinkedInIcon style={{ color: '#012970' }} />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="GitHub">
              <IconButton
                href="https://github.com/devlup-labs/cdc-portal"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                style={{ color: '#012970' }}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          style={{ color: '#012970' }}
          component="p"
        >
          Designed & Maintained by Career Development Cell, IIT Jodhpur
        </Typography>
        <Copyright />
      </Container>
    </>
  );
}
