//board
const blockSize=25;
const row=21;
const column=21;
var board;
var context;

//snakeHead
var snakeX=5*blockSize;
var snakeY=5*blockSize;

var velocityX = 0;
var velocityY = 0;

var snakeBody=[];

//food
var foodX;
var foodY;

var gameOver=false;

window.onload=function(){
    board=document.getElementById("game-board");
    board.height=blockSize*row;
    board.width=blockSize*column;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10); //100 milliseconds
}

function update(){
    if(gameOver){
        return;
    }
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="yellow";
    context.fillRect(foodX,foodY, blockSize, blockSize);

    if(snakeX==foodX &snakeY==foodY ){
        snakeBody.push([foodX,foodY]);
        placeFood();
    }
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }


    context.fillStyle="blue";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

     //game over conditions
     if (snakeX < 0 || snakeX > column*blockSize || snakeY < 0 || snakeY > row*blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
  
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    //(0-1) * cols -> (0-20.9999) -> (0-20) * 25
    foodX = Math.floor(Math.random() * column) * blockSize;
    foodY = Math.floor(Math.random() * row) * blockSize;
}