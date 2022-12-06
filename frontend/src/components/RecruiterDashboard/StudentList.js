import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import instance from '../../api/axios';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { getLink } from '../../utils/getLink';

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
  },
}));

function Home(props) {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const id = props.match.params.id;

  React.useEffect(() => {
    function getdata() {
      instance
        .get('company/get_applications/' + id)
        .then((res) => {
          console.log(res.data);
          let dat = [];
          res.data.forEach((element) => {
            var el = {};
            el.email = element.student.user.email;
            el.name =
              element.student.user.first_name +
              ' ' +
              element.student.user.last_name;
            el.roll_no = element.student.roll_no;
            el.branch =
              element.student.program_branch.program +
              ' ' +
              element.student.program_branch.name;
            el.resume = getLink(element.get_file);
            dat.push(el);
          });
          console.log(dat);
          setData(dat);
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response);
            if (error.response.status === 403) {
              window.alert(error.response.data['Error']);
            }
          }
        });
    }
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              Intern Announcements
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>S No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>RollNo</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Resume</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.roll_no}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.branch}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<VisibilityIcon />}
                        onClick={() => {
                          window.location = row.resume;
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </React.Fragment>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

export default Home;
