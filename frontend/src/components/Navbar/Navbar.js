/* eslint-disable prettier/prettier */
// import React, { useState } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import cclab_iitj_logo from '../../assets/cclab_iitj_logo.png';
// import { Link } from 'react-router-dom';
// import styles from '../../styles/components/Navbar/Navbar.module.css';

// const drawerWidth = 240;

// const Navbar = (props) => {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawer = (
//     <Box onClick={() => handleDrawerToggle()} sx={{ textAlign: 'center' }}>
//       <Typography
//         variant="h6"
//         sx={{ my: 2 }}
//         style={{ backgroundColor: '#3758f9', margin: '0px', padding: '15px' }}
//       >
//         <Link to="/">
//           <img
//             src={cclab_iitj_logo}
//             alt="cclab_iitj_logo"
//             width="130px"
//             heigth="64px"
//           />
//         </Link>
//       </Typography>
//       <Divider />
//       <List>
//         <ListItem key="All Projects" disablePadding>
//           <ListItemButton sx={{ textAlign: 'center' }} href="/faculty-projects">
//             <ListItemText primary="All Projects" />
//           </ListItemButton>
//         </ListItem>
//         <ListItem key="Profile" disablePadding>
//           <ListItemButton
//             sx={{ textAlign: 'center' }}
//             href="/faculty-dashboard/profile"
//           >
//             <ListItemText primary="Profile" />
//           </ListItemButton>
//         </ListItem>
//         <ListItem key="My Courses" disablePadding>
//           <ListItemButton sx={{ textAlign: 'center' }} href="/faculty-courses">
//             <ListItemText primary="My Courses" />
//           </ListItemButton>
//         </ListItem>
//         <ListItem key="Department Courses" disablePadding>
//           <ListItemButton
//             sx={{ textAlign: 'center' }}
//             href="/department-courses"
//           >
//             <ListItemText primary="Department Courses" />
//           </ListItemButton>
//         </ListItem>
//       </List>
//     </Box>
//   );

//   const container =
//     window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: 'flex', marginBottom: '55px' }}>
//       <AppBar component="nav" style={{ backgroundColor: '#3758f9' }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
//           >
//             <Link to="/">
//               <img
//                 src={cclab_iitj_logo}
//                 alt="cclab_iitj_logo"
//                 width="100px"
//                 heigth="64px"
//               />
//             </Link>
//           </Typography>
//           <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//             <Button
//               key="My Profile"
//               href="/faculty-dashboard/profile"
//               className={styles.navOption}
//             >
//               My Profile
//             </Button>
//             <Button
//               key="All Projects"
//               href="/faculty-projects"
//               className={styles.navOption}
//             >
//               All Projects
//             </Button>
//             <Button
//               key="My Courses"
//               href="/faculty-courses"
//               className={styles.navOption}
//             >
//               My Courses
//             </Button>
//             <Button
//               key="My Courses"
//               href="/department-courses"
//               className={styles.navOption}
//             >
//               Department Courses
//             </Button>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Box component="nav">
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': {
//               boxSizing: 'border-box',
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//     </Box>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import instance from '../../api/axios';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Grid from '@material-ui/core/Grid';
import cclab_iitj_logo from '../../assets/cclab_iitj_logo.png';

