import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import cclab_iitj_logo from '../../assets/cclab_iitj_logo.png';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/Navbar/Navbar.module.css';

const drawerWidth = 240;

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        sx={{ my: 2 }}
        style={{ backgroundColor: '#3758f9', margin: '0px', padding: '15px' }}
      >
        <Link to="/">
          <img
            src={cclab_iitj_logo}
            alt="cclab_iitj_logo"
            width="130px"
            heigth="64px"
          />
        </Link>
      </Typography>
      <Divider />
      <List>
        <ListItem key="All Projects" disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} href="/faculty-projects">
            <ListItemText primary="All Projects" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Profile" disablePadding>
          <ListItemButton
            sx={{ textAlign: 'center' }}
            href="/faculty-dashboard/profile"
          >
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem key="My Courses" disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} href="/faculty-courses">
            <ListItemText primary="My Courses" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', marginBottom: '55px' }}>
      <AppBar component="nav" style={{ backgroundColor: '#3758f9' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link to="/">
              <img
                src={cclab_iitj_logo}
                alt="cclab_iitj_logo"
                width="100px"
                heigth="64px"
              />
            </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button
              key="My Profile"
              href="/faculty-dashboard/profile"
              className={styles.navOption}
            >
              My Profile
            </Button>
            <Button
              key="All Projects"
              href="/faculty-projects"
              className={styles.navOption}
            >
              All Projects
            </Button>
            <Button
              key="My Courses"
              href="/faculty-courses"
              className={styles.navOption}
            >
              My Courses
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Navbar;
