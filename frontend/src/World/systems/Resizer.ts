import type { PerspectiveCamera, WebGLRenderer } from "three";

const setSize = (container: HTMLDivElement, camera: PerspectiveCamera, renderer: WebGLRenderer) => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
};

export class Resizer {
    private container: HTMLDivElement;
    private camera: PerspectiveCamera;
    private renderer: WebGLRenderer;

    private resize = () => setSize(this.container, this.camera, this.renderer);

    constructor(container: HTMLDivElement, camera: PerspectiveCamera, renderer: WebGLRenderer) {
        this.container = container;
        this.camera = camera;
        this.renderer = renderer;

        // set initial size on load
        this.resize();
        // set the size again if a resize occurs
        window.addEventListener("resize", this.resize);
    }

    public updateContainer(container: HTMLDivElement) {
        this.container = container;
    }
}
