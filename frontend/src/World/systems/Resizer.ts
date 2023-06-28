import type { PerspectiveCamera, WebGLRenderer } from "three";

export class Resizer {
    constructor(container: HTMLDivElement, camera: PerspectiveCamera, renderer: WebGLRenderer) {
        // Set the camera's aspect ratio
        camera.aspect = container.clientWidth / container.clientHeight;

        // update the camera's frustum
        camera.updateProjectionMatrix();

        // update the size of the renderer AND the canvas
        renderer.setSize(container.clientWidth, container.clientHeight);

        // set the pixel ratio (for mobile devices)
        renderer.setPixelRatio(window.devicePixelRatio);
    }
}
