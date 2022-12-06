import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ height: '100vh' }}
    >
      <Grid item xs={3}>
        <CircularProgress size="5rem" style={{ color: '#012970' }} />
      </Grid>
    </Grid>
  );
};

export default Loading;
