console.log('ts file ran');
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const image = new Image();

image.src = '../src/assets/character.png';

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const scale = 10;

let x = 0, y = 0;

requestAnimationFrame(() => {
    if (ctx === null) return;
    ctx.scale(scale, scale);
    ctx.imageSmoothingEnabled = false;
});

const animate = () => {
    if (ctx === null) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(image, x, y);
    requestAnimationFrame(animate);
};

animate();
