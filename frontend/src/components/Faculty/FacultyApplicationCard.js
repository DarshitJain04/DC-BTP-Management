import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardHeader
        // className={styles.applicationHeader}
        title={application.student.user.full_name}
        // subheader={application.student.user.email}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Email: {application.student.user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Program: {application.student.program_branch.program}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Branch: {application.student.program_branch.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Application type: {application.application_type.application_type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status:{' '}
          {application.is_accepted ? (
            <span style={{ color: '#3DBE29', fontWeight: 'bold' }}>
              Approved
            </span>
          ) : (
            <span style={{ color: '#ed5e68', fontWeight: 'bold' }}>
              Not Approved
            </span>
          )}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <FacultyApplicationEdit data={application} />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Roll No.: {application.student.roll_number}
          </Typography>
          <Typography paragraph>CGPA: {application.student.cgpa}</Typography>
          <Typography paragraph>Year: {application.student.year}</Typography>
          <Typography paragraph>
            Course Code: {application.course_code.course_code}
          </Typography>
          <Typography paragraph>Resume: {application.resume_link}</Typography>
          <Typography paragraph>
            {application.student.skills &&
            application.student.skills.length > 0 ? (
              <>
                <div className={styles.skills}>Skills</div>
                <Stack direction="row" className={styles.skillsChips}>
                  {application.student.skills?.split(',').map((skill) => {
                    return <Chip className={styles.skill} label={skill} />;
                  })}
                </Stack>
              </>
            ) : null}
          </Typography>
          <Typography paragraph>
            {application.student.courses &&
            application.student.courses.length > 0 ? (
              <>
                <div className={styles.courses}>Courses</div>
                <Stack direction="row" className={styles.coursesChips}>
                  {application.student.courses?.split(',').map((course) => {
                    return <Chip className={styles.course} label={course} />;
                  })}
                </Stack>
              </>
            ) : null}
          </Typography>
          <Typography paragraph>Notes:</Typography>
          <Typography paragraph>{application.notes}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
