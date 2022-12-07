import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function PersonalDetailsForm({ p1, p2 }) {
  const handleChangeName = (event) => {
    p2({ ...p1, ...{ name: event.target.value } });
  };
  const handleChangeEmail = (event) => {
    p2({ ...p1, ...{ email: event.target.value } });
  };
  const handleChangeRole = (event) => {
    p2({ ...p1, ...{ role: event.target.value } });
  };
  const handleChangepPB = (event) => {
    p2({ ...p1, ...{ phonenumber: event.target.value } });
  };
  return (
    <React.Fragment>
      <Grid
        style={{
          justifyContent: 'center',
        }}
        container
        spacing={4}
      >
        <Grid item xs={12} sm={7}>
          <TextField
            required
            label="Name"
            fullWidth
            autoComplete="Name"
            value={p1.name}
            onChange={handleChangeName}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <TextField
            required
            label="Email"
            fullWidth
            autoComplete="Email"
            value={p1.email}
            onChange={handleChangeEmail}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <TextField
            required
            label="Role"
            fullWidth
            autoComplete="Role"
            value={p1.role}
            onChange={handleChangeRole}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <TextField
            required
            label="Program Branch"
            fullWidth
            autoComplete="Program Branch"
            value={p1.program_branch}
            onChange={handleChangepPB}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
