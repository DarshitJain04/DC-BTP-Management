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

export default function FacultyProjectDescription() {
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
        endIcon={<VisibilityIcon />}
        onClick={handleOpen}
      >
        View
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
          <div className={styles.description}>Description</div>
          <Typography gutterBottom className={styles.descriptionContent}>
            Description Text
          </Typography>
          <div className={styles.deliverables}>Deliverables</div>
          <Typography gutterBottom className={styles.deliverablesContent}>
            Deliverables Text
          </Typography>
          <Stack direction="row" className={styles.skillsChips}>
            <Chip className={styles.skill} label={'skill.skill1'} />
            <Chip className={styles.skill} label={'skill.skill2'} />
            <Chip className={styles.skill} label={'skill.skill3'} />
          </Stack>
          <div className={styles.courses}>Courses</div>
          <Stack direction="row" className={styles.coursesChips}>
            <Chip className={styles.course} label={'course.course1'} />
            <Chip className={styles.course} label={'course.course2'} />
            <Chip className={styles.course} label={'course.course3'} />
            <Chip className={styles.course} label={'course.course4'} />
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
}
