/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import styles from '../../styles/components/Students/ProjectsListCard.module.css';
import FadeUpWhenVisible from '../Animation/FadeUp';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@mui/material/IconButton';
import ApplicationDetails from '../../components/Students/ApplicationDetails';

const StudentProjectApplication = ({ data }) => {

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const createText = (text) => {
		return { __html: text };
	};

	return (
		<FadeUpWhenVisible>
			<Paper elevation={3} className={styles.project}>
				<div className={styles.header}>
					<div className={styles.projectTitle}>{data.project.title}</div>
					<div className={styles.status}>
						{data.is_accepted ? (
							<span style={{ color: '#3DBE29', fontWeight: 'bold' }}>
								ACCEPTED
							</span>
						) : (
							<span style={{ color: '#ed5e68', fontWeight: 'bold' }}>
								PENDING
							</span>
						)}
					</div>
				</div>
				<button className={styles.faculty} onClick={() => handleClickOpen()}>
					{`${data.project.faculty.user.full_name} (${data.project.faculty.program_branch.name})`}
				</button>
				<Dialog
					fullWidth
					maxWidth="sm"
					open={open}
					onClose={() => handleClose()}
					scroll="paper"
					aria-labelledby={data.project.faculty.user.full_name}
					aria-describedby="scroll-dialog-description"
				>
					<DialogTitle id={data.project.faculty.user.full_name}>
						<div className={styles.header}>
							<div className={styles.facultyName}>
								{data.project.faculty.user.full_name}
							</div>
							<IconButton
								className={styles.email}
								href={`mailto:${data.project.faculty.user.email}`}
							>
								<EmailIcon />
							</IconButton>
						</div>
						<div className={styles.facultyDepartment}>
							Department:{' '}
							<span style={{ fontWeight: 'normal' }}>
								{data.project.faculty.program_branch.name}
							</span>
						</div>
					</DialogTitle>
					<DialogContent>
						<Typography
							gutterBottom
							dangerouslySetInnerHTML={createText(data.project.faculty.description)}
							className={styles.description}
						></Typography>
					</DialogContent>
				</Dialog>
				<div className={styles.projectActions}>
					<ApplicationDetails applicationData={data} projectData={data.project} />
				</div>
			</Paper>
		</FadeUpWhenVisible>
	);
};

export default StudentProjectApplication;
