import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import instance from '../api/axios';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Modal from '@material-ui/core/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CloseIcon from '@material-ui/icons/Close';
import styles from '../styles/components/Students/ProjectDetailsModal.module.css';
// import FacultyProjectCard from '../components/Faculty/FacultyProjectCard';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    width: '100%',
  },
  papermodal: {
    position: 'absolute',
    marginLeft: window.innerWidth / 3.5,
    marginTop: window.innerHeight / 3,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: theme.spacing(1),
    textTransform: 'none',
  },
}));

function getDate(date) {
  date = new Date(date);
  return date.toDateString();
}

function Offers() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selcted, setselcted] = React.useState({});
  const [res, setres] = React.useState('None');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        style={{
          margin: '10px',
        }}
      >
        {/* <FacultyProjectCard /> */}
      </div>
      <div
        style={{
          margin: '10px',
        }}
      >
        {/* <FacultyProjectCard /> */}
      </div>
    </>
  );
}

export default Offers;
