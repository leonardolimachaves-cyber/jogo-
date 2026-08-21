let score = 0;
let timeLeft = 30;
let timerInterval = null;
let isPlaying = false;

// Elementos da DOM
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const highScoreEl = document.getElementById('high-score');
const playArea = document.getElementById('play-area');
const target = document.getElementById('target');
const overlay = document.getElementById('overlay');
const finalScoreEl = document.getElementById('final-score');
const startBtn = document.getElementById('start-btn');

// Carregar Recorde do LocalStorage
let highScore = localStorage.getItem('target_high_score') || 0;
highScoreEl.textContent = highScore;

// Iniciar Jogo
startBtn.addEventListener('click', startGame);

function startGame() {
  score = 0;
  timeLeft = 30;
  isPlaying = true;

  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
  overlay.classList.add('hidden');

  moveTarget();

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// Mover o Alvo Aleatoriamente
function moveTarget() {
  const areaWidth = playArea.clientWidth;
  const areaHeight = playArea.clientHeight;
  const targetSize = 160;

  // Garante que o alvo fique dentro dos limites da tela
  const maxX = areaWidth - targetSize;
  const maxY = areaHeight - targetSize;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  target.style.left = `${randomX + targetSize / 2}px`;
  target.style.top = `${randomY + targetSize / 2}px`;
}

// Capturar os Disparos
target.addEventListener('click', (event) => {
  if (!isPlaying) return;

  const clickedRing = event.target;

  if (clickedRing.hasAttribute('data-points')) {
    const points = parseInt(clickedRing.getAttribute('data-points'), 10);
    score += points;
    scoreEl.textContent = score;

    // Criar animação do número de pontos subindo
    showFloatingText(`+${points}`, event.clientX, event.clientY);

    // Reposiciona o alvo após cada acerto
    moveTarget();
  }
});

// Texto animado ao acertar (+50, +40...)
function showFloatingText(text, x, y) {
  const rect = playArea.getBoundingClientRect();
  const floatingEl = document.createElement('div');
  floatingEl.className = 'floating-text';
  floatingEl.textContent = text;
  
  floatingEl.style.left = `${x - rect.left}px`;
  floatingEl.style.top = `${y - rect.top - 10}px`;

  playArea.appendChild(floatingEl);

  setTimeout(() => {
    floatingEl.remove();
  }, 800);
}

// Finalizar Jogo
function endGame() {
  isPlaying = false;
  clearInterval(timerInterval);

  finalScoreEl.textContent = score;
  overlay.classList.remove('hidden');

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('target_high_score', highScore);
    highScoreEl.textContent = highScore;
  }
}