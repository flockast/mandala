import * as dat from 'dat.gui';
const gui = new dat.GUI();

const size = {
  width: window.innerWidth,
  height: window.innerHeight
};
const canvas = document.querySelector('canvas');
canvas.width = size.width;
canvas.height = size.height;
const ctx = canvas.getContext('2d');

const centerX = size.width / 2;
const centerY = size.height / 2;
const nums = 300;

const settings = {
  radius: 300,
  speed: 10,
  amp: 10,
  period: 20,
  hsl: 10,
  stroke: false
};

gui.add(settings, 'radius', 50, 500).step(1);
gui.add(settings, 'speed', 0, 30);
gui.add(settings, 'amp', 0, 100).step(1);
gui.add(settings, 'period', 0, 100).step(1);
gui.add(settings, 'hsl', 0, 360).step(1);
gui.add(settings, 'stroke');

const clear = (ctx, canvas) => {
  ctx.fillStyle = "#131313";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

function drawCircle(radius, offset, color) {
  ctx.beginPath();
  for (let i = 0; i <= nums; i++) {
    const theta = i * 2 * Math.PI / nums;
    const rad = radius + settings.amp * Math.cos(theta * settings.period + offset);

    const x = rad * Math.cos(theta) + centerX;
    const y = rad * Math.sin(theta) + centerY;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  if (settings.stroke) {
    ctx.fillStyle = "#131313";
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    ctx.fill();
  } else {
    ctx.fillStyle = color;
    ctx.fill();
  }
  ctx.closePath();
}

const draw = (ctx, canvas, time) => {
  const radius = settings.radius;
  time *= settings.speed;
  for (let i = 0; i < settings.radius / 20; i++) {
    let color;
    if (settings.stroke) {
      color = 'transparent';
    } else {
      color = `hsl(${settings.hsl + i * 5}, 71%, 50%)`;
    }
    drawCircle(
      radius - i * 20,
      (time) / (1000 + 100 * i),
      // 10 * i + time,
      // time / (1000 + 100 * i),
      color
    );
  }
};

const raf = (time) => {
  clear(ctx, canvas);
  draw(ctx, canvas, time);
  requestAnimationFrame(raf);
};

raf();
