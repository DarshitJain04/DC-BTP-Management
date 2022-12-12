/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import instance from '../../api/axios';
import Loading from '../../components/Loading';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import StudentProjectApplication from '../../components/Students/StudentProjectApplication';

const ProjectsApplied = () => {
	const [loading, setLoading] = useState(true);
	const [applications, setApplications] = useState([]);

	useEffect(() => {
		instance
			.get('/projects/student_applications/')
			.then((res) => {
				console.log(res.data);
				setApplications(res.data);
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
						<Grid
							container
							direction="row"
							spacing={5}
							style={{ width: '100%', margin: 'auto' }}
						>
							{applications?.map((application) => {
								return <StudentProjectApplication data={application} />;
							})}
						</Grid>
					</Container>
				</>
			)}
		</div>
	);
};

export default ProjectsApplied;
