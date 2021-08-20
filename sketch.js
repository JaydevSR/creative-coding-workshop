const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palletes = require('nice-color-palettes');

const settings = {
    dimensions: [2048, 2048],
    // units: 'cm',
    // pixelsPerInch: 300
};

const sketch = () => {
    const palette = random.shuffle(random.pick(palletes)).slice(0, 3);

    const createGrid = () => {
        const points = [];
        const count = 30;
        for (let x = 0; x < count; x++) {
            for (let y = 0; y < count; y++) {
                const u = count <= 1 ? 0.5 : x / (count-1);
                const v = count <= 1 ? 0.5 : y / (count-1);
                const radius = Math.abs(random.noise2D(u,v)) * 0.1;
                points.push({
                    position: [u, v],
                    radius, //Math.abs(0.01 + random.gaussian() * 0.005),
                    color: random.pick(palette),
                    rotation: random.noise2D(u,v)
                });
            }
        }
        return points;
    }

    const points = createGrid().filter(() => random.value() > 0.5);
    const margin = 400;

    return ({ context, width, height }) => {
        context.fillStyle = '#f9f7f7';
        context.fillRect(0, 0, width, height);

        points.forEach(data => {
            const {
                position,
                radius,
                color,
                rotation
            } = data;

            const [u, v] = position;

            const x = lerp(margin, width - margin, u);
            const y = lerp(margin, width - margin, v);

            // context.beginPath();
            // context.arc(x, y, width*radius, 0, Math.PI*2, false);
            // context.fillStyle = color;
            // context.fill();

            context.save();
            context.fillStyle = color;
            context.font = `${radius * width}px "Helvetica"`;
            context.translate(x, y);
            context.rotate(rotation);
            context.fillText('|', 0, 0);
            context.restore();
        });
    };
};

canvasSketch(sketch, settings);
