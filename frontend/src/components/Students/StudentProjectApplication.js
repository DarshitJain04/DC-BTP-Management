/* eslint-disable prettier/prettier */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import styles from '../../styles/components/Students/ProjectsListCard.module.css';
import FadeUpWhenVisible from '../Animation/FadeUp';
import ApplicationDetails from '../../components/Students/ApplicationDetails';

const ProjectListCard = ({ data }) => {
	return (
		<FadeUpWhenVisible>
			<Paper elevation={3} className={styles.project}>
				<div className={styles.projectTitle}>{data.project.title}</div>
				<div className={styles.faculty}>
					{`${data.project.faculty.user.first_name} ${data.project.faculty.user.last_name} (${data.project.faculty.program_branch.name})`}
				</div>
				<div className={styles.projectActions}>
					<ApplicationDetails applicationData={data} projectData={data.project} />
				</div>
			</Paper>
		</FadeUpWhenVisible>
	);
};

export default ProjectListCard;
