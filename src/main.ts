import { mobyDick } from "./other";

const GAME_WIDTH = 320;
const GAME_HEIGHT = 180;

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

/**
 * Scales the game window to the maximum amount given the window size. Note that
 * we set the style.width/height. The width/height attribute decides the interal 
 * resolution of the canvas. But the style.width/height decides how the canvas 
 * element is drawn in the browser.
 */
const resize = () => {
    const heightCalculatedFromWidth = window.innerWidth * (GAME_HEIGHT / GAME_WIDTH);
    if (heightCalculatedFromWidth <= window.innerHeight) {
        canvas.style.width = Math.floor(window.innerWidth) + 'px';
        canvas.style.height = Math.floor(heightCalculatedFromWidth) + 'px';
    } else {
        canvas.style.width = Math.floor(window.innerHeight * (GAME_WIDTH / GAME_HEIGHT)) + 'px';
        canvas.style.height = Math.floor(window.innerHeight) + 'px';
    }
};
window.addEventListener('resize', resize);
resize();

const image = new Image();

image.src = '../src/assets/character.png';

const controller = { up: false, down: false, left: false, right: false };

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

const player = { x: 0, y: 0, vel: 0.5 };

const gameUpdate = () => {
    if (controller.up) player.y -= player.vel;
    if (controller.down) player.y += player.vel;
    if (controller.left) player.x -= player.vel;
    if (controller.right) player.x += player.vel;
    if (!controller.up && !controller.down && !controller.left && !controller.right) {
        player.x = Math.round(player.x);
        player.y = Math.round(player.y);
    }
};

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '12px courier';
};

/**
 * Draws text accounting for line breaks given a maxWidth. Removes consecutive
 * spaces. (because that was easier to program)
 * 
 * @param text 
 * @param x 
 * @param y 
 * @param maxWidth 
 */
const drawText = (text: string, x: number, y: number, maxWidth = 200, spaceBetweenLines = 2) => {
    const words = text.split(' ');
    const lines: Array<string> = [words[0]];
    for (let i = 1; i < words.length; i++) {
        const wordWidth = ctx.measureText(' ' + words[i]).width;
        if (ctx.measureText(lines[lines.length - 1] + wordWidth).width < maxWidth) {
            lines[lines.length - 1] += (' ' + words[i]);
        } else {
            lines.push(words[i]);
        }
    }
    const measurement = ctx.measureText(text);
    const lineHeight = measurement.actualBoundingBoxAscent + measurement.actualBoundingBoxDescent;
    lines.forEach((line, i) => {
        ctx.fillText(line, Math.floor(x), Math.floor(y + lineHeight * i + spaceBetweenLines * i));
    });
};

const animate = () => {
    gameUpdate();
    clearCanvas();
    ctx.drawImage(image, Math.round(player.x), Math.round(player.y));
    ctx.textAlign = 'center';
    drawText(mobyDick, GAME_WIDTH / 2, 20);
    requestAnimationFrame(animate);
};

animate();
