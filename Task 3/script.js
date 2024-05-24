const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    function handleCellClick(cellClicked) {
      const index = cellClicked.dataset.index;
      if (gameState[index] !== '' || !gameActive) return;
      gameState[index] = currentPlayer;
      cellClicked.textContent = currentPlayer;
      if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
      }
      if (checkTie()) {
        message.textContent = 'It\'s a tie!';
        gameActive = false;
        return;
      }
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin() {
      return winningCombinations.some(combination => {
        return combination.every(index => {
          return gameState[index] === currentPlayer;
        });
      });
    }

    function checkTie() {
      return gameState.every(cell => cell !== '');
    }

    function restartGame() {
      currentPlayer = 'X';
      gameActive = true;
      gameState = ['', '', '', '', '', '', '', '', ''];
      cells.forEach(cell => {
        cell.textContent = '';
      });
      message.textContent = '';
    }

    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        handleCellClick(cell);
      });
    });