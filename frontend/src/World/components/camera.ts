import { PerspectiveCamera } from "three";

export function createCamera(): PerspectiveCamera {
    const camera = new PerspectiveCamera(
        70, // fov = Field Of View
        1, // aspect ratio (dummy value)
        0.1, // near clipping plane
        1000 // far clipping plane
    );

    // move the camera back so we can view the scene
    camera.position.set(0, -300, 300);

    return camera;
}
