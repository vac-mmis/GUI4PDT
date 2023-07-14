import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

export class BoxDist extends Mesh {
    private previousDim: [number, number, number];
    constructor(dim: [number, number, number]) {
        if (!dim.every((d) => d !== 0)) {
            throw new Error("Cannot create box with size 0");
        }
        const geometry = new BoxGeometry(...dim);
        const material = new MeshStandardMaterial({
            color: 0xf0f921,
            transparent: true,
            opacity: 0.5,
        });
        super(geometry, material);
        this.previousDim = dim;
    }

    public update(dim: [number, number, number]) {
        this.geometry.scale(
            dim[0] / this.previousDim[0],
            dim[1] / this.previousDim[1],
            dim[2] / this.previousDim[2]
        );
        this.previousDim = dim;
    }
}
