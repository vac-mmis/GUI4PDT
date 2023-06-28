import type { Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function createControls(camera: Camera, canvas: HTMLElement): OrbitControls {
    const controls = new OrbitControls(camera, canvas);
    controls.update();
    return controls;
}

export { createControls };
