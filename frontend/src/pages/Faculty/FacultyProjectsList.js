import React, { useState, useEffect } from 'react';
import instance from '../../api/axios';
import Loading from '../../components/Loading';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import FacultyProjectListCard from '../../components/Faculty/FacultyProjectListCard';
import Navbar from '../../components/Navbar/Navbar';

const FacultyProjectsList = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const getAvailableProjects = () => {
    instance
      .get('projects/projects_floated/')
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAvailableProjects();
  }, []);

  return (
    <div style={{ height: 'auto', width: '100%' }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Container maxWidth="lg">
            <Grid
              container
              direction="row"
              spacing={5}
              style={{ width: '100%', margin: 'auto' }}
            >
              {projects?.map((project) => {
                return (
                  <Grid key={project.id} item xs={12} sm={12} md={6} lg={6}>
                    <FacultyProjectListCard data={project} />
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </>
      )}
    </div>
  );
};

export default FacultyProjectsList;
