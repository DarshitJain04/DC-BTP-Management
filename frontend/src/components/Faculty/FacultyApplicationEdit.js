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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FacultyApplicationEdit({ data }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [is_accepted, setis_accepted] = useState(data.is_accepted);
  const [notes, setNotes] = useState(data.notes);
  const [grade, setGrade] = useState(data.grade);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleActive = () => {
    setis_accepted(!is_accepted);
  };

  const handleSubmit = (application_id) => {
    var form = new FormData();
    form.append('is_accepted', is_accepted);
    form.append('notes', notes);
    form.append('grade', grade);
    console.log(form);
    instance
      .put(`/projects/faculty_applications/${application_id}`, form)
      .then((res) => {
        if (res.status === 200) {
          window.alert('Application updated successfully');
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          window.alert('Invalid Form');
        }
        setLoading(false);
      });
  };

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
        aria-labelledby="Edit Application"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id={data.id}>
          <div className={styles.title}>Edit Application</div>
        </DialogTitle>
        {loading ? (
          <Loading />
        ) : (
          <DialogContent dividers="true">
            <Form>
              <Form.Group className="mb-3" controlId="Application Type">
                <div className={styles.projectStatus}>
                  <Form.Label className={styles.status}>Status</Form.Label>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    checked={is_accepted}
                    label={
                      is_accepted ? (
                        <span style={{ color: '#3DBE29', fontWeight: 'bold' }}>
                          Accepted
                        </span>
                      ) : (
                        <span style={{ color: '#ed5e68', fontWeight: 'bold' }}>
                          Pending
                        </span>
                      )
                    }
                    onClick={(e) => toggleActive()}
                    className={styles.toggleButton}
                  />
                </div>
                <Form.Label className={styles.deliverables}>Grade</Form.Label>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    value={grade}
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={(e) => setGrade(e.target.value)}
                  >
                    <MenuItem value="None">None</MenuItem>
                    <MenuItem value="A*">A*</MenuItem>
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                    <MenuItem value="C-">C-</MenuItem>
                    <MenuItem value="D">D</MenuItem>
                    <MenuItem value="E">E</MenuItem>
                    <MenuItem value="F">F</MenuItem>
                    <MenuItem value="I">I</MenuItem>
                    <MenuItem value="S">S</MenuItem>
                    <MenuItem value="X">X</MenuItem>
                    <MenuItem value="U">U</MenuItem>
                    <MenuItem value="W">W</MenuItem>
                  </Select>
                </FormControl>
                <Form.Label className={styles.deliverables}>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  className={styles.inputBox}
                  rows={8}
                  placeholder="Notes"
                  onChange={(e) => setNotes(e.target.value)}
                  value={notes}
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
