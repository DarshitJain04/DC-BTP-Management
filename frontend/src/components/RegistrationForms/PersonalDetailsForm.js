import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function getUrl(photo) {
  try {
    return URL.createObjectURL(photo);
  } catch {
    return photo;
  }
}

export default function PersonalDetailsForm({ p1, p2 }) {
  const classes = useStyles();

  const handleChangecat = (event) => {
    p2({ ...p1, ...{ category: event.target.value } });
  };
  const handleChangebirth = (event) => {
    p2({ ...p1, ...{ birthday: event.target.value } });
  };
  const handleChangephone = (event) => {
    p2({ ...p1, ...{ phonenumber: event.target.value } });
  };
  const handleChangepadd = (event) => {
    p2({ ...p1, ...{ padd: event.target.value } });
  };
  const handleChangecadd = (event) => {
    p2({ ...p1, ...{ cadd: event.target.value } });
  };
  const handleChangenat = (event) => {
    p2({ ...p1, ...{ national: event.target.value } });
  };
  const handleChangedis = (event) => {
    p2({ ...p1, ...{ disable: event.target.value } });
  };
  const selectFile = (event) => {
    p2({ ...p1, ...{ photo: event.target.files[0] } });
  };
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={5}>
          <TextField
            id="date"
            label="Date Of Birth"
            type="date"
            value={p1.birthday}
            onChange={handleChangebirth}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <TextField
            required
            label="Phone number"
            fullWidth
            autoComplete="Phone number"
            value={p1.phonenumber}
            onChange={handleChangephone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Permanent Address"
            name="Permanent Address"
            label=" Permanent Address"
            fullWidth
            autoComplete=" Permanent Address"
            value={p1.padd}
            onChange={handleChangepadd}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Current Address"
            name="Current Address"
            label=" Current Address"
            fullWidth
            autoComplete=" Current Address"
            value={p1.cadd}
            onChange={handleChangecadd}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Category *</InputLabel>
            <Select fullWidth value={p1.category} onChange={handleChangecat}>
              <MenuItem value="General">General</MenuItem>
              <MenuItem value="OBC">OBC</MenuItem>
              <MenuItem value="SC">SC</MenuItem>
              <MenuItem value="ST">ST</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Nationality *</InputLabel>
            <Select fullWidth value={p1.national} onChange={handleChangenat}>
              <MenuItem value="Indian">Indian</MenuItem>
              <MenuItem value="Other">Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Person With Disability *</InputLabel>
            <Select
              fullWidth
              required
              value={p1.disable}
              onChange={handleChangedis}
            >
              <MenuItem value={false}>No</MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" component="label">
            Upload Profile Photo
            <input type="file" accept="image/*" hidden onChange={selectFile} />
          </Button>
          {p1.photo && (
            <div>
              <img
                className={classes.button}
                src={getUrl(p1.photo)}
                alt=""
                style={{ maxWidth: '100px' }}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
