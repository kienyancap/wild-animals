const SCALE = 2;
const WIDTH = 16;
const HEIGHT = 18;
const SCALED_WIDTH = SCALE * WIDTH;
const SCALED_HEIGHT = SCALE * HEIGHT;
const CYCLE_LOOP = [0, 1, 0, 2];
const FACING_DOWN = 0;
const FACING_UP = 1;
const FACING_LEFT = 2;
const FACING_RIGHT = 3;
const FRAME_LIMIT = 12;
const MOVEMENT_SPEED = 1;

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let keyPresses = {};
let currentDirection = FACING_DOWN;
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = 0;
let positionY = 0;
let img = new Image();
let honesty_image = new Image();
let boldness_image = new Image();
let trust_image = new Image();
let freedom_image = new Image();
let fun_image = new Image();
let modesty_image = new Image();
let teamSpirit_image = new Image();

window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
    keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
    keyPresses[event.key] = false;
}

function loadImage() {
    img.src = 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png';
    img.onload = function() {
        window.requestAnimationFrame(gameLoop);
    };
    honesty_image.src = 'https://www.capgemini.com/wp-content/uploads/2021/09/brandvalues_0003_honesty.jpg?w=500&quality=100';
    honesty_image.onload = function(){
        window.requestAnimationFrame(gameLoop);
    };
    boldness_image.src = 'https://www.capgemini.com/wp-content/uploads/2021/09/brandvalues_0006_Boldness-e1631877615851.jpg?w=500&quality=100';
    honesty_image.onload = function(){
        window.requestAnimationFrame(gameLoop);
    };
    trust_image.src = 'https://www.capgemini.com/wp-content/uploads/2021/09/brandvalues_0000_trust-e1631877739580.jpg?w=768&quality=100';
    trust_image.onload = function(){
        window.requestAnimationFrame(gameLoop);
    }
    trust_image.src = 'https://www.capgemini.com/wp-content/uploads/2021/09/brandvalues_0005_freedom.jpg?w=500&quality=100';
    trust_image.onload = function(){
        window.requestAnimationFrame(gameLoop);
    }
    trust_image.src = 'https://www.capgemini.com/wp-content/uploads/2021/09/brandvalues_0004_fun.jpg?w=500&quality=100';
    trust_image.onload = function(){
        window.requestAnimationFrame(gameLoop);
    }
    trust_image.src = 'https://www.capgemini.com/wp-content/uploads/2021/09/brandvalues_0002_modesty.jpg?w=500&quality=100';
    trust_image.onload = function(){
        window.requestAnimationFrame(gameLoop);
    }
    trust_image.src = 'https://www.capgemini.com/wp-content/uploads/2021/09/brandvalues_0001_team-spirit.jpg?w=500&quality=100';
    trust_image.onload = function(){
        window.requestAnimationFrame(gameLoop);
    }
}

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img,
        frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
        canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
    ctx.drawImage(honesty_image, 150, 250, 50, 55);
    ctx.drawImage(boldness_image, 400, 200, 50, 50);
    ctx.drawImage(trust_image, 240, 200, 50, 50);
    ctx.drawImage(freedom_image, 250, 220, 50, 50);
    ctx.drawImage(fun_image, 20, 20, 50, 50);
    ctx.drawImage(modesty_image, 20, 20, 50, 50);
    ctx.drawImage(teamSpirit_image, 20, 20, 50, 50);

}

loadImage();

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let hasMoved = false;

    if (keyPresses.w) {
        moveCharacter(0, -MOVEMENT_SPEED, FACING_UP);
        hasMoved = true;
    } else if (keyPresses.s) {
        moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN);
        hasMoved = true;
    }

    if (keyPresses.a) {
        moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
        hasMoved = true;
    } else if (keyPresses.d) {
        moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
        hasMoved = true;
    }

    if (hasMoved) {
        frameCount++;
        if (frameCount >= FRAME_LIMIT) {
            frameCount = 0;
            currentLoopIndex++;
            if (currentLoopIndex >= CYCLE_LOOP.length) {
                currentLoopIndex = 0;
            }
        }
    }

    if (!hasMoved) {
        currentLoopIndex = 0;
    }

    drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection, positionX, positionY);
    window.requestAnimationFrame(gameLoop);
}

function moveCharacter(deltaX, deltaY, direction) {
    if (positionX + deltaX > 0 && positionX + SCALED_WIDTH + deltaX < canvas.width) {
        positionX += deltaX;
    }
    if (positionY + deltaY > 0 && positionY + SCALED_HEIGHT + deltaY < canvas.height) {
        positionY += deltaY;
    }
    currentDirection = direction;
}