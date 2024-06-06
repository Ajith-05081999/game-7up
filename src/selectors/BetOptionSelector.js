import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import './BetOptionSelector.css'

const BetOptionSelector = ({ setBetOption }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h6">Select Bet Option</Typography>
      {['7 Down', 'Lucky 7', '7 Up'].map(option => (
        <Button key={option} variant="contained" className="bet-button" onClick={() => setBetOption(option)}>
          {option}
        </Button>
      ))}
    </Grid>
  </Grid>
);

export default BetOptionSelector;
