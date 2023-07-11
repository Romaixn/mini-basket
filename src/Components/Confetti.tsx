import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

interface ConfettiProps {
  showConfetti: boolean;
}

const ConfettiEffect: React.FC<ConfettiProps> = ({ showConfetti }) => {
  const [runConfetti, setRunConfetti] = useState(false);

  useEffect(() => {
    if (showConfetti) {
      setRunConfetti(true);
      setTimeout(() => setRunConfetti(false), 2000);
    }
  }, [showConfetti]);

  return (
    <>
      {runConfetti && <Confetti />}
    </>
  );
};

export default ConfettiEffect;