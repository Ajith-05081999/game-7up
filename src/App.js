import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import axios from 'axios';
import BetAmountSelector from './selectors/BetAmountSelector';
import BetOptionSelector from './selectors/BetOptionSelector';
import Result from './selectors/Result';
import { BASEURL } from './constants/index';
import './App.css';

const App = () => {
  const [points, setPoints] = useState(5000);
  const [betAmount, setBetAmount] = useState(null);
  const [betOption, setBetOption] = useState(null);
  const [diceResult, setDiceResult] = useState(null);
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('neutral');

  const handleRollDice = async () => {
    if (!betAmount) {
      setMessage('Please select a bet amount.');
      setMessageClass('neutral');
      return;
    }
    if (!betOption) {
      setMessage('Please select a bet option.');
      setMessageClass('neutral');
      return;
    }
    try {
      const response = await axios.post(BASEURL, { betAmount, betOption, points });
      const { dice, pointsChange, newPoints } = response.data;

      setDiceResult(dice);
      setPoints(newPoints);
      setMessage(`You ${pointsChange > 0 ? 'won' : 'lost'} ${Math.abs(pointsChange)} rupees!`);
      setMessageClass(pointsChange > 0 ? 'won' : 'lost');
    } catch (error) {
      setMessage('Error rolling dice.');
      setMessageClass('neutral');
    }
  };

  return (
    <Container className="main">
      <Typography variant="h2" gutterBottom className='header'>7 Up 7 Down Game</Typography>
      <div className='container-1'>
        <Typography variant="h6">Amount: <span className='amount'>{points}</span> </Typography>

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

        {diceResult && <Result className="result-1" dice={diceResult} />}
        {message && <Typography className={`message ${messageClass}`} variant="h6">{message}</Typography>}
      </div>
    </Container>
  );
};

export default App;
