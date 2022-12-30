/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../../styles/components/Faculty/ArchivedApplications.module.css';
import FacultyApplicationCard from './FacultyApplicationCard';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ArchivedApplications({ applications }) {
    const [open, setOpen] = React.useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleQueryChange = (event) => {
        setSearchQuery(event.target.value);
        filterData(event.target.value);
    };

    const filterData = (value) => {
        if (value === '') {
            setFilteredData(applications);
        } else {
            setFilteredData(
                applications.filter((application) => {
                    return Object.keys(application).some((key) => {
                        if (key === 'category') {
                            return application[key]['category']
                                .toString()
                                .toLowerCase()
                                .includes(value.toLowerCase());
                        } else if (key === 'application_type') {
                            return application[key]['application_type']
                                .toString()
                                .toLowerCase()
                                .includes(value.toLowerCase());
                        } else if (key === 'course_code') {
                            return application[key]['course_code']
                                .toString()
                                .toLowerCase()
                                .includes(value.toLowerCase());
                        } else if (key === 'student') {
                            const branch = application[key]['program_branch']['name']
                                .toString()
                                .toLowerCase()
                                .includes(value.toLowerCase());

                            const abbreviation = application[key]['program_branch'][
                                'abbreviation'
                            ]
                                .toString()
                                .toLowerCase()
                                .includes(value.toLowerCase());

                            const roll_number = application[key]['roll_number']
                                .toString()
                                .toLowerCase()
                                .includes(value.toLowerCase());

                            const full_name = application[key]['user']['full_name']
                                .toString()
                                .toLowerCase()
                                .includes(value.toLowerCase());

                            const email = application[key]['user']['email']
                                .toString()
                                .toLowerCase()
                                .includes(value.toLowerCase());

                            return (
                                branch || abbreviation || roll_number || full_name || email
                            );
                        } else {
                            return application[key]
                                .toString()
                                .toLowerCase()
                                .includes(value.toLowerCase());
                        }
                    });
                })
            );
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
        setSearchQuery('');
        setFilteredData(applications);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button className={styles.applicants} onClick={() => handleClickOpen()}>
                Archived: {applications.length}
            </button>
            <Dialog
                fullScreen
                open={open}
                onClose={() => handleClose()}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Withdrawn Applications
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg">
                    <Grid container spacing={2} className={styles.listHeader}>
                        <Grid item xs={12}>
                            <div className={styles.searchbar}>
                                <SearchIcon className={styles.searchInput} />
                                <input
                                    type="text"
                                    placeholder="Search applications..."
                                    onChange={(event) => handleQueryChange(event)}
                                    value={searchQuery}
                                    className={styles.searchInput}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        spacing={5}
                        style={{ width: '100%', margin: '0 auto 0 auto' }}
                    >
                        {filteredData.length === 0 ? (
                            <h1>No applications available</h1>
                        ) : (
                            filteredData.map((application) => {
                                return (
                                    <Grid
                                        key={application.id}
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={6}
                                    >
                                        <FacultyApplicationCard application={application} />
                                    </Grid>
                                );
                            })
                        )}
                    </Grid>
                </Container>
                {/* <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            spacing={5}
            style={{ width: '100%', margin: '4rem auto auto auto' }}
          >
            {applications?.map((application) => {
              return (
                <Grid key={project.id} item xs={12} sm={12} md={6} lg={6}>
                  <FacultyApplicationCard application={application} />
                </Grid>
              );
            })}
          </Grid>
        </Container> */}
            </Dialog>
        </div>
    );
}
