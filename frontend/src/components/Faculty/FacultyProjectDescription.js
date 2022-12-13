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

export default function FacultyProjectDescription({ data }) {
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
        <DialogTitle id={data.id}>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.faculty}>
            <span>{data.category.category}</span>{' '}
            <span>
              {' '}
              Status:{' '}
              {data.active ? (
                <span style={{ color: 'green' }}>Active</span>
              ) : (
                <span style={{ color: 'red' }}>Inactive</span>
              )}
            </span>
          </div>
        </DialogTitle>
        <DialogContent dividers="true">
          <div className={styles.description}>Description</div>
          <Typography gutterBottom className={styles.descriptionContent}>
            {data.description}
          </Typography>
          <div className={styles.deliverables}>Deliverables</div>
          <Typography gutterBottom className={styles.deliverablesContent}>
            {data.deliverables}
          </Typography>
          <div className={styles.deliverables}>Skills</div>
          <Stack direction="row" className={styles.skillsChips}>
            {data.skills?.split(',').map((s) => {
              return <Chip className={styles.skill} label={s} />;
            })}
          </Stack>
          <div className={styles.courses}>Courses</div>
          <Stack direction="row" className={styles.skillsChips}>
            {data.courses?.split(',').map((c) => {
              return <Chip className={styles.skill} label={c} />;
            })}
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
}
