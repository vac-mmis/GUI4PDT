import { Camera, Scene, WebGLRenderer } from "three";

export class Loop {
    camera: Camera;
    scene: Scene;
    renderer: WebGLRenderer;
    constructor(camera: Camera, scene: Scene, renderer: WebGLRenderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            // render a frame
            this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }
}
