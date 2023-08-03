import type { Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const createControls = (camera: Camera, canvas: HTMLElement): OrbitControls =>
    new OrbitControls(camera, canvas);
