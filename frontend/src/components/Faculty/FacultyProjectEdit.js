import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@material-ui/core/Typography';
import styles from '../../styles/components/Faculty/FacultyProjectDescription.module.css';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FacultyProjectEdit() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        style={{
          margin: '8px',
        }}
        endIcon={<EditIcon />}
        onClick={handleOpen}
      >
        Edit
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => handleClose()}
        scroll="paper"
        aria-labelledby={'data.title'}
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id={'data.title1'}>
          <div className={styles.title}>{'data.title1'}</div>
          <div className={styles.faculty}>Faculty name and Branch</div>
        </DialogTitle>
        <DialogContent dividers="true">
          <Box component="form" autoComplete="off">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Project Name"
              variant="outlined"
              style={{
                marginBottom: '20px',
              }}
            />
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={5}
              defaultValue="Project Description"
              fullWidth
              style={{
                marginBottom: '20px',
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
