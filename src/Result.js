import React from 'react';
import { Typography, Grid } from '@mui/material';

const Result = ({ dice }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h6">Dice Result</Typography>
      <Typography variant="h4">{dice[0]} + {dice[1]} = {dice[0] + dice[1]}</Typography>
    </Grid>
  </Grid>
);

export default Result;
