const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');
const { lerp } = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const getGrid = () => {
    const size = 20;
    const points = [];

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const u = size <= 1 ? 0.5 : x / (size-1);
            const v = size <= 1 ? 0.5 : y / (size-1);

            points.push([u, v]);
        }
    }

    return points;
}

const points = getGrid();
const margin = 300;

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'aliceblue';
    context.fillRect(0, 0, width, height);
    colors = random.pick(palettes);

    for (let i = 0; i < 10; i++) {
        let [u, v] = random.pick(points);
        const x1 = lerp(margin, width - margin, u);
        const y1 = lerp(margin, width - margin, v);
        [u, v] = random.pick(points);
        const x2 = lerp(margin, width - margin, u);
        const y2 = lerp(margin, width - margin, v);
        [u, v] = random.pick(points);
        const x3 = lerp(margin, width - margin, u);
        const y3 = lerp(margin, width - margin, v);
        context.beginPath();
        context.lineWidth = 10;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineTo(x3, y3);
        context.lineTo(x1, y1);
        context.fillStyle = random.pick(colors);
        context.globalAlpha = 0.8;
        context.strokeStyle = 'white';
        context.fill();
        context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
