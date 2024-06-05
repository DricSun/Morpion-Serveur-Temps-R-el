import express from 'express';
const app = express();
import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } }); 

let game = {
  board: ['', '', '', '', '', '', '', '', ''],
  currentPlayer: 'X',
  winner: null
};

io.on('connection', (socket) => {
  console.log('New player connected:', socket.id);

  socket.emit('gameState', game);

  socket.on('move', (position) => {
    if (game.board[position] === '' && game.winner === null) {
      game.board[position] = game.currentPlayer;
      game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';

      checkWinner();

      socket.emit('gameState', game);
      io.emit('gameState', game); 
    }
  });

  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
  });
});

function checkWinner() {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (game.board[i] === game.board[i + 3] && game.board[i] === game.board[i + 6] && game.board[i] !== '') {
        game.winner = game.board[i];
        return;
      }
    }
  
    for (let i = 0; i < 3; i++) {
      if (game.board[i] === game.board[i + 3 * 3] && game.board[i] === game.board[i + 6 * 3] && game.board[i] !== '') {
        game.winner = game.board[i];
        return;
      }
    }
  
    if (game.board[0] === game.board[4] && game.board[0] === game.board[8] && game.board[0] !== '') {
      game.winner = game.board[0];
      return;
    }
  
    if (game.board[2] === game.board[4] && game.board[2] === game.board[6] && game.board[2] !== '') {
      game.winner = game.board[2];
      return;
    }
  
    if (!game.board.includes('') && game.winner === null) {
      game.winner = 'tie';
    }
  }
  

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

