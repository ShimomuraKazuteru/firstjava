const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const highScoreDisplay = document.getElementById('highscore'); 
const messageDisplay = document.getElementById('message');
const continueButton = document.getElementById('continue-button');

let score = 0;
let timeLeft = 20;
let gameInterval;
let moveInterval;
let startTime;

const hitSound = new Audio('hit.wav');
const moveSound = new Audio('laugh.mp3');

// 初期化時に各音声ファイルのロードを試みる
hitSound.load();
moveSound.load();

function moveTarget() {
  const x = Math.random() * (window.innerWidth - target.clientWidth);
  const y = Math.random() * (window.innerHeight - target.clientHeight);
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
  moveSound.currentTime = 0;
  moveSound.play().catch(error => console.log('Move sound play error:', error));
}

function handleClick() {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
  console.log('Target clicked'); // デバッグ用
  hitSound.currentTime = 0;
  hitSound.play().catch(error => console.log('Hit sound play error:', error));
  moveTarget();
}

function startGame() {
  console.log("Game started"); // デバッグ用
  score = 0;
  timeLeft = 20;
  startTime = Date.now();
  scoreDisplay.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time left: ${timeLeft}`;
  const highScore = parseInt(localStorage.getItem('highScore')) || 0;
  highScoreDisplay.textContent = `High Score: ${highScore}`;
  messageDisplay.textContent = '';
  continueButton.style.display = 'none';
  target.style.pointerEvents = 'auto';
  target.addEventListener('click', handleClick);
  moveTarget();
  
  gameInterval = requestAnimationFrame(updateGame);
  moveInterval = setInterval(moveTarget, 2000);
}

function updateGame() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  timeLeft = 20 - elapsedTime;
  timerDisplay.textContent = `Time left: ${timeLeft}`;

  if (timeLeft <= 0) {
    cancelAnimationFrame(gameInterval);
    clearInterval(moveInterval);
    endGame();
  } else {
    gameInterval = requestAnimationFrame(updateGame);
  }
}

function endGame() {
  messageDisplay.textContent = 'Game Over';
  continueButton.style.display = 'block';
  target.style.pointerEvents = 'none';
  target.removeEventListener('click', handleClick);
  const highScore = parseInt(localStorage.getItem('highScore')) || 0;
  if (score > highScore) {
    localStorage.setItem('highScore', score);
    highScoreDisplay.textContent = `High Score: ${score}`;
  }
}

window.onload = () => {
  continueButton.style.display = 'block';
  const highScore = parseInt(localStorage.getItem('highScore')) || 0;
  highScoreDisplay.textContent = `High Score: ${highScore}`;
};
