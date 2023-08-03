import { Color, Scene } from "three";

export function createScene(): Scene {
    const scene = new Scene();
    scene.background = new Color("skyblue");

    return scene;
}
