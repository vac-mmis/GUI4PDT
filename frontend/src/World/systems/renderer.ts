import { WebGLRenderer } from "three";

export const createRenderer = () => {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.useLegacyLights = false;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer;
};
