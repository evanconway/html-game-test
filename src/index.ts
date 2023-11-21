const GAME_WIDTH = 320;
const GAME_HEIGHT = 180;

const canvasImages: HTMLCanvasElement = document.getElementById('canvas-images') as HTMLCanvasElement;
const ctxImages = canvasImages.getContext('2d')!;

canvasImages.width = GAME_WIDTH;
canvasImages.height = GAME_HEIGHT;

/**
 * Scales the game window to the maximum amount given the window size. Note that
 * we set the width/height of the canvas AND the style.width/height. The attribute
 * decides the interal resolution of the canvas. But the style.width/height decides
 * how the canvas element is drawn in the browser.
 */
const resize = () => {
    const heightCalculatedFromWidth = window.innerWidth * (GAME_HEIGHT / GAME_WIDTH);
    if (heightCalculatedFromWidth <= window.innerHeight) {
        canvasImages.style.width = Math.floor(window.innerWidth) + 'px';
        canvasImages.style.height = Math.floor(heightCalculatedFromWidth) + 'px';
    } else {
        canvasImages.style.width = Math.floor(window.innerHeight * (GAME_WIDTH / GAME_HEIGHT)) + 'px';
        canvasImages.style.height = Math.floor(window.innerHeight) + 'px';
    }
};
window.addEventListener('resize', resize);
resize();

const image = new Image();

image.src = '../src/assets/character.png';

const controller = {
    up: false,
    down: false,
    left: false,
    right: false,
};

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') controller.up = true;
    if (e.key === 'ArrowDown') controller.down = true;
    if (e.key === 'ArrowLeft') controller.left = true;
    if (e.key === 'ArrowRight') controller.right = true;
});

document.addEventListener('keyup', e => {
    if (e.key === 'ArrowUp') controller.up = false;
    if (e.key === 'ArrowDown') controller.down = false;
    if (e.key === 'ArrowLeft') controller.left = false;
    if (e.key === 'ArrowRight') controller.right = false;
});

const playerPos = { x: 0, y: 0 };

const gameUpdate = () => {
    const vel = 0.5;
    if (controller.up) playerPos.y -= vel;
    if (controller.down) playerPos.y += vel;
    if (controller.left) playerPos.x -= vel;
    if (controller.right) playerPos.x += vel;
    if (!controller.up && !controller.down && !controller.left && !controller.right) {
        playerPos.x = Math.round(playerPos.x);
        playerPos.y = Math.round(playerPos.y);
    }
};

const clearCanvasImage = () => {
    ctxImages.clearRect(0, 0, canvasImages.width, canvasImages.height);
    ctxImages.fillStyle = 'white';
    ctxImages.fillRect(0, 0, canvasImages.width, canvasImages.height);
};

const animate = () => {
    clearCanvasImage();
    gameUpdate();

    ctxImages.drawImage(image, Math.round(playerPos.x), Math.round(playerPos.y));
    ctxImages.fillStyle = 'black';
    ctxImages.fillText('hello world', 50, 50);
    requestAnimationFrame(animate);
};

animate();
