import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import FeedbackIcon from '@material-ui/icons/Feedback';
import EventIcon from '@material-ui/icons/Event';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import InfoIcon from '@material-ui/icons/Info';

function Logout(event) {
  event.preventDefault();
  localStorage.setItem('cdc_LoggedIn', false);
  localStorage.setItem('cdc_auth_token', '');
  window.location = '/';
}

export const mainListItems = (
  <div>
    <a
      href="/student-dashboard/"
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
      href="/student-dashboard/profile"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </a>
    <a
      href="/student-dashboard/uploadresume"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon>
          <CloudUploadIcon />
        </ListItemIcon>
        <ListItemText primary="Upload Resume" />
      </ListItem>
    </a>
    <a
      href="/student-dashboard/offers"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon>
          <AllInboxIcon />
        </ListItemIcon>
        <ListItemText primary="Available Offers" />
      </ListItem>
    </a>
    <a
      href="/student-dashboard/suggestion_inquiry"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon>
          <FeedbackIcon />
        </ListItemIcon>
        <ListItemText primary="Suggestion or Inquiry" />
      </ListItem>
    </a>
  </div>
);

export const secondaryListItems = (
  <div>
    <a
      href="/student-dashboard/placement-calendar"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Placement Calendar" />
      </ListItem>
    </a>
    <a
      href="/student-dashboard/norms-guidelines"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon>
          <LocalLibraryIcon />
        </ListItemIcon>
        <ListItemText primary="Norms/Guidelines" />
      </ListItem>
    </a>
    <a
      href="/student-dashboard/info"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Internships" />
      </ListItem>
    </a>
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
