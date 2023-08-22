/**
 * This wrapper gives controller plugin to {@link World} module.
 *
 * @module World.Controls
 */
import type { Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Creates controls for a camera and a container element.
 *
 * @remark Feel free to change camera controls if needed.
 *
 * @param camera Desired camera which needs controls.
 * @param container HTML div container in which create controls.
 *
 * @returns Orbital controls for a world camera.
 */
export const createControls = (camera: Camera, container: HTMLElement): OrbitControls =>
    new OrbitControls(camera, container);
