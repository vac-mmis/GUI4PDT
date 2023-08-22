/**
 * This is a wrapper of world camera creation.
 *
 * @module World.Camera
 */
import { PerspectiveCamera } from "three";

/**
 * Creates a new Camera for {@link World} module.
 *
 * @remarks Update values used in this function to change camera properties or position.
 *
 * @returns New camera.
 */
export function createCamera(): PerspectiveCamera {
    const camera = new PerspectiveCamera(
        70, // fov = Field Of View
        window.innerWidth / window.innerHeight, // set window aspect ratio
        0.1, // near clipping plane
        1000 // far clipping plane
    );

    // move the camera back so we can view the scene
    camera.position.set(0, -20, 10);

    return camera;
}
