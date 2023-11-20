console.log('ts file ran');
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const image = new Image();

image.src = '../src/assets/character.png';

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const scale = 10;

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
    if (ctx === null) return;
    ctx.scale(scale, scale);
    ctx.imageSmoothingEnabled = false;
});

const animate = () => {
    if (ctx === null) return;
    const vel = 1;
    if (controller.up) playerPos.y -= vel;
    if (controller.down) playerPos.y += vel;
    if (controller.left) playerPos.x -= vel;
    if (controller.right) playerPos.x += vel;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(image, playerPos.x, playerPos.y);
    requestAnimationFrame(animate);
};

animate();
