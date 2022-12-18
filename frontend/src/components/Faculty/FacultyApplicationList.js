import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import styles from '../../styles/components/Faculty/FacultyApplicationList.module.css';
import FacultyApplicationCard from './FacultyApplicationCard';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FacultyApplicationList({ project, applications }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className={styles.applicants} onClick={() => handleClickOpen()}>
        Applicants: {applications.length}
      </button>
      <Dialog
        fullScreen
        open={open}
        onClose={() => handleClose()}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Applications
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            spacing={5}
            style={{ width: '100%', margin: '4rem auto auto auto' }}
          >
            {applications?.map((application) => {
              return (
                <Grid key={project.id} item xs={12} sm={12} md={6} lg={6}>
                  <FacultyApplicationCard application={application} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
}
