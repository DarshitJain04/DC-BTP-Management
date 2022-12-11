import React from 'react';
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
      <Link color="inherit">Indian Institute of Technology, Jodhpur</Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer(props) {
  return (
    <>
      <Container style={{ background: '#f6f9ff', padding: '20px 0' }}>
        <Typography
          component={'span'}
          variant="h6"
          align="center"
          gutterBottom
        ></Typography>
        <Typography
          variant="subtitle1"
          align="center"
          style={{ color: '#012970' }}
          component="p"
        >
          Designed & Maintained by Sahil & Darshit
        </Typography>
        <Copyright />
      </Container>
    </>
  );
}
