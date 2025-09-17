import React, { useState, useEffect, useRef } from 'react';
import './GameLabyrinthe.css';
import GameControls from '../GameControls.jsx';
import perso from '../../assets/perso.png';
import pierre1 from '../../assets/pierre1.png';
import pierre2 from '../../assets/pierre2.png';
import pierre3 from '../../assets/pierre3.png';
import meme1 from '../../assets/meme1.png';
import meme2 from '../../assets/meme2.png';
import meme3 from '../../assets/meme3.png';
import pnj1 from '../../assets/pnj1.png'; // gamin
import pnj2 from '../../assets/pnj2.png'; // fermier
import pnj3 from '../../assets/pnj3.png'; // mage
import pnj4 from '../../assets/pnj4.png'; // voleur
import fond from '../../assets/fond-plaine.jpg';
import fond2 from '../../assets/fond-champ-laboure.png';

// 0 = sol, 1 = mur, 2 = pierre1, 3 = pierre2, 4 = pierre3, 5 = gamin, 6 = fermier, 7 = terre labouré
const maps = [
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,5,1,0,1,0,0,0,0,0,0,0,1,0,0,0,1,7,7,7,7,0,0,7,7,7,7,1],
    [1,0,0,0,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,7,7,7,7,0,0,7,7,7,7,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,7,7,7,7,0,0,7,7,7,7,1],
    [1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,7,7,7,7,0,0,7,7,7,7,1],
    [1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,7,7,7,7,0,0,7,7,7,7,1],
    [1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,7,7,7,7,0,0,7,7,7,7,1],
    [1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,7,7,7,7,0,0,7,7,7,7,1],
    [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,7,7,7,7,0,0,7,7,7,7,1],
    [1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,7,7,7,7,0,0,7,7,7,7,1],
    [1,0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,7,7,7,7,0,0,7,7,7,7,1],
    [1,0,1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,7,7,7,7,0,0,7,7,7,7,1],
    [1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,7,7,7,7,0,0,7,7,7,7,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,6,1], // <-- 6 pour le PNJ (fermier)
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ],
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 2, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 3, 1, 0, 1, 1, 1, 4, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]
];

const cellSize = 64;

