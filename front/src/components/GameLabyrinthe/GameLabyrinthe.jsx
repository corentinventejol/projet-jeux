import React, { useState, useEffect, useRef } from "react";
import "./GameLabyrinthe.css";
import GameControls from "../GameControls.jsx";
import perso from "../../assets/perso.png";
import pierre1 from "../../assets/pierre1.png";
import pierre2 from "../../assets/pierre2.png";
import pierre3 from "../../assets/pierre3.png";
import meme1 from "../../assets/meme1.png";
import meme2 from "../../assets/meme2.png";
import meme3 from "../../assets/meme3.png";
import pnj1 from "../../assets/pnj1.png"; // gamin
import pnj2 from "../../assets/pnj2.png"; // fermier
import pnj3 from "../../assets/pnj3.png"; // mage
import pnj4 from "../../assets/pnj4.png"; // voleur
import fond from "../../assets/fond-plaine.jpg";
import fond2 from "../../assets/fond-champ-laboure.png";
import epouventail from "../../assets/epouventail.png";
import corbeau from "../../assets/corbeau.png";

// 0 = sol, 1 = mur, 2 = pierre1, 3 = pierre2, 4 = pierre3, 5 = gamin, 6 = fermier, 7 = terre labouré, 8 = corbeau
const maps = [
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 5, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 7, 7, 7, 7, 8, 0, 7, 7, 7, 7, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 7, 7, 7, 7, 8, 0, 7, 7, 7, 7, 1],
    [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 7, 7, 7, 7, 0, 8, 7, 7, 7, 7, 1],
    [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1], // <-- 6 pour le PNJ (fermier)
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  // [
  //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 0, 0, 1, 0, 0, 0, 0, 2, 1],
  //   [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
  //   [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  //   [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  //   [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  //   [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
  //   [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  //   [1, 0, 3, 1, 0, 1, 1, 1, 4, 1],
  //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // ],
];

const cellSize = 64;

