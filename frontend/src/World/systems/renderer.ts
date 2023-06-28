import { WebGLRenderer } from "three";

export function createRenderer(): WebGLRenderer {
    const renderer = new WebGLRenderer({ antialias: true });

    // turn on the physically correct lighting model
    renderer.useLegacyLights = false;

    return renderer;
}
