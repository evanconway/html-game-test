const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const resize = () => {
    canvas.style.height = `${canvas.offsetWidth * (9/16)}px`;
    console.log(`width: ${canvas.offsetWidth}, height: ${canvas.offsetHeight}`);
};

new ResizeObserver(resize).observe(canvas);

const image = new Image();

image.src = '../src/assets/character.png';

const scale = 2;

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
    ctx.scale(scale, scale);
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
