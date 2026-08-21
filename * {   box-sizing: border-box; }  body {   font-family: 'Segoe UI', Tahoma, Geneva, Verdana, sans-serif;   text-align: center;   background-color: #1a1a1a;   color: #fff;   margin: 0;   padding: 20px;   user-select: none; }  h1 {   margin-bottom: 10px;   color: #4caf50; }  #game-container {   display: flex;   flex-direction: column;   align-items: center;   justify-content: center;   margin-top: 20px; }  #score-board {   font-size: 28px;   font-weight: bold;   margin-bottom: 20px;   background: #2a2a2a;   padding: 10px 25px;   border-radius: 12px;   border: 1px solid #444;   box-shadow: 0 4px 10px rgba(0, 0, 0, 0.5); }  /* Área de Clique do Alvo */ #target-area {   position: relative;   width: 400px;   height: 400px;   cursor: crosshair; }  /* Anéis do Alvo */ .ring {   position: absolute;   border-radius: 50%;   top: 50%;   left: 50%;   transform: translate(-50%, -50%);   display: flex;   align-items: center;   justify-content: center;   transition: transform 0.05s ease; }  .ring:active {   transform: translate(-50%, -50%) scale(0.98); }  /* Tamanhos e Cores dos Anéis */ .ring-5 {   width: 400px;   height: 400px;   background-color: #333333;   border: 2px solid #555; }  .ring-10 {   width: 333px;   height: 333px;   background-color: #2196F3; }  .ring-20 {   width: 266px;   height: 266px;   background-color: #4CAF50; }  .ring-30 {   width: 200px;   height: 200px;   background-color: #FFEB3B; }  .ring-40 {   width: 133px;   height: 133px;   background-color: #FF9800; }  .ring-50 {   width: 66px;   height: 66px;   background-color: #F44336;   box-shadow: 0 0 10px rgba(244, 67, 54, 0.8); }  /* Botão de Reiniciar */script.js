// Estado do jogo
let totalScore = 0;

// Elementos do DOM
const scoreElement = document.getElementById('score');
const targetArea = document.getElementById('target-area');
const resetBtn = document.getElementById('reset-btn');

// Evento de clique no alvo
targetArea.addEventListener('click', (event) => {
  const clickedElement = event.target;
  
  if (clickedElement.hasAttribute('data-points')) {
    const points = parseInt(clickedElement.getAttribute('data-points'), 10);
    totalScore += points;
    scoreElement.textContent = totalScore;
  }
});

// Evento para reiniciar a pontuação
resetBtn.addEventListener('click', () => {
  totalScore = 0;
  scoreElement.textContent = totalScore;
});