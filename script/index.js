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
  console.log(field);
  //#endregion

  //#region Zmienne
  const stop = document.querySelector(".stop")
  const width = 15
  let snake = [0, 1, 2]
  let direction = 1
  let foodIndex = 0
  //#endregion
  //#region rysujemy węża
  const drawSnake = () => {
    snake.forEach((item) => {
      field[item].classList.add("snake");
    });
  };
  drawSnake();
  //#endregion
  
  //#region usuwamy węża
  const removeSnake = () => {
    field.forEach((item) => item.classList.remove("snake"));
  };
  //#endregion

  //#region ruch węża
  const moveSnake = () => {
    removeSnake();
    for (let i = 0; i < snake.length; i++) {
      snake[i] += direction;
    }
    drawSnake()
    eatFood()
  };
  let moveSnakeId = setInterval(moveSnake, 1000);
  stop.addEventListener("click", () => clearInterval(moveSnakeId));
  //#endregion
 
  //#region natrafienie na jedzoanko
  function eatFood (){
    field.forEach( item => {
      if(item.classList.contains("food") && item.classList.contains("snake")){
        item.classList.remove("food")
        let partSnake = snake[snake.length - 1] + 1
        snake.push(partSnake)
        randomFood()
      }
    })
  }
  //#endregion

  //#region kirunek węża
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
  document.addEventListener("keyup", directionSnake);
  //#endregion
  
  //#region lusujemy pozycję jedzonka
  function randomFood(){
    do{
      foodIndex = Math.floor(Math.random() * field.length)
    } while (field[foodIndex].classList.contains("snake"))
    field[foodIndex].classList.add("food")
  }
  randomFood()
  //#endregion
});
