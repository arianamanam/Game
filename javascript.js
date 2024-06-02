const gameContainer = document.querySelector(".game-page");
const panel = document.querySelector(".game-panel");
const timerContianer = document.querySelector(".timer");
const startButton = document.querySelector(".start-btn");
const endButton = document.getElementById("end");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const livesContianer = document.querySelector(".lives");
const finalScoreDisplay = document.getElementById("final-score");
const closeModalBtn = document.getElementById("close_modal");
const changeThemeBtn = document.getElementById("theme");
const modalDialog = document.querySelector(".modal--dialog");
const modalFooter = document.querySelector(".btn btn-secondary");

changeThemeBtn.addEventListener("click", changeTheme);
startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);
closeModalBtn.addEventListener("click", onCloseModal);

let score = 0;
let lives = 3;
let timerInterval;
let second = 0;
let minute = 0;
let gameInterval;
let shapeFallInterval;
let isBlueMode=false

function timer() {
  timerInterval = setInterval(function () {
    second++;

    if (second === 60) {
      minute++;
      second = 0;
    }
    let timeElapsed = `${minute.toString().padStart(2, "0")}:${second
      .toString()
      .padStart(2, "0")}`;

    document.querySelector(".timer").innerText = timeElapsed;
    document.querySelector(".time-spent").innerText = timeElapsed;
    document.querySelector(".final-score").innerText = score;
  }, 1000);
}

function startGame() {
  score = 0;
  lives = 3;
  second = 0;
  minute = 0;
  updateScore();
  updateLives();
  gameInterval = setInterval(createShape, 900);
  shapeFallInterval = setInterval(moveShapes, 15);
  timer();
  startButton.disabled = true;
  endButton.disabled = false;
}

function endGame() {
  document.getElementsByClassName("modal")[0].style.display = "flex";

  clearInterval(gameInterval);
  clearInterval(shapeFallInterval);
  clearInterval(timerInterval);
  document.querySelectorAll(".shape").forEach((shape) => shape.remove());
  finalScoreDisplay.textContent = score;
  startButton.disabled = false;
  endButton.disabled = false;
  debugger
  if(isBlueMode){
    const modal= document.querySelector('.modal-dialog').classList.add("color-theme-blue") 
  }else{
    document.querySelector('.modal-dialog').classList.remove("color-theme-blue")
  }
}

function createShape() {
  const shapeTypes = ["circle", "square", "triangle", "trapezoid"];
  const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
  const shape = document.createElement("div");
  shape.classList.add("shape", randomType);
  if (randomType === "trapezoid" || randomType === "triangle") {
    shape.style.borderBottomColor = getRandomColor();
  } else {
    shape.style.backgroundColor = getRandomColor();
  }

  shape.style.top = "0px";
  shape.style.left = `${Math.random() * (gameContainer.offsetWidth - 50)}px`;
  shape.addEventListener("click", () => {
    shape.remove();
    score++;
    updateScore();
  });
  gameContainer.appendChild(shape);
}

function moveShapes() {
  document.querySelectorAll(".shape").forEach((shape) => {
    const currentTop = parseInt(shape.style.top);
    shape.style.top = `${currentTop + 2}px`;
    if (currentTop > gameContainer.offsetHeight - 50) {
      shape.remove();
      lives--;
      updateLives();
      if (lives <= 0) {
        endGame();
      }
    }
  });
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function updateLives() {
  livesDisplay.textContent = lives;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function onCloseModal() {
  document.getElementsByClassName("modal")[0].style.display = "none";
}

function changeTheme() {
  debugger

  panel.classList.toggle("theme-panel");
  gameContainer.classList.toggle("theme-game-contianer");
  timerContianer.classList.toggle("theme-gold");
  scoreDisplay.classList.toggle("theme-gold");
  startButton.classList.toggle("theme-startBtn");
  endButton.classList.toggle("theme-endBtn");
  livesContianer.classList.toggle("theme-lives-container");
  changeThemeBtn.classList.toggle("pink-theme");
  
  if (changeThemeBtn.innerText === "Change it to Pink") {
    changeThemeBtn.innerText = "Change it to Blue";
  } else {
    changeThemeBtn.innerText = "Change it to Pink";
  }
  isBlueMode=!isBlueMode
}
