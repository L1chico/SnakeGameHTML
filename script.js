const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
 
//Размер квадрата Квадратов = 13
const box_px = 48;
//Еда
const foodImg = new Image();
foodImg.src = "icons/apple.png";
/*
const snake_head = new Image();
snake_head.src = "icons/zmeyka.png"; */ 
//Счёт
let score = 0;
//Массив змейки
let snake = [];
snake[0] = {
    x:6 * box_px,
    y:6 * box_px,
}
 
/* function createFood() {
    let food = {
        x: Math.round(Math.random()*13) * box_px,
        y: Math.round(Math.random()*13) * box_px,
    };
    window.food;
};
createFood(); */

//Создание еды
let food = {
    x: Math.round(Math.random()*12) * box_px,
    y: Math.round(Math.random()*12) * box_px,
};
//Что бы не появлялось еда внутри змейки с начала игры
if (snake[0].x == food.x && snake[0].y == food.y) {
    food = {
        x: Math.round(Math.random()*11) * box_px,
        y: Math.round(Math.random()*11) * box_px,
    };
};

let pause_count = 1;
function pause () {
    switch (pause_count) {
        case 0:
            document.getElementById("pauseid").src="icons/pause.png";        
            game_time = setInterval(main, 150);
            pause_count = 1;
            console.log("Вы нажали на играть");
            break;
        case 1:
            clearInterval(game_time);
            document.getElementById("pauseid").src="icons/play.png";
            pause_count = 0;
            console.log("Вы нажали на паузу");
            break;
    }
}

document.addEventListener("keydown", direction);
let dir;
function direction(event) {
/*     switch(event.keyCode) {
        case 37 && dir != "right":
            dir = "left";
            console.log("fdsfsd")
            break;
        case 38 && dir != "down":
            dir = "up";
            break;
        case 39 && dir != "left":
            dir = "right";
            break;
        case 40 && dir != "up":
            dir = "down";
            break;
    } */
    if (event.keyCode == 37 && dir != "right") {
        dir = "left";
        /* console.log("left"); */
    } else if (event.keyCode == 38 && dir != "down") {
        dir = "up";
        /* console.log("up"); */
    } else if (event.keyCode == 39 && dir != "left") {
        dir = "right";
        /* console.log("right"); */
    } else if (event.keyCode == 40 && dir != "up") {
        dir = "down";
        /* console.log("down"); */
    }
}
//Главная функция отрисовки игры
function main() {
/*     let food = {
        x: Math.round(Math.random()*13) * box_px,
        y: Math.round(Math.random()*13) * box_px,
    }; */
    //Очищаем поле
    ctx.clearRect(0, 0, 624 , 624);
    //Орисовка еды
    ctx.drawImage(foodImg, food.x, food.y);
    //Отрисовка змейки
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x, snake[i].y, box_px , box_px);
    }
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
 
    /* ctx.clearRect(snake[snake.length-1].x, snake[snake.length-1].y, snake[snake.length-1].x, snake[snake.length-1].y); */
 
    //отрезаем конец змейки
    /* if (snake.length > 1 && snake[0].x != food.x && snake[0].y != food.y) {
        ctx.clearRect(snakeX, snakeY, snakeX + box_px, snakeY + box_px);
        console.log(snake.length);
    } else if (snake.length == 1) {
        ctx.clearRect(snakeX - box_px, snakeY - box_px, snakeX, snakeY);
    } */
    //Проверка на еду
    if (snake[0].x == food.x && snake[0].y == food.y) {
        score++;
        document.getElementById("scoreid").innerHTML = score;
        /* console.log(snake[0].x == food.x && snake[0].y == food.y); */
        //Проверка на то чтобы еда не появлялась в змейке иначе пересоздать
        snake.forEach((Element) => {
            while (Element.x == food.x && Element.y == food.y) {
                food = {
                    x: Math.round(Math.random()*11) * box_px,
                    y: Math.round(Math.random()*11) * box_px,
                };
            }
        })
        /* food = {
            x: Math.round(Math.random()*11) * box_px,
            y: Math.round(Math.random()*11) * box_px,
        }; */
    } else {
        snake.pop();
    }
 
 
 
 
    //Проверка на направление
    switch (dir) {
        case "left":
            snakeX -= box_px;
            break;
        case "right":
            snakeX += box_px;
            break;
        case "up":
            snakeY -= box_px;
            break;
        case "down":
            snakeY += box_px;
            break;
    }
    let newHead = {
        x:snakeX,
        y:snakeY,
    };
/*     console.log(newHead);
    console.log(snake); */
    snake.unshift(newHead);
 
    //Проверка на выход за границу поля и на столкновение
    if (newHead.x < 0 || newHead.y < 0 || newHead.x >= 624 || newHead.y >= 624) {
        clearInterval(game_time);
        console.log("Game Over");
    }
    snake.forEach((Element) => {if ((Element.x == newHead.x && Element.y == newHead.y) && snake.indexOf(Element) != 0) {
        clearInterval(game_time);
        console.log("Game Over");
        console.log(snake.indexOf(Element));
    }});
    /* switch (True) {
        case newHead.x <= 0 || newHead.y <= 0 || newHead.x >= 624 || newHead.y >= 624:
            clearInterval(game_time);
            break;
        default:
            break;
    } */
 
 
}
//Цикл игры
let game_time = setInterval(main, 150);