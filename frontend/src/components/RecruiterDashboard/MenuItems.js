import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PostAddIcon from '@material-ui/icons/PostAdd';

function Logout(event) {
  event.preventDefault();
  localStorage.setItem('cdc_LoggedIn', false);
  localStorage.setItem('cdc_auth_token', '');
  window.location = '/';
}

export const mainListItems = (
  <div>
    <a
      href="/recruiter-dashboard/"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <ListItem>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </a>
    <a
      href="/recruiter-dashboard/profile/"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </a>
  </div>
);

export const secondaryListItems = (
  <div>
    <a
      href="/recruiter-dashboard/add-intern-advertisement"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon>
          <PostAddIcon />
        </ListItemIcon>
        <ListItemText primary="Intern Advertisment" />
      </ListItem>
    </a>
    <a
      href="/recruiter-dashboard/add-job-advertisement"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon>
          <PostAddIcon />
        </ListItemIcon>
        <ListItemText primary="Job Advertisment" />
      </ListItem>
    </a>
  </div>
);

export const thirdListItems = (
  <div>
    <a
      href="/"
      onClick={Logout}
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon>
          <PowerSettingsNewIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </a>
  </div>
);
