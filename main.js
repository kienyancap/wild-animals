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
const MOVEMENT_SPEED = 1.5;

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let keyPresses = {};
let currentDirection = FACING_DOWN;
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = 10;
let positionY = 510;
let img = new Image();
let honesty_image = new Image();
let boldness_image = new Image();
let trust_image = new Image();
let freedom_image = new Image();
let fun_image = new Image();
let modesty_image = new Image();
let teamSpirit_image = new Image();
honesty_image.src = './images/honesty.png';
boldness_image.src = './images/boldness.png';
trust_image.src = './images/trust.png';
freedom_image.src = './images/freedom.png';
fun_image.src = './images/fun.png';
modesty_image.src = './images/modesty.png';
teamSpirit_image.src = './images/team-spirit.png';
honesty_image.positionX = 40;
boldness_image.positionX = 765;
trust_image.positionX = 370;
freedom_image.positionX = 330;
fun_image.positionX = 945;
modesty_image.positionX = 950;
teamSpirit_image.positionX = 1275;
honesty_image.positionY = 450;
boldness_image.positionY = 320;
trust_image.positionY = 400;
freedom_image.positionY = 265;
fun_image.positionY = 470;
modesty_image.positionY = 240;
teamSpirit_image.positionY = 195;
honesty_image.dialog = { src:'./images/Kilg.png', text: 'Well done!'};
boldness_image.dialog = { src:'./images/Bosklopper.png', text: 'Nice!'};
trust_image.dialog = { src:'./images/Berkhout.png', text: 'Well done!'};
freedom_image.dialog = { src:'./images/Wiel.png', text: 'Well done!'};
fun_image.dialog = { src:'./images/Syed.png', text: 'Well done!'};
modesty_image.dialog = { src:'./images/Jacobs.png', text: 'Well done!'};
teamSpirit_image.dialog = { src:'./images/Wiel.png', text: 'You are in a FE team now!'};

let images = [
    fun_image,
    modesty_image,
    boldness_image,
    trust_image,
    honesty_image,
    freedom_image,
    teamSpirit_image,
]
let achievements = [];
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
    img.onload = function () {
        window.requestAnimationFrame(gameLoop);
    };
}
function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img,
        frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
        canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
    for (const image in images) {
        if (!achievements.includes(images[image])){
            ctx.drawImage(images[image], images[image].positionX, images[image].positionY, 50, 50);
        }
    }
}
loadImage();
function isCloseToValue() {
    for (let i = 0; i < images.length; i++) {
        if (Math.abs(images[i].positionX - positionX) < 50 && Math.abs(images[i].positionY - positionY) < 50) {
            return i
        }
    }
    return false
}
function grab() {
    const index = isCloseToValue();
    const grabbedValue = document.getElementById(`value${index+1}`);
    grabbedValue.style.color =  'rgb(128 195 217)';
    grabbedValue.classList.add('achieved');
    achievements.push(images[index]);
}
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
    } else if (keyPresses.q) {
        grab();
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