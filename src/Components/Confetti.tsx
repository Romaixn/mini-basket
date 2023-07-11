import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useConfettiStore } from '../stores/useGame';

const Confetti: React.FC = () => {
    const confetti = useConfettiStore(state => state.confetti);

    useFrame(() => {
        // Update the position of the confetti particles on each frame
    });

    return (
        <>
            {confetti && (
                // Render the confetti particles
            )}
        </>
    );
};

export default Confetti;