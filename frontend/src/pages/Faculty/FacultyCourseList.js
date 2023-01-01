import React, { useState, useEffect } from 'react';
import instance from '../../api/axios';
import Loading from '../../components/Loading';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import Box from '@mui/material/Box';
import styles from '../../styles/pages/Faculty/FacultyCourseList.module.css';
import FacultyCourseDetails from '../../components/Faculty/FacultyCourseDetails';
import Footer from '../../components/Footer/Footer';

const FacultyCourseList = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    instance
      .get('projects/faculty_courses/')
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {loading ? (
        <Loading />
      ) : (
        <>
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
      <Footer />
    </div>
  );
};

export default FacultyCourseList;
