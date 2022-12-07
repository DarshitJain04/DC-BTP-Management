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
    <React.Fragment>
      <Grid item xs={12} sm={11}>
        <Paper className={classes.paper}>
          <React.Fragment>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              All Projects
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontSize: '16px',
                      color: 'white',
                      background: '#012970',
                    }}
                  >
                    Sr No.
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '16px',
                      color: 'white',
                      background: '#012970',
                    }}
                  >
                    Title
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '16px',
                      color: 'white',
                      background: '#012970',
                    }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '16px',
                      color: 'white',
                      background: '#012970',
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '16px',
                      color: 'white',
                      background: '#012970',
                    }}
                  >
                    No. of Applications
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '16px',
                      color: 'white',
                      background: '#012970',
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={1}>
                  <TableCell
                    style={{
                      fontSize: '16px',
                    }}
                  >
                    1
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '16px',
                    }}
                  >
                    Project Tile 1
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '16px',
                    }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    style={{
                      color: 'green',
                      fontSize: '16px',
                    }}
                  >
                    Active
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '16px',
                    }}
                  >
                    10
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<VisibilityIcon />}
                      onClick={(e) => {
                        handleOpen();
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      endIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        color: '#fff',
                        backgroundColor: '#02a70f',
                      }}
                      className={classes.button}
                      endIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow key={2}>
                  <TableCell
                    style={{
                      fontSize: '16px',
                    }}
                  >
                    2
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '16px',
                    }}
                  >
                    Project Tile 2
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '16px',
                    }}
                  >
                    Category 2
                  </TableCell>
                  <TableCell
                    style={{
                      color: 'red',
                      fontSize: '16px',
                    }}
                  >
                    Inactive
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '16px',
                    }}
                  >
                    20
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<VisibilityIcon />}
                      onClick={(e) => {
                        handleOpen();
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      endIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        color: '#fff',
                        backgroundColor: '#02a70f',
                      }}
                      className={classes.button}
                      endIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </React.Fragment>
        </Paper>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Grid container spacing={2} style={{ Top: '50%' }}>
          <Paper className={classes.papermodal}>
            <Typography
              component="h1"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Select Resume To Apply
            </Typography>
            <center>
              <Typography style={{ padding: '10px' }} gutterBottom>
                {selcted.designation} role offered by {selcted.name}
              </Typography>
              <Grid item xs={12} sm={6} style={{ margin: '30px' }}>
                <FormControl fullWidth>
                  <InputLabel>Resume *</InputLabel>
                  <Select
                    fullWidth
                    onChange={(e) => {
                      setres(e.target.value);
                    }}
                  >
                    <MenuItem value={1}>Resume 1</MenuItem>
                    <MenuItem value={2}>Resume 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Button
                disabled={res === 'None'}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<DeleteIcon />}
              >
                Apply
              </Button>
            </center>
          </Paper>
        </Grid>
      </Modal>
    </React.Fragment>
  );
}

export default Offers;
