import React, { useState, useEffect } from 'react';
import instance from '../../api/axios';
import Loading from '../../components/Loading';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import FacultyProjectListCard from '../../components/Faculty/FacultyProjectListCard';
import Navbar from '../../components/Navbar/Navbar';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../../styles/pages/Faculty/FacultyProjectsList.module.css';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FacultyProjectCreate from '../../components/Faculty/FacultyProjectCreate.js';

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
            <Grid container spacing={2} className={styles.listHeader}>
              <Grid item xs={10}>
                <div className={styles.searchbar}>
                  <SearchIcon className={styles.searchInput} />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    // onChange={(event) => handleQueryChange(event)}
                    // value={searchQuery}
                    className={styles.searchInput}
                  />
                </div>
              </Grid>
              <Grid item xs={2}>
                <FacultyProjectCreate />
              </Grid>
            </Grid>
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
