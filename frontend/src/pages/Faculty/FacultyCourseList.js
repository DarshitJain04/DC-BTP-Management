import React, { useState, useEffect } from 'react';
import instance from '../../api/axios';
import Loading from '../../components/Loading';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import Box from '@mui/material/Box';
import Navbar from '../../components/Navbar/Navbar';
import styles from '../../styles/pages/Faculty/FacultyCourseList.module.css';
import FacultyCourseDetails from '../../components/Faculty/FacultyCourseDetails';

const FacultyCourseList = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  const getCourses = () => {
    instance
      .get('projects/faculty_courses/')
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div style={{ height: 'auto', width: '100%' }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Container className={styles.courseContainer}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 1, sm: 2, md: 3 }}
                style={{ justifyContent: 'space-around' }}
              >
                {courses.map((course) => {
                  return <FacultyCourseDetails course={course} />;
                })}
              </Grid>
            </Box>
          </Container>
        </>
      )}
    </div>
  );
};

export default FacultyCourseList;
