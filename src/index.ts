const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
//const htmlRoot = document.getElementById('root') as HTMLElement;

const GAME_WIDTH = 320;
const GAME_HEIGHT = 180;

/**
 * Scales the game window to the maximum amount given the window size. Note that
 * we set the width/height of the canvas AND the style.width/height. The attribute
 * decides the interal resolution of the canvas. But the style.width/height decides
 * how the canvas element is drawn in the browser.
 */
const resize = () => {
    const heightCalculatedFromWidth = window.innerWidth * (GAME_HEIGHT / GAME_WIDTH);
    if (heightCalculatedFromWidth <= window.innerHeight) {
        canvas.width = Math.floor(window.innerWidth);
        canvas.height = Math.floor(heightCalculatedFromWidth);
    } else {
        canvas.width = Math.floor(window.innerHeight * (GAME_WIDTH / GAME_HEIGHT));
        canvas.height = Math.floor(window.innerHeight);
    }
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
};
window.addEventListener('resize', resize);
resize();

const getScale = () => {
    return canvas.width / GAME_WIDTH;
};

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

requestAnimationFrame(() => {
    ctx.scale(getScale(), getScale());
    ctx.imageSmoothingEnabled = false;
});

const animate = () => {
    const vel = 1;
    if (controller.up) playerPos.y -= vel;
    if (controller.down) playerPos.y += vel;
    if (controller.left) playerPos.x -= vel;
    if (controller.right) playerPos.x += vel;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, playerPos.x, playerPos.y);
    requestAnimationFrame(animate);
};

animate();
