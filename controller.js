/* controller.js - Release definitiva con gestione multi-input e toast notifications */

document.addEventListener("DOMContentLoaded", function() {
  // Funzione "toast" per mostrare notifiche temporanee a schermo
  window.showToast = function(message, duration = 2000) {
    let toast = document.createElement("div");
    toast.innerText = message;
    Object.assign(toast.style, {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      zIndex: "10000",
      opacity: "0",
      transition: "opacity 0.5s ease"
    });
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
    });
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 500);
    }, duration);
  };

  /* ----- EVENTI UI ----- */
  const startBtn = document.getElementById("startGameBtn");
  startBtn.addEventListener("click", function() {
    const name = document.getElementById("playerName").value.trim();
    if (name === "") {
      showToast("Inserisci il tuo nome per iniziare!", 2500);
      return;
    }
    // Legge le preferenze per i colori del serpente
    const headColorElem = document.getElementById("snakeHeadColor");
    const bodyColorElem = document.getElementById("snakeBodyColor");
    const headColor = headColorElem ? headColorElem.value : "#FFEB3B";
    const bodyColor = bodyColorElem ? bodyColorElem.value : "#4CAF50";

    mainGame.setPlayerName(name);
    if (typeof mainGame.setSnakeColors === "function") {
      mainGame.setSnakeColors(headColor, bodyColor);
    }
    // Switch delle schermate: da Home a Game
    document.getElementById("homeScreen").classList.remove("active");
    document.getElementById("gameScreen").classList.add("active");
    mainGame.startGame();
  });

  const exitBtn = document.getElementById("exitGameBtn");
  exitBtn.addEventListener("click", function() {
    // Se il gioco è ancora in esecuzione (anche se finito) chiamare endGame per assicurarsi
    mainGame.endGame();
    // Forza il cambio schermata: nasconde "gameScreen" e mostra "homeScreen"
    document.getElementById("gameScreen").classList.remove("active");
    document.getElementById("homeScreen").classList.add("active");
  });
  /* ----- FINE EVENTI UI ----- */


  /* ----- GESTIONE DEGLI INPUT ----- */
  // 1. Tastiera (Arrow keys / WASD)
  window.addEventListener("keydown", function(e) {
    let direction = null;
    if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
      direction = { x: 0, y: -1 };
    } else if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") {
      direction = { x: 0, y: 1 };
    } else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
      direction = { x: -1, y: 0 };
    } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
      direction = { x: 1, y: 0 };
    }
    if (direction && typeof mainGame.setDirection === "function") {
      mainGame.setDirection(direction);
    }
  });

  // 2. Mouse: clic sul canvas per determinare la direzione in base alla posizione rispetto alla testa
  const canvas = document.getElementById("gameCanvas");
  canvas.addEventListener("click", function(e) {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    if (typeof mainGame.getSnakeHeadPixel === "function") {
      const head = mainGame.getSnakeHeadPixel();
      const dx = clickX - head.x;
      const dy = clickY - head.y;
      let newDir = (Math.abs(dx) > Math.abs(dy))
                   ? (dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 })
                   : (dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
      if (newDir && typeof mainGame.setDirection === "function") {
        mainGame.setDirection(newDir);
      }
    }
  });

  // 3. Touch: supporta cambi di direzione tramite swipe
  let touchStartX = null, touchStartY = null;
  canvas.addEventListener("touchstart", function(e) {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  });
  canvas.addEventListener("touchmove", function(e) {
    if (touchStartX === null || touchStartY === null) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartX;
    const diffY = touch.clientY - touchStartY;
    let newDir = (Math.abs(diffX) > Math.abs(diffY))
                   ? (diffX > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 })
                   : (diffY > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
    if (newDir && typeof mainGame.setDirection === "function") {
      mainGame.setDirection(newDir);
    }
    touchStartX = null;
    touchStartY = null;
  });

  // 4. Gamepad: utilizza la Gamepad API per rilevare input da joypad
  let gamepadIndex = null;
  window.addEventListener("gamepadconnected", function(e) {
    gamepadIndex = e.gamepad.index;
    showToast("Gamepad connesso: " + e.gamepad.id, 2000);
  });
  window.addEventListener("gamepaddisconnected", function(e) {
    if (gamepadIndex === e.gamepad.index) {
      gamepadIndex = null;
      showToast("Gamepad disconnesso", 2000);
    }
  });
  function pollGamepad() {
    if (gamepadIndex !== null) {
      const gp = navigator.getGamepads()[gamepadIndex];
      if (gp) {
        let newDir = null;
        if (gp.buttons[12] && gp.buttons[12].pressed) {
          newDir = { x: 0, y: -1 };
        } else if (gp.buttons[13] && gp.buttons[13].pressed) {
          newDir = { x: 0, y: 1 };
        } else if (gp.buttons[14] && gp.buttons[14].pressed) {
          newDir = { x: -1, y: 0 };
        } else if (gp.buttons[15] && gp.buttons[15].pressed) {
          newDir = { x: 1, y: 0 };
        }
        if (newDir && typeof mainGame.setDirection === "function") {
          mainGame.setDirection(newDir);
        }
      }
    }
    requestAnimationFrame(pollGamepad);
  }
  pollGamepad();
  /* ----- FINE GESTIONE INPUT ----- */
});
