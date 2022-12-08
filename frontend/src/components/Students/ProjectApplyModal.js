import React, { useState } from 'react';
import instance from '../../api/axios';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../../styles/components/Students/ProjectApplyModal.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectApplyModal = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applicationType, setApplicationType] = useState('Design Credits');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApplicationType = (event) => {
    console.log(event.target.value);
    setApplicationType(event.target.value);
  };

  const handleSubmit = (project_id, application_type) => {
    setLoading(true);
    var form = new FormData();
    form.append('project_id', project_id);
    form.append('application_type', application_type);
    instance
      .post('http://localhost:8000/api/projects/student_applications/', form)
      .then((res) => {
        if (res.status === 200) {
          console.log('Response');
          console.log(res.data);
          handleClose();
          window.alert('Application submitted successfully');
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setError('Invalid Form. All * fields are required');
        }
        setLoading(false);
      });
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <button className={styles.projectApply} onClick={() => handleClickOpen()}>
        Apply
      </button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => handleClose()}
        scroll="paper"
        aria-labelledby={data.title}
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id={data.title}>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.faculty}>
            {`${data.faculty.user.first_name} ${data.faculty.user.last_name} (${data.faculty.program_branch.name})`}
          </div>
        </DialogTitle>
        <DialogContent dividers="true">
          <Form>
            <Form.Group className="mb-3" controlId="Application Type">
              <Form.Label className={styles.applicationType}>
                Application Type
              </Form.Label>
              <Form.Select
                aria-label="Application Type"
                onChange={(event) => handleApplicationType(event)}
                className={styles.dropDown}
              >
                <option value="Design Credits">Design Credits</option>
                <option value="B.Tech. Project">B.Tech. Project</option>
              </Form.Select>
            </Form.Group>
            <div className={styles.submit}>
              <Button
                variant="primary"
                type="submit"
                onClick={() => handleSubmit(data.id, applicationType)}
              >
                Submit
              </Button>
            </div>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectApplyModal;
