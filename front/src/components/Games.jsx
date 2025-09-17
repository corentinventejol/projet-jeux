import React, { useState } from 'react';
import GameLabyrinthe from './GameLabyrinthe/GameLabyrinthe.jsx';

const Games = () => {
  const [selectedGame, setSelectedGame] = useState('labyrinthe');

  return (
    <div style={{ textAlign: 'center'}}>
      <h1>Choisis ton jeu</h1>
      <button onClick={() => setSelectedGame('labyrinthe')}>Labyrinthe</button>
      <div>
        {selectedGame === 'labyrinthe' && <GameLabyrinthe />}
      </div>
    </div>
  );
};

export default Games;