const GameLabyrinthe = () => {
  const [mapIndex, setMapIndex] = useState(0);
  const [playerPos, setPlayerPos] = useState({ row: 1, col: 1 });
  const [mapState, setMapState] = useState(maps[mapIndex]);
  const [inventaire, setInventaire] = useState([]);
  const [message, setMessage] = useState('');
  const gridRef = useRef();

  // Scroll automatique vers le joueur
  useEffect(() => {
    if (gridRef.current) {
      const left = playerPos.col * cellSize - 320;
      const top = playerPos.row * cellSize - 320;
      gridRef.current.scrollTo({
        left: Math.max(0, left),
        top: Math.max(0, top),
        behavior: 'smooth',
      });
    }
  }, [playerPos]);

  // Gestion des mouvements via GameControls
  const isSolid = (val) => [1,2,3,4,5,6].includes(val);
  const handleMove = (direction) => {
    let { row, col } = playerPos;
    if (direction === 'ArrowUp' && row > 0 && !isSolid(mapState[row - 1][col])) row--;
    if (direction === 'ArrowDown' && row < mapState.length - 1 && !isSolid(mapState[row + 1][col])) row++;
    if (direction === 'ArrowLeft' && col > 0 && !isSolid(mapState[row][col - 1])) col--;
    if (direction === 'ArrowRight' && col < mapState[0].length - 1 && !isSolid(mapState[row][col + 1])) col++;
    setPlayerPos({ row, col });
  };

  // Ramasser la pierre si à côté et touche 'A'
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'a') {
        const { row, col } = playerPos;
        const voisins = [
          { r: row - 1, c: col },
          { r: row + 1, c: col },
          { r: row, c: col - 1 },
          { r: row, c: col + 1 },
        ];
        for (const v of voisins) {
          if (
            v.r >= 0 && v.r < mapState.length &&
            v.c >= 0 && v.c < mapState[0].length
          ) {
            // Fermier
            if (mapState[v.r][v.c] === 5) {
              setMessage("Bonjour voyageur, pouvez-vous aider le fermier au fond de ce labyrinthe ? Il m'a l'air paniqué.");
              return;
            }
            // Pierres
            if ([2,3,4].includes(mapState[v.r][v.c])) {
              let memeImg = null;
              let memeName = '';
              if (mapState[v.r][v.c] === 2) { memeImg = meme1; memeName = 'Meme1'; }
              if (mapState[v.r][v.c] === 3) { memeImg = meme2; memeName = 'Meme2'; }
              if (mapState[v.r][v.c] === 4) { memeImg = meme3; memeName = 'Meme3'; }
              setInventaire(prev => [...prev, { id: Date.now(), name: memeName, img: memeImg }]);
              setMapState(prev => {
                const newMap = prev.map(arr => [...arr]);
                newMap[v.r][v.c] = 0;
                return newMap;
              });
              break;
            }
          }
        }
        const nbPierresRestantes = mapState.flat().filter(v => [2,3,4].includes(v)).length - 1;
        if (nbPierresRestantes <= 0 && mapIndex < maps.length - 1) {
          setTimeout(() => {
            setMapIndex(idx => idx + 1);
            setMapState(maps[mapIndex + 1]);
            setPlayerPos({ row: 1, col: 1 });
            setInventaire([]);
          }, 500);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos, mapState]);

  const getImageByDirection = () => perso;

  return (
    <>
      <GameControls onMove={handleMove} />
      <div className="labyrinthe-container">
        {message && (
          <div
            className="labyrinthe-message"
            style={{
              '--pnj-left': `${cellSize * 2}px`, 
              '--pnj-top': `${cellSize * 1}px`, 
            }}
          >
            {message}
            <button onClick={() => setMessage('')}>Fermer</button>
          </div>
        )}
        <div
          className="labyrinthe-grid"
          ref={gridRef}
          style={{
            gridTemplateColumns: `repeat(${mapState[0].length}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${mapState.length}, ${cellSize}px)`,
            width: '640px',
            height: '640px',
            backgroundImage: `url(${fond})`,
            overflow: 'auto',
          }}
        >
          {mapState.map((row, rIdx) =>
            row.map((cell, cIdx) => (
              <div
                key={rIdx + '-' + cIdx}
                className={cell === 1 ? 'labyrinthe-wall' : 'labyrinthe-cell'}
              >
                {cell === 2 && (
                  <img
                    src={pierre1}
                    alt="pierre1"
                    className="labyrinthe-pierre"
                  />
                )}
                {cell === 3 && (
                  <img
                    src={pierre2}
                    alt="pierre2"
                    className="labyrinthe-pierre"
                  />
                )}
                {cell === 4 && (
                  <img
                    src={pierre3}
                    alt="pierre3"
                    className="labyrinthe-pierre"
                  />
                )}
                {cell === 5 && (
                  <img
                    src={pnj1}
                    alt="gamin"
                    className="labyrinthe-pnj"
                  />
                )}
                {cell === 6 && (
                  <img
                    src={pnj2}
                    alt="fermier"
                    className="labyrinthe-pnj"
                  />
                )}
                {cell === 7 && (
                  <img
                    src={fond2}
                    alt="terre labouré"
                    className="labyrinthe-terre"
                  />
                )}
                {playerPos.row === rIdx && playerPos.col === cIdx && (
                  <>
                    {(() => {
                      const voisins = [
                        { r: rIdx - 1, c: cIdx },
                        { r: rIdx + 1, c: cIdx },
                        { r: rIdx, c: cIdx - 1 },
                        { r: rIdx, c: cIdx + 1 },
                      ];
                      // Affiche le bouton "A" si une pierre ou un PNJ est à côté
                      return voisins.some(v =>
                        v.r >= 0 && v.r < mapState.length &&
                        v.c >= 0 && v.c < mapState[0].length &&
                        ([2,3,4,5].includes(mapState[v.r][v.c]))
                      ) ? (
                        <div className="labyrinthe-action">A</div>
                      ) : null;
                    })()}
                    <img
                      src={getImageByDirection()}
                      alt="player"
                      className="labyrinthe-player"
                    />
                  </>
                )}
              </div>
            ))
          )}
        </div>
        <div className="labyrinthe-inventaire">
          <h3>Inventaire</h3>
          <ul>
            {inventaire.map(item => (
              <li key={item.id} className="labyrinthe-inventaire-item">
                <img src={item.img} alt={item.name} className="labyrinthe-inventaire-img" />
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default GameLabyrinthe;
