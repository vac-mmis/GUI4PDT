import { createScene } from "@/World/components/scene";
import { createCamera } from "@/World/components/camera";
import { createLights } from "@/World/components/lights";
import { createControls } from "@/World/systems/controls";
import { createRenderer } from "@/World/systems/renderer";
import { Resizer } from "@/World/systems/Resizer";

import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import type { PDTObject } from "@/models/object.model";
import { createHelpers } from "./components/helpers";
import { createRaycaster } from "./components/raycaster";
import { Vector2 } from "three";
export class World {
    private camera: THREE.PerspectiveCamera;
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private controls: OrbitControls;
    private raycaster: THREE.Raycaster;
    private pointer: THREE.Vector2;
    private selectedObject?: PDTObject | null;

    constructor(container: HTMLDivElement, selectCallback: (obj?: PDTObject | null) => void) {
        this.camera = createCamera();
        this.scene = createScene();
        this.renderer = createRenderer();
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
            if (intersects.length > 0) {
                this.selectedObject = intersects[0].object.parent?.parent?.parent as PDTObject;
                selectCallback(this.selectedObject);
            }
        };
        this.renderer.domElement.addEventListener("click", onClick);

        this.controls = createControls(this.camera, this.renderer.domElement);
        container.append(this.renderer.domElement);

        const { ambientLight, mainLight } = createLights();
        this.scene.add(ambientLight, mainLight);

        const { axesHelper, gridHelper } = createHelpers();
        this.scene.add(axesHelper, gridHelper);

        const resizer = new Resizer(container, this.camera, this.renderer);
    }

    public append(objects: PDTObject[]) {
        const trace: PDTObject[] = objects;
        this.scene.add(...trace);
    }

    public onClick(callback: Function) {
        callback(this.selectedObject);
    }

    public start() {
        this.renderer.setAnimationLoop(() => {
            // render a frame
            this.renderer.render(this.scene, this.camera);
        });
    }

    public stop() {
        this.renderer.setAnimationLoop(null);
    }
}
