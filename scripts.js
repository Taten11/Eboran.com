const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const player1Name = document.getElementById('player1-name');
const player2Name = document.getElementById('player2-name');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let scores = { X: 0, O: 0 };

function checkWinCondition(board, player) {
    // Check rows, columns, and diagonals
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]  // diagonals
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === player)
    );
}

function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-cell');

    if (board[index] === '' && !checkWinCondition(board, 'X') && !checkWinCondition(board, 'O')) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinCondition(board, currentPlayer)) {
            alert(`${currentPlayer} wins!`);
            scores[currentPlayer]++;
            updateScores();
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function updateScores() {
    player1Score.textContent = scores['X'];
    player2Score.textContent = scores['O'];
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
