// Serveur Node.js avec socket.io pour jeu multijoueur
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let players = {};

io.on('connection', (socket) => {
  // Nouveau joueur
  players[socket.id] = { id: socket.id, position: { x: 100, y: 100 } };
  io.emit('gameStateUpdate', { players: Object.values(players) });

  // Mouvement du joueur
  socket.on('playerMove', (data) => {
    if (players[socket.id]) {
      players[socket.id].position = data.position;
      io.emit('gameStateUpdate', { players: Object.values(players) });
    }
  });

  // Déconnexion
  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('gameStateUpdate', { players: Object.values(players) });
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Serveur Socket.io lancé sur le port ${PORT}`);
});
