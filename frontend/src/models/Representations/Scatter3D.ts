import {
    BufferAttribute,
    BufferGeometry,
    Color,
    Float32BufferAttribute,
    Points,
    PointsMaterial,
} from "three";

export class Scatter3D extends Points {
    private static minColor = new Color(0x0d0887); // Blue
    private static maxColor = new Color(0xf0f921); // Yellow

    constructor(dataPoints: number[]) {
        const vertices = dataPoints.filter((_, i) => i % 4 !== 3);
        const probs = dataPoints.filter((_, i) => i % 4 === 3);

        const geometry = new BufferGeometry();
        geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));

        const material = new PointsMaterial({
            vertexColors: true,
            size: 5,
            transparent: true,
            sizeAttenuation: false,
        });

        // Setup colors and opacity
        geometry.setAttribute("color", new BufferAttribute(Scatter3D.getColors(probs), 4));

        super(geometry, material);
    }

    private static getColors(probs: number[]) {
        const colors = new Float32Array(probs.length * 4);
        probs.forEach((p: number, i: number) => {
            const color = new Color().lerpColors(Scatter3D.minColor, Scatter3D.maxColor, p);
            colors[4 * i] = color.r;
            colors[4 * i + 1] = color.g;
            colors[4 * i + 2] = color.b;
            colors[4 * i + 3] = 0.8 * p;
        });
        return colors;
    }

    public update(dataPoints: number[]) {
        const vertices = dataPoints.filter((_, i) => i % 4 !== 3);
        const probs = dataPoints.filter((_, i) => i % 4 === 3);

        this.geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
        this.geometry.setAttribute("color", new BufferAttribute(Scatter3D.getColors(probs), 4));
    }
}
