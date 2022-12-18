/* eslint-disable prettier/prettier */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FacultyApplicationEdit from './FacultyApplicationEdit.js';
import styles from '../../styles/components/Faculty/FacultyApplicationCard.module.css';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function FacultyApplicationCard({ application }) {
  console.log(application);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card class={styles.studentApplications}>
      <div className={styles.header}>
        <div className={styles.studentName}>{application.student.user.full_name} ({application.student.roll_number})</div>
        <div className={styles.applicationActions}>
          <FacultyApplicationEdit className={styles.editApplication} data={application} />
          <IconButton
            className={styles.email}
            href={`mailto:${application.student.user.email}`}
          >
            <EmailIcon />
          </IconButton>
        </div>
      </div>
      <div className={styles.department}>{application.student.program_branch.program} {application.student.program_branch.name}</div>
      <div className={styles.basicProfileDetails}>
        Year: <span style={{ color: '#848484', fontWeight: '550' }}>
          {application.student.year}{' '}
        </span>
        <span style={{ marginLeft: '1rem' }}>
          CGPA: <span style={{ color: '#848484', fontWeight: '550' }}>
            {application.student.cgpa}{' '}
          </span>
        </span>
      </div>
      <CardActions className={styles.expandCard}>
        {application.is_accepted ? (
          <span>
            Status: {' '}
            <span style={{ color: '#3DBE29', fontWeight: 'bold' }}>
              Approved
            </span>
          </span>
        ) : (
          <span>
            Status: {' '}
            <span style={{ color: '#ed5e68', fontWeight: 'bold' }}>
              Not Approved
            </span>
          </span>
        )}
        <ExpandMore
          expand={expanded}
          onClick={() => handleExpandClick()}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={styles.cardContent}>
          <div className={styles.courseCode}>Course Code</div>
          <Typography gutterBottom className={styles.courseCodeContent}>{`${application.course_code.course_code} ${application.course_code.course_name}`}</Typography>
          <div className={styles.applicationType}>Application Type</div>
          <Typography gutterBottom className={styles.applicationTypeContent}>{application.application_type.application_type}</Typography>
          <div className={styles.resume}>Resume</div>
          <Typography gutterBottom className={styles.resumeContent}>{application.resume_link === '' ? '-' : <a href={application.resume_link}>Link</a>}</Typography>
          <div className={styles.notes}>Notes</div>
          <Typography paragraph className={styles.notesContent}>{application.notes === '' ? '-' : application.notes}</Typography>
          {application.student.skills && application.student.skills.length > 0 ? (
            <>
              <div className={styles.skills}>Skills</div>
              <Stack direction="row" className={styles.skillsChips}>
                {application.student.skills?.split(',').map((skill) => {
                  return <Chip className={styles.skill} label={skill} />;
                })}
              </Stack>
            </>
          ) : null}
          {application.student.courses && application.student.courses.length > 0 ? (
            <>
              <div className={styles.courses}>Courses</div>
              <Stack direction="row" className={styles.coursesChips}>
                {application.student.courses?.split(',').map((course) => {
                  return <Chip className={styles.course} label={course} />;
                })}
              </Stack>
            </>
          ) : null}
        </CardContent>
      </Collapse>
    </Card>
  );
}
