import React, { useState, useEffect } from 'react';
import './CountdownTimer.scss'

const CountdownTimer = ({ matchDateTime }) => {
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const textCountdownTimer={
    zile: 'zile',
    ore: 'ore',
    minute:'minute',
    secunde:'secunde'
  }

  const calculateTimeRemaining = () => {
    const currentTime = new Date();

    let difference = new Date(matchDateTime) - currentTime;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      difference -= days * (1000 * 60 * 60 * 24);

      const hours = Math.floor(difference / (1000 * 60 * 60));
      difference -= hours * (1000 * 60 * 60);

      const minutes = Math.floor(difference / (1000 * 60));
      difference -= minutes * (1000 * 60);

      const seconds = Math.floor(difference / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    } else {
      setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='timer'>
      {timeRemaining.days} {textCountdownTimer.zile} {timeRemaining.hours} {textCountdownTimer.ore} {timeRemaining.minutes} {textCountdownTimer.minute} {timeRemaining.seconds} {textCountdownTimer.secunde}
    </div>
  );
};

export default CountdownTimer;
