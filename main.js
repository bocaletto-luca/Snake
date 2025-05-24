/* main.js - Release definitiva del core di Snake con supporto per colori personalizzati, salvataggio singolo e funzioni esposte al controller */

var mainGame = (function(){
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const cellSize = 20;
  let canvasCols, canvasRows;
  let gameInterval = null;
  
  // Stato interno del gioco
  let gameState = {
    playerName: "",
    snake: [],
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    food: null,
    score: 0,
    foodsEaten: 0,
    currentLevel: 1,
    running: false,
    obstacles: [],
    snakeHeadColor: "#FFEB3B",
    snakeBodyColor: "#4CAF50",
    recordSaved: false // Flag per evitare duplicazioni nel salvataggio
  };
  
  /* --- RIDIMENSIONAMENTO DEL CANVAS --- */
  function resizeCanvas(){
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;
    canvasCols = Math.floor(canvas.width / cellSize);
    canvasRows = Math.floor(canvas.height / cellSize);
  }
  window.addEventListener("resize", function(){
    resizeCanvas();
    if(gameState.running){
      drawGame();
    }
  });
  
  /* --- FUNZIONI DI SETUP DEL GIOCO --- */
  function setPlayerName(name) {
    gameState.playerName = name;
  }
  
  function setSnakeColors(headColor, bodyColor) {
    gameState.snakeHeadColor = headColor;
    gameState.snakeBodyColor = bodyColor;
  }
  
  // Inizializza le variabili per il livello corrente
  function initLevel(){
    gameState.recordSaved = false; // Ripristina il flag all'inizio di ogni livello
    gameState.snake = [];
    let startX = Math.floor(canvasCols / 4);
    let startY = Math.floor(canvasRows / 2);
    for(let i = 0; i < 4; i++){
      gameState.snake.unshift({ x: startX + i, y: startY });
    }
    gameState.direction = { x: 1, y: 0 };
    gameState.nextDirection = { x: 1, y: 0 };
    gameState.food = null;
    gameState.foodsEaten = 0;
    // Carica gli ostacoli definiti in stage.js per il livello corrente
    let stageConfig = window.stages[gameState.currentLevel - 1];
    gameState.obstacles = stageConfig.obstacles || [];
    placeFood();
  }
  
  function startGame(){
    resizeCanvas();
    gameState.score = 0;
    gameState.currentLevel = 1;
    updateHUD();
    initLevel();
    gameState.running = true;
    startGameLoop();
  }
  
  function startGameLoop(){
    let stageConfig = window.stages[gameState.currentLevel - 1];
    let speed = stageConfig.speed;
    if(gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, speed);
  }
  
  /* --- LOGICA DI AGGIORNAMENTO --- */
  function updateGame(){
    gameState.direction = gameState.nextDirection;
    let head = gameState.snake[0];
    let newX = head.x + gameState.direction.x;
    let newY = head.y + gameState.direction.y;
    // Wrap-around
    if(newX < 0) newX = canvasCols - 1;
    if(newX >= canvasCols) newX = 0;
    if(newY < 0) newY = canvasRows - 1;
    if(newY >= canvasRows) newY = 0;
    let newHead = { x: newX, y: newY };
    
    // Collisione con se stesso
    if(gameState.snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)){
      endGame();
      return;
    }
    // Collisione con ostacoli
    for(let obs of gameState.obstacles){
      if(newHead.x >= obs.x && newHead.x < obs.x + obs.w &&
         newHead.y >= obs.y && newHead.y < obs.y + obs.h){
        endGame();
        return;
      }
    }
    
    gameState.snake.unshift(newHead);
    
    if(newHead.x === gameState.food.x && newHead.y === gameState.food.y){
      gameState.score += 10;
      gameState.foodsEaten++;
      updateHUD();
      placeFood();
      let stageConfig = window.stages[gameState.currentLevel - 1];
      if(gameState.foodsEaten >= stageConfig.foodRequired){
        if(gameState.currentLevel < window.stages.length){
          gameState.currentLevel++;
          updateHUD();
          initLevel();
          startGameLoop();
          return;
        } else {
          // Ha completato l'ultimo livello
          window.showToast("Complimenti " + gameState.playerName + ", hai completato il gioco!", 3000);
          endGame();
          return;
        }
      }
    } else {
      gameState.snake.pop();
    }
    
    drawGame();
  }
  
  /* --- DISEGNO DEL GIOCO --- */
  function drawGame(){
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Disegna il cibo
    if(gameState.food){
      ctx.fillStyle = "#F44336";
      ctx.fillRect(gameState.food.x * cellSize, gameState.food.y * cellSize, cellSize, cellSize);
    }
    // Disegna gli ostacoli
    ctx.fillStyle = "#888";
    gameState.obstacles.forEach(obs => {
      ctx.fillRect(obs.x * cellSize, obs.y * cellSize, obs.w * cellSize, obs.h * cellSize);
    });
    // Disegna il serpente
    gameState.snake.forEach((seg, idx) => {
      ctx.fillStyle = idx === 0 ? gameState.snakeHeadColor : gameState.snakeBodyColor;
      ctx.fillRect(seg.x * cellSize, seg.y * cellSize, cellSize, cellSize);
      ctx.strokeStyle = "#000";
      ctx.strokeRect(seg.x * cellSize, seg.y * cellSize, cellSize, cellSize);
    });
  }
  
  function placeFood(){
    let valid = false, food;
    while(!valid){
      food = { x: Math.floor(Math.random() * canvasCols), y: Math.floor(Math.random() * canvasRows) };
      valid = !gameState.snake.some(seg => seg.x === food.x && seg.y === food.y);
      if(valid){
        for(let obs of gameState.obstacles){
          if(food.x >= obs.x && food.x < obs.x + obs.w &&
             food.y >= obs.y && food.y < obs.y + obs.h){
            valid = false;
            break;
          }
        }
      }
    }
    gameState.food = food;
  }
  
  /* --- HUD --- */
  function updateHUD(){
    document.getElementById("scoreDisplay").textContent = "Punteggio: " + gameState.score;
    document.getElementById("levelDisplay").textContent = "Livello: " + gameState.currentLevel + "/20";
  }
  
  /* --- FUNZIONI ESPOSE AL CONTROLLO --- */
  function setDirection(newDir){
    // Impedisce inversione diretta
    if ((newDir.x === -gameState.direction.x && newDir.y === 0) ||
        (newDir.y === -gameState.direction.y && newDir.x === 0)) return;
    gameState.nextDirection = newDir;
  }
  
  // Restituisce le coordinate in pixel della testa del serpente
  function getSnakeHeadPixel(){
    if(gameState.snake.length > 0){
      let head = gameState.snake[0];
      return { x: head.x * cellSize + cellSize / 2, y: head.y * cellSize + cellSize / 2 };
    }
    return { x: 0, y: 0 };
  }
  
  function endGame(){
    clearInterval(gameInterval);
    gameState.running = false;
    // Mostra il messaggio di Game Over tramite toast
    window.showToast("Game Over! " + gameState.playerName + "\nPunteggio: " + gameState.score + "\nLivello: " + gameState.currentLevel, 3000);
    if (!gameState.recordSaved) {
      saveRecord(gameState.playerName, gameState.score, gameState.currentLevel);
      gameState.recordSaved = true;
    }
  }
  
  function saveRecord(name, score, level){
    let formData = new FormData();
    formData.append("name", name);
    formData.append("score", score);
    formData.append("level", level);
    fetch("save.php", { method: "POST", body: formData })
      .then(response => response.json())
      .then(data => console.log("Record salvato:", data))
      .catch(err => console.error("Errore nel salvataggio del record:", err));
  }
  
  return {
    setPlayerName: setPlayerName,
    setSnakeColors: setSnakeColors,
    setDirection: setDirection,
    getSnakeHeadPixel: getSnakeHeadPixel,
    startGame: startGame,
    endGame: endGame
  };
})();
