import { AxesHelper, GridHelper } from "three";

export function createHelpers() {
    const axesHelper = new AxesHelper(30);

    const gridHelper = new GridHelper(100, 100);
    gridHelper.rotation.x = Math.PI / 2;

    return { axesHelper, gridHelper };
}
