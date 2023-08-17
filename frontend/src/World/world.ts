/**
 * This modules is a wrapper to simplify  Three.JS scenes and their elements.
 * This implementation is inspired by {@link https://discoverthreejs.com/book/ Discover Three.JS book}.
 *
 * @see {@link https://discoverthreejs.com/book/ Discover Three.JS book}.
 *
 * @module World
 */

import type { WebGLRenderer, PerspectiveCamera, Scene, Object3D } from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { createCamera } from "@/World/components/camera";
import { createScene } from "@/World/components/scene";
import { createRenderer } from "@/World/systems/renderer";
import { createControls } from "@/World/systems/controls";
import { createLights } from "@/World/components/lights";
import { createHelpers } from "@/World/components/helpers";
import { Resizer } from "@/World/systems/Resizer";
import { Timer } from "@/World/systems/Timer";
import { Pointer } from "@/World/components/Pointer";

import type { WorldContent } from "@/World/interface";

export class World<T extends WorldContent> {
    private camera: PerspectiveCamera;
    private scene: Scene;
    private renderer: WebGLRenderer;
    private timer: Timer;
    private resizer: Resizer;
    private controls: OrbitControls;
    private pointer: Pointer<T>;

    private content: T;

    /**
     * Creates a new Three.JS world in adding selected set in {@link World.interface}.
     *
     * @param content World content.
     * @param container HTML div container which contains Three.JS world.
     * @param selectionCallback Callback used when there is a click on a world element.
     * @param hoverCallback Callback used when mouse hover on an world element.
     * @param timerCallback Callback used when time changes.
     */
    constructor(
        content: T,
        container: HTMLDivElement,
        selectionCallback?: (obj?: Object3D | null) => void,
        hoverCallback?: (obj?: Object3D | null) => void,
        timerCallback?: (t: number) => number
    ) {
        // Create camera and scene
        this.camera = createCamera();
        this.scene = createScene();

        // Add content to scene
        this.content = content;
        this.scene.add(this.content);

        // Create renderer and enable resizing
        this.renderer = createRenderer();
        container.appendChild(this.renderer.domElement);
        this.resizer = new Resizer(container, this.camera, this.renderer);

        // Init timer
        this.timer = new Timer(this.camera, this.scene, this.renderer, timerCallback);

        // Create object pointer
        this.pointer = new Pointer(
            this.content,
            this.renderer.domElement,
            this.camera,
            selectionCallback,
            hoverCallback
        );

        // Setup orbital controls
        this.controls = createControls(this.camera, this.renderer.domElement);

        // Add lights
        const { ambientLight, mainLight } = createLights();
        this.scene.add(ambientLight, mainLight);

        // Add helpers (axis and grid)
        const { axesHelper, gridHelper } = createHelpers();
        this.scene.add(axesHelper, gridHelper);

        // First rendering
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Update world. Used when selected set in {@link World.interface} is changed.
     *
     * @param content World content.
     * @param container HTML div container which contains Three.JS world.
     * @param selectionCallback Callback used when there is a click on a world element.
     * @param hoverCallback Callback used when mouse hover on an world element.
     */
    public update(
        content: T,
        container: HTMLDivElement,
        selectionCallback?: (obj?: Object3D | null) => void,
        hoverCallback?: (obj?: Object3D | null) => void
    ) {
        // remove old content
        this.scene.remove(this.content);

        // update world container
        container.appendChild(this.renderer.domElement);
        this.resizer.updateContainer(container);

        // change content
        this.content = content;
        this.scene.add(this.content);

        // update pointer
        this.pointer.updateSet(this.content, selectionCallback, hoverCallback);
    }

    /**
     * Get world timer to control it.
     *
     * @returns World timer
     */
    public getTimer() {
        return this.timer;
    }
}
