/**
 * This wrapper creates lights for {@link World} module.
 */
import { DirectionalLight, AmbientLight } from "three";

/**
 * Returns some lights for {@link World} module.
 *
 * @remark Feel free to add or change lights if needed.
 */
export function createLights() {
    // Ambient light to lighten the whole scene
    const ambientLight = new AmbientLight("white", 2);

    // Main light for scene
    const mainLight = new DirectionalLight("white", 3);
    mainLight.position.set(10, 10, 10);

    return { ambientLight, mainLight };
}
