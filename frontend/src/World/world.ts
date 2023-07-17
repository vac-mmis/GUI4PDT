import { Vector2 } from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { createCamera } from "@/World/components/camera";
import { createScene } from "@/World/components/scene";
import { createRenderer } from "@/World/systems/renderer";
import { Resizer } from "@/World/systems/Resizer";
import { Timer } from "@/World/systems/Timer";
import { createRaycaster } from "@/World/components/raycaster";
import { createControls } from "@/World/systems/controls";
import { createLights } from "@/World/components/lights";
import { createHelpers } from "@/World/components/helpers";

import { PDTObjServices, type PDTObject } from "@/models/object.model";

export class World {
    private camera: THREE.PerspectiveCamera;
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private timer: Timer;
    private resizer: Resizer;
    private controls: OrbitControls;
    private raycaster: THREE.Raycaster;
    private pointer: THREE.Vector2;
    private selectedObject?: PDTObject | null;

    constructor(
        container: HTMLDivElement,
        selectionCallback?: (obj?: PDTObject | null) => void,
        timerCallback?: (t: number) => number
    ) {
        this.camera = createCamera();
        this.scene = createScene();
        this.renderer = createRenderer();
        this.resizer = new Resizer(container, this.camera, this.renderer);

        this.timer = new Timer(this.camera, this.scene, this.renderer, timerCallback);

        this.raycaster = createRaycaster();
        this.pointer = new Vector2();

        const onClick = (event: MouseEvent) => {
            this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.pointer, this.camera);

            // See if the ray from the camera into the world hits one of our meshes
            const toIntersect = this.scene.children.filter(
                (object) => object.userData.type === "Object"
            );
            const intersects = this.raycaster.intersectObjects(toIntersect, true);
            if (selectionCallback && intersects.length > 0) {
                this.selectedObject = PDTObjServices.getObjectFromIntersect(intersects[0]);
                selectionCallback(this.selectedObject);
            }
        };
        this.renderer.domElement.addEventListener("click", onClick);

        this.controls = createControls(this.camera, this.renderer.domElement);
        container.append(this.renderer.domElement);

        const { ambientLight, mainLight } = createLights();
        this.scene.add(ambientLight, mainLight);

        const { axesHelper, gridHelper } = createHelpers();
        this.scene.add(axesHelper, gridHelper);

        this.renderer.render(this.scene, this.camera);
    }

    public append(objects: PDTObject[]) {
        const trace: PDTObject[] = objects;
        this.scene.add(...trace);
    }

    public getTimer() {
        return this.timer;
    }
}