const Navbar = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleLogout = (event) => {
    event.preventDefault();
    setLoading(true);
    instance
      .post('logout/blacklist/', {
        refresh: localStorage.getItem('btp_dc_portal_refreshToken'),
      })
      .then((res) => {
        instance.defaults.headers['Authorization'] = null;
        localStorage.setItem('btp_dc_portal_loggedIn', false);
        localStorage.removeItem('btp_dc_portal_refreshToken');
        localStorage.removeItem('btp_dc_portal_accessToken');
        localStorage.removeItem('btp_dc_portal_username');
        localStorage.removeItem('btp_dc_portal_email');
        localStorage.removeItem('btp_dc_portal_role');
        window.location = '/';
      })
      .then(() => setLoading(false))
      .catch(function (error) {
        if (error.response) {
          setError(error.response.data['Error']);
        }
        setLoading(false);
      });
  };

  return (
    <Grid container>
      <div className="wrapper">
        <nav>
          <input
            onChange={(event) => setIsChecked(event.currentTarget.checked)}
            checked={isChecked}
            type="checkbox"
            id="show-menu"
          />
          <label htmlFor="show-menu" className="menu-icon">
            <i className="fas fa-bars"></i>
          </label>
          <div className="content">
            <div className="logo">
              {localStorage.getItem('btp_dc_portal_loggedIn') === 'true' ? (
                localStorage.getItem('btp_dc_portal_role') === 'student' ? (
                  <Link to="/student-projects">
                    <img
                      src={cclab_iitj_logo}
                      alt="logo"
                      width="69px"
                      heigth="64px"
                    />
                  </Link>
                ) : localStorage.getItem('btp_dc_portal_role') === 'faculty' ? (
                  <Link to="/faculty-projects">
                    <img
                      src={cclab_iitj_logo}
                      alt="logo"
                      width="69px"
                      heigth="64px"
                    />
                  </Link>
                ) : (
                  <Link to="/department-courses">
                    <img
                      src={cclab_iitj_logo}
                      alt="logo"
                      width="69px"
                      heigth="64px"
                    />
                  </Link>
                )
              ) : (
                <Link to="/">
                  <img
                    src={cclab_iitj_logo}
                    alt="logo"
                    width="69px"
                    heigth="64px"
                  />
                </Link>
              )}
            </div>
            {localStorage.getItem('btp_dc_portal_loggedIn') === 'true' ? (
              <ul className="links">
                <li className="FAQ">
                  <Link to="#" className="desktop-link">
                    FAQ <i className="fa fa-caret-down"></i>
                  </Link>
                  <input type="checkbox" id="show-cdc-team" />
                  <label htmlFor="show-cdc-team">
                    FAQ <i className="fa fa-caret-down"></i>
                  </label>
                  <ul>
                    <li onClick={() => setIsChecked(!isChecked)}>
                      <Link to="/">Grading</Link>
                    </li>
                    <li onClick={() => setIsChecked(!isChecked)}>
                      <Link to="/">Category Details</Link>
                    </li>
                  </ul>
                </li>
                {localStorage.getItem('btp_dc_portal_role') ===
                  'department' ? null : (
                  <li className="Projects">
                    <Link to="#" className="desktop-link">
                      Projects <i className="fa fa-caret-down"></i>
                    </Link>
                    <input type="checkbox" id="show-cdc-team" />
                    <label htmlFor="show-cdc-team">
                      Projects <i className="fa fa-caret-down"></i>
                    </label>
                    <ul>
                      {localStorage.getItem('btp_dc_portal_role') ===
                        'student' ? (
                        <>
                          <li onClick={() => setIsChecked(!isChecked)}>
                            <Link to="/student-projects">Available</Link>
                          </li>
                          <li onClick={() => setIsChecked(!isChecked)}>
                            <Link to="/student-projects-applied">Applied</Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li onClick={() => setIsChecked(!isChecked)}>
                            <Link to="/faculty-projects">Floated</Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </li>
                )}
                {localStorage.getItem('btp_dc_portal_role') ===
                  'faculty' ? (
                  <li className="Courses">
                    <Link to="#" className="desktop-link">
                      Courses <i className="fa fa-caret-down"></i>
                    </Link>
                    <input type="checkbox" id="show-cdc-team" />
                    <label htmlFor="show-cdc-team">
                      Courses <i className="fa fa-caret-down"></i>
                    </label>
                    <ul>
                      <li onClick={() => setIsChecked(!isChecked)}>
                        <Link to="/faculty-courses">Courses</Link>
                      </li>
                    </ul>
                  </li>
                ) : null}
                {localStorage.getItem('btp_dc_portal_role') === 'student' ? (
                  <li className="Applications">
                    <Link to="#" className="desktop-link">
                      Applications <i className="fa fa-caret-down"></i>
                    </Link>
                    <input type="checkbox" id="show-cdc-team" />
                    <label htmlFor="show-cdc-team">
                      Applications <i className="fa fa-caret-down"></i>
                    </label>
                    <ul>
                      <li onClick={() => setIsChecked(!isChecked)}>
                        <Link to="/student-projects-applied">Active</Link>
                      </li>
                      <li onClick={() => setIsChecked(!isChecked)}>
                        <Link to="/student-archived-applications">
                          Archived
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : null}
                <li>
                  <Link
                    className="desktop-link"
                    to={
                      localStorage.getItem('btp_dc_portal_role') === 'student'
                        ? '/student-projects'
                        : localStorage.getItem('btp_dc_portal_role') ===
                          'faculty'
                          ? '/faculty-projects'
                          : '/department-courses'
                    }
                  >
                    <span>
                      {localStorage.getItem('btp_dc_portal_username')}{' '}
                      <i className="fa fa-caret-down"></i>
                    </span>
                  </Link>
                  <input type="checkbox" id="show-login" />
                  <label htmlFor="show-login">
                    {localStorage.getItem('btp_dc_portal_username')}{' '}
                    <i className="fa fa-caret-down"></i>
                  </label>
                  <ul>
                    {localStorage.getItem('btp_dc_portal_role') ===
                      'department' ? null : (
                      <li onClick={() => setIsChecked(!isChecked)}>
                        <a href="/">Profile</a>
                      </li>
                    )}
                    <li onClick={(event) => handleLogout(event)}>
                      <Link to="#">Logout</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : null}
          </div>
        </nav>
      </div>
    </Grid>
  );
};

export default Navbar;
