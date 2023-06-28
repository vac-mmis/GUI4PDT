import { createScene } from "@/World/components/scene";
import { createCamera } from "@/World/components/camera";
import { createLights } from "@/World/components/lights";
import { createControls } from "@/World/systems/controls";
import { createRenderer } from "@/World/systems/renderer";
import { Loop } from "@/World/systems/Loop";
import { Resizer } from "@/World/systems/Resizer";

import { loadModel } from "@/World/systems/loader";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createObject } from "./components/object";

export class World {
    private camera: THREE.PerspectiveCamera;
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private controls: OrbitControls;
    private loop: Loop;

    constructor(container: HTMLDivElement) {
        this.camera = createCamera();
        this.scene = createScene();
        this.renderer = createRenderer();
        this.controls = createControls(this.camera, this.renderer.domElement);
        container.append(this.renderer.domElement);
        const { ambientLight, mainLight } = createLights();
        this.scene.add(ambientLight, mainLight);

        const resizer = new Resizer(container, this.camera, this.renderer);

        this.loop = new Loop(this.camera, this.scene, this.renderer);
    }

    public async init() {
        const model = await loadModel("/assets/Tetrapod.obj");
        for (let i = -80; i < 80; i++) {
            for (let j = -80; j < 80; j++) {
                this.scene.add(createObject(model, [i * 3, j * 3, 0]));
            }
        }
    }

    public render() {
        this.controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
        this.renderer.render(this.scene, this.camera);
    }

    public start() {
        this.loop.start();
    }

    public stop() {
        this.loop.stop();
    }
}
