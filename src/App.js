import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import axios from 'axios';
import BetAmountSelector from './BetAmountSelector';
import BetOptionSelector from './BetOptionSelector';
import Result from './Result';
import './App.css';

const App = () => {
  const [points, setPoints] = useState(5000);
  const [betAmount, setBetAmount] = useState(null);
  const [betOption, setBetOption] = useState(null);
  const [diceResult, setDiceResult] = useState(null);
  const [message, setMessage] = useState('');

  const handleRollDice = async () => {
    if (!betAmount) {
      setMessage('Please select a bet amount.');
      return;
    }
    if (!betOption) {
      setMessage('Please select a bet option.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/game/roll', { betAmount, betOption, points });
      const { dice, pointsChange, newPoints } = response.data;
      
      setDiceResult(dice);
      setPoints(newPoints);
      setMessage(`You ${pointsChange > 0 ? 'won' : 'lost'} ${Math.abs(pointsChange)} points!`);
    } catch (error) {
      setMessage('Error rolling dice.');
    }
  };

  return (
    <Container className="main">
      <Typography variant="h2" gutterBottom>7 Up 7 Down Game</Typography>
      <Typography variant="h6">Amount: {points}</Typography>

      {betAmount === null ? (
        <BetAmountSelector setBetAmount={setBetAmount} />
      ) : (
        <BetOptionSelector setBetOption={setBetOption} />
      )}

      {betAmount !== null && betOption !== null && (
        <Button variant="contained" className="dice-button" onClick={handleRollDice}>
          Roll Dice
        </Button>
      )}

      {diceResult && <Result dice={diceResult} />}
      {message && <Typography variant="h6">{message}</Typography>}
    </Container>
  );
};

export default App;
