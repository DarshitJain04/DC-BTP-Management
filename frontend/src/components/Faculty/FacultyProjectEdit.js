import React, { useState, useEffect } from 'react';
import instance from '../../api/axios';
import styles from '../../styles/components/Faculty/FacultyProjectEdit.module.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import Form from 'react-bootstrap/Form';
import Loading from '../../components/Loading';

export default function FacultyProjectEdit({ data }) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = React.useState(data.title);
  const [category, setCategory] = React.useState(data.category.category);
  const [description, setDescription] = React.useState(data.description);
  const [deliverables, setDeliverables] = React.useState(data.deliverables);
  const [skills, setSkills] = React.useState(data.skills);
  const [courses, setCourses] = React.useState(data.courses);
  const [active, setActive] = React.useState(data.active);
  const [categories, setCategories] = React.useState([]);

  const getAvailableCategories = () => {
    instance
      .get('projects/categories/')
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAvailableCategories();
  }, []);

  const toggleActive = () => {
    setActive(!active);
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

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        style={{
          margin: '8px',
        }}
        endIcon={<EditIcon />}
        onClick={handleOpen}
      >
        Edit
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => handleClose()}
        scroll="paper"
        aria-labelledby={'data.title'}
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id={data.id}>
          <div className={styles.title}>Project Details</div>
        </DialogTitle>
        {loading ? (
          <Loading />
        ) : (
          <DialogContent dividers="true">
            <Form>
              <Form.Group className="mb-3" controlId="Application Type">
                <Form.Label className={styles.label}>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  className={styles.inputBox}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
                <Form.Label className={styles.label}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  className={styles.inputBox}
                  rows={6}
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
                <Form.Label className={styles.label}>Deliverables</Form.Label>
                <Form.Control
                  as="textarea"
                  className={styles.inputBox}
                  rows={6}
                  placeholder="Deliverables"
                  onChange={(e) => setDeliverables(e.target.value)}
                  value={deliverables}
                />
                <Form.Label className={styles.label}>Status</Form.Label>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  checked={active}
                  label={active ? 'Active' : 'Inactive'}
                  onClick={(e) => toggleActive()}
                  className={styles.toggleButton}
                />
                <Form.Label className={styles.label}>Category</Form.Label>
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
                <Form.Label className={styles.label}>
                  Skills (comma seperated)
                </Form.Label>
                <Form.Control
                  as="textarea"
                  value={skills}
                  className={styles.inputBox}
                  rows={3}
                  onChange={(e) => setSkills(e.target.value)}
                />
                <Form.Label className={styles.label}>
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
