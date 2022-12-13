import React, { useState, useEffect } from 'react';
import instance from '../../api/axios';
import styles from '../../styles/components/Faculty/FacultyProjectEdit.module.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import Form from 'react-bootstrap/Form';
import IconButton from '@mui/material/IconButton';
import Loading from '../../components/Loading';

export default function FacultyProjectEdit({ data }) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [category, setCategory] = useState(data.category.category);
  const [description, setDescription] = useState(data.description);
  const [deliverables, setDeliverables] = useState(data.deliverables);
  const [skills, setSkills] = useState(data.skills);
  const [courses, setCourses] = useState(data.courses);
  const [active, setActive] = useState(data.active);
  const [categories, setCategories] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleActive = () => {
    setActive(!active);
  };

  const validateProjectFields = () => {
    if (title === '' || description === '' || deliverables === '') {
      return true;
    }
    return false;
  };

  const handleSubmit = (project_id) => {
    setLoading(true);
    var form = new FormData();
    form.append('project_id', project_id);
    form.append('title', title);
    form.append('category', category);
    form.append('description', description);
    form.append('deliverables', deliverables);
    form.append('skills', skills);
    form.append('courses', courses);
    form.append('active', active);
    console.log(form);
    instance
      .put(`/projects/projects_floated/${project_id}`, form)
      .then((res) => {
        if (res.status === 200) {
          handleClose();
          window.alert('Application submitted successfully');
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          window.alert('Invalid Form');
          window.location.reload();
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    instance
      .get('/projects/categories/')
      .then((res) => {
        setCategories(res.data);
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className={styles.editButton}>
        <IconButton onClick={() => handleOpen()}>
          <EditIcon />
        </IconButton>
      </div>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => handleClose()}
        scroll="paper"
        aria-labelledby={data.title}
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id={data.id}>
          <div className={styles.title}>{data.title}</div>
        </DialogTitle>
        {loading ? (
          <Loading />
        ) : (
          <DialogContent dividers="true">
            <Form>
              <Form.Group className="mb-3" controlId="Application Type">
                <Form.Label className={styles.projectTitle}>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  className={styles.inputBox}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
                <Form.Label className={styles.description}>
                  Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  className={styles.inputBox}
                  rows={4}
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
                <Form.Label className={styles.deliverables}>
                  Deliverables
                </Form.Label>
                <Form.Control
                  as="textarea"
                  className={styles.inputBox}
                  rows={4}
                  placeholder="Deliverables"
                  onChange={(e) => setDeliverables(e.target.value)}
                  value={deliverables}
                />
                <div className={styles.projectStatus}>
                  <Form.Label className={styles.status}>Status</Form.Label>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    checked={active}
                    label={
                      active ? (
                        <span style={{ color: '#3DBE29', fontWeight: 'bold' }}>
                          ACTIVE
                        </span>
                      ) : (
                        <span style={{ color: '#ed5e68', fontWeight: 'bold' }}>
                          INACTIVE
                        </span>
                      )
                    }
                    onClick={(e) => toggleActive()}
                    className={styles.toggleButton}
                  />
                </div>
                <Form.Label className={styles.category}>Category</Form.Label>
                <Form.Select
                  aria-label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                  className={styles.dropDown}
                  value={category}
                >
                  {categories?.map((c) => {
                    return <option value={c.category}>{c.category}</option>;
                  })}
                </Form.Select>
                <Form.Label className={styles.skills}>
                  Skills (comma seperated)
                </Form.Label>
                <Form.Control
                  as="textarea"
                  value={skills}
                  className={styles.inputBox}
                  rows={3}
                  onChange={(e) => setSkills(e.target.value)}
                />
                <Form.Label className={styles.courses}>
                  Courses (comma seperated)
                </Form.Label>
                <Form.Control
                  as="textarea"
                  value={courses}
                  className={styles.inputBox}
                  rows={3}
                  onChange={(e) => setCourses(e.target.value)}
                />
              </Form.Group>
              <div className={styles.projectActions}>
                <Button
                  className={styles.submitButton}
                  variant="primary"
                  type="submit"
                  disabled={validateProjectFields()}
                  onClick={() => handleSubmit(data.id)}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
