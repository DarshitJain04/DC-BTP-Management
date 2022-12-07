import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import styles from '../../styles/components/Students/ProjectDetailsModal.module.css';

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
        fullWidth
        maxWidth="sm"
        key={data.title}
        onClose={handleClose}
        aria-labelledby={data.title}
        open={open}
      >
        <div className={styles.modal}>
          <div className={styles.header}>
            <div className={styles.title}>{data.title}</div>
            <div className={styles.faculty}>
              {`${data.faculty.user.first_name} ${data.faculty.user.last_name} (${data.faculty.program_branch.name})`}
            </div>
            <div className={styles.closeButton}>
              {handleClose ? (
                <IconButton aria-label="close" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              ) : null}
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.description}>Description</div>
            <Typography
              gutterBottom
              dangerouslySetInnerHTML={createText(data.description)}
              className={styles.descriptionContent}
            ></Typography>
            <div className={styles.deliverables}>Deliverables</div>
            <Typography
              gutterBottom
              dangerouslySetInnerHTML={createText(data.deliverables)}
              className={styles.deliverablesContent}
            ></Typography>
            {data.skills && data.skills.length > 0 ? (
              <div className={styles.skills}>Skills</div>
            ) : null}
            <Stack direction="row" className={styles.skillsChips}>
              {data.skills && data.skills.length > 0
                ? data.skills.map((skill) => {
                    return (
                      <Chip className={styles.skill} label={skill.skill} />
                    );
                  })
                : null}
            </Stack>
            {data.courses && data.courses.length > 0 ? (
              <div className={styles.courses}>Courses</div>
            ) : null}
            <Stack direction="row" className={styles.coursesChips}>
              {data.courses && data.courses.length > 0
                ? data.courses.map((course) => {
                    return (
                      <Chip className={styles.course} label={course.course} />
                    );
                  })
                : null}
            </Stack>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProjectDetailsModal;
