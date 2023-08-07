/**
 * This wrapper creates renderers for {@link World} module.
 *
 * @module world.renderer
 */
import { WebGLRenderer } from "three";

/**
 * @remark Feel free to change renderer properties if needed.
 *
 * @return Renderer for a world object.
 */
export const createRenderer = () => {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.useLegacyLights = false;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer;
};
