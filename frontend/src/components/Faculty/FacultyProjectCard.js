import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import FacultyProjectDescription from './FacultyProjectDescription';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FacultyProjectEdit from './FacultyProjectEdit';

export default function FacultyProjectCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Project Name
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: C1
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Status: <span style={{ color: 'green' }}>Active</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No. of Applications: 10
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <FacultyProjectDescription />
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          endIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <FacultyProjectEdit />
      </CardActions>
    </Card>
  );
}
