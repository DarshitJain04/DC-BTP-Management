import * as React from 'react';
import Card from '@mui/material/Card';
import instance from '../../api/axios';
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
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
// import FacultyProjectDescription from './FacultyProjectDescription';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const FacultyProjectListCard = ({ data }) => {
  const handleDelete = (project_id) => {
    instance
      .delete(`/projects/projects_floated/${project_id}`)
      .then((res) => {
        if (res.status === 200) {
          window.alert('Project deleted successfully');
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          window.alert(error);
          window.location.reload();
        }
      });
  };
  return (
    <FadeUpWhenVisible>
      <Paper elevation={3} className={styles.project}>
        <div className={styles.projectTitle}>{data.title}</div>
        <div className={styles.faculty}>{data.description}</div>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={6}>
            <Item>
              Status:{' '}
              {data.active ? (
                <span style={{ color: 'green' }}>Active</span>
              ) : (
                <span style={{ color: 'red' }}>Inactive</span>
              )}
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>Category: {data.category.category}</Item>
          </Grid>
        </Grid>
        <div className={styles.projectActions}>
          {/* <ProjectDetailsModal data={data} /> */}
          <FacultyProjectDescription data={data} />
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            style={{
              height: 'fit-content',
            }}
            endIcon={<DeleteIcon />}
            onClick={() => handleDelete(data.id)}
          >
            Delete
          </Button>
          <FacultyProjectEdit data={data} />
        </div>
      </Paper>
    </FadeUpWhenVisible>
  );
};

export default FacultyProjectListCard;
