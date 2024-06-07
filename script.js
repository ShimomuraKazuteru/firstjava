// script.js
let score = 0;
let timeLeft = 20;
let highScore = 0;
let gameInterval;
let gameRunning = false;

const target = document.getElementById('target');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('message');
const highScoreElement = document.getElementById('highscore');
const continueButton = document.getElementById('continue-button');
const hitSound = document.getElementById('hit-sound');
const moveSound = document.getElementById('move-sound');

function startGame() {
  score = 0;
  timeLeft = 20;
  gameRunning = true;
  messageElement.textContent = '';
  continueButton.style.display = 'none';
  scoreElement.textContent = `Score: ${score}`;
  timerElement.textContent = `Time left: ${timeLeft}`;
  highScoreElement.textContent = `High Score: ${highScore}`;
  moveTarget();
  gameInterval = setInterval(updateGame, 1000);
}

function endGame() {
  gameRunning = false;
  clearInterval(gameInterval);
  messageElement.textContent = 'Game Over';
  continueButton.style.display = 'block';
  if (score > highScore) {
    highScore = score;
    highScoreElement.textContent = `High Score: ${highScore}`;
  }
}

function updateGame() {
  if (timeLeft > 0) {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft}`;
  } else {
    endGame();
  }
}

function moveTarget() {
  if (!gameRunning) return;
  const gameArea = document.getElementById('game');
  const maxWidth = gameArea.clientWidth - target.offsetWidth;
  const maxHeight = gameArea.clientHeight - target.offsetHeight;
  const randomX = Math.floor(Math.random() * maxWidth);
  const randomY = Math.floor(Math.random() * maxHeight);
  target.style.left = `${randomX}px`;
  target.style.top = `${randomY}px`;
  moveSound.play();
}

target.addEventListener('click', () => {
  if (!gameRunning) return;
  score++;
  scoreElement.textContent = `Score: ${score}`;
  hitSound.play();
  moveTarget();
});

continueButton.addEventListener('click', startGame);
