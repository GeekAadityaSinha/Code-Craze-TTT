// script.js

const cells = document.querySelectorAll("[data-cell]");
const statusText = document.querySelector(".status");
const restartButton = document.querySelector(".restart-button");
let isXTurn = true;
let board = Array(9).fill(null);

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove("x");
    cell.classList.remove("o");
    cell.textContent = '';  // Clear any text content
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  statusText.innerText = "Player X's turn";
  isXTurn = true;
  board = Array(9).fill(null);
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? "x" : "o";
  const cellIndex = [...cells].indexOf(cell);

  placeMark(cell, currentClass);
  board[cellIndex] = currentClass;

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();  // Add "X" or "O" as text
}

function swapTurns() {
  isXTurn = !isXTurn;
  statusText.innerText = `Player ${isXTurn ? "X" : "O"}'s turn`;
}

function checkWin(currentClass) {
  return winPatterns.some(pattern => {
    return pattern.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return board.every(cell => cell !== null);
}

function endGame(draw) {
  if (draw) {
    statusText.innerText = "It's a Draw!";
  } else {
    statusText.innerText = `Player ${isXTurn ? "X" : "O"} Wins!`;
    createConfetti(); // Trigger confetti on win
  }
  cells.forEach(cell => cell.removeEventListener("click", handleClick));
}

function createConfetti() {
  const confettiContainer = document.getElementById('confetti-container');
  confettiContainer.innerHTML = ''; // Clear previous confetti
  confettiContainer.style.display = 'block';

  // Generate multiple confetti pieces
  for (let i = 0; i < 50; i++) {
    const confettiPiece = document.createElement('div');
    confettiPiece.classList.add('confetti-piece');
    confettiPiece.style.backgroundColor = randomColor();
    confettiPiece.style.left = Math.random() * 100 + 'vw';
    confettiPiece.style.animationDelay = Math.random() * 2 + 's';
    confettiContainer.appendChild(confettiPiece);
  }

  // Hide confetti after animation
  setTimeout(() => {
    confettiContainer.style.display = 'none';
  }, 3000);
}

// Random color for each confetti piece
function randomColor() {
  const colors = ['#ff6347', '#4682b4', '#ffb6c1', '#32cd32', '#ffa500'];
  return colors[Math.floor(Math.random() * colors.length)];
}

restartButton.addEventListener("click", startGame);

startGame();