const GameLabyrinthe = () => {
  const [mapIndex, setMapIndex] = useState(0);
  const [playerPos, setPlayerPos] = useState({ row: 1, col: 1 });
  const [mapState, setMapState] = useState(maps[mapIndex]);
  const [inventaire, setInventaire] = useState([]);
  const [message, setMessage] = useState("");
  const [aRecupEpouvantails, setARecupEpouvantails] = useState(false);
  const gridRef = useRef();

  // Scroll automatique vers le joueur
  useEffect(() => {
    if (gridRef.current) {
      const left = playerPos.col * cellSize - 320;
      const top = playerPos.row * cellSize - 320;
      gridRef.current.scrollTo({
        left: Math.max(0, left),
        top: Math.max(0, top),
        behavior: "smooth",
      });
    }
  }, [playerPos]);

  // Gestion des mouvements via GameControls
  const isSolid = (val) => [1, 2, 3, 4, 5, 6, 8, 9].includes(val);
  const handleMove = (direction) => {
    let { row, col } = playerPos;
    if (direction === "ArrowUp" && row > 0 && !isSolid(mapState[row - 1][col]))
      row--;
    if (
      direction === "ArrowDown" &&
      row < mapState.length - 1 &&
      !isSolid(mapState[row + 1][col])
    )
      row++;
    if (
      direction === "ArrowLeft" &&
      col > 0 &&
      !isSolid(mapState[row][col - 1])
    )
      col--;
    if (
      direction === "ArrowRight" &&
      col < mapState[0].length - 1 &&
      !isSolid(mapState[row][col + 1])
    )
      col++;
    setPlayerPos({ row, col });
  };

  // Ramasser la pierre si à côté et touche 'A'
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "a") {
        // Si un message est affiché et concerne le fermier
        if (message && message.pnj === 6) {
          if (message.step === 0) {
            if (!aRecupEpouvantails) {
              setInventaire((prev) => [
                ...prev,
                { id: Date.now(), name: "Epouvantail", img: epouventail, count: 2 },
              ]);
              setARecupEpouvantails(true); // On bloque la récupération pour la suite
              setMessage({
                text: "Voici 2 épouvantails pour t'aider, je ne sais pas où les placer pour les faire tous fuir car ils sont actifs que dans un rayon de 3 cases.",
                step: 1,
                pnj: 6,
              });
            } else {
              setMessage({
                text: "Je t'ai déjà donné tous mes épouvantails, bon courage !",
                step: 1,
                pnj: 6,
              });
            }
          } else {
            setMessage(null);
          }
          return;
        }
        // Si un autre message est affiché, le fermer
        if (message) {
          setMessage(null);
          return;
        }
        // Sinon, interaction classique
        const { row, col } = playerPos;
        const voisins = [
          { r: row - 1, c: col },
          { r: row + 1, c: col },
          { r: row, c: col - 1 },
          { r: row, c: col + 1 },
        ];
        for (const v of voisins) {
          if (
            v.r >= 0 &&
            v.r < mapState.length &&
            v.c >= 0 &&
            v.c < mapState[0].length
          ) {
            // Gamin
            if (mapState[v.r][v.c] === 5) {
              setMessage({
                text: "Bonjour voyageur, pouvez-vous aider le fermier au fond de ce labyrinthe ? Il m'a l'air paniqué.",
                step: 0,
                pnj: 5,
              });
              return;
            }
            // Fermier (étape 1)
            if (mapState[v.r][v.c] === 6) {
              setMessage({
                text: "Bonjour jeune voyageur, j'ai un problème de corbeau qui me vole mes graines dans mon champ. Pouvez-vous m'aider à les chasser ?",
                step: 0,
                pnj: 6,
              });
              return;
            }
            // Pierres
            if ([2, 3, 4].includes(mapState[v.r][v.c])) {
              let memeImg = null;
              let memeName = "";
              if (mapState[v.r][v.c] === 2) {
                memeImg = meme1;
                memeName = "Meme1";
              }
              if (mapState[v.r][v.c] === 3) {
                memeImg = meme2;
                memeName = "Meme2";
              }
              if (mapState[v.r][v.c] === 4) {
                memeImg = meme3;
                memeName = "Meme3";
              }
              setInventaire((prev) => [
                ...prev,
                { id: Date.now(), name: memeName, img: memeImg },
              ]);
              setMapState((prev) => {
                const newMap = prev.map((arr) => [...arr]);
                newMap[v.r][v.c] = 0;
                return newMap;
              });
              break;
            }
          }
        }
        // Changement de map si toutes les pierres sont ramassées
        const nbPierresRestantes =
          mapState.flat().filter((v) => [2, 3, 4].includes(v)).length - 1;
        if (nbPierresRestantes <= 0 && mapIndex < maps.length - 1) {
          setTimeout(() => {
            setMapIndex((idx) => idx + 1);
            setMapState(maps[mapIndex + 1]);
            setPlayerPos({ row: 1, col: 1 });
            setInventaire([]);
          }, 500);
        }
      }
      // AJOUT POUR LA TOUCHE E
      if (e.key.toLowerCase() === "e") {
        if (!aRecupEpouvantails) return; // <-- AJOUT : bloque la touche E tant que tu n'as pas parlé au fermier
        poserEpouvantail();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerPos, mapState, message, mapIndex, inventaire, aRecupEpouvantails]);

  const getImageByDirection = () => perso;

  const poserEpouvantail = () => {
    const index = inventaire.findIndex((item) => item.name === "Epouvantail" && item.count > 0);
    if (index === -1) {
      setMessage("Tu n'as plus d'épouvantail !");
      return;
    }

    // Empêche de poser sur un champ (7)
    if (mapState[playerPos.row][playerPos.col] === 7) {
      setMessage("Tu ne peux pas poser d'épouvantail sur un champ !");
      return;
    }

    // Copie la map
    const newMap = mapState.map((row) => [...row]);
    let corbeauxChasses = 0;

    // Pose l'épouvantail à la position du joueur
    newMap[playerPos.row][playerPos.col] = 9;

    // Rayon de 3 cases autour du joueur
    for (let dr = -3; dr <= 3; dr++) {
      for (let dc = -3; dc <= 3; dc++) {
        const r = playerPos.row + dr;
        const c = playerPos.col + dc;
        if (
          r >= 0 &&
          r < newMap.length &&
          c >= 0 &&
          c < newMap[0].length
        ) {
          if (newMap[r][c] === 8) {
            newMap[r][c] = 0; // Remplace corbeau par sol
            corbeauxChasses++;
          }
        }
      }
    }

    setInventaire((prev) => {
      return prev.map((item) =>
        item.name === "Epouvantail"
          ? { ...item, count: item.count - 1 }
          : item
      ).filter((item) => item.count > 0);
    });

    setMapState(newMap);
    setMessage(
      corbeauxChasses > 0
        ? `Tu as chassé ${corbeauxChasses} corbeau(x) !`
        : "Aucun corbeau dans la zone."
    );
  };

  return (
    <>
      <GameControls onMove={handleMove} />
      <div className="labyrinthe-container">
        {message && (
          <div
            className="labyrinthe-message"
            style={{
              "--pnj-left": `${cellSize * 2}px`,
              "--pnj-top": `${cellSize * 1}px`,
            }}
          >
            {typeof message === "object" ? message.text : message}
            <button onClick={() => setMessage(null)}>
              {message &&
              typeof message === "object" &&
              message.pnj === 6 &&
              message.step === 0
                ? "Suivant (A)"
                : "Fermer (A)"}
            </button>
          </div>
        )}
        <div
          className="labyrinthe-grid"
          ref={gridRef}
          style={{
            gridTemplateColumns: `repeat(${mapState[0].length}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${mapState.length}, ${cellSize}px)`,
            width: "640px",
            height: "640px",
            backgroundImage: `url(${fond})`,
            overflow: "auto",
          }}
        >
          {mapState.map((row, rIdx) =>
            row.map((cell, cIdx) => (
              <div
                key={rIdx + "-" + cIdx}
                className={cell === 1 ? "labyrinthe-wall" : "labyrinthe-cell"}
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
                  <img src={pnj1} alt="gamin" 
                  className="labyrinthe-pnj" />
                )}
                {cell === 6 && (
                  <img src={pnj2} alt="fermier" 
                  className="labyrinthe-pnj" />
                )}
                {cell === 7 && (
                  <img
                    src={fond2}
                    alt="terre labouré"
                    className="labyrinthe-terre"
                  />
                )}
                {cell === 8 && (
                  <img
                    src={corbeau}
                    alt="corbeau"
                    className="labyrinthe-corbeau"
                  />
                )}
                {cell === 9 && (
                  <img
                    src={epouventail}
                    alt="épouvantail"
                    className="labyrinthe-epouventail"
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
                      // Affiche le bouton "A" seulement si la case voisine est un PNJ ou une pierre qui déclenche un(e) message/action
                      const interactifs = [
                        { val: 5, hasMessage: true }, // gamin
                        { val: 6, hasMessage: true }, // fermier
                        { val: 2, hasMessage: true }, // pierre1
                        { val: 3, hasMessage: true }, // pierre2
                        { val: 4, hasMessage: true }, // pierre3
                      ];
                      return voisins.some(
                        (v) =>
                          v.r >= 0 &&
                          v.r < mapState.length &&
                          v.c >= 0 &&
                          v.c < mapState[0].length &&
                          interactifs.some(
                            (obj) =>
                              obj.val === mapState[v.r][v.c] && obj.hasMessage
                          )
                      ) ? (
                        <div className="labyrinthe-action">A</div>
                      ) : null;
                    })()}
                    {/* Indication pour E si épouvantail */}
                    {inventaire.some((item) => item.name === "Epouvantail" && item.count > 0) && (
                      <div className="labyrinthe-action" style={{ left: "40px" }}>E</div>
                    )}
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
            {(() => {
              const grouped = {};
              inventaire.forEach((item) => {
                if (!grouped[item.name]) {
                  grouped[item.name] = { ...item };
                  grouped[item.name].count = item.name === "Epouvantail" ? item.count : 1;
                } else {
                  if (item.name === "Epouvantail") {
                    grouped[item.name].count += item.count;
                  } else {
                    grouped[item.name].count++;
                  }
                }
              });
              return Object.values(grouped).map((item) => (
                <li key={item.name} className="labyrinthe-inventaire-item">
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <img
                      src={item.img}
                      alt={item.name}
                      className="labyrinthe-inventaire-img"
                    />
                    {item.count > 1 && (
                      <span className="labyrinthe-inventaire-count">
                        x{item.count}
                      </span>
                    )}
                  </div>
                  {item.name}
                </li>
              ));
            })()}
          </ul>
        </div>
      </div>
    </>
  );
};

export default GameLabyrinthe;
