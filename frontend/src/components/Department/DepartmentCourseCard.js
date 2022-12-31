import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DepatmentCourseApplications from '../Department/DepartmentCourseApplications';
import styles from '../../styles/components/Department/DepartmentCourseCard.module.css';
import DepartmentCourseEdit from './DepartmentCourseEdit';

export default function DepartmentCourseCard({ course }) {
  return (
    <Card sx={{ display: 'flex', margin: '15px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {course.course_code}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Course advisor: {course.faculty.user.full_name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Email: {course.faculty.user.email}
          </Typography>
        </CardContent>
        <div className={styles.footer}>
          <div className={styles.projectActions}>
            <DepartmentCourseEdit course={course} />
          </div>
          <div className={styles.applications}>
            <DepatmentCourseApplications course={course} />
          </div>
        </div>
      </Box>
    </Card>
  );
}
