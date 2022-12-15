import React, { useState, useEffect } from 'react';
import instance from '../../api/axios';
import FacultyProjectDescription from './FacultyProjectDescription';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import FadeUpWhenVisible from '../Animation/FadeUp';
import FacultyProjectEdit from './FacultyProjectEdit';
import FacultyApplicationList from './FacultyApplicationList';
import styles from '../../styles/components/Faculty/FacultyProjectListCard.module.css';
import IconButton from '@mui/material/IconButton';

const FacultyProjectListCard = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    instance
      .get(`/projects/applications_project/${data.id}`)
      .then((res) => {
        setApplications(res.data);
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, []);

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
        <div className={styles.header}>
          <div className={styles.projectTitle}>{data.title}</div>
          <div className={styles.status}>
            {data.active ? (
              <span style={{ color: '#3DBE29', fontWeight: 'bold' }}>
                ACTIVE
              </span>
            ) : (
              <span style={{ color: '#ed5e68', fontWeight: 'bold' }}>
                INACTIVE
              </span>
            )}
          </div>
        </div>
        <div className={styles.faculty}>{data.category.category}</div>
        <div className={styles.footer}>
          <div className={styles.projectActions}>
            <IconButton onClick={() => handleDelete()}>
              <DeleteIcon />
            </IconButton>
            <FacultyProjectEdit data={data} />
            <FacultyProjectDescription data={data} />
          </div>
          <div className={styles.applications}>
            {/* <a
              href="/faculty-applications-list/"
              className={styles.applicationNo}
            >
              Applicants: {applications.length}
            </a> */}
            <FacultyApplicationList
              project={data}
              applications={applications}
            />
          </div>
        </div>
      </Paper>
    </FadeUpWhenVisible>
  );
};

export default FacultyProjectListCard;
