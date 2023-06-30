import { createScene } from "@/World/components/scene";
import { createCamera } from "@/World/components/camera";
import { createLights } from "@/World/components/lights";
import { createControls } from "@/World/systems/controls";
import { createRenderer } from "@/World/systems/renderer";
import { Loop } from "@/World/systems/Loop";
import { Resizer } from "@/World/systems/Resizer";

import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import type { Group } from "three";
import type { PDTObject } from "@/models/object.model";
import { createHelpers } from "./components/helpers";

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

        const { axesHelper, gridHelper } = createHelpers();
        this.scene.add(axesHelper, gridHelper);
        const resizer = new Resizer(container, this.camera, this.renderer);

        this.loop = new Loop(this.camera, this.scene, this.renderer);
    }

    public append(objects: PDTObject[]) {
        const trace: Group[] = objects.map((obj: PDTObject) => obj.obj);
        this.scene.add(...trace);
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
