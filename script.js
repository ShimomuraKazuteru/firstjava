const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const highScoreDisplay = document.getElementById('highscore'); 
const messageDisplay = document.getElementById('message');
const continueButton = document.getElementById('continue-button');
const hitSound = document.getElementById('hit-sound');
const moveSound = document.getElementById('move-sound');

let score = 0;
let timeLeft = 20;
let gameInterval;
let moveInterval;
let startTime;

function moveTarget() {
  const x = Math.random() * (window.innerWidth - target.clientWidth);
  const y = Math.random() * (window.innerHeight - target.clientHeight);
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
  moveSound.play();
}

function handleClick() {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
  hitSound.currentTime = 0; // 再生位置をリセット
  hitSound.play().catch(error => console.log('Audio play error:', error));
  moveTarget();
}

function startGame() {
  console.log("Game started"); // デバッグ用
  score = 0;
  timeLeft = 20;
  startTime = Date.now();
  scoreDisplay.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time left: ${timeLeft}`;
  const highScore = parseInt(localStorage.getItem('highScore')) || 0; // 最高スコアを取得
  highScoreDisplay.textContent = `High Score: ${highScore}`; // 最高スコアを表示
  messageDisplay.textContent = '';
  continueButton.style.display = 'none';
  target.style.pointerEvents = 'auto'; 
  target.addEventListener('click', handleClick);
  moveTarget();
  
  gameInterval = requestAnimationFrame(updateGame); // 毎秒呼び出されるように設定
  moveInterval = setInterval(moveTarget, 2000); // ターゲットが2秒ごとに自動で移動する
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
    gameInterval = requestAnimationFrame(updateGame); // 再度呼び出し
  }
}

function endGame() {
  messageDisplay.textContent = 'Game Over';
  continueButton.style.display = 'block';
  target.style.pointerEvents = 'none'; // ターゲットのクリックを無効にする
  target.removeEventListener('click', handleClick);
  const highScore = parseInt(localStorage.getItem('highScore')) || 0;
  if (score > highScore) {
    localStorage.setItem('highScore', score);
    highScoreDisplay.textContent = `High Score: ${score}`; // 最高スコアを更新
  }
}

window.onload = () => {
  continueButton.style.display = 'block';
  const highScore = parseInt(localStorage.getItem('highScore')) || 0; // 最高スコアを取得
  highScoreDisplay.textContent = `High Score: ${highScore}`; // 最高スコアを表示
};
