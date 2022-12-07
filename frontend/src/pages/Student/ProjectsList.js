import React, { useState, useEffect } from 'react';
import instance from '../../api/axios';
import Loading from '../../components/Loading';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import ProjectListCard from '../../components/Students/ProjectListCard';

const ProjectsList = () => {
  const [loading, setLoding] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    instance
      .get('projects/available_projects/')
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
      })
      .then(() => setLoding(false))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ height: 'auto', width: '100%' }}>
      {loading ? (
        <Loading />
      ) : (
        <>
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
                    <ProjectListCard data={project} />
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

export default ProjectsList;
