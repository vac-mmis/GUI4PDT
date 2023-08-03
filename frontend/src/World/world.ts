import type { Object3D, WebGLRenderer, PerspectiveCamera, Scene } from "three";
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

import { storeToRefs } from "pinia";
import type { PDT } from "@/models/pdt.model";
import PDTStore from "@/store/pdt.store";

export class World {
    private camera: PerspectiveCamera;
    private scene: Scene;
    private renderer: WebGLRenderer;
    private timer: Timer;
    private resizer: Resizer;
    private controls: OrbitControls;
    private pointer: Pointer;

    private pdt: PDT;

    constructor(
        container: HTMLDivElement,
        selectionCallback?: (obj?: Object3D | null) => void,
        hoverCallback?: (obj?: Object3D | null) => void,
        timerCallback?: (t: number) => number
    ) {
        // Create camera and scene
        this.camera = createCamera();
        this.scene = createScene();

        // Add PDT to scene
        const { getPDT } = storeToRefs(PDTStore());
        this.pdt = getPDT.value;
        this.scene.add(this.pdt);

        // Create renderer and enable resizing
        this.renderer = createRenderer();
        container.appendChild(this.renderer.domElement);
        this.resizer = new Resizer(container, this.camera, this.renderer);

        // Init timer
        this.timer = new Timer(this.camera, this.scene, this.renderer, timerCallback);

        // Create object pointer
        this.pointer = new Pointer(
            this.renderer.domElement,
            this.camera,
            this.pdt,
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

    public update(
        container: HTMLDivElement,
        selectionCallback?: (obj?: Object3D | null) => void,
        hoverCallback?: (obj?: Object3D | null) => void
    ) {
        // remove old pdt
        this.scene.remove(this.pdt);

        // update world container
        container.appendChild(this.renderer.domElement);
        this.resizer.updateContainer(container);

        // change PDT
        const { getPDT } = storeToRefs(PDTStore());
        this.pdt = getPDT.value;
        this.scene.add(this.pdt);

        // update pointer
        this.pointer.updatePDT(this.pdt, selectionCallback, hoverCallback);
    }

    public getTimer() {
        return this.timer;
    }
}
