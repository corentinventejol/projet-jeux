import { useEffect } from 'react';

// props: onMove({ direction })
const GameControls = ({ onMove }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Flèches directionnelles
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        if (onMove) onMove(e.key);
      }
      // ZQSD
      if (e.key.toLowerCase() === "z") {
        if (onMove) onMove("ArrowUp");
      }
      if (e.key.toLowerCase() === "s") {
        if (onMove) onMove("ArrowDown");
      }
      if (e.key.toLowerCase() === "q") {
        if (onMove) onMove("ArrowLeft");
      }
      if (e.key.toLowerCase() === "d") {
        if (onMove) onMove("ArrowRight");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onMove]);
  return null;
};

export default GameControls;
