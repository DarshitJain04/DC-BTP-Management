/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import instance from '../../api/axios';
import Loading from '../../components/Loading';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import ProjectListCard from '../../components/Students/ProjectListCard';
import styles from '../../styles/pages/Students/ProjectsList.module.css';

const ProjectsList = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = (event) => {
    setSearchQuery(event.target.value);
    filterData(event.target.value);
  };

  const filterData = (value) => {
    if (value === '') {
      setFilteredData(projects);
    } else {
      setFilteredData(
        projects.filter((project) => {
          return (
            Object.keys(project).some((key) => {
              if (key === 'category') {
                return project[key]['category']
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase());
              } else if (key === 'faculty') {
                const branch = project[key]['program_branch']['name']
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase());

                const full_name = project[key]['user']['full_name']
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase());

                return branch || full_name;
              } else {
                return project[key]
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase());
              }
            })
          );
        })
      );
    }
  };

  useEffect(() => {
    instance
      .get('projects/available_projects/')
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
        setFilteredData(res.data);
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ height: 'auto', width: '100%' }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container maxWidth="lg">
            <div className={styles.searchbar}>
              <SearchIcon className={styles.searchInput} />
              <input
                type="text"
                placeholder="Search projects..."
                onChange={(event) => handleQueryChange(event)}
                value={searchQuery}
                className={styles.searchInput}
              />
            </div>
            <Grid
              container
              direction="row"
              spacing={5}
              style={{ width: '100%', margin: 'auto' }}
            >
              {filteredData.length === 0 ? <h1>No projects available</h1> : filteredData.map((project) => {
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
