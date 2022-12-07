import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import styles from '../../styles/components/Students/ProjectDetailsModal.module.css';

// const styles = (theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const ProjectDetailsModal = ({ data }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createText = (text) => {
    return { __html: text };
  };

  return (
    <div>
      <button className={styles.projectDetails} onClick={handleClickOpen}>
        Details
      </button>
      <Dialog
        key={data.title}
        onClose={handleClose}
        aria-labelledby={data.title}
        open={open}
      >
        <MuiDialogTitle disableTypography className={styles.root}>
          <Typography id={data.title} variant="h6">
            {data.title}
          </Typography>
          {handleClose ? (
            <IconButton
              aria-label="close"
              className={styles.closeButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </MuiDialogTitle>
        <DialogContent dividers>
          <Typography
            gutterBottom
            dangerouslySetInnerHTML={createText(data.description)}
          ></Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetailsModal;
