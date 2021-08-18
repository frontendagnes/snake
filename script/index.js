document.addEventListener("DOMContentLoaded", () => {
  //#region tworzymy polanszę
  const board = document.querySelector(".board");
  let field;
  const drawBoard = () => {
    for (let i = 0; i < 225; i++) {
      const div = document.createElement("div");
      board.appendChild(div);
    }
    field = document.querySelectorAll(".board div");
  };
  drawBoard();
  //#endregion
  // field.forEach((item, index) => (item.textContent = index));
  //#region Variables
  const start = document.querySelector(".start");
  const stop = document.querySelector(".stop");
  const text = document.querySelector(".text");
  const points = document.querySelector(".score");
  const rank = document.querySelector(".level");
  const width = 15;
  let snake = [0, 1, 2];
  let direction = 1;
  let foodIndex = 0;
  let moveSnakeId;
  let score = 0;
  let isPause = true;
  let speed = 1000;
  //#endregion

  //#region Level
  function level() {
    if (score === 3) {
      speed = 900;
      rank.textContent = "Level: 2";
    } else if (score === 5) {
      speed = 800;
      rank.textContent = "Level: 3";
    } else if (score === 7) {
      speed = 700;
      rank.textContent = "Level: 4";
    } else if (score === 9) {
      speed = 600;
      rank.textContent = "Level: 5";
    } else if (score === 11) {
      speed = 500;
      rank.textContent = "Level: 6";
    } else if (score === 13) {
      speed = 400;
      rank.textContent = "Level: 7";
    } else if (score === 15) {
      speed = 300;
      rank.textContent = "Level: 8 last";
    }
    clearInterval(moveSnakeId);
    moveSnakeId = setInterval(moveSnake, speed);
  }
  //#endregion

  //#region Pause
  function pause() {
    isPause = !isPause;
    if (!isPause) {
      clearInterval(moveSnakeId);
      stop.innerHTML = "Resume";
    } else {
      moveSnakeId = setInterval(moveSnake, speed);
      stop.innerHTML = "Pause";
    }
  }
  //#endregion
 
  //#region Draw a snake
  const drawSnake = () => {
    snake.forEach((item) => {
      field[item].classList.add("snake");
    });
  };
  //#endregion

  //#region Remove a snake
  const removeSnake = () => {
    field.forEach((item) => {
      item.classList.remove("snake");
    });
  };
  //#endregion

  //#region Start game
  function startGame() {
    removeSnake();
    field[foodIndex].classList.remove("food");
    clearInterval(moveSnakeId);
    isPause = true;
    rank.textContent = "Level: 1";
    stop.innerHTML = "Pause";
    score = 0;
    speed = 1000;
    randomFood();
    direction = 1;
    points.textContent = "Score: 0";
    text.textContent = "";
    snake = [2, 1, 0];
    drawSnake();
    moveSnakeId = setInterval(moveSnake, speed);
  }
  //#endregion

  //#region Movement a snake
  const moveSnake = () => {
    if (
      (snake[0] + width >= width * width && direction === width) || // bottom
      (snake[0] % width === width - 1 && direction === 1) || //right
      (snake[0] % width === 0 && direction === -1) || //left
      (snake[0] - width < 0 && direction === -width) || //top
      field[snake[0] + direction].classList.contains("snake") //snake
    ) {
      text.textContent = "You ran into an obstacle. End of the game";
      return clearInterval(moveSnakeId);
    }
    const tail = snake.pop();
    field[tail].classList.remove("snake");
    snake.unshift(snake[0] + direction);

    // eatFood();
    if (field[snake[0]].classList.contains("food")) {
      field[snake[0]].classList.remove("food");
      field[tail].classList.add("snake");
      snake.push(tail);
      randomFood();
      score++;
      points.textContent = `Score: ${score}`;
      level()
    }
    field[snake[0]].classList.add("snake");
  };

  //#endregion

  //#region Direction a snake
  function directionSnake(e) {
    switch (e.keyCode) {
      case 39:
        direction = 1; //rigth
        break;
      case 38:
        direction = -width; //up
        break;
      case 37:
        direction = -1; //left
        break;
      case 40:
        direction = +width; // down
        break;
    }
  }
  //#endregion

  //#region Food random
  function randomFood() {
    do {
      foodIndex = Math.floor(Math.random() * field.length);
    } while (field[foodIndex].classList.contains("snake"));
    field[foodIndex].classList.add("food");
  }
  //#endregion
  
  document.addEventListener("keyup", directionSnake);
  start.addEventListener("click", startGame);
  stop.addEventListener("click", pause);
});
