<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jogo de Tiro ao Alvo</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      text-align: center;
      background-color: #1a1a1a;
      color: #fff;
      margin: 0;
      padding: 20px;
      user-select: none;
    }

    h1 {
      margin-bottom: 10px;
      color: #4caf50;
    }

    #game-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }

    #score-board {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 20px;
      background: #2a2a2a;
      padding: 10px 25px;
      border-radius: 12px;
      border: 1px solid #444;
      box-shadow: 0 4px 10px rgba(0,0,0,0.5);
    }

    /* Área do Alvo */
    #target-area {
      position: relative;
      width: 400px;
      height: 400px;
      cursor: crosshair;
    }

    /* Anéis do Alvo */
    .ring {
      position: absolute;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.05s ease;
    }

    .ring:active {
      transform: translate(-50%, -50%) scale(0.98);
    }

    /* Anéis por Pontuação */
    .ring-5  { width: 400px; height: 400px; background-color: #333333; border: 2px solid #555; }
    .ring-10 { width: 333px; height: 333px; background-color: #2196F3; }
    .ring-20 { width: 266px; height: 266px; background-color: #4CAF50; }
    .ring-30 { width: 200px; height: 200px; background-color: #FFEB3B; }
    .ring-40 { width: 133px; height: 133px; background-color: #FF9800; }
    .ring-50 { width: 66px;  height: 66px;  background-color: #F44336; box-shadow: 0 0 10px rgba(244, 67, 54, 0.8); }

    /* Botão Reset */
    #reset-btn {
      margin-top: 25px;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s;
    }

    #reset-btn:hover {
      background-color: #d32f2f;
    }
  </style>
</head>
<body>

  <h1>🎯 Tiro ao Alvo</h1>
  
  <div id="game-container">
    <div id="score-board">Pontuação: <span id="score">0</span></div>
    
    <div id="target-area">
      <!-- Anéis do menor para o maior em pontuação -->
      <div class="ring ring-5" data-points="5">
        <div class="ring ring-10" data-points="10">
          <div class="ring ring-20" data-points="20">
            <div class="ring ring-30" data-points="30">
              <div class="ring ring-40" data-points="40">
                <div class="ring ring-50" data-points="50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button id="reset-btn" onclick="resetGame()">Zerar Pontuação</button>
  </div>

  <script>
    let totalScore = 0;
    const scoreElement = document.getElementById('score');
    const targetArea = document.getElementById('target-area');

    targetArea.addEventListener('click', (event) => {
      // Pega o anel mais interno clicado
      const clickedElement = event.target;
      
      if (clickedElement.hasAttribute('data-points')) {
        const points = parseInt(clickedElement.getAttribute('data-points'), 10);
        totalScore += points;
        scoreElement.textContent = totalScore;
      }
    });

    function resetGame() {
      totalScore = 0;
      scoreElement.textContent = totalScore;
    }
  </script>
</body>
</html>
