/**
 * This wrapper creates scene for {@link World} module.
 *
 * @module world.scene
 */
import { Color, Scene } from "three";

/**
 * Returns new scene for {@link World}.
 *
 * @remark Feel free to update this scene creator if needed.
 */
export function createScene(): Scene {
    const scene = new Scene();
    scene.background = new Color("skyblue");

    return scene;
}
