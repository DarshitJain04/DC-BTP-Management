import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import FacultyProjectDescription from './FacultyProjectDescription';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import FadeUpWhenVisible from '../Animation/FadeUp';
import FacultyProjectEdit from './FacultyProjectEdit';
import styles from '../../styles/components/Faculty/FacultyProjectListCard.module.css';
// import FacultyProjectDescription from './FacultyProjectDescription';

const FacultyProjectListCard = ({ data }) => {
  return (
    <FadeUpWhenVisible>
      <Paper elevation={3} className={styles.project}>
        <div className={styles.projectTitle}>{data.title}</div>
        <div className={styles.faculty}>{data.category.category}</div>
        <div>
          <p>
            Status: <span style={{ color: 'green' }}>Active</span>
          </p>
          <p>No. of Applications: 10</p>
        </div>
        <div className={styles.projectActions}>
          {/* <ProjectDetailsModal data={data} /> */}
          <FacultyProjectDescription />
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            style={{
              height: 'fit-content',
            }}
            endIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <FacultyProjectEdit />
        </div>
      </Paper>
    </FadeUpWhenVisible>
  );
};

export default FacultyProjectListCard;
