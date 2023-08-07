/**
 * This wrapper creates some helpers for {@link World} module.
 *
 * @module world.helpers
 */
import { AxesHelper, GridHelper } from "three";

/**
 * Returns axis and grid helpers for {@link World} module.
 *
 * @remark Feel free to add or remove helpers in this function if needed.
 *
 * @returns Helpers for worlds.
 */
export function createHelpers() {
    // World axis representation
    const axesHelper = new AxesHelper(30);

    // XY world grid
    const gridHelper = new GridHelper(100, 100);
    gridHelper.rotation.x = Math.PI / 2;

    return { axesHelper, gridHelper };
}
