const socket = io('http://localhost:3000'); // Replace with your server address

let gameBoardElement = document.getElementById('gameboard');
let messageElement = document.getElementById('message');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('gameState', (gameState) => {
  updateGameBoard(gameState.board);
  updateMessage(gameState);
});

function updateGameBoard(board) {
  gameBoardElement.innerHTML = ""; // Clear previous board
  for (let i = 0; i < board.length; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = board[i];
    cell.addEventListener('click', () => handleClick(i));
    gameBoardElement.appendChild(cell);
  }
}

function updateMessage(gameState) {
  if (gameState.winner) {
    messageElement.textContent = `The winner is ${gameState.winner}`;
  } else {
    messageElement.textContent = `It's ${gameState.currentPlayer}'s turn`;
  }
}

function handleClick(position) {
  socket.emit('move', position);
}







