/**
 * This wrapper provides a tool to auto resize world.
 *
 * @module World.Resizer
 */

import type { PerspectiveCamera, WebGLRenderer } from "three";

/**
 * Update world container size.
 *
 * @param container Container to update.
 * @param camera World camera.
 * @param renderer World renderer.
 */
const setSize = (container: HTMLDivElement, camera: PerspectiveCamera, renderer: WebGLRenderer) => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
};

/**
 * Implementation of resizer tool for world responsiveness.
 */
export class Resizer {
    /** World container to control dimensions. */
    private container: HTMLDivElement;
    /** World camera */
    private camera: PerspectiveCamera;
    /** World renderer */
    private renderer: WebGLRenderer;

    /**
     * Method to apply resizing.
     */
    private resize = () => setSize(this.container, this.camera, this.renderer);

    /**
     * Creates new resizers for worlds.
     *
     * @param container World container.
     * @param camera World camera.
     * @param renderer World resizer.
     */
    constructor(container: HTMLDivElement, camera: PerspectiveCamera, renderer: WebGLRenderer) {
        this.container = container;
        this.camera = camera;
        this.renderer = renderer;

        // set initial size on load
        this.resize();
        // set the size again if a resize occurs
        window.addEventListener("resize", this.resize);
    }

    /**
     * Update resizer container. Used when PDT changes to keep the right container.
     *
     * @param container New container for resizer.
     */
    public updateContainer(container: HTMLDivElement) {
        this.container = container;
    }
}
