//#region PARÂMETROS
let canvas = document.getElementById("snake");

/* O Contexto vai renderizar o desenho dentro do Canvas */
let context = canvas.getContext("2d");

/* Tamanho de cada quadradinho - pixel */
let box = 32;

/* Largura e Altura do jogo */
let largura = box * 16;
let altura = box * 16;

/* Variável cobra - que é um array bidimensional */
let snake = [];
snake[0] = {
  x: box * 8,
  y: box * 8
}

let direction = "right";

/** Local aleatório onde a "comida" da cobra vai aparecer
 * O Math.floor() retira o ponto flutuante do Math.random()
 * O Math.random() retorna um número aleatório entre 0 e 1
 */
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
};
//#endregion 

//#region MÉTODOS

/** Método que vai iniciar o Canvas, vai desenhar o BackGround 
 * context.fillStyle -> Cor de fundo
 * context.fillRect -> 4 parâmetros para criar o plano do jogo - posição x e y, largura e altura
 */
function createBG() {
  context.fillStyle = "lightgreen"; 
  context.fillRect(0, 0, largura, altura);
}

/** Método que vai criar a cobrinha
 * 
 */
function createSnake() {
  for(i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

/** Método que desenha a comida
 * 
 */
function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update);

function update (event) {
  if(event.keyCode == 37 && direction != "right") direction = "left"; 
  if(event.keyCode == 38 && direction != "down")  direction = "up"; 
  if(event.keyCode == 39 && direction != "left")  direction = "right"; 
  if(event.keyCode == 40 && direction != "up")    direction = "down";
}

function iniciarJogo() {

  /* Controlar para que a cobra reapareça do outro lado, caso chegue ao final de um dos lados */
  if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  /* Verificar se a cobra se chocou com o próprio corpo */
  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert('Game Over');
    }
  }

  createBG();
  createSnake();  
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left")  snakeX -= box;
  if (direction == "up")    snakeY -= box;
  if (direction == "down")  snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead);

}

//#endregion 

/* Inicia o jogo e controla a velocidade dele */
let jogo = setInterval(iniciarJogo, 100);



