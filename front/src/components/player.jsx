import React, { useState, useEffect } from 'react';
import perso from '../assets/perso.png';

const Player = ({ initialPosition, isMe, onMove }) => {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    if (!isMe) return;
    const handleKeyDown = (event) => {
      setPosition((prev) => {
        const step = 10;
        let newPos = prev;
        switch (event.key) {
          case 'ArrowUp':
            newPos = { ...prev, y: prev.y - step };
            break;
          case 'ArrowDown':
            newPos = { ...prev, y: prev.y + step };
            break;
          case 'ArrowLeft':
            newPos = { ...prev, x: prev.x - step };
            break;
          case 'ArrowRight':
            newPos = { ...prev, x: prev.x + step };
            break;
          default:
            newPos = prev;
        }
        if (onMove) onMove(newPos);
        return newPos;
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMe, onMove]);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  return (
    <img
      src={perso}
      alt="player"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: '64px',
        height: '64px',
        zIndex: isMe ? 2 : 1,
        border: isMe ? '2px solid #00f' : 'none',
      }}
    />
  );
};

export default Player;