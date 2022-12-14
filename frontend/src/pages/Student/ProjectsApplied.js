/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import instance from '../../api/axios';
import Loading from '../../components/Loading';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import StudentProjectApplication from '../../components/Students/StudentProjectApplication';
import styles from '../../styles/pages/Students/ProjectsApplied.module.css';

const ProjectsApplied = () => {
	const [loading, setLoading] = useState(true);
	const [applications, setApplications] = useState([]);
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
					return (
						Object.keys(application).some((key) => {
							if (key === 'application_type') {
								return application[key]['application_type']
									.toString()
									.toLowerCase()
									.includes(value.toLowerCase());
							} else if (key === 'course_code') {
								const course_code = application[key]['course_code']
									.toString()
									.toLowerCase()
									.includes(value.toLowerCase());

								const course_name = application[key]['course_name']
									.toString()
									.toLowerCase()
									.includes(value.toLowerCase());

								return course_code || course_name;
							} else if (key === 'notes' || key === 'resume_link') {
								return application[key]
									.toString()
									.toLowerCase()
									.includes(value.toLowerCase());
							} else if (key === 'is_accepted') {
								console.log(application[key]);
								let target = '';
								if (application[key].toString().toLowerCase() === 'true') {
									target = 'accepted';
								} else {
									target = 'pending';
								}
								return target.includes(value.toLowerCase());
							} else if (key === 'project') {
								Object.keys(application[key]).some((projectKey) => {
									if (projectKey === 'category') {
										return application[key][projectKey]['category']
											.toString()
											.toLowerCase()
											.includes(value.toLowerCase());
									} else if (projectKey === 'faculty') {
										const branch = application[key][projectKey]['program_branch']['name']
											.toString()
											.toLowerCase()
											.includes(value.toLowerCase());

										const full_name = application[key][projectKey]['user']['full_name']
											.toString()
											.toLowerCase()
											.includes(value.toLowerCase());

										return branch || full_name;
									} else {
										return application[key][projectKey]
											.toString()
											.toLowerCase()
											.includes(value.toLowerCase());
									}
								});
							}
						})
					);
				})
			);
		}
	};

	useEffect(() => {
		instance
			.get('/projects/student_applications/')
			.then((res) => {
				console.log(res.data);
				setSearchQuery('');
				setApplications(res.data);
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
							{filteredData.length === 0 ? <h1>No projects applied</h1> : filteredData.map((application) => {
								return (
									<Grid key={application.id} item xs={12} sm={12} md={6} lg={6}>
										<StudentProjectApplication data={application} />
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

export default ProjectsApplied;
