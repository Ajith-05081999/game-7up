import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import './BetAmountSelector.css';

const BetAmountSelector = ({ setBetAmount }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h6">Select Bet Amount</Typography>
      {[100, 200, 500].map(amount => (
        <Button key={amount} variant="contained" className="bet-button" onClick={() => setBetAmount(amount)}>
          {amount}
        </Button>
      ))}
    </Grid>
  </Grid>
);

export default BetAmountSelector;
